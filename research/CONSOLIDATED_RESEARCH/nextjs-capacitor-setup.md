# Next.js + Capacitor Integration Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [Next.js Configuration](#nextjs-configuration)
5. [Capacitor Configuration](#capacitor-configuration)
6. [App Router vs Pages Router](#app-router-vs-pages-router)
7. [Build and Sync Process](#build-and-sync-process)
8. [Development Workflow](#development-workflow)
9. [Known Issues and Solutions](#known-issues-and-solutions)
10. [Best Practices](#best-practices)

---

## Overview

This guide shows you how to add Capacitor to an **existing Next.js application** without rewriting your app. You'll learn how to configure Next.js for static export and wrap it in a native iOS/Android container.

### What You'll Achieve

- ✅ Convert Next.js app to native iOS/Android
- ✅ Keep your existing codebase
- ✅ Deploy to App Store and Google Play
- ✅ Maintain web version alongside mobile apps
- ✅ Use Supabase and other APIs from mobile

### Key Requirement: Static Export

Capacitor requires your Next.js app to be **statically exported** (HTML/CSS/JS files). This means:

- ❌ **No Server-Side Rendering (SSR)**
- ❌ **No Server Actions**
- ❌ **No API Routes** (use external APIs instead)
- ❌ **No `getServerSideProps`**
- ✅ Client-side rendering only
- ✅ Static generation with `getStaticProps`
- ✅ Client-side routing
- ✅ External API calls (Supabase, REST APIs, etc.)

**Why?** You can't bundle a Node.js server into an iOS/Android app. The app must run entirely on the device.

---

## Prerequisites

### Software Required

```bash
# Check versions
node --version   # v18 or later recommended
npm --version    # v9 or later

# For iOS development
xcode-select --version  # Xcode must be installed (macOS only)

# For Android development
android --version  # Android Studio must be installed
```

### Existing Next.js App

This guide assumes you have:
- An existing Next.js project
- Next.js 13, 14, or 15
- Project using App Router or Pages Router

### Apple Developer Account (for iOS)

- Enrollment: $99/year
- Required to test on physical devices and publish to App Store
- Sign up: https://developer.apple.com

### Google Play Console Account (for Android)

- One-time fee: $25
- Required to publish to Google Play
- Sign up: https://play.google.com/console

---

## Step-by-Step Setup

### Step 1: Install Capacitor

In your Next.js project root:

```bash
npm install @capacitor/core @capacitor/cli
```

### Step 2: Initialize Capacitor

```bash
npx cap init
```

You'll be prompted for:

```
? App name: Philosophy
? App ID (e.g., com.example.app): com.yourcompany.philosophy
? Package ID: com.yourcompany.philosophy
? Class name: Philosophy
```

**Important Values:**

- **App name**: User-visible name (can change later)
- **App ID**: Reverse domain notation (e.g., `com.yourcompany.appname`)
  - ⚠️ **Cannot be changed after App Store submission**
  - Use your domain or company name
  - Must be unique across all iOS apps
- **Package ID**: Android identifier (usually same as App ID)

This creates `capacitor.config.ts` in your project root.

### Step 3: Configure Next.js for Static Export

Edit `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',

  // Disable image optimization (requires server)
  images: {
    unoptimized: true,
  },

  // Optional: Set base path if needed
  // basePath: '',

  // Optional: Disable trailing slashes
  // trailingSlash: true,
}

module.exports = nextConfig
```

**Key Changes:**
- `output: 'export'` - Generates static HTML/CSS/JS
- `unoptimized: true` - Disables Next.js Image Optimization (requires server)

### Step 4: Update package.json Scripts

Add build scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",

    // Add these for Capacitor
    "static": "npm run build",
    "cap:sync": "npm run static && npx cap sync",
    "cap:ios": "npm run cap:sync && npx cap open ios",
    "cap:android": "npm run cap:sync && npx cap open android"
  }
}
```

**Script Explanation:**
- `static` - Builds and exports Next.js app
- `cap:sync` - Builds web app and syncs to native projects
- `cap:ios` - Opens iOS project in Xcode
- `cap:android` - Opens Android project in Android Studio

### Step 5: Add iOS Platform

```bash
npx cap add ios
```

This creates an `ios/` folder with a complete Xcode project.

**macOS Required**: iOS apps can only be built on macOS with Xcode installed.

**Don't have a Mac?** Use cloud Mac services:
- Codemagic (has cloud macOS builders)
- MacStadium
- MacinCloud
- GitHub Actions (has macOS runners)

### Step 6: Add Android Platform

```bash
npx cap add android
```

This creates an `android/` folder with a complete Android Studio project.

**Works on any OS**: Windows, macOS, or Linux.

### Step 7: Update .gitignore

Add to your `.gitignore`:

```
# Capacitor
/ios/App/App/public
/android/app/src/main/assets/public

# Build output
/out
```

**Why?**
- Native `public` folders contain copies of your web build
- These are generated files (sync'd from `out/`)
- Don't commit duplicates to git

---

## Next.js Configuration

### Basic Configuration

Your `next.config.js` should look like this:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
  },

  // Optional: Uncomment if you need trailing slashes
  // trailingSlash: true,

  // Optional: If app is served from a subdirectory
  // basePath: '/app',
}

module.exports = nextConfig
```

### Handling Images

Since Next.js Image Optimization doesn't work with static export:

**Option 1: Use regular `<img>` tags**

```jsx
// Instead of next/image
<img
  src="/images/photo.jpg"
  alt="Photo"
  width={500}
  height={300}
/>
```

**Option 2: Use Capacitor-compatible image library**

```bash
npm install next-image-export-optimizer
```

```javascript
// next.config.js
const withExportImages = require('next-image-export-optimizer')

module.exports = withExportImages({
  output: 'export',
  images: {
    unoptimized: true,
  },
})
```

**Option 3: Serve optimized images from CDN**

```jsx
<img
  src="https://your-cdn.com/images/photo.jpg"
  alt="Photo"
/>
```

### Handling Links and Navigation

Client-side navigation works normally:

```jsx
import Link from 'next/link'

// Works in Capacitor
<Link href="/about">About</Link>
```

### Environment Variables

**At Build Time (Recommended):**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

**At Runtime:**

For different environments (dev/staging/prod), create separate builds:

```json
// package.json
{
  "scripts": {
    "build:dev": "NEXT_PUBLIC_ENV=dev next build",
    "build:staging": "NEXT_PUBLIC_ENV=staging next build",
    "build:prod": "NEXT_PUBLIC_ENV=production next build"
  }
}
```

### Conditional Rendering for Mobile

Detect if app is running in Capacitor:

```typescript
// lib/capacitor.ts
import { Capacitor } from '@capacitor/core';

export const isNativePlatform = () => {
  return Capacitor.isNativePlatform();
};

export const getPlatform = () => {
  return Capacitor.getPlatform(); // 'ios', 'android', or 'web'
};
```

```tsx
// components/Header.tsx
import { isNativePlatform } from '@/lib/capacitor';

export default function Header() {
  const isNative = isNativePlatform();

  return (
    <header>
      {!isNative && <WebOnlyNav />}
      {isNative && <MobileNav />}
    </header>
  );
}
```

---

## Capacitor Configuration

### Basic Configuration

Edit `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.philosophy',
  appName: 'Philosophy',
  webDir: 'out',  // Next.js output directory
  server: {
    // For production, leave this commented out
    // url: 'http://192.168.1.100:3000',
    // cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#ffffff',
      showSpinner: false,
    },
  },
};

export default config;
```

**Key Settings:**

- `webDir: 'out'` - Points to Next.js static export folder
- `server.url` - For development with live reload (see below)
- `plugins` - Configure individual Capacitor plugins

### Development Configuration (Live Reload)

For development, you can run your Next.js dev server and have the mobile app load from it:

```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'com.yourcompany.philosophy',
  appName: 'Philosophy',
  webDir: 'out',
  server: {
    url: 'http://192.168.1.100:3000',  // Your computer's local IP
    cleartext: true  // Required for HTTP on iOS
  },
};
```

**Find your IP:**
```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

**Important:**
- Use your **local IP** (192.168.x.x), not localhost
- Phone and computer must be on **same WiFi network**
- Set `cleartext: true` for HTTP (iOS requirement)
- **Remove this for production builds!**

### Platform-Specific Configuration

**iOS Configuration:**

Edit `ios/App/App/Info.plist` for iOS-specific settings:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <!-- App name -->
  <key>CFBundleDisplayName</key>
  <string>Philosophy</string>

  <!-- Permission descriptions -->
  <key>NSCameraUsageDescription</key>
  <string>We need access to your camera to take photos</string>

  <key>NSPhotoLibraryUsageDescription</key>
  <string>We need access to your photo library</string>

  <key>NSLocationWhenInUseUsageDescription</key>
  <string>We need your location to provide relevant content</string>

  <!-- Allow HTTP for development -->
  <!-- Remove for production! -->
  <key>NSAppTransportSecurity</key>
  <dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
  </dict>
</dict>
</plist>
```

**Android Configuration:**

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

    <application
        android:allowBackup="true"
        android:label="@string/app_name"
        android:usesCleartextTraffic="true">

        <!-- Remove usesCleartextTraffic for production -->

    </application>
</manifest>
```

---

## App Router vs Pages Router

### Pages Router (Recommended for Capacitor)

The **Pages Router** is simpler to configure with Capacitor.

**What Works:**
- ✅ `getStaticProps` - Data fetching at build time
- ✅ `getStaticPaths` - Dynamic routes with pre-generation
- ✅ Client-side data fetching (useEffect, SWR, React Query)
- ✅ Dynamic imports and code splitting
- ✅ All client-side features

**What Doesn't Work:**
- ❌ `getServerSideProps` - Requires server
- ❌ `getInitialProps` - Requires server
- ❌ API Routes (`pages/api/*`) - No Node.js server

**Example Pages Router Setup:**

```typescript
// pages/index.tsx
import { GetStaticProps } from 'next';

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}

// Data fetched at BUILD TIME
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
    // Revalidate not supported in static export
    // revalidate: 60,
  };
};
```

**Dynamic Routes:**

```typescript
// pages/posts/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';

export default function Post({ post }: { post: Post }) {
  return <article>{post.title}</article>;
}

// Generate all possible paths at BUILD TIME
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));

  return {
    paths,
    fallback: false  // Must be false for static export
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://api.example.com/posts/${params?.id}`);
  const post = await res.json();

  return {
    props: { post }
  };
};
```

### App Router (More Complex with Capacitor)

The **App Router** works but requires more careful configuration.

**What Works:**
- ✅ Client Components (use 'use client')
- ✅ Client-side data fetching
- ✅ Dynamic imports
- ✅ Layouts and nested routes

**What Doesn't Work:**
- ❌ Server Components (default in App Router)
- ❌ Server Actions
- ❌ Middleware
- ❌ Route handlers (app/api/*)

**App Router Configuration:**

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },

  // Important for App Router
  experimental: {
    // Ensure proper static generation
  }
}
```

**Force Client Components:**

```typescript
// app/page.tsx
'use client';  // Required!

import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Client-side data fetching
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{/* Your UI */}</div>;
}
```

**Layouts Still Work:**

```typescript
// app/layout.tsx
'use client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Recommendation

**For Philosophy App:**
- If starting fresh: Use **Pages Router** - simpler, fewer gotchas
- If already on App Router: It works, but mark everything as `'use client'`

**Trade-offs:**

| Feature | Pages Router | App Router |
|---------|--------------|------------|
| Simplicity | ✅ Simpler | More complex |
| Client-side rendering | ✅ Natural | Requires 'use client' |
| Documentation | ✅ More examples | Fewer Capacitor examples |
| Layouts | Requires _app.tsx | ✅ Built-in layouts |
| Future-proof | Still supported | ✅ Future of Next.js |

---

## Build and Sync Process

### Understanding the Build Flow

```
┌────────────────────┐
│   npm run build    │  1. Build Next.js app
└──────────┬─────────┘
           │
           v
┌────────────────────┐
│  out/ directory    │  2. Static files generated
│  ├── index.html    │
│  ├── _next/        │
│  └── assets/       │
└──────────┬─────────┘
           │
           v
┌────────────────────┐
│   npx cap sync     │  3. Copy to native projects
└──────────┬─────────┘
           │
           ├─────────────────────┐
           │                     │
           v                     v
┌──────────────────┐  ┌──────────────────┐
│ ios/App/App/     │  │ android/app/src/ │
│   public/        │  │   main/assets/   │
└──────────────────┘  └──────────────────┘
```

### Build Commands

**Full Build and Sync:**

```bash
# Build Next.js app
npm run build

# Sync to native projects
npx cap sync

# Or combined
npm run cap:sync
```

**What `npx cap sync` Does:**

1. Copies web assets from `out/` to native projects
2. Updates native dependencies (CocoaPods on iOS)
3. Syncs Capacitor plugins
4. Updates native configuration files

### Sync to Specific Platform

```bash
# Sync only to iOS
npx cap sync ios

# Sync only to Android
npx cap sync android
```

### Copy Without Dependency Update

If you only changed web files (not plugins):

```bash
npx cap copy

# Or specific platform
npx cap copy ios
npx cap copy android
```

**Faster than `sync`** - skips native dependency updates.

### Update Native Dependencies

If you added/removed plugins:

```bash
npx cap update

# Or specific platform
npx cap update ios
npx cap update android
```

### Opening Native Projects

**iOS (Opens Xcode):**

```bash
npx cap open ios

# Or use convenience script
npm run cap:ios
```

**Android (Opens Android Studio):**

```bash
npx cap open android

# Or use convenience script
npm run cap:android
```

### Complete Development Workflow

```bash
# 1. Make changes to Next.js code
# Edit src/app/page.tsx or pages/index.tsx

# 2. Test in web browser (fastest)
npm run dev

# 3. Build for mobile
npm run build

# 4. Sync to native projects
npx cap sync

# 5. Open in Xcode/Android Studio
npx cap open ios

# 6. Click "Run" in Xcode to test on simulator/device
```

---

## Development Workflow

### Method 1: Web-First Development (Fastest)

Develop primarily in the browser:

```bash
npm run dev
# Open http://localhost:3000
```

**Advantages:**
- Instant hot reload
- Chrome DevTools
- Fastest iteration
- No native builds needed

**Test periodically on mobile:**

```bash
npm run cap:sync
npx cap open ios
# Test on simulator/device
```

### Method 2: Live Reload on Device

Configure Capacitor to load from your dev server:

**Step 1: Configure**

```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'com.yourcompany.philosophy',
  appName: 'Philosophy',
  webDir: 'out',
  server: {
    url: 'http://192.168.1.100:3000',  // Your local IP
    cleartext: true
  },
};
```

**Step 2: Start Dev Server**

```bash
npm run dev
```

**Step 3: Build and Open**

```bash
# Don't need to rebuild for every change!
npx cap sync
npx cap open ios
```

**Step 4: Run in Xcode/Android Studio**

Click "Run" - the app now loads from your dev server.

**Every code change** automatically refreshes the app!

**Remember:** Remove `server.url` before production builds.

### Method 3: Hybrid Approach (Recommended)

1. **Develop UI in browser** (fast iteration)
2. **Test native features on device** (with live reload)
3. **Build static version** before major testing

```bash
# Daily workflow
npm run dev                    # Develop in browser

# When testing native features
npm run cap:ios                # Opens Xcode with live reload

# Before major testing/demo
npm run build                  # Build static version
npx cap sync
npx cap open ios              # Test production-like build
```

### Debugging on Device

**iOS - Safari Web Inspector:**

1. On device: Settings → Safari → Advanced → Enable "Web Inspector"
2. Connect device to Mac via USB
3. Safari → Develop → [Your Device] → [Your App]
4. Full DevTools access

**Android - Chrome DevTools:**

1. Enable USB Debugging on Android device
2. Connect via USB
3. Chrome → `chrome://inspect`
4. Click "Inspect" on your app
5. Full DevTools access

### Testing Native Features

**Camera, Geolocation, etc. only work on device/simulator:**

```bash
# Build and sync
npm run build
npx cap sync ios

# Open in Xcode
npx cap open ios

# Run on simulator or device
# (Click "Run" button in Xcode)
```

**Or use live reload** for faster testing:

```typescript
// Enable server.url in capacitor.config.ts
npm run dev
npx cap sync ios
npx cap open ios
// Now changes auto-reload on device!
```

---

## Known Issues and Solutions

### Issue 1: Router History Not Working

**Problem:** Browser back button doesn't work on Android

**Solution:** Implement custom back button handling

```typescript
// app/layout.tsx or pages/_app.tsx
import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack || router.pathname === '/') {
        App.exitApp();
      } else {
        router.back();
      }
    });
  }, [router]);

  return <div>{children}</div>;
}
```

### Issue 2: White Screen on Device

**Symptoms:** App shows white screen when opened

**Possible Causes:**
1. Forgot to run `npx cap sync`
2. Wrong `webDir` in capacitor.config.ts
3. JavaScript errors preventing app load
4. Paths incorrect in Next.js config

**Solutions:**

```bash
# Verify build exists
ls out/
# Should see index.html, _next/, etc.

# Sync again
npx cap sync

# Check for errors in Safari Web Inspector / Chrome DevTools
```

**Check capacitor.config.ts:**

```typescript
const config: CapacitorConfig = {
  webDir: 'out',  // Must match Next.js output directory
};
```

### Issue 3: Next.js Image Component Errors

**Problem:** `<Image>` component throws errors

**Solution:** Use regular `<img>` tags or unoptimized images

```tsx
// ❌ Don't use Next.js Image with static export
import Image from 'next/image';
<Image src="/photo.jpg" alt="Photo" width={500} height={300} />

// ✅ Use regular img tag instead
<img src="/photo.jpg" alt="Photo" width={500} height={300} />
```

**Or configure unoptimized:**

```javascript
// next.config.js
module.exports = {
  images: {
    unoptimized: true,
  },
}
```

### Issue 4: Dynamic Routes Return 404

**Problem:** Routes like `/posts/123` show 404

**Solution:** Pre-generate all routes with `getStaticPaths`

```typescript
// pages/posts/[id].tsx
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all possible post IDs at BUILD TIME
  const posts = await getAllPosts();

  return {
    paths: posts.map(post => ({
      params: { id: post.id.toString() }
    })),
    fallback: false  // MUST be false for static export
  };
};
```

**Can't pre-generate all routes?**

Use client-side routing instead:

```typescript
// pages/posts/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch post data client-side
      fetch(`https://api.example.com/posts/${id}`)
        .then(res => res.json())
        .then(setPost);
    }
  }, [id]);

  return <div>{post?.title}</div>;
}

