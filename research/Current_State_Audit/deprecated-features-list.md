# Deprecated Features List

## Features to Remove or Significantly Modify for Conversation-First Model

---

## FEATURES TO REMOVE ❌

### 1. Binary Position System (FOR/AGAINST)
**Current Implementation**:
- Debates table: `for_participant`, `against_participant` fields
- Arguments table: `position` enum ('for', 'against')
- UI: "Argue FOR" and "Argue AGAINST" buttons
- Judgment: Determines winner_position (for/against/tie)

**Why Remove**:
- Inherently adversarial/competitive model
- Prevents collaborative discussion
- Creates "winner and loser" framing
- Locks users into opposing positions
- Makes multi-round discussion difficult
- Contradicts conversation-first philosophy

**Removal Impact**:
- ⚠️ HIGH: Affects core data model and UI flows
- Requires database migration to new conversation model
- Breaks existing debates (need migration strategy)
- Many features depend on this (judgment, arguments, etc.)

**Migration Strategy**:
1. Archive all existing debates as "historical"
2. Create new `conversations` table without position fields
3. Create new `contributions` table to replace arguments
4. Migrate UI to use conversations instead of debates
5. Consider showing historical debates in read-only mode

**Removal Checklist**:
- [ ] Rename `debates` table or create `conversations` table
- [ ] Remove `for_participant`, `against_participant` fields
- [ ] Remove `position` field from arguments
- [ ] Update routes: `/debates/*` → `/conversations/*`
- [ ] Remove position selection buttons
- [ ] Update all queries and APIs
- [ ] Update leaderboard to not reference positions
- [ ] Handle existing debate data

---

### 2. Competitive Judging / Winner Determination
**Current Implementation**:
- `/api/judge` endpoint determines winner
- Judgment JSON: `winner_position: 'for' | 'against' | 'tie'`
- Prompts Gemini to evaluate and pick winning side
- Updates `debates.winner_id` field
- Affects reputation/rating calculations

**Why Remove**:
- "Winner" framing is inherently competitive
- Not needed for collaborative exploration
- Creates losers/failures (negative psychology)
- Contradicts building consensus
- Judgment should be synthesis, not determination

**Removal Impact**:
- ⚠️ MEDIUM: Affects AI integration and judgment display
- Relatively isolated to judgment system
- Doesn't require database restructuring if done carefully
- UI changes needed for judgment display

**Removal Checklist**:
- [ ] Rewrite Gemini prompt to synthesize instead of judge
- [ ] Update judgment JSON schema (remove winner_position, add synthesis)
- [ ] Update `/api/judge` route
- [ ] Update judgment display on debate page
- [ ] Update judgment database schema
- [ ] Remove winner_id field from debates (or repurpose)
- [ ] Update all winner-related logic

---

### 3. One-Round Argument Limit
**Current Implementation**:
- Arguments table: `round` field (currently always 1)
- UI logic: Check if user already submitted (line 56 in [id]/page.tsx)
- Only triggers judgment when both sides submit once

**Why Remove**:
- Prevents meaningful back-and-forth
- Artificial cutoff for discussion
- Doesn't allow response to opponent's points
- Limits conversation depth

**Removal Impact**:
- ⚠️ LOW-MEDIUM: Isolated to debate logic
- Would need to change judgment trigger logic
- Might keep round tracking for history
- Would need auto-judgment rules for open-ended conversations

**New Model**:
- Multiple rounds possible
- Judgment optional (user can request synthesis anytime)
- Conversation can continue after synthesis

---

### 4. Win Rate Leaderboard Metric
**Current Implementation**:
- `profiles.debates_won` field
- `profiles.debates_participated` field  
- Leaderboard shows: "Wins" column, "Win Rate" percentage
- Calculated: `(debates_won / debates_participated) * 100`

**Why Remove**:
- Purely competitive metric
- Doesn't represent collaboration
- Incentivizes "winning" not "learning"
- Not compatible with collaborative model

**Removal Impact**:
- ✅ LOW: Can be removed with minimal code changes
- Just remove from leaderboard display
- Can remove fields from database eventually
- Pure UI/logic removal

**Removal Checklist**:
- [ ] Remove "Wins" column from leaderboard
- [ ] Remove win rate display and calculation
- [ ] Remove win rate progress bar
- [ ] Update profile page to not show win rate
- [ ] Eventually remove fields from database

---

### 5. Debate Winner ID Tracking
**Current Implementation**:
- `debates.winner_id` field - tracks which user won
- Updated when judgment created
- Used for: Reputation/rating updates (not implemented)

**Why Remove**:
- Only makes sense in competitive model
- Meaningless in collaborative model
- Contradicts conversation framing

**Removal Impact**:
- ✅ LOW: Isolated field, not widely used
- Can be removed once judgment system changed

---

