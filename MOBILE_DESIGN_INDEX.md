# WONDER iOS: Mobile Design Documentation Index

## Overview

This folder contains comprehensive mobile UI/UX design specifications for transforming WONDER from a web platform to a native iOS app. Designed for intellectual adults (25-45) seeking deep philosophical discourse on mobile.

---

## Document Breakdown

### 1. **MOBILE_DESIGN_SPEC.md** (58 KB) - CORE DESIGN GUIDE
**The comprehensive specification document covering everything:**

#### Sections:
- **Navigation Architecture**: Bottom tab bar (5 tabs), stack navigation, gesture patterns, deep linking
- **Core Screen Designs**: 
  - Daily Question (Home tab)
  - Discussion/Post Listing
  - Argument Submission (Write tab)
  - Profile Screen
  - Vault (Saved Arguments)
- **Mobile-Specific Components**:
  - ArgumentCard (collapsed/expanded states)
  - DepthScore visualization
  - Streak display & gamification
  - PhilosophyKeyboard templates
  - Floating action buttons
- **Reading Experience Optimization**:
  - Typography scale for mobile (12-28pt range)
  - Dark mode implementation with color palette
  - Accessibility requirements (VoiceOver, Dynamic Type, contrast ratios)
- **Interaction Patterns**:
  - Quick actions via gestures
  - Voice-to-text argument submission
  - Draft auto-save mechanism
  - Notification handling
  - Haptic feedback mapping
- **iOS HIG Compliance**: Full checklist
- **Implementation Priorities**: Phased roadmap (4 phases, 12+ weeks)

**Use this document for**: Implementation kickoff, developer reference, designer handoff

---

### 2. **GESTURE_INTERACTION_MAP.md** (14 KB) - INTERACTION FLOWS
**Detailed gesture patterns and flow diagrams:**

#### Sections:
- **Gesture Interaction Flows** (5 primary flows):
  1. Quick Snap Vote (Double-Tap)
  2. Swipe-to-Vote (Horizontal Reveal)
  3. Pull-to-Refresh
  4. Long-Press Context Menu
  5. Pinch-to-Zoom (Reading View)
- **Screen Transition Flows**:
  - Tab switching navigation
  - Modal sheet presentation
  - Full-screen modal (editor)
- **Specific Interaction Details**:
  - Argument card expand/collapse
  - Depth score breakdown reveal
  - Streak shield purchase animation
  - Voice dictation waveform
- **Accessibility Gesture Customization**: VoiceOver-optimized gestures
- **Gesture Conflict Resolution**: Priority matrix
- **Animation Curves & Timing**: Spring curves, easing functions, timing values

**Use this document for**: Interaction design, animation implementation, gesture conflict resolution

---

### 3. **IOS_DESIGN_SUMMARY.md** (16 KB) - EXECUTIVE SUMMARY
**High-level overview and compliance checklist:**

#### Sections:
- **Project Overview**: Goals and design philosophy
- **Navigation Architecture**: Tab bar, navigation patterns
- **Core Screens Design Specs**: Quick summary of each screen
- **Mobile-Specific Components**: Component reference
- **Gesture Interaction Patterns**: Quick gesture table
- **Reading Experience Optimization**: Typography, dark mode, accessibility
- **iOS HIG Compliance Checklist**: ✅ items for all categories
- **Accessibility Compliance Checklist**: Visual, audio, motor, cognitive, assistive tech
- **Implementation Roadmap**: 4-phase delivery schedule
- **File Structure**: Suggested Swift project organization
- **Design Tokens**: Swift code for colors, fonts, layout
- **Success Metrics**: KPIs for engagement, quality, retention
- **Resources**: Links to Apple docs, tools, testing

**Use this document for**: Stakeholder presentations, executive briefings, quick reference

---

## Key Design Decisions

### Navigation Model
- **Bottom tab bar** (not side drawer) following iOS standard
- 5 tabs: Home → Posts → Write → Vault → Profile
- Scroll position preserved per tab
- Modal sheets for creation flows

