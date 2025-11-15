# Schema Evolution Roadmap: Debate → Conversation Platform

**Date:** November 2025  
**Objective:** Complete database schema redesign to support conversation-first vision  
**Timeline:** 5-6 weeks for core changes, 3-6 months for full feature set

---

## EXECUTIVE SUMMARY

### Current State
- 4 tables (profiles, debates, arguments, judgments)
- Debate-centric structure (pro/con binary, AI judges winners)
- Competitive metrics (reputation, win/loss counts, DeLO rating)
- 28 columns total, 2 functions, 7 RLS policies

### Target State
- 8-10 core tables (profiles + supporting tables)
- Conversation-centric structure (multi-perspective, community feedback)
- Contribution metrics (message count, participation, quality signals)
- ~100+ columns across new schema, 5+ functions, 15+ RLS policies

### Key Changes
1. **Remove**: debates, arguments, judgments tables
2. **Create**: conversations, conversation_messages, topics, user_preferences, message_feedback tables
3. **Modify**: profiles (remove competitive fields, add contribution tracking)
4. **Add**: Supporting tables for moderation, blocking, reading lists, etc.

---

## PHASE 1: IMMEDIATE CHANGES (Weeks 1-2)

### 1.1: CREATE CONVERSATIONS TABLE

**Replaces:** debates table

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Core metadata
  title TEXT NOT NULL,
  description TEXT,
  
  -- Organization
  topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
  topic_tags TEXT[] DEFAULT '{}',  -- For fast filtering
  
  -- Status lifecycle
  status TEXT DEFAULT 'active' CHECK (status IN (
    'draft',           -- Not yet published
    'active',          -- Ongoing
    'featured',        -- Highlighted in discovery
    'archived',        -- Closed, read-only
    'locked',          -- Moderation issue, read-only
    'deleted'          -- Soft-deleted
  )),
  
  -- Conversation type
  conversation_type TEXT DEFAULT 'open_discussion' CHECK (conversation_type IN (
    'open_discussion',      -- Anyone can join
    'moderated_dialogue',   -- Moderation required
    'socratic_dialogue',    -- AI-facilitated Socratic questions
    'case_study',           -- Analyzes specific topic/case
    'reading_group',        -- Structured text exploration
    'expert_ama'            -- Ask Me Anything with expert
  )),
  
  -- Participants
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  moderator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- Perspective tracking
  perspectives_count INTEGER DEFAULT 0,  -- Denormalized for query speed
  messages_count INTEGER DEFAULT 0,      -- Denormalized
  
  -- Engagement
  view_count INTEGER DEFAULT 0,
  
  -- Lifecycle dates
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  featured_until TIMESTAMPTZ,
  
  -- Soft delete support
  deleted_at TIMESTAMPTZ
);

-- Indexes for discovery and sorting
CREATE INDEX conversations_status_idx ON conversations(status);
CREATE INDEX conversations_created_at_idx ON conversations(created_at DESC);
CREATE INDEX conversations_creator_id_idx ON conversations(creator_id);
CREATE INDEX conversations_topic_id_idx ON conversations(topic_id);
CREATE INDEX conversations_topic_tags_idx ON conversations USING GIN(topic_tags);
CREATE INDEX conversations_featured_until_idx ON conversations(featured_until DESC);
```

**RLS Policies:**
```sql
-- Everyone can read active conversations
CREATE POLICY "Active conversations are public"
  ON conversations FOR SELECT
  USING (status = 'active' OR status = 'featured' OR status = 'archived');

-- Only creators/mods can see drafts
CREATE POLICY "Draft conversations only visible to creators/mods"
  ON conversations FOR SELECT
  USING (
    status != 'draft' OR
    auth.uid() = creator_id OR
    auth.uid() = moderator_id
  );

-- Authenticated users can create conversations
CREATE POLICY "Authenticated users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- Creators and moderators can update
CREATE POLICY "Creators and moderators can update conversations"
  ON conversations FOR UPDATE
  USING (
    auth.uid() = creator_id OR
    auth.uid() = moderator_id
  );

-- Soft delete support
CREATE POLICY "Deleted conversations hidden from non-mods"
  ON conversations FOR SELECT
  USING (
    deleted_at IS NULL OR
    auth.uid() = creator_id OR
    is_moderator(auth.uid())
  );
