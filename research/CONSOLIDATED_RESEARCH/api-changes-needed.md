# API Changes Needed for Conversation-First Platform

Detailed action plan for transforming debate-specific APIs into conversation-focused endpoints.

**Date**: November 14, 2025
**Target**: Conversation-first philosophy platform

---

## EXECUTIVE SUMMARY

Current app is built entirely around **debate mode** (for/against binary). To transition to **conversation-first**, we need:

| Phase | Duration | Scope | Impact |
|-------|----------|-------|--------|
| Phase 1: Preserve | Week 1 | Keep debate mode, fix bugs | Enable current platform |
| Phase 2: Extend | Weeks 2-3 | Add conversation mode alongside | Support both modes |
| Phase 3: Integrate AI | Week 4 | Add AI discussion features | Core conversation tools |
| Phase 4: Migrate | Week 5 | Sunset debate mode | Conversation-only |

---

## PHASE 1: PRESERVE (Fix Current System)

### Priority 1.1: Add Missing User Signup Flow ⚠️ CRITICAL

**Current State**: Login works but signup broken

**File**: `/app/auth/signup/page.tsx` (UI only, no backend)

**Required Changes**:

1. Create signup server action:
```typescript
// app/auth/signup-action.ts (NEW)
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signUp(
  prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;

  // Validation
  if (!email || !password || !username) {
    return { error: 'All fields required' };
  }
  if (email.length < 5) return { error: 'Invalid email' };
  if (password.length < 8) return { error: 'Password must be 8+ chars' };
  if (username.length < 3 || username.length > 30) {
    return { error: 'Username must be 3-30 chars' };
  }

  try {
    const supabase = await createClient();

    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return { error: error.message };
    if (!data.user) return { error: 'Signup failed' };

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        username,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        reputation_score: 0,
        debates_won: 0,
        debates_participated: 0,
        delo_rating: 1000, // Initial Elo rating
      });

    if (profileError) {
      // Try to delete auth user if profile creation fails
      await supabase.auth.admin.deleteUser(data.user.id);
      return { error: 'Failed to create profile' };
    }

    // Redirect to login with confirmation
    redirect('/auth/login?registered=true');
  } catch (error: any) {
    return { error: error.message || 'Signup failed' };
  }
}
```

2. Update signup form to use action:
```typescript
// app/auth/signup/page.tsx (MODIFIED)
'use client';

import { useFormState } from 'react-dom';
import { signUp } from '@/app/auth/signup-action';

export default function SignupPage() {
  const [state, formAction] = useFormState(signUp, null);

  return (
    <form action={formAction}>
      <input type="email" name="email" placeholder="email@example.com" required />
      <input type="password" name="password" placeholder="Password (8+ chars)" required />
      <input type="text" name="username" placeholder="Username" required />
      <button type="submit">Sign Up</button>
      {state?.error && <p style={{color: 'red'}}>{state.error}</p>}
    </form>
  );
}
```

**Changes to Database Schema**:
```sql
-- Add delo_rating to profiles (if not exists)
ALTER TABLE profiles ADD COLUMN delo_rating NUMERIC DEFAULT 1000;

-- Add index for leaderboard queries
CREATE INDEX idx_profiles_delo_rating ON profiles(delo_rating DESC);
```

---

### Priority 1.2: Add User Reputation Updates to Judge Endpoint ⚠️ CRITICAL

**Current Issue**: Winner determined but not rewarded

**File**: `/app/api/judge/route.ts` (MODIFY)

**Required Changes**:

