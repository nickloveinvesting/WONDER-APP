# Find & Replace Mapping: Old → New Terminology

**Purpose:** Quick reference guide for rebranding search/replace operations
**Recommendation:** Use with caution - test thoroughly in version control before bulk replacing

---

## PRIORITY 1: IMMEDIATE REPLACEMENTS (No Database Changes)

### Branding & App Name
```
SEARCH:    PhiloDuel
REPLACE:   [CHOSEN_NEW_NAME] or ARGUED (if staying)
SCOPE:     All files except research docs
FILES:     app/layout.tsx, components/Logo.tsx, components/Sidebar.tsx, 
           README.md, DEPLOYMENT.md, docs/*, preview/*
COUNT:     ~50 occurrences
EFFORT:    EASY (search/replace, no logic changes)
RISK:      LOW
```

### Component & File Header Comments
```
SEARCH:    * ARGUED
REPLACE:   * [NEW_BRAND_NAME]
SCOPE:     Component header comments
FILES:     All component files in components/ui/ and components/templates/
COUNT:     ~18 occurrences
EFFORT:    EASY
RISK:      NONE (comments only)
```

---

## PRIORITY 2: TERMINOLOGY REFRAMING (UI/UX Layer)

### Rating System
```
SEARCH:    DeLO
REPLACE:   Insight Score (or: Dialogue Rating, Contribution Score, Wisdom Index)
SCOPE:     UI displays, component props, documentation
FILES:     
  - components/ui/LeaderboardRow.tsx (3 occurrences)
  - components/ui/Sidebar.tsx (1 occurrence)
  - components/templates/DashboardTemplate.tsx (1 occurrence)
  - app/(authenticated)/profile/page.tsx (1 occurrence)
  - app/(authenticated)/leaderboard/page.tsx (6 occurrences)
  - docs/ARGUED_* files (4 occurrences)
COUNT:     ~15 UI/code occurrences + 40+ documentation references
EFFORT:    MEDIUM
RISK:      MEDIUM (need to update label display logic)

EXAMPLE:
  OLD: <span>DeLO: {user.delo_rating}</span>
  NEW: <span>Insight Score: {user.insight_score}</span>

DB COLUMN ALIAS:
  OLD: SELECT delo_rating FROM profiles
  NEW: SELECT delo_rating AS insight_score FROM profiles
```

### Competitive Language - UI Copy
```
SEARCH:    You won this debate
REPLACE:   Your perspective was rated highly
SCOPE:     Feedback messages, notifications, results pages
EFFORT:    MEDIUM (find exact phrases)
RISK:      MEDIUM (message meaning changes significantly)

EXAMPLE:
  OLD: "Congratulations! You won this debate."
  NEW: "Your contribution earned a strong evaluation."
```

### Opponent → Participant/Partner
```
SEARCH:    opponent|opponents
REPLACE:   conversation partner (or: participant, other contributor)
SCOPE:     Documentation, premium features descriptions, moderation rules
FILES:
  - research/community-patterns.md (231, 586)
  - research/premium-features.md (159-160)
  - docs/ARGUED_Branding_Philosophy_Guide.md (82, 92, 295)
  - research/moderation-philosophy.md (347)
COUNT:     ~15 occurrences in active files
EFFORT:    MEDIUM
RISK:      MEDIUM (changes meaning/implications)

EXAMPLE:
  OLD: "The system finds you an opponent at your skill level"
  NEW: "The system connects you with a conversation partner at your level"
```

---

## PRIORITY 3: HARD REWRITES (Code Logic Changes)

### Routes & URL Structure
```
CURRENT PATHS:        RECOMMENDED REPLACEMENT:
/debates              /discussions (or /conversations, /forum)
/debates/create       /discussions/create
/debates/[id]         /discussions/[id]
/debates/[id]/...     /discussions/[id]/...

FILES AFFECTED:
  - app/(authenticated)/debates/ (entire folder)
  - Navigation components linking to debates
  - Links in templates and components
  - API route references
  
EFFORT:    HARD
RISK:      HIGH (routing changes affect entire navigation)
NOTES:     Consider using Next.js redirects for backward compatibility
```

### API Endpoint Rename
```
CURRENT:   POST /api/judge
NEW:       POST /api/evaluate (or /api/assess, /api/reflect)

CHANGES:
  1. File rename: app/api/judge/route.ts → app/api/evaluate/route.ts
  2. Update all fetch calls to new endpoint
  3. Update response structure (remove winner determination)
  4. Update database operations (don't set winner_id)
  5. Update AI prompt/response generation
  
AFFECTED FILES:
  - app/api/judge/route.ts
  - Any client components calling /api/judge
  - Tests and documentation
  
EFFORT:    HARD
RISK:      HIGH (core API change)
```

