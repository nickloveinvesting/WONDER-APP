# WONDER iOS App - Implementation Plan

**Decision Date:** November 21, 2025
**Target Launch:** 4-6 weeks from development start
**Approach:** React Native + Expo (EAS Build)

---

## Executive Summary

After comprehensive analysis of 4 development approaches, **React Native with Expo** is the recommended path for WONDER's iOS app. This approach balances speed-to-market, code reuse, native performance, and App Store approval likelihood.

---

## 1. Chosen Approach: React Native + Expo

### 1.1 Why React Native Wins

| Factor | React Native | Capacitor | PWA+Wrapper | Native Swift |
|--------|-------------|-----------|-------------|--------------|
| **Timeline** | 4-5 weeks ✅ | 3.5-4 weeks* | 4-6 weeks* | 6-8 weeks ❌ |
| **Code Reuse** | 40-50% | 95% | 98% | 5-10% |
| **Dev Cost** | $57.6K | $22.2K | $16.8K | $85K+ |
| **App Store Approval** | 95% ✅ | 60-70% | 30-40% | 98% |
| **Performance** | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐ (3/5) | ⭐⭐⭐ (3/5) | ⭐⭐⭐⭐⭐ (5/5) |
| **Risk Level** | MEDIUM | HIGH | CRITICAL | LOW |

*Timeline includes unpredictable debugging time

### 1.2 Key Justifications

**For React Native:**
1. **Native Performance** - True native rendering, not WebView (critical for text-heavy philosophical discussions)
2. **High Approval Rate** - 95%+ first-time App Store approval (vs 30-40% for PWA wrappers)
3. **Code Reuse** - 40-50% of Next.js business logic directly transferable
4. **Future-Proof** - Same codebase can deploy to Android (60% code reuse)
5. **Over-the-Air Updates** - Push fixes without App Store review via Expo EAS
6. **Familiar Stack** - JavaScript/TypeScript, React patterns match existing web codebase

**Against Alternatives:**
- **Capacitor**: 95% code reuse but WebView performance issues and only 60-70% approval rate
- **PWA+Wrapper**: Apple actively rejects "web wrapper" apps (Guideline 4.2.6)
- **Native Swift**: Misses 4-6 week timeline, requires specialized iOS developer at $200+/hr

### 1.3 Target Audience Alignment

WONDER's audience (intellectual adults 25-45) expects:
- Smooth scrolling through long-form arguments
- Responsive haptic feedback for Snap/Zap interactions
- Native iOS gestures (swipe back, pull-to-refresh)
- Dark mode for evening philosophical reading
- Accessibility support (VoiceOver, Dynamic Type)

React Native delivers all of these natively.

---

## 2. Week-by-Week Development Timeline

### Phase Overview

```
Week 0: Pre-Development Setup (3-5 days)
Week 1: Foundation & Core Infrastructure
Week 2: Feature Development - Part 1
Week 3: Feature Development - Part 2
Week 4: Testing, Polish & Submission
Week 5-6: App Store Review & Launch
```

---

### Week 0: Pre-Development Setup (3-5 Days)

**Day 1-2: Team & Infrastructure**
- [ ] Assign 2 React developers (or 1 React + 1 React Native contractor)
- [ ] Create Apple Developer Account ($99/year)
- [ ] Set up Expo account and EAS Build access
- [ ] Brief team on WONDER architecture and codebase

**Day 3-5: Technical Spike**
- [ ] Initialize Expo project with TypeScript
- [ ] Integrate Supabase client with AsyncStorage
- [ ] Build sample debate list screen
- [ ] Test NativeWind (Tailwind) styling compatibility
- [ ] Verify EAS Build → TestFlight pipeline

**Deliverables:**
- Working Expo project with Supabase auth
- List of NativeWind incompatibilities identified
- Build pipeline verified

---

### Week 1: Foundation & Core Infrastructure

