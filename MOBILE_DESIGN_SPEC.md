# WONDER iOS App: Mobile Design Specifications

**Design Phase:** Mobile-First Transformation
**Target Audience:** Intellectual Adults 25-45
**Platform:** iOS 16+ (native Swift/SwiftUI or React Native)
**Design System:** WONDER Design System (Teal primary, Slate text, Plus Jakarta Sans)

---

## Executive Summary

WONDER transforms philosophical discourse from web to mobile. The iOS design prioritizes:
- **Deep Reading Experience**: Optimized typography and spacing for long-form philosophical text
- **Gesture-First Interaction**: Snap/Zap, swipe navigation, pull-to-refresh
- **Engagement Metrics**: Depth Score, Streaks, and Influence visible at a glance
- **Bottom Tab Navigation**: 5-tab architecture for rapid context switching
- **Dark Mode**: Essential for evening philosophical reading sessions

---

## 1. NAVIGATION ARCHITECTURE

### 1.1 Bottom Tab Bar (5 Tabs)

**Tab Structure & Order:**

```
┌─────────────────────────────────────┐
│                                     │
│          Main Content Area          │
│                                     │
├─────────────────────────────────────┤
│ 🏠    💬    ✍️    📚    👤         │
│ Home  Post  Write Vault  Profile   │
└─────────────────────────────────────┘
```

**Specifications:**
- Height: 49pt (standard iOS safe area)
- Background: White/80% opacity with blur effect (UIBlurEffect.light)
- Active indicator: Teal-600 (primary color) with filled icon
- Inactive: Slate-400 with outlined icon
- Spacing between tabs: Equally distributed with 20pt margins
- Font: Plus Jakarta Sans, 11pt, Medium (font weight 500)
- Icon size: 24x24pt (SF Symbols or custom)

**Tab Details:**

| Tab | Icon | Label | Screen | Default State |
|-----|------|-------|--------|----------------|
| 1 | Home icon | Home | Daily Question + Feed | Active on launch |
| 2 | Comment icon | Posts | Discussion Listing | Scroll position preserved |
| 3 | Pencil icon | Write | Argument Submission | Clean form state |
| 4 | Book icon | Vault | Saved Arguments | Empty state if none |
| 5 | Person icon | Profile | User Stats + Settings | Current user data |

---

### 1.2 Stack Navigation (Screen Hierarchy)

**Home Tab Navigation Stack:**
```
Home (Root)
├── Daily Question Detail
├── Discussion List (by quadrant filter)
├── Discussion Detail
│   ├── Argument Detail
│   └── Author Profile (modal)
└── Search/Filter (sheet)
```

**Posts Tab Navigation Stack:**
```
All Posts (Root)
├── Post Detail
├── Author Profile (modal)
├── Comments Thread
└── Filter/Sort (sheet)
```

**Write Tab Navigation Stack:**
```
Create Argument (Root, sheet)
├── Quadrant Selector
├── Topic/Position Selection
├── Argument Editor (fullscreen)
├── Template Selector (modal)
└── Publish Preview (modal)
```

**Navigation Patterns:**
- **Push**: Use for drill-down into details (Post → Comments)
- **Modal Sheet**: Use for creation flows and settings
- **Modal (Full Screen)**: Use for fullscreen editing and templates
- **Popover**: Use for quick actions and filters (iPad considerations)

---

### 1.3 Gesture Patterns & Interactions

**Primary Gestures:**

| Gesture | Action | Context | Feedback |
|---------|--------|---------|----------|
| Tap | Open discussion/post | Feed cards | Haptic light impact |
| Double-tap | Quick Snap vote | Argument card | Haptic success + animation |
| Swipe left | Reveal Zap button | Argument card | Reveal with spring animation |
| Swipe right | Go back | Screen navigation | Standard back navigation |
| Swipe down | Pull-to-refresh | Feed/listing | Loading spinner + haptic |
| Long-press | Quick actions menu | Post/argument | Context menu (50x contextual) |
| Pinch-zoom | Increase text size | Reading view | Persist zoom level per session |
| 3-finger tap | Toggle dark mode | Global | System-level preference |

**Haptic Feedback Mapping:**

```
Snap Vote (positive):    UIImpactFeedback(style: .light) + Pattern.success
Zap Vote (debate spark): UIImpactFeedback(style: .medium) + Pattern.warning
Publish argument:        UIImpactFeedback(style: .heavy) + Pattern.success
Streak protected:        UINotificationFeedback(type: .success)
Daily streak broken:     UINotificationFeedback(type: .warning)
```

**Pull-to-Refresh:**
- Trigger distance: 60pt from top
- Loading state: 200ms
- Refresh animation: Spring curve (stiffness: 200, damping: 15)
- Auto-dismiss: 500ms after completion

---

### 1.4 Deep Linking Strategy

**URL Scheme:** `wonder://`

**Deep Link Patterns:**

```
wonder://post/{postId}
wonder://discussion/{discussionId}
wonder://profile/{userId}
wonder://user/{username}
wonder://leaderboard
wonder://vault
wonder://argument/{argumentId}
wonder://search?q={query}&quadrant={quadrant}
wonder://onboarding/start
wonder://settings
```

**Fallback Behavior:**
- Invalid links → Home tab
- Missing auth → Show login sheet
- Expired content → Show "Content Removed" state
- Deep link + cold start → Show splash, then navigate

---

## 2. CORE SCREEN DESIGNS

### 2.1 Daily Question Screen (Home Tab)

**Screen Layout:**

```
┌──────────────────────────────────────┐
│ Status Bar (Dark, system icons)      │
├──────────────────────────────────────┤
│ Welcome header                       │
├──────────────────────────────────────┤
│ ✨ TODAY'S QUESTION (Badge)         │
│ ┌─────────────────────────────────┐ │
│ │ Question Title (Bold, Large)    │ │
│ │                                 │ │
│ │ Question description/context    │ │
│ │ (Medium gray, readable)         │ │
│ │                                 │ │
│ │ [Join the Conversation] (CTA)   │ │
│ └─────────────────────────────────┘ │
├──────────────────────────────────────┤
│ 📊 YOUR STATS                        │
│ ┌─────────┬─────────┬─────────────┐ │
│ │ Streak  │ Influence│ Depth Avg   │ │
│ │ 5 🔥    │ 128 ✨   │ 72 pts      │ │
│ └─────────┴─────────┴─────────────┘ │
├──────────────────────────────────────┤
│ RECENT DISCUSSIONS                   │
│ ┌─────────────────────────────────┐ │
│ │ Discussion Card (Scrollable)    │ │
│ │ • Title (2 lines max)           │ │
│ │ • 3 participants, 12 comments   │ │
│ │ • Depth: 65 | Activity: High    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [Next Discussion Card]          │ │
│ └─────────────────────────────────┘ │
├──────────────────────────────────────┤
│ [Tab Bar]                            │
└──────────────────────────────────────┘
```

