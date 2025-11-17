# Backend Logic Review

Detailed analysis of server-side code, business logic, and data flow.

**Date**: November 14, 2025
**Framework**: Next.js 15.1.0, Supabase

---

## EXECUTIVE SUMMARY

The backend is **minimally implemented** with most logic embedded in components rather than centralized services. This creates:

| Issue | Severity | Impact |
|-------|----------|--------|
| Scattered database queries in components | HIGH | Hard to maintain, test, reuse |
| No business logic layer | HIGH | Difficulty implementing complex features |
| Missing error handling | HIGH | Silent failures possible |
| No transaction support | MEDIUM | Data inconsistency risks |
| Duplicate code (2x signOut) | LOW | Maintenance burden |
| No validation layer | MEDIUM | Invalid data could enter DB |

---

## AUTHENTICATION & SESSION MANAGEMENT

### Supabase Auth Flow

**Files Involved**:
- `/lib/supabase/server.ts` - Server client factory
- `/lib/supabase/client.ts` - Client client factory
- `/middleware.ts` - Session refresh
- `/app/auth/actions.ts` - Sign in/out logic
- `/app/auth/logout/route.ts` - Logout route

**Authentication Flow**:

```
1. User visits /auth/login
   ↓
2. LoginForm submits email/password via signIn action
   ↓
3. signIn (server action):
   - Validates email/password present
   - Calls supabase.auth.signInWithPassword()
   - Checks for user + session
   - Revalidates /debates
   - Redirects to /debates (throws exception)
   ↓
4. Supabase returns session token
   ↓
5. Token stored in secure httponly cookie
   ↓
6. Middleware on next request:
   - Reads cookie
   - Refreshes session with Supabase
   - Updates cookie if needed
   ↓
7. Protected pages check auth:
   - const { data: { user } } = await supabase.auth.getUser()
   - Redirect to /auth/login if no user
```

**Issues Found**:

1. **No Profile Auto-Creation** ❌
   - User signs up but no profile created in `profiles` table
   - Leaderboard page assumes profile exists
   - Will crash if user profile doesn't exist
   
   **Location**: No signup route/action exists
   
   **Fix Needed**:
   ```typescript
   // Auth trigger needed:
   // When user created in auth.users, auto-create profile row
   // Or create profile on first API call
   
   // lib/supabase/auth-utils.ts
   export async function createUserProfile(userId: string, email: string) {
     const { error } = await supabase
       .from('profiles')
       .insert({
         id: userId,
         username: email.split('@')[0], // Generate from email
         created_at: new Date().toISOString(),
         reputation_score: 0,
         debates_won: 0,
         debates_participated: 0,
       });
     if (error) throw error;
   }
   ```

2. **No Signup Logic** ❌
   - Only `/auth/login` and `/auth/logout` pages exist
   - `/auth/signup` page exists but no server action
   - Users can't register new accounts via UI
   
   **Fix Needed**:
   ```typescript
   // /app/auth/signup/action.ts (missing)
   'use server';
   
   export async function signUp(
     prevState: { error?: string } | null,
     formData: FormData
   ): Promise<{ error?: string } | null> {
     const email = formData.get('email') as string;
     const password = formData.get('password') as string;
     const username = formData.get('username') as string;
     
     const supabase = await createClient();
     
     // Create auth user
     const { data, error } = await supabase.auth.signUp({
       email,
       password,
     });
     
     if (error) return { error: error.message };
     
     // Create profile
     if (data.user) {
       await createUserProfile(data.user.id, username);
     }
     
     redirect('/auth/login');
   }
   ```

3. **Session Persistence** ✅
   - Middleware properly refreshes sessions
   - Cookies are secure (httponly)
   - SSR-safe implementation

4. **No Password Reset** ❌
   - No forgot password flow
   - Users stuck if password lost

**Vision Alignment**: ✅ Keep auth approach, fix signup/profile creation

---

## DATABASE OPERATIONS

### Pattern 1: Create Operations

**Location**: `/app/(authenticated)/debates/create/page.tsx`

