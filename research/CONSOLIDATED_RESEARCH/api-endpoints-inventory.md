# API Endpoints Inventory

Complete mapping of all API routes, server actions, and backend endpoints in the Philosophy App.

**Date**: November 14, 2025
**Framework**: Next.js 15.1.0 with Supabase + Gemini AI

---

## Executive Summary

The current application has **minimal API surface**: only 1 dedicated API route handler, 2 authentication server actions, and multiple database queries embedded in page components. The architecture is heavily debate-centric with hardcoded "for/against" positions.

| Category | Count | Status |
|----------|-------|--------|
| API Routes | 1 | Production |
| Server Actions | 2 | Production |
| Database Operations | 10+ | Embedded in components |
| External APIs | 1 (Gemini) | Production |

---

## API ROUTES (Route Handlers)

### 1. POST /api/judge

**File**: `/app/api/judge/route.ts`

**Purpose**: 
Judges a completed debate using Gemini AI. Creates a judgment record and updates the debate status to "completed" with winner determination.

**HTTP Method**: POST

**Route Pattern**: `/api/judge`

**Authentication**: Required (checks `supabase.auth.getUser()`)

**Request Body**:
```typescript
{
  debateId: string;           // UUID of the debate
  topic: string;              // The debate topic
  argumentFor: string;        // Full text of "for" argument
  argumentAgainst: string;    // Full text of "against" argument
}
```

**Response - Success (200)**:
```typescript
{
  success: true,
  judgment: {
    winner: 'for' | 'against' | 'tie';
    reasoning: string;
    factChecks: {
      claim: string;
      verdict: 'accurate' | 'misleading' | 'false';
      explanation: string;
    }[];
    scores: {
      for: { logic: 0-10; evidence: 0-10; rhetoric: 0-10 };
      against: { logic: 0-10; evidence: 0-10; rhetoric: 0-10 };
    };
  }
}
```

**Response - Error (400/401/404/500)**:
```typescript
{
  error: string;
}
```

**Vision Alignment**: ❌ **REMOVE** (or **🔄 TRANSFORM**)
- Currently only judges debates with fixed for/against structure
- Judgment-only use case won't apply to conversational discussions
- Should be transformed into a more generic "analyze discussion" endpoint if retained

**Dependencies**:
- **Database Tables**: 
  - `debates` (read: for_participant, against_participant; write: status, winner_id, completed_at)
  - `judgments` (write: debate_id, winner_position, reasoning, fact_checks, scores)
- **External API**: Gemini AI (generative-ai @google/generative-ai)

**Special Logic**:
1. Calls `judgeDebate()` to get Gemini judgment
2. Maps judgment winner ('for'/'against') to user ID from debate
3. Inserts judgment record with all analysis data
4. Updates debate status to "completed" with winner info
5. Does NOT update user reputation scores (handled elsewhere or missing)

**Hardcoded Assumptions**:
- Debates have exactly 2 participants: for_participant, against_participant
- Only evaluates single "for" and single "against" argument
- Winner is determined by AI judgment (no human judgment option)
- No handling of ties beyond returning "tie" as winner_position

**Rate Limiting**: None implemented

**Transactions**: None - multiple updates could fail partially

---

### 2. POST /auth/logout (Route Handler)

**File**: `/app/auth/logout/route.ts`

**Purpose**: 
Signs out the current user and redirects to home page.

**HTTP Method**: POST

**Route Pattern**: `/auth/logout`

**Authentication**: Session-based (reads cookies)

**Request Body**: None

**Response**: 
HTTP 302 redirect to `/`

**Vision Alignment**: ✅ **KEEP**
- Session sign-out is generic authentication logic
- Will be needed in conversation-first platform

**Dependencies**:
- **Database**: Supabase Auth service (signOut)
- No direct database tables

**Special Logic**:
1. Creates Supabase client from cookies
2. Calls `supabase.auth.signOut()`
3. Redirects via 302 to root

---

## SERVER ACTIONS (use server)

### 3. signIn (Auth Action)

**File**: `/app/auth/actions.ts`

**Signature**:
```typescript
export async function signIn(
  prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null>
```

**Purpose**:
Server-side authentication using email/password with FormData from form submission.

**Type**: Server Action (use server)

**Input**:
- `formData.get('email')`: string
- `formData.get('password')`: string