// No getStaticPaths needed - renders client-side
```

### Issue 5: Environment Variables Not Working

**Problem:** `process.env.VARIABLE_NAME` is undefined

**Solution:** Use `NEXT_PUBLIC_` prefix

```bash
# .env.local

# ❌ Won't work in client-side code
SUPABASE_URL=https://xxx.supabase.co

# ✅ Will work
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
```

```typescript
// Now accessible
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
```

### Issue 6: Live Reload Not Working

**Problem:** Changes don't reflect on device

**Checklist:**

1. **Verify IP address is correct**
   ```bash
   # Get your local IP
   ifconfig | grep "inet " # macOS/Linux
   ipconfig # Windows
   ```

2. **Check devices on same WiFi network**

3. **Verify capacitor.config.ts**
   ```typescript
   server: {
     url: 'http://192.168.1.100:3000',  // Your actual IP
     cleartext: true
   }
   ```

4. **Sync after changing config**
   ```bash
   npx cap sync
   ```

5. **Rebuild app in Xcode/Android Studio**
   Click "Run" again after syncing

6. **Check firewall settings**
   Allow port 3000 through firewall

### Issue 7: Plugins Not Working

**Problem:** Capacitor plugins throw errors or don't work

**Solution:**

```bash
# 1. Install plugin
npm install @capacitor/camera

