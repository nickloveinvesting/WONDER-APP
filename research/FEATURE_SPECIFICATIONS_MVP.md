# PONDER MVP Feature Specifications

**Version:** 1.0
**Date:** November 2025
**Status:** Ready for development

---

## Overview

This document provides detailed technical specifications for MVP features that will launch PONDER as the superior alternative to Reddit for philosophical discussion.

**Priority Tier 1 (MVP Launch):**
1. Depth-Weighted Engagement Scoring System
2. Transparent Moderation Architecture
3. Vault System (Persistent Archive)
4. Expert Verification & Credentialing
5. Fair Feedback System (Snap/Zap)

---

## Feature #1: Depth-Weighted Engagement Scoring System

### Current State
- Upvote/downvote buttons on arguments
- Simple karma count displayed
- No visibility into what generates votes

### Problem
- Memes outrank substantive arguments
- No incentive for quality
- Expert contributions devalued

### Solution
Replace upvote/downvote with multi-factor depth scoring.

### Technical Specification

#### 1.1 Data Model

**Add to `arguments` table:**
```sql
ALTER TABLE arguments ADD COLUMN (
  depth_score INTEGER DEFAULT 0,
  read_time_total INTEGER DEFAULT 0,     -- seconds
  read_time_count INTEGER DEFAULT 0,     -- number of reads
  citation_count INTEGER DEFAULT 0,
  has_counterargument_reference BOOLEAN DEFAULT false,
  expert_endorsements INTEGER DEFAULT 0,
  changed_view_votes INTEGER DEFAULT 0,
  days_of_engagement INTEGER DEFAULT 0,  -- days with new engagement
  last_engagement_at TIMESTAMPTZ
);

-- New tables
CREATE TABLE argument_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  argument_id UUID NOT NULL REFERENCES arguments(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  action_type TEXT NOT NULL, -- 'read', 'cite', 'endorse', 'changed_view'
  duration_seconds INTEGER,  -- for reads
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(argument_id, user_id, action_type) -- one action per user per type
);

CREATE TABLE argument_citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  citing_argument_id UUID NOT NULL REFERENCES arguments(id),
  cited_argument_id UUID NOT NULL REFERENCES arguments(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 1.2 Scoring Algorithm

**Client-side (real-time):**
- Track read time: When user opens an argument, start timer
- Mark as "read" when: 50% scroll through + 30 seconds minimum
- Capture read duration and report to server

**Server-side (calculated daily):**
```typescript
interface DepthScoringInput {
  argumentId: string;
  wordCount: number;
  citationCount: number;
  hasCounterargumentReference: boolean;
  avgReadTimeSeconds: number;
  readCount: number;
  expertEndorsements: number;
  changedViewVotes: number;
  daysSinceCreated: number;
  daysWithNewEngagement: number;
}

function calculateDepthScore(input: DepthScoringInput): number {
  let score = 0;

  // Base score for length (0-100 points)
  if (input.wordCount >= 2000) score += 100;
  else if (input.wordCount >= 1000) score += 75;
  else if (input.wordCount >= 500) score += 50;
  else if (input.wordCount >= 200) score += 25;
  else score += 10;

  // Length bonus (0-20)
  if (input.wordCount > 3000) score += 20;

  // Citation bonus (0-30)
  if (input.citationCount >= 5) score += 30;
  else if (input.citationCount >= 2) score += 20;
  else if (input.citationCount >= 1) score += 15;
  else if (input.hasCounterargumentReference) score += 10;

  // Reading engagement bonus (0-25)
  const avgReadTime = input.avgReadTimeSeconds / input.readCount || 0;
  if (avgReadTime > 300) score += 25; // >5 minutes
  else if (avgReadTime > 120) score += 10; // >2 minutes

  // Expert recognition (0-40)
  score += Math.min(input.expertEndorsements * 10, 30);

  // Community "changed view" votes (0-25)
  score += Math.min(input.changedViewVotes * 5, 25);

  // Longevity bonus (0-20)
  if (input.daysWithNewEngagement > 14 && input.daysSinceCreated > 14) {
    score += 20;
  } else if (input.daysWithNewEngagement > 7 && input.daysSinceCreated > 7) {
    score += 15;
  }

  return Math.min(Math.max(score, 0), 500); // Normalize to 0-500
}
```

#### 1.3 UI Display

**Argument Card Changes:**
```jsx
// Before
<div className="flex gap-4">
  <Button variant="ghost">👍 {upvotes}</Button>
  <Button variant="ghost">👎 {downvotes}</Button>
</div>

// After (Depth Scoring)
<div className="flex gap-3 items-center">
  <div className="flex items-center gap-1">
    <Zap className="w-4 h-4 text-teal-600" />
    <span className="text-sm font-semibold">{depthScore}</span>
  </div>
  <div className="text-xs text-slate-600 flex gap-2">
    {avgReadTime > 120 && <span>📖 Deep Read</span>}
    {citationCount >= 2 && <span>📚 Well-sourced</span>}
    {expertEndorsements > 0 && <span>⭐ Expert approved</span>}
  </div>
</div>

