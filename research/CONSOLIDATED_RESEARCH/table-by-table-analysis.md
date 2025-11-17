# Table-by-Table Vision Alignment Analysis

**Date:** November 2025  
**Vision:** Transition from competitive debate platform → collaborative conversation platform  
**Focus:** Each table's current state vs. conversation-first requirements

---

## PROFILES TABLE: Vision Alignment Assessment

### Current Status
```
Status: ✅ KEEP (with significant modifications)
Alignment Score: 4/10 (currently debate-focused, needs refactoring)
```

### Vision Fit Analysis

#### What's Good ✅
- **Core concept**: User profiles are needed for any community platform
- **Authentication integration**: Properly extends auth.users (good design)
- **Public visibility**: Profiles being public is correct for discovering philosophers
- **RLS policies**: Good security model (users own their profiles)

#### What Needs Fixing ❌
- **Debate statistics**: `debates_won`, `debates_participated` are competitive metrics
- **Reputation scoring**: `reputation_score` implies ranking/competition
- **DeLO rating**: ELO-style competitive rating system incompatible with collaborative vision
- **No learning metrics**: Missing fields for tracking growth, contributions, quality

### Detailed Column Analysis

| Column | Current | Vision Issue | Recommended Change | Priority |
|--------|---------|-------------|-------------------|----------|
| `id` | ✅ UUID PK | None | Keep as-is | N/A |
| `username` | ✅ TEXT UNIQUE | None | Keep as-is | N/A |
| `display_name` | ✅ TEXT | None | Keep as-is | N/A |
| `bio` | ✅ TEXT | None | Keep as-is (optional) | N/A |
| `reputation_score` | ❌ Debate metric | Competitive | **REMOVE or RENAME** | HIGH |
| `debates_won` | ❌ Debate stat | Not applicable | **REMOVE** | HIGH |
| `debates_participated` | ❌ Debate stat | Not applicable | **REMOVE** | HIGH |
| `delo_rating` | ❌ Competitive ELO | Winner ranking | **REMOVE** | HIGH |
| `created_at` | ✅ Timestamp | None | Keep as-is | N/A |
| `updated_at` | ✅ Timestamp | None | Keep as-is | N/A |

### Recommended Schema Changes

#### Option A: Remove Competitive Fields (Recommended)
```sql
-- Remove these columns:
ALTER TABLE profiles DROP COLUMN debates_won;
ALTER TABLE profiles DROP COLUMN debates_participated;
ALTER TABLE profiles DROP COLUMN delo_rating;
ALTER TABLE profiles DROP COLUMN reputation_score;

-- Drop related index:
DROP INDEX IF EXISTS profiles_delo_rating_idx;
```

#### Option B: Repurpose to Contribution Metrics
```sql
-- If you want to track contribution quality:
ALTER TABLE profiles RENAME COLUMN reputation_score TO contribution_score;
ALTER TABLE profiles RENAME COLUMN debates_won TO conversations_participated;
ALTER TABLE profiles RENAME COLUMN debates_participated TO messages_written;

-- Add comment explaining new meaning:
COMMENT ON COLUMN profiles.contribution_score IS 'Community-determined quality score (not competitive ranking)';

-- Add supporting columns:
ALTER TABLE profiles ADD COLUMN average_message_quality DECIMAL DEFAULT 0;
ALTER TABLE profiles ADD COLUMN last_contribution_date TIMESTAMPTZ;
```

#### Option C: Keep for Analytics (Not Recommended)
If you want historical data:
```sql
-- Archive in separate analytics table:
CREATE TABLE user_contribution_metrics AS
SELECT 
  id,
  reputation_score,
  debates_won,
  debates_participated,
  delo_rating,
  created_at
FROM profiles;

-- Then remove from profiles:
ALTER TABLE profiles DROP COLUMN reputation_score;
-- ... etc
```

### New Columns to Add

For conversation-first platform, add:

