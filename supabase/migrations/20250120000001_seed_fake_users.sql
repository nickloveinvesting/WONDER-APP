-- WONDER Fake User Population: 10 Realistic Philosophy Enthusiasts
-- Migration: Seed fake users for platform demonstration
--
-- NOTE: This creates profiles with pre-generated UUIDs.
-- In production, you would first create auth.users via Supabase Admin API,
-- then these profiles would link to those auth records.
-- For development/demo purposes, these profiles can exist standalone.

-- Generate deterministic UUIDs for reproducibility
-- Using md5 hash of user_id strings for consistent UUIDs across migrations

-- =====================================================
-- ACADEMIC USERS (3)
-- =====================================================

-- 1. Dr. Sarah Chen - Phenomenology professor, MIT
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'sarah_chen_mit',
  'Dr. Sarah Chen',
  'Phenomenologist exploring the boundaries where mind meets world. I study how consciousness emerges through embodied experience—from human perception to artificial systems. Currently investigating whether AI can ever truly ''experience'' rather than merely process. MIT Philosophy. Berkeley PhD ''09. Always curious about how you experience your own thinking.',
  1520,
  875,
  ARRAY['phenomenology', 'philosophy_of_mind', 'embodied_cognition', 'AI_consciousness', 'Merleau-Ponty_studies'],
  ARRAY['machine_learning_theory', 'Buddhist_philosophy', 'neuroscience_of_consciousness', 'ecological_psychology'],
  '{"logic": 1340, "ethics": 1280, "aesthetics": 1420, "metaphysics": 1680, "epistemology": 1590, "political_philosophy": 1120}'::jsonb,
  24,
  18,
  12,
  45,
  420,
  NOW() - INTERVAL '8 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- 2. Marcus Rodriguez - PhD candidate, Ethics, Yale
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  '22222222-2222-2222-2222-222222222222'::uuid,
  'marcus_ethics',
  'Marcus Rodriguez',
  'PhD candidate @Yale wrestling with the ethics of emerging tech. From Miami—Cuban-American, first-gen academic. I believe philosophy should matter in the real world. Currently writing on algorithmic fairness and the moral status of AI decisions. Hot take: most tech ethics is too abstract to help anyone. Let''s change that.',
  1380,
  620,
  ARRAY['applied_ethics', 'technology_ethics', 'algorithmic_fairness', 'moral_philosophy', 'social_justice'],
  ARRAY['philosophy_of_AI', 'Latin_American_philosophy', 'critical_race_theory', 'political_economy'],
  '{"logic": 1290, "ethics": 1580, "aesthetics": 1050, "metaphysics": 1180, "epistemology": 1320, "political_philosophy": 1540}'::jsonb,
  31,
  22,
  5,
  28,
  315,
  NOW() - INTERVAL '6 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- 3. Prof. James Wright - Retired, Philosophy of Science
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  '33333333-3333-3333-3333-333333333333'::uuid,
  'prof_wright',
  'Prof. James Wright',
  'Emeritus Professor of Philosophy of Science. Cambridge man, though I''ve mellowed since. Spent forty years thinking about what science tells us about reality—and what it doesn''t. Now retired to Cornwall with too many books and a patient wife. I find these online discussions rather stimulating. One is never too old to have one''s assumptions challenged.',
  1580,
  945,
  ARRAY['philosophy_of_science', 'scientific_realism', 'history_of_philosophy', 'epistemology', 'philosophy_of_physics'],
  ARRAY['philosophy_of_biology', 'contemporary_metaphysics', 'Chinese_philosophy', 'philosophy_of_mathematics'],
  '{"logic": 1720, "ethics": 1380, "aesthetics": 1340, "metaphysics": 1640, "epistemology": 1780, "political_philosophy": 1290}'::jsonb,
  19,
  15,
  3,
  21,
  580,
  NOW() - INTERVAL '10 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- =====================================================
-- SERIOUS AMATEUR USERS (4)
-- =====================================================

