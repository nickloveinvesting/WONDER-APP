# WONDER iOS - Component Porting Matrix

## Overview

This document details the exact porting status, effort, and implementation approach for each component in the WONDER web app.

**Symbols:**
- ✅ Can be reused directly (rare)
- 🔄 Requires light adaptation (modify for mobile)
- ⚡ Requires rewrite (new mobile implementation)
- ⏭️ Deferred to Phase 2+ (not MVP)

**Effort Legend:**
- 1h = simple prop name change
- 2-4h = moderate rewrite
- 1d = significant rewrite
- 2-3d = substantial implementation
- 1w = major feature

---

## UI Components (`components/ui/`)

### Button.tsx
- **Status**: ⚡ Rewrite
- **Effort**: 4h
- **Reason**: HTML `<button>` → React Native `<Pressable>`, no CSS classes
- **Notes**: Adapt design tokens from Tailwind to StyleSheet
- **Dependencies**: Theme context
- **Mobile-specific**: Active/pressed states, opacity feedback

```typescript
// Web: onClick={handler}
// Mobile: onPress={handler}

// Web: className="bg-teal-500..."
// Mobile: style={{ backgroundColor: colors.teal500 }}

// Web: hover:shadow-2xl
// Mobile: pressed && { shadowOpacity: 0.8 }
```

### Card.tsx
- **Status**: ⚡ Rewrite
- **Effort**: 3h
- **Reason**: HTML `<div>` → React Native `<View>`, no CSS
- **Notes**: Convert all Tailwind classes to StyleSheet styles
- **Dependencies**: Theme context
- **Subcomponents**: CardHeader, CardTitle, CardDescription, CardContent, CardFooter

```typescript
// Web: className="shadow-xl hover:shadow-2xl"
// Mobile: shadowColor, shadowOpacity, shadowRadius

// Web: hover:border-teal-200
// Mobile: Can't hover on mobile - remove or use onPress
```

### Input.tsx
- **Status**: ⚡ Rewrite
- **Effort**: 3h
- **Reason**: HTML `<input>` → React Native `<TextInput>`
- **Notes**: Add keyboard type switching, return key handling
- **Dependencies**: Theme context
- **Variants**: text, email, password, number

```typescript
// Web: <input type="email" />
// Mobile: <TextInput keyboardType="email-address" />

// Web: placeholder styling via CSS
// Mobile: placeholderTextColor prop

// Web: focus ring
// Mobile: borderColor on focus
```

### Badge.tsx
- **Status**: ⚡ Rewrite
- **Effort**: 2h
- **Reason**: HTML `<span>` → React Native `<View>` + `<Text>`
- **Notes**: Simple badge styling
- **Variants**: teal, slate, green, red

### Breadcrumbs.tsx
- **Status**: ⏭️ Defer
- **Reason**: Not needed for mobile navigation pattern
- **Alternative**: Use header or title

### CommentCard.tsx
- **Status**: 🔄 Adapt
- **Effort**: 4h
- **Reason**: Business logic OK, UI needs rewrite
- **Notes**: Convert to FlatList item
- **Dependencies**: Comment data structure

### DebateCard.tsx
- **Status**: 🔄 Adapt
- **Effort**: 1d
- **Reason**: Core logic (status badges, formatting) reusable, layout rebuild
- **Notes**: Mobile-optimized card layout
- **Dependencies**: Debate type, voting hooks
- **Key Changes**:
  - Smaller font for mobile
  - Single column layout
  - Card-based design (no hover states)
  - Touch-friendly tap targets (min 44x44)

### DiscussionCard.tsx
- **Status**: 🔄 Adapt
- **Effort**: 4h
- **Reason**: Similar to DebateCard
- **Notes**: Discussion-specific styling
- **Dependencies**: Discussion type

### LeaderboardRow.tsx
- **Status**: 🔄 Adapt
- **Effort**: 2h
- **Reason**: Business logic reusable, simple layout
- **Notes**: Use FlatList for ranking display
- **Dependencies**: Profile type

### Header.tsx (in ui/)
- **Status**: ⚡ Rewrite
- **Effort**: 1d
- **Reason**: Navigation header completely different on mobile
- **Notes**: SafeAreaView + custom header
- **Mobile Features**:
  - Profile avatar (tap for menu)
  - Hamburger menu (if drawer nav)
  - Streak display
  - No feedback button (use settings instead)

### SectionHeader.tsx
- **Status**: 🔄 Adapt
- **Effort**: 2h
- **Reason**: Typography works, just different styling
- **Notes**: Responsive sizing for mobile

