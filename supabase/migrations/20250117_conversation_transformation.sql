-- =====================================================
-- PONDER PLATFORM TRANSFORMATION
-- Debates → Conversations Migration
-- Date: 2025-01-17
-- =====================================================

-- Step 1: Add new fields to debates table (will rename to conversations later)
-- =====================================================

ALTER TABLE debates
ADD COLUMN IF NOT EXISTS conversation_type TEXT DEFAULT 'open_discussion' CHECK (conversation_type IN ('open_discussion', 'socratic_dialogue', 'reading_group', 'question_exploration')),
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS goals TEXT,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Step 2: Add new fields to profiles
-- =====================================================

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS expertise_areas TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS learning_interests TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS conversations_participated INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_messages INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS influence_score INTEGER DEFAULT 0;

-- Update influence_score from existing delo_rating if it exists
UPDATE profiles SET influence_score = COALESCE(delo_rating, 0) WHERE influence_score = 0;

-- Step 3: Transform arguments table
-- =====================================================

-- Add new fields to arguments
ALTER TABLE arguments
ADD COLUMN IF NOT EXISTS perspective_type TEXT CHECK (perspective_type IN ('supporting', 'questioning', 'alternative', 'synthesis', NULL)),
ADD COLUMN IF NOT EXISTS resource_links TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS parent_message_id UUID REFERENCES arguments(id) ON DELETE SET NULL;

-- Step 4: Create conversation_participants table (for multi-participant support)
-- =====================================================

CREATE TABLE IF NOT EXISTS conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES debates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_contributed_at TIMESTAMPTZ,
  message_count INTEGER DEFAULT 0,
  UNIQUE(conversation_id, user_id)
);

-- Migrate existing participants from debates table
INSERT INTO conversation_participants (conversation_id, user_id, joined_at, message_count)
SELECT
  d.id,
  d.for_participant,
  d.created_at,
  (SELECT COUNT(*) FROM arguments WHERE debate_id = d.id AND user_id = d.for_participant)
FROM debates d
WHERE d.for_participant IS NOT NULL
ON CONFLICT (conversation_id, user_id) DO NOTHING;

INSERT INTO conversation_participants (conversation_id, user_id, joined_at, message_count)
SELECT
  d.id,
  d.against_participant,
  d.created_at,
  (SELECT COUNT(*) FROM arguments WHERE debate_id = d.id AND user_id = d.against_participant)
FROM debates d
WHERE d.against_participant IS NOT NULL
ON CONFLICT (conversation_id, user_id) DO NOTHING;

-- Step 5: Enable RLS on new table
-- =====================================================

ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view conversation participants"
  ON conversation_participants FOR SELECT
  USING (true);

CREATE POLICY "Users can join conversations"
  ON conversation_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Step 6: Create message_feedback table (replaces judgments for community signals)
-- =====================================================

CREATE TABLE IF NOT EXISTS message_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES arguments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('insightful', 'well_reasoned', 'changed_view', 'needs_citation', 'helpful')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(message_id, user_id, feedback_type)
);

ALTER TABLE message_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view message feedback"
  ON message_feedback FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can give feedback"
  ON message_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Step 7: Update profile stats based on new model
-- =====================================================

-- Update conversations_participated
UPDATE profiles p
SET conversations_participated = (
  SELECT COUNT(DISTINCT debate_id)
  FROM arguments
  WHERE user_id = p.id
);

-- Update total_messages
UPDATE profiles p
SET total_messages = (
  SELECT COUNT(*)
  FROM arguments
  WHERE user_id = p.id
);

-- Step 8: Add indexes for performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_debates_tags ON debates USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_debates_conversation_type ON debates (conversation_type);
CREATE INDEX IF NOT EXISTS idx_debates_featured ON debates (featured);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_conversation ON conversation_participants (conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_user ON conversation_participants (user_id);
CREATE INDEX IF NOT EXISTS idx_arguments_perspective_type ON arguments (perspective_type);
CREATE INDEX IF NOT EXISTS idx_message_feedback_message ON message_feedback (message_id);
CREATE INDEX IF NOT EXISTS idx_profiles_expertise ON profiles USING GIN (expertise_areas);
CREATE INDEX IF NOT EXISTS idx_profiles_interests ON profiles USING GIN (learning_interests);

-- =====================================================
-- NOTES FOR FUTURE MIGRATIONS:
-- =====================================================
--
-- TODO (Phase 2 - Optional cleanup):
-- 1. Rename 'debates' table to 'conversations'
-- 2. Rename 'arguments' table to 'conversation_messages'
-- 3. Drop 'for_participant', 'against_participant', 'winner_id' columns from debates
-- 4. Drop 'position' column from arguments
-- 5. Drop 'judgments' table (or archive it)
-- 6. Drop 'debates_won', 'debates_participated' from profiles (replaced by new fields)
--
-- These are left as TODO because they require:
-- - Application code to be fully migrated first
-- - Data archival strategy for historical debates
-- - Careful coordination with deployment
--
-- For now, old columns remain but are unused in application layer.
-- =====================================================

COMMENT ON TABLE conversation_participants IS 'Tracks all participants in a conversation (supports multiple users, not just 2)';
COMMENT ON TABLE message_feedback IS 'Community signals for message quality (replaces competitive judgments)';
COMMENT ON COLUMN debates.conversation_type IS 'Type of philosophical conversation (open_discussion, socratic_dialogue, reading_group, question_exploration)';
COMMENT ON COLUMN debates.tags IS 'Topic tags for discovery and filtering (e.g., ethics, ai, metaphysics)';
COMMENT ON COLUMN profiles.influence_score IS 'Influence based on contribution quality and community impact (replaces competitive DeLO rating)';
COMMENT ON COLUMN arguments.perspective_type IS 'Optional categorization of contribution type (supporting, questioning, alternative, synthesis)';
