# Branding & Terminology Audit: Complete Inventory

**Last Updated:** November 14, 2025
**Scope:** Complete codebase audit - UI, database, API, documentation

---

## EXECUTIVE SUMMARY

The codebase is deeply embedded with competitive debate terminology across all layers:
- **Database layer**: Core schema (debates_won, for_participant, against_participant, winner_id)
- **UI layer**: 1,035+ occurrences of "debate" and variants
- **Branding**: Mixed "ARGUED" (new) and "PhiloDuel" (old) terminology
- **Language**: Heavy use of competitive framing ("win", "judge", "opponent")

**Effort Level:** MAJOR - affects database, API, UI components, and documentation
**Recommendation:** Phased approach starting with UI/copywriting, then database refactoring

---

## 1. APP BRANDING

### 1.1 "ARGUED" (Current App Name)

**Term:** ARGUED
**Occurrences:** ~50 instances across codebase
**Status:** New brand name (being implemented)
**Locations:**
- `preview/landing-page-new.html` - 7 occurrences
- `preview/landing-premium.html` - 6 occurrences
- `docs/ARGUED_*.md` - 40+ occurrences
- `components/ui/LeaderboardRow.tsx` - Comment header
- `components/ui/Sidebar.tsx` - Line 66 (alt text)
- `components/templates/DashboardTemplate.tsx` - Line 2 (comment)
- `components/ui/Header.tsx` - Line 48 (alt text)
- Multiple component headers and comments

**Context:**
- Landing page branding
- Documentation and guides
- Component comments referencing ARGUED branding
- UI comments mentioning ARGUED styling

**Severity:** HIGH - Company brand name
**Effort to Change:** HARD
**Issue:** ARGUED name fundamentally contradicts collaborative conversation vision. Research shows it signals "winning debates" not "thoughtful dialogue."

**Current Recommendation:** Consider renaming ARGUED as per `research/NEW_Aligned_Research/name-evaluation.md` which concludes: "ARGUED does not fit the conversation-first vision" (92% of users associate it with competitive arguing/fighting)

---

### 1.2 "PhiloDuel" (Legacy App Name)

**Term:** PhiloDuel
**Occurrences:** ~50 instances across codebase
**Status:** Legacy/outdated name being phased out
**Locations:**
- `DEPLOYMENT.md` - Line 1, 15
- `README.md` - Line 1
- `supabase/README.md` - Line 1
- `components/Sidebar.tsx` - Line 51
- `app/layout.tsx` - Line 12 (metadata title)
- `components/Logo.tsx` - Line 29
- `app/about/page.tsx` - Line 8, 14
- `research/landing-page.html` - Multiple occurrences
- Research documents - 30+ references

**Context:**
- Page titles and metadata
- Navigation components
- Documentation and guides
- Research references

**Severity:** HIGH - Creating brand confusion
**Effort to Change:** MEDIUM
**Issue:** Inconsistent branding - site shows "ARGUED" in landing pages but "PhiloDuel" in:
  - Layout metadata (app/layout.tsx line 12)
  - Logo alt text
  - About page
  - Old documentation

**Database:** Not embedded in database layer (good!)

**Action:** Complete replacement of "PhiloDuel" with "ARGUED" OR chosen alternative brand name

---

## 2. DEBATE-CENTRIC TERMINOLOGY

### 2.1 "Debate" / "Debates" / "Debating"

**Term:** debate/debates/debating (case-insensitive)
**Occurrences:** 1,035 total occurrences across 100+ files
**Severity:** CRITICAL - Most prevalent term
**Impact Areas:** Database, UI, API, Documentation, File paths

#### Database Layer (23 occurrences in schema)
**Files:**
- `supabase/migrations/20250113_init.sql`
  - Line 15: `CREATE TABLE debates`
  - Line 20: `status TEXT DEFAULT 'open'`
  - Line 24: `winner_id UUID` (references debates table)
  - Line 25: `completed_at` timestamp
  - Lines 23: `against_participant` field

- `lib/database.types.ts`
  - Lines 47-83: Full `debates` table type definition
  - Table name is hardcoded throughout