```typescript
// app/api/judge/route.ts (UPDATED)
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { judgeDebate } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let debateId = '';
  let userId = '';

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    userId = user.id;

    const body = await request.json();
    const { debateId: id, topic, argumentFor, argumentAgainst } = body;
    debateId = id;

    // Validate
    if (!id || !topic || !argumentFor || !argumentAgainst) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get debate
    const { data: debate } = await supabase
      .from('debates')
      .select('*')
      .eq('id', id)
      .single();

    if (!debate) {
      return NextResponse.json({ error: 'Debate not found' }, { status: 404 });
    }

    // Get AI judgment
    const judgment = await judgeDebate(topic, argumentFor, argumentAgainst);

    // Determine winner
    const winnerId =
      judgment.winner === 'for'
        ? debate.for_participant
        : judgment.winner === 'against'
        ? debate.against_participant
        : null;

    const loserId =
      judgment.winner === 'for'
        ? debate.against_participant
        : judgment.winner === 'against'
        ? debate.for_participant
        : null;

    // Save judgment
    const { error: judgmentError } = await supabase.from('judgments').insert({
      debate_id: id,
      winner_position: judgment.winner,
      reasoning: judgment.reasoning,
      fact_checks: judgment.factChecks,
      scores: judgment.scores,
    });

    if (judgmentError) throw judgmentError;

    // Update debate
    const { error: updateError } = await supabase
      .from('debates')
      .update({
        status: 'completed',
        winner_id: winnerId,
        completed_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) throw updateError;

    // NEW: Update user ratings
    if (winnerId && loserId && judgment.winner !== 'tie') {
      // Get current ratings
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, delo_rating, debates_won, debates_participated')
        .in('id', [winnerId, loserId]);

      const winnerProfile = profiles.find(p => p.id === winnerId);
      const loserProfile = profiles.find(p => p.id === loserId);

      if (winnerProfile && loserProfile) {
        // Calculate Elo rating changes
        const K = 32;
        const expectedWinner = 1 / (1 + Math.pow(10, (loserProfile.delo_rating - winnerProfile.delo_rating) / 400));
        const winnerNewRating = Math.round(winnerProfile.delo_rating + K * (1 - expectedWinner));
        const loserNewRating = Math.round(loserProfile.delo_rating + K * (0 - (1 - expectedWinner)));

        // Update winner
        const { error: winnerUpdateError } = await supabase
          .from('profiles')
          .update({
            delo_rating: winnerNewRating,
            debates_won: winnerProfile.debates_won + 1,
            debates_participated: winnerProfile.debates_participated + 1,
            reputation_score: { increment: 10 },
          })
          .eq('id', winnerId);

        if (winnerUpdateError) throw winnerUpdateError;

        // Update loser
        const { error: loserUpdateError } = await supabase
          .from('profiles')
          .update({
            delo_rating: loserNewRating,
            debates_participated: loserProfile.debates_participated + 1,
            reputation_score: { increment: 5 }, // Participation bonus
          })
          .eq('id', loserId);

        if (loserUpdateError) throw loserUpdateError;
      }
    }

    // Log successful judgment
    console.log(`[JUDGE] Debate ${id} judged in ${Date.now() - startTime}ms`);

    return NextResponse.json({ success: true, judgment });
  } catch (error: any) {
    console.error(`[JUDGE] Error: ${error.message}`, {
      debateId,
      userId,
      duration: Date.now() - startTime,
    });

    return NextResponse.json(
      { error: error.message || 'Failed to judge debate' },
      { status: 500 }
    );
  }
}
```

---

### Priority 1.3: Remove Duplicate signOut ⚠️ LOW IMPACT

**Current Issue**: Two signOut implementations

**Files**:
- `/app/auth/actions.ts` - Keep this one
- `/lib/actions.ts` - DELETE this

**Steps**:
1. Delete `/lib/actions.ts` entirely
2. Update any imports to use `/app/auth/actions.ts`
3. Verify tests still pass

---

### Priority 1.4: Add Input Validation ⚠️ MEDIUM IMPACT

**File**: Create `/lib/validation/debate.ts` (NEW)

```typescript
// lib/validation/debate.ts
export function validateDebateTopic(topic: string): { valid: boolean; error?: string } {
  if (!topic || typeof topic !== 'string') {
    return { valid: false, error: 'Topic is required' };
  }

  const trimmed = topic.trim();

  if (trimmed.length < 5) {
    return { valid: false, error: 'Topic must be at least 5 characters' };
  }

  if (trimmed.length > 200) {
    return { valid: false, error: 'Topic cannot exceed 200 characters' };
  }

  // Check for spam patterns
  if (/^[A-Z\s]{20,}$/.test(trimmed)) {
    return { valid: false, error: 'Topic appears to be spam' };
  }

  return { valid: true };
}

export function validateArgument(content: string): { valid: boolean; error?: string } {
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'Argument is required' };
  }

  const trimmed = content.trim();

  if (trimmed.length < 50) {
    return { valid: false, error: 'Argument must be at least 50 characters' };
  }

  if (trimmed.length > 10000) {
    return { valid: false, error: 'Argument cannot exceed 10,000 characters' };
  }

  return { valid: true };
}
```

**Update Usage** in `/app/(authenticated)/debates/create/page.tsx`:

```typescript
import { validateDebateTopic } from '@/lib/validation/debate';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate on client
  const validation = validateDebateTopic(topic);
  if (!validation.valid) {
    setError(validation.error!);
    return;
  }
  
  // Continue with submission...
};
```

