# WONDER iOS App - Executive Summary

## Overview

This document provides a high-level overview of the iOS app development plan for WONDER, a philosophical conversation platform. The app will be built using **React Native with Expo** and will share the backend infrastructure (Supabase) with the existing Next.js web application.

**Key Facts:**
- Development Timeline: 8-12 weeks
- Platform: iOS 14+
- Technology: React Native + Expo + Supabase
- Architecture: Offline-first with real-time sync
- Reusable Code: ~40% of business logic shared with web
- Component Rewrite Required: ~60% new or substantially adapted

---

## Architecture Overview

### Technology Stack

```
Frontend Layer
├── Expo 51.x (app framework)
├── React Native 0.73
├── Expo Router (navigation)
├── NativeWind (styling)
├── React Query (state management)
└── TypeScript (type safety)

Backend Layer
├── Supabase PostgreSQL
├── Supabase Auth
├── Supabase Real-time
└── Google Gemini AI (judgment engine)

Infrastructure
├── EAS Build (Expo build service)
├── EAS Submit (App Store submission)
└── GitHub Actions (CI/CD)
```

### Key Differences from Web App

| Aspect | Web (Next.js) | Mobile (React Native) |
|--------|---------------|----------------------|
| **Navigation** | Next.js App Router | Expo Router |
| **Styling** | Tailwind CSS | NativeWind + StyleSheet |
| **Storage** | localStorage | AsyncStorage |
| **Auth** | Middleware | Context Provider |
| **Offline** | None | Full sync queue |
| **Notifications** | Web Push | Native Push (Expo) |
| **Session** | URL-based | Token-based |
| **Build** | Vercel | EAS Build |

---

## Project Structure at a Glance

```
wonder-ios/
├── app/                    # Expo Router (file-based routing)
│   ├── (auth)/            # Unauthenticated screens
│   └── (authenticated)/   # Protected screens with tabs
├── src/
│   ├── api/               # Supabase queries
│   ├── hooks/             # React Query + custom hooks
│   ├── components/        # Reusable UI components
│   ├── context/           # Auth + Theme state
│   ├── services/          # Offline sync, notifications, deep linking
│   ├── utils/             # Helpers, constants
│   ├── types/             # TypeScript definitions
│   └── styles/            # Design tokens
├── assets/                # Images, fonts, icons
├── eas.json               # Build configuration
├── app.config.ts          # Dynamic app config
└── package.json
```

---

## Core Features & MVP Scope

### Phase 1: Foundation (Weeks 1-3)
**Goal**: Establish development infrastructure and authentication

- Project setup with Expo
- Supabase client for React Native
- Email/password authentication
- Login & signup screens
- Auth context provider
- Bottom tab navigation

**Deliverable**: Authenticated shell with working login/signup

### Phase 2: Core Features (Weeks 4-6)
**Goal**: Implement main debate functionality

- Debate listing with infinite scroll
- Debate detail view with arguments
- Basic voting system (snap/zap)
- User profile viewing
- Real-time debate updates
- Offline caching

**Deliverable**: Core debate experience working on/offline

### Phase 3: Advanced Features (Weeks 7-9)
**Goal**: Add engagement and personalization

- Push notifications
- Journal/vault feature
- Deeper profile customization
- Depth scoring display
- Streak tracking
- Image uploads

**Deliverable**: Feature-complete experience parity with web

### Phase 4: Polish (Weeks 10-12)
**Goal**: Production readiness

- Performance optimization
- Bug fixes and testing
- TestFlight beta release
- App Store submission
- Marketing collateral

**Deliverable**: v1.0.0 in App Store

---

## Component Porting Strategy

### Tiers of Work

**Tier 1 - Core Business Logic (Reusable)**
- Debate scoring calculations
- Validation functions
- Data formatting helpers
- Status mapping
- Type definitions

Effort: 20% (reuse from web)

**Tier 2 - Moderate Adaptation (Light Rewrites)**
- DebateCard, ArgumentCard components
- VoteButtons logic
- LoginForm structure
- Profile display logic

Effort: 35% (requires mobile adaptation)

**Tier 3 - Complete Rewrites (Mobile-Specific)**
- Navigation components (Tabs, Drawer)
- Form inputs (TextInput, Picker)
- Layout components (SafeArea, ScrollView)
- Modal components
- Navigation headers

Effort: 45% (new mobile implementations)

### High Priority Components to Port

1. **Button** - From HTML to Pressable
2. **Card** - From div to View with styling
3. **Input** - From HTML to TextInput
4. **DebateCard** - Core logic reusable, UI rebuilt
5. **LoginForm** - Structure reusable, form handling adapted
6. **Header** - Complete rewrite for mobile
7. **Tabs Navigation** - Complete rewrite for mobile tabs

---

## Service Layer Adaptation

### Supabase Client
- **Web**: Uses localStorage for session
- **Mobile**: Uses AsyncStorage for session
- Same API, different persistence layer

### Authentication Flow
- **Web**: Middleware-based auth checks
- **Mobile**: Context-based auth checks
- Same Supabase Auth, different UX flow

### Offline Support (Mobile-Only Feature)
- Action queuing system
- AsyncStorage for cached data
- Network state detection
- Automatic sync when online

### Push Notifications (Mobile-Only Feature)
- Expo Notifications API
- Device token registration
- Deep linking from notifications

---

## Dependency Overview

### Critical Dependencies (Must Have)
```
expo (framework)
expo-router (navigation)
react-native (core framework)
@supabase/supabase-js (backend)
@tanstack/react-query (state management)
nativewind (styling)
```