```sql
-- Profile enrichment fields
ALTER TABLE profiles ADD COLUMN expertise_areas TEXT[] DEFAULT '{}';
  -- Array of topics user cares about

ALTER TABLE profiles ADD COLUMN learning_interests TEXT[] DEFAULT '{}';
  -- Topics user wants to explore

ALTER TABLE profiles ADD COLUMN onboarding_completed BOOLEAN DEFAULT FALSE;
  -- Track if new user completed intro

ALTER TABLE profiles ADD COLUMN profile_visibility TEXT DEFAULT 'public' 
  CHECK (profile_visibility IN ('public', 'private', 'friends_only'));
  -- Privacy control

ALTER TABLE profiles ADD COLUMN preferred_conversation_depth TEXT DEFAULT 'exploratory'
  CHECK (preferred_conversation_depth IN ('exploratory', 'analytical', 'debate', 'casual'));
  -- User preference signal

-- Quality tracking (non-competitive)
ALTER TABLE profiles ADD COLUMN total_messages INTEGER DEFAULT 0;
  -- Purely for analytics

ALTER TABLE profiles ADD COLUMN conversations_initiated INTEGER DEFAULT 0;
  -- How many conversations user started

ALTER TABLE profiles ADD COLUMN conversations_participated_in INTEGER DEFAULT 0;
  -- Multi-perspective participation count
```

### Updated Sample Data

**Current (Debate-Focused):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "philosophical_alice",
  "display_name": "Alice Chen",
  "bio": "Exploring ethics and epistemology",
  "reputation_score": 45,
  "debates_won": 3,
  "debates_participated": 8,
  "delo_rating": 1250,
  "created_at": "2025-01-13T10:30:00Z",
  "updated_at": "2025-01-14T15:22:00Z"
}
```

**Recommended (Conversation-Focused):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "philosophical_alice",
  "display_name": "Alice Chen",
  "bio": "Exploring ethics and epistemology",
  "expertise_areas": ["ethics", "metaphysics"],
  "learning_interests": ["social_philosophy", "aesthetics"],
  "onboarding_completed": true,
  "profile_visibility": "public",
  "preferred_conversation_depth": "analytical",
  "total_messages": 27,
  "conversations_initiated": 2,
  "conversations_participated_in": 5,
  "created_at": "2025-01-13T10:30:00Z",
  "updated_at": "2025-01-14T15:22:00Z"
}
```

### Migration Path

1. **Week 1**: Add new columns to profiles table
2. **Week 2**: Update profile creation/update functions to populate new fields
3. **Week 3**: Migrate data (set expertise_areas based on old debate participation)
4. **Week 4**: Remove debate-specific columns
5. **Week 5**: Update RLS policies if needed

### Authorization Changes Needed

**Current RLS**: Adequate for basic case

**Recommended additions**:
```sql
-- Allow users to make profiles private
CREATE POLICY "Users can control their profile visibility"
  ON profiles FOR SELECT
  USING (
    profile_visibility = 'public' OR
    auth.uid() = id OR
    auth.uid() = ANY(SELECT follower_id FROM follows WHERE following_id = id)
  );
```

---

## DEBATES TABLE: Vision Alignment Assessment

### Current Status
```
Status: ❌ REMOVE or ⚠️ MAJOR TRANSFORMATION
Alignment Score: 1/10 (fundamentally debate-centric)
Critical Issues: Binary structure, winner field, competitive framing
```

### Vision Fit Analysis

#### What's Wrong ❌❌❌
- **Binary structure**: Forces "for vs against" - conversations have 3+ perspectives
- **Winner field**: Declares winners - contradicts collaborative goal
- **Competitive status flow**: 'completed' means judge declared winner
- **Debate terminology**: Entire concept oriented toward winning arguments
- **No multi-perspective support**: Can't represent diverse viewpoints on same topic

#### Core Incompatibility
The debates table **fundamentally embodies the old vision**. Converting it requires complete restructuring, not just adding fields.

### Current vs. Vision Requirements