### Victory/Defeat/Win Language in Messages
```
SEARCH:    (win|won|lost|defeat|victory|champion)
REPLACE:   (Based on context - see examples below)
SCOPE:     User-facing messages, achievement descriptions, feedback
EFFORT:    HARD (requires context-aware replacement)
RISK:      HIGH (significantly changes user perception)

EXAMPLES:
  OLD: "Congratulations! You've won 47 debates"
  NEW: "You've contributed to 47 discussions"
  
  OLD: "Undefeated Champion"
  NEW: "Top Contributor"
  
  OLD: "20 straight wins"
  NEW: "20 consecutive discussions"
```

---

## PRIORITY 4: DATABASE MIGRATION (Requires Downtime)

### Table Rename: debates → discussions
```
CURRENT TABLE:   debates
NEW TABLE:       discussions (or: conversations, forum_topics)
REFERENCES:      1,035+ occurrences

MIGRATION STRATEGY:
  1. Create new migration file (e.g., 20250115_rename_debates_to_discussions.sql)
  2. ALTER TABLE debates RENAME TO discussions;
  3. Regenerate lib/database.types.ts
  4. Update ALL queries in code
  5. Update component/route references
  6. Test thoroughly in staging

AFFECTED FILES (20+):
  - supabase/migrations/20250113_init.sql (references in comments)
  - lib/database.types.ts (export all Table: discussions)
  - All query files using .from('debates')
  - Route handlers and API endpoints
  - Component props and state management
  - Tests

EFFORT:    EXTREME
RISK:      CRITICAL (affects core data model)
TIMELINE:  Major refactor, multiple PR reviews
```

### Table Rename: arguments → contributions
```
CURRENT TABLE:   arguments
NEW TABLE:       contributions (or: perspectives, responses)
REFERENCES:      987+ occurrences

MIGRATION STRATEGY:
  1. Create new migration file
  2. ALTER TABLE arguments RENAME TO contributions;
  3. Rename foreign key constraint: debate_id → discussion_id
  4. Regenerate lib/database.types.ts
  5. Update ALL queries
  6. Update type definitions and imports
  7. Test thoroughly

AFFECTED FILES (15+):
  - supabase/migrations/20250113_init.sql
  - lib/database.types.ts
  - All query files using .from('arguments')
  - API endpoints for argument submission/retrieval
  - Components displaying arguments
  - Type definitions

EFFORT:    EXTREME
RISK:      CRITICAL
TIMELINE:  Major refactor, coordinate with debates → discussions
```

### Column Rename: debates_won → discussions_participated
```
CURRENT COLUMN:  profiles.debates_won
NEW COLUMN:      profiles.discussions_participated (or: contributions_made)
REFERENCES:      7 locations (database, types, UI)

MIGRATION STRATEGY:
  1. Create migration: ALTER TABLE profiles RENAME COLUMN debates_won TO discussions_participated;
  2. Update migration triggers and functions
  3. Regenerate lib/database.types.ts
  4. Update all SELECT statements
  5. Update UI display logic (remove win percentage calculation)
  6. Update leaderboard sorting (may want to sort by rating, not count)

AFFECTED FILES (7+):
  - supabase/migrations/20250113_init.sql (trigger function)
  - lib/database.types.ts (profile type)
  - app/(authenticated)/profile/page.tsx (display logic)
  - app/(authenticated)/leaderboard/page.tsx (sorting and display)
  - components/templates/DashboardTemplate.tsx

EFFORT:    HARD
RISK:      MEDIUM (column rename is safer than table rename)
TIMELINE:  ~3-5 changes, moderate testing
```

### Column Rename: winner_id → top_contributor_id (or remove)
```
CURRENT COLUMN:  debates.winner_id
NEW APPROACH:    Option 1 - Rename to leader_id / featured_contributor_id
                 Option 2 - Remove entirely (don't track winners)

DECISION NEEDED: Should you still track a "best" contribution?
  - If YES: Rename and refactor feedback logic
  - If NO: Remove column and simplify judgment logic

If renaming:
  1. Migration: ALTER TABLE debates RENAME COLUMN winner_id TO featured_contributor_id
  2. Update triggers (no longer +1 for "winning")
  3. Update judgment logic (don't determine winner)
  4. Update display (show contribution stats, not winner)

AFFECTED FILES (5+):
  - supabase/migrations/20250113_init.sql
  - lib/database.types.ts
  - app/api/judge/route.ts (judgment logic)
  - Database triggers and functions

EFFORT:    HARD
RISK:      HIGH (affects core judgment system)
```

