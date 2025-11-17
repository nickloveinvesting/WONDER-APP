# Inquire Implementation Roadmap

## Overview

This roadmap breaks down the implementation of the Inquire feature into 5 phases over 5 weeks. Each phase builds on the previous one, with clear milestones and deliverables.

**Total Timeline**: 5 weeks
**Team Size**: 2-3 developers + 1 content creator + 1 designer
**Launch Target**: 80 topics, full feature set, production-ready

---

## Phase 1: Database & Backend (Week 1)

**Goal**: Establish data foundation and backend APIs

### Database Tasks

#### Day 1-2: Database Setup
- [ ] Run migration: `20250117_create_inquire_tables.sql`
- [ ] Verify all tables created successfully
- [ ] Test RLS policies with different user roles
- [ ] Seed initial data:
  - [ ] 4 inquiry categories (Social, Economic, AI Ethics, Moral)
  - [ ] 10 philosophical frameworks with color classes
  - [ ] Initial framework-category relationships
- [ ] Create database backup strategy

#### Day 3-4: API Routes (Next.js API routes or Server Actions)
- [ ] **GET** `/api/inquire/categories` - List all categories with stats
- [ ] **GET** `/api/inquire/categories/[slug]` - Get category with topics
- [ ] **GET** `/api/inquire/topics/[slug]` - Get full topic details
- [ ] **GET** `/api/inquire/topics` - List topics with filters (category, difficulty, framework)
- [ ] **POST** `/api/inquire/positions` - Declare/update position
- [ ] **GET** `/api/inquire/positions/[topicId]` - Get user's position on topic
- [ ] **GET** `/api/inquire/positions/history/[topicId]` - Get position history
- [ ] **POST** `/api/inquire/comments` - Create comment
- [ ] **GET** `/api/inquire/comments/[topicId]` - List comments with filters
- [ ] **POST** `/api/inquire/comments/[commentId]/vote` - Vote on comment
- [ ] **POST** `/api/inquire/comments/[commentId]/steelman-rating` - Rate steelman
- [ ] **POST** `/api/inquire/bookmarks` - Bookmark topic
- [ ] **DELETE** `/api/inquire/bookmarks/[topicId]` - Remove bookmark
- [ ] **POST** `/api/inquire/thought-experiments` - Submit experiment response

#### Day 5: Testing & Documentation
- [ ] Write API integration tests
- [ ] Document all API endpoints (OpenAPI/Swagger)
- [ ] Test error handling and edge cases
- [ ] Performance test database queries
- [ ] Set up monitoring/logging for API calls

### Deliverables
- ✅ Fully functional database with all tables, indexes, RLS policies
- ✅ Seeded initial data (categories, frameworks)
- ✅ Complete REST API for all Inquire features
- ✅ API documentation
- ✅ Passing integration tests

---

## Phase 2: Topic Display Pages (Week 2)

**Goal**: Build static pages to display curated content

### UI Development Tasks

#### Day 1-2: Landing & Category Pages
- [ ] **Inquire Landing Page** (`/app/inquire/page.tsx`)
  - [ ] Hero section with headline + CTA
  - [ ] Grid of 4 category cards
  - [ ] Platform features highlight section
  - [ ] Responsive layout (mobile/tablet/desktop)
  - [ ] Integrate with categories API

- [ ] **Category Landing Page** (`/app/inquire/[category]/page.tsx`)
  - [ ] Category header with icon and description
  - [ ] Featured topics section (3-4 topics)
  - [ ] All topics grid
  - [ ] Filter/sort controls
  - [ ] Breadcrumb navigation
  - [ ] Integrate with topics API

#### Day 3-4: Core Components
- [ ] **CategoryCard** component
  - [ ] Icon, title, description, stats
  - [ ] Hover lift effect
  - [ ] Navigation on click
  - [ ] Mobile responsive

- [ ] **TopicCard** component
  - [ ] Title, description, difficulty, frameworks
  - [ ] Engagement stats (comments, positions)
  - [ ] Bookmark button
  - [ ] Category badge (optional)
  - [ ] Line-clamp for long text

- [ ] **FrameworkBadge** component
  - [ ] Dynamic color classes from database
  - [ ] Three sizes (sm, md, lg)
  - [ ] Tooltip with framework description
  - [ ] Click to filter (optional)

- [ ] **DifficultyIndicator** component
  - [ ] Badge and dots variants
  - [ ] Color-coded (green/amber/red)
  - [ ] Icons for each level