---

## PHASE 2: EXTEND (Parallel Conversation Mode)

### 2.1: New Database Tables for Conversations

**Create migrations**:

```sql
-- New table: conversations (replaces debates for new mode)
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  topic_category VARCHAR(50), -- philosophy, ethics, politics, etc.
  created_by UUID NOT NULL REFERENCES profiles(id),
  status VARCHAR(20) DEFAULT 'active', -- active, closed, archived
  visibility VARCHAR(20) DEFAULT 'public', -- public, private, community
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_conversations_created_by ON conversations(created_by);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);

-- New table: messages (replaces arguments)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  parent_message_id UUID REFERENCES messages(id), -- For threading
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE,
  is_edited BOOLEAN DEFAULT FALSE,
  
  -- AI metadata
  ai_analyzed BOOLEAN DEFAULT FALSE,
  fact_checks JSONB,
  fallacies JSONB
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_author_id ON messages(author_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- New table: conversation_participants
CREATE TABLE conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_read_at TIMESTAMP WITH TIME ZONE,
  role VARCHAR(20) DEFAULT 'participant', -- creator, moderator, participant
  is_active BOOLEAN DEFAULT TRUE,
  
  UNIQUE(conversation_id, user_id)
);

-- Table: conversation_summaries (AI-generated)
CREATE TABLE conversation_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id),
  summary_text TEXT,
  consensus_areas JSONB,
  disagreement_areas JSONB,
  key_questions JSONB,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  generated_by_version VARCHAR(20) -- Track which AI model generated
);

CREATE INDEX idx_conversation_summaries_conversation_id ON conversation_summaries(conversation_id);
```

---

### 2.2: New API Endpoints for Conversations

**Endpoint Structure**:

```
POST   /api/conversations              - Create conversation
GET    /api/conversations              - List conversations
GET    /api/conversations/:id          - Get conversation
PATCH  /api/conversations/:id          - Update conversation
DELETE /api/conversations/:id          - Close/delete conversation

POST   /api/conversations/:id/messages - Add message
GET    /api/conversations/:id/messages - List messages
PATCH  /api/messages/:id               - Edit message
DELETE /api/messages/:id               - Delete message

POST   /api/conversations/:id/join     - Join conversation
POST   /api/conversations/:id/leave    - Leave conversation

POST   /api/conversations/:id/summarize - Generate summary
GET    /api/conversations/:id/summary   - Get latest summary
```

**Implementation Example**:

```typescript
// app/api/conversations/route.ts (NEW)
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, topic_category } = body;

    // Validate
    if (!title || title.trim().length < 5) {
      return NextResponse.json(
        { error: 'Title must be at least 5 characters' },
        { status: 400 }
      );
    }

    // Create conversation
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        title,
        description: description || null,
        topic_category: topic_category || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Add creator as participant
    const { error: participantError } = await supabase
      .from('conversation_participants')
      .insert({
        conversation_id: data.id,
        user_id: user.id,
        role: 'creator',
      });

    if (participantError) throw participantError;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Get user's conversations
    const { data, count, error } = await supabase
      .from('conversation_participants')
      .select(
        `
        conversations(
          id,
          title,
          description,
          created_by,
          status,
          created_at,
          creator:created_by(username, display_name)
        )
        `,
        { count: 'exact' }
      )
      .eq('user_id', user.id)
      .order('joined_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({
      conversations: data?.map(p => p.conversations) || [],
      total: count || 0,
      page,
      limit,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## PHASE 3: INTEGRATE AI FOR CONVERSATIONS

### 3.1: Real-Time Message Analysis

**Endpoint**: `POST /api/conversations/:id/messages`

```typescript
// Pseudo-code for message flow with AI
export async function POST(request: NextRequest) {
  const message = await request.json();
  
  // 1. Save message to database
  const { data: savedMessage } = await saveMessage(message);
  
  // 2. Kick off AI analysis (non-blocking)
  analyzeMessageAsync(savedMessage.id);
  
  // 3. Return message immediately
  return NextResponse.json(savedMessage);
}

