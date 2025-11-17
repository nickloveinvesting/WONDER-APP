# Technical Implementation Summary

**Source:** technical-implementation-plan.md
**Date:** November 15, 2025

## Executive Summary

Complete technical roadmap for transforming philosophy app from competitive debate to conversation-first platform. **Timeline:** 16-20 weeks. **Effort:** 380-550 person-hours. **Key transformation:** Debates → Conversations, Binary structure → Multi-perspective discussions.

---

## Timeline & Phase Breakdown

### Phase 0: Foundation & Cleanup (Weeks 1-2)
**Effort:** 60-80 hours | **Risk:** LOW

**Critical Bug Fixes:**
- Fix signup flow (backend not connected)
- Add reputation updates to judge endpoint
- Effort: 14-18 hours

**Branding Updates:**
- Update app name throughout codebase
- Rename DeLO → Insight Score (UI only)
- Update color palette (keep ARGUED colors or create new)
- Effort: 12-18 hours

**Code Cleanup:**
- Remove duplicate signOut implementation
- Add input validation
- Effort: 5-7 hours

### Phase 1: Core Conversations (Weeks 3-6)
**Effort:** 120-150 hours | **Risk:** MEDIUM

**New Database Tables:**
1. `conversations` - Replaces debates table
2. `conversation_messages` - Replaces arguments table
3. `topics` - Organize by philosophical category
4. `conversation_participants` - Track involvement
5. `message_feedback` - Replaces judgments
6. `user_preferences` - Notification/privacy settings

**API Routes:**
- `/api/conversations` - Create, list conversations
- `/api/conversations/[id]` - Get, update, delete
- `/api/conversations/[id]/messages` - Message CRUD
- `/api/messages/[id]` - Message operations

**UI Components:**
- ConversationCard
- MessageThread
- ConversationHeader
- ParticipantList
- PerspectiveTag

### Phase 2: Community Features (Weeks 7-10)
**Effort:** 100-120 hours | **Risk:** MEDIUM

**Features:**
- Search functionality (full-text)
- User profiles (public/private)
- Follow system
- Bookmarking
- Notifications
- Reading groups (basic)

### Phase 3: Advanced Features (Weeks 11-14)
**Effort:** 80-100 hours | **Risk:** LOW

**Features:**
- Advanced search filters
- Argument mapping
- AI synthesis (not judgment)
- Community moderation tools
- Analytics dashboard

### Phase 4: iOS Deployment (Weeks 15-16)
**Effort:** 25-40 hours (with freelancer) | **Risk:** MEDIUM

**Tasks:**
- Hire Capacitor setup freelancer ($700-800)
- Configure Next.js static export
- iOS project setup in Xcode
- App Store submission

---

## Key Database Changes

### Conversations Table (Replaces debates)

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  topic_id UUID REFERENCES topics(id),
  topic_tags TEXT[],
  status TEXT DEFAULT 'active',
  conversation_type TEXT DEFAULT 'open_discussion',
  creator_id UUID REFERENCES profiles(id),
  moderator_id UUID REFERENCES profiles(id),
  perspectives_count INTEGER DEFAULT 0,
  messages_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Conversation Types:**
- open_discussion
- moderated_dialogue
- socratic_dialogue
- case_study
- reading_group
- expert_ama

### Conversation Messages Table (Replaces arguments)

```sql
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  user_id UUID REFERENCES profiles(id),
  parent_message_id UUID REFERENCES conversation_messages(id),
  content TEXT NOT NULL,
  perspective_type TEXT,
  is_key_point BOOLEAN DEFAULT FALSE,
  is_revised BOOLEAN DEFAULT FALSE,
  reply_count INTEGER DEFAULT 0,
  quality_score DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);
```

**Perspective Types:**
- supporting
- critical
- alternative
- synthesis
- question
- empirical
- philosophical
- personal_experience

### Topics Table (New)

```sql
CREATE TABLE topics (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES topics(id),
  conversation_count INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Default Topics:**
1. Metaphysics
2. Ethics
3. Epistemology
4. Logic
5. Aesthetics
6. Philosophy of Mind
7. Social Philosophy
8. Political Philosophy
9. Philosophy of Science
10. Applied Ethics

### Profiles Table Modifications

```sql
ALTER TABLE profiles ADD COLUMNS:
- bio TEXT
- expertise_areas TEXT[]
- learning_interests TEXT[]
- conversations_participated INT DEFAULT 0
- total_messages INT DEFAULT 0
- onboarding_completed BOOLEAN DEFAULT FALSE
- profile_visibility TEXT DEFAULT 'public'
- conversation_style TEXT

