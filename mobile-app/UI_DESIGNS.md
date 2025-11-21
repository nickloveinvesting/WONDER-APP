# WONDER iOS App - Mobile UI/UX Design Specifications

**Design Version:** 1.0
**Platform:** iOS 15+
**Design System:** WONDER (Teal primary, Slate text, Plus Jakarta Sans)
**Target Audience:** Intellectual adults 25-45 years old

---

## Table of Contents

1. [Navigation Architecture](#1-navigation-architecture)
2. [Core Screens](#2-core-screens)
3. [Mobile Components](#3-mobile-components)
4. [Gesture Interaction Map](#4-gesture-interaction-map)
5. [Typography & Colors](#5-typography--colors)
6. [Accessibility Requirements](#6-accessibility-requirements)
7. [Screen Flow Diagrams](#7-screen-flow-diagrams)

---

## 1. Navigation Architecture

### 1.1 Bottom Tab Bar (5 Tabs)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              Main Content Area                  │
│                                                 │
├─────────────────────────────────────────────────┤
│   🏠      💬      ✍️      📚      👤          │
│  Home    Posts   Write   Vault   Profile       │
└─────────────────────────────────────────────────┘
```

**Specifications:**
| Property | Value |
|----------|-------|
| Height | 49pt (iOS standard + safe area) |
| Background | White/80% opacity + backdrop blur |
| Active Color | Teal-600 (#0D9488) |
| Inactive Color | Slate-400 (#94A3B8) |
| Icon Size | 24x24pt |
| Label Font | Plus Jakarta Sans, 11pt, Medium |
| Tab Spacing | Equal distribution, 20pt margins |

**Tab Configuration:**

| Tab | Icon | Label | Default Screen | Badge Support |
|-----|------|-------|----------------|---------------|
| 1 | `house.fill` | Home | Daily Question | No |
| 2 | `bubble.left.and.bubble.right` | Posts | Discussion List | Yes (new) |
| 3 | `square.and.pencil` | Write | Create Argument | No |
| 4 | `book.closed` | Vault | Saved Items | Yes (count) |
| 5 | `person.circle` | Profile | User Profile | Yes (alerts) |

### 1.2 Stack Navigation Hierarchy

```
Tab 1: Home
├── Daily Question (root)
├── Discussion Detail
│   ├── Argument Detail
│   └── Author Profile (modal)
└── Search Results

Tab 2: Posts
├── All Discussions (root)
├── Discussion Detail
├── Filter Sheet (modal)
└── Sort Options (action sheet)

Tab 3: Write
├── Create Mode Selection (root)
├── Argument Editor (fullscreen modal)
├── Topic Selector (sheet)
├── Template Library (modal)
└── Preview & Publish (modal)

Tab 4: Vault
├── Saved Arguments (root)
├── Folders (optional)
├── Argument Detail
└── Export Options (action sheet)

Tab 5: Profile
├── User Profile (root)
├── Edit Profile (modal)
├── Settings (push)
│   ├── Account
│   ├── Notifications
│   ├── Privacy
│   ├── Appearance (dark mode)
│   └── About & Legal
└── Achievements (push)
```

### 1.3 Navigation Patterns

| Pattern | Use Case | Animation |
|---------|----------|-----------|
| Push | Drill-down to detail | Slide from right |
| Modal Sheet | Creation flows, quick actions | Slide from bottom |
| Full Screen Modal | Editors, immersive content | Fade + scale |
| Action Sheet | Options, sorting, filters | Slide from bottom |
| Popover | Quick info, tooltips (iPad) | Fade in place |

---

## 2. Core Screens

### 2.1 Home Screen (Daily Question)

```
┌──────────────────────────────────────────┐
│ Status Bar                               │
├──────────────────────────────────────────┤
│ Welcome back, [username]                 │
│ Jump into today's discussions            │
├──────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐ │
│ │ ✨ TODAY'S QUESTION                  │ │
│ │                                      │ │
│ │ Is consciousness an emergent         │ │
│ │ property of complex systems?         │ │
│ │                                      │ │
│ │ Explore whether awareness arises     │ │
│ │ from neural complexity or...         │ │
│ │                                      │ │
│ │ [    Join the Conversation    →]     │ │
│ └──────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│ YOUR STATS                               │
│ ┌──────────┬──────────┬────────────────┐ │
│ │ 🔥 5     │ ✨ 128   │ 📊 72         │ │
│ │ Streak   │ Influence│ Avg Depth     │ │
│ └──────────┴──────────┴────────────────┘ │
├──────────────────────────────────────────┤
│ RECENT DISCUSSIONS                       │
│ ┌──────────────────────────────────────┐ │
│ │ Discussion Card 1                    │ │
│ │ • Free will vs determinism...        │ │
│ │ • 12 participants · Depth: 78        │ │
│ └──────────────────────────────────────┘ │
│ ┌──────────────────────────────────────┐ │
│ │ Discussion Card 2                    │ │
│ └──────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│ [Tab Bar]                                │
└──────────────────────────────────────────┘
```

**Component Specifications:**

**Welcome Header:**
```
Height:        44pt
Margin:        16pt horizontal, 12pt vertical
Title:         24pt, weight 900, Slate-900
Subtitle:      16pt, weight 500, Slate-600
```

**Today's Question Card:**
```
Margin:        16pt from edges
Corner Radius: 16pt
Padding:       20pt internal
Border:        1pt Slate-200
Shadow:        0 2pt 8pt rgba(0,0,0,0.08)
Background:    White

Badge:
  Background:  Teal-50
  Border:      1pt Teal-200
  Text:        11pt bold, Teal-700
  Padding:     6pt vertical, 12pt horizontal

Question Title:
  Font:        28pt, weight 900
  Color:       Slate-900
  Line Height: 1.2
  Max Lines:   3

Description:
  Font:        16pt, weight 500
  Color:       Slate-600
  Line Height: 1.6
  Max Lines:   4

CTA Button:
  Height:      48pt
  Background:  Teal-600
  Text:        16pt white bold
  Corner:      12pt
  Shadow:      0 4pt 12pt rgba(20,184,166,0.3)
```

**Stats Grid:**
```
Layout:        3-column, equal width
Item Height:   80pt
Spacing:       12pt between items
Corner Radius: 12pt
Background:    Stone-50

Stat Value:    28pt, weight 900
Label:         12pt, weight 500, Slate-600
Icon:          20pt, above value
```

### 2.2 Discussion Listing Screen

```
┌──────────────────────────────────────────┐
│ All Discussions                    ⚙️ ↕️ │
├──────────────────────────────────────────┤
│ [All][Philosophy][Ethics][AI][Logic]     │
├──────────────────────────────────────────┤
│ 🔍 Search discussions...                 │
├──────────────────────────────────────────┤
│ SORT: Most Recent ▼                      │
├──────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐ │
│ │ 👤 Dr. Sarah Chen         · 2h       │ │
│ │                                      │ │
│ │ The nature of personal identity      │ │
│ │ across time raises fundamental...    │ │
│ │                                      │ │
│ │ 👆 24  👇 8  💬 12  📊 Depth: 72     │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ [Next Card...]                       │ │
│ └──────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│ [Tab Bar]                                │
└──────────────────────────────────────────┘
```

**Segmented Control (Filter):**
```
Height:        40pt
Margin:        16pt horizontal, 8pt vertical
Segments:      All | Philosophy | Ethics | AI | Logic | Economics
Background:    Slate-100
Selected:      Teal-600 background, White text
Font:          13pt, weight 600
Corner Radius: 8pt per segment
Scroll:        Horizontal if > 5 segments
```

**Search Bar:**
```
Height:        40pt
Margin:        16pt
Padding:       10pt horizontal
Icon:          🔍 Slate-400
Placeholder:   "Search discussions..." Slate-500
Border:        1pt Slate-200
Focus State:   Teal-500 border, 2pt ring Teal-100
```

**Discussion Card (List Item):**
```
Height:        130-160pt (flexible)
Margin:        12pt vertical, 16pt horizontal
Padding:       16pt
Corner Radius: 12pt
Border:        1pt Slate-200
Shadow:        0 2pt 4pt rgba(0,0,0,0.06)

Author Row:
  Avatar:      32pt diameter
  Name:        14pt, weight 600, Slate-900
  Time:        14pt, weight 500, Slate-500

Title:
  Font:        17pt, weight 600, Slate-900
  Lines:       2 max
  Margin:      8pt bottom

Preview:
  Font:        14pt, weight 500, Slate-600
  Lines:       2 max
  Margin:      12pt bottom

Metrics Row:
  Font:        12pt, weight 500, Slate-600
  Icons:       16pt
  Spacing:     12pt between items
  Snap Icon:   Teal-600 when active
  Zap Icon:    Amber-500 when active
```

### 2.3 Argument Detail Screen

```
┌──────────────────────────────────────────┐
│ ← Back           Argument        •••     │
├──────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐ │
│ │ 👤 Dr. Sarah Chen                    │ │
│ │ Philosophy Professor · 2h ago        │ │
│ │                                      │ │
│ │ Position: FOR                        │ │
│ └──────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│                                          │
│ The problem of personal identity         │
│ across time presents us with one of      │
│ philosophy's most enduring puzzles.      │
│                                          │
│ Consider the Ship of Theseus: if we      │
│ replace every plank of a ship over       │
│ time, is it still the same ship?         │
│                                          │
│ [Continue reading full argument...]      │
│                                          │
├──────────────────────────────────────────┤
│ DEPTH ANALYSIS                           │
│ ┌──────────────────────────────────────┐ │
│ │ Overall Score: 78/100          🏆    │ │
│ │ ├── Read Time: 4.2 min    ████░ 80%  │ │
│ │ ├── Citations: 3          ███░░ 60%  │ │
│ │ ├── Engagement: High      █████ 95%  │ │
│ │ └── Expert Endorsed: Yes  ████░ 85%  │ │
│ └──────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│ ┌────────────────┐ ┌────────────────────┐│
│ │  👆 Snap (24)  │ │  ⚡ Zap (8)        ││
│ └────────────────┘ └────────────────────┘│
├──────────────────────────────────────────┤
│ [Tab Bar]                                │
└──────────────────────────────────────────┘
```

### 2.4 Argument Creation Screen

```
┌──────────────────────────────────────────┐
│ Cancel      New Argument          Info   │
├──────────────────────────────────────────┤
│ POSITION                                 │
│ ┌─────────────────┐ ┌──────────────────┐ │
│ │      FOR        │ │     AGAINST      │ │
│ │    (selected)   │ │                  │ │
│ └─────────────────┘ └──────────────────┘ │
├──────────────────────────────────────────┤
│ DISCUSSION                               │
│ ┌──────────────────────────────────────┐ │
│ │ Select a discussion...           ▼   │ │
│ └──────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│ YOUR ARGUMENT                            │
│ ┌──────────────────────────────────────┐ │
│ │                                      │ │
│ │ Write your argument here...          │ │
│ │                                      │ │
│ │                                      │ │
│ │                                      │ │
│ │                                      │ │
│ │                                      │ │
│ │                                      │ │
│ │                                      │ │
│ │                               234/5000│ │
│ └──────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│ [B] [I] [🔗] [❝] [•] [📎]               │
├──────────────────────────────────────────┤
│ ┌────────────────┐ ┌────────────────────┐│
│ │  Save Draft    │ │     Preview →      ││
│ └────────────────┘ └────────────────────┘│
└──────────────────────────────────────────┘
```

**Position Buttons:**
```
Layout:        Side-by-side, 50% width each
Height:        48pt
Margin:        16pt
Corner Radius: 10pt

Default State:
  Border:      1pt Slate-300
  Text:        16pt, weight 600, Slate-600

Selected State:
  Background:  Teal-500
  Text:        16pt, weight 600, White

Press Animation: Scale 0.95
```

**Text Editor:**
```
Min Height:    200pt
Padding:       16pt
Font:          16pt, weight 500
Line Height:   1.8
Placeholder:   "Write your argument here..." Slate-400
Border:        1pt Slate-300
Focus:         Teal-500 border
Character Count: Bottom right, Slate-500
```

**Formatting Toolbar:**
```
Height:        48pt
Background:    Slate-50
Icons:         Bold, Italic, Link, Quote, List, Attach
Icon Size:     24pt
Spacing:       32pt between icons
Active State:  Teal-600
```

### 2.5 Profile Screen

```
┌──────────────────────────────────────────┐
│ Profile                          ⚙️      │
├──────────────────────────────────────────┤
│         ┌──────────┐                     │
│         │   👤     │                     │
│         │  Avatar  │                     │
│         └──────────┘                     │
│         Dr. Sarah Chen                   │
│         @sarahchen · Joined Jan 2024     │
│                                          │
│         Philosophy Professor at MIT      │
│         Specializing in philosophy of    │
│         mind and consciousness           │
├──────────────────────────────────────────┤
│ ┌──────────┬──────────┬────────────────┐ │
│ │ 🔥 42    │ 📊 78    │ ✨ 1,247       │ │
│ │ Streak   │ Avg Depth│ Influence      │ │
│ └──────────┴──────────┴────────────────┘ │
├──────────────────────────────────────────┤
│ ACHIEVEMENTS                             │
│ [🏆][📚][💡][🌟][...]  →                 │
├──────────────────────────────────────────┤
│ [Arguments] [Debates Won] [Saved]        │
├──────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐ │
│ │ Argument Card 1                      │ │
│ └──────────────────────────────────────┘ │
│ ┌──────────────────────────────────────┐ │
│ │ Argument Card 2                      │ │
│ └──────────────────────────────────────┘ │
├──────────────────────────────────────────┤
│ [Tab Bar]                                │
└──────────────────────────────────────────┘
```

**Avatar:**
```
Size:          80pt diameter
Border:        3pt Teal-500 (if verified)
Placeholder:   Initials on Teal-100 background
```

**Stats Cards:**
```
Layout:        3-column grid
Height:        80pt
Background:    Gradient Stone-50 → White
Corner Radius: 12pt
Border:        1pt Slate-200

Value:         28pt, weight 900
Label:         12pt, weight 500, Slate-600
```

**Achievement Badges:**
```
Layout:        Horizontal scroll
Badge Size:    48pt diameter
Spacing:       12pt
Background:    Varies by achievement
Border:        2pt White
Shadow:        0 2pt 4pt rgba(0,0,0,0.1)
```

---

## 3. Mobile Components

### 3.1 ArgumentCard

**Collapsed State:**
```
┌────────────────────────────────────────┐
│ 👤  Author Name           2h · ⋮      │
│                                        │
│ First two lines of the argument        │
│ text with ellipsis if longer...        │
│                                        │
│ 👆 24   ⚡ 8   📊 72                    │
└────────────────────────────────────────┘

Height:        120-140pt
Tap Action:    Expand to full
```

**Expanded State:**
```
┌────────────────────────────────────────┐
│ 👤  Author Name                        │
│     Philosophy Professor · 2h · ⋮      │
│                                        │
│ Full argument text displayed with      │
│ proper line height and formatting.     │
│ This can be multiple paragraphs        │
│ with proper spacing between them.      │
│                                        │
│ Citations and references appear        │
│ inline with proper formatting.         │
│                                        │
│ ┌────────────────────────────────────┐ │
│ │ DEPTH SCORE: 78                    │ │
│ │ Read time: 4.2 min | Citations: 3  │ │
│ └────────────────────────────────────┘ │
│                                        │
│ ┌────────────┐  ┌────────────────────┐ │
│ │ 👆 Snap 24 │  │ ⚡ Zap 8           │ │
│ └────────────┘  └────────────────────┘ │
│                                        │
│ 💬 12 Comments                    ▼    │
└────────────────────────────────────────┘

Height:        Variable (content-based)
Animation:     Spring expand (300ms)
```

### 3.2 DepthScore Component

**Compact Badge:**
```
┌─────────────────┐
│ 📊 78           │
└─────────────────┘

Height:        28pt
Background:    Teal-50
Border:        1pt Teal-200
Text:          14pt, weight 600, Teal-700
Tap Action:    Expand to breakdown
```

**Expanded Breakdown:**
```
┌────────────────────────────────────────┐
│ DEPTH ANALYSIS                    ✕    │
├────────────────────────────────────────┤
│ Overall Score                          │
│ ████████████████████░░░░  78/100       │
├────────────────────────────────────────┤
│ 📖 Read Time                           │
│ ████████████████░░░░░░░░  4.2 min      │
│                                        │
│ 📚 Citations                           │
│ ████████████░░░░░░░░░░░░  3 sources    │
│                                        │
│ 💬 Engagement                          │
│ ██████████████████████░░  High         │
│                                        │
│ 🎓 Expert Endorsed                     │
│ ████████████████████░░░░  Yes          │
└────────────────────────────────────────┘

Animation:     Counter 0 → value (500ms)
Progress Bars: Animated fill (400ms)
```

### 3.3 StreakDisplay Component

**Compact:**
```
┌─────────────────┐
│ 🔥 5 days       │
└─────────────────┘

Height:        32pt
Background:    Varies by streak length
  30+ days:    Orange-50
  14-29:       Amber-50
  7-13:        Yellow-50
  3-6:         Teal-50
  1-2:         Slate-50
```

**Detailed Card:**
```
┌────────────────────────────────────────┐
│ 🔥 CURRENT STREAK: 42 DAYS             │
├────────────────────────────────────────┤
│ "Incredible consistency! You're in     │
│ the top 5% of all philosophers."       │
├────────────────────────────────────────┤
│ [M][T][W][T][F][S][S]  This week: ✓✓✓  │
├────────────────────────────────────────┤
│ 🛡️ Streak Protection: 2 remaining      │
│                                        │
│ [   Protect Today's Streak   ]         │
└────────────────────────────────────────┘
```

### 3.4 Snap/Zap Vote Buttons

**Snap Button:**
```
┌──────────────────┐
│     👆           │
│   Snap (24)      │
└──────────────────┘

Default:
  Background:    White
  Border:        1pt Slate-200
  Text:          Slate-600

Active (Voted):
  Background:    Teal-50
  Border:        1pt Teal-300
  Text:          Teal-700
  Icon:          Filled

Interaction:
  Double-tap:    Quick vote
  Single-tap:    Vote with animation

Animation:
  Scale:         1.0 → 1.2 → 1.0 (spring)
  Particles:     Teal sparkles upward
  Haptic:        Light impact + success
```

**Zap Button:**
```
┌──────────────────┐
│     ⚡           │
│   Zap (8)        │
└──────────────────┘

Default:
  Background:    White
  Border:        1pt Slate-200
  Text:          Slate-600

Active (Voted):
  Background:    Amber-50
  Border:        1pt Amber-300
  Text:          Amber-700

Interaction:
  Swipe-left:    Reveal zap options
  Long-press:    Context menu

Animation:
  Lightning:     Brief flash effect
  Haptic:        Medium impact
```

### 3.5 PhilosophyKeyboard (Quick Templates)

```
┌────────────────────────────────────────┐
│ QUICK ARGUMENT STARTERS                │
├────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────────┐  │
│ │ Counterpoint │ │ Building on...   │  │
│ └──────────────┘ └──────────────────┘  │
│ ┌──────────────┐ ┌──────────────────┐  │
│ │ Evidence     │ │ Thought exp.     │  │
│ └──────────────┘ └──────────────────┘  │
│ ┌──────────────┐ ┌──────────────────┐  │
│ │ Definition   │ │ Clarification    │  │
│ └──────────────┘ └──────────────────┘  │
└────────────────────────────────────────┘

Trigger:       Accessory view above keyboard
Templates:
  Counterpoint:  "While I understand [X], consider that..."
  Building on:   "To extend this argument further..."
  Evidence:      "Research by [source] suggests..."
  Thought exp:   "Imagine a scenario where..."
  Definition:    "By [term], I mean specifically..."
  Clarification: "To clarify my position..."
```

---

## 4. Gesture Interaction Map

### 4.1 Primary Gestures

| Gesture | Location | Action | Feedback |
|---------|----------|--------|----------|
| **Single Tap** | Any card | Open detail | Opacity 0.7 → navigate |
| **Double Tap** | Argument card | Quick Snap | Haptic + particle animation |
| **Swipe Left** | Argument card | Reveal Zap button | 100pt reveal with spring |
| **Swipe Right** | Any screen | Go back | Standard iOS back |
| **Pull Down** | List screens | Refresh | 60pt trigger, spinner |
| **Long Press** | Any content | Context menu | 500ms, haptic + menu |
| **Pinch** | Argument text | Zoom text | Persist zoom level |
| **3-Finger Tap** | Anywhere | Toggle dark mode | System preference |

### 4.2 Gesture Flow Diagrams

**Snap Vote Flow:**
```
User double-taps argument
        ↓
Haptic: Light impact
        ↓
Icon scales 1.0 → 1.2 (100ms)
        ↓
Particle animation (teal sparkles)
        ↓
Counter increments (+1)
        ↓
Icon settles 1.2 → 1.0 (200ms spring)
        ↓
Haptic: Success notification
        ↓
API call (optimistic update)
```

**Zap Vote Flow:**
```
User swipes left on argument
        ↓
Card slides, reveals Zap button (100pt)
        ↓
User taps Zap button
        ↓
Haptic: Medium impact
        ↓
Lightning flash animation (150ms)
        ↓
Show reason picker:
  • Needs more evidence
  • Logical fallacy
  • Off topic
  • Other
        ↓
User selects reason
        ↓
Counter increments (+1)
        ↓
Card slides back (300ms spring)
        ↓
API call with reason
```

**Pull-to-Refresh Flow:**
```
User pulls down on list
        ↓
Distance < 60pt: Show pull indicator
        ↓
Distance >= 60pt: Trigger refresh
        ↓
Haptic: Light impact
        ↓
Spinner appears, list reloads
        ↓
New data arrives (or timeout 10s)
        ↓
Spinner hides (500ms fade)
        ↓
List scrolls to top if new content
```

### 4.3 Gesture Conflict Resolution

| Situation | Priority | Resolution |
|-----------|----------|------------|
| Swipe left vs scroll | Scroll wins | Horizontal swipe only if y-delta < 10pt |
| Double tap vs scroll | Double tap wins | 300ms window after first tap |
| Long press vs scroll | Long press wins | 500ms hold cancels scroll |
| Pull refresh vs scroll | Context-based | Only at scroll position 0 |

---

## 5. Typography & Colors

### 5.1 Typography Scale

| Usage | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Hero Title | 28pt | 900 (Black) | 1.2 |
| Section Header | 22pt | 700 (Bold) | 1.3 |
| Card Title | 17pt | 600 (Semibold) | 1.4 |
| Body | 16pt | 500 (Medium) | 1.8 |
| Caption | 14pt | 500 (Medium) | 1.5 |
| Label | 12pt | 500 (Medium) | 1.4 |
| Small | 11pt | 500 (Medium) | 1.3 |

**Font Family:** Plus Jakarta Sans (with SF Pro fallback)

### 5.2 Color Palette

**Primary (Teal):**
```
Teal-50:   #F0FDFA
Teal-100:  #CCFBF1
Teal-200:  #99F6E4
Teal-300:  #5EEAD4
Teal-400:  #2DD4BF
Teal-500:  #14B8A6  ← Primary actions
Teal-600:  #0D9488  ← Active states
Teal-700:  #0F766E
Teal-800:  #115E59
Teal-900:  #134E4A
```

**Neutral (Slate):**
```
Slate-50:   #F8FAFC
Slate-100:  #F1F5F9
Slate-200:  #E2E8F0  ← Borders
Slate-300:  #CBD5E1
Slate-400:  #94A3B8  ← Inactive icons
Slate-500:  #64748B  ← Secondary text
Slate-600:  #475569  ← Body text
Slate-700:  #334155
Slate-800:  #1E293B
Slate-900:  #0F172A  ← Headlines
Slate-950:  #020617  ← Dark mode bg
```

**Semantic:**
```
Success:   Emerald-500 (#10B981)
Warning:   Amber-500 (#F59E0B)
Error:     Rose-500 (#F43F5E)
Info:      Sky-500 (#0EA5E9)
```

### 5.3 Dark Mode Palette

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | White | Slate-950 |
| Card Background | White | Slate-900 |
| Primary Text | Slate-900 | Slate-100 |
| Secondary Text | Slate-600 | Slate-400 |
| Border | Slate-200 | Slate-800 |
| Primary Action | Teal-600 | Teal-500 |
| Tab Bar | White/80 blur | Slate-900/80 blur |

---

## 6. Accessibility Requirements

### 6.1 Touch Targets

- **Minimum Size:** 44x44pt for all interactive elements
- **Spacing:** 8pt minimum between touch targets
- **Hit Area Extension:** Invisible padding where needed

### 6.2 VoiceOver Support

**Every element must have:**
- `accessibilityLabel` - What it is
- `accessibilityHint` - What happens when activated
- `accessibilityRole` - Button, link, header, etc.
- `accessibilityValue` - Current state (for toggles, scores)

**Example:**
```jsx
<Pressable
  accessibilityLabel="Snap vote for this argument"
  accessibilityHint="Double tap to express agreement"
  accessibilityRole="button"
  accessibilityValue={{ text: "24 snaps" }}
>
```

### 6.3 Dynamic Type Support

| Base Size | Minimum Scale | Maximum Scale |
|-----------|---------------|---------------|
| 11pt | 11pt (100%) | 22pt (200%) |
| 14pt | 14pt (100%) | 28pt (200%) |
| 16pt | 16pt (100%) | 32pt (200%) |
| 17pt | 17pt (100%) | 34pt (200%) |
| 28pt | 28pt (100%) | 44pt (156%) |

### 6.4 Color Contrast

- **Normal Text:** 4.5:1 minimum (WCAG AA)
- **Large Text (18pt+):** 3:1 minimum
- **UI Components:** 3:1 minimum
- **Focus Indicators:** Clearly visible ring (2pt Teal)

### 6.5 Motion & Animation

- Respect `UIAccessibility.isReduceMotionEnabled`
- Provide instant alternatives for animated transitions
- No auto-playing animations longer than 5 seconds

---

## 7. Screen Flow Diagrams

### 7.1 User Journey: First-Time User

```
App Launch
    ↓
Splash Screen (2s)
    ↓
Onboarding (3 screens)
    ├── Screen 1: "Welcome to WONDER"
    ├── Screen 2: "Snap & Zap"
    └── Screen 3: "Build Your Depth"
    ↓
Login/Signup
    ├── Email Signup → Verify Email → Profile Setup
    ├── Apple Sign In → Profile Setup
    └── Login → Home
    ↓
Home Screen (Daily Question)
    ↓
Prompted: "Join Today's Discussion?"
    ↓
First Argument Submission
    ↓
Achievement Unlocked: "First Philosopher"
```

### 7.2 User Journey: Daily Engagement

```
Push Notification: "Today's Question"
    ↓
App Opens → Home Screen
    ↓
View Daily Question
    ↓
[Branch A]               [Branch B]
Read Arguments           Join Discussion
    ↓                        ↓
Snap/Zap Votes          Write Argument
    ↓                        ↓
View Depth Scores       Preview & Publish
    ↓                        ↓
Save to Vault           Receive Votes
    ↓                        ↓
Check Streak            Check Depth Score
```

### 7.3 Information Architecture

```
WONDER App
├── Home (Tab 1)
│   ├── Daily Question
│   ├── User Stats
│   ├── Recent Discussions
│   └── Search
│
├── Posts (Tab 2)
│   ├── All Discussions
│   ├── Filter by Topic
│   ├── Sort Options
│   └── Discussion Detail
│       ├── Arguments List
│       ├── Argument Detail
│       └── Author Profile
│
├── Write (Tab 3)
│   ├── Mode Selection
│   ├── Position Choice
│   ├── Topic Selection
│   ├── Argument Editor
│   └── Preview & Publish
│
├── Vault (Tab 4)
│   ├── Saved Arguments
│   ├── My Drafts
│   ├── Folders
│   └── Export
│
└── Profile (Tab 5)
    ├── User Info
    ├── Stats & Achievements
    ├── My Arguments
    ├── Debates Won
    └── Settings
        ├── Account
        ├── Notifications
        ├── Appearance
        ├── Privacy
        └── About
```

---

## Appendix: Design Tokens (Code)

```typescript
// src/styles/theme.ts

export const colors = {
  primary: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
  },
  slate: {
    50: '#F8FAFC',
    200: '#E2E8F0',
    400: '#94A3B8',
    600: '#475569',
    900: '#0F172A',
    950: '#020617',
  },
  // ... rest of palette
};

export const typography = {
  hero: { fontSize: 28, fontWeight: '900', lineHeight: 33.6 },
  section: { fontSize: 22, fontWeight: '700', lineHeight: 28.6 },
  cardTitle: { fontSize: 17, fontWeight: '600', lineHeight: 23.8 },
  body: { fontSize: 16, fontWeight: '500', lineHeight: 28.8 },
  caption: { fontSize: 14, fontWeight: '500', lineHeight: 21 },
  label: { fontSize: 12, fontWeight: '500', lineHeight: 16.8 },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};
```

---

**Document Version:** 1.0
**Last Updated:** November 21, 2025
**Design System:** WONDER iOS
