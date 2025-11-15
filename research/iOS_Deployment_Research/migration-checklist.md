# Migration Checklist: Next.js to Capacitor iOS

This checklist audits your current Philosophy app and provides specific steps to make it Capacitor-ready.

## Current App Audit Results

Based on analysis of your codebase at `/home/user/Philosophy-app`:

### ✅ What's Already Working

1. **Next.js 15.1.0** - Latest version, fully compatible
2. **Supabase Backend** - Perfect for static export (no server needed)
3. **TypeScript** - Full type safety maintained
4. **Tailwind CSS** - Works perfectly in Capacitor
5. **Environment Variables** - Already using `NEXT_PUBLIC_*` prefix correctly
6. **Client-Side Auth** - Supabase auth is client-compatible

### ⚠️ What Needs Migration

1. **API Route** - 1 route needs migration to Supabase Edge Function
   - `/app/api/judge/route.ts`

2. **Server Components** - Several pages use async Server Components with dynamic data fetching
   - `/app/(authenticated)/debates/[id]/page.tsx`
   - Other pages in `(authenticated)` folder

3. **Next.js Image Component** - Used in 7 files, needs configuration
   - `components/Logo.tsx`
   - `components/ui/Header.tsx`
   - `components/ui/Sidebar.tsx`
   - `components/templates/LandingPageTemplate.tsx`
   - And others

4. **Configuration** - `next.config.ts` needs static export settings

### ❌ Blockers (Must Fix)

None! No hard blockers found. All issues have straightforward solutions.

---

## Migration Checklist

### Phase 1: Configuration (30 minutes)

#### [ ] 1.1 Update `next.config.ts`

**Current**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Required Changes**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Optional but recommended for mobile
  trailingSlash: true,
};

export default nextConfig;
```

**File**: `/home/user/Philosophy-app/next.config.ts`

---

#### [ ] 1.2 Test Static Build

**Commands**:
```bash
# Clean previous builds
rm -rf .next out

# Build static export
npm run build

# Should create 'out' directory
ls -la out/
```

**Expected Output**:
- `out/` directory created
- Contains `index.html`, `_next/`, etc.
- No errors about API routes or dynamic rendering

**If you see errors**, note them and move to Phase 2 for fixes.

---

### Phase 2: API Route Migration (2-4 hours)

#### [ ] 2.1 Install Supabase CLI

```bash
# Install globally
npm install -g supabase

# Or use npx
npx supabase --version
```

---

#### [ ] 2.2 Login and Link Project

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF
```

**Find your project ref**:
- Go to Supabase dashboard
- Settings → General → Reference ID

---

#### [ ] 2.3 Create Edge Function

```bash
supabase functions new judge-debate
```

This creates: `supabase/functions/judge-debate/index.ts`

---

#### [ ] 2.4 Implement Edge Function

**Copy logic from**: `/home/user/Philosophy-app/app/api/judge/route.ts`

**Template**:
```typescript
// supabase/functions/judge-debate/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Copy judgeDebate function logic here
async function judgeDebate(topic: string, argumentFor: string, argumentAgainst: string) {
  const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
  // ... implement Gemini API call
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    // Get auth header
    const authHeader = req.headers.get('Authorization');

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Parse request
    const { debateId, topic, argumentFor, argumentAgainst } = await req.json();

    // Get AI judgment
    const judgment = await judgeDebate(topic, argumentFor, argumentAgainst);

    // Get debate info
    const { data: debate } = await supabase
      .from('debates')
      .select('for_participant, against_participant')
      .eq('id', debateId)
      .single();

    const winnerId = judgment.winner === 'for'
      ? debate.for_participant
      : judgment.winner === 'against'
      ? debate.against_participant
      : null;

    // Save judgment
    await supabase.from('judgments').insert({
      debate_id: debateId,
      winner_position: judgment.winner,
      reasoning: judgment.reasoning,
      fact_checks: judgment.factChecks,
      scores: judgment.scores,
    });

    // Update debate
    await supabase.from('debates').update({
      status: 'completed',
      winner_id: winnerId,
      completed_at: new Date().toISOString(),
    }).eq('id', debateId);

    return new Response(
      JSON.stringify({ success: true, judgment }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
})
```

