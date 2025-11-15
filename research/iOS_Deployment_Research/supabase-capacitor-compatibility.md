# Supabase + Capacitor Compatibility Guide

## Table of Contents
1. [Overview](#overview)
2. [Supabase JS SDK Compatibility](#supabase-js-sdk-compatibility)
3. [Authentication Setup](#authentication-setup)
4. [OAuth and Social Login](#oauth-and-social-login)
5. [Deep Linking Configuration](#deep-linking-configuration)
6. [Storage and File Uploads](#storage-and-file-uploads)
7. [Real-time Subscriptions](#real-time-subscriptions)
8. [Database Queries](#database-queries)
9. [Session Management](#session-management)
10. [Common Issues and Solutions](#common-issues-and-solutions)
11. [Complete Implementation Example](#complete-implementation-example)

---

## Overview

**Good News:** Supabase works excellently with Capacitor! The Supabase JS SDK is fully compatible with Capacitor's WebView environment.

### What Works Out of the Box

- ✅ **Supabase JS SDK** - Works perfectly in Capacitor
- ✅ **Email/Password Auth** - Full support
- ✅ **Magic Links** - Works with deep linking setup
- ✅ **Database Queries** - All CRUD operations work
- ✅ **Real-time Subscriptions** - WebSockets fully supported
- ✅ **Storage** - File uploads and downloads work
- ✅ **Session Persistence** - LocalStorage supported
- ✅ **Row Level Security** - Enforced as expected

### What Needs Configuration

- ⚙️ **OAuth (Google, Apple, etc.)** - Requires deep linking setup
- ⚙️ **Magic Links** - Requires deep linking setup
- ⚙️ **Push Notifications** - Requires additional setup
- ⚙️ **Camera Integration** - Capacitor Camera plugin needed

### What Doesn't Work

- ❌ **SSR Auth** - Capacitor doesn't support server-side rendering
- ❌ **Cookies (server-side)** - Use localStorage instead

---

## Supabase JS SDK Compatibility

### Installation

```bash
npm install @supabase/supabase-js
```

### Basic Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // IMPORTANT: Configure for mobile
    storage: window.localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,  // Critical for mobile!
  },
});
```

**Key Configuration:**

- `storage: window.localStorage` - Use localStorage (not cookies)
- `autoRefreshToken: true` - Automatically refresh expired tokens
- `persistSession: true` - Persist session across app restarts
- `detectSessionInUrl: false` - **Critical for mobile!** Prevents issues with OAuth redirects

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Checking SDK Compatibility

The Supabase JS SDK is **isomorphic** - it works in:
- ✅ Browsers
- ✅ Node.js environments
- ✅ React Native
- ✅ **Capacitor WebViews**

**Requirements:**
- Native `fetch` API (✅ Capacitor WebView provides this)
- Native WebSocket API for real-time (✅ Capacitor WebView provides this)

---

## Authentication Setup

### Email/Password Authentication

**Works perfectly** without additional configuration.

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

// Sign out
const { error } = await supabase.auth.signOut();
```

### Email Confirmation

**Configure in Supabase Dashboard:**

1. Go to Authentication → Settings
2. Enable "Confirm email" if desired
3. Configure email templates with deep link

**For mobile apps, use deep links in email templates:**

```
Click here to confirm: yourapp://auth/confirm?token={{.Token}}
```

### Magic Link Authentication

**Requires deep linking setup** (see Deep Linking section below).

```typescript
// Send magic link
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'yourapp://auth/callback',  // Deep link
  },
});
```

### Session Persistence

Sessions automatically persist across app restarts:

```typescript
// Check current session on app load
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      // User is logged in
      setUser(session.user);
    }
  });
}, []);
```

### Auth State Listener

Monitor authentication state changes:

```typescript
// app/layout.tsx or pages/_app.tsx
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function App() {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event);

        if (event === 'SIGNED_IN') {
          // User signed in
          console.log('User:', session?.user);
        }

        if (event === 'SIGNED_OUT') {
          // User signed out
          console.log('User signed out');
        }

        if (event === 'TOKEN_REFRESHED') {
          // Token was refreshed
          console.log('Token refreshed');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <>{/* Your app */}</>;
}
```

---

## OAuth and Social Login

OAuth providers (Google, Apple, GitHub, etc.) require additional setup in Capacitor due to redirect handling.

### The Challenge

**Web OAuth Flow:**
1. User clicks "Sign in with Google"
2. Browser redirects to Google
3. User authenticates
4. Google redirects back to your website

**Mobile OAuth Issue:**
- When Google redirects back, it tries to open a URL
- This needs to open your app (not a browser)
- **Solution: Deep linking**

### Recommended Approach: PKCE with Deep Linking

**PKCE (Proof Key for Code Exchange)** is more secure and works better with mobile apps.

```typescript
// lib/supabase.ts
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: window.localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',  // Use PKCE flow for OAuth
  },
});
```

### Google OAuth Setup

**Step 1: Configure Google OAuth Credentials**

1. Go to Google Cloud Console
2. Create OAuth credentials
3. **Important:** Add your app's custom URL scheme:
   - iOS: `com.yourcompany.philosophy:/`
   - Android: `com.yourcompany.philosophy:/`

**Step 2: Configure Supabase**

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google Client ID and Secret
4. Add redirect URL: `yourapp://auth/callback`

**Step 3: Implement Sign In**

```typescript
import { supabase } from '@/lib/supabase';
import { Browser } from '@capacitor/browser';

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'yourapp://auth/callback',
      skipBrowserRedirect: true,  // We'll handle browser manually
    },
  });

  if (data?.url) {
    // Open OAuth URL in in-app browser
    await Browser.open({
      url: data.url,
      windowName: '_self',
    });
  }
}
```

**Step 4: Handle Redirect (see Deep Linking section)**

### Apple Sign In

**Recommended for iOS apps** - Apple requires it if you offer other social logins.

**Step 1: Enable in Xcode**

1. Open `ios/App/App.xcodeproj` in Xcode
2. Select your target → Signing & Capabilities
3. Click "+ Capability"
4. Add "Sign in with Apple"

**Step 2: Configure Supabase**

1. Supabase Dashboard → Authentication → Providers
2. Enable Apple provider
3. Configure redirect URL: `yourapp://auth/callback`

**Step 3: Implement Sign In**

```typescript
async function signInWithApple() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: 'yourapp://auth/callback',
      skipBrowserRedirect: true,
    },
  });

  if (data?.url) {
    await Browser.open({
      url: data.url,
      windowName: '_self',
    });
  }
}
```

### Alternative: Native OAuth Plugin

For better UX, use native OAuth instead of browser-based:

```bash
npm install @codetrix-studio/capacitor-google-auth
```

**Then exchange native token for Supabase session:**

```typescript
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

async function signInWithGoogleNative() {
  // Get Google ID token using native plugin
  const googleUser = await GoogleAuth.signIn();

  // Exchange for Supabase session
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: googleUser.authentication.idToken,
  });

  if (data) {
    console.log('Signed in:', data.user);
  }
}
```

**Benefits:**
- Better UX (native Google login screen)
- No browser redirect needed
- Faster authentication flow

---

## Deep Linking Configuration

Deep linking allows URLs like `yourapp://auth/callback` to open your app.

### iOS Deep Linking Setup

**Step 1: Configure URL Scheme**

Edit `ios/App/App/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.yourcompany.philosophy</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>yourapp</string>
    </array>
  </dict>
</array>
```

**Now URLs like `yourapp://anything` will open your app.**

**Step 2: (Optional) Universal Links**

For production, use Universal Links (https://yourdomain.com/auth/callback opens app):

1. Add Associated Domains capability in Xcode
2. Add domain: `applinks:yourdomain.com`
3. Host `apple-app-site-association` file on your domain

### Android Deep Linking Setup

**Step 1: Configure Intent Filter**

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<activity
    android:name=".MainActivity"
    android:launchMode="singleTask">

    <!-- Existing intent filters... -->

    <!-- Deep Link Intent Filter -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <!-- Custom URL Scheme -->
        <data android:scheme="yourapp" android:host="auth" />
    </intent-filter>

    <!-- Optional: App Links (HTTPS) -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="yourdomain.com" />
    </intent-filter>

</activity>
```

### Handle Deep Links in Your App

**Install App Plugin:**

```bash
npm install @capacitor/app
```

**Create URL Listener:**

```typescript
// lib/deep-linking.ts
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { supabase } from './supabase';

export function initDeepLinking() {
  App.addListener('appUrlOpen', async (event: URLOpenListenerEvent) => {
    const url = event.url;
    console.log('App opened with URL:', url);

    // Handle auth callback
    if (url.includes('auth/callback')) {
      // Extract params from URL
      const urlParams = new URL(url);
      const params = Object.fromEntries(urlParams.searchParams);

      // Supabase will automatically handle the OAuth response
      // if it's in the URL when calling getSession()
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        console.log('OAuth successful!', data.session.user);
        // Navigate to home screen
        // router.push('/home');
      }
    }

    // Handle magic link
    if (url.includes('auth/confirm')) {
      // Extract token from URL
      const urlParams = new URL(url);
      const token = urlParams.searchParams.get('token');

      if (token) {
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'email',
        });

        if (data) {
          console.log('Email confirmed!', data.user);
        }
      }
    }
  });
}
```

**Initialize in your app:**

```typescript
// app/layout.tsx or pages/_app.tsx
import { useEffect } from 'react';
import { initDeepLinking } from '@/lib/deep-linking';

export default function App() {
  useEffect(() => {
    initDeepLinking();
  }, []);

  return <>{/* Your app */}</>;
}
```

### Testing Deep Links

**iOS Simulator:**

```bash
xcrun simctl openurl booted yourapp://auth/callback
```

**Android Emulator:**

```bash
adb shell am start -W -a android.intent.action.VIEW -d "yourapp://auth/callback"
```

**Real Devices:**

Create a test HTML page:

```html
<!DOCTYPE html>
<html>
<body>
  <a href="yourapp://auth/callback">Test Deep Link</a>
</body>
</html>
```

Open in mobile browser, click link - should open your app.

---

## Storage and File Uploads

Supabase Storage works excellently with Capacitor, especially combined with the Camera plugin.

### Basic File Upload

```typescript
import { supabase } from '@/lib/supabase';

async function uploadFile(file: File) {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`public/${file.name}`, file);

  if (error) {
    console.error('Upload error:', error);
    return;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(data.path);

  console.log('File URL:', publicUrl);
  return publicUrl;
}
```

### Upload from Camera

**Install Capacitor Camera:**

```bash
npm install @capacitor/camera
npx cap sync
```

**Add iOS Permission:**

```xml
<!-- ios/App/App/Info.plist -->
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to take photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library</string>
```

**Add Android Permission:**

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

**Implementation:**

```typescript
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { supabase } from '@/lib/supabase';

async function takePhotoAndUpload() {
  // Take photo
  const photo = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
  });

  // Convert to blob
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();

  // Create File object
  const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

  // Upload to Supabase
  const { data, error } = await supabase.storage
    .from('photos')
    .upload(`${Date.now()}.jpg`, file);

  if (error) {
    console.error('Upload failed:', error);
    return;
  }

  // Get URL
  const { data: { publicUrl } } = supabase.storage
    .from('photos')
    .getPublicUrl(data.path);

  return publicUrl;
}
```

### Upload from Photo Library

```typescript
async function pickPhotoAndUpload() {
  // Pick from library
  const photo = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
    source: CameraSource.Photos,  // Photo library
  });

  // Same upload process as above
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();
  const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

  const { data, error } = await supabase.storage
    .from('photos')
    .upload(`${Date.now()}.jpg`, file);

  // ... rest of upload
}
```

### Download Files

```typescript
async function downloadFile(path: string) {
  const { data, error } = await supabase.storage
    .from('photos')
    .download(path);

  if (error) {
    console.error('Download error:', error);
    return;
  }

  // Convert blob to URL
  const url = URL.createObjectURL(data);

  // Display image
  return url;
}
```

### Signed URLs (Private Files)

```typescript
async function getPrivateFileUrl(path: string) {
  const { data, error } = await supabase.storage
    .from('private-bucket')
    .createSignedUrl(path, 60); // Valid for 60 seconds

  if (error) {
    console.error('Error:', error);
    return;
  }

  return data.signedUrl;
}
```

---

## Real-time Subscriptions

Real-time subscriptions work perfectly - Capacitor WebViews support WebSockets.

### Basic Subscription

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe to new messages
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          console.log('New message:', payload.new);
          setMessages((current) => [...current, payload.new]);
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </div>
  );
}
```

### Subscribe to All Changes

```typescript
useEffect(() => {
  const channel = supabase
    .channel('all-changes')
    .on(
      'postgres_changes',
      {
        event: '*',  // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'messages',
      },
      (payload) => {
        console.log('Change:', payload.eventType, payload.new);

        if (payload.eventType === 'INSERT') {
          setMessages((current) => [...current, payload.new]);
        }

        if (payload.eventType === 'UPDATE') {
          setMessages((current) =>
            current.map((msg) =>
              msg.id === payload.new.id ? payload.new : msg
            )
          );
        }

        if (payload.eventType === 'DELETE') {
          setMessages((current) =>
            current.filter((msg) => msg.id !== payload.old.id)
          );
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

### Presence (Real-time User Status)

```typescript
useEffect(() => {
  const channel = supabase.channel('room1');

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      console.log('Online users:', Object.keys(state).length);
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      console.log('User joined:', key);
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      console.log('User left:', key);
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        // Track this user's presence
        await channel.track({
          user: 'user-id',
          online_at: new Date().toISOString(),
        });
      }
    });

  return () => {
    channel.untrack();
    supabase.removeChannel(channel);
  };
}, []);
```

### Broadcast (Realtime Messages)

```typescript
// Send broadcast message
async function sendMessage(message: string) {
  const channel = supabase.channel('chat-room');

  await channel.send({
    type: 'broadcast',
    event: 'message',
    payload: { text: message },
  });
}

