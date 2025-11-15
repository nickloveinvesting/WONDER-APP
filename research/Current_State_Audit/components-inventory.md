# Component Inventory - Complete Application Audit

**Generated:** 2025-11-14  
**Application:** Philosophy Conversation Platform (formerly "ARGUED")  
**Total Components:** 22 (17 in /components + 5 page-specific in /app)

---

## Summary Statistics

- **UI Library Components:** 10 (Button, Card, Input, Badge, Header, Sidebar, StatCard, DebateCard, LeaderboardRow, Toast)
- **Template Components:** 4 (LandingPageTemplate, DashboardTemplate, DebatesListTemplate, SingleDebateTemplate)
- **Shared Components:** 3 (Logo, Navigation, Sidebar - NOTE: duplicate Sidebar exists)
- **Page-Specific Components:** 5 (LoginForm, DebateActions, and page.tsx files)

**Branding Status:** Components are branded with ARGUED colors (navy #1A3A52, brown #8B6F47, cream #F5F3F0)

---

## SHARED COMPONENTS (/components)

### 1. Logo Component
**File:** `/home/user/Philosophy-app/components/Logo.tsx`  
**Type:** Shared/Layout

**Purpose:**  
Displays the application logo with configurable size and color variants.

**Props Interface:**
```typescript
interface LogoProps {
  variant?: 'white' | 'black'  // Logo color variant
  size?: 'sm' | 'md' | 'lg'    // Size preset
  clickable?: boolean          // Links to home if true
}
```

**Renders:**
- Next.js Image component with logo asset
- If `clickable=true`: Wrapped in Link to "/"
- Supports 3 size presets (sm: 100x32px, md: 140x45px, lg: 180x58px)

**Current Usage:**
- `/components/Navigation.tsx` - Header logo
- `/components/ui/Header.tsx` - Header logo
- `/components/ui/Sidebar.tsx` - Sidebar logo
- `/components/templates/LandingPageTemplate.tsx` - Landing page hero and footer

**Dependencies:** None (external: Next.js Image, Link)

**Terminology/Branding:**
- References "PhiloDuel" in alt text (old branding)
- References "/logo-white.png" and "/logo-black.png" assets

---

### 2. Navigation Component (ROOT LAYOUT NAVIGATION)
**File:** `/home/user/Philosophy-app/components/Navigation.tsx`  
**Type:** Layout/Navigation

**Purpose:**  
Top navigation bar for public/unauthenticated pages. Shows different items based on auth state.

**Props Interface:**
```typescript
// No props - uses client-side auth state internally
// Uses: createClient (Supabase), usePathname, useRouter hooks
```

**Renders:**
- Sticky navbar with indigo-600 background (PRIMARY colors, not ARGUED)
- Logo on left
- Public nav items: Home, About (when not authenticated)
- Authenticated nav items: Debates, Leaderboard, Profile (when authenticated)
- Desktop and mobile menu layouts
- User menu with reputation score (★) and logout

**Current Usage:**
- `/app/layout.tsx` (root layout) - Applied to ALL pages
- Hidden on authenticated routes via conditional check

**Dependencies:**
- `Logo` component
- Supabase client for auth state
- lucide-react icons (Menu, X, ChevronDown, User, Settings, LogOut)

**Issues/Notes:**
- **CONFLICT:** Uses indigo-600 colors, not ARGUED branding (navy/brown/cream)
- **OVERLAP:** Header component in UI library provides similar functionality with proper ARGUED branding
- **ROUTING LOGIC:** Has hardcoded route detection to hide on authenticated pages
- Fetches profile data from database on every auth state change

---

### 3. Sidebar Component (ROOT LEVEL)
**File:** `/home/user/Philosophy-app/components/Sidebar.tsx`  
**Type:** Layout/Navigation

**Purpose:**  
Sidebar navigation for authenticated pages. Mobile-friendly with hamburger menu.

**Props Interface:**
```typescript
// No props - uses pathname internally
```

**Renders:**
- Fixed sidebar with slate-800 background (NOT ARGUED colors)
- Static navbar items: Debates, Profile, Leaderboard
- Mobile hamburger menu with overlay
- No user info display

**Current Usage:**
- Unknown - appears unused in current codebase (no imports found)

**Dependencies:**
- lucide-react icons

**Issues/Notes:**
- **DUPLICATE:** UI library has Sidebar component with ARGUED branding that's more feature-rich
- **COLOR MISMATCH:** Uses slate-800, not ARGUED navy
- **DEPRECATED:** Should consolidate with `/components/ui/Sidebar.tsx`

---

## UI LIBRARY COMPONENTS (/components/ui)

### 4. Button Component
**File:** `/home/user/Philosophy-app/components/ui/Button.tsx`  
**Type:** UI/Primitive

**Purpose:**  
Reusable button component with multiple variants and sizes.

**Props Interface:**
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'  // primary=navy, secondary=brown
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
}
```

**Renders:**
- HTML button with ARGUED color scheme
- Variants: primary (navy bg), secondary (brown bg), outline (black border), ghost (transparent)
- Sizes: sm (px-3 py-1.5), md (px-4 py-2), lg (px-6 py-3)
- Disabled state support with opacity reduction

**Current Usage:**
- Extensively used across templates and pages
- Header, Card interactions, all CTAs

**Dependencies:** None

**Terminology/Branding:**
- FULLY ARGUED BRANDED
- Navy primary color (#1A3A52)
- Brown secondary color (#8B6F47)

**Vision Alignment:** ✅ KEEP  
Generic, reusable, completely ARGUED branded with high contrast.

---

### 5. Card Component
**File:** `/home/user/Philosophy-app/components/ui/Card.tsx`  
**Type:** UI/Container

**Purpose:**  
Flexible container for grouping content with ARGUED styling (left border accent).

**Props Interface:**
```typescript
interface CardProps {
  children: ReactNode
  variant?: 'default' | 'highlight' | 'navy' | 'success' | 'error'  // Left border color
  hoverable?: boolean  // Adds hover effects
  className?: string
  onClick?: () => void
}
```

**Renders:**
- White card with 4px left border in accent color
- 6 variants for different semantic uses
- Optional hover effects (shadow and border color change)
- Rounded corners, padding, and shadow

**Current Usage:**
- Debug layout component
- Debate details page
- Dashboard template (featured debate, insights, activity)
- Single debate template (header, arguments, AI judgment)

**Dependencies:** None

**Terminology/Branding:**
- FULLY ARGUED BRANDED
- Navy default left border
- Uses all ARGUED color variants (navy, brown, success, error)

**Vision Alignment:** ✅ KEEP  
Generic, reusable, perfect for conversation-based UI.

---

### 6. Input Component
**File:** `/home/user/Philosophy-app/components/ui/Input.tsx`  
**Type:** UI/Form

**Purpose:**  
Text input and textarea fields with label, error handling, and helper text.

**Props Interface:**
```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}
```

**Renders:**
- Labeled input/textarea with border
- Error state with red border (argued-error)
- Helper text support
- Navy label and black text
- Vertical resizing for textarea only

**Current Usage:**
- Debate filters and search in templates
- Argument submission in SingleDebateTemplate
- Form pages

**Dependencies:** None

**Terminology/Branding:**
- FULLY ARGUED BRANDED
- Navy borders and focus rings
- Uses argued-brown for focus ring color

**Vision Alignment:** ✅ KEEP  
Generic, fully ARGUED branded form inputs suitable for any conversation interface.

---

### 7. Badge Component
**File:** `/home/user/Philosophy-app/components/ui/Badge.tsx`  
**Type:** UI/Indicator

**Purpose:**  
Small indicator badges for status, achievements, position indicators (FOR/AGAINST).

**Props Interface:**
```typescript
interface BadgeProps {
  children: ReactNode
  type?: 'default' | 'achievement' | 'rating' | 'success' | 'error' | 'for' | 'against'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
```

**Renders:**
- Inline-flex circular badge with padding
- 7 semantic types with different colors
- FOR badge: green background with subtle border
- AGAINST badge: red background with subtle border
- Sizes: sm (px-2 py-0.5), md (px-3 py-1), lg (px-4 py-1.5)

**Current Usage:**
- Header user reputation display
- Debate status indicators (Open, In Progress, Completed)
- Debate position counters (FOR/AGAINST counts)
- Leaderboard rank display
- Argument position indicators
- Fact-check verdict indicators

**Dependencies:** None

**Terminology/Branding:**
- FULLY ARGUED BRANDED with debate-specific types
- 'for' and 'against' are debate-specific but reusable for conversation positions
- 'rating' type shows gold background (premium indicator)
- Uses all ARGUED semantic colors

**Vision Alignment:** ⚠️ MODIFY  
Generic badge component with ARGUED branding is great. 'for'/'against' types are debate-specific but could work for any conversation system. Remove debate terminology, keep semantic types.

---

### 8. Header Component
**File:** `/home/user/Philosophy-app/components/ui/Header.tsx`  
**Type:** Layout/Navigation

**Purpose:**  
Top navigation bar for authenticated pages. Displays user info, navigation, and auth menu.

**Props Interface:**
```typescript
interface HeaderProps {
  user?: {
    id: string
    username: string
    reputationScore: number
  } | null
  onSignOut?: () => void
}
```

**Renders:**
- Sticky header with argued-cream background (#F5F3F0)
- Black bottom border (2px) for high contrast
- Logo on left
- Desktop nav items with bold black text
- User menu with reputation score badge
- Mobile-responsive menu with hamburger
- Dropdown menu for Profile, Settings, Logout

**Current Usage:**
- `/app/(authenticated)/layout.tsx` - Authenticated pages layout
- Shows on: /debates, /leaderboard, /profile, /settings

**Dependencies:**
- Button, Badge components
- lucide-react icons

**Terminology/Branding:**
- FULLY ARGUED BRANDED
- Cream background (warmth, high contrast)
- Black text and borders
- Reputation score shown as rating badge

**Vision Alignment:** ✅ KEEP  
Excellent header component. Reputation score concept is debate-specific, but could easily be adapted to show any user score/metric. ARGUED branding is solid.

---

### 9. Sidebar Component (UI LIBRARY)
**File:** `/home/user/Philosophy-app/components/ui/Sidebar.tsx`  
**Type:** Layout/Navigation

**Purpose:**  
Left sidebar navigation for authenticated pages. Shows navigation menu, user info, and DeLO rating.

**Props Interface:**
```typescript
interface SidebarProps {
  username?: string
  deloRating?: number
}
```

**Renders:**
- Fixed sidebar with argued-navy background (#1A3A52)
- Logo display (white variant)
- User info section with DeLO rating (gold text)
- Navigation items: Debates, Create Debate, Leaderboard, Profile
- Active state with brown highlight
- Mobile hamburger menu with overlay
- Footer copyright text

**Current Usage:**
- Potentially used in page layouts (check would need to verify in page components)

**Dependencies:**
- lucide-react icons
- Next.js Image component

**Terminology/Branding:**
- FULLY ARGUED BRANDED
- Navy background with brown active states
- Gold text for DeLO rating (debate-specific metric)
- Uses white logo on dark background

**Vision Alignment:** ⚠️ MODIFY  
Good sidebar component with proper ARGUED branding. DeLO rating is debate-specific - for conversation platform, generalize to "Score" or "Rating" metric. Navigation items are debate-specific, need adjustment for conversation model.

---

### 10. StatCard Component
**File:** `/home/user/Philosophy-app/components/ui/StatCard.tsx`  
**Type:** UI/Display

**Purpose:**  
Display a statistic with label, value, optional icon, and trend indicator.

**Props Interface:**
```typescript
interface StatCardProps {
  label: string
  value: string | number
  icon?: LucideIcon
  variant?: 'default' | 'success' | 'error' | 'achievement'
  trend?: {
    value: number      // positive or negative
    label: string      // trend description
  }
}
```

**Renders:**
- White card with left border (4px) in variant color
- Icon on right with colored background
- Large bold value with label
- Optional trend indicator with arrow and color

**Current Usage:**
- Dashboard template statistics (Total Debates, Win Rate, Avg Score, Current Streak)
- Profile pages for stats display

**Dependencies:**
- lucide-react icons (optional)

**Terminology/Branding:**
- FULLY ARGUED BRANDED
- Uses all semantic color variants
- Clean layout suitable for any metrics

**Vision Alignment:** ✅ KEEP  
Generic, reusable statistics component. Completely ARGUED branded and suitable for any metrics display.

---

### 11. DebateCard Component
**File:** `/home/user/Philosophy-app/components/ui/DebateCard.tsx`  
**Type:** Feature/Debate-Specific

**Purpose:**  
Display debate preview with topic, description, participant counts, and status badge.

**Props Interface:**
```typescript
interface DebateCardProps {
  id: string
  topic: string
  description?: string
  forCount: number          // Arguments FOR count
  againstCount: number      // Arguments AGAINST count
  participants: number      // Total participants
  status: 'open' | 'in_progress' | 'completed'
  featured?: boolean        // Highlight styling
  onClick?: () => void
}
```

**Renders:**
- Card variant container with optional highlight styling
- Debate topic in navy bold font
- Status badge (Open/In Progress/Completed)
- Description with line clamping
- Position badges showing FOR/AGAINST counts
- Participant count
- "View Debate" button

**Current Usage:**
- Dashboard template (featured debate section)
- Debates list template (debates grid)

**Dependencies:**
- Card, Badge, Button components

**Terminology/Branding:**
- FULLY DEBATE-SPECIFIC terminology: "FOR", "AGAINST", "Open/In Progress/Completed"
- Position counters use debate-specific badge types
- Cannot be reused without removing debate references

**Vision Alignment:** ❌ REMOVE or ↔️ TRANSFORM  
This is a debate-specific component. For conversation platform, replace with generic "ThreadCard" or "ConversationCard" showing thread topic, participant count, latest activity, etc.

---

### 12. LeaderboardRow Component
**File:** `/home/user/Philosophy-app/components/ui/LeaderboardRow.tsx`  
**Type:** Feature/Gamification-Specific

**Purpose:**  
Display user ranking row with stats, DeLO rating, win rate, and rating change.

**Props Interface:**
```typescript
interface LeaderboardRowProps {
  rank: number
  username: string
  displayName?: string
  deloRating: number         // Debate-specific rating
  totalDebates: number       // Debate count
  debatesWon: number         // Win count
  winRate: number            // Win percentage
  change?: number            // Rating change indicator
  isCurrentUser?: boolean
}
```

**Renders:**
- Row container with blue background, left navy border
- Rank display (medal emojis for top 3, number for others)
- Username with optional "You" badge for current user
- DeLO rating badge in gold
- Win rate (hidden on mobile)
- Rating change indicator with arrow
- Hover effect changes background to cream

**Current Usage:**
- Leaderboard page (list of all rankings)

**Dependencies:**
- Badge component
- Emoji display for ranks

**Terminology/Branding:**
- FULLY DEBATE-SPECIFIC: "DeLO", "Debates", "Win Rate"
- Gamification-focused with ranking system
- Cannot be reused for conversation platform

**Vision Alignment:** ❌ REMOVE or 🔄 TRANSFORM  
This is completely tied to debate gamification system. For conversation platform, create generic "UserScoreRow" showing username, overall score, and ranking. Remove debate-specific terminology.

---

### 13. Toast Component
**File:** `/home/user/Philosophy-app/components/ui/Toast.tsx`  
**Type:** UI/Notification

**Purpose:**  
Temporary notification messages displayed at bottom-right. Supports success, error, and info types.

**Props Interface:**
```typescript
interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number          // Auto-hide duration in ms (default 5000)
  onClose?: () => void
}

