# Next.js + Capacitor Mobile Gotchas and Solutions

This document covers common issues, pitfalls, and solutions when deploying Next.js apps to iOS via Capacitor.

## Table of Contents

1. [Routing & Navigation Issues](#routing--navigation-issues)
2. [Image Loading Problems](#image-loading-problems)
3. [Authentication & Sessions](#authentication--sessions)
4. [Environment Variables](#environment-variables)
5. [File Paths & Base Path](#file-paths--base-path)
6. [Performance Issues](#performance-issues)
7. [Deep Linking](#deep-linking)
8. [iOS-Specific Issues](#ios-specific-issues)
9. [Build & Deployment Issues](#build--deployment-issues)
10. [Data Fetching Gotchas](#data-fetching-gotchas)

---

## Routing & Navigation Issues

### Issue 1: Back Button Doesn't Work as Expected

**Problem**: iOS back gesture conflicts with Next.js routing, or app doesn't navigate properly.

**Symptoms**:
- Back button/gesture doesn't work
- Navigation stack gets confused
- Can't go back to previous page

**Solution**:

```typescript
// Use Next.js Link component, not regular <a> tags
import Link from 'next/link';

// ✅ Correct
<Link href="/debates">View Debates</Link>

// ❌ Wrong (triggers full page reload in Capacitor)
<a href="/debates">View Debates</a>
```

**For programmatic navigation**:

```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function MyComponent() {
  const router = useRouter();

  function handleBack() {
    router.back(); // Uses browser history
  }

  function handleNavigate() {
    router.push('/debates'); // Client-side navigation
  }

  return (
    <>
      <button onClick={handleBack}>Go Back</button>
      <button onClick={handleNavigate}>View Debates</button>
    </>
  );
}
```

### Issue 2: Page Refreshes Reset to Home Page

**Problem**: When refreshing or directly accessing a route like `/debates/123`, app redirects to home page.

**Cause**: Static export doesn't support server-side routing. The `index.html` file is served for all routes.

**Solution 1**: Use `trailingSlash` configuration

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // Generates /debates/123/index.html
};
```

**Solution 2**: Rely on client-side routing (recommended)

Don't refresh pages in a mobile app - use client-side navigation only.

### Issue 3: Hash Routing vs. Path Routing

**Problem**: Some guides suggest using hash routing (`/#/debates`) instead of path routing (`/debates`).

**Recommendation**: Stick with path routing (default)
- Next.js handles it correctly in static export
- Better UX
- Consistent with web version

**If you must use hash routing** (not recommended):

```typescript
// This requires custom configuration and is not standard Next.js
// Better to avoid it
```

---

## Image Loading Problems

### Issue 1: Images Don't Load After Build

**Problem**: Images work in dev mode but not in production build.

**Common Causes**:

1. **Using Next.js Image without unoptimized flag**

```typescript
// ❌ Won't work in static export
import Image from 'next/image';

<Image src="/logo.png" alt="Logo" width={100} height={50} />
```

**Solution**:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required!
  },
};
```

2. **Incorrect image paths**

```typescript
// ❌ Wrong - relative to component
<img src="./logo.png" />

// ✅ Correct - relative to public directory
<img src="/logo.png" />

// ✅ Also correct
<img src="/images/logo.png" />
```

3. **Images not in `public/` directory**

All static assets must be in `/public` folder.

```
/public
  /images
    logo.png
  /icons
    menu.svg
```

### Issue 2: Dynamic Images from Supabase Don't Display

**Problem**: Images stored in Supabase Storage don't load.

**Cause**: Usually CORS or incorrect URLs.

**Solution**:

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function UserAvatar({ userId }: { userId: string }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadAvatar() {
      const supabase = createClient();

      // Get signed URL (bypasses CORS issues)
      const { data } = await supabase.storage
        .from('avatars')
        .createSignedUrl(`${userId}.png`, 60 * 60); // 1 hour expiry

      if (data) {
        setAvatarUrl(data.signedUrl);
      }
    }

    loadAvatar();
  }, [userId]);

  if (!avatarUrl) return <div>Loading...</div>;

  return <img src={avatarUrl} alt="Avatar" />;
}
```

**For public images**:

```typescript
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}.png`);

const avatarUrl = data.publicUrl;
```

### Issue 3: Image Optimization for Mobile

**Problem**: Images are too large, slow to load on mobile networks.

**Solution**: Optimize images before deployment

```bash
# Use a tool like sharp or imagemagick
npm install sharp

# Create a script to optimize images
node scripts/optimize-images.js
```

```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const outputDir = './public/images-optimized';

fs.readdirSync(inputDir).forEach(file => {
  sharp(path.join(inputDir, file))
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(path.join(outputDir, file));
});
```

**Or use Supabase Storage transformations**:

```typescript
const { data } = supabase.storage
  .from('images')
  .getPublicUrl('large-image.png', {
    transform: {
      width: 800,
      height: 600,
      resize: 'contain',
      quality: 80,
    },
  });
```

---

## Authentication & Sessions

### Issue 1: Session Lost After App Restart

**Problem**: User is logged out when closing and reopening the app.

**Cause**: Cookies don't persist properly in Capacitor WebView.

**Solution**: Use localStorage for session persistence (Supabase does this by default)

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

export const createClientComponent = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false, // Important for mobile!
      },
    }
  );
};
```

**Key setting**: `detectSessionInUrl: false` prevents issues with OAuth redirects in Capacitor.

### Issue 2: OAuth Redirects Don't Work

**Problem**: Google/GitHub login redirects don't return to app.

**Cause**: Capacitor apps don't have a traditional URL - they use `capacitor://localhost`.

**Solution 1**: Use in-app browser for OAuth

```bash
npm install @capacitor/browser
```

```typescript
import { Browser } from '@capacitor/browser';
import { createClient } from '@/lib/supabase/client';

async function handleGoogleLogin() {
  const supabase = createClient();

  // Get auth URL
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'your-app://auth/callback', // Custom URL scheme
    },
  });

  if (data?.url) {
    // Open in-app browser
    await Browser.open({ url: data.url });
  }
}
```

**Solution 2**: Use email/password auth (simpler for mobile)

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});
```

**Solution 3**: Use magic links with custom URL scheme

```typescript
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'your-app://auth/callback',
  },
});
```

### Issue 3: Protected Routes Accessible Before Auth Check

**Problem**: Protected content briefly visible before redirect to login.

**Solution**: Use loading states

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ProtectedLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/auth/login');
      } else {
        setAuthenticated(true);
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
```

---

## Environment Variables

### Issue 1: Environment Variables Undefined in App

**Problem**: `process.env.NEXT_PUBLIC_SUPABASE_URL` is undefined in production.

**Common Causes**:

1. **Missing `NEXT_PUBLIC_` prefix**

```bash
# ❌ Won't work in static export
SUPABASE_URL=https://xxx.supabase.co

# ✅ Works
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
```

2. **Not rebuilding after changing `.env.local`**

Environment variables are embedded at build time. You must rebuild:

```bash
rm -rf .next out
npm run build
npx cap sync
```

3. **Using wrong env file**

```
.env.local          # Used for all environments
.env.development    # Only dev
.env.production     # Only production
```

For Capacitor, you're building for "production", so use `.env.production` or `.env.local`.

### Issue 2: Can't Access Environment Variables in Capacitor

**Problem**: Variables work in web browser but not in Capacitor app.

**Cause**: Variables are embedded at build time, not read from `.env.local` at runtime.

**Solution**: Make sure you build BEFORE syncing

```bash
# Correct order
npm run build        # Embeds env vars in static files
npx cap sync         # Copies build to mobile app
npx cap open ios     # Open in Xcode
```

### Issue 3: Sensitive Data in Environment Variables

**Problem**: API keys visible in client bundle.

**Important**: Only put PUBLIC data in `NEXT_PUBLIC_*` variables!

```bash
# ✅ Safe - these are meant to be public
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...  # Anon key is SAFE
NEXT_PUBLIC_APP_NAME=PhiloDuel

# ❌ NEVER put these in NEXT_PUBLIC_*
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=xxx  # SECRET!
NEXT_PUBLIC_STRIPE_SECRET_KEY=xxx          # SECRET!
```

**For secrets**: Use Supabase Edge Functions (they have secure env vars).

---

## File Paths & Base Path

### Issue 1: Assets 404 in Capacitor

**Problem**: CSS, JS, images return 404 in mobile app.

**Symptoms**:
- Blank white screen
- Console errors: "Failed to load resource"
- Images missing

**Cause**: Incorrect base path configuration.

**Solution**: Verify Capacitor config

```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourapp.philoduel',
  appName: 'PhiloDuel',
  webDir: 'out', // Must match Next.js output directory!
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor', // Default, can customize
  },
};

export default config;
```

**Next.js output directory**:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  // Default output is 'out' - match this in capacitor.config.ts
};
```

### Issue 2: Absolute URLs Don't Work

**Problem**: External links try to open in app instead of browser.

**Solution**: Use Capacitor Browser plugin

```bash
npm install @capacitor/browser
```

```typescript
import { Browser } from '@capacitor/browser';

