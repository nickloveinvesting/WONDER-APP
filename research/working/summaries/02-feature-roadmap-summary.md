# Feature Roadmap Summary

**Source:** feature-roadmap-final.md
**Date:** November 15, 2025

## Executive Summary

Current platform is 70% misaligned with conversation-first vision. MVP can launch in 8-12 weeks with focused scope. Database requires fundamental restructuring (debates → conversations). 3-phase roadmap balances user needs with technical constraints.

---

## Current State Analysis

### What Exists Now
- ✅ Authentication (Supabase Auth)
- ✅ User profiles with stats
- ✅ Content creation (debates)
- ✅ Discussion participation
- ✅ AI integration (Gemini)
- ✅ Basic discovery (browse debates)

### Current Issues
- Binary FOR/AGAINST structure
- Only 2 participants allowed
- AI declares winners
- Competitive metrics (DeLO rating, win rate)
- No multi-round conversations
- No search or advanced filtering
- Settings UI exists but not connected

---

## MVP Features List (Phase 1: Weeks 1-12)

**Goal:** Launch conversation-first platform with core features

### Must-Have Features (Can't Launch Without)

**1. Core Conversation Features**

✅ **Start Conversation** (Modified Create Debate)
- Title/question input
- Description/context (optional)
- Topic tags selector (5-10 initial tags)
- Conversation type dropdown (Open Discussion, Socratic Dialogue, Reading Group, Question Exploration)
- Public/private toggle
- **Effort:** 2-3 days

✅ **Join Conversation** (Replace FOR/AGAINST)
- Single "Join Conversation" button
- No position selection required
- Multiple participants allowed
- **Effort:** 1 day

✅ **Add Perspective** (Modified Submit Argument)
- Multi-round contributions allowed
- Rich text editor with formatting
- Optional: Quote previous contribution
- Optional: Add resource links
- Perspective type selector (Supporting, Questioning, Alternative, Synthesis)
- **Effort:** 3-4 days

✅ **View Conversation** (Modified Debate Detail)
- Show all participants (not just 2)
- Display all contributions chronologically
- Show perspective types
- Participant list with avatars
- **Effort:** 2-3 days

✅ **Browse Conversations** (Modified Debates List)
- Rename "Debates" → "Conversations"
- Show: title, description, participant count, message count
- Status badges (Active, Featured, Completed)
- Sort by: Newest (default), Most Active
- **Effort:** 1 day

**2. Essential AI Features**

✅ **AI Synthesis (not Judgment)**
- Remove automatic triggering
- Add "Request Synthesis" button
- Identify key points from all perspectives
- Note areas of agreement
- Highlight productive disagreements
- Suggest unresolved questions
- **Effort:** 3-4 days

**3. UI/UX Changes**

✅ **Update All Terminology**
- "Debate" → "Conversation"
- "Argument" → "Perspective" or "Contribution"
- "Join FOR/AGAINST" → "Join Conversation"
- "Leaderboard" → "Contributors" (or hide)
- **Effort:** 1-2 days

✅ **Landing Page Refresh**
- "Where Philosophy Comes Alive" → "Where Ideas Evolve Together"
- Update feature cards for collaborative focus
- **Effort:** 2 days

✅ **Profile Page Enhancement**
- Display bio field (editable)
- Show expertise areas and learning interests
- Hide win rate, debates won
- Show conversations participated, messages contributed
- **Effort:** 2-3 days

### Should-Have for MVP (Important but Can Phase)

⏱️ **Topic Tag Filtering** - Phase 2 if time-constrained (2-3 days)
⏱️ **Search Conversations** - Phase 2 if time-constrained (2-3 days)
⏱️ **Onboarding Flow** - Phase 2 if time-constrained (3-4 days)
⏱️ **Notification System** - Phase 2 (4-5 days)

### MVP Launch Criteria
- Users can start conversations
- Multiple people can join and contribute
- AI provides synthesis (not judgment)
- Browsing and discovery functional
- No competitive language or metrics visible
- Database migration complete and tested
- All "debate" terminology replaced

**MVP Timeline:** 8-12 weeks
**Effort:** 150-250 developer hours
**Cost:** $10,000-$15,000

---

## Feature Prioritization (Keep/Modify/Remove)

### ✅ KEEP (Working Well, Aligned with Vision)

