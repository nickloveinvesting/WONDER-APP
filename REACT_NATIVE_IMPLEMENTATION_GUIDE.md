# React Native Implementation Guide - WONDER iOS App
## From Next.js to Expo (EAS Build)

**Target Timeline:** 4 Weeks  
**Team:** 2 React developers (junior-mid level)  
**Date:** November 2025

---

## Phase 1: Project Foundation (Days 1-5)

### Day 1-2: Expo Project Initialization

```bash
# Create new Expo project
npx create-expo-app@latest WONDER --template

# Install TypeScript support
npx expo install typescript @types/react @types/react-native

# Initialize TypeScript
npx expo export --platform web

# Install core dependencies
npm install \
  @supabase/supabase-js \
  @google/generative-ai \
  @react-navigation/native \
  @react-navigation/bottom-tabs \
  react-native-screens \
  react-native-safe-area-context \
  nativewind \
  tailwindcss

# Install Expo specific packages
npx expo install \
  expo-router \
  expo-splash-screen \
  expo-font \
  expo-system-ui
```

### Create Expo Configuration

**File: `app.json`**
```json
{
  "expo": {
    "name": "WONDER",
    "slug": "wonder-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTabletMode": true,
      "bundleIdentifier": "io.wonder.app",
      "buildNumber": "1"
    },
    "plugins": [
      "expo-router"
    ],
    "scheme": "wonder"
  }
}
```

### Configure EAS Build

**File: `eas.json`**
```json
{
  "build": {
    "preview": {
      "ios": {
        "simulator": true
      }
    },
    "preview2": {
      "ios": {
        "resourceClass": "m1"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m1"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "ascAppId": "YOUR_ASC_APP_ID"
      }
    }
  }
}
```

### Set up NativeWind + Tailwind

**File: `tailwind.config.js`**
```js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        argued: {
          navy: '#1A3A52',
          brown: '#8B6F47',
          cream: '#F5F3F0',
          black: '#1C1C1C',
          gold: '#D4A574',
          success: '#4A7C59',
          error: '#C84C3C',
          gray: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
```

**File: `babel.config.js`**
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

### Create Core Project Structure

```
WONDER-RN/
├── app/
│   ├── (authenticated)/
│   │   ├── _layout.tsx
│   │   ├── debates/
│   │   │   ├── index.tsx
│   │   │   ├── [id].tsx
│   │   │   └── create.tsx
│   │   ├── profile/
│   │   │   └── index.tsx
│   │   └── settings/
│   │       └── index.tsx
│   ├── auth/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── _layout.tsx
│   └── index.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts (REUSE from Next.js)
│   │   └── types.ts (REUSE database.types.ts)
│   ├── gemini.ts (REUSE from Next.js)
│   ├── actions/
│   │   ├── voting.ts (ADAPT from Next.js)
│   │   └── journal.ts (ADAPT from Next.js)
│   └── utils.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Input.tsx
│   ├── DebateCard.tsx
│   ├── VoteButtons.tsx
│   └── Navigation.tsx
├── app.json (created above)
├── eas.json (created above)
├── tailwind.config.js (created above)
├── babel.config.js (created above)
└── package.json
```

### Day 3: Supabase Client Setup (REUSE FROM NEXT.JS)

**File: `lib/supabase/client.ts`** (Copy and adapt from Next.js)

```typescript
import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

let supabaseInstance: SupabaseClient | null = null;

export function createClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  // For React Native, use AsyncStorage instead of localStorage
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storage: AsyncStorage,
    }
  });

  return supabaseInstance;
}
```

**Install AsyncStorage:**
```bash
npm install @react-native-async-storage/async-storage
npx expo install @react-native-async-storage/async-storage
```

### Day 4: Database Types (100% REUSE)

**File: `lib/supabase/types.ts`**
- Copy entire `database.types.ts` from Next.js project
- No modifications needed
- All TypeScript types work identically

### Day 5: Authentication Context Setup

**File: `lib/context/AuthContext.tsx`**

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { createClient } from '../supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user || null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signUp, signIn, signOut }}>
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

### Status: Day 5 Complete

- Expo project initialized
- EAS Build configured
- Supabase client set up
- Database types imported
- Auth context created
- Ready for feature development

**Deliverable:** App launches, basic navigation works

---

## Phase 2: Core Features (Days 6-18, Parallel Development)

### Developer A: Debates Listing & Detail Pages

#### Day 6-7: Debates List Page

**File: `app/(authenticated)/debates/index.tsx`**

