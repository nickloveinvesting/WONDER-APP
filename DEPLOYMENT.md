# PhiloDuel - Complete Deployment Guide

## 🎉 Your App is Ready!

All code is built and tested locally. Follow these steps to deploy:

---

## Step 1: Push to GitHub

### Option A: Using Git CLI
```bash
cd /Users/nickfijimorris/philoduel-app
git add .
git commit -m "PhiloDuel MVP - Complete Application"
git push origin HEAD:main
```

### Option B: If git authentication fails
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic) with `repo` access
3. Use token as password when prompted

---

## Step 2: Run Supabase Migration

1. Go to: https://supabase.com/dashboard/project/cbnqsuzsvkjfieplmahn/sql
2. Click "SQL Editor" → "New Query"
3. Copy entire content from: `supabase/migrations/20250113_init.sql`
4. Paste and click "Run"

**This creates:**
- `profiles` table (user data + reputation)
- `debates` table (debate topics)
- `arguments` table (user arguments)
- `judgments` table (AI judgments)
- All RLS policies (security)
- Triggers for reputation updates

---

## Step 3: Deploy to Vercel

### Via Vercel Dashboard:
1. Go to: https://vercel.com/new
2. Import `nickloveinvesting/Philosophy-app`
3. **Add environment variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://cbnqsuzsvkjfieplmahn.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNibnFzdXpzdmtqZmllcGxtYWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNjA2ODMsImV4cCI6MjA3ODYzNjY4M30.0y1hj1O4OK4i6eAGYaevBlkECXYFjWZ7_btWVJ5SCgo
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNibnFzdXpzdmtqZmllcGxtYWhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzA2MDY4MywiZXhwIjoyMDc4NjM2NjgzfQ.koB_kmo38yZ0EUCfXlE_vE2gscylhhrdQa-JlRN04Rc
   GEMINI_API_KEY=AIzaSyBMCub1EFO-Vz8uGXfhEEEc7GUhqkRFacw
   ```
4. Click "Deploy"

### Via Vercel CLI (if authenticated):
```bash
cd /Users/nickfijimorris/philoduel-app
vercel --prod
```

---

## Step 4: Test Your App!

Once deployed:

1. **Visit your Vercel URL**
2. **Sign up** for an account
3. **Create a debate** (e.g., "Free will is an illusion")
4. **Join the debate** (argue FOR or AGAINST)
5. **Submit your argument**
6. **Watch Gemini AI judge!** 🤖

---

## Features Included ✅

- ✅ Beautiful landing page
- ✅ User authentication (Supabase)
- ✅ Create & join debates
- ✅ Submit philosophical arguments
- ✅ AI judging (Gemini 2.5 Flash)
- ✅ Fact-checking
- ✅ Reputation system
- ✅ Real-time updates
- ✅ Responsive design

---

## File Structure

```
app/
├── api/judge/              # AI judgment endpoint
├── auth/                   # Login/Signup pages
├── debates/                # Debate list, create, detail
│   ├── [id]/
│   │   ├── page.tsx       # Debate detail page
│   │   └── DebateActions.tsx
│   ├── create/page.tsx    # Create debate
│   └── page.tsx           # Debates list
├── globals.css
├── layout.tsx
└── page.tsx                # Landing page

lib/
├── supabase/
│   ├── client.ts           # Browser Supabase client
│   └── server.ts           # Server Supabase client
├── gemini.ts               # AI judging logic
└── database.types.ts       # TypeScript types

supabase/
└── migrations/
    └── 20250113_init.sql   # Database schema
```

---

## Troubleshooting

### Build Fails on Vercel
- Check that all environment variables are set correctly
- Ensure Supabase migration was run

### Database Errors
- Verify migration was executed in Supabase dashboard
- Check RLS policies are enabled

### AI Judging Not Working
- Verify `GEMINI_API_KEY` is set in Vercel
- Check Gemini API quota at https://aistudio.google.com/

### Can't Log In
- Check Supabase Auth is enabled
- Verify profile creation trigger is working

---

## Next Steps (After MVP)

- Add user profiles page
- Implement commenting on debates
- Add debate categories/tags
- Build leaderboard
- Add email notifications
- Mobile app (React Native)
- Add debate history
- Implement debate rounds (multiple exchanges)

---

## Need Help?

- **Supabase Dashboard**: https://supabase.com/dashboard/project/cbnqsuzsvkjfieplmahn
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/nickloveinvesting/Philosophy-app

---

**Built with Claude Code** 🤖
