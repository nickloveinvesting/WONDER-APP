# INQUIRE Feature Specification

## Overview

**Inquire** is ARGUED's premium philosophy platform for structured, sustained philosophical dialogue. It bridges the gap between Reddit's accessibility and academia's rigor, creating a space where users can explore complex philosophical questions with depth, nuance, and intellectual integrity.

### Mission Statement
Inquire provides "structure without rigidity" and "rigor without gatekeeping" - enabling anyone with genuine curiosity to engage deeply with philosophical questions while maintaining high-quality discourse.

### Core Philosophy
- **Depth over popularity**: Quality metrics that reward insight, not just agreement
- **Evolution over fixed positions**: Track how views change through dialogue
- **Framework over free-form**: Declare philosophical approaches to make disagreement productive
- **Steelman over strawman**: Require charitable interpretation before critique
- **Expert-guided, not expert-gated**: Welcome all while recognizing expertise

---

## Architecture

### Information Hierarchy

```
Inquire Landing Page
├── 4 Category Landing Pages (Social, Economic, AI Ethics, Moral Philosophy)
│   ├── Category overview & description
│   ├── Featured topics
│   └── All topics in category (grid view)
│
└── Individual Topic Pages (80+ topics)
    ├── Topic Overview Section
    ├── The Core Question Section
    ├── Philosophical Frameworks Section
    ├── Key Positions Section
    ├── Thought Experiments Section
    ├── Related Questions Section
    └── Community Discussion Section
```

---

## 1. Inquire Landing Page

### Purpose
Introduce users to philosophical inquiry and guide them to relevant categories based on their interests.

### Key Sections

#### Hero Section
- **Headline**: "Inquire: Where Philosophy Meets Real Questions"
- **Subheadline**: "Explore the questions that matter. Understand different perspectives. Track how your thinking evolves."
- **CTA**: "Explore Categories" (navigates to category grid)
- **Design**: Gradient background (stone-50 to white), large bold typography

#### Category Grid
Four prominent cards representing each category:

1. **Social Philosophy**
   - Icon: People/Community icon
   - Description: "Justice, rights, equality, and the structure of society"
   - Topic count: "20 topics"
   - Example topics: "Is taxation theft?", "What do we owe strangers?"

2. **Economic Philosophy**
   - Icon: Chart/Economy icon
   - Description: "Markets, distribution, value, and economic systems"
   - Topic count: "20 topics"
   - Example topics: "Are markets amoral?", "Universal basic income?"

3. **AI Ethics**
   - Icon: Robot/AI icon
   - Description: "Consciousness, rights, and the future of intelligence"
   - Topic count: "20 topics"
   - Example topics: "If AI becomes conscious...", "Who owns AI creations?"

4. **Moral Philosophy**
   - Icon: Compass/Ethics icon
   - Description: "Right and wrong, virtue, duty, and moral reasoning"
   - Topic count: "20 topics"
   - Example topics: "Can lying ever be right?", "Trolley problem variants"

#### Platform Features Highlight
- **Framework Declaration System**: "See which ethical frameworks shape different viewpoints"
- **Position Evolution Tracker**: "Watch how your views change over time"
- **Steelman Feature**: "Understand before you critique"
- **Depth Scoring**: "Quality over popularity"