- [ ] **InquireBreadcrumb** component
  - [ ] Hierarchy navigation
  - [ ] Active state styling
  - [ ] Click to navigate

#### Day 5: Topic Page Structure
- [ ] **Individual Topic Page** (`/app/inquire/[category]/[topic]/page.tsx`)
  - [ ] Section 1: Topic Overview
    - [ ] Breadcrumb, title, difficulty badge
    - [ ] Quick stats (discussants, positions)
    - [ ] Overview paragraph
  - [ ] Section 2: The Core Question
    - [ ] Four subsections with expand/collapse
  - [ ] Section 3: Philosophical Frameworks
    - [ ] Grid of framework cards
  - [ ] Section 4: Key Positions
    - [ ] Position cards with alternating accents
  - [ ] Section 5: Thought Experiments
    - [ ] Experiment cards (view-only for now)
  - [ ] Section 6: Related Questions
    - [ ] Grid of related topic cards
  - [ ] Section 7: Community Discussion (placeholder)
  - [ ] Sticky sidebar (optional): Table of contents

### Content Creation Tasks
- [ ] Write first 10 topics (2 per category)
  - [ ] Use `TOPIC_CONTENT_TEMPLATE.json` as guide
  - [ ] Get content reviewed for accuracy
  - [ ] Insert into database with proper JSONB structure
- [ ] Source or create category icons
- [ ] Create difficulty level icons

### Deliverables
- ✅ Fully functional Inquire landing page
- ✅ 4 category landing pages
- ✅ Topic detail pages (read-only)
- ✅ All core display components
- ✅ 10 published topics with complete content
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Accessibility: WCAG 2.1 AA compliant

---

## Phase 3: Interactive Features (Week 3)

**Goal**: Enable user engagement (positions, comments, bookmarks)

### Position Declaration System

#### Day 1-2: Position Management
- [ ] **PositionDeclarationForm** component
  - [ ] Position value slider (-2 to +2)
  - [ ] Confidence level selector (1-5)
  - [ ] Framework dropdown
  - [ ] Optional note textarea (for updates)
  - [ ] Form validation
  - [ ] Optimistic UI updates

