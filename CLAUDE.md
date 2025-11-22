# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WONDER is a philosophical conversation platform where curious minds explore ideas together—from casual questions to deep debates. Built with Next.js 15 (App Router), Supabase, and Google Gemini AI.

## Development Commands

### Essential Commands
```bash
npm install           # Install dependencies
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Management
Migrations are located in `supabase/migrations/`. To apply migrations:
1. Go to Supabase dashboard → SQL Editor
2. Copy migration file content
3. Execute the query

## Environment Variables

Create `.env.local` with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO=nickloveinvesting/Philosophy-app
```

**GitHub Token Setup** (for feedback feature):
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "WONDER Feedback Integration")
4. Select the `repo` scope (required for creating issues)
5. Generate the token and copy it to your `.env.local` file

## Architecture

### Authentication Flow
- Middleware (`middleware.ts`) handles session refresh for all routes except `/api`, `/_next/*`, and `/favicon.ico`
- Protected routes use `(authenticated)` route group with layout-level auth checks
- Client-side auth: `lib/supabase/client.ts` (singleton pattern with auto-refresh)
- Server-side auth: `lib/supabase/server.ts` (uses SSR package with cookies)
- Unauthenticated users redirected to `/auth/login` from protected routes

### Route Structure
```
app/
├── (authenticated)/      # Protected routes (requires auth)
│   ├── debates/         # Debate listing, creation, detail pages
│   ├── discuss/         # Discussion/argument submission
│   ├── leaderboard/     # User rankings
│   ├── profile/         # User profiles
│   └── settings/        # User settings
├── auth/                # Login/signup pages
├── api/
│   └── judge/          # AI judgment endpoint (POST)
└── page.tsx            # Public landing page
```

### Database Schema
Core tables (see `lib/database.types.ts` for full TypeScript types):
- **profiles**: User profiles with reputation_score, debates_won, debates_participated
- **debates**: Topics with status ('open' | 'in_progress' | 'completed')
- **arguments**: Individual arguments linked to debates with position ('for' | 'against')
- **judgments**: AI-generated judgments with scores (logic, evidence, rhetoric) and fact checks

Row Level Security (RLS) is enabled on all tables. Profiles, debates, arguments, and judgments are viewable by everyone. Users can only create/update their own content.

### AI Integration
Gemini AI (`lib/gemini.ts`) judges debates based on:
1. **Logic**: Soundness of reasoning (0-10)
2. **Evidence**: Quality and relevance of support (0-10)
3. **Rhetoric**: Clarity and persuasiveness (0-10)

The `judgeDebate()` function returns structured JSON with winner determination, detailed reasoning, fact checks, and scores. Currently uses `gemini-2.0-flash-exp` model.

### Feedback Feature
The in-app feedback system allows authenticated users to submit feature requests and bug reports directly to GitHub.

**Components**:
- `components/FeedbackModal.tsx`: Modal form for submitting feedback
- `app/api/feedback/route.ts`: API endpoint that creates GitHub issues

**How it works**:
1. User clicks "Feedback" button in header (visible only when authenticated)
2. Modal opens with options for "Feature Request" or "Bug Report"
3. User fills in title and description
4. Submission creates a GitHub issue with labels (`enhancement` or `bug`) and `user-feedback`
5. Issue includes user attribution (username, user ID) and timestamp

**Setup Requirements**:
- GitHub personal access token with `repo` scope (see Environment Variables section)
- Issues are created in the repository specified by `GITHUB_REPO` env variable

### Server Actions
Server actions in `lib/actions/` use `'use server'` directive. Key actions:
- `signOut()`: Signs out user and redirects to home page
- `sendWelcomeEmailToUser()`: Sends welcome email to authenticated user
- `updateEmailPreferences()`: Updates user's email subscription preferences
- `getEmailPreferences()`: Retrieves user's email preferences

### Welcome Email System
The platform includes a 3-email welcome series for new users:

**Email Flow:**
1. **Email 1** (Immediate): Welcome & Philosophy - sent on signup
2. **Email 2** (Day 3): How WONDER Works - scheduled via database trigger
3. **Email 3** (Day 7): Feedback Loop - scheduled via database trigger

**Key Files:**
- `email_templates/welcome_series/`: HTML email templates
- `lib/email/index.ts`: Resend integration and email sending logic
- `lib/actions/email.ts`: Server actions for email operations
- `app/api/email/`: API routes for email operations
- `supabase/migrations/20250121_email_preferences.sql`: Database schema