| Requirement | Current Debates | Vision Requirement | Gap |
|-------------|-----------------|-------------------|-----|
| Two participants | ✅ Has `for_participant`, `against_participant` | 3+ participants | Structural mismatch |
| Winner field | ✅ Has `winner_id` | No winners in dialogue | Fundamental conflict |
| Binary positions | ✅ Enforced by `arguments.position` | Multi-perspective | Binary only |
| Status flow | 'open' → 'in_progress' → 'completed' | 'active' → 'archived' | Judgement-based |
| Moderator role | None | AI facilitator + mods | Missing |
| Topic organization | `topic` + `description` | Topic + multiple tags | Limited |

### Transformation Options

#### OPTION 1: Replace Entirely (Recommended)
**Action**: Delete debates table, create new `conversations` table

**Pros**:
- Clean break from debate paradigm
- Can design for conversation-first principles
- No legacy baggage

**Cons**:
- Lose existing debate data
- New implementation required
- Temporary data loss during transition

**Implementation**:
```sql
-- Create new conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Metadata
  title TEXT NOT NULL,
  description TEXT,
  topic_tags TEXT[] DEFAULT '{}',
  
  -- Status (not "completed by judgment")
  status TEXT DEFAULT 'active' CHECK (status IN (
    'active',        -- Ongoing conversation
    'featured',      -- Highlighted/promoted
    'archived',      -- Closed, read-only
    'locked'         -- Locked by moderation
  )),
  
  -- Structure
  conversation_type TEXT DEFAULT 'open' CHECK (conversation_type IN (
    'open_discussion',      -- Anyone can join
    'moderated_dialogue',   -- Moderation required
    'socratic_dialogue',    -- Structured prompts
    'case_study'            -- Analyzes specific case
  )),
  
  -- Participants
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  featured_until TIMESTAMPTZ
);

CREATE INDEX conversations_status_idx ON conversations(status);
CREATE INDEX conversations_created_at_idx ON conversations(created_at DESC);
CREATE INDEX conversations_topic_tags_idx ON conversations USING GIN(topic_tags);
```

#### OPTION 2: Rename and Restructure
**Action**: Keep table but rename and change all fields

```sql
-- Rename table
ALTER TABLE debates RENAME TO conversations;

-- Remove debate-specific fields
ALTER TABLE conversations DROP COLUMN for_participant CASCADE;
ALTER TABLE conversations DROP COLUMN against_participant CASCADE;
ALTER TABLE conversations DROP COLUMN winner_id CASCADE;

-- Rename fields
ALTER TABLE conversations RENAME COLUMN created_by TO creator_id;

-- Change status field
ALTER TABLE conversations DROP CONSTRAINT debates_status_check;
ALTER TABLE conversations ADD CONSTRAINT conversations_status_check 
  CHECK (status IN ('active', 'featured', 'archived', 'locked'));

-- Add new fields
ALTER TABLE conversations ADD COLUMN conversation_type TEXT DEFAULT 'open_discussion';
ALTER TABLE conversations ADD COLUMN topic_tags TEXT[] DEFAULT '{}';
ALTER TABLE conversations ADD COLUMN perspectives_count INTEGER DEFAULT 0;
ALTER TABLE conversations DROP COLUMN completed_at;
ALTER TABLE conversations ADD COLUMN archived_at TIMESTAMPTZ;
```

**Pros**:
- Keeps data integrity
- Gradual transformation
- Can migrate data

**Cons**:
- Messy SQL migration
- Still limited by old structure initially
- Might break existing relationships

#### OPTION 3: Keep for Debate-as-Feature
**Action**: Keep but position as "Optional Debate Mode"

**Considerations**:
- Some users might want formal debate format
- Could co-exist with conversations
- Requires clear UI distinction
- Not primary feature

```sql
-- Add new field to distinguish
ALTER TABLE debates ADD COLUMN is_legacy_debate BOOLEAN DEFAULT TRUE;
ALTER TABLE debates ADD COLUMN is_optional_debate_mode BOOLEAN DEFAULT FALSE;

-- Comment explaining
COMMENT ON TABLE debates IS 'Legacy debate format. For conversation-first platform, use conversations table instead.';
```