**See detailed implementation**: `nextjs-api-routes-migration.md`

---

#### [ ] 2.5 Set Gemini API Key

```bash
supabase secrets set GEMINI_API_KEY=your_gemini_api_key_here
```

---

#### [ ] 2.6 Test Edge Function Locally

```bash
# Start local Supabase
supabase start

# Serve function
supabase functions serve judge-debate

# Test with curl (in another terminal)
curl -i --location --request POST 'http://localhost:54321/functions/v1/judge-debate' \
  --header 'Authorization: Bearer YOUR_TEST_JWT' \
  --header 'Content-Type: application/json' \
  --data '{"debateId":"test-id","topic":"Test Topic","argumentFor":"Yes","argumentAgainst":"No"}'
```

---

#### [ ] 2.7 Deploy Edge Function

```bash
supabase functions deploy judge-debate
```

---

#### [ ] 2.8 Update Client Code to Call Edge Function

**Find where API route is called** (likely in `DebateActions.tsx` or similar component):

**Before** (API route):
```typescript
const response = await fetch('/api/judge', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ debateId, topic, argumentFor, argumentAgainst }),
});
```

**After** (Edge Function):
```typescript
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

const { data, error } = await supabase.functions.invoke('judge-debate', {
  body: { debateId, topic, argumentFor, argumentAgainst },
});

if (error) {
  console.error('Error:', error);
} else {
  console.log('Judgment:', data.judgment);
}
```

---

#### [ ] 2.9 Delete API Route File

```bash
rm app/api/judge/route.ts
```

---

#### [ ] 2.10 Test End-to-End

1. Start dev server: `npm run dev`
2. Navigate to a debate
3. Trigger judgment
4. Verify Edge Function is called successfully
5. Check Supabase logs: `supabase functions logs judge-debate`

---

### Phase 3: Server Components Migration (4-6 hours)

Your Server Components fetch data at request time, which won't work in static export. You have two options:

**Option A: Client-Side Fetching** (Recommended for mobile)
**Option B: Static Generation with `generateStaticParams`** (For known paths)

#### [ ] 3.1 Audit Server Components

**Files that need changes**:
- `/app/(authenticated)/debates/[id]/page.tsx` - Dynamic debate pages
- `/app/(authenticated)/debates/page.tsx` - Debates list
- `/app/(authenticated)/leaderboard/page.tsx` - Leaderboard
- `/app/(authenticated)/profile/page.tsx` - Profile
- `/app/(authenticated)/settings/page.tsx` - Settings
- `/app/page.tsx` - Home page

**Check each file for**:
- `async function` in page component
- `await supabase.from(...).select(...)`
- `const { data: { user } } = await supabase.auth.getUser()`

---

#### [ ] 3.2 Convert Debate Detail Page to Client-Side

**File**: `/app/(authenticated)/debates/[id]/page.tsx`

**Current** (Server Component with dynamic data):
```typescript
export default async function DebateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: debate } = await supabase.from('debates').select('*').eq('id', id).single();
  // ...
}
```

