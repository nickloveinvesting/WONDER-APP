# PWA Implementation Guide for Next.js 15

**Project Context**: Philosophy App - Next.js 15 on Vercel with Supabase
**Implementation Time**: 1-3 days
**Coding Level Required**: Minimal (config files only)

---

## What You'll Get

By implementing PWA features, users can:
- Install your app directly from Safari to their iOS home screen
- Use the app in fullscreen mode (no browser chrome)
- Access basic offline functionality
- Get an app-like icon on their device

**Important**: PWAs on iOS do NOT appear in the App Store. Users install via "Add to Home Screen" in Safari.

---

## iOS PWA Limitations (Know Before You Build)

### What Works
✅ Add to home screen installation
✅ Fullscreen app experience
✅ Basic offline caching
✅ Geolocation (when app is active)
✅ Basic camera access
✅ Works with Supabase perfectly

### What Doesn't Work on iOS
❌ **No push notifications** (Android PWAs support this)
❌ **50MB offline storage limit**
❌ No background location/microphone
❌ Limited Bluetooth and NFC
❌ No access to contacts
❌ No ARKit or advanced iOS features
❌ **Not in App Store** (major discoverability issue)

**Verdict**: PWAs are great for quick testing but have severe limitations on iOS compared to Android.

---

## Implementation Approach

Next.js 15 offers **TWO** approaches:

1. **Native Next.js PWA Support** (Recommended) - Zero dependencies
2. **Package-Based Approach** - Using `@ducanh2912/next-pwa` or `next-pwa-pack`

We'll cover both, with the native approach recommended for simplicity.

---

## Option 1: Native Next.js PWA (Recommended)

### Step 1: Create App Manifest

Create `app/manifest.ts` (or `manifest.json`):

```typescript
// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Philosophy - Thoughtful Conversations',
    short_name: 'Philosophy',
    description: 'A conversation-first platform for philosophical discussion',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  }
}
```

### Step 2: Update Root Layout Metadata

Update `app/layout.tsx` to reference the manifest:

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Philosophy - Thoughtful Conversations',
  description: 'A conversation-first platform for philosophical discussion',
  manifest: '/manifest.webmanifest', // Next.js auto-generates this from manifest.ts

  // iOS-specific meta tags
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Philosophy',
  },

  // Theme color for mobile browsers
  themeColor: '#000000',

  // Viewport settings for mobile
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },

  // Open Graph / Social Media
  openGraph: {
    type: 'website',
    title: 'Philosophy - Thoughtful Conversations',
    description: 'A conversation-first platform for philosophical discussion',
    siteName: 'Philosophy',
  },
}
```

### Step 3: Add Apple Touch Icons

Add to `app/layout.tsx` head section or create `app/apple-icon.png`:

```typescript
// The easiest way is to add apple-icon.png files directly:
// app/apple-icon.png (180x180 is the standard size)

// Or add via metadata in layout.tsx:
export const metadata: Metadata = {
  // ... other metadata
  icons: {
    apple: '/apple-icon.png',
  },
}
```

### Step 4: Create App Icons

You'll need to create app icons in various sizes. Place them in `/public/icons/`:

**Required Sizes**:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192 (Android standard)
- 384x384
- 512x512 (Android standard)
- 180x180 (Apple touch icon - save as `/public/apple-icon.png`)

**Tools to Generate Icons**:
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)

**Quick Command** (if you have one source image):
```bash
npx pwa-asset-generator public/logo.png public/icons -m public/manifest.json
```

### Step 5: Create Service Worker (Optional for Basic PWA)

For **basic PWA**, the manifest alone may be sufficient. For **offline support**, create a service worker.

Create `public/sw.js`:

```javascript
// public/sw.js
const CACHE_NAME = 'philosophy-app-v1'
const urlsToCache = [
  '/',
  '/offline', // Create an offline fallback page
]

// Install service worker and cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

// Fetch from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

// Update service worker and clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
```

### Step 6: Register Service Worker

Create a component to register the service worker:

```typescript
// components/RegisterServiceWorker.tsx
'use client'

import { useEffect } from 'react'