**Day 1-2: Project Setup**
```bash
# Initialize project
npx create-expo-app@latest wonder-ios --template tabs
cd wonder-ios

# Install core dependencies
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage
npx expo install nativewind tailwindcss
npx expo install @tanstack/react-query
npx expo install expo-haptics expo-notifications expo-linking
```

- [ ] Configure Expo Router file-based navigation
- [ ] Set up NativeWind with WONDER color palette
- [ ] Create base component library (Button, Card, Input, Badge)
- [ ] Implement theme context (light/dark mode)

**Day 3-4: Authentication**
- [ ] Port Supabase client (AsyncStorage instead of localStorage)
- [ ] Implement login/signup screens
- [ ] Create AuthContext provider
- [ ] Set up protected route guards
- [ ] Test auth flow on physical device

**Day 5: Navigation Structure**
- [ ] Implement bottom tab navigation (5 tabs)
- [ ] Create stack navigators for each tab
- [ ] Configure deep linking (wonder:// URL scheme)
- [ ] Add splash screen and app icon

**Deliverables:**
- Complete navigation structure
- Working authentication flow
- Base component library
- Physical device testing begun

---

### Week 2: Feature Development - Part 1

**Developer A: Home & Feed**
- [ ] Daily Question screen (hero card + stats)
- [ ] Discussion listing with filters
- [ ] Pull-to-refresh implementation
- [ ] Infinite scroll pagination
- [ ] Search functionality

**Developer B: Debates & Arguments**
- [ ] Debate detail screen
- [ ] Argument cards (collapsed/expanded)
- [ ] DepthScore component
- [ ] Create debate flow
- [ ] Join debate functionality

**Shared Tasks:**
- [ ] Implement React Query for data fetching
- [ ] Add loading states and error handling
- [ ] Begin offline caching strategy
- [ ] Daily standup coordination

**Deliverables:**
- Home tab functional
- Debates tab functional
- Core user flows working

---

### Week 3: Feature Development - Part 2

**Developer A: Engagement Features**
- [ ] Snap/Zap voting with haptic feedback
- [ ] Streak display component
- [ ] Influence metrics
- [ ] User profile screen
- [ ] Leaderboard

**Developer B: Content Creation & Vault**
- [ ] Argument submission flow
- [ ] Rich text editor (basic markdown)
- [ ] Draft auto-save
- [ ] Journal/Vault screen
- [ ] Saved arguments management

**Shared Tasks:**
- [ ] Push notification setup
- [ ] Offline action queue implementation
- [ ] Performance optimization (FlatList virtualization)
- [ ] Accessibility audit (VoiceOver, Dynamic Type)

**Deliverables:**
- All 5 tabs functional
- Voting system working
- Content creation working
- Offline support implemented

---

### Week 4: Testing, Polish & Submission

**Day 1-2: Comprehensive Testing**
- [ ] Test on iPhone 13, 14, 15 (various screen sizes)
- [ ] Test on iOS 15, 16, 17, 18
- [ ] Test dark mode on all screens
- [ ] Test with network interruption
- [ ] Test with slow network (Network Link Conditioner)
- [ ] Test accessibility (VoiceOver walkthrough)
- [ ] Fix critical bugs

**Day 3-4: Polish & Optimization**
- [ ] Performance profiling (Xcode Instruments)
- [ ] Memory leak detection
- [ ] Bundle size optimization
- [ ] Animation smoothness review
- [ ] Typography and spacing consistency
- [ ] Error message review

**Day 5: App Store Preparation**
- [ ] Generate App Store screenshots (5 required)
- [ ] Create app preview video (optional but recommended)
- [ ] Write App Store description and keywords
- [ ] Complete privacy policy and terms
- [ ] Fill out App Store Connect metadata

**Day 6-7: Submission**
- [ ] Final QA pass
- [ ] Build production release with EAS Build
- [ ] Upload to TestFlight for final review
- [ ] Submit to App Store Review

**Deliverables:**
- Production-ready build
- Complete App Store listing
- TestFlight beta available
- App submitted for review

---

### Week 5-6: App Store Review & Launch

**Expected Timeline:**
- App Store Review: 3-7 business days
- If rejected: Fix issues (1-3 days), resubmit
- Approval → Launch coordination

**Launch Day Activities:**
- [ ] Press App Store "Release" button
- [ ] Social media announcements
- [ ] ProductHunt launch
- [ ] Philosophy community outreach
- [ ] Monitor crash reports and reviews

---

## 3. Resource Requirements

### 3.1 Team Composition

| Role | Count | Hourly Rate | Hours | Total |
|------|-------|-------------|-------|-------|
| React Native Developer | 2 | $150/hr | 160 each | $48,000 |
| QA Tester | 1 | $75/hr | 40 | $3,000 |
| Designer (part-time) | 1 | $100/hr | 40 | $4,000 |
| Project Manager | 1 | $125/hr | 20 | $2,500 |
| **Total Development** | | | | **$57,500** |

### 3.2 Infrastructure Costs

| Service | Monthly Cost | Notes |
|---------|-------------|-------|
| Supabase | $0-25 | Free tier likely sufficient |
| Gemini API | $50-100 | Based on current usage |
| Expo EAS Build | $0-29 | Starter plan sufficient |
| Apple Developer | $8.25 | $99/year |
| **Monthly Total** | **$58-162** | |

### 3.3 New Skills Required

**Must Have:**
- React Native basics (2-3 day ramp-up for React devs)
- Expo Router navigation
- NativeWind/React Native styling

**Nice to Have:**
- iOS Human Interface Guidelines familiarity
- App Store submission experience
- Performance profiling

### 3.4 External Services

| Service | Purpose | Required? |
|---------|---------|-----------|
| Expo EAS | Build & deployment | Yes |
| Apple Developer | App Store submission | Yes |
| TestFlight | Beta testing | Yes |
| Sentry | Crash reporting | Recommended |
| Analytics (Mixpanel/Amplitude) | User tracking | Recommended |

---

## 4. Code Reuse Analysis

### 4.1 Directly Reusable (100%)

```
Files to COPY unchanged:
├── lib/database.types.ts      → src/types/database.ts
├── lib/gemini.ts              → src/api/gemini.ts
├── Design tokens (colors)     → src/styles/colors.ts
└── All business logic         → src/utils/
```

### 4.2 Adaptable (80-90%)

```
Files requiring minor changes:
├── lib/supabase/client.ts     → AsyncStorage instead of localStorage
├── lib/actions/*.ts           → Same logic, different imports
└── Validation logic           → Works identically
```

### 4.3 Complete Rewrite (0%)

```
Must be rebuilt for mobile:
├── All React components       → React Native components
├── app/ pages                 → Expo Router screens
├── Navigation                 → Bottom tabs + stack nav
└── Styling                    → NativeWind/StyleSheet
```

### 4.4 Total Transferable

- **Lines of code:** ~6,000 of 20,000 (30%)
- **Logic reuse:** ~50% of business logic
- **Time saved:** ~1.5-2 weeks of development

---

## 5. Risk Assessment & Mitigation

### 5.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Scrolling performance with 100+ items | Medium | High | FlatList virtualization, early testing |
| NativeWind styling gaps | Low | Medium | Audit in Week 1, fallback to StyleSheet |
| Supabase real-time issues | Medium | Medium | Reconnection logic, polling fallback |
| iOS-specific bugs | Medium | Medium | Physical device testing from Day 1 |
| Build time delays | Low | Low | EAS Build caching, parallel builds |

### 5.2 Timeline Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Feature creep | High | High | Strict MVP scope, daily standups |
| Developer availability | Medium | High | Cross-training, documentation |
| App Store rejection | Low | Medium | Follow guidelines strictly, moderation ready |
| Testing delays | Medium | Medium | Parallel testing, automated where possible |

### 5.3 App Store Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Guideline 1.2 (UGC) rejection | Medium | High | Implement reporting, blocking, moderation |
| Performance rejection | Low | Medium | Thorough device testing |
| Metadata rejection | Low | Low | Review guidelines, no prohibited terms |

### 5.4 Contingency Plan

**If React Native approach fails (unlikely):**
- Switch to Capacitor (adds 2-3 days, most code portable)
- Reduces approval likelihood to 60-70%
- Maintain web app as primary platform

---

## 6. Success Criteria

### 6.1 Development Success

- [ ] App loads in < 3 seconds on iPhone 13
- [ ] All 5 tabs functional with real data
- [ ] Offline mode works for reading
- [ ] No crashes during 30-minute session
- [ ] Dark mode complete
- [ ] Accessibility passes VoiceOver audit

### 6.2 Launch Success (First 30 Days)

| Metric | Target |
|--------|--------|
| App Store Rating | 4.0+ |
| Downloads | 500+ |
| Crash-free sessions | > 99% |
| Day 1 retention | > 40% |
| Day 7 retention | > 20% |

### 6.3 Business Success (First 90 Days)

| Metric | Target |
|--------|--------|
| Monthly Active Users | 1,000+ |
| Arguments created | 100+ per week |
| Debates completed | 50+ per week |
| Average session length | > 5 minutes |

---

## 7. Immediate Next Steps (This Week)

### Today

1. **Decision:** Confirm React Native approach with stakeholders
2. **Account:** Create Apple Developer account if not exists
3. **Team:** Identify 2 React developers for project

### This Week

4. **Spike:** Run 2-3 day technical proof-of-concept
   - Expo + Supabase + basic debate list
   - Verify build → TestFlight pipeline
5. **Planning:** Create detailed task breakdown in project tracker
6. **Design:** Review mobile UI specs, confirm component list

### Before Week 1

7. **Environment:** Set up development machines with Xcode 16
8. **Access:** Ensure all developers have Supabase access
9. **Kickoff:** Team kickoff meeting with WONDER walkthrough

---

## 8. Reference Documents

Created by research agents (see project root):

| Document | Purpose |
|----------|---------|
| `iOS_RESEARCH_SUMMARY.md` | Executive decision summary |
| `iOS_RESEARCH_REPORT.md` | Deep technical analysis |
| `REACT_NATIVE_IMPLEMENTATION_GUIDE.md` | Day-by-day coding guide |
| `IOS_IMPLEMENTATION_PLAN.md` | Full technical specification |
| `IOS_COMPONENT_PORTING_MATRIX.md` | Component-by-component guide |
| `MOBILE_DESIGN_SPEC.md` | UI/UX specifications |
| `GESTURE_INTERACTION_MAP.md` | Interaction patterns |
| `APP_STORE_LAUNCH_STRATEGY.md` | Submission playbook |

---

## Appendix A: Tech Stack Summary

```
Framework:        React Native 0.73+
Platform:         Expo SDK 51 (managed workflow)
Navigation:       Expo Router (file-based)
Styling:          NativeWind (Tailwind for RN)
State:            React Query + Context API
Storage:          AsyncStorage (offline)
Backend:          Supabase (existing)
AI:               Google Gemini (existing)
Build:            Expo EAS Build
Distribution:     TestFlight → App Store
```

---

## Appendix B: Budget Summary

| Category | One-Time | Monthly | Year 1 Total |
|----------|----------|---------|--------------|
| Development | $57,500 | - | $57,500 |
| Apple Developer | $99 | - | $99 |
| Infrastructure | - | $58-162 | $696-1,944 |
| **Total** | **$57,599** | **$58-162** | **$58,295-59,543** |

---

**Document Version:** 1.0
**Last Updated:** November 21, 2025
**Confidence Level:** 95%
