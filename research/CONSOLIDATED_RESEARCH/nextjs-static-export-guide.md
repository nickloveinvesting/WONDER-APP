# Next.js Static Export Guide for Capacitor iOS Deployment

## Overview

Capacitor requires your Next.js app to be exported as static HTML/CSS/JS files (no server). This guide covers everything you need to know about configuring Next.js 15 for static export.

## What is Static Export?

Static export (`output: 'export'`) transforms your Next.js app from a server-rendered application to a fully static website. All pages are pre-rendered at build time into HTML files that can be served by any static hosting or wrapped in a mobile app via Capacitor.

## Quick Start Configuration

### 1. Update `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',

  // Required for Next.js Image component
  images: {
    unoptimized: true,
  },

  // Optional: Customize output directory (default is 'out')
  // distDir: 'dist',

  // Optional: Add trailing slashes to URLs
  // trailingSlash: true,
};

export default nextConfig;
```

### 2. Update Build Scripts (Optional)

Add to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:static": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

Note: With `output: 'export'`, `next build` automatically performs a static export. No separate `next export` command is needed (it's been deprecated).

### 3. Build Your App

```bash
npm run build
```

This creates an `out/` folder with your static files.

## Features That Work with Static Export

### ✅ Supported Features

1. **Server Components** - They run at BUILD TIME and render to static HTML
   - Perfect for content that doesn't change per request
   - Can fetch data during build (from databases, APIs, etc.)
   - Example: Blog posts, product listings, static content

2. **Client Components** - Work perfectly
   - Interactive UI elements
   - State management with useState, useReducer
   - Effects with useEffect
   - All React hooks

3. **App Router** - Full support
   - File-based routing
   - Layouts and templates
   - Route groups
   - Loading and error states

4. **Dynamic Routes** - Supported with `generateStaticParams`
   - Pre-render specific paths at build time
   - See "Dynamic Routes" section below

5. **Metadata API** - Full support
   - SEO metadata
   - Open Graph tags
   - Twitter cards

6. **CSS/Tailwind** - Full support
   - All styling solutions work normally

7. **Environment Variables** - Client-side only
   - Must use `NEXT_PUBLIC_` prefix
   - Embedded at build time

## Features That DON'T Work with Static Export

### ❌ Unsupported Features

1. **Server-Side Rendering (SSR)** - NOT available
   - No per-request rendering
   - No access to request headers/cookies at runtime

2. **API Routes** - NOT available
   - Routes in `app/api/*` won't work
   - Must use external APIs or backend services
   - **Solution**: Use Supabase Edge Functions, external APIs, or client-side calls

3. **Incremental Static Regeneration (ISR)** - NOT available
   - No `revalidate` option
   - Can't update pages after build without rebuilding

4. **Dynamic Server Functions** - Limited/NOT available
   - `headers()` - NOT available
   - `cookies()` - NOT available at runtime (only during build)
   - `searchParams` - Works on client-side only
   - `redirect()` - Only works at build time
   - `notFound()` - Only works at build time

5. **Image Optimization** - Requires configuration
   - Default Next.js image optimization doesn't work
   - Must use `unoptimized: true` or custom loader
   - See "Image Optimization" section

6. **Route Handlers (GET only)** - Limited
   - Only GET method supported
   - Renders static response at build time
   - No dynamic request handling

## Dynamic Routes with Static Export

Dynamic routes (`[id]`, `[slug]`, etc.) require `generateStaticParams` to specify which routes to pre-render.

### Example: Debate Detail Page

**Current Implementation (DOESN'T WORK with static export):**

```typescript
// app/(authenticated)/debates/[id]/page.tsx
export default async function DebateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // This fetches data at REQUEST TIME - won't work with static export
  const { data: debate } = await supabase
    .from('debates')
    .select('*')
    .eq('id', id)
    .single();

  return <div>{/* ... */}</div>;
}
```

**Fixed Implementation (WORKS with static export):**

```typescript
// app/(authenticated)/debates/[id]/page.tsx

// 1. Tell Next.js which paths to pre-render
export async function generateStaticParams() {
  const supabase = createClient();

  // Fetch all debate IDs at BUILD TIME
  const { data: debates } = await supabase
    .from('debates')
    .select('id');

  // Return array of params to pre-render
  return debates?.map((debate) => ({
    id: debate.id,
  })) || [];
}