interface ToastContainerProps {
  toasts: ToastProps[]       // Array of toast notifications
}
```

**Renders:**
- Fixed positioned notification (bottom-right, z-50)
- Colored background based on type (success=green, error=red, info=navy)
- Icon, message, and close button
- Auto-dismisses after duration
- Slide-up animation on mount

**Current Usage:**
- Not directly used in any components, but available for client-side notifications

**Dependencies:**
- lucide-react icons

**Terminology/Branding:**
- FULLY ARGUED BRANDED
- Uses success, error, info colors appropriately
- Generic notification system

**Vision Alignment:** ✅ KEEP  
Generic, reusable notification system. Completely ARGUED branded and suitable for any application.

---

## TEMPLATE COMPONENTS (/components/templates)

### 14. LandingPageTemplate
**File:** `/home/user/Philosophy-app/components/templates/LandingPageTemplate.tsx`  
**Type:** Page Template

**Purpose:**  
Homepage landing page for unauthenticated visitors. Shows value proposition, features, and CTA.

**Structure:**
1. Hero section with logo, heading, description, CTA buttons
2. Why ARGUED section with 3 features (Fair AI Judgment, Measurable Progress, Competitive Excellence)
3. How It Works section with 4-step process
4. Social proof section with stats
5. CTA section with signup and explore buttons
6. Footer with links and copyright

**Key Content (DEBATE-SPECIFIC):**
- "Chess.com for philosophy" comparison
- "DeLO rating" metric mentioned
- "AI-judged philosophical debates"
- Emphasizes winning, rating building, leaderboard
- Footer mentions "Schools of Thought", "Forums"

**Props Interface:**
```typescript
// No props - static template
```

**Current Usage:**
- Home page (/)

**Dependencies:**
- Button, Logo components
- Next.js Image, Link

**Terminology/Branding:**
- FULLY ARGUED BRANDED (cream background, navy text, brown accents)
- ALL DEBATE-SPECIFIC terminology throughout
- "ARGUED" branding explicitly mentioned
- DeLO rating system explained

**Vision Alignment:** 🔄 TRANSFORM  
Complete redesign needed for conversation platform. Remove:
- "Chess.com for philosophy" comparison
- "DeLO rating" references
- "Debates", "arguments", "debate-judging"
- "Competitive" language

Replace with conversation-focused messaging.

---

### 15. DashboardTemplate
**File:** `/home/user/Philosophy-app/components/templates/DashboardTemplate.tsx`  
**Type:** Page Template

**Purpose:**  
Post-login dashboard showing user statistics, featured debate, recent activity, and quick actions.

**Structure:**
1. Welcome header with user name, DeLO rating, rank
2. Stats grid: Total Debates, Win Rate, Avg Score, Current Streak
3. Main content (2 cols):
   - Featured debate card
   - Performance insights (Logic/Evidence/Rhetoric scores)
4. Sidebar (1 col):
   - Recent activity
   - Quick actions (buttons)
   - Achievements preview (locked/unlocked badges)

**Props Interface:**
```typescript
interface DashboardProps {
  user: {
    username: string
    deloRating: number
    rank: number
    totalUsers: number
  }
  stats: {
    totalDebates: number
    winRate: number
    avgScore: number
    currentStreak: number
  }
  recentActivity: Array<{
    id: string
    type: 'win' | 'loss' | 'achievement'
    title: string
    date: string
  }>
  featuredDebate: { /* ... */ }
}
```

**Current Usage:**
- Authenticated dashboard (probably /debates or dashboard page)

**Dependencies:**
- StatCard, DebateCard, Badge, Button components
- lucide-react icons

**Terminology/Branding:**
- FULLY DEBATE-SPECIFIC: "DeLO Rating", "Win Rate", "Total Debates", "Performance Insights" (Logic/Evidence/Rhetoric)
- Shows achievement system with trophy emojis
- Recent activity shows win/loss/achievement types
- All language refers to debate mechanics

**Vision Alignment:** 🔄 TRANSFORM  
Complete redesign needed for conversation platform. Reposition as "Your Conversations Dashboard":
- Show conversation counts, participation rate, etc.
- Show recent conversations instead of "recent activity"
- Replace "Performance Insights" (debate scoring) with engagement metrics
- Remove "Current Streak" (debate-specific)
- Replace "Featured Debate" with "Latest Conversations"

---

### 16. DebatesListTemplate
**File:** `/home/user/Philosophy-app/components/templates/DebatesListTemplate.tsx`  
**Type:** Page Template

**Purpose:**  
Browse and filter all debates with search, status filtering, and sorting.

**Structure:**
1. Header with title, total count, "Create Debate" button
2. Filters section:
   - Search input by topic
   - Sort dropdown (Recent, Popular, Featured)
   - Status filter buttons (All, Open, In Progress, Completed)
3. Debates grid (2 columns)
4. Pagination controls

**Props Interface:**
```typescript
interface DebatesListProps {
  debates: Debate[]
  totalDebates: number
  currentPage: number
  totalPages: number
}
```

**Current Usage:**
- Debates list page (/debates)

**Dependencies:**
- DebateCard, Button, Input, Badge components
- lucide-react icons

**Terminology/Branding:**
- FULLY DEBATE-SPECIFIC
- Search by "topic", filter by "status" (Open/In Progress/Completed)
- "Create Debate" button
- Empty state: "No Debates Found - Be the first to create a debate on this topic!"

**Vision Alignment:** 🔄 TRANSFORM  
Rebrand as "Conversations Browser":
- Replace "Create Debate" with "Start Conversation"
- Replace search "topic" with broader search (participants, keywords, etc.)
- Replace status filter with conversation state filter (Active, Archived, etc.)
- Replace DebateCard with generic ConversationCard
- Update empty state messaging

---

### 17. SingleDebateTemplate
**File:** `/home/user/Philosophy-app/components/templates/SingleDebateTemplate.tsx`  
**Type:** Page Template

**Purpose:**  
Detailed view of a single debate with arguments, AI judgment, and join/submit interface.

**Structure:**
1. Back button
2. Debate header card:
   - Topic and status badge
   - Description
   - FOR/AGAINST participant info boxes
3. Join debate section (if user can join)
4. Submit argument section (if user is participant)
5. Arguments section (all arguments from both sides)
6. AI Judgment section (if debate is completed):
   - Winner badge
   - Reasoning explanation
   - Scores grid (FOR and AGAINST scores on 3 dimensions)
   - Fact checks table

**Props Interface:**
```typescript
interface SingleDebateProps {
  debate: { /* ... */ }
  arguments: Argument[]
  judgment?: Judgment
  canJoinFor: boolean
  canJoinAgainst: boolean
  canSubmitArgument: boolean
  userPosition?: 'for' | 'against'
}
```

**Current Usage:**
- Single debate detail page (/debates/[id])

**Dependencies:**
- Badge, Button, Card, Textarea components
- lucide-react icons

**Terminology/Branding:**
- FULLY DEBATE-SPECIFIC
- "ARGUING FOR" / "ARGUING AGAINST" section headers
- AI Judgment with scores on Logic, Evidence, Rhetoric
- Fact checks with verdict (accurate/false/misleading)
- Participant status: "Waiting for philosopher..."

**Vision Alignment:** 🔄 TRANSFORM  
Rebrand as "Conversation Details":
- Replace "ARGUING FOR/AGAINST" with "Perspective A / Perspective B" or "Supporting / Questioning"
- Replace "JUDGE" and scoring system entirely
- Keep: argument display, participants, discussion flow
- Replace: AI judgment, scoring, fact-checking (all debate-specific)
- Update terminology throughout

---

## PAGE-LEVEL COMPONENTS (/app)

### 18. LoginForm Component
**File:** `/home/user/Philosophy-app/app/auth/login/LoginForm.tsx`  
**Type:** Page-Specific/Form

**Purpose:**  
Client-side login form using Server Actions for authentication.

**Props Interface:**
```typescript
// No props - uses form action
// Form action: signIn (server action from ../actions)
```

**Renders:**
- Gradient background (dark colors, not ARGUED)
- "PhiloDuel" branding in header
- Email and password inputs
- Submit button with loading state
- Sign up link at bottom

**Current Usage:**
- Auth login page (/auth/login)

**Dependencies:**
- Server action: signIn
- useFormState, useFormStatus hooks
- lucide-react (Not imported, may be unused)

**Terminology/Branding:**
- Uses "PhiloDuel" branding (old/alternate name)
- Dark gradient background (NOT ARGUED cream/navy colors)
- Accent-500 color for buttons (brown #8B6F47, incorrectly mapped in tailwind)

**Vision Alignment:** ⚠️ MODIFY  
Generic login form but needs branding update:
- Update to use ARGUED branding (cream background)
- Remove "PhiloDuel" references
- Update colors to match ARGUED theme
- Improve contrast for accessibility

---

### 19. DebateActions Component
**File:** `/home/user/Philosophy-app/app/(authenticated)/debates/[id]/DebateActions.tsx`  
**Type:** Page-Specific/Feature

**Purpose:**  
Handles user actions in debate: joining (FOR/AGAINST) or submitting arguments.

**Props Interface:**
```typescript
interface DebateActionsProps {
  debateId: string
  action: 'join' | 'submit'
  position: 'for' | 'against'
  userId: string
}
```

**Renders:**
- Conditional rendering based on action prop:
  - **'join':** Button to join debate for given position
  - **'submit':** Textarea for argument, submit button, tip text
- Error message display (red background)
- Loading states

**Current Usage:**
- Single debate page (/debates/[id])

**Dependencies:**
- Supabase client
- useRouter from Next.js

**Terminology/Branding:**
- FULLY DEBATE-SPECIFIC
- "Argue FOR/AGAINST" button text
- "Submit Argument" text
- "Gemini AI will judge the debate" hint

**Vision Alignment:** ❌ REMOVE or 🔄 TRANSFORM  
This is completely debate-specific logic for:
- Joining sides (FOR/AGAINST)
- Submitting to AI judgment

For conversation platform, would need to be completely rewritten for different interaction model.

---

### 20-22. Page Components (Minimal Analysis)

**Other page.tsx files:**
- `/app/page.tsx` - Home page (uses LandingPageTemplate)
- `/app/(authenticated)/debates/page.tsx` - Debates list page (uses DebatesListTemplate)
- `/app/(authenticated)/debates/[id]/page.tsx` - Single debate page (uses SingleDebateTemplate)
- `/app/(authenticated)/leaderboard/page.tsx` - Leaderboard page
- `/app/(authenticated)/profile/page.tsx` - Profile page
- `/app/(authenticated)/settings/page.tsx` - Settings page
- Various auth pages (signup, login, logout)

These are page-level implementations that use the above templates and components.

---

## COMPONENT USAGE MATRIX

| Component | Used In | Count |
|-----------|---------|-------|
| Button | Header, Sidebar, all Templates, Cards | 15+ |
| Card | Dashboard, Single Debate, Debates List | 8+ |
| Badge | Header, Dashboard, Debates, Leaderboard | 12+ |
| Input/Textarea | Debates List filters, Argument submission | 4+ |
| StatCard | Dashboard | 4 |
| DebateCard | Dashboard, Debates List | 2 |
| LeaderboardRow | Leaderboard page | 1 |
| Logo | Header, Sidebar, Landing Page | 3 |
| Header | Authenticated layout | 1 |
| Sidebar | UI library (status unclear) | 1 |
| Toast | Available but not used | 0 |

---

## EXPORT/IMPORT PATTERNS

**From /components/ui/index.ts:**
```typescript
export { Button, Card, Badge, DebateCard, LeaderboardRow, Header, Sidebar, Toast, ToastContainer, Input, Textarea, StatCard }
```

**Navigation Structure:**
- Root layout uses `Navigation` component (public pages)
- Authenticated layout uses `Header` component (private pages)
- Possible Sidebar integration unclear

---

## CRITICAL OBSERVATIONS

1. **DUPLICATE COMPONENTS:** 
   - Sidebar exists in both `/components/Sidebar.tsx` and `/components/ui/Sidebar.tsx` with different styling
   - Navigation and Header have overlapping functionality

2. **COLOR SCHEME INCONSISTENCY:**
   - Root level components (Navigation, Sidebar) use indigo/slate colors
   - UI library components use proper ARGUED branding (navy/brown/cream)
   - LoginForm uses dark gradient (not ARGUED colors)

3. **DEBATE-SPECIFIC COMPONENTS (NON-REUSABLE):**
   - DebateCard - Debate preview only
   - LeaderboardRow - Debate ranking system
   - LandingPageTemplate - Heavy debate messaging
   - DashboardTemplate - Debate statistics
   - DebatesListTemplate - Debate browsing
   - SingleDebateTemplate - Debate interaction with AI judging
   - DebateActions - Debate joining/arguing

4. **REUSABLE COMPONENTS (GENERIC):**
   - Button, Card, Input, Badge, Toast - Fully generic
   - StatCard - Generic statistics display
   - Header - Mostly generic (reputation score is debate-specific)
   - Logo - Fully generic

5. **MISSING COMPONENTS FOR CONVERSATION PLATFORM:**
   - Thread/Conversation card component
   - User profile card component
   - Message/comment component
   - Thread participant list component
   - Conversation filter/search component

---

## BRANDING & TERMINOLOGY AUDIT

**ARGUED Colors Used Appropriately:**
- Navy (#1A3A52) - Primary text, borders, buttons
- Brown (#8B6F47) - Secondary/accent, hover states
- Cream (#F5F3F0) - Background, high contrast
- Gold (#D4A574) - Premium/ratings
- Green (#4A7C59) - Success/positive (FOR position)
- Red (#C84C3C) - Error/negative (AGAINST position)

**Debate-Specific Terminology (Must Remove):**
- "DeLO" rating system
- "Debater", "arguing", "debate"
- "FOR" / "AGAINST" positions
- "Open", "In Progress", "Completed" debate states
- "Win rate", "victories"
- "AI Judgment", "scoring" (Logic/Evidence/Rhetoric)
- "Fact checks", "verdicts"

**Brand Name Issues:**
- Some components reference "PhiloDuel"
- Others reference "ARGUED"
- Need unified branding

