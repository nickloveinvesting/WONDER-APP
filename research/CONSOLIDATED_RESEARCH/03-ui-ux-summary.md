# UI/UX Design Summary
**Source:** ui-ux-design-final.md
**Date:** November 17, 2025

## Executive Summary

Complete UI/UX direction for philosophy conversation platform transitioning from competitive debate to conversation-first positioning. Design philosophy: **A well-appointed intellectual salon where thoughtful people gather to explore ideas together**—not a debate arena. Mobile-first responsive design with WCAG 2.1 AA accessibility minimum.

---

## 1. Navigation Structure

### Desktop Navigation (≥1024px)

**Hybrid Left Sidebar + Top Bar Pattern**

**Left Sidebar (280px wide)**
- **Purpose**: Topic browsing and navigation through philosophical domains
- **Structure**: Collapsible sections with 3-4 levels of nesting (Domain > Sub-discipline > Topic)
- **Features**:
  - Search Topics at top
  - Recent conversations quick access
  - Progressive disclosure (start with domains collapsed except recently visited)
  - Visual indentation: 12px per level, max 4 levels visible
  - Toggle collapse: 280px expanded → 64px icon-only → 0px hidden
  - Persistent state: Remember user's expanded/collapsed preferences
- **Topics Hierarchy**:
  - Ethics → Applied Ethics, Ethical Theories, Meta-Ethics
  - Epistemology, Metaphysics, Logic & Reasoning
  - Philosophy of Mind, Political Philosophy
