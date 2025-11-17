# Feature Roadmap Summary
**Source:** feature-roadmap-final.md
**Date:** November 17, 2025

## Executive Summary

The feature roadmap transforms the current debate-focused platform (70% misaligned with vision) into a conversation-first community. **MVP can launch in 8-12 weeks** with focused scope. The roadmap is organized into 3 phases balancing user needs with technical constraints. **Critical change: Database requires fundamental restructuring** from debates → conversations.

---

## 1. MVP Features List (Phase 1: Weeks 1-12)

### Must-Have Features (Can't Launch Without)

**Core Conversation Features:**

✅ **Start Conversation** (2-3 days effort)
- Title/question input (max 500 chars)
- Description/context (optional, markdown)
- Topic tags selector (5-10 initial tags)
- Conversation type dropdown: Open Discussion, Socratic Dialogue, Reading Group, Question Exploration
- Public/private toggle
- Components: Title input, rich text editor, multi-select tag picker, type dropdown, goals textarea

✅ **Join Conversation** (1 day effort)
- Single "Join Conversation" button (replaces FOR/AGAINST)
- No position selection required
- Adds user to conversation_participants
- Multiple participants allowed (not limited to 2)
- Confirmation message

✅ **Add Perspective** (3-4 days effort)
- Multi-round contributions allowed (not 1 per person)
- Rich text editor with formatting
- Optional: Quote previous contribution
- Optional: Add resource links
- Perspective type selector (optional): Supporting, Questioning, Alternative, Synthesis
- Min 20 chars, max 10,000 chars

✅ **View Conversation** (2-3 days effort)
- Show all participants (not just 2)
- Display all contributions chronologically
- Show perspective types if selected
- Highlight AI synthesis if requested
- Participant list with avatars

✅ **Browse Conversations** (1 day effort)
- Rename "Debates" → "Conversations" globally
- Show: title, description, participant count, message count
- Status badges: Active, Featured, Completed
- Sort by: Newest (default), Most Active
- Basic topic tag filtering

**Essential AI Features:**

✅ **AI Synthesis - NOT Judgment** (3-4 days effort)
- Remove automatic triggering
- Add "Request Synthesis" button (creator only initially)
- Modified Gemini prompt:
  - ❌ Remove: "Determine winner"
  - ✅ Add: "Identify key points from all perspectives"
  - ✅ Add: "Note areas of agreement"
  - ✅ Add: "Highlight productive disagreements"
  - ✅ Add: "Suggest unresolved questions"
- Display synthesis in conversation view
- Keep fact-checking feature

**Essential UI/UX Changes:**

✅ **Update All Terminology** (1-2 days)
- Global find/replace: "Debate" → "Conversation", "Argument" → "Perspective", "Join FOR/AGAINST" → "Join Conversation"
- Update navigation menu labels

✅ **Landing Page Refresh** (2 days)
- "Where Philosophy Comes Alive" → "Where Ideas Evolve Together"
- "Start Your First Duel" → "Begin Exploring"
- "Fair AI Judgment" → "AI-Powered Insights"
- "Build Reputation" → "Build Influence"

✅ **Profile Page Enhancement** (2-3 days)
- Display/edit: bio, expertise areas, learning interests
- Hide: win rate, debates won
- Show: conversations participated, messages contributed

### Should-Have for MVP (Can Phase If Needed)

⏱️ **Topic Tag Filtering** (2-3 days) - Include if time permits
⏱️ **Search Conversations** (2-3 days) - Phase 2 if time-constrained
⏱️ **Onboarding Flow** (3-4 days) - Phase 2 if time-constrained
⏱️ **Notification System** (4-5 days) - Phase 2 (settings UI exists but not connected)

### MVP Launch Criteria

- [ ] Users can start conversations
- [ ] Multiple people can join and contribute
- [ ] AI provides synthesis (not judgment)
- [ ] Browsing and discovery functional
- [ ] No competitive language or metrics visible
- [ ] Database migration complete and tested
- [ ] All "debate" terminology replaced

**Total MVP Effort:** 8-12 weeks, $10,000-15,000 (175-250 hours @ $60-75/hr)

---

## 2. Feature Prioritization Matrix

### ✅ KEEP (Working Well, Aligned)

1. **Authentication System** - Supabase Auth works, no changes needed
2. **AI Integration Infrastructure** - Gemini API functional, repurpose for synthesis (not judgment)
3. **Profile Foundation** - Basic structure useful, modify fields
4. **Content Creation Flow** - Creating discussions works, modify terminology
5. **Discussion Threading** - Basic comment structure exists, enhance later