**Critical Issue:** Table name `debates` used in 23+ locations in schema and migrations. Changing requires:
  1. Migration to rename table
  2. Updates to all queries
  3. Type generation updates
  4. Client code updates

#### API Layer (15 occurrences)
**Files:**
- `app/api/judge/route.ts` - Lines 14-40 (all debate judging logic)
- `app/(authenticated)/debates/[id]/DebateActions.tsx`
- `app/(authenticated)/debates/create/page.tsx`

#### UI/Components Layer (22 occurrences)
**Files:**
- `app/(authenticated)/debates/page.tsx` - Line 44: "Active Debates" heading
- `components/ui/DebateCard.tsx` - Dedicated component for debate cards
- `components/templates/SingleDebateTemplate.tsx`
- `app/(authenticated)/debates/[id]/page.tsx`

#### Route/URL Structure (Multiple)
- `/debates/` - Page route
- `/debates/create` - Creation route
- `/debates/[id]` - Detail route
- `/leaderboard` - Shows debate wins
- `/profile` - Shows debate stats

**Effort to Change:** EXTREMELY HARD
- Database table rename requires migration
- 1,000+ code references to update
- API routes need restructuring
- UI paths and components need renaming
- Testing infrastructure needs updates

**Recommended Replacement:** "conversation", "discussion", "forum", or "thread"
**Suggested Alternative Phrasing:**
- "Active Discussions" (instead of "Active Debates")
- "Start a Conversation" (instead of "Create Debate")
- "Discussion Topics" (instead of "Debate Topics")

---

### 2.2 "Argument" / "Arguments"

**Term:** argument/arguments
**Occurrences:** 987 total occurrences across 90 files
**Severity:** CRITICAL - Second most prevalent term

#### Database Layer (7 occurrences)
**Files:**
- `supabase/migrations/20250113_init.sql`
  - Line 29: `CREATE TABLE arguments`
  - Lines 30-37: Full table definition
  - Position field: `position TEXT NOT NULL CHECK (position IN ('for', 'against'))`

- `lib/database.types.ts`
  - Lines 85-112: Full `arguments` table type

**Key Issue:** "arguments" table is core to data model. References appear in:
- Content storage and retrieval
- Display formatting
- Search and filtering
- Judgment logic

#### UI/Comments Layer (41+ occurrences in research/argument-visualization.md)
**Files:**
- `research/argument-visualization.md` - 41 occurrences
  - Entire document about visualizing arguments
- `app/(authenticated)/debates/page.tsx` - Line 75: "arguments" counter
- Multiple component comments

#### API References (4+ occurrences)
- Argument submission endpoints
- Argument retrieval logic
- Argument judging logic

**Effort to Change:** EXTREMELY HARD
- Table rename with migration required
- Core data model restructuring
- All query logic needs updates
- Display components need refactoring

**Recommended Replacements:**
- "contributions" - neutral, collaborative
- "perspectives" - emphasizes viewpoints
- "responses" - indicates participation
- "points" - philosophical usage

**Example Reframing:**
```
OLD: "Submit your argument for why..."
NEW: "Share your perspective on why..."
    OR "Contribute your thinking on..."
```

---

### 2.3 "Position" (for / against)

**Term:** position field with values 'for', 'against'
**Occurrences:** 10+ database occurrences, 5+ code references
**Severity:** MEDIUM - Less visible but core to data model

**Database:**
- `supabase/migrations/20250113_init.sql` - Line 34: `position TEXT NOT NULL CHECK (position IN ('for', 'against'))`
- `lib/database.types.ts` - Lines 90, 99, 108: Type definitions

**Code:**
- `app/(authenticated)/debates/[id]/DebateActions.tsx` - Line 31: Position logic
- Database queries checking 'for' and 'against' positions

**Issue:** This is binary thinking - implies opposition/sides

**Recommended Replacement:**
- Use single model without "vs" framing
- OR rename to "perspective_type" with options like: "primary", "response", "counterpoint"
- OR track conversation flow without "sides"

---

## 3. COMPETITIVE/RANKING TERMINOLOGY

