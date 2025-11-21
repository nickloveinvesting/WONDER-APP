/**
 * WONDER Fake User Seed Script
 *
 * This script creates 10 fake users with both auth.users entries
 * and profiles using the Supabase Admin SDK.
 *
 * Usage:
 *   node fake_users/seed_users.js
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create admin client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// User data with pre-defined UUIDs for consistency
const fakeUsers = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'sarah.chen@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'sarah_chen_mit',
      display_name: 'Dr. Sarah Chen',
      bio: "Phenomenologist exploring the boundaries where mind meets world. I study how consciousness emerges through embodied experience—from human perception to artificial systems. Currently investigating whether AI can ever truly 'experience' rather than merely process. MIT Philosophy. Berkeley PhD '09.",
      delo_rating: 1520,
      reputation_score: 875,
      expertise_areas: ['phenomenology', 'philosophy_of_mind', 'embodied_cognition', 'AI_consciousness'],
      learning_interests: ['machine_learning_theory', 'Buddhist_philosophy', 'neuroscience_of_consciousness'],
      delo_categories: { logic: 1340, ethics: 1280, aesthetics: 1420, metaphysics: 1680, epistemology: 1590, political_philosophy: 1120 },
      debates_participated: 24,
      debates_won: 18,
      daily_streak: 12,
      longest_streak: 45,
      influence_score: 420
    }
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    email: 'marcus.rodriguez@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'marcus_ethics',
      display_name: 'Marcus Rodriguez',
      bio: "PhD candidate @Yale wrestling with the ethics of emerging tech. From Miami—Cuban-American, first-gen academic. I believe philosophy should matter in the real world. Currently writing on algorithmic fairness.",
      delo_rating: 1380,
      reputation_score: 620,
      expertise_areas: ['applied_ethics', 'technology_ethics', 'algorithmic_fairness', 'moral_philosophy'],
      learning_interests: ['philosophy_of_AI', 'Latin_American_philosophy', 'critical_race_theory'],
      delo_categories: { logic: 1290, ethics: 1580, aesthetics: 1050, metaphysics: 1180, epistemology: 1320, political_philosophy: 1540 },
      debates_participated: 31,
      debates_won: 22,
      daily_streak: 5,
      longest_streak: 28,
      influence_score: 315
    }
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    email: 'james.wright@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'prof_wright',
      display_name: 'Prof. James Wright',
      bio: "Emeritus Professor of Philosophy of Science. Cambridge man, though I've mellowed since. Spent forty years thinking about what science tells us about reality—and what it doesn't. Now retired to Cornwall.",
      delo_rating: 1580,
      reputation_score: 945,
      expertise_areas: ['philosophy_of_science', 'scientific_realism', 'history_of_philosophy', 'epistemology'],
      learning_interests: ['philosophy_of_biology', 'contemporary_metaphysics', 'Chinese_philosophy'],
      delo_categories: { logic: 1720, ethics: 1380, aesthetics: 1340, metaphysics: 1640, epistemology: 1780, political_philosophy: 1290 },
      debates_participated: 19,
      debates_won: 15,
      daily_streak: 3,
      longest_streak: 21,
      influence_score: 580
    }
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    email: 'alex.kim@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'logicgate_alex',
      display_name: 'Alex Kim',
      bio: "Software engineer by day, philosophy nerd by night. Got hooked on Philosophize This! during my commute and now I can't stop thinking about whether my code has qualia. Currently obsessed with consciousness.",
      delo_rating: 1185,
      reputation_score: 445,
      expertise_areas: ['logic', 'philosophy_of_mind', 'philosophy_of_science', 'formal_reasoning'],
      learning_interests: ['phenomenology', 'eastern_philosophy', 'bioethics', 'free_will'],
      delo_categories: { logic: 1180, ethics: 920, aesthetics: 780, metaphysics: 1050, epistemology: 1100, political_philosophy: 850 },
      debates_participated: 15,
      debates_won: 9,
      daily_streak: 8,
      longest_streak: 22,
      influence_score: 195
    }
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    email: 'rachel.green@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'presence_rachel',
      display_name: 'Rachel Green, LMHC',
      bio: "Therapist exploring how philosophy actually helps people live. I see existentialism in action every day—clients wrestling with meaning, confronting mortality, trying to live authentically.",
      delo_rating: 1120,
      reputation_score: 520,
      expertise_areas: ['existentialism', 'ethics', 'philosophy_of_psychology', 'phenomenology'],
      learning_interests: ['buddhist_philosophy', 'stoicism', 'philosophy_of_emotion', 'virtue_ethics'],
      delo_categories: { logic: 880, ethics: 1150, aesthetics: 950, metaphysics: 980, epistemology: 920, political_philosophy: 870 },
      debates_participated: 12,
      debates_won: 7,
      daily_streak: 15,
      longest_streak: 32,
      influence_score: 245
    }
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    email: 'david.okonkwo@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'socratic_david',
      display_name: 'David Okonkwo',
      bio: "High school teacher bringing philosophy to the South Side. I run a philosophy club where kids debate everything from TikTok ethics to whether Thanos was right. Big believer in the Socratic method.",
      delo_rating: 1050,
      reputation_score: 385,
      expertise_areas: ['african_philosophy', 'ethics', 'political_philosophy', 'philosophy_of_education'],
      learning_interests: ['epistemology', 'philosophy_of_race', 'ancient_philosophy', 'pragmatism'],
      delo_categories: { logic: 920, ethics: 1100, aesthetics: 880, metaphysics: 850, epistemology: 950, political_philosophy: 1150 },
      debates_participated: 18,
      debates_won: 10,
      daily_streak: 4,
      longest_streak: 18,
      influence_score: 175
    }
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    email: 'emma.thompson@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'emma_writes',
      display_name: 'Emma Thompson',
      bio: "Novelist chasing ideas through fiction. My MFA taught me craft; philosophy teaches me what's worth writing about. Currently haunted by: time, memory, the stories we tell ourselves.",
      delo_rating: 975,
      reputation_score: 290,
      expertise_areas: ['aesthetics', 'philosophy_of_narrative', 'existentialism', 'philosophy_of_time'],
      learning_interests: ['phenomenology', 'philosophy_of_memory', 'hermeneutics', 'japanese_aesthetics'],
      delo_categories: { logic: 720, ethics: 980, aesthetics: 1180, metaphysics: 1020, epistemology: 850, political_philosophy: 780 },
      debates_participated: 8,
      debates_won: 4,
      daily_streak: 2,
      longest_streak: 14,
      influence_score: 125
    }
  },
  {
    id: '88888888-8888-8888-8888-888888888888',
    email: 'jordan.miller@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'philosophyjordan',
      display_name: 'Jordan Miller',
      bio: "Sophomore taking my first philosophy class and honestly? Mind = blown. Currently obsessed with the trolley problem and trying to figure out if free will is even a thing.",
      delo_rating: 875,
      reputation_score: 120,
      expertise_areas: [],
      learning_interests: ['free_will', 'ethics', 'political_philosophy', 'philosophy_of_mind', 'existentialism'],
      delo_categories: { logic: 840, ethics: 890, aesthetics: 800, metaphysics: 860, epistemology: 825, political_philosophy: 880 },
      debates_participated: 6,
      debates_won: 2,
      daily_streak: 7,
      longest_streak: 12,
      influence_score: 45
    }
  },
  {
    id: '99999999-9999-9999-9999-999999999999',
    email: 'priya.patel@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'priya_thinks',
      display_name: 'Priya Patel',
      bio: "Business analyst by day, aspiring stoic by... also day (working on it). Found Marcus Aurelius through a productivity podcast and fell down the philosophy rabbit hole.",
      delo_rating: 920,
      reputation_score: 175,
      expertise_areas: ['stoicism_beginner'],
      learning_interests: ['stoicism', 'practical_ethics', 'eastern_philosophy', 'philosophy_of_happiness'],
      delo_categories: { logic: 900, ethics: 920, aesthetics: 780, metaphysics: 800, epistemology: 850, political_philosophy: 830 },
      debates_participated: 9,
      debates_won: 4,
      daily_streak: 11,
      longest_streak: 19,
      influence_score: 78
    }
  },
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    email: 'tom.anderson@example.com',
    password: 'WonderDemo2025!',
    profile: {
      username: 'tom_wonders',
      display_name: 'Tom Anderson',
      bio: "Retired mechanical engineer with 35 years of solving practical problems. Now I'm tackling the impractical ones. Started reading philosophy after retirement. Better late than never.",
      delo_rating: 865,
      reputation_score: 145,
      expertise_areas: [],
      learning_interests: ['meaning_of_life', 'philosophy_of_death', 'existentialism', 'philosophy_of_science', 'ethics'],
      delo_categories: { logic: 895, ethics: 855, aesthetics: 790, metaphysics: 850, epistemology: 870, political_philosophy: 820 },
      debates_participated: 7,
      debates_won: 3,
      daily_streak: 6,
      longest_streak: 15,
      influence_score: 65
    }
  }
];

async function seedUsers() {
  console.log('Starting WONDER fake user seed...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const user of fakeUsers) {
    console.log(`Creating user: ${user.profile.display_name}...`);

    try {
      // Step 1: Create auth user with Admin API
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          display_name: user.profile.display_name
        }
      });

      if (authError) {
        // Check if user already exists
        if (authError.message.includes('already been registered')) {
          console.log(`  User ${user.email} already exists, updating profile...`);

          // Get existing user by email
          const { data: existingUsers } = await supabase.auth.admin.listUsers();
          const existingUser = existingUsers.users.find(u => u.email === user.email);

          if (existingUser) {
            // Update profile for existing user
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert({
                id: existingUser.id,
                ...user.profile
              });

            if (profileError) {
              console.error(`  Error updating profile: ${profileError.message}`);
              errorCount++;
            } else {
              console.log(`  Profile updated successfully!`);
              successCount++;
            }
          }
          continue;
        }
        throw authError;
      }

      const userId = authData.user.id;
      console.log(`  Auth user created with ID: ${userId}`);

      // Step 2: Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...user.profile
        });

      if (profileError) {
        console.error(`  Error creating profile: ${profileError.message}`);
        errorCount++;
        continue;
      }

      console.log(`  Profile created successfully!`);
      successCount++;

    } catch (error) {
      console.error(`  Error: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n========================================');
  console.log(`Seed complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log('========================================\n');

  if (successCount > 0) {
    console.log('Demo accounts created with password: WonderDemo2025!');
    console.log('\nYou can log in as any of these users:');
    fakeUsers.forEach(u => {
      console.log(`  ${u.email} - ${u.profile.display_name}`);
    });
  }
}

// Run the seed function
seedUsers().catch(console.error);
