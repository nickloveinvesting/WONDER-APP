# WONDER iOS App - Technical Implementation Plan

**Project**: WONDER iOS Mobile App (React Native + Expo)
**Based on**: Next.js 15 Web App (Supabase + Gemini AI)
**Version**: 1.0.0
**Target Platform**: iOS 14+
**Development Timeline**: 8-12 weeks

---

## 1. PROJECT STRUCTURE

### 1.1 Repository Layout

```
wonder-ios/
├── app/                           # Expo Router navigation
│   ├── _layout.tsx               # Root layout with auth provider
│   ├── (auth)/                   # Unauthenticated routes
│   │   ├── _layout.tsx           # Auth layout (no bottom tabs)
│   │   ├── login.tsx             # Login screen
│   │   ├── signup.tsx            # Signup screen
│   │   └── forgot-password.tsx   # Password reset
│   │
│   ├── (authenticated)/          # Protected routes with tab navigation
│   │   ├── _layout.tsx           # Bottom tabs layout
│   │   ├── home/                 # Dashboard/feed
│   │   ├── debates/              # Debate listing & detail
│   │   ├── journal/              # Personal journal/vault
│   │   ├── profile/              # User profile
│   │   └── settings/             # Settings
│   │
│   └── [unmatched].tsx           # 404 fallback
│
├── src/
│   ├── api/                      # API service layer
│   │   ├── supabase.ts           # Supabase client setup
│   │   ├── auth.ts               # Auth functions
│   │   ├── debates.ts            # Debate queries/mutations
│   │   ├── profiles.ts           # Profile queries/mutations
│   │   ├── journal.ts            # Journal/vault operations
│   │   └── gemini.ts             # Gemini AI integration
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts            # Authentication state
│   │   ├── useDebates.ts         # Debate queries (React Query)
│   │   ├── useProfile.ts         # User profile state
│   │   ├── useOfflineSync.ts     # Offline sync manager
│   │   └── useRefresh.ts         # Pull-to-refresh handler
│   │
│   ├── components/               # Reusable UI components
│   │   ├── common/               # Shared across app
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── TouchableOpacity.tsx
│   │   │
│   │   ├── auth/                 # Auth-specific
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── PasswordReset.tsx
│   │   │
│   │   ├── debates/              # Debate-related
│   │   │   ├── DebateCard.tsx
│   │   │   ├── DebateDetail.tsx
│   │   │   ├── ArgumentCard.tsx
│   │   │   └── VoteButtons.tsx
│   │   │
│   │   ├── journal/              # Journal-specific
│   │   │   ├── EntryCard.tsx
│   │   │   ├── EntryEditor.tsx
│   │   │   └── FolderView.tsx
│   │   │
│   │   └── shared/               # Design system components
│   │       ├── Header.tsx
│   │       ├── BottomTabs.tsx
│   │       └── SafeAreaView.tsx
│   │
│   ├── context/                  # Context providers
│   │   ├── AuthContext.ts        # Auth state provider
│   │   └── ThemeContext.ts       # Theme/dark mode
│   │
│   ├── services/                 # Business logic services
│   │   ├── offlineStorage.ts     # AsyncStorage management
│   │   ├── deepLinking.ts        # Deep link router
│   │   ├── notifications.ts      # Push notifications
│   │   ├── analytics.ts          # Event tracking
│   │   └── syncManager.ts        # Offline/online sync
│   │
│   ├── utils/                    # Helper functions
│   │   ├── helpers.ts            # General utilities
│   │   ├── constants.ts          # App constants
│   │   ├── formatting.ts         # Date/number formatting
│   │   └── validators.ts         # Form validators
│   │
│   ├── types/                    # TypeScript interfaces
│   │   ├── database.ts           # Database types (mirror web)
│   │   ├── api.ts                # API response types
│   │   └── navigation.ts         # Navigation types
│   │
│   └── styles/                   # Design tokens
│       ├── colors.ts             # Color palette
│       ├── spacing.ts            # Spacing values
│       ├── typography.ts         # Font sizes/weights
│       └── theme.ts              # Complete theme object
│
├── assets/
│   ├── images/                   # PNG, JPG, SVG
│   ├── fonts/                    # Plus Jakarta Sans
│   ├── icons/                    # Icon set
│   └── animations/               # Lottie JSON files
│
├── eas.json                      # Expo EAS Build config
├── app.json                      # Expo app config
├── app.config.ts                 # Dynamic app config
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # NativeWind config
├── metro.config.js               # Metro bundler config
├── package.json
└── .env.example

```