### 3.1 "Judge" / "Judging" / "Judgment"

**Term:** judge/judging/judgment/judged
**Occurrences:** 268 total occurrences across 56 files
**Severity:** CRITICAL - Core to evaluation system
**Issues:** Implies legal/authoritative judgment rather than facilitation

#### Database Layer (5 occurrences)
**Files:**
- `supabase/migrations/20250113_init.sql`
  - Line 40: `CREATE TABLE judgments`
  - Lines 40-49: Judgment table definition
  - Line 44: `winner_position` field
  - Line 45: `reasoning` field
  - Line 47: `scores` JSONB

- `lib/database.types.ts` - Lines 114-142: Full judgment type

#### API/Core Logic (15 occurrences)
**Files:**
- `app/api/judge/route.ts` - 15 occurrences
  - Line 1: `/api/judge` endpoint
  - AI judgment logic
  - Score calculation
  - Winner determination
  - Feedback generation

#### Documentation (40+ occurrences)
- `docs/ARGUED_Branding_Philosophy_Guide.md` - Lines 82, 92, 105
- `docs/ARGUED_Implementation_Roadmap.md` - Multiple references
- `research/gamification-framework.md` - 3+ occurrences
- `research/competition-formats.md` - 9+ occurrences

**Effort to Change:** HARD
- API route needs renaming (`/api/judge` → `/api/evaluate` or `/api/facilitate`)
- Table name change required
- All judgment-related logic needs renaming
- Documentation extensive

**Recommended Replacements:**
- "evaluate" - neutral assessment
- "facilitate" - suggests guidance
- "assess" - implies thoughtful review
- "reflect" - philosophical angle
- "guide" - collaborative framing

**Example Reframing:**
```
OLD: "The system judges your arguments"
NEW: "The system evaluates your contribution"
    OR "Our AI facilitates dialogue reflection"
```

---

### 3.2 DeLO Rating System

**Term:** DeLO (Debate Elo)
**Occurrences:** 179 occurrences across 31 files
**Status:** Competitive rating system name
**Severity:** HIGH - Branding for rating system

#### Database (3 occurrences)
**Files:**
- `supabase/migrations/20250114_add_delo_rating.sql`
  - Adds `delo_rating` column to profiles
  - Default value: 1000
  - COMMENT: "DeLO (Debate Elo) rating system"

#### UI Components (3+ occurrences)
**Files:**
- `components/ui/LeaderboardRow.tsx` - Lines 85-87
  - Displays "DeLO" rating
- `components/ui/Sidebar.tsx` - Shows user DeLO
- `components/templates/DashboardTemplate.tsx` - Line 58

#### Documentation (40+ occurrences)
- `research/progression-systems.md` - 45 occurrences
- `research/gamification-framework.md` - 24+ occurrences
- Multiple reference docs

#### Leaderboard/Profile Views (6+ occurrences)
- `app/(authenticated)/leaderboard/page.tsx`
- `app/(authenticated)/profile/page.tsx`

**Effort to Change:** MEDIUM
- Rename column in database (can be aliased initially)
- Update UI components (11 files)
- Update documentation (40+ files - mostly research, lower priority)
- Update references throughout

**Recommended Replacement:** 
- "Insight Score" - reflects quality thinking
- "Dialogue Rating" - collaborative framing
- "Contribution Score" - emphasizes participation
- "Wisdom Index" - philosophical angle

**Why:** "DeLO" explicitly references "Debate Elo" - when you rebrand away from debates, this name contradicts the new positioning.

---

### 3.3 Wins/Losses/Winners/Victory/Defeat

**Term:** win/won/winner/lost/loss/victory/defeat/champion
**Occurrences:** 796 total occurrences across 100+ files
**Severity:** CRITICAL - Core competitive framing

#### Database (4 occurrences)
**Files:**
- `supabase/migrations/20250113_init.sql`
  - Line 8: `debates_won INTEGER DEFAULT 0`
  - Line 24: `winner_id UUID`
  - Line 136: Updates `debates_won` on completion
  - Reputation logic tied to winning

