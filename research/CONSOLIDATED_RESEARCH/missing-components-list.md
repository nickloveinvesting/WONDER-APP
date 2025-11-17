# Missing Components for Conversation Platform

**Purpose:** Identify components needed for a conversation-based philosophy platform that don't currently exist.

**Categorization:**
- **Critical (Must Have):** Blocks core functionality
- **Important (Should Have):** Enhances core features significantly
- **Nice-to-Have (Could Have):** Improves UX/polish
- **Enhancement (Future):** Advanced features

---

## CRITICAL COMPONENTS (Must Build Immediately)

### 1. ConversationCard
**Purpose:** Display conversation/thread preview (replaces DebateCard)

**Proposed Props:**
```typescript
interface ConversationCardProps {
  id: string
  title: string
  preview?: string           // First few lines of conversation
  participantCount: number
  perspectiveCount?: number  // How many viewpoints represented
  lastActivityAt: Date
  status: 'active' | 'archived' | 'draft'
  featured?: boolean
  onClick?: () => void
}
```

**Design:**
- Card variant with left border
- Title in navy bold
- Preview text clamped to 2 lines
- Participant count
- Last activity timestamp
- Status badge
- "View Conversation" button

**Suggested Location:** `/components/ui/ConversationCard.tsx`

**Estimated Effort:** 2-3 hours

**Dependencies:** Card, Badge, Button components

---

### 2. MessageThread / CommentThread
**Purpose:** Display hierarchical discussion messages (replaces argument list in SingleDebateTemplate)

**Proposed Props:**
```typescript
interface Message {
  id: string
  author: {
    username: string
    displayName?: string
    avatar?: string
  }
  content: string
  perspective?: string      // User's viewpoint/position
  createdAt: Date
  replies?: Message[]        // Nested replies
  reactions?: Array<{ emoji: string; count: number }>
}

interface MessageThreadProps {
  messages: Message[]
  onReply?: (messageId: string, content: string) => void
  onDelete?: (messageId: string) => void
  currentUserId?: string
}
```

**Design:**
- Nested message display with indentation
- Author info (avatar, name, timestamp)
- Message content with line breaks preserved
- Perspective/position label
- Reply button
- Delete button (if owner)
- Emoji reactions support
- Markdown/rich text rendering (optional)

**Suggested Location:** `/components/ui/MessageThread.tsx`

**Estimated Effort:** 4-5 hours

**Dependencies:** Card, Badge components, potential markdown library

---

### 3. UserScoreRow (Leaderboard Alternative)
**Purpose:** Display user with score/ranking (replaces LeaderboardRow)

**Proposed Props:**
```typescript
interface UserScoreRowProps {
  rank: number
  username: string
  displayName?: string
  avatar?: string
  score: number              // Generic score metric
  level?: string | number    // Optional level/tier
  participationCount?: number
  badge?: string            // Optional achievement badge
  change?: number           // Score change indicator
  isCurrentUser?: boolean
  onClick?: () => void
}
```

**Design:**
- Similar structure to LeaderboardRow
- Rank display (medals for top 3)
- User avatar + name
- Primary score display
- Optional level/tier badge
- Participation count (desktop only)
- Score change indicator (arrows)
- Hover effects

**Suggested Location:** `/components/ui/UserScoreRow.tsx`

**Estimated Effort:** 2-3 hours

**Dependencies:** Badge component

---

### 4. PerspectiveLabel / ViewpointTag
**Purpose:** Display user's perspective or viewpoint in conversation

**Proposed Props:**
```typescript
interface PerspectiveTagProps {
  label: string              // e.g., "Supporting", "Questioning", "Neutral"
  color?: 'positive' | 'negative' | 'neutral' | 'custom'
  icon?: LucideIcon
  className?: string
}
```

**Design:**
- Inline badge or pill-shaped tag
- Semantic colors (green for supporting, red for questioning)
- Optional icon
- Small text (12-14px)

**Suggested Location:** `/components/ui/PerspectiveTag.tsx`

**Estimated Effort:** 1-2 hours

**Dependencies:** lucide-react icons

---

## IMPORTANT COMPONENTS (Should Build Soon)