### Typography Strategy
- Base body text: 16pt, Plus Jakarta Sans, weight 500
- Line height: 1.6-1.8 (generous for reading)
- Mobile-first: 60-75 character line length
- Dynamic Type support: 50%-200% scaling

### Interaction Model
- **Snap vote** = double-tap or swipe right
- **Zap vote** = swipe left to reveal or long-press
- **Pull-to-refresh** = 60pt downward swipe
- **Haptic feedback** = light/medium/heavy per action type

### Gamification Features
- Streak display with daily protection shield
- Depth score with animated breakdown
- Influence metrics visible in multiple contexts
- Achievements/badges (horizontal scroll)

### Accessibility-First
- VoiceOver full support (semantic labels, hints, values)
- Dark mode as core feature (not addon)
- Dynamic Type 50%-200% scaling
- 4.5:1 contrast minimum for body text
- 44x44pt minimum touch targets

---

## Quick Reference: Screen Dimensions

### Safe Areas
- Status bar + notch: 44-50pt
- Bottom safe area (home indicator): 34pt
- Tab bar (outside safe area): 49pt
- Horizontal padding: 16pt standard

### Card Dimensions
- Standard card corner radius: 12pt
- Large card corner radius: 16pt
- Shadow: 0 2pt 8pt rgba(0,0,0,0.08) light
- Standard card padding: 16pt

### Typography Baseline
- Headlines (H1): 28pt, weight: 900
- Section titles (H2): 20pt, weight: 900
- Body text: 16pt, weight: 500
- Secondary text: 14pt, weight: 500
- Captions: 12pt, weight: 500
- Meta: 11pt, weight: 500

---

## Color System (Inherited from Web Design System)

### Primary Colors (Teal)
- Teal-500: Primary CTA button, active icons
- Teal-600: Active tab, hover states
- Teal-400: Dark mode accent (brighter)

### Neutral Colors (Slate)
- Slate-900: Headlines, primary text
- Slate-600: Secondary text, meta
- Slate-400: Disabled, tertiary
- Slate-200: Borders, dividers

### Dark Mode Overrides
- Background: Slate-950 (vs white)
- Text: Slate-50 (vs slate-900)
- Borders: Slate-800 (vs slate-200)
- Accent: Teal-400 (vs teal-600) - brighter for contrast

---

## Implementation Guide by Document

### For Developers
1. **Start with**: IOS_DESIGN_SUMMARY.md → Understand the big picture
2. **Then read**: MOBILE_DESIGN_SPEC.md → Get implementation details
3. **Reference**: GESTURE_INTERACTION_MAP.md → For interaction code

### For Designers
1. **Start with**: MOBILE_DESIGN_SPEC.md → Full design details
2. **Then study**: GESTURE_INTERACTION_MAP.md → Animation curves and timing
3. **Share**: IOS_DESIGN_SUMMARY.md → Stakeholder communication

### For Product Managers
1. **Quick read**: IOS_DESIGN_SUMMARY.md (15 min)
2. **Deep dive**: Implementation Roadmap section
3. **Track**: Success Metrics section

---

## Phased Delivery Timeline

### Phase 1: MVP (Weeks 1-4)
- Bottom tab navigation
- Home & Posts screens  
- Argument detail view
- Profile stats
- Dark mode support

### Phase 2: Enhanced (Weeks 5-8)
- Argument creation flow
- Draft auto-save
- Vault screen
- Streak display with protection
- Search & filters

### Phase 3: Advanced (Weeks 9-12)
- Voice-to-text dictation
- PhilosophyKeyboard templates
- Push notifications
- Moderation UI
- Achievements system

### Phase 4: Polish (Post-launch)
- Apple Watch companion
- iPad optimization
- iCloud sync
- Siri integration
- WidgetKit support

---

## Design System Alignment

All mobile designs inherit from `/DESIGN_SYSTEM.md`:
- **Primary color**: Teal (actions, CTAs, accents)
- **Neutral color**: Slate (text, borders)
- **Background**: White/Stone (with subtle gradients)
- **Font**: Plus Jakarta Sans (web-safe, accessible)
- **Typography hierarchy**: Font-black (headlines), font-medium (body)
- **Spacing**: 8pt grid system
- **Components**: Rounded corners, shadow depth, smooth transitions