async function openExternal(url: string) {
  await Browser.open({ url });
}

// Usage
<button onClick={() => openExternal('https://example.com')}>
  Open External Link
</button>
```

---

## Performance Issues

### Issue 1: Slow Initial Load

**Problem**: App takes 5+ seconds to show content.

**Solutions**:

1. **Reduce bundle size**

```bash
# Analyze bundle
npm install @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run
ANALYZE=true npm run build
```

2. **Lazy load components**

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Don't render on server (build time)
});
```

3. **Remove unused dependencies**

Check your `package.json` and remove packages you don't use.

4. **Code splitting**

Next.js does this automatically by route, but you can optimize further:

```typescript
import dynamic from 'next/dynamic';

const DebateChart = dynamic(() => import('./DebateChart'));
const AdvancedEditor = dynamic(() => import('./AdvancedEditor'));
```

### Issue 2: Sluggish Animations

**Problem**: Animations stutter or lag.

**Solution**: Use CSS transforms and GPU acceleration

```css
/* ✅ GPU-accelerated */
.animated {
  transform: translateX(100px);
  will-change: transform;
  transition: transform 0.3s ease;
}

/* ❌ Slower */
.animated {
  margin-left: 100px;
  transition: margin-left 0.3s ease;
}
```

### Issue 3: Memory Leaks

