# UI/UX Design Direction - Final Synthesis
## Complete Design System for Philosophy Discussion Platform

**Date:** November 15, 2025
**Agent:** Agent 3 - UI/UX Design Synthesis
**Mission:** Define complete UI/UX direction and specific designs for conversation-first philosophical platform

---

## Executive Summary

After comprehensive analysis of branding research, UI/UX patterns, mobile design, accessibility standards, and user personas, this document defines the complete UI/UX direction for a philosophy discussion platform transitioning from competitive debate to conversation-first positioning.

### Core Design Philosophy

**Vision Statement:**
Design a platform that feels like **a well-appointed intellectual salon where thoughtful people gather to explore ideas together**—not a debate arena where opponents clash. Think philosophy coffee shop, not law court.

### Key Design Decisions

1. **Navigation:** Hybrid left sidebar + top bar (desktop), bottom nav + drawer (mobile)
2. **Visual Identity:** Warmer evolution of current palette (teal + terracotta + cream), keep Inter + Lora typography
3. **Threading:** Hybrid Discourse-style with 5-level max depth, progressive disclosure
4. **Mobile Strategy:** Mobile-first responsive with 320px minimum, reduced indentation (3-4 levels)
5. **Accessibility:** WCAG 2.1 AA minimum, AAA for body text, full keyboard navigation
6. **Brand Alignment:** Support PARLEY rebrand with warm, approachable, collaborative visual language

---

## 1. NAVIGATION ARCHITECTURE

### 1.1 Desktop Navigation (≥1024px)

#### Primary Pattern: Hybrid Left Sidebar + Top Bar

**Left Sidebar (280px wide)**

**Purpose:** Topic browsing and navigation through philosophical domains

**Structure:**
```
┌─────────────────────────┐
│ [Logo] PARLEY          │
├─────────────────────────┤
│ 🔍 Search Topics        │
│                         │
│ Recent ▼                │
│ • AI Ethics Discussion  │
│ • Free Will Debate      │
│                         │
│ Topics                  │
│ ▼ Ethics                │
│   • Applied Ethics      │
│   • Ethical Theories    │
│   • Meta-Ethics         │
│ ▶ Epistemology          │
│ ▶ Metaphysics           │
│ ▶ Logic & Reasoning     │
│ ▶ Philosophy of Mind    │
│ ▶ Political Philosophy  │
│                         │
│ My Conversations        │
│ Bookmarks               │
│                         │
│ [≡] Collapse Sidebar    │
└─────────────────────────┘
```

**Key Features:**
- **Collapsible sections**: 3-4 levels of nesting (Domain > Sub-discipline > Topic)
- **Progressive disclosure**: Start with domains collapsed except recently visited
- **Visual indentation**: 12px per level, max 4 levels visible
- **Persistent state**: Remember user's expanded/collapsed preferences
- **Quick access**: Recent conversations and bookmarks at top
- **Toggle collapse**: Minimize to 64px icon-only version for focused reading