---

## Accessibility Standards Met

### WCAG 2.1 Level AA (Minimum)
- [x] Color contrast 4.5:1 body text
- [x] 44x44pt minimum touch targets
- [x] Keyboard navigation
- [x] Dark mode support

### WCAG 2.1 Level AAA (Excellence)
- [x] 7:1 color contrast (body text in dark mode)
- [x] Adjustable text sizing (Dynamic Type 50%-200%)
- [x] VoiceOver full support
- [x] Focus indicators visible

### Apple Accessibility Standards
- [x] VoiceOver optimized (semantic labels, hints)
- [x] Switch Control compatible (44pt+ targets)
- [x] Voice Control support
- [x] Zoom magnification (up to 200%)
- [x] Smart Invert (colors adapt)

---

## File Locations

- **Main Design Spec**: `/MOBILE_DESIGN_SPEC.md` (58 KB)
- **Gesture Reference**: `/GESTURE_INTERACTION_MAP.md` (14 KB)
- **Summary & Checklist**: `/IOS_DESIGN_SUMMARY.md` (16 KB)
- **This Index**: `/MOBILE_DESIGN_INDEX.md` (this file)

---

## Related Documents

### Web Design System
- `/DESIGN_SYSTEM.md` - Primary design system (colors, typography, components)

### Project Documentation
- `/CLAUDE.md` - Project overview and development guidelines
- `/README.md` - Getting started guide

---

## Next Steps for Implementation

1. **Review** this index and IOS_DESIGN_SUMMARY.md (1-2 hours)
2. **Study** MOBILE_DESIGN_SPEC.md in detail (4-6 hours)
3. **Map gestures** using GESTURE_INTERACTION_MAP.md (2 hours)
4. **Set up project**: Create Swift project with file structure from summary
5. **Create design tokens**: Colors, typography, layout constants
6. **Build screens**: Start with Phase 1 (Home, Posts, Profile)
7. **Implement interactions**: Add gestures and haptic feedback
8. **Test accessibility**: VoiceOver, Dynamic Type, high contrast

---

## Design Deliverables Checklist

### Visual Specifications
- [x] Screen layouts with dimensions
- [x] Typography scale and line heights
- [x] Color system with dark mode
- [x] Component specifications with spacing
- [x] Icon sizing and placement

### Interaction Specifications
- [x] Gesture patterns with thresholds
- [x] Animation curves and timing
- [x] Haptic feedback patterns
- [x] State transitions
- [x] Error/loading states

### Accessibility Specifications
- [x] VoiceOver labels and hints
- [x] Focus indicator styling
- [x] Contrast ratios
- [x] Touch target sizes
- [x] Dynamic Type support

### Implementation Resources
- [x] File structure suggestion
- [x] Swift design tokens
- [x] Development roadmap
- [x] Phase-by-phase features
- [x] Success metrics

---

## Key Contacts & Questions

### About Navigation
→ See: MOBILE_DESIGN_SPEC.md Section 1.1-1.4

### About Screen Designs
→ See: MOBILE_DESIGN_SPEC.md Section 2.1-2.5

### About Components
→ See: MOBILE_DESIGN_SPEC.md Section 3.1-3.5

### About Interactions
→ See: GESTURE_INTERACTION_MAP.md

### About Accessibility
→ See: MOBILE_DESIGN_SPEC.md Section 4.3, IOS_DESIGN_SUMMARY.md Accessibility section

### About Timeline
→ See: IOS_DESIGN_SUMMARY.md Implementation Roadmap section

---

## Document Version History

- **v1.0** - November 21, 2025
  - Initial comprehensive mobile design specifications
  - 3-document structure (Spec, Gestures, Summary)
  - Full iOS HIG compliance
  - Accessibility-first approach
  - 4-phase implementation roadmap

---

**Total Design Documentation**: 88 KB across 4 files
**Time to Review**: 2-3 hours (all documents)
**Time to Implement**: 12-16 weeks (4 phases)
**Target Release**: iOS 16+ (iPhone)