**Problem**: App becomes slow over time.

**Cause**: Event listeners, subscriptions not cleaned up.

**Solution**: Clean up in useEffect

```typescript
useEffect(() => {
  const supabase = createClient();

  // Subscribe to changes
  const channel = supabase
    .channel('debates')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'debates' },
      handleChange
    )
    .subscribe();

  // Cleanup!
  return () => {
    channel.unsubscribe();
  };
}, []);
```

---

## Deep Linking

### Issue 1: Deep Links Don't Open Correct Page

**Problem**: Clicking `yourapp://debates/123` opens app but stays on home page.

**Solution**: Handle `appUrlOpen` event

```typescript
// app/layout.tsx or a top-level component
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { App as CapacitorApp } from '@capacitor/app';

export default function DeepLinkHandler({ children }) {
  const router = useRouter();

  useEffect(() => {
    CapacitorApp.addListener('appUrlOpen', (event) => {
      const url = new URL(event.url);
      const path = url.pathname + url.search + url.hash;

      // Navigate to the deep link path
      router.push(path);
    });

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [router]);

  return <>{children}</>;
}
```

### Issue 2: Universal Links Not Working

**Problem**: HTTPS links don't open app, only custom schemes work.

**Cause**: Apple App Site Association file not configured.

**Solution**: Configure Universal Links