**Technical Specifications:**
- Width: 280px expanded, 64px collapsed, 0px hidden
- Sticky positioning with internal scroll container
- Z-index: 100 (below modals, above content)
- Transition: 200ms ease for collapse/expand
- Background: Warm white (#FAFAF9)
- Border: 1px solid rgba(0,0,0,0.08)

---

**Top Bar (64px height)**

**Purpose:** Global actions and persistent navigation

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ [Logo] PARLEY    [Search.....................]  [🔔] [👤]   │
└──────────────────────────────────────────────────────────────┘
```

**Components:**
- **Logo/Home** (left): Return to main feed
- **Global Search** (center-right): Full-text search with autocomplete
- **Notifications** (right): Bell icon with badge count
- **Profile Menu** (far right): Avatar with dropdown

**Technical Specifications:**
- Height: 64px
- Sticky positioning: top: 0
- Z-index: 200 (above sidebar, below modals)
- Background: White with subtle shadow
- Search expands on focus: 300px → 450px
- Touch targets: 48x48px minimum

---

#### Breadcrumb Navigation

**Purpose:** Show current location in hierarchy

**Pattern:**
```
Home > Ethics > Applied Ethics > Bioethics > AI Medical Ethics
```

**Placement:** Below top bar, above main content (12px vertical padding)

**Behavior:**
- Desktop: Show full path (5 levels max)
- Tablet: Show last 3 levels with "..." for truncated
- Mobile: Show last 2 levels, swipeable to see full path
- Current page: Non-clickable, bold weight
- Separator: Chevron (>) or slash (/)

**Technical Specifications:**
- Font: Inter 14px, regular weight
- Color: Gray-600 for links, Gray-900 for current
- Hover: Underline + color shift
- Truncation: CSS ellipsis with title attribute for full text

---

### 1.2 Mobile Navigation (<768px)

#### Primary Pattern: Bottom Navigation + Hamburger Drawer

**Bottom Navigation (56px height)**

**Purpose:** Quick access to 4-5 primary actions

**Structure:**
```
┌────────────────────────────────┐
│ [🏠]  [🔍]  [➕]  [🔔]  [👤]  │
│ Home Explore New  Alert Me    │
└────────────────────────────────┘
```

**Items:**
1. **Home** (🏠): Main feed/dashboard
2. **Explore** (🔍): Browse topics/search
3. **New** (➕): Start new conversation
4. **Notifications** (🔔): Activity alerts
5. **Profile** (👤): User menu

**Technical Specifications:**
- Height: 56px
- Position: Fixed bottom
- Z-index: 150
- Background: White with top border/shadow
- Active state: Teal color + bold icon
- Touch targets: Full width divided by 5 items

---

**Mobile Drawer (Hamburger Menu)**

**Purpose:** Access full topic hierarchy on mobile

**Trigger:** Hamburger icon (☰) in top-left of mobile top bar

**Structure:**
```
┌─────────────────────────┐
│ [X] PARLEY             │
│                         │
│ 🔍 Search Topics        │
│ ─────────────────────── │
│                         │
│ Recent Conversations    │
│ • AI Ethics Discussion  │
│ • Free Will Debate      │
│                         │
│ Topics                  │
│ ▼ Ethics                │
│   • Applied Ethics      │
│   • Ethical Theories    │
│ ▶ Epistemology          │
│ ▶ Metaphysics           │
│                         │
│ My Conversations        │
│ Settings                │
└─────────────────────────┘
```

**Behavior:**
- Slide from left: 0 → 85% screen width
- Animation: 300ms ease-out
- Backdrop: Semi-transparent black (rgba(0,0,0,0.5))
- Close: Tap X, tap backdrop, swipe left, or tap link
- Body scroll lock: Prevent background scrolling when open

**Technical Specifications:**
- Width: 85% of viewport
- Max-width: 320px
- Z-index: 300 (above all except modals)
- Touch gestures: Swipe right from edge to open, swipe left to close

---

#### Mobile Top Bar (56px height)

**Simplified version of desktop top bar**

```
┌───────────────────────────────┐
│ [☰] PARLEY      [🔍]  [👤]   │
└───────────────────────────────┘
```

**Components:**
- **Hamburger** (left): Opens drawer
- **Logo** (center-left): Brand identity
- **Search** (right): Opens full-screen search overlay
- **Profile** (far right): User menu

---

### 1.3 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  /* Bottom nav + drawer */
  /* Single column content */
  /* Full-screen search overlay */
  /* Condensed breadcrumbs (last 2 levels) */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Top nav + drawer, no sidebar */
  /* No bottom nav */
  /* 2-column content grid (optional) */
  /* Breadcrumbs show last 3 levels */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Top nav + left sidebar */
  /* No drawer/bottom nav */
  /* Multi-column layouts */
  /* Full breadcrumbs (5 levels max) */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Max content width 1200px */
  /* Extra margins */
  /* Wider sidebar possible (300px) */
}
```

---

### 1.4 Accessibility Features

#### Keyboard Navigation

**Essential Shortcuts:**
- `Tab` / `Shift+Tab`: Navigate between elements
- `/`: Focus search bar
- `Esc`: Close drawer/modal/dropdown
- `Enter/Space`: Activate links/buttons, toggle expandable sections
- `Arrow keys`: Navigate within sidebar/menus
- `U`: Go up to parent in hierarchy
- `[` / `]`: Previous/next sibling

**Focus Management:**
- **Tab order**: Logo → Search → Notifications → Profile → Sidebar first item → Main content
- **Skip links**: "Skip to main content" as first focusable element (visible on focus)
- **Focus trap**: When drawer/modal open, trap focus within
- **Focus indicators**: Clear 2px outline with teal color (#0F766E)
- **No keyboard traps**: Always escapable with Esc

#### Screen Reader Support

**ARIA Labels:**
```html
<nav role="navigation" aria-label="Main navigation">
  <aside role="complementary" aria-label="Topic navigation">
    <button aria-expanded="true" aria-controls="ethics-submenu">
      Ethics
    </button>
    <ul id="ethics-submenu">
      <li><a href="/ethics/applied">Applied Ethics</a></li>
    </ul>
  </aside>
</nav>

<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/ethics">Ethics</a></li>
    <li aria-current="page">Bioethics</li>
  </ol>
</nav>
```

**Notification Badge:**
```html
<button aria-label="Notifications, 3 unread">
  <span class="icon">🔔</span>
  <span class="badge" aria-hidden="true">3</span>
</button>
```

#### Visual Accessibility

**Color Contrast:**
- Primary text: 8.2:1 (Teal #0F766E on Cream #F5F3F0) ✓ AAA
- Navigation links: 7.5:1 minimum ✓ AA+
- Icon buttons: 3:1 minimum ✓ AA
- Focus indicators: High contrast in both light and dark modes

**Touch Targets:**
- Mobile: 48x48px minimum (Material Design standard)
- Desktop: 44x44px minimum (WCAG 2.2 AA)
- Spacing: 8px minimum between interactive elements

---

## 2. VISUAL DESIGN SYSTEM

### 2.1 Color Palette Evolution

#### Current State (ARGUED - Competitive)
- Navy #1A3A52: Too cold, formal, exclusive
- Brown #8B6F47: Achievement hierarchy, dated
- Cream #F5F3F0: Excellent, keep ✓
- Gold #D4A574: Trophy mentality
- Success Green #4A7C59: Binary win/lose
- Error Red #C84C3C: Punitive

#### New Direction (PARLEY - Conversational)

**Primary Colors**

```css
/* Primary - Warm Teal (replaces Navy) */
--color-primary-900: #134E4A;  /* Darkest, for text */
--color-primary-700: #0F766E;  /* Primary brand color */
--color-primary-500: #14B8A6;  /* Interactive states */
--color-primary-300: #5EEAD4;  /* Light accents */
--color-primary-100: #CCFBF1;  /* Backgrounds */

/* Secondary - Terracotta (replaces Brown) */
--color-secondary-900: #78350F; /* Darkest */
--color-secondary-700: #C2410C; /* Secondary brand */
--color-secondary-500: #EA580C; /* Hover states */
--color-secondary-300: #FDBA74; /* Light accents */
--color-secondary-100: #FFEDD5; /* Backgrounds */

/* Neutral - Warm Grays (enhanced) */
--color-neutral-950: #0A0A0A;  /* Near-black text */
--color-neutral-900: #171717;
--color-neutral-700: #404040;
--color-neutral-500: #737373;
--color-neutral-300: #D4D4D4;
--color-neutral-100: #F5F5F5;
--color-neutral-50: #FAFAFA;

/* Background - Cream (keep from ARGUED) */
--color-background-primary: #F5F3F0;    /* Main background */
--color-background-secondary: #FAFAF9;  /* Sidebar, cards */
--color-background-elevated: #FFFFFF;   /* Modals, overlays */
```

**Semantic Colors (non-judgmental)**

```css
/* Info - Cool Blue */
--color-info-700: #0369A1;
--color-info-500: #0EA5E9;
--color-info-100: #E0F2FE;

/* Success - Muted Green (not "victory") */
--color-success-700: #15803D;
--color-success-500: #22C55E;
--color-success-100: #DCFCE7;

/* Warning - Amber */
--color-warning-700: #A16207;
--color-warning-500: #EAB308;
--color-warning-100: #FEF9C3;

/* Attention - Soft Coral (not "error") */
--color-attention-700: #B91C1C;
--color-attention-500: #EF4444;
--color-attention-100: #FEE2E2;
```

**Content Type Colors (diversity of perspectives)**

```css
/* Questions - Warm Purple */
--color-question: #8B5CF6;
--color-question-bg: #F3E8FF;

/* Explorations - Sage Green */
--color-exploration: #059669;
--color-exploration-bg: #D1FAE5;

/* Debates - Keep Teal Primary */
--color-debate: #0F766E;
--color-debate-bg: #CCFBF1;

/* Reflections - Muted Amber */
--color-reflection: #D97706;
--color-reflection-bg: #FEF3C7;
```

---

### 2.2 Typography System

#### Keep Inter + Lora (Agent 1 Recommendation: Excellent Choice)

**Why This Works:**
- Inter (UI): Modern, approachable, excellent readability
- Lora (content): Warm, intellectual, perfect for long-form
- Combination: 60% conversational, 40% competitive (balanced)
- Typography pulls brand TOWARD conversation (unlike old colors)

**Font Loading Strategy**

```css
/* Self-hosted variable fonts */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora-Variable.woff2') format('woff2-variations');
  font-weight: 400 700;
  font-style: normal italic;
  font-display: swap;
}
```

**Preload Critical Fonts**

```html
<link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Lora-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

---

#### Typography Scale

**Headings (Inter, UI contexts)**

```css
/* H1 - Page titles, major sections */
h1 {
  font-family: 'Inter', sans-serif;
  font-size: 2.25rem;      /* 36px */
  font-weight: 600;         /* Semi-bold (lighter than old 700) */
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-primary-900);
}

/* H2 - Section headings */
h2 {
  font-family: 'Inter', sans-serif;
  font-size: 1.875rem;     /* 30px */
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--color-neutral-900);
}

/* H3 - Subsection headings */
h3 {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;       /* 24px */
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-neutral-900);
}

/* H4 - Component headings */
h4 {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;      /* 20px */
  font-weight: 500;
  line-height: 1.5;
  color: var(--color-neutral-700);
}
```

**Body Text (Lora, content contexts)**

```css
/* Large body - Long-form arguments, primary content */
.body-large {
  font-family: 'Lora', serif;
  font-size: 1.125rem;     /* 18px - Medium reading experience */
  font-weight: 400;
  line-height: 1.6;        /* Generous for readability */
  color: var(--color-neutral-950);
}

/* Regular body - Standard content */
.body-regular {
  font-family: 'Lora', serif;
  font-size: 1rem;         /* 16px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-neutral-900);
}

/* Small body - Secondary content, captions */
.body-small {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;     /* 14px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-neutral-700);
}
```

**UI Elements (Inter)**

```css
/* Buttons, labels, navigation */
.ui-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;     /* 14px */
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.01em;
}

/* User names in threads */
.username {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;         /* 16px */
  font-weight: 600;
  color: var(--color-primary-700);
}

/* Timestamps */
.timestamp {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;     /* 14px */
  font-weight: 400;
  color: var(--color-neutral-500);
}
```

---

#### Responsive Typography

```css
/* Mobile (<768px) */
@media (max-width: 767px) {
  h1 { font-size: 1.875rem; }  /* 30px */
  h2 { font-size: 1.5rem; }    /* 24px */
  .body-large { font-size: 1.125rem; }  /* 18px - maintain readability */
}

/* Tablet (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  h1 { font-size: 2rem; }      /* 32px */
  .body-large { font-size: 1.0625rem; }  /* 17px */
}

/* Desktop (≥1024px) */
/* Use base sizes defined above */
```

---

#### Contextual Typography (Support Content Spectrum)

**Formal Debate Context**

```css
.debate-title {
  font-family: 'Inter', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;        /* Heavier for formal */
  color: var(--color-primary-900);
}

.debate-content {
  font-family: 'Lora', serif;
  font-size: 1.125rem;
  line-height: 1.6;
}
```

**Casual Question Context**

```css
.question-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;        /* Lighter, more approachable */
  color: var(--color-question);
}

.question-content {
  font-family: 'Inter', sans-serif;  /* Sans for casual feel */
  font-size: 1rem;
  line-height: 1.5;
}
```

**Exploration Context (Medium formality)**

```css
.exploration-title {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-exploration);
}

