# CLAUDE CODE EXECUTION PROMPT

## 🎯 MISSION: Production-Ready App with Complete WONDER Branding

You are tasked with fixing all outstanding issues and rebranding the entire application from "Ponder"/"ARGUED" to "WONDER". This is a comprehensive fix affecting branding, configuration, and code quality.

---

## TASK OVERVIEW

**Estimated Time:** 2-3 hours
**Complexity:** Medium-High
**Critical:** Yes - Blocks production deployment

### What You're Fixing:
1. Complete app rebranding (Ponder/ARGUED → WONDER)
2. Build warnings (metadataBase, font loading)
3. Code quality (console logs, TypeScript)
4. Feature verification (discussions, voting, journal)
5. Route protection (auth verification)

### Success = Build passes + All branding updated + Features verified + App ready for production

---

## DETAILED INSTRUCTIONS

### PHASE 1: CRITICAL BRANDING UPDATES (DO FIRST)

#### 1.1 Update Root Metadata
**File:** `app/layout.tsx`

Add metadataBase and update all branding:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "WONDER - Explore Ideas Together",
  description: "A philosophical conversation platform where curious minds explore ideas together—from casual questions to deep debates.",
  // ... rest of metadata
}
```

#### 1.2 Update Landing Page
**File:** `app/page.tsx`

Complete rewrite with WONDER branding:
- Page title: Change to "WONDER"
- Tagline: Change to "Explore Ideas Together" (or similar)
- All copy/descriptions mentioning "Ponder" or "ARGUED" → "WONDER"
- Button text referencing the app
- Footer references

**Pattern to search:**
- "Ponder" → "WONDER"
- "ARGUED" → "WONDER"
- "Think Deeply Together" → "Explore Ideas Together"

#### 1.3 Update Auth Pages
**Files:**
- `app/auth/login/LoginForm.tsx`
- `app/auth/signup/page.tsx`

Changes needed:
- Welcome message: "Welcome to WONDER"
- Subtitle/description updates
- All button labels
- Error messages
- Any brand references in copy

#### 1.4 Update Navigation & Components
**Files:**
- `components/Navigation.tsx`
- `components/Sidebar.tsx`
- `components/Logo.tsx`
- `components/ui/Header.tsx`

Changes:
- Brand name in links/menus
- Logo alt text
- Navigation labels
- Any tooltips/help text

#### 1.5 Update Public Info Pages
**Files:**
- `app/about/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`

Changes:
- All "Ponder"/"ARGUED" → "WONDER"
- Update company/app references
- Update mission statements

#### 1.6 Update Authenticated Home
**File:** `app/(authenticated)/home/page.tsx`

Changes:
- "Welcome back" message can stay
- Any WONDER branding references
- Feature descriptions

#### 1.7 Update Config Files
**Files:**
- `package.json` - Update name, description
- `CLAUDE.md` - Update project overview
- `README.md` - Update all references
- `.env.local` example - Update if needed
- `tailwind.config.ts` - Update color descriptions if using "argued" naming

#### 1.8 Search & Replace Remaining Instances
Use grep to find all remaining instances:
```bash
grep -r "Ponder" --include="*.ts" --include="*.tsx" --include="*.md" --include="*.json" .
grep -r "ARGUED" --include="*.ts" --include="*.tsx" --include="*.md" --include="*.json" .
```

Replace in these file types:
- `.ts` `.tsx` files
- `.md` documentation
- `.json` config files
- Comments and strings

**Careful with:**
- Don't replace in node_modules
- Don't replace in .git history
- Check context before replacing
- Some "Ponder" might be in variable names (PonderContext, etc.) - decide case by case

---

### PHASE 2: BUG FIXES & WARNINGS

#### 2.1 Fix Missing metadataBase (Already done in 1.1)
Ensure `process.env.NEXT_PUBLIC_APP_URL` is documented.

#### 2.2 Clean Up Console Statements
**Search pattern:** `console\.(log|error|warn|debug)`

Allowed exceptions:
- `/app/debug/page.tsx` - Debug page can have console
- Comments explaining console (e.g., `// console.error()`)

**Files to check:**
- `middleware.ts`
- All component files
- All page files
- Remove all except intentional debugging

