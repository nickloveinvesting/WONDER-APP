# PhiloDuel Features Inventory

## Complete Feature List with Implementation Details

---

## 1. AUTHENTICATION & ACCOUNT MANAGEMENT

### 1.1 User Registration (Sign Up)
- **Feature Name**: Create Account
- **Description**: New users can create an account with email, password, username, and optional display name
- **User Journey**:
  1. User clicks "Sign Up" on landing page or navigation
  2. Navigate to `/auth/signup`
  3. Enter email, password, username (3-30 chars), optional display name
  4. Submit form
  5. Account created, auto-logged in, redirected to `/debates`
  
- **Current Implementation**:
  - **Pages**: `/app/auth/signup/page.tsx`
  - **Components**: Sign-up form (inline)
  - **APIs**: Supabase Auth (`supabase.auth.signUp()`)
  - **Database Tables**: 
    - `auth.users` (Supabase managed)
    - `profiles` (custom metadata: username, display_name, bio)
  - **Client-side logic**: Form validation, email/password validation
  - **Server-side logic**: Supabase handles auth, user created in auth.users

- **Vision Alignment**: ⚠️ MODIFY
  - Keep authentication but rename terminology
  - "Username" could be "Scholar Name" or "Philosopher ID"
  - "Sign Up" could be "Join the Conversation"

- **Conversation-First Equivalent**:
  - Same authentication mechanism
  - Invite-based onboarding optional
  - Focus on conversation starter profile questions

- **Associated Terminology**:
  - "Username", "Display Name", "Password", "Sign Up"
  - Change to: "Scholar Name", "Public Profile Name", "Welcome Phrase"

---

### 1.2 User Login
- **Feature Name**: Sign In to Account
- **Description**: Authenticated users log in with email and password
- **User Journey**:
  1. Unauthenticated user clicks "Log In"
  2. Navigate to `/auth/login`
  3. Enter email and password
  4. Click "Log In"
  5. Redirected to `/debates` on success
  
- **Current Implementation**:
  - **Pages**: `/app/auth/login/page.tsx`
  - **Components**: `LoginForm.tsx` (client component)
  - **APIs**: 
    - Server Action: `signIn()` in `/app/auth/actions.ts`
    - Supabase: `supabase.auth.signInWithPassword()`
  - **Database Tables**: `auth.users`
  - **Client-side logic**: Form input handling, error display
  - **Server-side logic**: Server Action validates inputs, calls Supabase Auth, sets cookies, redirects

- **Vision Alignment**: ✅ KEEP
  - Core authentication needed regardless of platform focus

- **Conversation-First Equivalent**:
  - Standard sign-in with optional "Welcome back" prompts

---

### 1.3 User Logout
- **Feature Name**: Sign Out
- **Description**: Users can sign out of their account
- **User Journey**:
  1. Authenticated user clicks "Sign Out" in user menu or settings
  2. Server action logs them out
  3. Redirected to home page `/`
  
- **Current Implementation**:
  - **Pages**: Triggered from `/app/(authenticated)/settings/page.tsx`
  - **Components**: Navigation user menu, Settings page
  - **APIs**: 
    - Server Action: `signOut()` in `/app/auth/actions.ts`
    - Supabase: `supabase.auth.signOut()`
  - **Database Tables**: None (just clears auth session)

- **Vision Alignment**: ✅ KEEP

---

### 1.4 User Profile Management
- **Feature Name**: View and Edit Profile
- **Description**: Users can view their profile with stats and account information
- **User Journey**:
  1. Click "Profile" in navigation or user menu
  2. Navigate to `/debates/profile`
  3. View: Username, DeLO Rating, Reputation Score, Debates Participated, Debates Won, Win Rate, Email, Member Since, Account Status
  4. (Currently read-only, no editing UI)
  
- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/profile/page.tsx`
  - **Components**: Profile stat cards (inline)
  - **APIs**: Supabase query to `profiles` table
  - **Database Tables**: 
    - `profiles` (id, username, display_name, bio, reputation_score, debates_won, debates_participated, created_at, updated_at)
    - `auth.users` (email)
  - **Client-side logic**: None (server component)
  - **Server-side logic**: Fetch profile data, check auth, format dates

- **Vision Alignment**: ⚠️ MODIFY
  - Keep profile but add:
    - Bio/about section (partially exists but unused)
    - Conversation history or recent interactions
    - Interests/topics user focuses on
    - Following status (if social features added)

- **Conversation-First Equivalent**:
  - Profile shows conversation participation history
  - Highlights conversation topics user engages with
  - Shows consensus-building contributions
  - Display collaboration badges

- **Associated Terminology**:
  - "Reputation Score" → "Influence Score" or "Contribution Score"
  - "Debates Participated" → "Conversations Engaged"
  - "DeLO Rating" → "Conversation Rating" or remove if changing model

---

## 2. CONTENT CREATION

### 2.1 Create Debate
- **Feature Name**: Create New Debate Topic
- **Description**: Users can propose a new debate topic with an optional description
- **User Journey**:
  1. Authenticated user clicks "+ Create Debate" button
  2. Navigate to `/debates/create`
  3. Enter debate topic (required) and optional description
  4. See "How it works" explanation
  5. Click "Create Debate" button
  6. Debate created with status="open", redirected to debate detail page
  
- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/debates/create/page.tsx`
  - **Components**: Debate form (inline, client component)
  - **APIs**: Supabase `insert()` into debates table
  - **Database Tables**:
    - `debates` (id, topic, description, status, created_by, for_participant, against_participant, winner_id, created_at, completed_at)
  - **Client-side logic**: Form state, validation, error handling, navigation
  - **Server-side logic**: Insert into database, return new debate ID

- **Vision Alignment**: 🔄 TRANSFORM
  - Change from "debate topic" to "conversation starter"
  - Add conversation context/framing
  - Optional: Add suggested discussion questions
  - Focus on collaborative exploration vs. adversarial debate

- **Conversation-First Equivalent**:
  - "Start a Conversation" instead of "Create Debate"
  - Include conversation type: open discussion, question exploration, idea refinement, etc.
  - Add conversation goals/objectives
  - Frame as "What would you like to explore?"

- **Associated Terminology**:
  - "Debate Topic" → "Conversation Topic" or "Discussion Question"
  - "Debate" → "Conversation" or "Dialogue"
  - "Create Debate" → "Start Conversation" or "Begin Discussion"

---

### 2.2 Submit Argument
- **Feature Name**: Submit Debate Argument
- **Description**: Debate participants submit their position-specific arguments (one per participant)
- **User Journey**:
  1. User joined debate as FOR or AGAINST position
  2. Debate status changed to "in_progress"
  3. User sees "Submit Your Argument" form
  4. Enter argument text (8+ rows)
  5. Click "Submit Argument"
  6. Argument stored, if both sides submitted → trigger AI judgment
  7. Debate moves to "completed" state
  
- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/debates/[id]/page.tsx`
  - **Components**: `DebateActions.tsx` (client component, handles both join and submit)
  - **APIs**: 
    - Supabase insert into `arguments` table
    - Supabase query to check if both sides have submitted
    - Fetch `/api/judge` endpoint
  - **Database Tables**:
    - `arguments` (id, debate_id, user_id, position, content, round, created_at)
    - `debates` (updated with status change)
  - **Client-side logic**: Textarea state, validation, loading states, error handling
  - **Server-side logic**: Insert argument, check completion status, trigger judgment

- **Vision Alignment**: 🔄 TRANSFORM
  - Currently one-round, one-per-position structure
  - For conversation-first: Allow multiple rounds, longer discussions
  - Enable direct responses to specific points (threaded)
  - Support collaborative building on ideas

- **Conversation-First Equivalent**:
  - "Share Your Perspective" or "Add Your Thoughts"
  - Allow multi-round conversation
  - Support quoting/responding to specific points
  - Enable collaborative editing/refinement
  - Multiple participants, not just binary FOR/AGAINST

- **Associated Terminology**:
  - "Argument" → "Perspective" or "Contribution"
  - "Submit Argument" → "Share Your Thoughts"
  - "Position" (FOR/AGAINST) → "Perspective" or participant names

---

## 3. DEBATE PARTICIPATION

### 3.1 Join Debate - FOR Side
- **Feature Name**: Join Debate (Arguing FOR)
- **Description**: User joins open debate and commits to arguing the FOR position
- **User Journey**:
  1. Navigate to debate detail page (status="open", no FOR participant)
  2. See "Join this debate" section
  3. Click "Argue FOR" button
  4. User becomes `for_participant`
  5. Debate status changes to "in_progress"
  6. See "Submit Your Argument" form appears
  
- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/debates/[id]/page.tsx`
  - **Components**: `DebateActions.tsx` with action="join", position="for"
  - **APIs**: Supabase `update()` debates table
  - **Database Tables**: `debates` (for_participant, status)
  - **Client-side logic**: Button click handler, loading state, error handling
  - **Server-side logic**: Update debate record

- **Vision Alignment**: ❌ REMOVE (or significantly modify)
  - Binary FOR/AGAINST is too competitive/debate-focused
  - Replace with: Invitation-based participation, topic tags, interest-based matching

- **Conversation-First Equivalent**:
  - "Join this conversation" (no position bias)
  - Explicit topic interest tags
  - Ability to join multiple conversations on same topic
  - Collaborative vs. adversarial framing

---

### 3.2 Join Debate - AGAINST Side
- **Feature Name**: Join Debate (Arguing AGAINST)
- **Description**: User joins open debate and commits to arguing the AGAINST position
- **User Journey**: Same as 3.1 but for AGAINST position

- **Current Implementation**: Same as 3.1, position="against"

- **Vision Alignment**: ❌ REMOVE (or significantly modify)

---

### 3.3 View Debate Details
- **Feature Name**: View Debate Full Details
- **Description**: View all information about a debate including participants, arguments, judgment, and scores
- **User Journey**:
  1. From debates list, click debate card
  2. Navigate to `/debates/[id]`
  3. See: Topic, description, status badge, FOR and AGAINST participants with reputation
  4. See all submitted arguments (with position badge and author)
  5. If judged: See AI judgment section with winner, reasoning, scores, fact checks

- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/debates/[id]/page.tsx`
  - **Components**: Inline components for sections
  - **APIs**: Multiple Supabase queries:
    - Get debate with creator and participant data
    - Get all arguments for debate
    - Get judgment record
  - **Database Tables**: `debates`, `arguments`, `judgments`, `profiles`
  - **Client-side logic**: None (server component)
  - **Server-side logic**: Fetch all data, format, render UI

- **Vision Alignment**: ⚠️ MODIFY
  - Keep core detail view but update terminology
  - Change "Judgment" to "Community Synthesis" or similar
  - Show conversation flow more clearly
  - Display collaborative elements

- **Conversation-First Equivalent**:
  - "View Conversation" or "View Discussion"
  - Show conversation thread/flow
  - Highlight areas of agreement/disagreement
  - Show consensus points
  - Display tags/topics discussed

---

## 4. DISCOVERY & BROWSING

### 4.1 Browse Active Debates
- **Feature Name**: View Debates List
- **Description**: Browse all debates with filters and sorting
- **User Journey**:
  1. Click "Debates" in navigation or redirect there after auth
  2. Navigate to `/debates`
  3. See list of debates (latest first, limit 20)
  4. Each debate shows: Topic, description, status badge, participant count, argument count
  5. Click debate to view details
  6. "+ Create Debate" button to start new debate

- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/debates/page.tsx`
  - **Components**: Debate card components (inline)
  - **APIs**: Supabase `select()` from debates, order by created_at DESC, limit 20
  - **Database Tables**: `debates`, `profiles` (for participant names)
  - **Client-side logic**: None (server component, force-dynamic for real-time)
  - **Server-side logic**: Fetch debates, format status badges, render list

