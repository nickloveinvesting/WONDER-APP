#!/bin/bash

#######################################################################
# WONDER iOS App - Automated Setup Script
#
# This script sets up the React Native + Expo development environment
# for the WONDER iOS app.
#
# Prerequisites:
#   - Node.js 18+ installed
#   - npm or yarn
#   - Xcode 16+ (for iOS development)
#   - iOS Simulator or physical device
#   - Apple Developer account (for TestFlight/App Store)
#
# Usage:
#   chmod +x setup.sh
#   ./setup.sh
#
#######################################################################

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project configuration
PROJECT_NAME="wonder-ios"
EXPO_SDK_VERSION="51"
NODE_MIN_VERSION="18"

#######################################################################
# Helper Functions
#######################################################################

print_header() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

check_command() {
    if command -v $1 &> /dev/null; then
        print_success "$1 is installed"
        return 0
    else
        print_error "$1 is not installed"
        return 1
    fi
}

#######################################################################
# Pre-flight Checks
#######################################################################

print_header "WONDER iOS App Setup"

echo "This script will set up the React Native + Expo development environment."
echo ""

print_header "Step 1: Checking Prerequisites"

# Check Node.js
if check_command "node"; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge "$NODE_MIN_VERSION" ]; then
        print_success "Node.js version $(node -v) meets minimum requirement (v$NODE_MIN_VERSION+)"
    else
        print_error "Node.js version $(node -v) is below minimum (v$NODE_MIN_VERSION+)"
        print_info "Please upgrade Node.js: https://nodejs.org/"
        exit 1
    fi
else
    print_error "Node.js is required. Please install from https://nodejs.org/"
    exit 1
fi

# Check npm
check_command "npm" || exit 1

# Check git
check_command "git" || exit 1

# Check for Xcode (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    if xcode-select -p &> /dev/null; then
        print_success "Xcode Command Line Tools installed"
    else
        print_warning "Xcode Command Line Tools not found"
        print_info "Installing Xcode Command Line Tools..."
        xcode-select --install
    fi

    # Check for Xcode app
    if [ -d "/Applications/Xcode.app" ]; then
        XCODE_VERSION=$(xcodebuild -version | head -1 | cut -d' ' -f2)
        print_success "Xcode $XCODE_VERSION installed"
    else
        print_warning "Xcode.app not found in /Applications"
        print_info "For iOS development, install Xcode from the App Store"
    fi
fi

# Check for watchman (recommended for React Native)
if check_command "watchman"; then
    print_success "Watchman installed (recommended)"
else
    print_warning "Watchman not installed (optional but recommended)"
    print_info "Install with: brew install watchman"
fi

echo ""

#######################################################################
# Project Setup
#######################################################################

print_header "Step 2: Creating Expo Project"

# Check if project directory already exists
if [ -d "$PROJECT_NAME" ]; then
    print_warning "Directory '$PROJECT_NAME' already exists"
    read -p "Do you want to remove it and start fresh? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$PROJECT_NAME"
        print_info "Removed existing directory"
    else
        print_info "Using existing directory"
        cd "$PROJECT_NAME"
    fi
fi

# Create new Expo project if it doesn't exist
if [ ! -d "$PROJECT_NAME" ]; then
    print_info "Creating new Expo project with TypeScript template..."
    npx create-expo-app@latest "$PROJECT_NAME" --template tabs
    cd "$PROJECT_NAME"
    print_success "Expo project created"
else
    cd "$PROJECT_NAME"
fi

#######################################################################
# Install Dependencies
#######################################################################

print_header "Step 3: Installing Dependencies"

print_info "Installing core dependencies..."

# Supabase
npx expo install @supabase/supabase-js
print_success "Supabase installed"

# AsyncStorage for offline storage
npx expo install @react-native-async-storage/async-storage
print_success "AsyncStorage installed"

# NativeWind (Tailwind CSS for React Native)
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
print_success "NativeWind + Tailwind installed"

# React Query for data fetching
npm install @tanstack/react-query
print_success "React Query installed"

# Expo packages
npx expo install expo-haptics
npx expo install expo-notifications
npx expo install expo-linking
npx expo install expo-secure-store
npx expo install expo-splash-screen
npx expo install expo-font
print_success "Expo packages installed"

# Network info for offline detection
npx expo install @react-native-community/netinfo
print_success "NetInfo installed"

# Additional UI packages
npm install react-native-safe-area-context
npm install react-native-reanimated
print_success "UI packages installed"

echo ""
print_success "All dependencies installed!"

#######################################################################
# Configuration Files
#######################################################################

print_header "Step 4: Creating Configuration Files"

