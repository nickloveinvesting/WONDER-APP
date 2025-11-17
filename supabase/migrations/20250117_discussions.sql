-- Create discussions table
CREATE TABLE discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('moral', 'ai', 'philosophical', 'existential')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  comment_count INTEGER DEFAULT 0
);

-- Create discussion_comments table
CREATE TABLE discussion_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  parent_comment_id UUID REFERENCES discussion_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create comment_votes table (track who voted)
CREATE TABLE comment_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID REFERENCES discussion_comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- Enable RLS
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Discussions are viewable by everyone"
  ON discussions FOR SELECT USING (true);

CREATE POLICY "Discussion comments are viewable by everyone"
  ON discussion_comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON discussion_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON discussion_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON discussion_comments FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can vote"
  ON comment_votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all votes"
  ON comment_votes FOR SELECT USING (true);

CREATE POLICY "Users can delete their own votes"
  ON comment_votes FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX discussions_category_idx ON discussions(category);
CREATE INDEX discussion_comments_discussion_id_idx ON discussion_comments(discussion_id);
CREATE INDEX discussion_comments_user_id_idx ON discussion_comments(user_id);
CREATE INDEX comment_votes_comment_id_idx ON comment_votes(comment_id);

-- RPC Functions for comment count
CREATE OR REPLACE FUNCTION increment_discussion_comment_count(discussion_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE discussions
  SET comment_count = comment_count + 1
  WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_discussion_comment_count(discussion_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE discussions
  SET comment_count = GREATEST(comment_count - 1, 0)
  WHERE id = discussion_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert initial discussion questions
INSERT INTO discussions (question, description, category) VALUES
  ('If you could upload your consciousness to a computer, would you still be "you"?', 'Explore the nature of identity, consciousness, and what makes us human in the age of digital immortality.', 'ai'),
  ('Is it ever morally acceptable to lie to someone for their own good?', 'Examine the tension between honesty and compassion, and whether paternalistic deception can be justified.', 'moral'),
  ('Does free will exist, or is everything we do predetermined?', 'Dive into determinism vs. libertarianism and what neuroscience tells us about human agency.', 'philosophical'),
  ('If AI becomes conscious, do we owe it moral consideration?', 'Consider the ethical implications of sentient artificial intelligence and machine rights.', 'ai'),
  ('What do you owe to strangers vs. what you owe to family and friends?', 'Explore moral circles, partiality, effective altruism, and the scope of our ethical obligations.', 'moral'),
  ('Is meaning something we discover or something we create?', 'Examine existentialist vs. essentialist views on the purpose and meaning of life.', 'existential'),
  ('Should we prioritize extending human lifespan or improving quality of life?', 'Debate longevity research, resource allocation, and what truly makes life worth living.', 'philosophical'),
  ('Can you be friends with someone whose core values fundamentally oppose yours?', 'Investigate the limits of pluralism, tolerance, and what common ground is necessary for genuine friendship.', 'moral'),
  ('If no one ever found out, would it still be wrong?', 'Challenge consequentialist ethics and explore whether morality depends on outcomes or intentions.', 'moral'),
  ('What responsibilities do we have to future generations we'll never meet?', 'Consider intergenerational justice, climate ethics, and our obligations to the unborn.', 'philosophical');