### 1.2 Shared Code Organization

**Web + Mobile Shared:**
- Database types (`/types/database.ts`)
- Type definitions for API responses
- Validation logic
- Formatting helpers

**Mobile-Specific Overrides:**
- Supabase client (uses AsyncStorage instead of localStorage)
- Auth flow (mobile-specific session handling)
- Navigation (Expo Router instead of Next.js)
- Styling (NativeWind instead of Tailwind CSS)

---

## 2. SERVICE LAYER ADAPTATION

### 2.1 Supabase Client Setup

**File**: `src/api/supabase.ts`

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '@/types/database';

let supabaseInstance: SupabaseClient<Database> | null = null;

export function getSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    supabaseInstance = createClient<Database>(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false, // Mobile doesn't use URL detection
        },
      }
    );
  }

  return supabaseInstance;
}

// Singleton helper
export const supabase = () => getSupabaseClient();
```

**Key Differences from Web:**
- Uses `AsyncStorage` instead of `localStorage`
- No URL session detection (mobile doesn't have URL params)
- Native auto-refresh handling

### 2.2 Authentication Flow

**File**: `src/api/auth.ts`

```typescript
import { supabase } from './supabase';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: any;
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const { data, error } = await supabase().auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { success: false, error: error.message };

    return { success: true, user: data.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<AuthResult> {
  try {
    const { data, error } = await supabase().auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) return { success: false, error: error.message };

    // Create profile after signup
    if (data.user) {
      await createUserProfile(data.user.id, displayName, email);
    }

    return { success: true, user: data.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signOut(): Promise<AuthResult> {
  try {
    const { error } = await supabase().auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase().auth.getUser();
  return user;
}

// Create user profile in database
async function createUserProfile(
  userId: string,
  displayName: string,
  email: string
) {
  const username = email.split('@')[0];
  
  return supabase()
    .from('profiles')
    .insert({
      id: userId,
      username,
      display_name: displayName,
    });
}
```

**Mobile-Specific Considerations:**
- No OAuth redirects (use native deep linking)
- Biometric auth support (Face ID / Touch ID)
- Session persistence via AsyncStorage
- Network state awareness

### 2.3 Offline Support Strategy

**File**: `src/services/offlineStorage.ts`

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

interface OfflineAction {
  id: string;
  action: 'create' | 'update' | 'delete';
  resource: string;
  resourceId: string;
  payload: any;
  timestamp: number;
  synced: boolean;
}

class OfflineStorageService {
  private QUEUE_KEY = '@wonder_sync_queue';
  private CACHE_PREFIX = '@wonder_cache_';

  async queueAction(action: OfflineAction): Promise<void> {
    const queue = await this.getQueue();
    queue.push(action);
    await AsyncStorage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
  }

  async getQueue(): Promise<OfflineAction[]> {
    const data = await AsyncStorage.getItem(this.QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  }

  async clearQueue(): Promise<void> {
    await AsyncStorage.removeItem(this.QUEUE_KEY);
  }

  async cacheData(key: string, data: any): Promise<void> {
    await AsyncStorage.setItem(
      `${this.CACHE_PREFIX}${key}`,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  }

  async getCachedData(key: string, maxAge: number = 3600000) {
    const cached = await AsyncStorage.getItem(`${this.CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > maxAge) return null;

    return data;
  }

  async isOnline(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  }
}

export const offlineStorage = new OfflineStorageService();
```

### 2.4 Push Notification Integration

**File**: `src/services/notifications.ts`

```typescript
import * as Notifications from 'expo-notifications';
import { supabase } from '@/api/supabase';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export async function registerForPushNotifications() {
  try {
    // Request permissions
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') return null;

    // Get push token
    const token = await Notifications.getDevicePushTokenAsync();
    
    // Save to database
    const user = await getCurrentUser();
    if (user) {
      await supabase()
        .from('push_tokens')
        .upsert({
          user_id: user.id,
          token: token.data,
          platform: 'ios',
        });
    }

    return token.data;
  } catch (error) {
    console.error('Push notification setup failed:', error);
    return null;
  }
}

export function setupNotificationListeners() {
  // Handle notification when app is in foreground
  const foregroundSubscription =
    Notifications.addNotificationReceivedListener((notification) => {
      // Handle notification
      console.log('Notification received:', notification);
    });

  // Handle notification tap
  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      const { data } = response.notification.request.content;
      // Navigate based on notification data
      handleNotificationNavigation(data);
    });

  return () => {
    foregroundSubscription.remove();
    responseSubscription.remove();
  };
}

