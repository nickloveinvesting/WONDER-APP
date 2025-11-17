-- ============================================================================
-- INQUIRE FEATURE DATABASE SCHEMA
-- ============================================================================
-- This migration creates all tables and relationships for the Inquire feature
-- Inquire is ARGUED's premium philosophy platform for structured dialogue
--
-- Created: 2025-11-17
-- Version: 1.0
-- ============================================================================

-- ============================================================================
-- TABLE: inquiry_categories
-- Purpose: The four main philosophical categories (Social, Economic, AI Ethics, Moral)
-- ============================================================================
CREATE TABLE inquiry_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- e.g., 'social', 'economic', 'ai-ethics', 'moral'
  name TEXT NOT NULL, -- Display name: 'Social Philosophy'
  description TEXT NOT NULL, -- Category overview (2-3 sentences)
  icon_name TEXT, -- Icon identifier for frontend
  display_order INTEGER NOT NULL, -- Order to display categories (1-4)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: frameworks
-- Purpose: Philosophical frameworks (Utilitarianism, Deontology, etc.)
-- These are used for framework badges and filtering
-- ============================================================================
CREATE TABLE frameworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- e.g., 'utilitarianism', 'deontology'
  name TEXT NOT NULL, -- Display name: 'Utilitarianism'
  short_description TEXT NOT NULL, -- One-sentence explanation
  full_description TEXT, -- Detailed explanation (optional)
  key_thinker TEXT, -- Representative philosopher: 'John Stuart Mill'
  color_class TEXT, -- Tailwind color classes for badge: 'bg-blue-100 text-blue-700 border-blue-300'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: inquiry_topics
-- Purpose: Individual philosophical questions/topics (80+ topics)
-- Uses JSONB for flexible content structure that can evolve
-- ============================================================================
CREATE TABLE inquiry_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES inquiry_categories(id) ON DELETE CASCADE,

  -- Basic metadata
  slug TEXT UNIQUE NOT NULL, -- URL-friendly: 'is-taxation-theft'
  title TEXT NOT NULL, -- The question: 'Is taxation theft?'
  short_description TEXT NOT NULL, -- One-line description for cards
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_read_time INTEGER DEFAULT 12, -- Minutes

  -- Topic content (stored as JSONB for flexibility)
  -- See TOPIC_CONTENT_TEMPLATE.json for structure
  overview TEXT NOT NULL, -- Why this question matters (150-200 words)
  core_question JSONB NOT NULL, -- question_restatement, why_it_matters, why_difficult, historical_context
  frameworks_analysis JSONB, -- Array of framework applications to this question
  key_positions JSONB, -- Array of steel-manned positions on this question
  thought_experiments JSONB, -- Array of thought experiments
  related_topic_ids UUID[], -- Array of related topic UUIDs

  -- Engagement metadata
  view_count INTEGER DEFAULT 0,
  position_count INTEGER DEFAULT 0, -- Number of position declarations
  comment_count INTEGER DEFAULT 0,
  bookmark_count INTEGER DEFAULT 0,

  -- Publishing
  is_published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false, -- Show in featured section
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Search optimization
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(short_description, '') || ' ' ||
      coalesce(overview, '')
    )
  ) STORED
);

-- ============================================================================
-- TABLE: topic_frameworks
-- Purpose: Junction table - which frameworks are most relevant to each topic
-- Allows pre-curating framework relevance scores
-- ============================================================================
CREATE TABLE topic_frameworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES inquiry_topics(id) ON DELETE CASCADE,
  framework_id UUID NOT NULL REFERENCES frameworks(id) ON DELETE CASCADE,
  relevance_score INTEGER DEFAULT 5, -- 1-10, how relevant is this framework to this topic
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(topic_id, framework_id)
);