- [ ] **Position Display** (user's current position)
  - [ ] Show in topic page header
  - [ ] Edit button to open modal
  - [ ] Position summary (stance + framework badge)

- [ ] **Position History** page (`/profile/positions`)
  - [ ] List all topics user has positions on
  - [ ] Show current + past positions
  - [ ] Filter by category, framework
  - [ ] Link to topic pages

- [ ] Backend: Position tracking
  - [ ] Create position API integration
  - [ ] Log changes to position_history table
  - [ ] Update position counts on topics

#### Day 3: Commenting System
- [ ] **CommentCard** component
  - [ ] User info (avatar, username, expert badge, framework)
  - [ ] Comment content (formatted, whitespace preserved)
  - [ ] Voting buttons (up/down)
  - [ ] Reply button
  - [ ] Depth score display
  - [ ] Nested replies (max 3 levels)
  - [ ] Steelman summary display (if replying)

- [ ] **Comment Form** (basic)
  - [ ] Textarea for content
  - [ ] Framework selector
  - [ ] Anonymous mode toggle
  - [ ] Character count
  - [ ] Submit button

- [ ] **Comment Display** (in topic page)
  - [ ] Sort options (depth score, recent, upvotes)
  - [ ] Framework filter
  - [ ] Load more pagination
  - [ ] Real-time count updates

#### Day 4: Advanced Comment Features
- [ ] **SteelmanPrompt** component
  - [ ] Modal overlay
  - [ ] Parent comment preview
  - [ ] Summary textarea (min 50 chars)
  - [ ] Character counter
  - [ ] Continue to reply flow

- [ ] **Steelman Rating** (for parent commenter)
  - [ ] 1-5 star rating
  - [ ] "Is this fair?" prompt
  - [ ] Save rating to database

- [ ] **Voting System**
  - [ ] Optimistic UI (instant feedback)
  - [ ] Vote toggle (upvote ↔ neutral ↔ downvote)
  - [ ] Prevent double-voting
  - [ ] Update vote counts

#### Day 5: Bookmarks & Polish
- [ ] **Bookmark System**
  - [ ] Bookmark button in topic cards
  - [ ] Bookmark icon toggle (filled/outline)
  - [ ] Optimistic UI updates
  - [ ] Bookmark count on topics

- [ ] **User Dashboard** (`/inquire/dashboard`)
  - [ ] Bookmarked topics
  - [ ] Recent positions
  - [ ] Topics with new activity
  - [ ] Recommended topics

- [ ] Polish & bug fixes
  - [ ] Loading states for all async actions
  - [ ] Error handling with user-friendly messages
  - [ ] Toast notifications for success/errors
  - [ ] Form validation feedback

### Content Creation Tasks
- [ ] Write 30 more topics (10 per week, spread across categories)
- [ ] Review and refine existing 10 topics based on user feedback (if in testing)

### Deliverables
- ✅ Position declaration system (create, update, view history)
- ✅ Full commenting system with nested replies
- ✅ Steelman requirement for replies
- ✅ Voting on comments
- ✅ Bookmark system
- ✅ User dashboard
- ✅ 40 total published topics

---

## Phase 4: Position Tracking & Algorithms (Week 4)

**Goal**: Implement advanced features (depth scoring, position evolution, thought experiments)

### Depth Scoring System

#### Day 1-2: Depth Score Algorithm
- [ ] Implement depth score calculation function
  - [ ] Length & substance (word count)
  - [ ] Framework engagement (has framework, mentions frameworks)
  - [ ] Citations (detect links/references)
  - [ ] Steelman accuracy (from ratings)
  - [ ] Reply depth (count substantive replies)
  - [ ] Diverse engagement (different frameworks in replies)

- [ ] **DepthScoreDisplay** component
  - [ ] Score badge with color coding
  - [ ] Tooltip with component breakdown
  - [ ] Info icon with explanation
  - [ ] Three sizes (sm, md, lg)

- [ ] Background job to recalculate scores
  - [ ] Run nightly or on schedule
  - [ ] Update scores based on new activity
  - [ ] Log score changes for debugging

- [ ] Admin dashboard for score analytics
  - [ ] Distribution of scores across comments
  - [ ] Identify outliers (very high/low)
  - [ ] Test score fairness

#### Day 3: Position Evolution Tracker
- [ ] **PositionEvolutionChart** component
  - [ ] Line chart showing position changes over time
  - [ ] Y-axis: -2 to +2 (position values)
  - [ ] X-axis: dates
  - [ ] Tooltips with change reasons
  - [ ] Current position highlighted

- [ ] **Profile Position Evolution** page
  - [ ] List of all topics user has changed position on
  - [ ] Charts for each topic
  - [ ] Timeline view
  - [ ] Export data (CSV)

- [ ] Public position evolution (optional)
  - [ ] Users can choose to share evolution publicly
  - [ ] Others can see how someone's view changed
  - [ ] Privacy controls

#### Day 4: Thought Experiment Interactions
- [ ] **ThoughtExperimentCard** component
  - [ ] Scenario display
  - [ ] Question prompt
  - [ ] Response form (textarea + framework)
  - [ ] Submit response
  - [ ] Show user's submitted response
  - [ ] Analytics bar chart (response distribution)

- [ ] Thought experiment analytics
  - [ ] Aggregate responses by answer
  - [ ] Framework breakdown (how each framework responds)
  - [ ] Display to users after they respond

- [ ] Admin view
  - [ ] See all responses to experiments
  - [ ] Identify interesting patterns
  - [ ] Use for content insights

#### Day 5: Expert Badge System
- [ ] **Expert Badge Application** form
  - [ ] Badge type selection
  - [ ] Credential input (text + proof URL)
  - [ ] Submit for review

- [ ] **Admin Review Panel**
  - [ ] List pending badge applications
  - [ ] View credentials and proof
  - [ ] Approve/reject with notes
  - [ ] Notify user of decision

- [ ] **Community Expert Badge** (algorithmic)
  - [ ] Criteria: avg depth score > 75, active 3+ months
  - [ ] Auto-grant badges to qualifying users
  - [ ] Run weekly check

- [ ] Display expert badges
  - [ ] In comment cards
  - [ ] In user profiles
  - [ ] In leaderboards (optional)

### Content Creation Tasks
- [ ] Write 20 more topics (total: 60)
- [ ] Refine thought experiments based on user responses
- [ ] Create expert contributor guide

### Deliverables
- ✅ Fully functional depth scoring algorithm
- ✅ Position evolution tracking and visualization
- ✅ Interactive thought experiments
- ✅ Expert badge application and verification system
- ✅ 60 total published topics
- ✅ Analytics dashboards for admin

---

## Phase 5: Polish & Testing (Week 5)

**Goal**: Production-ready quality, performance optimization, launch preparation

### Performance Optimization

#### Day 1: Performance Audit
- [ ] Lighthouse audit on all pages
  - [ ] Target: LCP < 2s, FID < 100ms, CLS < 0.1
- [ ] Identify slow queries
  - [ ] Add missing indexes
  - [ ] Optimize JSONB queries
  - [ ] Add query result caching (Redis)
- [ ] Image optimization
  - [ ] Compress all images
  - [ ] Use Next.js Image component
  - [ ] Lazy load below-the-fold content
- [ ] Code splitting
  - [ ] Dynamic imports for heavy components
  - [ ] Route-based splitting
- [ ] CDN setup
  - [ ] Cache static assets at edge
  - [ ] ISR for topic pages (Incremental Static Regeneration)

#### Day 2: Quality Assurance
- [ ] **Testing**
  - [ ] Unit tests for all components (80%+ coverage)
  - [ ] Integration tests for user flows
  - [ ] E2E tests for critical paths (Playwright)
  - [ ] Visual regression tests (Percy or Chromatic)
  - [ ] Accessibility tests (axe-core, manual keyboard testing)

- [ ] **Cross-browser Testing**
  - [ ] Chrome, Firefox, Safari, Edge
  - [ ] Mobile browsers (iOS Safari, Chrome Android)
  - [ ] Test responsive breakpoints

- [ ] **Load Testing**
  - [ ] Simulate 1000 concurrent users
  - [ ] Test database under load
  - [ ] Monitor API response times
  - [ ] Identify bottlenecks

#### Day 3: User Experience Polish
- [ ] **Animations & Transitions**
  - [ ] Smooth page transitions
  - [ ] Loading skeleton screens
  - [ ] Micro-interactions (button hovers, etc.)
  - [ ] Page scroll indicators

- [ ] **Error States**
  - [ ] 404 page for missing topics
  - [ ] Empty states (no comments yet, no bookmarks)
  - [ ] Network error handling
  - [ ] Fallback UI for failed API calls

- [ ] **Onboarding**
  - [ ] First-time user tutorial
  - [ ] Tooltips explaining features
  - [ ] Sample position declaration walkthrough
  - [ ] Steelman feature explanation

- [ ] **Feedback Mechanisms**
  - [ ] Toast notifications for all actions
  - [ ] Success confirmations
  - [ ] Form validation errors inline
  - [ ] Loading indicators

#### Day 4: Content & SEO
- [ ] **Final 20 Topics** (total: 80)
  - [ ] Spread across all categories
  - [ ] Vary difficulty levels
  - [ ] Ensure diverse frameworks represented

- [ ] **SEO Optimization**
  - [ ] Meta titles and descriptions for all pages
  - [ ] Open Graph tags (social sharing)
  - [ ] Structured data (JSON-LD)
  - [ ] XML sitemap generation
  - [ ] Robots.txt configuration

- [ ] **Content Review**
  - [ ] Proofread all 80 topics
  - [ ] Check for consistency in tone
  - [ ] Verify all framework descriptions
  - [ ] Ensure thought experiments are clear

#### Day 5: Launch Preparation
- [ ] **Documentation**
  - [ ] User guide (How to use Inquire)
  - [ ] FAQ page
  - [ ] Content contribution guidelines
  - [ ] API documentation (if public)

- [ ] **Monitoring & Analytics**
  - [ ] Set up error tracking (Sentry)
  - [ ] Analytics (Plausible or Fathom)
  - [ ] Custom events tracking:
    - [ ] Position declarations
    - [ ] Comments posted
    - [ ] Steelman completions
    - [ ] Topic views
    - [ ] Framework usage
  - [ ] Alert system for errors

- [ ] **Security Audit**
  - [ ] Review RLS policies
  - [ ] Check for SQL injection vulnerabilities
  - [ ] Test rate limiting
  - [ ] Verify anonymous mode privacy
  - [ ] GDPR compliance check

- [ ] **Deployment**
  - [ ] Staging deployment for final testing
  - [ ] User acceptance testing (UAT)
  - [ ] Production deployment checklist
  - [ ] Rollback plan in case of issues
  - [ ] Database backup before migration

### Launch Tasks
- [ ] Soft launch to beta testers
- [ ] Collect feedback and fix critical bugs
- [ ] Public announcement
- [ ] Monitor metrics closely for first 48 hours
- [ ] Be ready for hotfixes

### Deliverables
- ✅ Performance optimized (Lighthouse score 90+)
- ✅ Comprehensive test coverage
- ✅ All 80 topics published and reviewed
- ✅ Complete documentation
- ✅ Monitoring and analytics in place
- ✅ Production deployment successful
- ✅ Launch announcement

---

## Success Metrics (Track Post-Launch)

### Engagement Metrics (Month 1)
- **Target**: 40%+ of viewers declare a position
- **Target**: 8+ minutes average time on topic pages
- **Target**: 60%+ return within 7 days
- **Target**: 30%+ read all sections of a topic

### Quality Metrics
- **Target**: Average depth score 60+
- **Target**: 4.0+ average steelman accuracy rating
- **Target**: 20%+ position change rate within 30 days

### Growth Metrics
- **Target**: 500 active users by end of Month 1
- **Target**: 10 verified expert badges by Month 2
- **Target**: 200 topics by Month 3

---

## Risk Mitigation

### Technical Risks
- **Risk**: Database performance degrades with JSONB queries
  - **Mitigation**: Heavy indexing, caching, query optimization
  - **Fallback**: Normalize JSONB into separate tables if needed

- **Risk**: Depth score algorithm isn't fair
  - **Mitigation**: Extensive testing, transparency about components
  - **Fallback**: Allow manual override by admins, community voting alternative

- **Risk**: Steelman requirement frustrates users
  - **Mitigation**: Make it optional but encouraged, clear explanation
  - **Fallback**: Remove requirement, make it a bonus for depth score

### Content Risks
- **Risk**: Can't create 80 quality topics in time
  - **Mitigation**: Start content creation in Phase 1, hire freelance philosophers
  - **Fallback**: Launch with 40-50 topics, add more post-launch

- **Risk**: Topics are too academic/inaccessible
  - **Mitigation**: User testing with non-philosophers, readability tools
  - **Fallback**: Add "simplified version" option

### Product Risks
- **Risk**: Users don't engage (low position declarations)
  - **Mitigation**: Prominent CTAs, explain value, gamification
  - **Fallback**: Make positions optional, focus on reading content

- **Risk**: Comment quality is low despite depth scoring
  - **Mitigation**: Strong moderation, highlight high-quality comments
  - **Fallback**: Require minimum depth score to post

---

## Team Roles & Responsibilities

### Developer 1 (Backend Lead)
- Phase 1: Database & APIs (full ownership)
- Phase 2: API integration for pages
- Phase 3: Position & comment backend
- Phase 4: Depth scoring algorithm
- Phase 5: Performance optimization

### Developer 2 (Frontend Lead)
- Phase 2: Page layouts & core components (full ownership)
- Phase 3: Interactive components (forms, modals)
- Phase 4: Charts & visualization
- Phase 5: Polish & animations

### Developer 3 (Full-stack)
- Phase 1: Assist with API routes
- Phase 2: Component development
- Phase 3: Commenting system
- Phase 4: Thought experiments
- Phase 5: Testing & QA

### Content Creator
- Phase 1: First 10 topics
- Phase 2: 30 more topics
- Phase 3: Review & refine
- Phase 4: 20 more topics
- Phase 5: Final 20 topics + review all

### Designer (Part-time)
- Phase 1: Icon design, color palette refinement
- Phase 2: Component design review, UX feedback
- Phase 3: Interactive element design
- Phase 4: Data visualization design
- Phase 5: Final polish, marketing assets

---

## Post-Launch Roadmap (Phases 6-8)

### Phase 6: AI Integration (Month 2)
- AI Socratic dialogue feature
- AI-generated position challenges
- Smart topic recommendations
- Auto-moderation assistance

### Phase 7: Social Features (Month 2-3)
- Follow users with interesting frameworks
- Peer matching (complementary views)
- Live discussion events
- Collaborative argument mapping

### Phase 8: Curriculum Mode (Month 3-4)
- Guided learning paths
- Prerequisites and progression
- Certificates for completion
- Integration with academic institutions

---

## Conclusion

This roadmap provides a clear, phased approach to building Inquire from foundation to launch. By focusing on core functionality first (Phases 1-3) and adding advanced features later (Phase 4), we can de-risk the project and get user feedback early.

The key to success is maintaining quality standards throughout:
- **Content quality**: Every topic must be rigorously researched and steel-manned
- **Code quality**: Comprehensive testing, performance optimization
- **User experience**: Accessibility, responsiveness, clear feedback

With disciplined execution, Inquire will launch as a world-class philosophy platform that raises the bar for online discourse.

---

**Document Version**: 1.0
**Last Updated**: November 17, 2025
**Owner**: Product Team
**Next Review**: Week 1 kickoff
