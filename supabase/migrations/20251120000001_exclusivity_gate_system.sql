-- WONDER Exclusivity Gate System
-- Migration: 20251120000001_exclusivity_gate_system.sql
-- Purpose: Create tables for admission challenges, waitlist, and progressive access

-- ============================================
-- ADMISSION CHALLENGES TABLE
-- Stores gate submissions and evaluations
-- ============================================
CREATE TABLE IF NOT EXISTS admission_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User identification (before they have an account)
  user_email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Challenge details
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('dialogue', 'essay', 'riddle')),
  challenge_id TEXT, -- Specific prompt/riddle ID used

  -- Response data
  response JSONB NOT NULL DEFAULT '{}', -- Full dialogue transcript or essay text

  -- AI evaluation
  ai_score JSONB, -- Detailed scoring breakdown
  total_score INTEGER, -- Overall score (0-100)

  -- Community review (for borderline cases)
  community_votes INTEGER DEFAULT 0,
  community_reviewers UUID[] DEFAULT '{}',
  flagged_for_review BOOLEAN DEFAULT FALSE,

  -- Decision
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'admitted', 'declined', 'retry_allowed')),
  decision_reason TEXT, -- Explanation for the decision

  -- Retry tracking
  attempt_number INTEGER DEFAULT 1,
  previous_attempt_id UUID REFERENCES admission_challenges(id),

  -- Timestamps
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  admitted_at TIMESTAMPTZ,

  -- Metadata
  ip_address INET,
  user_agent TEXT,
  referral_source TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for looking up by email
CREATE INDEX idx_admission_challenges_email ON admission_challenges(user_email);
CREATE INDEX idx_admission_challenges_status ON admission_challenges(status);
CREATE INDEX idx_admission_challenges_flagged ON admission_challenges(flagged_for_review) WHERE flagged_for_review = TRUE;

-- ============================================
-- WAITLIST TABLE
-- Pre-gate interest tracking and invite management
-- ============================================
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact info
  email TEXT UNIQUE NOT NULL,

  -- Referral tracking
  referral_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(6), 'hex'),
  referred_by UUID REFERENCES waitlist(id),
  referral_count INTEGER DEFAULT 0,

  -- Position tracking
  position INTEGER,
  priority_boost INTEGER DEFAULT 0, -- For referrals, early signups, etc.

  -- Status
  invited BOOLEAN DEFAULT FALSE,
  invitation_sent_at TIMESTAMPTZ,
  invitation_expires_at TIMESTAMPTZ,
  invitation_accepted BOOLEAN DEFAULT FALSE,

  -- User conversion
  converted_to_user_id UUID REFERENCES auth.users(id),
  converted_at TIMESTAMPTZ,

  -- Interest data (optional survey)
  interest_reason TEXT,
  philosophical_interests TEXT[],

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for position ordering
CREATE INDEX idx_waitlist_position ON waitlist(position) WHERE invited = FALSE;
CREATE INDEX idx_waitlist_referral ON waitlist(referral_code);

-- ============================================
-- MEMBER ACCESS TIERS TABLE
-- Progressive access based on contributions
-- ============================================
CREATE TABLE IF NOT EXISTS member_access_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- User reference
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,

  -- Current tier
  tier TEXT NOT NULL DEFAULT 'new_member' CHECK (tier IN ('new_member', 'member', 'contributor', 'guide', 'admin')),

  -- Progression tracking
  tier_since TIMESTAMPTZ DEFAULT NOW(),
  contribution_count INTEGER DEFAULT 0,
  quality_score NUMERIC(4,2) DEFAULT 0.00, -- Average quality of contributions

  -- Specific capabilities (can be customized beyond tier defaults)
  can_comment BOOLEAN DEFAULT TRUE,
  can_start_discussions BOOLEAN DEFAULT FALSE, -- Unlocks after new_member period
  can_vote BOOLEAN DEFAULT FALSE, -- Unlocks after new_member period
  can_write_articles BOOLEAN DEFAULT FALSE, -- Contributor tier
  can_moderate BOOLEAN DEFAULT FALSE, -- Guide tier

  -- Milestones
  first_comment_at TIMESTAMPTZ,
  first_discussion_at TIMESTAMPTZ,
  first_article_at TIMESTAMPTZ,
  became_contributor_at TIMESTAMPTZ,
  became_guide_at TIMESTAMPTZ,

  -- Gate completion reference
  admission_challenge_id UUID REFERENCES admission_challenges(id),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for tier lookups
CREATE INDEX idx_member_tiers_tier ON member_access_tiers(tier);
CREATE INDEX idx_member_tiers_user ON member_access_tiers(user_id);