async function handleNotificationNavigation(data: any) {
  // Route to appropriate screen based on notification type
  if (data.type === 'debate_joined') {
    // Navigate to debate detail
  } else if (data.type === 'message_reply') {
    // Navigate to discussion
  }
}
```

---

## 3. COMPONENT PORTING STRATEGY

### 3.1 Porting Matrix

| Component | Web | Status | Notes |
|-----------|-----|--------|-------|
| Button | Tailwind | Rewrite | Use NativeWind, Pressable instead of button |
| Card | Tailwind | Rewrite | View with styling |
| Input | HTML input | Rewrite | TextInput component |
| Badge | Tailwind | Rewrite | Text + View |
| Navigation | Next.js Link | Rewrite | Use Expo Router |
| Header | React + Tailwind | Adapt | SafeAreaView + custom header |
| Sidebar | Tailwind | Rewrite | Navigation drawer |
| Modal/Dialog | Custom | Rewrite | Modal component from react-native |
| DebateCard | React + Tailwind | Adapt | Core logic reusable |
| ArgumentCard | React + Tailwind | Adapt | Core logic reusable |
| VoteButtons | React | Adapt | Button logic reusable |
| LoginForm | React Hook Form | Adapt | Minor changes for mobile |
| SettingsForm | React + Tailwind | Rewrite | Settings screen specific |

### 3.2 Component Rewrite Example: Button

**Web** (`components/ui/Button.tsx`):
```tsx
const Button = ({ variant = 'primary', children, ...props }) => (
  <button className={cn("font-black bg-teal-500...", variant)} {...props}>
    {children}
  </button>
);
```

**Mobile** (`src/components/common/Button.tsx`):
```tsx
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  variant?: ButtonVariant;
  onPress: () => void;
  children: string;
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  onPress,
  children,
  disabled,
}: ButtonProps) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    primary: {
      backgroundColor: colors.teal500,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 12,
    },
    secondary: {
      backgroundColor: colors.slate100,
      borderWidth: 2,
      borderColor: colors.slate300,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 12,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles[variant],
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.5 },
      ]}
    >
      <Text
        style={{
          color: variant === 'primary' ? 'white' : colors.slate900,
          fontWeight: '900',
          fontSize: 16,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
```

### 3.3 Shared Business Logic Extraction

**Reusable Logic** (Web + Mobile):

```typescript
// lib/debate-logic.ts (shared)
export function calculateDebateScore(
  logicScore: number,
  evidenceScore: number,
  rhetoricScore: number
): number {
  return (logicScore + evidenceScore + rhetoricScore) / 3;
}

export function formatDebateStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
}

export function getWinnerText(position: 'for' | 'against' | 'tie'): string {
  const map = {
    for: 'For argument won',
    against: 'Against argument won',
    tie: 'Debate tied',
  };
  return map[position];
}
```

---

## 4. KEY TECHNICAL IMPLEMENTATIONS

### 4.1 Navigation Setup (Expo Router)

**File**: `app/_layout.tsx`

```typescript
import { Stack } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

**File**: `app/(authenticated)/_layout.tsx`

```typescript
import { Tabs } from 'expo-router';
import { Home, BookOpen, User, Settings } from 'lucide-react-native';

export default function AuthenticatedLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#14b8a6',
        tabBarInactiveTintColor: '#94a3b8',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="debates"
        options={{
          title: 'Debates',
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
```

### 4.2 State Management (React Query + Context)

**File**: `src/context/AuthContext.tsx`

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signOut } from '@/api/auth';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  async function bootstrapAsync() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Auth error');
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      setUser(null);
    } else {
      setError(result.error || 'Sign out failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**React Query Setup** (`src/hooks/useDebates.ts`):

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/api/supabase';

export function useDebates() {
  return useQuery({
    queryKey: ['debates'],
    queryFn: async () => {
      const { data, error } = await supabase()
        .from('debates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useDebateDetail(debateId: string) {
  return useQuery({
    queryKey: ['debate', debateId],
    queryFn: async () => {
      const { data, error } = await supabase()
        .from('debates')
        .select('*')
        .eq('id', debateId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateDebate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (debate: any) => {
      const { data, error } = await supabase()
        .from('debates')
        .insert(debate)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debates'] });
    },
  });
}
```

### 4.3 Caching Strategy

**AsyncStorage + React Query**:

```typescript
// src/hooks/useCachedData.ts
import { useQuery } from '@tanstack/react-query';
import { offlineStorage } from '@/services/offlineStorage';

export function useCachedData<T>(
  key: string,
  queryFn: () => Promise<T>,
  options?: { maxAge?: number }
) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      // Try to get from AsyncStorage cache first
      const cached = await offlineStorage.getCachedData(
        key,
        options?.maxAge
      );
      if (cached) return cached;

      // If not cached or expired, fetch fresh data
      const data = await queryFn();
      
      // Store in cache
      await offlineStorage.cacheData(key, data);
      
      return data;
    },
    staleTime: options?.maxAge || 3600000, // 1 hour default
  });
}
```

### 4.4 Deep Linking Configuration

**File**: `app.json`

```json
{
  "expo": {
    "plugins": [
      [
        "expo-router",
        {
          "origin": "https://wonder.app"
        }
      ]
    ],
    "scheme": "wonder",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "*.wonder.app",
              "pathPrefix": "/"
            },
            {
              "scheme": "wonder"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

**File**: `src/services/deepLinking.ts`

```typescript
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

const prefix = Linking.createURL('/');

export const linking = {
  prefixes: [prefix, 'wonder://', 'https://wonder.app'],
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => {
      listener(url);
    };

    const subscription = Linking.addEventListener('url', onReceiveURL);

    return () => {
      subscription.remove();
    };
  },
};

export function useDeepLinking() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url, router);
    });

    return () => {
      subscription.remove();
    };
  }, []);
}

function handleDeepLink(url: string, router: any) {
  const parsedUrl = new URL(url);
  const { pathname, searchParams } = parsedUrl;

  if (pathname === '/debates') {
    const debateId = searchParams.get('id');
    if (debateId) {
      router.push(`/debates/${debateId}`);
    }
  }
}
```

### 4.5 Haptic Feedback System

**File**: `src/services/haptics.ts`

```typescript
import * as Haptics from 'expo-haptics';

export const hapticFeedback = {
  light: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
  },

  medium: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Medium);
  },

  heavy: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Heavy);
  },

  success: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },

  warning: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  },

  error: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },

  selection: () => {
    Haptics.selectionAsync();
  },

  impact: (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    const styleMap = {
      light: Haptics.ImpactFeedbackStyle.Light,
      medium: Haptics.ImpactFeedbackStyle.Medium,
      heavy: Haptics.ImpactFeedbackStyle.Heavy,
    };
    Haptics.impactAsync(styleMap[style]);
  },
};

// Usage in components
export function useHapticFeedback() {
  return hapticFeedback;
}
```

**Usage in Button**:

```tsx
import { hapticFeedback } from '@/services/haptics';

export function Button({ onPress, ...props }) {
  const handlePress = () => {
    hapticFeedback.selection();
    onPress?.();
  };

  return <Pressable onPress={handlePress} {...props} />;
}
```

---

## 5. BUILD & DEPLOYMENT

### 5.1 Expo EAS Configuration

**File**: `eas.json`

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      }
    },
    "production": {
      "distribution": "store",
      "ios": {
        "resourceClass": "m1-medium"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "$APPLE_ID",
        "appleTeamId": "$APPLE_TEAM_ID",
        "ascAppId": "$ASC_APP_ID"
      }
    }
  }
}
```

### 5.2 Environment Variable Handling

**File**: `app.config.ts`

```typescript
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'WONDER',
  slug: 'wonder-app',
  version: '1.0.0',
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    geminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  },
  plugins: [
    [
      'expo-router',
      {
        origin: 'https://wonder.app',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/notification-icon.png',
        color: '#14b8a6',
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission: 'Allow WONDER to access your camera.',
      },
    ],
  ],
});
```

**Build Secrets** (Set in EAS):

```bash
# Production
EXPO_PUBLIC_SUPABASE_URL=https://...supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
EXPO_PUBLIC_GEMINI_API_KEY=AIza...
APPLE_ID=your@apple.com
APPLE_TEAM_ID=XXXXXXXXXX
ASC_APP_ID=1234567890
```

### 5.3 CI/CD Pipeline Setup

**File**: `.github/workflows/build-ios.yml`

```yaml
name: Build iOS App

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build for iOS
        run: eas build --platform ios --non-interactive
        env:
          EAS_BUILD_PROFILE: production
          EXPO_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          EXPO_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
          EXPO_PUBLIC_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

      - name: Submit to App Store
        if: github.ref == 'refs/heads/main'
        run: eas submit --platform ios --non-interactive
        env:
          APPLE_ID: ${{ secrets.APPLE_ID }}
          APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
