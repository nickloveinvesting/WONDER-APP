# WONDER iOS - Quick Reference Guide

**For busy developers who need answers fast.**

---

## In 30 Seconds

**What**: React Native iOS app for WONDER philosophical platform
**Why**: Mobile-first users, offline support, push notifications
**How**: Expo framework, Supabase backend, React Query state management
**When**: 10-12 weeks to launch
**Who**: 1-2 React Native developers

---

## Quick Tech Stack

```
Frontend: React Native 0.73 + Expo 51
Navigation: Expo Router (file-based)
State: React Query + Context API
Styling: NativeWind + StyleSheet
Storage: AsyncStorage (offline cache)
Backend: Supabase (shared with web)
Notifications: Expo Notifications
CI/CD: GitHub Actions + EAS Build
```

---

## Project Setup (5 minutes)

```bash
# Create project
npx create-expo-app wonder-ios
cd wonder-ios

# Install core dependencies
npm install expo-router expo-notifications @supabase/supabase-js
npm install @tanstack/react-query @react-native-community/netinfo
npm install react-native-async-storage react-hook-form
npm install nativewind tailwindcss

# Configure environment
cp .env.example .env.local

# Start development
npx expo start
```

---

## File Structure Cheat Sheet

```
wonder-ios/
├── app/                    # Routes (Expo Router)
│   ├── (auth)/            # Login/signup screens
│   └── (authenticated)/   # Protected screens
├── src/
│   ├── api/               # Supabase queries
│   ├── hooks/             # React Query hooks
│   ├── components/        # UI components
│   ├── context/           # Auth/Theme providers
│   ├── services/          # Offline sync, notifications
│   └── types/             # TypeScript types
├── assets/                # Images, fonts
├── eas.json              # Build config
└── app.config.ts         # App settings
```

---

## Component Porting at a Glance

| # | Component | Status | Time |
|---|-----------|--------|------|
| 1 | Button | ⚡ Rewrite | 4h |
| 2 | Card | ⚡ Rewrite | 3h |
| 3 | Input | ⚡ Rewrite | 3h |
| 4 | Header | ⚡ Rewrite | 1d |
| 5 | DebateCard | 🔄 Adapt | 1d |
| 6 | LoginForm | 🔄 Adapt | 1d |
| 7 | DebatesListTemplate | 🔄 Adapt | 1d |
| 8 | SingleDebateTemplate | 🔄 Adapt | 1d |
| 9 | VoteButtons | 🔄 Adapt | 4h |

**Summary**: 0 reuse, 18 adapts, 13 rewrites, 4 defers

---

## Phase Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| 1: Foundation | Wk 1-3 | Authenticated shell |
| 2: Core | Wk 4-6 | Debate listing & voting |
| 3: Advanced | Wk 7-9 | Notifications, journal |
| 4: Polish | Wk 10-12 | App Store launch |

---

## Key Technical Decisions

### Storage
- **AsyncStorage** for offline cache + session persistence
- **React Query** for server state caching
- Automatic sync queue when online

### Authentication
- Supabase Auth (same as web)
- Context Provider instead of middleware
- Optional: Biometric auth (Face ID / Touch ID)

### State Management
- React Query for API data
- Context API for Auth & Theme
- NO Redux (overkill for this app)

### Navigation
- Expo Router (file-based like Next.js)
- Bottom tabs for main navigation
- Stack navigator for detail views

### Offline Support
- Queue actions when offline
- Retry on reconnect
- Optimistic updates for voting

---

## Common Gotchas

### 1. CSS → StyleSheet
```typescript
// Web: className="bg-teal-500 px-4 py-2"
// Mobile: style={{ backgroundColor: '#14b8a6', paddingHorizontal: 16, paddingVertical: 8 }}
```

### 2. Hover States Don't Work
```typescript
// Web: hover:bg-teal-100
// Mobile: Remove or use onPressIn/onPressOut

// Instead use:
<Pressable onPress={handler} style={({pressed}) => ({ opacity: pressed ? 0.7 : 1 })} />
```

### 3. localStorage → AsyncStorage
```typescript
// Web: localStorage.setItem('key', value)
// Mobile: await AsyncStorage.setItem('key', value)

// Note: AsyncStorage is async!
```

### 4. Window Size Changes
```typescript
// Web: window.innerWidth
// Mobile: Use Dimensions from react-native
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
```

### 5. Keyboard Issues
```typescript
// Wrap form screens with KeyboardAvoidingView
<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
  {/* Form inputs */}
</KeyboardAvoidingView>
```

---

## Critical Code Snippets

### Supabase Client
```typescript
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
  },
});
```

### React Query Setup
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

### Offline Check
```typescript
import NetInfo from '@react-native-community/netinfo';

const { isConnected } = await NetInfo.fetch();
if (!isConnected) {
  // Queue action for later
}
```

### Navigation
```typescript
import { Stack, Tabs } from 'expo-router';

// Tabs layout
export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="debates" options={{ title: 'Debates' }} />
    </Tabs>
  );
}
```

---

## Testing Commands

```bash
# Run tests
npm test

# Run linter
npm run lint

# Build for iOS
eas build --platform ios --profile preview

# Submit to TestFlight
eas submit --platform ios --profile preview

# Simulate on device
npx expo start --ios
```

---

## Deployment Checklist

