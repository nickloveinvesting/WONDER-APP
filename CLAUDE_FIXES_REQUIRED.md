# CLAUDE CODE: Outstanding Fixes Required

## Priority: HIGH - All issues blocking production readiness

---

## 🎨 BRANDING OVERHAUL - CHANGE EVERYTHING TO "WONDER"

### Scope: Complete rebranding from "Ponder"/"ARGUED" to "WONDER"

**Files to update (complete list):**

1. **Metadata & Core Files**
   - `app/layout.tsx` - Update title/description metadata to "WONDER"
   - `package.json` - Update name and description
   - `README.md` - Update all references
   - `CLAUDE.md` - Update project overview and branding references

2. **Navigation & Layout Components**
   - `components/Navigation.tsx` - All brand references
   - `components/Sidebar.tsx` - Brand name references
   - `components/Logo.tsx` - Brand name references
   - `components/ui/Header.tsx` - Brand references in navigation

3. **Auth Pages**
   - `app/auth/login/LoginForm.tsx` - "Welcome to WONDER", subtitle updates
   - `app/auth/signup/page.tsx` - All signup copy, brand references
   - `app/auth/logout/page.tsx` - Logout messaging

4. **Public Pages**
   - `app/page.tsx` - Landing page: title, tagline, all copy
   - `app/about/page.tsx` - Complete rewrite with WONDER branding
   - `app/privacy/page.tsx` - Update references
   - `app/terms/page.tsx` - Update references

5. **Authenticated Pages**
   - `app/(authenticated)/home/page.tsx` - Welcome message, all copy
   - `app/(authenticated)/layout.tsx` - Any brand references
   - All other authenticated pages for consistency

6. **Components**
   - `components/DiscussionPreviewCard.tsx` - Any brand references
   - All UI component files for branding consistency

7. **Documentation & Config**
   - All `.md` files (DESIGN_SYSTEM.md, BRANDING_COMPLETE.md, etc.)
   - `tailwind.config.ts` - Update color naming if using "argued" classes
   - Environment example files

**Search Terms to Replace:**
- "Ponder" → "WONDER"
- "ARGUED" → "WONDER"
- "Ponder Together" → "Wonder Together" or appropriate tagline
- "Think Deeply Together" → Updated tagline for WONDER
- All instances in copy/UI text

**Tagline Suggestion:**
- "Explore Ideas Together" or "Wonder Together" or "Where Curious Minds Converge"

---

## 🐛 OUTSTANDING ISSUES TO FIX

### Issue 1: Supabase Edge Runtime Warnings
**Problem:** Warnings about Node.js APIs not supported in Edge Runtime
**Affected File:** `middleware.ts` imports
**Fix Required:**
- Suppress warnings if they don't affect functionality, OR
- Refactor imports to avoid Node.js APIs in middleware
- Add `@ts-expect-error` comments if intentional

**Impact:** Non-blocking but should be cleaned up before production

---