### Important Dependencies (Major Features)
```
expo-notifications (push notifications)
expo-haptics (haptic feedback)
@react-native-community/netinfo (offline detection)
react-native-async-storage (offline storage)
@google/generative-ai (Gemini AI)
```

### Optional Dependencies (Nice to Have)
```
expo-camera (avatar upload)
expo-image-picker (image selection)
react-native-fast-image (image caching)
detox (E2E testing)
```

---

## Build & Deployment Pipeline

### Local Development
```bash
npx expo start    # Start development server
npm run ios       # Run on iOS simulator
npm run test      # Run unit tests
```

### Continuous Integration (GitHub Actions)
```
PR created
  ↓
Run lint + tests
  ↓
Build for preview (internal distribution)
  ↓
Deploy to TestFlight (on merge to main)
```

### Release to App Store
```bash
eas build --platform ios --profile production
eas submit --platform ios --profile production
```

**Timeline**: Automatic on push to main branch

---

## Key Technical Decisions

### 1. Offline-First Architecture
- **Why**: Mobile users have spotty connectivity
- **How**: AsyncStorage queue + React Query cache
- **Trade-off**: Added complexity for better UX

### 2. React Query for State Management
- **Why**: Mature, battle-tested library with Supabase ecosystem
- **How**: Server state in React Query, UI state in Context
- **Trade-off**: Larger bundle (but justified for data-heavy app)

### 3. NativeWind for Styling
- **Why**: Use existing Tailwind knowledge
- **How**: Tailwind config + NativeWind classes
- **Trade-off**: Less mature than StyleSheet, but rapid development

### 4. Expo for Framework
- **Why**: Managed platform, easy builds, built-in services
- **How**: Expo SDK + EAS Build for native binaries
- **Trade-off**: Less customization than bare React Native

### 5. Shared Type Definitions
- **Why**: Single source of truth for data models
- **How**: Sync database.types.ts between web and mobile
- **Trade-off**: Need to keep files in sync

---

## Estimated Effort Breakdown

| Component | Type | Effort | Dependencies |
|-----------|------|--------|--------------|
| Setup & Auth | Feature | 1 week | Supabase SDK |
| Navigation | Infrastructure | 1 week | Expo Router |
| Debate Listing | Feature | 1 week | React Query |
| Debate Detail | Feature | 1 week | React Query |
| Voting System | Feature | 3 days | Offline sync |
| Profile Screens | Feature | 5 days | Supabase |
| Notifications | Feature | 4 days | Expo |
| Journal/Vault | Feature | 5 days | Images |
| Testing & QA | QA | 2 weeks | All features |
| Performance | Optimization | 3 days | All |
| Deployment Setup | DevOps | 3 days | EAS |
| **TOTAL** | | **10-12 weeks** | |

---

## Success Metrics

### Technical Metrics
- App Store Review approval
- <5 second cold start time
- Offline functionality working for 95% of use cases
- Zero crash-on-startup bugs
- <50 MB bundle size

### User Metrics
- Launch with v1.0.0 complete feature parity
- 100+ beta testers via TestFlight
- 4.5+ star rating on App Store
- 80%+ retention after 7 days

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Offline sync complexity | High | Start with simple queue, iterate |
| Performance issues | High | Profile early, optimize bottlenecks |
| Supabase real-time latency | Medium | Implement optimistic updates |
| App Store approval delays | Medium | Submit early, clear documentation |
| Unfamiliar React Native patterns | Medium | Invest in learning, peer review |
| Incomplete feature parity | Medium | Prioritize MVP, cut nice-to-haves |

---

## Development Team Recommendations

### Team Composition
- **1 React Native Developer** (lead) - Full-time
- **1 Backend Developer** (part-time) - For Supabase optimization
- **1 QA/Tester** (part-time) - Testing on real devices
- **1 Designer** (as-needed) - Mobile-specific UX adjustments

### Skills Required
- React Native & Expo experience
- TypeScript proficiency
- Supabase/PostgreSQL basics
- Mobile development mindset (offline-first, performance)
- iOS simulator debugging

---

## Next Steps

1. **Immediate** (Week 1)
   - Set up Expo project from this specification
   - Create Supabase client adapter
   - Implement authentication flow
   - Set up GitHub Actions CI/CD

2. **Short-term** (Weeks 2-4)
   - Port core components
   - Implement debate listing
   - Set up React Query
   - Begin testing on physical devices

3. **Medium-term** (Weeks 5-8)
   - Implement offline sync
   - Add push notifications
   - Complete all feature screens
   - Comprehensive testing

4. **Pre-launch** (Weeks 9-12)
   - Performance optimization
   - TestFlight beta distribution
   - App Store submission
   - Monitor reviews and feedback

---

## Resources & References

### Documentation
- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Supabase React Native](https://supabase.com/docs/reference/javascript)
- [NativeWind Docs](https://www.nativewind.dev)

### Tools
- Expo Go (development app)
- TestFlight (beta testing)
- Xcode (iOS simulator)
- EAS CLI (builds and submissions)

### Dependencies
- See full list in IOS_IMPLEMENTATION_PLAN.md Section 6

---

## Conclusion

The WONDER iOS app is technically feasible with a 10-12 week timeline. The key to success is:

1. **Leverage existing backend** - No changes needed to Supabase
2. **Share business logic** - Reuse validation, calculations, types
3. **Offline-first design** - Plan for connectivity issues
4. **Iterative development** - Ship MVP, then add features
5. **Early testing** - Use TestFlight extensively before App Store

This specification provides all necessary technical guidance to begin development immediately.

