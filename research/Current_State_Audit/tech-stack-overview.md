# Philosophy App - Technical Stack Overview

**Application Name**: PhiloDuel  
**Current Version**: 0.1.0  
**Status**: MVP (Minimum Viable Product)  
**Repository**: https://github.com/nickloveinvesting/Philosophy-app  

---

## Executive Summary

PhiloDuel is a debate-focused web application built with modern full-stack JavaScript technologies. The platform enables users to engage in structured philosophical debates that are judged by AI (Gemini). The tech stack emphasizes:
- Modern React with Next.js 15 (latest features)
- Type-safe development with TypeScript
- Backend services via Supabase (PostgreSQL, Auth, Realtime)
- AI integration with Google Gemini 2.0 Flash
- Cloud deployment on Vercel

**Key Characteristic**: The entire technical stack is currently optimized for **debate functionality**. Minimal abstraction exists between "debate" concepts and application code.

---

## Core Technology Stack

### Frontend Framework
- **Next.js 15.1.0**
  - App Router architecture (not Pages Router)
  - Server Components and Server Actions
  - Built-in API routes
  - Image optimization
  - Automatic code splitting
  - Middleware support for authentication

- **React 19.0.0**
  - Latest concurrent features
  - Server Components compatibility
  - New hooks ecosystem
  - Streaming support