### 6. DeLO (Debate ELO) Rating System
**Current Implementation**:
- `profiles.delo_rating` field (default 1000)
- Displayed on leaderboard and profiles
- Leaderboard sorted by: `delo_rating DESC`
- Not actually updated (logic not implemented)

**Why Remove**:
- "DeLO" = "Debate ELO" - explicitly competitive
- Elo is game/rating system for competitions
- Doesn't fit collaborative philosophy
- Would need complete redesign

**Options**:
1. **Remove entirely** - Stop tracking ratings altogether
2. **Rename and redesign** - "Influence Score" based on contributions, not wins
3. **Keep as legacy** - Archive for historical tracking

**Removal Impact**:
- ⚠️ MEDIUM-HIGH: Primary leaderboard metric
- Would need alternative metric
- Affects user psychology/motivation
- UI and logic changes needed

**Recommendation**: MODIFY not REMOVE
- Rename `delo_rating` to `influence_score`
- Change calculation from win/loss to contribution-based
- Update display terminology everywhere
- See: feature-transformation-map.md for details

---

### 7. Reputation Score (Current Model)
**Current Implementation**:
- `profiles.reputation_score` field (default 0)
- Displayed on profile and navigation (★ format)
- Not actually updated on debate win (logic not implemented)

**Why Remove**:
- "Reputation" in current model = "Debate Wins"
- Incentivizes winning, not learning
- Purely competitive metric

**Note**: Can be REPURPOSED rather than removed
- Rename to "Contribution Score"
- Update on every meaningful contribution
- See: feature-transformation-map.md

---

## FEATURES TO SIGNIFICANTLY MODIFY ⚠️

### 1. Debate Judgment Display
**Current Implementation**:
- Prominent "AI Judgment" section
- Displays: "Winner: FOR/AGAINST/TIE" with badge
- Shows scores (Logic/Evidence/Rhetoric) for each side
- Compares scores side-by-side

**Modification Needed**:
- Remove "Winner" badge
- Keep "AI Synthesis" or "Discussion Summary"
- Show: "Areas of Agreement", "Areas of Disagreement", "Unresolved Questions"
- Remove side-by-side score comparison
- Add: "Suggested Next Steps" or "Related Conversations"

**Implementation**:
- Rewrite Gemini prompt
- Update JSON schema
- Update UI to show synthesis instead of judgment
- See: feature-transformation-map.md for details

---

### 2. Leaderboard / Rankings
**Current Implementation**:
- Called "Philosopher Leaderboard"
- Primary sort: DeLO rating
- Columns: Rank, Username, DeLO Rating, Reputation, Debates, Wins, Win Rate
- Shows top 100 philosophers

**Modification Needed**:
- Rename to "Contributors" or "Top Contributors"
- Change primary sort to Influence Score (or contribution count)
- Remove: Wins, Win Rate columns
- Add: Topic interests, collaboration count
- Make it optional to appear
- Show different sort options

**Implementation**:
- UI: Rename and restructure columns
- Logic: Change sort metrics
- DB: Add topic interests, collaboration tracking
- See: feature-transformation-map.md for details

---

### 3. Argument Submission Flow
**Current Implementation**:
- One argument per user per debate
- Must wait for opponent to submit
- Auto-triggers judgment when both submit
- No ability to reference or respond to opponent's points

**Modification Needed**:
- Allow multiple contributions per user
- Optional threading/replies to specific contributions
- Manual judgment trigger (not automatic)
- Support for building on others' ideas explicitly

**Implementation**:
- Change `arguments.round` to allow unlimited rounds
- Add `arguments.parent_argument_id` for threading
- Remove auto-judgment logic
- Add "Request Synthesis" button

---

### 4. Join Debate UI
**Current Implementation**:
- Two buttons: "Argue FOR" and "Argue AGAINST"
- Status changes on click
- Joins debate to specific position

**Modification Needed**:
- Single "Join Conversation" button
- No position selection
- Show current participants
- Allow joining already-in-progress conversations

**Implementation**:
- Remove position buttons
- Add single join button
- Show participants list
- Update database logic

---

### 5. Create Debate Form
**Current Implementation**:
- Topic (required text field)
- Description (optional textarea)
- "How it works" box explaining process

**Modification Needed**:
- Add topic tags (new)
- Add conversation type dropdown (new)
- Add optional conversation goals (new)
- Optional: invite specific people (new)
- Update "How it works" explanation

**Implementation**:
- Add form fields
- Add tag selector UI
- Update explanatory text

---

### 6. Profile Page
**Current Implementation**:
- Read-only view
- Shows stats and account info
- No editing capability
- Shows debate-specific metrics

**Modification Needed**:
- Add editable bio
- Add editable topic interests
- Add editable conversation style
- Add edit buttons/form
- Update metrics to show contribution-based stats
- Add activity section

**Implementation**:
- Add edit forms
- Add edit buttons
- Update displayed metrics
- Implement profile edit API

---