async function analyzeMessageAsync(messageId: string) {
  try {
    // Get message + context
    const message = await getMessageWithContext(messageId);
    
    // Run in background: fact-check, fallacy detection, etc.
    const analysis = await geminiAnalyzeMessage(message);
    
    // Save analysis results
    await updateMessage(messageId, {
      ai_analyzed: true,
      fact_checks: analysis.factChecks,
      fallacies: analysis.fallacies,
    });
    
    // Notify user via real-time channel
    await supabase
      .channel(`message:${messageId}`)
      .send('broadcast', {
        event: 'analysis_complete',
        data: analysis,
      });
  } catch (error) {
    console.error('Message analysis failed:', error);
  }
}
```

### 3.2: Fact-Checking Endpoint

**Endpoint**: `POST /api/analyze/fact-check` (NEW)

```typescript
export async function POST(request: NextRequest) {
  const { claims, context } = await request.json();

  // Call Gemini to fact-check claims
  const result = await geminiFactCheck(claims, context);

  return NextResponse.json(result);
}
```

### 3.3: Conversation Summarization

**Endpoint**: `POST /api/conversations/:id/summarize` (NEW)

```typescript
export async function POST(request: NextRequest) {
  const { conversationId } = await request.json();

  // Get all messages in conversation
  const messages = await getConversationMessages(conversationId);

  // Call Gemini to synthesize
  const summary = await geminiSummarize(messages);

  // Save summary
  const { data } = await supabase
    .from('conversation_summaries')
    .insert({
      conversation_id: conversationId,
      summary_text: summary.text,
      consensus_areas: summary.consensus,
      disagreement_areas: summary.disagreement,
      key_questions: summary.questions,
    })
    .select()
    .single();

  return NextResponse.json(data);
}
```

---

## PHASE 4: MIGRATE TO CONVERSATION-FIRST

### 4.1: Sunsetting Debate Mode

**Timeline**: 3-6 months after Phase 3

**Steps**:
1. Announce deprecation (2 weeks notice)
2. Hide debate creation UI (debates read-only)
3. Redirect `/debates` → `/conversations`
4. Archive old debates as read-only
5. Migrate debate data to conversation format (optional)
6. Eventually delete debate tables

**Migration Script Example**:

```sql
-- Archive old debates as conversations
INSERT INTO conversations (id, title, description, created_by, created_at)
SELECT 
  id,
  'Debate: ' || topic,
  description,
  created_by,
  created_at
FROM debates
WHERE status = 'completed'
ORDER BY created_at DESC;

-- Migrate arguments to messages
INSERT INTO messages (conversation_id, author_id, content, created_at)
SELECT 
  debates.id AS conversation_id,
  arguments.user_id,
  arguments.content,
  arguments.created_at
FROM arguments
JOIN debates ON arguments.debate_id = debates.id
ORDER BY arguments.created_at;
```

---

## VISION ALIGNMENT SUMMARY

### What to Keep ✅
- Supabase authentication (works well)
- Gemini AI (good quality, low cost)
- Next.js 15 framework (modern, performant)
- Server components pattern (efficient SSR)

### What to Remove ❌
- Debate for/against binary structure
- Judgment as core feature (too opinionated)
- Single-shot argument model
- Elo rating system (convert to participation-based)

### What to Add ➕
- Threaded conversations
- Real-time messaging
- AI discussion facilitation
- Community features
- Search and discovery
- Moderation tools
- Reputation via participation quality

---

## IMPLEMENTATION TIMELINE

| Phase | Duration | Key Deliverables | Status |
|-------|----------|------------------|--------|
| 1: Preserve | 1 week | Signup, reputation updates, validation | URGENT |
| 2: Extend | 2 weeks | Conversation tables, core endpoints | HIGH |
| 3: AI Integrate | 1 week | Fact-check, analysis, summaries | MEDIUM |
| 4: Migrate | 1 month | Sunset debates, full migration | LATER |

**Estimated Total**: 5-6 weeks to full conversation-first platform

---

## RISK MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss during migration | Low | Critical | Backup before migration, dry-run |
| Users confused by changes | Medium | High | Clear communication, gradual rollout |
| AI costs increase | Medium | Medium | Rate limiting, caching, model optimization |
| Performance degradation | Low | High | Load testing, database optimization |

---

## SUCCESS METRICS

**Phase 1**: 
- Signup works, users can complete debates
- Leaderboard shows accurate ratings
- 100% test coverage for APIs

**Phase 2**:
- 50+ conversations created
- 0 errors in conversation endpoints
- <200ms response time

**Phase 3**:
- Real-time fact-check working
- 90% of messages analyzed
- <$100/month AI costs

**Phase 4**:
- 100% active users migrated
- Debates marked as historical
- Conversation features fully adopted