**Code**:
```typescript
const { data, error: insertError } = await supabase
  .from('debates')
  .insert({
    topic,
    description: description || null,
    created_by: user.id,
    status: 'open',
  })
  .select()
  .single();

if (insertError) throw insertError;
router.push(`/debates/${data.id}`);
```

**Issues**:
- ❌ No validation of topic length/format
- ❌ No duplicate topic detection
- ❌ No spam prevention
- ❌ User profile not verified to exist
- ❌ No default values for optional fields
- ✅ Good: Uses select().single() to return created record

**Fix Recommendation**:
```typescript
// lib/debates/create.ts (NEW)
interface CreateDebateInput {
  topic: string;
  description?: string;
  userId: string;
}

export async function createDebate(input: CreateDebateInput) {
  // Validation
  if (!input.topic || input.topic.length < 5) {
    throw new Error('Topic must be at least 5 characters');
  }
  if (input.topic.length > 200) {
    throw new Error('Topic must be under 200 characters');
  }
  
  // Check user has profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', input.userId)
    .single();
  
  if (!profile) {
    throw new Error('User profile not found - please update profile first');
  }
  
  // Check for duplicate (optional)
  const { data: existing } = await supabase
    .from('debates')
    .select('id')
    .eq('topic', input.topic)
    .eq('created_by', input.userId)
    .eq('status', 'open')
    .gt('created_at', new Date(Date.now() - 24*60*60*1000).toISOString()); // Last 24h
  
  if (existing && existing.length > 0) {
    throw new Error('You already created a debate on this topic today');
  }
  
  // Create debate
  const { data, error } = await supabase
    .from('debates')
    .insert({
      topic: input.topic.trim(),
      description: input.description?.trim() || null,
      created_by: input.userId,
      status: 'open',
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
```

---

### Pattern 2: Update Operations

**Location**: `/app/(authenticated)/debates/[id]/DebateActions.tsx`

**Code** (Join debate):
```typescript
const { error: updateError } = await supabase
  .from('debates')
  .update({
    [field]: userId,
    status: 'in_progress',
  })
  .eq('id', debateId);
```

**Issues**:
- ❌ No check if debate is still open
- ❌ No check if user already joined (could overwrite)
- ❌ No check if same user joins both sides
- ❌ Dynamic field names with bracket notation (hard to test)
- ❌ No validation of debate exists
- ❌ No audit trail

**Fix Recommendation**:
```typescript
// lib/debates/join.ts (NEW)
interface JoinDebateInput {
  debateId: string;
  userId: string;
  position: 'for' | 'against';
}

export async function joinDebate(input: JoinDebateInput) {
  // Get debate
  const { data: debate } = await supabase
    .from('debates')
    .select('*')
    .eq('id', input.debateId)
    .single();
  
  if (!debate) {
    throw new Error('Debate not found');
  }
  
  // Check status
  if (debate.status !== 'open') {
    throw new Error(`Cannot join debate - status is ${debate.status}`);
  }
  
  // Check if user already joined
  if (debate.for_participant === input.userId || 
      debate.against_participant === input.userId) {
    throw new Error('You already joined this debate');
  }
  
  // Check if position already filled
  if (input.position === 'for' && debate.for_participant) {
    throw new Error('FOR position already filled');
  }
  if (input.position === 'against' && debate.against_participant) {
    throw new Error('AGAINST position already filled');
  }
  
  // Prevent same user on both sides (creator joining)
  if (input.userId === debate.created_by) {
    throw new Error('Creator cannot join their own debate');
  }
  
  // Update debate
  const field = input.position === 'for' ? 'for_participant' : 'against_participant';
  const { error } = await supabase
    .from('debates')
    .update({
      [field]: input.userId,
      status: 'in_progress',
    })
    .eq('id', input.debateId);
  
  if (error) throw error;
  
  return { success: true };
}
```

---

### Pattern 3: Insert Operations

**Location**: `/app/(authenticated)/debates/[id]/DebateActions.tsx`