```

### 1.2: CREATE CONVERSATION_MESSAGES TABLE

**Replaces:** arguments table  
**Purpose:** Individual messages/contributions within conversations

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
  perspective_type TEXT DEFAULT NULL CHECK (
    perspective_type IS NULL OR perspective_type IN (
      'supporting',            -- Supports main thesis/question
      'critical',              -- Critical analysis
      'alternative',           -- Alternative perspective
      'synthesis',             -- Synthesizes previous views
      'question',              -- Asks for clarification
      'empirical',             -- Empirical evidence/examples
      'philosophical',         -- Philosophical argument/reference
      'personal_experience'    -- Anecdotal/personal knowledge
    )
  ),
  
  -- Emphasis and structure
  is_key_point BOOLEAN DEFAULT FALSE,      -- Important summary/insight
  is_revised BOOLEAN DEFAULT FALSE,        -- Edit flag
  
  -- Engagement tracking
  reply_count INTEGER DEFAULT 0,           -- Denormalized for perf
  quality_score DECIMAL DEFAULT 0,         -- Aggregated feedback
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  
  -- Soft delete
  deleted_at TIMESTAMPTZ
);

-- Indexes for common queries
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
CREATE INDEX conversation_messages_key_point_idx 
  ON conversation_messages(is_key_point) WHERE is_key_point = TRUE;
```

**RLS Policies:**
```sql
-- Everyone can read messages in public conversations
CREATE POLICY "Messages in public conversations are visible"
  ON conversation_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations c 
      WHERE c.id = conversation_messages.conversation_id 
      AND c.status IN ('active', 'featured', 'archived')
    )
  );

-- Users can create messages
CREATE POLICY "Users can create messages"
  ON conversation_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can edit their own messages
CREATE POLICY "Users can edit their own messages"
  ON conversation_messages FOR UPDATE
  USING (auth.uid() = user_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = user_id);

-- Soft delete with moderator access
CREATE POLICY "Deleted messages hidden from users"
  ON conversation_messages FOR SELECT
  USING (
    deleted_at IS NULL OR
    auth.uid() = user_id OR
    is_moderator(auth.uid())
  );
```

### 1.3: MODIFY PROFILES TABLE

**Action:** Remove debate-specific fields, add conversation-first fields

```sql
-- Remove competitive fields
ALTER TABLE profiles DROP COLUMN IF EXISTS debates_won;
ALTER TABLE profiles DROP COLUMN IF EXISTS debates_participated;
ALTER TABLE profiles DROP COLUMN IF EXISTS delo_rating;
ALTER TABLE profiles DROP COLUMN IF EXISTS reputation_score;

-- Drop related index
DROP INDEX IF EXISTS profiles_delo_rating_idx;

-- Add new fields for conversation platform
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS expertise_areas TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS learning_interests TEXT[] DEFAULT '{}';

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_visibility TEXT DEFAULT 'public' 
  CHECK (profile_visibility IN ('public', 'private', 'friends_only'));

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferred_conversation_depth TEXT DEFAULT 'exploratory'
  CHECK (preferred_conversation_depth IN ('exploratory', 'analytical', 'debate', 'casual'));

-- Contribution tracking (not competitive)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_messages INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS conversations_initiated INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS conversations_participated_in INTEGER DEFAULT 0;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ DEFAULT NOW();

-- Add comment explaining philosophy
COMMENT ON COLUMN profiles.total_messages IS 'Total messages written (for analytics, not ranking)';
COMMENT ON COLUMN profiles.conversations_participated_in IS 'Count of conversations participated in (for analytics)';
```

### 1.4: CREATE TOPICS TABLE

**Purpose:** Organizing conversations by philosophical topic

```sql
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Topic metadata
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,  -- URL-friendly identifier
  description TEXT,
  
  -- Organization
  parent_id UUID REFERENCES topics(id) ON DELETE SET NULL,  -- Hierarchical
  
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
CREATE INDEX topics_slug_idx ON topics(slug);
CREATE INDEX topics_parent_id_idx ON topics(parent_id);
CREATE INDEX topics_is_featured_idx ON topics(is_featured);

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
```

**RLS Policies:**
```sql
-- Topics are public
CREATE POLICY "Topics are public"
  ON topics FOR SELECT
  USING (true);

-- Only admins can create/update topics
CREATE POLICY "Only admins can modify topics"
  ON topics FOR INSERT
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update topics"
  ON topics FOR UPDATE
  USING (is_admin(auth.uid()));
```

---

## PHASE 2: ENGAGEMENT & FEEDBACK (Weeks 3-4)

### 2.1: CREATE MESSAGE_FEEDBACK TABLE

**Purpose:** Multi-dimensional community feedback (replaces judging)