# 2. SYNC - this is crucial!
npx cap sync

# 3. For iOS, update pods
cd ios/App && pod install && cd ../..

# 4. Open native project
npx cap open ios

# 5. Verify plugin appears in Xcode
# Check Pods folder includes CapacitorCamera
```

**Add required permissions:**

```xml
<!-- ios/App/App/Info.plist -->
<key>NSCameraUsageDescription</key>
<string>We need camera access</string>
```

### Issue 8: CORS Errors

**Problem:** API requests fail with CORS errors

**Why:** WebView enforces CORS like a browser

**Solutions:**

**Option 1: Configure your API to allow CORS**

```javascript
// Backend
res.setHeader('Access-Control-Allow-Origin', '*');
```

**Option 2: Use Capacitor HTTP plugin (bypasses CORS)**

```bash
npm install @capacitor/http
```

```typescript
import { CapacitorHttp } from '@capacitor/http';

const doGet = async () => {
  const options = {
    url: 'https://api.example.com/data',
  };

  const response = await CapacitorHttp.get(options);
  return response.data;
};
```

**Option 3: Use native requests via custom plugin**

---

## Best Practices

### 1. Separate Web and Mobile Builds

**Don't mix web and mobile configs:**

```typescript
// capacitor.config.ts
const isProd = process.env.NODE_ENV === 'production';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.philosophy',
  appName: 'Philosophy',
  webDir: 'out',
  // Only use server.url in development
  ...(!isProd && {
    server: {
      url: 'http://192.168.1.100:3000',
      cleartext: true
    }
  })
};
```

### 2. Test Build Process Early

Don't wait until the end:

```bash
# Test the full process weekly
npm run build
npx cap sync
npx cap open ios
# Build and run
```

### 3. Use Git to Track Native Projects

**Do commit:**
- `ios/` folder
- `android/` folder
- `capacitor.config.ts`

**Don't commit:**
- `ios/App/App/public/`
- `android/app/src/main/assets/public/`
- `out/`

**Why?** Native projects are source code, but `public/` folders are generated.

### 4. Version Control for App Store

**Keep track of versions:**

```json
// package.json
{
  "version": "1.0.0"
}
```

**Update in native projects too:**

```xml
<!-- ios/App/App/Info.plist -->
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleVersion</key>
<string>1</string>
```

**Automate version updates:**

```bash
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.1 → 1.1.0
npm version major   # 1.1.0 → 2.0.0
```

### 5. Progressive Enhancement

Make native features optional:

```typescript
import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