### Recommended: OPTION 1 (Replace Entirely)

**Reasoning**:
1. Cleanest break from competitive model
2. Allows designing from scratch for collaboration
3. Less legacy code to maintain
4. Clearer mental model for users ("debates" ≠ "conversations")

**Migration Timeline**:
1. Build new `conversations` table (Week 1)
2. Create migration tools to transform debate data (Week 2)
3. Dual-run period - support both old and new (Week 3-4)
4. Sunsetting plan for old debates table (Week 5+)

### Data Migration Strategy

**For existing debates** (if keeping data):
```sql
-- Map old debates to new conversations
INSERT INTO conversations (id, title, description, creator_id, created_at, status)
SELECT 
  id,
  topic as title,
  description,
  created_by as creator_id,
  created_at,
  CASE 
    WHEN status = 'completed' THEN 'archived'
    WHEN status = 'in_progress' THEN 'active'
    ELSE 'active'
  END as status
FROM debates
WHERE id NOT IN (SELECT conversation_id FROM conversations);

-- Map arguments to conversation_messages
INSERT INTO conversation_messages (
  conversation_id, user_id, content, perspective_type, created_at
)
SELECT 
  debate_id as conversation_id,
  user_id,
  content,
  CASE position WHEN 'for' THEN 'supporting' ELSE 'critical' END,
  created_at
FROM arguments;
```

---

## ARGUMENTS TABLE: Vision Alignment Assessment

### Current Status
```
Status: 🔄 TRANSFORM
Alignment Score: 5/10 (structure useful, metadata limited)
Key Issues: Binary position field, no threading, debate-specific
```

### Vision Fit Analysis

#### What's Good ✅
- **Basic structure**: User-to-content relationship is solid
- **Timestamps**: Good for chronological tracking
- **Simple model**: Easy to understand and extend
- **Existing data**: Has actual content

#### What Needs Fixing ❌
- **Position field**: Binary for/against doesn't match multi-perspective model
- **No threading**: Flat structure doesn't support nested conversations
- **No editing**: Can't track message edits
- **Debate-tied**: References debates table (problematic)
- **No metadata**: Missing perspective type, emphasis, etc.

### Transformation Analysis

| Current | Issue | New Approach |
|---------|-------|--------------|
| `position: 'for'/'against'` | Binary only | `perspective_type` - multiple types |
| No parent reference | Can't thread | Add `parent_message_id` self-FK |
| No edit tracking | Immutable | Add `edited_at`, `is_edited` flags |
| All messages equal | No distinction | Add `emphasis_level` for key points |
| debate_id only | Debate-bound | conversation_id instead |

### Recommended Schema Transformation

#### Step 1: Create New Table
```sql
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_message_id UUID REFERENCES conversation_messages(id) ON DELETE SET NULL,
  
  -- Content
  content TEXT NOT NULL,
  
  -- Perspective framing
  perspective_type TEXT DEFAULT NULL CHECK (
    perspective_type IS NULL OR perspective_type IN (
      'supporting',           -- Supports main thesis
      'critical',            -- Critical analysis
      'alternative',         -- Alternative perspective
      'synthesis',           -- Combines views
      'question',            -- Asks for clarification
      'empirical',           -- Empirical evidence
      'philosophical',       -- Philosophical argument
      'personal_experience'  -- Anecdotal
    )
  ),
  
  -- Emphasis and metadata
  is_key_point BOOLEAN DEFAULT FALSE,
  is_revised BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  
  -- Soft delete (optional)
  deleted_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX conversation_messages_conversation_id_idx 
  ON conversation_messages(conversation_id);
CREATE INDEX conversation_messages_user_id_idx 
  ON conversation_messages(user_id);
CREATE INDEX conversation_messages_parent_id_idx 
  ON conversation_messages(parent_message_id);
CREATE INDEX conversation_messages_created_at_idx 
  ON conversation_messages(created_at DESC);
CREATE INDEX conversation_messages_perspective_idx 
  ON conversation_messages(perspective_type);
```