- **Vision Alignment**: ⚠️ MODIFY
  - Add more robust filtering and discovery
  - Currently very basic (just recency)
  - Add: Topic tags, status filters, participant filters, search

- **Conversation-First Equivalent**:
  - "Browse Conversations" or "Explore Discussions"
  - Add topic/interest filtering
  - Show trending topics
  - Add "conversations in your interests" section
  - Recommendation algorithm for relevant conversations

- **Associated Terminology**:
  - "Debates" → "Conversations" or "Discussions"
  - "Active Debates" → "Active Conversations"

---

### 4.2 Search Debates (NOT IMPLEMENTED)
- **Feature Name**: Search Debates
- **Description**: Search for debates by topic or keyword
- **Status**: ❌ NOT IMPLEMENTED
- **Vision Alignment**: ➕ MISSING (needed for conversation-first)

---

### 4.3 Filter Debates (NOT IMPLEMENTED)
- **Feature Name**: Filter Debates
- **Description**: Filter by status (open/in_progress/completed), participant status, topic tags
- **Status**: ❌ NOT IMPLEMENTED
- **Vision Alignment**: ➕ MISSING

---

## 5. AI FEATURES

### 5.1 AI Debate Judgment
- **Feature Name**: Gemini AI Debate Judge
- **Description**: After both arguments submitted, AI evaluates both sides and determines winner
- **User Journey**:
  1. Both debate participants submit arguments
  2. System triggers `/api/judge` endpoint automatically
  3. Gemini AI receives prompt with debate topic and both arguments
  4. AI returns JSON with: winner (for/against/tie), reasoning, fact checks, scores
  5. Judgment stored in database
  6. Debate status changed to "completed"
  7. Users see judgment display on debate page

- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/debates/[id]/page.tsx` (display only)
  - **APIs**: `/app/api/judge/route.ts` (POST endpoint)
  - **AI Integration**: `lib/gemini.ts` 
    - Model: `gemini-2.0-flash-exp`
    - Prompt engineering with specific criteria (logic, evidence, rhetoric)
    - JSON parsing of AI response
  - **Database Tables**:
    - `judgments` (id, debate_id, winner_position, reasoning, fact_checks, scores, created_at)
    - `debates` (updated: status, winner_id, completed_at)
  - **Flow**:
    1. Client submits argument
    2. Checks if both sides submitted (in DebateActions.tsx)
    3. If yes, calls `/api/judge` endpoint
    4. Server route calls `judgeDebate()` function
    5. Function creates prompt, calls Gemini API
    6. Parses JSON response
    7. Stores judgment in database
    8. Updates debate status and winner
    9. Returns success to client

- **Vision Alignment**: 🔄 TRANSFORM
  - Current: Binary winner determination (very debate-focused)
  - For conversation-first: AI synthesis of conversation points
  - Instead of "winner": Show "Areas of Agreement", "Key Disagreements", "Consensus Points"
  - More collaborative framing

- **Conversation-First Equivalent**:
  - "AI Synthesis" or "Conversation Summary"
  - AI identifies common ground
  - AI highlights areas of disagreement (without declaring winner)
  - AI suggests next conversation directions
  - AI identifies unanswered questions

- **AI Criteria** (currently):
  - Logic: Soundness of reasoning (0-10)
  - Evidence: Quality and relevance of support (0-10)
  - Rhetoric: Clarity and persuasiveness (0-10)
  - Fact Checks: Identify and verify key claims

---

### 5.2 AI Fact Checking
- **Feature Name**: AI Fact Checking in Judgment
- **Description**: AI identifies key claims and fact-checks them (accurate/misleading/false)
- **User Journey**:
  1. Judgment includes fact_checks array
  2. Each fact check has: claim, verdict (accurate/misleading/false), explanation
  3. Displayed in judgment section with color coding (green/yellow/red)

- **Current Implementation**:
  - **Part of**: AI Judgment system
  - **Database**: Stored in `judgments.fact_checks` (JSON)
  - **Display**: `/app/(authenticated)/debates/[id]/page.tsx` lines 266-302

- **Vision Alignment**: ✅ KEEP
  - Valuable for any discussion format
  - Helps maintain accuracy in conversations

---

## 6. GAMIFICATION & REPUTATION

### 6.1 DeLO Rating System
- **Feature Name**: Philosopher Rating System (DeLO - Debate ELO)
- **Description**: Elo-style rating system where users earn/lose rating points based on debate wins/losses
- **Details**:
  - All users start at 1000 DeLO
  - Win debate → increase rating
  - Lose debate → decrease rating
  - Rating used for leaderboard ranking and display in profiles
  
- **Current Implementation**:
  - **Database**: `profiles.delo_rating` field
  - **Updates**: Currently not implemented - field exists but no calculation logic
  - **Display**: 
    - Profile page: Shows DeLO rating
    - Leaderboard: Primary sort field
    - Debate detail: Shows participant ratings
    - Navigation: Shows user rating

- **Vision Alignment**: ⚠️ MODIFY
  - Elo rating is very game/competition-focused
  - For conversation-first: Rename to "Influence Score" or "Contribution Score"
  - Consider: Collaborative score based on building on others' ideas, reaching consensus

- **Conversation-First Equivalent**:
  - "Influence Score": Based on how often others build on your ideas
  - "Conversation Contributions": Points for each contribution, boosted by collaboration
  - "Consensus Builder": Points for helping reach agreement

---

### 6.2 Reputation Score
- **Feature Name**: User Reputation Points
- **Description**: Points earned for participating and winning debates
- **Details**:
  - Displayed in profile and navigation
  - Shown as ★ star rating (e.g., "★ 250")
  - Incremented on debate win (specific increment not implemented)

- **Current Implementation**:
  - **Database**: `profiles.reputation_score`
  - **Updates**: Not automatically updated - field exists but logic not implemented
  - **Display**: Same as DeLO rating across app

- **Vision Alignment**: 🔄 TRANSFORM
  - Rename for conversation context
  - Change calculation methodology

- **Conversation-First Equivalent**:
  - "Contribution Score": Points for meaningful participation
  - "Collaboration Points": Points for building on others' ideas
  - "Insight Score": Points for raising new questions/perspectives

---

### 6.3 Leaderboard Ranking
- **Feature Name**: Philosopher Leaderboard
- **Description**: Ranked list of top 100 philosophers by DeLO rating
- **User Journey**:
  1. Click "Leaderboard" in navigation
  2. Navigate to `/leaderboard`
  3. See table/cards showing:
     - Rank (with medal emoji for top 3)
     - Username with "You" badge if current user
     - DeLO Rating (primary sort)
     - Reputation Score
     - Total Debates, Debates Won
     - Win Rate (with progress bar)
  4. Stats summary: Total philosophers, highest DeLO, best win rate

- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/leaderboard/page.tsx`
  - **APIs**: Supabase RPC `get_leaderboard()` (attempted) or fallback query
  - **Database**: Query `profiles` table, sort by `delo_rating` DESC, limit 100
  - **Components**: LeaderboardRow component, stat cards
  - **Mobile**: Responsive card view for mobile devices

- **Vision Alignment**: 🔄 TRANSFORM
  - Change from competitive leaderboard to "Contributors" or "Scholars" list
  - Could show different metrics (collaboration score, topics engaged, etc.)
  - Could be opt-in to appear on leaderboard

- **Conversation-First Equivalent**:
  - "Top Contributors" instead of "Leaderboard"
  - Sort by: Conversation frequency, collaboration points, topics explored
  - Show collaboration metrics
  - "Most Helpful Contributors" ranking

