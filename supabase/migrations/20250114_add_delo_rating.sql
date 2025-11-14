-- Add DeLO rating column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS delo_rating INTEGER DEFAULT 1000;

-- Add index for efficient leaderboard queries
CREATE INDEX IF NOT EXISTS profiles_delo_rating_idx ON profiles(delo_rating DESC);

-- Add comment to explain the column
COMMENT ON COLUMN profiles.delo_rating IS 'DeLO (Debate Elo) rating system - users start at 1000';
