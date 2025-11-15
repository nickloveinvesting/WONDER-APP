# Philosophy App - Complete Pages Inventory

**Last Updated:** 2025-11-14  
**Branch:** claude/audit-current-app-state-01GrHRHykMed2XnMqTu4ucwX  
**Total Pages:** 11  
**Total API Routes:** 2

---

## Public Pages (Unauthenticated)

### 1. Landing Page (Home)
- **Route Path:** `/`
- **File:** `/app/page.tsx`
- **Component Type:** Server Component
- **Purpose:** Main landing page for unauthenticated users with hero section and feature overview
- **Current Features:**
  - Hero section with "Where Philosophy Comes Alive" tagline
  - Feature cards: Fair AI Judgment, Build Reputation, Real Community
  - CTA button "Start Your First Duel"
  - Auto-redirect to `/debates` if user is authenticated
- **Key Functionality:**
  - Displays PhiloDuel branding prominently
  - References Gemini AI judging
  - Mentions "500+ philosophers in arena of ideas"
- **Dependencies:**
  - Database: None directly
  - Components: Logo, Navigation
  - External: Supabase auth check
- **Current Branding:**
  - "PhiloDuel" name throughout
  - "Duel" terminology
  - "Arena of ideas" language
  - Debate-centric messaging
- **Database Tables Used:** None (view only)

---

### 2. About Page
- **Route Path:** `/about`
- **File:** `/app/about/page.tsx`
- **Component Type:** Server Component
- **Purpose:** Informational page about the platform mission and how it works
- **Current Features:**
  - Mission statement section
  - "How It Works" explanation
  - "Join the Community" CTA
  - Get Started link to signup
- **Key Functionality:**
  - Static content about platform purpose
  - Explains AI-judged debates model
  - Encourages community participation
- **Dependencies:**
  - Database: None
  - Components: Navigation
  - External: None
- **Current Branding:**
  - "PhiloDuel" name
  - AI judgment focus
  - Debate terminology throughout
  - "Philosophers" terminology
- **Database Tables Used:** None (view only)

---

### 3. Login Page
- **Route Path:** `/auth/login`
- **File:** `/app/auth/login/page.tsx`
- **Component Type:** Server Component (wrapper)
- **Purpose:** Authentication page for existing users
- **Current Features:**
  - Email and password authentication form
  - Form submission with loading state
  - Error handling and display
  - Link to signup page
  - Server-side auth check (prevents flicker)
- **Key Functionality:**
  - Uses Supabase authentication
  - Server Actions for form submission (signIn)
  - Progressive enhancement (works without JS)
  - Redirects authenticated users to `/debates`
- **Dependencies:**
  - Database: Supabase Auth
  - Components: LoginForm (client component)
  - External: Supabase client
- **Current Branding:**
  - "PhiloDuel" text
  - "Welcome back, philosopher" message
- **Database Tables Used:** auth.users

---

### 4. Signup Page
- **Route Path:** `/auth/signup`
- **File:** `/app/auth/signup/page.tsx`
- **Component Type:** Client Component
- **Purpose:** Registration page for new users
- **Current Features:**
  - Username field (3-30 chars)
  - Display name field (optional)
  - Email field
  - Password field (minimum 6 chars)
  - Form validation
  - Automatic profile creation trigger
  - Redirects to `/debates` on success
- **Key Functionality:**
  - Creates user in Supabase Auth
  - Stores username in metadata
  - Triggers profile creation via database trigger
  - Validates username length
  - Handles email confirmation flow
- **Dependencies:**
  - Database: Supabase Auth, profiles table
  - Components: None (direct form)
  - External: Supabase client
- **Current Branding:**
  - "PhiloDuel" name
  - "Arena of ideas" slogan
  - Philosopher-themed placeholders ("socrates", "The Philosopher")
- **Database Tables Used:** auth.users (via signup), profiles (via trigger)

---

### 5. Debug Page
- **Route Path:** `/debug`
- **File:** `/app/debug/page.tsx`
- **Component Type:** Client Component
- **Purpose:** Development utility page for checking environment variables
- **Current Features:**
  - Displays NEXT_PUBLIC_SUPABASE_URL
  - Shows masked NEXT_PUBLIC_SUPABASE_ANON_KEY
  - Lists all NEXT_PUBLIC environment variables
  - No authentication required
- **Key Functionality:**
  - Troubleshooting tool for environment setup
  - Helps verify Supabase configuration
- **Dependencies:**
  - Database: None
  - Components: None
  - External: None
- **Current Branding:** None
- **Database Tables Used:** None
- **Note:** Should be removed before production or protected

---

## Authenticated Pages (Requires Login)

### 6. Debates Listing Page
- **Route Path:** `/debates` (inside authenticated layout)
- **File:** `/app/(authenticated)/debates/page.tsx`
- **Component Type:** Server Component
- **Purpose:** Browse and discover active debates
- **Current Features:**
  - Displays list of most recent debates (up to 20)
  - Shows debate topic, description, status
  - Participant count and argument count
  - Status badges (open, in_progress, completed)
  - Link to create new debate
  - Empty state with CTA to create first debate