# Create tailwind.config.js
print_info "Creating tailwind.config.js..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
      },
      fontFamily: {
        'jakarta': ['PlusJakartaSans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
EOF
print_success "tailwind.config.js created"

# Create .env.example
print_info "Creating .env.example..."
cat > .env.example << 'EOF'
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys (if needed)
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# App Configuration
EXPO_PUBLIC_APP_ENV=development
EOF
print_success ".env.example created"

# Create src directory structure
print_info "Creating project directory structure..."
mkdir -p src/{api,hooks,components/{common,auth,debates,journal,shared},context,services,utils,types,styles}
mkdir -p assets/{images,fonts,icons,animations}

# Create placeholder files
touch src/api/{supabase,auth,debates,profiles,journal,gemini}.ts
touch src/hooks/{useAuth,useDebates,useProfile,useOfflineSync,useRefresh}.ts
touch src/context/{AuthContext,ThemeContext}.ts
touch src/services/{offlineStorage,deepLinking,notifications,analytics,syncManager}.ts
touch src/utils/{helpers,constants,formatting,validators}.ts
touch src/types/{database,api,navigation}.ts
touch src/styles/{colors,spacing,typography,theme}.ts

print_success "Directory structure created"

# Create basic Supabase client
print_info "Creating Supabase client template..."
cat > src/api/supabase.ts << 'EOF'
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types from your web app (copy from lib/database.types.ts)
// import { Database } from '@/types/database';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    supabaseInstance = createClient(
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
EOF
print_success "Supabase client template created"

# Create basic theme file
print_info "Creating theme configuration..."
cat > src/styles/theme.ts << 'EOF'
export const colors = {
  primary: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#F43F5E',
  info: '#0EA5E9',
};

export const typography = {
  hero: { fontSize: 28, fontWeight: '900' as const, lineHeight: 33.6 },
  section: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28.6 },
  cardTitle: { fontSize: 17, fontWeight: '600' as const, lineHeight: 23.8 },
  body: { fontSize: 16, fontWeight: '500' as const, lineHeight: 28.8 },
  caption: { fontSize: 14, fontWeight: '500' as const, lineHeight: 21 },
  label: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16.8 },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export default theme;
EOF
print_success "Theme configuration created"

# Update app.json with WONDER configuration
print_info "Updating app.json..."
cat > app.json << 'EOF'
{
  "expo": {
    "name": "WONDER",
    "slug": "wonder",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "wonder",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0D9488"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.wonder.philosophy",
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "WONDER needs camera access for profile photos",
        "NSPhotoLibraryUsageDescription": "WONDER needs photo library access for profile photos"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#0D9488"
      },
      "package": "com.wonder.philosophy"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
EOF
print_success "app.json updated"

echo ""

#######################################################################
# EAS Build Setup
#######################################################################

print_header "Step 5: Setting Up EAS Build"

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    print_info "Installing EAS CLI globally..."
    npm install -g eas-cli
    print_success "EAS CLI installed"
else
    print_success "EAS CLI already installed"
fi

# Create eas.json
print_info "Creating eas.json..."
cat > eas.json << 'EOF'
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "distribution": "store",
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "your-apple-team-id"
      }
    }
  }
}
EOF
print_success "eas.json created"

echo ""

#######################################################################
# Final Steps
#######################################################################

print_header "Step 6: Final Setup"

# Copy database types from web app
print_info "Copying database types from web app..."
if [ -f "../lib/database.types.ts" ]; then
    cp ../lib/database.types.ts src/types/database.ts
    print_success "Database types copied"
else
    print_warning "Could not find ../lib/database.types.ts"
    print_info "Please manually copy your database types to src/types/database.ts"
fi

# Install dependencies
print_info "Running final npm install..."
npm install
print_success "Dependencies installed"

echo ""

#######################################################################
# Summary
#######################################################################

print_header "Setup Complete!"

echo "Your WONDER iOS project has been created and configured."
echo ""
echo "Project location: $(pwd)"
echo ""
echo -e "${GREEN}Next Steps:${NC}"
echo ""
echo "1. Configure environment variables:"
echo "   cp .env.example .env"
echo "   # Edit .env with your Supabase credentials"
echo ""
echo "2. Copy database types from web app:"
echo "   cp ../lib/database.types.ts src/types/database.ts"
echo ""
echo "3. Start the development server:"
echo "   npx expo start"
echo ""
echo "4. Run on iOS Simulator:"
echo "   Press 'i' in the terminal, or"
echo "   npx expo run:ios"
echo ""
echo "5. Set up EAS Build (when ready for TestFlight):"
echo "   eas login"
echo "   eas build:configure"
echo "   eas build --platform ios --profile preview"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "- Implementation Plan: ../mobile-app/IMPLEMENTATION_PLAN.md"
echo "- UI Designs: ../mobile-app/UI_DESIGNS.md"
echo "- App Store Prep: ../mobile-app/APP_STORE_PREP.md"
echo ""
echo -e "${BLUE}Useful Commands:${NC}"
echo "  npx expo start           # Start dev server"
echo "  npx expo run:ios         # Run on iOS"
echo "  eas build --platform ios # Build for iOS"
echo "  eas submit --platform ios # Submit to App Store"
echo ""
echo -e "${GREEN}Happy coding! WONDER together. 🌟${NC}"
echo ""