### 5. UserProfileCard
**Purpose:** Display user profile summary (for user profiles, leaderboard detail)

**Proposed Props:**
```typescript
interface UserProfileCardProps {
  username: string
  displayName?: string
  avatar?: string
  bio?: string
  score: number
  level?: string
  badges?: Array<{ name: string; icon: string }>
  joinDate?: Date
  participationStats?: {
    conversationsStarted: number
    messagesPosted: number
    topicsExplored: string[]
  }
  actionButtons?: Array<{ label: string; onClick: () => void }>
}
```

**Design:**
- Avatar (large, 100px)
- Username + display name
- Bio text
- Score and level badges
- Achievement badges grid
- Statistics section
- Action buttons (Follow, Message, etc.)
- Join date

**Suggested Location:** `/components/ui/UserProfileCard.tsx`

**Estimated Effort:** 3-4 hours

**Dependencies:** Badge, Button components

---

### 6. ConversationHeader
**Purpose:** Display conversation details at top of detail page

**Proposed Props:**
```typescript
interface ConversationHeaderProps {
  title: string
  description?: string
  status: 'active' | 'archived' | 'draft'
  participantCount: number
  createdBy: {
    username: string
    avatar?: string
  }
  createdAt: Date
  perspectiveCount?: number
  actionMenu?: Array<{ label: string; icon: LucideIcon; onClick: () => void }>
}
```

**Design:**
- Large title
- Description/context
- Status badge
- Creator info + creation date
- Participant count
- Perspective count
- Action dropdown menu

**Suggested Location:** `/components/ui/ConversationHeader.tsx`

**Estimated Effort:** 2-3 hours

**Dependencies:** Badge, Button components

---

### 7. ParticipantList
**Purpose:** Display conversation participants and their perspectives

**Proposed Props:**
```typescript
interface Participant {
  username: string
  displayName?: string
  avatar?: string
  perspective: string
  messageCount: number
  joinedAt: Date
  isOrganizer?: boolean
}

interface ParticipantListProps {
  participants: Participant[]
  onParticipantClick?: (username: string) => void
}
```

**Design:**
- List or grid of participant cards
- Avatar + name
- Perspective label with color
- Message count
- Join date
- Organizer badge (if applicable)
- Click to view profile

**Suggested Location:** `/components/ui/ParticipantList.tsx`

**Estimated Effort:** 2-3 hours

**Dependencies:** Badge component

---

### 8. ConversationFilter
**Purpose:** Filter conversations by status, topic, participant, etc.

**Proposed Props:**
```typescript
interface ConversationFilterProps {
  status?: 'active' | 'archived' | 'draft'
  sortBy?: 'recent' | 'popular' | 'most-commented'
  filterTopics?: string[]
  filterParticipants?: string[]
  searchQuery?: string
  onFilterChange: (filters: any) => void
}
```

**Design:**
- Status filter buttons (Active, Archived, Draft)
- Sort dropdown
- Topic/keyword filter chips
- Participant search
- Overall search box
- Clear all button

**Suggested Location:** `/components/ui/ConversationFilter.tsx`

**Estimated Effort:** 2-3 hours

**Dependencies:** Button, Input, Badge components

---

## NICE-TO-HAVE COMPONENTS (Polish/UX Enhancement)

### 9. Avatar
**Purpose:** User avatar with fallback to initials

**Proposed Props:**
```typescript
interface AvatarProps {
  src?: string
  alt: string
  username?: string          // For initial fallback
  size?: 'sm' | 'md' | 'lg'  // 32, 48, 64px
  className?: string
}
```

**Design:**
- Circular image
- Fallback to initials if no image
- Loading state
- Border option

**Suggested Location:** `/components/ui/Avatar.tsx`

**Estimated Effort:** 1-2 hours

**Dependencies:** Next.js Image

---

### 10. TopicCard
**Purpose:** Display topic/subject card for topic browsing

**Proposed Props:**
```typescript
interface TopicCardProps {
  name: string
  description?: string
  conversationCount: number
  participantCount: number
  lastActivityAt: Date
  featured?: boolean
  onClick?: () => void
}
```

