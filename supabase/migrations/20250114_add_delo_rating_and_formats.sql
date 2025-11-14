-- Migration: Add DeLO Rating System, Upvoting, and Debate Formats
-- Date: 2025-01-14

-- ============================================
-- 1. UPDATE PROFILES TABLE
-- ============================================

-- Add DeLO Rating fields
ALTER TABLE profiles
ADD COLUMN delo_rating INTEGER DEFAULT 800,
ADD COLUMN delo_rating_provisional BOOLEAN DEFAULT true,
ADD COLUMN peak_rating INTEGER DEFAULT 800,
ADD COLUMN rating_volatility DECIMAL DEFAULT 50.0;

-- Add DeLO category ratings
ALTER TABLE profiles
ADD COLUMN delo_categories JSONB DEFAULT '{
  "ethics": 800,
  "logic": 800,
  "metaphysics": 800,
  "epistemology": 800,
  "political_philosophy": 800,
  "aesthetics": 800
}'::jsonb;

-- Add win/loss record tracking
ALTER TABLE profiles
ADD COLUMN win_loss_record JSONB DEFAULT '{
  "total_wins": 0,
  "total_losses": 0,
  "total_draws": 0,
  "win_rate": 0.5,
  "recent_results": [],
  "by_category": {
    "ethics": {"wins": 0, "losses": 0, "draws": 0},
    "logic": {"wins": 0, "losses": 0, "draws": 0},
    "metaphysics": {"wins": 0, "losses": 0, "draws": 0},
    "epistemology": {"wins": 0, "losses": 0, "draws": 0},
    "political_philosophy": {"wins": 0, "losses": 0, "draws": 0},
    "aesthetics": {"wins": 0, "losses": 0, "draws": 0}
  },
  "streak": {
    "current": 0,
    "direction": "neutral",
    "longest": 0
  }
}'::jsonb;

-- Add upvoting/karma fields
ALTER TABLE profiles
ADD COLUMN total_upvotes INTEGER DEFAULT 0,
ADD COLUMN avg_upvote_ratio DECIMAL DEFAULT 0.5;

-- Track debate count by format
ALTER TABLE profiles
ADD COLUMN debates_by_format JSONB DEFAULT '{
  "quick_match": 0,
  "standard": 0,
  "deep_debate": 0,
  "lightning_round": 0
}'::jsonb;

-- ============================================
-- 2. UPDATE DEBATES TABLE
-- ============================================

-- Add debate format and category
ALTER TABLE debates
ADD COLUMN debate_format TEXT DEFAULT 'standard'
  CHECK (debate_format IN ('quick_match', 'standard', 'deep_debate', 'lightning_round')),
ADD COLUMN category TEXT DEFAULT 'ethics'
  CHECK (category IN ('ethics', 'logic', 'metaphysics', 'epistemology', 'political_philosophy', 'aesthetics'));

-- Track when debate actually started (for time limits)
ALTER TABLE debates
ADD COLUMN started_at TIMESTAMPTZ,
ADD COLUMN rating_processed BOOLEAN DEFAULT false;

-- ============================================
-- 3. UPDATE ARGUMENTS TABLE
-- ============================================

-- Add voting fields
ALTER TABLE arguments
ADD COLUMN upvotes INTEGER DEFAULT 0,
ADD COLUMN downvotes INTEGER DEFAULT 0,
ADD COLUMN net_votes INTEGER DEFAULT 0,
ADD COLUMN upvote_ratio DECIMAL DEFAULT 0.5;

-- Add quality metrics
ALTER TABLE arguments
ADD COLUMN time_spent_seconds INTEGER,
ADD COLUMN word_count INTEGER DEFAULT 0,
ADD COLUMN character_count INTEGER DEFAULT 0,
ADD COLUMN quality_score DECIMAL DEFAULT 0.5;

-- ============================================
-- 4. CREATE ARGUMENT_VOTES TABLE
-- ============================================

CREATE TABLE argument_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  argument_id UUID REFERENCES arguments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(argument_id, user_id) -- One vote per user per argument
);

-- Indexes for votes
CREATE INDEX argument_votes_argument_idx ON argument_votes(argument_id);
CREATE INDEX argument_votes_user_idx ON argument_votes(user_id);
CREATE INDEX argument_votes_created_at_idx ON argument_votes(created_at DESC);

-- Enable RLS for votes
ALTER TABLE argument_votes ENABLE ROW LEVEL SECURITY;

-- Votes policies
CREATE POLICY "Votes are viewable by everyone"
  ON argument_votes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create votes"
  ON argument_votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON argument_votes FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 5. HELPER FUNCTIONS
-- ============================================

-- Function to update argument vote counts and ratios
CREATE OR REPLACE FUNCTION update_argument_votes()
RETURNS TRIGGER AS $$
DECLARE
  upvotes_count INTEGER;
  downvotes_count INTEGER;
  total_votes INTEGER;
  new_upvote_ratio DECIMAL;
  author_id UUID;