// Receive broadcast messages
useEffect(() => {
  const channel = supabase.channel('chat-room');

  channel
    .on('broadcast', { event: 'message' }, (payload) => {
      console.log('Received:', payload.payload.text);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

### Connection Status

Monitor real-time connection status:

```typescript
useEffect(() => {
  const channel = supabase.channel('status-check');

  channel
    .on('system', {}, (payload) => {
      if (payload.status === 'SUBSCRIBED') {
        console.log('Connected to real-time');
      }
    })
    .subscribe((status) => {
      console.log('Channel status:', status);
      // Status: 'SUBSCRIBED', 'CLOSED', 'CHANNEL_ERROR'
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

## Database Queries

All Supabase database operations work identically in Capacitor.

### Basic CRUD

```typescript
// Create
const { data, error } = await supabase
  .from('posts')
  .insert({
    title: 'My Post',
    content: 'Post content',
  })
  .select();

// Read
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('published', true);

// Update
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', postId)
  .select();

// Delete
const { data, error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId);
```

### Complex Queries

```typescript
// Join tables
const { data, error } = await supabase
  .from('posts')
  .select(`
    *,
    author:profiles(name, avatar),
    comments(*)
  `)
  .eq('published', true)
  .order('created_at', { ascending: false })
  .limit(10);

// Pagination
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .range(0, 9);  // First 10 items

// Full-text search
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .textSearch('content', 'searchTerm');
```

### RPC (Stored Procedures)

```typescript
const { data, error } = await supabase.rpc('get_trending_posts', {
  days: 7,
  limit_count: 10,
});
```

### Row Level Security

RLS works exactly the same - authenticated users can only access their allowed data:

```sql
-- In Supabase SQL Editor
CREATE POLICY "Users can view their own posts"
  ON posts
  FOR SELECT
  USING (auth.uid() = user_id);
```

---

## Session Management

### Persisting Sessions

Sessions automatically persist in localStorage:

```typescript
// lib/supabase.ts
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: window.localStorage,  // Persists across app restarts
    autoRefreshToken: true,         // Auto-refresh before expiry
    persistSession: true,            // Keep session alive
  },
});
```

### Check Session on App Launch

```typescript
// app/layout.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <MainApp user={user} />;
}
```

### Manual Token Refresh

Tokens refresh automatically, but you can manually refresh:

```typescript
const { data, error } = await supabase.auth.refreshSession();