**New** (Client Component):
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DebateDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [debate, setDebate] = useState(null);
  const [debateArgs, setDebateArgs] = useState([]);
  const [judgment, setJudgment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();

      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        // Redirect to login
        window.location.href = '/auth/login';
        return;
      }

      // Load debate
      const { data: debateData } = await supabase
        .from('debates')
        .select(`
          *,
          creator:created_by(username, display_name, reputation_score),
          for_user:for_participant(username, display_name, reputation_score),
          against_user:against_participant(username, display_name, reputation_score)
        `)
        .eq('id', id)
        .single();

      if (!debateData) {
        window.location.href = '/debates';
        return;
      }

      setDebate(debateData);

      // Load arguments
      const { data: argsData } = await supabase
        .from('arguments')
        .select(`
          *,
          author:user_id(username, display_name)
        `)
        .eq('debate_id', id)
        .order('created_at', { ascending: true });

      setDebateArgs(argsData || []);

      // Load judgment
      const { data: judgmentData } = await supabase
        .from('judgments')
        .select('*')
        .eq('debate_id', id)
        .maybeSingle();

      setJudgment(judgmentData);
      setLoading(false);
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-white text-center">Loading debate...</div>
      </div>
    );
  }

  if (!debate) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-white text-center">Debate not found</div>
      </div>
    );
  }

  // Rest of your existing JSX...
  const canJoinFor = debate.status === 'open' && !debate.for_participant;
  const canJoinAgainst = debate.status === 'open' && !debate.against_participant;
  const isParticipant = user && (user.id === debate.for_participant || user.id === debate.against_participant);
  const canSubmitArgument = debate.status === 'in_progress' && isParticipant &&
    !debateArgs?.find((arg: any) => arg.user_id === user?.id);

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-4xl">
      {/* Your existing JSX - keep as is */}
    </div>
  );
}
```

**Key Changes**:
- ✅ Add `'use client'` directive
- ✅ Use `useParams()` instead of async params
- ✅ Use `useState` for data
- ✅ Use `useEffect` to load data on mount
- ✅ Use `createClient()` from client lib (not server)
- ✅ Add loading state
- ✅ Client-side redirects instead of `redirect()`

---

#### [ ] 3.3 Convert Other Server Components

Apply the same pattern to:
- `/app/(authenticated)/debates/page.tsx`
- `/app/(authenticated)/leaderboard/page.tsx`
- `/app/(authenticated)/profile/page.tsx`
- `/app/(authenticated)/settings/page.tsx`

**Pattern**:
1. Add `'use client'`
2. Move data fetching to `useEffect`
3. Use `useState` for data
4. Use `createClient` from `/lib/supabase/client`
5. Add loading states
6. Use client-side redirects

---

#### [ ] 3.4 Handle Authentication

Create a reusable auth hook:

```typescript
// hooks/useAuth.ts
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (!user) {
        router.push('/auth/login');
      }
    }

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return { user, loading };
}
```

**Usage**:
```typescript
'use client';

import { useAuth } from '@/hooks/useAuth';

export default function ProtectedPage() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // Will redirect

  return <div>Protected content</div>;
}
```

---

### Phase 4: Testing (2-3 hours)

#### [ ] 4.1 Test Static Build

```bash
# Clean build
rm -rf .next out

# Build
npm run build

# Serve locally
npx serve out
```

Visit `http://localhost:3000` and test:
- [ ] Home page loads
- [ ] Navigation works
- [ ] Login/signup works
- [ ] Protected pages redirect to login when not authenticated
- [ ] Debates list loads
- [ ] Individual debate pages load
- [ ] Creating debates works
- [ ] Joining debates works
- [ ] Submitting arguments works
- [ ] Judging debates works (calls Edge Function)
- [ ] Images display
- [ ] No console errors

---

#### [ ] 4.2 Fix Any Errors

Common issues and fixes:

**Error**: "Dynamic server usage"
- **Fix**: Remove server-side code, move to client

**Error**: "API route found"
- **Fix**: Ensure you deleted `/app/api/judge/route.ts`

**Error**: "Image optimization not available"
- **Fix**: Verify `images: { unoptimized: true }` in config

**Error**: Blank page
- **Fix**: Check browser console, likely a component error

---

#### [ ] 4.3 Verify All Features

Create a test checklist:

- [ ] User registration
- [ ] User login
- [ ] User logout
- [ ] Create debate
- [ ] View debates list
- [ ] View debate details
- [ ] Join debate (for position)
- [ ] Join debate (against position)
- [ ] Submit argument
- [ ] Request judgment (Edge Function)
- [ ] View judgment results
- [ ] View leaderboard
- [ ] View profile
- [ ] Update settings
- [ ] Realtime updates (if implemented)

---

### Phase 5: Capacitor Setup (1-2 hours)

#### [ ] 5.1 Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios
```

---

#### [ ] 5.2 Initialize Capacitor

```bash
npx cap init
```

**When prompted**:
- App name: `PhiloDuel` (or your preferred name)
- App package ID: `com.yourcompany.philoduel`
- Web asset directory: `out`

---

#### [ ] 5.3 Create `capacitor.config.ts`

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.philoduel',
  appName: 'PhiloDuel',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor',
  },
};

export default config;
```

