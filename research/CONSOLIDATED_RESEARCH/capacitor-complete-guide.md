# Capacitor Complete Guide

## Table of Contents
1. [What is Capacitor?](#what-is-capacitor)
2. [Capacitor vs Cordova](#capacitor-vs-cordova)
3. [The Company Behind Capacitor](#the-company-behind-capacitor)
4. [How Capacitor Works](#how-capacitor-works)
5. [Native Features Available](#native-features-available)
6. [Development Workflow](#development-workflow)
7. [Build Process for App Store](#build-process-for-app-store)
8. [Performance Comparison](#performance-comparison)
9. [Limitations and Common Issues](#limitations-and-common-issues)
10. [Plugin Ecosystem](#plugin-ecosystem)

---

## What is Capacitor?

**Capacitor** is a free and open-source (MIT-licensed) native runtime for building cross-platform mobile applications using standard web technologies (HTML, CSS, JavaScript). It enables web developers to create iOS, Android, and Progressive Web Apps from a single codebase.

### Key Characteristics

- **Web-First Approach**: Runs your existing web application inside a native WebView container
- **Native API Access**: Provides JavaScript APIs to access native device features
- **Cross-Platform**: Single codebase runs on iOS, Android, Web, and Electron (desktop)
- **No Code Rewrite Required**: Wraps your existing web app without requiring a rewrite
- **Modern Architecture**: Built from the ground up with modern web standards in mind

### How It Works

```
┌─────────────────────────────────┐
│     Your Web Application        │
│   (Next.js, React, Vue, etc.)   │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│      Capacitor Runtime          │
│  (Native Bridge + WebView)      │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│    Native iOS/Android APIs      │
│   (Camera, GPS, Push, etc.)     │
└─────────────────────────────────┘
```

1. **Build your web app** - Create a static export of your web application
2. **Capacitor wraps it** - Your HTML/CSS/JS is packaged into a native app container
3. **Access native features** - Use Capacitor plugins to access device capabilities
4. **Deploy anywhere** - Ship to App Store, Google Play, or as a PWA

---

## Capacitor vs Cordova

Capacitor is the spiritual successor to Apache Cordova, built by the same team (Ionic) with lessons learned from years of Cordova development.

### Why Capacitor is Better

| Feature | Capacitor | Cordova |
|---------|-----------|---------|
| **Active Development** | Actively maintained by Ionic team | Adobe ended support in 2020 |
| **Native API Access** | Direct access to native APIs | Plugin-only access |
| **Performance** | Faster, more reliable native bridge | Older, slower bridge |
| **PWA Support** | Built-in PWA support | Limited PWA capabilities |
| **Project Structure** | Modern, clean folder structure | Complex, dated structure |
| **Web-First** | Optimized for modern web frameworks | Older web standards |
| **CLI** | Local CLI per project (no conflicts) | Global CLI (version conflicts) |
| **Native Code** | Easy to write custom native code | More complex plugin development |
| **Backward Compatibility** | Most Cordova plugins work | N/A |

### Key Architectural Differences

**Capacitor's Modern Approach:**
- Native projects (iOS/Android) are **source assets** you can open and modify
- Each project has its own local CLI version (no global conflicts)
- Web code lives in a clean folder, native code stored separately
- Progressive Web App development is a first-class citizen

**Cordova's Legacy Approach:**
- Native projects are **generated** and not meant to be edited
- Global CLI installation can cause version conflicts
- More complex folder structure mixing web and native code
- PWAs added as an afterthought

### Migration from Cordova

Most Cordova plugins are compatible with Capacitor, making migration easier for existing projects. The Ionic team provides migration guides and tools.

---

## The Company Behind Capacitor

### Ionic - The Creators

**Founded**: 2013 by Max Lynch, Ben Sperry, and Adam Bradley
**Original Product**: Ionic Framework (hybrid mobile SDK built on AngularJS and Cordova)
**Capacitor Development**: Started in late 2017
**First Release**: Capacitor 1.0 released in 2019
**Current Version**: Capacitor 7.x (as of 2024)

### Ionic's Product Ecosystem

1. **Capacitor** - Native runtime (free, open source)
2. **Ionic Framework** - UI component library (free, open source)
3. **Stencil** - Web component compiler (free, open source)
4. **Ionic AppFlow** - CI/CD and DevOps platform (commercial, being phased out)
5. **Enterprise Plugins** - Premium native plugins (commercial)

### 2024 Update: Acquisition by OutSystems

In a significant development, **Ionic was acquired by OutSystems**, a low-code platform company.

**Important Changes:**
- **Commercial Products Discontinued**: Ionic AppFlow and other paid services are being phased out for new customers
- **Open Source Continues**: Ionic Framework and Capacitor remain free, open source, and actively maintained
- **OutSystems Integration**: Capacitor now forms a significant part of OutSystems' mobile stack
- **Community Support**: The open-source community and ecosystem remain strong

### Community and Ecosystem

**Community Strength:**
- Large, active developer community
- Weekly Discord Q&A sessions with engineers
- YouTube live streams showing Capacitor development
- Extensive plugin ecosystem maintained by community
- Active forums and Stack Overflow presence

**Resources:**
- Official documentation: https://capacitorjs.com
- GitHub: https://github.com/ionic-team/capacitor
- Community plugins: https://capacitorjs.com/directory
- Forum: https://forum.ionicframework.com

---

## How Capacitor Works

### Technical Architecture

Capacitor uses a **WebView** to render your web application, with a **native bridge** providing communication between JavaScript and native code.

#### WebView Details

**iOS**: Uses WKWebView (Apple's modern WebView)
**Android**: Uses Android System WebView (Chrome 60+ required)

Your web app's distribution files are:
- Packaged within the native app bundle (APK/IPA)
- Loaded directly from the app, not from a remote server
- Run in a full-screen browser environment

#### Native Bridge

The bridge enables:
- JavaScript calls to native device APIs
- Native code callbacks to JavaScript
- Two-way communication between web and native layers

```javascript
// Example: Accessing Camera via Capacitor Plugin
import { Camera, CameraResultType } from '@capacitor/camera';

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  const imageUrl = image.webPath;
  // Use the image in your web app
};
```

### Static Export Requirement

Capacitor requires your web app to be exported as **static files** (HTML, CSS, JavaScript):

- ✅ Static HTML/CSS/JS works perfectly
- ✅ Client-side routing works (React Router, Next.js client routing)
- ✅ API calls to external servers work (fetch, axios)
- ❌ Server-Side Rendering (SSR) does NOT work
- ❌ Server Actions do NOT work
- ❌ Backend servers cannot be bundled

**Why?** You can't bundle a Node.js server into an iOS/Android app. The app runs entirely on the device.

### Folder Structure

```
your-project/
├── src/                    # Your web app source code
├── out/                    # Static export output (Next.js)
│   ├── index.html
│   ├── _next/
│   └── assets/
├── ios/                    # Native iOS project (Xcode)
│   ├── App/
│   │   └── App/
│   │       └── public/     # Your web files synced here
│   └── App.xcodeproj
├── android/                # Native Android project
│   ├── app/
│   │   └── src/
│   │       └── main/
│   │           └── assets/  # Your web files synced here
│   └── build.gradle
├── capacitor.config.ts     # Capacitor configuration
└── package.json
```

---

## Native Features Available

Capacitor provides access to a wide range of native device features through its plugin system.

### Official Capacitor Plugins

These are maintained by the Capacitor core team:

#### Core Device Features
- **Camera** - Take photos, access photo library
- **Geolocation** - GPS location, heading, speed
- **Filesystem** - Read/write files, manage directories
- **Device** - Device info, battery status, platform details
- **Network** - Network connectivity status
- **Motion** - Accelerometer, gyroscope data

#### User Interaction
- **Haptics** - Vibration and haptic feedback
- **Keyboard** - Keyboard show/hide, height events
- **Dialog** - Native alerts, confirms, prompts
- **Toast** - Native toast notifications
- **Share** - Native share sheet
- **Action Sheet** - Native action sheet dialogs

#### Media & Content
- **Camera** - Photos and videos
- **Clipboard** - Copy/paste functionality
- **Browser** - Open in-app browser or system browser
- **App Launcher** - Open other apps by URL scheme

#### System Integration
- **Status Bar** - Customize status bar appearance
- **Splash Screen** - Control splash screen behavior
- **Screen Reader** - Accessibility screen reader support
- **Text Zoom** - Accessibility text zoom settings
- **Local Notifications** - Schedule local notifications
- **Push Notifications** - Remote push notification setup

#### Storage & Persistence
- **Storage** - Simple key/value persistent storage
- **Preferences** - Native preferences/settings storage

### Biometric Authentication

Available through community plugins:

**Popular Plugins:**
- `capacitor-native-biometric`
- `@capgo/capacitor-native-biometric`
- `@aparajita/capacitor-biometric-auth`

**Features:**
- Face ID (iOS)
- Touch ID (iOS)
- Fingerprint (Android)
- Face unlock (Android)
- Secure credential storage (Keychain/Keystore)

**Configuration:**
```typescript
// iOS: Add to Info.plist
<key>NSFaceIDUsageDescription</key>
<string>We use Face ID to authenticate you securely</string>

// Android: Add to AndroidManifest.xml
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```

### Push Notifications

**Setup Required:**
- Apple Push Notification Service (APNs) configuration
- Firebase Cloud Messaging (FCM) for Android
- Backend server to send notifications

**Capabilities:**
- Remote push notifications
- Silent background notifications
- Rich notifications (images, actions)
- Notification handling when app is open/closed/background

### Community Plugins

The Capacitor community has created hundreds of plugins:

**Plugin Directory**: https://capacitorjs.com/directory

**Popular Community Plugins:**
- Background Geolocation
- SQLite Database
- Barcode Scanner
- Google Maps
- Firebase Integration
- AdMob
- In-App Purchases
- PDF Viewer
- Video Player
- Social Login (Facebook, Google, Apple)

### Creating Custom Plugins

Capacitor makes it easy to write your own native code when needed:

```typescript
// TypeScript plugin interface
export interface MyPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

// Swift implementation (iOS)
@objc func echo(_ call: CAPPluginCall) {
    let value = call.getString("value") ?? ""
    call.resolve(["value": value])
}

// Java implementation (Android)
@PluginMethod
public void echo(PluginCall call) {
    String value = call.getString("value");
    JSObject ret = new JSObject();
    ret.put("value", value);
    call.resolve(ret);
}
```

---

## Development Workflow

### Local Development Setup

#### Prerequisites
- Node.js and npm installed
- For iOS development: macOS with Xcode
- For Android development: Android Studio

#### Initial Setup

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor in your project
npx cap init

# Add iOS and Android platforms
npx cap add ios
npx cap add android
```

### Development Cycle

#### Option 1: Web Development (Fastest)

Develop your app in a web browser first:

```bash
# Run your web dev server
npm run dev

# Develop in browser at http://localhost:3000
# Most features work, except native-only APIs
```

**Advantages:**
- Instant hot reload
- Chrome DevTools available
- Fastest iteration cycle
- No native build required

**Limitations:**
- Native plugins won't work (Camera, Geolocation, etc.)
- Can't test native-specific behavior
- Different from actual device experience

#### Option 2: Live Reload on Device (Recommended)

Run your app on a real device/simulator with live reload:

**Step 1: Configure live reload**

```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.app',
  appName: 'YourApp',
  webDir: 'out',
  server: {
    url: 'http://192.168.1.100:3000', // Your local IP
    cleartext: true
  }
};

export default config;
```

**Step 2: Start your dev server**

```bash
npm run dev
```

**Step 3: Build and run**

```bash
npx cap sync
npx cap open ios    # Opens Xcode
# or
npx cap open android # Opens Android Studio

# Then click "Run" in Xcode/Android Studio
```

**Advantages:**
- Automatic refresh on code changes
- Test on real hardware
- Access to all native APIs
- Use native debugging tools
- Realistic performance testing

**Best Practice:**
- Keep device connected
- Use Safari Web Inspector (iOS) or Chrome DevTools (Android)
- Develop with live reload, debug with native tools

### Debugging Tools

#### iOS Debugging with Safari Web Inspector

**Setup:**
1. On device: Settings → Safari → Advanced → Enable "Web Inspector"
2. On Mac: Safari → Preferences → Advanced → Check "Show Develop menu"
3. Connect device via USB
4. Safari → Develop → [Your Device] → [Your App]

**Capabilities:**
- Inspect HTML/CSS
- Debug JavaScript
- Monitor network requests
- View console logs
- Track local storage
- Profile performance

#### Android Debugging with Chrome DevTools

**Setup:**
1. Enable USB Debugging on device
2. Connect device via USB
3. Chrome → chrome://inspect
4. Click "Inspect" on your app's WebView

**Capabilities:**
- Full Chrome DevTools access
- JavaScript debugging
- Network monitoring
- Console access
- Performance profiling

#### Native Debugging

**Xcode (iOS):**
- Native crashes and errors
- Swift/Objective-C debugging
- View native logs
- Memory profiling
- UI inspector for native elements

**Android Studio (Android):**
- Logcat for native logs
- Java/Kotlin debugging
- Memory profiler
- Layout inspector
- Network inspector

### Testing Workflow

**Recommended Approach:**

1. **Develop in browser** - Fast iteration on UI/UX
2. **Test on iOS simulator** - Verify iOS-specific behavior
3. **Test on Android emulator** - Verify Android-specific behavior
4. **Test on real devices** - Final validation before release

**Pro Tip:** Keep your device connected while developing. This allows you to:
- Quickly test native features
- Verify performance on real hardware
- Debug with Safari/Chrome DevTools
- See how it actually feels to users

---

## Build Process for App Store

### Overview

Capacitor apps are **normal native apps**, so they deploy to app stores just like any other native application.

### iOS Build Process

#### Step 1: Prerequisites

- **Mac Required**: iOS apps must be built on macOS (or use cloud Mac service)
- **Xcode Installed**: Latest stable version from Mac App Store
- **Apple Developer Account**: $99/year enrollment
- **Code Signing Certificate**: Development and Distribution certificates
- **Provisioning Profiles**: App-specific provisioning profiles

#### Step 2: Build Your Web App

```bash
# Build your Next.js app for production
npm run build

# Sync web files to native project
npx cap sync ios
```

This:
1. Runs `next build` to create optimized production build
2. Exports static files to `out/` directory
3. Copies files to `ios/App/App/public/`
4. Updates native dependencies

#### Step 3: Configure Code Signing

```bash
# Open project in Xcode
npx cap open ios
```

In Xcode:
1. Select your project in the navigator
2. Select your target (App)
3. Go to "Signing & Capabilities" tab
4. Choose your Team from dropdown
5. Xcode automatically manages signing (or manual if preferred)

**First-Time Setup:**
- Xcode will prompt you to select a development team
- This configures code signing for all future builds
- Distribution requires a Distribution certificate (not Development)

#### Step 4: Build IPA File

**Option A: Archive in Xcode (Manual)**

1. In Xcode, select "Product" → "Archive"
2. Wait for archive to complete
3. In Organizer window, select archive
4. Click "Distribute App"
5. Choose distribution method (App Store Connect)
6. Follow prompts to create IPA

**Option B: Command Line**

```bash
# Build for App Store distribution
xcodebuild -workspace ios/App/App.xcworkspace \
  -scheme App \
  -configuration Release \
  -archivePath build/App.xcarchive \
  archive

# Export IPA
xcodebuild -exportArchive \
  -archivePath build/App.xcarchive \
  -exportPath build \
  -exportOptionsPlist ExportOptions.plist
```

#### Step 5: Submit to App Store

**Via Xcode:**
1. Archive your app (Product → Archive)
2. Select "Distribute App" → "App Store Connect"
3. Upload to App Store Connect
4. Create app listing in App Store Connect
5. Submit for review

**Via Command Line:**
```bash
# Using Transporter or altool
xcrun altool --upload-app -f build/App.ipa \
  -u your@email.com \
  -p your-app-specific-password
```

**Via App Store Connect:**
1. Create app record
2. Fill in metadata, screenshots, descriptions
3. Upload IPA via Transporter app
4. Submit for review

### Android Build Process

#### Step 1: Prerequisites

- **Android Studio Installed**: Latest stable version
- **Google Play Console Account**: $25 one-time fee
- **Keystore File**: For signing releases

#### Step 2: Build Your Web App

```bash
# Build and sync
npm run build
npx cap sync android
```

#### Step 3: Generate Release Build

```bash
# Open in Android Studio
npx cap open android

# Or build via command line
cd android
./gradlew assembleRelease  # Creates APK
./gradlew bundleRelease    # Creates AAB (recommended)
```

**Output:**
- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`

#### Step 4: Sign the Build

Android builds must be signed with a keystore:

```bash
# Generate keystore (first time only)
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Configure in android/app/build.gradle
android {
    signingConfigs {
        release {
            storeFile file("my-release-key.keystore")
            storePassword "password"
            keyAlias "my-key-alias"
            keyPassword "password"
        }
    }
}
```

#### Step 5: Upload to Google Play

1. Go to Google Play Console
2. Create app listing
3. Upload AAB file
4. Fill in app details, screenshots, content rating
5. Submit for review

### CI/CD Automation

Building manually is tedious. Automate with CI/CD:

#### GitHub Actions

```yaml
# .github/workflows/ios-build.yml
name: Build iOS App

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build web app
        run: npm run build

      - name: Sync Capacitor
        run: npx cap sync ios

      - name: Build iOS app
        run: |
          xcodebuild -workspace ios/App/App.xcworkspace \
            -scheme App \
            -configuration Release \
            archive
```

#### Codemagic

Cloud-based CI/CD specifically for mobile apps:

**Features:**
- macOS build machines (no Mac required!)
- Automatic code signing
- App Store/Play Store publishing
- Built-in support for Capacitor

**Pricing:**
- Free tier: 500 build minutes/month
- Pro: $99/month for 1,500 build minutes
- Pay-as-you-go: $0.095 per build minute

**Setup:**
1. Connect GitHub repository
2. Configure codemagic.yaml
3. Add signing credentials
4. Run builds in the cloud

```yaml
# codemagic.yaml
workflows:
  ios-workflow:
    name: iOS Workflow
    instance_type: mac_mini_m1
    environment:
      node: 18
    scripts:
      - name: Install dependencies
        script: npm install
      - name: Build web app
        script: npm run build
      - name: Build iOS
        script: |
          npx cap sync ios
          xcodebuild -workspace ios/App/App.xcworkspace \
            -scheme App archive
    artifacts:
      - build/**/*.ipa
    publishing:
      app_store_connect:
        api_key: $APP_STORE_CONNECT_KEY
```

#### Other CI/CD Options

**Bitrise:**
- Mobile-first CI/CD platform
- Pre-built Capacitor workflows
- Cloud macOS machines available

**Fastlane:**
- Open-source automation tool
- Handles code signing, screenshots, deployment
- Works with any CI/CD platform

**EAS Build (Expo):**
- Supports Capacitor projects
- Cloud builds for iOS and Android
- Free tier available

---

## Performance Comparison

### Capacitor vs React Native vs Native

| Metric | Native iOS/Android | React Native | Capacitor |
|--------|-------------------|--------------|-----------|
| **UI Rendering** | Native UIKit/Android Views | Native components | WebView (HTML/CSS) |
| **JavaScript Performance** | N/A | JavaScript Core (no JIT on iOS) | Full JIT engine access |
| **Animation Performance** | Excellent | Very Good | Good (can struggle with complex animations) |
| **App Size** | Smallest | Medium | Medium-Large |
| **Startup Time** | Fastest | Fast | Fast |
| **Low-End Device Performance** | Best | Good | Can struggle |
| **Complex UI Performance** | Best | Very Good | Good |
| **Development Speed** | Slowest | Fast | Fastest |
| **Code Reusability** | 0% (separate iOS/Android) | ~90% | ~95% (web, iOS, Android, PWA) |

### When Capacitor Performance Shines

**Ideal Use Cases:**
- Content-heavy apps (news, blogs, documentation)
- CRUD applications (forms, data entry)
- Business apps with standard UI
- Apps with existing web version
- MVP and rapid prototyping

**Performance Advantages:**
- **JavaScript Execution**: Faster than React Native (full JIT access)
- **Web Performance**: Same as browser (can use WebAssembly, Workers)
- **Network Requests**: No performance penalty
- **Hardware Acceleration**: Modern WebViews are highly optimized

### When to Choose React Native Instead

**Better for:**
- Animation-heavy applications
- Real-time video/audio processing
- Games or game-like interfaces
- Apps requiring maximum performance
- Complex gesture interactions
- Apps targeting low-end devices

**Performance Issues:**
- Complex layouts with gradients
- Heavy CSS animations
- Video playback (better but still challenging)
- Apps with 60fps requirements

### Real-World Performance

**Case Studies:**

**Good Performance:**
- News apps (BBC, MarketWatch)
- Productivity apps (task managers, note-taking)
- Social apps with standard feeds
- E-commerce apps (browsing, checkout)
- Dashboard and analytics apps

**Challenging Performance:**
- Real-time video editors
- 3D games or AR apps
- Drawing/painting apps
- Music production apps
- Apps with complex animations

### Performance Optimization Tips

1. **Optimize Web Assets**
   - Minimize JavaScript bundle size
   - Optimize images (WebP format)
   - Use code splitting
   - Lazy load components

2. **Use Native When Needed**
   - Write custom plugins for performance-critical features
   - Offload heavy processing to native code
   - Use native UI for complex interactions

3. **WebView Optimization**
   - Enable hardware acceleration
   - Minimize DOM manipulation
   - Use CSS transforms (GPU-accelerated)
   - Avoid expensive CSS properties

4. **Test on Real Devices**
   - Emulators don't show real performance
   - Test on low-end devices
   - Profile with native tools

---

## Limitations and Common Issues

### Architecture Limitations

#### 1. No Server-Side Rendering

**Issue**: Capacitor requires static HTML/CSS/JS files
**Impact**: Can't use Next.js SSR, server actions, or any backend bundled with the app
**Workaround**: Use client-side rendering only, or point to hosted web app

#### 2. WebView Performance Constraints

**Issue**: Apps run in WebView, not native UI
**Impact**:
- Complex animations may have frame drops
- CSS-heavy layouts can be sluggish
- Performance on old/low-end devices suffers

**Workaround**:
- Optimize CSS and JavaScript
- Use native plugins for performance-critical features
- Test extensively on target devices

#### 3. WebView Version Dependency

**Issue**: App performance depends on device's WebView version
**Android Specific**: Requires Chrome 60+ WebView
**Impact**: Older Android devices may have compatibility issues

**Solutions**:
- Set minimum Android version in manifest
- Test on oldest supported devices
- Provide degraded experience for old WebViews

### Platform-Specific Issues

#### iOS

**1. OAuth Redirects**
- Deep linking setup required for OAuth flows
- Universal Links configuration needed
- Custom URL schemes can be tricky

**2. File Access**
- Limited file system access (iOS sandbox)
- Can't access arbitrary files
- Must use Capacitor Filesystem API

**3. Status Bar**
- Requires specific configuration
- Notch handling on newer iPhones
- Safe area insets need management

#### Android

**1. Performance Issues**
- "Significant performance issues" reported vs iOS
- Animations that work on iOS may stutter on Android
- Hardware acceleration needs careful configuration

**2. WebView Fragmentation**
- Different WebView versions across devices
- Android 5-6 vs 7-9 vs 10+ use different WebViews
- Inconsistent behavior across manufacturers

**3. Permissions**
- Complex runtime permission system
- Need to request permissions at appropriate times
- Different permission models across Android versions

### Next.js Specific Limitations

#### 1. App Router Limitations

**Issue**: App Router requires careful configuration
**Problems**:
- Server Components don't work (client-side only)
- Server Actions unavailable
- Middleware not supported
- Must use `output: 'export'`

**Recommendation**: Consider Pages Router for simpler setup

#### 2. Pages Router Issues

**Better for Capacitor but still limited:**
- ❌ `getServerSideProps` doesn't work
- ❌ `getInitialProps` doesn't work
- ✅ `getStaticProps` works (at build time)
- ✅ `getStaticPaths` works (for dynamic routes)

#### 3. Image Optimization

**Issue**: Next.js Image Optimization requires a server
**Solution**: Must disable optimization

```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

#### 4. Dynamic Routes

**Issue**: Dynamic routes need pre-generation
**Workaround**: Use `getStaticPaths` to generate all routes at build time

### Common Development Issues

#### 1. Live Reload Not Working

**Symptoms**: Changes don't reflect on device
**Causes**:
- Wrong IP address in server.url
- Firewall blocking connection
- Phone and computer on different networks

**Solutions**:
- Verify IP address: `ifconfig` (Mac) or `ipconfig` (Windows)
- Ensure both devices on same WiFi
- Disable firewall or add exception
- Use `cleartext: true` in config

#### 2. Plugins Not Working

**Symptoms**: Capacitor plugins throw errors
**Causes**:
- Forgot to run `npx cap sync`
- Plugin not installed in native project
- Permissions not configured

**Solutions**:
```bash
# Always sync after adding plugins
npm install @capacitor/camera
npx cap sync ios
npx cap sync android

# Check native project includes plugin
npx cap open ios  # Verify in Xcode
```

#### 3. Build Failures

**iOS Build Fails:**
- Code signing issues (most common)
- Wrong Xcode version
- Missing pods: run `cd ios/App && pod install`
- Invalid Info.plist

**Android Build Fails:**
- Gradle version mismatch
- Missing SDK components
- Keystore signing issues
- Java version incompatibility

#### 4. White Screen on Device

**Causes**:
- Path issues (index.html not found)
- JavaScript errors preventing app load
- CORS issues with external APIs

**Debugging**:
- Check Safari Web Inspector / Chrome DevTools
- Look for console errors
- Verify `webDir` in capacitor.config.ts
- Check `npx cap sync` completed successfully

### Storage and State Issues

#### 1. Session Persistence

**Issue**: Auth sessions not persisting across app restarts
**Solution**: Configure Supabase/auth library for localStorage

```typescript
const supabase = createClient(url, key, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false  // Important for mobile!
  }
});
```

#### 2. Local Storage Limits

**Issue**: localStorage has size limits
**Solution**: Use SQLite plugin for large data

### Known Bugs and Workarounds

#### 1. Keyboard Height (iOS)

**Issue**: WebView doesn't always resize when keyboard appears
**Workaround**: Use Keyboard plugin to manually adjust layout

```typescript
import { Keyboard } from '@capacitor/keyboard';

Keyboard.addListener('keyboardWillShow', info => {
  document.body.style.paddingBottom = `${info.keyboardHeight}px`;
});
```

#### 2. Android Back Button

**Issue**: Android back button doesn't work as expected
**Solution**: Implement custom back button handling

```typescript
import { App } from '@capacitor/app';

App.addListener('backButton', ({canGoBack}) => {
  if (!canGoBack) {
    App.exitApp();
  } else {
    window.history.back();
  }
});
```

---

## Plugin Ecosystem

### Official Plugins (Ionic Team)

**Repository**: https://github.com/ionic-team/capacitor-plugins

**Maintained by Capacitor core team**, tested across versions, documented thoroughly.

**Categories:**
- **Action Sheet, Dialog, Toast**: Native UI components
- **App, App Launcher**: App lifecycle and deep linking
- **Browser**: In-app browser
- **Camera**: Photos and video capture
- **Clipboard**: Copy/paste
- **Device**: Device information
- **Filesystem**: File operations
- **Geolocation**: GPS location
- **Haptics**: Vibration feedback
- **Keyboard**: Keyboard management
- **Local Notifications**: Schedule notifications
- **Motion**: Accelerometer, gyroscope
- **Network**: Connection status
- **Push Notifications**: Remote notifications
- **Screen Reader**: Accessibility
- **Share**: Native share sheet
- **Splash Screen**: Launch screen control
- **Status Bar**: Status bar customization
- **Storage**: Key-value storage
- **Text Zoom**: Text size settings

### Community Plugins

**Discovery**: https://capacitorjs.com/directory

**Notable Community Plugins:**

**Authentication & Security:**
- `capacitor-native-biometric` - Face ID, Touch ID, Fingerprint
- `@capacitor-community/firebase-authentication`
- `@capacitor-community/apple-sign-in`
- `@capacitor-community/facebook-login`

**Data & Storage:**
- `@capacitor-community/sqlite` - SQLite database
- `@capacitor-community/secure-storage` - Encrypted storage

**Media & Content:**
- `@capacitor-community/media` - Media library access
- `capacitor-video-player` - Native video player
- `@capacitor-community/barcode-scanner` - QR/barcode scanning
- `@capacitor-community/camera-preview` - Camera preview

**Maps & Location:**
- `@capacitor/google-maps` - Google Maps integration
- `@capacitor-community/background-geolocation` - Background GPS

**Monetization:**
- `@capacitor-community/admob` - Google AdMob ads
- `@capacitor-community/in-app-purchases` - iOS/Android purchases

**Firebase:**
- `@capacitor-firebase/analytics`
- `@capacitor-firebase/crashlytics`
- `@capacitor-firebase/messaging`
- `@capacitor-firebase/performance`

**Other:**
- `@capacitor-community/http` - Native HTTP (bypass CORS)
- `@capacitor-community/text-to-speech`
- `@capacitor-community/speech-recognition`
- `capacitor-updater` - Over-the-air updates

### Finding Plugins

**1. Official Directory**
- https://capacitorjs.com/directory
- Searchable, categorized
- Shows popularity and maintenance status

**2. NPM Search**
```bash
npm search capacitor plugin camera
```

**3. Awesome Capacitor**
- https://github.com/riderx/awesome-capacitor
- Curated list of plugins, tools, resources

**4. GitHub**
- Search "capacitor plugin [feature]"
- Check stars, recent commits, issue count

### Evaluating Plugins

**Quality Indicators:**
- ✅ Recent commits (active maintenance)
- ✅ Good documentation
- ✅ TypeScript support
- ✅ iOS + Android support
- ✅ Active issue resolution
- ✅ Test coverage
- ⚠️ Last updated > 1 year ago
- ⚠️ Many open issues
- ⚠️ No documentation
- ⚠️ Single platform only

### Installing Plugins

```bash
# Install plugin
npm install @capacitor/camera

# Sync to native projects
npx cap sync

# iOS: Update CocoaPods (if needed)
cd ios/App && pod install

# Open native project to verify
npx cap open ios
npx cap open android
```

### Creating Custom Plugins

When no existing plugin meets your needs:

**Option 1: Inline Native Code**
- Add Swift/Kotlin directly to your project
- Good for simple, app-specific features

**Option 2: Create Plugin Package**
- Reusable across projects
- Can publish to npm
- Requires more setup

**Plugin Generator:**
```bash
npm init @capacitor/plugin my-plugin
```

**Basic Plugin Structure:**
```typescript
// src/definitions.ts
export interface MyPluginPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

// src/web.ts (web implementation)
export class MyPluginWeb extends WebPlugin implements MyPluginPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    return options;
  }
}

// ios/Plugin/Plugin.swift
@objc(MyPlugin)
public class MyPlugin: CAPPlugin {
  @objc func echo(_ call: CAPPluginCall) {
    let value = call.getString("value") ?? ""
    call.resolve(["value": value])
  }
}

// android/src/main/java/.../MyPlugin.java
@CapacitorPlugin(name = "MyPlugin")
public class MyPlugin extends Plugin {
  @PluginMethod
  public void echo(PluginCall call) {
    String value = call.getString("value");
    JSObject ret = new JSObject();
    ret.put("value", value);
    call.resolve(ret);
  }
}
```

---

## Conclusion

### When to Use Capacitor

**Ideal For:**
- ✅ Existing web applications
- ✅ Web-first companies/teams
- ✅ Rapid development and iteration
- ✅ Cross-platform deployment (iOS, Android, Web)
- ✅ Content-heavy applications
- ✅ Standard business applications
- ✅ MVPs and prototypes

**Maybe Not For:**
- ❌ Performance-critical applications
- ❌ Heavy animation requirements
- ❌ Games or game-like interfaces
- ❌ Real-time video/audio processing
- ❌ Apps targeting very old devices

### Key Takeaways

1. **No Rewrite Needed**: Wrap existing web apps without starting over
2. **Modern & Maintained**: Actively developed by Ionic (now OutSystems)
3. **Web Standards**: Use the web technologies you already know
4. **Native Access**: Full access to device features via plugins
5. **Performance**: Good for most apps, excellent for content apps
6. **Community**: Large, active community and plugin ecosystem
7. **Open Source**: Free, MIT licensed, community-driven

### Getting Started

**Next Steps:**
1. Read the Next.js integration guide (nextjs-capacitor-setup.md)
2. Review Supabase compatibility details (supabase-capacitor-compatibility.md)
3. Explore services that can help (capacitor-services-directory.md)
4. Estimate costs (capacitor-cost-estimate.md)

### Resources

- **Official Docs**: https://capacitorjs.com
- **GitHub**: https://github.com/ionic-team/capacitor
- **Community Forum**: https://forum.ionicframework.com
- **Discord**: Join Ionic Discord server
- **Plugin Directory**: https://capacitorjs.com/directory
- **YouTube**: Ionic's official channel for tutorials

---

**Document Version**: 1.0
**Last Updated**: November 2024
**Next Review**: Check for Capacitor 8.x updates