### ⚠️ MODIFY (Useful but Needs Changes)

| Feature | Current Issue | Changes Needed | Priority |
|---------|--------------|----------------|----------|
| **User Profiles** | Competitive metrics (debates_won, delo_rating, win_rate) | Remove competitive displays, add bio/expertise/interests, rename delo_rating → influence_score | HIGH (MVP) |
| **Create Debate** | "Debate" terminology, no type options, no tags | Rename → "Start Conversation", add type dropdown, add topic tags | HIGH (MVP) |
| **Submit Argument** | Limited to 1 per position, binary FOR/AGAINST, no threading | Allow multiple rounds, add perspective types, add resource links | HIGH (MVP) |
| **Browse Debates** | No filtering/search, only sorted by recency | Add topic filters, search, sort options (Most Active, Trending) | MEDIUM (Phase 2) |
| **AI Judgment** | Declares winner, binary evaluation, ends conversation | Remove winner, add synthesis (key points, agreements, questions), make optional | HIGH (MVP) |
| **Leaderboard** | Competitive ranking, win-focused | Rename → "Contributors", multiple sorts, opt-in visibility, remove win rate | LOW (Phase 3) |
| **Settings Pages** | UI exists but not connected to database | Connect to user_preferences table, implement email notifications | MEDIUM (Phase 2) |

### ❌ REMOVE (Incompatible with Vision)

| Feature | Why Remove | Replace With | Priority |
|---------|-----------|-------------|----------|
| **Join FOR/AGAINST Buttons** | Binary structure, forces polarization, limits to 2 participants | Simple "Join Conversation" button, no position, multiple participants | HIGH (MVP) |
| **Win Rate Display** | Entirely competitive metric | Conversation completion rate (optional), or just remove | HIGH (MVP) |
| **Judgments Table** | Winner concept contradicts philosophy | message_feedback table (Phase 2), AI synthesis (optional) | HIGH (MVP) |
| **Binary Debate Structure** | FOR/AGAINST too limiting, only 2 participants, one round each | Open participation (any number), multiple rounds, threading | HIGH (MVP) |

---

## 3. Post-MVP Features

### Phase 2: Discovery & Community (Weeks 13-24, $8-12K)

**Enhanced Discovery:**
- Full-text search conversations
- Advanced filtering (status, participant count, date range)
- Trending topics algorithm
- Personalized recommendations
- "Similar conversations" suggestions

**Social Features:**
- View other user profiles (public/private toggle)
- Follow users for updates
- User-to-user messaging
- @mentions in conversations
- Notification system fully implemented

**Reading Groups:**
- Create reading group (conversation type)
- Set reading schedule
- Group size limits
- Member discovery ("Looking for study partners")
- Reading progress tracking
- Private group discussions

**Quality & Engagement:**
- Message feedback system (thought-provoking, well-reasoned)
- Quality score aggregation
- Community moderation tools
- Report/flag functionality
- Saved conversations (bookmarking)

**AI Enhancements:**
- Optional AI question generation (Socratic dialogue)
- AI-powered conversation summaries
- Smart topic suggestions
- Related conversation recommendations

**Success Metrics Phase 2:**
- 1,000+ registered users
- 200+ active conversations
- 50+ reading groups
- 20% users have study partners
- 50%+ weekly return rate (WAU)
- NPS score: 50+

### Phase 3: Advanced Community & Monetization (Weeks 25-36, $15-20K)

**Study Partners & Mentorship:**
- Study partner matching algorithm
- Mentorship program
- Office hours for experts
- Peer learning tools
- Accountability features (non-competitive)

**Argument Mapping:**
- Visual argument trees (Kialo-style)
- Collaborative argument building
- Multiple perspective visualization
- Steelmanning tools
- Export argument maps

**Philosophy Circles:**
- Private study groups with themes
- Circle-based discussions
- Scheduled sync meetings
- Resource libraries per circle
- Circle leadership tools

**Premium Features (Monetization):**
- Premium tier ($15-20/month): Expert-led discussions, advanced AI, priority support, extended history, private circles
- Student/educator discounts ($10/month)
- Annual plans (20% discount)

**Expert Platform:**
- Philosophy professors can teach
- Compensation model for experts
- Course creation tools
- Expert Q&A sessions
- Revenue sharing

**Content & Knowledge:**
- Community wiki/knowledge base
- Curated conversation collections
- Topic guides and pathways
- Resource recommendations
- Integration with philosophical texts