1. Create `apple-app-site-association` file on your domain:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAM_ID.BUNDLE_ID",
        "paths": ["/debates/*", "/profile/*"]
      }
    ]
  }
}
```

Host at: `https://yourdomain.com/.well-known/apple-app-site-association`

2. Add Associated Domains in Xcode:
   - Open Xcode
   - Select your target
   - Go to "Signing & Capabilities"
   - Add "Associated Domains" capability
   - Add: `applinks:yourdomain.com`

---

## iOS-Specific Issues

### Issue 1: Safe Area / Notch Issues

**Problem**: Content hidden behind notch or home indicator.

**Solution**: Use CSS safe area insets

```css
.app-container {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

Or use viewport-fit in your HTML:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

### Issue 2: Keyboard Covers Input Fields

**Problem**: iOS keyboard covers text inputs.

**Solution**: Install Keyboard plugin

```bash
npm install @capacitor/keyboard
```

```typescript
import { Keyboard } from '@capacitor/keyboard';

// Hide keyboard when tapping outside
Keyboard.addListener('keyboardWillShow', () => {
  // Scroll input into view if needed
});

Keyboard.addListener('keyboardWillHide', () => {
  // Reset scroll
});
```

### Issue 3: Status Bar Color

**Problem**: Status bar color doesn't match app theme.

**Solution**: Install Status Bar plugin

```bash
npm install @capacitor/status-bar
```

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// Set style
StatusBar.setStyle({ style: Style.Dark });

// Set background color
StatusBar.setBackgroundColor({ color: '#1a1a1a' });
```

---

## Build & Deployment Issues

### Issue 1: Build Succeeds but App is Blank

**Problem**: `npm run build` succeeds but Capacitor app shows blank screen.

**Debugging steps**:

1. **Check Safari Web Inspector**:
   - Open Safari on Mac
   - Connect iPhone via USB
   - Develop → [Your iPhone] → [Your App]
   - Check console for errors

2. **Common causes**:
   - Missing `images: { unoptimized: true }`
   - API route still exists
   - Server-side code in components
   - Incorrect base path

3. **Test static build locally**:

```bash
npm run build
npx serve out
# Visit http://localhost:3000
# Does it work? If not, fix before syncing to Capacitor
```

### Issue 2: Changes Not Reflected in App

**Problem**: Made code changes but app looks the same.

**Solution**: Full rebuild

```bash
# 1. Clean Next.js build
rm -rf .next out

# 2. Rebuild
npm run build

# 3. Sync to Capacitor
npx cap sync

# 4. Clean Xcode build (in Xcode)
# Product → Clean Build Folder

# 5. Rebuild in Xcode
# Product → Build
```

### Issue 3: Large App Size

**Problem**: App is 100+ MB.

**Solutions**:

1. Check what's in your bundle:

```bash
ANALYZE=true npm run build
```

2. Remove large dependencies
3. Lazy load heavy components
4. Optimize images
5. Enable Xcode app thinning (automatic)

---

## Data Fetching Gotchas

### Issue 1: Stale Data After Build

**Problem**: Data in app is from when you ran `npm run build`.

**Cause**: Server Components fetch data at build time, not runtime.