- **Key Functionality:**
  - Fetches debates ordered by creation date (newest first)
  - Uses dynamic rendering (force-dynamic, revalidate=0)
  - Color-coded status badges
  - Links to individual debate pages
  - Enforces authentication via layout
- **Dependencies:**
  - Database: debates table
  - Components: Button, Navigation
  - External: Supabase server client
- **Current Branding:**
  - "Active Debates" heading
  - "DeLO rating" reference
  - "Debate" terminology
- **Database Tables Used:** debates
- **Auth Required:** Yes (authenticated layout)

---

### 7. Create Debate Page
- **Route Path:** `/debates/create` (inside authenticated layout)
- **File:** `/app/(authenticated)/debates/create/page.tsx`
- **Component Type:** Client Component
- **Purpose:** Form page for users to create new debates
- **Current Features:**
  - Debate topic input (required, text)
  - Description textarea (optional)
  - "How it works" instruction box
  - Submit button with loading state
  - Cancel button
  - Back link to debates list
- **Key Functionality:**
  - Validates topic input
  - Inserts debate record with 'open' status
  - Sets current user as debate creator
  - Redirects to debate detail page on success
  - Error handling and display
- **Dependencies:**
  - Database: debates table
  - Components: Button, Link
  - External: Supabase client, useRouter
- **Current Branding:**
  - Debate creation flow
  - "Gemini AI judges" messaging
  - Reputation points terminology
- **Database Tables Used:** debates (insert), profiles (via getUser)
- **Auth Required:** Yes (authenticated layout)

---

### 8. Debate Detail Page (Dynamic)
- **Route Path:** `/debates/[id]` (inside authenticated layout)
- **File:** `/app/(authenticated)/debates/[id]/page.tsx`
- **Component Type:** Server Component with Client Component
- **Purpose:** View single debate, submit arguments, see judgment
- **Current Features:**
  - Debate topic and description display
  - Status badge (open, in_progress, completed)
  - Two sections: "ARGUING FOR" and "ARGUING AGAINST"
  - Participant info with reputation scores
  - "Join debate" buttons (if applicable)
  - Argument submission form (if eligible)
  - Arguments list with positions
  - AI judgment display (if completed):
    - Winner announcement
    - Reasoning from Gemini
    - Scores for logic, evidence, rhetoric
    - Fact-check results with verdicts
- **Key Functionality:**
  - Fetches debate with related user data
  - Fetches all arguments for debate
  - Fetches judgment if exists
  - Allows users to join as 'for' or 'against'
  - Allows users to submit arguments
  - Triggers AI judgment when both arguments submitted
  - Uses DebateActions component for interactions
- **Dependencies:**
  - Database: debates, arguments, judgments, profiles tables
  - Components: DebateActions (client component), Button, Link
  - External: Supabase server client
- **Current Branding:**
  - Debate terminology
  - "FOR"/"AGAINST" positions
  - "Philosopher" references
  - AI judgment display
- **Database Tables Used:** debates, arguments, judgments, profiles
- **Auth Required:** Yes (authenticated layout)

---