-- ============================================================================
-- TABLE: user_positions
-- Purpose: Current position of each user on each topic
-- Tracks stance, confidence, and framework
-- ============================================================================
CREATE TABLE user_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES inquiry_topics(id) ON DELETE CASCADE,

  -- Position data
  position_value INTEGER NOT NULL CHECK (position_value >= -2 AND position_value <= 2),
  -- -2: Strongly Disagree, -1: Disagree, 0: Uncertain, 1: Agree, 2: Strongly Agree

  confidence_level INTEGER NOT NULL CHECK (confidence_level >= 1 AND confidence_level <= 5),
  -- 1: Very Uncertain, 2: Somewhat Uncertain, 3: Neutral, 4: Somewhat Confident, 5: Very Confident

  framework_id UUID REFERENCES frameworks(id) ON DELETE SET NULL,
  -- Which framework informs this position

  position_note TEXT, -- Optional explanation of position

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, topic_id) -- One current position per user per topic
);

-- ============================================================================
-- TABLE: position_history
-- Purpose: Complete timeline of how user positions have evolved
-- Enables "Position Evolution Tracker" feature
-- ============================================================================
CREATE TABLE position_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES inquiry_topics(id) ON DELETE CASCADE,

  -- Position snapshot
  position_value INTEGER NOT NULL,
  confidence_level INTEGER NOT NULL,
  framework_id UUID REFERENCES frameworks(id) ON DELETE SET NULL,

  -- What changed their mind
  change_reason TEXT, -- User explanation: "After reading X's argument..."

  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: topic_comments
-- Purpose: Comments/responses on topic discussion pages
-- Includes framework declaration, steelman features, and depth scoring
-- ============================================================================
CREATE TABLE topic_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES inquiry_topics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Comment content
  content TEXT NOT NULL CHECK (char_length(content) >= 10),
  framework_id UUID REFERENCES frameworks(id) ON DELETE SET NULL,
  -- Which framework informs this comment

  -- Steelman feature (for replies)
  parent_comment_id UUID REFERENCES topic_comments(id) ON DELETE CASCADE,
  steelman_summary TEXT, -- User's summary of parent comment (if replying to opposing view)
  steelman_accuracy_rating INTEGER CHECK (steelman_accuracy_rating >= 1 AND steelman_accuracy_rating <= 5),
  -- Parent commenter rates accuracy of steelman summary (1-5)

  -- Engagement metrics
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,

  -- Depth score (calculated by algorithm)
  depth_score INTEGER DEFAULT 0 CHECK (depth_score >= 0 AND depth_score <= 100),
  -- Quality metric beyond simple upvotes

  -- Moderation & privacy
  is_anonymous BOOLEAN DEFAULT false,
  -- If true, username hidden (but tracked server-side for moderation)

  is_edited BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TABLE: comment_votes
-- Purpose: Track individual user votes on comments (prevent double-voting)
-- ============================================================================
CREATE TABLE comment_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES topic_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id) -- One vote per user per comment
);

-- ============================================================================
-- TABLE: topic_bookmarks
-- Purpose: Users can bookmark topics to return to later
-- ============================================================================
CREATE TABLE topic_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES inquiry_topics(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- ============================================================================
-- TABLE: thought_experiment_responses
-- Purpose: User responses to thought experiments within topics
-- Allows analytics on how users respond to scenarios
-- ============================================================================
CREATE TABLE thought_experiment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES inquiry_topics(id) ON DELETE CASCADE,
  experiment_key TEXT NOT NULL, -- Identifier for which experiment (matches JSONB key)

  response_value TEXT NOT NULL, -- User's answer to the thought experiment
  framework_id UUID REFERENCES frameworks(id) ON DELETE SET NULL,
  explanation TEXT, -- Optional explanation

  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_id, experiment_key)
);