-- ============================================
-- GATE DIALOGUE SESSIONS TABLE
-- Stores in-progress Socratic dialogues
-- ============================================
CREATE TABLE IF NOT EXISTS gate_dialogue_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Session identification
  session_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  user_email TEXT NOT NULL,

  -- Dialogue state
  current_phase INTEGER DEFAULT 1, -- 1-5 phases
  messages JSONB DEFAULT '[]', -- Array of {role, content, timestamp}

  -- Running evaluation
  running_scores JSONB DEFAULT '{}', -- Partial scores as dialogue progresses

  -- Status
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned', 'timeout')),

  -- Timing
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Convert to admission_challenge when complete
  admission_challenge_id UUID REFERENCES admission_challenges(id),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for session lookups
CREATE INDEX idx_dialogue_sessions_token ON gate_dialogue_sessions(session_token);
CREATE INDEX idx_dialogue_sessions_email ON gate_dialogue_sessions(user_email);
CREATE INDEX idx_dialogue_sessions_status ON gate_dialogue_sessions(status) WHERE status = 'in_progress';

-- ============================================
-- GATE PROMPTS/RIDDLES TABLE
-- Stores the actual challenges (can be updated without code changes)
-- ============================================
CREATE TABLE IF NOT EXISTS gate_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identification
  prompt_id TEXT UNIQUE NOT NULL, -- e.g., 'riddle_doors_v1', 'essay_midnight_v1'

  -- Type and categorization
  prompt_type TEXT NOT NULL CHECK (prompt_type IN ('riddle', 'essay', 'dialogue_question')),
  difficulty_level TEXT DEFAULT 'standard' CHECK (difficulty_level IN ('warmup', 'standard', 'advanced')),
  phase INTEGER, -- For dialogue questions: which phase (1-5)

  -- Content
  title TEXT,
  prompt_text TEXT NOT NULL,
  follow_up_prompts JSONB DEFAULT '[]', -- Adaptive follow-ups for dialogue

  -- Evaluation
  evaluation_criteria JSONB DEFAULT '{}', -- What to look for
  good_response_examples JSONB DEFAULT '[]', -- For AI reference
  poor_response_examples JSONB DEFAULT '[]', -- For AI reference

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Analytics
  times_used INTEGER DEFAULT 0,
  average_score NUMERIC(4,2),
  pass_rate NUMERIC(4,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for active prompts
CREATE INDEX idx_gate_prompts_active ON gate_prompts(prompt_type, is_active) WHERE is_active = TRUE;

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE admission_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_access_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gate_dialogue_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gate_prompts ENABLE ROW LEVEL SECURITY;

-- Admission challenges: Users can view their own, admins can view all
CREATE POLICY "Users can view own admission challenges"
  ON admission_challenges FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM member_access_tiers WHERE user_id = auth.uid() AND tier = 'admin')
  );

-- Waitlist: Users can add themselves, view own entry
CREATE POLICY "Anyone can join waitlist"
  ON waitlist FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own waitlist entry"
  ON waitlist FOR SELECT
  USING (email = auth.jwt()->>'email');

-- Member access tiers: Public read for tier info, users manage own
CREATE POLICY "Public can view member tiers"
  ON member_access_tiers FOR SELECT
  USING (true);

CREATE POLICY "System manages member tiers"
  ON member_access_tiers FOR ALL
  USING (auth.uid() = user_id);

-- Gate dialogue sessions: Only own sessions
CREATE POLICY "Users can manage own dialogue sessions"
  ON gate_dialogue_sessions FOR ALL
  USING (user_email = auth.jwt()->>'email');