// 2. Page component - data fetched at BUILD TIME
export default async function DebateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createClient();

  // This now runs at BUILD TIME for each ID from generateStaticParams
  const { data: debate } = await supabase
    .from('debates')
    .select('*')
    .eq('id', id)
    .single();

  return <div>{/* ... */}</div>;
}
```

### Important Notes on Dynamic Routes

1. **Build-Time Only**: All data is fetched during `next build`, not when users visit
2. **No Real-Time Data**: Pages are static snapshots from build time
3. **Large Lists**: Be careful with thousands of pages (slow builds)
4. **Updates Require Rebuild**: New debates won't appear until you rebuild and redeploy

### Alternative: Client-Side Fetching

For truly dynamic content (like real-time debate data), use client-side fetching:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DebateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [debate, setDebate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDebate() {
      const supabase = createClient();
      const { data } = await supabase
        .from('debates')
        .select('*')
        .eq('id', params.id)
        .single();

      setDebate(data);
      setLoading(false);
    }

    loadDebate();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!debate) return <div>Debate not found</div>;

  return <div>{/* ... */}</div>;
}
```

**Pros**: Real-time data, no rebuild needed
**Cons**: Loading states, slower initial render, requires client-side Supabase client

## Image Optimization

The default Next.js `<Image>` component uses an optimization API that requires a server. For static export, you have three options:

### Option 1: Unoptimized Images (Simplest)

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Disables optimization
  },
};
```

**Pros**:
- Simple, no setup
- Works immediately
- Good for apps with few/small images

**Cons**:
- Larger image files
- No responsive images
- Slower loading on mobile networks

### Option 2: Custom Loader (External CDN)

Use an external image optimization service:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
};
```

```typescript
// lib/image-loader.ts
export default function cloudflareLoader({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `https://your-cdn.com/cdn-cgi/image/${paramsString}/${src}`;
}
```

**Examples of CDN services**:
- Cloudflare Images
- Cloudinary
- Imgix
- Supabase Storage with transformations

### Option 3: Build-Time Optimization

Use `next-image-export-optimizer` package:

```bash
npm install next-image-export-optimizer
```

This optimizes images during the build process and includes them in your static export.

### Option 4: Regular `<img>` Tags

For simple use cases, just use regular HTML:

```tsx
<img
  src="/logo.png"
  alt="Logo"
  width={140}
  height={45}
  className="hover:opacity-80 transition-opacity"
/>
```

**Recommendation for Mobile Apps**: Use Option 1 (unoptimized) initially, then optimize images manually or use Supabase Storage if needed.

## Environment Variables

Only client-side environment variables work in static exports.

### ✅ Correct Usage

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_APP_NAME=PhiloDuel
```

These are embedded in your static files at build time.

### ❌ Won't Work

```bash
# .env.local
SUPABASE_SERVICE_ROLE_KEY=secret  # NOT accessible in static export
DATABASE_PASSWORD=secret           # NOT accessible in static export
```

Server-only variables (without `NEXT_PUBLIC_`) only work in API routes and Server Components during the build, but they're not available in the final static app.

### Security Considerations for Mobile

1. **Anon keys are OK**: Supabase `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe to expose
2. **Row Level Security**: Rely on Supabase RLS to protect data
3. **No secrets in client**: Never put service role keys or API secrets in `NEXT_PUBLIC_` vars
4. **API keys**: Use Supabase Edge Functions for server-side operations requiring secrets

## Server Components in Static Export

Server Components work differently in static export mode:

### Build Time Execution

```typescript
// This runs during `next build`, not when users visit
export default async function HomePage() {
  const supabase = createClient();

  // This query runs ONCE during build
  const { data: debates } = await supabase
    .from('debates')
    .select('*')
    .limit(10);

  return (
    <div>
      <h1>Recent Debates</h1>
      {debates?.map(debate => (
        <DebateCard key={debate.id} debate={debate} />
      ))}
    </div>
  );
}
```

**Important**: This data is from build time, not real-time. If you add new debates, they won't appear until you rebuild.

### Hybrid Approach: Server Component + Client Hydration

Best of both worlds - initial render from build, then client-side updates:

```typescript
// Server Component - runs at build time
export default async function HomePage() {
  const supabase = createClient();
  const { data: initialDebates } = await supabase
    .from('debates')
    .select('*')
    .limit(10);

  // Pass initial data to Client Component
  return <DebateList initialData={initialDebates} />;
}
```

```typescript
// Client Component - hydrates with real-time data
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DebateList({ initialData }) {
  const [debates, setDebates] = useState(initialData);

  useEffect(() => {
    // Fetch fresh data on mount
    async function fetchDebates() {
      const supabase = createClient();
      const { data } = await supabase
        .from('debates')
        .select('*')
        .limit(10);

      setDebates(data);
    }

    fetchDebates();

    // Optional: Set up realtime subscription
    const supabase = createClient();
    const channel = supabase
      .channel('debates')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'debates' },
        () => fetchDebates()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Recent Debates</h1>
      {debates?.map(debate => (
        <DebateCard key={debate.id} debate={debate} />
      ))}
    </div>
  );
}
```

**Benefits**:
- Fast initial render (from build-time data)
- Real-time updates (from client-side fetching)
- Good SEO (static HTML)
- Great UX (feels instant)

## Authentication in Static Export

Authentication works differently without a server:

### ✅ What Works

1. **Client-side auth** - Supabase Auth works perfectly
2. **Protected routes** - Use client-side redirects
3. **Session management** - Client-side only

### How to Handle Protected Routes

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ProtectedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
      } else {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return <div>Protected content</div>;
}
```