---

### 6.4 Win Rate Tracking
- **Feature Name**: Debate Win Rate Metrics
- **Description**: Tracks debates participated and won, calculates win percentage
- **Details**:
  - `profiles.debates_participated`: Total debates user joined
  - `profiles.debates_won`: Number of debates user won
  - Win Rate: `(debates_won / debates_participated) * 100`
  - Displayed as percentage with progress bar on leaderboard

- **Current Implementation**:
  - **Database**: `profiles.debates_participated`, `profiles.debates_won`
  - **Calculation**: Client-side in leaderboard page
  - **Updates**: Not automatically updated - would need trigger on judgment creation

- **Vision Alignment**: ❌ REMOVE or MODIFY
  - "Win rate" is very competitive metric
  - For conversation-first: Remove "win" concept
  - Could track "Conversation Completion Rate" (% of conversations you finish)
  - Could track "Topic Exploration Rate"

---

## 7. USER PROFILES & SOCIAL (PARTIAL)

### 7.1 View User Profile (Own)
- **Feature Name**: My Profile
- **Description**: View own profile with complete statistics
- **User Journey**: (See 1.4 User Profile Management)

---

### 7.2 View User Profile (Others) - NOT IMPLEMENTED
- **Feature Name**: View Other User Profiles
- **Description**: Click on username in debates/leaderboard to view their profile
- **Status**: ❌ NOT IMPLEMENTED
  - Usernames are not clickable
  - No public profile pages exist
  - Could be added: `/users/[username]/page.tsx`

- **Vision Alignment**: ➕ MISSING
  - Needed for conversation-first to see collaborators' profiles
  - Should show: Conversation history, topics of interest, collaboration style

---

### 7.3 Follow Users - NOT IMPLEMENTED
- **Feature Name**: Follow User for Updates
- **Description**: Users can follow other philosophers to see their debates
- **Status**: ❌ NOT IMPLEMENTED
- **Vision Alignment**: ➕ MISSING (valuable for conversation-first)

---

### 7.4 Block Users - NOT IMPLEMENTED
- **Feature Name**: Block User
- **Description**: Users can block others to hide their debates
- **Status**: ❌ NOT IMPLEMENTED
- **Vision Alignment**: ⚠️ MODIFY
  - Important for community safety
  - Implement with moderation framework

---

## 8. SETTINGS & PREFERENCES

### 8.1 Account Settings
- **Feature Name**: Manage Account Email
- **Description**: View account email (read-only display)
- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/settings/page.tsx`
  - **Display**: Email field (disabled/read-only)
  - **Functionality**: View only (no edit option)

- **Vision Alignment**: ⚠️ MODIFY
  - Add ability to change email
  - Add password change

---

### 8.2 Notification Settings
- **Feature Name**: Manage Notification Preferences
- **Description**: Toggle notifications for debates, rating changes, achievements
- **Details**:
  - Debate Responses: Notify when someone joins/responds
  - Rating Changes: Notify on DeLO/reputation updates
  - Achievements Unlocked: Notify on new badges

- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/settings/page.tsx`
  - **UI**: Checkboxes (all defaultChecked=true)
  - **Functionality**: NO - just UI, not connected to database
  - **Status**: 🔲 STUB ONLY

- **Vision Alignment**: ✅ KEEP (but implement)
  - Important for user engagement
  - Rename: "Conversation Notifications", "Contribution Notifications"

---

### 8.3 Privacy Settings
- **Feature Name**: Manage Privacy Preferences
- **Description**: Control profile visibility and comment permissions
- **Details**:
  - Show Profile on Leaderboard: Visibility control
  - Allow Comments on Arguments: Permission control

- **Current Implementation**:
  - **Pages**: `/app/(authenticated)/settings/page.tsx`
  - **UI**: Checkboxes (all defaultChecked=true)
  - **Functionality**: NO - just UI, not connected to database
  - **Status**: 🔲 STUB ONLY

