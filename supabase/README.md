# Supabase Setup for PhiloDuel

## Running Migrations

### Option 1: Supabase Dashboard (Easiest)
1. Go to https://supabase.com/dashboard/project/cbnqsuzsvkjfieplmahn
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the entire content of `migrations/20250113_init.sql`
5. Click "Run" to execute

### Option 2: Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref cbnqsuzsvkjfieplmahn

# Run migrations
supabase db push
```

## Database Schema Overview

### Tables
- **profiles** - User profiles with reputation scores
- **debates** - Debate topics and status
- **arguments** - Individual arguments in debates
- **judgments** - AI-generated judgments and scores

### Security
- Row Level Security (RLS) enabled on all tables
- Public read access for all data
- Users can only modify their own content