### StatCard.tsx
- **Status**: 🔄 Adapt
- **Effort**: 2h
- **Reason**: Simple stat display, reusable logic

### Toast.tsx
- **Status**: ⚡ Rewrite
- **Effort**: 2h
- **Reason**: Use React Native alerts or custom toast
- **Notes**: No CSS positioning, use absolute positioning with safe area
- **Alternative**: Use React Native `Alert.alert()` or `ToastAndroid`

---

## Page Layout Templates (`components/templates/`)

### LandingPageTemplate.tsx
- **Status**: ⏭️ Defer
- **Reason**: Landing page not needed in mobile app (no public access)

### DebatesListTemplate.tsx
- **Status**: 🔄 Adapt
- **Effort**: 1d
- **Reason**: List layout OK, use FlatList instead of page
- **Notes**: Add infinite scroll with React Query
- **Key Changes**:
  - FlatList instead of div container
  - Pull-to-refresh support
  - Empty state handling
  - Loading skeletons

### SingleDebateTemplate.tsx
- **Status**: 🔄 Adapt
- **Effort**: 1d
- **Reason**: Detail view logic reusable, layout rebuild
- **Notes**: Use ScrollView or FlatList for arguments
- **Key Changes**:
  - ScrollView with nested lists
  - Sticky header with debate title
  - Bottom sheet for voting
  - Argument cards in FlatList

### DashboardTemplate.tsx
- **Status**: 🔄 Adapt
- **Effort**: 1d
- **Reason**: Dashboard layout completely different
- **Notes**: Sections become scrollable cards
- **Key Changes**:
  - ScrollView with multiple sections
  - Tab-based navigation
  - Stats display cards
  - Recent debates list

---

## Feature Components (`components/`)

### Navigation.tsx
- **Status**: ⚡ Rewrite (Actually Removed)
- **Notes**: Web version is now empty. Mobile uses Expo Router.
- **Mobile Alternative**: `app/(authenticated)/_layout.tsx` with Tabs

### Logo.tsx
- **Status**: 🔄 Adapt
- **Effort**: 1h
- **Reason**: Just import Image instead of img
- **Notes**: Same SVG/PNG, just different component

### Sidebar.tsx
- **Status**: ⚡ Rewrite
- **Effort**: 1d
- **Reason**: Not part of mobile navigation pattern
- **Alternative**: Drawer navigator (optional) or integrate into header menu

### FeedbackModal.tsx
- **Status**: 🔄 Adapt
- **Effort**: 1d
- **Reason**: Business logic (GitHub issue creation) reusable, modal completely different
- **Notes**: Use React Native Modal component
- **Mobile Change**: Put feedback in settings instead of header

### ErrorBoundary.tsx
- **Status**: 🔄 Adapt
- **Effort**: 2h
- **Reason**: Error handling logic OK, UI presentation different
- **Notes**: Simple error screen instead of boundary
- **Dependencies**: ErrorBoundary library for React Native

### PublishButton.tsx
- **Status**: 🔄 Adapt
- **Effort**: 2h
- **Reason**: Button logic reusable, mobile styling needed
- **Notes**: Full-width button pattern

### QuadrantNav.tsx
- **Status**: ⏭️ Defer
- **Reason**: Quadrant selection happens during creation on mobile
- **Notes**: Can add swipe between quadrants in Phase 2

### SettingsForm.tsx
- **Status**: ⚡ Rewrite
- **Effort**: 1d
- **Reason**: Settings UI completely mobile-specific
- **Notes**: Use ScrollView + form fields
- **Sections**:
  - Profile settings
  - Notification preferences
  - Theme/appearance
  - Privacy settings
  - About & Help

### VoteButtons.tsx
- **Status**: 🔄 Adapt
- **Effort**: 4h
- **Reason**: Vote logic completely reusable, layout adapted
- **Notes**: Horizontal button layout for mobile
- **Mobile Feature**: Haptic feedback on vote

### ArgumentFeedback.tsx
- **Status**: 🔄 Adapt
- **Effort**: 3h
- **Reason**: Same concept, mobile-specific UI
- **Notes**: Button/chip layout for feedback types

### DepthScore.tsx
- **Status**: 🔄 Adapt
- **Effort**: 2h
- **Reason**: Display logic OK, styling adapted
- **Notes**: Simple score display

### StreakDisplay.tsx
- **Status**: 🔄 Adapt
- **Effort**: 2h
- **Reason**: Streak calculation OK, mobile styling

---