### Issue 2: Missing metadataBase in Root Layout
**Problem:** Build warning about missing `metadataBase` for social sharing (OG/Twitter images)
**Affected File:** `app/layout.tsx`
**Fix Required:**
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  // ... rest of metadata
}
```
**Steps:**
1. Add environment variable: `NEXT_PUBLIC_APP_URL` to `.env.local` example
2. Update `app/layout.tsx` with metadataBase
3. Ensure OG images exist in public folder or remove from metadata

---

### Issue 3: Database Migrations Not Verified
**Problem:** Need to ensure all migrations are applied in Supabase
**Affected:** `supabase/migrations/` directory
**Fix Required:**
1. List all migrations and verify they're needed
2. Create a MIGRATION_CHECKLIST.md with:
   - All migration files listed
   - Checkbox for each one confirming it's applied
   - Any dependencies between migrations
3. Document which migrations are critical vs optional

**Critical Migrations to Check:**
- User profiles table
- Debates/discussions tables
- Voting tables (snap_count, zap_count)
- Journal system tables
- Daily prompts system

---

### Issue 4: Discussion/Debate Features Incomplete
**Problem:** Some features appear incomplete or have placeholder UI
**Affected Files:**
- `app/(authenticated)/discuss/page.tsx`
- `app/(authenticated)/discuss/[id]/page.tsx`
- Discussion card components

**Fix Required:**
1. Audit actual vs expected functionality
2. Complete missing features or clearly mark as "coming soon"
3. Ensure all database queries are working
4. Test all CRUD operations (Create, Read, Update, Delete)

**Specific Areas:**
- Can users actually create discussions?
- Do comment threads work properly?
- Are steelman/steelwoman ratings implemented?
- Does voting on comments work?
- Are sorting/filtering options functional?

---

### Issue 5: Logging & Console Cleanup
**Problem:** Some console.log/console.error statements may remain in production code
**Affected:** Throughout codebase
**Fix Required:**
1. Search for remaining console statements in non-debug components
2. Remove all except intentional debug pages
3. Use error boundaries for exception handling instead

**Search Pattern:** `console\.(log|error|warn|debug)`

---

### Issue 6: TypeScript Strict Mode Verification
**Problem:** Ensure all TypeScript errors are resolved
**Affected:** All `.ts` and `.tsx` files
**Fix Required:**
1. Run full type check: `npx tsc --noEmit`
2. Resolve any remaining type errors
3. Update `tsconfig.json` if needed for strict mode

---

### Issue 7: Error Boundary Testing
**Problem:** Error boundaries added but may not cover all scenarios
**Affected:** `components/ErrorBoundary.tsx` and all authenticated pages
**Fix Required:**
1. Verify error boundaries are properly wrapping all critical sections
2. Test error states manually
3. Ensure fallback UI is user-friendly
4. Verify error logging for debugging

---

### Issue 8: Route Protection Verification
**Problem:** Need to verify all protected routes actually require authentication
**Affected:** `middleware.ts` and all protected pages
**Fix Required:**
1. Test unauthenticated access to each protected route
2. Verify redirect to `/auth/login` works
3. Test authenticated access works
4. Verify redirect loops don't occur

**Protected Routes to Test:**
- `/home` - Should require auth
- `/debates` - Should require auth
- `/debates/[id]` - Should require auth
- `/debates/create` - Should require auth
- `/journal` - Should require auth
- `/profile` - Should require auth
- `/settings` - Should require auth
- `/leaderboard` - Should require auth
- `/discuss` - Should require auth
- `/discuss/[id]` - Should require auth

---

## 📋 IMPLEMENTATION ORDER

### Phase 1: Branding (CRITICAL)
1. Update all metadata and metadata references
2. Update auth pages (most visible to new users)
3. Update landing page
4. Update navigation components
5. Search and replace remaining instances

### Phase 2: Bug Fixes (HIGH)
1. Fix metadataBase warning
2. Clean up console statements
3. Add migration checklist
4. Verify route protection

### Phase 3: Testing & Verification (MEDIUM)
1. Test error boundaries
2. Test discussion features
3. Run type check
4. Test protected routes
5. Test complete user flows

---

## 🧪 TESTING CHECKLIST

After all fixes, test these user journeys:

- [ ] **Unauthenticated User**
  - [ ] Can view landing page
  - [ ] Can view about/privacy/terms
  - [ ] Cannot access protected routes (redirected to login)
  - [ ] Can signup and login

- [ ] **Authenticated User**
  - [ ] Can access /home dashboard
  - [ ] Can create debate/discussion
  - [ ] Can view and vote on debates
  - [ ] Can create journal entries
  - [ ] Can publish journal to community
  - [ ] Can view leaderboard
  - [ ] Can edit profile (name/bio)
  - [ ] Can update settings
  - [ ] Can logout

- [ ] **Discussion Features**
  - [ ] Can post discussion
  - [ ] Can comment on discussions
  - [ ] Can rate comments (steelman/steelwoman)
  - [ ] Can view discussion threads properly

- [ ] **Voting System**
  - [ ] Can snap (upvote) posts
  - [ ] Can zap (downvote) posts
  - [ ] Vote counts update correctly
  - [ ] Can vote on comments

- [ ] **Error Handling**
  - [ ] Component errors don't crash app
  - [ ] Error boundary shows helpful message
  - [ ] Can recover from errors

---

## 📝 NOTES FOR CLAUDE CODE

1. **Branding is the PRIORITY** - Get WONDER into everything first
2. **Use find/replace wisely** - Be careful with "Ponder" (might be in class names, comments)
3. **Test the app** - After branding: `npm run dev` and test login/logout
4. **Check build** - Ensure `npm run build` still passes
5. **Commit regularly** - Each fix should be its own commit
6. **Don't break anything** - All existing features must continue working

---

## 🚀 SUCCESS CRITERIA

- ✅ All "Ponder"/"ARGUED" references changed to "WONDER"
- ✅ Branding is consistent across all pages
- ✅ Build passes without errors
- ✅ No console statements in production code
- ✅ metadataBase configured properly
- ✅ All protected routes require authentication
- ✅ Error boundaries functional
- ✅ TypeScript passes strict check
- ✅ All CRUD features work (debates, discussions, journal, voting)

---