1. **Authentication System** - Works well, no changes
2. **AI Integration Infrastructure** - Repurpose for synthesis (not judgment)
3. **Profile Foundation** - Modify fields, keep structure
4. **Content Creation Flow** - Modify terminology and options
5. **Discussion Threading** - Enhance with nesting

### ⚠️ MODIFY (Useful but Needs Changes)

**Priority: HIGH (MVP)**

1. **User Profiles → Conversation-Focused Profiles**
   - Remove: debates_won, win_rate display
   - Add: bio, expertise_areas, learning_interests
   - Add: conversations_participated, total_messages
   - Rename: delo_rating → influence_score

2. **Create Debate → Start Conversation**
   - Rename terminology
   - Add: Topic tags, conversation type options
   - Remove: Binary structure implication

3. **Submit Argument → Share Perspective**
   - Allow multiple rounds
   - Add reply/quote functionality
   - Add perspective types
   - Remove position requirement

**Priority: MEDIUM (Phase 2)**

4. **Browse Debates → Explore Conversations**
   - Add: Topic filters, search, sort options
   - Rename throughout

5. **Settings Pages → Actually Implement**
   - Connect UI to database
   - Implement email notifications

**Priority: LOW (Phase 3)**

6. **Leaderboard → Top Contributors**
   - Rename and reframe
   - Add multiple sort options
   - De-emphasize ranking numbers

### ❌ REMOVE (Incompatible with Vision)

**Priority: HIGH (MVP)**

1. **Join Debate FOR/AGAINST Buttons**
   - Forces binary polarization
   - Limits to 2 participants
   - Replace with: Simple "Join Conversation" button

2. **Win Rate Calculation & Display**
   - Entirely competitive metric
   - Replace with: Conversation completion rate or remove

3. **Judgments Table & Winner Declaration**
   - Contradicts collaborative philosophy
   - Replace with: AI synthesis (optional, collaborative)

4. **Binary Debate Structure**
   - FOR/AGAINST positions too limiting
   - Replace with: Open participation, multiple rounds

---

## Post-MVP Features

### Phase 2: Discovery & Community (Weeks 13-24)

**Goal:** Enhance discovery, add social features, enable collaborative learning

**2.1 Enhanced Discovery**
- Full-text search conversations
- Advanced filtering (status, participant count, date range)
- Trending topics algorithm
- Personalized recommendations
- "Similar conversations" suggestions

**2.2 Social Features**
- View other user profiles (public/private toggle)
- Follow users for updates
- User-to-user messaging
- @mentions in conversations
- Notification system fully implemented

**2.3 Reading Groups**
- Create reading group (special conversation type)
- Set reading schedule
- Group size limits
- Member discovery
- Reading progress tracking
- Private group discussions

**2.4 Quality & Engagement**
- Message feedback system (thought-provoking, well-reasoned)
- Quality score aggregation
- Community moderation tools
- Report/flag functionality
- Saved conversations (bookmarking)

**2.5 AI Enhancements**
- Optional AI question generation (Socratic dialogue)
- AI-powered conversation summaries
- Smart topic suggestions
- Related conversation recommendations

**Success Metrics:**
- 1,000+ registered users
- 200+ active conversations
- 50+ reading groups
- 50%+ users return weekly (WAU)
- NPS score: 50+

**Effort:** 3 months
**Cost:** $8,000-$12,000

---

### Phase 3: Advanced Community & Monetization (Weeks 25-36)

**Goal:** Build sustainable community with advanced features and revenue

**3.1 Study Partners & Mentorship**
- Study partner matching algorithm
- Mentorship program
- Office hours for experts
- Peer learning tools
- Accountability features

**3.2 Argument Mapping**
- Visual argument trees (Kialo-style)
- Collaborative argument building
- Multiple perspective visualization
- Steelmanning tools
- Export argument maps

**3.3 Philosophy Circles**
- Private study groups with themes
- Circle-based discussions
- Scheduled sync meetings
- Resource libraries per circle
- Circle leadership tools

**3.4 Premium Features (Monetization)**
- Premium tier ($15-20/month):
  - Expert-led discussions
  - Advanced AI features
  - Priority support
  - Extended history
  - Private circles
- Student/educator discounts ($10/month)
- Annual plans (20% discount)