-- 4. Alex Kim - Software engineer, self-taught philosopher
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  '44444444-4444-4444-4444-444444444444'::uuid,
  'logicgate_alex',
  'Alex Kim',
  'Software engineer by day, philosophy nerd by night. Got hooked on Philosophize This! during my commute and now I can''t stop thinking about whether my code has qualia. I approach big questions the same way I debug—systematically, with lots of edge cases. Currently obsessed with consciousness and the hard problem. If you can explain emergence to me without hand-waving, I''ll buy you coffee.',
  1185,
  445,
  ARRAY['logic', 'philosophy_of_mind', 'philosophy_of_science', 'formal_reasoning'],
  ARRAY['phenomenology', 'eastern_philosophy', 'bioethics', 'free_will'],
  '{"logic": 1180, "ethics": 920, "aesthetics": 780, "metaphysics": 1050, "epistemology": 1100, "political_philosophy": 850}'::jsonb,
  15,
  9,
  8,
  22,
  195,
  NOW() - INTERVAL '5 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- 5. Rachel Green - Therapist, existentialism enthusiast
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  '55555555-5555-5555-5555-555555555555'::uuid,
  'presence_rachel',
  'Rachel Green, LMHC',
  'Therapist exploring how philosophy actually helps people live. I see existentialism in action every day—clients wrestling with meaning, confronting mortality, trying to live authentically in a world that rewards performance. Sartre and Yalom are my theoretical guides, but I''m here to learn from everyone. Let''s think deeply together, with compassion.',
  1120,
  520,
  ARRAY['existentialism', 'ethics', 'philosophy_of_psychology', 'phenomenology'],
  ARRAY['buddhist_philosophy', 'stoicism', 'philosophy_of_emotion', 'virtue_ethics'],
  '{"logic": 880, "ethics": 1150, "aesthetics": 950, "metaphysics": 980, "epistemology": 920, "political_philosophy": 870}'::jsonb,
  12,
  7,
  15,
  32,
  245,
  NOW() - INTERVAL '7 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- 6. David Okonkwo - High school teacher, philosophy club advisor
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  '66666666-6666-6666-6666-666666666666'::uuid,
  'socratic_david',
  'David Okonkwo',
  'High school teacher bringing philosophy to the South Side. I run a philosophy club where kids debate everything from TikTok ethics to whether Thanos was right. Philosophy isn''t just for ivory towers—it''s for everyone wrestling with how to live. Big believer in the Socratic method. Also: African philosophy is criminally underrepresented. Let''s fix that.',
  1050,
  385,
  ARRAY['african_philosophy', 'ethics', 'political_philosophy', 'philosophy_of_education'],
  ARRAY['epistemology', 'philosophy_of_race', 'ancient_philosophy', 'pragmatism'],
  '{"logic": 920, "ethics": 1100, "aesthetics": 880, "metaphysics": 850, "epistemology": 950, "political_philosophy": 1150}'::jsonb,
  18,
  10,
  4,
  18,
  175,
  NOW() - INTERVAL '4 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- 7. Emma Thompson - Novelist, philosophical fiction
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  '77777777-7777-7777-7777-777777777777'::uuid,
  'emma_writes',
  'Emma Thompson',
  'Novelist chasing ideas through fiction. My MFA taught me craft; philosophy teaches me what''s worth writing about. I''m less interested in winning arguments than in finding the questions worth living. Currently haunted by: time, memory, the stories we tell ourselves about who we are. I write slowly and think sideways. Prose is my native language for philosophy.',
  975,
  290,
  ARRAY['aesthetics', 'philosophy_of_narrative', 'existentialism', 'philosophy_of_time'],
  ARRAY['phenomenology', 'philosophy_of_memory', 'hermeneutics', 'japanese_aesthetics'],
  '{"logic": 720, "ethics": 980, "aesthetics": 1180, "metaphysics": 1020, "epistemology": 850, "political_philosophy": 780}'::jsonb,
  8,
  4,
  2,
  14,
  125,
  NOW() - INTERVAL '3 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- =====================================================
-- CURIOUS BEGINNER USERS (3)
-- =====================================================

-- 8. Jordan Miller - College sophomore, first philosophy class
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  '88888888-8888-8888-8888-888888888888'::uuid,
  'philosophyjordan',
  'Jordan Miller',
  'Sophomore taking my first philosophy class and honestly? Mind = blown. Currently obsessed with the trolley problem and trying to figure out if free will is even a thing. Undeclared but thinking about majoring in philosophy (don''t tell my parents lol). Here to learn and debate anyone who thinks they''ve got it figured out!',
  875,
  120,
  ARRAY[]::text[],
  ARRAY['free_will', 'ethics', 'political_philosophy', 'philosophy_of_mind', 'existentialism'],
  '{"logic": 840, "ethics": 890, "aesthetics": 800, "metaphysics": 860, "epistemology": 825, "political_philosophy": 880}'::jsonb,
  6,
  2,
  7,
  12,
  45,
  NOW() - INTERVAL '2 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- 9. Priya Patel - Business analyst, stoicism explorer
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  '99999999-9999-9999-9999-999999999999'::uuid,
  'priya_thinks',
  'Priya Patel',
  'Business analyst by day, aspiring stoic by... also day (working on it). Found Marcus Aurelius through a productivity podcast and fell down the philosophy rabbit hole. Trying to find some calm in the chaos of consulting life. Looking for practical wisdom I can actually use, not just theory.',
  920,
  175,
  ARRAY['stoicism_beginner'],
  ARRAY['stoicism', 'practical_ethics', 'eastern_philosophy', 'philosophy_of_happiness', 'decision_making'],
  '{"logic": 900, "ethics": 920, "aesthetics": 780, "metaphysics": 800, "epistemology": 850, "political_philosophy": 830}'::jsonb,
  9,
  4,
  11,
  19,
  78,
  NOW() - INTERVAL '3 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- 10. Tom Anderson - Retired engineer, late-life philosopher
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  bio,
  delo_rating,
  reputation_score,
  expertise_areas,
  learning_interests,
  delo_categories,
  debates_participated,
  debates_won,
  daily_streak,
  longest_streak,
  influence_score,
  created_at
) VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  'tom_wonders',
  'Tom Anderson',
  'Retired mechanical engineer with 35 years of solving practical problems. Now I''m tackling the impractical ones. Started reading philosophy after retirement and realized I''ve been asking these questions my whole life without knowing there were names for them. Better late than never. Patient listener, lots of questions.',
  865,
  145,
  ARRAY[]::text[],
  ARRAY['meaning_of_life', 'philosophy_of_death', 'existentialism', 'philosophy_of_science', 'ethics', 'epistemology'],
  '{"logic": 895, "ethics": 855, "aesthetics": 790, "metaphysics": 850, "epistemology": 870, "political_philosophy": 820}'::jsonb,
  7,
  3,
  6,
  15,
  65,
  NOW() - INTERVAL '4 months'
) ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  bio = EXCLUDED.bio,
  delo_rating = EXCLUDED.delo_rating;

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================
-- Uncomment to verify insertion:
-- SELECT username, display_name, delo_rating, reputation_score
-- FROM public.profiles
-- WHERE username IN (
--   'sarah_chen_mit', 'marcus_ethics', 'prof_wright',
--   'logicgate_alex', 'presence_rachel', 'socratic_david', 'emma_writes',
--   'philosophyjordan', 'priya_thinks', 'tom_wonders'
-- )
-- ORDER BY delo_rating DESC;