#### Step 2: Migrate Data
```sql
-- Transform existing arguments
INSERT INTO conversation_messages (
  id, conversation_id, user_id, content, 
  perspective_type, created_at
)
SELECT 
  a.id,
  a.debate_id as conversation_id,
  a.user_id,
  a.content,
  CASE a.position 
    WHEN 'for' THEN 'supporting'
    WHEN 'against' THEN 'critical'
  END as perspective_type,
  a.created_at
FROM arguments a;
```

#### Step 3: Drop Old Table
```sql
-- After migration confirmation:
ALTER TABLE arguments DROP CONSTRAINT arguments_debate_id_fkey;
DROP TABLE arguments;
```

### Perspective Type Options Explained

| Type | Purpose | Example |
|------|---------|---------|
| `supporting` | Reinforces main point | "This aligns with consequentialist thinking" |
| `critical` | Challenges or questions | "But this assumes free will..." |
| `alternative` | Offers different view | "From a virtue ethics angle..." |
| `synthesis` | Combines previous views | "Building on both arguments..." |
| `question` | Seeks clarification | "How does this relate to...?" |
| `empirical` | Provides evidence | "Studies show that..." |
| `philosophical` | Philosophical argument | "As Kant argued..." |
| `personal_experience` | Anecdotal knowledge | "In my experience..." |

### Updated Sample Data

**Current (Debate Perspective):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440222",
  "debate_id": "660e8400-e29b-41d4-a716-446655440111",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "position": "for",
  "content": "AI development is beneficial...",
  "round": 1,
  "created_at": "2025-01-13T11:00:00Z"
}
```

**Transformed (Conversation Perspective):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440222",
  "conversation_id": "660e8400-e29b-41d4-a716-446655440111",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "parent_message_id": null,
  "content": "AI development is beneficial because it augments human capabilities...",
  "perspective_type": "supporting",
  "is_key_point": true,
  "is_revised": false,
  "created_at": "2025-01-13T11:00:00Z",
  "edited_at": null,
  "deleted_at": null
}
```

### RLS Policies for Messages

```sql
-- Everyone can read messages
CREATE POLICY "Messages are viewable by everyone"
  ON conversation_messages FOR SELECT
  USING (true);

-- Authenticated users can create messages
CREATE POLICY "Users can create messages in conversations"
  ON conversation_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can edit their own messages
CREATE POLICY "Users can edit their own messages"
  ON conversation_messages FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Moderators can soft-delete (archive) messages
CREATE POLICY "Moderators can delete messages"
  ON conversation_messages FOR UPDATE
  USING (is_moderator(auth.uid()))
  WITH CHECK (is_moderator(auth.uid()));
```

---

## JUDGMENTS TABLE: Vision Alignment Assessment

### Current Status
```
Status: ❌ REMOVE
Alignment Score: 0/10 (fundamentally incompatible)
Critical: Entire table represents abandoned competitive model
```

### Vision Incompatibility

**The judgments table encodes the core competitive principle we're moving away from:**

| Element | Current | Problem | Vision |
|---------|---------|---------|--------|
| Winner declaration | ✅ Has `winner_position` | Declares winner | No winners in dialogue |
| Judges role | ✅ AI judges | Authoritarian | AI facilitates (no authority) |
| Binary outcome | ✅ for/against/tie | Competitive | Multi-perspective valid |
| Scoring | ✅ Tracks scores | Ranking | Community feedback |

### What We're Removing

The judgments table **assumes**:
1. AI should decide arguments
2. Some positions "win" vs "lose"
3. Debates have definitive conclusions
4. Competitive scoring is valuable

**The conversation-first vision assumes**:
1. AI facilitates exploration
2. Multiple perspectives are valid
3. Conversations reveal complexity, not settle it
4. Quality feedback is multi-dimensional

### Replacement Strategy