async function takePhoto() {
  // Check if Camera is available
  if (Capacitor.isPluginAvailable('Camera')) {
    const image = await Camera.getPhoto({...});
    return image;
  } else {
    // Fallback for web
    return useFileInput();
  }
}
```

### 6. Maintain Feature Parity

Keep web and mobile versions in sync:

```typescript
// lib/platform.ts
export const isMobile = () => Capacitor.isNativePlatform();
export const isWeb = () => !Capacitor.isNativePlatform();

// Use conditional rendering
{isMobile() && <MobileFeature />}
{isWeb() && <WebFeature />}
```

### 7. Optimize for Performance

**Reduce bundle size:**

```bash
# Analyze bundle
npm install @next/bundle-analyzer

# Use dynamic imports
const DynamicComponent = dynamic(() => import('./HeavyComponent'));
```

**Optimize images:**
- Use WebP format
- Compress before adding to project
- Lazy load images

### 8. Handle App Lifecycle

```typescript
// app/layout.tsx
import { App } from '@capacitor/app';

useEffect(() => {
  // App goes to background
  App.addListener('appStateChange', ({ isActive }) => {
    if (isActive) {
      console.log('App is active');
      // Refresh data, resume timers, etc.
    } else {
      console.log('App is in background');
      // Pause timers, save state, etc.
    }
  });
}, []);
```

### 9. Security Best Practices

**Don't commit secrets:**

```bash
# .env.local (not committed)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Add to .gitignore
.env.local
.env*.local
```

**Use environment-specific configs:**

```typescript
// lib/config.ts
export const config = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};
```

### 10. Documentation

Document your setup:

```markdown
# README.md

