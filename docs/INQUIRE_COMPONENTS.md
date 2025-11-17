# Inquire UI Component Specifications

## Overview

This document specifies all UI components for the Inquire feature. Each component follows the ARGUED Design System (see `/DESIGN_SYSTEM.md`) and uses the type definitions from `/lib/types/inquire.ts`.

**Design Principles**:
- Premium, sophisticated aesthetic
- Clear information hierarchy
- Mobile-responsive
- Accessibility-first
- Consistent with ARGUED brand (teal accents, Plus Jakarta Sans, bold typography)

---

## Component Index

### Core Components
1. [CategoryCard](#categorycard)
2. [TopicCard](#topiccard)
3. [PositionCard](#positioncard)
4. [FrameworkBadge](#frameworkbadge)
5. [DifficultyIndicator](#difficultyindicator)
6. [DepthScoreDisplay](#depthscoredisplay)

### Interactive Components
7. [PositionDeclarationForm](#positiondeclarationform)
8. [SteelmanPrompt](#steelmanprompt)
9. [PositionEvolutionChart](#positionevolutionchart)
10. [CommentCard](#commentcard)
11. [ThoughtExperimentCard](#thoughtexperimentcard)

### Navigation Components
12. [InquireBreadcrumb](#inquirebreadcrumb)
13. [CategoryFilter](#categoryfilter)
14. [FrameworkFilter](#frameworkfilter)

---

## Core Components

### CategoryCard

**Purpose**: Display a philosophical category with stats and navigation

**File**: `/components/inquire/CategoryCard.tsx`

**Props**:
```typescript
interface CategoryCardProps {
  category: InquiryCategoryWithStats;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}
```

**Design**:
```tsx
<Card
  variant="lift"
  className="cursor-pointer"
  onClick={() => router.push(`/inquire/${category.slug}`)}
>
  <div className="flex items-start gap-4">
    {/* Icon */}
    <div className="w-16 h-16 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
      <CategoryIcon name={category.icon_name} className="w-8 h-8 text-teal-600" />
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <h3 className="text-xl font-black text-slate-900 mb-2">
        {category.name}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-4">
        {category.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-3 text-sm flex-wrap">
        <Badge className="bg-teal-100 text-teal-700 border-teal-300">
          {category.topic_count} topics
        </Badge>
        <span className="text-slate-500">
          {category.active_users} active users
        </span>
      </div>
    </div>
  </div>
</Card>
```

**Behavior**:
- Hover: Lift effect (shadow-2xl, -translate-y-2)
- Click: Navigate to category page
- Mobile: Stack icon above content on small screens

**States**:
- Default
- Hover
- Active (if user is currently viewing this category)

---

### TopicCard

**Purpose**: Display a topic preview with engagement metrics

**File**: `/components/inquire/TopicCard.tsx`

**Props**:
```typescript
interface TopicCardProps {
  topic: InquiryTopicCard;
  showCategory?: boolean; // Show category badge
  showBookmark?: boolean; // Show bookmark button
  isBookmarked?: boolean;
  onBookmark?: (topicId: string) => void;
  onClick?: () => void;
}
```

**Design**:
```tsx
<Card
  variant="standard"
  className="cursor-pointer relative"
  onClick={() => router.push(`/inquire/${topic.category.slug}/${topic.slug}`)}
>
  {/* Header with badges */}
  <div className="flex items-start justify-between mb-3">
    <div className="flex items-center gap-2">
      {showCategory && (
        <Badge className="bg-slate-100 text-slate-700 border-slate-300 text-xs">
          {topic.category.name}
        </Badge>
      )}
      <DifficultyIndicator level={topic.difficulty} />
    </div>

    {showBookmark && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onBookmark?.(topic.id);
        }}
        className="text-slate-400 hover:text-teal-500 transition-colors"
      >
        <BookmarkIcon filled={isBookmarked} />
      </button>
    )}
  </div>

  {/* Title */}
  <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">
    {topic.title}
  </h3>

  {/* Description */}
  <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
    {topic.short_description}
  </p>

  {/* Framework badges */}
  {topic.top_frameworks.length > 0 && (
    <div className="flex flex-wrap gap-2 mb-4">
      {topic.top_frameworks.slice(0, 3).map((fw) => (
        <FrameworkBadge key={fw.id} framework={fw} size="sm" />
      ))}
      {topic.top_frameworks.length > 3 && (
        <span className="text-xs text-slate-500 self-center">
          +{topic.top_frameworks.length - 3} more
        </span>
      )}
    </div>
  )}

  {/* Footer with stats */}
  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1">
        <MessageIcon className="w-3.5 h-3.5" />
        {topic.comment_count}
      </span>
      <span className="flex items-center gap-1">
        <UserIcon className="w-3.5 h-3.5" />
        {topic.position_count}
      </span>
    </div>
    <span className="text-slate-400">
      {topic.estimated_read_time || 12} min read
    </span>
  </div>
</Card>
```

**Behavior**:
- Hover: Enhanced shadow
- Click: Navigate to topic page
- Bookmark click: Stop propagation, toggle bookmark
- Title: Line clamp to 2 lines with ellipsis

**Variants**:
- `default`: Full card with all details
- `compact`: Smaller, for sidebar recommendations

---

### PositionCard

**Purpose**: Display a steel-manned philosophical position

**File**: `/components/inquire/PositionCard.tsx`

**Props**:
```typescript
interface PositionCardProps {
  position: KeyPosition;
  index: number; // For alternating accent colors
  expandable?: boolean;
}
```

**Design**:
```tsx
<Card
  variant="accent"
  accentColor={index % 2 === 0 ? 'teal' : 'slate'}
  className="mb-6"
>
  {/* Position title */}
  <div className="flex items-start justify-between mb-4">
    <h3 className="text-2xl font-black text-slate-900">
      {position.position_title}
    </h3>
    <Badge className="bg-slate-100 text-slate-700 text-xs">
      Position {index + 1}
    </Badge>
  </div>

  {/* Steel-man argument */}
  <div className="prose prose-slate max-w-none mb-6">
    <p className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
      {position.steel_man_argument}
    </p>
  </div>

  {/* Supporting premises */}
  <div className="mb-6">
    <h4 className="text-sm font-bold text-slate-900 mb-3">
      Supporting Premises
    </h4>
    <ul className="space-y-2">
      {position.supporting_premises.map((premise, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
          <span className="text-teal-500 font-bold mt-0.5">•</span>
          <span>{premise}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Common objections */}
  <div className="mb-6">
    <h4 className="text-sm font-bold text-slate-900 mb-3">
      Common Objections
    </h4>
    <ul className="space-y-2">
      {position.common_objections.map((objection, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
          <span className="text-slate-400 font-bold mt-0.5">→</span>
          <span>{objection}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Aligned frameworks */}
  <div className="pt-4 border-t border-slate-200">
    <h4 className="text-xs font-bold text-slate-500 mb-2">
      ALIGNED FRAMEWORKS
    </h4>
    <div className="flex flex-wrap gap-2">
      {position.aligned_frameworks.map((frameworkSlug) => {
        const framework = getFrameworkBySlug(frameworkSlug);
        return framework ? (
          <FrameworkBadge key={framework.id} framework={framework} size="sm" />
        ) : null;
      })}
    </div>
  </div>
</Card>
```

**Behavior**:
- Alternating accent colors (teal/slate) based on index
- If `expandable`, show "Read more" toggle for long arguments
- Responsive: Stack on mobile

---

### FrameworkBadge

**Purpose**: Display a philosophical framework as a colored badge

**File**: `/components/inquire/FrameworkBadge.tsx`

**Props**:
```typescript
interface FrameworkBadgeProps {
  framework: Pick<Framework, 'id' | 'name' | 'slug' | 'color_class'>;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showTooltip?: boolean;
}
```

**Design**:
```tsx
<Tooltip
  content={framework.short_description}
  disabled={!showTooltip}
>
  <div
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border-2 font-bold cursor-default',
      framework.color_class || 'bg-slate-100 text-slate-700 border-slate-300',
      {
        'px-2 py-1 text-xs': size === 'sm',
        'px-3 py-1.5 text-sm': size === 'md',
        'px-4 py-2 text-base': size === 'lg',
        'cursor-pointer hover:opacity-80 transition-opacity': onClick,
      }
    )}
    onClick={onClick}
  >
    <span>{framework.name}</span>
  </div>
</Tooltip>
```

**Behavior**:
- Hover: Show tooltip with framework description (if enabled)
- Click: Filter comments by framework (if onClick provided)
- Sizes: sm (for cards), md (default), lg (for headers)

**Color Classes** (from database):
- Utilitarian: `bg-blue-100 text-blue-700 border-blue-300`
- Deontology: `bg-purple-100 text-purple-700 border-purple-300`
- Virtue Ethics: `bg-green-100 text-green-700 border-green-300`
- Social Contract: `bg-indigo-100 text-indigo-700 border-indigo-300`
- Libertarianism: `bg-orange-100 text-orange-700 border-orange-300`
- Care Ethics: `bg-pink-100 text-pink-700 border-pink-300`
- Natural Law: `bg-amber-100 text-amber-700 border-amber-300`
- Pragmatism: `bg-teal-100 text-teal-700 border-teal-300`

---

### DifficultyIndicator

**Purpose**: Show topic difficulty level visually

**File**: `/components/inquire/DifficultyIndicator.tsx`

**Props**:
```typescript
interface DifficultyIndicatorProps {
  level: DifficultyLevel;
  showLabel?: boolean;
  variant?: 'badge' | 'dots';
}
```

**Design (Badge variant)**:
```tsx
<div
  className={cn(
    'inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold',
    {
      'bg-green-100 text-green-700 border border-green-300': level === 'beginner',
      'bg-amber-100 text-amber-700 border border-amber-300': level === 'intermediate',
      'bg-red-100 text-red-700 border border-red-300': level === 'advanced',
    }
  )}
>
  {level === 'beginner' && <ChevronUpIcon className="w-3 h-3" />}
  {level === 'intermediate' && <ChevronDoubleUpIcon className="w-3 h-3" />}
  {level === 'advanced' && <ChevronTripleUpIcon className="w-3 h-3" />}
  {showLabel && <span className="capitalize">{level}</span>}
</div>
```

**Design (Dots variant)**:
```tsx
<div className="flex items-center gap-1">
  {[1, 2, 3].map((dot) => (
    <div
      key={dot}
      className={cn(
        'w-2 h-2 rounded-full',
        dot <= difficultyValue ? 'bg-slate-700' : 'bg-slate-300'
      )}
    />
  ))}
  {showLabel && (
    <span className="ml-1 text-xs text-slate-600 capitalize">{level}</span>
  )}
</div>
```

**Behavior**:
- Badge variant: Colored badge with icon
- Dots variant: 1-3 filled dots
- Colors: Green (beginner), Amber (intermediate), Red (advanced)

---

### DepthScoreDisplay

**Purpose**: Show comment quality score with optional breakdown

**File**: `/components/inquire/DepthScoreDisplay.tsx`

**Props**:
```typescript
interface DepthScoreDisplayProps {
  score: number; // 0-100
  showBreakdown?: boolean;
  breakdown?: DepthScoreBreakdown;
  size?: 'sm' | 'md' | 'lg';
}
```

**Design**:
```tsx
<div className="inline-flex items-center gap-2">
  {/* Score badge */}
  <div
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-bold',
      {
        'px-2 py-1 text-xs': size === 'sm',
        'px-3 py-1.5 text-sm': size === 'md',
        'px-4 py-2 text-base': size === 'lg',
      },
      {
        'bg-red-100 text-red-700 border-2 border-red-300': score < 40,
        'bg-amber-100 text-amber-700 border-2 border-amber-300': score >= 40 && score < 70,
        'bg-green-100 text-green-700 border-2 border-green-300': score >= 70,
      }
    )}
  >
    <TargetIcon className="w-4 h-4" />
    <span>{score}</span>
  </div>

  {/* Info tooltip */}
  <Tooltip
    content={
      <div className="text-xs space-y-1">
        <p className="font-bold mb-2">Depth Score Components:</p>
        {showBreakdown && breakdown ? (
          <>
            <p>Length & Substance: {breakdown.components.length_substance}/15</p>
            <p>Framework Engagement: {breakdown.components.framework_engagement}/20</p>
            <p>Citations: {breakdown.components.citations}/10</p>
            <p>Steelman Accuracy: {breakdown.components.steelman_accuracy}/25</p>
            <p>Reply Depth: {breakdown.components.reply_depth}/15</p>
            <p>Diverse Engagement: {breakdown.components.diverse_engagement}/15</p>
          </>
        ) : (
          <p>Quality metric based on substance, engagement, and charitable dialogue</p>
        )}
      </div>
    }
  >
    <InfoIcon className="w-4 h-4 text-slate-400" />
  </Tooltip>
</div>
```

**Behavior**:
- Color coding: Red (< 40), Amber (40-69), Green (70+)
- Hover: Show tooltip with breakdown
- Click info icon: Expand full breakdown modal (if provided)

---

## Interactive Components

### PositionDeclarationForm

**Purpose**: Allow users to declare their position on a topic

**File**: `/components/inquire/PositionDeclarationForm.tsx`

**Props**:
```typescript
interface PositionDeclarationFormProps {
  topicId: string;
  initialPosition?: UserPosition; // For editing existing position
  onSuccess?: (position: UserPosition) => void;
  onCancel?: () => void;
}
```

**Design**:
```tsx
<Card variant="highlight" className="p-6">
  <h3 className="text-xl font-black text-slate-900 mb-4">
    {initialPosition ? 'Update Your Position' : 'Declare Your Position'}
  </h3>

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Position value slider */}
    <div>
      <label className="text-sm font-bold text-slate-700 mb-3 block">
        What's your stance?
      </label>
      <div className="space-y-2">
        <input
          type="range"
          min="-2"
          max="2"
          step="1"
          value={positionValue}
          onChange={(e) => setPositionValue(Number(e.target.value) as PositionValue)}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-600">
          <span>Strongly Disagree</span>
          <span>Uncertain</span>
          <span>Strongly Agree</span>
        </div>
        <p className="text-center text-lg font-bold text-slate-900">
          {POSITION_LABELS[positionValue]}
        </p>
      </div>
    </div>

    {/* Confidence level */}
    <div>
      <label className="text-sm font-bold text-slate-700 mb-3 block">
        How confident are you?
      </label>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setConfidence(level as ConfidenceLevel)}
            className={cn(
              'py-2 px-3 rounded text-sm font-bold border-2 transition-all',
              confidence === level
                ? 'bg-teal-500 text-white border-teal-600'
                : 'bg-white text-slate-700 border-slate-300 hover:border-teal-500'
            )}
          >
            {level}
          </button>
        ))}
      </div>
      <p className="text-center text-sm text-slate-600 mt-2">
        {CONFIDENCE_LABELS[confidence]}
      </p>
    </div>

    {/* Framework selection */}
    <div>
      <label className="text-sm font-bold text-slate-700 mb-3 block">
        Which framework informs your view?
      </label>
      <select
        value={frameworkId || ''}
        onChange={(e) => setFrameworkId(e.target.value || null)}
        className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg text-sm"
      >
        <option value="">Select a framework (optional)</option>
        {frameworks.map((fw) => (
          <option key={fw.id} value={fw.id}>
            {fw.name} - {fw.short_description}
          </option>
        ))}
      </select>
    </div>

    {/* Optional note (only for updates) */}
    {initialPosition && (
      <div>
        <label className="text-sm font-bold text-slate-700 mb-2 block">
          What changed your mind? (optional)
        </label>
        <textarea
          value={changeReason}
          onChange={(e) => setChangeReason(e.target.value)}
          placeholder="After reading X's argument, I realized..."
          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg text-sm"
          rows={3}
        />
      </div>
    )}

    {/* Actions */}
    <div className="flex gap-3">
      {onCancel && (
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      )}
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="flex-1"
      >
        {initialPosition ? 'Update Position' : 'Declare Position'}
      </Button>
    </div>
  </form>
</Card>
```

**Behavior**:
- Position slider: -2 to +2, snaps to integers
- Confidence: Radio button grid (1-5)
- Framework: Dropdown with descriptions
- Validation: All fields required except note
- Submit: POST to API, update UI optimistically
- Success: Show toast, update position tracker

---

### SteelmanPrompt

**Purpose**: Require users to summarize opposing view before replying

**File**: `/components/inquire/SteelmanPrompt.tsx`

**Props**:
```typescript
interface SteelmanPromptProps {
  parentComment: Pick<TopicComment, 'id' | 'content' | 'user_id'>;
  onSubmit: (summary: string) => void;
  onCancel: () => void;
  aiValidation?: boolean; // Use AI to check fairness
}
```

**Design**:
```tsx
<Modal open={true} onClose={onCancel} maxWidth="md">
  <div className="p-8">
    {/* Header */}
    <div className="mb-6">
      <h3 className="text-2xl font-black text-slate-900 mb-2">
        First, show you understand their view
      </h3>
      <p className="text-slate-600 leading-relaxed">
        Before responding, demonstrate charitable interpretation by
        summarizing the comment you're replying to in your own words.
      </p>
    </div>

    {/* Parent comment preview */}
    <Card variant="standard" className="mb-6 bg-slate-50">
      <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">
        {parentComment.content}
      </p>
    </Card>

    {/* Steelman input */}
    <div className="mb-6">
      <label className="text-sm font-bold text-slate-700 mb-2 block">
        Summarize their position (min. 50 characters)
      </label>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="They're arguing that..."
        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg text-sm focus:border-teal-500 focus:outline-none"
        rows={4}
        minLength={50}
      />
      <div className="flex justify-between items-center mt-2">
        <span
          className={cn(
            'text-xs font-bold',
            summary.length >= 50 ? 'text-green-600' : 'text-slate-400'
          )}
        >
          {summary.length}/50 characters
        </span>
        {aiValidation && summary.length >= 50 && (
          <button
            onClick={handleAICheck}
            className="text-xs text-teal-600 hover:text-teal-700 font-bold"
          >
            Check fairness with AI
          </button>
        )}
      </div>
    </div>

    {/* AI feedback (if enabled) */}
    {aiFeedback && (
      <Card
        variant={aiFeedback.isFair ? 'success' : 'error'}
        className="mb-6 p-4"
      >
        <p className="text-sm font-bold mb-1">
          {aiFeedback.isFair ? '✓ Looks fair!' : '⚠ Consider revising'}
        </p>
        <p className="text-sm">{aiFeedback.message}</p>
      </Card>
    )}

    {/* Actions */}
    <div className="flex gap-3">
      <Button
        variant="secondary"
        onClick={onCancel}
        className="flex-1"
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={() => onSubmit(summary)}
        disabled={summary.length < 50}
        className="flex-1"
      >
        Continue to Response
      </Button>
    </div>
  </div>
</Modal>
```

**Behavior**:
- Modal overlay, focus trap
- Textarea autofocus on open
- Character count validation (min 50)
- Optional AI fairness check (Gemini API)
- Submit: Pass summary to parent, open reply form
- Escape/cancel: Close modal

**AI Validation** (optional):
- Send summary + original comment to Gemini
- Prompt: "Is this a fair summary? Not sarcastic or dismissive?"
- Show feedback inline
- User can proceed even if AI flags (not a hard block)

---

### PositionEvolutionChart

**Purpose**: Visualize how a user's position has changed over time

**File**: `/components/inquire/PositionEvolutionChart.tsx`

**Props**:
```typescript
interface PositionEvolutionChartProps {
  data: PositionEvolutionData;
  height?: number;
  showAnnotations?: boolean; // Show change reasons
}
```

**Design** (using recharts):
```tsx
<Card variant="standard">
  <CardHeader>
    <CardTitle className="text-lg">{data.topic_title}</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={height || 200}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="date"
          stroke="#64748b"
          fontSize={12}
          tickFormatter={(value) => format(new Date(value), 'MMM d')}
        />
        <YAxis
          domain={[-2, 2]}
          ticks={[-2, -1, 0, 1, 2]}
          stroke="#64748b"
          fontSize={12}
          tickFormatter={(value) => POSITION_LABELS[value]}
        />
        <Tooltip
          content={<CustomTooltip showAnnotations={showAnnotations} />}
        />
        <Line
          type="monotone"
          dataKey="position_value"
          stroke="#14b8a6"
          strokeWidth={3}
          dot={{ fill: '#14b8a6', r: 6 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>

    {/* Current position */}
    <div className="mt-4 p-3 bg-teal-50 rounded-lg border-2 border-teal-200">
      <p className="text-xs font-bold text-teal-700 mb-1">CURRENT POSITION</p>
      <p className="text-sm font-black text-slate-900">
        {POSITION_LABELS[data.current_position.position_value]}
      </p>
      {data.current_position.framework && (
        <FrameworkBadge
          framework={data.current_position.framework}
          size="sm"
          className="mt-2"
        />
      )}
    </div>
  </CardContent>
</Card>
```

**Custom Tooltip**:
```tsx
function CustomTooltip({ active, payload, showAnnotations }) {
  if (!active || !payload?.length) return null;

  const dataPoint = payload[0].payload;

  return (
    <Card variant="standard" className="p-3 shadow-xl">
      <p className="text-xs font-bold text-slate-500 mb-1">
        {format(new Date(dataPoint.date), 'MMM d, yyyy')}
      </p>
      <p className="text-sm font-black text-slate-900 mb-2">
        {POSITION_LABELS[dataPoint.position_value]}
      </p>
      <p className="text-xs text-slate-600">
        Confidence: {CONFIDENCE_LABELS[dataPoint.confidence_level]}
      </p>
      {showAnnotations && dataPoint.change_reason && (
        <p className="text-xs text-slate-700 mt-2 italic border-t border-slate-200 pt-2">
          "{dataPoint.change_reason}"
        </p>
      )}
    </Card>
  );
}
```

**Behavior**:
- Line chart showing position changes over time
- Y-axis: -2 to +2 (position values)
- X-axis: Dates
- Hover: Show tooltip with details
- Annotations: Change reasons (if enabled)
- Responsive: Adjust height on mobile

---

### CommentCard

**Purpose**: Display a comment with voting, replies, and depth score

**File**: `/components/inquire/CommentCard.tsx`

**Props**:
```typescript
interface CommentCardProps {
  comment: TopicCommentWithDetails;
  onReply?: (commentId: string) => void;
  onVote?: (commentId: string, voteType: VoteType) => void;
  onRateSteelman?: (commentId: string, rating: number) => void;
  depth?: number; // Nesting level (0, 1, 2 max)
  currentUserId?: string;
}
```

**Design**:
```tsx
<div
  className={cn(
    'py-4',
    depth > 0 && 'ml-8 border-l-2 border-slate-200 pl-4'
  )}
>
  {/* Comment header */}
  <div className="flex items-start gap-3 mb-3">
    <Avatar src={comment.user.avatar} size="sm" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-bold text-slate-900">
          {comment.is_anonymous
            ? `Anonymous Philosopher #${comment.id.slice(0, 4)}`
            : comment.user.username}
        </span>
        {comment.user.expert_badge && (
          <Badge variant="success" size="sm">
            {comment.user.expert_badge.badge_type}
          </Badge>
        )}
        {comment.framework && (
          <FrameworkBadge framework={comment.framework} size="sm" />
        )}
        <span className="text-xs text-slate-500">
          {formatDistanceToNow(new Date(comment.created_at))} ago
        </span>
      </div>
    </div>
    <DepthScoreDisplay score={comment.depth_score} size="sm" />
  </div>

  {/* Steelman summary (if replying to someone) */}
  {comment.steelman_summary && comment.parent_comment && (
    <Card variant="standard" className="mb-3 p-3 bg-slate-50 border-l-4 border-teal-500">
      <p className="text-xs font-bold text-slate-500 mb-1">
        THEIR VIEW, AS I UNDERSTAND IT:
      </p>
      <p className="text-sm text-slate-700 leading-relaxed">
        {comment.steelman_summary}
      </p>
      {/* Steelman accuracy rating (if user is parent commenter) */}
      {currentUserId === comment.parent_comment.user_id &&
       !comment.steelman_accuracy_rating && (
        <div className="mt-3 pt-3 border-t border-slate-200">
          <p className="text-xs font-bold text-slate-700 mb-2">
            Is this a fair summary of your view?
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onRateSteelman?.(comment.id, rating)}
                className="px-3 py-1 text-xs font-bold rounded border-2 border-slate-300 hover:border-teal-500 transition-colors"
              >
                {rating}
              </button>
            ))}
          </div>
        </div>
      )}
      {comment.steelman_accuracy_rating && (
        <p className="text-xs text-green-600 font-bold mt-2">
          ✓ Rated {comment.steelman_accuracy_rating}/5 by original commenter
        </p>
      )}
    </Card>
  )}

  {/* Comment content */}
  <div className="prose prose-slate max-w-none mb-3">
    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
      {comment.content}
    </p>
  </div>

  {/* Comment footer */}
  <div className="flex items-center gap-4 text-sm">
    {/* Voting */}
    <div className="flex items-center gap-2">
      <button
        onClick={() => onVote?.(comment.id, 'upvote')}
        className={cn(
          'p-1 rounded hover:bg-slate-100 transition-colors',
          comment.user_vote === 'upvote' && 'text-teal-600'
        )}
      >
        <ArrowUpIcon className="w-4 h-4" />
      </button>
      <span className="font-bold text-slate-700">
        {comment.upvotes - comment.downvotes}
      </span>
      <button
        onClick={() => onVote?.(comment.id, 'downvote')}
        className={cn(
          'p-1 rounded hover:bg-slate-100 transition-colors',
          comment.user_vote === 'downvote' && 'text-red-600'
        )}
      >
        <ArrowDownIcon className="w-4 h-4" />
      </button>
    </div>

    {/* Reply button */}
    {depth < 2 && onReply && (
      <button
        onClick={() => onReply(comment.id)}
        className="text-slate-600 hover:text-teal-600 font-bold transition-colors"
      >
        Reply
      </button>
    )}

    {/* Reply count */}
    {comment.reply_count > 0 && (
      <span className="text-slate-500">
        {comment.reply_count} {comment.reply_count === 1 ? 'reply' : 'replies'}
      </span>
    )}
  </div>

  {/* Nested replies */}
  {comment.replies && comment.replies.length > 0 && (
    <div className="mt-4 space-y-4">
      {comment.replies.map((reply) => (
        <CommentCard
          key={reply.id}
          comment={reply}
          depth={(depth || 0) + 1}
          onReply={onReply}
          onVote={onVote}
          onRateSteelman={onRateSteelman}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  )}
</div>
```

**Behavior**:
- Vote buttons: Optimistic UI update
- Reply button: Open steelman prompt modal
- Steelman rating: Only shown to parent commenter
- Nesting: Max 3 levels (depth 0, 1, 2)
- Anonymous: Hide username, show anonymous ID
- Expert badge: Show if user has verified credentials

---

### ThoughtExperimentCard

**Purpose**: Display a thought experiment with interactive response

**File**: `/components/inquire/ThoughtExperimentCard.tsx`

**Props**:
```typescript
interface ThoughtExperimentCardProps {
  experiment: ThoughtExperiment;
  topicId: string;
  userResponse?: ThoughtExperimentResponseWithFramework;
  analytics?: ThoughtExperimentAnalytics;
  onSubmitResponse?: (response: ThoughtExperimentResponseInput) => void;
}
```

**Design**:
```tsx
<Card variant="accent" accentColor="teal" className="mb-8">
  {/* Header */}
  <div className="flex items-center gap-3 mb-4">
    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
      <LightbulbIcon className="w-6 h-6 text-teal-600" />
    </div>
    <h3 className="text-2xl font-black text-slate-900">
      {experiment.title}
    </h3>
  </div>

  {/* Scenario */}
  <div className="prose prose-slate max-w-none mb-6">
    <p className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
      {experiment.scenario}
    </p>
  </div>

  {/* The question */}
  <div className="p-4 bg-teal-50 rounded-lg border-2 border-teal-200 mb-6">
    <p className="text-sm font-black text-slate-900">
      {experiment.question}
    </p>
  </div>

  {/* User response form (if not yet answered) */}
  {!userResponse && (
    <div className="mb-6">
      <label className="text-sm font-bold text-slate-700 mb-3 block">
        Your response:
      </label>
      <textarea
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
        placeholder="What would you do? Why?"
        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg text-sm mb-3"
        rows={4}
      />
      <div className="flex gap-3">
        <select
          value={frameworkId || ''}
          onChange={(e) => setFrameworkId(e.target.value || null)}
          className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg text-sm"
        >
          <option value="">Framework (optional)</option>
          {frameworks.map((fw) => (
            <option key={fw.id} value={fw.id}>{fw.name}</option>
          ))}
        </select>
        <Button
          onClick={() => onSubmitResponse?.({
            topic_id: topicId,
            experiment_key: experiment.title,
            response_value: responseText,
            framework_id: frameworkId,
          })}
          disabled={!responseText.trim()}
        >
          Submit Response
        </Button>
      </div>
    </div>
  )}

  {/* User's submitted response */}
  {userResponse && (
    <Card variant="standard" className="mb-6 bg-gradient-to-br from-teal-50 to-white">
      <p className="text-xs font-bold text-teal-700 mb-2">YOUR RESPONSE</p>
      <p className="text-sm text-slate-700 leading-relaxed mb-3">
        {userResponse.response_value}
      </p>
      {userResponse.framework && (
        <FrameworkBadge framework={userResponse.framework} size="sm" />
      )}
    </Card>
  )}

  {/* Analytics (if available) */}
  {analytics && (
    <div className="pt-4 border-t border-slate-200">
      <p className="text-xs font-bold text-slate-500 mb-3">
        {analytics.total_responses} RESPONSES FROM COMMUNITY
      </p>
      {/* Simple bar chart of response distribution */}
      <div className="space-y-2">
        {Object.entries(analytics.response_distribution).map(([response, count]) => {
          const percentage = (count / analytics.total_responses) * 100;
          return (
            <div key={response} className="flex items-center gap-3">
              <span className="text-xs text-slate-600 w-32 truncate">
                {response.slice(0, 30)}...
              </span>
              <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                <div
                  className="h-full bg-teal-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-700 w-12 text-right">
                {percentage.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  )}

  {/* Why it matters */}
  <div className="mt-6 p-4 bg-slate-50 rounded-lg">
    <p className="text-xs font-bold text-slate-500 mb-2">WHY THIS MATTERS</p>
    <p className="text-sm text-slate-700 leading-relaxed">
      {experiment.why_it_matters}
    </p>
  </div>
</Card>
```

**Behavior**:
- Show response form if user hasn't answered
- After submission, show user's response + analytics
- Analytics: Bar chart of response distribution
- Optional: Show framework breakdown on hover

---

## Navigation Components

### InquireBreadcrumb

**Purpose**: Show current location in Inquire hierarchy

**File**: `/components/inquire/InquireBreadcrumb.tsx`

**Props**:
```typescript
interface InquireBreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}
```

**Design**:
```tsx
<nav aria-label="Breadcrumb" className="mb-6">
  <ol className="flex items-center gap-2 text-sm">
    {items.map((item, index) => (
      <li key={index} className="flex items-center gap-2">
        {index > 0 && (
          <ChevronRightIcon className="w-4 h-4 text-slate-400" />
        )}
        {item.href ? (
          <Link
            href={item.href}
            className="text-slate-600 hover:text-teal-600 font-medium transition-colors"
          >
            {item.label}
          </Link>
        ) : (
          <span className="text-slate-900 font-bold">
            {item.label}
          </span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

---

### CategoryFilter

**Purpose**: Filter topics by category

**File**: `/components/inquire/CategoryFilter.tsx`

**Design**: Dropdown or horizontal tabs showing all categories with active state

---

### FrameworkFilter

**Purpose**: Filter comments by philosophical framework

**File**: `/components/inquire/FrameworkFilter.tsx`

**Design**: Dropdown or chip group showing all frameworks, multi-select

---

## Component Dependencies

```
ui/Card → Base card component
ui/Button → Base button component
ui/Badge → Base badge component
ui/Modal → Base modal component
ui/Tooltip → Base tooltip component

inquire/CategoryCard → Card, Badge
inquire/TopicCard → Card, Badge, DifficultyIndicator, FrameworkBadge
inquire/PositionCard → Card, Badge, FrameworkBadge
inquire/CommentCard → Card, Badge, Avatar, FrameworkBadge, DepthScoreDisplay
inquire/PositionDeclarationForm → Card, Button, Badge
inquire/SteelmanPrompt → Modal, Card, Button
inquire/PositionEvolutionChart → Card, recharts
inquire/ThoughtExperimentCard → Card, Button, FrameworkBadge
```

---

## Accessibility Checklist

All components must implement:
- [ ] Semantic HTML (proper heading hierarchy)
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation support (Tab, Enter, Escape)
- [ ] Focus indicators (visible focus ring)
- [ ] Color contrast 4.5:1 minimum
- [ ] Screen reader announcements for dynamic content
- [ ] Skip links for long content
- [ ] Touch targets minimum 44x44px on mobile

---

## Testing Requirements

Each component should have:
1. **Unit tests**: Props validation, rendering, state management
2. **Integration tests**: User interactions, API calls
3. **Visual regression tests**: Screenshot comparison
4. **Accessibility tests**: axe-core automated checks

---

## Implementation Priority

**Phase 1** (Week 2):
1. CategoryCard
2. TopicCard
3. FrameworkBadge
4. DifficultyIndicator

**Phase 2** (Week 2-3):
5. PositionCard
6. DepthScoreDisplay
7. InquireBreadcrumb

**Phase 3** (Week 3):
8. PositionDeclarationForm
9. CommentCard
10. ThoughtExperimentCard

**Phase 4** (Week 3-4):
11. SteelmanPrompt
12. PositionEvolutionChart
13. CategoryFilter
14. FrameworkFilter

---

**Document Version**: 1.0
**Last Updated**: November 17, 2025
**Next Review**: Component implementation kickoff