BEGIN
  -- Get argument if deleting
  IF TG_OP = 'DELETE' THEN
    -- Count votes for this argument
    SELECT COUNT(*) INTO upvotes_count FROM argument_votes
      WHERE argument_id = OLD.argument_id AND vote_type = 'upvote';
    SELECT COUNT(*) INTO downvotes_count FROM argument_votes
      WHERE argument_id = OLD.argument_id AND vote_type = 'downvote';
  ELSE
    -- Count votes for this argument
    SELECT COUNT(*) INTO upvotes_count FROM argument_votes
      WHERE argument_id = NEW.argument_id AND vote_type = 'upvote';
    SELECT COUNT(*) INTO downvotes_count FROM argument_votes
      WHERE argument_id = NEW.argument_id AND vote_type = 'downvote';
  END IF;

  total_votes := upvotes_count + downvotes_count;

  IF total_votes > 0 THEN
    new_upvote_ratio := upvotes_count::DECIMAL / total_votes;
  ELSE
    new_upvote_ratio := 0.5;
  END IF;

  -- Update argument
  IF TG_OP = 'DELETE' THEN
    UPDATE arguments SET
      upvotes = upvotes_count,
      downvotes = downvotes_count,
      net_votes = upvotes_count - downvotes_count,
      upvote_ratio = new_upvote_ratio
    WHERE id = OLD.argument_id;
  ELSE
    UPDATE arguments SET
      upvotes = upvotes_count,
      downvotes = downvotes_count,
      net_votes = upvotes_count - downvotes_count,
      upvote_ratio = new_upvote_ratio
    WHERE id = NEW.argument_id;
  END IF;

  -- Update author's profile karma
  IF TG_OP = 'DELETE' THEN
    SELECT user_id INTO author_id FROM arguments WHERE id = OLD.argument_id;
  ELSE
    SELECT user_id INTO author_id FROM arguments WHERE id = NEW.argument_id;
  END IF;

  -- Recalculate total upvotes for author (sum all their upvotes)
  UPDATE profiles SET
    total_upvotes = (
      SELECT COALESCE(SUM(upvotes), 0) FROM arguments WHERE user_id = author_id
    ),
    avg_upvote_ratio = (
      SELECT COALESCE(AVG(upvote_ratio), 0.5) FROM arguments WHERE user_id = author_id
    )
  WHERE id = author_id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update votes
CREATE TRIGGER argument_votes_updated
AFTER INSERT OR DELETE ON argument_votes
FOR EACH ROW
EXECUTE FUNCTION update_argument_votes();

-- Function to calculate word and character count when argument is created
CREATE OR REPLACE FUNCTION calculate_argument_stats()
RETURNS TRIGGER AS $$
BEGIN
  NEW.word_count := array_length(string_to_array(trim(NEW.content), ' '), 1);
  NEW.character_count := length(NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to calculate stats on insert
CREATE TRIGGER argument_stats_calculated
BEFORE INSERT ON arguments
FOR EACH ROW
EXECUTE FUNCTION calculate_argument_stats();

-- ============================================
-- 6. INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX profiles_delo_rating_idx ON profiles(delo_rating DESC);
CREATE INDEX profiles_peak_rating_idx ON profiles(peak_rating DESC);
CREATE INDEX debates_format_idx ON debates(debate_format);
CREATE INDEX debates_category_idx ON debates(category);
CREATE INDEX debates_rating_processed_idx ON debates(rating_processed);
CREATE INDEX arguments_upvote_ratio_idx ON arguments(upvote_ratio DESC);
CREATE INDEX arguments_quality_score_idx ON arguments(quality_score DESC);
CREATE INDEX arguments_user_idx ON arguments(user_id);

-- ============================================
-- 7. UPDATED REPUTATION TRIGGER (OPTIONAL - can be deprecated)
-- ============================================

-- Keep the old reputation trigger for backward compatibility
-- but it will be superseded by DeLO rating in the application logic
-- The trigger now also updates win_loss_record and provisional status

DROP TRIGGER IF EXISTS debate_completed_reputation_update ON debates;

CREATE OR REPLACE FUNCTION update_reputation_after_debate()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- This trigger is now minimal - the application layer handles DeLO calculations
    -- This just ensures backward compatibility with debates_won/debates_participated

    IF NEW.winner_id IS NOT NULL THEN
      UPDATE profiles
      SET reputation_score = reputation_score + 10,
          debates_won = debates_won + 1
      WHERE id = NEW.winner_id;
    END IF;

    -- Both participants get participation credit
    UPDATE profiles
    SET debates_participated = debates_participated + 1
    WHERE id IN (NEW.for_participant, NEW.against_participant);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER debate_completed_reputation_update
  AFTER UPDATE ON debates
  FOR EACH ROW
  WHEN (NEW.status = 'completed' AND OLD.status != 'completed')
  EXECUTE FUNCTION update_reputation_after_debate();