-- Gate prompts: Public read for active prompts
CREATE POLICY "Public can view active prompts"
  ON gate_prompts FOR SELECT
  USING (is_active = true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to calculate waitlist position
CREATE OR REPLACE FUNCTION calculate_waitlist_position()
RETURNS TRIGGER AS $$
BEGIN
  NEW.position := COALESCE(
    (SELECT MAX(position) + 1 FROM waitlist),
    1
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_waitlist_position
  BEFORE INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION calculate_waitlist_position();

-- Function to update referral count when someone is referred
CREATE OR REPLACE FUNCTION update_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE waitlist
    SET referral_count = referral_count + 1,
        priority_boost = priority_boost + 10
    WHERE id = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_referral_count
  AFTER INSERT ON waitlist
  FOR EACH ROW
  WHEN (NEW.referred_by IS NOT NULL)
  EXECUTE FUNCTION update_referral_count();

-- Function to auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admission_challenges_timestamp
  BEFORE UPDATE ON admission_challenges
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_waitlist_timestamp
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_member_tiers_timestamp
  BEFORE UPDATE ON member_access_tiers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_gate_prompts_timestamp
  BEFORE UPDATE ON gate_prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA: Initial Gate Prompts
-- ============================================

INSERT INTO gate_prompts (prompt_id, prompt_type, title, prompt_text, evaluation_criteria, phase) VALUES

-- Dialogue Questions
('dialogue_opening_v1', 'dialogue_question', 'Opening',
'Welcome to WONDER.

Before we begin, I should be honest with you: This isn''t a test of what you know about philosophy. There are no right answers here.

I''m curious about how you think.

When you''re ready, I have a question for you.',
'{"type": "intro", "no_evaluation": true}', 1),

('dialogue_change_v1', 'dialogue_question', 'What Changed Your Mind',
'Here''s my first question:

What''s something you once believed strongly, but no longer believe?

It doesn''t have to be philosophical—it could be about anything. I''m curious what changed your mind.',
'{"looks_for": ["intellectual_humility", "self_awareness", "specificity"], "red_flags": ["claims_never_changed", "superficial_example", "dismissive"]}', 2),

('dialogue_certainty_v1', 'dialogue_question', 'On Certainty',
'Do you think it''s possible to be certain about anything? Not just confident—truly, unshakably certain?

If yes, what are you certain about?
If no, how do you make decisions without certainty?',
'{"looks_for": ["nuance", "honesty", "reasoning_shown"], "red_flags": ["absolute_certainty", "pure_skepticism", "dismissive"]}', 3),

('dialogue_fear_v1', 'dialogue_question', 'The Avoided Question',
'Is there a question you''re afraid to ask yourself? Something you''ve been avoiding thinking about?

You don''t have to share what it is. But I''m curious: Do you think there are questions we shouldn''t ask?',
'{"looks_for": ["vulnerability", "thoughtfulness", "balance"], "red_flags": ["too_much_deflection", "performative", "aggression"]}', 4),

('dialogue_closing_v1', 'dialogue_question', 'Closing Reflection',
'What surprised you about this conversation? Or—if nothing surprised you—what did you notice about yourself?',
'{"looks_for": ["self_reflection", "engagement", "openness"], "red_flags": ["nothing_noticed", "generic_answer", "dismissive"]}', 5),

-- Essay Prompts
('essay_midnight_v1', 'essay', 'The Midnight Question',
'What philosophical question keeps you awake at night?

Not what you think you should wonder about, but what actually pulls at your mind when you''re alone with your thoughts.

Why does this question matter to you personally? What would change if you found an answer?

(200-400 words)',
'{"looks_for": ["authenticity", "depth", "personal_connection", "specificity"], "red_flags": ["generic", "performative", "no_personal_stake"]}', NULL),

('essay_ethical_v1', 'essay', 'The Ethical Dilemma',
'You discover that a close friend has been anonymously donating half their income to effective charities—but they''ve also been lying to their family about how much money they make.

The deception has been going on for years. Their family thinks they''re struggling financially and often offers to help.

Your friend asks: "Is what I''m doing wrong?"

What do you tell them? Why?

(200-400 words)',
'{"looks_for": ["acknowledges_competing_values", "multiple_perspectives", "avoids_easy_moralizing", "reasoning_shown"], "red_flags": ["absolute_certainty", "ignores_complexity", "ad_hominem"]}', NULL),

-- Riddles
('riddle_doors_v1', 'riddle', 'The Two Guardians',
'You approach two doors. One leads to WONDER, one to endless scrolling. Two guardians stand before them.

Guardian A always tells the truth about facts, but lies about values.
Guardian B always lies about facts, but tells the truth about values.

Guardian A says: "The left door leads to WONDER."
Guardian A says: "WONDER is worth entering."

Guardian B says: "The right door leads to WONDER."
Guardian B says: "WONDER will change you."

Which door do you choose, and why?',
'{"valid_approaches": ["logical", "values_based", "meta", "humble", "rebel"], "looks_for": ["shows_reasoning", "acknowledges_complexity", "playful_engagement"], "red_flags": ["demands_certainty", "dismissive", "frustrated"]}', NULL),

('riddle_library_v1', 'riddle', 'The Library Paradox',
'You enter a vast library containing every book ever written and every book that could be written.

A librarian approaches: "I can show you to any book you desire, but first—describe a book this library cannot contain."

What do you describe?',
'{"valid_approaches": ["self_reference", "meta_paradox", "infinity_play", "question_premise"], "looks_for": ["creativity", "logical_exploration", "comfort_with_paradox"], "red_flags": ["gives_up", "misses_could_be_written"]}', NULL)

ON CONFLICT (prompt_id) DO NOTHING;

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE admission_challenges IS 'Stores gate challenge submissions and AI/community evaluations';
COMMENT ON TABLE waitlist IS 'Pre-gate interest tracking with referral system';
COMMENT ON TABLE member_access_tiers IS 'Progressive access levels based on contribution quality';
COMMENT ON TABLE gate_dialogue_sessions IS 'In-progress Socratic dialogue sessions before completion';
COMMENT ON TABLE gate_prompts IS 'Configurable prompts, riddles, and dialogue questions for the gate';