**3.5 Expert Platform**
- Philosophy professors can teach
- Compensation model for experts
- Course creation tools
- Expert Q&A sessions
- Revenue sharing

**3.6 Content & Knowledge**
- Community wiki/knowledge base
- Curated conversation collections
- Topic guides and pathways
- Resource recommendations
- Integration with philosophical texts

**Success Metrics:**
- 5,000+ registered users
- 100+ active reading groups
- 50+ mentorship pairs
- 25% conversion to paid
- $10,000+ MRR
- NPS score: 60+

**Effort:** 3 months
**Cost:** $15,000-$20,000

---

## Features to Deprecate

### Explicitly NOT in MVP

❌ **View Other User Profiles** - Phase 2
❌ **Follow Users** - Phase 2
❌ **Reading Groups** - Phase 2
❌ **Study Partners** - Phase 2
❌ **Mentorship** - Phase 3
❌ **Advanced Threading** (nested replies) - Phase 2
❌ **Argument Mapping Visualization** - Phase 3
❌ **Message Feedback System** - Phase 2

### Remove Entirely

1. **FOR/AGAINST Position Selection**
   - Fundamentally incompatible with vision
   - Forces artificial polarization

2. **Winner Declaration System**
   - All judgment logic
   - Winner badges/displays
   - Victory celebrations

3. **Competitive Metrics in UI**
   - Win rate displays
   - DeLO rating prominence
   - Leaderboard rankings
   - Competitive language throughout

4. **Binary Debate Structure**
   - Two-participant limit
   - One-round-per-person limit
   - Position-locked arguments

---

## Database Changes Needed

### Phase 1: Core Database Transformation

**Timeline:** Weeks 1-3 of development

### 1. Create New Tables

**conversations** (Replaces debates)
```sql
- id, topic, description
- conversation_type (open_discussion, socratic_dialogue, reading_group, question_exploration)
- tags (array of topic tags)
- goals (optional objectives)
- status (active, archived, locked, featured)
- featured (boolean)
- created_by, created_at, updated_at
- participant_count, message_count
- last_activity_at
```

**conversation_messages** (Replaces arguments)
```sql
- id, conversation_id, user_id, content
- perspective_type (supporting, questioning, alternative, synthesis, clarification)
- parent_message_id (for threading - Phase 2)
- resource_links (array of URLs)
- created_at, edited_at, is_revised
- quality_score (Phase 2)
```

**conversation_participants**
```sql
- id, conversation_id, user_id
- joined_at, last_active_at
- message_count
- UNIQUE(conversation_id, user_id)
```

**topics** (Taxonomy for organization)
```sql
- id, name, slug, description
- parent_id (for hierarchy)
- conversation_count
- created_at
```

**Seed 10 initial topics:**
1. Ethics
2. Metaphysics
3. Epistemology
4. Logic
5. Political Philosophy
6. Philosophy of Mind
7. Existentialism
8. Eastern Philosophy
9. Applied Philosophy
10. Contemporary Issues

### 2. Modify Existing Tables

**profiles** (Enhance for conversation model)
```sql
ALTER TABLE profiles ADD COLUMNS:
- bio (text)
- expertise_areas (text array)
- learning_interests (text array)
- conversations_participated (int)
- total_messages (int)
- onboarding_completed (boolean)
- profile_visibility (public, community, private)
- conversation_style (optional)

KEEP BUT HIDE IN UI:
- debates_won, debates_participated, delo_rating, reputation_score
(Remove later after verification)
```

### 3. Delete Deprecated Tables

**judgments** - Remove entirely
- Backup existing data first
- Winner declaration incompatible with vision

**debates** - Delete after migration to conversations
- Backup before deletion
- Keep for 30 days then permanently remove

**arguments** - Delete after migration to conversation_messages
- Backup before deletion
- Keep for 30 days then permanently remove

### 4. Data Migration Strategy

**Migration Steps:**

1. **Create New Tables** (Day 1)
   - Run all CREATE TABLE statements
   - Verify indexes created
   - Seed topics table

2. **Migrate Data** (Day 2)
   - debates → conversations (map fields appropriately)
   - arguments → conversation_messages
   - Extract conversation_participants from debates
   - Update participant counts
   - Update message counts
   - Update profile stats

3. **Verify Migration** (Day 3)
   - Check record counts match
   - Verify relationships intact
   - Test queries on new schema
   - Check RLS policies work