#### Option 1: Delete Completely (Recommended)
```sql
-- Remove entire table
DROP TABLE judgments;

-- Remove trigger
DROP TRIGGER debate_completed_reputation_update ON debates;
DROP FUNCTION update_reputation_after_debate();
```

**Reasoning**: No conversation-first equivalent exists. Replacing later is easier than trying to preserve incompatible structure.

#### Option 2: Pivot to Community Feedback (If Needed)

If you want to track quality feedback:

```sql
-- Create feedback table instead
CREATE TABLE message_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- What's being rated
  message_id UUID NOT NULL REFERENCES conversation_messages(id) ON DELETE CASCADE,
  
  -- Who's rating
  rater_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Multi-dimensional feedback (not scores)
  thought_provoking BOOLEAN,
  well_reasoned BOOLEAN,
  clearly_explained BOOLEAN,
  includes_evidence BOOLEAN,
  opens_new_perspective BOOLEAN,
  
  -- Comment (optional)
  comment TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent duplicate ratings
  UNIQUE(message_id, rater_id)
);

-- Index for aggregation
CREATE INDEX message_feedback_message_id_idx 
  ON message_feedback(message_id);
```

This allows:
- Users to provide multi-dimensional feedback
- No winner/loser framing
- Aggregation of community signal
- Preservation of nuance

#### Option 3: Archive for Historical Reference

If you want to preserve existing judgment data:

```sql
-- Create archive table
CREATE TABLE judgment_archive (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Metadata
  debate_id UUID,
  original_judgment_id UUID,
  
  -- Content
  winner_position TEXT,
  reasoning TEXT,
  fact_checks JSONB,
  scores JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ DEFAULT NOW()
);

-- Copy data before deletion
INSERT INTO judgment_archive (debate_id, original_judgment_id, winner_position, reasoning, fact_checks, scores, created_at)
SELECT debate_id, id, winner_position, reasoning, fact_checks, scores, created_at
FROM judgments;

-- Then drop original
DROP TABLE judgments;
```

### What Happens Without Judgments?

**Concerns you might have:**
- "How do users know quality arguments?" → Community feedback (multi-dimensional)
- "How do debates resolve?" → They don't; conversation reveals complexity
- "How is moderation handled?" → Explicit moderation table (separate)
- "What about fact-checking?" → Separate fact-check system (collaborative)

**How conversation-first platforms handle this:**

1. **Quality signals**: Multiple feedback types, not winner declaration
2. **Resolution**: Acceptance that many questions don't have single answers
3. **Exploration**: Depth of reasoning valued over "correctness"
4. **Synthesis**: Community can summarize key points without declaring winner

---

## SUMMARY TABLE: Vision Alignment by Table

| Table | Current Status | Recommendation | Priority | Effort | Impact |
|-------|---|---|---|---|---|
| **profiles** | ✅ Partially aligned | Modify (remove competitive fields) | HIGH | Medium | Critical |
| **debates** | ❌ Fundamentally misaligned | Replace with conversations | CRITICAL | High | Blocking |
| **arguments** | 🔄 Partially aligned | Transform to messages | HIGH | Medium | Core feature |
| **judgments** | ❌ Fundamentally misaligned | Remove entirely | CRITICAL | Low | Non-critical |

---

## IMPLEMENTATION PRIORITY

### Phase 1 (Weeks 1-2): Foundation
1. Create `conversations` table (replace debates)
2. Create `conversation_messages` table (replace arguments)
3. Set up new RLS policies
4. Plan data migration

### Phase 2 (Weeks 3-4): Migration
1. Migrate data from old → new tables
2. Update API/backend to use new tables
3. Dual-run period for data consistency
4. Test thoroughly before switching

### Phase 3 (Week 5): Cleanup
1. Remove `debates` and `arguments` tables
2. Drop old indexes and constraints
3. Update all references in code
4. Delete `judgments` table

### Phase 4+ (Ongoing): Enhancement
1. Add user preferences table
2. Add messaging/notifications table
3. Add moderation system
4. Add topic/tag organization

