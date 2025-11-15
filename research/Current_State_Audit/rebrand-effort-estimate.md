# Rebrand Effort Estimate & Implementation Roadmap

**Prepared:** November 14, 2025
**Total Estimated Effort:** 6-10 weeks for complete rebrand
**Risk Level:** HIGH (affects entire system)
**Recommendation:** Phased approach with backward compatibility

---

## EFFORT BREAKDOWN BY PHASE

### PHASE 1: QUICK WINS (1-2 weeks) - LOW RISK
**Focus:** Terminology that doesn't affect database or API
**Effort:** 40-60 hours
**Risk:** LOW

#### 1.1 Consolidate Brand Name (2 days)
- Replace "PhiloDuel" with "ARGUED" or chosen new name across:
  - `app/layout.tsx` (metadata)
  - `components/Logo.tsx` (alt text)
  - `components/Sidebar.tsx`
  - `README.md`, `DEPLOYMENT.md`
  - Landing pages (`preview/*.html`)
  
**Effort:** 8-10 hours
**Files:** 7 core files + preview/docs
**Risk:** LOW (purely cosmetic)

#### 1.2 Update Code Comments & Headers (3 days)
- Component headers: "* ARGUED" → "* [NEW_BRAND]"
- Update ARGUED branding references in comments
- Standardize footer copyright notices

**Effort:** 6-8 hours
**Files:** 18+ component files
**Risk:** NONE (comments only)

#### 1.3 Rename Rating System Label (2 days)
- DeLO → "Insight Score" (or your choice)
- UI-only changes initially (database column stays same)
- Database alias: `delo_rating AS insight_score`

**Files:**
- `components/ui/LeaderboardRow.tsx`
- `components/ui/Sidebar.tsx`
- `components/templates/DashboardTemplate.tsx`
- `app/(authenticated)/profile/page.tsx`
- `app/(authenticated)/leaderboard/page.tsx`

**Effort:** 8-10 hours
**Risk:** LOW (just label changes)

**Cost Estimate:**
```
Developer: 1 person × 2 weeks × 40 hrs/week = 80 hours
QA: 1 person × 1 week (manual testing) = 40 hours
Total: ~30-40 person-hours of development
Timeline: 1-2 weeks with careful testing
```

---

### PHASE 2: TERMINOLOGY UPDATES (2-3 weeks) - MEDIUM RISK
**Focus:** UI copy and documentation changes
**Effort:** 60-90 hours
**Risk:** MEDIUM

#### 2.1 Opponent → Conversation Partner (2 days)
**Files affected:** 10-15 documentation files
- Update research docs
- Update policy/rule descriptions
- Update feature descriptions

**Effort:** 10-12 hours
**Risk:** LOW-MEDIUM (mostly documentation)

#### 2.2 Victory/Defeat → Evaluation-Based Messaging (4 days)
**Scale:** Large - affects user-facing messages
**Files affected:** Multiple
- Feedback messages after evaluation
- Achievement descriptions
- Leaderboard messaging
- Profile page copy

**New messaging examples:**
```
OLD: "You won this debate!"
NEW: "Your thinking was evaluated highly"

OLD: "47 wins (68% win rate)"
NEW: "Contributor to 47 discussions" + Insight Score: 1,450

OLD: "Undefeated 20-0 record"
NEW: "20 consecutive high-quality discussions"
```

**Effort:** 15-20 hours (context-aware rewriting)
**Risk:** MEDIUM (changes user perception)

#### 2.3 Research Documentation Updates (3 days)
- Update 40+ research files with new terminology
- Consistent language throughout
- Examples: argument-visualization.md, gamification-framework.md, progression-systems.md

**Effort:** 12-15 hours
**Risk:** LOW (background documentation)

**Cost Estimate:**
```
Developer: 1 person × 2.5 weeks = 100 hours
Content Writer: 0.5 person × 1 week = 20 hours
QA: 1 person × 0.5 weeks = 20 hours
Total: 50-60 person-hours
Timeline: 2-3 weeks
```

---

### PHASE 3: ROUTE & URL RESTRUCTURING (2-3 weeks) - HIGH RISK
**Focus:** Change URL structure from `/debates` to `/discussions`
**Effort:** 80-120 hours
**Risk:** HIGH (affects all navigation)

#### 3.1 Folder & File Rename (2 days)
```
Rename:
  app/(authenticated)/debates/ → app/(authenticated)/discussions/
  
Files:
  - page.tsx (list page)
  - create/page.tsx (creation page)
  - [id]/page.tsx (detail page)
  - [id]/DebateActions.tsx → [id]/DiscussionActions.tsx
  - [id]/DebateCard.tsx → [id]/DiscussionCard.tsx
```

