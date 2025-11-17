# Database Migrations

## How to Apply Migrations

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Copy the content from the migration file you want to run
5. Paste it into the SQL editor
6. Click **Run** to execute the migration

## Migration Files

- `20250113_init.sql` - Initial database schema (profiles, debates, arguments, judgments)
- `20250114_add_delo_rating.sql` - Adds DeLO rating system to profiles table
- `20250117_discussions.sql` - Adds discussion system (discussions, comments, votes, and RPC functions)

## Important Notes

- Run migrations in order (by date)
- The `20250114_add_delo_rating.sql` migration is required for the leaderboard page to work properly
- All existing users will default to 1000 DeLO rating
- New users automatically get 1000 DeLO rating as the default value