---

#### [ ] 5.4 Add iOS Platform

```bash
npx cap add ios
```

This creates `ios/` directory with Xcode project.

---

#### [ ] 5.5 Build and Sync

```bash
# Build Next.js
npm run build

# Sync to Capacitor
npx cap sync
```

---

#### [ ] 5.6 Open in Xcode

```bash
npx cap open ios
```

**In Xcode**:
1. Select your team (Apple Developer account)
2. Update bundle identifier if needed
3. Select a simulator or connected device
4. Click Run (▶️)

---

#### [ ] 5.7 Test on iOS Simulator

**Test all features again**:
- [ ] App launches
- [ ] Navigation works
- [ ] Login works
- [ ] All features from Phase 4.3

---

#### [ ] 5.8 Test on Real iOS Device

```bash
# Connect iPhone via USB
# Select device in Xcode
# Click Run
```

**Test**:
- [ ] Performance feels good
- [ ] Network requests work
- [ ] Images load
- [ ] Keyboard behavior is good
- [ ] Safe areas handled correctly

---

### Phase 6: iOS-Specific Optimizations (2-3 hours)

#### [ ] 6.1 Install iOS Plugins

```bash
npm install @capacitor/status-bar @capacitor/keyboard @capacitor/browser
```

---

#### [ ] 6.2 Configure Status Bar

```typescript
// app/layout.tsx
'use client';

import { useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export default function RootLayout({ children }) {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#000000' });
    }
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

#### [ ] 6.3 Handle Keyboard

```typescript
import { Keyboard } from '@capacitor/keyboard';