**Email Database Tables:**
- `email_preferences`: User email subscription preferences
- `email_logs`: Audit log of all sent emails
- `scheduled_emails`: Queue for scheduled email delivery

**Environment Variables Required:**
```env
RESEND_API_KEY=re_your_api_key
EMAIL_FROM=WONDER <noreply@yourdomain.com>
EMAIL_REPLY_TO=nick@yourdomain.com
EMAIL_API_KEY=your_secure_api_key
CRON_SECRET=your_cron_secret
```

See `docs/WELCOME_EMAIL_SYSTEM.md` for complete documentation.

### Design System
**IMPORTANT**: Follow the design system in `DESIGN_SYSTEM.md` for all UI work:

**Colors**:
- **Teal** (primary): Actions, CTAs, accents (teal-500/600)
- **Slate** (neutral): Text, borders (slate-900 for headlines, slate-600 for body)
- **White/Stone**: Backgrounds with subtle gradients

**Typography**:
- Font: Plus Jakarta Sans
- Headlines: `font-black` (900 weight) with `tracking-tight`
- Body: `font-medium` (500 weight) with `leading-relaxed`
- Hierarchy: Hero (5xl-7xl), Section (4xl-5xl), Card title (xl-2xl)

**Components**:
- Primary CTA: `px-10 py-4 bg-teal-500 text-white font-black rounded-xl hover:bg-teal-600 shadow-xl hover:shadow-2xl transform hover:-translate-y-1`
- Cards: White background, rounded-xl, shadow-xl, border-slate-200, hover lift effect
- Navigation: Compact (py-1.5), white/80 with backdrop-blur-lg

**What NOT to do**:
- Don't use indigo or coral colors (old design)
- Don't use oversized navigation (h-16)
- Don't skip hover states or transitions

### Key Components
- `components/Navigation.tsx`: Main navigation with auth-aware menu
- `components/Sidebar.tsx`: Side navigation for authenticated users
- `components/Logo.tsx`: Brand logo component
- `components/ui/Header.tsx`: Header component used in authenticated layout (includes feedback button)
- `components/FeedbackModal.tsx`: In-app feedback submission modal
- `components/DiscussionPreviewCard.tsx`: Preview card for debate discussions
- `components/templates/`: Reusable page templates
- `components/ui/`: UI primitives and shared components

## Working with Debates

### Debate Lifecycle
1. User creates debate (status: 'open')
2. Another user joins as FOR or AGAINST (status: 'in_progress')
3. Both users submit arguments (one round each)
4. AI judges the debate via `/api/judge` POST endpoint
5. Winner determined, reputation updated (status: 'completed')

### Judging Flow
The `/api/judge` route:
1. Validates authentication
2. Calls `judgeDebate()` with topic and both arguments
3. Saves judgment to database
4. Updates debate status to 'completed' with winner_id
5. Returns judgment with scores and fact checks

## Type Safety

TypeScript types are generated from Supabase schema in `lib/database.types.ts`. When schema changes:
1. Update migration in `supabase/migrations/`
2. Regenerate types (manual copy from Supabase dashboard → API Docs → TypeScript)
3. Update `Database` interface

## Common Patterns

### Fetching User Data
```typescript
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

const { data: profile } = await supabase
  .from('profiles')
  .select('username, reputation_score')
  .eq('id', user.id)
  .single();
```

### Protected API Routes
```typescript
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### Client-Side Supabase
```typescript
import { createClient } from '@/lib/supabase/client';