**Effort:** 4-6 hours
**Risk:** MEDIUM (file structure changes)

#### 3.2 Update All Navigation & Links (3 days)
- Navigation components (all references to `/debates`)
- Template links
- Component internal links
- Action handlers
- Search/filter logic

**Effort:** 20-25 hours
**Risk:** HIGH (easy to miss references)

#### 3.3 Update Route Parameters (2 days)
- URL paths in link elements
- Dynamic route handlers
- Query parameters
- Redirect logic

**Effort:** 10-15 hours
**Risk:** MEDIUM

#### 3.4 Component Rename (2 days)
```
Rename components:
  - DebateCard.tsx → DiscussionCard.tsx
  - SingleDebateTemplate.tsx → SingleDiscussionTemplate.tsx
  - DebatesListTemplate.tsx → DiscussionsListTemplate.tsx
  - DebateActions.tsx → DiscussionActions.tsx
```

**Effort:** 8-10 hours
**Risk:** LOW (straightforward rename)

#### 3.5 Testing & QA (3 days)
- Test all navigation paths
- Test internal links
- Test routing edge cases
- Browser testing
- Mobile testing

**Effort:** 20-30 hours (QA)
**Risk:** HIGH (easy to miss broken links)

**Cost Estimate:**
```
Developer (Lead): 1 person × 2.5 weeks = 100 hours
Developer (Support): 0.5 person × 1 week = 20 hours
QA/Testing: 1 person × 1 week = 40 hours
Total: 80-100 person-hours
Timeline: 2-3 weeks
Suggestion: Use version control heavily, small commits
```

---

### PHASE 4: API ENDPOINT REFACTORING (2-3 weeks) - HIGH RISK
**Focus:** Rename `/api/judge` to `/api/evaluate` or similar
**Effort:** 80-100 hours
**Risk:** HIGH (affects core system)

#### 4.1 API Route Rename (1 day)
```
Rename:
  app/api/judge/route.ts → app/api/evaluate/route.ts
```

**Effort:** 2-4 hours
**Risk:** LOW (just rename)

#### 4.2 Update Judgment Logic (3 days)
Current logic:
- Determines "winner_position" (for/against/tie)
- Sets winner_id in database
- Generates competitive feedback

New logic:
- Evaluates quality without winner
- Provides constructive feedback
- Scores contribution criteria (logic, evidence, clarity)

**Effort:** 25-35 hours
**Risk:** HIGH (changes core algorithm)

#### 4.3 Response Structure Changes (2 days)
```
OLD RESPONSE:
{
  winner_position: 'for',
  winner_id: 'user-123',
  scores: { ... },
  reasoning: "..."
}

NEW RESPONSE:
{
  evaluation: {
    logical_rigor: 8.5,
    evidence_quality: 9.0,
    clarity: 8.2,
    relevance: 8.8,
    openness_to_dialogue: 7.5
  },
  analysis: "...",
  strengths: [...],
  growth_areas: [...]
}
```

**Effort:** 10-15 hours
**Risk:** MEDIUM (must not break clients)

#### 4.4 Client Integration Updates (3 days)
- Update all components that call `/api/judge`
- Update state management
- Update feedback display components
- Update notifications

**Effort:** 15-20 hours
**Risk:** MEDIUM

#### 4.5 Database Trigger Changes (2 days)
- Update reputation calculation (no longer based on wins)
- Update discussion_participated tracking
- Remove winner-related triggers

**Effort:** 10-15 hours
**Risk:** MEDIUM

#### 4.6 Testing & Verification (3 days)
- Unit tests for API logic
- Integration tests
- E2E flow testing
- AI response quality testing

**Effort:** 20-25 hours
**Risk:** HIGH

**Cost Estimate:**
```
Backend Developer: 1.5 people × 2.5 weeks = 150 hours
QA/Testing: 1 person × 1 week = 40 hours
ML/AI Specialist: 0.5 person × 0.5 weeks = 10 hours (AI prompt/logic review)
Total: 80-100 person-hours
Timeline: 2-3 weeks
```

---

### PHASE 5: DATABASE MIGRATION (3-4 weeks) - CRITICAL RISK
**Focus:** Core schema refactoring
**Effort:** 120-180 hours
**Risk:** CRITICAL (affects entire system, requires downtime)

#### 5.1 Table Rename: debates → discussions (1 week)

**Migration Strategy:**
```
1. Create migration file: 20250115_rename_debates_to_discussions.sql
2. Back up database
3. ALTER TABLE debates RENAME TO discussions;
4. Regenerate lib/database.types.ts
5. Update all .from('debates') to .from('discussions')
6. Update all type imports
7. Comprehensive testing
```