### 9. Leaderboard Page
- **Route Path:** `/leaderboard` (inside authenticated layout)
- **File:** `/app/(authenticated)/leaderboard/page.tsx`
- **Component Type:** Server Component
- **Purpose:** Display top 100 philosophers ranked by DeLO rating
- **Current Features:**
  - Ranked table of philosophers
  - Desktop table view with sticky header
  - Mobile card view
  - Stats summary cards (total philosophers, highest DeLO, best win rate)
  - Rank icons (🥇 🥈 🥉 or #ranking)
  - Color-coded ranks (top 3 highlighted)
  - Columns: Rank, Username, DeLO Rating, Reputation, Debates, Wins, Win Rate
  - Current user highlight ("You" badge)
  - Win rate progress bar visualization
  - DeLO rating system explanation
- **Key Functionality:**
  - Fetches leaderboard data via RPC (with fallback)
  - Orders by DeLO rating descending
  - Calculates win rate percentages
  - Identifies current user
  - Caches for 60 seconds
- **Dependencies:**
  - Database: profiles table (RPC: get_leaderboard or fallback query)
  - Components: Trophy, Medal, Award icons (Lucide)
  - External: Supabase server client
- **Current Branding:**
  - "Philosopher Leaderboard"
  - DeLO rating system
  - "Chess Elo" comparison
  - Reputation score
  - Debate-centric metrics
- **Database Tables Used:** profiles
- **Auth Required:** Yes (authenticated layout)

---

### 10. Profile Page
- **Route Path:** `/profile` (inside authenticated layout)
- **File:** `/app/(authenticated)/profile/page.tsx`
- **Component Type:** Server Component
- **Purpose:** Display user's personal statistics and account information
- **Current Features:**
  - Username display
  - DeLO rating with icon
  - Reputation score with icon
  - Debates count with icon
  - Statistics section:
    - Debates participated
    - Debates won
    - Win rate percentage
  - Account info section:
    - Email
    - Member since date
    - Account status (Active)
- **Key Functionality:**
  - Fetches current user profile data
  - Displays all profile statistics
  - Shows account details
  - Read-only view (no editing)
- **Dependencies:**
  - Database: profiles table, auth.users
  - Components: Award, Trophy, TrendingUp icons (Lucide)
  - External: Supabase server client
- **Current Branding:**
  - "Your Profile" heading
  - Philosopher identity language
  - Debate achievement metrics
  - DeLO rating
- **Database Tables Used:** profiles, auth.users
- **Auth Required:** Yes (authenticated layout)

---

### 11. Settings Page
- **Route Path:** `/settings` (inside authenticated layout)
- **File:** `/app/(authenticated)/settings/page.tsx`
- **Component Type:** Server Component
- **Purpose:** Manage account preferences and account management
- **Current Features:**
  - Account Settings section:
    - Email display (read-only, disabled)
  - Notifications section with checkboxes:
    - Debate Responses
    - Rating Changes
    - Achievements Unlocked
  - Privacy section with checkboxes:
    - Show Profile on Leaderboard
    - Allow Comments on My Arguments
  - Danger Zone section:
    - Sign Out button
- **Key Functionality:**
  - Displays current user email
  - Checkbox options (not yet functional - no backend save)
  - Sign out action (uses signOut server action)
  - Dynamic rendering (force-dynamic)
- **Dependencies:**
  - Database: auth.users
  - Components: Button
  - External: Supabase server client, signOut action
- **Current Branding:**
  - "Account preferences" language
  - Notification options for debates
  - Privacy controls
- **Database Tables Used:** auth.users
- **Auth Required:** Yes (authenticated layout)
- **Note:** Notification and privacy checkboxes are UI only - not connected to backend

---

## API Routes

### 12. Judge Debate Endpoint
- **Route Path:** `/api/judge`
- **HTTP Method:** POST
- **File:** `/app/api/judge/route.ts`
- **Purpose:** Trigger AI judgment for completed debates
- **Request Body:**
  ```json
  {
    "debateId": "string (UUID)",
    "topic": "string",
    "argumentFor": "string",
    "argumentAgainst": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "judgment": {
      "winner": "for" | "against" | "tie",
      "reasoning": "string",
      "factChecks": [...],
      "scores": {...}
    }
  }
  ```
- **Key Functionality:**
  - Authenticates user
  - Calls Gemini AI via lib/gemini
  - Inserts judgment record
  - Updates debate status to 'completed'
  - Sets winner_id on debate
  - Returns judgment data
- **Dependencies:**
  - Database: debates, judgments tables
  - External: Gemini AI, Supabase
- **Auth Required:** Yes (checks Supabase user)
- **Error Handling:** Returns appropriate HTTP status codes (401, 400, 404, 500)

---

### 13. Logout Endpoint
- **Route Path:** `/auth/logout`
- **HTTP Method:** POST
- **File:** `/app/auth/logout/route.ts`
- **Purpose:** Sign out user and redirect home
- **Request Body:** None
- **Response:** 302 redirect to `/`
- **Key Functionality:**
  - Signs out user from Supabase
  - Redirects to home page
- **Dependencies:**
  - External: Supabase
- **Auth Required:** No (endpoint handles signout)
- **Error Handling:** None (always succeeds)

---

## Layout Components

### Root Layout
- **File:** `/app/layout.tsx`
- **Purpose:** Global layout wrapper
- **Features:**
  - Sets metadata (title, description, OG tags)
  - Loads Plus Jakarta Sans font
  - Renders Navigation component
  - Renders children
- **Branding:** "PhiloDuel" in metadata

### Authenticated Layout
- **File:** `/app/(authenticated)/layout.tsx`
- **Purpose:** Protected layout for authenticated pages
- **Features:**
  - Server-side auth check (redirects to login if not authenticated)
  - Fetches user profile data
  - Renders Header with user info
  - Applies "argued-cream" background color
- **Dependencies:** Supabase Auth, profiles table, Header component

---

## Summary Statistics

**Total Pages by Type:**
- Public Pages: 5 (/,  /about, /auth/login, /auth/signup, /debug)
- Authenticated Pages: 6 (/debates, /debates/create, /debates/[id], /leaderboard, /profile, /settings)
- API Routes: 2 (/api/judge, /auth/logout)

**Authentication Status:**
- Public: 5 pages
- Authenticated: 6 pages
- API: 2 routes (1 authenticated, 1 public)

**Technology Stack:**
- Framework: Next.js 14+ with App Router
- Authentication: Supabase Auth
- Database: Supabase PostgreSQL
- AI: Gemini API for debate judgment
- Styling: Tailwind CSS + custom colors
- Icons: Lucide React

**Current Branding:**
- Platform Name: "PhiloDuel"
- Core Concept: AI-judged philosophical debates
- User Type: "Philosophers"
- Metrics: DeLO Rating (Debate Elo), Reputation Score
- Terminology: Debates, Arguments, Participants, Judgment