```sql
CREATE TABLE message_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- What's being rated
  message_id UUID NOT NULL REFERENCES conversation_messages(id) ON DELETE CASCADE,
  
  -- Who's rating
  rater_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Multi-dimensional feedback types
  -- Each is a boolean flag (user selects what applies)
  thought_provoking BOOLEAN,      -- Made me reconsider
  well_reasoned BOOLEAN,          -- Strong logic
  clearly_explained BOOLEAN,      -- Easy to understand
  includes_evidence BOOLEAN,      -- Supports with examples
  opens_new_perspective BOOLEAN,  -- Showed different angle
  
  -- Optional comment
  comment TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent duplicate feedback from same user
  UNIQUE(message_id, rater_id)
);

-- Indexes
CREATE INDEX message_feedback_message_id_idx ON message_feedback(message_id);
CREATE INDEX message_feedback_rater_id_idx ON message_feedback(rater_id);

-- Trigger to update message quality_score
CREATE OR REPLACE FUNCTION update_message_quality_score()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversation_messages
  SET quality_score = (
    SELECT COUNT(*) * 0.2 
    FROM message_feedback 
    WHERE message_id = NEW.message_id
    AND (
      thought_provoking OR 
      well_reasoned OR 
      clearly_explained OR 
      includes_evidence OR 
      opens_new_perspective
    )
  )
  WHERE id = NEW.message_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER message_feedback_update_quality
  AFTER INSERT OR UPDATE ON message_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_message_quality_score();
```

**RLS Policies:**
```sql
-- Everyone can see feedback
CREATE POLICY "Feedback is public"
  ON message_feedback FOR SELECT
  USING (true);

-- Users can create feedback
CREATE POLICY "Users can create feedback"
  ON message_feedback FOR INSERT
  WITH CHECK (auth.uid() = rater_id);

-- Users can edit their own feedback
CREATE POLICY "Users can edit their feedback"
  ON message_feedback FOR UPDATE
  USING (auth.uid() = rater_id);
```

### 2.2: CREATE CONVERSATION_PARTICIPANTS TABLE

**Purpose:** Track who participates in conversations (for community building)

```sql
CREATE TABLE conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Participation tracking
  message_count INTEGER DEFAULT 0,
  perspective_type TEXT,  -- Primary perspective this user takes
  
  -- Engagement
  last_message_at TIMESTAMPTZ,
  
  -- Dates
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent duplicates
  UNIQUE(conversation_id, user_id)
);

-- Indexes
CREATE INDEX conversation_participants_conversation_id_idx 
  ON conversation_participants(conversation_id);
CREATE INDEX conversation_participants_user_id_idx 
  ON conversation_participants(user_id);
```

---

## PHASE 3: USER PREFERENCES & MODERATION (Weeks 5-6)

### 3.1: CREATE USER_PREFERENCES TABLE

**Purpose:** Store user settings and preferences

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
  
  -- Dates
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX user_preferences_user_id_idx ON user_preferences(user_id);
```

### 3.2: CREATE MODERATION_LOGS TABLE

**Purpose:** Track all moderation actions for transparency

```sql
CREATE TABLE moderation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- What was moderated
  target_type TEXT NOT NULL CHECK (target_type IN (
    'message', 'conversation', 'profile', 'comment'
  )),
  target_id UUID NOT NULL,
  
  -- Moderator
  moderator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  
  -- Action taken
  action TEXT NOT NULL CHECK (action IN (
    'flag', 'hide', 'delete', 'warn', 'ban', 'lock', 'feature', 'unflag'
  )),
  
  -- Reason
  reason TEXT NOT NULL,
  notes TEXT,
  
  -- Transparency
  is_visible_to_user BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  appealed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX moderation_logs_target_idx ON moderation_logs(target_type, target_id);
CREATE INDEX moderation_logs_moderator_idx ON moderation_logs(moderator_id);
CREATE INDEX moderation_logs_action_idx ON moderation_logs(action);
```

### 3.3: CREATE BLOCKS TABLE

**Purpose:** User blocking functionality

```sql
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  blocker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Metadata
  reason TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent duplicates
  UNIQUE(blocker_id, blocked_id),
  
  -- Prevent self-blocks
  CHECK (blocker_id != blocked_id)
);