- `lib/database.types.ts`
  - Lines 19, 30, 41: `debates_won` field
  - Line 56: `winner_id` field in debates

#### UI Components (8+ occurrences)
**Files:**
- `app/(authenticated)/profile/page.tsx`
  - Line 78: Displays `debates_won`
  - Line 84: Calculates win percentage
- `app/(authenticated)/leaderboard/page.tsx`
  - Line 206, 299: Shows `debates_won`
  - Lines 66, 79, 81: Uses debates_won in filtering/display
- Leaderboard shows win counts prominently

#### Documentation (lots)
- `research/gamification-framework.md` - "Grand Tournament Champion", undefeated badges
- `docs/ARGUED_Branding_Philosophy_Guide.md` - Lines 82, 92, 105
- `research/progression-systems.md` - "Undefeated" badge at 20 straight wins

#### Landing Pages
- `preview/landing-page-new.html` - Line 449: "Focus on insight, not victory"
- `preview/landing-premium.html` - Line 663: "truth-seeking, not victory"

**Effort to Change:** VERY HARD
- Column rename: `debates_won` → `discussions_participated` or `contributions_made`
- All display logic needs updating
- Calculation logic needs reframing
- Badges/achievements mention wins
- Leaderboard logic depends on wins
- Profile page win percentage calculation

**Recommended Replacements:**
- Remove "won/lost" framing entirely
- Instead: "contributions_made", "discussions_participated", "insights_shared"
- For leaderboard: Sort by quality indicators (rating score), not win count
- For achievements: "100 meaningful contributions" not "100 wins"

**Example Reframing:**
```
OLD: "You've won 47 debates (68% win rate)"
NEW: "You've contributed to 47 discussions"
OR:  "You've shared 47 insights"
OR:  "Your discussions average 1,450 DeLO rating"
```

---

### 3.4 "Opponent" / "Opposition"

**Term:** opponent/opponents/opposition
**Occurrences:** 77 occurrences across 27 files
**Severity:** MEDIUM-HIGH - Implies adversarial relationship

**Code References (3+ occurrences):**
- `research/community-patterns.md` - Line 231: "Steel Man Specialist (strengthens opponent arguments)"
- `research/moderation-philosophy.md` - Line 347: "Your argument appears to misrepresent the opponent's position"
- `research/premium-features.md` - Lines 159-160: "Historical performance vs. this opponent"

**Database:**
- `supabase/migrations/20250113_init.sql` - Uses "for_participant" / "against_participant" not "opponent"
- `app/api/judge/route.ts` - References "opponent" logic

**Documentation:**
- `docs/ARGUED_Branding_Philosophy_Guide.md` - Lines 82, 92, 295: "your opponent"
- `research/gamification-framework.md` - Line 60: "Peer matchups (beating higher-rated opponent)"

**Effort to Change:** MEDIUM
- Update variable/field names (easy in code)
- Rewrite documentation (medium)
- Update UX copy (easy)

**Recommended Replacement:**
- "conversation partner" - collaborative
- "participant" - neutral
- "other contributor" - emphasizes collaboration
- "dialogue partner" - philosophical

**Example:**
```
OLD: "Beat your opponent on Logic"
NEW: "You provided stronger logical reasoning"
    OR "You engaged thoughtfully with your partner"
```

---

## 4. DATABASE & API STRUCTURE

### 4.1 Table: "debates"

**Location:** `supabase/migrations/20250113_init.sql` (Lines 15-27)
**Type Definition:** `lib/database.types.ts` (Lines 47-83)
**References:** 22+ locations using this table

**Schema:**
```
- id (UUID) - Primary key
- topic (TEXT) - What the debate is about
- description (TEXT)
- status (TEXT) - 'open' | 'in_progress' | 'completed'
- created_by (UUID) - Creator
- for_participant (UUID) - "Pro" side participant
- against_participant (UUID) - "Con" side participant
- winner_id (UUID) - Who won
- created_at (TIMESTAMP)
- completed_at (TIMESTAMP)
```

**Issues:**
1. Table name "debates" is fundamentally competitive
2. "for_participant" / "against_participant" implies sides/opposition
3. "winner_id" implies winning/losing
4. "status" includes competitive progression