## Development

npm run dev                    # Web development
npm run cap:ios               # iOS development with live reload

## Building for Mobile

npm run build                 # Build Next.js app
npx cap sync                  # Sync to native projects
npx cap open ios             # Open in Xcode
```

---

## Quick Reference

### Essential Commands

```bash
# Setup
npx cap init
npx cap add ios
npx cap add android

# Development
npm run dev                    # Web dev server
npm run cap:ios               # Open iOS in Xcode
npm run cap:android           # Open Android in Android Studio

# Building
npm run build                 # Build Next.js
npx cap sync                  # Sync to native
npx cap copy                  # Copy web assets only

# Opening
npx cap open ios             # Xcode
npx cap open android         # Android Studio
```

### Config Files Checklist

- ✅ `next.config.js` - Set `output: 'export'`
- ✅ `capacitor.config.ts` - Set `webDir: 'out'`
- ✅ `package.json` - Add Capacitor scripts
- ✅ `.gitignore` - Ignore generated files
- ✅ `.env.local` - Environment variables

### Testing Checklist

- ✅ Works in web browser
- ✅ Static export builds successfully
- ✅ Works in iOS simulator
- ✅ Works in Android emulator
- ✅ Works on real iOS device
- ✅ Works on real Android device
- ✅ All native features tested
- ✅ No console errors

---

## Next Steps

1. ✅ **Complete this setup** - Get Next.js + Capacitor working
2. 📖 **Read Supabase compatibility guide** - Configure authentication
3. 🎨 **Test on devices** - Verify everything works
4. 🚀 **Plan App Store submission** - Review requirements

---

**Document Version**: 1.0
**Last Updated**: November 2024
**For Next.js**: 13, 14, 15
**For Capacitor**: 6.x, 7.x