#### 2.3 Add Environment Variable Documentation
**File:** `.env.local` (or create if doesn't exist)

Add this section with instructions:
```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Integration
GEMINI_API_KEY=your_gemini_api_key

# GitHub Feedback Integration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO=nickloveinvesting/Philosophy-app
```

#### 2.4 Create Migration Checklist
**File:** `MIGRATION_CHECKLIST.md`

List all migrations in `supabase/migrations/` with:
- Filename
- Purpose/Description
- Status (Applied / Not Applied / Optional)
- Any dependencies

Example format:
```markdown
## Database Migrations Checklist

- [ ] 20250117_daily_prompts_system.sql - Daily question prompts system
- [ ] 20250118_quadrants_and_voting_system.sql - Voting and quadrant system
- [ ] 20250118_journal_system.sql - Journal entries and folders
- ...
```

#### 2.5 Verify TypeScript Compilation
Run type check (in test, don't commit yet):
```bash
npx tsc --noEmit
```

If errors found:
1. List them out
2. Fix each one
3. Ensure no `any` types
4. Ensure all imports are correct

---

### PHASE 3: FEATURE VERIFICATION & TESTING

#### 3.1 Test Protected Routes
Verify these routes require authentication:

**Test Plan:**
1. Open browser in private/incognito mode
2. Try accessing each route without logging in
3. Should redirect to `/auth/login`

**Routes to test:**
```
/home
/debates
/debates/[id]
/debates/create
/journal
/journal/[id]
/journal/[id]/edit
/journal/folders/new
/journal/new
/profile
/settings
/leaderboard
/discuss
/discuss/[id]
```

**Document results** - If any route doesn't redirect, it needs fixing.

#### 3.2 Test Discussion Features
**Functionality checklist:**
- [ ] Can create discussion
- [ ] Can view discussion detail
- [ ] Can add comments
- [ ] Can rate comments (steelman/steelwoman if implemented)
- [ ] Comments display in thread properly
- [ ] Voting works on discussions and comments
- [ ] User can delete own comments

**If broken:** Document what's broken and what needs fixing

#### 3.3 Test Voting System
**Test:**
- [ ] Can snap (upvote) a post
- [ ] Can zap (downvote) a post
- [ ] Vote counts update immediately
- [ ] Can undo vote
- [ ] Voting on comments works
- [ ] Vote counts persist after refresh

#### 3.4 Test Journal Features
**Test:**
- [ ] Can create journal entry
- [ ] Can edit journal entry
- [ ] Can view journal entry
- [ ] Can create journal folder
- [ ] Can delete journal entry
- [ ] Can publish to community
- [ ] Published posts appear in feed

#### 3.5 Test User Profile
**Test:**
- [ ] Can view own profile
- [ ] Can edit display name
- [ ] Can edit bio
- [ ] Changes save correctly
- [ ] Profile appears in other users' contexts

#### 3.6 Test Authentication
**Test:**
- [ ] Can signup with email/password
- [ ] Can login with credentials
- [ ] Can logout
- [ ] Session persists across page reloads
- [ ] Cannot access protected routes without auth
- [ ] Cannot access auth pages while authenticated (should redirect)

---

### PHASE 4: BUILD & VERIFY

#### 4.1 Run Build
```bash
npm run build
```

**Expected output:** No errors, only warnings about telemetry are acceptable

**If build fails:**
1. Read error message carefully
2. Fix the issue
3. Retry build
4. Repeat until passes

#### 4.2 Run Type Check
```bash
npx tsc --noEmit
```

**Expected:** No errors

#### 4.3 Run Linter
```bash
npm run lint
```

**Expected:** No critical errors (warnings are okay)

#### 4.4 Start Dev Server
```bash
npm run dev
```

**Test in browser:**
1. Open http://localhost:3000
2. Landing page loads and shows WONDER branding
3. Can navigate to auth pages
4. Can login/signup
5. Can access protected routes
6. Can perform basic actions (create post, vote, etc.)

---

## CRITICAL RULES

1. **Branding First** - Get WONDER everywhere before moving to other fixes
2. **Test After Each Phase** - Don't wait until the end to test
3. **Commit Often** - Each logical chunk should be its own commit
4. **Don't Break Existing** - All working features must continue working
5. **Build Must Pass** - At the end, `npm run build` must succeed
6. **Verify Features** - Test the app, not just the code

---

## COMMIT MESSAGE EXAMPLES

### Phase 1 Commits:
```
feat: Rebrand app from Ponder/ARGUED to WONDER

- Update all metadata to reference WONDER
- Update landing page with WONDER branding
- Update auth pages with WONDER copy
- Update navigation and component branding
- Update documentation and config files
- Consistent branding across entire app

Branding assets:
- App name: WONDER
- Tagline: Explore Ideas Together
- All Ponder/ARGUED references → WONDER
```

### Phase 2 Commits:
```
fix: Add metadataBase and clean up warnings

- Add metadataBase to root layout for OG image sharing
- Remove console.log statements from production code
- Add .env.local example with NEXT_PUBLIC_APP_URL
- Create migration checklist for database
```

### Phase 3 Commits:
```
test: Verify protected routes and feature functionality

- Audit all protected routes for proper auth checks
- Verify discussion creation and comments
- Verify voting system on posts and comments
- Verify journal create/edit/publish
- Verify user profile editing
```

---

## DELIVERABLES

When complete, you should have:
1. ✅ All branding changed to WONDER
2. ✅ No console.log statements in production
3. ✅ metadataBase configured
4. ✅ Migration checklist created
5. ✅ All protected routes verified
6. ✅ All features tested and working
7. ✅ Build passes without errors
8. ✅ TypeScript passes without errors
9. ✅ App ready for production deployment

---

## QUESTIONS TO ASK IF STUCK

1. **Should I break this into multiple commits?** Yes - each logical fix gets its own commit
2. **What if I find a bug?** Fix it, document it in commit message, move on
3. **What if a test fails?** Debug and fix it before moving to next section
4. **Should I update documentation?** Yes - keep docs in sync with code
5. **What about database migrations?** Just verify they exist, don't modify them

---

## TIME ESTIMATES

- Phase 1 (Branding): 45-60 minutes
- Phase 2 (Bug Fixes): 20-30 minutes
- Phase 3 (Testing): 30-45 minutes
- Phase 4 (Build & Verify): 10-15 minutes

**Total: 2-2.5 hours if no major issues found**

---

## START HERE

1. Read this entire document first
2. Open `CLAUDE_FIXES_REQUIRED.md` for detailed reference
3. Start with Phase 1, Step 1.1
4. Work through systematically
5. Test frequently
6. Commit after each phase
7. Report back when complete

---

**You've got this. The app is close to production - just needs this cleanup and rebranding. Let's go!** 🚀