- **Technical Specs**:
  - Background: Warm white (#FAFAF9)
  - Sticky positioning with internal scroll
  - 200ms ease transition
  - Z-index: 100

**Top Bar (64px height)**
- **Purpose**: Global actions and persistent navigation
- **Components**:
  - Logo/Home (left)
  - Global Search (center-right): 300px → 450px on focus
  - Notifications (right): Bell icon with badge count
  - Profile Menu (far right): Avatar with dropdown
- **Technical Specs**:
  - Sticky positioning: top: 0
  - Z-index: 200
  - Background: White with subtle shadow
  - Touch targets: 48x48px minimum

**Breadcrumb Navigation**
- **Pattern**: Home > Ethics > Applied Ethics > Bioethics > AI Medical Ethics
- **Placement**: Below top bar, above main content
- **Responsive**:
  - Desktop: Show full path (5 levels max)
  - Tablet: Show last 3 levels with "..." for truncated
  - Mobile: Show last 2 levels, swipeable to see full
- **Font**: Inter 14px, Gray-600 for links, Gray-900 for current

---

### Mobile Navigation (<768px)

**Bottom Navigation (56px height)**
- **5 Primary Actions**:
  1. 🏠 Home (main feed/dashboard)
  2. 🔍 Explore (browse topics/search)
  3. ➕ New (start new conversation)
  4. 🔔 Notifications (activity alerts)
  5. 👤 Profile (user menu)
- **Technical Specs**:
  - Fixed bottom positioning
  - Z-index: 150
  - Active state: Teal color + bold icon
  - Full width divided by 5 items

**Mobile Drawer (Hamburger Menu)**
- **Purpose**: Access full topic hierarchy on mobile
- **Trigger**: Hamburger icon (☰) in top-left
- **Structure**: Same content as desktop sidebar but slide-from-left
- **Behavior**:
  - Slide from left: 0 → 85% screen width (max 320px)
  - Animation: 300ms ease-out
  - Backdrop: Semi-transparent black
  - Body scroll lock when open
  - Close: Tap X, tap backdrop, swipe left, or tap link
- **Touch gestures**: Swipe right from edge to open, swipe left to close

**Mobile Top Bar (56px height)**
- **Components**:
  - Hamburger (left): Opens drawer
  - Logo (center-left): Brand identity
  - Search (right): Opens full-screen search overlay
  - Profile (far right): User menu

---

### Responsive Breakpoints

```css
/* Mobile: max-width: 767px */
Bottom nav + drawer, single column, full-screen search, last 2 breadcrumb levels

/* Tablet: 768px - 1023px */
Top nav + drawer (no sidebar), no bottom nav, 2-column grids, last 3 breadcrumb levels

/* Desktop: ≥1024px */
Top nav + left sidebar, no drawer/bottom nav, multi-column layouts, full breadcrumbs (5 max)

/* Large Desktop: ≥1440px */
Max content width 1200px, extra margins, wider sidebar (300px)
```

---

## 2. Visual Design System

### Color Palette Evolution

**From ARGUED (Competitive) → PARLEY (Conversational)**

**Old (ARGUED):**
- Navy #1A3A52: Too cold, formal, exclusive ❌
- Brown #8B6F47: Achievement hierarchy, dated ❌
- Gold #D4A574: Trophy mentality ❌

**New (PARLEY):**

**Primary Colors:**
- **Warm Teal** (replaces Navy):
  - Primary-900: #134E4A (darkest, for text)
  - Primary-700: #0F766E (primary brand color)
  - Primary-500: #14B8A6 (interactive states)
  - Primary-300: #5EEAD4 (light accents)
  - Primary-100: #CCFBF1 (backgrounds)

- **Terracotta** (replaces Brown):
  - Secondary-700: #C2410C (secondary brand)
  - Secondary-500: #EA580C (hover states)
  - Secondary-300: #FDBA74 (light accents)
  - Secondary-100: #FFEDD5 (backgrounds)

- **Cream** (KEEP from ARGUED) ✓:
  - Background-primary: #F5F3F0 (main background)
  - Background-secondary: #FAFAF9 (sidebar, cards)
  - Background-elevated: #FFFFFF (modals, overlays)

**Semantic Colors (Non-judgmental):**
- **Info**: Cool Blue (#0EA5E9)
- **Success**: Muted Green #22C55E (not "victory")
- **Warning**: Amber (#EAB308)
- **Attention**: Soft Coral #EF4444 (not "error")

**Content Type Colors (Diversity of Perspectives):**
- Questions: Warm Purple #8B5CF6
- Explorations: Sage Green #059669
- Debates: Teal Primary #0F766E
- Reflections: Muted Amber #D97706

---

### Typography System

**Keep Inter + Lora (Agent 1 Recommendation: Excellent Choice) ✓**

**Why This Works:**
- Inter (UI): Modern, approachable, excellent readability
- Lora (content): Warm, intellectual, perfect for long-form reading
- Combination: 60% conversational, 40% formal (balanced)
- Typography pulls brand TOWARD conversation (unlike old cold colors)

**Font Loading:**
- Self-hosted variable fonts (.woff2)
- Font-display: swap
- Preload critical fonts

**Typography Scale:**

**Headings (Inter, UI contexts):**
```
H1: 2.25rem (36px), weight 600, letter-spacing -0.02em, color primary-900
H2: 1.875rem (30px), weight 600, letter-spacing -0.01em, color neutral-900
H3: 1.5rem (24px), weight 600, color neutral-900
H4: 1.25rem (20px), weight 500, color neutral-700
```

**Body Text (Lora, content contexts):**
```
Large: 1.125rem (18px), weight 400, line-height 1.6, color neutral-950
Regular: 1rem (16px), weight 400, line-height 1.5, color neutral-900
Small: 0.875rem (14px) Inter, weight 400, line-height 1.5, color neutral-700
```

**UI Elements (Inter):**
```
Buttons/Labels: 0.875rem (14px), weight 500, letter-spacing 0.01em
Usernames: 1rem (16px), weight 600, color primary-700
Timestamps: 0.875rem (14px), weight 400, color neutral-500
```

**Responsive Typography:**
- Mobile (<768px): H1 30px, H2 24px, body-large 18px (maintain readability)
- Tablet (768-1023px): H1 32px, body-large 17px
- Desktop (≥1024px): Base sizes as above

**Contextual Typography (Support Content Spectrum):**
- **Formal Debate**: Inter 2.25rem weight 700, Lora 1.125rem content
- **Casual Question**: Inter 1.75rem weight 600 (lighter), Inter 1rem content (sans for casual)
- **Exploration**: Inter 2rem weight 600, Lora 1.0625rem content (medium formality)

---

### Component Library

**Buttons:**

1. **Primary Button** (Main CTAs)
   - Background: Teal #0F766E
   - Color: White
   - Font: Inter 1rem, weight 600
   - Padding: 12px 24px
   - Border-radius: 6px
   - Hover: Darker teal + translateY(-1px) + shadow

2. **Secondary Button** (Alternative actions)
   - Background: White
   - Border: 1.5px solid Teal
   - Hover: Teal background-100 + darker border

3. **Ghost Button** (Tertiary actions)
   - Background: Transparent
   - Color: Neutral-700
   - Hover: Neutral-100 background

**Cards:**

**Conversation Card**
- Background: White
- Border: 1px solid neutral-200
- Border-radius: 8px
- Padding: 20px
- Hover: Primary-300 border + shadow + translateY(-2px)
- Components:
  - Avatar (40px circle, 12px margin-right)
  - Username (Inter 0.875rem, weight 600, teal)
  - Timestamp (Inter 0.75rem, neutral-500)
  - Title (Inter 1.125rem, weight 600, neutral-900)
  - Excerpt (Lora 0.9375rem, neutral-700, line-height 1.5)
  - Footer (participant/reply counts)

**Forms:**

1. **Input Fields**
   - Font: Inter 1rem
   - Padding: 12px 16px
   - Border: 1.5px solid neutral-300
   - Border-radius: 6px
   - Focus: Primary-500 border + 3px primary-100 shadow
   - Error state: Attention-500 border + attention-100 shadow

2. **Text Area** (for responses)
   - Font: Lora serif (content font for writing)
   - Line-height: 1.6
   - Padding: 16px
   - Min-height: 120px
   - Resize: vertical

**Tags/Badges:**

1. **Topic Tags**
   - Font: Inter 0.75rem, weight 500
   - Padding: 4px 10px
   - Border-radius: 12px
   - Background: Neutral-100
   - Hover: Primary-100 background + primary-700 color
   - Variations: question (purple), exploration (sage), debate (teal), reflection (amber)

2. **Notification Badge**
   - Min-width: 20px, height 20px
   - Font: Inter 0.75rem, weight 600
   - Background: Attention-500 (red)
   - Color: White

---

### Spacing & Layout

**Spacing Scale (8px base grid):**
```
space-1: 4px    space-6: 24px
space-2: 8px    space-8: 32px
space-3: 12px   space-10: 40px
space-4: 16px   space-12: 48px
space-5: 20px   space-16-24: 64-96px
```

**Container Widths:**
- Narrow: 640px (reading-optimized, 65-75 characters)
- Medium: 960px (balanced layout)
- Wide: 1200px (full-width content, 24px padding)

**Shadows & Depth (Elevation System):**
```
shadow-sm: Subtle cards (0 1px 2px rgba(0,0,0,0.05))
shadow-md: Hover states (0 4px 6px rgba(0,0,0,0.07))
shadow-lg: Dropdowns, modals (0 10px 15px rgba(0,0,0,0.1))
shadow-xl: Large modals (0 20px 25px rgba(0,0,0,0.15))
```

**Border Radius:**
```
radius-sm: 4px (small elements)
radius-md: 6px (buttons, inputs)
radius-lg: 8px (cards)
radius-xl: 12px (large containers)
radius-full: 9999px (pills, avatars)
```

---

## 3. Conversation Thread Design

### Threading Model: Hybrid Discourse-Style

**Design Decision:** Hybrid threading (Discourse-inspired with Reddit's collapse features)

**Why:** Balances conversation structure with usability. Pure nested (Reddit) becomes unreadable past 5-7 levels. Flat (HN) loses context. Hybrid preserves relationships without depth issues.

### Desktop Threading (5-level max)

**Visual Indentation:**
```
Level 0: 0px margin-left
Level 1: 40px
Level 2: 80px
Level 3: 120px
Level 4: 160px
Level 5: 168px (minimal increase)
Level 6+: "Continue this thread →" link (opens focused view)
```

**Connection Lines:**
- 2px wide vertical lines along left edge
- Color: Neutral-200 default, Primary-300 on hover
- Shows parent-child relationships

### Mobile Threading (3-4 level max)

**Reduced Indentation:**
```
Level 0: 0px
Level 1: 12px (minimal)
Level 2: 24px
Level 3: 36px
Level 4: 40px (minimal increase)
Level 5+: Force "Continue thread" earlier
```

**Why Reduced:** Narrow screens make deep nesting impractical. Earlier cutoff to focused view.

### Comment/Reply Component Structure

**Header:**
- Avatar (40px circle, 2px primary-100 border)
- Username (Inter 0.9375rem, weight 600, teal, linked to profile)
- Credentials (Inter 0.75rem, neutral-500, e.g., "PhD Philosophy, MIT")
- Timestamp (Inter 0.75rem, neutral-400, e.g., "1 hour ago")
- Collapse button (32x32px, [−] to collapse, [+] to expand)

**Content:**
- Font: Lora serif 1rem, line-height 1.6
- Color: Neutral-900
- Supports markdown formatting

**Footer:**
- **Reactions** (left):
  - 💡 Thoughtful
  - 🤯 Changed My Mind
  - ❤️ Insightful
  - 💭 Interesting
  - 🤔 Question
  - Display count next to each
  - Border-radius: 16px, hover effect
- **Actions** (right):
  - Reply, Quote, Bookmark buttons
  - Ghost button style

**Collapsed State:**
- Single line: Avatar-small (24px) + Username + Preview (first 50 chars) + Reply count (e.g., "8 replies")
- Background: Neutral-50
- Padding reduced: 8px vs 16px
- Tap header to expand

### Thread Controls (Above Comments)

**Components:**
1. **Sort Dropdown**: Newest First, Oldest First, Most Thoughtful
2. **Actions**: Expand All, Collapse All buttons
3. **Reading Progress**: Visual progress bar showing % read (optional)

---

## 4. Mobile Responsiveness Strategy

### Mobile-First Approach

**Principle:** Design for smallest screen (320px iPhone SE) first, enhance for larger screens

**Why:** Marcus Chen, James Rodriguez, David Park (top personas) use both mobile and desktop. Mobile accounts for 60-70% of casual browsing.

### Mobile Breakpoints

```
320px: Minimum (iPhone SE) - base mobile styles
375px: Standard mobile (iPhone 12/13/14)
414px: Large mobile (iPhone Pro Max)
768px: Tablet portrait (iPad)
1024px: Desktop (laptop)
1440px: Large desktop
```

### Touch Target Standards

**Our Standard:** 48x48px minimum for all primary interactive elements (Material Design best practice)

**Spacing:** 8px minimum between interactive elements to prevent mis-taps

### Mobile-Specific Patterns

**1. Full-Screen Search (Mobile)**
- **Trigger**: Tap search icon in mobile top bar
- **Behavior**: Opens full-screen modal overlay with:
  - Large input (1.125rem font, autofocus)
  - Recent searches list
  - Live search results
  - Close button (48x48px)
- Z-index: 400

**2. Bottom Sheet (Reply/Actions)**
- **Pattern**: Modal slides up from bottom for replies, detailed actions
- **Behavior**:
  - Swipeable handle at top
  - Can be dragged down to dismiss
  - Backdrop dims background
  - Keyboard automatically appears for text input

**3. Horizontal Scrolling (Topic Tags)**
- Tags displayed in horizontal scrollable row (no wrapping)
- Snap to scroll points
- Fade indicators at edges

**4. Pull-to-Refresh**
- Standard mobile pattern for refreshing feed
- Visual indicator during pull

### Performance Optimization for Mobile

**Priorities:**
1. **Lazy loading**: Images and comments below fold
2. **Code splitting**: Load only necessary JS for current page
3. **Image optimization**: WebP with fallbacks, responsive images
4. **Font subsetting**: Load only characters needed
5. **Minification**: CSS/JS compression
6. **Caching**: Service worker for offline capability (progressive enhancement)

---

## 5. Accessibility Requirements

### WCAG Compliance Targets

- **Minimum**: WCAG 2.1 Level AA
- **Goal**: WCAG 2.1 Level AAA for body text (easier achievement)

### Color Contrast Standards

**Text Contrast (against backgrounds):**
- **AAA (7:1)**: Primary body text (Lora content)
  - Neutral-950 on Cream #F5F3F0: 8.2:1 ✓ AAA
- **AA (4.5:1)**: Secondary text, UI elements
  - Primary-700 Teal on Cream: 7.5:1 ✓ AA+
  - Neutral-700 on white: 4.6:1 ✓ AA
- **AA (3:1)**: Large text (18px+), graphical objects
  - All interactive elements meet 3:1 minimum

**Testing Tools:**
- WebAIM Contrast Checker
- axe DevTools browser extension
- Pa11y automated testing

### Keyboard Navigation

**Essential Shortcuts:**
```
/        Focus search bar
Esc      Close drawer/modal/dropdown
Tab      Navigate between elements (clear 2px teal outline on focus)
Enter    Activate links/buttons, toggle expandable sections
Space    Activate buttons (not links)
U        Go up to parent in hierarchy
[ ]      Previous/next sibling
J K      Next/previous comment (vim-style)
R        Reply to current comment
Q        Quote current comment
E        Expand all threads
C        Collapse all threads
```

**Focus Management:**
- **Tab order**: Logo → Search → Notifications → Profile → Sidebar first item → Main content
- **Skip links**: "Skip to main content" visible on focus
- **Focus trap**: When drawer/modal open, trap focus within
- **No keyboard traps**: Always escapable with Esc
- **Clear focus indicators**: 2px outline, teal color (#0F766E), visible on all interactive elements

### Screen Reader Support

**ARIA Labels:**
```html
<nav role="navigation" aria-label="Main navigation">
<aside role="complementary" aria-label="Topic navigation">
<button aria-expanded="true" aria-controls="ethics-submenu">Ethics</button>
<nav aria-label="Breadcrumb">
<button aria-label="Notifications, 3 unread">
<div role="tree" aria-label="Philosophical discussion thread">
<div role="treeitem" aria-expanded="true" aria-level="1" aria-setsize="142">
```

**Semantic HTML:**
- Proper heading hierarchy (h1 → h2 → h3)
- Native elements when possible (button, nav, aside, article)
- Form labels associated with inputs
- Alt text for all images
- Meaningful link text (not "click here")

### Text Scaling & Zoom

**Support:**
- 200% zoom without horizontal scrolling (WCAG AA)
- All text uses relative units (rem, em, not px)
- Touch targets remain 48x48px at all zoom levels
- Test at 100%, 125%, 150%, 200% zoom

### Reduced Motion

**Respect User Preference:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Alternatives:**
- Fade in/out instead of sliding
- Instant state changes if needed
- No parallax or auto-playing animations

### Dyslexia Support

**Font Choice:** Inter and Lora both have good dyslexia support (clear letterforms, distinct characters)

**Additional Support:**
- Generous line-height (1.5-1.6)
- Adequate letter-spacing (0-0.01em for body text)
- Left-aligned text (not justified)
- Sufficient contrast
- Optional: User setting for OpenDyslexic font

### Color Blindness Support

**Not Relying on Color Alone:**
- Status indicators use icons + color
- Links underlined in body text (not just colored)
- Form errors use icons + red border + text message
- Chart data has patterns + colors
- Tags have text labels, not just colors

**Tested Simulations:**
- Deuteranopia (red-green, most common)
- Protanopia (red-green)
- Tritanopia (blue-yellow)
- Achromatopsia (complete)

---

## 6. Implementation Priorities

### MVP Phase (Weeks 1-8)

**Must Implement:**
1. ✅ Color system (CSS variables)
2. ✅ Typography scale (Inter + Lora loaded and applied)
3. ✅ Spacing system (8px grid)
4. ✅ Primary components (buttons, cards, inputs, tags)
5. ✅ Desktop navigation (sidebar + top bar)
6. ✅ Mobile navigation (bottom nav + drawer)
7. ✅ Basic thread display (5-level desktop, 3-level mobile)
8. ✅ Responsive breakpoints (320px minimum)
9. ✅ Keyboard navigation basics (Tab, Esc, /)
10. ✅ Color contrast compliance (AA minimum)

**Effort:** 3-4 weeks with frontend developer

### Enhancement Phase (Weeks 9-16)

**Add:**
1. Advanced threading (collapse/expand, thread controls)
2. Mobile-specific patterns (full-screen search, bottom sheet)
3. Reaction system (thoughtful, insightful badges)
4. Reading progress tracking
5. Advanced keyboard shortcuts (J/K navigation)
6. Full ARIA labels and screen reader optimization
7. Performance optimizations (lazy loading, code splitting)

**Effort:** 2-3 weeks

### Future Enhancements (Weeks 17+)

**Nice-to-Have:**
1. Offline support (service worker)
2. Dark mode toggle
3. Advanced customization (font size, theme preferences)
4. Argument mapping visualization
5. Rich text editor (beyond markdown)
6. Live collaboration indicators ("X is typing...")

---

## 7. Design System Summary

### Key Decisions

1. **Navigation**: Hybrid left sidebar + top bar (desktop), bottom nav + drawer (mobile) ✓
2. **Colors**: Warm teal + terracotta + cream (conversation-first evolution) ✓
3. **Typography**: Keep Inter + Lora (excellent choice) ✓
4. **Threading**: Hybrid Discourse-style, 5-level max desktop, 3-level mobile ✓
5. **Mobile**: Mobile-first responsive, 320px minimum, 48x48px touch targets ✓
6. **Accessibility**: WCAG 2.1 AA minimum, AAA for body text, full keyboard support ✓

### Design Tokens Reference

**Quick Reference for Developers:**

```css
/* Colors */
--color-primary: #0F766E (teal)
--color-secondary: #C2410C (terracotta)
--color-background: #F5F3F0 (cream)

/* Typography */
--font-ui: 'Inter', sans-serif
--font-content: 'Lora', serif

/* Spacing */
--space-unit: 8px (base grid)

/* Breakpoints */
--mobile: 320px
--tablet: 768px
--desktop: 1024px
```

### Component Checklist (MVP)

**Atoms:**
- [ ] Button (primary, secondary, ghost)
- [ ] Input (text, textarea, search)
- [ ] Tag/Badge
- [ ] Avatar
- [ ] Icon set
- [ ] Link (with hover states)

**Molecules:**
- [ ] Conversation card
- [ ] Comment/reply component
- [ ] Search bar (desktop + mobile overlay)
- [ ] Dropdown menu
- [ ] Breadcrumb
- [ ] Notification badge

**Organisms:**
- [ ] Left sidebar (desktop)
- [ ] Top navigation bar
- [ ] Bottom navigation (mobile)
- [ ] Mobile drawer
- [ ] Thread view (with nesting)
- [ ] Profile header

**Templates:**
- [ ] Landing page
- [ ] Discussion thread page
- [ ] Topic browse page
- [ ] User profile page
- [ ] Sign up / login pages

---

## Final Notes

**Vision Alignment:** All design decisions support conversation-first positioning. Warmer colors, approachable typography, collaborative language throughout UI, non-competitive reaction system.

**Brand Support:** Design system fully supports PARLEY rebrand with warm, inviting, intellectual aesthetic.

**Implementation Readiness:** Complete specifications provided for developer handoff. CSS variables, component examples, accessibility guidelines all documented.

**The design is ready. The system is clear. Time to build.** 🎨
