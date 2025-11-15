# Feature Roadmap & Implementation Plan
## Philosophy Conversation Platform

**Date:** November 15, 2025
**Agent:** Feature & Functionality Synthesis (Agent 2)
**Status:** Final Synthesis for Implementation

---

## Executive Summary

This document provides a ruthlessly prioritized feature roadmap for transforming the current debate-focused platform into a conversation-first philosophical community. Based on comprehensive analysis of:
- Current state audit (what exists now)
- User personas and pain points (what users need)
- Conversation mechanics research (what features work)

**Key Findings:**

1. **Current platform is 70% misaligned** with new vision (debates, winners, binary FOR/AGAINST)
2. **MVP can launch in 8-12 weeks** with focused scope
3. **3-phase roadmap** balances user needs with technical constraints
4. **Database requires fundamental restructuring** (debates → conversations)
5. **Non-technical founder** requires no-code solutions for content management

**Critical Success Factors:**
- Focus on **quality discourse over viral growth**
- Support **multiple perspectives, not binary positions**
- Enable **collaborative learning, not competition**
- Maintain **rigor without gatekeeping**

---

## Table of Contents

1. [Current State Analysis](#current-state-analysis)
2. [Keep/Modify/Remove Analysis](#keep-modify-remove-analysis)
3. [MVP Feature List](#mvp-feature-list-phase-1)
4. [Feature Roadmap](#feature-roadmap-3-phases)
5. [Database Schema Changes](#database-schema-changes)
6. [Feature Specifications](#feature-specifications)
7. [Implementation Timeline](#implementation-timeline)
8. [Success Metrics](#success-metrics)

---

## Current State Analysis

### What Exists Now

**Core Infrastructure:**
- ✅ Authentication (Supabase Auth)
- ✅ User profiles with stats
- ✅ Content creation (debates)
- ✅ Discussion participation
- ✅ AI integration (Gemini)
- ✅ Basic discovery (browse debates)
- ✅ Settings pages (notifications, privacy - UI only)

**Current Features:**
- Create debate topics
- Join debates (FOR/AGAINST positions)
- Submit arguments (1 per side)
- AI judgment (declares winner)
- Leaderboard (DeLO rating)
- Profile stats (wins, win rate)
- Basic browse/discovery

**What's Missing:**
- ❌ Multi-round conversations
- ❌ Multiple participants (only 2)
- ❌ Collaborative features
- ❌ Reading groups
- ❌ Study partners
- ❌ Search functionality
- ❌ Topic filtering
- ❌ Public profiles for others
- ❌ Following system
- ❌ Actual notifications (UI exists, not connected)

### Current Database Schema

**Tables:**
1. **profiles** - User data (username, delo_rating, reputation_score, debates_won, debates_participated)
2. **debates** - Topics (for_participant, against_participant, winner_id, status)
3. **arguments** - Messages (position: for/against, round, content)
4. **judgments** - AI evaluations (winner_position, reasoning, fact_checks, scores)

**Vision Alignment:**
- profiles: 4/10 (needs modification)
- debates: 1/10 (fundamentally misaligned - REPLACE)
- arguments: 5/10 (structure useful, needs transformation)
- judgments: 0/10 (entirely incompatible - DELETE)

---

## Keep/Modify/Remove Analysis

### ✅ KEEP (Working Well, Aligned with Vision)

**1. Authentication System**
- Current implementation works
- Supabase Auth handles security
- No changes needed
- **Action:** Keep as-is

**2. AI Integration Infrastructure**
- Gemini API integration functional
- Good foundation for future features
- **Action:** Repurpose for synthesis (not judgment)

**3. Profile Foundation**
- Basic profile structure useful
- User data management works
- **Action:** Modify fields, keep structure

**4. Content Creation Flow**
- Creating new discussions works
- UI patterns can be reused
- **Action:** Modify terminology and options

**5. Discussion Threading**
- Basic comment structure exists
- Can be enhanced for conversations
- **Action:** Enhance with nesting and threading

---

### ⚠️ MODIFY (Useful but Needs Changes)

**1. User Profiles → Conversation-Focused Profiles**

**Current Issues:**
- Competitive metrics (debates_won, delo_rating)
- Win rate calculation
- No bio or interests

**Changes Needed:**
- **Remove:** debates_won, win_rate display
- **Add:** bio, expertise_areas, learning_interests
- **Add:** conversations_participated, total_messages
- **Rename:** delo_rating → influence_score (change calculation)
- **Add:** profile_visibility, conversation_style preferences

**Priority:** HIGH (MVP)

---

**2. Create Debate → Start Conversation**

**Current Issues:**
- "Debate" terminology
- No conversation type options
- No topic tagging

**Changes Needed:**
- **Rename:** "Create Debate" → "Start Conversation"
- **Add:** Topic tags selector
- **Add:** Conversation type dropdown (Open Discussion, Socratic Dialogue, Reading Group, etc.)
- **Add:** Optional conversation goals/context
- **Remove:** Implication of binary structure

**Priority:** HIGH (MVP)

---

**3. Submit Argument → Share Perspective**

**Current Issues:**
- Limited to 1 submission per position
- Binary FOR/AGAINST
- No threading or responses

**Changes Needed:**
- **Allow:** Multiple rounds of contribution
- **Add:** Reply/quote specific contributions
- **Add:** Perspective types (supporting, questioning, alternative, synthesis)
- **Add:** Resource links field
- **Remove:** Position requirement

**Priority:** HIGH (MVP)

---

**4. Browse Debates → Explore Conversations**

**Current Issues:**
- No filtering or search
- Only sorted by recency
- Limited discovery

**Changes Needed:**
- **Add:** Topic tag filters
- **Add:** Search by keyword
- **Add:** Sort options (Most Active, Trending, Recommended)
- **Add:** Status filters (Active, Featured, Archived)
- **Rename:** "Debates" → "Conversations" throughout

**Priority:** MEDIUM (Phase 2)

---

**5. AI Judgment → AI Synthesis**

**Current Issues:**
- Declares winner
- Binary evaluation
- Ends conversation

**Changes Needed:**
- **Remove:** Winner declaration
- **Add:** Key points summary from all contributors
- **Add:** Areas of agreement identification
- **Add:** Productive disagreements highlight
- **Add:** Unresolved questions
- **Add:** Suggested next directions
- **Make:** Optional (user-requested, not automatic)

**Priority:** HIGH (MVP)

---

**6. Leaderboard → Top Contributors**

**Current Issues:**
- Competitive ranking
- Win-focused metrics
- DeLO primary sort

**Changes Needed:**
- **Rename:** "Leaderboard" → "Contributors" or "Community"
- **Add:** Multiple sort options (Most Collaborative, Topic Experts, Newest)
- **Add:** Opt-in visibility controls
- **Show:** Collaboration badges, topic interests
- **Remove:** Win rate column
- **De-emphasize:** Ranking numbers

**Priority:** LOW (Phase 3 - can hide existing for now)

---

**7. Settings Pages → Actually Implement**

**Current Issues:**
- UI exists but not connected to database
- No functionality

**Changes Needed:**
- **Connect:** Notification checkboxes to user_preferences table
- **Implement:** Email notification system
- **Add:** Conversation notification types
- **Connect:** Privacy settings to database

**Priority:** MEDIUM (Phase 2)

---

### ❌ REMOVE (Incompatible with Vision)

**1. Join Debate FOR/AGAINST Buttons**

**Why Remove:**
- Binary structure fundamentally incompatible
- Forces artificial polarization
- Limits to 2 participants
- Creates adversarial framing

**Replace With:**
- Simple "Join Conversation" button
- No position commitment
- Multiple participants allowed
- conversation_participants table tracks involvement

**Priority:** HIGH (MVP)

---

**2. Win Rate Calculation & Display**

**Why Remove:**
- Entirely competitive metric
- No equivalent in conversation model
- Contradicts collaborative vision

**Replace With:**
- Conversation completion rate (if anything)
- Topic engagement breadth
- Don't need to replace - just remove

**Priority:** HIGH (MVP)

---

**3. Judgments Table & Winner Declaration**

**Why Remove:**
- Winner concept contradicts philosophy
- Authoritarian AI judgment
- Binary evaluation model

**Replace With:**
- message_feedback table (community signals)
- AI synthesis (optional, collaborative)
- No "winner" concept at all

**Priority:** HIGH (MVP - database change)

---

**4. Binary Debate Structure**

**Why Remove:**
- FOR/AGAINST positions too limiting
- Only 2 participants
- One round per person

**Replace With:**
- Open participation (any number)
- Multiple rounds
- Perspective diversity encouraged
- Threading for complex discussions

**Priority:** HIGH (MVP)

---

## MVP Feature List (Phase 1)

**Timeline:** 8-12 weeks
**Goal:** Launch conversation-first platform with core features
**Budget-Conscious:** Focus on essential changes only

---

### Must-Have Features (Can't Launch Without)

**1. Core Conversation Features**

✅ **Start Conversation** (Modified Create Debate)
- Title/question input
- Description/context (optional)
- Topic tags selector (5-10 initial tags)
- Conversation type dropdown:
  - Open Discussion
  - Socratic Dialogue
  - Reading Group
  - Question Exploration
- Public/private toggle
- **Effort:** 2-3 days

✅ **Join Conversation** (Replace FOR/AGAINST)
- Single "Join Conversation" button
- No position selection
- Add user to conversation_participants
- Confirmation message
- **Effort:** 1 day

✅ **Add Perspective** (Modified Submit Argument)
- Multi-round contributions allowed
- Rich text editor with formatting
- Optional: Quote previous contribution
- Optional: Add resource links
- Perspective type selector (optional):
  - Supporting this view
  - Questioning this view
  - Alternative perspective
  - Synthesis/integration
- **Effort:** 3-4 days

✅ **View Conversation** (Modified Debate Detail)
- Show all participants (not just 2)
- Display all contributions chronologically
- Show perspective types (if selected)
- Highlight AI synthesis (if requested)
- Participant list with avatars
- **Effort:** 2-3 days

✅ **Browse Conversations** (Modified Debates List)
- Rename "Debates" → "Conversations"
- Show: title, description, participant count, message count
- Basic status badges (Active, Featured, Completed)
- Sort by: Newest (default), Most Active
- **Effort:** 1 day

---

**2. Essential Database Changes**

✅ **Replace debates → conversations**
- Remove: for_participant, against_participant, winner_id
- Add: conversation_type, tags (array), goals (text)
- Add: featured (boolean)
- Keep: id, topic, description, status, created_by, created_at
- **Effort:** 2 days + migration

✅ **Transform arguments → conversation_messages**
- Remove: position field
- Add: perspective_type (optional enum)
- Add: parent_message_id (for threading - future)
- Add: resource_links (array)
- Add: edited_at, is_revised
- Keep: id, conversation_id, user_id, content, created_at
- **Effort:** 2 days + migration

✅ **Delete judgments table**
- No replacement needed in MVP
- Archive existing data (backup)
- **Effort:** 1 day

✅ **Modify profiles table**
- Remove: debates_won, debates_participated (fields stay, just hide in UI for now)
- Add: bio (text), expertise_areas (array), learning_interests (array)
- Add: conversations_participated (int), total_messages (int)
- Add: onboarding_completed (boolean)
- **Effort:** 2 days

✅ **Create topics table**
- id, name, slug, description, parent_id (for hierarchy)
- Seed with 10 initial topics (Ethics, Metaphysics, Epistemology, Logic, Political Philosophy, Philosophy of Mind, Existentialism, Eastern Philosophy, Applied Philosophy, Contemporary Issues)
- **Effort:** 1 day

✅ **Create conversation_participants table**
- conversation_id, user_id, joined_at, last_active_at
- Tracks who's in each conversation
- **Effort:** 1 day

---

**3. UI/UX Changes**

✅ **Update All Terminology**
- Global find/replace in codebase:
  - "Debate" → "Conversation"
  - "Argument" → "Perspective" or "Contribution"
  - "Join FOR/AGAINST" → "Join Conversation"
  - "Leaderboard" → "Contributors" (or hide for MVP)
- Update navigation menu labels
- **Effort:** 1-2 days

✅ **Landing Page Refresh**
- Change: "Where Philosophy Comes Alive" → "Where Ideas Evolve Together"
- Change: "Start Your First Duel" → "Begin Exploring"
- Update feature cards:
  - "Fair AI Judgment" → "AI-Powered Insights"
  - "Build Reputation" → "Build Influence"
  - "Real Community" → "Collaborative Community"
- **Effort:** 2 days

✅ **Profile Page Enhancement**
- Display bio field (editable)
- Show expertise areas (editable chips/tags)
- Show learning interests (editable chips/tags)
- Hide win rate, debates won
- Show conversations participated, messages contributed
- **Effort:** 2-3 days

---

**4. Essential AI Features**

✅ **AI Synthesis (not Judgment)**
- Remove automatic triggering
- Add "Request Synthesis" button (conversation creator only initially)
- Modify Gemini prompt:
  - Remove: "Determine winner"
  - Add: "Identify key points from all perspectives"
  - Add: "Note areas of agreement"
  - Add: "Highlight productive disagreements"
  - Add: "Suggest unresolved questions"
- Display synthesis in conversation view
- **Effort:** 3-4 days

✅ **Keep Fact-Checking**
- This is valuable regardless of model
- Display fact checks in synthesis
- **Effort:** No change needed

---

### Should-Have for MVP (Important but Can Phase)

**5. Basic Discovery Features**

⏱️ **Topic Tag Filtering**
- Filter conversations by topic
- Multiple tag selection
- Show tag counts
- **Effort:** 2-3 days
- **Decision:** Include if time permits, otherwise Phase 2

⏱️ **Search Conversations**
- Basic keyword search on title/description
- Full-text search on messages (nice-to-have)
- **Effort:** 2-3 days
- **Decision:** Phase 2 if time-constrained

---

**6. User Experience Enhancements**

⏱️ **Onboarding Flow**
- Collect bio, interests, expertise on signup
- Set onboarding_completed = true
- Welcome message explaining conversation model
- **Effort:** 3-4 days
- **Decision:** Phase 2 if time-constrained

⏱️ **Notification System**
- Connect existing UI to database
- Email notifications for:
  - New contribution in your conversations
  - Someone responds to your contribution
  - Synthesis available
- **Effort:** 4-5 days
- **Decision:** Phase 2 (settings exist but not critical)

---

### Nice-to-Have (Explicitly NOT in MVP)

❌ **View Other User Profiles** - Phase 2
❌ **Follow Users** - Phase 2
❌ **Reading Groups** - Phase 2
❌ **Study Partners** - Phase 2
❌ **Mentorship** - Phase 3
❌ **Advanced Threading** (nested replies) - Phase 2
❌ **Argument Mapping Visualization** - Phase 3
❌ **Message Feedback System** - Phase 2

---

### MVP Scope Summary

**What Users Can Do:**
1. Create conversation topics with context and tags
2. Join conversations (no position requirement)
3. Share multiple perspectives in same conversation
4. Browse conversations by topic and activity
5. Request AI synthesis of conversation
6. Set up profile with bio and interests
7. Participate in open-ended, multi-person discussions

**What's Different from Before:**
- No binary FOR/AGAINST
- No winner declarations
- Multiple participants
- Multiple rounds
- Collaborative framing
- Topic-based discovery

**What's Still Missing (Intentionally):**
- Advanced social features (following, profiles)
- Reading groups and study partners
- Search functionality
- Threading/nested replies
- Community feedback system

**MVP Launch Criteria:**
- [ ] Users can start conversations
- [ ] Multiple people can join and contribute
- [ ] AI provides synthesis (not judgment)
- [ ] Browsing and discovery functional
- [ ] No competitive language or metrics visible
- [ ] Database migration complete and tested
- [ ] All "debate" terminology replaced

---

## Feature Roadmap (3 Phases)

### Phase 1: MVP - Conversation Foundation (Weeks 1-12)

**Goal:** Launch conversation-first platform with core features

**Features:**
1. ✅ Start/Join/Browse Conversations
2. ✅ Multi-participant, multi-round discussions
3. ✅ Topic tags and basic filtering
4. ✅ AI synthesis (not judgment)
5. ✅ Updated profiles (bio, interests)
6. ✅ Terminology transformation complete
7. ✅ Database restructured (debates → conversations)

**Database Changes:**
- conversations table (replace debates)
- conversation_messages table (replace arguments)
- conversation_participants table (new)
- topics table (new)
- profiles modifications
- Delete judgments table

**Success Metrics:**
- 50+ active conversations
- 200+ registered users
- 500+ contributions
- 70%+ users participate in 2+ conversations
- Avg 3+ participants per conversation
- NPS score: 40+

**Effort:** 8-12 weeks (non-technical founder needs developer)

---

### Phase 2: Discovery & Community (Weeks 13-24)

**Goal:** Enhance discovery, add social features, enable collaborative learning

**Features:**

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
- Create reading group (type of conversation)
- Set reading schedule
- Group size limits
- Member discovery ("Looking for study partners")
- Reading progress tracking
- Private group discussions

**2.4 Quality & Engagement**
- Message feedback system (thought-provoking, well-reasoned, etc.)
- Quality score aggregation
- Community moderation tools
- Report/flag functionality
- Saved conversations (bookmarking)

**2.5 AI Enhancements**
- Optional AI question generation (Socratic dialogue)
- AI-powered conversation summaries
- Smart topic suggestions
- Related conversation recommendations

**Database Changes:**
- user_follows table
- reading_groups table
- group_members table
- saved_conversations table
- message_feedback table
- user_preferences table (full implementation)

**Success Metrics:**
- 1,000+ registered users
- 200+ active conversations
- 50+ reading groups
- 20% users have study partners
- 50%+ users return weekly (WAU)
- NPS score: 50+

**Effort:** 3 months (developer needed)

---

### Phase 3: Advanced Community & Monetization (Weeks 25-36)

**Goal:** Build sustainable community with advanced features and revenue

**Features:**

**3.1 Study Partners & Mentorship**
- Study partner matching algorithm
- Mentorship program
- Office hours for experts
- Peer learning tools
- Accountability features (non-competitive)

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

**3.4 Premium Features** (Monetization)
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

**Database Changes:**
- study_partnerships table
- mentorship_pairs table
- philosophy_circles table
- circle_members table
- subscription_tiers table
- expert_profiles table
- course_content table

**Success Metrics:**
- 5,000+ registered users
- 100+ active reading groups
- 50+ mentorship pairs
- 500+ DAU (10% of users)
- 25% conversion to paid
- $10,000+ MRR
- NPS score: 60+

**Effort:** 3 months (developer + potential design help)

---

## Database Schema Changes

### Phase 1: Core Database Transformation

**Timeline:** Weeks 1-3 of development

---

### 1. Create New Tables

**conversations** (Replaces debates)
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic VARCHAR(500) NOT NULL,
  description TEXT,
  conversation_type VARCHAR(50) DEFAULT 'open_discussion',
    -- Types: open_discussion, socratic_dialogue, reading_group,
    --        question_exploration, case_study
  tags TEXT[], -- Array of topic tags
  goals TEXT, -- Optional conversation objectives
  status VARCHAR(20) DEFAULT 'active',
    -- Status: active, archived, locked, featured
  featured BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  participant_count INT DEFAULT 0,
  message_count INT DEFAULT 0,
  last_activity_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_tags ON conversations USING GIN(tags);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_conversations_created_by ON conversations(created_by);
CREATE INDEX idx_conversations_type ON conversations(conversation_type);
CREATE INDEX idx_conversations_featured ON conversations(featured);
CREATE INDEX idx_conversations_last_activity ON conversations(last_activity_at DESC);
```

---

**conversation_messages** (Replaces arguments)
```sql
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  content TEXT NOT NULL,
  perspective_type VARCHAR(50),
    -- Types: supporting, questioning, alternative, synthesis,
    --        clarification, null (unspecified)
  parent_message_id UUID REFERENCES conversation_messages(id),
    -- For threading (Phase 2)
  resource_links TEXT[], -- Array of URLs
  created_at TIMESTAMP DEFAULT NOW(),
  edited_at TIMESTAMP,
  is_revised BOOLEAN DEFAULT FALSE,
  quality_score DECIMAL(3,2) DEFAULT 0.00
    -- Aggregated from community feedback (Phase 2)
);

CREATE INDEX idx_messages_conversation ON conversation_messages(conversation_id);
CREATE INDEX idx_messages_user ON conversation_messages(user_id);
CREATE INDEX idx_messages_created_at ON conversation_messages(created_at);
CREATE INDEX idx_messages_parent ON conversation_messages(parent_message_id);
```

---

**conversation_participants**
```sql
CREATE TABLE conversation_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  joined_at TIMESTAMP DEFAULT NOW(),
  last_active_at TIMESTAMP DEFAULT NOW(),
  message_count INT DEFAULT 0,
  UNIQUE(conversation_id, user_id)
);

CREATE INDEX idx_participants_conversation ON conversation_participants(conversation_id);
CREATE INDEX idx_participants_user ON conversation_participants(user_id);
```

---

**topics** (Taxonomy for organization)
```sql
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES topics(id),
  conversation_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_topics_slug ON topics(slug);
CREATE INDEX idx_topics_parent ON topics(parent_id);

-- Seed initial topics
INSERT INTO topics (name, slug, description) VALUES
  ('Ethics', 'ethics', 'Moral philosophy and ethical frameworks'),
  ('Metaphysics', 'metaphysics', 'Nature of reality and existence'),
  ('Epistemology', 'epistemology', 'Theory of knowledge'),
  ('Logic', 'logic', 'Reasoning and argumentation'),
  ('Political Philosophy', 'political-philosophy', 'Government, justice, rights'),
  ('Philosophy of Mind', 'philosophy-of-mind', 'Consciousness and mental states'),
  ('Existentialism', 'existentialism', 'Meaning, freedom, and authenticity'),
  ('Eastern Philosophy', 'eastern-philosophy', 'Buddhist, Taoist, Confucian traditions'),
  ('Applied Philosophy', 'applied-philosophy', 'Practical applications to life'),
  ('Contemporary Issues', 'contemporary-issues', 'AI ethics, social justice, modern challenges');
```

---

### 2. Modify Existing Tables

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
    -- Values: public, community, private
  ADD COLUMN conversation_style VARCHAR(100);
    -- Optional: Collaborative, Socratic, Devil's Advocate, Listener

-- Keep these for now (hide in UI), remove later:
-- debates_won, debates_participated, delo_rating, reputation_score

CREATE INDEX idx_profiles_visibility ON profiles(profile_visibility);
```

---

### 3. Delete Deprecated Tables

**judgments** (Remove entirely)
```sql
-- Backup existing data first
CREATE TABLE judgments_backup AS SELECT * FROM judgments;

-- Then drop
DROP TABLE judgments;
```

**debates** (Will be deleted after migration to conversations)
```sql
-- Keep until migration complete, then:
-- CREATE TABLE debates_backup AS SELECT * FROM debates;
-- DROP TABLE debates;
```

**arguments** (Will be deleted after migration to conversation_messages)
```sql
-- Keep until migration complete, then:
-- CREATE TABLE arguments_backup AS SELECT * FROM arguments;
-- DROP TABLE arguments;
```

---

### 4. Data Migration Strategy

**Migration Plan:**

**Step 1: Create New Tables**
- Run all CREATE TABLE statements
- Verify indexes created
- Seed topics table

**Step 2: Migrate Data**
```sql
-- Migrate debates → conversations
INSERT INTO conversations (
  id, topic, description, status, created_by, created_at
)
SELECT
  id,
  topic,
  description,
  CASE
    WHEN status = 'completed' THEN 'archived'
    ELSE 'active'
  END,
  created_by,
  created_at
FROM debates;

-- Update conversation tags (manually curate or default)
UPDATE conversations
SET tags = ARRAY['general']::TEXT[]
WHERE tags IS NULL;

-- Migrate arguments → conversation_messages
INSERT INTO conversation_messages (
  id, conversation_id, user_id, content, created_at
)
SELECT
  id,
  debate_id AS conversation_id,
  user_id,
  content,
  created_at
FROM arguments;

-- Create conversation_participants from debates
INSERT INTO conversation_participants (conversation_id, user_id, joined_at)
SELECT id, created_by, created_at FROM debates
UNION
SELECT id, for_participant, created_at FROM debates WHERE for_participant IS NOT NULL
UNION
SELECT id, against_participant, created_at FROM debates WHERE against_participant IS NOT NULL;

-- Update participant counts
UPDATE conversations c
SET participant_count = (
  SELECT COUNT(*) FROM conversation_participants
  WHERE conversation_id = c.id
);

-- Update message counts
UPDATE conversations c
SET message_count = (
  SELECT COUNT(*) FROM conversation_messages
  WHERE conversation_id = c.id
);

-- Update profile stats
UPDATE profiles p
SET
  conversations_participated = (
    SELECT COUNT(DISTINCT conversation_id)
    FROM conversation_participants
    WHERE user_id = p.id
  ),
  total_messages = (
    SELECT COUNT(*)
    FROM conversation_messages
    WHERE user_id = p.id
  );
```

**Step 3: Verify Migration**
- Check record counts match
- Verify relationships intact
- Test queries on new schema
- Check RLS policies work

**Step 4: Update Application Code**
- Update all queries to use new tables
- Test all features
- Deploy to staging
- Full QA pass

**Step 5: Backup and Drop Old Tables**
- Create backups of old tables
- Drop debates, arguments, judgments
- Celebrate! 🎉

**Rollback Plan:**
- Restore from Supabase automatic backups (< 15 min)
- Manual SQL rollback if needed
- Keep old tables for 30 days before permanent deletion

**Migration Timeline:**
- Preparation: 2 days
- Execution: 4 hours (including testing)
- Verification: 1 day
- Code updates: 3-4 days
- Total: 1 week

---

## Feature Specifications

### Detailed Feature Requirements

---

### 1. Start Conversation

**User Story:** As a user, I want to start a philosophical conversation so that I can explore ideas with others.

**Acceptance Criteria:**
- [ ] User can enter conversation title (max 500 chars)
- [ ] User can add description/context (optional, markdown supported)
- [ ] User can select 1-5 topic tags from available topics
- [ ] User can choose conversation type from dropdown
- [ ] User can optionally state conversation goals
- [ ] User can set public/private visibility (Phase 2)
- [ ] Form validation prevents empty titles
- [ ] Success message shown on creation
- [ ] User redirected to new conversation page
- [ ] Conversation appears in browse list

**UI Components:**
- Title input field
- Rich text editor for description
- Multi-select tag picker
- Conversation type dropdown
- Goals textarea (optional)
- "Start Conversation" button

**API Endpoint:**
```typescript
POST /api/conversations
Body: {
  topic: string (required)
  description?: string
  tags: string[] (required, min 1)
  conversation_type: string (default: 'open_discussion')
  goals?: string
}
Response: {
  success: boolean
  conversation: Conversation
}
```

**Database Impact:**
- Insert into conversations table
- Insert into conversation_participants (creator auto-joins)
- Update topic conversation_count

---

### 2. Join Conversation

**User Story:** As a user, I want to join a conversation so that I can contribute my perspective.

**Acceptance Criteria:**
- [ ] "Join Conversation" button visible when not a participant
- [ ] Click adds user to conversation_participants
- [ ] User avatar added to participant list
- [ ] Contribution form becomes available
- [ ] Confirmation message shown
- [ ] Can't join same conversation twice
- [ ] Private conversations require invitation (Phase 2)

**UI Components:**
- "Join Conversation" button (prominent)
- Participant avatar list
- Confirmation toast

**API Endpoint:**
```typescript
POST /api/conversations/:id/join
Response: {
  success: boolean
  message: string
}
```

**Database Impact:**
- Insert into conversation_participants
- Update conversations.participant_count (denormalized)

---

### 3. Add Perspective/Contribution

**User Story:** As a participant, I want to share my thoughts on the conversation so that I can contribute to the dialogue.

**Acceptance Criteria:**
- [ ] Rich text editor available to participants
- [ ] User can format text (bold, italic, quotes, lists)
- [ ] User can optionally select perspective type
- [ ] User can add resource links (URLs)
- [ ] User can quote/reference previous contributions (Phase 2)
- [ ] Minimum 20 characters required
- [ ] Maximum 10,000 characters
- [ ] Success message after posting
- [ ] New contribution appears immediately
- [ ] Other participants notified (Phase 2)

**UI Components:**
- Rich text editor (Tiptap or Quill)
- Perspective type dropdown (optional)
- Resource links input (multi)
- Character counter
- "Share Perspective" button

**API Endpoint:**
```typescript
POST /api/conversations/:id/messages
Body: {
  content: string (required)
  perspective_type?: string
  resource_links?: string[]
  parent_message_id?: string (Phase 2)
}
Response: {
  success: boolean
  message: ConversationMessage
}
```

**Database Impact:**
- Insert into conversation_messages
- Update conversations.message_count
- Update conversations.last_activity_at
- Update conversation_participants.message_count
- Update conversation_participants.last_active_at
- Update profiles.total_messages

---

### 4. Browse Conversations

**User Story:** As a user, I want to browse active conversations so that I can find interesting discussions to join.

**Acceptance Criteria:**
- [ ] List shows all active conversations
- [ ] Each card shows: title, description (truncated), tags, participant count, message count, last activity
- [ ] Default sort: Most Recent
- [ ] Can filter by topic tags
- [ ] Can sort by: Newest, Most Active, Most Participants (Phase 2)
- [ ] Click card navigates to conversation
- [ ] "Start Conversation" button prominent
- [ ] Pagination or infinite scroll (20 per page)
- [ ] Empty state if no conversations

**UI Components:**
- Conversation cards grid
- Tag filter chips
- Sort dropdown
- "Start Conversation" CTA button
- Pagination controls

**API Endpoint:**
```typescript
GET /api/conversations?tags=[]&sort=recent&limit=20&offset=0
Response: {
  conversations: Conversation[]
  total: number
  hasMore: boolean
}
```

---

### 5. View Conversation

**User Story:** As a user, I want to view a conversation with all its contributions so that I can understand the discussion.

**Acceptance Criteria:**
- [ ] Shows conversation title and description
- [ ] Shows topic tags
- [ ] Shows participant avatars and usernames
- [ ] Lists all contributions chronologically
- [ ] Each contribution shows: author, timestamp, perspective type (if set), content, resource links
- [ ] Highlights user's own contributions
- [ ] "Join Conversation" button if not participant
- [ ] Contribution form if participant
- [ ] "Request Synthesis" button (creator only, MVP)
- [ ] AI synthesis displayed if available

**UI Components:**
- Conversation header (title, description, tags)
- Participant list
- Message list (chronological)
- Message cards (author, content, metadata)
- Join/Contribute CTAs
- Synthesis section (if available)

---

### 6. AI Synthesis

**User Story:** As a conversation creator, I want to request an AI synthesis so that I can see key insights and areas of agreement.

**Acceptance Criteria:**
- [ ] "Request Synthesis" button available to creator
- [ ] Button disabled if fewer than 3 contributions
- [ ] Loading state while AI processes
- [ ] Synthesis displayed in conversation view
- [ ] Synthesis includes:
  - Key points from each perspective
  - Areas of agreement
  - Productive disagreements
  - Unresolved questions
  - Suggested next directions
- [ ] Fact checks included
- [ ] Can request multiple syntheses as conversation evolves
- [ ] Each synthesis timestamped

**Gemini Prompt Structure:**
```
You are facilitating a philosophical conversation, not judging a debate.

Topic: {conversation.topic}

Contributions:
{messages.map(m => `${m.user.username}: ${m.content}`).join('\n\n')}

Please provide:
1. Key Points: Summarize the main perspectives shared (2-3 sentences each)
2. Areas of Agreement: What do participants agree on?
3. Productive Disagreements: Where do thoughtful differences emerge?
4. Unresolved Questions: What remains to be explored?
5. Suggested Directions: What could deepen this conversation?
6. Fact Checks: Verify any factual claims made

Format as JSON.
```

**API Endpoint:**
```typescript
POST /api/conversations/:id/synthesize
Response: {
  success: boolean
  synthesis: {
    key_points: string[]
    agreements: string[]
    disagreements: string[]
    unresolved_questions: string[]
    next_directions: string[]
    fact_checks: FactCheck[]
    created_at: timestamp
  }
}
```

---

### 7. User Profile (Own)

**User Story:** As a user, I want to view and edit my profile so that others can learn about my interests and I can track my participation.

**Acceptance Criteria:**
- [ ] Display: username, bio, expertise areas, learning interests
- [ ] Display stats: conversations participated, total messages, member since
- [ ] Edit buttons for: bio, expertise areas, learning interests
- [ ] Bio: max 500 chars, markdown supported
- [ ] Expertise/Interests: tag-based input, max 10 each
- [ ] Save changes updates profile
- [ ] Shows recent conversations participated in
- [ ] Link to settings page

**UI Components:**
- Profile header (avatar, username)
- Editable bio section
- Tag editors (expertise, interests)
- Stats cards
- Recent activity list
- Settings link

---

### 8. Topic Tags System

**User Story:** As a user, I want to tag conversations with topics so that I can find discussions about specific philosophical areas.

**Acceptance Criteria:**
- [ ] 10 initial topics available
- [ ] Tags displayed as colored chips
- [ ] Can filter conversations by tag
- [ ] Tag shows conversation count
- [ ] Mobile-friendly tag selection
- [ ] Future: admins can add new topics

**Topics (MVP):**
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

---

## Implementation Timeline

### Non-Technical Founder Constraints

**Critical Considerations:**
- Can't implement features yourself
- Need to hire/work with developer
- Limited budget (~$5,000-10,000 for MVP?)
- 3-6 month timeline target
- Must prioritize ruthlessly

**Recommended Approach:**

**Option 1: Hire Freelance Developer**
- Hourly rate: $50-100/hr
- MVP: 150-250 hours = $7,500-25,000
- Timeline: 8-12 weeks
- Pros: More control, can iterate
- Cons: More expensive, need to manage

**Option 2: Development Agency**
- Fixed price: $15,000-30,000 for MVP
- Timeline: 8-12 weeks
- Pros: Professional, turnkey
- Cons: Expensive, less flexible

**Option 3: Technical Co-Founder**
- Equity stake (20-30%)
- Timeline: Flexible
- Pros: Aligned incentives, long-term
- Cons: Giving up equity, finding right person

**Option 4: No-Code Hybrid**
- Use no-code tool for MVP (Bubble, Webflow + Airtable)
- Timeline: 4-6 weeks (you can do some yourself)
- Cost: $1,000-5,000
- Pros: Fast, cheap, you control
- Cons: Limited, eventually need rebuild

---

### Recommended Timeline (Option 1: Freelance Dev)

**Weeks 1-2: Planning & Setup**
- Finalize feature scope
- Design key screens (Figma mockups)
- Set up development environment
- Database schema design review

**Weeks 3-5: Core Database & Backend**
- Database migration
- New table creation
- API endpoints for conversations
- Authentication flow review

**Weeks 6-8: Core UI Development**
- Start/Join/Browse conversations
- Add perspectives UI
- View conversation page
- Profile updates

**Weeks 9-10: AI Integration & Polish**
- AI synthesis implementation
- Testing and bug fixes
- UI polish and responsiveness
- Performance optimization

**Weeks 11-12: Testing & Launch Prep**
- Full QA pass
- Beta user testing
- Bug fixes
- Prepare launch materials
- Soft launch to small group

**Total: 12 weeks**
**Cost: ~$10,000-15,000** (175-250 hours @ $60-75/hr)

---

### Phase 2 & 3 (Future)

**Phase 2: Months 4-6**
- Discovery enhancements (search, filtering)
- Social features (following, profiles)
- Reading groups
- Notification system
- Cost: $8,000-12,000
- Can be done in stages

**Phase 3: Months 7-12**
- Mentorship and study partners
- Argument mapping
- Premium features
- Expert platform
- Cost: $15,000-20,000
- Revenue should offset costs

---

## Success Metrics

### MVP Launch (First 3 Months)

**Activation Metrics:**
- 200+ registered users
- 80%+ complete onboarding
- 60%+ create or join at least 1 conversation
- 40%+ post at least 1 contribution

**Engagement Metrics:**
- 50+ active conversations
- Avg 3+ participants per conversation
- Avg 5+ contributions per conversation
- 30% weekly active users (WAU)
- 15% daily active users (DAU)

**Quality Metrics:**
- Avg contribution length: 200+ words
- 50%+ conversations reach "synthesis" (10+ contributions)
- 70%+ conversations have diverse topic tags
- <5% conversations reported/moderated

**Retention Metrics:**
- 50% Week 1 retention
- 30% Week 4 retention
- 20% Month 3 retention

**User Satisfaction:**
- NPS score: 40+
- User interviews: 10-15 users
- Qualitative feedback: "This is different from Reddit" sentiment

---

### Phase 2 Success (Months 4-6)

**Growth:**
- 1,000+ registered users (5x growth)
- 200+ active conversations
- 50+ reading groups
- 30% MOM growth

**Engagement:**
- 40% WAU
- 20% DAU
- 100+ new conversations/month
- 1,000+ new contributions/month

**Social Features:**
- 20%+ users follow others
- 30%+ users have study partners
- 50%+ users save conversations
- 40%+ users return to saved content

**Quality:**
- Avg 4+ participants per conversation
- Avg 8+ contributions per conversation
- Reading groups: 60%+ completion rate
- User-generated content (guides, resources): 20+ pieces

---

### Phase 3 Success (Months 7-12)

**Scale:**
- 5,000+ registered users
- 500+ active conversations
- 100+ reading groups
- 50+ philosophy circles

**Monetization:**
- 500+ paid users (10% conversion)
- $10,000+ MRR
- $120,000 ARR
- Avg LTV: $200-400
- CAC < $50

**Community:**
- 50+ mentorship relationships
- 100+ expert contributors
- 500+ DAU
- 2,000+ WAU
- 50% Month 3 retention

**Content:**
- 1,000+ quality conversations
- Community wiki: 200+ articles
- 50+ curated topic guides
- 100+ argument maps created

---

## Risk Mitigation

### Technical Risks

**Risk:** Database migration fails
**Mitigation:**
- Test migration on staging first
- Keep old tables as backup
- Supabase automatic backups
- Rollback plan documented

**Risk:** AI synthesis too slow/expensive
**Mitigation:**
- Rate limit synthesis requests
- Cache synthesis results
- Use Gemini Flash (cheaper)
- Make synthesis optional

**Risk:** Performance issues at scale
**Mitigation:**
- Database indexes optimized
- Pagination implemented
- Caching strategy (Redis if needed)
- Monitor performance from day 1

---

### Product Risks

**Risk:** Users don't understand conversation model
**Mitigation:**
- Clear onboarding flow
- Explanation of how it differs from debates
- Example conversations seeded
- Tutorial/help content

**Risk:** Not enough users to create critical mass
**Mitigation:**
- Seed 20-30 initial conversations (you + beta users)
- Invite philosophy communities (Reddit, Discord)
- Philosophy YouTuber partnerships
- Targeted launch (r/philosophy, Hacker News)

**Risk:** Quality degrades as platform grows
**Mitigation:**
- Community moderation tools (Phase 2)
- Quality feedback system
- Reading groups maintain high bar
- Expert involvement (credibility)

---

### Business Risks

**Risk:** Can't attract paid users
**Mitigation:**
- Free tier very functional
- Premium features genuinely valuable
- Student/educator discounts
- Annual plans incentivized

**Risk:** Can't compete with free (Reddit)
**Mitigation:**
- Better UX for philosophy
- Features Reddit doesn't have
- Quality over quantity
- Target users frustrated with Reddit

**Risk:** Narrow niche, limited growth
**Mitigation:**
- Philosophy broader than you think
- Applied philosophy appeals to many
- B2B opportunities (universities)
- International market (English-speaking)

---

## Next Steps

### Immediate Actions (Next 2 Weeks)

**For Non-Technical Founder:**

1. **Finalize MVP Scope**
   - Review this document
   - Decide: What can we cut if needed?
   - Lock feature set for MVP

2. **Design Key Screens**
   - Sketch or wireframe:
     - Start Conversation page
     - Browse Conversations page
     - View Conversation page
     - User Profile page
   - Tools: Figma (free), Excalidraw, paper
   - Get feedback from 3-5 potential users

3. **Find Developer**
   - Post on Upwork, Toptal, or ask network
   - Required skills: Next.js, Supabase, TypeScript
   - Show this roadmap doc
   - Get quotes and timeline estimates
   - Check references and past work

4. **Prepare Content**
   - Write 20-30 seed conversation topics
   - Draft onboarding flow copy
   - Prepare "About" page content
   - Plan initial topic tags

5. **Beta User Recruitment**
   - Identify 20-30 beta testers
   - Philosophy students, professors, enthusiasts
   - Mix of backgrounds and expertise
   - Get commitments before launch

6. **Set Up Project Management**
   - Notion, Linear, or Jira
   - GitHub for code repository
   - Communication with developer (Slack?)
   - Track progress against timeline

---

### Development Phase (Weeks 3-12)

**Weekly Cadence:**
- Monday: Week planning, priorities
- Wednesday: Progress check-in
- Friday: Demo of week's work
- Developer works 20-30 hrs/week

**Your Role:**
- Review UI/UX designs
- Test features as built
- Provide feedback quickly
- Write content and seed data
- Recruit beta users
- Plan launch strategy

**Developer's Role:**
- Database setup and migration
- Backend API development
- Frontend UI implementation
- Testing and bug fixes
- Deployment setup

---

### Pre-Launch (Weeks 11-12)

1. **Beta Testing**
   - Invite 20-30 beta users
   - 2-week testing period
   - Collect feedback via form
   - Fix critical bugs
   - Iterate on UX

2. **Content Seeding**
   - Create 20-30 conversations
   - You + beta users contribute
   - Show variety of topics
   - Demonstrate quality

3. **Launch Materials**
   - Product Hunt post
   - Blog post announcement
   - Social media posts
   - Email to interested list
   - Press outreach (philosophy sites)

4. **Marketing Channels**
   - Post in r/philosophy, r/askphilosophy
   - Philosophy Discord servers
   - Philosophy Twitter (#philtwitter)
   - Hacker News (Show HN)
   - Philosophy YouTube comments

---

### Launch & Beyond (Month 4+)

**Month 1:**
- Soft launch to beta users
- Collect feedback, fix bugs
- Public launch (Product Hunt, HN)
- Target: 200 users, 50 conversations

**Month 2:**
- Feature iteration based on feedback
- Marketing push (podcasts, communities)
- Target: 500 users, 100 conversations

**Month 3:**
- Plan Phase 2 features
- Start Phase 2 development
- First revenue experiments
- Target: 1,000 users, 200 conversations

**Months 4-6:**
- Phase 2 rollout
- Reading groups launch
- Social features
- Target: 2,000 users, paid tier beta

**Months 7-12:**
- Phase 3 development
- Monetization focus
- Scale marketing
- Target: 5,000 users, $10K MRR

---

## Conclusion

This feature roadmap provides a clear path from the current debate-focused platform to a thriving conversation-first philosophical community.

**Key Takeaways:**

1. **MVP is achievable** in 8-12 weeks with focused scope
2. **Database transformation** is the biggest technical change
3. **Phased approach** manages risk and allows iteration
4. **Budget-conscious** approach prioritizes ruthlessly
5. **User needs alignment** ensures product-market fit

**Critical Success Factors:**

- **Find the right developer** - This is make-or-break
- **Ruthless prioritization** - Say no to nice-to-haves
- **Quality over quantity** - Better 200 engaged users than 2,000 lurkers
- **Community culture** - Set tone from day 1
- **Iterate based on feedback** - Users will guide Phase 2

**Investment Required:**

- MVP: $10,000-15,000 + 3 months
- Phase 2: $8,000-12,000 + 3 months
- Phase 3: $15,000-20,000 + 6 months
- Total: $33,000-47,000 over 12 months

**Potential Outcomes:**

- Conservative: 1,000 users, 100 paid, $2,000 MRR (Year 1)
- Moderate: 5,000 users, 500 paid, $10,000 MRR (Year 1)
- Optimistic: 10,000 users, 2,000 paid, $30,000 MRR (Year 2)

**The path is clear. The vision is strong. The time is now.**

Let's build a platform where philosophical conversations flourish. 🌱

---

**Document Status:** FINAL
**Last Updated:** November 15, 2025
**Next Review:** After MVP launch

**Questions or feedback?** Review with development team before proceeding.