**Success Metrics Phase 3:**
- 5,000+ registered users
- 100+ active reading groups
- 50+ mentorship pairs
- 25% conversion to paid
- $10,000+ MRR
- NPS score: 60+

---

## 4. Features to Deprecate/Remove

### Explicitly NOT in MVP (Defer to Phase 2+)

❌ **View Other User Profiles** - Phase 2
❌ **Follow Users** - Phase 2
❌ **Reading Groups** - Phase 2
❌ **Study Partners** - Phase 2
❌ **Mentorship** - Phase 3
❌ **Advanced Threading** (nested replies) - Phase 2
❌ **Argument Mapping Visualization** - Phase 3
❌ **Message Feedback System** - Phase 2

### Features to Remove/Hide Permanently

**Remove from UI immediately (MVP):**
- Win rate display on profiles
- "Debates won" stat prominence
- FOR/AGAINST position buttons
- "Opponent" language anywhere
- Winner celebrations
- Competitive leaderboard rankings (can hide/rename later)

**Remove from database (after migration):**
- judgments table (delete entirely)
- debates.for_participant field
- debates.against_participant field
- debates.winner_id field
- arguments.position field (FOR/AGAINST)

---

## 5. Database Changes Needed

### Phase 1: Core Database Transformation (Weeks 1-3)

### New Tables to Create

**1. conversations** (Replaces debates)
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  topic VARCHAR(500) NOT NULL,
  description TEXT,
  conversation_type VARCHAR(50) DEFAULT 'open_discussion',
    -- Types: open_discussion, socratic_dialogue, reading_group,
    --        question_exploration, case_study
  tags TEXT[], -- Array of topic tags
  goals TEXT,
  status VARCHAR(20) DEFAULT 'active',
    -- Status: active, archived, locked, featured
  featured BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  participant_count INT DEFAULT 0,
  message_count INT DEFAULT 0,
  last_activity_at TIMESTAMP DEFAULT NOW()
);

-- Indexes: tags (GIN), status, created_by, type, featured, last_activity
```

**2. conversation_messages** (Replaces arguments)
```sql
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  perspective_type VARCHAR(50),
    -- Types: supporting, questioning, alternative, synthesis,
    --        clarification, null (unspecified)
  parent_message_id UUID REFERENCES conversation_messages(id),
    -- For threading (Phase 2)
  resource_links TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  edited_at TIMESTAMP,
  is_revised BOOLEAN DEFAULT FALSE,
  quality_score DECIMAL(3,2) DEFAULT 0.00
);

-- Indexes: conversation_id, user_id, created_at, parent_message_id
```

**3. conversation_participants** (NEW)
```sql
CREATE TABLE conversation_participants (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  last_active_at TIMESTAMP DEFAULT NOW(),
  message_count INT DEFAULT 0,
  UNIQUE(conversation_id, user_id)
);