-- ============================================================================
-- TABLE: expert_badges
-- Purpose: Track verified expert credentials
-- ============================================================================
CREATE TABLE expert_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  badge_type TEXT NOT NULL CHECK (badge_type IN ('academic', 'professional', 'published', 'community')),
  -- academic: PhD in Philosophy
  -- professional: Ethicist, policy advisor
  -- published: Published in peer-reviewed journals
  -- community: Algorithmic based on engagement quality

  credential_text TEXT NOT NULL, -- Display text: 'PhD, Philosophy, MIT'
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_notes TEXT, -- Admin notes on verification

  -- For academic/professional/published badges
  proof_url TEXT, -- Link to university page, publication, etc.

  -- For community badges (calculated)
  avg_depth_score NUMERIC(4,2), -- Average depth score in specialty area
  specialty_category_id UUID REFERENCES inquiry_categories(id),

  granted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, badge_type)
);

-- ============================================================================
-- INDEXES
-- Purpose: Optimize common queries
-- ============================================================================

-- inquiry_categories
CREATE INDEX inquiry_categories_slug_idx ON inquiry_categories(slug);
CREATE INDEX inquiry_categories_display_order_idx ON inquiry_categories(display_order);

-- frameworks
CREATE INDEX frameworks_slug_idx ON frameworks(slug);

-- inquiry_topics
CREATE INDEX inquiry_topics_category_id_idx ON inquiry_topics(category_id);
CREATE INDEX inquiry_topics_slug_idx ON inquiry_topics(slug);
CREATE INDEX inquiry_topics_published_idx ON inquiry_topics(is_published) WHERE is_published = true;
CREATE INDEX inquiry_topics_featured_idx ON inquiry_topics(featured) WHERE featured = true;
CREATE INDEX inquiry_topics_search_idx ON inquiry_topics USING GIN(search_vector);
CREATE INDEX inquiry_topics_view_count_idx ON inquiry_topics(view_count DESC);
CREATE INDEX inquiry_topics_comment_count_idx ON inquiry_topics(comment_count DESC);

-- topic_frameworks
CREATE INDEX topic_frameworks_topic_id_idx ON topic_frameworks(topic_id);
CREATE INDEX topic_frameworks_framework_id_idx ON topic_frameworks(framework_id);
CREATE INDEX topic_frameworks_relevance_idx ON topic_frameworks(relevance_score DESC);

-- user_positions
CREATE INDEX user_positions_user_id_idx ON user_positions(user_id);
CREATE INDEX user_positions_topic_id_idx ON user_positions(topic_id);
CREATE INDEX user_positions_framework_id_idx ON user_positions(framework_id);
CREATE INDEX user_positions_updated_at_idx ON user_positions(updated_at DESC);

-- position_history
CREATE INDEX position_history_user_id_topic_id_idx ON position_history(user_id, topic_id);
CREATE INDEX position_history_recorded_at_idx ON position_history(recorded_at DESC);

-- topic_comments
CREATE INDEX topic_comments_topic_id_idx ON topic_comments(topic_id);
CREATE INDEX topic_comments_user_id_idx ON topic_comments(user_id);
CREATE INDEX topic_comments_parent_id_idx ON topic_comments(parent_comment_id);
CREATE INDEX topic_comments_depth_score_idx ON topic_comments(depth_score DESC);
CREATE INDEX topic_comments_created_at_idx ON topic_comments(created_at DESC);
CREATE INDEX topic_comments_framework_id_idx ON topic_comments(framework_id);

-- comment_votes
CREATE INDEX comment_votes_comment_id_idx ON comment_votes(comment_id);
CREATE INDEX comment_votes_user_id_idx ON comment_votes(user_id);

-- topic_bookmarks
CREATE INDEX topic_bookmarks_user_id_idx ON topic_bookmarks(user_id);
CREATE INDEX topic_bookmarks_topic_id_idx ON topic_bookmarks(topic_id);

-- thought_experiment_responses
CREATE INDEX thought_experiment_responses_user_id_idx ON thought_experiment_responses(user_id);
CREATE INDEX thought_experiment_responses_topic_id_idx ON thought_experiment_responses(topic_id);

