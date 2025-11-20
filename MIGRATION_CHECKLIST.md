# Database Migrations Checklist

This document tracks all database migrations for the WONDER app. Apply these migrations in your Supabase dashboard in the order listed.

## How to Apply Migrations

1. Go to your Supabase dashboard → SQL Editor
2. Copy the content of each migration file
3. Execute the query
4. Check this box once applied

## Migration Files

### Core Setup

- [ ] **20250113_init.sql** - Initial database setup
  - Creates core tables: profiles, debates, arguments, judgments
  - Sets up Row Level Security (RLS) policies
  - Establishes authentication triggers
  - **Dependencies**: None (must run first)
  - **Required**: Yes

- [ ] **20250114_add_delo_rating.sql** - Add DeLO rating system
  - Adds DeLO (Debate Logic) rating field to profiles
  - **Dependencies**: 20250113_init.sql
  - **Required**: Optional (legacy feature)

### Conversation & Discussion Features

- [ ] **20250117_conversation_transformation.sql** - Transform debates to conversations
  - Converts debate system to conversation model
  - Updates schema for multi-participant discussions
  - **Dependencies**: 20250113_init.sql
  - **Required**: Yes (if using conversation features)

- [ ] **20250117_discussions.sql** - Discussion system
  - Creates discussion tables and comment threads
  - Enables community discussions separate from debates
  - **Dependencies**: 20250113_init.sql
  - **Required**: Yes (core feature)

### Premium Features

- [ ] **20250117_create_inquire_tables.sql** - Inquire premium platform
  - Creates tables for premium philosophy coaching feature
  - Sets up mentor/student relationships
  - **Dependencies**: 20250113_init.sql
  - **Required**: Optional (premium feature only)

### Engagement Features

- [ ] **20250117_daily_prompts_system.sql** - Daily philosophical prompts
  - Creates tables for daily question system
  - Enables scheduled philosophical challenges
  - **Dependencies**: 20250113_init.sql
  - **Required**: Yes (core engagement feature)

- [ ] **20250118_quadrants_and_voting_system.sql** - Voting system V1
  - Adds snap/zap voting to posts and comments
  - Creates quadrant-based post categorization
  - **Dependencies**: 20250113_init.sql
  - **Required**: Use V2 instead

- [ ] **20250118_quadrants_and_voting_system_v2.sql** - Voting system V2 (RECOMMENDED)
  - Improved voting system with better performance
  - Enhanced quadrant categorization
  - **Dependencies**: 20250113_init.sql
  - **Required**: Yes (use instead of V1)

### Personal Features

- [ ] **20250118_journal_system.sql** - Private journal system
  - Creates journal entries and folders
  - Enables private reflection with optional community publishing
  - **Dependencies**: 20250113_init.sql
  - **Required**: Yes (core feature)

### Seed Data

- [ ] **20250118_seed_debate_topics.sql** - Sample debate topics V1
  - Populates database with initial debate topics
  - **Dependencies**: Core tables must exist
  - **Required**: Use V2 instead

- [ ] **20250118_seed_debate_topics_v2.sql** - Sample debate topics V2 (RECOMMENDED)
  - Improved seed data with better topic variety
  - **Dependencies**: Core tables must exist
  - **Required**: Optional (useful for development/testing)

## Migration Order (Recommended)

For a full-featured WONDER deployment, run migrations in this order:

1. ✅ 20250113_init.sql (required - core setup)
2. ✅ 20250117_discussions.sql (required - discussion features)
3. ✅ 20250117_daily_prompts_system.sql (required - daily prompts)
4. ✅ 20250118_quadrants_and_voting_system_v2.sql (required - voting)
5. ✅ 20250118_journal_system.sql (required - journal feature)
6. ⚠️ 20250117_conversation_transformation.sql (optional - if using conversations)
7. ⚠️ 20250118_seed_debate_topics_v2.sql (optional - sample data)
8. ⚠️ 20250117_create_inquire_tables.sql (optional - premium feature)

## Skip These (Deprecated)

- ❌ 20250114_add_delo_rating.sql (deprecated rating system)
- ❌ 20250118_quadrants_and_voting_system.sql (use V2 instead)
- ❌ 20250118_seed_debate_topics.sql (use V2 instead)

## Verification

After applying migrations, verify your setup:

```sql
-- Check that core tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Expected tables:
-- - profiles
-- - debates (or conversations)
-- - arguments
-- - judgments
-- - discussions
-- - discussion_comments
-- - daily_prompts
-- - posts
-- - comments
-- - journal_entries
-- - journal_folders
```

## Troubleshooting

- **Error: "relation already exists"**: Migration already applied, skip it
- **Error: "column does not exist"**: Previous migration not applied, check dependencies
- **RLS errors**: Ensure RLS policies were created properly in 20250113_init.sql

## Notes

- Always backup your database before applying migrations
- Test migrations in a development environment first
- Some migrations modify existing tables - review SQL before executing
- RLS policies are critical for security - do not skip them