// Singleton - safe to call multiple times
const supabase = createClient();
```

## Documentation Files

- `DESIGN_SYSTEM.md`: Complete design system and component patterns
- `README.md`: Project overview and setup instructions
- `DEPLOYMENT.md`: Deployment instructions for Vercel
- `MIGRATION_GUIDE.md`: Database migration guidance
- `PHASE_1_COMPLETE.md`: Phase 1 implementation notes
- `BRANDING_COMPLETE.md`: Branding update documentation
- `ARGUED_ENGAGEMENT_ANALYSIS.md`: Engagement feature analysis
- `docs/WELCOME_EMAIL_SYSTEM.md`: Welcome email series documentation
- `research/`: Research documents for various features

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **AI**: Google Gemini 2.0 Flash Exp
- **Email**: Resend (transactional emails, welcome series)
- **Deployment**: Vercel (with Cron jobs)

## Project Naming

- Brand name: "WONDER"
- Tagline: "WONDER Together"
- Vision: Conversation-first philosophical platform (see `research/FINAL_SYNTHESIS/` for details)

---

## Development Changelog

### November 21, 2025 - Fake Users, Content Population & Caching Fixes

#### Context
This session continued from a previous conversation where 10 fake users were created for the WONDER platform to populate it with realistic content for testing and demonstration purposes.

#### Previous Session Summary
- **10 fake users created** with diverse philosophical perspectives:
  - Dr. Sarah Chen (Cognitive Scientist)
  - Marcus Rodriguez (Ethics Researcher)
  - Prof. James Wright (Metaphysics)
  - Aisha Patel (Tech Philosopher)
  - David Kim (Existentialist)
  - Elena Vasquez (Political Philosopher)
  - Thomas Anderson (Skeptic)
  - Dr. Maya Johnson (Philosophy of Mind)
  - Robert Chen (Pragmatist)
  - Sophie Martin (Continental Philosophy)

- **Fake user data stored in**: `/fake_users/` directory
  - `users.json`: User profiles with credentials
  - `comments.json`: Pre-written philosophical arguments
  - `README.md`: Documentation

#### Issues Identified & Fixed

**Issue 1: Navigation Header Showing "Sign In" When Logged In**
- **Problem**: When authenticated, the header displayed "Sign In / Join Free" buttons instead of the user's profile (username + influence score)
- **Root Cause**: `unstable_cache` in authenticated layout (`app/(authenticated)/layout.tsx`) was returning stale/null profile data
- **Solution**: Removed `unstable_cache` wrapper and added `export const dynamic = 'force-dynamic'` to ensure fresh profile data on every request
- **Commit**: `a5c6846`

**Issue 2: Debates Page Showing "No Conversations Yet"**
- **Problem**: Despite 42 debates existing in the database, the debates page showed empty state
- **Root Cause**: `unstable_cache` in `app/(authenticated)/debates/page.tsx` cached an empty result before content was populated
- **Solution**:
  1. First attempt: Changed cache key from `debates-list` to `debates-list-v2` (commit `530b6bd`)
  2. Second attempt: Added `export const dynamic = 'force-dynamic'` (commit `223f35d`)
  3. Final fix: Completely removed `unstable_cache` wrapper, using direct Supabase query (commit `ad5491d`)
- **Commits**: `530b6bd`, `223f35d`, `ad5491d`

#### Key Files Modified

1. **`app/(authenticated)/layout.tsx`**
   - Removed `unstable_cache` import
   - Added `export const dynamic = 'force-dynamic'`
   - Changed `getCachedProfile()` to `getProfile()` (direct query)

2. **`app/(authenticated)/debates/page.tsx`**
   - Removed `unstable_cache` import
   - Added `export const dynamic = 'force-dynamic'` and `export const revalidate = 0`
   - Changed `getCachedDebates()` to `getDebates()` (direct query)

3. **`components/Navigation.tsx`** (previous session)
   - Added `mounted` state to prevent hydration mismatch
   - Improved `isAuthenticatedRoute` detection

#### Database Content Added

- **42 debates** across 4 quadrants:
  - AI & Technology
  - Philosophy
  - Morality & Ethics
  - Economics & Society

- **35+ arguments** from fake users added to debates via Supabase MCP

- **19 profiles** total (including 10 fake users)

#### Verification

Production site verified working at: https://philosophy-app-eight.vercel.app/
- Header correctly shows: "nicklove ✨ 800" with user dropdown
- Navigation shows authenticated items: Home, Posts, Discuss, Journal, Leaderboard
- Debates page displays all 40+ conversations with vote counts

#### Lessons Learned

1. **Next.js `unstable_cache` Caveats**:
   - `unstable_cache` caches based on function arguments but can persist stale data across deployments
   - Even with `export const dynamic = 'force-dynamic'`, `unstable_cache` maintains its own cache layer
   - For frequently-changing data, prefer direct queries or use `revalidatePath`/`revalidateTag`

2. **Vercel Edge Caching**:
   - Changing cache keys alone may not bust Vercel's edge cache
   - `force-dynamic` + removing `unstable_cache` is the most reliable approach for fresh data

3. **Dual Navigation System**:
   - Root layout renders `Navigation.tsx` (public nav)
   - Authenticated layout renders `Header.tsx` (authenticated nav)
   - `Navigation.tsx` must return `null` on authenticated routes to prevent duplicate headers
