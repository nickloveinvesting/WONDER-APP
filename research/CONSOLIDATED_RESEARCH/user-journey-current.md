# User Journey - Current State

## How Users Currently Interact with PhiloDuel

---

## 1. ONBOARDING JOURNEY

### Path: Unauthenticated User → New Account → First Debate

**Step 1: Landing Page Discovery**
- User arrives at `/` (home page)
- Sees hero: "Where Philosophy Comes Alive" with CTA "Start Your First Duel"
- Sees three feature highlights
- Hero CTA points to `/auth/signup`

**Step 2: Account Creation**
- Route: `/auth/signup`
- Form fields: Email, Password, Username (3-30 chars), Display Name (optional)
- Submit button: "Sign Up"
- Validation: 
  - Username length check (3-30)
  - Email validation (standard)
  - Password minimum length (6 chars)
- On success: Auto-logged in, redirected to `/debates`
- Account created in `auth.users` and `profiles` tables
- User assigned default: DeLO rating = 1000, Reputation = 0

**Step 3: First Time Landing in Debates List**
- Route: `/debates` (page redirects authenticated users to debates after login)
- Empty list message: "No debates yet. Be the first!"
- CTA button: "Create First Debate"
- Navigation available: Debates, Leaderboard, Profile
- User menu shows: Username, ★ Reputation (0 initially)

**Step 4: Create First Debate**
- Click "+ Create Debate" button or "Create First Debate"
- Route: `/debates/create`
- Form fields:
  - Debate Topic (required) - e.g., "Free will is an illusion"
  - Description (optional) - "Provide context or clarification"
- "How it works" box explains the flow:
  1. You create the debate topic
  2. Another philosopher joins to argue FOR or AGAINST
  3. Both submit arguments (one round each)
  4. Gemini AI judges based on logic, evidence, and rhetoric
  5. Winner earns reputation points
- Submit: "Create Debate"
- Success: Redirected to new debate detail page (status="open")

**Step 5: Waiting for Opponent**
- Route: `/debates/{debateId}`
- See topic, description, status badge (OPEN)
- See two position boxes:
  - ARGUING FOR - "Waiting for philosopher..."
  - ARGUING AGAINST - "Waiting for philosopher..."
- "Join this debate" section with two buttons:
  - Green "Argue FOR" button
  - Red "Argue AGAINST" button
- User can share debate URL to invite someone, but no explicit share feature

---

## 2. DEBATE PARTICIPANT JOURNEY

### Path: Join Debate → Submit Argument → Await Judgment

**Step 1: Browse Debates**
- Route: `/debates`
- See list of all debates (ordered by newest first)
- Each debate card shows:
  - Topic (clickable)
  - Description (if provided)
  - Status badge (OPEN / IN PROGRESS / COMPLETED)
  - Participant count (e.g., "👤 2 participants")
  - Argument count (e.g., "💬 0 arguments")
- User scans and clicks on debate card of interest

**Step 2: View Debate Details**
- Route: `/debates/{debateId}`
- If status="open" and not all positions filled:
  - Can click "Argue FOR" or "Argue AGAINST"
  - Joining is immediate (one-click)
- If status="in_progress" and user is participant:
  - Can see the "Submit Your Argument" form
  - Text area for argument
  - Submit button

**Step 3: Join Debate**
- User clicks "Argue FOR" (or AGAINST)
- Loading state: "Joining..."
- Background: Debate record updated with `for_participant` (or `against_participant`) = user.id
- Status automatically changes: open → in_progress
- Page refreshes
- "Submit Your Argument" form appears

**Step 4: Submit First Argument**
- Form appears: Large textarea (8+ rows)
- Placeholder: "Write your philosophical argument here... Be clear, logical, and persuasive."
- User enters argument text
- Clicks "Submit Argument"
- Loading state: "Submitting..."
- Background:
  - Argument record created in `arguments` table
  - System checks if both positions have submitted arguments
  - If only one side submitted: No action yet, page refreshes
  - If both sides submitted: System triggers `/api/judge` endpoint

