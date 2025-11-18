-- Seed 40 engaging debate topics across all quadrants
-- 10 topics per quadrant: AI & Technology, Philosophy, Morality & Ethics, Economics & Society

-- Create a system user for seeded posts if it doesn't exist
DO $$
DECLARE
  system_user_id uuid;
BEGIN
  -- Try to find an existing user (get the first user in the profiles table)
  SELECT id INTO system_user_id
  FROM profiles
  ORDER BY created_at ASC
  LIMIT 1;

  -- If no users exist, create a system user
  IF system_user_id IS NULL THEN
    system_user_id := '00000000-0000-0000-0000-000000000000';

    -- Insert into profiles (we'll use this as our system account)
    INSERT INTO profiles (id, username, display_name, influence_score)
    VALUES (system_user_id, 'ponder', 'Ponder Team', 0)
    ON CONFLICT (id) DO NOTHING;
  END IF;

  -- AI & Technology Quadrant
  INSERT INTO debates (topic, description, quadrant, status, created_by) VALUES
  ('Should AI systems have legal personhood?', 'If AI becomes sufficiently advanced, should we grant them legal rights and responsibilities similar to corporations or individuals?', 'ai_technology', 'open', system_user_id),
  ('Is the singularity inevitable or science fiction?', 'Will we reach a point where AI surpasses human intelligence and triggers runaway technological growth, or is this just a techno-utopian fantasy?', 'ai_technology', 'open', system_user_id),
  ('Does social media make us more or less connected?', 'Technology promised to bring us together, but has it actually increased loneliness and superficial relationships instead of meaningful connection?', 'ai_technology', 'open', system_user_id),
  ('Should we fear or embrace brain-computer interfaces?', 'Neuralink and similar technologies could enhance human capabilities, but at what cost to our privacy, autonomy, and what it means to be human?', 'ai_technology', 'open', system_user_id),
  ('Is algorithmic bias inevitable?', 'Can we ever create truly neutral AI systems, or will they always reflect the biases of their creators and training data?', 'ai_technology', 'open', system_user_id),
  ('Does the internet make us smarter or dumber?', 'Unlimited access to information sounds beneficial, but is it degrading our ability to think deeply and remember things ourselves?', 'ai_technology', 'open', system_user_id),
  ('Should we create digital consciousness?', 'If we could upload human consciousness to computers, achieving a form of digital immortality, should we? What are the philosophical implications?', 'ai_technology', 'open', system_user_id),
  ('Is privacy dead in the digital age?', 'Between government surveillance and corporate data harvesting, have we already lost any meaningful conception of privacy? Should we even try to preserve it?', 'ai_technology', 'open', system_user_id),
  ('Can AI ever be truly creative?', 'AI can generate art, music, and writing - but is this genuine creativity or sophisticated pattern matching? What distinguishes human creativity from computational creation?', 'ai_technology', 'open', system_user_id),
  ('Should we halt AI development?', 'Some experts call for pausing advanced AI research until we solve alignment. Is this prudent caution or misguided fear of progress?', 'ai_technology', 'open', system_user_id);

  -- Philosophy Quadrant
  INSERT INTO debates (topic, description, quadrant, status, created_by) VALUES
  ('Is free will an illusion?', 'If our decisions are the product of prior causes (genes, environment, brain chemistry), can we truly be said to have free will? What does this mean for moral responsibility?', 'philosophy', 'open', system_user_id),
  ('Does objective truth exist?', 'Is there a reality independent of our perception and interpretation, or is all truth relative to culture, language, and individual perspective?', 'philosophy', 'open', system_user_id),
  ('What is the meaning of life?', 'Is life inherently meaningful, or must we create our own meaning in an indifferent universe? Can there even be a universal answer to this question?', 'philosophy', 'open', system_user_id),
  ('Is consciousness fundamental or emergent?', 'Does consciousness arise from complex information processing in the brain, or is it a basic feature of reality itself, like space and time?', 'philosophy', 'open', system_user_id),
  ('Can we ever escape Plato''s cave?', 'Are we fundamentally limited by our perceptions and unable to grasp true reality, or can reason and philosophy lead us to genuine knowledge?', 'philosophy', 'open', system_user_id),
  ('Is there a hard problem of consciousness?', 'Why does subjective experience exist at all? Can we ever explain qualia (what it''s like to see red, feel pain) in physical terms?', 'philosophy', 'open', system_user_id),
  ('Should we fear death?', 'Is death the end of everything that matters, or is fearing death irrational since we won''t experience it? What does mortality mean for how we should live?', 'philosophy', 'open', system_user_id),
  ('Is morality objective or subjective?', 'Are moral truths discovered or invented? Do ethical principles exist independently of what anyone thinks, or are they social constructs?', 'philosophy', 'open', system_user_id),
  ('What is personal identity?', 'If all your cells are replaced over time and your memories can change, what makes you "you"? Is there a continuous self, or just a stream of experiences?', 'philosophy', 'open', system_user_id),
  ('Is happiness the purpose of life?', 'Should we pursue happiness above all else (hedonism), or are there more important values like truth, virtue, or meaning that matter more?', 'philosophy', 'open', system_user_id);

  -- Morality & Ethics Quadrant
  INSERT INTO debates (topic, description, quadrant, status, created_by) VALUES
  ('Is eating meat morally wrong?', 'Animals suffer and have interests - does that create a moral obligation for humans to stop eating them? Or is this relationship natural and acceptable?', 'morality_ethics', 'open', system_user_id),
  ('Should we abolish prisons?', 'Does incarceration actually rehabilitate or just perpetuate cycles of harm? Are there better alternatives to our current criminal justice system?', 'morality_ethics', 'open', system_user_id),
  ('Is lying ever justified?', 'Are there situations where lying is not just permissible but morally required? Can consequentialist concerns override the duty to tell the truth?', 'morality_ethics', 'open', system_user_id),
  ('Do we have moral obligations to future generations?', 'Should we sacrifice our current wellbeing for people who don''t exist yet? How do we balance present needs against potential future harms like climate change?', 'morality_ethics', 'open', system_user_id),
  ('Is consent sufficient for morality?', 'If all parties consent, does that make an action morally acceptable? Are there things that are wrong even with consent, or limits to personal autonomy?', 'morality_ethics', 'open', system_user_id),
  ('Should we prioritize humans over animals?', 'Is human life inherently more valuable than animal life? On what basis - intelligence, species membership, capacity for suffering, or something else?', 'morality_ethics', 'open', system_user_id),
  ('Is moral relativism self-defeating?', 'If we say all moral views are equally valid, can we condemn practices like slavery or genocide? Does tolerance require some universal moral standards?', 'morality_ethics', 'open', system_user_id),
  ('Do the ends justify the means?', 'Is it acceptable to do something bad if it produces good outcomes? Where do we draw the line between consequentialism and moral absolutism?', 'morality_ethics', 'open', system_user_id),
  ('Is there a duty to help those in poverty?', 'If we can prevent suffering without sacrificing anything of comparable moral importance, are we obligated to do so? How much should we give to the global poor?', 'morality_ethics', 'open', system_user_id),
  ('Should we value equality or freedom more?', 'When these values conflict, which should take priority? Can we have both, or is there an inherent tension between equality and liberty?', 'morality_ethics', 'open', system_user_id);

  -- Economics & Society Quadrant
  INSERT INTO debates (topic, description, quadrant, status, created_by) VALUES
  ('Is capitalism morally justified?', 'Does the free market create prosperity and freedom, or does it inevitably lead to exploitation and inequality? Can capitalism be reformed or should it be replaced?', 'economics_society', 'open', system_user_id),
  ('Should we implement universal basic income?', 'As automation displaces workers, should governments provide unconditional income to all citizens? Would this liberate people or create dependency?', 'economics_society', 'open', system_user_id),
  ('Is meritocracy a myth?', 'Do people truly rise based on talent and effort, or is success primarily determined by circumstances of birth like family wealth and social connections?', 'economics_society', 'open', system_user_id),
  ('Should billionaires exist?', 'Is extreme wealth accumulation a sign of a broken system, or the natural result of creating value? At what point does wealth inequality become unjust?', 'economics_society', 'open', system_user_id),
  ('Is democracy the best form of government?', 'Does democracy protect freedom and represent the people, or does it lead to tyranny of the majority and uninformed decision-making? Are there better alternatives?', 'economics_society', 'open', system_user_id),
  ('Should we ban inheritance?', 'Does passing wealth to children perpetuate inequality and undermine meritocracy? Or is it a fundamental property right that motivates productivity?', 'economics_society', 'open', system_user_id),
  ('Is cancel culture harmful or necessary?', 'Does social media accountability hold powerful people responsible, or does it create mob justice and stifle free speech? Where''s the line between consequences and cancellation?', 'economics_society', 'open', system_user_id),
  ('Should we end intellectual property?', 'Do patents and copyrights incentivize innovation, or do they restrict knowledge sharing and slow progress? What would a world without IP look like?', 'economics_society', 'open', system_user_id),
  ('Is economic growth necessary?', 'Can we have prosperity without endless growth, or does degrowth mean lower living standards? Is perpetual growth even possible on a finite planet?', 'economics_society', 'open', system_user_id),
  ('Should we open all borders?', 'Are national borders morally arbitrary and economically inefficient, or necessary for social cohesion and self-determination? What do we owe to foreigners?', 'economics_society', 'open', system_user_id);

END $$;