if (data.session) {
  console.log('New session:', data.session);
}
```

### Handle Token Expiry

```typescript
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed successfully');
  }

  if (event === 'SIGNED_OUT') {
    // Token couldn't be refreshed, or user signed out
    // Redirect to login
  }
});
```

---

## Common Issues and Solutions

### Issue 1: OAuth Callback Not Working

**Symptoms:** After Google/Apple login, user is redirected but not logged in

**Causes:**
- Deep linking not configured
- Missing `detectSessionInUrl: false`
- Not handling `appUrlOpen` event

**Solution:**

```typescript
// 1. Configure Supabase client
const supabase = createClient(url, key, {
  auth: {
    detectSessionInUrl: false,  // Critical!
  },
});

// 2. Setup deep linking handler
App.addListener('appUrlOpen', async (event) => {
  // When OAuth redirects to yourapp://auth/callback
  // Supabase needs to exchange the code for a session

  const url = new URL(event.url);
  const code = url.searchParams.get('code');

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (data.session) {
      console.log('Logged in!', data.session.user);
    }
  }
});
```

### Issue 2: Session Not Persisting

**Symptoms:** User has to log in every time they open the app

**Causes:**
- `persistSession: false` in config
- Not using localStorage
- Clearing storage on app restart

**Solution:**

```typescript
// Ensure these settings
const supabase = createClient(url, key, {
  auth: {
    storage: window.localStorage,  // Use localStorage
    persistSession: true,           // Enable persistence
    autoRefreshToken: true,         // Auto-refresh
  },
});