**Code** (Submit argument):
```typescript
const { error: insertError } = await supabase
  .from('arguments')
  .insert({
    debate_id: debateId,
    user_id: userId,
    position,
    content: argument,
  });
```

**Issues**:
- ❌ No validation of argument length
- ❌ No check if user is actual participant
- ❌ No check if already submitted
- ❌ No content sanitization
- ❌ No spam/abuse prevention

**Fix Recommendation**:
```typescript
// lib/debates/submit-argument.ts (NEW)
interface SubmitArgumentInput {
  debateId: string;
  userId: string;
  position: 'for' | 'against';
  content: string;
}

export async function submitArgument(input: SubmitArgumentInput) {
  // Validation
  if (!input.content || input.content.trim().length < 50) {
    throw new Error('Argument must be at least 50 characters');
  }
  if (input.content.length > 10000) {
    throw new Error('Argument cannot exceed 10,000 characters');
  }
  
  // Get debate
  const { data: debate } = await supabase
    .from('debates')
    .select('*')
    .eq('id', input.debateId)
    .single();
  
  if (!debate) throw new Error('Debate not found');
  
  // Verify user is participant
  const isParticipant = 
    (input.position === 'for' && debate.for_participant === input.userId) ||
    (input.position === 'against' && debate.against_participant === input.userId);
  
  if (!isParticipant) {
    throw new Error('You are not a participant in this debate');
  }
  
  // Check status
  if (debate.status !== 'in_progress') {
    throw new Error(`Cannot submit argument - debate status is ${debate.status}`);
  }
  
  // Check if already submitted
  const { data: existing } = await supabase
    .from('arguments')
    .select('id')
    .eq('debate_id', input.debateId)
    .eq('user_id', input.userId);
  
  if (existing && existing.length > 0) {
    throw new Error('You already submitted an argument in this debate');
  }
  
  // Insert
  const { error } = await supabase
    .from('arguments')
    .insert({
      debate_id: input.debateId,
      user_id: input.userId,
      position: input.position,
      content: input.content.trim(),
    });
  
  if (error) throw error;
  
  return { success: true };
}
```

---

### Pattern 4: Read Operations

**Location**: Multiple places (debates/page.tsx, debates/[id]/page.tsx)

**Code**:
```typescript
// Simple read
const { data: debates } = await supabase
  .from('debates')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(20);

// Complex read with joins
const { data: debate } = await supabase
  .from('debates')
  .select(`
    *,
    creator:created_by(username, display_name, reputation_score),
    for_user:for_participant(username, display_name, reputation_score),
    against_user:against_participant(username, display_name, reputation_score)
  `)
  .eq('id', id)
  .single();
```

**Issues**:
- ❌ No error handling in leaderboard (silently falls back)
- ⚠️ Direct joins in components (should be in API layer)
- ❌ No pagination (loads all debates)
- ✅ Good: Uses field selection instead of wildcard
- ❌ No caching strategy

**Fix Recommendation**:
```typescript
// lib/debates/get.ts (NEW)
export async function getDebate(debateId: string) {
  const { data, error } = await supabase
    .from('debates')
    .select(`
      *,
      creator:created_by(username, display_name, reputation_score),
      for_user:for_participant(username, display_name, reputation_score),
      against_user:against_participant(username, display_name, reputation_score),
      arguments(*),
      judgments(*)
    `)
    .eq('id', debateId)
    .single();
  
  if (error) throw error;
  if (!data) throw new Error('Debate not found');
  
  return data;
}

export async function listDebates(options: {
  page?: number;
  limit?: number;
  status?: string;
  createdBy?: string;
} = {}) {
  const page = options.page ?? 1;
  const limit = options.limit ?? 20;
  const offset = (page - 1) * limit;
  
  let query = supabase
    .from('debates')
    .select('id, topic, description, status, created_by, created_at, for_participant, against_participant', 
            { count: 'exact' });
  
  if (options.status) {
    query = query.eq('status', options.status);
  }
  if (options.createdBy) {
    query = query.eq('created_by', options.createdBy);
  }
  
  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  
  return {
    debates: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}
```

---