**Recommended Refactor:**
```
Rename table to: "discussions" or "conversations"

Schema becomes:
- id (UUID)
- topic (TEXT)
- description (TEXT)
- status (TEXT) - 'open' | 'active' | 'closed'
- created_by (UUID)
- participant_1 (UUID)
- participant_2 (UUID) / OR participants (ARRAY/junction table)
- facilitator_rating (don't store winner)
- created_at
- updated_at
```

---

### 4.2 Table: "arguments"

**Location:** `supabase/migrations/20250113_init.sql` (Lines 29-38)
**Type Definition:** `lib/database.types.ts` (Lines 85-112)
**References:** 7+ locations

**Schema:**
```
- id (UUID)
- debate_id (UUID) - References "debates" table
- user_id (UUID) - Author
- position (TEXT) - 'for' | 'against'
- content (TEXT)
- round (INTEGER)
- created_at (TIMESTAMP)
```

**Issues:**
1. Table name "arguments" is adversarial
2. "position" field enforces binary thinking
3. "debate_id" reference

**Recommended Refactor:**
```
Rename to: "contributions" or "perspectives"

Schema becomes:
- id (UUID)
- discussion_id (UUID) / conversation_id (UUID)
- user_id (UUID)
- contribution_type (TEXT) - 'primary' | 'response' | 'reflection'
- content (TEXT)
- sequence (INTEGER) - Instead of "round"
- created_at
- updated_at
```

---

### 4.3 Table: "judgments"

**Location:** `supabase/migrations/20250113_init.sql` (Lines 40-49)
**Type Definition:** `lib/database.types.ts` (Lines 114-142)
**References:** 2+ locations

**Schema:**
```
- id (UUID)
- debate_id (UUID)
- winner_position (TEXT) - 'for' | 'against' | 'tie'
- reasoning (TEXT)
- fact_checks (JSONB)
- scores (JSONB) - Breakdown of scoring
- created_at (TIMESTAMP)
```

**Issues:**
1. Table name "judgments" is authoritative/legal
2. "winner_position" field assumes one side wins
3. Entire concept conflicts with collaborative positioning

**Recommended Refactor:**
```
Rename to: "evaluations" or "reflections" or "guidance"

Schema becomes:
- id (UUID)
- discussion_id (UUID)
- evaluation_type (TEXT) - 'ai_assessment' | 'community_feedback'
- analysis (TEXT) - Instead of "reasoning"
- quality_scores (JSONB) - Break down by criteria without "winner"
  * logical_rigor
  * evidence_quality
  * clarity
  * relevance
  * openness_to_dialogue
- created_at
```

---

### 4.4 Profile Fields: "debates_won"

**Location:** `supabase/migrations/20250113_init.sql` (Line 8)
**Type Definition:** `lib/database.types.ts` (Lines 19, 30, 41)
**UI References:** `app/(authenticated)/profile/page.tsx`, `app/(authenticated)/leaderboard/page.tsx`

**Issue:** `debates_won` implies competitive winning

**Recommended Refactor:**
```
Rename to: "discussions_contributed" or "contributions_made"
Type: INTEGER DEFAULT 0

Logic changes:
- No longer +1 on "winning"
- Instead: +1 for participating in any discussion
- OR track "contribution_quality_average" as rating metric
```

---

## 5. API ENDPOINTS

### 5.1 `/api/judge` Route

**Location:** `app/api/judge/route.ts`
**Occurrences:** 15 references in this file
**Severity:** CRITICAL - Core evaluation endpoint

**Current Endpoint:**
```
POST /api/judge
Purpose: AI judges debate outcome, determines winner
```

**Recommended Change:**
```
POST /api/evaluate (or /api/assess, /api/reflect, /api/facilitate)
Purpose: AI evaluates discussion, provides quality feedback
```

**Code Changes Required:**
- Endpoint URL rename
- Response structure (no "winner")
- Response messaging (no "you won/lost")
- Database operations (no winner_id update)

---

## 6. UI PATHS & ROUTES