// Don't clear storage unless explicitly signing out
// DON'T do this on app start:
// localStorage.clear(); ❌
```

### Issue 3: Real-time Not Working

**Symptoms:** Subscriptions don't receive updates

**Causes:**
- WebSocket blocked by network
- Supabase project real-time disabled
- Not subscribed correctly

**Solution:**

```typescript
// 1. Enable real-time in Supabase Dashboard
// Settings → API → Enable Realtime

// 2. Ensure proper subscription
const channel = supabase
  .channel('my-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe((status) => {
    console.log('Status:', status);  // Should be 'SUBSCRIBED'
  });

// 3. Check WebSocket connection
// Real-time requires WebSocket - ensure not blocked by firewall
```

### Issue 4: File Upload Fails

**Symptoms:** Images from camera don't upload

**Causes:**
- Incorrect file type
- Missing bucket configuration
- Not converting photo to blob correctly

**Solution:**

```typescript
// Proper photo upload flow
const photo = await Camera.getPhoto({
  quality: 90,
  resultType: CameraResultType.Uri,  // Important!
});

// Convert webPath to blob
const response = await fetch(photo.webPath!);
const blob = await response.blob();

// Create proper File object
const fileName = `${Date.now()}.jpg`;
const file = new File([blob], fileName, {
  type: 'image/jpeg',  // Important!
});