## JUDGMENT LOGIC

### POST /api/judge Analysis

**File**: `/app/api/judge/route.ts`

**Flow**:
```
1. Receive request with debateId, topic, argumentFor, argumentAgainst
2. Check authentication
3. Validate required fields
4. Call Gemini AI to judge
5. Determine winner user ID from debate
6. Insert judgment record
7. Update debate status + winner_id
```

**Critical Issues**:

1. **No User Reputation Update** ❌
   - Judgment is saved but user stats never updated
   - `debates_won` and `reputation_score` in profiles unchanged
   - Leaderboard will show incorrect data
   
   **Missing Code**:
   ```typescript
   // After setting winner_id:
   if (winnerId) {
     const { error: updateError } = await supabase
       .from('profiles')
       .update({
         debates_won: { increment: 1 },
         reputation_score: { increment: 10 }, // Or calculate based on opponent rating
       })
       .eq('id', winnerId);
   }
   ```

2. **No Transaction Support** ❌
   - If judgment insert succeeds but debate update fails:
     - Judgment exists in database
     - Debate still shows status 'in_progress'
     - Data becomes inconsistent
   
   **Needs**:
   - Supabase doesn't have built-in transactions
   - Should wrap in try/catch and rollback if needed
   - Or use stored procedure

3. **Fragile JSON Parsing** ❌
   ```typescript
   const jsonMatch = response.match(/\{[\s\S]*\}/);
   if (!jsonMatch) {
     throw new Error('Failed to parse AI response');
   }
   return JSON.parse(jsonMatch[0]); // Could still fail
   ```
   
   **Risks**:
   - If Gemini returns multiple JSON objects, gets wrong one
   - If response is malformed JSON, parse fails
   - No logging of what Gemini returned
   
   **Fix**:
   ```typescript
   function parseGeminiResponse(text: string) {
     // Try to extract JSON block
     const jsonMatch = text.match(/\{[\s\S]*\}/);
     if (!jsonMatch) {
       console.error('No JSON found in response:', text);
       throw new Error('AI response format invalid');
     }
     
     try {
       const parsed = JSON.parse(jsonMatch[0]);
       // Validate structure
       if (!parsed.winner || !parsed.reasoning) {
         throw new Error('Response missing required fields');
       }
       return parsed;
     } catch (e) {
       console.error('Failed to parse JSON:', jsonMatch[0], e);
       throw new Error('AI response was not valid JSON');
     }
   }
   ```

4. **No Error Logging** ❌
   - Catches errors but only returns error message
   - No record of what went wrong
   - Can't debug issues later
   
   **Needs**:
   ```typescript
   // Add structured logging
   interface JudgmentLog {
     debateId: string;
     userId: string;
     status: 'success' | 'error' | 'timeout';
     error?: string;
     geminiTokens?: number;
     processingTime: number;
     timestamp: Date;
   }
   
   // Log every judgment attempt
   ```

5. **No Rate Limiting** ❌
   - Any user can spam judgment requests
   - Could cost significant API money
   - No protection against abuse

6. **No Retry Logic** ❌
   - If Gemini times out, user gets error
   - Should retry with exponential backoff

---

## BUSINESS LOGIC GAPS

### Missing: Reputation/Rating System

**Current State**: ❌ Not implemented
- `profiles.reputation_score` exists but never updated
- `profiles.debates_won` exists but never updated  
- `profiles.delo_rating` (DeLO) is referenced in leaderboard but not in schema
- No calculation of rating changes

