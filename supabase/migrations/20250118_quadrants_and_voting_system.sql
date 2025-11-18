-- PONDER QUADRANTS & VOTING SYSTEM
-- Transforms debates into posts with quadrants and Snap/Zap voting

-- =====================================================
-- 1. ADD QUADRANTS TO DEBATES (NOW "POSTS")
-- =====================================================

-- Define quadrant enum
CREATE TYPE quadrant_type AS ENUM (
  'ai_technology',
  'philosophy',
  'morality_ethics',
  'economics_society'
);

-- Add quadrant to debates table
ALTER TABLE debates
  ADD COLUMN IF NOT EXISTS quadrant quadrant_type DEFAULT 'philosophy';

-- Add tags for more granular categorization within quadrants
ALTER TABLE debates
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Add expiration for 24-hour questions
ALTER TABLE debates
  ADD COLUMN IF NOT EXISTS is_daily_question BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

-- Create index for quadrant filtering
CREATE INDEX IF NOT EXISTS idx_debates_quadrant ON debates(quadrant);
CREATE INDEX IF NOT EXISTS idx_debates_daily_question ON debates(is_daily_question, expires_at);

-- =====================================================
-- 2. SNAP/ZAP VOTING SYSTEM
-- =====================================================

-- Votes on posts (debates)
CREATE TABLE IF NOT EXISTS post_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES debates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('snap', 'zap')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Votes on comments (arguments)
CREATE TABLE IF NOT EXISTS comment_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID REFERENCES arguments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('snap', 'zap')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- Add vote counts to debates for performance
ALTER TABLE debates
  ADD COLUMN IF NOT EXISTS snap_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS zap_count INTEGER DEFAULT 0;

-- Add vote counts to arguments for performance
ALTER TABLE arguments
  ADD COLUMN IF NOT EXISTS snap_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS zap_count INTEGER DEFAULT 0;

-- Create indexes for voting queries
CREATE INDEX IF NOT EXISTS idx_post_votes_post ON post_votes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_votes_user ON post_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_comment_votes_comment ON comment_votes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_votes_user ON comment_votes(user_id);

-- =====================================================
-- 3. VOTE COUNT UPDATE TRIGGERS
-- =====================================================

-- Function to update post vote counts
CREATE OR REPLACE FUNCTION update_post_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'snap' THEN
      UPDATE debates SET snap_count = snap_count + 1 WHERE id = NEW.post_id;
    ELSE
      UPDATE debates SET zap_count = zap_count + 1 WHERE id = NEW.post_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'snap' THEN
      UPDATE debates SET snap_count = snap_count - 1 WHERE id = OLD.post_id;
    ELSE
      UPDATE debates SET zap_count = zap_count - 1 WHERE id = OLD.post_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    -- User changed vote type
    IF OLD.vote_type = 'snap' AND NEW.vote_type = 'zap' THEN
      UPDATE debates SET snap_count = snap_count - 1, zap_count = zap_count + 1 WHERE id = NEW.post_id;
    ELSIF OLD.vote_type = 'zap' AND NEW.vote_type = 'snap' THEN
      UPDATE debates SET snap_count = snap_count + 1, zap_count = zap_count - 1 WHERE id = NEW.post_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update comment vote counts
CREATE OR REPLACE FUNCTION update_comment_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'snap' THEN
      UPDATE arguments SET snap_count = snap_count + 1 WHERE id = NEW.comment_id;
    ELSE
      UPDATE arguments SET zap_count = zap_count + 1 WHERE id = NEW.comment_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'snap' THEN
      UPDATE arguments SET snap_count = snap_count - 1 WHERE id = OLD.comment_id;
    ELSE
      UPDATE arguments SET zap_count = zap_count - 1 WHERE id = OLD.comment_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    -- User changed vote type
    IF OLD.vote_type = 'snap' AND NEW.vote_type = 'zap' THEN
      UPDATE arguments SET snap_count = snap_count - 1, zap_count = zap_count + 1 WHERE id = NEW.comment_id;
    ELSIF OLD.vote_type = 'zap' AND NEW.vote_type = 'snap' THEN
      UPDATE arguments SET snap_count = snap_count + 1, zap_count = zap_count - 1 WHERE id = NEW.comment_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS post_vote_count_trigger ON post_votes;
CREATE TRIGGER post_vote_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON post_votes
  FOR EACH ROW EXECUTE FUNCTION update_post_vote_counts();

DROP TRIGGER IF EXISTS comment_vote_count_trigger ON comment_votes;
CREATE TRIGGER comment_vote_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON comment_votes
  FOR EACH ROW EXECUTE FUNCTION update_comment_vote_counts();

-- =====================================================
-- 4. HELPER VIEWS FOR SORTING (HOT, TOP, etc.)
-- =====================================================

-- Hot score calculation (Reddit-style: upvotes - downvotes, time decay)
CREATE OR REPLACE FUNCTION calculate_hot_score(
  snap_count INTEGER,
  zap_count INTEGER,
  created_at TIMESTAMPTZ
)
RETURNS NUMERIC AS $$
DECLARE
  score INTEGER;
  age_hours NUMERIC;
BEGIN
  score := snap_count - zap_count;
  age_hours := EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600;

  -- Reddit hot algorithm: score / (age + 2)^1.5
  RETURN score::NUMERIC / POWER(age_hours + 2, 1.5);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- View for hot posts
CREATE OR REPLACE VIEW hot_posts AS
SELECT
  d.*,
  calculate_hot_score(d.snap_count, d.zap_count, d.created_at) as hot_score
FROM debates d
WHERE d.is_daily_question = false OR d.expires_at > NOW()
ORDER BY hot_score DESC;

-- =====================================================
-- 5. UPDATE DAILY PROMPTS INTEGRATION
-- =====================================================

-- Link daily prompts to debates when question is posted
ALTER TABLE daily_prompts
  ADD COLUMN IF NOT EXISTS posted_debate_id UUID REFERENCES debates(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS posted_at TIMESTAMPTZ;

-- =====================================================
-- 6. RLS POLICIES FOR VOTING
-- =====================================================

-- Enable RLS on voting tables
ALTER TABLE post_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;

-- Users can view all votes
CREATE POLICY "Anyone can view post votes"
  ON post_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view comment votes"
  ON comment_votes FOR SELECT
  TO authenticated
  USING (true);

-- Users can only insert their own votes
CREATE POLICY "Users can insert own post votes"
  ON post_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own comment votes"
  ON comment_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own votes
CREATE POLICY "Users can update own post votes"
  ON post_votes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own comment votes"
  ON comment_votes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only delete their own votes
CREATE POLICY "Users can delete own post votes"
  ON post_votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comment votes"
  ON comment_votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- 7. SEED DEFAULT QUADRANT DATA
-- =====================================================

-- Update existing debates to have a default quadrant
UPDATE debates
SET quadrant = 'philosophy'
WHERE quadrant IS NULL;

COMMENT ON COLUMN debates.quadrant IS 'Quadrant category: ai_technology, philosophy, morality_ethics, economics_society';
COMMENT ON COLUMN debates.is_daily_question IS 'True if this is the 24-hour featured question';
COMMENT ON COLUMN debates.expires_at IS 'When the question text disappears (discussion persists)';
COMMENT ON TABLE post_votes IS 'Snap/Zap votes on posts (debates)';
COMMENT ON TABLE comment_votes IS 'Snap/Zap votes on comments (arguments)';
