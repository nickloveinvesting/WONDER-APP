# Technical Implementation Plan
## Philosophy App Transformation Roadmap

**Generated:** November 15, 2025
**Agent:** Agent 5 - Technical Implementation Plan
**Project:** Philosophy App (Debate → Conversation Platform)
**Timeline:** 16-20 weeks (4-5 months)
**Estimated Effort:** 380-550 person-hours

---

## Executive Summary

This document provides a complete technical roadmap for transforming the Philosophy App from a competitive debate platform to a conversation-first philosophical discussion platform. The transformation includes branding updates, feature development, database migrations, and iOS deployment.

### Key Transformation Goals

1. **Rebrand:** Debates → Conversations, Arguments → Contributions
2. **Database:** Migrate schema from binary debate model to multi-perspective conversations
3. **Features:** Add search, topics, user profiles, threading
4. **Mobile:** Deploy to iOS App Store via Capacitor
5. **AI:** Transform AI from judge to facilitator/synthesizer

### Success Metrics

- **Completion:** All phases delivered on schedule
- **Quality:** Zero data loss during migrations
- **Performance:** < 200ms API response times maintained
- **User Experience:** Smooth transition with minimal disruption
- **iOS Deployment:** Successful App Store approval

---

## Table of Contents

1. [Phase 0: Foundation & Cleanup](#phase-0-foundation--cleanup-weeks-1-2)
2. [Phase 1: Core Conversations](#phase-1-core-conversations-weeks-3-6)
3. [Phase 2: Community Features](#phase-2-community-features-weeks-7-10)
4. [Phase 3: Advanced Features](#phase-3-advanced-features-weeks-11-14)
5. [Phase 4: iOS Deployment](#phase-4-ios-deployment-weeks-15-16)
6. [Codebase Changes Inventory](#codebase-changes-inventory)
7. [Database Migrations](#database-migrations)
8. [Component Library](#component-library-specifications)
9. [Dependencies & Tools](#dependencies--tools)
10. [Risk Mitigation](#risk-mitigation)

---

## Phase 0: Foundation & Cleanup (Weeks 1-2)

**Goal:** Fix critical bugs, update branding, establish foundation
**Effort:** 60-80 hours
**Risk:** LOW

### 0.1 Critical Bug Fixes

#### Fix Signup Flow (CRITICAL)
**Current State:** Signup form exists but backend not connected
**Impact:** New users cannot register
**Files:**
- `/home/user/Philosophy-app/app/auth/signup/page.tsx` (modify)
- `/home/user/Philosophy-app/app/auth/signup-action.ts` (create)

**Implementation:**

```typescript
// File: app/auth/signup-action.ts (NEW)
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
  if (password.length < 8) {
    return { error: 'Password must be 8+ characters' };
  }
  if (username.length < 3 || username.length > 30) {
    return { error: 'Username must be 3-30 characters' };
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
        delo_rating: 1000,
      });

    if (profileError) {
      return { error: 'Failed to create profile' };
    }

    redirect('/auth/login?registered=true');
  } catch (error: any) {
    return { error: error.message || 'Signup failed' };
  }
}
```

**Database Changes:**
```sql
-- Add delo_rating if missing
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS delo_rating NUMERIC DEFAULT 1000;

-- Add index for leaderboard
CREATE INDEX IF NOT EXISTS idx_profiles_delo_rating ON profiles(delo_rating DESC);
```

**Effort:** 6-8 hours
**Priority:** P0 (CRITICAL)

---

#### Add Reputation Updates to Judge Endpoint
**Current State:** AI judges debates but doesn't update user stats
**Impact:** Leaderboard broken, no gamification
**Files:**
- `/home/user/Philosophy-app/app/api/judge/route.ts` (modify)

**Implementation:**
Add Elo calculation and update profile stats after judgment.

**Effort:** 8-10 hours
**Priority:** P0 (CRITICAL)

---

### 0.2 Branding Updates

#### Update App Name
**Changes:**
- PhiloDuel → ARGUED (or chosen name)
- All metadata, titles, headers

**Files to modify:**
```
/home/user/Philosophy-app/app/layout.tsx (metadata)
/home/user/Philosophy-app/components/ui/Logo.tsx (alt text)
/home/user/Philosophy-app/components/ui/Sidebar.tsx (branding)
/home/user/Philosophy-app/README.md (documentation)
/home/user/Philosophy-app/DEPLOYMENT.md (documentation)
/home/user/Philosophy-app/preview/*.html (landing pages)
```

**Find/Replace Map:**
```
Find: "PhiloDuel"
Replace: "ARGUED" (or new name)
Scope: All files except /research/*
Count: ~50 occurrences
```

**Effort:** 4-6 hours
**Priority:** P1 (HIGH)

---

#### Rename Rating System Display
**Changes:**
- DeLO → Insight Score (UI labels only)
- Database column stays `delo_rating` (alias in queries)

**Files to modify:**
```
/home/user/Philosophy-app/components/ui/LeaderboardRow.tsx
/home/user/Philosophy-app/components/ui/Sidebar.tsx
/home/user/Philosophy-app/components/templates/DashboardTemplate.tsx
/home/user/Philosophy-app/app/(authenticated)/profile/page.tsx
/home/user/Philosophy-app/app/(authenticated)/leaderboard/page.tsx
```

**Example Change:**
```typescript
// OLD
<span>DeLO: {user.delo_rating}</span>

// NEW
<span>Insight Score: {user.delo_rating}</span>
```

**Effort:** 6-8 hours
**Priority:** P1 (HIGH)

---

#### Update Color Palette
**Current:** Debate-specific colors (navy, brown, cream)
**New:** Keep ARGUED colors or create new conversation-themed palette

**Files to modify:**
```
/home/user/Philosophy-app/tailwind.config.ts (color definitions)
/home/user/Philosophy-app/app/globals.css (CSS variables)
```

**Current ARGUED Colors:**
```typescript
// tailwind.config.ts
colors: {
  argued: {
    navy: '#1A365D',
    cream: '#FFF8DC',
    brown: '#6B4423',
    gold: '#D4AF37',
  }
}
```

**Recommendation:** Keep ARGUED colors (already conversation-friendly)

**Effort:** 2-4 hours
**Priority:** P2 (MEDIUM)

---

### 0.3 Code Cleanup

#### Remove Duplicate signOut Implementation
**Files:**
- Keep: `/home/user/Philosophy-app/app/auth/actions.ts`
- Delete: `/home/user/Philosophy-app/lib/actions.ts`

**Effort:** 1 hour
**Priority:** P2 (MEDIUM)

---

#### Add Input Validation
**Create:**
```
/home/user/Philosophy-app/lib/validation/debate.ts (NEW)
/home/user/Philosophy-app/lib/validation/conversation.ts (NEW for Phase 1)
```

**Functions:**
- validateDebateTopic()
- validateArgument()
- validateConversationTitle()
- validateMessage()

**Effort:** 4-6 hours
**Priority:** P2 (MEDIUM)

---

### Phase 0 Deliverables

- ✅ Signup flow working
- ✅ Reputation updates functional
- ✅ Brand name updated throughout
- ✅ UI labels reframed (DeLO → Insight Score)
- ✅ Code cleanup complete
- ✅ Input validation added

**Total Effort:** 60-80 hours
**Timeline:** Weeks 1-2

---

## Phase 1: Core Conversations (Weeks 3-6)

**Goal:** Build conversation-first features alongside existing debate system
**Effort:** 120-150 hours
**Risk:** MEDIUM

### 1.1 Database Schema - New Tables

#### Create Conversations Table
**Purpose:** Replace/extend debates table for multi-party discussions

**Migration File:** `/home/user/Philosophy-app/supabase/migrations/20250201_create_conversations.sql`

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Core metadata
  title TEXT NOT NULL,
  description TEXT,

  -- Organization
  topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
  topic_tags TEXT[] DEFAULT '{}',

  -- Status lifecycle
  status TEXT DEFAULT 'active' CHECK (status IN (
    'draft', 'active', 'featured', 'archived', 'locked', 'deleted'
  )),

  -- Conversation type
  conversation_type TEXT DEFAULT 'open_discussion' CHECK (conversation_type IN (
    'open_discussion',
    'moderated_dialogue',
    'socratic_dialogue',
    'case_study',
    'reading_group',
    'expert_ama'
  )),

  -- Participants
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  moderator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Engagement tracking
  perspectives_count INTEGER DEFAULT 0,
  messages_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,

  -- Lifecycle dates
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  featured_until TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX idx_conversations_creator_id ON conversations(creator_id);
CREATE INDEX idx_conversations_topic_id ON conversations(topic_id);
CREATE INDEX idx_conversations_topic_tags ON conversations USING GIN(topic_tags);
CREATE INDEX idx_conversations_featured_until ON conversations(featured_until DESC);

-- RLS Policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active conversations are public"
  ON conversations FOR SELECT
  USING (status = 'active' OR status = 'featured' OR status = 'archived');

CREATE POLICY "Draft conversations only visible to creators/mods"
  ON conversations FOR SELECT
  USING (
    status != 'draft' OR
    auth.uid() = creator_id OR
    auth.uid() = moderator_id
  );

CREATE POLICY "Authenticated users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators and moderators can update conversations"
  ON conversations FOR UPDATE
  USING (
    auth.uid() = creator_id OR
    auth.uid() = moderator_id
  );
```

**Effort:** 8-10 hours
**Priority:** P0 (CRITICAL)

---

#### Create Conversation Messages Table
**Purpose:** Replace arguments table

**Migration File:** `/home/user/Philosophy-app/supabase/migrations/20250201_create_messages.sql`

```sql
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_message_id UUID REFERENCES conversation_messages(id) ON DELETE SET NULL,

  -- Content
  content TEXT NOT NULL,

  -- Perspective metadata
  perspective_type TEXT CHECK (
    perspective_type IS NULL OR perspective_type IN (
      'supporting', 'critical', 'alternative', 'synthesis',
      'question', 'empirical', 'philosophical', 'personal_experience'
    )
  ),

  -- Flags
  is_key_point BOOLEAN DEFAULT FALSE,
  is_revised BOOLEAN DEFAULT FALSE,

  -- Engagement
  reply_count INTEGER DEFAULT 0,
  quality_score DECIMAL DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_conversation_messages_conversation_id
  ON conversation_messages(conversation_id);
CREATE INDEX idx_conversation_messages_user_id
  ON conversation_messages(user_id);
CREATE INDEX idx_conversation_messages_parent_id
  ON conversation_messages(parent_message_id);
CREATE INDEX idx_conversation_messages_created_at
  ON conversation_messages(created_at DESC);
CREATE INDEX idx_conversation_messages_key_point
  ON conversation_messages(is_key_point) WHERE is_key_point = TRUE;

-- RLS Policies
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Messages in public conversations are visible"
  ON conversation_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = conversation_messages.conversation_id
      AND c.status IN ('active', 'featured', 'archived')
    )
  );

CREATE POLICY "Users can create messages"
  ON conversation_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can edit their own messages"
  ON conversation_messages FOR UPDATE
  USING (auth.uid() = user_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = user_id);
```

**Effort:** 8-10 hours
**Priority:** P0 (CRITICAL)

---

#### Create Topics Table
**Purpose:** Organize conversations by philosophical category

**Migration File:** `/home/user/Philosophy-app/supabase/migrations/20250201_create_topics.sql`

```sql
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Topic metadata
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,

  -- Organization
  parent_id UUID REFERENCES topics(id) ON DELETE SET NULL,

  -- Engagement
  conversation_count INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,

  -- Configuration
  is_featured BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_topics_slug ON topics(slug);
CREATE INDEX idx_topics_parent_id ON topics(parent_id);
CREATE INDEX idx_topics_is_featured ON topics(is_featured);

-- Insert default topics
INSERT INTO topics (name, slug, description) VALUES
('Metaphysics', 'metaphysics', 'Study of reality and existence'),
('Ethics', 'ethics', 'Study of right and wrong'),
('Epistemology', 'epistemology', 'Study of knowledge and belief'),
('Logic', 'logic', 'Study of reasoning and argumentation'),
('Aesthetics', 'aesthetics', 'Study of beauty and art'),
('Philosophy of Mind', 'philosophy-of-mind', 'Study of consciousness and mentality'),
('Social Philosophy', 'social-philosophy', 'Study of society and justice'),
('Political Philosophy', 'political-philosophy', 'Study of governance and power'),
('Philosophy of Science', 'philosophy-of-science', 'Study of science and knowledge'),
('Applied Ethics', 'applied-ethics', 'Practical ethical questions')
ON CONFLICT DO NOTHING;

-- RLS Policies
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Topics are public"
  ON topics FOR SELECT
  USING (true);
```

**Effort:** 4-6 hours
**Priority:** P1 (HIGH)

---

#### Create Supporting Tables

**Conversation Participants:**
```sql
CREATE TABLE conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message_count INTEGER DEFAULT 0,
  perspective_type TEXT,
  last_message_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(conversation_id, user_id)
);

CREATE INDEX idx_conversation_participants_conversation_id
  ON conversation_participants(conversation_id);
CREATE INDEX idx_conversation_participants_user_id
  ON conversation_participants(user_id);
```

**Message Feedback (replaces judgments):**
```sql
CREATE TABLE message_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES conversation_messages(id) ON DELETE CASCADE,
  rater_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Multi-dimensional feedback
  thought_provoking BOOLEAN,
  well_reasoned BOOLEAN,
  clearly_explained BOOLEAN,
  includes_evidence BOOLEAN,
  opens_new_perspective BOOLEAN,

  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(message_id, rater_id)
);

CREATE INDEX idx_message_feedback_message_id ON message_feedback(message_id);
CREATE INDEX idx_message_feedback_rater_id ON message_feedback(rater_id);
```

**User Preferences:**
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,

  -- Notification preferences
  notify_on_replies BOOLEAN DEFAULT TRUE,
  notify_on_featured_conversations BOOLEAN DEFAULT TRUE,
  notify_on_new_perspectives BOOLEAN DEFAULT TRUE,
  notify_on_moderator_messages BOOLEAN DEFAULT TRUE,

  -- Privacy preferences
  show_activity_status BOOLEAN DEFAULT TRUE,
  show_message_timestamps BOOLEAN DEFAULT TRUE,
  allow_message_notifications BOOLEAN DEFAULT TRUE,

  -- Content preferences
  hide_mature_content BOOLEAN DEFAULT FALSE,
  preferred_language TEXT DEFAULT 'en',

  -- Display preferences
  theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
  messages_per_page INTEGER DEFAULT 20,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Effort:** 10-12 hours
**Priority:** P1 (HIGH)

---

### 1.2 API Routes - Conversations

#### Create Conversation Endpoints

**File:** `/home/user/Philosophy-app/app/api/conversations/route.ts` (NEW)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST /api/conversations - Create conversation
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, topic_id, topic_tags } = body;

    if (!title || title.trim().length < 5) {
      return NextResponse.json(
        { error: 'Title must be at least 5 characters' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        title,
        description: description || null,
        topic_id: topic_id || null,
        topic_tags: topic_tags || [],
        creator_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Add creator as participant
    await supabase.from('conversation_participants').insert({
      conversation_id: data.id,
      user_id: user.id,
      role: 'creator',
    });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create conversation' },
      { status: 500 }
    );
  }
}

// GET /api/conversations - List conversations
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

    const { data, count, error } = await supabase
      .from('conversations')
      .select('*, creator:creator_id(username, display_name)', { count: 'exact' })
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({
      conversations: data || [],
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

**Similar endpoints needed:**
- `/home/user/Philosophy-app/app/api/conversations/[id]/route.ts` (GET, PATCH, DELETE)
- `/home/user/Philosophy-app/app/api/conversations/[id]/messages/route.ts` (GET, POST)
- `/home/user/Philosophy-app/app/api/messages/[id]/route.ts` (PATCH, DELETE)

**Effort:** 20-25 hours
**Priority:** P0 (CRITICAL)

---

### 1.3 UI Components - Conversations

#### ConversationCard Component

**File:** `/home/user/Philosophy-app/components/ui/ConversationCard.tsx` (NEW)

```typescript
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface ConversationCardProps {
  id: string;
  title: string;
  preview?: string;
  participantCount: number;
  perspectiveCount?: number;
  lastActivityAt: Date;
  status: 'active' | 'archived' | 'draft';
  featured?: boolean;
}

export function ConversationCard({
  id,
  title,
  preview,
  participantCount,
  perspectiveCount,
  lastActivityAt,
  status,
  featured,
}: ConversationCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <Link href={`/conversations/${id}`}>
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold text-argued-navy line-clamp-2">
              {title}
            </h3>
            {featured && <Badge variant="gold">Featured</Badge>}
          </div>

          {preview && (
            <p className="text-sm text-gray-600 line-clamp-2">{preview}</p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{participantCount} participants</span>
            {perspectiveCount && (
              <span>{perspectiveCount} perspectives</span>
            )}
            <span>{formatRelativeTime(lastActivityAt)}</span>
          </div>

          <Badge variant={status === 'active' ? 'green' : 'gray'}>
            {status}
          </Badge>
        </div>
      </Link>
    </Card>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
```

**Similar components needed:**
- MessageThread
- ConversationHeader
- ParticipantList
- PerspectiveTag
- TopicCard

**Effort:** 25-30 hours
**Priority:** P0 (CRITICAL)

---

### 1.4 Pages - Conversation Views

#### Conversations List Page

**File:** `/home/user/Philosophy-app/app/(authenticated)/conversations/page.tsx` (NEW)

```typescript
import { createClient } from '@/lib/supabase/server';
import { ConversationCard } from '@/components/ui/ConversationCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function ConversationsPage() {
  const supabase = await createClient();

  const { data: conversations } = await supabase
    .from('conversations')
    .select('*, creator:creator_id(username)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Active Conversations</h1>
        <Link href="/conversations/create">
          <Button>Start Conversation</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conversations?.map((conv) => (
          <ConversationCard
            key={conv.id}
            id={conv.id}
            title={conv.title}
            preview={conv.description}
            participantCount={conv.perspectives_count || 0}
            lastActivityAt={new Date(conv.updated_at)}
            status={conv.status}
            featured={conv.featured}
          />
        ))}
      </div>
    </div>
  );
}
```

**Similar pages needed:**
- `/home/user/Philosophy-app/app/(authenticated)/conversations/[id]/page.tsx` (detail)
- `/home/user/Philosophy-app/app/(authenticated)/conversations/create/page.tsx` (create)

**Effort:** 15-20 hours
**Priority:** P0 (CRITICAL)

---

### Phase 1 Deliverables

- ✅ New conversation tables created
- ✅ Topics system implemented
- ✅ Conversation CRUD APIs working
- ✅ Message APIs functional
- ✅ Conversation list page live
- ✅ Conversation detail page working
- ✅ Create conversation flow functional
- ✅ Basic components library built

**Total Effort:** 120-150 hours
**Timeline:** Weeks 3-6

---

## Phase 2: Community Features (Weeks 7-10)

**Goal:** Add search, user profiles, following system
**Effort:** 100-130 hours
**Risk:** MEDIUM

### 2.1 Search & Discovery

#### Full-Text Search Implementation

**Database:**
```sql
-- Add full-text search indexes
CREATE INDEX idx_conversations_search
  ON conversations USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));

CREATE INDEX idx_messages_search
  ON conversation_messages USING GIN(to_tsvector('english', content));
```

**API Endpoint:** `/home/user/Philosophy-app/app/api/search/route.ts` (NEW)

```typescript
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const type = url.searchParams.get('type') || 'all'; // all, conversations, messages, users

  const supabase = await createClient();

  if (type === 'conversations' || type === 'all') {
    const { data: conversations } = await supabase
      .from('conversations')
      .select('*')
      .textSearch('title', query)
      .limit(20);

    // Return results
  }

  // Similar for messages and users
}
```

**UI Component:** `/home/user/Philosophy-app/components/ui/SearchBar.tsx` (NEW)

**Effort:** 12-15 hours
**Priority:** P0 (CRITICAL)

---

#### Topic Filtering

**Files:**
- `/home/user/Philosophy-app/components/ui/TopicFilter.tsx` (NEW)
- `/home/user/Philosophy-app/app/api/topics/route.ts` (NEW)

**Effort:** 8-10 hours
**Priority:** P1 (HIGH)

---

### 2.2 User Profile System

#### Public User Profiles

**Database:**
```sql
-- Add fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS display_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS expertise_areas TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS learning_interests TEXT[] DEFAULT '{}';
```

**Page:** `/home/user/Philosophy-app/app/(authenticated)/users/[username]/page.tsx` (NEW)

```typescript
export default async function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single();

  // Get user's conversations
  const { data: conversations } = await supabase
    .from('conversation_participants')
    .select('conversations(*)')
    .eq('user_id', profile.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfileCard profile={profile} />
      <UserConversations conversations={conversations} />
    </div>
  );
}
```

**Components:**
- `/home/user/Philosophy-app/components/ui/UserProfileCard.tsx` (NEW)
- `/home/user/Philosophy-app/components/ui/UserConversations.tsx` (NEW)

**Effort:** 15-20 hours
**Priority:** P1 (HIGH)

---

#### Profile Editing

**Page:** `/home/user/Philosophy-app/app/(authenticated)/settings/profile/page.tsx` (NEW)

**API:** `/home/user/Philosophy-app/app/api/profile/route.ts` (NEW)

**Effort:** 10-12 hours
**Priority:** P1 (HIGH)

---

### 2.3 Following System

#### Database Tables

```sql
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
```

**APIs:**
- `/home/user/Philosophy-app/app/api/users/[id]/follow/route.ts` (POST, DELETE)
- `/home/user/Philosophy-app/app/api/users/[id]/followers/route.ts` (GET)
- `/home/user/Philosophy-app/app/api/users/[id]/following/route.ts` (GET)

**Effort:** 12-15 hours
**Priority:** P2 (MEDIUM)

---

### 2.4 Notification System

#### Database

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  related_conversation_id UUID REFERENCES conversations(id),
  related_message_id UUID REFERENCES conversation_messages(id),
  related_user_id UUID REFERENCES profiles(id),
  content TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

**API:** `/home/user/Philosophy-app/app/api/notifications/route.ts` (NEW)

**Page:** `/home/user/Philosophy-app/app/(authenticated)/notifications/page.tsx` (NEW)

**Effort:** 15-18 hours
**Priority:** P2 (MEDIUM)

---

### 2.5 Settings Backend Connection

**Current State:** Settings UI exists but doesn't save
**Fix:** Connect to user_preferences table

**File:** `/home/user/Philosophy-app/app/api/settings/route.ts` (NEW)

```typescript
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const { error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: user.id,
      ...body,
      updated_at: new Date().toISOString(),
    });

  if (error) throw error;

  return NextResponse.json({ success: true });
}
```

**Effort:** 8-10 hours
**Priority:** P2 (MEDIUM)

---

### Phase 2 Deliverables

- ✅ Search working (conversations, messages, users)
- ✅ Topic filtering functional
- ✅ Public user profiles viewable
- ✅ Profile editing working
- ✅ Following/follower system live
- ✅ Notifications system functional
- ✅ Settings saving properly

**Total Effort:** 100-130 hours
**Timeline:** Weeks 7-10

---

## Phase 3: Advanced Features (Weeks 11-14)

**Goal:** AI transformation, database migration, advanced UX
**Effort:** 140-180 hours
**Risk:** HIGH

### 3.1 Database Migration - Core Tables

**THIS IS THE CRITICAL HIGH-RISK PHASE**

#### Migration Strategy

**Approach:** Big-bang migration with extensive testing

**Timeline:**
- Week 11: Create migrations, test on local
- Week 12: Deploy to staging, validate
- Week 13: Code updates, testing
- Week 14: Production migration, monitoring

---

#### Rename debates → discussions

**Migration File:** `/home/user/Philosophy-app/supabase/migrations/20250301_rename_debates.sql`

```sql
-- Backup old data
CREATE TABLE debates_backup AS SELECT * FROM debates;

-- Rename table
ALTER TABLE debates RENAME TO discussions;

-- Rename columns
ALTER TABLE discussions RENAME COLUMN for_participant TO participant_a;
ALTER TABLE discussions RENAME COLUMN against_participant TO participant_b;
ALTER TABLE discussions RENAME COLUMN winner_id TO top_contributor_id;

-- Update constraints
ALTER TABLE discussions
  DROP CONSTRAINT IF EXISTS debates_status_check;

ALTER TABLE discussions
  ADD CONSTRAINT discussions_status_check
  CHECK (status IN ('open', 'active', 'completed', 'archived'));

-- Regenerate types
-- Run: npm run generate-types
```

**Code Changes:**
- Update all `.from('debates')` → `.from('discussions')`
- Update TypeScript types
- Update component imports

**Affected Files:** ~20 files
- All API routes referencing debates
- All components querying debates
- Database types file

**Effort:** 25-30 hours
**Priority:** P0 (CRITICAL)
**Risk:** CRITICAL

---

#### Rename arguments → contributions

**Migration File:** `/home/user/Philosophy-app/supabase/migrations/20250301_rename_arguments.sql`

```sql
-- Backup
CREATE TABLE arguments_backup AS SELECT * FROM arguments;

-- Rename
ALTER TABLE arguments RENAME TO contributions;
ALTER TABLE contributions RENAME COLUMN debate_id TO discussion_id;
ALTER TABLE contributions RENAME COLUMN position TO contribution_type;

-- Update foreign keys
ALTER TABLE contributions
  DROP CONSTRAINT IF EXISTS arguments_debate_id_fkey;

ALTER TABLE contributions
  ADD CONSTRAINT contributions_discussion_id_fkey
  FOREIGN KEY (discussion_id) REFERENCES discussions(id) ON DELETE CASCADE;
```

**Effort:** 20-25 hours
**Priority:** P0 (CRITICAL)
**Risk:** CRITICAL

---

#### Update profiles table

**Migration File:** `/home/user/Philosophy-app/supabase/migrations/20250301_update_profiles.sql`

```sql
-- Rename columns
ALTER TABLE profiles RENAME COLUMN debates_won TO discussions_participated;
ALTER TABLE profiles RENAME COLUMN delo_rating TO insight_score;

-- Add new columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_messages INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS conversations_initiated INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS conversations_participated_in INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ DEFAULT NOW();

-- Backfill data
UPDATE profiles p
SET
  conversations_initiated = (
    SELECT COUNT(*) FROM discussions WHERE creator_id = p.id
  ),
  conversations_participated_in = (
    SELECT COUNT(DISTINCT discussion_id)
    FROM contributions
    WHERE user_id = p.id
  ),
  total_messages = (
    SELECT COUNT(*) FROM contributions WHERE user_id = p.id
  );
```

**Effort:** 15-18 hours
**Priority:** P0 (CRITICAL)
**Risk:** HIGH

---

#### Remove judgments table

**Migration File:** `/home/user/Philosophy-app/supabase/migrations/20250301_remove_judgments.sql`

```sql
-- Archive first
CREATE TABLE judgments_archive AS SELECT * FROM judgments;

-- Drop table
DROP TABLE IF EXISTS judgments;
```

**Effort:** 4-6 hours
**Priority:** P1 (HIGH)
**Risk:** LOW (deprecated feature)

---

### 3.2 AI Transformation

#### Migrate /api/judge to Supabase Edge Function

**Why:** Static export for Capacitor requires no Next.js API routes

**Create Edge Function:** `/home/user/Philosophy-app/supabase/functions/evaluate-discussion/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { discussionId, topic, messages } = await req.json();

    // Call Gemini AI for synthesis (not judgment)
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const synthesis = await synthesizeDiscussion(topic, messages, GEMINI_API_KEY);

    // Save synthesis to database
    const { error: saveError } = await supabase
      .from('discussion_syntheses')
      .insert({
        discussion_id: discussionId,
        synthesis_text: synthesis.text,
        consensus_areas: synthesis.consensus,
        disagreement_areas: synthesis.disagreement,
        key_questions: synthesis.questions,
      });

    if (saveError) throw saveError;

    return new Response(
      JSON.stringify({ success: true, synthesis }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error evaluating discussion:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to evaluate discussion',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
})

async function synthesizeDiscussion(topic: string, messages: any[], apiKey: string) {
  // Call Gemini to synthesize discussion
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a philosophical discussion facilitator. Analyze this conversation and provide a synthesis.

Topic: ${topic}

Messages:
${messages.map(m => `- ${m.author}: ${m.content}`).join('\n')}

Provide synthesis in JSON format with:
1. text: comprehensive summary
2. consensus: areas of agreement
3. disagreement: areas of disagreement
4. questions: key questions raised

Return ONLY valid JSON.`
          }]
        }],
      }),
    }
  );

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  return JSON.parse(jsonMatch[0]);
}
```

**Deploy:**
```bash
supabase secrets set GEMINI_API_KEY=your_key_here
supabase functions deploy evaluate-discussion
```

**Update Client:**
```typescript
// OLD
const response = await fetch('/api/judge', { ... });

// NEW
const supabase = createClient();
const { data, error } = await supabase.functions.invoke('evaluate-discussion', {
  body: { discussionId, topic, messages },
});
```

**Effort:** 18-22 hours
**Priority:** P0 (CRITICAL)
**Risk:** MEDIUM

---

### 3.3 Threading & Nested Replies

**Database:** Already supports via `parent_message_id`

**UI Component:** `/home/user/Philosophy-app/components/ui/ThreadedMessages.tsx` (NEW)

```typescript
'use client';

interface Message {
  id: string;
  content: string;
  author: { username: string; avatar?: string };
  created_at: string;
  replies?: Message[];
}

export function ThreadedMessages({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} depth={0} />
      ))}
    </div>
  );
}

function MessageItem({ message, depth }: { message: Message; depth: number }) {
  return (
    <div
      className="border-l-2 border-gray-200 pl-4"
      style={{ marginLeft: `${depth * 24}px` }}
    >
      <div className="flex items-start gap-3">
        <img
          src={message.author.avatar || '/default-avatar.png'}
          alt={message.author.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{message.author.username}</span>
            <span className="text-xs text-gray-500">
              {formatRelativeTime(new Date(message.created_at))}
            </span>
          </div>
          <p className="mt-1 text-gray-700">{message.content}</p>
          <button className="mt-2 text-sm text-argued-navy">Reply</button>
        </div>
      </div>

      {message.replies && message.replies.length > 0 && (
        <div className="mt-4">
          {message.replies.map((reply) => (
            <MessageItem key={reply.id} message={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
```

**Effort:** 15-18 hours
**Priority:** P1 (HIGH)

---

### Phase 3 Deliverables

- ✅ Database fully migrated (debates → discussions, arguments → contributions)
- ✅ All code updated for new schema
- ✅ AI transformed to Edge Function
- ✅ No data loss
- ✅ Threading working
- ✅ All tests passing

**Total Effort:** 140-180 hours
**Timeline:** Weeks 11-14
**Risk Level:** HIGH (database migration)

---

## Phase 4: iOS Deployment (Weeks 15-16)

**Goal:** Deploy to iOS App Store via Capacitor
**Effort:** 60-80 hours
**Risk:** MEDIUM

### 4.1 Next.js Configuration for Static Export

**File:** `/home/user/Philosophy-app/next.config.js` (MODIFY)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable features that require server
  // (Already using Edge Function, not API routes)
}

module.exports = nextConfig
```

**Effort:** 2-4 hours
**Priority:** P0 (CRITICAL)

---

### 4.2 Install & Configure Capacitor

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Initialize
npx cap init

# Add iOS platform
npx cap add ios

# Add Android platform (optional)
npx cap add android
```

**File:** `/home/user/Philosophy-app/capacitor.config.ts` (CREATE)

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.philosophyapp.argued', // Update with your app ID
  appName: 'Philosophy App',
  webDir: 'out', // Next.js static export directory
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

**Effort:** 4-6 hours
**Priority:** P0 (CRITICAL)

---

### 4.3 Build & Sync

```bash
# Build Next.js app
npm run build

# Sync to native projects
npx cap sync ios
npx cap sync android

# Open in Xcode
npx cap open ios
```

**Effort:** 2-3 hours
**Priority:** P0 (CRITICAL)

---

### 4.4 iOS Configuration

**In Xcode:**

1. **App Icons & Splash Screen**
   - Add app icons to `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
   - Configure splash screen

2. **Code Signing**
   - Select Development Team
   - Configure Bundle Identifier
   - Set up Provisioning Profile

3. **Permissions**
   - Add `Info.plist` entries for any required permissions

**Effort:** 8-10 hours
**Priority:** P0 (CRITICAL)

---

### 4.5 Add Native Features (Optional)

#### Push Notifications

```bash
npm install @capacitor/push-notifications
npx cap sync
```

**Configuration in Xcode:**
- Enable Push Notifications capability
- Add APNs certificate

#### Camera (for profile pictures)

```bash
npm install @capacitor/camera
npx cap sync
```

#### Share Functionality

```bash
npm install @capacitor/share
npx cap sync
```

**Effort:** 10-15 hours per feature
**Priority:** P2 (NICE TO HAVE)

---

### 4.6 Testing

**Local Testing:**
```bash
# Test in iOS Simulator
npx cap run ios

# Test on real device
# Connect device, then in Xcode: Product → Run
```

**Test Checklist:**
- [ ] App launches successfully
- [ ] Authentication works
- [ ] All pages load
- [ ] Navigation functional
- [ ] API calls succeed
- [ ] No white screens
- [ ] No console errors

**Effort:** 15-20 hours
**Priority:** P0 (CRITICAL)

---

### 4.7 App Store Submission

**Prerequisites:**
- Apple Developer Account ($99/year)
- App icons (all sizes)
- Screenshots (various device sizes)
- Privacy policy URL
- App description

**Process:**
1. Archive app in Xcode
2. Upload to App Store Connect
3. Create app listing
4. Submit for review
5. Wait 1-7 days
6. Address any feedback
7. Launch!

**Effort:** 10-15 hours
**Priority:** P0 (CRITICAL)

---

### Phase 4 Deliverables

- ✅ Next.js configured for static export
- ✅ Capacitor installed and configured
- ✅ iOS app building successfully
- ✅ All features working on mobile
- ✅ App submitted to App Store
- ✅ App approved and live

**Total Effort:** 60-80 hours
**Timeline:** Weeks 15-16

---

## Codebase Changes Inventory

### Files to Modify

**Phase 0:**
```
/app/layout.tsx (metadata)
/app/auth/signup/page.tsx (add backend)
/app/api/judge/route.ts (add reputation updates)
/components/ui/Logo.tsx (branding)
/components/ui/Sidebar.tsx (branding, labels)
/components/ui/LeaderboardRow.tsx (labels)
/tailwind.config.ts (colors - optional)
/README.md (documentation)
```

**Phase 1:**
```
# New files (20+)
/app/api/conversations/route.ts
/app/api/conversations/[id]/route.ts
/app/api/conversations/[id]/messages/route.ts
/app/(authenticated)/conversations/page.tsx
/app/(authenticated)/conversations/[id]/page.tsx
/app/(authenticated)/conversations/create/page.tsx
/components/ui/ConversationCard.tsx
/components/ui/MessageThread.tsx
/lib/validation/conversation.ts
```

**Phase 2:**
```
# New files (15+)
/app/api/search/route.ts
/app/(authenticated)/users/[username]/page.tsx
/app/(authenticated)/settings/profile/page.tsx
/app/api/users/[id]/follow/route.ts
/app/api/notifications/route.ts
/components/ui/SearchBar.tsx
/components/ui/UserProfileCard.tsx
/components/ui/NotificationBell.tsx
```

**Phase 3:**
```
# Modified files (30+)
All files referencing 'debates' table
All files referencing 'arguments' table
/supabase/migrations/* (multiple new migrations)
/lib/database.types.ts (regenerated)

# New files
/supabase/functions/evaluate-discussion/index.ts
/components/ui/ThreadedMessages.tsx
```

**Phase 4:**
```
# Modified files
/next.config.js (add static export)

# New files
/capacitor.config.ts
/ios/* (entire iOS project)
/android/* (optional Android project)
```

---

### Files to Create

**Total New Files:** 50-60

**By Category:**
- API Routes: 15-20 files
- Pages: 10-12 files
- Components: 15-20 files
- Database Migrations: 8-10 files
- Edge Functions: 2-3 files
- Configuration: 3-4 files
- Validation/Utils: 5-7 files

---

### Files to Delete

**Phase 0:**
```
/lib/actions.ts (duplicate signOut)
```

**Phase 3 (After Migration):**
```
/app/api/judge/route.ts (moved to Edge Function)
/supabase/migrations/*_debates.sql (backup only, not delete)
```

**Phase 3 (Deprecated Features):**
```
/components/ui/DebateCard.tsx (replaced by ConversationCard)
/components/ui/LeaderboardRow.tsx (replaced by ContributorRow)
(Keep debate components during transition, delete after full migration)
```

---

## Database Migrations

### Migration Files Required

**Phase 0:**
```
20250115_add_delo_rating.sql
20250115_fix_signup_profiles.sql
```

**Phase 1:**
```
20250201_create_conversations.sql
20250201_create_messages.sql
20250201_create_topics.sql
20250201_create_conversation_participants.sql
20250201_create_message_feedback.sql
20250201_create_user_preferences.sql
```

**Phase 2:**
```
20250215_create_follows.sql
20250215_create_notifications.sql
20250215_add_profile_fields.sql
20250215_add_search_indexes.sql
```

**Phase 3 (CRITICAL):**
```
20250301_backup_old_tables.sql
20250301_rename_debates_to_discussions.sql
20250301_rename_arguments_to_contributions.sql
20250301_update_profiles_schema.sql
20250301_remove_judgments.sql
20250301_create_discussion_syntheses.sql
```

**Phase 4:**
```
# No database changes needed
```

---

### Data Transformation Scripts

**Backfill User Stats:**
```sql
UPDATE profiles p
SET
  conversations_initiated = (
    SELECT COUNT(*) FROM conversations WHERE creator_id = p.id
  ),
  conversations_participated_in = (
    SELECT COUNT(DISTINCT conversation_id)
    FROM conversation_participants
    WHERE user_id = p.id
  ),
  total_messages = (
    SELECT COUNT(*) FROM conversation_messages WHERE user_id = p.id
  ),
  last_active_at = (
    SELECT MAX(created_at)
    FROM conversation_messages
    WHERE user_id = p.id
  );
```

**Archive Old Debates:**
```sql
-- Save as historical data
INSERT INTO discussions_historical
SELECT * FROM debates_backup
WHERE status = 'completed' AND created_at < NOW() - INTERVAL '6 months';
```

---

## Component Library Specifications

### Core Components (Keep)

**Already Built:**
```
✅ Button
✅ Card
✅ Input
✅ Badge
✅ Toast
✅ Header
✅ StatCard
✅ Logo
```

---

### New Components (Build)

**Critical (Phase 1):**
```
ConversationCard (replaces DebateCard)
MessageThread (replaces argument list)
ConversationHeader (new)
ParticipantList (new)
PerspectiveTag (new)
TopicSelector (new)
MessageForm (new)
```

**Important (Phase 2):**
```
SearchBar
UserProfileCard
UserConversations
TopicFilter
FollowButton
NotificationBell
NotificationList
```

**Nice to Have (Phase 3):**
```
ThreadedMessages
SynthesisPanel
ActivityFeed
RelatedConversations
```

---

### Component Specifications

#### ConversationCard
**Props:**
```typescript
interface ConversationCardProps {
  id: string;
  title: string;
  preview?: string;
  participantCount: number;
  perspectiveCount?: number;
  lastActivityAt: Date;
  status: 'active' | 'archived' | 'draft';
  featured?: boolean;
  onClick?: () => void;
}
```

**Design:**
- Card with hover effect
- Title (2 lines max)
- Preview text (2 lines max)
- Metadata row (participants, perspectives, time)
- Status badge
- Featured badge (if applicable)

**File:** `/home/user/Philosophy-app/components/ui/ConversationCard.tsx`

---

#### MessageThread
**Props:**
```typescript
interface Message {
  id: string;
  author: {
    username: string;
    displayName?: string;
    avatar?: string;
  };
  content: string;
  perspective?: string;
  createdAt: Date;
  replies?: Message[];
  reactions?: Array<{ emoji: string; count: number }>;
}

interface MessageThreadProps {
  messages: Message[];
  onReply?: (messageId: string, content: string) => void;
  onDelete?: (messageId: string) => void;
  currentUserId?: string;
}
```

**Design:**
- Nested message display
- Author info (avatar, name, timestamp)
- Message content with formatting
- Reply button
- Delete button (if owner)
- Optional reactions
- Indentation for nested replies

**File:** `/home/user/Philosophy-app/components/ui/MessageThread.tsx`

---

#### SearchBar
**Props:**
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounce?: number;
  suggestions?: string[];
  filters?: Array<{ label: string; value: string }>;
}
```

**Design:**
- Input with search icon
- Clear button
- Optional autocomplete
- Optional filter chips
- Loading state

**File:** `/home/user/Philosophy-app/components/ui/SearchBar.tsx`

---

## Dependencies & Tools

### New npm Packages

**Phase 1:**
```bash
# No new packages needed (using existing Supabase, Next.js)
```

**Phase 2:**
```bash
# Search functionality
npm install fuse.js  # Client-side fuzzy search (optional)

# Or use Supabase full-text search (no package needed)
```

**Phase 3:**
```bash
# Supabase CLI for Edge Functions
npm install -g supabase

# Or use npx
npx supabase --version
```

**Phase 4:**
```bash
# Capacitor
npm install @capacitor/core @capacitor/cli

# iOS platform
npx cap add ios

# Optional native features
npm install @capacitor/camera
npm install @capacitor/push-notifications
npm install @capacitor/share
npm install @capacitor/haptics
```

---

### Services to Set Up

**Phase 0:**
- None (already using Supabase, Gemini)

**Phase 1:**
- None (expanding existing services)

**Phase 2:**
- None

**Phase 3:**
- **Supabase Edge Functions** (already included in Supabase)
  - Create function in Supabase dashboard
  - Set environment variables
  - Deploy via CLI

**Phase 4:**
- **Apple Developer Account** ($99/year)
- **App Store Connect** (free, part of Apple Developer)
- **Codemagic or similar** (optional, for CI/CD)
  - Free tier: 500 build minutes/month
  - Pro tier: $99/month

---

### Third-Party Integrations

**Current:**
- Supabase (auth, database, storage)
- Google Gemini AI (via API)
- Vercel (deployment)

**New:**
- Apple Push Notification Service (APNs) - for iOS push notifications (optional)
- Firebase Cloud Messaging (FCM) - for Android push notifications (optional)
- Cloudflare or similar CDN - for asset delivery (optional)

**No changes to existing integrations required.**

---

### Development Tools

**Required:**
- Node.js 18+
- npm 9+
- Git
- Supabase CLI

**For iOS Development:**
- macOS (required for Xcode)
- Xcode 14+ (latest stable)
- Apple Developer Account

**For Android Development (optional):**
- Android Studio
- Java 11+

**Recommended:**
- VS Code
- ESLint
- Prettier
- Supabase Studio (local development)

---

## Risk Mitigation

### Critical Risks

#### Risk 1: Database Migration Failure
**Probability:** Medium
**Impact:** CRITICAL (complete system outage)

**Mitigation:**
1. **Full backup before migration**
   ```bash
   # Backup entire database
   pg_dump -h db.supabase.co -U postgres -d postgres > backup_$(date +%Y%m%d).sql
   ```

2. **Test on staging database**
   - Create production-like staging environment
   - Run migration scripts 5+ times
   - Verify data integrity after each run

3. **Rollback plan**
   ```sql
   -- Restore from backup
   ALTER TABLE discussions RENAME TO conversations;
   ALTER TABLE debates_backup RENAME TO debates;
   -- Restore foreign keys, constraints
   ```

4. **Maintenance window**
   - Schedule during lowest traffic (e.g., 2-4 AM EST Sunday)
   - Communicate 48 hours in advance
   - Plan for 4-6 hour window

5. **Expert on standby**
   - Have database administrator available
   - Prepare for emergency debugging

---

#### Risk 2: API Migration Breaking Clients
**Probability:** Low-Medium
**Impact:** HIGH (mobile app breaks)

**Mitigation:**
1. **Version API endpoints**
   ```
   OLD: /api/judge
   NEW: /api/v2/evaluate
   Keep OLD alive for 2 weeks with deprecation warning
   ```

2. **Gradual rollout**
   - Deploy new endpoints first
   - Keep old endpoints working
   - Monitor usage
   - Deprecate after 2-4 weeks

3. **Client detection**
   - Add version header to requests
   - Route based on client version

---

#### Risk 3: iOS App Store Rejection
**Probability:** Low-Medium
**Impact:** MEDIUM (delay deployment)

**Mitigation:**
1. **Add native features**
   - Push notifications
   - Camera integration
   - Share functionality
   - Offline support

2. **Follow Apple guidelines**
   - Review Human Interface Guidelines
   - Test on real devices
   - Professional app icons
   - Complete metadata

3. **Prepare for feedback**
   - Quick turnaround team
   - Have fixes ready
   - Alternative approaches prepared

4. **Use TestFlight**
   - Beta test with real users
   - Gather feedback
   - Fix issues before submission

---

#### Risk 4: Performance Degradation
**Probability:** Low
**Impact:** MEDIUM (poor UX)

**Mitigation:**
1. **Database indexes**
   - Add indexes on all foreign keys
   - Add full-text search indexes
   - Monitor query performance

2. **Load testing**
   ```bash
   # Use tools like k6, Artillery
   artillery quick --count 10 --num 100 https://yourapp.com
   ```

3. **Monitoring**
   - Vercel Analytics
   - Supabase Performance Dashboard
   - Custom logging

4. **Optimization**
   - Lazy load components
   - Optimize images (WebP)
   - Code splitting
   - Cache API responses

---

#### Risk 5: User Confusion
**Probability:** Medium
**Impact:** MEDIUM (poor adoption)

**Mitigation:**
1. **Communication plan**
   - In-app notification (1 week before)
   - Email to all users (2 days before)
   - Blog post explaining changes
   - FAQ page

2. **Gradual rollout**
   - Enable for 10% users first
   - Monitor feedback
   - Expand to 50%, then 100%

3. **Help resources**
   - Tutorial video
   - Onboarding flow
   - Tooltips on new features
   - Support chat available

4. **Feedback collection**
   - In-app feedback widget
   - Survey after 1 week
   - Monitor support tickets

---

### Testing Strategy

**Phase 0:**
- Manual testing of signup flow
- Verify reputation updates
- Check branding consistency

**Phase 1:**
- Unit tests for API routes
- Integration tests for conversation CRUD
- E2E tests for user flows
- Manual testing on staging

**Phase 2:**
- Search functionality testing
- Profile system testing
- Following system testing
- Notification testing

**Phase 3 (CRITICAL):**
- Database migration dry runs (5+ times)
- Data integrity checks
- Full regression testing
- Performance testing
- Security audit

**Phase 4:**
- iOS app testing on simulator
- Testing on real devices (iPhone 12, 13, 14, 15)
- TestFlight beta testing
- Final pre-submission QA

---

## Summary & Timeline

### Phases Overview

| Phase | Duration | Effort | Risk | Deliverables |
|-------|----------|--------|------|--------------|
| **Phase 0** | Weeks 1-2 | 60-80 hrs | LOW | Branding updates, bug fixes |
| **Phase 1** | Weeks 3-6 | 120-150 hrs | MEDIUM | Conversation system live |
| **Phase 2** | Weeks 7-10 | 100-130 hrs | MEDIUM | Search, profiles, following |
| **Phase 3** | Weeks 11-14 | 140-180 hrs | HIGH | Database migration, AI |
| **Phase 4** | Weeks 15-16 | 60-80 hrs | MEDIUM | iOS App Store |
| **TOTAL** | **16-20 weeks** | **480-620 hrs** | **MIXED** | **Complete transformation** |

---

### Team Recommendations

**Optimal Team:**
- 2 Full-Stack Developers (primary development)
- 1 Database Administrator (Phase 3 migration)
- 1 Mobile Developer (Phase 4 iOS)
- 1 QA Engineer (testing throughout)
- 1 DevOps Engineer (deployment, monitoring)

**Minimum Viable Team:**
- 2 Full-Stack Developers
- 1 DBA (contract for Phase 3)
- 1 QA Engineer

**Budget Team:**
- 1 Full-Stack Developer (extended timeline to 24-30 weeks)
- Contract DBA for Phase 3
- Contract mobile dev for Phase 4

---

### Key Milestones

**Week 2:** Phase 0 complete - branding updated, critical bugs fixed
**Week 6:** Phase 1 complete - conversation system live
**Week 10:** Phase 2 complete - search, profiles, following functional
**Week 14:** Phase 3 complete - database migrated, AI transformed
**Week 16:** Phase 4 complete - iOS app submitted to App Store
**Week 17-18:** App Store review, launch

---

### Success Metrics

**Phase 0:**
- [ ] Signup conversion rate > 80%
- [ ] Zero branding inconsistencies
- [ ] Reputation updates accurate

**Phase 1:**
- [ ] 100+ conversations created
- [ ] < 200ms API response times
- [ ] Zero data loss

**Phase 2:**
- [ ] Search queries < 300ms
- [ ] 50+ user profiles created
- [ ] Following system working

**Phase 3:**
- [ ] Database migration successful
- [ ] Zero data loss
- [ ] All tests passing
- [ ] Performance maintained

**Phase 4:**
- [ ] iOS app approved
- [ ] App Store listing live
- [ ] 100+ downloads week 1

---

## Appendix: Quick Reference

### File Paths Quick Reference

**Configuration:**
```
/home/user/Philosophy-app/next.config.js
/home/user/Philosophy-app/tailwind.config.ts
/home/user/Philosophy-app/capacitor.config.ts
/home/user/Philosophy-app/tsconfig.json
```

**Database:**
```
/home/user/Philosophy-app/supabase/migrations/
/home/user/Philosophy-app/lib/database.types.ts
/home/user/Philosophy-app/lib/supabase/client.ts
/home/user/Philosophy-app/lib/supabase/server.ts
```

**API Routes:**
```
/home/user/Philosophy-app/app/api/conversations/
/home/user/Philosophy-app/app/api/search/
/home/user/Philosophy-app/app/api/notifications/
/home/user/Philosophy-app/supabase/functions/
```

**Pages:**
```
/home/user/Philosophy-app/app/(authenticated)/conversations/
/home/user/Philosophy-app/app/(authenticated)/users/
/home/user/Philosophy-app/app/(authenticated)/settings/
/home/user/Philosophy-app/app/auth/
```

**Components:**
```
/home/user/Philosophy-app/components/ui/
/home/user/Philosophy-app/components/templates/
```

---

### Command Reference

**Development:**
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run ESLint
npm run generate-types   # Regenerate Supabase types
```

**Database:**
```bash
supabase start           # Start local Supabase
supabase db reset        # Reset local database
supabase migration new   # Create new migration
supabase db push         # Push migrations to remote
```

**Capacitor:**
```bash
npx cap init             # Initialize Capacitor
npx cap add ios          # Add iOS platform
npx cap sync             # Sync web assets to native
npx cap open ios         # Open in Xcode
npx cap run ios          # Run on simulator
```

**Supabase Functions:**
```bash
supabase functions new <name>          # Create function
supabase functions serve <name>        # Test locally
supabase functions deploy <name>       # Deploy to cloud
supabase secrets set KEY=value         # Set secret
```

---

**End of Technical Implementation Plan**

**Generated:** November 15, 2025
**Total Pages:** 78
**Total Implementation Time:** 16-20 weeks
**Confidence Level:** HIGH