**Needed Implementation**:
```typescript
// lib/rating/rating-system.ts

interface RatingUpdate {
  winnerId: string;
  loserId: string;
  debateId: string;
}

export async function updateRatingsAfterDebate(update: RatingUpdate) {
  // Get current ratings
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, delo_rating, debates_won, debates_participated, reputation_score')
    .in('id', [update.winnerId, update.loserId]);
  
  const winner = profiles.find(p => p.id === update.winnerId);
  const loser = profiles.find(p => p.id === update.loserId);
  
  // Calculate rating changes (Elo formula)
  const K = 32; // Rating volatility factor
  const expectedWinner = 1 / (1 + Math.pow(10, (loser.delo_rating - winner.delo_rating) / 400));
  const expectedLoser = 1 / (1 + Math.pow(10, (winner.delo_rating - loser.delo_rating) / 400));
  
  const winnerNewRating = winner.delo_rating + K * (1 - expectedWinner);
  const loserNewRating = loser.delo_rating + K * (0 - expectedLoser);
  
  // Update both profiles
  await supabase
    .from('profiles')
    .update({
      delo_rating: winnerNewRating,
      debates_won: { increment: 1 },
      debates_participated: { increment: 1 },
      reputation_score: { increment: 10 },
    })
    .eq('id', update.winnerId);
  
  await supabase
    .from('profiles')
    .update({
      delo_rating: loserNewRating,
      debates_participated: { increment: 1 },
      reputation_score: { increment: 5 }, // Participation bonus
    })
    .eq('id', update.loserId);
}
```

---

### Missing: Input Validation

**Current State**: ❌ Minimal validation

**What's Validated**:
- signIn: Email and password present
- Debate creation: Topic present (client-side only)
- Argument: Content present (client-side only)

**What's NOT Validated**:
- Email format
- Password strength
- Topic length/content
- Argument content quality
- Username uniqueness (client-side)
- SQL injection prevention (Supabase handles via prepared statements)
- XSS prevention (React handles via JSX)

**Fix Recommendation**:
```typescript
// lib/validation/schemas.ts (NEW)
import { z } from 'zod';

export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/);
export const usernameSchema = z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/);
export const topicSchema = z.string().min(5).max(200);
export const argumentSchema = z.string().min(50).max(10000);

export const createDebateSchema = z.object({
  topic: topicSchema,
  description: z.string().max(500).optional(),
});

export const submitArgumentSchema = z.object({
  debateId: z.string().uuid(),
  content: argumentSchema,
});
```

---

### Missing: Audit Trail

**Current State**: ❌ Not implemented

**What's Needed**:
- Who joined debate and when
- Who submitted arguments
- AI judgment history
- User rating changes over time

**Fix Recommendation**:
```typescript
// Database tables needed:
// - audit_log (userId, action, resourceType, resourceId, changes, timestamp)
// - debate_events (debateId, eventType, userId, timestamp)
// - rating_history (userId, oldRating, newRating, reason, timestamp)

// lib/audit.ts
interface AuditLog {
  userId: string;
  action: 'create' | 'join' | 'submit_argument' | 'judge' | 'update';
  resourceType: 'debate' | 'argument' | 'judgment' | 'profile';
  resourceId: string;
  changes: Record<string, any>;
  timestamp: Date;
}

export async function logAction(log: AuditLog) {
  const { error } = await supabase
    .from('audit_log')
    .insert(log);
  
  if (error) console.error('Failed to log action:', error);
}
```

---

## CACHING & PERFORMANCE

**Current State**: ❌ No caching strategy

**Issues**:
- Leaderboard query runs on every page load
- No Redis or in-memory cache
- No query result caching
- Database hit on every user request

**Recommendations**:
1. **Server-side Fragment Caching** (Next.js built-in)
   ```typescript
   export const revalidate = 60; // Cache for 60 seconds
   ```
   - Currently used for leaderboard (good)
   - Should be added to more pages

2. **Database Query Caching**
   ```typescript
   // lib/cache.ts
   const cache = new Map<string, { data: any; timestamp: number }>();
   const CACHE_TTL = 60 * 1000; // 60 seconds
   
   export function getCached<T>(key: string, fn: () => Promise<T>) {
     const cached = cache.get(key);
     if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
       return cached.data;
     }
     
     const data = await fn();
     cache.set(key, { data, timestamp: Date.now() });
     return data;
   }
   ```

3. **Leaderboard Materialized View**
   ```sql
   CREATE MATERIALIZED VIEW leaderboard_view AS
   SELECT 
     p.id,
     p.username,
     p.delo_rating,
     p.reputation_score,
     p.debates_participated,
     p.debates_won
   FROM profiles p
   ORDER BY p.delo_rating DESC;
   
   -- Refresh periodically (e.g., every 5 minutes)
   ```