- **Vision Alignment**: ✅ KEEP
  - Important for user control and safety

---

### 8.4 Sign Out
- **Feature Name**: Sign Out of Account
- **Description**: (See 1.3 User Logout)

---

## 9. INFORMATIONAL PAGES

### 9.1 Landing Page
- **Feature Name**: Home/Landing Page
- **Description**: Marketing page for unauthenticated users
- **User Journey**:
  1. Visit `/` while not logged in
  2. See hero section with: Logo, title "Where Philosophy Comes Alive", CTA to sign up
  3. See three feature cards:
     - ⚖️ Fair AI Judgment
     - 🧠 Build Reputation
     - 💭 Real Community
  4. See footer text about 500+ philosophers
  5. Click "Start Your First Duel" or sign up button

- **Current Implementation**:
  - **Pages**: `/app/page.tsx`
  - **Redirects**: Authenticated users redirected to `/debates`

- **Vision Alignment**: 🔄 TRANSFORM
  - Change messaging from "duels" to "conversations"
  - Change feature highlights to collaboration focus
  - Update "Build Reputation" to "Build Influence" or "Contribute to Community"
  - Change "Fair AI Judgment" to "AI-Powered Insights"
  - Change "Real Community" to "Collaborative Community"

---

### 9.2 About Page
- **Feature Name**: About PhiloDuel
- **Description**: Information about platform mission and how it works
- **User Journey**:
  1. Click "About" in navigation
  2. Navigate to `/about`
  3. See: Mission, How It Works, Join Community CTA

- **Current Implementation**:
  - **Pages**: `/app/about/page.tsx`
  - **Content**: Sections on mission, AI technology, community focus

- **Vision Alignment**: 🔄 TRANSFORM
  - Update mission from "fair AI-judged philosophical debates"
  - Change to: "collaborative intellectual discourse"
  - Update "How It Works" section
  - Add: Vision for conversation-first model

---

## 10. TECHNICAL FEATURES

### 10.1 Authentication Middleware
- **Feature Name**: Route Protection
- **Description**: Middleware to protect authenticated routes
- **Implementation**: `/middleware.ts`
- **Status**: Basic auth checks via Supabase

---

### 10.2 Real-time Updates
- **Feature Name**: Real-time Data Updates
- **Description**: Debates list refreshes with new debates
- **Implementation**: Server-side revalidation with `force-dynamic` and `revalidate=0`
- **Status**: ✅ Implemented via ISR/dynamic routes

---

### 10.3 Search Functionality - NOT IMPLEMENTED
- **Status**: ❌ NO search across debates/topics/users

---

---

## FEATURE SUMMARY TABLE

| Category | Feature | Status | Vision Alignment |
|----------|---------|--------|------------------|
| **Auth** | Sign Up | ✅ Implemented | ⚠️ MODIFY |
| **Auth** | Sign In | ✅ Implemented | ✅ KEEP |
| **Auth** | Sign Out | ✅ Implemented | ✅ KEEP |
| **Profile** | View Own Profile | ✅ Implemented | ⚠️ MODIFY |
| **Profile** | View Other Profiles | ❌ Missing | ➕ NEEDED |
| **Content** | Create Debate | ✅ Implemented | 🔄 TRANSFORM |
| **Content** | Submit Argument | ✅ Implemented | 🔄 TRANSFORM |
| **Participation** | Join FOR | ✅ Implemented | ❌ REMOVE |
| **Participation** | Join AGAINST | ✅ Implemented | ❌ REMOVE |
| **Discovery** | Browse Debates List | ✅ Implemented | ⚠️ MODIFY |
| **Discovery** | Search Debates | ❌ Missing | ➕ NEEDED |
| **Discovery** | Filter Debates | ❌ Missing | ➕ NEEDED |
| **AI** | Debate Judgment | ✅ Implemented | 🔄 TRANSFORM |
| **AI** | Fact Checking | ✅ Implemented | ✅ KEEP |
| **Gamification** | DeLO Rating | ✅ Implemented | ⚠️ MODIFY |
| **Gamification** | Reputation Score | ✅ Implemented | 🔄 TRANSFORM |
| **Gamification** | Leaderboard | ✅ Implemented | 🔄 TRANSFORM |
| **Gamification** | Win Rate | ✅ Implemented | ❌ REMOVE |
| **Social** | Follow Users | ❌ Missing | ➕ NEEDED |
| **Social** | Block Users | ❌ Missing | ➕ NEEDED |
| **Settings** | Account Settings | ✅ Stub | ⚠️ MODIFY |
| **Settings** | Notifications | ✅ Stub | ✅ KEEP |
| **Settings** | Privacy | ✅ Stub | ✅ KEEP |
| **Pages** | Landing Page | ✅ Implemented | 🔄 TRANSFORM |
| **Pages** | About Page | ✅ Implemented | 🔄 TRANSFORM |