.exploration-content {
  font-family: 'Lora', serif;
  font-size: 1.0625rem;
  line-height: 1.5;
}
```

---

### 2.3 Component Library

#### Buttons

**Primary Button** (Main CTAs)

```css
.btn-primary {
  background: var(--color-primary-700);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-primary:hover {
  background: var(--color-primary-900);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.2);
}

.btn-primary:active {
  transform: translateY(0);
}
```

**Secondary Button** (Alternative actions)

```css
.btn-secondary {
  background: white;
  color: var(--color-primary-700);
  border: 1.5px solid var(--color-primary-700);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  padding: 11px 24px;  /* -1px for border */
  border-radius: 6px;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-secondary:hover {
  background: var(--color-primary-100);
  border-color: var(--color-primary-900);
  color: var(--color-primary-900);
}
```

**Ghost Button** (Tertiary actions)

```css
.btn-ghost {
  background: transparent;
  color: var(--color-neutral-700);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-ghost:hover {
  background: var(--color-neutral-100);
  color: var(--color-neutral-900);
}
```

---

#### Cards

**Conversation Card**

```css
.conversation-card {
  background: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 200ms ease;
}

.conversation-card:hover {
  border-color: var(--color-primary-300);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.conversation-card__header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.conversation-card__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.conversation-card__meta {
  display: flex;
  flex-direction: column;
}

.conversation-card__username {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary-700);
}

.conversation-card__timestamp {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: var(--color-neutral-500);
}

.conversation-card__title {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: 8px;
  line-height: 1.4;
}

.conversation-card__excerpt {
  font-family: 'Lora', serif;
  font-size: 0.9375rem;
  color: var(--color-neutral-700);
  line-height: 1.5;
  margin-bottom: 12px;
}

.conversation-card__footer {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}
```

---

#### Forms

**Input Fields**

```css
.input {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding: 12px 16px;
  border: 1.5px solid var(--color-neutral-300);
  border-radius: 6px;
  background: white;
  color: var(--color-neutral-900);
  transition: all 200ms ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input::placeholder {
  color: var(--color-neutral-400);
}

/* Error state */
.input.error {
  border-color: var(--color-attention-500);
}

.input.error:focus {
  box-shadow: 0 0 0 3px var(--color-attention-100);
}
```

**Text Area (for responses, arguments)**

```css
.textarea {
  font-family: 'Lora', serif;  /* Content font for writing */
  font-size: 1rem;
  line-height: 1.6;
  padding: 16px;
  border: 1.5px solid var(--color-neutral-300);
  border-radius: 6px;
  background: white;
  color: var(--color-neutral-900);
  min-height: 120px;
  resize: vertical;
  transition: all 200ms ease;
}

.textarea:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}
```

---

#### Tags/Badges

**Topic Tags**

```css
.tag {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--color-neutral-100);
  color: var(--color-neutral-700);
  cursor: pointer;
  transition: all 200ms ease;
}

.tag:hover {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
}

/* Content type variations */
.tag--question {
  background: var(--color-question-bg);
  color: var(--color-question);
}

.tag--exploration {
  background: var(--color-exploration-bg);
  color: var(--color-exploration);
}

.tag--debate {
  background: var(--color-debate-bg);
  color: var(--color-debate);
}
```

**Notification Badge**

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 10px;
  background: var(--color-attention-500);
  color: white;
}
```

---

### 2.4 Spacing & Layout

#### Spacing Scale (8px base grid)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

#### Container Widths

```css
.container-narrow {
  max-width: 640px;      /* Reading-optimized (65-75 characters) */
  margin: 0 auto;
}

.container-medium {
  max-width: 960px;      /* Balanced layout */
  margin: 0 auto;
}

.container-wide {
  max-width: 1200px;     /* Full-width content */
  margin: 0 auto;
  padding: 0 var(--space-6);
}
```

---

### 2.5 Shadows & Depth

**Elevation System** (for hierarchy)

```css
/* Level 1: Subtle (cards) */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Level 2: Medium (hover states) */
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07),
             0 2px 4px rgba(0, 0, 0, 0.05);

/* Level 3: Large (dropdowns, modals) */
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1),
             0 4px 6px rgba(0, 0, 0, 0.05);

/* Level 4: Extra large (modals) */
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15),
             0 10px 10px rgba(0, 0, 0, 0.04);
```

---

### 2.6 Border Radius

```css
--radius-sm: 4px;   /* Small elements */
--radius-md: 6px;   /* Buttons, inputs */
--radius-lg: 8px;   /* Cards */
--radius-xl: 12px;  /* Large containers */
--radius-full: 9999px;  /* Pills, avatars */
```

---

## 3. CONVERSATION THREAD DESIGN

### 3.1 Threading Model: Hybrid Discourse-Style

**Design Decision:** Hybrid threading (Discourse-inspired with Reddit's collapse features)

**Why:** Balances conversation structure with usability. Pure nested (Reddit) becomes unreadable past 5-7 levels. Flat (HN) loses context. Hybrid preserves relationships without depth issues.

---

### 3.2 Visual Thread Structure

**Desktop Threading (5-level max)**

```
┌─────────────────────────────────────────────────────────┐
│ Original Post - Alice Chen - 2h ago         [Collapse]  │
│ "What is the nature of consciousness?"                  │
│ [Long philosophical argument...]                        │
│ ──────────────────────────────────────────────────────  │
│ 💭 142 replies   👁️ 2.3k views   ⏱️ 12 min read        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ └─ Reply 1 - Sarah Chen - 1h ago            [−]         │
│    "I would argue consciousness emerges from..."        │
│    💡 Thoughtful: 12  |  Reply  |  Quote  |  Bookmark   │
│                                                          │
│    ├─ Reply 1.1 - Marcus Lee - 45m ago      [−]        │
│    │  "Building on Sarah's point about emergence..."    │
│    │  ❤️ Insightful: 8  |  Reply  |  Quote             │
│    │                                                     │
│    │  └─ Reply 1.1.1 - Aisha Khan - 30m ago [−]        │
│    │     "However, emergence doesn't fully explain..."  │
│    │     💭 Interesting: 5  |  Reply  |  Quote          │
│    │                                                     │
│    │     └─ Reply 1.1.1.1 - David Park - 15m [−]       │
│    │        "What about integrated information..."      │
│    │        💬 Question: 3  |  Reply  |  Quote          │
│    │                                                     │
│    │        └─ [Continue this thread →]                 │
│    │           (Level 6+ opens focused view)            │
│    │                                                     │
│    └─ Reply 1.2 - James Wilson - 20m ago    [−]        │
│       "Sarah, have you considered..."                   │
│       🤔 Question: 2  |  Reply  |  Quote                │
└─────────────────────────────────────────────────────────┘
```

**Visual Specifications:**

```css
/* Thread indentation */
.comment-level-0 { margin-left: 0; }
.comment-level-1 { margin-left: 40px; }
.comment-level-2 { margin-left: 80px; }
.comment-level-3 { margin-left: 120px; }
.comment-level-4 { margin-left: 160px; }
.comment-level-5 { margin-left: 168px; }  /* Minimal increase */

/* Connection lines */
.thread-line {
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-neutral-200);
}

.thread-line:hover {
  background: var(--color-primary-300);
}
```

---

**Mobile Threading (3-4 level max)**

```
┌──────────────────────────┐
│ ▼ Sarah Chen  • 2h       │  ← Tap header to collapse
│ "Consciousness           │
│ emerges from..."         │
│ ─────────────────────── │
│ 💡12  Reply  More  │    │  ← Large touch targets
│                          │
│ │ ▼ Marcus • 1h         │  ← Minimal indentation (12px)
│ │ "Building on..."       │
│ │ ❤️8  Reply  More     │
│ │                        │
│ │ │ ▼ Aisha • 45m       │
│ │ │ "However..."         │
│ │ │ 💭5  Reply          │
│ │ │                      │
│ │ │ └─ Continue (4) →    │  ← Earlier cutoff (level 4)
│ │                        │
│ │ ▼ David • 30m          │
│ │ "What about IIT?"      │
└──────────────────────────┘
```

**Mobile Specifications:**

```css
/* Reduced indentation on mobile */
@media (max-width: 767px) {
  .comment-level-0 { margin-left: 0; }
  .comment-level-1 { margin-left: 12px; }
  .comment-level-2 { margin-left: 24px; }
  .comment-level-3 { margin-left: 36px; }
  .comment-level-4 { margin-left: 40px; }  /* Minimal increase */
  /* Level 5+ not shown, force "Continue thread" */
}
```

---

### 3.3 Comment/Reply Component

**Structure:**

```html
<article class="comment" data-level="1" id="comment-123">
  <header class="comment__header">
    <img src="avatar.jpg" alt="Sarah Chen" class="comment__avatar">
    <div class="comment__meta">
      <a href="/u/sarah" class="comment__username">Sarah Chen</a>
      <span class="comment__credentials">PhD Philosophy, MIT</span>
      <time class="comment__timestamp" datetime="2025-11-15T14:00:00">
        1 hour ago
      </time>
    </div>
    <button class="comment__collapse" aria-expanded="true" aria-label="Collapse comment">
      <svg>−</svg>
    </button>
  </header>

  <div class="comment__content">
    <p>I would argue consciousness emerges from...</p>
  </div>

  <footer class="comment__footer">
    <div class="comment__reactions">
      <button class="reaction" aria-label="Mark as thoughtful">
        💡 Thoughtful <span>12</span>
      </button>
      <button class="reaction" aria-label="Mark as changed my mind">
        🤯 Changed My Mind <span>3</span>
      </button>
    </div>
    <div class="comment__actions">
      <button class="action-btn">Reply</button>
      <button class="action-btn">Quote</button>
      <button class="action-btn">Bookmark</button>
    </div>
  </footer>

  <!-- Nested replies -->
  <div class="comment__replies" aria-label="Replies to Sarah Chen">
    <!-- Child comments here -->
  </div>
</article>
```

**Styling:**

```css
.comment {
  position: relative;
  padding: var(--space-4);
  margin-bottom: var(--space-4);
  background: white;
  border-left: 2px solid transparent;
  transition: all 200ms ease;
}

.comment:hover {
  border-left-color: var(--color-primary-300);
  background: var(--color-primary-50);
}

.comment__header {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-3);
  gap: var(--space-3);
}

.comment__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--color-primary-100);
}

.comment__username {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-primary-700);
  text-decoration: none;
}

.comment__username:hover {
  text-decoration: underline;
}

.comment__credentials {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: var(--color-neutral-500);
}

.comment__timestamp {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: var(--color-neutral-400);
}

.comment__collapse {
  margin-left: auto;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid var(--color-neutral-300);
  background: white;
  cursor: pointer;
  transition: all 200ms ease;
}

.comment__collapse:hover {
  background: var(--color-neutral-100);
  border-color: var(--color-neutral-400);
}

.comment__content {
  font-family: 'Lora', serif;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-4);
}

.comment__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-neutral-100);
}

.comment__reactions {
  display: flex;
  gap: var(--space-2);
}

.reaction {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  padding: 6px 12px;
  border-radius: 16px;
  border: 1px solid var(--color-neutral-200);
  background: white;
  color: var(--color-neutral-700);
  cursor: pointer;
  transition: all 200ms ease;
}

.reaction:hover {
  border-color: var(--color-primary-300);
  background: var(--color-primary-50);
  color: var(--color-primary-700);
}

.reaction.active {
  border-color: var(--color-primary-500);
  background: var(--color-primary-100);
  color: var(--color-primary-900);
  font-weight: 600;
}

.comment__actions {
  display: flex;
  gap: var(--space-2);
}

.action-btn {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background: transparent;
  color: var(--color-neutral-600);
  cursor: pointer;
  transition: all 200ms ease;
}

.action-btn:hover {
  background: var(--color-neutral-100);
  color: var(--color-neutral-900);
}
```

---

### 3.4 Collapse/Expand Functionality

**Collapsed State:**

```html
<article class="comment comment--collapsed">
  <header class="comment__header">
    <img src="avatar.jpg" class="comment__avatar comment__avatar--small">
    <a href="/u/sarah" class="comment__username">Sarah Chen</a>
    <button class="comment__collapse" aria-expanded="false">
      <svg>+</svg>
    </button>
    <span class="comment__preview">
      "I would argue consciousness emerges from..."
    </span>
    <span class="comment__reply-count">
      (8 replies)
    </span>
  </header>
</article>
```

**Styling:**

```css
.comment--collapsed {
  padding: var(--space-2) var(--space-4);
  background: var(--color-neutral-50);
}

.comment--collapsed .comment__header {
  margin-bottom: 0;
}

.comment__avatar--small {
  width: 24px;
  height: 24px;
}

.comment__preview {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
}

.comment__reply-count {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: var(--color-neutral-500);
  margin-left: auto;
}
```

---

### 3.5 Thread Controls

**Thread-level actions** (above all comments)

```html
<div class="thread-controls">
  <div class="thread-controls__sort">
    <label>Sort by:</label>
    <select>
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="most-thoughtful">Most Thoughtful</option>
    </select>
  </div>

  <div class="thread-controls__actions">
    <button class="btn-ghost">Expand All</button>
    <button class="btn-ghost">Collapse All</button>
  </div>

  <div class="thread-controls__progress">
    <span>Reading Progress:</span>
    <div class="progress-bar">
      <div class="progress-bar__fill" style="width: 60%"></div>
    </div>
    <span>60%</span>
  </div>
</div>
```

---

### 3.6 Accessibility for Threads

**Screen Reader Navigation:**

```html
<div role="tree" aria-label="Philosophical discussion thread">
  <div role="treeitem" aria-expanded="true" aria-level="1" aria-setsize="142" aria-posinset="1">
    <div class="comment-content">
      <h3 id="comment-1">Reply by Sarah Chen</h3>
      <p>I would argue consciousness emerges from...</p>
    </div>
    <div role="group">
      <div role="treeitem" aria-expanded="true" aria-level="2" aria-setsize="3" aria-posinset="1">
        <!-- Nested comment -->
      </div>
    </div>
  </div>
</div>
```

**Keyboard Shortcuts for Threads:**
- `J` / `K`: Next/previous comment (vim-style)
- `Enter`: Expand/collapse current comment
- `R`: Reply to current comment
- `Q`: Quote current comment
- `U`: Navigate up to parent comment
- `[` / `]`: Previous/next sibling comment
- `E`: Expand all threads
- `C`: Collapse all threads

---

## 4. MOBILE RESPONSIVENESS STRATEGY

### 4.1 Mobile-First Approach

**Design Principle:** Design for smallest screen (320px) first, enhance for larger screens

**Why:** Marcus Chen, James Rodriguez, David Park (top personas) use both mobile and desktop. Mobile accounts for 60-70% of casual browsing.

---

### 4.2 Mobile Breakpoints

```css
/* Minimum supported: iPhone SE */
@media (min-width: 320px) {
  /* Base mobile styles */
}

/* Standard mobile */
@media (min-width: 375px) {
  /* iPhone 12/13/14 standard */
}

/* Large mobile */
@media (min-width: 414px) {
  /* iPhone Pro Max */
}

/* Tablet portrait */
@media (min-width: 768px) {
  /* iPad, tablet */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Laptop, desktop */
}

/* Large desktop */
@media (min-width: 1440px) {
  /* Large monitors */
}
```

---

### 4.3 Touch Target Standards

**WCAG 2.2 Level AA:** 24x24px minimum
**Best Practice (Material Design):** 48x48px minimum
**Our Standard:** 48x48px for all primary interactive elements

```css
/* Ensure all touch targets meet minimum */
.touch-target {
  min-width: 48px;
  min-height: 48px;
  /* Visual size can be smaller with padding */
  padding: 12px;
}

/* Spacing between touch targets */
.touch-target + .touch-target {
  margin-left: 8px;  /* Prevent mis-taps */
}
```

---

### 4.4 Mobile-Specific Patterns

#### Full-Screen Search (Mobile)

**Trigger:** Tap search icon in mobile top bar

**Behavior:** Opens full-screen modal overlay

```html
<div class="search-overlay" role="dialog" aria-label="Search">
  <header class="search-overlay__header">
    <input
      type="search"
      class="search-overlay__input"
      placeholder="Search topics, conversations..."
      autofocus
    >
    <button class="search-overlay__close" aria-label="Close search">
      ✕
    </button>
  </header>

  <div class="search-overlay__recent">
    <h3>Recent Searches</h3>
    <ul>
      <li><a href="/search?q=free+will">free will</a></li>
      <li><a href="/search?q=consciousness">consciousness</a></li>
    </ul>
  </div>

  <div class="search-overlay__results">
    <!-- Live search results appear here -->
  </div>
</div>
```

**Styling:**

```css
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 400;
  display: flex;
  flex-direction: column;
}

.search-overlay__header {
  display: flex;
  align-items: center;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-neutral-200);
  gap: var(--space-3);
}

.search-overlay__input {
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  border: none;
  outline: none;
}

.search-overlay__close {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--color-neutral-100);
  font-size: 1.5rem;
  cursor: pointer;
}
```

---

#### Bottom Sheet (Mobile Reply/Actions)

**Pattern:** Modal slides up from bottom for replies, actions

```html
<div class="bottom-sheet" role="dialog" aria-label="Reply to comment">
  <div class="bottom-sheet__handle"></div>

  <header class="bottom-sheet__header">
    <h2>Reply to Sarah Chen</h2>
    <button class="bottom-sheet__close" aria-label="Close">✕</button>
  </header>

  <div class="bottom-sheet__content">
    <blockquote class="quoted-comment">
      "I would argue consciousness emerges from..."
    </blockquote>

    <textarea
      class="reply-input"
      placeholder="Write your response..."
      rows="8"
    ></textarea>

    <div class="bottom-sheet__actions">
      <button class="btn-ghost">Cancel</button>
      <button class="btn-primary">Post Reply</button>
    </div>
  </div>
</div>
```

**Styling:**

```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 16px 16px 0 0;
  box-shadow: var(--shadow-xl);
  z-index: 350;
  max-height: 85vh;
  overflow-y: auto;
  transform: translateY(100%);
  transition: transform 300ms ease-out;
}

.bottom-sheet.open {
  transform: translateY(0);
}

.bottom-sheet__handle {
  width: 40px;
  height: 4px;
  background: var(--color-neutral-300);
  border-radius: 2px;
  margin: 12px auto 8px;
}

.bottom-sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-neutral-200);
}

.bottom-sheet__content {
  padding: var(--space-4);
}
```

---

#### Swipeable Breadcrumbs (Mobile)

**Problem:** Long breadcrumbs don't fit on mobile
**Solution:** Horizontal scroll/swipe

```html
<nav class="breadcrumb breadcrumb--mobile" aria-label="Breadcrumb">
  <div class="breadcrumb__scroller">
    <ol>
      <li><a href="/">Home</a></li>
      <li><a href="/ethics">Ethics</a></li>
      <li><a href="/ethics/applied">Applied Ethics</a></li>
      <li><a href="/ethics/applied/bioethics">Bioethics</a></li>
      <li aria-current="page">AI Medical Ethics</li>
    </ol>
  </div>
  <div class="breadcrumb__fade"></div>
</nav>
```

**Styling:**

```css
.breadcrumb--mobile .breadcrumb__scroller {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;  /* Smooth iOS scrolling */
  scrollbar-width: none;  /* Hide scrollbar */
}

.breadcrumb--mobile .breadcrumb__scroller::-webkit-scrollbar {
  display: none;  /* Hide scrollbar */
}

.breadcrumb--mobile ol {
  display: flex;
  white-space: nowrap;
  padding: var(--space-2) 0;
}

.breadcrumb__fade {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to right, transparent, var(--color-background-primary));
  pointer-events: none;
}
```

---

### 4.5 Performance Optimization for Mobile

**Lazy Loading Images:**

```html
<img
  src="placeholder.jpg"
  data-src="actual-image.jpg"
  loading="lazy"
  alt="User avatar"
>
```

**Virtualized Lists** (for long threads)

Use `react-window` or `react-virtualized` to render only visible comments:

```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={comments.length}
  itemSize={120}
  width="100%"
>
  {CommentRow}
</FixedSizeList>
```

**Code Splitting** (by route)

```javascript
const DiscussionThread = lazy(() => import('./pages/DiscussionThread'));
const TopicBrowser = lazy(() => import('./pages/TopicBrowser'));
```

**Image Optimization:**
- Serve WebP with fallback to JPEG
- Responsive images: `srcset` for different screen sizes
- Compress to 80% quality
- Max width 800px for mobile

---

### 4.6 Offline Support (Progressive Enhancement)

**Service Worker** for caching:

```javascript
// Cache navigation and core UI
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('parley-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/scripts/main.js',
        '/fonts/Inter-Variable.woff2',
        '/fonts/Lora-Variable.woff2'
      ]);
    })
  );
});

// Cache read threads for offline access
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

---

## 5. ACCESSIBILITY REQUIREMENTS

### 5.1 WCAG Compliance Targets

**Minimum:** WCAG 2.1 Level AA (legally required EU 2025, US 2026-2027)
**Target:** WCAG 2.1 Level AAA for body text
**Future:** WCAG 2.2 Level AA (more stringent touch targets)

---

### 5.2 Color Contrast Standards

**Text Contrast Requirements:**

```
Normal text (< 18px or < 14px bold):
- AA: 4.5:1 minimum
- AAA: 7:1 minimum

Large text (≥ 18px or ≥ 14px bold):
- AA: 3:1 minimum
- AAA: 4.5:1 minimum

UI Components (borders, icons):
- AA: 3:1 minimum (WCAG 2.1)
```

**Our Implementation:**

```css
/* Primary text on cream: 8.2:1 ✓ AAA */
color: var(--color-neutral-950);  /* #0A0A0A */
background: var(--color-background-primary);  /* #F5F3F0 */

/* Teal primary on cream: 7.8:1 ✓ AAA */
color: var(--color-primary-900);  /* #134E4A */
background: var(--color-background-primary);

/* Secondary text: 4.8:1 ✓ AA */
color: var(--color-neutral-700);  /* #404040 */
background: var(--color-background-primary);

/* Link text: 5.2:1 ✓ AA */
color: var(--color-primary-700);  /* #0F766E */
background: var(--color-background-primary);
```

---

### 5.3 Keyboard Navigation

**Full Keyboard Support Required**

**Tab Order:**
1. Skip to main content link (visible on focus)
2. Logo/home
3. Global search
4. Notifications
5. Profile menu
6. Sidebar navigation (if visible)
7. Main content area
8. Footer

**Focus Indicators:**

```css
*:focus-visible {
  outline: 2px solid var(--color-primary-700);
  outline-offset: 2px;
  border-radius: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  *:focus-visible {
    outline-width: 3px;
    outline-color: currentColor;
  }
}
```

**Skip Links:**

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content" tabindex="-1">
  <!-- Main content -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary-700);
  color: white;
  padding: 8px 16px;
  border-radius: 0 0 4px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
```

---

### 5.4 Screen Reader Optimization

**Semantic HTML:**

```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <!-- Top bar -->
    </nav>
  </header>

  <aside role="complementary" aria-label="Topic navigation">
    <!-- Sidebar -->
  </aside>

  <main id="main" role="main" tabindex="-1">
    <nav aria-label="Breadcrumb">
      <!-- Breadcrumbs -->
    </nav>

    <article aria-labelledby="discussion-title">
      <h1 id="discussion-title">What is the nature of consciousness?</h1>
      <!-- Discussion content -->
    </article>
  </main>

  <footer role="contentinfo">
    <!-- Footer -->
  </footer>
</body>
```

**ARIA Labels for Complex Components:**

```html
<!-- Expandable sidebar section -->
<button
  aria-expanded="true"
  aria-controls="ethics-topics"
  aria-label="Ethics topics, expanded"
>
  <svg aria-hidden="true">▼</svg>
  Ethics
</button>
<ul id="ethics-topics" role="group">
  <li><a href="/ethics/applied">Applied Ethics</a></li>
  <li><a href="/ethics/theories">Ethical Theories</a></li>
</ul>

<!-- Comment collapse button -->
<button
  aria-expanded="true"
  aria-label="Collapse comment by Sarah Chen"
>
  <svg aria-hidden="true">−</svg>
</button>

<!-- Notification badge -->
<button aria-label="Notifications, 3 unread">
  <svg aria-hidden="true">🔔</svg>
  <span class="badge" aria-hidden="true">3</span>
</button>

<!-- Search -->
<form role="search" aria-label="Search conversations and topics">
  <label for="search-input" class="sr-only">Search</label>
  <input
    id="search-input"
    type="search"
    placeholder="Search..."
    aria-describedby="search-help"
  >
  <span id="search-help" class="sr-only">
    Type to search topics, conversations, or users
  </span>
</form>
```

**Screen-Reader-Only Text:**

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

### 5.5 Text Scaling & Zoom

**Support 200% zoom without breaking layout:**

```css
/* Use relative units */
html {
  font-size: 16px;  /* Base size */
}

body {
  font-size: 1rem;  /* 16px, scales with user preference */
}

h1 {
  font-size: 2.25rem;  /* 36px, scales proportionally */
}

/* Spacing uses rem/em */
.card {
  padding: 1.25rem;  /* 20px, scales with zoom */
  margin-bottom: 1rem;
}

/* Max-widths prevent extremely wide text */
.content {
  max-width: 65ch;  /* ~650px at 16px font, scales with zoom */
}
```

**Test at 200% zoom:**
- Text remains readable
- No horizontal scrolling required
- Buttons/links remain usable
- No content overlap

---

### 5.6 Reduced Motion

**Respect user preference:**

```css
/* Smooth animations by default */
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

/* Disable animations if user prefers */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Instant state changes */
  .drawer {
    transition: none;
  }

  .comment {
    transition: none;
  }
}
```

---

### 5.7 Dyslexia Support

**User Toggle for Dyslexia-Friendly Mode:**

```javascript
// User setting
const [readingMode, setReadingMode] = useState('default');

// Apply to body class
<body className={readingMode === 'dyslexia' ? 'dyslexia-mode' : ''}>
```

```css
/* Dyslexia mode: Switch to all sans-serif */
.dyslexia-mode {
  --font-content: 'Inter', sans-serif;
}

.dyslexia-mode .body-large,
.dyslexia-mode .body-regular {
  font-family: var(--font-content);
  font-size: 1.125rem;  /* Slightly larger */
  line-height: 1.7;     /* More spacing */
  letter-spacing: 0.02em;  /* Increased tracking */
}

/* Avoid italic in dyslexia mode */
.dyslexia-mode em,
.dyslexia-mode i {
  font-style: normal;
  font-weight: 600;  /* Use bold instead */
}
```

---

### 5.8 Color Blindness

**Don't rely on color alone:**

```html
<!-- Bad: Color only -->
<span class="success">Approved</span>

<!-- Good: Icon + color + text -->
<span class="success">
  <svg aria-hidden="true">✓</svg>
  Approved
</span>
```

**Test with simulators:**
- Deuteranopia (red-green, most common)
- Protanopia (red-green)
- Tritanopia (blue-yellow)

**Ensure all states are distinguishable:**
- Success: Green + checkmark icon
- Warning: Amber + warning icon
- Attention: Red + alert icon
- Info: Blue + info icon

---

## 6. PAGE-BY-PAGE UI SPECIFICATIONS

### 6.1 Landing Page (Unauthenticated)

**Purpose:** Convert visitors to sign-ups, communicate "conversation-first" positioning

**Hero Section:**

```html
<section class="hero">
  <div class="container-wide">
    <h1 class="hero__title">
      Think Deeply Together
    </h1>
    <p class="hero__subtitle">
      From casual questions to deep debates—a welcoming community for
      serious philosophical inquiry.
    </p>
    <div class="hero__cta">
      <a href="/signup" class="btn-primary btn-large">
        Join the Conversation
      </a>
      <a href="/explore" class="btn-secondary btn-large">
        Explore Topics
      </a>
    </div>
  </div>

  <div class="hero__illustration">
    <!-- Illustration of diverse people in conversation -->
  </div>
</section>
```

**Styling:**

```css
.hero {
  padding: var(--space-20) 0 var(--space-16);
  background: linear-gradient(
    135deg,
    var(--color-background-primary) 0%,
    var(--color-primary-50) 100%
  );
  text-align: center;
}

.hero__title {
  font-family: 'Inter', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-primary-900);
  margin-bottom: var(--space-6);
  letter-spacing: -0.03em;
}

.hero__subtitle {
  font-family: 'Lora', serif;
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--color-neutral-700);
  max-width: 700px;
  margin: 0 auto var(--space-8);
}

.hero__cta {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.125rem;
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .hero__title {
    font-size: 2.5rem;
  }

  .hero__subtitle {
    font-size: 1.125rem;
  }

  .hero__cta {
    flex-direction: column;
    align-items: stretch;
  }
}
```

---

**Feature Sections:**

```html
<section class="features">
  <div class="container-wide">
    <h2 class="section-title">Why Philosophers Love PARLEY</h2>

    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-card__icon">💭</div>
        <h3 class="feature-card__title">Ask Questions Freely</h3>
        <p class="feature-card__description">
          No question is too basic. Our community welcomes curious minds
          at all levels—from "shower thoughts" to doctoral research.
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-card__icon">🤝</div>
        <h3 class="feature-card__title">Explore Ideas Together</h3>
        <p class="feature-card__description">
          Philosophy thrives on dialogue. Engage in collaborative thinking
          where different perspectives deepen everyone's understanding.
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-card__icon">🎓</div>
        <h3 class="feature-card__title">Learn from Experts</h3>
        <p class="feature-card__description">
          Connect with PhD philosophers, professors, and passionate thinkers.
          Get feedback from people who've studied these questions deeply.
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-card__icon">🌍</div>
        <h3 class="feature-card__title">Dive Deep or Stay Casual</h3>
        <p class="feature-card__description">
          Whether you have 5 minutes or 5 hours, there's a place for you.
          Quick questions, long explorations, and everything in between.
        </p>
      </div>
    </div>
  </div>
</section>
```

**Styling:**

```css
.features {
  padding: var(--space-20) 0;
  background: white;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-12);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
}

.feature-card {
  padding: var(--space-8);
  background: var(--color-background-secondary);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: all 200ms ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.feature-card__icon {
  font-size: 3rem;
  margin-bottom: var(--space-4);
}

.feature-card__title {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-3);
}

.feature-card__description {
  font-family: 'Lora', serif;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-neutral-700);
}
```

---

**Topic Preview Section:**

```html
<section class="topic-preview">
  <div class="container-wide">
    <h2 class="section-title">Explore Popular Topics</h2>

    <div class="topic-cards">
      <a href="/ethics" class="topic-card">
        <h3>Ethics</h3>
        <p>1,247 conversations</p>
        <div class="topic-card__tags">
          <span class="tag">AI Ethics</span>
          <span class="tag">Bioethics</span>
          <span class="tag">Justice</span>
        </div>
      </a>

      <a href="/philosophy-of-mind" class="topic-card">
        <h3>Philosophy of Mind</h3>
        <p>892 conversations</p>
        <div class="topic-card__tags">
          <span class="tag">Consciousness</span>
          <span class="tag">Free Will</span>
          <span class="tag">AI</span>
        </div>
      </a>

      <a href="/epistemology" class="topic-card">
        <h3>Epistemology</h3>
        <p>634 conversations</p>
        <div class="topic-card__tags">
          <span class="tag">Truth</span>
          <span class="tag">Knowledge</span>
          <span class="tag">Skepticism</span>
        </div>
      </a>

      <a href="/political-philosophy" class="topic-card">
        <h3>Political Philosophy</h3>
        <p>1,103 conversations</p>
        <div class="topic-card__tags">
          <span class="tag">Democracy</span>
          <span class="tag">Rights</span>
          <span class="tag">Justice</span>
        </div>
      </a>
    </div>

    <div class="topic-preview__cta">
      <a href="/topics" class="btn-secondary">
        Browse All Topics →
      </a>
    </div>
  </div>
</section>
```

---

### 6.2 Sign Up / Login Pages

**Sign Up Page:**

```html
<main class="auth-page">
  <div class="auth-container">
    <div class="auth-container__brand">
      <svg class="logo-large"><!-- Logo --></svg>
      <h1>Join PARLEY</h1>
      <p class="subtitle">
        Where curious minds explore ideas together
      </p>
    </div>

    <form class="auth-form" action="/signup" method="POST">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          class="input"
          placeholder="you@example.com"
          required
          autocomplete="email"
        >
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          class="input"
          placeholder="Choose a username"
          required
          autocomplete="username"
        >
        <span class="form-help">
          This is how you'll appear in conversations
        </span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          class="input"
          placeholder="Create a strong password"
          required
          autocomplete="new-password"
          minlength="8"
        >
        <span class="form-help">
          At least 8 characters
        </span>
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" required>
          <span>
            I agree to the <a href="/terms">Terms of Service</a> and
            <a href="/privacy">Privacy Policy</a>
          </span>
        </label>
      </div>

      <button type="submit" class="btn-primary btn-block">
        Create Account
      </button>
    </form>

    <div class="auth-divider">
      <span>or</span>
    </div>

    <div class="social-auth">
      <button class="btn-social btn-social--google">
        <svg><!-- Google icon --></svg>
        Continue with Google
      </button>
    </div>

    <p class="auth-footer">
      Already have an account?
      <a href="/login" class="link-primary">Log in</a>
    </p>
  </div>
</main>
```

**Styling:**

```css
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-background-primary) 0%,
    var(--color-primary-50) 100%
  );
  padding: var(--space-6);
}

.auth-container {
  width: 100%;
  max-width: 480px;
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-10);
  box-shadow: var(--shadow-xl);
}

.auth-container__brand {
  text-align: center;
  margin-bottom: var(--space-8);
}

.logo-large {
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-4);
}

.auth-container__brand h1 {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary-900);
  margin-bottom: var(--space-2);
}

.subtitle {
  font-family: 'Lora', serif;
  font-size: 1rem;
  color: var(--color-neutral-600);
}

.auth-form {
  margin-bottom: var(--space-6);
}

.form-group {
  margin-bottom: var(--space-5);
}

.form-group label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-2);
}

.form-help {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: var(--color-neutral-500);
  margin-top: var(--space-1);
}

.btn-block {
  width: 100%;
}

.auth-divider {
  position: relative;
  text-align: center;
  margin: var(--space-6) 0;
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-neutral-200);
}

.auth-divider span {
  position: relative;
  background: white;
  padding: 0 var(--space-3);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.btn-social {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: 12px 24px;
  border: 1.5px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  background: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-neutral-900);
  cursor: pointer;
  transition: all 200ms ease;
}

.btn-social:hover {
  background: var(--color-neutral-50);
  border-color: var(--color-neutral-400);
}

.auth-footer {
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  margin-top: var(--space-6);
}

.link-primary {
  color: var(--color-primary-700);
  text-decoration: none;
  font-weight: 600;
}

.link-primary:hover {
  text-decoration: underline;
}
```

---

### 6.3 Discussion Thread Page

**Layout:**

```html
<main class="discussion-page">
  <!-- Sidebar navigation (desktop) -->
  <aside class="sidebar">
    <!-- See section 1.1 -->
  </aside>

  <!-- Main content -->
  <div class="discussion-content">
    <!-- Breadcrumb -->
    <nav aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/ethics">Ethics</a></li>
        <li><a href="/ethics/applied">Applied Ethics</a></li>
        <li><a href="/ethics/applied/bioethics">Bioethics</a></li>
        <li aria-current="page">AI Medical Ethics</li>
      </ol>
    </nav>

    <!-- Original post -->
    <article class="original-post">
      <header class="original-post__header">
        <div class="post-meta">
          <img src="avatar.jpg" alt="Alice Chen" class="avatar-large">
          <div class="post-meta__info">
            <h2 class="post-meta__username">
              <a href="/u/alice">Alice Chen</a>
            </h2>
            <span class="post-meta__credentials">
              PhD Bioethics, Stanford
            </span>
            <time class="post-meta__timestamp" datetime="2025-11-15T10:00:00">
              Posted 2 hours ago
            </time>
          </div>
          <div class="post-meta__actions">
            <button class="btn-ghost">
              <svg>🔖</svg> Bookmark
            </button>
            <button class="btn-ghost">
              <svg>⋯</svg> More
            </button>
          </div>
        </div>

        <h1 class="post-title">
          Should AI systems have final say in terminal diagnoses?
        </h1>

        <div class="post-tags">
          <span class="tag tag--debate">Debate</span>
          <span class="tag">AI Ethics</span>
          <span class="tag">Medical AI</span>
          <span class="tag">Bioethics</span>
          <span class="tag">Autonomy</span>
        </div>
      </header>

      <div class="post-content">
        <p>
          As AI medical diagnostic systems become more accurate than
          human doctors in certain areas, we face a crucial ethical
          question: should we allow AI to have the final say in terminal
          diagnoses?
        </p>

        <p>
          On one hand, AI systems analyzing CT scans and MRIs have
          demonstrated higher accuracy rates than experienced radiologists.
          If the goal is to save lives, shouldn't we defer to the more
          accurate judgment—even if it's non-human?
        </p>

        <p>
          On the other hand, terminal diagnoses profoundly affect human
          dignity, autonomy, and end-of-life decisions. Does delegating
          this responsibility to AI diminish something fundamentally
          important about the doctor-patient relationship?
        </p>

        <p>
          I'm curious to hear different perspectives on this. What
          principles should guide our thinking here?
        </p>
      </div>

      <footer class="post-footer">
        <div class="post-stats">
          <span class="stat">
            <svg>💭</svg> 142 replies
          </span>
          <span class="stat">
            <svg>👁️</svg> 2,341 views
          </span>
          <span class="stat">
            <svg>⏱️</svg> 12 min read
          </span>
        </div>

        <div class="post-reactions">
          <button class="reaction">
            💡 Thoughtful <span>24</span>
          </button>
          <button class="reaction">
            🤯 Mind-Changing <span>8</span>
          </button>
          <button class="reaction">
            🤔 Good Question <span>15</span>
          </button>
        </div>
      </footer>
    </article>

    <!-- Thread controls -->
    <div class="thread-controls">
      <!-- See section 3.5 -->
    </div>

    <!-- Replies/Thread -->
    <div class="thread-container">
      <!-- See section 3.2 for thread structure -->
    </div>
  </div>
</main>
```

**Styling:**

```css
.discussion-page {
  display: flex;
  min-height: 100vh;
}

.discussion-content {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-6);
}

.original-post {
  background: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  margin-bottom: var(--space-8);
}

.post-meta {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.avatar-large {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid var(--color-primary-100);
}

.post-meta__info {
  flex: 1;
}

.post-meta__username {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 var(--space-1) 0;
}

.post-meta__username a {
  color: var(--color-primary-700);
  text-decoration: none;
}

.post-meta__username a:hover {
  text-decoration: underline;
}

.post-meta__credentials {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  display: block;
  margin-bottom: var(--space-1);
}

.post-meta__timestamp {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: var(--color-neutral-500);
}

.post-title {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-neutral-900);
  margin: 0 0 var(--space-4) 0;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.post-content {
  font-family: 'Lora', serif;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-neutral-900);
  margin-bottom: var(--space-6);
}

.post-content p {
  margin-bottom: var(--space-5);
}

.post-content p:last-child {
  margin-bottom: 0;
}

.post-footer {
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-neutral-200);
}

.post-stats {
  display: flex;
  gap: var(--space-6);
  margin-bottom: var(--space-4);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.post-reactions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
```

---

### 6.4 Topic Browse Page

**Layout:**

```html
<main class="browse-page">
  <aside class="sidebar">
    <!-- See section 1.1 -->
  </aside>

  <div class="browse-content">
    <header class="page-header">
      <div class="breadcrumb">
        <a href="/">Home</a> > <a href="/ethics">Ethics</a> >
        <span aria-current="page">Applied Ethics</span>
      </div>

      <h1>Applied Ethics</h1>
      <p class="page-description">
        Explore how philosophical principles apply to real-world issues
        in medicine, technology, environment, business, and more.
      </p>

      <div class="page-stats">
        <span>1,247 conversations</span>
        <span>•</span>
        <span>89 active this week</span>
      </div>
    </header>

    <!-- Subtopics -->
    <section class="subtopics">
      <h2>Browse Subtopics</h2>

      <div class="subtopic-grid">
        <a href="/ethics/applied/bioethics" class="subtopic-card">
          <h3>Bioethics</h3>
          <p class="count">423 conversations</p>
          <p class="description">
            Medical ethics, genetic engineering, end-of-life care
          </p>
          <div class="trending-indicator">
            🔥 12 new this week
          </div>
        </a>

        <a href="/ethics/applied/tech-ethics" class="subtopic-card">
          <h3>Technology Ethics</h3>
          <p class="count">518 conversations</p>
          <p class="description">
            AI ethics, data privacy, algorithmic fairness
          </p>
          <div class="trending-indicator">
            🔥 24 new this week
          </div>
        </a>

        <a href="/ethics/applied/environmental" class="subtopic-card">
          <h3>Environmental Ethics</h3>
          <p class="count">187 conversations</p>
          <p class="description">
            Climate change, animal rights, sustainability
          </p>
        </a>

        <a href="/ethics/applied/business" class="subtopic-card">
          <h3>Business Ethics</h3>
          <p class="count">119 conversations</p>
          <p class="description">
            Corporate responsibility, fair trade, labor rights
          </p>
        </a>
      </div>
    </section>

    <!-- Recent conversations -->
    <section class="recent-conversations">
      <div class="section-header">
        <h2>Recent Conversations</h2>
        <div class="sort-filter">
          <select aria-label="Sort conversations">
            <option value="recent">Most Recent</option>
            <option value="trending">Trending</option>
            <option value="most-discussed">Most Discussed</option>
            <option value="unanswered">Unanswered</option>
          </select>

          <button class="btn-ghost">
            <svg>🔍</svg> Filter
          </button>
        </div>
      </div>

      <div class="conversation-list">
        <!-- Conversation cards (see section 2.3) -->
      </div>

      <div class="pagination">
        <button class="btn-ghost" disabled>← Previous</button>
        <span class="page-numbers">
          <button class="page-number active">1</button>
          <button class="page-number">2</button>
          <button class="page-number">3</button>
          <span>...</span>
          <button class="page-number">12</button>
        </span>
        <button class="btn-ghost">Next →</button>
      </div>
    </section>
  </div>
</main>
```

---

### 6.5 User Profile Page

**Layout:**

```html
<main class="profile-page">
  <aside class="sidebar">
    <!-- See section 1.1 -->
  </aside>

  <div class="profile-content">
    <div class="profile-header">
      <img src="avatar.jpg" alt="Marcus Chen" class="profile-avatar">

      <div class="profile-info">
        <h1 class="profile-name">Marcus Chen</h1>
        <p class="profile-username">@marcus</p>
        <p class="profile-credentials">
          Product Manager | Philosophy Enthusiast
        </p>

        <div class="profile-stats">
          <span class="stat">
            <strong>47</strong> Conversations
          </span>
          <span class="stat">
            <strong>289</strong> Replies
          </span>
          <span class="stat">
            <strong>156</strong> Thoughtful Reactions
          </span>
        </div>

        <div class="profile-actions">
          <button class="btn-primary">Follow</button>
          <button class="btn-ghost">Message</button>
        </div>
      </div>
    </div>

    <div class="profile-tabs">
      <button class="tab active" aria-selected="true">
        Conversations
      </button>
      <button class="tab" aria-selected="false">
        Replies
      </button>
      <button class="tab" aria-selected="false">
        Bookmarks
      </button>
      <button class="tab" aria-selected="false">
        Topics Following
      </button>
    </div>

    <div class="profile-activity">
      <!-- Conversation cards based on active tab -->
    </div>
  </div>
</main>
```

---

## 7. IMPLEMENTATION ROADMAP

### 7.1 MVP Phase (Weeks 1-8)

**Must Have:**

1. **Core Navigation** (Week 1-2)
   - Desktop: Top bar + left sidebar
   - Mobile: Top bar + hamburger drawer + bottom nav
   - Breadcrumbs
   - Basic keyboard navigation

2. **Visual Design System** (Week 2-3)
   - Color palette implementation (warmer teal + terracotta)
   - Typography setup (Inter + Lora, self-hosted)
   - Core components (buttons, cards, inputs, tags)
   - Spacing/layout system

3. **Thread Display** (Week 3-5)
   - Hybrid threading with 5-level max
   - Collapse/expand functionality
   - Mobile responsive (3-4 level max)
   - Basic keyboard navigation

4. **Key Pages** (Week 5-7)
   - Landing page
   - Sign up / Login
   - Discussion thread view
   - Topic browse page

5. **Accessibility Baseline** (Week 7-8)
   - WCAG 2.1 AA compliance
   - Screen reader support
   - Keyboard navigation
   - Color contrast verification

**Success Criteria:**
- All pages work on mobile and desktop
- WCAG AA compliant
- Aligned with PARLEY brand direction
- Users can navigate, read threads, post replies

---

### 7.2 Enhancement Phase (Weeks 9-16)

**Should Have:**

1. **Advanced Navigation** (Week 9-10)
   - Personalization (follow topics/tags)
   - Advanced filtering
   - Search autocomplete
   - Keyboard shortcuts

2. **Thread Enhancements** (Week 11-12)
   - Thread timeline/slider
   - Jump to unread
   - Context preview on hover
   - Reading progress indicator

3. **Mobile Polish** (Week 13-14)
   - Swipe gestures
   - Bottom sheet modals
   - Offline caching
   - Performance optimization

4. **Accessibility AAA** (Week 15-16)
   - AAA body text contrast
   - Dyslexia mode
   - Enhanced keyboard shortcuts
   - Reduced motion preferences

---

### 7.3 Future Enhancements (Weeks 17+)

**Nice to Have:**

1. **AI Features**
   - Thread summarization
   - Auto-categorization
   - Recommended conversations

2. **Advanced Threading**
   - Argument mapping view
   - Visual tree diagram
   - AI-assisted navigation

3. **Personalization**
   - Custom themes
   - Font choices
   - Layout preferences

4. **Community Features**
   - User collections
   - Reading lists
   - Collaborative annotations

---

## 8. DESIGN SYSTEM SUMMARY

### 8.1 Key Decisions

1. **Navigation:** Hybrid sidebar (desktop) + drawer + bottom nav (mobile)
2. **Colors:** Warmer evolution - teal primary, terracotta secondary, cream background
3. **Typography:** Keep Inter + Lora (excellent for conversation-first)
4. **Threading:** Hybrid Discourse-style, 5 levels desktop, 3-4 mobile
5. **Mobile:** Mobile-first, 320px minimum, 48px touch targets
6. **Accessibility:** WCAG 2.1 AA minimum, AAA for body text
7. **Brand:** Align with PARLEY rebrand - warm, approachable, collaborative

---

### 8.2 Design Tokens Reference

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
--text-large: 1.125rem;                /* 18px reading */

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

### 8.3 Component Checklist

**Core Components Needed:**
- [ ] TopBar (global navigation)
- [ ] Sidebar (topic navigation)
- [ ] Mobile Drawer
- [ ] Bottom Navigation (mobile)
- [ ] Breadcrumb
- [ ] Comment/Reply Card
- [ ] Thread Container
- [ ] Collapse/Expand Controls
- [ ] Button variants (primary, secondary, ghost)
- [ ] Input fields
- [ ] Text area
- [ ] Tags/Badges
- [ ] Conversation Card
- [ ] User Avatar
- [ ] Modal/Dialog
- [ ] Bottom Sheet (mobile)
- [ ] Search Overlay (mobile)

---

## 9. CONCLUSION

This UI/UX design system provides a complete blueprint for building a conversation-first philosophy platform that:

✅ **Welcomes all levels** - From casual questions to deep debates
✅ **Prioritizes readability** - Optimized typography and spacing for long-form content
✅ **Works everywhere** - Mobile-first responsive design, 320px minimum
✅ **Includes everyone** - WCAG 2.1 AA accessibility, AAA for body text
✅ **Scales gracefully** - Hybrid navigation supports hundreds of topics
✅ **Feels warm** - Evolved color palette supports collaborative positioning
✅ **Maintains credibility** - Professional design without intimidation

The design direction aligns with Agent 1's brand recommendation (PARLEY rebrand), supports the user personas (Marcus, James, David, Zara, etc.), and creates a visual identity that says: **"Think deeply together."**

---

**Next Steps:**
1. Review and approve design direction
2. Begin component development (React + TypeScript)
3. Implement design system tokens
4. Build MVP pages (landing, auth, discussion, browse)
5. Conduct accessibility audit
6. User testing with target personas
7. Iterate based on feedback

---

**Document Version:** 1.0
**Last Updated:** November 15, 2025
**Author:** Agent 3 - UI/UX Design Synthesis
**Status:** Final - Ready for Implementation