**Step 5: Wait for Other Participant**
- If you submitted first:
  - Page shows your argument with position badge
  - You see: "Waiting for other participant to submit argument..."
  - (No explicit waiting state UI, just argument list)

**Step 6: AI Judgment Triggered**
- Other participant submits argument
- System automatically calls `/api/judge` endpoint with:
  - Debate topic
  - Both arguments
- Gemini AI processes (takes 5-10 seconds)
- Judgment created in database

**Step 7: View Judgment Results**
- Page refreshes (user sees their argument submitted)
- Judgment section appears with:
  - **Winner Badge**: FOR / AGAINST / TIE (with color coding)
  - **Reasoning**: Full paragraph of AI explanation
  - **Scores** (for both sides):
    - Logic: 0-10
    - Evidence: 0-10  
    - Rhetoric: 0-10
  - **Fact Checks**: List of claims with verdicts (accurate/misleading/false)
    - Each with explanation

**Step 8: View Own Stats**
- Navigate to `/profile`
- See updated stats:
  - DeLO Rating (unchanged - logic not implemented)
  - Reputation Score (unchanged - logic not implemented)
  - Debates Participated: 1
  - Debates Won: 0 or 1 (not updated - logic not implemented)
  - Win Rate: Displayed but not calculated

---

## 3. EXPLORATION JOURNEY

### Path: Curious User → Browse → Watch Debates

**Step 1: Land in Debates List**
- Route: `/debates`
- See list sorted by newest first
- Mix of statuses: OPEN, IN PROGRESS, COMPLETED

**Step 2: Find Interesting Topic**
- Can only sort by recency
- No search, no filters, no category browsing
- No "recommended for you" algorithm
- Scroll through list manually

**Step 3: View Debate (As Observer)**
- Click debate card
- Route: `/debates/{debateId}`
- See all debate information including arguments and judgment
- If status is COMPLETED:
  - See both arguments
  - See full judgment
  - Can read and learn from finished debates
- Cannot upvote, react, or comment on arguments

**Step 4: Join an Interesting Open Debate**
- If debate is open with missing position:
  - Can join as FOR or AGAINST
  - Proceeds to Step 1 of Debate Participant Journey

---

## 4. LEADERBOARD JOURNEY

### Path: Check Rankings → See Top Philosophers

**Step 1: Navigate to Leaderboard**
- Click "Leaderboard" in navigation
- Route: `/leaderboard`

**Step 2: View Rankings**
- See stat cards at top:
  - Total Philosophers (count)
  - Highest DeLO (value)
  - Best Win Rate (percentage)
- See table (or cards on mobile):
  - Rank: 🥇 🥈 🥉 or #4, #5, etc.
  - Username with "You" badge if current user
  - DeLO Rating (primary sort column)
  - Reputation Score
  - Debates (total participated)
  - Wins
  - Win Rate (with progress bar)

