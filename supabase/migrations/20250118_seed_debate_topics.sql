-- Seed 40 engaging debate topics across all quadrants
-- 10 topics per quadrant: AI & Technology, Philosophy, Morality & Ethics, Economics & Society

-- IMPORTANT: Before running this migration, you need to either:
-- Option 1: Replace '00000000-0000-0000-0000-000000000000' with a real user UUID from your profiles table
-- Option 2: Create a system user first (recommended):
--   INSERT INTO auth.users (id, email) VALUES ('00000000-0000-0000-0000-000000000000', 'ponder@system.bot');
--   INSERT INTO profiles (id, username, display_name) VALUES ('00000000-0000-0000-0000-000000000000', 'ponder', 'Ponder Team');

-- For now, using a placeholder that you'll need to update before running this migration

-- AI & Technology Quadrant
INSERT INTO debates (topic, description, quadrant, status, created_by) VALUES
('Should AI systems have legal personhood?', 'If AI becomes sufficiently advanced, should we grant them legal rights and responsibilities similar to corporations or individuals?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000'),
('Is the singularity inevitable or science fiction?', 'Will we reach a point where AI surpasses human intelligence and triggers runaway technological growth, or is this just a techno-utopian fantasy?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000'),
('Does social media make us more or less connected?', 'Technology promised to bring us together, but has it actually increased loneliness and superficial relationships instead of meaningful connection?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we fear or embrace brain-computer interfaces?', 'Neuralink and similar technologies could enhance human capabilities, but at what cost to our privacy, autonomy, and what it means to be human?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000'),
('Is algorithmic bias inevitable?', 'Can we ever create truly neutral AI systems, or will they always reflect the biases of their creators and training data?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000'),
('Does the internet make us smarter or dumber?', 'Unlimited access to information sounds beneficial, but is it degrading our ability to think deeply and remember things ourselves?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we create digital consciousness?', 'If we could upload human consciousness to computers, achieving a form of digital immortality, should we? What are the philosophical implications?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000'),
('Is privacy dead in the digital age?', 'Between government surveillance and corporate data harvesting, have we already lost any meaningful conception of privacy? Should we even try to preserve it?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000'),
('Can AI ever be truly creative?', 'AI can generate art, music, and writing - but is this genuine creativity or sophisticated pattern matching? What distinguishes human creativity from computational creation?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we halt AI development?', 'Some experts call for pausing advanced AI research until we solve alignment. Is this prudent caution or misguided fear of progress?', 'ai_technology', 'open', '00000000-0000-0000-0000-000000000000');

-- Philosophy Quadrant
INSERT INTO debates (topic, description, quadrant, status, created_by) VALUES
('Is free will an illusion?', 'If our decisions are the product of prior causes (genes, environment, brain chemistry), can we truly be said to have free will? What does this mean for moral responsibility?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000'),
('Does objective truth exist?', 'Is there a reality independent of our perception and interpretation, or is all truth relative to culture, language, and individual perspective?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000'),
('What is the meaning of life?', 'Is life inherently meaningful, or must we create our own meaning in an indifferent universe? Can there even be a universal answer to this question?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000'),
('Is consciousness fundamental or emergent?', 'Does consciousness arise from complex information processing in the brain, or is it a basic feature of reality itself, like space and time?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000'),
('Can we ever escape Plato''s cave?', 'Are we fundamentally limited by our perceptions and unable to grasp true reality, or can reason and philosophy lead us to genuine knowledge?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000'),
('Is there a hard problem of consciousness?', 'Why does subjective experience exist at all? Can we ever explain qualia (what it''s like to see red, feel pain) in physical terms?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we fear death?', 'Is death the end of everything that matters, or is fearing death irrational since we won''t experience it? What does mortality mean for how we should live?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000'),
('Is morality objective or subjective?', 'Are moral truths discovered or invented? Do ethical principles exist independently of what anyone thinks, or are they social constructs?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000'),
('What is personal identity?', 'If all your cells are replaced over time and your memories can change, what makes you "you"? Is there a continuous self, or just a stream of experiences?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000'),
('Is happiness the purpose of life?', 'Should we pursue happiness above all else (hedonism), or are there more important values like truth, virtue, or meaning that matter more?', 'philosophy', 'open', '00000000-0000-0000-0000-000000000000');