-- expert_badges
CREATE INDEX expert_badges_user_id_idx ON expert_badges(user_id);
CREATE INDEX expert_badges_badge_type_idx ON expert_badges(badge_type);
CREATE INDEX expert_badges_verification_status_idx ON expert_badges(verification_status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE inquiry_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE position_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE thought_experiment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_badges ENABLE ROW LEVEL SECURITY;

-- inquiry_categories: Public read-only
CREATE POLICY "Categories viewable by everyone"
  ON inquiry_categories FOR SELECT
  USING (true);

-- frameworks: Public read-only
CREATE POLICY "Frameworks viewable by everyone"
  ON frameworks FOR SELECT
  USING (true);

-- inquiry_topics: Published topics viewable by all, drafts only by admins
CREATE POLICY "Published topics viewable by everyone"
  ON inquiry_topics FOR SELECT
  USING (is_published = true OR auth.uid() IN (
    SELECT id FROM profiles WHERE username IN ('admin', 'content_manager')
  ));

-- topic_frameworks: Public read-only
CREATE POLICY "Topic frameworks viewable by everyone"
  ON topic_frameworks FOR SELECT
  USING (true);

-- user_positions: Users can read all, modify only their own
CREATE POLICY "Positions viewable by everyone"
  ON user_positions FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own positions"
  ON user_positions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own positions"
  ON user_positions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own positions"
  ON user_positions FOR DELETE
  USING (auth.uid() = user_id);

-- position_history: Users can read their own and aggregate stats
CREATE POLICY "Users can view their own position history"
  ON position_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own position history"
  ON position_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- topic_comments: Public read, authenticated write
CREATE POLICY "Comments viewable by everyone"
  ON topic_comments FOR SELECT
  USING (is_deleted = false);

CREATE POLICY "Authenticated users can create comments"
  ON topic_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON topic_comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON topic_comments FOR DELETE
  USING (auth.uid() = user_id);

-- comment_votes: Users can read all, modify only their own
CREATE POLICY "Comment votes viewable by everyone"
  ON comment_votes FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own votes"
  ON comment_votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON comment_votes FOR DELETE
  USING (auth.uid() = user_id);

-- topic_bookmarks: Users can only see and modify their own
CREATE POLICY "Users can view their own bookmarks"
  ON topic_bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON topic_bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON topic_bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- thought_experiment_responses: Public read (anonymous), users modify their own
CREATE POLICY "Thought experiment responses viewable by everyone"
  ON thought_experiment_responses FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own responses"
  ON thought_experiment_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own responses"
  ON thought_experiment_responses FOR UPDATE
  USING (auth.uid() = user_id);

-- expert_badges: Public read, admin write
CREATE POLICY "Expert badges viewable by everyone"
  ON expert_badges FOR SELECT
  USING (verification_status = 'verified');

CREATE POLICY "Users can apply for badges"
  ON expert_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function: Update topic comment count when comment added/deleted
CREATE OR REPLACE FUNCTION update_topic_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE inquiry_topics
    SET comment_count = comment_count + 1
    WHERE id = NEW.topic_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE inquiry_topics
    SET comment_count = GREATEST(comment_count - 1, 0)
    WHERE id = OLD.topic_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER topic_comment_count_trigger
  AFTER INSERT OR DELETE ON topic_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_topic_comment_count();

-- Function: Update comment reply count
CREATE OR REPLACE FUNCTION update_comment_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.parent_comment_id IS NOT NULL THEN
    UPDATE topic_comments
    SET reply_count = reply_count + 1
    WHERE id = NEW.parent_comment_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' AND OLD.parent_comment_id IS NOT NULL THEN
    UPDATE topic_comments
    SET reply_count = GREATEST(reply_count - 1, 0)
    WHERE id = OLD.parent_comment_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER comment_reply_count_trigger
  AFTER INSERT OR DELETE ON topic_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_reply_count();

-- Function: Log position changes to history
CREATE OR REPLACE FUNCTION log_position_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if position actually changed
  IF TG_OP = 'UPDATE' AND (
    OLD.position_value != NEW.position_value OR
    OLD.confidence_level != NEW.confidence_level OR
    OLD.framework_id IS DISTINCT FROM NEW.framework_id
  ) THEN
    INSERT INTO position_history (
      user_id,
      topic_id,
      position_value,
      confidence_level,
      framework_id,
      change_reason
    ) VALUES (
      NEW.user_id,
      NEW.topic_id,
      NEW.position_value,
      NEW.confidence_level,
      NEW.framework_id,
      NEW.position_note
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER position_change_logger
  AFTER UPDATE ON user_positions
  FOR EACH ROW
  EXECUTE FUNCTION log_position_change();

-- Function: Update topic position count
CREATE OR REPLACE FUNCTION update_topic_position_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE inquiry_topics
    SET position_count = position_count + 1
    WHERE id = NEW.topic_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE inquiry_topics
    SET position_count = GREATEST(position_count - 1, 0)
    WHERE id = OLD.topic_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER topic_position_count_trigger
  AFTER INSERT OR DELETE ON user_positions
  FOR EACH ROW
  EXECUTE FUNCTION update_topic_position_count();

-- Function: Update comment vote counts
CREATE OR REPLACE FUNCTION update_comment_votes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'upvote' THEN
      UPDATE topic_comments SET upvotes = upvotes + 1 WHERE id = NEW.comment_id;
    ELSE
      UPDATE topic_comments SET downvotes = downvotes + 1 WHERE id = NEW.comment_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'upvote' THEN
      UPDATE topic_comments SET upvotes = GREATEST(upvotes - 1, 0) WHERE id = OLD.comment_id;
    ELSE
      UPDATE topic_comments SET downvotes = GREATEST(downvotes - 1, 0) WHERE id = OLD.comment_id;
    END IF;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER comment_vote_count_trigger
  AFTER INSERT OR DELETE ON comment_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_votes();

-- Function: Update bookmark count
CREATE OR REPLACE FUNCTION update_bookmark_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE inquiry_topics
    SET bookmark_count = bookmark_count + 1
    WHERE id = NEW.topic_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE inquiry_topics
    SET bookmark_count = GREATEST(bookmark_count - 1, 0)
    WHERE id = OLD.topic_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER bookmark_count_trigger
  AFTER INSERT OR DELETE ON topic_bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION update_bookmark_count();

-- Function: Calculate depth score for comment
-- This is a simplified version - full algorithm would be more complex
CREATE OR REPLACE FUNCTION calculate_comment_depth_score(comment_id UUID)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
  word_count INTEGER;
  has_framework BOOLEAN;
  reply_count INTEGER;
  steelman_rating INTEGER;
BEGIN
  SELECT
    array_length(string_to_array(content, ' '), 1),
    framework_id IS NOT NULL,
    topic_comments.reply_count,
    steelman_accuracy_rating
  INTO word_count, has_framework, reply_count, steelman_rating
  FROM topic_comments
  WHERE id = comment_id;

  -- Length and substance (0-15 points)
  score := score + LEAST(15, word_count / 20);

  -- Framework engagement (0-20 points)
  IF has_framework THEN
    score := score + 20;
  END IF;

  -- Reply depth (0-15 points)
  score := score + LEAST(15, reply_count * 3);

  -- Steelman accuracy (0-25 points)
  IF steelman_rating IS NOT NULL THEN
    score := score + (steelman_rating * 5);
  END IF;

  RETURN LEAST(100, score);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- INITIAL DATA: Categories and Frameworks
-- ============================================================================

-- Insert the 4 main categories
INSERT INTO inquiry_categories (slug, name, description, icon_name, display_order) VALUES
  (
    'social',
    'Social Philosophy',
    'Explore questions of justice, rights, equality, and the structure of society. How should we organize collective life?',
    'users',
    1
  ),
  (
    'economic',
    'Economic Philosophy',
    'Examine markets, distribution, value, and economic systems. What makes economic arrangements just or unjust?',
    'chart',
    2
  ),
  (
    'ai-ethics',
    'AI Ethics',
    'Investigate consciousness, rights, and the future of intelligence. What moral status do artificial minds have?',
    'cpu',
    3
  ),
  (
    'moral',
    'Moral Philosophy',
    'Delve into right and wrong, virtue, duty, and moral reasoning. What makes actions ethical or unethical?',
    'compass',
    4
  );

-- Insert common philosophical frameworks
INSERT INTO frameworks (slug, name, short_description, key_thinker, color_class) VALUES
  (
    'utilitarianism',
    'Utilitarianism',
    'Actions are right if they maximize overall happiness or well-being',
    'John Stuart Mill',
    'bg-blue-100 text-blue-700 border-blue-300'
  ),
  (
    'deontology',
    'Deontology',
    'Actions are right if they follow universal moral rules and duties',
    'Immanuel Kant',
    'bg-purple-100 text-purple-700 border-purple-300'
  ),
  (
    'virtue-ethics',
    'Virtue Ethics',
    'Actions are right if they express virtuous character traits',
    'Aristotle',
    'bg-green-100 text-green-700 border-green-300'
  ),
  (
    'social-contract',
    'Social Contract',
    'Political legitimacy derives from agreements among rational individuals',
    'John Rawls',
    'bg-indigo-100 text-indigo-700 border-indigo-300'
  ),
  (
    'libertarianism',
    'Libertarianism',
    'Individual liberty and property rights are paramount; minimal state intervention',
    'Robert Nozick',
    'bg-orange-100 text-orange-700 border-orange-300'
  ),
  (
    'care-ethics',
    'Care Ethics',
    'Ethics centers on relationships, empathy, and responsibilities to particular others',
    'Nel Noddings',
    'bg-pink-100 text-pink-700 border-pink-300'
  ),
  (
    'natural-law',
    'Natural Law',
    'Morality derives from human nature and rational reflection on what promotes flourishing',
    'Thomas Aquinas',
    'bg-amber-100 text-amber-700 border-amber-300'
  ),
  (
    'pragmatism',
    'Pragmatism',
    'Truth and morality are determined by practical consequences and what works',
    'William James',
    'bg-teal-100 text-teal-700 border-teal-300'
  ),
  (
    'consequentialism',
    'Consequentialism',
    'The rightness of actions depends solely on their outcomes',
    'Peter Singer',
    'bg-cyan-100 text-cyan-700 border-cyan-300'
  ),
  (
    'existentialism',
    'Existentialism',
    'Individuals must create their own meaning in an inherently meaningless universe',
    'Jean-Paul Sartre',
    'bg-slate-100 text-slate-700 border-slate-300'
  );

-- ============================================================================
-- HELPFUL QUERIES (Comments for developers)
-- ============================================================================

-- Get all topics in a category with engagement stats:
-- SELECT t.*, c.name as category_name, c.slug as category_slug
-- FROM inquiry_topics t
-- JOIN inquiry_categories c ON t.category_id = c.id
-- WHERE c.slug = 'social' AND t.is_published = true
-- ORDER BY t.comment_count DESC;

-- Get top frameworks for a topic:
-- SELECT f.*, tf.relevance_score
-- FROM frameworks f
-- JOIN topic_frameworks tf ON f.id = tf.framework_id
-- WHERE tf.topic_id = 'topic-uuid'
-- ORDER BY tf.relevance_score DESC;

-- Get position history for a user on a topic:
-- SELECT * FROM position_history
-- WHERE user_id = 'user-uuid' AND topic_id = 'topic-uuid'
-- ORDER BY recorded_at ASC;

-- Get top-depth-score comments on a topic:
-- SELECT c.*, p.username, f.name as framework_name
-- FROM topic_comments c
-- JOIN profiles p ON c.user_id = p.id
-- LEFT JOIN frameworks f ON c.framework_id = f.id
-- WHERE c.topic_id = 'topic-uuid' AND c.is_deleted = false
-- ORDER BY c.depth_score DESC
-- LIMIT 20;

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