**Step 3: Identify Top Performers**
- Can see who has highest DeLO rating
- Can see who has best win rate
- Can see where you rank (if you've participated)
- Cannot click on usernames to view profiles
- Cannot follow or message top users

---

## 5. PROFILE JOURNEY

### Path: Check Your Stats

**Step 1: Navigate to Profile**
- Option A: Click "Profile" in navigation
- Option B: Click user menu → "My Profile"
- Route: `/profile`

**Step 2: View Personal Stats**
- Four stat cards:
  - Username
  - DeLO Rating
  - Reputation
  - Debates
- Two detail sections:
  - Statistics: Debates Participated, Debates Won, Win Rate
  - Account Info: Email, Member Since, Account Status

**Step 3: No Edit Capability**
- Currently read-only view
- Cannot edit username, bio, or settings from profile page

---

## 6. SETTINGS JOURNEY

### Path: Manage Account Settings

**Step 1: Navigate to Settings**
- Click user menu → "Settings"
- Route: `/settings`

**Step 2: View Account Settings**
- Email field (read-only, disabled input showing email)
- No edit option for email
- No password change option

**Step 3: View Notification Settings**
- Three checkboxes (all defaultChecked=true):
  - Debate Responses
  - Rating Changes
  - Achievements Unlocked
- (Not connected to database - UI only)

**Step 4: View Privacy Settings**
- Two checkboxes (all defaultChecked=true):
  - Show Profile on Leaderboard
  - Allow Comments on My Arguments
- (Not connected to database - UI only)

**Step 5: Sign Out**
- Click "Sign Out" button in Danger Zone
- Logged out, redirected to home page

---

## 7. ABOUT PAGE JOURNEY

### Path: Learn About Platform

**Step 1: Navigate to About**
- Click "About" in navigation (unauthenticated pages only)
- Route: `/about`

**Step 2: Read About Content**
- Mission: "PhiloDuel is a platform dedicated to fostering intellectual discourse through fair, AI-judged philosophical debates..."
- How It Works: "Our platform uses advanced AI technology to objectively evaluate philosophical arguments..."
- Join Community: CTA to sign up

---

## KEY USER JOURNEY MOMENTS

### ✅ Smooth Flows:
1. **Sign up → Create first debate**: Clear path, good onboarding
2. **Join debate → Submit argument**: Intuitive, one-click joining
3. **View judgment**: Clear presentation of results
4. **Check leaderboard**: Good visual hierarchy

### ⚠️ Friction Points:
1. **Finding debates to join**: No search, no filters, no recommendations
2. **Understanding participation**: If first debate is open and waiting for opponent, user might feel stuck
3. **No feedback on stats**: Winning debate doesn't visibly update profile or leaderboard in real time
4. **Dead ends**: 
   - Can click usernames in leaderboard but they're not links
   - Settings page has stub controls but no functionality
   - Can't see other users' profiles

### ❌ Missing Journeys:
1. **Following a user**: Can't subscribe to interesting philosophers
2. **Topic-based discovery**: Can't browse by topic/category
3. **Search**: Can't find specific debates
4. **Direct messaging**: Can't communicate with other philosophers
5. **Notifications**: Can't get notified of debate responses (even if settings exists)
6. **Multi-round debates**: Can't continue discussion after judgment

---

## USER TYPES & THEIR JOURNEYS

### Type 1: The Creator
- Creates debates frequently
- Waits for opponents
- Wins/loses based on AI judgment
- Checks leaderboard and profile to see progress
- **Pain point**: Waiting time if no one joins

### Type 2: The Responder
- Joins open debates
- Submits arguments
- Watches for judgment
- **Pain point**: Hard to discover interesting debates

### Type 3: The Observer
- Reads completed debates
- Watches arguments and judgments
- Maybe inspired to join someday
- **Pain point**: Can't express interest or comments

### Type 4: The Competitive
- Focused on DeLO rating and win rate
- Watches leaderboard closely
- Seeks high-stakes debates
- **Pain point**: Limited debate supply means limited ranking opportunities

### Type 5: The Curious (Currently unsupported)
- Wants to learn from debates
- Interested in specific topics
- Wants to follow favorite philosophers
- **No current support**: No search, no following, no notifications

---

## CONVERSION METRICS (Current Journey)

**Critical Path**: Sign Up → Create Debate → Join Debate → Submit Argument → View Judgment

**Dropoff Points**:
1. **After Sign Up**: User lands in empty debates list with CTA to create
   - Creates friction if user wants to join first instead
2. **Creating First Debate**: Must wait for opponent
   - No indication of expected wait time
   - No list of waiting debates to join instead
3. **Waiting Phase**: If opponent is slow, user may abandon
   - No notifications when opponent joins or submits
4. **After Judgment**: User sees results but no clear next action
   - "What do I do now?" moment
   - Could create follow-up debate or join another

---

## JOURNEY WITH CONVERSATION-FIRST VISION

(See feature-transformation-map.md for how journeys would change)

Key transformation:
- **From**: Binary adversarial (FOR/AGAINST)
- **To**: Collaborative exploration
- **From**: Winner determination
- **To**: Consensus building and synthesis
- **From**: Isolated single debates
- **To**: Interconnected threads and topic threads

---

