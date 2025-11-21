# WONDER iOS: Mobile Design - Executive Summary & Compliance

---

## PROJECT OVERVIEW

**WONDER iOS Mobile App** transforms the web-based philosophical conversation platform into a native iOS experience optimized for:

- **Deep reading** of complex arguments (16pt base, 1.8 line height)
- **Gesture-first interaction** (Snap/Zap voting, swipe navigation)
- **Gamification** (streaks, depth scoring, influence metrics)
- **Accessibility first** (VoiceOver, Dynamic Type, 4.5:1 contrast)
- **Target audience**: Intellectual adults 25-45 years old

---

## DESIGN PHILOSOPHY

### Core Principles

1. **Discourse Over Algorithm**: Depth score ranks arguments by quality, not hype
2. **Mobile-First Reading**: Typography, spacing, and dark mode optimized for evening philosophical sessions
3. **Gesture Grammar**: Swipe, tap, long-press, and pinch mapped to natural philosopher interactions
4. **Engagement Visibility**: Streaks, influence scores, and metrics visible at a glance
5. **Accessibility as Default**: Not an afterthought—built from day one

---

## NAVIGATION ARCHITECTURE

### Bottom Tab Bar (5 Tabs)

```
1️⃣  Home    → Daily question + recent discussions
2️⃣  Posts   → All discussions with filters
3️⃣  Write   → Create arguments (modal flow)
4️⃣  Vault   → Saved arguments & drafts
5️⃣  Profile → User stats, achievements, settings
```

**Key Design Features:**
- 49pt height (iOS standard safe area)
- Teal-600 active, slate-400 inactive
- Scroll position preserved per tab
- Tab state persists between switches

### Navigation Patterns

