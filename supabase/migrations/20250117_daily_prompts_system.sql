-- =====================================================
-- DAILY PROMPTS SYSTEM
-- Provides curated daily questions for activation
-- Date: 2025-01-17
-- =====================================================

-- Create daily_prompts table
CREATE TABLE IF NOT EXISTS daily_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  question TEXT NOT NULL,
  topic TEXT NOT NULL,
  category TEXT CHECK (category IN ('ethics', 'metaphysics', 'epistemology', 'political', 'existential', 'applied', 'science', 'mind')),
  context TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  debate_id UUID REFERENCES debates(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE daily_prompts ENABLE ROW LEVEL SECURITY;

-- Anyone can view daily prompts
CREATE POLICY "Anyone can view daily prompts"
  ON daily_prompts FOR SELECT
  USING (true);

-- Only authenticated users can create (for admin)
CREATE POLICY "Authenticated users can create daily prompts"
  ON daily_prompts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create index on date for fast lookups
CREATE INDEX IF NOT EXISTS idx_daily_prompts_date ON daily_prompts (date DESC);

-- Seed initial prompts (30 days worth, research-validated topics)
INSERT INTO daily_prompts (date, question, topic, category, context) VALUES
  -- Week 1: Accessible entry points (research: beginner-friendly)
  (CURRENT_DATE, 'Is free will compatible with neuroscience?', 'Free Will', 'mind', 'Neuroscience suggests our decisions happen before we''re conscious of them. Does this mean free will is an illusion?'),
  (CURRENT_DATE + INTERVAL '1 day', 'Can AI be creative, or just imitative?', 'Artificial Intelligence', 'applied', 'AI can generate art, music, and writing. But is it truly creative, or just recombining what humans created?'),
  (CURRENT_DATE + INTERVAL '2 days', 'Is there a moral difference between action and inaction?', 'Moral Responsibility', 'ethics', 'If you can save someone but don''t, is that the same as harming them? The trolley problem in real life.'),
  (CURRENT_DATE + INTERVAL '3 days', 'What makes something beautiful?', 'Aesthetics', 'applied', 'Is beauty in the eye of the beholder, or are there objective standards? Can anything be art?'),
  (CURRENT_DATE + INTERVAL '4 days', 'Can we know anything with absolute certainty?', 'Knowledge', 'epistemology', 'Descartes said "I think, therefore I am." Is that the only thing we can be certain about?'),
  (CURRENT_DATE + INTERVAL '5 days', 'Is privacy a fundamental right in the digital age?', 'Technology Ethics', 'applied', 'If you have nothing to hide, do you have nothing to fear? Or is privacy essential to freedom?'),
  (CURRENT_DATE + INTERVAL '6 days', 'What is the meaning of life?', 'Existentialism', 'existential', 'The classic question. Is there an objective meaning, or do we create our own? Does it matter?'),

  -- Week 2: Mix of depth levels (research: serve beginners to experts)
  (CURRENT_DATE + INTERVAL '7 days', 'Should we save the environment for nature''s sake or humans'' sake?', 'Environmental Ethics', 'ethics', 'Are we protecting nature because it has intrinsic value, or because we need it to survive?'),
  (CURRENT_DATE + INTERVAL '8 days', 'Is consciousness physical or something more?', 'Mind-Body Problem', 'mind', 'Can thoughts and feelings be explained by brain chemistry alone? What is consciousness?'),
  (CURRENT_DATE + INTERVAL '9 days', 'When does life begin? When does personhood begin?', 'Bioethics', 'ethics', 'These are different questions, but they''re often conflated. What''s the philosophical distinction?'),
  (CURRENT_DATE + INTERVAL '10 days', 'Is democracy the best form of government?', 'Political Philosophy', 'political', 'Churchill said democracy is the worst form of government except for all the others. Is he right?'),
  (CURRENT_DATE + INTERVAL '11 days', 'Can you step in the same river twice?', 'Change & Identity', 'metaphysics', 'Heraclitus said no - the river changes, and so do you. What does this say about identity?'),
  (CURRENT_DATE + INTERVAL '12 days', 'Is morality relative or universal?', 'Meta-Ethics', 'ethics', 'Do moral truths exist independently of culture, or is morality socially constructed?'),
  (CURRENT_DATE + INTERVAL '13 days', 'What is justice?', 'Justice', 'political', 'Plato wrote a whole dialogue on this. Fairness? Giving each their due? Equality? Equity?'),

  -- Week 3: Applied philosophy (research: modern applications)
  (CURRENT_DATE + INTERVAL '14 days', 'Should social media platforms censor misinformation?', 'Free Speech', 'political', 'Balancing free speech with preventing harm. Who decides what''s true?'),
  (CURRENT_DATE + INTERVAL '15 days', 'Is effective altruism the best way to do good?', 'Ethics', 'applied', 'Should we maximize impact with our charitable giving, or are there other considerations?'),
  (CURRENT_DATE + INTERVAL '16 days', 'Can machines ever be conscious?', 'Philosophy of Mind', 'mind', 'If we build a sufficiently complex AI, could it have genuine experiences? How would we know?'),
  (CURRENT_DATE + INTERVAL '17 days', 'What do we owe future generations?', 'Intergenerational Ethics', 'ethics', 'Should we sacrifice now for people who don''t exist yet? How do we balance present and future?'),
  (CURRENT_DATE + INTERVAL '18 days', 'Is there such a thing as a just war?', 'Just War Theory', 'ethics', 'Can violence ever be morally justified? What are the conditions?'),
  (CURRENT_DATE + INTERVAL '19 days', 'Does God exist?', 'Philosophy of Religion', 'metaphysics', 'The classical question. Arguments for, against, and whether it''s even answerable.'),
  (CURRENT_DATE + INTERVAL '20 days', 'What is personal identity?', 'Identity', 'metaphysics', 'If all your cells replace themselves, are you still you? The Ship of Theseus problem.'),

  -- Week 4: Deep topics (research: keep advanced users engaged)
  (CURRENT_DATE + INTERVAL '21 days', 'Is time real or an illusion?', 'Philosophy of Time', 'metaphysics', 'Physics suggests the past, present, and future all exist. Does that match our experience?'),
  (CURRENT_DATE + INTERVAL '22 days', 'Can ought be derived from is?', 'Hume''s Guillotine', 'epistemology', 'Can we derive moral claims from factual claims? Is there a naturalistic fallacy?'),
  (CURRENT_DATE + INTERVAL '23 days', 'What is truth?', 'Epistemology', 'epistemology', 'Correspondence theory? Coherence theory? Pragmatism? What does it mean for something to be true?'),
  (CURRENT_DATE + INTERVAL '24 days', 'Do animals have rights?', 'Animal Ethics', 'ethics', 'If they can suffer, do they have moral status? What rights, if any, do animals have?'),
  (CURRENT_DATE + INTERVAL '25 days', 'Is punishment justified?', 'Criminal Justice', 'ethics', 'Retribution? Deterrence? Rehabilitation? Why do we punish, and is it ethical?'),
  (CURRENT_DATE + INTERVAL '26 days', 'What is the self?', 'Philosophy of Self', 'mind', 'Buddhism says there is no permanent self. Neuroscience agrees. But it sure feels like there''s a "you" - what is it?'),
  (CURRENT_DATE + INTERVAL '27 days', 'Should we colonize other planets?', 'Space Ethics', 'applied', 'Is it humanity''s destiny to spread through the cosmos? Or should we fix Earth first?'),
  (CURRENT_DATE + INTERVAL '28 days', 'Can mathematics exist without minds?', 'Philosophy of Math', 'metaphysics', 'Platonists say yes - math is discovered. Constructivists say no - it''s invented. Who''s right?'),
  (CURRENT_DATE + INTERVAL '29 days', 'What is happiness?', 'Eudaimonia', 'ethics', 'Aristotle said it''s flourishing. Bentham said it''s pleasure. What is the good life?')
ON CONFLICT (date) DO NOTHING;

-- Add comment
COMMENT ON TABLE daily_prompts IS 'Curated daily questions to drive engagement and activation (< 5 min value for new users)';
COMMENT ON COLUMN daily_prompts.context IS 'Brief context to make question accessible and compelling';
COMMENT ON COLUMN daily_prompts.debate_id IS 'Optional link to the debate/conversation created for this prompt';