**Files affected:** 20+
- `supabase/migrations/*.sql` (all schema references)
- `lib/database.types.ts` (types)
- All database query files
- All API route handlers
- All components using debates table
- Tests

**Effort:** 40-60 hours
**Risk:** CRITICAL (schema change affects entire app)

#### 5.2 Table Rename: arguments → contributions (1 week)

**Parallel with debates rename:**
```
1. Create migration: 20250115_rename_arguments_to_contributions.sql
2. ALTER TABLE arguments RENAME TO contributions;
3. RENAME COLUMN debate_id TO discussion_id
4. Regenerate types
5. Update all references
6. Test thoroughly
```

**Files affected:** 15+
**Effort:** 30-50 hours
**Risk:** CRITICAL

#### 5.3 Column Renames in Profiles (3 days)
```
debates_won → discussions_participated
```

**Migration & Updates:**
- ALTER TABLE profiles RENAME COLUMN debates_won TO discussions_participated
- Update calculation logic (no longer increment on "winning")
- Update UI display
- Update leaderboard

**Effort:** 15-20 hours
**Risk:** MEDIUM

#### 5.4 Winner System Refactoring (1 week)
```
Current: debates.winner_id (UUID)
Decision: Keep or remove?
  
If removing entirely:
  - ALTER TABLE discussions DROP COLUMN winner_id
  - Remove winner-related triggers
  - Update judgment logic
  - Simplify feedback

If keeping (renamed):
  - ALTER TABLE discussions RENAME COLUMN winner_id TO top_contributor_id
  - Update triggers to not calculate based on "winning"
  - Update feedback message generation
```

**Effort:** 20-30 hours
**Risk:** HIGH

#### 5.5 Position Column Rethinking (1 week)
```
Current: arguments.position ENUM ('for', 'against')
Decision: Keep or redesign?

If keeping binary:
  - Rename to contribution_type
  - Change values to: 'opening', 'response', 'reflection'

If removing:
  - ALTER TABLE contributions DROP COLUMN position
  - Redesign conversation model
  - Update all display logic
  - Affects core data model
```

**Effort:** 30-50 hours (depends on decision)
**Risk:** CRITICAL (design decision)

#### 5.6 Judgment Table Refactor (3 days)
```
Rename table: judgments → evaluations

Rename columns:
  - winner_position → evaluation_result
  - reasoning → analysis
  - scores → quality_scores
```

**Effort:** 15-20 hours
**Risk:** MEDIUM

#### 5.7 Database Testing & Validation (1 week)
- Test migrations on staging database
- Verify all data integrity
- Test rollback procedures
- Performance testing
- Backup/restore testing

**Effort:** 30-40 hours (QA/DevOps)
**Risk:** CRITICAL

**Migration Plan:**
```
TIMELINE: 3-4 weeks total, executed in phases:

Week 1:
  - Day 1-2: Create migrations, test on local
  - Day 3-5: Run on staging, validate

Week 2:
  - Code updates to match new schema (2-3 days)
  - Comprehensive testing (2 days)

Week 3:
  - Final staging validation
  - Deploy to production (during low-traffic window)
  - Monitor closely for issues

Week 4:
  - Final cleanup, documentation
  - Address any production issues
```

**Downtime Required:**
```
Estimated: 30-60 minutes for production migration
- Add read-only mode notification
- Run migrations during lowest traffic period
- Have rollback plan ready
- Clear communication to users
```

**Cost Estimate:**
```
Database Administrator: 1 person × 3 weeks = 120 hours (planning, testing, execution)
Backend Developer: 1.5 people × 3 weeks = 180 hours (code updates)
QA/Testing: 1.5 people × 2 weeks = 120 hours (validation, regression testing)
DevOps/Infrastructure: 1 person × 1 week = 40 hours (deployment, monitoring)

Total: 120-180 person-hours
Timeline: 3-4 weeks
Suggestion: Hire external DB consultant if not confident
```

---

## TOTAL PROJECT EFFORT ESTIMATE

### Summary by Effort Level
```
Phase 1 (Quick Wins):         40-60 hours     1-2 weeks
Phase 2 (Terminology):        60-90 hours     2-3 weeks
Phase 3 (Routes):             80-120 hours    2-3 weeks
Phase 4 (API):                80-100 hours    2-3 weeks
Phase 5 (Database):          120-180 hours    3-4 weeks
                            ─────────────────────────────
TOTAL:                       380-550 hours    8-15 weeks

**Realistic estimate: 500-600 person-hours, 8-10 weeks with parallel teams**
```

### Team Recommendation
```
For optimal execution, assign:
- 2-3 Backend/Full-Stack Developers
- 1 Frontend Developer
- 1 Database Administrator
- 1 QA Engineer
- 1 DevOps Engineer (for deployment)

This allows parallel work on phases without bottlenecks.
```