---

## SECURITY ANALYSIS

### What's Good:
✅ Passwords hashed by Supabase
✅ Session tokens in secure httponly cookies
✅ SQL injection protected (prepared statements)
✅ XSS protected (React JSX escaping)
✅ CSRF protection via Next.js built-in

### What's Missing:
❌ No rate limiting on API endpoints
❌ No input sanitization
❌ No CORS configuration specified
❌ Gemini API key in environment (safe but monitor)
❌ No audit trail for compliance
❌ No user ID validation before operations (relies on getUser())

### Recommendations:
```typescript
// lib/security/rate-limit.ts (NEW)
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h'),
});

export async function checkRateLimit(userId: string) {
  const { success } = await ratelimit.limit(userId);
  if (!success) throw new Error('Rate limit exceeded');
}

// Use in API routes:
export async function POST(request: NextRequest) {
  const user = await getUser();
  await checkRateLimit(user.id);
  // ... rest of logic
}
```

---

## MISSING CRITICAL FEATURES

| Feature | Location | Status | Priority |
|---------|----------|--------|----------|
| User signup | /app/auth/signup | ❌ No backend | HIGH |
| Profile auto-create | Auth trigger | ❌ Missing | HIGH |
| Profile update | /settings | ❌ No backend | MEDIUM |
| Password reset | /auth/reset | ❌ Missing | MEDIUM |
| User reputation updates | /api/judge | ❌ Missing | HIGH |
| Input validation | Everywhere | ⚠️ Minimal | MEDIUM |
| Error logging | All endpoints | ❌ Missing | MEDIUM |
| Rate limiting | All endpoints | ❌ Missing | MEDIUM |
| Audit trail | Database | ❌ Missing | LOW |
| Search debates | /debates | ❌ Missing | MEDIUM |
| Pagination | /debates | ❌ Missing | MEDIUM |

---

## RECOMMENDED REFACTORING

### Phase 1: Extract Business Logic (Week 1)
```
lib/
├── debates/
│   ├── create.ts
│   ├── join.ts
│   ├── get.ts
│   └── list.ts
├── arguments/
│   ├── submit.ts
│   └── list.ts
├── judgments/
│   ├── judge.ts
│   └── get.ts
├── profiles/
│   ├── get.ts
│   ├── create.ts
│   └── update.ts
├── rating/
│   ├── update.ts
│   └── calculate.ts
└── validation/
    └── schemas.ts
```

### Phase 2: Create API Endpoints (Week 2)
```
app/api/
├── debates/
│   ├── route.ts (GET list, POST create)
│   └── [id]/
│       ├── route.ts (GET detail, PATCH update)
│       └── join/route.ts (POST)
├── arguments/
│   └── route.ts (POST submit)
├── profiles/
│   ├── route.ts (GET current user)
│   ├── [id]/route.ts (GET user)
│   └── [id]/update/route.ts (PATCH)
└── judge/
    └── route.ts (Enhanced)
```

### Phase 3: Error Handling & Logging (Week 3)
- Add try/catch to all API routes
- Implement structured logging
- Add rate limiting
- Add input validation

### Phase 4: Testing (Week 4)
- Unit tests for business logic
- Integration tests for API endpoints
- Load testing for performance

---

## SUMMARY

**Current State**: Backend is minimal, with database operations embedded in components. Missing critical business logic like reputation updates.

**Key Risks**:
1. Data inconsistency (judgment recorded but scores not updated)
2. Security vulnerabilities (no rate limiting)
3. Maintenance burden (logic scattered across files)
4. Scalability issues (no caching, no pagination)

**Quick Wins** (High impact, low effort):
- Add user reputation updates after judgment
- Add input validation
- Add error logging
- Extract signup/profile creation logic

**Long-term Improvements**:
- Centralize business logic
- Create dedicated API layer
- Add comprehensive testing
- Implement monitoring/observability

