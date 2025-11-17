# Philosophy App - Route Structure Map

**Last Updated:** 2025-11-14  
**Current Branch:** claude/audit-current-app-state-01GrHRHykMed2XnMqTu4ucwX

---

## URL Navigation Hierarchy

```
ROOT (/)
│
├── PUBLIC ROUTES (No Authentication Required)
│   │
│   ├── / (Home Landing Page)
│   │   └── Purpose: Hero section, feature overview, CTA to signup
│   │   └── Redirects to /debates if authenticated
│   │
│   ├── /about (About Page)
│   │   └── Purpose: Mission, how it works, community CTA
│   │
│   ├── /auth (Authentication Routes)
│   │   ├── /auth/login (Login Page)
│   │   │   └── Purpose: Email/password authentication
│   │   │   └── Redirects to /debates if authenticated
│   │   │
│   │   └── /auth/signup (Signup Page)
│   │       └── Purpose: New user registration
│   │       └── Creates profile via database trigger
│   │       └── Redirects to /debates on success
│   │
│   └── /debug (Debug Page)
│       └── Purpose: Environment variable troubleshooting
│       └── Shows Supabase configuration
│       └── SHOULD BE REMOVED BEFORE PRODUCTION
│
└── AUTHENTICATED ROUTES (Requires Login)
    └── (authenticated) Layout - Enforces authentication
    │
    ├── /debates (Debates List)
    │   ├── Purpose: Browse all debates
    │   ├── Default page after login
    │   ├── Shows most recent 20 debates
    │   └── Has link to create new debate
    │
    ├── /debates/create (Create Debate Form)
    │   └── Purpose: Create new debate
    │   └── Topic + optional description
    │   └── Redirects to /debates/[id] on success
    │
    ├── /debates/[id] (Debate Detail)
    │   ├── Purpose: View single debate and participate
    │   ├── Dynamic route based on debate ID
    │   ├── Shows participants, arguments, judgment
    │   └── Allows joining and submitting arguments
    │
    ├── /leaderboard (Philosopher Leaderboard)
    │   └── Purpose: View top 100 philosophers by DeLO rating
    │   └── Shows desktop table and mobile cards
    │   └── Highlights current user
    │
    ├── /profile (User Profile)
    │   └── Purpose: View personal statistics
    │   └── Shows DeLO rating, reputation, debate stats
    │   └── Displays account info (email, member since)
    │
    └── /settings (Account Settings)
        ├── Purpose: Manage account preferences
        ├── Email display (read-only)
        ├── Notification preferences (UI only, not functional)
        ├── Privacy settings (UI only, not functional)
        └── Sign out button

```

---

## Database-Level Route Dependencies

### Routes Using Specific Database Tables

#### profiles Table
- `/auth/signup` - Creates profile via trigger
- `/auth/login` - Reads for authentication
- `/(authenticated)/profile` - Full read
- `/(authenticated)/leaderboard` - Read for ranking
- `/(authenticated)/debates` - Reads for usernames
- `/(authenticated)/debates/[id]` - Reads for participant info
- `/(authenticated)/settings` - Reads for user info

#### debates Table
- `/(authenticated)/debates` - List view
- `/(authenticated)/debates/create` - Insert
- `/(authenticated)/debates/[id]` - Read, update
- `/api/judge` - Update status and winner

#### arguments Table
- `/(authenticated)/debates/[id]` - Read, insert via DebateActions
- `/api/judge` - Read (fetches both arguments before judging)

#### judgments Table
- `/(authenticated)/debates/[id]` - Read and display
- `/api/judge` - Insert judgment result

#### auth.users Table
- `/auth/login` - Authentication
- `/auth/signup` - Registration
- `/(authenticated)/layout` - Auth check
- `/(authenticated)/settings` - Current user info
- `/(authenticated)/profile` - Current user email

---

## API Route Map

```
/api/
│
├── /api/judge (POST)
│   ├── Purpose: Trigger AI judgment on debate
│   ├── Requires: Authentication
│   ├── Input: debateId, topic, argumentFor, argumentAgainst
│   ├── Calls: Gemini API (lib/gemini)
│   ├── Updates: debates, judgments tables
│   └── Returns: Judgment with scores and reasoning
│
└── /auth/logout (POST)
    ├── Purpose: Sign out user
    ├── Requires: None (handles signout internally)
    ├── Behavior: Signs out, redirects to /
    └── Returns: 302 redirect

```

---

## User Journey Flows

### New User Flow
```
/ (Landing)
  ↓
/auth/signup (Register)
  ↓
[Database trigger creates profile]
  ↓
/debates (Auto-redirect, shows empty state)
  ↓
/debates/create (Create first debate)
  ↓
/debates/[id] (Debate detail view)
```

### Existing User Flow
```
/ (Landing)
  ↓
[Redirect check - already authenticated]
  ↓
/debates (Redirects here automatically)
  ↓
[Browse existing debates or create new]
  ↓
/debates/[id] (Join debate or view)
  ↓
/leaderboard (Check rank)
  ↓
/profile (View personal stats)
```