-- Indexes: conversation_id, user_id
```

**4. topics** (NEW - Taxonomy)
```sql
CREATE TABLE topics (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES topics(id),
  conversation_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed with 10 initial topics:
-- Ethics, Metaphysics, Epistemology, Logic, Political Philosophy,
-- Philosophy of Mind, Existentialism, Eastern Philosophy,
-- Applied Philosophy, Contemporary Issues
```

### Modifications to Existing Tables

**profiles** (Enhance for conversation model)
```sql
ALTER TABLE profiles
  -- Add new fields
  ADD COLUMN bio TEXT,
  ADD COLUMN expertise_areas TEXT[],
  ADD COLUMN learning_interests TEXT[],
  ADD COLUMN conversations_participated INT DEFAULT 0,
  ADD COLUMN total_messages INT DEFAULT 0,
  ADD COLUMN onboarding_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN profile_visibility VARCHAR(20) DEFAULT 'public',
  ADD COLUMN conversation_style VARCHAR(100);

-- Keep for now (hide in UI): debates_won, debates_participated,
-- delo_rating, reputation_score
```

### Tables to Delete

**judgments** - Remove entirely (backup first)
**debates** - Delete after migration to conversations (backup first)
**arguments** - Delete after migration to conversation_messages (backup first)

### Data Migration Strategy

**Step 1:** Create new tables + indexes + seed topics
**Step 2:** Migrate data:
- debates → conversations (map status, set default tags)
- arguments → conversation_messages (remove position field)
- Extract conversation_participants from debates (creator + for_participant + against_participant)
- Update denormalized counts (participant_count, message_count)
- Update profile stats (conversations_participated, total_messages)

**Step 3:** Verify migration (check counts, test queries, verify RLS policies)
**Step 4:** Update application code (all queries to new tables, test features, QA)
**Step 5:** Backup and drop old tables (keep backups 30 days)

**Migration Timeline:** 1 week total (2 days prep, 4 hours execution, 1 day verification, 3-4 days code updates)

**Rollback Plan:** Supabase automatic backups (< 15 min restore), manual SQL rollback if needed

---

## 6. Implementation Timeline & Cost

### Non-Technical Founder Approach

**Recommended: Hire Freelance Developer**
- Hourly rate: $50-100/hr (target $60-75/hr)
- MVP: 175-250 hours = $10,000-15,000
- Timeline: 8-12 weeks
- 20-30 hrs/week development

**Weekly Cadence:**
- Monday: Week planning
- Wednesday: Progress check-in
- Friday: Demo of week's work

**12-Week Breakdown:**

| Weeks | Focus | Deliverables |
|-------|-------|-------------|
| 1-2 | Planning & Setup | Finalize scope, design key screens, setup environment, review schema |
| 3-5 | Database & Backend | Migration, new tables, API endpoints, auth review |
| 6-8 | Core UI | Start/Join/Browse conversations, add perspectives UI, view page, profiles |
| 9-10 | AI & Polish | AI synthesis implementation, testing, bug fixes, UI polish, performance |
| 11-12 | Testing & Launch | Full QA, beta testing, bug fixes, launch prep, soft launch |

### Phase 2 & 3 Investment

**Phase 2** (Months 4-6): $8,000-12,000
**Phase 3** (Months 7-12): $15,000-20,000
**Total 12-month investment**: $33,000-47,000

**Potential ROI:**
- Conservative: 1,000 users, 100 paid, $2,000 MRR (Year 1)
- Moderate: 5,000 users, 500 paid, $10,000 MRR (Year 1)
- Optimistic: 10,000 users, 2,000 paid, $30,000 MRR (Year 2)

---

## 7. Success Metrics

### MVP Launch (First 3 Months)

**Activation:**
- 200+ registered users
- 80%+ complete onboarding
- 60%+ create or join ≥1 conversation
- 40%+ post ≥1 contribution

**Engagement:**
- 50+ active conversations
- Avg 3+ participants per conversation
- Avg 5+ contributions per conversation
- 30% weekly active users (WAU)
- 15% daily active users (DAU)

**Quality:**
- Avg contribution length: 200+ words
- 50%+ conversations reach "synthesis" (10+ contributions)
- 70%+ conversations have diverse topic tags
- <5% conversations reported/moderated

**Retention:**
- 50% Week 1 retention
- 30% Week 4 retention
- 20% Month 3 retention

**Satisfaction:**
- NPS score: 40+
- 10-15 user interviews
- Qualitative: "This is different from Reddit" sentiment

---

## 8. Key Takeaways

### Critical Success Factors

1. **Find the right developer** - Make-or-break decision
2. **Ruthless prioritization** - Say no to nice-to-haves
3. **Quality over quantity** - Better 200 engaged users than 2,000 lurkers
4. **Community culture** - Set tone from day 1
5. **Iterate based on feedback** - Users will guide Phase 2

### What MVP Enables

**Users can:**
- Create conversation topics with context and tags
- Join conversations (no position requirement)
- Share multiple perspectives in same conversation
- Browse conversations by topic and activity
- Request AI synthesis of conversation
- Set up profile with bio and interests
- Participate in open-ended, multi-person discussions

**What's different from current platform:**
- No binary FOR/AGAINST structure
- No winner declarations
- Multiple participants (not limited to 2)
- Multiple rounds (not 1 per person)
- Collaborative framing throughout
- Topic-based discovery

### Risk Mitigation Priorities

**Technical:** Database migration tested on staging first, backup strategy, rollback plan
**Product:** Clear onboarding, seed 20-30 initial conversations, example content
**Business:** Free tier very functional, premium features genuinely valuable, annual plans incentivized

---

## Next Immediate Actions

1. **Finalize MVP Scope** - Review and lock feature set
2. **Design Key Screens** - Sketch/wireframe 4 core pages in Figma
3. **Find Developer** - Post on Upwork/Toptal, show this roadmap, get quotes
4. **Prepare Content** - Write 20-30 seed conversation topics
5. **Beta User Recruitment** - Identify 20-30 beta testers
6. **Set Up Project Management** - Notion/Linear, GitHub, Slack

**The path is clear. The vision is strong. The time is now.** 🌱