```

### 5.4 Version Management

**File**: `src/utils/version.ts`

```typescript
export const APP_VERSION = '1.0.0';
export const BUILD_NUMBER = 1;

export function formatVersion(): string {
  return `${APP_VERSION} (${BUILD_NUMBER})`;
}

// In app.json, sync with package.json:
// "version": "1.0.0"
// "build": 1

// Update process:
// 1. Update version in package.json
// 2. Update build number in app.json
// 3. Create git tag: git tag -a v1.0.0 -m "Release v1.0.0"
// 4. Push: git push --tags
```

---

## 6. DEPENDENCY LIST WITH VERSIONS

### Core Dependencies

```json
{
  "dependencies": {
    "expo": "^51.0.0",
    "expo-router": "^3.0.0",
    "react": "^18.2.0",
    "react-native": "^0.73.0",
    "react-native-windows": "^0.73.0",
    "typescript": "^5.3.0",

    "@supabase/supabase-js": "^2.45.0",
    "@supabase/auth-js": "^2.61.0",

    "@tanstack/react-query": "^5.0.0",
    "@tanstack/react-query-devtools": "^5.0.0",

    "nativewind": "^2.0.0",
    "tailwindcss": "^3.4.0",

    "react-native-async-storage": "^1.23.0",
    "@react-native-community/netinfo": "^9.4.0",

    "expo-notifications": "^0.20.0",
    "expo-haptics": "^12.8.0",
    "expo-camera": "^13.4.0",
    "expo-image-picker": "^14.7.0",
    "expo-linking": "^6.0.0",

    "@google/generative-ai": "^0.21.0",

    "zod": "^3.22.0",
    "date-fns": "^2.30.0",
    "zustand": "^4.4.0",

    "lucide-react-native": "^0.3.0",
    "react-hook-form": "^7.48.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.73.0",
    "@testing-library/react-native": "^12.4.0",
    "jest": "^29.7.0",
    "typescript": "^5.3.0"
  }
}
```

### Installation Commands

```bash
# Setup Expo project
npx create-expo-app wonder-ios
cd wonder-ios