**Design:**
- Topic title
- Description
- Conversation count
- Participant count
- Last activity
- Featured badge
- Click to browse topic

**Suggested Location:** `/components/ui/TopicCard.tsx`

**Estimated Effort:** 1-2 hours

**Dependencies:** Card, Badge, Button components

---

### 11. Modal / Dialog
**Purpose:** Display modals for actions (confirm, create, edit)

**Proposed Props:**
```typescript
interface ModalProps {
  isOpen: boolean
  title: string
  description?: string
  children?: ReactNode
  actionButtons?: Array<{ label: string; variant: string; onClick: () => void }>
  onClose: () => void
  size?: 'sm' | 'md' | 'lg'
}
```

**Design:**
- Overlay
- Centered modal with close button
- Title + description
- Content area
- Action buttons
- Size variants

**Suggested Location:** `/components/ui/Modal.tsx`

**Estimated Effort:** 2-3 hours

**Dependencies:** Button component

---

### 12. LoadingSpinner / Skeleton
**Purpose:** Show loading states while fetching data

**Proposed Props:**
```typescript
// Spinner
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'navy' | 'brown' | 'white'
}

// Skeleton (placeholder while loading)
interface SkeletonProps {
  width?: string
  height?: string
  count?: number
  className?: string
}
```

**Design:**
- Spinning icon for loading state
- Skeleton loaders for content placeholders
- ARGUED branded colors

**Suggested Location:** `/components/ui/Spinner.tsx` and `/components/ui/Skeleton.tsx`

**Estimated Effort:** 1-2 hours

**Dependencies:** lucide-react icons

---

### 13. EmptyState
**Purpose:** Display message when list is empty

**Proposed Props:**
```typescript
interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  actionButton?: { label: string; onClick: () => void }
  className?: string
}
```

**Design:**
- Icon/emoji
- Title message
- Description
- Optional action button
- Centered, friendly messaging

**Suggested Location:** `/components/ui/EmptyState.tsx`

**Estimated Effort:** 1 hour

**Dependencies:** Button component

---

### 14. Dropdown / Select Menu
**Purpose:** Custom dropdown for filtering and selection

**Proposed Props:**
```typescript
interface DropdownProps {
  items: Array<{ label: string; value: string; icon?: LucideIcon }>
  selected?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchable?: boolean
  multiple?: boolean
}
```

**Design:**
- Custom styled dropdown
- Search support (optional)
- Multi-select support (optional)
- Keyboard navigation

**Suggested Location:** `/components/ui/Dropdown.tsx`

**Estimated Effort:** 2-3 hours

**Dependencies:** lucide-react icons, popover/dropdown logic

---

### 15. Tooltip
**Purpose:** Show help text on hover

**Proposed Props:**
```typescript
interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}
```

**Design:**
- Hover-activated tooltip
- Dark background, light text
- Arrow pointing to element
- Max width to prevent overflow

**Suggested Location:** `/components/ui/Tooltip.tsx`

**Estimated Effort:** 2-3 hours

**Dependencies:** Floating UI library or custom positioning

---

## ENHANCEMENT COMPONENTS (Future/Advanced)

### 16. Pagination
**Purpose:** Navigate between pages of conversations

**Proposed Props:**
```typescript
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
```

**Currently inline in DebatesListTemplate, should extract.**

**Suggested Location:** `/components/ui/Pagination.tsx`

**Estimated Effort:** 1 hour

---

### 17. Breadcrumb
**Purpose:** Show navigation path

**Proposed Props:**
```typescript
interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>
}
```

**Suggested Location:** `/components/ui/Breadcrumb.tsx`

**Estimated Effort:** 1-2 hours

---

### 18. Rating / Stars
**Purpose:** Display or collect star ratings

**Proposed Props:**
```typescript
interface RatingProps {
  value: number              // 1-5 stars
  readOnly?: boolean
  onChange?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
}
```

**Suggested Location:** `/components/ui/Rating.tsx`

**Estimated Effort:** 1-2 hours

---

### 19. Tags / Chip Input
**Purpose:** Input and display tags/keywords

**Proposed Props:**
```typescript
interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
}
```