export default function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration)
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}
```

Add to your root layout:

```typescript
// app/layout.tsx
import RegisterServiceWorker from '@/components/RegisterServiceWorker'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  )
}
```

### Step 7: Create Offline Fallback Page (Optional)

```typescript
// app/offline/page.tsx
export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">You're Offline</h1>
        <p>Please check your internet connection and try again.</p>
      </div>
    </div>
  )
}
```

### Step 8: Deploy and Test

1. **Deploy to Vercel**:
```bash
git add .
git commit -m "Add PWA support"
git push
```

2. **Test on iOS**:
   - Open Safari on iPhone/iPad
   - Navigate to your deployed URL
   - Tap the Share button
   - Tap "Add to Home Screen"
   - Give it a name and tap "Add"
   - Open the app from your home screen

3. **Verify PWA Features**:
   - App opens in fullscreen (no Safari UI)
   - Correct icon appears on home screen
   - App name is correct
   - Offline page works (if implemented)

---

## Option 2: Package-Based Approach (Advanced)

If you need more advanced PWA features, use a package.

### Using @ducanh2912/next-pwa

This is the modern successor to the original `next-pwa` package.

### Step 1: Install

```bash
npm install @ducanh2912/next-pwa
```

### Step 2: Update next.config.js

```javascript
// next.config.js
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // Your existing Next.js config
})
```

### Step 3: Create manifest.json

```json
// public/manifest.json
{
  "name": "Philosophy - Thoughtful Conversations",
  "short_name": "Philosophy",
  "description": "A conversation-first platform for philosophical discussion",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Step 4: Update Layout

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  manifest: '/manifest.json',
  // ... rest of metadata
}
```

### Step 5: Build and Test

```bash
npm run build
npm start
```

The package will auto-generate:
- `public/workbox-*.js` - Service worker runtime
- `public/sw.js` - Main service worker

---

## Option 3: next-pwa-pack (Zero Config)

Even simpler approach for Next.js 15 with App Router.

```bash
npm install next-pwa-pack
```

```javascript
// next.config.js
const withPWA = require('next-pwa-pack')({
  dest: 'public',
})

module.exports = withPWA({
  // Your Next.js config
})
```

Features:
- Zero config
- SSR support
- Cache sync
- Server revalidation

---

## Supabase Integration Considerations

Good news: **Supabase works perfectly with PWAs** since it's all API-based.

### Offline Considerations

If you want offline functionality with Supabase:

1. **Cache Supabase Data**:
```typescript
// Use service worker to cache API responses
// Or use client-side storage (localStorage, IndexedDB)

// Example: Cache read data, queue writes
const cacheSupabaseQuery = async (key: string, queryFn: () => Promise<any>) => {
  const cached = localStorage.getItem(key)
  if (cached) return JSON.parse(cached)

  const data = await queryFn()
  localStorage.setItem(key, JSON.stringify(data))
  return data
}
```

2. **Queue Offline Actions**:
```typescript
// Store mutations when offline, sync when online
const queueMutation = async (mutation: any) => {
  if (!navigator.onLine) {
    // Store in IndexedDB or localStorage
    const queue = JSON.parse(localStorage.getItem('mutationQueue') || '[]')
    queue.push(mutation)
    localStorage.setItem('mutationQueue', JSON.stringify(queue))
  } else {
    // Execute immediately
    await executeMutation(mutation)
  }
}

// Sync when back online
window.addEventListener('online', async () => {
  const queue = JSON.parse(localStorage.getItem('mutationQueue') || '[]')
  for (const mutation of queue) {
    await executeMutation(mutation)
  }
  localStorage.setItem('mutationQueue', '[]')
})
```

3. **Supabase Realtime**:
   - Realtime subscriptions work in PWAs
   - May disconnect when app is backgrounded on iOS
   - Reconnect automatically when app returns to foreground

---

## iOS-Specific Optimizations

### 1. Disable Pull-to-Refresh

iOS PWAs sometimes show pull-to-refresh. Disable it:

```css
/* globals.css */
body {
  overscroll-behavior-y: contain;
}
```

### 2. Safe Area Insets

Account for notch/home indicator on newer iPhones:

```css
/* globals.css */
:root {
  --safe-area-inset-top: env(safe-area-inset-top);
  --safe-area-inset-bottom: env(safe-area-inset-bottom);
}

body {
  padding-top: var(--safe-area-inset-top);
  padding-bottom: var(--safe-area-inset-bottom);
}
```

### 3. Splash Screen

iOS generates splash screens automatically from your icon and background color. You can also add custom ones:

```html
<!-- Add to layout.tsx head -->
<link rel="apple-touch-startup-image" href="/splash-screen.png" />
```

### 4. Status Bar Styling

```typescript
// app/layout.tsx metadata
appleWebApp: {
  capable: true,
  statusBarStyle: 'black-translucent', // 'default' | 'black' | 'black-translucent'
  title: 'Philosophy',
}
```

---

## Testing Your PWA

### Lighthouse PWA Audit

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Progressive Web App" category
4. Run audit
5. Fix any issues

**Target Score**: 100/100

### iOS Testing Checklist

- [ ] App appears in "Add to Home Screen"
- [ ] Correct icon shows on home screen
- [ ] App name is correct
- [ ] Opens in fullscreen (no Safari UI)
- [ ] Splash screen shows on launch
- [ ] Status bar style is correct
- [ ] No pull-to-refresh issues
- [ ] Safe area insets work on notched devices
- [ ] Supabase auth works
- [ ] Supabase data loading works
- [ ] Offline fallback works (if implemented)

### Android Testing Checklist

- [ ] Install banner appears
- [ ] App installs correctly
- [ ] Icon and name correct
- [ ] Push notifications work (if implemented)
- [ ] Offline mode works

---

## Install Prompts and User Education

Since iOS doesn't show automatic install prompts, you need to educate users.

### Add Install Instructions Component

```typescript
// components/InstallPrompt.tsx
'use client'