# Install core packages
npm install expo-router expo-notifications expo-haptics
npm install @supabase/supabase-js @tanstack/react-query
npm install nativewind tailwindcss
npm install @react-native-community/netinfo react-native-async-storage
npm install @google/generative-ai react-hook-form

# Install dev dependencies
npm install --save-dev typescript @types/react-native jest
npm install --save-dev @testing-library/react-native
```

---

## 7. TESTING STRATEGY FOR MOBILE

### 7.1 Unit Testing

**File**: `src/api/__tests__/auth.test.ts`

```typescript
import { loginWithEmail } from '@/api/auth';
import { supabase } from '@/api/supabase';

jest.mock('@/api/supabase');

describe('Authentication', () => {
  it('should login with valid credentials', async () => {
    const mockSupabase = {
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({
          data: { user: { id: '123', email: 'test@example.com' } },
          error: null,
        }),
      },
    };

    jest.mocked(supabase).mockReturnValue(mockSupabase as any);

    const result = await loginWithEmail('test@example.com', 'password');
    
    expect(result.success).toBe(true);
    expect(result.user?.id).toBe('123');
  });

  it('should handle login error', async () => {
    const mockSupabase = {
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Invalid credentials' },
        }),
      },
    };

    jest.mocked(supabase).mockReturnValue(mockSupabase as any);

    const result = await loginWithEmail('test@example.com', 'wrong');
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid credentials');
  });
});
```

### 7.2 Component Testing

**File**: `src/components/__tests__/Button.test.tsx`

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/common/Button';

describe('Button Component', () => {
  it('should render with label', () => {
    render(<Button onPress={() => {}}>Press me</Button>);
    expect(screen.getByText('Press me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button onPress={onPress}>Click</Button>);
    
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    const { getByRole } = render(
      <Button onPress={() => {}} disabled>
        Click
      </Button>
    );
    
    expect(getByRole('button')).toBeDisabled();
  });
});
```