## Auth Components

### LoginForm.tsx (app/auth/login/)
- **Status**: 🔄 Adapt
- **Effort**: 1d
- **Reason**: Form structure and validation OK, UI mobile-specific
- **Notes**: Use React Hook Form (already in web)
- **Key Changes**:
  - TextInput components
  - KeyboardAvoidingView wrapper
  - Full-width inputs
  - Password visibility toggle
  - Keyboard handling

### SignupForm.tsx (implied)
- **Status**: Need to create
- **Effort**: 1d
- **Reason**: Similar to LoginForm
- **Key Fields**: Email, Password, Display Name, Username

### ForgotPasswordForm.tsx
- **Status**: Need to create
- **Effort**: 1d
- **Reason**: Same pattern as LoginForm

---

## New Mobile-Only Components to Create

### SafeAreaWrapper.tsx
- **Effort**: 1h
- **Purpose**: Wrap screens with safe area insets

### LoadingSkeletons.tsx
- **Effort**: 2h
- **Purpose**: Skeleton loaders for lists

### EmptyState.tsx
- **Effort**: 2h
- **Purpose**: Empty state illustrations

### BottomSheet.tsx
- **Effort**: 1d
- **Purpose**: Bottom sheet for modals/voting
- **Library**: react-native-bottom-sheet

### Drawer.tsx (optional)
- **Effort**: 1d
- **Purpose**: Drawer navigation (optional)
- **Library**: react-navigation/drawer

### PullToRefresh.tsx
- **Effort**: 4h
- **Purpose**: Refresh control
- **Built-in**: React Native RefreshControl

### ImageUploader.tsx
- **Effort**: 1d
- **Purpose**: Avatar/image upload with picker
- **Libraries**: expo-image-picker, react-native-image-crop-picker

### BiometricAuth.tsx
- **Effort**: 1d
- **Purpose**: Face ID / Touch ID support
- **Library**: expo-local-authentication

---

## Component Dependency Map

### High Priority (Phase 1-2)

```
App (_layout.tsx)
├── AuthProvider
├── ThemeProvider
└── Navigation Router
    ├── Auth Routes
    │   ├── LoginForm
    │   │   ├── TextInput
    │   │   ├── Button
    │   │   └── Link
    │   └── SignupForm
    │
    └── Authenticated Routes
        ├── Header
        │   ├── Logo
        │   └── User Menu
        │
        ├── BottomTabs
        │
        ├── Home Screen
        │   ├── DashboardTemplate
        │   ├── DebateCard (list)
        │   └── StatCard
        │
        ├── Debates Screen
        │   ├── DebatesListTemplate
        │   ├── DebateCard (list)
        │   ├── FilterButtons (optional)
        │   └── DebateDetail
        │       ├── DebateInfo
        │       ├── ArgumentCard (list)
        │       ├── VoteButtons
        │       └── BottomSheet
        │
        ├── Profile Screen
        │   ├── Profile Header
        │   ├── StatCard (multiple)
        │   ├── LeaderboardRow
        │   └── EditProfile
        │
        └── Settings Screen
            └── SettingsForm
                ├── TextInput
                ├── Toggle
                └── Picker
```

### Medium Priority (Phase 3)

```
Journal Screen
├── JournalListTemplate
├── EntryCard (list)
└── EntryDetail
    ├── EntryEditor
    │   ├── TextInput (rich)
    │   └── ImageUploader
    └── FolderView
```

### Low Priority (Phase 4+)

```
Moderation Log
├── ModLogTemplate
└── ModLogRow (list)

Vault
├── VaultTemplate
└── VaultCard (list)
```

---

## Summary Statistics

### Components to Reuse (✅)
- **Count**: 0
- **Effort**: 0h
- **Note**: HTML components require substantial rewrites

### Components to Adapt (🔄)
- **Count**: 18
- **Est. Effort**: 3-4 weeks
- **Highest Effort**: DebatesListTemplate (1d), SingleDebateTemplate (1d), DashboardTemplate (1d)

### Components to Rewrite (⚡)
- **Count**: 13
- **Est. Effort**: 2-3 weeks
- **Highest Effort**: Header (1d), SettingsForm (1d), Navigation (1d)

### Components to Defer (⏭️)
- **Count**: 4
- **Est. Effort**: 1-2 weeks (Phase 2+)
- **Examples**: QuadrantNav, Breadcrumbs, BioModal, VideoChat

### New Mobile Components
- **Count**: 8
- **Est. Effort**: 2 weeks
- **Priority**: SafeAreaWrapper, BottomSheet, ImageUploader, Biometric