-- Morality & Ethics Quadrant
INSERT INTO debates (topic, description, quadrant, status, created_by) VALUES
('Is eating meat morally wrong?', 'Animals suffer and have interests - does that create a moral obligation for humans to stop eating them? Or is this relationship natural and acceptable?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we abolish prisons?', 'Does incarceration actually rehabilitate or just perpetuate cycles of harm? Are there better alternatives to our current criminal justice system?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000'),
('Is lying ever justified?', 'Are there situations where lying is not just permissible but morally required? Can consequentialist concerns override the duty to tell the truth?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000'),
('Do we have moral obligations to future generations?', 'Should we sacrifice our current wellbeing for people who don''t exist yet? How do we balance present needs against potential future harms like climate change?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000'),
('Is consent sufficient for morality?', 'If all parties consent, does that make an action morally acceptable? Are there things that are wrong even with consent, or limits to personal autonomy?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we prioritize humans over animals?', 'Is human life inherently more valuable than animal life? On what basis - intelligence, species membership, capacity for suffering, or something else?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000'),
('Is moral relativism self-defeating?', 'If we say all moral views are equally valid, can we condemn practices like slavery or genocide? Does tolerance require some universal moral standards?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000'),
('Do the ends justify the means?', 'Is it acceptable to do something bad if it produces good outcomes? Where do we draw the line between consequentialism and moral absolutism?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000'),
('Is there a duty to help those in poverty?', 'If we can prevent suffering without sacrificing anything of comparable moral importance, are we obligated to do so? How much should we give to the global poor?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we value equality or freedom more?', 'When these values conflict, which should take priority? Can we have both, or is there an inherent tension between equality and liberty?', 'morality_ethics', 'open', '00000000-0000-0000-0000-000000000000');

-- Economics & Society Quadrant
INSERT INTO debates (topic, description, quadrant, status, created_by) VALUES
('Is capitalism morally justified?', 'Does the free market create prosperity and freedom, or does it inevitably lead to exploitation and inequality? Can capitalism be reformed or should it be replaced?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we implement universal basic income?', 'As automation displaces workers, should governments provide unconditional income to all citizens? Would this liberate people or create dependency?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000'),
('Is meritocracy a myth?', 'Do people truly rise based on talent and effort, or is success primarily determined by circumstances of birth like family wealth and social connections?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000'),
('Should billionaires exist?', 'Is extreme wealth accumulation a sign of a broken system, or the natural result of creating value? At what point does wealth inequality become unjust?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000'),
('Is democracy the best form of government?', 'Does democracy protect freedom and represent the people, or does it lead to tyranny of the majority and uninformed decision-making? Are there better alternatives?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we ban inheritance?', 'Does passing wealth to children perpetuate inequality and undermine meritocracy? Or is it a fundamental property right that motivates productivity?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000'),
('Is cancel culture harmful or necessary?', 'Does social media accountability hold powerful people responsible, or does it create mob justice and stifle free speech? Where''s the line between consequences and cancellation?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we end intellectual property?', 'Do patents and copyrights incentivize innovation, or do they restrict knowledge sharing and slow progress? What would a world without IP look like?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000'),
('Is economic growth necessary?', 'Can we have prosperity without endless growth, or does degrowth mean lower living standards? Is perpetual growth even possible on a finite planet?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000'),
('Should we open all borders?', 'Are national borders morally arbitrary and economically inefficient, or necessary for social cohesion and self-determination? What do we owe to foreigners?', 'economics_society', 'open', '00000000-0000-0000-0000-000000000000');