### 7.3 Integration Testing

```typescript
// src/hooks/__tests__/useAuth.test.ts
import { renderHook, waitFor } from '@testing-library/react-native';
import { useAuth } from '@/context/AuthContext';

describe('useAuth hook', () => {
  it('should provide auth context', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBeDefined();
  });
});
```

### 7.4 E2E Testing (Detox)

**File**: `e2e/login.e2e.ts`

```typescript
import { device, element, by, expect as detoxExpect } from 'detox';

describe('Login Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show login screen', async () => {
    await detoxExpect(element(by.text('Welcome to WONDER'))).toBeVisible();
  });

  it('should login with valid credentials', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.text('Sign In')).multiTap();

    await detoxExpect(element(by.text('Debates'))).toBeVisible();
  });
});
```

---

## 8. FILE-BY-FILE PORTING GUIDE

### 8.1 High Priority Components

#### 1. Login Screen
- **Source**: `app/auth/login/page.tsx` & `LoginForm.tsx`
- **Destination**: `app/(auth)/login.tsx`
- **Changes**:
  - Replace Next.js form with React Hook Form
  - Replace HTML inputs with TextInput
  - Use Expo Router for navigation
  - Add keyboard avoiding view

#### 2. Home/Dashboard
- **Source**: `app/(authenticated)/home/page.tsx`
- **Destination**: `app/(authenticated)/home/index.tsx`
- **Changes**:
  - Convert to FlatList for debates
  - Add pull-to-refresh
  - Use React Query for data fetching
  - Implement scroll event listener

#### 3. Debate Detail
- **Source**: `app/(authenticated)/debates/[id]/page.tsx`
- **Destination**: `app/(authenticated)/debates/[id].tsx`
- **Changes**:
  - Use ScrollView for content
  - Implement bottom sheet for voting
  - Add argument card list with FlatList
  - Use React Query for debate queries

#### 4. Profile
- **Source**: `app/(authenticated)/profile/page.tsx`
- **Destination**: `app/(authenticated)/profile/index.tsx`
- **Changes**:
  - Convert stats to mobile-friendly layout
  - Add image picker for avatar
  - Use ScrollView for profile content
  - Implement edit mode toggle

### 8.2 Design System Components

All components in `components/ui/` need rewriting using NativeWind:

1. **Button.tsx** → Pressable + Text
2. **Card.tsx** → View with StyleSheet
3. **Input.tsx** → TextInput + View
4. **Badge.tsx** → View + Text
5. **Modal.tsx** → Modal component
6. **Tabs.tsx** → BottomTabNavigator

---

## 9. CODE SNIPPETS FOR CRITICAL IMPLEMENTATIONS

### 9.1 Offline-First Debate Voting

```typescript
// src/hooks/useVoteDebate.ts
import { useMutation } from '@tanstack/react-query';
import { offlineStorage } from '@/services/offlineStorage';
import { supabase } from '@/api/supabase';

export function useVoteDebate() {
  return useMutation({
    mutationFn: async ({
      debateId,
      voteType,
    }: {
      debateId: string;
      voteType: 'snap' | 'zap';
    }) => {
      const isOnline = await offlineStorage.isOnline();

      if (!isOnline) {
        // Queue for sync later
        await offlineStorage.queueAction({
          id: `vote-${debateId}-${Date.now()}`,
          action: 'create',
          resource: 'votes',
          resourceId: debateId,
          payload: { vote_type: voteType },
          timestamp: Date.now(),
          synced: false,
        });

        return { queued: true };
      }

      // Online - sync directly
      const { error } = await supabase().from('votes').insert({
        debate_id: debateId,
        vote_type: voteType,
      });

      if (error) throw error;
      return { synced: true };
    },
  });
}
```

### 9.2 Real-time Debate Updates

```typescript
// src/hooks/useRealtimeDebate.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/api/supabase';

export function useRealtimeDebate(debateId: string) {
  const [debate, setDebate] = useState<any>(null);

  useEffect(() => {
    // Subscribe to changes
    const channel = supabase()
      .channel(`debate:${debateId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'debates',
          filter: `id=eq.${debateId}`,
        },
        (payload) => {
          setDebate(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase().removeChannel(channel);
    };
  }, [debateId]);

  return debate;
}
```

### 9.3 Image Upload with Progress

```typescript
// src/hooks/useImageUpload.ts
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/api/supabase';