**Solution**: Use client-side fetching for dynamic data

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DebateList() {
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDebates() {
      const supabase = createClient();
      const { data } = await supabase
        .from('debates')
        .select('*')
        .order('created_at', { ascending: false });

      setDebates(data || []);
      setLoading(false);
    }

    fetchDebates();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {debates.map(debate => (
        <DebateCard key={debate.id} debate={debate} />
      ))}
    </div>
  );
}
```

### Issue 2: Realtime Subscriptions Not Working

**Problem**: Supabase realtime doesn't update UI.

**Cause**: Forgetting to subscribe or not handling updates.

**Solution**:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function RealtimeDebates() {
  const [debates, setDebates] = useState([]);

  useEffect(() => {
    const supabase = createClient();

    // Initial fetch
    async function loadDebates() {
      const { data } = await supabase
        .from('debates')
        .select('*');
      setDebates(data || []);
    }

    loadDebates();

    // Subscribe to changes
    const channel = supabase
      .channel('debates-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'debates' },
        (payload) => {
          setDebates(prev => [payload.new, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'debates' },
        (payload) => {
          setDebates(prev =>
            prev.map(d => d.id === payload.new.id ? payload.new : d)
          );
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'debates' },
        (payload) => {
          setDebates(prev =>
            prev.filter(d => d.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      {debates.map(debate => (
        <DebateCard key={debate.id} debate={debate} />
      ))}
    </div>
  );
}
```

### Issue 3: Can't Fetch Data on Dynamic Routes

**Problem**: `/debates/[id]` page doesn't load debate data.

**Cause**: Need to fetch client-side or use `generateStaticParams`.

**Solution**: Client-side fetching (recommended for mobile)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DebatePage() {
  const params = useParams();
  const id = params.id as string;

  const [debate, setDebate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDebate() {
      const supabase = createClient();
      const { data } = await supabase
        .from('debates')
        .select('*')
        .eq('id', id)
        .single();

      setDebate(data);
      setLoading(false);
    }

    loadDebate();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!debate) return <div>Debate not found</div>;

  return <div>{/* Render debate */}</div>;
}
```

---

## Quick Reference: Common Fixes

| Problem | Solution |
|---------|----------|
| Blank screen | Check Safari Web Inspector, enable `images: { unoptimized: true }` |
| Images 404 | Put images in `/public`, use `/image.png` paths |
| Session lost | Use localStorage, set `persistSession: true` |
| API route error | Migrate to Supabase Edge Function |
| Env vars undefined | Use `NEXT_PUBLIC_*` prefix, rebuild app |
| Stale data | Use client-side fetching instead of Server Components |
| Back button broken | Use Next.js `<Link>` and `router.push()` |
| Deep links broken | Handle `appUrlOpen` event |
| Slow performance | Analyze bundle, lazy load, optimize images |
| Keyboard covers input | Install @capacitor/keyboard plugin |

---

## Debugging Checklist

When something doesn't work:

1. **Test static build in browser first**
   ```bash
   npm run build
   npx serve out
   ```
   If it doesn't work here, it won't work in Capacitor.

2. **Check Safari Web Inspector**
   - Connect iPhone to Mac
   - Safari → Develop → iPhone → Your App
   - Look for console errors

3. **Verify build configuration**
   - `output: 'export'` in next.config.ts
   - `images: { unoptimized: true }`
   - No API routes
   - No dynamic server functions

4. **Clean build**
   ```bash
   rm -rf .next out node_modules
   npm install
   npm run build
   npx cap sync
   ```

5. **Check Capacitor config**
   - `webDir: 'out'` matches Next.js output
   - App ID and name are correct

6. **Test on device, not just simulator**
   - Some issues only appear on real devices
   - Use TestFlight for beta testing

---

## Getting Help

**Resources**:
- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Capacitor Community Discord](https://ionic.link/discord)

**When asking for help**:
- Share your next.config.ts
- Share your capacitor.config.ts
- Describe what you expect vs. what happens
- Include console errors from Safari Web Inspector
- Mention Next.js version and Capacitor version

---

## Summary

Most issues stem from:
1. Not configuring static export properly
2. Using server-side features in client
3. Incorrect file paths or base paths
4. Environment variables not prefixed with `NEXT_PUBLIC_`
5. Not rebuilding after changes

**Key principle**: Think of your Capacitor app as a purely static website with no server. Everything must work client-side.