// Upload with correct path
const { data, error } = await supabase.storage
  .from('photos')  // Ensure bucket exists and is public
  .upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });
```

### Issue 5: CORS Errors

**Symptoms:** API calls fail with CORS errors

**Causes:**
- Additional restrictions on Supabase project
- Using wrong URL

**Solution:**

```typescript
// 1. Use correct Supabase URL from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// 2. If CORS persists, use Capacitor HTTP plugin
import { CapacitorHttp } from '@capacitor/http';

const response = await CapacitorHttp.request({
  url: `${supabaseUrl}/rest/v1/posts`,
  headers: {
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${session?.access_token}`,
  },
});
```

### Issue 6: Magic Links Not Working

**Symptoms:** Clicking magic link in email doesn't log user in

**Causes:**
- Deep link not configured
- Wrong redirect URL
- Not handling URL properly

**Solution:**

```typescript
// 1. Send magic link with correct redirect
const { error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'yourapp://auth/callback',
  },
});

// 2. Handle the redirect
App.addListener('appUrlOpen', async (event) => {
  const url = new URL(event.url);

  // For magic links, Supabase includes token in URL
  if (url.pathname.includes('auth/callback')) {
    // getSession() will automatically verify the token
    const { data: { session }, error } = await supabase.auth.getSession();

    if (session) {
      console.log('Magic link worked!', session.user);
    }
  }
});
```

---

## Complete Implementation Example

Here's a complete, production-ready setup:

### 1. Supabase Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: window.localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,  // Critical for mobile
    flowType: 'pkce',  // More secure for OAuth
  },
});
```

### 2. Auth Context Provider

```typescript
// context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 3. Deep Linking Handler