export function useImageUpload() {
  return useMutation({
    mutationFn: async (bucket: string) => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (result.canceled) return null;

      const asset = result.assets[0];
      const fileName = `${Date.now()}.jpg`;
      const file = {
        uri: asset.uri,
        name: fileName,
        type: 'image/jpeg',
      };

      const formData = new FormData();
      formData.append('file', file as any);

      const { data, error } = await supabase().storage
        .from(bucket)
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase()
        .storage
        .from(bucket)
        .getPublicUrl(fileName);

      return publicUrl;
    },
  });
}
```

---

## 10. DEPLOYMENT CHECKLIST

### 10.1 Pre-Launch

- [ ] Complete authentication flow (email, Apple Sign-In, Google Sign-In)
- [ ] All core screens functional and tested
- [ ] Offline sync working correctly
- [ ] Push notifications working
- [ ] Deep linking configured
- [ ] Design system applied to all components
- [ ] Performance optimization (lazy loading, memoization)
- [ ] Error handling and logging
- [ ] Analytics integration

### 10.2 TestFlight

```bash
# Build for TestFlight
eas build --platform ios --profile preview

# Submit to TestFlight
eas submit --platform ios --profile preview
```

### 10.3 App Store

```bash
# Build for production
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --profile production
```

### 10.4 Release Notes Template

```markdown
## v1.0.0 - Initial Release

### New Features
- Philosophical debate platform with real-time discussions
- AI-powered judgment system using Gemini
- User profiles with reputation scoring
- Discussion journal and vault features
- Push notifications for new debates
- Offline support for reading past debates

### Technical
- Built with React Native and Expo
- Supabase backend for real-time updates
- Secure authentication with biometric support

### Known Limitations
- Video support coming in v1.1
- Screen sharing in v1.2
```

---

## 11. PERFORMANCE OPTIMIZATION GUIDELINES

### 11.1 Code Splitting

```typescript
// Use React.lazy for route components
import { lazy, Suspense } from 'react';

const DebateDetail = lazy(() =>
  import('@/screens/DebateDetail').then(m => ({
    default: m.DebateDetail
  }))
);

export function Debates() {
  return (
    <Suspense fallback={<Loading />}>
      <DebateDetail />
    </Suspense>
  );
}
```

### 11.2 Image Optimization

```typescript
// Use FastImage for better caching
import FastImage from 'react-native-fast-image';

<FastImage
  source={{
    uri: imageUrl,
    priority: FastImage.priority.normal,
  }}
  cacheControl={'immutable'}
  style={{ width: 100, height: 100 }}
/>
```

### 11.3 List Optimization

```typescript
// Always use useMemo for flatlist items
const memoizedItems = useMemo(
  () => debates.filter(d => d.status === 'open'),
  [debates]
);

<FlatList
  data={memoizedItems}
  renderItem={renderDebateItem}
  keyExtractor={item => item.id}
  removeClippedSubviews
  maxToRenderPerBatch={10}
  initialNumToRender={10}
/>
```

---

## 12. MIGRATION ROADMAP

### Phase 1: Foundation (Weeks 1-3)
- Project setup with Expo
- Supabase client adaptation
- Authentication flow
- Core navigation

### Phase 2: Core Features (Weeks 4-6)
- Debate listing and detail
- Profile screens
- Basic voting system
- Offline support

### Phase 3: Advanced Features (Weeks 7-9)
- Push notifications
- Real-time updates
- Journal/vault
- Image uploads

### Phase 4: Polish & Launch (Weeks 10-12)
- Performance optimization
- App Store submission
- TestFlight testing
- Marketing preparation

---

## CONCLUSION

This implementation plan provides a complete roadmap for building the WONDER iOS app using React Native and Expo. The architecture prioritizes code reuse, offline-first design, and a seamless user experience while maintaining parity with the web app's core functionality.

**Key Success Factors:**
1. Leverage existing Supabase backend
2. Share business logic between platforms
3. Implement offline-first architecture
4. Focus on mobile-specific UX patterns
5. Comprehensive testing before launch

**Next Steps:**
1. Set up Expo project with this structure
2. Create Supabase client for React Native
3. Build authentication flows
4. Port core components incrementally
5. Test thoroughly before TestFlight release