### Debate Participation Flow
```
/debates (List page)
  ↓
/debates/[id] (Open debate - user sees "Join" buttons)
  ↓
[User clicks "Argue FOR" or "Argue AGAINST"]
  ↓
[Debate status changes to 'in_progress']
  ↓
[User sees argument submission form]
  ↓
[User submits argument]
  ↓
[Both arguments submitted]
  ↓
/api/judge (Auto-triggers when both arguments exist)
  ↓
[Judgment displayed on debate detail page]
  ↓
/leaderboard (User's rating updated)
```

---

## Authentication & Protected Routes

### Public Routes (Accessible without login)
- `/` - Home
- `/about` - About
- `/auth/login` - Login
- `/auth/signup` - Signup
- `/debug` - Debug (dev only)

### Protected Routes (Redirects to /auth/login if not authenticated)
- `/debates` - List
- `/debates/create` - Create
- `/debates/[id]` - Detail
- `/leaderboard` - Rankings
- `/profile` - Profile
- `/settings` - Settings

### Auto-Redirects
- `/` → `/debates` if user is logged in
- `/auth/login` → `/debates` if user is logged in
- `/auth/signup` → `/debates` if user is logged in
- Any `/(authenticated)/*` → `/auth/login` if not logged in

---

## URL Parameter Handling

### Dynamic Route Parameters

#### Debate Detail Route: `/debates/[id]`
- **Parameter:** `id` (UUID string)
- **Required:** Yes
- **Source:** Database debates.id
- **Behavior:** Shows 404/redirect if debate not found
- **Used For:** Fetching specific debate, arguments, and judgment

---

## Middleware & Route Guards

### Root Layout Middleware
- No explicit middleware file
- Uses Supabase auth check in component render

### Authenticated Layout Guards
```typescript
- Server-side auth check via createClient()
- Redirects to /auth/login if !user
- Fetches user profile for header display
```

### Login Page Guard
```typescript
- Server-side auth check
- Redirects to /debates if user already authenticated
- Prevents flicker (server-side vs client-side)
```

### Signup Page Guard
```typescript
- After signup success, redirects to /debates
- Uses window.location.href for hard navigation
```

---

## Navigation Component Relationships

### Navigation Component (Global)
- Used in: Root layout
- Appears on: All pages
- Links to:
  - Logo (links to /)
  - Auth pages (before login)
  - Authenticated pages (after login)

### Header Component (Authenticated)
- Used in: Authenticated layout
- Appears on: All protected pages
- Shows:
  - User info (username, reputation)
  - Sign out link

### Sidebar Component
- File location: `/components/Sidebar.tsx`
- Note: Not currently used in main layout
- Potential for future navigation

---

## Cache & Revalidation Strategy

### Dynamic Pages (No Cache)
- `/debates/create` - `force-dynamic: true`
- `/debates/[id]` - Server component, real-time data
- `/settings` - `force-dynamic: true`
- `/profile` - `force-dynamic: true`

### Cached Pages
- `/leaderboard` - `revalidate: 60` (60-second cache)
- `/debates` - `revalidate: 0` with `force-dynamic: true`

### Static Pages (Pre-built)
- `/` - No explicit caching
- `/about` - No explicit caching
- `/auth/login` - Server component
- `/auth/signup` - Client component

---

## Request Flow Summary

### New Debate Creation
```
User on /debates/create
  ↓
Fills form (topic, description)
  ↓
Submit → POST to Supabase (client-side)
  ↓
Debate inserted with status='open'
  ↓
Router.push() to /debates/[id]
```

### Debate Participation
```
User on /debates/[id]
  ↓
Clicks "Argue FOR" or "Argue AGAINST"
  ↓
DebateActions component handles update
  ↓
Supabase updates: for_participant or against_participant
  ↓
Status changes to 'in_progress'
  ↓
Router.refresh() updates UI
```

### Argument Submission & Judgment
```
User submits argument via DebateActions
  ↓
Supabase inserts into arguments table
  ↓
Check if both arguments exist
  ↓
If yes: Fetch /api/judge endpoint
  ↓
/api/judge calls Gemini AI
  ↓
Inserts judgment and updates debate
  ↓
Router.refresh() shows judgment
```

---

## Route Metadata

### Page Titles & Meta Tags

#### Root Layout
- Title: "PhiloDuel - Where Philosophy Comes Alive"
- Description: "Engage in fair, AI-judged philosophical debates..."
- OG Image: /logo-black.png

#### Landing Page
- Same as root layout
- No custom metadata override

#### Other Pages
- Inherit from root layout
- No custom per-page metadata

---

## Missing/Future Routes

Based on current functionality analysis:

### Currently Missing Routes
- User search/directory - Not implemented
- Debate search/filtering - Not implemented
- User profile editing - No edit page
- Notification center - No page
- Admin dashboard - No admin routes
- User following/messaging - Not implemented
- Debate categories/topics - Not filtered
- FAQ/Help - Not implemented
- Terms/Privacy pages - Not implemented

### Routes to Consider Adding
- `/search` or `/debates?search=...` - Debate search
- `/users/[username]` - Public user profiles
- `/profile/edit` - Profile editing
- `/notifications` - Notification center
- `/admin` - Admin dashboard
- `/terms`, `/privacy` - Legal pages
- `/help`, `/faq` - Support pages
- `/debates/[id]/comments` - Argument discussion