**Suggested Location:** `/components/ui/TagInput.tsx`

**Estimated Effort:** 2-3 hours

---

### 20. Search Bar
**Purpose:** Global search component

**Proposed Props:**
```typescript
interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  debounce?: number
  suggestions?: string[]
}
```

**Suggested Location:** `/components/ui/SearchBar.tsx`

**Estimated Effort:** 2-3 hours

**Dependencies:** Input component

---

## PRIORITY IMPLEMENTATION SCHEDULE

### Week 1 (Critical)
1. ConversationCard (2-3 hours)
2. MessageThread (4-5 hours)
3. UserScoreRow (2-3 hours)
4. PerspectiveLabel (1-2 hours)
**Total:** ~10-13 hours

### Week 2 (Important)
5. UserProfileCard (3-4 hours)
6. ConversationHeader (2-3 hours)
7. ParticipantList (2-3 hours)
8. ConversationFilter (2-3 hours)
**Total:** ~9-13 hours

### Week 3 (Polish)
9. Avatar (1-2 hours)
10. TopicCard (1-2 hours)
11. Modal (2-3 hours)
12. Spinner/Skeleton (1-2 hours)
13. EmptyState (1 hour)
**Total:** ~6-10 hours

### Week 4+ (Nice-to-Have)
- Dropdown (2-3 hours)
- Tooltip (2-3 hours)
- Pagination/Breadcrumb (2 hours)
- Rating/Tags (2-4 hours)
- Search Bar (2-3 hours)

---

## COMPONENT DEPENDENCIES MAP

```
ConversationCard
├── Card
├── Badge
└── Button

MessageThread
├── Card
├── Badge
└── (optional: markdown library)

UserScoreRow
└── Badge

PerspectiveLabel
└── (optional: lucide-react icons)

UserProfileCard
├── Badge
└── Button

ConversationHeader
├── Badge
└── Button

ParticipantList
└── Badge

ConversationFilter
├── Button
├── Input
└── Badge

Avatar
└── Next.js Image

TopicCard
├── Card
├── Badge
└── Button

Modal
└── Button

LoadingSpinner
└── lucide-react icons

EmptyState
└── Button

Dropdown
└── lucide-react icons

Tooltip
└── (optional: Floating UI)

SearchBar
└── Input
```

---

## ESTIMATED TOTAL EFFORT

**Critical Components:** 10-13 hours
**Important Components:** 9-13 hours
**Nice-to-Have Components:** 6-10 hours
**Enhancement Components:** 10-15 hours

**Total Estimated Effort:** 35-51 hours (~1-2 weeks for one developer)

---

## RECOMMENDATIONS

### Phase 1: Foundation (Week 1)
Focus on components needed for core conversation system:
1. ConversationCard
2. MessageThread
3. UserScoreRow
4. PerspectiveLabel

### Phase 2: Enhancement (Week 2)
Add supporting components:
5. UserProfileCard
6. ConversationHeader
7. ParticipantList
8. ConversationFilter

### Phase 3: Polish (Week 3-4)
Improve UX and add supporting features:
- Avatar
- TopicCard
- Modal
- Spinner/Skeleton
- EmptyState
- Dropdown
- Tooltip

### Phase 4: Advanced (Future)
Add enhancement components as needed:
- Pagination
- Breadcrumb
- Rating
- Tags
- Search Bar

---

## TESTING STRATEGY FOR NEW COMPONENTS

Each new component should include:
1. **Unit Tests** - Render, props validation, events
2. **Accessibility Tests** - Keyboard navigation, screen readers
3. **Visual Tests** - Different states, sizes, variants
4. **Integration Tests** - How it fits with existing components

---

## COMPONENT LIBRARY ADDITIONS CHECKLIST

For each new component, ensure:
- [ ] Created in `/components/ui/`
- [ ] Exported from `/components/ui/index.ts`
- [ ] Has TypeScript interfaces documented
- [ ] Has JSDoc comments
- [ ] Follows ARGUED branding (colors, typography)
- [ ] Mobile responsive
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Unit tests included
- [ ] Used in at least one page/template
- [ ] Documented in component library