**Output**:
- Success: Redirects to `/debates` (throws redirect, doesn't return)
- Failure: Returns `{ error: string }`

**Vision Alignment**: ✅ **KEEP**
- Generic authentication mechanism
- Works for any conversation-first platform

**Dependencies**:
- **Service**: Supabase Auth
- **Table**: profiles (indirectly - auto-created on signup)

**Special Logic**:
1. Validates email and password present
2. Calls `supabase.auth.signInWithPassword()`
3. Checks for user and session data
4. Revalidates `/debates` path
5. Server-side redirect to `/debates`
6. Handles redirect exceptions (re-throws them)

**Security**: 
- Server-side - credentials never reach client
- Uses Supabase auth, passwords hashed server-side
- Session tokens in secure httponly cookies

---

### 4. signOut (Auth Action)

**File**: `/app/auth/actions.ts`

**Signature**:
```typescript
export async function signOut(): Promise<void>
```

**Purpose**:
Server-side sign out that invalidates session and redirects home.

**Type**: Server Action (use server)

**Input**: None

**Output**: Redirects to `/` (throws redirect exception)

**Vision Alignment**: ✅ **KEEP**
- Generic sign-out mechanism
- Needed in any authenticated platform

**Dependencies**:
- **Service**: Supabase Auth
- **Cache**: Invalidates `/debates` and `/debates/create` paths

---

### 5. signOut (Library Action)

**File**: `/lib/actions.ts`

**Signature**:
```typescript
export async function signOut(): Promise<void>
```

**Purpose**:
Duplicate of #4 above. Alternative sign-out implementation in lib.

**Type**: Server Action (use server)

**Vision Alignment**: ⚠️ **MODIFY**
- Remove duplicate - keep only one signOut in auth/actions.ts
- This duplication creates maintenance issues

---

## DATABASE OPERATIONS (Embedded in Components)

These operations are NOT in dedicated API routes but scattered throughout client and page components:

### 6. Create Debate

**Location**: `/app/(authenticated)/debates/create/page.tsx` (Client Component)

**Type**: Client-side Supabase query

**Operation**: INSERT

**Table**: `debates`

**Input**:
```typescript
{
  topic: string;
  description?: string;
  created_by: string;        // user.id
  status: 'open';
}
```

**Output**: Redirects to `/debates/{id}`

**Vision Alignment**: ⚠️ **MODIFY**
- Current: Creates single debate with topic
- Needed: Should support creating conversation threads instead
- Should NOT have fixed for/against positions

**Hardcoded Assumptions**:
- Always creates with status='open'
- Always created by authenticated user
- Single topic field (no messaging/discussion threading)

---

### 7. Join Debate (as Participant)

**Location**: `/app/(authenticated)/debates/[id]/DebateActions.tsx` (Client Component)

**Type**: Client-side Supabase query

**Operation**: UPDATE

**Table**: `debates`

**Input**:
```typescript
{
  for_participant: string | against_participant: string,  // userId
  status: 'in_progress'
}
```

**Condition**: `eq('id', debateId)`

**Vision Alignment**: ❌ **REMOVE**
- Hardcoded to "for/against" positions
- Not applicable to conversation threads
- Would need transformation if debates become conversations

---

### 8. Submit Argument

**Location**: `/app/(authenticated)/debates/[id]/DebateActions.tsx` (Client Component)

**Type**: Client-side Supabase query

**Operation**: INSERT

**Table**: `arguments`

**Input**:
```typescript
{
  debate_id: string;
  user_id: string;
  position: 'for' | 'against';
  content: string;
}
```

**Vision Alignment**: ⚠️ **MODIFY**
- Currently tied to debate/position model
- Should become "add message to thread" in new model
- Remove `position` field, add `created_at`

**Special Logic**:
1. Inserts argument with position
2. Checks if both positions now have arguments
3. If complete, triggers judgment endpoint
4. Otherwise refreshes page

---

### 9. Fetch Debates List

**Location**: `/app/(authenticated)/debates/page.tsx` (Server Component)

**Type**: Server-side Supabase query

**Operation**: SELECT

**Table**: `debates`

**Query**:
```typescript
select('*')
  .order('created_at', { ascending: false })
  .limit(20)
```

**Vision Alignment**: ✅ **KEEP** (with changes)
- List endpoint needed
- Should change to list "conversations" or "discussions"
- Add filtering options (active, closed, my threads, etc.)

---

### 10. Fetch Debate Detail

**Location**: `/app/(authenticated)/debates/[id]/page.tsx` (Server Component)

**Type**: Server-side Supabase query

**Operation**: SELECT with joins

**Query**:
```typescript
select(`
  *,
  creator:created_by(username, display_name, reputation_score),
  for_user:for_participant(username, display_name, reputation_score),
  against_user:against_participant(username, display_name, reputation_score)
`)
.eq('id', id)
.single()
```

**Vision Alignment**: 🔄 **TRANSFORM**
- Change from for/against users to participants array
- Should include message history instead of "arguments"
- Add conversation metadata (closed?, archived?)

---

### 11. Fetch Arguments for Debate

**Location**: `/app/(authenticated)/debates/[id]/page.tsx` (Server Component)

**Type**: Server-side Supabase query

**Operation**: SELECT with join

**Query**:
```typescript
select(`*, author:user_id(username, display_name)`)
  .eq('debate_id', id)
  .order('created_at', { ascending: true })
```

**Vision Alignment**: 🔄 **TRANSFORM**
- Change from "arguments" table to "messages" table
- Add support for pagination
- Add support for nested replies/threading

---

### 12. Fetch Judgment

**Location**: `/app/(authenticated)/debates/[id]/page.tsx` (Server Component)

**Type**: Server-side Supabase query

**Operation**: SELECT

**Query**:
```typescript
select('*')
  .eq('debate_id', id)
  .maybeSingle()
```

**Vision Alignment**: ❌ **REMOVE**
- Judgment/winner determination only applies to debate mode
- Won't exist in conversation-first mode
- Could become "discussion summary/analysis" if needed

---

### 13. Fetch User Profile

**Location**: `/app/(authenticated)/profile/page.tsx` (Server Component)

**Type**: Server-side Supabase query

**Operation**: SELECT

**Table**: `profiles`

**Query**:
```typescript
select('*')
  .eq('id', user.id)
  .single()
```

**Vision Alignment**: ✅ **KEEP**
- Generic user profile fetch
- Needed in conversation platform

---

### 14. Fetch Leaderboard

**Location**: `/app/(authenticated)/leaderboard/page.tsx` (Server Component)

**Type**: Server-side Supabase RPC or query

**Operation**: SELECT ordered

**Query**:
```typescript
rpc('get_leaderboard', {}).limit(100)
// Fallback:
select(`id, username, delo_rating, reputation_score, debates_won, debates_participated`)
  .order('delo_rating', { ascending: false })
  .limit(100)
```

**Vision Alignment**: ⚠️ **MODIFY**
- DeLO rating system is debate-specific (Elo-like)
- Leaderboard should change to:
  - Conversation participation score
  - Insight/value contribution rating
  - Community ratings
- Keep leaderboard feature, change metrics

---

## UTILITY/INTEGRATION FUNCTIONS

### Gemini AI Integration

**File**: `/lib/gemini.ts`

**Function**: `judgeDebate(topic, argumentFor, argumentAgainst): Promise<JudgmentResult>`

**Purpose**: 
Calls Gemini 2.0 Flash to evaluate and judge two debate arguments.

**Model**: `gemini-2.0-flash-exp`

**Input**:
- `topic`: string (debate topic)
- `argumentFor`: string (full argument for position)
- `argumentAgainst`: string (full argument against position)

**Output**:
```typescript
{
  winner: 'for' | 'against' | 'tie';
  reasoning: string;
  factChecks: Array<{
    claim: string;
    verdict: 'accurate' | 'misleading' | 'false';
    explanation: string;
  }>;
  scores: {
    for: { logic: 0-10; evidence: 0-10; rhetoric: 0-10 };
    against: { logic: 0-10; evidence: 0-10; rhetoric: 0-10 };
  };
}
```

**Prompt Engineering**:
- Instructs AI to be "impartial philosophical debate judge"
- Evaluates: Logic, Evidence, Rhetoric (0-10 each)
- Returns fact-checks with verdict + explanation
- Requires valid JSON return

**Vision Alignment**: 🔄 **TRANSFORM**
- Current: Only judges completed debates
- Future: Should facilitate ongoing discussion
  - Fact-check assertions in real-time
  - Suggest counter-arguments
  - Identify logical fallacies
  - Synthesize discussion summaries
- NOT remove entirely, but expand use cases

**Considerations**:
- Response parsing is fragile (regex for JSON)
- No error handling for malformed AI responses
- API costs scale with discussion length

---

## AUTHENTICATION & SESSION MANAGEMENT

### Supabase Auth Integration

**Files**: 
- `/lib/supabase/server.ts` - Server-side client
- `/lib/supabase/client.ts` - Client-side client
- `middleware.ts` - Session refresh

**Authentication Flow**:
1. Middleware refreshes session on every request
2. Server components check auth with `getUser()`
3. Client components use singleton Supabase instance
4. Session stored in secure httponly cookies

**Vision Alignment**: ✅ **KEEP**
- Supabase auth is solid choice
- Works for conversation platform
- SSR-safe implementation

---

## DATABASE SCHEMA

### Tables Used

#### profiles
- `id` (primary key, from auth)
- `username` (unique)
- `display_name`
- `bio`
- `reputation_score`
- `debates_won`
- `debates_participated`
- `created_at`
- `updated_at`

**Issues**:
- Missing: `delo_rating` (used in leaderboard but not in schema)
- Missing: notification preferences (settings page references them)
- Missing: privacy settings (settings page references them)

#### debates
- `id` (uuid primary key)
- `topic`
- `description`
- `status` ('open' | 'in_progress' | 'completed')
- `created_by` (user_id)
- `for_participant` (user_id)
- `against_participant` (user_id)
- `winner_id` (user_id)
- `created_at`
- `completed_at`

**Issues**:
- Hard-coded to for/against (not flexible for conversations)
- No participant array/junction table
- No threading support
- No visibility/privacy controls

#### arguments
- `id` (uuid primary key)
- `debate_id` (foreign key)
- `user_id` (author)
- `position` ('for' | 'against')
- `content`
- `round` (optional - debate round number)
- `created_at`

**Issues**:
- Named "arguments" but should be "messages" for conversations
- `round` field is unused
- No support for nested replies

#### judgments
- `id` (uuid primary key)
- `debate_id` (foreign key)
- `winner_position` ('for' | 'against' | 'tie')
- `reasoning` (text)
- `fact_checks` (JSON)
- `scores` (JSON)
- `created_at`

**Issues**:
- Only for debate mode
- Won't exist in conversation-first mode

---

## MISSING ENDPOINTS/OPERATIONS

### Critical Gaps for Conversation Platform

1. **Create User Profile** - Auto-creates on signup but no endpoint to update
2. **Update Profile** - Settings page has UI but no backend endpoint
3. **Get User by ID** - Can't fetch other user profiles
4. **Search** - No debate/topic search
5. **Notifications** - Settings page shows toggle but no notification system
6. **Comments** - Settings allows comments but no comment system
7. **User Reputation Update** - No endpoint to update scores after judgments
8. **Debate Creation Logic** - Missing:
   - Auto-profile creation on signup
   - Slug generation for shareable URLs
   - Duplicate/spam detection

---

## SUMMARY TABLE

| Endpoint | Method | Location | Vision | Priority |
|----------|--------|----------|--------|----------|
| POST /api/judge | POST | /app/api/judge/route.ts | ❌ REMOVE | High |
| POST /auth/logout | POST | /app/auth/logout/route.ts | ✅ KEEP | Medium |
| signIn | Action | /app/auth/actions.ts | ✅ KEEP | High |
| signOut (auth) | Action | /app/auth/actions.ts | ✅ KEEP | High |
| signOut (lib) | Action | /lib/actions.ts | ⚠️ MODIFY | Low |
| POST /debates | POST (embedded) | /debates/create/page.tsx | ⚠️ MODIFY | High |
| PATCH /debates/:id | PATCH (embedded) | /debates/[id]/DebateActions.tsx | ❌ REMOVE | High |
| POST /arguments | POST (embedded) | /debates/[id]/DebateActions.tsx | ⚠️ MODIFY | High |
| GET /debates | GET (embedded) | /debates/page.tsx | ✅ KEEP | High |
| GET /debates/:id | GET (embedded) | /debates/[id]/page.tsx | 🔄 TRANSFORM | High |
| GET /arguments | GET (embedded) | /debates/[id]/page.tsx | 🔄 TRANSFORM | High |
| GET /judgments | GET (embedded) | /debates/[id]/page.tsx | ❌ REMOVE | Medium |
| GET /profile | GET (embedded) | /profile/page.tsx | ✅ KEEP | High |
| GET /leaderboard | GET (embedded) | /leaderboard/page.tsx | ⚠️ MODIFY | Medium |

---

## ARCHITECTURAL OBSERVATIONS

1. **Tight Coupling**: Database operations are scattered in components, not centralized
2. **No API Layer**: Most queries embed Supabase directly in components
3. **Debate-Centric**: Architecture assumes for/against positions everywhere
4. **Minimal AI**: Only used for judging, not for facilitating discussion
5. **Missing Transactions**: Multiple updates in judge endpoint could fail partially
6. **No Rate Limiting**: No protection against abuse
7. **Schema Mismatches**: Database schema doesn't match all UI/feature usage
8. **Duplicate Code**: Two signOut implementations
9. **Missing Endpoints**: Several UI features have no backend logic

---

## RECOMMENDED ACTION ITEMS

**Immediate**:
1. Remove duplicate `signOut` in `/lib/actions.ts`
2. Fix schema mismatches (delo_rating, notification prefs)
3. Add transaction support to judge endpoint

**Short-term**:
1. Create dedicated POST endpoints for create/update operations
2. Move AI integration beyond judging
3. Design conversation/threading model

**Long-term**:
1. Refactor database schema for flexibility
2. Build comprehensive REST API layer
3. Implement notification system
4. Add search and filtering endpoints