## Testing Your Static Export

### 1. Build the Static Site

```bash
npm run build
```

### 2. Serve Locally

```bash
# Install a simple HTTP server
npm install -g serve

# Serve the out directory
serve out
```

### 3. Test in Browser

Visit `http://localhost:3000` and verify:
- All pages load
- Navigation works
- Images display
- Client-side features work
- No console errors

### 4. Check for Server Dependencies

Look for errors like:
- "Headers not available"
- "Cookies not available"
- "Dynamic server usage"

These indicate code that won't work in static export.

## Common Build Errors

### Error: "Page with dynamic = 'force-dynamic' cannot be used with output: export"

**Cause**: A page is trying to use dynamic server features.

**Solution**: Remove dynamic server features or switch to client-side:

```typescript
// ❌ Remove this
export const dynamic = 'force-dynamic';

// ✅ Or make it a client component
'use client';
```

### Error: "Route "/api/..." with dynamic = 'force-static' cannot be used with output: export"

**Cause**: API routes don't work with static export.

**Solution**: Remove API routes and use Supabase Edge Functions instead.

### Error: "Image Optimization using the default loader is not compatible with export"

**Cause**: Using Next.js Image without configuration.

**Solution**: Add to next.config.ts:

```typescript
images: {
  unoptimized: true,
}
```

## Deployment to Capacitor

Once you have a successful static build, you can deploy to Capacitor:

```bash
# 1. Build Next.js
npm run build

# 2. Sync to Capacitor (copies 'out' folder to mobile project)
npx cap sync

# 3. Open in Xcode (iOS)
npx cap open ios
```

The `out/` folder becomes your mobile app's web assets.

## Performance Optimization

### 1. Code Splitting

Next.js automatically code-splits by route. For additional splitting:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});
```

### 2. Lazy Loading

```typescript
'use client';

import { lazy, Suspense } from 'react';

const DebateDetails = lazy(() => import('./DebateDetails'));

export default function DebatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DebateDetails />
    </Suspense>
  );
}
```

### 3. Bundle Analysis

```bash
npm install @next/bundle-analyzer

# Update next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

### 4. Remove Unused Dependencies

Check your bundle for libraries you don't need:
- Remove unused npm packages
- Use tree-shaking compatible libraries
- Avoid large UI libraries if you only use a few components

## Best Practices

1. **Keep it Client-Heavy**: For mobile apps, embrace client-side rendering
2. **Use Supabase for Backend**: Supabase handles auth, database, and realtime
3. **Optimize for Mobile Networks**: Keep bundle size small
4. **Test Early**: Build static export from day one to catch issues
5. **Cache Aggressively**: Use service workers for offline support
6. **Monitor Bundle Size**: Mobile users are sensitive to app size

## Summary

Static export transforms Next.js into a static site generator, perfect for Capacitor mobile apps. The key changes:

- **Configuration**: Add `output: 'export'` and `images: { unoptimized: true }`
- **No API Routes**: Use Supabase Edge Functions instead
- **Client-Side Heavy**: Move dynamic features to client components
- **Build-Time Data**: Server Components run once during build
- **Dynamic Routes**: Use `generateStaticParams` or client-side fetching

For your Philosophy app with Supabase, this is a perfect fit - all your backend logic is already in Supabase!