```typescript
import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';
import DebateCard from '@/components/DebateCard';
import { useAuth } from '@/lib/context/AuthContext';

type Debate = Database['public']['Tables']['debates']['Row'];

export default function DebatesScreen() {
  const [debates, setDebates] = useState<Debate[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchDebates();
  }, []);

  const fetchDebates = async () => {
    try {
      const { data, error } = await supabase
        .from('debates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setDebates(data || []);
    } catch (error) {
      console.error('Error fetching debates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <Text className="text-4xl font-black text-slate-900 px-6 py-4">
        Debates
      </Text>
      
      <FlatList
        data={debates}
        renderItem={({ item }) => (
          <DebateCard debate={item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !loading ? (
            <View className="items-center justify-center py-16">
              <Text className="text-lg text-slate-600">No debates yet</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
```

#### Day 8-9: Debate Detail Page & Comments

**File: `app/(authenticated)/debates/[id].tsx`**

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Debate = Database['public']['Tables']['debates']['Row'];
type Argument = Database['public']['Tables']['arguments']['Row'];

export default function DebateDetailScreen() {
  const route = useRoute<any>();
  const { id } = route.params;
  const [debate, setDebate] = useState<Debate | null>(null);
  const [arguments, setArguments] = useState<Argument[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchDebateDetails();
    subscribeToUpdates();
  }, [id]);

  const fetchDebateDetails = async () => {
    try {
      // Fetch debate
      const { data: debateData, error: debateError } = await supabase
        .from('debates')
        .select('*')
        .eq('id', id)
        .single();

      if (debateError) throw debateError;
      setDebate(debateData);

      // Fetch arguments
      const { data: argsData, error: argsError } = await supabase
        .from('arguments')
        .select('*')
        .eq('debate_id', id)
        .order('created_at', { ascending: true });

      if (argsError) throw argsError;
      setArguments(argsData || []);
    } catch (error) {
      console.error('Error fetching debate details:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToUpdates = () => {
    const channel = supabase
      .channel(`debate:${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'arguments',
          filter: `debate_id=eq.${id}`
        },
        (payload) => {
          fetchDebateDetails();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  if (loading) {
    return <View className="flex-1 bg-white justify-center items-center" />;
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {debate && (
        <View className="p-6">
          <Text className="text-3xl font-black text-slate-900 mb-4">
            {debate.topic}
          </Text>
          {debate.description && (
            <Text className="text-lg text-slate-600 mb-6">
              {debate.description}
            </Text>
          )}
          
          {/* Arguments List */}
          <View className="mt-6">
            <Text className="text-2xl font-black text-slate-900 mb-4">
              Arguments
            </Text>
            {arguments.map((arg) => (
              <View key={arg.id} className="mb-4 p-4 bg-slate-100 rounded-lg">
                <Text className="text-sm font-bold text-slate-600 mb-2">
                  {arg.position.toUpperCase()}
                </Text>
                <Text className="text-base text-slate-900">
                  {arg.content}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
```

### Developer B: Create Debate & Voting

#### Day 6-7: Create Debate Form

**File: `app/(authenticated)/debates/create.tsx`**

```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/context/AuthContext';

export default function CreateDebateScreen() {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();

  const handleCreateDebate = async () => {
    if (!topic.trim()) {
      Alert.alert('Error', 'Please enter a debate topic');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'You must be logged in');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('debates')
        .insert({
          topic,
          description: description || null,
          created_by: user.id,
          status: 'open',
        })
        .select()
        .single();

      if (error) throw error;

      Alert.alert('Success', 'Debate created');
      router.push(`/(authenticated)/debates/${data.id}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to create debate');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-3xl font-black text-slate-900 mb-6">
        Create Debate
      </Text>

      <Text className="text-lg font-bold text-slate-900 mb-2">Topic</Text>
      <TextInput
        className="border-2 border-slate-300 rounded-lg p-4 mb-6 text-base"
        placeholder="Enter debate topic"
        value={topic}
        onChangeText={setTopic}
        editable={!loading}
      />

      <Text className="text-lg font-bold text-slate-900 mb-2">
        Description (optional)
      </Text>
      <TextInput
        className="border-2 border-slate-300 rounded-lg p-4 mb-6 text-base h-24"
        placeholder="Add context or description"
        value={description}
        onChangeText={setDescription}
        multiline
        editable={!loading}
      />

      <TouchableOpacity
        className="bg-teal-500 rounded-lg p-4 items-center"
        onPress={handleCreateDebate}
        disabled={loading}
      >
        <Text className="text-white font-black text-lg">
          {loading ? 'Creating...' : 'Create Debate'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

#### Day 8-9: Voting System Component

**File: `components/VoteButtons.tsx`**

```typescript
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/context/AuthContext';

interface VoteButtonsProps {
  debateId: string;
  initialSnapCount: number;
  initialZapCount: number;
  userVote: 'snap' | 'zap' | null;
}

export default function VoteButtons({
  debateId,
  initialSnapCount,
  initialZapCount,
  userVote,
}: VoteButtonsProps) {
  const [snapCount, setSnapCount] = useState(initialSnapCount);
  const [zapCount, setZapCount] = useState(initialZapCount);
  const [currentVote, setCurrentVote] = useState<'snap' | 'zap' | null>(userVote);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const { user } = useAuth();

  const handleVote = async (voteType: 'snap' | 'zap') => {
    if (!user) return;
    
    setLoading(true);
    try {
      if (currentVote === voteType) {
        // Remove vote
        await supabase
          .from('post_votes')
          .delete()
          .eq('post_id', debateId)
          .eq('user_id', user.id);
        
        setCurrentVote(null);
        voteType === 'snap' ? setSnapCount(Math.max(0, snapCount - 1)) : setZapCount(Math.max(0, zapCount - 1));
      } else {
        // Add or update vote
        if (currentVote) {
          await supabase
            .from('post_votes')
            .delete()
            .eq('post_id', debateId)
            .eq('user_id', user.id);
          
          currentVote === 'snap' ? setSnapCount(Math.max(0, snapCount - 1)) : setZapCount(Math.max(0, zapCount - 1));
        }

        await supabase
          .from('post_votes')
          .insert({
            post_id: debateId,
            user_id: user.id,
            vote_type: voteType,
          });
        
        setCurrentVote(voteType);
        voteType === 'snap' ? setSnapCount(snapCount + 1) : setZapCount(zapCount + 1);
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-col items-center gap-2">
      <TouchableOpacity
        className={`px-3 py-2 rounded-lg ${currentVote === 'snap' ? 'bg-teal-500' : 'bg-slate-200'}`}
        onPress={() => handleVote('snap')}
        disabled={loading}
      >
        <Text className={`font-bold text-sm ${currentVote === 'snap' ? 'text-white' : 'text-slate-900'}`}>
          {snapCount}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-3 py-2 rounded-lg ${currentVote === 'zap' ? 'bg-amber-500' : 'bg-slate-200'}`}
        onPress={() => handleVote('zap')}
        disabled={loading}
      >
        <Text className={`font-bold text-sm ${currentVote === 'zap' ? 'text-white' : 'text-slate-900'}`}>
          {zapCount}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Status: Phase 2 Complete (Days 19 onwards)

Continue with:
- Days 10-11: Auth flow (login/signup screens)
- Days 12-13: Profile and leaderboard pages
- Days 14-15: Settings and additional pages
- Days 16-18: Feature completion and integration testing

---

## Phase 3: Testing & Optimization (Days 19-26)

### Performance Optimization Checklist

- [ ] FlatList virtualization enabled
- [ ] Image caching implemented
- [ ] Unnecessary re-renders eliminated
- [ ] Memory leaks fixed (useEffect cleanup)
- [ ] API calls optimized (no N+1 queries)
- [ ] Bundle size analyzed and reduced
- [ ] Scrolling smooth on iPhone 13/14/15

### Device Testing

- [ ] iPhone 13 (iOS 14-16)
- [ ] iPhone 14 (iOS 17)
- [ ] iPhone 15 (iOS 18)
- [ ] Different network conditions (4G, WiFi, poor connection)
- [ ] Dark mode support

---

## Phase 4: App Store Submission (Days 27-28)

### TestFlight Distribution

```bash
eas build --platform ios --auto-submit
```

### App Store Connect Setup

1. Create app bundle ID: `io.wonder.app`
2. Set up privacy policy
3. Add screenshots (5-6 per language)
4. Write compelling app description
5. Set category: Reference or Education
6. Configure pricing: Free

### Final Submission

```bash
eas submit --platform ios
```

**Expected Approval:** 3-5 business days

---

## Critical Reusable Code from Next.js

### 100% REUSE

1. **`lib/supabase/types.ts`** - Database types (no changes)
2. **`lib/gemini.ts`** - Debate judging logic (no changes)

### 90%+ REUSE (Minor Adaptations)

3. **`lib/supabase/client.ts`** - Change localStorage to AsyncStorage
4. **`lib/actions/voting.ts`** - Works identically in RN
5. **`lib/actions/journal.ts`** - Works identically in RN
6. **Color/typing constants** - Direct copy

### 0% REUSE (Complete Rewrite)

7. All `.tsx` pages in `app/` directory
8. All components in `components/` (different paradigm)
9. Navigation structure (Expo Router vs Next.js routing)

---

## Environment Variables

**File: `.env.local`**

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

Note: Use `EXPO_PUBLIC_` prefix for client-side env vars in Expo

---

## Next Steps

1. Start with Phase 1 setup (Day 1-5)
2. Parallel development (Days 6-18)
3. Intensive testing (Days 19-26)
4. App Store submission (Days 27-28)
5. Monitor review queue + approval

---

**Report Generated:** November 21, 2025
**Implementation Status:** Ready to Begin