```typescript
// lib/deep-linking.ts
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { supabase } from './supabase';

export function initDeepLinking() {
  App.addListener('appUrlOpen', async (event: URLOpenListenerEvent) => {
    const url = new URL(event.url);

    console.log('Deep link opened:', url.href);

    // Handle auth callbacks (OAuth, magic links, etc.)
    if (url.pathname.includes('auth')) {
      // Check for OAuth code
      const code = url.searchParams.get('code');

      if (code) {
        // Exchange code for session
        const { data, error } = await supabase.auth.exchangeCodeForSession(
          code
        );

        if (data.session) {
          console.log('OAuth successful!', data.session.user);
          // Navigate to authenticated route
          window.location.href = '/home';
        }

        if (error) {
          console.error('OAuth error:', error);
        }
      } else {
        // For magic links, just call getSession
        const { data: { session }, error } = await supabase.auth.getSession();

        if (session) {
          console.log('Magic link successful!', session.user);
          window.location.href = '/home';
        }
      }
    }
  });
}
```

### 4. App Layout with Auth

```typescript
// app/layout.tsx
'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { initDeepLinking } from '@/lib/deep-linking';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize deep linking for OAuth/magic links
    initDeepLinking();
  }, []);

  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### 5. Login Component

```typescript
// components/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      // User is now logged in
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Sign In</button>
    </form>
  );
}
```

### 6. Protected Route

```typescript
// components/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
```

---

## Best Practices Summary

### ✅ Do

1. **Use localStorage** for session storage
2. **Set `detectSessionInUrl: false`** for mobile
3. **Implement deep linking** for OAuth and magic links
4. **Handle `appUrlOpen` events** for auth callbacks
5. **Use PKCE flow** for OAuth (`flowType: 'pkce'`)
6. **Persist sessions** across app restarts
7. **Listen to auth state changes** for UI updates
8. **Test on real devices** - simulators may behave differently

### ❌ Don't

1. **Don't use SSR** auth patterns (no server in Capacitor)
2. **Don't rely on cookies** for session storage
3. **Don't forget to sync** after adding Capacitor plugins
4. **Don't commit** Supabase keys to git (use .env files)
5. **Don't forget permissions** in Info.plist / AndroidManifest.xml

---

## Resources

- **Supabase Docs**: https://supabase.com/docs
- **Capacitor Docs**: https://capacitorjs.com/docs
- **Deep Linking Guide**: https://supabase.com/docs/guides/auth/native-mobile-deep-linking
- **Community Examples**: Search GitHub for "capacitor supabase" examples

---

**Document Version**: 1.0
**Last Updated**: November 2024
**Supabase JS**: v2.x
**Capacitor**: v6.x, v7.x