**Specifications:**

**Status Bar:** 
- Dark content (system icons/text in black)
- Background: Transparent, blends with navigation bar

**Welcome Header (44pt height):**
```
Margins:  16pt left/right, 12pt top/bottom
Title:    "Welcome back, thinker" (24pt, black, font-weight: 900)
Subtitle: "Jump into today's most compelling discussions" (16pt, slate-600)
```

**Today's Question Card:**
```
Margins:       16pt from edges
Corner radius: 16pt
Padding:       20pt internal
Border:        1pt, slate-200
Shadow:        0 2pt 8pt rgba(0,0,0,0.08)
Background:    White
```

**Question Badge (Today's Question):**
```
Size:          Pills shape
Padding:       6pt vertical, 12pt horizontal
Background:    Teal-50
Border:        1pt, teal-200
Icon + text:   ✨ TODAY'S QUESTION
Font:          11pt, bold, teal-700
Margin-bottom: 12pt
```

**Question Title:**
```
Font:       28pt, Plus Jakarta Sans, weight: 900
Color:      Slate-900
Line height: 1.2
Margin-bottom: 12pt
Max lines:  3 (truncate with ellipsis)
```

**Question Description:**
```
Font:       16pt, Plus Jakarta Sans, weight: 500
Color:      Slate-600
Line height: 1.6
Margin-bottom: 16pt
Max lines:  4
```

**CTA Button (Join Conversation):**
```
Width:         Full (- 40pt margins)
Height:        48pt
Padding:       12pt 16pt
Background:    Teal-600 (active), teal-700 (pressed)
Text:          "Join the Conversation →" (16pt, white, bold)
Corner radius: 12pt
Shadow:        0 4pt 12pt rgba(20,184,166,0.3)
Animation:     Scale 0.95 on press (haptic: light)
```

**Stats Grid (Your Stats):**
```
Layout:        3-column grid
Item height:   80pt
Spacing:       12pt between items
Border:        1pt, slate-200
Background:    Stone-50/white gradient
Corner radius: 12pt

Card content:
  Font-size:   28pt (stat value), 12pt (label)
  Weight:      900 (stat), 500 (label)
  Icon:        20pt above stat
  Vertical stack alignment
```

**Discussion Card (Recurring Item):**
```
Height:        ~140pt (expanded with scroll)
Margin:        12pt horizontal, 8pt vertical
Padding:       16pt
Border radius: 12pt
Border:        1pt, slate-200
Shadow:        0 2pt 6pt rgba(0,0,0,0.08)
Hover:         Scale 1.02, shadow increase

Title area:
  Font:        18pt, weight: 700
  Color:       Slate-900
  Lines:       2 max

Metadata row:
  Font:        13pt, slate-600, weight: 500
  Icons:       14pt, slate-400
  Spacing:     8pt between items

Depth indicator:
  Position:    Right side, top
  Format:      "Depth: 65" in teal-600
  Icon:        TrendingUp (14pt)
```

---

### 2.2 Discussion/Post Listing Screen

**Screen Layout:**

```
┌──────────────────────────────────────┐
│ Navigation Bar (Sticky)              │
├──────────────────────────────────────┤
│ Segmented Control (Filter):          │
│ [All] [Philosophy] [Ethics] [AI]...  │
├──────────────────────────────────────┤
│ Search Bar (Sticky)                  │
│ 🔍 Search discussions...            │
├──────────────────────────────────────┤
│ SORTING: Most Recent ⬇️              │
├──────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Discussion Card                 │ │
│ │ • Snap: 24 | Zap: 8            │ │
│ │ • 3 participants | Depth: 72    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [More Cards...]                 │ │
│ └─────────────────────────────────┘ │
├──────────────────────────────────────┤
│ [Tab Bar]                            │
└──────────────────────────────────────┘
```

**Key Elements:**

**Navigation Bar (56pt):**
```
Title:    "All Discussions" (18pt, bold)
Trailing: Filter icon (Settings, Sheet)
          Sort icon (Popover: Recent/Trending/Oldest)
Background: White/80, blur
```

**Segmented Control (Quadrant Filter):**
```
Height:      40pt
Margin:      16pt horizontal, 8pt vertical
Segments:    All | Philosophy | Ethics | AI | Economics
Style:       Custom (not native UISegmentedControl)
              Background: Slate-100
              Selected: Teal-600 + white text
              Border radius: 8pt per segment
Font:        13pt, weight: 600
```

**Search Bar:**
```
Height:     40pt
Margin:     16pt
Padding:    10pt (left/right)
Icon:       🔍 (slate-400)
Placeholder: "Search discussions..." (slate-500)
Border:     1pt, slate-200
Focus:      Teal-500 border, ring-2 teal-100
```

**Sort Dropdown:**
```
Default: Most Recent
Options: Most Recent | Trending | Most Depth | Oldest
Trigger: Text "SORTING: ..." + chevron down
Style:   Action sheet on iOS 13+
```

**Discussion Card (In List):**
```
Height:        130-160pt (depends on description length)
Margin:        12pt, 16pt
Padding:       16pt
Border:        1pt, slate-200
Corner radius: 12pt
Background:    White
Shadow:        Light (0 2pt 4pt rgba(0,0,0,0.06))

Title:
  Font:        17pt, weight: 600
  Color:       Slate-900
  Lines:       2 max
  Margin:      0 0 8pt 0

Description:
  Font:        14pt, weight: 500
  Color:       Slate-600
  Lines:       2 max
  Margin:      0 0 12pt 0

Metadata Row:
  Snap/Zap:    Icons + counts (teal/slate icons)
  Participants: People icon + count
  Depth:       TrendingUp + score (teal-600)
  Font:        12pt, weight: 500, slate-600
  Spacing:     12pt between items

Tap Target:
  Active area: Entire card
  Feedback:    Opacity fade on press
```

---

### 2.3 Argument Submission Screen (Write Tab)

**Screen Hierarchy:**

```
Screen 1: Choose Mode
├── Create New Argument
├── Continue Draft
└── Use Template

Screen 2: Argument Editor
├── Topic/Discussion selector
├── Position (For/Against)
├── Rich text editor
├── Add citations
└── Add media (links)

Screen 3: Publish Preview
├── Argument preview
├── Depth score estimate
└── Publish CTA
```

**Full-Screen Editor Layout:**

```
┌──────────────────────────────────────┐
│ [Close] Argument                     │
├──────────────────────────────────────┤
│ Position: [For] [Against] (buttons) │
├──────────────────────────────────────┤
│ Discussion: [Select...] ▼            │
├──────────────────────────────────────┤
│ [Rich Text Editor Area]              │
│ ┌─────────────────────────────────┐ │
│ │ Write your argument here...     │ │
│ │                                 │ │
│ │                                 │ │
│ │ Word count: 234 / 5000          │ │
│ └─────────────────────────────────┘ │
├──────────────────────────────────────┤
│ Formatting toolbar (sticky):         │
│ [B] [I] [Link] [Quote] [List]       │
├──────────────────────────────────────┤
│ [Save Draft] [Preview]               │
└──────────────────────────────────────┘
```

**Specifications:**

**Header (Close + Title):**
```
Height:         56pt (safe area)
Left:           Close button (text, slate-600)
Center:         "New Argument" (18pt, bold)
Right:          Info icon (help)
Background:     White/blur
Sticky:         Always visible on scroll
```

**Position Selection Buttons:**
```
Layout:        Two buttons, side-by-side
Height:        48pt
Margin:        16pt
Padding:       12pt
Border radius: 10pt
States:
  Default:     Border 1pt slate-300, slate-600 text
  Selected:    Background teal-500, white text
  Pressed:     Scale 0.95
Font:          16pt, weight: 600
```

**Discussion Selector (Dropdown):**
```
Height:        48pt
Margin:        16pt
Padding:       12pt
Border:        1pt, slate-300
Placeholder:   "Select discussion..." (slate-500)
Value display: Discussion title + subtitle (created_at)
Focus:         Teal border + ring
Tap:           Show actionsheet with list
```

**Rich Text Editor:**
```
Min height:    200pt
Max height:    Flexible (grows with content)
Padding:       16pt
Font:          16pt, Plus Jakarta Sans, weight: 500
Line height:   1.6
Color:         Slate-900
Placeholder:   "Write your argument here..." (slate-400)
Placeholder-opacity: 0.5

Cursor:        Teal-600
Selection:     Teal-100 background

Text formatting supports:
  - Bold (⌘B)
  - Italic (⌘I)
  - Blockquote (⌘Shift+Q)
  - Lists (bullet/numbered)
  - Links (⌘K)
  - Code blocks (triple backticks)
```

**Word Count Indicator:**
```
Position:      Bottom-right of editor
Font:          11pt, slate-500, weight: 500
Format:        "234 / 5000"
Color coding:
  0-2000:      Slate-500 (normal)
  2000-4500:   Slate-600 (good)
  4500+:       Orange-500 (warning)
  5000+:       Red-500 (error, prevent input)
```

**Formatting Toolbar (Sticky on Scroll):**
```
Height:        44pt
Background:    Slate-50/blur
Border-top:    1pt, slate-200
Layout:        Horizontal scroll, left margin 16pt

Buttons:
  Bold [B]:     16pt, weight: 700
  Italic [I]:   16pt, weight: 400 (slanted)
  Link [🔗]:    System icon
  Quote [❝]:    Custom icon
  List [≡]:     System icon
  Code [<>]:    System icon
  Undo [←]:     System icon (disabled by default)

Size:          All 44pt height, 36pt width
Spacing:       8pt between items
Active state:  Teal-600 background, white icon
```

**Action Buttons (Bottom):**
```
Layout:        Two buttons, full width, stacked
Height:        48pt each
Margin:        16pt
Corner radius: 12pt

Save Draft:
  Background:  Slate-100
  Text:        "Save Draft" (slate-700)
  Font:        16pt, weight: 600

Preview (Primary):
  Background:  Teal-600
  Text:        "Preview & Publish" (white)
  Font:        16pt, weight: 600
  Shadow:      0 4pt 12pt rgba(20,184,166,0.3)
```

---

### 2.4 Profile Screen

**Screen Layout:**

```
┌──────────────────────────────────────┐
│ Header: Profile                      │
├──────────────────────────────────────┤
│ Avatar (circle, 80pt)                │
│ Username                             │
│ [Edit Profile] Button                │
├──────────────────────────────────────┤
│ STATS GRID (3 items):                │
│ ┌────────┬────────┬────────┐        │
│ │ Score  │ Streak │ Topics │        │
│ │ 425    │ 5 🔥   │ 12     │        │
│ └────────┴────────┴────────┘        │
├──────────────────────────────────────┤
│ ACHIEVEMENTS/BADGES                  │
│ [Badge] [Badge] [Badge]              │
├──────────────────────────────────────┤
│ RECENT ACTIVITY                      │
│ • Posted argument in "Free Will"    │
│ • Received 3 Snaps                  │
│ • Streak milestone: 5 days          │
├──────────────────────────────────────┤
│ SETTINGS & ACCOUNT                   │
│ Notifications > Appearance >         │
│ Privacy > Account > Sign Out         │
├──────────────────────────────────────┤
│ [Tab Bar]                            │
└──────────────────────────────────────┘
```

**Specifications:**

**Profile Header:**
```
Height:        200pt
Background:    Gradient (stone-50 to white)
Padding:       20pt
Alignment:     Center

Avatar:
  Size:        80x80pt
  Shape:       Circle
  Background:  Teal-100
  Icon/initials: 32pt, teal-600
  Shadow:      0 2pt 8pt rgba(0,0,0,0.1)

Username:
  Font:        24pt, weight: 900
  Color:       Slate-900
  Margin-top:  12pt

Tagline (optional):
  Font:        14pt, weight: 500
  Color:       Slate-600
  Margin-top:  4pt

Edit Button:
  Height:      40pt
  Padding:     10pt 20pt
  Border:      1pt, slate-300
  Text:        "Edit Profile" (14pt, slate-700)
  Margin-top:  12pt
```

**Stats Grid:**
```
Layout:        3 columns, equal width
Height:        100pt per cell
Margin:        16pt
Spacing:       12pt between cells
Background:    White
Border:        1pt, slate-200
Corner radius: 12pt
Padding:       12pt

Card items (stacked):
  Stat value:  24pt, weight: 900, teal-600
  Label:       12pt, weight: 500, slate-600
  Icon:        18pt, teal-400 (optional)
  Spacing:     8pt between elements
```

**Achievements/Badges:**
```
Height:        80pt
Margin:        16pt
Padding:       12pt
Scroll:        Horizontal (infinite scroll)
Spacing:       8pt between badges

Badge item:
  Size:        60x60pt
  Shape:       Circle with border (2pt, gold)
  Icon:        36pt (gold)
  Label:       10pt below circle
  Shadow:      0 2pt 4pt rgba(0,0,0,0.1)

Possible badges:
  🔥 Streak (5+, 10+, 30+ days)
  ⭐ Expert (100+ influence)
   📚 Scholar (50+ arguments)
  💎 Trusted (high depth avg)
  🎯 Focused (many in one quadrant)
```

**Recent Activity:**
```
Title:         "RECENT ACTIVITY" (12pt, bold, slate-700)
Margin:        16pt
Spacing:       0 (stacked items)

Activity items:
  Format:      "• [Action] in '[Topic]'"
  Font:        14pt, weight: 500, slate-700
  Icon:        16pt, left-aligned
  Padding:     8pt vertical
  Divider:     1pt, slate-100 between items
  Tap target:  Opens relevant screen
  Max items:   5 shown (see all link)
```

**Settings Menu:**
```
Section title: "SETTINGS & ACCOUNT" (12pt, bold)
Margin:        16pt
Items:         Full-width rows

Menu rows:
  Height:      48pt
  Padding:     16pt
  Border-bottom: 1pt, slate-100
  Font:        16pt, weight: 500, slate-900
  Icon:        18pt, left
  Chevron:     Right side, slate-400
  Tap:         Navigate to sheet

Items:
  ⚙️ Notifications
  🎨 Appearance
  🔒 Privacy
  👤 Account
  📞 Help & Support
  ➡️ Sign Out (red text)
```

---

### 2.5 Vault Screen (Saved Arguments)

**Screen Layout:**

```
┌──────────────────────────────────────┐
│ Vault                                │
├──────────────────────────────────────┤
│ Organize by: [All] [Marked] [Topics] │
├──────────────────────────────────────┤
│ Search vault...                      │
├──────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Saved Argument Card             │ │
│ │ Topic: "Free Will"              │ │
│ │ Position: For                   │ │
│ │ Saved: 2 days ago              │ │
│ │ [More options: ⋯]               │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [More Cards...]                 │ │
│ └─────────────────────────────────┘ │
├──────────────────────────────────────┤
│ [Tab Bar]                            │
└──────────────────────────────────────┘
```

**Specifications:**

**Filter Segmented Control:**
```
Height:      40pt
Margin:      16pt
Segments:    All | Marked | By Topic
Style:       Teal-600 selected, slate-100 inactive
```

**Saved Argument Card:**
```
Height:        120pt
Margin:        12pt horizontal
Padding:       16pt
Border:        1pt, slate-200
Corner radius: 12pt
Background:    White
Shadow:        Light

Topic:
  Font:        13pt, weight: 600, teal-700
  Icon:        Bookmark-filled (teal-600)

Position Badge:
  Inline:      After topic
  Height:      24pt
  Padding:     4pt 8pt
  Border:      1pt, teal-300
  Background:  Teal-50
  Font:        11pt, weight: 600, teal-700
  Rounded:     4pt

Text preview:
  Font:        14pt, weight: 500, slate-700
  Lines:       2 max
  Margin-top:  8pt

Metadata:
  Font:        12pt, weight: 500, slate-500
  Format:      "Saved 2 days ago"
  Margin-top:  8pt

Actions (Long-press):
  Context menu with:
    - View Full Argument
    - Copy to New
    - Remove from Vault
    - Share

More button (⋯):
  Right-aligned
  Opens context menu on tap
```

---

## 3. MOBILE-SPECIFIC COMPONENTS

### 3.1 ArgumentCard (Mobile Collapsed/Expanded)

**Collapsed State (List View):**

```
┌─────────────────────────────────────┐
│ Author avatar (32pt)  Author name   │
│                       Position badge│
├─────────────────────────────────────┤
│ Argument preview (2 lines)          │
├─────────────────────────────────────┤
│ [Snap: 24] [Zap: 8] [Depth: 65]   │
│ [Expand ▼]                          │
└─────────────────────────────────────┘
```

**Specifications - Collapsed:**
```
Height:        120-140pt
Padding:       16pt
Border:        1pt, slate-200
Corner radius: 12pt
Background:    White/gradient

Header row:
  Avatar:      32x32pt circle, teal-100
  Name:        16pt, weight: 600, slate-900
  Position:    11pt, bold, teal-700 (For/Against badge)
  Spacing:     12pt between avatar and text

Preview:
  Font:        14pt, weight: 500, slate-700
  Lines:       2 max
  Margin:      8pt top
  Opacity:     Truncate with ellipsis

Metrics row:
  Layout:      Flex, space-around
  Icons:       16pt, slate-400/teal-600
  Counts:      14pt, weight: 600, slate-900
  Spacing:     20pt between metrics

Expand button:
  Icon:        Chevron down (slate-400)
  Position:    Bottom-right
  Tap:         Expand to full argument view
```

**Expanded State (Detail View):**

```
┌─────────────────────────────────────┐
│ [Back] Argument                     │
├─────────────────────────────────────┤
│ Author avatar (48pt)                │
│ Author name • Influence score       │
│ "For this position" • 2 days ago    │
├─────────────────────────────────────┤
│ Full argument text with formatting  │
│                                     │
│ [Links/citations displayed inline]  │
├─────────────────────────────────────┤
│ Depth Score: 72                     │
│ ├─ Read Time: 8 min                │
│ ├─ Citations: 3                    │
│ └─ View Changes: +5                │
├─────────────────────────────────────┤
│ [Snap: 24] [Zap: 8] [Share] [More] │
├─────────────────────────────────────┤
│ Comments (3)                        │
│ ┌─────────────────────────────────┐ │
│ │ Commenter: "Great point..."     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Specifications - Expanded:**
```
Header:
  Back:        Left side, slate-600
  Title:       "Argument" (18pt, bold)
  Close:       Right side (X) if modal

Author info:
  Avatar:      48x48pt, circle shadow
  Name:        16pt, weight: 600
  Influence:   13pt, slate-600 + ✨ icon
  Position:    13pt, weight: 600, teal-700 ("For this")
  Timestamp:   13pt, slate-500
  Spacing:     12pt between elements
  Layout:      Avatar left, text right-aligned

Argument text:
  Font:        16pt, Plus Jakarta Sans, weight: 500
  Line height: 1.8 (generous for reading)
  Color:       Slate-800
  Padding:     16pt
  Links:       Teal-600, underlined, tap to open
  Quotes:      Left border (3pt, teal-300)
  Code:        Monospace, slate-100 bg, 8pt padding
  Lists:       Bullets/numbers, 8pt indent

Depth Score Card:
  Background:  Teal-50
  Border:      1pt, teal-200
  Padding:     16pt
  Corner radius: 12pt

  Score display:
    Font:      32pt, weight: 900, teal-600
    Label:     13pt, slate-600
    Left-aligned with icon

  Breakdown:
    Items:     Icon + label + value
    Font:      13pt, weight: 500, slate-700
    Icon:      16pt, slate-400
    Spacing:   12pt between items
    3-column layout

Action buttons:
  Height:     48pt
  Layout:     Horizontal scroll if more than 3
  Background: Slate-100 (inactive), teal-500 (active)
  Text:       14pt, weight: 600

Comments section:
  Title:      "Comments (3)" (16pt, bold)
  Margin:     16pt top
  Cards:      Indented, slate-50 bg
  Tap:        Show comment detail
```

---

### 3.2 DepthScore Visualization (Compact Mobile)

**Inline Badge:**
```
┌──────────────────┐
│ 📈 Depth: 72     │
│ Exceptional      │
└──────────────────┘
```

**Expandable Detail:**
```
┌──────────────────────────────────────┐
│ 📈 Depth Score: 72 [Exceptional]    │
├──────────────────────────────────────┤
│ ⏱️  Read Time:        8/25 pts       │
│ 📚 Citations:        5/20 pts       │
│ 💡 Changed Views:    18/30 pts      │
│ 🏆 Expert Endorse:   8/15 pts       │
├──────────────────────────────────────┤
│ Arguments ranked by depth, not hype  │
└──────────────────────────────────────┘
```

**Specifications:**

**Compact Badge:**
```
Size:           Inline, auto-sizing
Height:         28pt
Padding:        4pt 10pt
Background:     Score-based color:
                  80+: Amber-50
                  60-79: Teal-50
                  40-59: Blue-50
                  20-39: Slate-50
                  <20: Slate-100
Border:         1pt, matching color
Icon:           16pt, matching color
Text:           12pt, weight: 600, matching color
Font:           Plus Jakarta Sans
```

**Detailed Breakdown Card:**
```
Max width:      340pt (mobile), 480pt (tablet)
Padding:        16pt
Background:     Score-level based color
Border:         2pt, solid color
Corner radius:  12pt
Shadow:         0 4pt 12pt rgba(0,0,0,0.1)

Header:
  Icon:         TrendingUp (20pt)
  Title:        "Depth Score" (16pt, bold)
  Score:        32pt, weight: 900, right-aligned
  Level:        11pt, uppercase, weight: 600

Score items:
  Layout:       Stacked, full-width
  Height:       40pt per item
  Border:       1pt, divider color
  Icon:         16pt, left
  Label:        13pt, weight: 500, slate-700
  Bar:          Progress bar, 60% width
    - Height: 4pt
    - Background: Score-color-300
    - Border radius: 2pt
  Value:        14pt, weight: 600, right-aligned
  Padding:      12pt vertical

Footer:
  Font:         11pt, slate-600, weight: 500
  Text:         "Quality discourse > popularity"
```

---

### 3.3 Streak Display (Mobile Gamification)

**Compact Streak Badge (Header):**
```
┌──────────────────┐
│ 🔥 5 day streak  │
│ 🛡️ (protected)   │
└──────────────────┘
```

**Detailed Streak Card (Profile):**
```
┌──────────────────────────────────────┐
│ 🔥 5 Day Streak                      │
├──────────────────────────────────────┤
│ Your best: 12 days                   │
│                                      │
│ "One week milestone achieved! 👏"    │
│ Continue for 25 more → 1 month! 🎯   │
│                                      │
│ [Use Streak Shield] [Share]          │
└──────────────────────────────────────┘
```

**Specifications:**

**Compact Badge:**
```
Height:        32pt
Padding:       6pt 12pt
Background:    Streak-level color (see below)
Border:        1pt, matching
Corner radius: 8pt
Icon:          Flame (16pt)
Text:          Bold (13pt)
Shield icon:   Shield (14pt) if protected
Spacing:       4pt between flame and text

Streak color levels:
  30+ days:    Orange-50 text orange-600
  14-29 days:  Amber-50 text amber-600
  7-13 days:   Yellow-50 text yellow-600
  3-6 days:    Teal-50 text teal-600
  <3 days:     Slate-50 text slate-500
```

**Detailed Card:**
```
Max width:     Full (- 32pt margins)
Height:        180-240pt
Background:    Gradient (streak-color-50 to white)
Border:        2pt, solid streak color
Padding:       16pt
Corner radius: 12pt
Shadow:        0 4pt 12pt (streak-color, 0.2 opacity)

Header:
  Icon:        Flame (28pt)
  Title:       "5 Day Streak" (20pt, bold)
  Subtext:     Milestone messages
  Font-color:  Slate-900 + streak-color

Best streak:
  Format:      "Your best: 12 days"
  Font:        14pt, slate-600
  Icon:        Trophy (14pt, gold)

Motivational message:
  Font:        15pt, slate-700, italic
  Padding:     8pt
  Background:  Streak-color-100
  Corner:      8pt
  Examples:
    "One week milestone! 👏"
    "Incredible! A month of daily thinking 🔥"
    "Two weeks strong! Keep it up ✨"

Action buttons:
  Shield button: "Use Streak Shield" (48pt height)
    Background:  Teal-600
    Icon:        Shield (18pt)
  Share button:  "Share Achievement" (48pt height)
    Background:  Slate-100
    Icon:        Share (18pt)
  Spacing:       8pt between
  Font:          14pt, weight: 600
```

---

### 3.4 PhilosophyKeyboard (Quick Argument Templates)

**Activation:**
- Swipe up from bottom of argument editor
- Or tap "Templates" in formatting toolbar

**Template Sheet Layout:**

```
┌──────────────────────────────────────┐
│ ▾ Templates                          │
├──────────────────────────────────────┤
│ Argument structures:                 │
│ ┌────────────────────────────────┐  │
│ │ 📋 Counterargument             │  │
│ │ "While [X] argues, in fact..." │  │
│ │ [Use this template]             │  │
│ └────────────────────────────────┘  │
│ ┌────────────────────────────────┐  │
│ │ 🔬 Evidence-based              │  │
│ │ "Research shows..." "Studies..." │  │
│ └────────────────────────────────┘  │
│ ┌────────────────────────────────┐  │
│ │ 🎯 Thought Experiment          │  │
│ │ "Imagine if... Therefore..."   │  │
│ └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

**Available Templates:**

1. **Counterargument Structure**
   ```
   While [existing position] argues [their claim],
   in fact [your position] because [reasoning].
   
   [Evidence or example]
   ```

2. **Evidence-Based**
   ```
   Recent research demonstrates [finding].
   According to [source], [citation].
   This supports the position that [conclusion].
   ```

3. **Thought Experiment**
   ```
   Consider a scenario where [hypothetical].
   In this case, [consequence].
   Therefore, [implication for main argument].
   ```

4. **Philosophical Analysis**
   ```
   [Philosopher] argues that [claim].
   However, this overlooks [counterpoint].
   A more accurate understanding suggests [alternative].
   ```

5. **Pragmatic Perspective**
   ```
   In practical terms, [concrete example].
   This demonstrates that [principle].
   Consequently, we should [recommendation].
   ```

**Specifications:**

```
Sheet height:      ~70% screen (expandable)
Corner radius:     16pt top
Margin:            Safe area respected
Padding:           16pt
Background:        White
Divider:           1pt, slate-200 between templates

Template card:
  Height:         120pt
  Padding:        16pt
  Background:     Stone-50
  Border:         1pt, slate-200
  Corner radius:  12pt
  Margin-bottom:  12pt

  Icon:           28pt, teal-600
  Title:          16pt, weight: 600, slate-900
  Preview:        13pt, slate-600, 2 lines
  Use button:     14pt, weight: 600, teal-600
             Position: Bottom-right

Tap behavior:
  Inserts template text into editor
  Cursor positioned after first [bracket]
  User can customize before publishing
```

---

### 3.5 Floating Action Button Patterns

**Primary FAB (Write New Argument):**

```
Position: Bottom-right corner
        ┌────────┐
        │ ✍️     │
        └────────┘
  
  Size: 56x56pt (standard iOS)
  Shadow: 0 2pt 8pt rgba(0,0,0,0.2)
  Icon: Pencil (28pt, white)
  Background: Teal-600
  Pressed: Scale 0.95, shadow increase
```

**Specifications:**

```
Position:       Bottom-right
Offset:         16pt from edges (respects safe area)
Size:           56x56pt (minimum 44x44pt tap area)
Icon size:      28pt
Background:     Teal-600
Hover/active:   Teal-700, shadow 0 4pt 12pt
Pressed:        Scale 0.90
Corner radius:  50% (circle)
Animation:      Spring (stiffness: 350, damping: 40)

Secondary FABs (expanded):
  Layout:       Vertical stack above primary
  Spacing:      12pt between
  Size:         48x48pt
  Scale-in:     Stagger animation (60ms delay each)
  Options:
    📝 New post (primary)
    💬 Reply (secondary)
    💾 Draft (secondary)
    📎 Add link (secondary)

Label text:
  Font:         12pt, weight: 600
  Background:   Slate-900/80% opacity
  Text:         White
  Padding:      4pt 8pt
  Corner:       4pt
  Position:     Left of icon, 8pt spacing
  Appears on:   Hover or long-press
```

---

## 4. READING EXPERIENCE OPTIMIZATION

### 4.1 Typography Scale for Mobile

**Responsive Typography:**

```
Desktop (20pt+)          Mobile (390pt width)      Watch (170pt)
─────────────────────────────────────────────────────────────
H1: 7xl (56pt)          H1: 2xl (28pt)            —
H2: 6xl (48pt)          H2: xl (20pt)             —
H3: 5xl (40pt)          H3: lg (18pt)             Body (14pt)
H4: 4xl (36pt)          H4: base (16pt)           —
Body: 2xl (20pt)        Body: base (16pt)         Caption (11pt)
Small: lg (18pt)        Small: sm (14pt)
Caption: base (16pt)    Caption: xs (12pt)
Meta: sm (14pt)         Meta: xs (11pt)
```

**Leading (Line Height) Scale:**

| Element | Size | Line Height | Ratio |
|---------|------|-------------|-------|
| H1 | 28pt | 32pt | 1.2 |
| H2 | 20pt | 24pt | 1.2 |
| Body | 16pt | 24pt | 1.5 |
| Caption | 12pt | 18pt | 1.5 |
| Code | 14pt | 22pt | 1.57 |
| Quote | 17pt | 26pt | 1.53 |

**Reading Optimization:**

```
Ideal line length:     ~60-75 characters
Mobile container:      340-380pt width
Margin left/right:     16pt (creates ~55-60 char count)
Text measure:          Perfect at 16pt font size

Dynamic text sizing:
  - Default: 16pt body, 1.6 line height
  - +1 size: 17pt body, 1.65 line height
  - +2 size: 18pt body, 1.7 line height
  - +3 size: 19pt body, 1.75 line height
  (Max scaling: 140% of base)

Justified vs Ragged:
  - Justified: Too difficult for mobile readers
  - Ragged right: Default (natural word breaks)
  - Letter spacing: 0 (standard)
```

---

### 4.2 Dark Mode Implementation

**Dark Mode Color Palette:**

```
Element              Light Mode        Dark Mode
──────────────────────────────────────────────────
Background:          White             Slate-950
Secondary bg:        Stone-50          Slate-900
Text (primary):      Slate-900         Slate-50
Text (secondary):    Slate-600         Slate-400
Text (tertiary):     Slate-500         Slate-500
Borders:             Slate-200         Slate-800
Accent (teal):       Teal-600          Teal-400
Card background:     White             Slate-900
Shadow:              0 0 0 / 8%        0 0 0 / 20%
```

**Dark Mode Specification:**

```swift
// SwiftUI implementation
.preferredColorScheme(.dark)  // System default

// Color semantics
Color(.systemBackground)      // Platform-aware
UIColor(dynamicProvider: { traitCollection in
    return traitCollection.userInterfaceStyle == .dark ?
        UIColor(red: 0.1, green: 0.1, blue: 0.1, alpha: 1.0) :
        UIColor.white
})
```

**Specific Screen Dark Mode:**

**Home Tab (Dark):**
```
Background:      Slate-950 gradient
Card background: Slate-900
Text:            Slate-100 (primary), Slate-400 (secondary)
Teal accents:    Teal-400 (brighter in dark mode)
Shadows:         0 2pt 8pt rgba(0,0,0,0.4) (stronger)
Question card:   Slate-900 with teal-400 left border (3pt)
```

**Reading View (Dark):**
```
Background:      Slate-950
Text:            Slate-100 (reading body)
Quotes:          Slate-800 bg, slate-300 text
Code blocks:     Slate-800 bg, slate-200 text
Links:           Teal-400 (brighter for contrast)
Emphasis:        Gold-400 for highlighting
Selection:       Teal-500/30% opacity
```

**Transition Animation:**
```
Dark mode toggle:  300ms smooth transition
Curve:             EaseInOut
Trigger:           System setting OR manual toggle in settings
Persistent:        Save user preference to UserDefaults
```

---

### 4.3 Accessibility Requirements

**VoiceOver Support:**

```swift
// Semantic structure
.accessibility(label: Text("Snap vote button"))
.accessibility(hint: Text("Double tap to vote"))
.accessibility(value: Text("24 snaps"))
.accessibilityElement(children: .combine)  // Combine groups
.accessibilityElement(children: .ignore)    // Ignore internal structure
```

**Accessible Components:**

| Component | VoiceOver Label | Hint | Value |
|-----------|-----------------|------|-------|
| Snap button | "Snap" | "Double tap to agree" | "24 snaps" |
| Zap button | "Zap" | "Double tap to spark debate" | "8 zaps" |
| Argument card | "Argument" | "Double tap to expand" | "Author: John, 72 depth" |
| Depth score | "Depth score" | "Double tap for breakdown" | "72 points" |
| Streak | "Streak" | "Current streak" | "5 days" |

**Dynamic Type Support:**

```
App supports Dynamic Type scaling:
  xSmall (50% of default)
  Small (75%)
  Medium (100% - default)
  Large (125%)
  xLarge (150%)
  xxLarge (175%)
  xxxLarge (200%)

Font constraints:
  Minimum: 12pt
  Maximum: 28pt (body text scales proportionally)
  
Implementation:
  .font(.system(size: 16, weight: .semibold, design: .default))
  .scaledToReadableMaximum()  // Custom modifier
```

**Minimum Touch Target Size:**
```
Primary buttons:     44x44pt minimum
Secondary buttons:   36x36pt minimum
Links in text:       Touch-friendly (expand on hover)
Interactive icons:   44x44pt minimum
Tap feedback:        Visible + haptic
```

**Color Contrast Requirements:**

| Element | Requirement | Ratio |
|---------|------------|-------|
| Large text (18pt+) | Minimum 3:1 | WCAG AA |
| Body text | Minimum 4.5:1 | WCAG AAA |
| UI components | Minimum 3:1 | WCAG AA |
| Focus indicator | 3:1 contrast | Essential |

**Focus State (Keyboard Navigation):**

```
Visible focus ring:   2pt, teal-600, 4pt offset
Animated:            Pulsing @ 1.5 second cycle
Z-index:            Highest
Keyboard shortcuts:
  Tab:               Move to next focusable element
  Shift+Tab:         Previous element
  Space/Return:      Activate button
  Arrow keys:        Navigate within container
  Escape:            Dismiss modal/sheet
```

---

### 4.4 Reading Progress Indicators

**Scroll Progress Bar (Subtle):**

```
Position:        Top of content
Height:          2pt
Width:           Full screen width
Background:      Teal-600
Opacity:         Changes with scroll progress
Animation:       Smooth, no delay
Reset:           On scroll to top

Calculation:
  progress = (scrollOffset) / (contentHeight - viewportHeight)
  opacity = progress * 0.8  // Never fully opaque
```

**Reading Time Estimate:**

```
Display location:  Beneath article title
Format:           "📖 Estimated read time: 8 minutes"
Font:             13pt, slate-600, weight: 500
Icon:             Book open (14pt, slate-500)
Calculation:      (word_count / 200 words per minute)
Update:           On content load only

Color coding:
  <2 min:  Teal-600 (quick)
  2-5 min: Slate-600 (normal)
  5-10 min: Orange-600 (substantial)
  >10 min: Amber-600 (deep dive)
```

**Saved Position Indicator:**

```
Display:          Floating pill at scroll position
Format:           "Last read position"
Icon:             Bookmark (14pt)
Background:       Teal-500/20% opacity
Text:             14pt, weight: 600, teal-700
Border:           1pt, teal-300
Padding:          6pt 10pt
Corner radius:    8pt

Behavior:
  Appears on:      Scroll down after initial read
  Persists at:     User's last scroll position
  Tap action:      Jump to position
  Auto-clear:      When user scrolls to new position
```

---

## 5. INTERACTION PATTERNS

### 5.1 Quick Actions via Gestures

**Snap/Zap Voting (Horizontal Swipe):**

```
Default state:
  ┌─────────────────────────────┐
  │ [Argument preview]          │
  └─────────────────────────────┘

Swipe left (reveal Zap):
  ┌──────────────┬──────────────┐
  │ [Argument]   │ ⚡ ZAP (Slate)│
  └──────────────┴──────────────┘

Swipe right (reveal Snap):
  ┌──────────────┬──────────────┐
  │ ⚡ SNAP      │ [Argument]   │
  │ (Teal)       │              │
  └──────────────┴──────────────┘
```

**Specifications:**

```
Swipe distance:     80pt to reveal button
Animation:          Spring curve (stiffness: 300, damping: 30)
Button size:        Equal to card height
Button width:       80pt
Snap color:        Teal-500
Zap color:         Slate-500
Text:              "SNAP" / "ZAP" (14pt, bold, white)
Icon:              Bolt (24pt, white)

Tap while revealed:
  Register vote immediately
  Hide button (spring back)
  Update count with animation
  Haptic feedback: Light impact

Release at threshold:
  Complete swipe: Registers vote
  Partial swipe:  Bounces back
  Threshold:      50pt movement
```

**Double-Tap Vote (Quick):**

```
Double-tap on card:
  1. Detect tap at location
  2. Animate to determine Snap/Zap (top half = Snap)
  3. Add floating particle animation
  4. Increment counter
  5. Haptic feedback
  
Animation:
  Particle:       Circle icon, scale 2.0 → 0, fade out
  Duration:       600ms
  Direction:      Upward (gravity)
  Count:          3-5 particles
```

---

### 5.2 Voice-to-Text for Arguments

**Activation:**

```
In argument editor:
  Tap 🎤 icon in formatting toolbar
  
Or:
  Press and hold for continuous dictation
```

**Voice UI:**

```
┌──────────────────────────────────────┐
│ 🎤 Listening...                      │
├──────────────────────────────────────┤
│ [Animated waveform]                  │
├──────────────────────────────────────┤
│ "For this reason, I believe..."      │
│ (Real-time transcription)            │
├──────────────────────────────────────┤
│ [Stop] [Cancel]                      │
└──────────────────────────────────────┘
```

**Specifications:**

```
Activation:        Icon tap or hold
Language:          System language setting
Transcription:     Real-time display (250ms latency)
Punctuation:       Auto-added at sentence breaks
Capitalization:    First word, proper nouns
Correction:        Tap to edit transcribed text

Waveform animation:
  Bars:            5-7 bars
  Height:          20-60pt, reactive to audio level
  Color:           Teal-600
  Update rate:     60 FPS
  Animation:       Ease-in-out per frame

Stop behavior:
  Auto-stop:       3 seconds of silence
  Manual stop:     Tap "Stop" button
  Duration limit:  2 minutes per dictation
  Word count:      Limit to ~1000 words per use

Post-transcription:
  Insert text:     At cursor position
  Format as:       Paragraph
  Allow edit:      Before publishing
  Save as:         Draft automatically
```

---

### 5.3 Draft Auto-Save Mechanism

**Auto-Save Trigger:**

```
Events that trigger save:
  1. User stops typing (2 second delay)
  2. User navigates away (show confirm dialog)
  3. Background app refresh
  4. Low battery mode
  5. Before app termination

Storage:
  Location:        User's Vault (private)
  Label:           "Auto-saved draft - [timestamp]"
  Metadata:        
    - Created time
    - Last edited time
    - Discussion topic (if selected)
    - Character count
    - Auto-save count
```

**Visual Feedback:**

```
Draft saved notification:
  Duration:        2 seconds
  Position:        Bottom-right (above safe area)
  Style:           Toast/badge
  Background:      Teal-500/80%
  Text:            "Draft saved" (13pt, white)
  Icon:            Checkmark (16pt, white)
  Animation:       Fade in/out
  Interaction:     Non-dismissible, auto-disappears

Unsaved changes indicator:
  Position:        Top-left, near close button
  Icon:            Circle (filled) (8pt, orange)
  Label:           "Unsaved changes"
  Confirm dialog:  If user tries to close
    Title:        "Save draft?"
    Body:         "You have unsaved changes"
    Actions:      [Cancel] [Save] [Discard]
```

**Draft Recovery:**

```
On app launch after crash:
  Check for unsaved drafts
  Show alert if found:
    "Recover unsaved argument?"
    [Recover] [Discard]
  
Draft viewing:
  Vault tab → Drafts section
  Show preview with stats
  Last saved: "2 hours ago"
  Tap to continue editing
```

---

### 5.4 Notification Handling

**Notification Types:**

| Type | Trigger | Content | Action |
|------|---------|---------|--------|
| Snap/Zap | Someone votes on your argument | "+5 Snaps on your argument" | Open discussion |
| Reply | Someone replies to your comment | "John replied to your comment" | Jump to comment |
| Mention | Someone mentions you | "@username mentioned you" | View mention |
| Streak | Daily at 11:59 PM | "Contribute today to keep your streak!" | Open home |
| Achievement | Milestone reached | "New achievement: Depth Seeker" | View profile |
| Moderation | Content flagged | "Your argument under review" | View details |

**Notification UI:**

```
Lock screen:
  Icon:           App icon + badge
  Title:          "WONDER"
  Body:           Notification message (2 lines max)
  Image:          Author avatar (optional)

Notification banner:
  Position:       Top of screen (iOS 15+)
  Auto-dismiss:   5 seconds
  Swipe down:     Dismiss
  Tap:            Open relevant screen

In-app notification:
  Position:       Bottom-right (above tab bar)
  Style:          Toast badge
  Background:     Notification-type color
  Font:           13pt, weight: 600
  Padding:        10pt 16pt
  Border radius:  8pt
  Swipe-dismiss:  Left/right swipe
```

**Notification Settings:**

```
Settings screen sections:
  Voting:
    ☑️ Snaps on my arguments
    ☑️ Zaps on my arguments (optional - less frequent)
  
  Engagement:
    ☑️ Replies to my comments
    ☑️ Mentions
    ☑️ New followers
  
  Streaks & Gamification:
    ☑️ Daily streak reminder (11 PM)
    ☑️ Streak protection expiring
    ☑️ New achievements
  
  Moderation:
    ☑️ Content review updates
    ☑️ Community guidelines
  
  Schedule:
    Quiet hours: [9 PM] - [9 AM]
    Silent mode: No notifications during specified hours
```

---

### 5.5 Interactive Feedback Patterns

**Haptic Feedback Map:**

```swift
// Light (Social engagement)
UIImpactFeedbackGenerator(style: .light).impactOccurred()
Used for: Snap votes, likes, minor interactions

// Medium (Attention needed)
UIImpactFeedbackGenerator(style: .medium).impactOccurred()
Used for: Zap votes, important changes, Streak events

// Heavy (Major action)
UIImpactFeedbackGenerator(style: .heavy).impactOccurred()
Used for: Publish argument, major milestones

// Selection
UISelectionFeedbackGenerator().selectionChanged()
Used for: Tab switching, segment control changes

// Notification
UINotificationFeedbackGenerator().notificationOccurred(.success)
Used for: Achievement unlocked, streak protected

// Custom pattern
let pattern = [0, 100, 50, 100]  // ms timing
// Used for: Critical alerts, special events
```

---

## iOS HUMAN INTERFACE GUIDELINES COMPLIANCE

### Key Compliance Areas

**Safe Area Implementation:**
```
Top:    Status bar + notch/dynamic island (44-50pt)
Bottom: Tab bar + home indicator (83-90pt)
Left/Right: 16pt minimum margins on all screens
```

**Navigation Patterns:**
```
✅ Bottom tab bar (iOS standard)
✅ Modal sheets for creation (iOS standard)
✅ Navigation stack with back button
✅ Swipe gestures for natural navigation
✅ Persistent tab state between switches
```

**Visual Design:**
```
✅ Rounded corners (12-16pt) on cards
✅ Consistent spacing system (8pt grid)
✅ System colors for semantics
✅ SF Symbols for consistency
✅ Teal primary (accessible color)
✅ Sufficient contrast ratios (4.5:1 body text)
```

**Interaction Design:**
```
✅ Min 44pt touch targets
✅ Visible feedback on all interactions
✅ Haptic feedback for critical actions
✅ Loading states with progress indicators
✅ Error messaging in context
```

---

## IMPLEMENTATION PRIORITIES

### Phase 1 (MVP - Weeks 1-4)
- Bottom tab navigation
- Home & Feed screens
- Argument detail view
- Basic voting (Snap/Zap)
- Profile screen (stats only)
- Dark mode support

### Phase 2 (Weeks 5-8)
- Create argument flow
- Draft auto-save
- Vault screen
- Streak display with protection
- Advanced depth score breakdown
- Search & filters

### Phase 3 (Weeks 9-12)
- Voice-to-text argument input
- PhilosophyKeyboard templates
- Notifications system
- Moderation UI
- Analytics integration
- Onboarding sequence

### Phase 4 (Post-launch)
- Apple Watch companion app
- iPad optimization
- Handoff support
- iCloud sync for drafts
- Siri integration
- WidgetKit support

---

## CONCLUSION

This mobile design transforms WONDER into a philosophy-first iOS experience that:

1. **Respects Deep Reading**: Optimized typography, spacing, and dark mode for evening philosophical discourse
2. **Prioritizes Engagement**: Snap/Zap voting, streaks, and depth scoring made tactile and rewarding
3. **Follows Apple Standards**: HIG-compliant navigation, gestures, and accessibility
4. **Targets Core Audience**: 25-45 year old intellectuals who value quality discourse over quantity
5. **Enables Mobility**: Full feature parity with web, optimized for touch and offline reading

The design system ensures consistency while the gesture patterns and gamification mechanics drive daily engagement without sacrificing philosophical depth.