// Interaction buttons
<div className="flex gap-2">
  <Button
    variant="outline"
    onClick={onSnap}
    className="gap-2"
  >
    <Sparkles className="w-4 h-4" />
    Snap
  </Button>
  <Button
    variant="ghost"
    onClick={onZap}
    className="gap-2 text-amber-600"
  >
    <Zap className="w-4 h-4" />
    Zap (Why unclear?)
  </Button>
  <Button
    variant="ghost"
    onClick={onChangedView}
    className="gap-2 text-green-600"
  >
    <Brain className="w-4 h-4" />
    Changed my view
  </Button>
</div>
```

**Sorting Options:**
```jsx
<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
  <option value="depth_score">Depth (Most Substantive)</option>
  <option value="recent">Recent</option>
  <option value="expert_endorsed">Expert-Endorsed</option>
  <option value="most_changed_views">Changed Most Views</option>
  <option value="most_read">Most Read</option>
</select>
```

#### 1.4 API Endpoints

**POST /api/arguments/[id]/metrics**
```typescript
// Track reading/engagement
{
  action: 'read' | 'cite' | 'endorse' | 'changed_view';
  durationSeconds?: number;
  citedArgumentId?: string;
}

Response:
{
  success: true;
  currentDepthScore: number;
  metrics: {
    totalReads: number;
    avgReadTime: number;
    totalCitations: number;
  }
}
```

**GET /api/debates/[id]/arguments?sort=depth_score**
```typescript
// Returns arguments sorted by depth score with metrics displayed
Response:
{
  arguments: [
    {
      id: string;
      content: string;
      depthScore: number;
      citations: number;
      avgReadTime: number;
      expertEndorsements: number;
      ...
    }
  ]
}
```

#### 1.5 Implementation Checklist

- [ ] Database migrations (add columns and tables)
- [ ] Read time tracking JavaScript (client-side)
- [ ] Depth score calculation function
- [ ] Daily batch job to update depth_score column
- [ ] Update argument card UI component
- [ ] Add sorting/filtering UI
- [ ] API endpoint for tracking metrics
- [ ] API endpoint for fetching sorted arguments
- [ ] Analytics dashboard showing depth distribution

---

## Feature #2: Transparent Moderation Architecture

### Current State
- No visible moderation system
- No appeals process
- No moderation logs

### Problem
- Invisible decision-making creates trust issues
- No accountability for mods
- Users can't understand why posts removed

### Solution
Three-tier moderation with full transparency and community oversight.

### Technical Specification

#### 2.1 Data Model

```sql
CREATE TABLE community_moderators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES debates(id),  -- or global for main community
  user_id UUID NOT NULL REFERENCES profiles(id),
  role TEXT NOT NULL, -- 'moderator', 'appeals_board'
  term_start_date DATE NOT NULL,
  term_end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  elected_votes_received INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(community_id, user_id, term_start_date)
);

