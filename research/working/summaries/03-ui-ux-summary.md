# UI/UX Design Summary

**Source:** ui-ux-design-final.md
**Date:** November 15, 2025

## Executive Summary

Complete design system for conversation-first philosophy platform. Design philosophy: "A well-appointed intellectual salon where thoughtful people gather to explore ideas together—not a debate arena." Warmer color evolution (teal + terracotta + cream), hybrid navigation, mobile-first approach, WCAG 2.1 AA accessibility minimum.

---

## Navigation Structure

### Desktop Navigation (≥1024px)

**Pattern:** Hybrid Left Sidebar + Top Bar

**Left Sidebar (280px wide)**
- Purpose: Topic browsing and navigation
- Collapsible sections (3-4 levels deep)
- Features:
  - Search topics
  - Recent conversations
  - Topic hierarchy (Ethics, Epistemology, Metaphysics, etc.)
  - Bookmarks
  - Collapse to 64px icon-only version
- Background: Warm white (#FAFAF9)
- Toggle: Can minimize for focused reading

**Top Bar (64px height)**
- Logo/Home (left)
- Global Search (center-right, expands on focus)
- Notifications (bell icon with badge)
- Profile Menu (avatar dropdown)
- Sticky positioning, visible at all times

**Breadcrumbs**
- Placement: Below top bar, above main content
- Desktop: Show full path (5 levels max)
- Format: Home > Ethics > Applied Ethics > Bioethics > AI Medical Ethics

### Mobile Navigation (<768px)

**Pattern:** Bottom Navigation + Hamburger Drawer

**Bottom Navigation (56px height)**
- 5 primary actions:
  1. Home (🏠) - Main feed
  2. Explore (🔍) - Browse topics
  3. New (➕) - Start conversation
  4. Notifications (🔔) - Alerts
  5. Profile (👤) - User menu
- Fixed bottom position
- 48x48px minimum touch targets

**Mobile Drawer**
- Trigger: Hamburger icon (☰) in top-left
- Slides from left: 85% screen width
- Contains:
  - Search topics
  - Recent conversations
  - Full topic hierarchy
  - My conversations
  - Settings
- Animation: 300ms ease-out
- Backdrop: Semi-transparent black

**Mobile Top Bar (56px)**
- Hamburger (left) - Opens drawer
- Logo (center-left)
- Search (right) - Opens full-screen overlay
- Profile (far right)

### Responsive Breakpoints

```css
Mobile: max-width 767px
Tablet: 768px - 1023px
Desktop: min-width 1024px
Large Desktop: min-width 1440px
```

---

## Visual Design System

### Color Palette Evolution

**Current Problems (ARGUED):**
- Navy/Brown/Cream: Too cold, formal, competitive (80% competitive)
- Gold: Trophy mentality
- Colors communicate hierarchy and exclusion

**New Direction (PARLEY):**

**Primary Colors**
- **Warm Teal #0F766E** (replaces Navy)
  - Intellectual yet approachable
  - Balance of depth and warmth
  - Modern, fresh, conversational

- **Terracotta #C4704F** (replaces Brown)
  - Warm, human, inviting
  - Earthy wisdom without stuffiness
  - Accessible sophistication

- **Cream #F5F3F0** (KEEP)
  - Calm, contemplative
  - Perfect neutral background

**Accent Colors**
- Coral (#FF6B6B) - Energy, curiosity
- Sage Green (#87A96B) - Growth, exploration
- Deep Purple (#6B4E71) - Wisdom, depth

**Semantic Colors (non-judgmental)**
- Info: Cool Blue
- Success: Muted Green (not "victory")
- Warning: Amber
- Attention: Soft Coral (not "error")

**Content Type Colors**
- Questions: Warm Purple (#8B5CF6)
- Explorations: Sage Green (#059669)
- Debates: Teal Primary (#0F766E)
- Reflections: Muted Amber (#D97706)

---

### Typography System

**Decision:** KEEP Inter + Lora (Excellent Choice)

**Why This Works:**
- Inter (UI): Modern, approachable, excellent readability
- Lora (content): Warm, intellectual, perfect for long-form
- Combination: 60% conversational, 40% formal (balanced)
- Typography pulls brand TOWARD conversation

**Font Loading:**
- Self-hosted variable fonts
- Preload critical fonts
- Font-display: swap

**Headings (Inter - UI contexts)**
```css
H1: 2.25rem (36px), weight 600, Semi-bold
H2: 1.875rem (30px), weight 600
H3: 1.5rem (24px), weight 600
H4: 1.25rem (20px), weight 500
```

**Body Text (Lora - content contexts)**
```css
Large body: 1.125rem (18px), line-height 1.6
  - For long-form arguments, primary content

Regular body: 1rem (16px), line-height 1.5
  - Standard content

Small body: 0.875rem (14px), line-height 1.5
  - Secondary content, captions (uses Inter)
```

**UI Elements (Inter)**
- Buttons, labels, navigation: 0.875rem (14px), weight 500
- Usernames: 1rem (16px), weight 600
- Timestamps: 0.875rem (14px), weight 400

**Responsive Typography:**
```css
Mobile (<768px):
  H1: 1.875rem (30px)
  H2: 1.5rem (24px)
  Body large: 1.125rem (18px) - maintain readability

Tablet (768-1023px):
  H1: 2rem (32px)
  Body large: 1.0625rem (17px)
```

**Contextual Typography:**
- Formal debate: Heavier weights (700)
- Casual question: Lighter weights (600), more Inter
- Exploration: Medium formality

---

### Component Library

**Buttons**

**Primary Button**
```css
Background: Teal #0F766E
Color: White
Padding: 12px 24px
Border-radius: 6px
Font: Inter, 1rem, weight 600
Hover: Darker teal, lift effect, shadow
```

**Secondary Button**
```css
Background: White
Color: Teal #0F766E
Border: 1.5px solid Teal
Hover: Light teal background
```

**Ghost Button**
```css
Background: Transparent
Color: Neutral-700
Hover: Light gray background
```

**Cards**

**Conversation Card**
```css
Background: White
Border: 1px solid neutral-200
Border-radius: 8px
Padding: 20px
Hover: Lift + shadow + teal border
```

**Components:**
- Avatar (40px circular)
- Username (Inter, 0.875rem, weight 600, teal)
- Timestamp (Inter, 0.75rem, neutral-500)
- Title (Inter, 1.125rem, weight 600)
- Excerpt (Lora, 0.9375rem, neutral-700)
- Footer stats (participants, messages, tags)

**Forms**

**Input Fields**
```css
Font: Inter, 1rem
Padding: 12px 16px
Border: 1.5px solid neutral-300
Border-radius: 6px
Focus: Teal border + teal shadow ring
```

**Text Area**
```css
Font: Lora (content font for writing)
Font-size: 1rem
Line-height: 1.6
Min-height: 120px
Resize: vertical
```

**Tags/Badges**

**Topic Tags**
```css
Font: Inter, 0.75rem, weight 500
Padding: 4px 10px
Border-radius: 12px
Background: Neutral-100
Hover: Teal background

Variants:
- Question: Purple background
- Exploration: Green background
- Debate: Teal background
```

**Notification Badge**
```css
Min-width: 20px
Height: 20px
Font: Inter, 0.75rem, weight 600
Border-radius: 10px
Background: Red (attention color)
Color: White
```

---

### Conversation Thread Design

**Threading Model:** Hybrid Discourse-Style

**Why:** Balances structure with usability. Pure nested (Reddit) becomes unreadable past 5-7 levels. Flat (HN) loses context. Hybrid preserves relationships without depth issues.

**Desktop Threading (5-level max)**

**Visual Structure:**
```
┌─ Original Post
│
├─ Reply 1 (Level 1)
│  ├─ Reply 1.1 (Level 2)
│  │  └─ Reply 1.1.1 (Level 3)
│  │     └─ Reply 1.1.1.1 (Level 4)
│  │        └─ Reply 1.1.1.1.1 (Level 5)
│  │           └─ [Continue thread →]
│  │              (Level 6+ opens focused view)
│  └─ Reply 1.2
└─ Reply 2
```

**Indentation:**
```css
Level 0: 0px
Level 1: 40px
Level 2: 80px
Level 3: 120px
Level 4: 160px
Level 5: 168px (minimal increase)
```

**Mobile Threading (3-4 level max)**

**Reduced Indentation:**
```css
Level 0: 0px
Level 1: 12px
Level 2: 24px
Level 3: 36px
Level 4: 40px (minimal increase)
Level 5+: Force "Continue thread" link
```

**Comment Component Structure:**

**Header:**
- Avatar (40px circular)
- Username (linked, teal color)
- Credentials (e.g., "PhD Philosophy, MIT")
- Timestamp (relative, e.g., "1 hour ago")
- Collapse button ([-] / [+])

**Content:**
- Body text (Lora, 1rem, line-height 1.6)
- Rich text formatting support

**Footer:**
- Reactions: 💡 Thoughtful, 🤯 Changed My Mind, 🤔 Question
- Actions: Reply, Quote, Bookmark

**Collapse Functionality:**
- Collapsed state shows: small avatar, username, preview text, reply count
- Click header or [-]/[+] button to toggle
- Nested replies also collapse

**Thread Controls:**
- Sort by: Newest, Oldest, Most Thoughtful
- Expand All / Collapse All buttons
- Reading progress indicator

---

### Spacing & Layout

**Spacing Scale (8px base grid)**
```css
space-1: 4px
space-2: 8px
space-3: 12px
space-4: 16px
space-5: 20px
space-6: 24px
space-8: 32px
space-10: 40px
space-12: 48px
space-16: 64px
space-20: 80px
space-24: 96px
```

**Container Widths**
```css
narrow: 640px (reading-optimized, 65-75 characters)
medium: 960px (balanced layout)
wide: 1200px (full-width content)
```

**Shadows & Depth**
```css
sm: 0 1px 2px rgba(0,0,0,0.05) - Cards
md: 0 4px 6px rgba(0,0,0,0.07) - Hover states
lg: 0 10px 15px rgba(0,0,0,0.1) - Dropdowns, modals
xl: 0 20px 25px rgba(0,0,0,0.15) - Large modals
```

**Border Radius**
```css
sm: 4px - Small elements
md: 6px - Buttons, inputs
lg: 8px - Cards
xl: 12px - Large containers
full: 9999px - Pills, avatars
```

---

## Mobile Considerations

### Mobile-First Approach

**Design Principle:** Design for smallest screen (320px) first, enhance for larger

**Why:** Target personas (Marcus, James, David) use both mobile and desktop. Mobile accounts for 60-70% of casual browsing.

**Minimum Supported:** iPhone SE (320px width)

### Touch Target Standards

**Standard:** 48x48px minimum for all primary interactive elements (Material Design, WCAG 2.2)

**Spacing:** 8px minimum between touch targets to prevent mis-taps

### Mobile-Specific Patterns

**Full-Screen Search (Mobile)**
- Trigger: Tap search icon
- Opens: Full-screen modal overlay
- Features:
  - Large input field (autofocus)
  - Recent searches
  - Live search results
  - Close button (48x48px)

**Bottom Sheet (Mobile Reply/Actions)**
- Pattern: Modal slides up from bottom
- Max height: 85vh
- Features:
  - Handle for dragging
  - Quoted comment context
  - Text area for reply
  - Cancel / Post buttons
  - Swipe down to dismiss

**Swipeable Breadcrumbs**
- Problem: Long breadcrumbs don't fit
- Solution: Horizontal scroll/swipe
- Fade indicator on right edge
- Smooth iOS scrolling

### Performance Optimization

**Lazy Loading:**
- Images: loading="lazy" attribute
- Placeholder images during load

**Virtualized Lists:**
- For long threads (100+ comments)
- Render only visible comments
- Use react-window or react-virtualized

**Code Splitting:**
- By route
- Lazy load pages

**Image Optimization:**
- Serve WebP with JPEG fallback
- Responsive images (srcset)
- Compress to 80% quality
- Max width 800px for mobile

**Offline Support:**
- Service Worker for caching
- Cache navigation and core UI
- Cache read threads
- Offline indicator

---

## Accessibility Requirements

### WCAG Compliance Targets

**Minimum:** WCAG 2.1 Level AA
**Target:** WCAG 2.1 Level AAA for body text
**Future:** WCAG 2.2 Level AA (stricter touch targets)

### Color Contrast Standards

**Text Contrast:**
```
Normal text (<18px):
  AA: 4.5:1 minimum
  AAA: 7:1 minimum

Large text (≥18px):
  AA: 3:1 minimum
  AAA: 4.5:1 minimum

UI Components (borders, icons):
  AA: 3:1 minimum
```

**Our Implementation:**
```css
Primary text on cream: 8.2:1 ✓ AAA
Teal primary on cream: 7.8:1 ✓ AAA
Secondary text: 4.8:1 ✓ AA
Link text: 5.2:1 ✓ AA
```

### Keyboard Navigation

**Full Keyboard Support Required**

**Tab Order:**
1. Skip to main content link
2. Logo/home
3. Global search
4. Notifications
5. Profile menu
6. Sidebar navigation
7. Main content area
8. Footer

**Focus Indicators:**
```css
*:focus-visible {
  outline: 2px solid teal
  outline-offset: 2px
  border-radius: 2px
}
```

**Skip Links:**
- "Skip to main content" as first focusable element
- Visible only on focus
- Immediately moves focus to main content

**Keyboard Shortcuts:**
- `/` - Focus search bar
- `Esc` - Close drawer/modal/dropdown
- `Enter/Space` - Activate links/buttons, toggle sections
- `Arrow keys` - Navigate within sidebar/menus
- `U` - Go up to parent in hierarchy
- `[` / `]` - Previous/next sibling
- `J` / `K` - Next/previous comment (vim-style)
- `R` - Reply to current comment
- `E` / `C` - Expand/Collapse all threads

### Screen Reader Optimization

**Semantic HTML:**
```html
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<aside role="complementary" aria-label="Topic navigation">
<main role="main" tabindex="-1">
<article aria-labelledby="discussion-title">
<footer role="contentinfo">
```

**ARIA Labels:**
- Expandable sections: aria-expanded, aria-controls
- Notification badges: aria-label="Notifications, 3 unread"
- Collapse buttons: aria-label="Collapse comment by Sarah Chen"
- Search forms: role="search", aria-describedby

**Screen-Reader-Only Text:**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
```

### Text Scaling & Zoom

**Support 200% zoom without breaking layout:**
- Use relative units (rem, em)
- Max-widths prevent wide text
- Test at 200% zoom:
  - Text remains readable
  - No horizontal scrolling
  - Buttons/links remain usable
  - No content overlap

### Reduced Motion

**Respect user preference:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Dyslexia Support

**User Toggle:**
- Switch to all sans-serif (Inter)
- Slightly larger font (1.125rem)
- More line spacing (1.7)
- Increased letter-spacing (0.02em)
- Avoid italic, use bold instead

### Color Blindness

**Don't rely on color alone:**
- Success: Green + checkmark icon + text
- Warning: Amber + warning icon + text
- Error: Red + alert icon + text
- Info: Blue + info icon + text

**Test with simulators:**
- Deuteranopia (red-green, most common)
- Protanopia (red-green)
- Tritanopia (blue-yellow)

---

## Key Pages UI Specifications

### Landing Page (Unauthenticated)

**Hero Section:**
- Title: "Think Deeply Together"
- Subtitle: "From casual questions to deep debates—a welcoming community for serious philosophical inquiry"
- CTAs: "Join the Conversation" (primary) + "Explore Topics" (secondary)
- Background: Gradient (cream to light teal)
- Illustration: Diverse people in conversation

**Feature Sections:**
4 feature cards:
1. 💭 Ask Questions Freely
2. 🤝 Explore Ideas Together
3. 🎓 Learn from Experts
4. 🌍 Dive Deep or Stay Casual

**Topic Preview:**
- Grid of popular topics (Ethics, Philosophy of Mind, Epistemology, Political Philosophy)
- Show conversation counts
- Trending tags
- "Browse All Topics" CTA

### Sign Up / Login Pages

**Layout:**
- Centered card (max-width 480px)
- Gradient background
- Large logo
- Title: "Join PARLEY"
- Subtitle: "Where curious minds explore ideas together"

**Form Fields:**
- Email (required, autocomplete)
- Username (required, with help text)
- Password (required, min 8 chars, with help text)
- Terms acceptance checkbox
- Submit button: "Create Account"
- Divider: "or"
- Social auth: "Continue with Google"
- Footer: "Already have an account? Log in"

### Discussion Thread Page

**Layout:**
- Sidebar (desktop only)
- Main content area (max-width 800px, centered)
- Breadcrumbs
- Original post card
- Thread controls
- Threaded replies

**Original Post:**
- Large avatar (64px)
- Username (linked, prominent)
- Credentials
- Timestamp
- Post title (H1, large, prominent)
- Topic tags
- Body content (Lora, 1.125rem, generous line-height)
- Footer stats: replies, views, reading time
- Reactions: 💡 Thoughtful, 🤯 Mind-Changing, 🤔 Good Question

### Topic Browse Page

**Header:**
- Breadcrumbs
- Topic title (H1)
- Description paragraph
- Stats: conversation count, active this week

**Subtopics Grid:**
- Cards for each subtopic
- Title, conversation count, description
- Trending indicator (🔥 X new this week)

**Recent Conversations:**
- Sort/filter controls
- Conversation cards list
- Pagination

### User Profile Page

**Header:**
- Large avatar (profile photo)
- Name, username (@handle)
- Credentials/bio
- Stats: Conversations, Replies, Thoughtful Reactions
- Actions: Follow, Message

**Tabs:**
- Conversations
- Replies
- Bookmarks
- Topics Following

**Activity:**
- Content based on active tab
- Conversation cards

---

## Implementation Roadmap

### MVP Phase (Weeks 1-8)

**Must Have:**

**Week 1-2: Core Navigation**
- Desktop: Top bar + left sidebar
- Mobile: Top bar + drawer + bottom nav
- Breadcrumbs
- Basic keyboard navigation

**Week 2-3: Visual Design System**
- Color palette (teal + terracotta + cream)
- Typography (Inter + Lora, self-hosted)
- Core components (buttons, cards, inputs, tags)
- Spacing/layout system

**Week 3-5: Thread Display**
- Hybrid threading (5-level max desktop)
- Collapse/expand functionality
- Mobile responsive (3-4 level max)
- Basic keyboard navigation

**Week 5-7: Key Pages**
- Landing page
- Sign up / Login
- Discussion thread view
- Topic browse page

**Week 7-8: Accessibility Baseline**
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- Color contrast verification

**Success Criteria:**
- All pages work on mobile and desktop
- WCAG AA compliant
- Aligned with PARLEY brand
- Users can navigate, read threads, post replies

### Enhancement Phase (Weeks 9-16)

**Week 9-10: Advanced Navigation**
- Personalization (follow topics/tags)
- Advanced filtering
- Search autocomplete
- Keyboard shortcuts

**Week 11-12: Thread Enhancements**
- Thread timeline/slider
- Jump to unread
- Context preview on hover
- Reading progress indicator

**Week 13-14: Mobile Polish**
- Swipe gestures
- Bottom sheet modals
- Offline caching
- Performance optimization

**Week 15-16: Accessibility AAA**
- AAA body text contrast
- Dyslexia mode
- Enhanced keyboard shortcuts
- Reduced motion preferences

### Future Enhancements (Weeks 17+)

**AI Features:**
- Thread summarization
- Auto-categorization
- Recommended conversations

**Advanced Threading:**
- Argument mapping view
- Visual tree diagram
- AI-assisted navigation

**Personalization:**
- Custom themes
- Font choices
- Layout preferences

**Community Features:**
- User collections
- Reading lists
- Collaborative annotations

---

## Design Tokens Reference

```css
/* Colors */
--color-primary-700: #0F766E;          /* Teal */
--color-secondary-700: #C2410C;        /* Terracotta */
--color-background-primary: #F5F3F0;   /* Cream */
--color-neutral-950: #0A0A0A;          /* Text */

/* Typography */
--font-ui: 'Inter', sans-serif;
--font-content: 'Lora', serif;
--text-base: 1rem;                     /* 16px */
--text-large: 1.125rem;                /* 18px */

/* Spacing (8px grid) */
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;

/* Borders */
--radius-md: 6px;
--radius-lg: 8px;

/* Shadows */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

/* Breakpoints */
--breakpoint-mobile: 768px;
--breakpoint-desktop: 1024px;
```

---

## Key Design Decisions Summary

1. **Navigation:** Hybrid sidebar (desktop) + drawer + bottom nav (mobile)
2. **Colors:** Warmer evolution - teal primary, terracotta secondary, cream background
3. **Typography:** Keep Inter + Lora (excellent for conversation-first)
4. **Threading:** Hybrid Discourse-style, 5 levels desktop, 3-4 mobile
5. **Mobile:** Mobile-first, 320px minimum, 48px touch targets
6. **Accessibility:** WCAG 2.1 AA minimum, AAA for body text
7. **Brand:** Align with PARLEY rebrand - warm, approachable, collaborative

**Design Vision:** Create a platform that feels like "a well-appointed intellectual salon where thoughtful people gather to explore ideas together—not a debate arena."