### Column: position 'for'/'against' → rethink
```
CURRENT DESIGN:  position ENUM ('for', 'against')
                 Implies binary opposition

RECOMMENDED:    Option 1 - Remove sides, track conversation flow
               Option 2 - Rename to contribution_type
                         VALUES: 'opening', 'response', 'reflection', 'synthesis'

DECISION NEEDED: Do you want to keep debate structure (sides)?
  - If YES: Rename position field and values
  - If NO: Redesign to single-conversation model

EFFORT:    EXTREME (design change)
RISK:      CRITICAL (affects data model philosophy)
```

---

## PRIORITY 5: TABLE RENAME - judgments → evaluations

```
CURRENT TABLE:   judgments
NEW TABLE:       evaluations (or: reflections, assessments)

Also rename columns:
  winner_position → evaluation_result / primary_evaluation
  reasoning → analysis
  
MIGRATION:
  1. Create migration
  2. ALTER TABLE judgments RENAME TO evaluations;
  3. ALTER TABLE evaluations RENAME COLUMN winner_position TO evaluation_result;
  4. ALTER TABLE evaluations RENAME COLUMN reasoning TO analysis;
  5. Update CHECK constraint on evaluation_result values
  6. Regenerate types
  7. Update all references

AFFECTED FILES (5+):
  - supabase/migrations/20250113_init.sql
  - lib/database.types.ts
  - app/api/judge/route.ts (judgment creation)
  - Display/detail pages
  - Types and interfaces

EFFORT:    HARD
RISK:      MEDIUM
```

---

## COMPLETE REPLACEMENT MATRIX

| Old Term | Recommended New Term | Scope | Effort | Risk |
|----------|----------------------|-------|--------|------|
| PhiloDuel | ARGUED/[NEW_NAME] | All files | EASY | LOW |
| DeLO | Insight Score | UI + Docs | MEDIUM | MEDIUM |
| debates table | discussions | Database + All code | EXTREME | CRITICAL |
| arguments table | contributions | Database + All code | EXTREME | CRITICAL |
| judge/judging | evaluate/assess | API + Docs | HARD | MEDIUM |
| judgments table | evaluations | Database + Code | HARD | MEDIUM |
| debates_won | discussions_participated | DB + UI | HARD | MEDIUM |
| winner_id | top_contributor_id | DB + Logic | HARD | HIGH |
| position (for/against) | contribution_type | Database design | EXTREME | CRITICAL |
| opponent | conversation_partner | Docs + UI | MEDIUM | MEDIUM |
| You won | Strong evaluation | UI messages | HARD | MEDIUM |
| Debate | Discussion/Conversation | URLs + All code | EXTREME | CRITICAL |
| Argument | Contribution/Perspective | All layers | EXTREME | CRITICAL |
| Victory/defeat | Quality evaluation | Messages | HARD | MEDIUM |

---

## SAFE REPLACEMENT CHECKLIST

Before doing any bulk find/replace:

- [ ] Back up database
- [ ] Create feature branch
- [ ] Make changes in staging environment first
- [ ] For database changes: Create migration file
- [ ] For code changes: Update tests alongside changes
- [ ] For API changes: Update API documentation
- [ ] For UI changes: Test all user flows
- [ ] Regenerate types: `npm run generate-types` or equivalent
- [ ] Full regression test before merge
- [ ] Plan deployment strategy (may need downtime for DB migrations)

---

## RECOMMENDED IMPLEMENTATION ORDER

1. **Phase 1 (No risk):** PhiloDuel → ARGUED, code comments
2. **Phase 2 (UI only):** DeLO → Insight Score, terminology in research docs
3. **Phase 3 (Routes):** debates/ → discussions/, update all links
4. **Phase 4 (API):** /api/judge → /api/evaluate, update logic
5. **Phase 5 (Database):** Table and column renames (requires migration + testing)

---

## NOTES FOR DEVELOPERS

- Always test with a local database copy first
- Database migrations require downtime consideration
- Keep old endpoints alive with redirects if possible (backward compatibility)
- Update types after each database change
- Add feature flags for gradual rollout of major changes
- Document all terminology changes in CHANGELOG