- [ ] All screens functional
- [ ] Offline voting works
- [ ] Push notifications configured
- [ ] TestFlight build successful
- [ ] App Store submission prepared
- [ ] Privacy policy & terms updated
- [ ] Icons and splash screens added
- [ ] Version bumped (1.0.0)

---

## Performance Tips

### 1. Use FlatList for Lists
```typescript
<FlatList
  data={debates}
  renderItem={renderDebate}
  keyExtractor={item => item.id}
  removeClippedSubviews
  maxToRenderPerBatch={10}
/>
```

### 2. Memoize Components
```typescript
export const DebateCard = React.memo(DebateCard);
```

### 3. Lazy Load Images
```typescript
<FastImage
  source={{ uri: imageUrl }}
  cacheControl={'immutable'}
  style={{ width: 100, height: 100 }}
/>
```

### 4. Optimize Renders
```typescript
const memoizedData = useMemo(() => 
  debates.filter(d => d.status === 'open'),
  [debates]
);
```

---

## API Endpoints Cheat Sheet

### Debates
```typescript
// List debates
supabase.from('debates').select('*')

// Get debate detail
supabase.from('debates').select('*').eq('id', debateId).single()

// Create debate
supabase.from('debates').insert({ topic, created_by })
```

### Voting
```typescript
// Vote on debate
supabase.from('post_votes').insert({ post_id, user_id, vote_type })

// Get user vote
supabase.from('post_votes').select('*').eq('post_id', id).eq('user_id', userId)
```

### Profiles
```typescript
// Get profile
supabase.from('profiles').select('*').eq('id', userId).single()

// Update profile
supabase.from('profiles').update({ display_name }).eq('id', userId)
```

---

## Environment Variables

```bash
# .env.local
EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
EXPO_PUBLIC_GEMINI_API_KEY=AIza...

# EAS (secrets tab)
APPLE_ID=your@apple.com
APPLE_TEAM_ID=XXXXXXXXXX
ASC_APP_ID=1234567890
```

---

## Useful npm Scripts

```json
{
  "dev": "expo start",
  "ios": "expo start --ios",
  "android": "expo start --android",
  "lint": "eslint .",
  "test": "jest",
  "build": "eas build --platform ios",
  "submit": "eas submit --platform ios"
}
```

---

## Team Communication

### Sync Points
- **Daily**: Standup on blockers
- **Weekly**: Sprint review & planning
- **Bi-weekly**: Demo to stakeholders

### Key Metrics
- Feature completion %
- Bug count by severity
- App performance (bundle size, cold start)
- User testing feedback

---

## Resources

**Official Docs**
- https://docs.expo.dev
- https://reactnative.dev
- https://supabase.com

**Sample Code**
- See IOS_IMPLEMENTATION_PLAN.md (Section 4)
- See IOS_COMPONENT_PORTING_MATRIX.md

**Tools**
- Expo Go (development)
- Xcode (simulator)
- EAS CLI (builds)
- TestFlight (beta testing)

---

## Troubleshooting

### Build Fails
```
Error: "Couldn't resolve '@supabase/supabase-js'"
Fix: npm install @supabase/supabase-js
```

### AsyncStorage Issues
```
Error: AsyncStorage is not setup
Fix: npm install @react-native-async-storage/async-storage
```

### Keyboard Overlaps Content
```
Fix: Wrap with KeyboardAvoidingView
or use ScrollView with bottom padding
```

### Slow List Renders
```
Fix 1: Use FlatList instead of map()
Fix 2: Add React.memo() to item components
Fix 3: Increase initialNumToRender in FlatList
```

### White Screen on Startup
```
Fix 1: Check middleware auth logic
Fix 2: Wrap app with provider stack
Fix 3: Check console for JS errors
```

---

## Quick Decision Tree

**"Should I reuse this web component?"**

```
Is it a UI primitive? (Button, Card, Input)
├─ Yes → Rewrite for mobile
└─ No → Is it business logic? (calculation, validation)
       ├─ Yes → Try to reuse
       └─ No → Is it a layout? (Header, Nav, Template)
              ├─ Yes → Rewrite for mobile
              └─ No → Probably rewrite
```

**"How do I handle X on mobile?"**

```
Is it a web-only feature? (drag-drop, hover)
├─ Yes → Use mobile alternative (tap-and-hold, press)
└─ No → Is it async? (API call, storage)
       ├─ Yes → Use React Query hook
       └─ No → Use local state or context
```

---

## Success Criteria

When you know you're on track:
- Week 1: Auth flow working, basic navigation set up
- Week 3: Debate list displaying correctly
- Week 6: Voting and offline sync working
- Week 9: All features implemented
- Week 12: App Store approved, launched

When you need help:
- Crashes on startup → Check middleware & auth
- Performance issues → Profile with Expo DevTools
- Data not syncing → Check offline queue & network state
- Build errors → Check dependencies & environment variables

---

## One-Liner Reference

```bash
# Start dev
npx expo start --ios

# Run tests
npm test

# Lint check
npm run lint

# Check bundle size
npm run build

# Build for store
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --profile production

# Clear cache
expo prebuild --clean

# Update dependencies
npm update
```

---

**Have a question not answered here?**
See: IOS_IMPLEMENTATION_PLAN.md (detailed)
or: IOS_COMPONENT_PORTING_MATRIX.md (component-specific)
or: IOS_EXECUTIVE_SUMMARY.md (high-level overview)