| Context | Pattern | Animation |
|---------|---------|-----------|
| Deeper detail | Push (stack nav) | Slide right |
| Creation flow | Modal sheet | Slide up |
| Full editor | Full-screen modal | Slide right |
| Filters/sort | Action sheet | Pop from bottom |
| Deep links | Universal (wonder://) | Direct navigation |

---

## CORE SCREENS DESIGN SPECIFICATIONS

### 1. Home Screen (Daily Question Focus)

**Layout hierarchy:**
1. Welcome header ("Welcome back, thinker")
2. Today's question card (featured, teal accent)
3. Your stats grid (3 columns: streak, influence, depth avg)
4. Recent discussions scroll (infinite)

**Key metrics:**
- Question card: 16pt borders, 20pt padding
- Stats grid: 3-column equal width, 80pt height
- Discussion cards: 120-160pt height (flex)
- Pull-to-refresh: 60pt trigger distance

---

### 2. Discussion Listing

**Sticky elements:**
- Navigation bar (56pt): Title + filter/sort
- Segmented filter (40pt): All | Philosophy | Ethics | AI | Economics
- Search bar (40pt): Searchable discussion finder
- Sort dropdown: Recent | Trending | Depth | Oldest

**Discussion cards:**
- Height: 130-160pt (depends on description)
- Title: 2 lines max (17pt, weight: 600)
- Description: 2 lines max (14pt, weight: 500)
- Metadata: Snap count, Zap count, participants, depth score
- Tap target: Full card is interactive

---

### 3. Argument Submission (Write Tab)

**3-screen flow:**
1. Mode selector (New | Continue Draft | Template)
2. Argument editor (position, discussion, rich text)
3. Publish preview (preview + depth estimate)

**Rich text editor:**
- Min height: 200pt, max: flexible
- Font: 16pt, Plus Jakarta Sans, weight: 500
- Line height: 1.6
- Word count limit: 5000 words
- Auto-save: Every 2 seconds after typing stops

**Formatting toolbar:**
- Sticky on scroll above keyboard
- 44pt height, 7 buttons: B, I, Link, Quote, List, Code, Undo
- Color coding: Inactive (slate-100), active (teal-600)

---

### 4. Profile Screen

**Sections:**
1. Avatar + username + edit button
2. Stats grid (3 columns): Score | Streak | Topics participated
3. Achievements/badges (horizontal scroll)
4. Recent activity (max 5 items)
5. Settings menu (6 items: Notifications, Appearance, Privacy, Account, Help, Sign Out)

**Key metrics:**
- Avatar: 80x80pt circle with shadow
- Stats card height: 100pt each
- Badges: 60x60pt circles, horizontal scroll
- Menu rows: 48pt height, full-width

---

### 5. Vault (Saved Arguments)

**Organization:**
- Filter tabs: All | Marked | By Topic
- Search bar (40pt)
- Saved argument cards

**Card details:**
- Topic label (13pt, teal-700)
- Position badge (For/Against)
- Text preview (2 lines)
- "Saved X days ago" metadata
- Long-press context menu

---

## MOBILE-SPECIFIC COMPONENTS

### ArgumentCard (Collapsed & Expanded States)

**Collapsed (List view):**
- Height: 120-140pt
- Shows: Avatar + name, 2-line preview, metrics (Snap/Zap/Depth)
- Tap to expand

**Expanded (Detail view):**
- Full argument text (16pt, 1.8 line height)
- Depth score card (animated breakdown)
- Comments section
- Share/bookmark/more actions

### DepthScore Visualization

**Compact badge:**
- Size: 28pt height, auto width
- Shows score (72) + level (Exceptional)
- Tap to expand

**Detailed breakdown:**
- Progress bars: Read time, citations, changed views, expert endorsement
- Animated counter up to final values
- Footer: "Quality discourse > popularity"

### Streak Display

**Compact badge (header):**
- 32pt height
- Icon: 🔥
- Color-coded by days: 30+ orange, 14-29 amber, 7-13 yellow, 3-6 teal

**Detailed card (profile):**
- Shows: Current streak, best streak, motivational message
- Action buttons: "Use Streak Shield", "Share Achievement"
- Protected indicator: 🛡️ shield emoji

### PhilosophyKeyboard (Template Insertion)

**Activation:** Swipe up from editor, or tap Templates button

**Templates:**
1. Counterargument: "While [X] argues... in fact..."
2. Evidence-based: "Research shows... Studies..."
3. Thought experiment: "Imagine if... Therefore..."
4. Philosophical analysis: "[Philosopher] argues... However..."
5. Pragmatic: "In practical terms... Consequently..."

---

## GESTURE INTERACTION PATTERNS

### Primary Gestures

| Gesture | Action | Feedback |
|---------|--------|----------|
| Double-tap | Quick Snap vote | Haptic light + particle animation |
| Swipe left | Reveal Zap button | Spring animation |
| Swipe right | Go back / Reveal Snap | Standard navigation |
| Swipe down | Pull-to-refresh | Loading spinner + haptic |
| Long-press | Context menu | Haptic selection + menu appearance |
| Pinch | Zoom text (reading) | No haptic, show size hint |
| 3-finger tap | Toggle dark mode | System-level |

### Haptic Feedback Mapping

```
Light impact (14pt):     Snap vote, minor interactions
Medium impact (20pt):    Zap vote, important changes
Heavy impact (32pt):     Publish argument, major milestones
Selection (light):       Tab switching, segment selection
Success pattern:         Achievement unlocked, streak protected
Warning pattern:         Streak broken, error state
```

---

## READING EXPERIENCE OPTIMIZATION

### Typography Scale

**Mobile (390pt width):**
- H1: 28pt (headlines)
- H2: 20pt (section titles)
- Body: 16pt (argument text)
- Small: 14pt (secondary text)
- Caption: 12pt (metadata)
- Meta: 11pt (timestamps)

**Leading (Line Height):**
- Headlines: 1.2 (tight)
- Body: 1.6-1.8 (generous for reading)
- Captions: 1.5

**Ideal line length:**
- Container width: 340-380pt (60-75 characters)
- Margins: 16pt left/right

### Dark Mode

**Color scheme:**
- Background: Slate-950
- Secondary bg: Slate-900
- Primary text: Slate-50
- Secondary text: Slate-400
- Accent: Teal-400 (brighter in dark)
- Borders: Slate-800
- Shadows: Stronger (0 0 0 / 20%)

**Implementation:**
- System preference default
- Manual toggle in settings
- Persistent across sessions
- 300ms transition animation

### Accessibility Features

**VoiceOver Support:**
- Semantic labels for all interactive elements
- Hints for complex interactions
- Values for dynamic content
- Element grouping (combine vs ignore)

**Dynamic Type:**
- App supports 50%-200% scaling
- Body text: 12pt-28pt range
- Proportional scaling maintained
- No text clipping or truncation

**Contrast Ratios:**
- Large text (18pt+): Minimum 3:1 (WCAG AA)
- Body text: Minimum 4.5:1 (WCAG AAA)
- UI components: Minimum 3:1

**Touch Targets:**
- Primary buttons: 44x44pt minimum
- Interactive icons: 44x44pt minimum
- Links in text: Touch-friendly (expand on hover)

---

## iOS HUMAN INTERFACE GUIDELINES COMPLIANCE

### ✅ Navigation

- Bottom tab bar (standard iOS navigation)
- Clear navigation titles (44-56pt height)
- Back button for hierarchical navigation
- Modal sheets for creation flows
- Safe area respected on all screens

### ✅ Visual Design

- Rounded corners: 12-16pt on cards
- Consistent spacing: 8pt grid system
- System colors for semantic meaning
- SF Symbols for icons (when available)
- Accessible color palette (teal primary)

### ✅ Interaction Design

- Min 44pt touch targets
- Visible feedback on all interactions
- Haptic feedback for critical actions
- Loading states with indicators
- Error messaging in context

### ✅ Keyboard Support

- Text input fields: Proper keyboard types
- Return key: "Next" or "Send" (context-aware)
- Keyboard dismiss: Swipe down or tap outside
- Tab navigation: Logical order (VoiceOver)
- Hardware keyboard: Full navigation support

### ✅ Notifications

- Badge counts for unread (tabs)
- Push notification support
- Notification grouping
- Rich notification content
- Actionable notifications

---

## ACCESSIBILITY COMPLIANCE CHECKLIST

### Visual Accessibility

- [x] Color contrast minimum 4.5:1 body text
- [x] Dark mode full support
- [x] Dynamic Type support (50%-200%)
- [x] Text size adjustable without pinch
- [x] Focus indicators visible
- [x] No content hidden in color alone

### Audio Accessibility

- [x] Captions for video content
- [x] Haptic alternatives to sound-only feedback
- [x] Audio descriptions for images
- [x] Speaker identification in quotes

### Motor Accessibility

- [x] All interactions usable via touch (no hover required)
- [x] Min 44x44pt touch targets
- [x] Alternative gestures (double-tap vs swipe)
- [x] No timed interactions (except intentional)
- [x] Keyboard navigation complete

### Cognitive Accessibility

- [x] Clear page titles
- [x] Logical tab order
- [x] Consistent navigation
- [x] Error prevention & recovery
- [x] Simple language where possible
- [x] Estimated read time provided

### Assistive Technology

- [x] Full VoiceOver support
- [x] Switch Control compatible
- [x] Voice Control support
- [x] Zoom magnification support
- [x] Smart Invert support

---

## IMPLEMENTATION ROADMAP

### Phase 1: MVP (Weeks 1-4)

**Essential screens:**
- [x] Home tab with daily question
- [x] Posts listing with filters
- [x] Argument detail view
- [x] Profile with stats
- [x] Basic dark mode

**Interactions:**
- [x] Tab navigation
- [x] Tap voting (Snap/Zap)
- [x] Pull-to-refresh

### Phase 2: Enhanced (Weeks 5-8)

**Features to add:**
- [ ] Argument creation flow
- [ ] Draft auto-save
- [ ] Vault screen
- [ ] Streak display & protection
- [ ] Advanced depth score
- [ ] Search functionality

**Interactions:**
- [ ] Swipe-to-vote
- [ ] Long-press context menu
- [ ] Modal sheet flows

### Phase 3: Advanced (Weeks 9-12)

**Features to add:**
- [ ] Voice-to-text dictation
- [ ] PhilosophyKeyboard templates
- [ ] Push notifications
- [ ] User moderation
- [ ] Achievements badges
- [ ] Onboarding flow

**Interactions:**
- [ ] Pinch-to-zoom in reading
- [ ] Waveform visualization (voice)
- [ ] Template insertion

### Phase 4: Polish & Expansion

**Post-launch:**
- [ ] Apple Watch companion
- [ ] iPad optimization (split view)
- [ ] iCloud sync for drafts
- [ ] Handoff support
- [ ] Siri shortcuts
- [ ] WidgetKit (home screen widgets)

---

## FILE STRUCTURE (SUGGESTED)

```
WONDER-iOS/
├── App/
│   ├── WonderApp.swift
│   ├── ContentView.swift
│   └── AppDelegate.swift
│
├── Features/
│   ├── Home/
│   │   ├── HomeScreen.swift
│   │   ├── DailyQuestionCard.swift
│   │   └── HomeViewModel.swift
│   │
│   ├── Posts/
│   │   ├── PostsListScreen.swift
│   │   ├── PostDetailScreen.swift
│   │   └── PostsViewModel.swift
│   │
│   ├── Write/
│   │   ├── ArgumentEditorScreen.swift
│   │   ├── TemplatePickerSheet.swift
│   │   └── WriterViewModel.swift
│   │
│   ├── Vault/
│   │   ├── VaultScreen.swift
│   │   └── SavedArgumentCard.swift
│   │
│   └── Profile/
│       ├── ProfileScreen.swift
│       ├── StatsGrid.swift
│       ├── AchievementBadges.swift
│       └── ProfileViewModel.swift
│
├── Components/
│   ├── ArgumentCard.swift
│   ├── DepthScoreView.swift
│   ├── StreakDisplay.swift
│   ├── VoteButtons.swift
│   ├── TabBar.swift
│   └── DiscussionCard.swift
│
├── Services/
│   ├── SupabaseService.swift
│   ├── AuthService.swift
│   ├── AnalyticsService.swift
│   └── HapticService.swift
│
├── Utilities/
│   ├── Colors.swift (Design system)
│   ├── Typography.swift
│   ├── Layout.swift (Constants)
│   └── Accessibility.swift
│
└── Assets/
    ├── Images.xcassets/
    ├── Colors.xcassets/
    └── Fonts/
```

---

## DESIGN TOKENS (SWIFT)

```swift
// Colors
enum AppColors {
    static let primary = Color(red: 0.078, green: 0.722, blue: 0.651) // Teal-600
    static let primaryLight = Color(red: 0.110, green: 0.776, blue: 0.702) // Teal-500
    static let accent = Color(red: 0.015, green: 0.106, blue: 0.157) // Slate-900
    static let background = Color(red: 0.969, green: 0.969, blue: 0.969) // Stone-50
    static let cardBg = Color.white
    static let darkMode = Color(red: 0.055, green: 0.063, blue: 0.078) // Slate-950
}

// Typography
enum AppFonts {
    static let heroTitle = Font.system(size: 28, weight: .black)
    static let sectionTitle = Font.system(size: 20, weight: .black)
    static let body = Font.system(size: 16, weight: .medium)
    static let caption = Font.system(size: 13, weight: .medium)
}

// Layout
enum AppLayout {
    static let horizontalPadding: CGFloat = 16
    static let verticalPadding: CGFloat = 20
    static let cornerRadius: CGFloat = 12
    static let tabBarHeight: CGFloat = 49
    static let safeAreaTop: CGFloat = 44
    static let safeAreaBottom: CGFloat = 34
}
```

---

## SUCCESS METRICS

### User Engagement

- Daily active users (DAU)
- Time on app per session
- Arguments submitted per day
- Snap/Zap voting participation rate

### Content Quality

- Average depth score trend
- Arguments with citations (%)
- Comment count per discussion
- View changes influenced (%)

### Retention

- 7-day retention rate (target: 40%)
- 30-day retention rate (target: 25%)
- Streak continuation rate
- Return user frequency

### Accessibility

- VoiceOver users (%)
- Dynamic Type adoption (%)
- Dark mode usage (%)
- Accessibility error rate (target: <1%)

---

## RESOURCES & REFERENCES

### Apple Documentation

- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui/)
- [Accessibility Guide](https://developer.apple.com/accessibility/)

### Design Tools

- Figma (prototyping)
- SF Symbols (icons)
- Xcode previews (rapid iteration)

### Testing

- XCUITest (functional testing)
- Accessibility Inspector (HIG compliance)
- Simulator (iOS 16-18 versions)

---

## CONCLUSION

This mobile design transforms WONDER into an iOS app that:

1. **Prioritizes philosophical depth** over engagement metrics
2. **Optimizes for reading** with careful typography and dark mode
3. **Respects accessibility** as a core design principle
4. **Follows iOS standards** while maintaining brand identity
5. **Enables gesture-first interaction** for natural, intuitive use

The design supports the WONDER mission: bringing curious minds together for meaningful philosophical discourse—now in their pocket.