### Cost Estimation (US Market Rates)
```
Assuming average rate: $150/hour (developer), $180/hour (specialist)

Development Labor:     500-600 person-hours × $150/hour = $75,000-90,000
Infrastructure Labor:  40 person-hours × $180/hour = $7,200
QA Labor:              100 person-hours × $120/hour = $12,000
Contingency (20%):     $18,840-21,840

ESTIMATED TOTAL:       $113,000-131,000
```

---

## RISK MITIGATION STRATEGIES

### Critical Risks & Mitigations

#### Risk: Database Migration Failure
**Impact:** Complete system outage
**Mitigation:**
- Full backup before migration
- Test migrations on production-like staging
- Small rollback windows
- Automated rollback scripts
- Have expert DBA present

#### Risk: Missed References in Code
**Impact:** Broken links, 404 errors, runtime errors
**Mitigation:**
- Use IDE find/replace with verification
- Write migration scripts for code changes
- Comprehensive test coverage
- Automated link testing

#### Risk: User-Facing Messaging Confusion
**Impact:** User confusion about competitive vs collaborative
**Mitigation:**
- Carefully craft transitional messaging
- In-app notification explaining changes
- Gradual rollout to subset of users first
- Feedback collection mechanism

#### Risk: Performance Regression
**Impact:** Slow loads, degraded UX
**Mitigation:**
- Database query performance testing
- Load testing after migration
- Index verification
- Monitor real-time metrics post-deployment

#### Risk: API Clients Break
**Impact:** Mobile apps, integrations fail
**Mitigation:**
- Keep old endpoints alive with deprecation warnings
- Version API endpoints
- Provide migration guide for integrations
- Gradual rollout (new endpoint live 2 weeks before old removed)

---

## PHASED ROLLOUT SCHEDULE

### Week 1-2: Phase 1 (Quick Wins)
- Rebrand PhiloDuel → ARGUED
- Update comments and headers
- Rename rating system display

**Launch:** Yes, if careful with backward compatibility

### Week 3-4: Phase 2 (Terminology)
- Update documentation
- Change opponent → conversation partner
- Refactor victory/defeat messaging

**Launch:** Yes, can be gradual

### Week 5-6: Phase 3 (Routes)
- Rename /debates → /discussions
- Update all navigation
- Keep old routes with redirects temporarily

**Launch:** Yes, with 404 handling for old URLs

### Week 7-8: Phase 4 (API)
- Rename /api/judge → /api/evaluate
- Change judgment logic
- Update response structure

**Launch:** Yes, with backward compatibility layer

### Week 9-13: Phase 5 (Database)
- Execute migrations during maintenance window
- Coordinate with other phases
- Extensive testing

**Launch:** Requires downtime and maintenance window

### Week 14: Post-Launch
- Monitor for issues
- Address any bugs
- Remove deprecated code/endpoints

---

## ALTERNATIVE: INCREMENTAL APPROACH

If you don't have 8-10 weeks:

**Minimum Viable Rebrand (4-5 weeks):**
1. Phase 1 + 2: Quick wins + terminology (1-2 weeks)
2. Phase 3: Routes (restructure URLs) (2 weeks)
3. Optional: Phase 4 (API) if API versioning allows (1 week)
4. Skip Phase 5 initially (database can stay same)

**Note:** Keeping old database terminology while changing UI is confusing long-term but avoids downtime

---

## RECOMMENDED EXECUTION PLAN

**Best Approach:**
1. Start with Phase 1 (low risk, visible brand improvement)
2. Do Phase 2-3 in parallel (terminology + routes, both surface-level)
3. Complete Phase 4 (API changes) before database migration
4. Do Phase 5 during planned maintenance window with expert support

**Timeline:** 8-10 weeks with 2-3 person team

**Checkpoints:**
- Week 2: Phase 1 complete, monitoring
- Week 4: Phase 2 complete, terminology consistent
- Week 6: Phase 3 complete, navigation working
- Week 8: Phase 4 complete, API stable
- Week 10: Phase 5 complete, database migrated
- Week 11: Post-launch stabilization

---

## SUCCESS METRICS

Track these before/after:
- Page load times (performance regression?)
- Error rates (broken links, 500s?)
- User confusion (support tickets)
- Navigation success rate (where users go)
- API call success rate
- Database query performance

---

## CONCLUSION

This is a **major, high-risk initiative** that touches every layer of the system.

**Estimated Timeline:** 8-10 weeks
**Estimated Cost:** $113,000-131,000
**Recommended Team:** 4-5 people working in parallel

The rebrand is worth doing—the current terminology contradicts your collaborative vision—but plan carefully and execute methodically.