-- Keep but hide in UI (remove later):
- debates_won
- debates_participated
- delo_rating
- reputation_score
```

---

## Data Migration Strategy

### Step 1: Create New Tables
- Run all CREATE TABLE statements
- Verify indexes created
- Seed topics table

### Step 2: Migrate Data

```sql
-- Migrate debates → conversations
INSERT INTO conversations (id, title, description, status, creator_id, created_at)
SELECT id, topic, description,
  CASE WHEN status = 'completed' THEN 'archived' ELSE 'active' END,
  created_by, created_at
FROM debates;

-- Migrate arguments → conversation_messages
INSERT INTO conversation_messages (id, conversation_id, user_id, content, created_at)
SELECT id, debate_id, user_id, content, created_at
FROM arguments;

-- Create conversation_participants from debates
INSERT INTO conversation_participants (conversation_id, user_id, joined_at)
SELECT id, created_by, created_at FROM debates
UNION
SELECT id, for_participant, created_at FROM debates WHERE for_participant IS NOT NULL
UNION
SELECT id, against_participant, created_at FROM debates WHERE against_participant IS NOT NULL;
```

### Step 3: Verify Migration
- Check record counts match
- Verify relationships intact
- Test queries on new schema

### Step 4: Update Application Code
- Update all queries to use new tables
- Test all features
- Deploy to staging

### Step 5: Backup and Drop Old Tables
- Create backups
- Drop debates, arguments, judgments
- Keep backups for 30 days

**Migration Timeline:** 1 week
**Rollback Plan:** Supabase automatic backups (< 15 min restore)

---

## Dependencies & Tools

### Core Stack (Existing)
- Next.js 15 (App Router)
- React 19
- TypeScript
- Supabase (auth, database, storage)
- Tailwind CSS

### New Dependencies
- Capacitor (iOS deployment)
- Cloud Build Service (Codemagic or GitHub Actions)

### Development Tools
- Claude Code (AI pair programming)
- Vercel (hosting)
- Supabase CLI (migrations)
- Xcode (iOS builds)

---

## iOS Deployment Details

### Static Export Configuration

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
```

### Capacitor Setup

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init
npx cap add ios
npx cap sync
```

### App Store Requirements
- Privacy policy (hosted at permanent URL)
- Content reporting system (for UGC)
- Demo account for Apple reviewers
- Age rating compliance (13+ likely)
- Privacy manifest (PrivacyInfo.xcprivacy)

### Submission Checklist
- [ ] App icons (all sizes)
- [ ] Splash screens
- [ ] Screenshots (5-10 per device)
- [ ] App description
- [ ] Keywords
- [ ] Privacy labels
- [ ] Demo account credentials
- [ ] Support URL
- [ ] Marketing URL

---

## Risk Mitigation

### Technical Risks

**Database Migration Fails:**
- Mitigation: Test on staging first, keep old tables as backup
- Rollback: Supabase automatic backups

**iOS Deployment Complications:**
- Mitigation: Hire experienced Capacitor freelancer
- Fallback: PWA-only if App Store fails

**Static Export Challenges:**
- Mitigation: Test early (Week 1)
- Fallback: Keep web app as SSR, separate mobile version

**Performance Issues:**
- Mitigation: Database indexes, pagination, caching
- Monitoring: Supabase dashboard, error tracking

---

## Success Metrics

### Technical Goals
- Zero data loss during migrations
- < 200ms API response times
- iOS app approved within 5 weeks
- Budget stays under $1,500 for iOS
- All core features work on iOS

### Completion Criteria
- [ ] All phases delivered on schedule
- [ ] Database restructured successfully
- [ ] iOS app live in App Store
- [ ] No major performance issues
- [ ] Smooth transition for existing users

---

## Founder Time Estimates

**Phase 0:** 60-80 hours (with Claude Code)
**Phase 1:** 120-150 hours (database + backend)
**Phase 2:** 100-150 hours (frontend transformation)
**Phase 3:** 80-100 hours (advanced features)
**Phase 4:** 25-40 hours (iOS with freelancer) or 60-100 hours (DIY)

**Total:** 385-520 hours (with freelancer) or 420-580 hours (full DIY)

**Weekly commitment:** 24-29 hours/week over 16-20 weeks

---

## Outsourcing Recommendations

### Should Outsource
- **iOS Capacitor Setup:** $700-800 (saves 30-40 hours)
- **App Icon Design:** $75-150 (saves 8-12 hours)

### Can DIY with Claude Code
- Database migration
- Frontend updates
- API routes
- Content creation
- Community engagement

### Should NOT Outsource
- Vision & strategy
- Database schema design
- Community moderation
- Feature prioritization
- Launch messaging

---

## Next Steps (Week 1)

1. Fix signup flow (6-8 hours)
2. Update branding (4-6 hours)
3. Test static export (2 hours)
4. Plan database migration (8-12 hours)
5. Create migration SQL scripts (10-15 hours)

**Total Week 1:** 30-43 hours
