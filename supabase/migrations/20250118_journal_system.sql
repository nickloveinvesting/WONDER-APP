-- PRIVATE JOURNAL & NOTEBOOK SYSTEM
-- Allows users to keep private notes and research, with option to publish

-- =====================================================
-- 1. JOURNAL FOLDERS (ORGANIZATION)
-- =====================================================

CREATE TABLE IF NOT EXISTS journal_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#64748b', -- slate-500
  icon TEXT DEFAULT '📓',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

CREATE INDEX IF NOT EXISTS idx_journal_folders_user ON journal_folders(user_id);

-- =====================================================
-- 2. JOURNAL ENTRIES
-- =====================================================

CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES journal_folders(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',

  -- Publishing metadata
  is_published BOOLEAN DEFAULT false,
  published_debate_id UUID REFERENCES debates(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_journal_entries_user ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_folder ON journal_entries(folder_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_published ON journal_entries(is_published);

-- =====================================================
-- 3. AUTO-UPDATE TIMESTAMPS
-- =====================================================

CREATE OR REPLACE FUNCTION update_journal_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER journal_folders_updated_at
  BEFORE UPDATE ON journal_folders
  FOR EACH ROW EXECUTE FUNCTION update_journal_timestamp();

CREATE TRIGGER journal_entries_updated_at
  BEFORE UPDATE ON journal_entries
  FOR EACH ROW EXECUTE FUNCTION update_journal_timestamp();

-- =====================================================
-- 4. RLS POLICIES (PRIVACY)
-- =====================================================

ALTER TABLE journal_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Users can only see their own folders
CREATE POLICY "Users can view own folders"
  ON journal_folders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own folders"
  ON journal_folders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own folders"
  ON journal_folders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own folders"
  ON journal_folders FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can only see their own entries
CREATE POLICY "Users can view own entries"
  ON journal_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own entries"
  ON journal_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entries"
  ON journal_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own entries"
  ON journal_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- 5. HELPER FUNCTIONS
-- =====================================================

-- Create default folder for new users
CREATE OR REPLACE FUNCTION create_default_journal_folder()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO journal_folders (user_id, name, icon, color)
  VALUES (NEW.id, 'My Notes', '📝', '#0891b2'); -- cyan-600

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create default folder on profile creation
-- (Assumes profiles table exists)
CREATE TRIGGER create_default_folder_on_signup
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION create_default_journal_folder();

-- =====================================================
-- 6. COMMENTS AND DOCUMENTATION
-- =====================================================

COMMENT ON TABLE journal_folders IS 'User-created folders for organizing journal entries';
COMMENT ON TABLE journal_entries IS 'Private journal entries with optional publishing to community';
COMMENT ON COLUMN journal_entries.is_published IS 'Whether this entry has been published as a public post';
COMMENT ON COLUMN journal_entries.published_debate_id IS 'ID of the debate created when entry was published';