CREATE TABLE moderation_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID NOT NULL, -- argument_id or debate_id
  content_type TEXT NOT NULL, -- 'argument', 'debate'
  action_type TEXT NOT NULL, -- 'remove', 'flag', 'ban', 'hide'
  reason TEXT NOT NULL,
  rule_violated TEXT,
  moderator_id UUID REFERENCES profiles(id), -- NULL for AI
  moderator_type TEXT NOT NULL, -- 'ai', 'human', 'system'
  visibility TEXT DEFAULT 'public', -- 'public', 'private'
  is_appealable BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE moderation_appeals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_id UUID NOT NULL REFERENCES moderation_actions(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  appeal_reason TEXT NOT NULL,
  appeal_status TEXT DEFAULT 'pending', -- 'pending', 'granted', 'denied'
  appeal_result TEXT,
  appeals_board_decision TEXT,
  decided_by_user_id UUID REFERENCES profiles(id),
  decided_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE community_guidelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID,
  rule_key TEXT NOT NULL, -- 'no_harassment', 'no_spam', etc.
  rule_text TEXT NOT NULL,
  examples TEXT[], -- examples of violations
  exceptions TEXT[], -- exceptions to rule
  enforcement_notes TEXT,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 2.2 Moderation Workflow

**Step 1: AI Triage (Automated)**
```typescript
interface AITriageInput {
  content: string;
  contentType: 'argument' | 'debate';
  authorId: string;
  authorReputation: number;
}

async function triageContent(input: AITriageInput) {
  const checks = [
    checkForSpam(input.content),
    checkForThreats(input.content),
    checkForHarassment(input.content),
    checkForMisinformation(input.content),
  ];

  const result = await Promise.all(checks);

  if (result.some(r => r.confidence > 0.95)) {
    // Auto-remove obvious violations
    await createModerationAction({
      contentId: input.contentId,
      contentType: input.contentType,
      actionType: 'remove',
      reason: result.find(r => r.confidence > 0.95).reason,
      moderatorType: 'ai',
      isAppealable: true,
    });
  } else if (result.some(r => r.confidence > 0.7)) {
    // Flag for human review
    await createModerationAction({
      contentId: input.contentId,
      contentType: input.contentType,
      actionType: 'flag',
      reason: result.find(r => r.confidence > 0.7).reason,
      moderatorType: 'ai',
      visibility: 'private', // Only mod queue sees
    });
  }
}
```

**Step 2: Human Moderation (Elected Mods)**
```typescript
// Moderator dashboard
interface ModerationQueueItem {
  id: string;
  contentId: string;
  content: string;
  author: UserProfile;
  flagReason: string;
  aiConfidence: number;
  communityGuidelines: CommunityGuideline[];
}

// Mod decision
async function handleModeratorDecision(
  actionId: string,
  decision: 'approve' | 'remove' | 'escalate',
  reason?: string,
  moderatorId: string
) {
  if (decision === 'approve') {
    // Clear the flag
    await updateModerationAction(actionId, {
      actionType: 'cleared',
      decidedBy: moderatorId
    });
  } else if (decision === 'remove') {
    // Remove content, make appealable
    await updateModerationAction(actionId, {
      actionType: 'remove',
      reason,
      decidedBy: moderatorId,
      isAppealable: true
    });
    // Send notification to user
    await notifyUser(contentAuthorId, {
      title: 'Your post was removed',
      reason,
      appealDeadline: dayFromNow(),
      appealLink: `/appeal/${actionId}`
    });
  } else if (decision === 'escalate') {
    // Send to appeals board
    await escalateToAppealsBoardDecision(actionId);
  }
}
```

**Step 3: Appeals Process (Community Oversight)**
```typescript
async function submitAppeal(
  actionId: string,
  userId: string,
  appealReason: string
) {
  const deadline = moderationAction.createdAt + 30 days;
  if (now > deadline) {
    throw new Error('Appeal window closed');
  }

  const appeal = await createModerrationAppeal({
    actionId,
    userId,
    appealReason,
    status: 'pending',
  });

  // Auto-assign to appeals board rotation
  const boardMembers = await getAppealsBoardMembers();
  const assigned = selectRandomBoard(boardMembers, 3);

  for (const member of assigned) {
    await notifyUser(member.id, {
      title: 'New appeal requires review',
      appealId: appeal.id,
      deadline: 7.days(),
    });
  }
}

async function decideAppeal(
  appealId: string,
  boardMemberId: string,
  decision: 'grant' | 'deny',
  reasoning: string
) {
  const appeal = await getAppeal(appealId);

  // Grant = overturn moderation action
  if (decision === 'grant') {
    await updateModerationAction(appeal.actionId, {
      actionType: 'overturned_by_appeal',
      result: 'content_restored'
    });
    await notifyUser(appeal.userId, {
      title: 'Your appeal was granted',
      content_restored: true
    });
  } else {
    // Deny = moderation action stands
    await updateAppeal(appealId, {
      status: 'denied',
      reasoning
    });
    await notifyUser(appeal.userId, {
      title: 'Your appeal was denied',
      reasoning
    });
  }
}
```

#### 2.3 Moderation Log UI

**Public Moderation Log Page:**
```jsx
// /moderation-log
<div className="space-y-4">
  <div className="flex gap-4">
    <input
      type="date"
      value={startDate}
      onChange={e => setStartDate(e.target.value)}
      placeholder="From"
    />
    <select value={actionType} onChange={e => setActionType(e.target.value)}>
      <option value="">All Actions</option>
      <option value="remove">Removed</option>
      <option value="ban">Banned</option>
      <option value="flag">Flagged</option>
    </select>
    <select value={decision} onChange={e => setDecision(e.target.value)}>
      <option value="">All Decisions</option>
      <option value="overturned">Overturned on Appeal</option>
      <option value="upheld">Upheld on Appeal</option>
    </select>
  </div>

  {log.map(entry => (
    <div className="border border-slate-200 rounded-lg p-4">
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold">{entry.actionType}</h4>
          <p className="text-sm text-slate-600">{entry.reason}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-600">{formatDate(entry.createdAt)}</p>
          <p className="text-xs font-medium">
            {entry.moderatorType === 'ai' ? 'AI Triage' : `Mod: ${entry.moderatorName}`}
          </p>
        </div>
      </div>

      {entry.appeals.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs font-semibold text-amber-700">
            Appeal: {entry.appeals[0].status}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {entry.appeals[0].result}
          </p>
        </div>
      )}
    </div>
  ))}
</div>
```

#### 2.4 Community Guidelines Template

```markdown
# PONDER Community Guidelines

These rules apply to all communities on PONDER.

## Rule 1: No Harassment or Abuse
- Don't attack people; critique ideas
- No personal insults, slurs, or dehumanization
- No threats, doxxing, or coordinated harassment
- **Examples of violations**: "You're an idiot", "Go die", publishing someone's home address
- **Examples of acceptable**: "I disagree because...", "That argument assumes..."

## Rule 2: No Spam or Manipulation
- No promotional spam
- No artificial engagement manipulation
- No bot networks or coordinated vote brigades
- **Examples**: Repeatedly posting the same comment, buying upvotes, using alt accounts

## Rule 3: Good Faith Engagement
- Engage to understand, not to dominate
- Address the strongest version of opposing arguments
- Update your view if presented with better arguments
- **Examples of violations**: Bad-faith arguments, strawmanning, sea-lioning
- **Examples of acceptable**: "I hadn't considered that", asking clarifying questions

## Rule 4: Respect Intellectual Standards
- Support claims with evidence where relevant
- Acknowledge sources and evidence quality
- Correct yourself if you made errors
- **Examples of violations**: Persistent lying, ignoring evidence, citation fraud
- **Examples of acceptable**: "I'm not sure about the evidence", sharing peer-reviewed research

## All Other Topics Are Welcome
- Political philosophy, ethics, metaphysics, epistemology
- Controversial positions, unpopular views, dissenting arguments
- We welcome diversity of philosophical perspective
- Moderation focuses on *how* you argue, not *what* you argue
```

#### 2.5 Implementation Checklist

- [ ] Database migrations (moderator, action, appeal tables)
- [ ] AI triage system implementation
- [ ] Moderation queue UI for mods
- [ ] Appeal submission form
- [ ] Appeals board decision interface
- [ ] Public moderation log page
- [ ] Notification system for appeals
- [ ] Moderator election system (community voting)
- [ ] Appeals board rotating/term limit system

---

## Feature #3: Vault System (Persistent Archive)

### Current State
- Debates stored in database
- Searchable in real-time
- No dedicated "archive" concept

### Problem
- Older debates disappear from feed
- Difficult to find historical discussions
- Knowledge doesn't persist and build

### Solution
Dedicated "Vault" system with permanent storage, searchable index, and knowledge graph.

### Technical Specification

#### 3.1 Data Model

```sql
-- Existing debates table modified:
ALTER TABLE debates ADD COLUMN (
  vault_status TEXT DEFAULT 'active', -- 'active', 'completed', 'archived'
  vault_tags TEXT[] DEFAULT '{}',     -- ['philosophy of mind', 'consciousness']
  school_of_thought TEXT,             -- 'analytic', 'continental', 'stoic', etc
  philosophical_tradition TEXT[],     -- ['Kantian', 'utilitarian', 'virtue ethics']
  search_vector TSVECTOR GENERATED,   -- Full-text search
  citation_count INTEGER DEFAULT 0,   -- How many other debates cite this
  related_debates UUID[] DEFAULT '{}'  -- Cross-linked debates
);

-- New table
CREATE TABLE vault_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debate_id UUID NOT NULL REFERENCES debates(id),
  title_tokens TEXT[],
  content_tokens TEXT[],
  topic_tokens TEXT[],
  philosophy_tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  last_indexed TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE debate_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  citing_debate_id UUID NOT NULL REFERENCES debates(id),
  cited_debate_id UUID NOT NULL REFERENCES debates(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(citing_debate_id, cited_debate_id)
);

-- Persistent debate URLs (even if debate changes)
CREATE TABLE debate_permalinks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debate_id UUID NOT NULL REFERENCES debates(id),
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 3.2 Vault Search Interface

**Full-Text Search:**
```typescript
interface VaultSearchQuery {
  query: string;
  filters?: {
    school?: string; // 'analytic', 'continental', etc
    topic?: string; // 'epistemology', 'ethics', etc
    dateFrom?: Date;
    dateTo?: Date;
    minCitations?: number;
    winner?: 'for' | 'against';
  };
}

async function vaultSearch(q: VaultSearchQuery) {
  const results = await db.query(`
    SELECT d.*,
           ts_rank(vault_index.search_vector, plainto_tsquery($1)) as relevance
    FROM debates d
    JOIN vault_index ON d.id = vault_index.debate_id
    WHERE search_vector @@ plainto_tsquery($1)
    AND ($2::TEXT IS NULL OR school_of_thought = $2)
    AND ($3::TEXT IS NULL OR $3 = ANY(vault_tags))
    AND ($4::DATE IS NULL OR d.created_at >= $4)
    AND ($5::DATE IS NULL OR d.created_at <= $5)
    AND ($6::INT IS NULL OR citation_count >= $6)
    ORDER BY relevance DESC
    LIMIT 20
  `, [q.query, q.filters?.school, q.filters?.topic,
      q.filters?.dateFrom, q.filters?.dateTo, q.filters?.minCitations]);

  return results;
}
```

**Vault UI:**
```jsx
// /vault or /debates/vault
<div className="space-y-6">
  {/* Search & Filters */}
  <div className="space-y-4">
    <input
      type="search"
      placeholder="Search philosophical debates..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="w-full px-4 py-2 border border-slate-300 rounded-lg"
    />

    <div className="flex gap-4 flex-wrap">
      <select value={school} onChange={e => setSchool(e.target.value)}>
        <option value="">All Schools</option>
        <option value="analytic">Analytic Philosophy</option>
        <option value="continental">Continental Philosophy</option>
        <option value="stoic">Stoicism</option>
        <option value="virtue_ethics">Virtue Ethics</option>
      </select>

      <select value={topic} onChange={e => setTopic(e.target.value)}>
        <option value="">All Topics</option>
        <option value="epistemology">Epistemology</option>
        <option value="ethics">Ethics</option>
        <option value="mind">Philosophy of Mind</option>
        <option value="science">Philosophy of Science</option>
      </select>

      <Button
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
      >
        More Filters
      </Button>
    </div>
  </div>

  {/* Results */}
  <div className="space-y-3">
    {results.map(debate => (
      <DebateVaultCard
        debate={debate}
        query={query}  // Highlight search terms
      />
    ))}
  </div>
</div>
```

#### 3.3 Citation System

**Cite Debate UI:**
```jsx
// Modal that appears when user cites a debate
<Dialog open={showCiteModal}>
  <DialogContent>
    <h2>Cite This Debate</h2>

    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">Citation Format</label>
        <select>
          <option>APA</option>
          <option>MLA</option>
          <option>Chicago</option>
          <option>BibTeX</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Citation Text</label>
        <textarea
          readOnly
          value={generatedCitation}
          className="w-full p-2 bg-slate-50 border rounded font-mono text-sm"
        />
        <Button onClick={() => copyToClipboard(generatedCitation)}>
          Copy Citation
        </Button>
      </div>

      <div>
        <label className="text-sm font-medium">Persistent URL</label>
        <input
          readOnly
          value={debate.permalink}
          className="w-full p-2 bg-slate-50 border rounded font-mono text-sm"
        />
        <Button onClick={() => copyToClipboard(debate.permalink)}>
          Copy Link
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>
```

**Citation Formats:**
```typescript
function generateCitation(debate: Debate, format: 'apa' | 'mla' | 'bibtex'): string {
  const authors = [debate.creator.username, ...debate.participants.map(p => p.username)].join(', ');
  const url = debate.permalink;
  const date = new Date(debate.createdAt).toLocaleDateString();

  switch(format) {
    case 'apa':
      return `${authors} (${new Date(debate.createdAt).getFullYear()}). ${debate.topic}. PONDER. Retrieved from ${url}`;
    case 'mla':
      return `${authors}. "${debate.topic}." PONDER, ${date}, ${url}.`;
    case 'bibtex':
      return `@misc{ponder_${debate.id.slice(0,8)},
  author = {${authors}},
  title = {${debate.topic}},
  year = {${new Date(debate.createdAt).getFullYear()}},
  url = {${url}}
}`;
  }
}
```

#### 3.4 Knowledge Graph Visualization

**Debate Lineage Visualization:**
```jsx
// /debates/[id]/related
<div>
  <h2>Related Arguments & Debates</h2>

  <div className="my-6">
    <KnowledgeGraphVisualization
      debates={relatedDebates}
      centralDebateId={debateId}
    />
  </div>

  <div className="space-y-4">
    <div>
      <h3 className="font-semibold">Referenced By</h3>
      <ul>
        {referencingDebates.map(d => (
          <li className="py-2">
            <Link href={`/debates/${d.id}`}>
              {d.topic}
            </Link>
            <span className="text-xs text-slate-600 ml-2">
              ({d.createdAt.getFullYear()})
            </span>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="font-semibold">References</h3>
      <ul>
        {referencedDebates.map(d => (
          <li className="py-2">
            <Link href={`/debates/${d.id}`}>
              {d.topic}
            </Link>
            <span className="text-xs text-slate-600 ml-2">
              ({d.createdAt.getFullYear()})
            </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
```

#### 3.5 Implementation Checklist

- [ ] Database migrations (vault schema)
- [ ] Full-text search indexing
- [ ] Vault search page UI
- [ ] Citation generation and export
- [ ] Permalink/slug system
- [ ] Related debates algorithm
- [ ] Knowledge graph visualization
- [ ] Archive/vault tagging system
- [ ] Batch indexing job

---

## Feature #4: Expert Verification & Credentialing

### Current State
- Profiles show basic info
- No credentialing system
- No way to verify expertise

### Problem
- PhD philosopher indistinguishable from random user
- No credibility signals
- Experts devalued

### Solution
Multi-tier credentialing with verification and earned badges.

### Technical Specification

#### 4.1 Data Model

```sql
ALTER TABLE profiles ADD COLUMN (
  verification_status TEXT DEFAULT 'unverified', -- 'unverified', 'verified', 'expert'
  credential_type TEXT, -- 'academic', 'professional', 'researcher'
  institution TEXT,
  degree TEXT,
  field_of_expertise TEXT[],
  verification_metadata JSONB -- Proof docs
);

CREATE TABLE credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  credential_type TEXT NOT NULL, -- 'phd', 'masters', 'publication', 'professorship'
  issuer TEXT, -- University or journal
  credential_date DATE,
  verification_url TEXT, -- Link to verification (e.g., LinkedIn, Google Scholar)
  verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by_user_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE earned_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  badge_type TEXT NOT NULL,
  -- 'philosophy_of_mind_expert', 'rigorous_debater', 'citation_builder', 'community_teacher'
  awarded_at TIMESTAMPTZ DEFAULT now(),
  awarded_reason TEXT
);

CREATE TABLE specialist_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  role TEXT NOT NULL, -- 'scholar', 'grad_student', 'serious_amateur'
  specialty_area TEXT[], -- ['epistemology', 'ethics']
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### 4.2 Verification Workflow

**Credential Submission:**
```typescript
async function submitCredential(
  userId: string,
  credential: {
    type: 'phd' | 'masters' | 'publication' | 'professorship';
    issuer: string;
    date: Date;
    verificationUrl?: string; // e.g., Google Scholar profile
    documentation?: File; // PDF of degree
  }
) {
  // For PhDs: Verify against university records
  if (credential.type === 'phd') {
    const result = await verifyDegreeAgainstUniversity(
      credential.issuer,
      credential.date
    );

    if (!result.found) {
      return {
        success: false,
        reason: 'Could not verify degree. Check university name and date.'
      };
    }
  }

  // For publications: Verify against CrossRef/PhilPapers
  if (credential.type === 'publication') {
    const result = await verifyPublicationAgainstDatabase(
      credential.issuer,
      credential.verificationUrl
    );

    if (!result.found) {
      return {
        success: false,
        reason: 'Could not find publication. Check details.'
      };
    }
  }

  // Save credential as unverified, queue for manual review
  const saved = await createCredential({
    userId,
    ...credential,
    verified: false,
    verifiedAt: null
  });

  // Notify admins for manual verification
  await notifyAdmins(`New credential submitted: ${credential.type}`);

  return { success: true, credentialId: saved.id };
}
```

**Badge Earning:**
```typescript
// Automatically awarded based on activity
async function updateEarnedBadges(userId: string) {
  const userStats = await getUserStats(userId);
  const existingBadges = await getUserBadges(userId);

  const badges = [
    {
      type: 'philosophy_of_mind_expert',
      condition: () =>
        userStats.argumentsInField['philosophy_of_mind'] >= 50 &&
        userStats.avgDepthScore['philosophy_of_mind'] >= 200,
      requirement: '50+ high-quality arguments in Philosophy of Mind'
    },
    {
      type: 'rigorous_debater',
      condition: () =>
        userStats.debatesParticipated >= 100 &&
        userStats.averageApprovalRating >= 0.9,
      requirement: '100+ debates with 90%+ peer approval'
    },
    {
      type: 'citation_builder',
      condition: () =>
        userStats.totalArgumentsCited >= 200,
      requirement: '200+ arguments cited by community'
    },
    {
      type: 'community_teacher',
      condition: () =>
        userStats.beginner_questionsAnswered >= 50 &&
        userStats.beginnerSatisfactionRating >= 0.85,
      requirement: '50+ beginner questions answered with 85%+ satisfaction'
    }
  ];

  for (const badge of badges) {
    const alreadyHas = existingBadges.some(b => b.type === badge.type);
    if (!alreadyHas && badge.condition()) {
      await awardBadge(userId, badge.type, badge.requirement);
    }
  }
}
```

#### 4.3 Profile Display

**Updated Profile UI:**
```jsx
// /profile/[username]
<div className="space-y-6">
  <div className="flex gap-4">
    <img src={user.avatar} className="w-24 h-24 rounded-full" />
    <div>
      <h1 className="text-2xl font-black">{user.displayName}</h1>
      <p className="text-slate-600">@{user.username}</p>

      {/* Verification badges */}
      <div className="flex gap-2 mt-3">
        {user.verificationStatus === 'verified' && (
          <Badge variant="verified">✓ Verified</Badge>
        )}
        {user.specialistRole && (
          <Badge variant="specialist">{roleLabel(user.specialistRole)}</Badge>
        )}
        {user.credentials.map(cred => (
          <Badge
            key={cred.id}
            variant="credential"
            title={`${cred.credentialType} from ${cred.issuer}`}
          >
            {credentialIcon(cred.credentialType)}
          </Badge>
        ))}
      </div>
    </div>
  </div>

  {/* Earned badges */}
  {user.earnedBadges.length > 0 && (
    <div>
      <h3 className="font-semibold mb-3">Earned Recognition</h3>
      <div className="flex gap-3 flex-wrap">
        {user.earnedBadges.map(badge => (
          <div
            key={badge.id}
            className="flex items-center gap-2 px-3 py-2 bg-teal-50 border border-teal-200 rounded-lg"
            title={badge.requirement}
          >
            <span className="text-lg">{badgeIcon(badge.type)}</span>
            <span className="text-sm font-medium">{badgeLabel(badge.type)}</span>
          </div>
        ))}
      </div>
    </div>
  )}

  <div className="grid grid-cols-3 gap-4">
    <StatBox label="Debates" value={user.debatesParticipated} />
    <StatBox label="Reputation" value={user.reputationScore} />
    <StatBox label="Depth Score" value={user.avgDepthScore} />
  </div>

  {/* Arguments */}
  <div>
    <h3 className="font-semibold mb-3">Top Arguments</h3>
    <div className="space-y-2">
      {topArguments.map(arg => (
        <ArgumentCard key={arg.id} argument={arg} />
      ))}
    </div>
  </div>
</div>
```

#### 4.4 Trust-Based Visibility

**Weighted Voting:**
```typescript
// When calculating approval/disapproval
function calculateWeightedApproval(
  votes: Vote[],
  argument: Argument
): number {
  let totalWeight = 0;
  let totalScore = 0;

  for (const vote of votes) {
    const voter = await getUser(vote.voterId);
    const weight = calculateVoterWeight(voter);

    totalWeight += weight;
    totalScore += vote.isPositive ? weight : -weight;
  }

  return totalScore / totalWeight;
}

function calculateVoterWeight(voter: User): number {
  let weight = 1; // Base weight

  // Expert votes worth more
  if (voter.verified) weight *= 2;
  if (voter.credentials.length > 0) weight *= 1.5;
  if (voter.earnedBadges.some(b => b.type === 'rigorous_debater')) weight *= 1.5;

  // Hostile/untrustworthy votes worth less
  if (voter.hostilityWarnings > 0) weight *= 0.5;
  if (voter.avgArgumentApproval < 0.5) weight *= 0.7;

  return weight;
}
```

#### 4.5 Implementation Checklist

- [ ] Database migrations (credentials, badges tables)
- [ ] Credential submission form
- [ ] Verification integration (university records, CrossRef, PhilPapers)
- [ ] Badge earning system (automated)
- [ ] Updated profile UI with badges
- [ ] Weighted voting algorithm
- [ ] Trust-based visibility system
- [ ] Admin credential review interface

---

## Feature #5: Fair Feedback System (Snap/Zap + Hidden Voting)

### Current State
- Upvote/downvote buttons
- Vote counts visible
- No structured feedback

### Problem
- Downvotes enable pile-ons
- No constructive criticism
- Hostility visible

### Solution
Replace downvotes with structured feedback; hide negative counts.

### Technical Specification

#### 5.1 Data Model

```sql
ALTER TABLE arguments DROP COLUMN downvotes;

CREATE TABLE argument_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  argument_id UUID NOT NULL REFERENCES arguments(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  feedback_type TEXT NOT NULL,
  -- 'snap' (positive) or specific problems:
  -- 'needs_evidence', 'logic_unclear', 'ignores_counterargument',
  -- 'misrepresents_opponent', 'assumes_without_justification'
  reason_text TEXT, -- Optional explanation
  helpful_rating INTEGER, -- 1-5 scale for feedback quality
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(argument_id, user_id, feedback_type) -- One per type per user
);

-- Track feedback quality (is the criticism valid?)
CREATE TABLE feedback_validation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id UUID NOT NULL REFERENCES argument_feedback(id),
  validator_id UUID NOT NULL REFERENCES profiles(id),
  is_valid BOOLEAN NOT NULL, -- Is this fair criticism?
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(feedback_id, validator_id)
);
```

#### 5.2 Feedback UI

**Argument Feedback Buttons:**
```jsx
<div className="flex gap-2 items-center border-t border-slate-200 pt-3 mt-3">
  <Button
    variant={userFeedback?.type === 'snap' ? 'default' : 'outline'}
    onClick={() => toggleFeedback('snap')}
    className="gap-2"
  >
    <Sparkles className="w-4 h-4" />
    Snap ({snapCount})
  </Button>

  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="gap-2">
        <AlertCircle className="w-4 h-4" />
        Needs Work
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <div className="space-y-2">
        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="feedback"
            value="needs_evidence"
            onChange={() => giveFeedback('needs_evidence')}
          />
          <span className="text-sm">This needs more evidence</span>
        </label>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="feedback"
            value="logic_unclear"
            onChange={() => giveFeedback('logic_unclear')}
          />
          <span className="text-sm">The logic here is unclear</span>
        </label>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="feedback"
            value="ignores_counterargument"
            onChange={() => giveFeedback('ignores_counterargument')}
          />
          <span className="text-sm">This ignores a key counterargument</span>
        </label>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="feedback"
            value="misrepresents_opponent"
            onChange={() => giveFeedback('misrepresents_opponent')}
          />
          <span className="text-sm">This misrepresents the opposing view</span>
        </label>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            name="feedback"
            value="assumes_without_justification"
            onChange={() => giveFeedback('assumes_without_justification')}
          />
          <span className="text-sm">This assumes something without justification</span>
        </label>

        <textarea
          placeholder="(Optional) Add explanation..."
          value={feedbackText}
          onChange={e => setFeedbackText(e.target.value)}
          className="w-full p-2 border rounded text-sm"
        />

        <Button onClick={submitFeedback} className="w-full">
          Submit Feedback
        </Button>
      </div>
    </PopoverContent>
  </Popover>

  <Button
    variant={userFeedback?.type === 'changed_view' ? 'default' : 'outline'}
    onClick={() => toggleFeedback('changed_view')}
    className="gap-2 ml-auto"
  >
    <Brain className="w-4 h-4" />
    Changed My View
  </Button>
</div>

{/* Show feedback summary (not individual votes) */}
<div className="mt-3 text-xs text-slate-600 space-y-1">
  {snapCount > 0 && <p>✓ {snapCount} found this helpful</p>}
  {needsEvidenceCount > 0 && (
    <p>📋 {needsEvidenceCount} noted this needs evidence</p>
  )}
  {changedViewCount > 0 && (
    <p>🧠 {changedViewCount} said this changed their view</p>
  )}
</div>
```

#### 5.3 Feedback Aggregation

**Display Feedback Summary:**
```typescript
interface ArgumentFeedbackSummary {
  snaps: number; // All positive
  needsEvidence: number;
  logicUnclear: number;
  ignoresCounterargument: number;
  misrepresentsOpponent: number;
  assumesWithoutJustification: number;
  changedViews: number;
}

async function getArgumentFeedback(argumentId: string): Promise<ArgumentFeedbackSummary> {
  const feedback = await db.query(`
    SELECT
      COUNT(CASE WHEN feedback_type = 'snap' THEN 1 END) as snaps,
      COUNT(CASE WHEN feedback_type = 'needs_evidence' THEN 1 END) as needs_evidence,
      COUNT(CASE WHEN feedback_type = 'logic_unclear' THEN 1 END) as logic_unclear,
      COUNT(CASE WHEN feedback_type = 'ignores_counterargument' THEN 1 END) as ignores_counterargument,
      COUNT(CASE WHEN feedback_type = 'misrepresents_opponent' THEN 1 END) as misrepresents_opponent,
      COUNT(CASE WHEN feedback_type = 'assumes_without_justification' THEN 1 END) as assumes_without_justification,
      COUNT(CASE WHEN feedback_type = 'changed_view' THEN 1 END) as changed_views
    FROM argument_feedback
    WHERE argument_id = $1
      AND created_at > now() - INTERVAL '30 days'
  `, [argumentId]);

  return feedback[0];
}
```

**Criticism Quality Validation:**
```jsx
// When feedback is clicked, show detailed feedback
<Dialog open={showFeedback}>
  <DialogContent>
    <h2>Community Feedback on This Argument</h2>

    <div className="space-y-3">
      <div className="bg-teal-50 p-3 rounded">
        <p className="text-sm font-medium">✓ Helpful: {summary.snaps}</p>
      </div>

      {summary.needsEvidence > 0 && (
        <div className="bg-amber-50 p-3 rounded">
          <p className="text-sm font-medium">📋 Needs evidence: {summary.needsEvidence}</p>
          <p className="text-xs text-slate-600">Readers think this argument could use better sources</p>
        </div>
      )}

      {summary.changedViews > 0 && (
        <div className="bg-green-50 p-3 rounded">
          <p className="text-sm font-medium">🧠 Changed views: {summary.changedViews}</p>
          <p className="text-xs text-slate-600">This argument changed people's minds</p>
        </div>
      )}

      {/* Individual feedback (only comments, not votes) */}
      <div className="border-t pt-3">
        <h3 className="text-sm font-semibold mb-3">Detailed Feedback</h3>
        {feedback.comments.map(comment => (
          <div key={comment.id} className="mb-3 pb-3 border-b last:border-b-0">
            <p className="text-sm">{comment.reasonText}</p>
            <p className="text-xs text-slate-600 mt-1">
              {commentValidationScore(comment.feedbackId)}/5 found this feedback helpful
            </p>
          </div>
        ))}
      </div>
    </div>
  </DialogContent>
</Dialog>
```

#### 5.4 Trust Badge System

**Feedback Quality Badge:**
```typescript
// Recognize users who give good feedback
async function updateFeedbackQualityBadge(userId: string) {
  const feedbackStats = await db.query(`
    SELECT
      COUNT(*) as total_feedback,
      COUNT(CASE WHEN helpful_rating >= 4 THEN 1 END) as helpful_feedback,
      COUNT(CASE WHEN helpful_rating <= 2 THEN 1 END) as unhelpful_feedback
    FROM argument_feedback
    WHERE user_id = $1
  `, [userId]);

  const helpfulnessRatio = feedbackStats.helpful_feedback / feedbackStats.total_feedback;

  if (helpfulnessRatio > 0.8 && feedbackStats.total_feedback > 50) {
    // User gives constructive, helpful feedback
    await awardBadge(userId, 'constructive_critic', 'Provides thoughtful, helpful feedback');
  }

  if (helpfulnessRatio < 0.3 && feedbackStats.total_feedback > 50) {
    // User's feedback often unhelpful
    await giveWarning(userId, 'hostile_feedback', 'Your feedback is often seen as unhelpful');
  }
}
```

#### 5.5 Implementation Checklist

- [ ] Database migrations (argument_feedback table)
- [ ] Feedback submission UI
- [ ] Feedback aggregation and display
- [ ] Feedback quality validation
- [ ] Hide individual downvote counts
- [ ] Constructive feedback badge system
- [ ] Warning system for hostile feedback
- [ ] Batch job to update feedback quality stats

---

## Summary & Next Steps

This specification document covers the 5 MVP features that will differentiate PONDER from Reddit:

1. ✅ **Depth-Weighted Scoring** - Rewards substance
2. ✅ **Transparent Moderation** - Accountability & fairness
3. ✅ **Vault System** - Persistent knowledge
4. ✅ **Expert Verification** - Credibility signals
5. ✅ **Fair Feedback** - Constructive criticism

**Timeline:** 12 weeks to MVP with all 5 features

**Next Steps:**
1. Create detailed task breakdown for engineering team
2. Set up database migrations in Supabase
3. Implement features in priority order
4. QA and launch phase (Week 10-12)
5. Gather user feedback and iterate

---

**End of Feature Specifications**