- **TypeScript 5.x**
  - Strict mode enabled
  - Path aliases configured (@/*)
  - JSX preservation for Next.js
  - Comprehensive type coverage

### Styling & UI
- **Tailwind CSS 3.4.1**
  - Custom "argued" color scheme (debate-specific branding)
  - Extended theme configuration
  - Custom utility classes
  - No component library (raw utility classes)

- **PostCSS 8.x**
  - Tailwind processing
  - Vendor prefixing
  - CSS optimization

### Icon Library
- **lucide-react 0.468.0**
  - Lightweight SVG icon library
  - 468+ icon options
  - Tree-shakeable imports
  - No dependencies

### Backend & Database
- **Supabase JavaScript SDK 2.45.7**
  - PostgreSQL database
  - Auth system (JWT-based)
  - Real-time subscriptions (via WebSocket)
  - Row-Level Security (RLS)

- **Supabase SSR 0.5.2**
  - Server-side authentication handling
  - Cookie management
  - Session persistence
  - Server Component compatibility

- **PostgreSQL (via Supabase)**
  - Hosted database
  - UUID primary keys
  - JSONB columns for flexible data
  - Triggers and functions for business logic
  - Row-Level Security policies

### AI & Machine Learning
- **Google Generative AI SDK 0.21.0**
  - Gemini 2.0 Flash model integration
  - Streaming support
  - JSON parsing
  - No local ML models

### Development & Tooling
- **ESLint 8.x**
  - Next.js ESLint config
  - Code quality checks
  - No custom rules specified

- **Node.js Types (@types/node 20.x)**
  - Server-side type safety
  - Standard library types

- **React Types (@types/react 19.x, @types/react-dom 19.x)**
  - Component type definitions
  - Hook types

---

## Architecture Patterns

### File Structure
```
app/                           # Next.js App Router directory
├── (authenticated)/           # Protected routes (requires auth)
│   ├── layout.tsx
│   ├── debates/
│   │   ├── page.tsx           # List debates
│   │   ├── create/page.tsx    # Create debate
│   │   └── [id]/
│   │       ├── page.tsx       # Debate detail
│   │       └── DebateActions.tsx
│   ├── leaderboard/page.tsx
│   ├── profile/page.tsx
│   └── settings/page.tsx
├── auth/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── actions.ts             # Sign out server action
│   └── logout/route.ts
├── api/
│   └── judge/route.ts         # AI judgment API endpoint
├── about/
├── debug/
├── globals.css
├── layout.tsx                 # Root layout
└── page.tsx                   # Landing page

lib/                           # Utilities and clients
├── supabase/
│   ├── client.ts              # Browser client (singleton)
│   └── server.ts              # Server client
├── gemini.ts                  # AI judgment logic
├── actions.ts                 # Server actions
└── database.types.ts          # TypeScript types (generated)

supabase/
├── migrations/                # Database schema
│   ├── 20250113_init.sql      # Initial schema
│   └── 20250114_add_delo_rating.sql
└── README.md

components/                    # Reusable React components
public/                        # Static assets
preview/                       # Landing page preview (HTML)
```

### Authentication Flow
1. **Sign Up/Login**: Supabase Auth (email/password via JWT)
2. **Session Management**: Next.js middleware refreshes token on every request
3. **Route Protection**: (authenticated) route group prevents access to protected pages
4. **Logout**: Server action via /auth/logout route

### Data Flow
1. **Client** → **Next.js API Route** → **Supabase** → **Database**
2. **AI Judgment**: Client/Server → **Gemini API** → Response processed and stored

### Real-time Capabilities
- Supabase Realtime subscriptions available but not heavily utilized
- WebSocket support for live debate updates (potential use case)

---

## Database Schema

### Tables
1. **profiles** (extends auth.users)
   - User metadata and statistics
   - Reputation system
   - DeLO rating (Debate Elo, 1000 base)

2. **debates**
   - Debate topics and descriptions
   - Status tracking (open, in_progress, completed)
   - Participant assignments
   - Winner tracking

3. **arguments**
   - Individual arguments submitted
   - Position tracking (for/against)
   - Round tracking
   - Debate association

4. **judgments**
   - AI-generated judgments
   - Fact checks (JSONB)
   - Scores (JSONB)
   - Reasoning

### Security
- Row-Level Security (RLS) enabled on all tables
- Policies restrict data access by user ID
- Public data (debates, profiles) readable by all
- Authenticated users can create debates/arguments

### Triggers & Functions
- `handle_new_user()`: Auto-creates profile when user signs up
- `update_reputation_after_debate()`: Updates reputation scores after debate completion

---

## External Services

### Supabase (Backend-as-a-Service)
- **URL**: https://cbnqsuzsvkjfieplmahn.supabase.co
- **Services**:
  - PostgreSQL database
  - JWT-based authentication
  - Real-time subscriptions
  - Storage (not currently used)
  - Vector/PgVector support (not used)

- **Configuration**:
  - NEXT_PUBLIC_SUPABASE_URL (public)
  - NEXT_PUBLIC_SUPABASE_ANON_KEY (public, limited permissions)
  - SUPABASE_SERVICE_ROLE_KEY (secret, full admin access)

### Google Gemini AI API
- **Model**: Gemini 2.0 Flash (experimental - "gemini-2.0-flash-exp")
- **Purpose**: Judge debates based on logic, evidence, rhetoric
- **Features Used**:
  - JSON output mode
  - Multi-turn conversation (not used, single prompt)
  - Streaming (not enabled, waits for full response)

- **Configuration**:
  - GEMINI_API_KEY (server-side secret)

### Vercel (Deployment & Hosting)
- **Purpose**: Frontend deployment and CDN
- **Features**:
  - Automatic deployments from GitHub
  - Edge Middleware
  - Environment variable management
  - Analytics (optional)
  - Built-in logging

- **Configuration**:
  - Environment variables set in dashboard
  - Automatic preview deployments on PRs

---

## Environment Variables

### Public (exposed to browser)
```
NEXT_PUBLIC_SUPABASE_URL=https://cbnqsuzsvkjfieplmahn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<JWT token with anon role>
```

### Secret (server-side only)
```
SUPABASE_SERVICE_ROLE_KEY=<JWT token with admin role>
GEMINI_API_KEY=<Google AI API key>
```

### Development Setup
- `.env.example` exists but not `.env.local`
- Supabase credentials are hardcoded in example file (exposed in DEPLOYMENT.md)

---

## Deployment Infrastructure

### Hosting
- **Frontend**: Vercel (Edge Network)
- **Backend**: Supabase Cloud (AWS infrastructure)
- **Database**: Supabase PostgreSQL (AWS RDS)

### Database Migrations
- Manual SQL execution via Supabase dashboard
- No automated migration system
- Migrations stored in `/supabase/migrations/`

### CI/CD
- No GitHub Actions workflows configured
- Manual push to GitHub + Vercel auto-deploy
- No automated testing on deployment
- No linting checks on deployment

---

## Performance Characteristics

### Bundle Size
- Next.js: ~100KB (gzipped)
- React 19: ~50KB (gzipped)
- Supabase Client: ~30KB (gzipped)
- Lucide React: ~5KB (gzipped, tree-shaken)
- Tailwind CSS: ~10KB (gzipped, PurgeCSS enabled)
- **Total estimated**: ~195KB (without Gemini SDK)

### Database Query Performance
- Indexes on: username, status, created_at, debate_id, delo_rating
- Queries optimized for debate list/detail operations
- No query optimization for new conversation features

### AI Response Time
- Gemini 2.0 Flash: ~2-5 seconds per judgment
- Response processing: JSON parsing, database writes
- No caching of AI responses

---

## Branding & Design System

### Color Scheme (Argued Branding)
- **Navy** (#1A3A52): Primary, trust, navigation, CTAs
- **Brown** (#8B6F47): Secondary, achievements, accents
- **Cream** (#F5F3F0): Background, warmth, readability
- **Black** (#1C1C1C): Text, authority, contrast
- **Gold** (#D4A574): Highlights, premium, hover states
- **Success** (#4A7C59): Victory, positive states
- **Error** (#C84C3C): Warnings, losses
- **Gray** (#6B7280): Disabled, secondary text

### Typography
- **Sans**: Inter (system fonts fallback)
- **Serif**: Lora (Georgia fallback)
- **Mono**: Monaco (Courier New fallback)

### Design Philosophy
- Professional, debate-oriented aesthetic
- Trust and authority-focused colors
- Minimal custom components (mostly Tailwind utilities)
- No design system/component library

---

## Development Workflow

### Scripts
```json
{
  "dev": "next dev",           // Local development
  "build": "next build",        // Production build
  "start": "next start",        // Production server
  "lint": "next lint"           // ESLint checks
}
```

### Linting
- ESLint with Next.js config
- No prettier configuration
- No pre-commit hooks
- Manual execution required

### TypeScript
- Strict mode enabled
- Path aliases working
- Incremental compilation enabled
- No strict null checking issues

---

## Known Issues & Observations

### Debate-Specific Coupling
1. **Database schema**: Tables named "debates", "arguments" explicitly
2. **Component naming**: "DebateActions", "DebatesPage"
3. **Routing**: `/debates/` routes assume debate functionality
4. **API logic**: Judgment API designed for debates only
5. **Gemini prompt**: Hardcoded "debate judge" instructions

### Potential Technical Debt
1. **No component library**: Every UI built from Tailwind utilities
2. **Singleton pattern**: Supabase client uses global state
3. **No error boundaries**: React Error Boundaries not implemented
4. **Limited logging**: Console errors, no structured logging
5. **No tests**: No test files in repository
6. **Manual migrations**: No automated schema management
7. **Hardcoded environment values**: DEPLOYMENT.md exposes credentials

### Not Implemented
- Email notifications/verification
- File upload (Storage configured but unused)
- Real-time features (subscriptions available, not used)
- Caching layer (no Redis, Vercel KV not configured)
- Search functionality
- Content moderation
- Rate limiting
- Error tracking (Sentry, etc.)
- Analytics
- A/B testing infrastructure

---

## Version Management

### Current Versions
- Node.js: 18+ (recommended)
- npm: 9+ (bundled with Node)
- Next.js: 15.1.0 (latest at time of build)
- React: 19.0.0 (latest)
- TypeScript: 5.x (latest)

### Update Status
All dependencies are relatively recent (Oct-Nov 2024). No version conflicts detected. ESLint and Tailwind could be updated but are stable.

---

## Maintenance & Support Status

| Technology | Maintenance | Community | Security |
|-----------|------------|-----------|----------|
| Next.js | Active | Excellent | Regular |
| React | Active | Excellent | Regular |
| TypeScript | Active | Excellent | Regular |
| Tailwind CSS | Active | Excellent | Regular |
| Supabase | Active | Good | Regular |
| Gemini API | Active | Growing | Regular |
| Vercel | Active | Excellent | Regular |

All technologies are actively maintained with good community support and regular security updates.

---

## Summary Table

| Category | Value |
|----------|-------|
| **Language** | TypeScript |
| **Frontend Framework** | Next.js 15.1 + React 19 |
| **Styling** | Tailwind CSS 3.4.1 |
| **Backend** | Supabase + PostgreSQL |
| **Authentication** | Supabase Auth (JWT) |
| **AI Service** | Google Gemini 2.0 Flash |
| **Hosting** | Vercel |
| **Database** | PostgreSQL (Supabase) |
| **Real-time** | Supabase Realtime (WebSocket) |
| **Testing** | None configured |
| **Type Safety** | TypeScript strict mode |
| **Deployment** | Vercel automatic from GitHub |
| **Monitoring** | None configured |
| **Logging** | Console only |