4. **Update Application Code** (Days 4-7)
   - Update all queries to use new tables
   - Test all features
   - Deploy to staging
   - Full QA pass

5. **Backup and Drop Old Tables** (Day 8)
   - Create backups of old tables
   - Drop debates, arguments, judgments
   - Monitor for 30 days before permanent deletion

**Rollback Plan:**
- Supabase automatic backups (< 15 min restore)
- Manual SQL rollback if needed
- Keep old tables for 30 days

**Migration Timeline:** 1 week

---

## Phase 2 & 3 Database Changes

### Phase 2 New Tables:
- user_follows
- reading_groups
- group_members
- saved_conversations
- message_feedback
- user_preferences (full implementation)

### Phase 3 New Tables:
- study_partnerships
- mentorship_pairs
- philosophy_circles
- circle_members
- subscription_tiers
- expert_profiles
- course_content

---

## Success Metrics

### MVP (First 3 Months)

**Activation:**
- 200+ registered users
- 80%+ complete onboarding
- 60%+ create or join at least 1 conversation
- 40%+ post at least 1 contribution

**Engagement:**
- 50+ active conversations
- Avg 3+ participants per conversation
- Avg 5+ contributions per conversation
- 30% weekly active users (WAU)

**Quality:**
- Avg contribution length: 200+ words
- 50%+ conversations reach "synthesis" (10+ contributions)
- <5% conversations reported/moderated

**Retention:**
- 50% Week 1 retention
- 30% Week 4 retention
- 20% Month 3 retention

**Satisfaction:**
- NPS score: 40+

### Phase 2 (Months 4-6)

- 1,000+ registered users (5x growth)
- 200+ active conversations
- 50+ reading groups
- 40% WAU, 20% DAU

### Phase 3 (Months 7-12)

- 5,000+ registered users
- 500+ active conversations
- 500+ paid users (10% conversion)
- $10,000+ MRR
- 50% Month 3 retention

---

## Implementation Timeline

### Non-Technical Founder Approach

**Recommended: Hire Freelance Developer**
- Hourly rate: $50-100/hr
- MVP: 150-250 hours = $7,500-25,000
- Timeline: 8-12 weeks
- Pros: More control, can iterate
- Cons: More expensive, need to manage

### Recommended Timeline (12 weeks)

**Weeks 1-2: Planning & Setup**
- Finalize feature scope
- Design key screens (Figma mockups)
- Database schema design review

**Weeks 3-5: Core Database & Backend**
- Database migration
- New table creation
- API endpoints for conversations

**Weeks 6-8: Core UI Development**
- Start/Join/Browse conversations
- Add perspectives UI
- View conversation page
- Profile updates

**Weeks 9-10: AI Integration & Polish**
- AI synthesis implementation
- Testing and bug fixes
- UI polish and responsiveness

**Weeks 11-12: Testing & Launch Prep**
- Full QA pass
- Beta user testing
- Bug fixes
- Soft launch to small group

---

## Investment Required

**Total 12-Month Investment:**
- MVP (Months 1-3): $10,000-15,000
- Phase 2 (Months 4-6): $8,000-12,000
- Phase 3 (Months 7-12): $15,000-20,000
- **Total: $33,000-47,000**

**Potential Outcomes:**
- Conservative: 1,000 users, 100 paid, $2,000 MRR (Year 1)
- Moderate: 5,000 users, 500 paid, $10,000 MRR (Year 1)
- Optimistic: 10,000 users, 2,000 paid, $30,000 MRR (Year 2)

---

## Critical Success Factors

1. **Find the right developer** - Make-or-break for non-technical founder
2. **Ruthless prioritization** - Say no to nice-to-haves
3. **Quality over quantity** - Better 200 engaged users than 2,000 lurkers
4. **Community culture** - Set tone from day 1
5. **Iterate based on feedback** - Users will guide Phase 2

---

## Next Steps (Next 2 Weeks)

**For Non-Technical Founder:**

1. Finalize MVP scope - What can we cut if needed?
2. Design key screens - Wireframe main pages
3. Find developer - Post on Upwork, check references
4. Prepare content - Write 20-30 seed conversation topics
5. Beta user recruitment - Identify 20-30 beta testers
6. Set up project management - Notion, GitHub, Slack