import { useState, useEffect } from 'react'

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(ios)

    // Detect if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    setIsStandalone(standalone)
  }, [])

  if (!isIOS || isStandalone) return null

  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
      <h3 className="font-bold mb-2">Install Philosophy App</h3>
      <p className="text-sm mb-2">
        Add this app to your home screen for a better experience!
      </p>
      <ol className="text-sm list-decimal list-inside space-y-1">
        <li>Tap the Share button (square with arrow)</li>
        <li>Scroll down and tap "Add to Home Screen"</li>
        <li>Tap "Add" in the top right</li>
      </ol>
    </div>
  )
}
```

### Detect If App Is Installed

```typescript
// hooks/useIsInstalled.ts
'use client'

import { useState, useEffect } from 'react'

export function useIsInstalled() {
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && (window.navigator as any).standalone
    setIsInstalled(standalone || ios)
  }, [])

  return isInstalled
}
```

---

## Updating Your PWA

PWAs update automatically when you deploy new code. However:

1. **Service Worker Updates**: May take time to activate
2. **User Must Close/Reopen**: For updates to apply
3. **Force Update Strategy**:

```typescript
// components/UpdateNotification.tsx
'use client'

import { useState, useEffect } from 'react'

export default function UpdateNotification() {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true)
            }
          })
        })
      })
    }
  }, [])

  if (!updateAvailable) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
      <p className="font-bold mb-2">Update Available!</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-white text-green-500 px-4 py-2 rounded font-bold"
      >
        Reload to Update
      </button>
    </div>
  )
}
```

---

## Deployment Checklist

Before deploying your PWA:

- [ ] All icons created and optimized (72x72 to 512x512)
- [ ] Apple touch icon (180x180) created
- [ ] Manifest file configured with correct metadata
- [ ] Service worker implemented (if needed)
- [ ] Offline fallback page created (if needed)
- [ ] Lighthouse PWA audit passes (100/100)
- [ ] Tested on actual iOS device
- [ ] Tested on actual Android device
- [ ] Install instructions added for users
- [ ] Safe area insets implemented
- [ ] Pull-to-refresh disabled
- [ ] Status bar styled correctly
- [ ] Supabase integration tested in installed mode
- [ ] Update notification implemented (optional)

---

## When NOT to Use PWA

PWAs are NOT suitable if you need:
- ❌ App Store presence and discoverability
- ❌ Push notifications on iOS
- ❌ Advanced native features (ARKit, HealthKit, etc.)
- ❌ Background processing
- ❌ Extensive offline storage (>50MB)
- ❌ Bluetooth/NFC functionality
- ❌ Access to contacts or calendars
- ❌ In-App Purchases (Apple Pay works, but not IAP)

**In these cases**, consider Capacitor or React Native instead.

---

## PWA as a Stepping Stone

Many teams use PWA as a first step:

1. **Phase 1**: Launch as PWA (1-3 days)
   - Quick mobile experience
   - Test product-market fit
   - Gather user feedback

2. **Phase 2**: Add Capacitor (1-2 weeks)
   - Same codebase, wrapped in native shell
   - Submit to App Store
   - Add native features as needed

3. **Phase 3** (Optional): React Native (2-6 months)
   - If app becomes complex and needs full native control
   - Rebuild with React Native
   - Maximum performance and features

**Benefit**: PWA allows you to test mobile immediately while planning next steps.

---

## Resources

### Official Documentation
- [Next.js PWA Documentation](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev: PWA](https://web.dev/progressive-web-apps/)

### Packages
- [@ducanh2912/next-pwa](https://www.npmjs.com/package/@ducanh2912/next-pwa)
- [next-pwa-pack](https://www.npmjs.com/package/next-pwa-pack)

### Tools
- [PWA Builder](https://www.pwabuilder.com/)
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Lighthouse PWA Audit](https://developers.google.com/web/tools/lighthouse)

### Testing
- [iOS Safari PWA Testing Guide](https://web.dev/articles/pwa-ios)
- [PWA Install Criteria](https://web.dev/articles/install-criteria)

---

## Conclusion

PWA implementation for Next.js 15 is **straightforward** and can be done in **1-3 days** with minimal coding. It provides immediate mobile benefits but has significant iOS limitations.

**Best Use Cases**:
- Quick mobile MVP
- Supplementing web app with mobile install option
- Testing before investing in native development
- Apps that don't need App Store presence or push notifications

**Next Step**: If you need App Store presence, proceed to review `capacitor-evaluation.md`.

---

**Last Updated**: November 2024
**Next.js Version**: 15.x
**iOS Version**: 17+