#### Design Specifications
- Color scheme: Teal accents (#14B8A6) on slate/white backgrounds
- Typography: Plus Jakarta Sans, font-black headlines
- Cards: Gradient cards with hover lift effect
- Spacing: Generous padding (py-16 sections)
- Mobile: Stacked layout, category cards full-width

---

## 2. Category Landing Pages

### Purpose
Provide context for a philosophical domain and present all topics within that category.

### URL Structure
- `/inquire/social`
- `/inquire/economic`
- `/inquire/ai-ethics`
- `/inquire/moral`

### Page Structure

#### Category Header
- **Category name** (H1, font-black, text-5xl)
- **Category description** (2-3 sentences explaining the domain)
- **Topic count badge**: "20 topics to explore"
- **Filter controls**: Sort by (Popular, Recent, Controversial, Alphabetical)

#### Featured Topics Section
Highlight 3-4 most engaging topics in this category:
- Larger cards with topic preview
- Thought experiment teaser
- Engagement metrics (comments, position declarations)

#### All Topics Grid
Grid display of all topics in category:
- **Topic title** (question format)
- **One-line description**
- **Difficulty indicator**: Beginner, Intermediate, Advanced
- **Framework tags**: Show which frameworks are most discussed
- **Engagement stats**: Comment count, active discussants
- **"New positions this week"** indicator

### Design Specifications
```tsx
// Category Header
<section className="py-12 bg-gradient-to-b from-stone-50 to-white border-b border-slate-200">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="flex items-center gap-3 mb-4">
      <CategoryIcon className="w-12 h-12 text-teal-500" />
      <h1 className="text-4xl lg:text-5xl font-black text-slate-900">
        Social Philosophy
      </h1>
    </div>
    <p className="text-xl text-slate-600 max-w-3xl">
      Category description text here...
    </p>
    <div className="mt-4 flex items-center gap-4">
      <Badge>20 topics</Badge>
      <FilterDropdown />
    </div>
  </div>
</section>

// Topic Grid
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* TopicCard components */}
    </div>
  </div>
</section>
```

---

## 3. Individual Topic Pages

### Purpose
Provide comprehensive philosophical exploration of a single question with expert-curated content and community dialogue.

### URL Structure
`/inquire/[category]/[topic-slug]`

Example: `/inquire/social/is-taxation-theft`

---

### Section 1: Topic Overview

**Purpose**: Immediately orient the user and provide context

**Content**:
- **Topic title** (the philosophical question)
- **Category breadcrumb**: Social Philosophy > Is taxation theft?
- **One-paragraph overview**: Why this question matters, its real-world relevance
- **Difficulty level**: Visual indicator (Beginner/Intermediate/Advanced)
- **Estimated reading time**: "12 min read"
- **Quick stats**: Active discussants, position declarations, frameworks in use

**Design**:
```tsx
<section className="py-8 bg-gradient-to-b from-stone-50 to-white border-b border-slate-200">
  <div className="max-w-4xl mx-auto px-6">
    <Breadcrumb items={['Inquire', 'Social Philosophy', topicTitle]} />
    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mt-4">
      {topicTitle}
    </h1>
    <div className="flex items-center gap-4 mt-4 text-sm">
      <DifficultyBadge level="intermediate" />
      <span className="text-slate-500">12 min read</span>
      <span className="text-slate-500">•</span>
      <span className="text-slate-600 font-bold">47 active discussants</span>
    </div>
    <p className="text-lg text-slate-600 mt-6 leading-relaxed">
      {overview}
    </p>
  </div>
</section>
```

---

### Section 2: The Core Question

**Purpose**: Frame the philosophical question clearly and explain why it's non-trivial

**Content**:
- **The question restated**: Clear, precise formulation
- **Why it matters**: Real-world implications (policy, personal decisions, etc.)
- **Why it's difficult**: What makes this question philosophically challenging
- **Historical context**: Brief note on how philosophers have approached this (2-3 sentences)

**JSONB field**: `core_question`
```json
{
  "question_restatement": "Is taxation fundamentally a form of theft...",
  "why_it_matters": "This question shapes how we think about...",
  "why_difficult": "The challenge lies in reconciling...",
  "historical_context": "From Locke to Nozick, philosophers have..."
}
```

**Design**:
```tsx
<section className="py-12 bg-white border-b border-slate-200">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl font-black text-slate-900 mb-6">
      The Core Question
    </h2>
    <Card variant="accent" accentColor="teal">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-black text-slate-900 mb-2">
            Restated
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {coreQuestion.question_restatement}
          </p>
        </div>
        {/* Similar blocks for other subsections */}
      </div>
    </Card>
  </div>
</section>
```

---

### Section 3: Philosophical Frameworks

**Purpose**: Show how different ethical frameworks approach this question

**Content**: 3-4 framework cards, each containing:
- **Framework name**: Utilitarianism, Deontology, Virtue Ethics, Social Contract, etc.
- **Core principle**: One-sentence explanation
- **Application to this question**: How this framework analyzes the question
- **Key thinker**: Representative philosopher (Bentham, Kant, Aristotle, etc.)
- **Typical position**: What conclusion this framework tends toward

**JSONB field**: `frameworks` (array)
```json
[
  {
    "framework_id": "utilitarianism",
    "framework_name": "Utilitarianism",
    "core_principle": "Actions are right if they maximize overall happiness",
    "application": "Would evaluate taxation based on net welfare outcomes...",
    "key_thinker": "John Stuart Mill",
    "typical_position": "Taxation is justified if it increases total welfare"
  }
]
```

**Design**:
```tsx
<section className="py-12 bg-gradient-to-b from-stone-50 to-white border-b border-slate-200">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-black text-slate-900 mb-4">
      Philosophical Frameworks
    </h2>
    <p className="text-lg text-slate-600 mb-8">
      Different ethical systems approach this question in distinct ways
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {frameworks.map(framework => (
        <FrameworkCard key={framework.framework_id} {...framework} />
      ))}
    </div>
  </div>
</section>
```

---

### Section 4: Key Positions

**Purpose**: Present the major viewpoints on this question with steel-manned arguments

**Content**: 2-4 position cards:
- **Position title**: "Yes, taxation is theft" / "No, taxation is legitimate"
- **Steel-manned argument**: The strongest version of this position (3-4 paragraphs)
- **Supporting premises**: Bulleted logical structure
- **Common objections**: What critics say about this view
- **Framework alignment**: Which frameworks support this position

**JSONB field**: `key_positions` (array)
```json
[
  {
    "position_title": "Yes, taxation is a form of theft",
    "steel_man_argument": "The strongest version of this argument...",
    "supporting_premises": [
      "Property rights are fundamental",
      "Coercion without consent is illegitimate",
      "The state lacks moral authority to confiscate"
    ],
    "common_objections": [
      "Ignores social contract theory",
      "Oversimplifies consent in democratic systems"
    ],
    "aligned_frameworks": ["libertarianism", "natural_rights"]
  }
]
```

**Design**:
```tsx
<section className="py-12 bg-white border-b border-slate-200">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-black text-slate-900 mb-8">
      Key Positions
    </h2>
    <div className="space-y-6">
      {positions.map((position, index) => (
        <PositionCard key={index} position={position} index={index} />
      ))}
    </div>
  </div>
</section>
```

---

### Section 5: Thought Experiments

**Purpose**: Make abstract philosophical concepts concrete through scenarios

**Content**: 2-3 thought experiments:
- **Scenario title**: "The Deserted Island"
- **Scenario description**: Vivid, specific hypothetical (2-3 paragraphs)
- **The question**: What should you do? What does this reveal?
- **Why it matters**: What this scenario illuminates about the main question
- **Framework responses**: How different frameworks would answer

**JSONB field**: `thought_experiments` (array)
```json
[
  {
    "title": "The Deserted Island",
    "scenario": "Imagine you and 99 others are stranded...",
    "question": "Is it theft if the group votes to take 10% of everyone's coconuts?",
    "why_it_matters": "This isolates the question of democratic consent...",
    "framework_responses": {
      "utilitarianism": "Would focus on overall coconut distribution...",
      "libertarianism": "Would reject this as tyranny of the majority..."
    }
  }
]
```

**Interactive element**: Users can submit their response and see what % agreed with each framework

**Design**:
```tsx
<section className="py-12 bg-gradient-to-b from-stone-50 to-white border-b border-slate-200">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl font-black text-slate-900 mb-8">
      Thought Experiments
    </h2>
    {thoughtExperiments.map(exp => (
      <ThoughtExperimentCard key={exp.title} experiment={exp} />
    ))}
  </div>
</section>
```

---

### Section 6: Related Questions

**Purpose**: Connect topics and encourage further exploration

**Content**:
- List of 5-8 related questions from same or different categories
- Each with title, category tag, and engagement metrics
- Visual indicators for questions user has already engaged with

**JSONB field**: `related_questions` (array of topic IDs with relationship type)
```json
[
  {
    "topic_id": "uuid-here",
    "relationship_type": "prerequisite" | "extension" | "contrast" | "application"
  }
]
```

**Design**:
```tsx
<section className="py-12 bg-white border-b border-slate-200">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-black text-slate-900 mb-6">
      Related Questions
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {relatedQuestions.map(q => (
        <RelatedQuestionCard key={q.id} question={q} />
      ))}
    </div>
  </div>
</section>
```

---

### Section 7: Community Discussion

**Purpose**: Enable structured, framework-informed dialogue

**Content**:
- **Your Position** (if declared): Display user's current stance with edit option
- **Position Declaration Prompt**: Encourage new users to declare position + framework
- **Discussion threads**: Sorted by depth score (default) or recency
- **Framework filter**: View comments from specific frameworks only
- **Steelman requirement**: Must summarize opposing view before critiquing

**Features**:
- Comment with declared framework badge
- Depth score visible (not just upvotes)
- "Position changed" indicator for users who've updated their view
- Nested replies (max 3 levels)
- Anonymous mode option for career-sensitive topics

**Design**:
```tsx
<section className="py-12 bg-gradient-to-b from-white to-stone-50">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl font-black text-slate-900 mb-6">
      Community Discussion
    </h2>

    {/* Position Declaration */}
    {!userPosition && (
      <Card variant="highlight" className="mb-8">
        <h3 className="text-xl font-black text-slate-900 mb-4">
          What's your view?
        </h3>
        <PositionDeclarationForm topicId={topic.id} />
      </Card>
    )}

    {/* User's Current Position */}
    {userPosition && (
      <Card variant="accent" className="mb-8">
        <YourPositionDisplay position={userPosition} />
      </Card>
    )}

    {/* Discussion Controls */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-4">
        <SortDropdown />
        <FrameworkFilter />
      </div>
      <Button onClick={handleNewComment}>Add Comment</Button>
    </div>

    {/* Comment Thread */}
    <div className="space-y-6">
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  </div>
</section>
```

---

## 4. Innovative Features

### Framework Declaration System

**What**: Users select which philosophical framework informs their view when commenting

**Why**: Makes disagreement productive by revealing underlying value differences

**How**:
1. When commenting, user selects from dropdown: Utilitarian, Deontological, Virtue Ethics, Social Contract, Libertarian, Care Ethics, Natural Law, Pragmatist, Other
2. Framework badge appears next to username in comments
3. Users can filter discussions to see specific framework perspectives
4. Analytics show which frameworks dominate different topics

**Implementation**:
- `frameworks` table with framework definitions
- `topic_comments.framework_id` foreign key
- Filter UI component
- Framework badge component

---

### Steelman Feature

**What**: Before critiquing a position, users must demonstrate understanding by summarizing it fairly

**Why**: Prevents strawman arguments and ensures charitable reading

**How**:
1. User clicks "Reply" to a comment with different position
2. Modal appears: "First, show you understand their view"
3. User types summary in their own words (min 50 characters)
4. AI evaluates if summary is fair (not sarcastic/dismissive)
5. Only then can user proceed to write rebuttal
6. Original commenter can mark if summary is accurate

**Implementation**:
- `topic_comments.steelman_summary` field (nullable)
- `topic_comments.parent_comment_id` to track what's being responded to
- `steelman_accuracy_rating` from original author
- Client-side modal flow
- Optional: Gemini API for fairness check

**Design**:
```tsx
<Modal open={showSteelmanPrompt}>
  <div className="p-8">
    <h3 className="text-2xl font-black text-slate-900 mb-4">
      First, show you understand their view
    </h3>
    <p className="text-slate-600 mb-6">
      In your own words, summarize the position you're responding to.
      This ensures productive dialogue.
    </p>
    <Textarea
      placeholder="They're arguing that..."
      value={steelmanSummary}
      onChange={e => setSteelmanSummary(e.target.value)}
      minLength={50}
    />
    <div className="flex gap-4 mt-6">
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={validateAndProceed}
        disabled={steelmanSummary.length < 50}
      >
        Continue to Response
      </Button>
    </div>
  </div>
</Modal>
```

---

### Position Evolution Tracker

**What**: Visual timeline showing how a user's position on a topic has changed

**Why**: Demonstrates intellectual honesty and growth; shows philosophy as dynamic

**How**:
1. User declares initial position on topic: "Strongly Agree" to "Strongly Disagree" (5-point scale)
2. User selects confidence level: "Uncertain" to "Very Confident"
3. Over time, user can update position
4. Profile shows timeline chart of position changes across topics
5. User can add note explaining what changed their mind

**Implementation**:
- `user_positions` table: current position per topic
- `position_history` table: timestamped log of all changes
- `position_change_reason` text field
- Chart component using recharts or similar
- Profile page section

**Data structure**:
```typescript
interface UserPosition {
  user_id: string;
  topic_id: string;
  position_value: number; // -2 to +2
  confidence: number; // 1-5
  framework_id: string;
  last_updated: timestamp;
}

interface PositionHistory {
  user_id: string;
  topic_id: string;
  position_value: number;
  confidence: number;
  change_reason: string | null;
  recorded_at: timestamp;
}
```

**Profile Display**:
```tsx
<Card className="mb-8">
  <CardHeader>
    <CardTitle>Position Evolution</CardTitle>
    <CardDescription>
      How your thinking has changed on 12 topics
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-6">
      {positionChanges.map(change => (
        <PositionEvolutionChart key={change.topic_id} data={change} />
      ))}
    </div>
  </CardContent>
</Card>
```

---

### Depth Scoring Algorithm

**What**: Alternative to simple upvotes that rewards substantive engagement

**Why**: Prevents groupthink; promotes nuanced thinking over popular opinions

**Factors** (weighted):
- **Length and substance** (15%): Longer, detailed comments score higher
- **Framework engagement** (20%): Explicitly engages with philosophical frameworks
- **Citation/references** (10%): Links to papers, philosophers, or other resources
- **Steelman accuracy** (25%): Rated highly by person being responded to
- **Reply depth** (15%): Generates substantive responses (not just agreement)
- **Diverse engagement** (15%): Responses from users with different positions/frameworks

**Score range**: 0-100

**Implementation**:
```typescript
function calculateDepthScore(comment: TopicComment): number {
  let score = 0;

  // Length and substance (0-15 points)
  const wordCount = comment.content.split(' ').length;
  score += Math.min(15, wordCount / 20);

  // Framework engagement (0-20 points)
  if (comment.framework_id) score += 10;
  if (containsFrameworkReasoning(comment.content)) score += 10;

  // Citations (0-10 points)
  const citationCount = extractCitations(comment.content).length;
  score += Math.min(10, citationCount * 5);

  // Steelman accuracy (0-25 points)
  if (comment.steelman_accuracy_rating) {
    score += comment.steelman_accuracy_rating * 5; // 1-5 rating
  }

  // Reply depth (0-15 points)
  const substantiveReplies = countSubstantiveReplies(comment.id);
  score += Math.min(15, substantiveReplies * 3);

  // Diverse engagement (0-15 points)
  const diversityScore = calculateDiversityOfReplies(comment.id);
  score += diversityScore;

  return Math.min(100, Math.round(score));
}
```

**Display**:
```tsx
<div className="flex items-center gap-4">
  <DepthScoreDisplay score={comment.depth_score} />
  <Tooltip content="Quality score based on substance, engagement, and charitable dialogue">
    <InfoIcon className="w-4 h-4 text-slate-400" />
  </Tooltip>
</div>
```

---

### Expert Badges

**What**: Verified credentials for professional philosophers, ethicists, etc.

**Why**: Adds authority without gatekeeping; users know when experts weigh in

**Types**:
- **Academic**: PhD in Philosophy (verified)
- **Professional**: Ethicist, policy advisor (verified)
- **Published**: Published in peer-reviewed journals (verified)
- **Community Expert**: High reputation + specialized topic knowledge

**How to earn**:
1. Academic/Professional/Published: Submit credentials, team verifies
2. Community Expert: Algorithmic based on:
   - Depth score average > 75 in topic category
   - Position evolution (demonstrates open-mindedness)
   - Steelman ratings > 4.0 average
   - Active for 3+ months

**Display**:
```tsx
<div className="flex items-center gap-2">
  <Avatar src={user.avatar} />
  <div>
    <div className="flex items-center gap-2">
      <span className="font-bold text-slate-900">{user.username}</span>
      {user.expertBadge && (
        <Badge variant="success">
          {user.expertBadge.type}
        </Badge>
      )}
    </div>
    <div className="text-xs text-slate-500">
      {user.expertBadge?.credential}
    </div>
  </div>
</div>
```

---

### Anonymous Mode

**What**: Option to comment anonymously on sensitive topics

**Why**: Career professionals (teachers, lawyers, politicians) can engage honestly without professional risk

**How**:
1. Toggle "Post anonymously" when commenting
2. Username shown as "Anonymous Philosopher #1234"
3. Still tracked server-side for moderation
4. User's position history still updated privately
5. Depth score still calculated
6. Cannot be combined with Expert badges

**Topics where anonymous is encouraged**:
- Political philosophy
- Religious ethics
- Controversial social issues
- Professional ethics dilemmas

**Implementation**:
- `topic_comments.is_anonymous` boolean
- Server generates consistent anonymous ID per user per topic
- Frontend conditionally renders username
- Moderation tools still see real user

---

## 5. User Flows

### First-Time User Flow

1. **Land on Inquire homepage**
   - See category grid
   - Click category that interests them

2. **Browse category page**
   - See featured topics
   - Click on topic that resonates

3. **Read topic page**
   - Scroll through curated content
   - Encounter thought experiment
   - Feel pull to respond

4. **Prompted to declare position**
   - Modal: "What's your take?"
   - Select position on scale
   - Select framework (with explanations)
   - Submit

5. **Position recorded**
   - See their view added to position tracker
   - Encouraged to comment
   - Given "steelman tutorial" on first comment

### Returning User Flow

1. **Return to Inquire**
   - Dashboard shows:
     - Topics with new comments on their positions
     - Recommended topics based on frameworks
     - Their position evolution chart

2. **Engage with topic**
   - See if their position has changed
   - Read new arguments
   - Decide to update position or comment

3. **Update position**
   - Prompted: "Why did your view change?"
   - Add note to position history
   - Updated in evolution tracker

### Expert User Flow

1. **Verify credentials**
   - Submit PhD/publications
   - Team reviews
   - Badge granted

2. **Curate content**
   - Invited to suggest new topics
   - Can submit "expert perspective" top-level comments
   - Highlighted in feed

3. **Engage community**
   - Responds to high-depth-score comments
   - Provides framework analysis
   - Builds reputation

---

## 6. Visual Design Guidelines

### Color System
- **Primary**: Teal (#14B8A6) for actions, accents, active states
- **Content**: Slate (900-100) for text, borders, UI elements
- **Backgrounds**: White, stone-50, gradients
- **Framework badges**: Unique color per framework (defined in frameworks table)

### Typography
- **Headlines**: Plus Jakarta Sans, font-black (900)
- **Body**: Plus Jakarta Sans, font-medium (500)
- **Meta**: Plus Jakarta Sans, font-bold (700)

### Component Patterns

**Category cards**:
```tsx
<Card variant="lift" className="cursor-pointer">
  <div className="flex items-start gap-4">
    <div className="w-16 h-16 rounded-xl bg-teal-100 flex items-center justify-center">
      <Icon className="w-8 h-8 text-teal-600" />
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-black text-slate-900 mb-2">
        {category.name}
      </h3>
      <p className="text-sm text-slate-600 mb-4">
        {category.description}
      </p>
      <div className="flex items-center gap-3 text-sm">
        <Badge>{category.topic_count} topics</Badge>
        <span className="text-slate-500">
          {category.active_users} active users
        </span>
      </div>
    </div>
  </div>
</Card>
```

**Topic cards**:
```tsx
<Card variant="standard" className="cursor-pointer">
  <div className="flex items-start justify-between mb-3">
    <CategoryBadge category={topic.category} />
    <DifficultyIndicator level={topic.difficulty} />
  </div>
  <h3 className="text-lg font-black text-slate-900 mb-2">
    {topic.title}
  </h3>
  <p className="text-sm text-slate-600 mb-4">
    {topic.description}
  </p>
  <div className="flex flex-wrap gap-2 mb-4">
    {topic.topFrameworks.map(fw => (
      <FrameworkBadge key={fw.id} framework={fw} size="sm" />
    ))}
  </div>
  <div className="flex items-center justify-between text-xs text-slate-500">
    <span>{topic.comment_count} comments</span>
    <span>{topic.position_count} positions</span>
  </div>
</Card>
```

**Framework badges**:
```tsx
<div className={`
  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
  text-xs font-bold border-2
  ${frameworkColors[framework.id].bg}
  ${frameworkColors[framework.id].text}
  ${frameworkColors[framework.id].border}
`}>
  <frameworkIcon className="w-3 h-3" />
  {framework.name}
</div>
```

### Spacing
- Section padding: `py-12` (standard), `py-16` (large)
- Container max-width: `max-w-4xl` (reading), `max-w-6xl` (grids), `max-w-7xl` (wide)
- Card gaps: `gap-8` (standard), `gap-6` (compact)

### Responsive Breakpoints
- Mobile: < 768px (stacked layouts)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (3-column grids, side-by-side layouts)

---

## 7. Content Requirements

### Per Topic (80 topics minimum)

Each topic requires:
- **Overview** (150-200 words): Why question matters, real-world stakes
- **Core Question** (4 subsections, ~600 words total)
- **Frameworks** (3-4 frameworks, ~200 words each)
- **Key Positions** (2-4 positions, ~400 words each)
- **Thought Experiments** (2-3 experiments, ~300 words each)
- **Related Questions** (5-8 links to other topics)

**Total per topic**: ~3,500-5,000 words of expert-curated content

**Total for 80 topics**: 280,000 - 400,000 words (equivalent to 2-3 books)

### Content Quality Standards
- **Accessible**: Understandable to interested non-philosophers
- **Rigorous**: Accurately represents philosophical positions
- **Neutral**: Steel-mans all positions, no editorializing
- **Practical**: Connects to real decisions and policies
- **Current**: References recent scholarship and events when relevant

---

## 8. Success Metrics

### Engagement Metrics
- **Time on page**: Target 8+ minutes average (deep reading)
- **Position declarations**: 40%+ of viewers declare a position
- **Return rate**: 60%+ return within 7 days
- **Topic completion**: 30%+ read all sections

### Quality Metrics
- **Average depth score**: Target 60+ across all comments
- **Steelman accuracy ratings**: Target 4.0+ average
- **Position evolution rate**: 20%+ of users update positions within 30 days
- **Framework diversity**: All major frameworks represented in top comments

### Growth Metrics
- **Topics published**: 80 by end of month 1, 200 by month 3
- **Active discussants**: 500 by month 1, 2,000 by month 3
- **Expert onboarding**: 10 verified experts by month 2

---

## 9. Technical Requirements

### Performance
- **Page load**: < 2 seconds (LCP)
- **Interactivity**: < 100ms (FID)
- **Layout shift**: < 0.1 (CLS)

### Data Storage
- **JSONB for flexibility**: Topic content stored as JSONB to allow iteration on structure
- **Indexed queries**: All filter/sort operations must use indexed columns
- **Caching**: Topic pages cached at edge, invalidated on content update

### Scalability
- **Database**: Supabase PostgreSQL with connection pooling
- **CDN**: Vercel Edge Network for static content
- **Real-time**: Supabase Realtime for live comment counts (optional)

### Security
- **RLS policies**: All tables have row-level security
- **Anonymous mode**: IP logging for moderation but username hidden
- **Rate limiting**: Comment posting limited to 10/hour per user

### Accessibility
- **WCAG 2.1 AA compliance**: All interactive elements keyboard accessible
- **Screen reader support**: Proper ARIA labels
- **Color contrast**: All text meets 4.5:1 minimum ratio

---

## 10. Future Enhancements (Post-MVP)

### Phase 2 Features
- **AI Socratic Dialogue**: Chat with AI that asks Socratic questions
- **Position Challenges**: AI presents strongest counterargument to your view
- **Reading Lists**: Curated papers/books per topic
- **Live Discussions**: Scheduled real-time debates with experts

### Phase 3 Features
- **Curriculum Mode**: Guided learning paths through topics
- **Peer Matching**: Connect with users who have complementary views
- **Impact Tracking**: See how engagement affects real-world positions
- **Research Integration**: Academic paper recommendations based on interests

---

## Conclusion

Inquire represents a new model for online philosophical discourse - combining the structure of academic philosophy with the accessibility of social platforms, the rigor of peer review with the openness of public dialogue.

By implementing framework declaration, steelman requirements, position tracking, and depth scoring, we create incentives for the kind of thoughtful, charitable, evolving engagement that philosophy demands.

The result is a platform where users don't just argue - they think, question, and grow.

---

**Document Version**: 1.0
**Last Updated**: November 17, 2025
**Next Review**: Development kickoff meeting