---

## Implementation Order (Critical Path)

### Week 1-2: Foundation
1. SafeAreaWrapper (1h)
2. Button (4h)
3. TextInput (3h)
4. Card (3h)
5. Logo (1h)
6. **Subtotal**: 2-3 days of active development

### Week 2-3: Auth & Navigation
7. LoginForm (1d)
8. SignupForm (1d)
9. Header (1d)
10. Bottom Tab Navigation (2h)
11. **Subtotal**: 3-4 days

### Week 3-4: Core Lists
12. DebatesListTemplate (1d)
13. DebateCard (1d)
14. EmptyState (2h)
15. LoadingSkeletons (2h)
16. **Subtotal**: 3-4 days

### Week 4-5: Detail Views
17. SingleDebateTemplate (1d)
18. ArgumentCard (4h)
19. VoteButtons (4h)
20. BottomSheet (1d)
21. **Subtotal**: 3-4 days

### Week 5-6: Profile & Settings
22. Profile Screen (1d)
23. SettingsForm (1d)
24. **Subtotal**: 2 days

### Week 6+: Remaining
25. Image components
26. Modals
27. Refinements

---

## File Mapping: Web → Mobile

| Web Path | Mobile Path | Status | Notes |
|----------|-------------|--------|-------|
| components/ui/Button.tsx | src/components/common/Button.tsx | ⚡ | Complete rewrite |
| components/ui/Card.tsx | src/components/common/Card.tsx | ⚡ | New variants for mobile |
| components/ui/Input.tsx | src/components/common/Input.tsx | ⚡ | TextInput wrapper |
| components/ui/Badge.tsx | src/components/common/Badge.tsx | ⚡ | View + Text |
| components/ui/Header.tsx | src/components/shared/Header.tsx | ⚡ | Mobile header |
| components/Navigation.tsx | app/(auth) + app/(authenticated) | ⚡ | Expo Router |
| components/Logo.tsx | src/components/shared/Logo.tsx | 🔄 | Image instead of SVG |
| components/DebateCard.tsx | src/components/debates/DebateCard.tsx | 🔄 | Mobile layout |
| app/(authenticated)/debates/[id]/page.tsx | app/(authenticated)/debates/[id].tsx | 🔄 | Detail screen |
| app/(authenticated)/home/page.tsx | app/(authenticated)/home/index.tsx | 🔄 | Dashboard |
| app/(authenticated)/profile/page.tsx | app/(authenticated)/profile/index.tsx | ⚡ | Mobile profile |
| app/(authenticated)/settings/page.tsx | app/(authenticated)/settings/index.tsx | ⚡ | Mobile settings |
| app/auth/login/page.tsx | app/(auth)/login.tsx | 🔄 | Mobile form |

---

## Testing Requirements by Component

| Component | Unit Test | Integration | E2E | Note |
|-----------|-----------|-------------|-----|------|
| Button | ✅ | ✅ | ⏸️ | Test onPress callback |
| Card | ✅ | ✅ | ⏸️ | Test layout |
| Input | ✅ | ✅ | ✅ | Test keyboard behavior |
| DebateCard | ✅ | ✅ | ✅ | Critical component |
| VoteButtons | ✅ | ✅ | ✅ | Test offline queuing |
| LoginForm | ✅ | ✅ | ✅ | Test auth flow |
| Header | ✅ | ✅ | ⏸️ | Test navigation |
| Notifications | ✅ | ✅ | ⏸️ | Platform-specific |

**Legend**:
- ✅ Must have test
- ⏸️ Nice to have
- ❌ Not applicable

---

## Performance Considerations

### Components with High Render Cost
- DebatesListTemplate (many items) → Use React.memo, FlatList optimization
- SingleDebateTemplate (large content) → Use ScrollView efficiently
- Header (renders every screen) → Minimize re-renders

### Components Needing Memoization
```typescript
// Wrap these with React.memo()
export const DebateCard = React.memo(function DebateCard({ ... }) {
  // prevents unnecessary re-renders
});
```

### Images & Assets
- Compress all PNG/JPG before adding
- Use FastImage for network images
- Cache strategy for profile pics

---

## Conclusion

**Total Component Work**: ~6-8 weeks
- Adaptation: 3-4 weeks (18 components)
- Rewrites: 2-3 weeks (13 components)
- New mobile: 1-2 weeks (8 components)

**Ready to start?** Begin with Foundation phase (Week 1-2), then proceed through Auth & Navigation, and so on.