### Current Routes (Debate-centric)
```
/debates - List of debates
/debates/create - Create new debate
/debates/[id] - View debate detail
```

### Recommended Routes (Discussion-centric)
```
/discussions - List of discussions
/discussions/create - Start conversation
/discussions/[id] - View discussion detail
OR
/conversations - More user-friendly
/forum - Community-oriented
```

**Files to Change:**
- `app/(authenticated)/debates/page.tsx` (22 occurrences)
- `app/(authenticated)/debates/create/page.tsx` (7 occurrences)
- `app/(authenticated)/debates/[id]/page.tsx` (32 occurrences)
- All navigation references
- Links in components

---

## 7. COMPONENT-LEVEL TERMINOLOGY

### 7.1 DebateCard Component
**Location:** `components/ui/DebateCard.tsx`
**Status:** Dedicated component for debate cards
**Recommended:** Rename to `DiscussionCard.tsx` or `ConversationCard.tsx`
**Impact:** Props, display logic, styling

### 7.2 Components with "Debate" in Name/Comments
- `components/ui/DebateCard.tsx`
- `components/templates/SingleDebateTemplate.tsx`
- `components/templates/DebatesListTemplate.tsx`
- `app/(authenticated)/debates/[id]/DebateActions.tsx`

**All require:** Renaming, comment updates, path updates

---

## 8. DOCUMENTATION & RESEARCH

### Documentation Files (40+ research files reference competitive terms)
- `research/argument-visualization.md` - 41 occurrences of "argument"
- `research/gamification-framework.md` - 48 occurrences of "debate"
- `research/competition-formats.md` - 33 occurrences of "debate"
- `research/progression-systems.md` - 42 occurrences of "debate"

### Lower Priority (Research/background documents)
- These can be refactored after core product changes
- Document all terminology changes in one place for future reference

---

## 9. CONFIGURATION & ENVIRONMENT

### Branding References in Code Comments
- Nearly all component files have "ARGUED" in header comments
- Sidebar components reference "ARGUED" styling
- Button components mention "ARGUED" defaults

**Priority:** LOW - These are internal; easy to update

### Color/Styling Variables
- `tailwind.config.ts` references "argued-navy", "argued-brown", etc.
- Can be renamed alongside branding if needed

---

## 10. SEVERITY MATRIX

| Term | Database | API | UI | Documentation | Est. Files | Effort |
|------|----------|-----|----|----|--------------|--------|
| debate/debates | TABLE | 3+ | 22+ | 40+ | 80+ | EXTREME |
| argument/arguments | TABLE | 3+ | 5+ | 40+ | 50+ | EXTREME |
| judge/judging | TABLE | CORE | 5+ | 20+ | 15+ | HARD |
| DeLO | COLUMN | 2+ | 3+ | 40+ | 31 | MEDIUM |
| win/won/winner | COLUMN | 3+ | 8+ | 15+ | 20+ | HARD |
| opponent | CODE | 2+ | 2+ | 10+ | 15 | MEDIUM |
| for/against | COLUMN | 1+ | 2+ | 5+ | 5 | HARD |

---

## 11. CHANGE IMPACT SUMMARY

### Easiest to Change (MEDIUM effort)
- Component comments and documentation
- Competitive terminology in research docs
- "DeLO" → new rating system name
- "Opponent" → "participant" or "partner"

### Hard to Change (HARD effort)
- Page routes and URLs
- `/api/judge` endpoint
- Judge/Judgment terminology
- Debates_won column and calculations
- "for/against" position logic

### Most Difficult (EXTREME effort)
- "debates" table rename (1,000+ references)
- "arguments" table rename (900+ references)
- Competitive language throughout system

---

## NEXT STEPS

1. **Phase 1 (Quick Wins):** Update terminology in documentation and comments
2. **Phase 2 (Medium):** Update rating system name (DeLO → new name)
3. **Phase 3 (Hard):** Update API endpoints and routes
4. **Phase 4 (Extreme):** Database refactoring if needed (debates/arguments tables)

See `find-and-replace-map.md` for detailed mapping of old → new terms.
See `rebrand-effort-estimate.md` for detailed effort breakdown.

