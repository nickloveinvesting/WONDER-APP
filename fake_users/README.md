# WONDER Fake User Population

This directory contains everything needed to populate your WONDER platform with 10 realistic philosophy enthusiasts.

## Quick Start

### 1. Add Service Role Key to Environment

The seed script requires your Supabase service role key. Add it to `.env.local`:

```bash
# Get this from: Supabase Dashboard > Settings > API > Service Role Key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Note:** Keep this key secret! It has admin access to your database.

### 2. Run the Seed Script

```bash
npm run seed:users
```

This creates 10 authenticated users with fully populated profiles.

## What's Included

### Files

| File | Description |
|------|-------------|
| `profiles.json` | Complete user profiles with writing styles, interaction patterns, and philosophical positions |
| `seed_users.js` | Node script to create auth users and profiles via Supabase Admin API |
| `interaction_scripts.js` | Behavior simulation functions for automating user activity |
| `content_bank.json` | Pre-written arguments, comments, and interaction patterns |

### The 10 Users

#### Academics (DeLO 1380-1580)
1. **Dr. Sarah Chen** (`sarah_chen_mit`) - Phenomenology professor at MIT
2. **Marcus Rodriguez** (`marcus_ethics`) - PhD candidate in Ethics at Yale
3. **Prof. James Wright** (`prof_wright`) - Retired Philosophy of Science professor

#### Serious Amateurs (DeLO 975-1185)
4. **Alex Kim** (`logicgate_alex`) - Software engineer, self-taught philosopher
5. **Rachel Green** (`presence_rachel`) - Therapist interested in existentialism
6. **David Okonkwo** (`socratic_david`) - High school teacher, philosophy club advisor
7. **Emma Thompson** (`emma_writes`) - Novelist exploring philosophical themes

#### Curious Beginners (DeLO 865-920)
8. **Jordan Miller** (`philosophyjordan`) - College sophomore, first philosophy class
9. **Priya Patel** (`priya_thinks`) - Business analyst exploring stoicism
10. **Tom Anderson** (`tom_wonders`) - Retired engineer discovering philosophy

## User Details

### Demo Login Credentials

All fake users use the same password: `WonderDemo2025!`

| Email | Display Name | Category |
|-------|--------------|----------|
| sarah.chen@example.com | Dr. Sarah Chen | Academic |
| marcus.rodriguez@example.com | Marcus Rodriguez | Academic |
| james.wright@example.com | Prof. James Wright | Academic |
| alex.kim@example.com | Alex Kim | Serious Amateur |
| rachel.green@example.com | Rachel Green, LMHC | Serious Amateur |
| david.okonkwo@example.com | David Okonkwo | Serious Amateur |
| emma.thompson@example.com | Emma Thompson | Serious Amateur |
| jordan.miller@example.com | Jordan Miller | Beginner |
| priya.patel@example.com | Priya Patel | Beginner |
| tom.anderson@example.com | Tom Anderson | Beginner |

### Writing Style Variations

Each user has distinct characteristics:

| User | Vocabulary | Sentence Complexity | Emoji Usage | Typos |
|------|------------|---------------------|-------------|-------|
| Dr. Chen | 9/10 | 8/10 | Rarely | Never |
| Marcus | 7/10 | 6/10 | Sometimes | Never |
| Prof. Wright | 10/10 | 9/10 | Never | Never |
| Alex | 7/10 | 6/10 | Minimal | Common |
| Rachel | 8/10 | 7/10 | None | Occasional |
| David | 6/10 | 5/10 | Occasional | Text speak |
| Emma | 9/10 | 8/10 | Never | Rare |
| Jordan | 6/10 | 5/10 | Moderate | Common |
| Priya | 7/10 | 6/10 | Minimal | Rare |
| Tom | 7/10 | 7/10 | None | Occasional |

### Interaction Patterns

| User | Active Times | Snap Tendency | Debate Initiator |
|------|--------------|---------------|------------------|
| Dr. Chen | Morning, evening EST | Medium | High |
| Marcus | Midday, late night EST | High | Very High |
| Prof. Wright | Throughout day GMT | Low | Low |
| Alex | Night PST | Medium | Medium |
| Rachel | Morning, evening PST | High | Low |
| David | After school, evening CST | Medium | High |
| Emma | Morning, late night PST | Very High | Very Low |
| Jordan | Late night, random EST | High | Medium |
| Priya | Early morning, lunch EST | Medium | Low |
| Tom | Daytime CST | Medium | Low |

## Using the Content Bank

The `content_bank.json` file contains:

- **Pre-written arguments** for each user on various philosophical topics
- **Daily question responses** in each user's voice
- **Snap/Zap criteria** - what each user tends to appreciate or critique

### Example Usage

```javascript
const contentBank = require('./content_bank.json');

// Get an argument from Sarah Chen
const sarahArgument = contentBank.arguments.sarah_chen_mit[0];
console.log(sarahArgument.content);
// "Phenomenologically speaking, I think we need to be much more careful here..."
```

## Automated Interaction Scripts

The `interaction_scripts.js` file provides functions for simulating user activity:

```javascript
const {
  isUserActive,
  simulateUserActivity,
  selectTopicForUser,
  generateArgument,
  morningRoutine,
  middayActivity,
  eveningEngagement,
  lateNightActivity
} = require('./interaction_scripts');

// Check if a user would be active right now
const profiles = require('./profiles.json');
const sarah = profiles.users.find(u => u.user_id === 'sarah_chen');
console.log(isUserActive(sarah)); // true/false based on time

// Select a relevant debate topic for a user
const topic = selectTopicForUser(sarah);
console.log(topic); // "Can AI ever have genuine phenomenal consciousness?"
```

## Extending the System

### Adding New Users

1. Add user definition to `profiles.json`
2. Add entry to `fakeUsers` array in `seed_users.js`
3. Add content samples to `content_bank.json`
4. Add behavior patterns to `interaction_scripts.js`

### Creating Content Generation

The interaction scripts provide structure for generating content, but actual text generation would require:
- Integration with an LLM (GPT-4, Claude, Gemini)
- Prompt engineering using the writing style profiles
- Rate limiting to simulate realistic posting patterns

Example prompt template:
```
You are {display_name}, a {bio snippet}.

Writing style:
- Vocabulary level: {vocabulary_level}/10
- Typical phrases: {favorite_phrases}
- Never use emojis: {emoji_usage === 'never'}

Topic: {topic}
Position: {position}

Write a {argument_length_preference}-word argument in your voice.
```

## Migration SQL

If you need to run the migration manually (after auth users exist):

```bash
# The SQL is in:
supabase/migrations/20250120000001_seed_fake_users.sql
```

This migration uses `ON CONFLICT` to safely upsert profile data.