-- Indexes
CREATE INDEX blocks_blocker_id_idx ON blocks(blocker_id);
CREATE INDEX blocks_blocked_id_idx ON blocks(blocked_id);
```

---

## PHASE 4: OPTIONAL FEATURES (Weeks 7-12)

### 4.1: CREATE SAVED_CONVERSATIONS TABLE

**Purpose:** Users can bookmark conversations

```sql
CREATE TABLE saved_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, conversation_id)
);
```

### 4.2: CREATE FOLLOWS TABLE

**Purpose:** Users can follow other users

```sql
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);
```

### 4.3: CREATE PHILOSOPHY_CIRCLES TABLE

**Purpose:** Group-based recurring conversations (philosophy study groups)

```sql
CREATE TABLE philosophy_circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name TEXT NOT NULL,
  description TEXT,
  
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Privacy
  is_public BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE circle_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  circle_id UUID NOT NULL REFERENCES philosophy_circles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  role TEXT DEFAULT 'member' CHECK (role IN ('creator', 'moderator', 'member')),
  
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(circle_id, user_id)
);
```

---

## MIGRATION STRATEGY

### Step 1: Prepare (Week 1)
```sql
-- Create all new tables
-- Create backup of old data
CREATE TABLE debates_backup AS SELECT * FROM debates;
CREATE TABLE arguments_backup AS SELECT * FROM arguments;
CREATE TABLE judgments_backup AS SELECT * FROM judgments;
```

### Step 2: Populate from Old Schema (Week 2)
```sql
-- Migrate debates → conversations
INSERT INTO conversations (id, title, description, creator_id, created_at, status)
SELECT 
  id,
  topic,
  description,
  created_by,
  created_at,
  CASE status WHEN 'completed' THEN 'archived' ELSE 'active' END
FROM debates_backup;

-- Migrate arguments → conversation_messages
INSERT INTO conversation_messages (id, conversation_id, user_id, content, perspective_type, created_at)
SELECT
  id,
  debate_id,
  user_id,
  content,
  CASE position WHEN 'for' THEN 'supporting' ELSE 'critical' END,
  created_at
FROM arguments_backup;

-- Update profile stats
UPDATE profiles p
SET 
  conversations_initiated = (
    SELECT COUNT(*) FROM conversations_backup WHERE creator_id = p.id
  ),
  conversations_participated_in = (
    SELECT COUNT(DISTINCT conversation_id) FROM arguments_backup WHERE user_id = p.id
  ),
  total_messages = (
    SELECT COUNT(*) FROM arguments_backup WHERE user_id = p.id
  );
```

### Step 3: Verify & Test (Week 3)
- Run data consistency checks
- Test all RLS policies
- Verify all relationships
- Performance testing on new indexes

### Step 4: Switch Over (Week 4)
- Update application code to use new tables
- Monitor for errors
- Prepare rollback if needed

### Step 5: Cleanup (Week 5)
```sql
-- After verification, drop old tables
DROP TABLE IF EXISTS judgments;
DROP TABLE IF EXISTS arguments;
DROP TABLE IF EXISTS debates;

-- Keep backup for 30 days
-- DROP TABLE debates_backup, arguments_backup, judgments_backup; -- Later
```

---

## SUMMARY OF CHANGES

### Tables to Remove
- `debates` (replaced by `conversations`)
- `arguments` (replaced by `conversation_messages`)
- `judgments` (no conversation-first equivalent)

### Tables to Create
- `conversations` - Main conversation threads
- `conversation_messages` - Messages within conversations
- `topics` - Philosophical topic organization
- `message_feedback` - Multi-dimensional community feedback
- `conversation_participants` - Participation tracking
- `user_preferences` - User settings
- `moderation_logs` - Audit trail
- `blocks` - User blocking
- (Optional) `saved_conversations`, `follows`, `philosophy_circles`

### Tables to Modify
- `profiles` - Remove competitive fields, add contribution tracking

### Functions/Triggers to Remove
- `update_reputation_after_debate()` - No longer relevant
- `debate_completed_reputation_update` trigger - No longer relevant

### Functions/Triggers to Create
- `update_message_quality_score()` - Aggregates feedback
- `update_conversation_counts()` - Maintains denormalized counts
- (And others for various automations)

---

## ESTIMATED TIMELINE

| Phase | Duration | Tasks | Priority |
|-------|----------|-------|----------|
| 1 | Weeks 1-2 | Core tables (conversations, messages, topics) | CRITICAL |
| 2 | Weeks 3-4 | Feedback and participation tracking | HIGH |
| 3 | Weeks 5-6 | User preferences, moderation, blocks | HIGH |
| 4 | Weeks 7-12 | Saved conversations, follows, circles | MEDIUM |

**Total for Core:** 6 weeks  
**Total with Optional:** 12 weeks