### 7. Landing/About Pages
**Current Implementation**:
- "Where Philosophy Comes Alive"
- "Start Your First Duel" CTA
- Features: "Fair AI Judgment", "Build Reputation", "Real Community"

**Modification Needed**:
- Change messaging from debate/duel to conversation
- Update feature highlights to collaboration focus
- Change CTA to conversation-focused language
- Update "How It Works" explanation

**Implementation**:
- Update copy
- Update hero messaging
- Change feature descriptions
- See: feature-transformation-map.md

---

## FEATURES CURRENTLY STUBBED (Incomplete Implementation) 🔲

### 1. Notification Settings
**Current State**:
- UI: Checkboxes for Debate Responses, Rating Changes, Achievements
- Database: NOT connected
- Logic: NOT implemented
- Status: Stub only

**Fix**: Implement fully
- Connect to database
- Implement notification sending logic
- Add email notifications
- Add notification frequency options

---

### 2. Privacy Settings
**Current State**:
- UI: Checkboxes for Leaderboard visibility, Comment permissions
- Database: NOT connected
- Logic: NOT implemented
- Status: Stub only

**Fix**: Implement fully
- Connect to database
- Enforce leaderboard visibility setting
- Implement comment permissions (if comments added)

---

### 3. Reputation/Rating Updates
**Current State**:
- Database fields exist: `reputation_score`, `debates_won`, `debates_participated`, `delo_rating`
- Updates: NOT implemented
- Logic: No triggers or updates on judgment creation
- Status: Stub only

**Fix**: Either remove or implement
- Option A: Remove fields and related logic
- Option B: Implement contribution-based scoring
- See: feature-transformation-map.md

---

## CLEANUP TASKS

### Database Fields to Remove (Eventually)
```sql
-- debates table
ALTER TABLE debates DROP COLUMN winner_id;

-- profiles table (if removing rating system)
ALTER TABLE profiles DROP COLUMN delo_rating;

-- Consider after migration
ALTER TABLE debates DROP COLUMN for_participant;
ALTER TABLE debates DROP COLUMN against_participant;

-- arguments table (if migrating to contributions)
ALTER TABLE arguments DROP COLUMN position;
ALTER TABLE arguments DROP COLUMN round;
```

### API Endpoints to Remove/Modify
```
❌ /api/judge - Modify (rewrite judgment logic)
❓ Others? (check for unused endpoints)
```

### UI Components to Remove/Modify
```
❌ DebateActions.tsx - Modify for new model
❌ "Argue FOR/AGAINST" buttons - Remove
❌ Judge reasoning display - Modify
❌ Leaderboard wins column - Remove
❌ Debate status badges - Modify
```

### Routes to Rename/Migrate
```
/debates → /conversations (or parallel)
/debates/create → /conversations/start
/debates/[id] → /conversations/[id]
```

---

## REMOVAL PRIORITY

### Phase 1 (Now) - Just Modify Terminology
- No database changes
- Update copy/messaging
- UI text updates
- Low risk, high impact on user perception

### Phase 2 (Soon) - Remove Competitive Metrics
- Remove win rate display
- Stop showing "Wins" column
- Remove judgment "winner" badge
- Update leaderboard metrics
- Low-medium effort, high impact

### Phase 3 (Next) - Structural Changes
- Remove FOR/AGAINST positions
- Redesign judgment system
- Redesign leaderboard
- Enable multi-round conversations
- High effort, high impact

### Phase 4 (Future) - Optional Cleanup
- Remove obsolete database fields
- Archive historical debates
- Full namespace migration (debates → conversations)
- Add new social features

---

## DEPRECATION COMMUNICATION

### User Messaging:
- Announce changes clearly
- Explain new philosophy
- Provide transition period
- Celebrate new approach

### Timeline Example:
1. **Week 1-2**: Announce changes in email/login banner
2. **Week 3-4**: Gradually update UI (dual messaging)
3. **Week 5-6**: Full transition to new terminology
4. **Week 7-8**: Remove old UI elements
5. **Month 3+**: Archive old debates, historical view only

---

## REGRESSION TESTING NEEDED

### Tests to Update/Add:
- Judgment creation logic (rewrite prompt tests)
- Score display (remove winner badge tests)
- Leaderboard sorting (new metric tests)
- Profile page (add edit form tests)
- Join flow (update position-based tests)

---

## MIGRATION DATA HANDLING

### Option 1: Archive Historical Debates
```
- Mark all existing debates as "archived"
- Show in read-only historical view
- Don't include in main browse/discovery
- Show migration message: "These debates were created under our competitive model"
```

### Option 2: Attempt to Migrate
```
- Convert FOR/AGAINST positions to "Contributed FOR view" / "Contributed AGAINST view"
- Keep as multi-perspective conversation
- Risk: Loses original structure/intent
```

### Recommendation**: Option 1 (Archive)
- Cleaner solution
- Respects original context
- Allows fresh start with new philosophy

---

