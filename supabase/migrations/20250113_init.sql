-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  reputation_score INTEGER DEFAULT 0,
  debates_won INTEGER DEFAULT 0,
  debates_participated INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30)
);

-- Create debates table
CREATE TABLE debates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed')),
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  for_participant UUID REFERENCES profiles(id) ON DELETE SET NULL,
  against_participant UUID REFERENCES profiles(id) ON DELETE SET NULL,
  winner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Create arguments table
CREATE TABLE arguments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debate_id UUID REFERENCES debates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  position TEXT NOT NULL CHECK (position IN ('for', 'against')),
  content TEXT NOT NULL,
  round INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create judgments table
CREATE TABLE judgments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debate_id UUID REFERENCES debates(id) ON DELETE CASCADE,
  winner_position TEXT CHECK (winner_position IN ('for', 'against', 'tie')),
  reasoning TEXT NOT NULL,
  fact_checks JSONB DEFAULT '[]'::jsonb,
  scores JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE debates ENABLE ROW LEVEL SECURITY;
ALTER TABLE arguments ENABLE ROW LEVEL SECURITY;
ALTER TABLE judgments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Debates policies
CREATE POLICY "Debates are viewable by everyone"
  ON debates FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create debates"
  ON debates FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Participants can update their debates"
  ON debates FOR UPDATE
  USING (
    auth.uid() = created_by OR
    auth.uid() = for_participant OR
    auth.uid() = against_participant
  );

-- Arguments policies
CREATE POLICY "Arguments are viewable by everyone"
  ON arguments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create arguments"
  ON arguments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Judgments policies
CREATE POLICY "Judgments are viewable by everyone"
  ON judgments FOR SELECT
  USING (true);

-- Indexes
CREATE INDEX profiles_username_idx ON profiles(username);
CREATE INDEX debates_status_idx ON debates(status);
CREATE INDEX debates_created_at_idx ON debates(created_at DESC);
CREATE INDEX arguments_debate_id_idx ON arguments(debate_id);
CREATE INDEX judgments_debate_id_idx ON judgments(debate_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Philosopher')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update reputation after debate
CREATE OR REPLACE FUNCTION update_reputation_after_debate()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.winner_id IS NOT NULL AND OLD.winner_id IS NULL THEN
    -- Winner gets 10 points
    UPDATE profiles
    SET reputation_score = reputation_score + 10,
        debates_won = debates_won + 1
    WHERE id = NEW.winner_id;

    -- Both participants get participation credit
    UPDATE profiles
    SET debates_participated = debates_participated + 1
    WHERE id IN (NEW.for_participant, NEW.against_participant);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update reputation
CREATE TRIGGER debate_completed_reputation_update
  AFTER UPDATE ON debates
  FOR EACH ROW
  WHEN (NEW.status = 'completed' AND OLD.status != 'completed')
  EXECUTE FUNCTION update_reputation_after_debate();