---

## Database Tables Overview

### Profiles Table
```
id (UUID) - User ID from auth.users
username (VARCHAR) - Unique username (3-30 chars)
display_name (VARCHAR) - Optional public display name
bio (TEXT) - User bio (currently unused)
reputation_score (INTEGER) - Default 0
debates_won (INTEGER) - Default 0
debates_participated (INTEGER) - Default 0
delo_rating (INTEGER) - Default 1000
created_at (TIMESTAMP) - Account creation
updated_at (TIMESTAMP) - Last update
```

### Debates Table
```
id (UUID)
topic (VARCHAR) - Debate topic/question
description (TEXT) - Optional description
status (ENUM) - 'open' | 'in_progress' | 'completed'
created_by (UUID) - Creator user ID
for_participant (UUID) - User arguing FOR side
against_participant (UUID) - User arguing AGAINST side
winner_id (UUID) - ID of winning participant (null if tie)
created_at (TIMESTAMP)
completed_at (TIMESTAMP) - When judgment was rendered
```

### Arguments Table
```
id (UUID)
debate_id (UUID) - Foreign key to debates
user_id (UUID) - Argument author
position (ENUM) - 'for' | 'against'
content (TEXT) - Argument text
round (INTEGER) - Round number (currently always 1)
created_at (TIMESTAMP)
```

### Judgments Table
```
id (UUID)
debate_id (UUID) - Foreign key to debates
winner_position (ENUM) - 'for' | 'against' | 'tie'
reasoning (TEXT) - AI's detailed explanation
fact_checks (JSONB) - Array of fact check objects
scores (JSONB) - Scores for logic/evidence/rhetoric
created_at (TIMESTAMP)
```

---

## API Endpoints

### POST /api/judge
- **Purpose**: Call Gemini AI to judge a debate
- **Request Body**:
  ```json
  {
    "debateId": "uuid",
    "topic": "string",
    "argumentFor": "string",
    "argumentAgainst": "string"
  }
  ```
- **Response**: `{ success: true, judgment: JudgmentResult }`
- **Side Effects**: 
  - Creates record in `judgments` table
  - Updates `debates` table (status, winner_id, completed_at)
  - Does NOT update `profiles` table (reputation/rating)

---

## Key Implementation Notes

1. **No automatic stats updates**: Winning a debate does NOT automatically update `reputation_score` or `debates_won` - these would need database triggers or logic in the judge endpoint

2. **Limited filtering**: Debates list only shows by recency, no search/filter

3. **Judgment finality**: Once AI judgment is rendered, it cannot be appealed or edited

4. **No multi-round**: Currently only 1 round per debate (1 argument per side max)

5. **No commenting**: Users cannot comment on arguments or debates

6. **No notifications**: Settings exist but not implemented

7. **No real-time collaboration**: Debates are fully serialized (creator → wait for 2nd participant → both submit sequentially → judgment)

8. **No user discovery**: Can only find debates through list, not by topic or user

---