// In components with inputs
useEffect(() => {
  if (Capacitor.isNativePlatform()) {
    Keyboard.addListener('keyboardWillShow', info => {
      // Adjust UI if needed
    });

    Keyboard.addListener('keyboardWillHide', () => {
      // Reset UI
    });
  }

  return () => {
    Keyboard.removeAllListeners();
  };
}, []);
```

---

#### [ ] 6.4 Add Safe Area Insets

```css
/* globals.css */
.app-container {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

Add to your main container div:
```tsx
<div className="app-container">
  {children}
</div>
```

---

#### [ ] 6.5 Handle External Links

```typescript
import { Browser } from '@capacitor/browser';

async function openExternal(url: string) {
  await Browser.open({ url });
}

// Usage
<button onClick={() => openExternal('https://example.com')}>
  Open Link
</button>
```

---

### Phase 7: Build for App Store (3-4 hours)

#### [ ] 7.1 Configure App Icons

1. Generate icons (1024x1024 PNG):
   - Use a service like [appicon.co](https://appicon.co/)
   - Or manually create all sizes

2. Add to Xcode:
   - Open `ios/App/App/Assets.xcassets/AppIcon.appiconset`
   - Drag and drop icon files

---

#### [ ] 7.2 Configure Launch Screen

1. Edit `ios/App/App/Base.lproj/LaunchScreen.storyboard` in Xcode
2. Add your logo/branding
3. Match your app's color scheme

---

#### [ ] 7.3 Update App Info

In Xcode, update:
- Display Name
- Bundle Identifier
- Version (1.0.0)
- Build Number (1)

---

#### [ ] 7.4 Configure Signing

1. Select your target
2. Signing & Capabilities
3. Select your team
4. Enable "Automatically manage signing"

---

#### [ ] 7.5 Build Archive

1. Product → Archive
2. Wait for build to complete
3. Distribute to App Store Connect

---

#### [ ] 7.6 Upload to TestFlight

1. Distribute App
2. App Store Connect
3. Upload
4. Wait for processing (30-60 minutes)

---

#### [ ] 7.7 Test via TestFlight

1. Invite yourself as internal tester
2. Install TestFlight app on iPhone
3. Install your app via TestFlight
4. Test all features

---

### Phase 8: Final Checks

#### [ ] 8.1 Performance

- [ ] App starts in < 3 seconds
- [ ] Navigation is smooth (60 FPS)
- [ ] No lag or stuttering
- [ ] Images load quickly

---

#### [ ] 8.2 Functionality

- [ ] All features from Phase 4.3 work
- [ ] No crashes
- [ ] No error dialogs
- [ ] Network requests succeed
- [ ] Auth persists across app restarts

---

#### [ ] 8.3 UI/UX

- [ ] Safe areas handled correctly
- [ ] No content behind notch
- [ ] Status bar color matches app
- [ ] Keyboard doesn't cover inputs
- [ ] Buttons are tappable
- [ ] Text is readable

---

#### [ ] 8.4 Security

- [ ] No sensitive data in console logs
- [ ] HTTPS used for all network requests
- [ ] Supabase RLS policies enforced
- [ ] No API keys in client code (except NEXT_PUBLIC_*)

---

## Estimated Timeline

| Phase | Description | Time Estimate |
|-------|-------------|---------------|
| 1 | Configuration | 30 minutes |
| 2 | API Route Migration | 2-4 hours |
| 3 | Server Components Migration | 4-6 hours |
| 4 | Testing Static Build | 2-3 hours |
| 5 | Capacitor Setup | 1-2 hours |
| 6 | iOS Optimizations | 2-3 hours |
| 7 | App Store Build | 3-4 hours |
| 8 | Final Checks | 1-2 hours |
| **Total** | | **16-25 hours** |

**Over 3-5 days**: Comfortable pace with testing
**Over 1-2 weeks**: Part-time work

---

## Risk Assessment

### Low Risk ✅
- Configuration changes
- Image optimization setup
- Capacitor installation

### Medium Risk ⚠️
- Server Components migration (time-consuming but straightforward)
- Testing all features

### Higher Risk 🔴
- API route migration to Edge Function (new technology)
- iOS-specific issues (device-dependent)

**Mitigation**:
- Test early and often
- Use Safari Web Inspector for debugging
- Join Supabase/Capacitor Discord for help
- Refer to the guides in this research folder

---

## Success Criteria

### Minimum Viable Product (MVP)
- [ ] App builds successfully
- [ ] App runs on iOS simulator
- [ ] Core features work (auth, debates, arguments)
- [ ] No critical bugs

### Production Ready
- [ ] App runs on real iOS device
- [ ] All features work perfectly
- [ ] Performance is good (< 3s startup)
- [ ] UI looks polished
- [ ] Safe areas handled
- [ ] TestFlight build succeeds

### App Store Ready
- [ ] All TestFlight testing passed
- [ ] App icons and launch screen configured
- [ ] Privacy policy in place
- [ ] Terms of service in place
- [ ] App Store screenshots prepared
- [ ] App Store description written

---

## Rollback Plan

If migration fails or takes too long:

1. **Keep web version working**: Don't delete old code until mobile version is stable
2. **Use feature flags**: Enable/disable mobile-specific code paths
3. **Git branches**: Work on mobile migration in separate branch
4. **Parallel development**: Keep web and mobile versions separate initially

---

## Next Steps

1. **Review all research documents** in this folder
2. **Start with Phase 1** (Configuration)
3. **Work through checklist** one phase at a time
4. **Document issues** you encounter
5. **Ask for help** in Discord communities when stuck

---

## Resources

- [Next.js Static Export Guide](./nextjs-static-export-guide.md)
- [API Routes Migration Guide](./nextjs-api-routes-migration.md)
- [Mobile Gotchas & Solutions](./nextjs-mobile-gotchas.md)
- [Examples & Case Studies](./nextjs-capacitor-examples.md)

---

## Questions?

**Before starting**:
- Read all 5 research documents
- Understand static export limitations
- Plan API route migration
- Set up Supabase CLI

**During migration**:
- Test after each phase
- Use Safari Web Inspector for debugging
- Check Supabase Edge Function logs
- Ask in Discord if stuck

**After completion**:
- Monitor TestFlight feedback
- Iterate based on testing
- Prepare for App Store submission

---

## Conclusion

Your Philosophy app is **well-positioned** for Capacitor migration:
- ✅ Already using Supabase (perfect backend)
- ✅ Only 1 API route to migrate
- ✅ Modern Next.js 15
- ✅ Good architecture

**Estimated effort**: 16-25 hours over 3-5 days

**Success probability**: High (95%+)

**Go for it!** 🚀
