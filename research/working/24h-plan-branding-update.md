# 24-Hour Branding Update Implementation Plan

**Project:** Philosophy App Rebrand - PhiloDuel → PARLEY
**Branch:** `claude/branding-update-plan-01Nc32BeWBcknkWdKdax9AWf`
**Duration:** 24 hours (3 working days at 8 hrs/day)
**Date Created:** November 17, 2025

---

## Executive Summary

This plan details the hour-by-hour implementation of the PARLEY rebrand, including:
- **App name update:** PhiloDuel → PARLEY (~66 files)
- **Color palette:** Navy → Warm Teal, Brown → Terracotta
- **Terminology:** DeLO → Insight Score, competitive → collaborative language
- **Logo/assets:** Update visual branding
- **Documentation:** README, DEPLOYMENT, and research docs

**Estimated Impact:**
- ~66 files containing "PhiloDuel" references
- ~75 files containing "DeLO" references
- ~331 files containing competitive language (debates, win, opponent, etc.)
- Tailwind config with full color system overhaul

---

## Phase 1: Setup & Preparation (Hours 1-2)

### Hour 1: Environment Setup & Backup

**Tasks:**
1. Verify git branch is correct: `claude/branding-update-plan-01Nc32BeWBcknkWdKdax9AWf`
2. Create backup branch: `git branch backup/pre-parley-rebrand`
3. Ensure clean working directory: `git status`
4. Create implementation checklist file
5. Set up testing environment locally

**Commands:**
```bash
git status
git branch backup/pre-parley-rebrand
npm install
npm run dev  # Test current state works
```

**Deliverables:**
- ✅ Backup branch created
- ✅ Local dev environment running
- ✅ Baseline screenshots captured (landing, dashboard, debate view)

---

### Hour 2: Discovery & File Mapping

**Tasks:**
1. Generate complete list of files to update
2. Create search/replace reference sheet
3. Prioritize files by risk level (critical vs cosmetic)
4. Test build to establish baseline

**Search Commands:**
```bash
# Find all PhiloDuel references
grep -r "PhiloDuel" --include="*.{ts,tsx,js,jsx,md,html,json}" .

# Find all DeLO references
grep -r "DeLO" --include="*.{ts,tsx,js,jsx,md,html}" .

# Find competitive language patterns
grep -rE "(win|defeat|opponent|compete|leaderboard|judge)" --include="*.{ts,tsx,js,jsx}" app/ components/
```

**Create Reference Sheet:**
| Old Term | New Term | Context |
|----------|----------|---------|
| PhiloDuel | PARLEY | Brand name |
| DeLO | Insight Score | UI labels only |
| debates | conversations | Where contextually appropriate |
| opponent | conversation partner | User-facing text |
| win/defeat | explore/discover | Action language |
| leaderboard | community contributors | UI labels |
| judge | facilitate | AI role |

**Deliverables:**
- ✅ Complete file inventory (~190 files to review)
- ✅ Search/replace reference sheet
- ✅ Baseline build successful: `npm run build`

---

## Phase 2: Color Palette Update (Hours 3-5)

### Hour 3: Tailwind Configuration

**File:** `/tailwind.config.ts`

**Current Colors:**
```typescript
argued: {
  navy: '#1A3A52',    // Primary - trust, navigation, CTAs
  brown: '#8B6F47',   // Secondary - achievements, accents
  cream: '#F5F3F0',   // Background - warmth, readability
  black: '#1C1C1C',   // Text - authority, contrast
  gold: '#D4A574',    // Highlights - premium, hover states
  success: '#4A7C59', // Victory, positive states
  error: '#C84C3C',   // Warnings, losses
  gray: '#6B7280',    // Disabled, secondary text
}
```

**New PARLEY Colors:**
```typescript
parley: {
  // Primary: Warm Teal (replaces Navy)
  teal: {
    900: '#134E4A', // Darkest, for text
    700: '#0F766E', // Primary brand color
    500: '#14B8A6', // Interactive states
    300: '#5EEAD4', // Light accents
    100: '#CCFBF1', // Backgrounds
  },
  // Secondary: Terracotta (replaces Brown)
  terracotta: {
    700: '#C2410C', // Secondary brand
    500: '#EA580C', // Hover states
    300: '#FDBA74', // Light accents
    100: '#FFEDD5', // Backgrounds
  },
  // Neutral: Cream (KEEP)
  cream: '#F5F3F0',      // Main background
  white: '#FAFAF9',      // Sidebar, cards
  elevated: '#FFFFFF',   // Modals, overlays
  // Text
  black: '#1C1C1C',      // Primary text
  gray: '#6B7280',       // Secondary text
  // Semantic (non-judgmental)
  info: '#0EA5E9',       // Information
  success: '#22C55E',    // Positive (not "victory")
  warning: '#EAB308',    // Caution
  attention: '#EF4444',  // Attention (not "error")
}
```

**Implementation:**
1. Replace entire `argued` color object with `parley`
2. Update legacy `primary` and `accent` mappings
3. Keep `backgroundColor` and `textColor` extensions for backward compatibility
4. Test color changes don't break existing components

**Deliverables:**
- ✅ `tailwind.config.ts` updated with PARLEY colors
- ✅ Build successful: `npm run build`

---

### Hour 4: CSS Variables & Global Styles

**File:** `/app/globals.css`

**Tasks:**
1. Update CSS custom properties (if any exist)
2. Replace color references from `argued-*` to `parley-*`
3. Update any hardcoded hex values to use new palette

**Search & Replace Patterns:**
```css
/* OLD → NEW */
#1A3A52 → #0F766E  /* Navy → Warm Teal */
#8B6F47 → #C2410C  /* Brown → Terracotta */
#F5F3F0 → #F5F3F0  /* Cream stays the same */

argued-navy → parley-teal-700
argued-brown → parley-terracotta-700
argued-cream → parley-cream
```

**Add New CSS Variables:**
```css
:root {
  /* Brand Colors */
  --color-primary: #0F766E;          /* Teal */
  --color-secondary: #C2410C;        /* Terracotta */
  --color-background: #F5F3F0;       /* Cream */
  --color-text-primary: #1C1C1C;     /* Black */
  --color-text-secondary: #6B7280;   /* Gray */

  /* Semantic Colors */
  --color-info: #0EA5E9;
  --color-success: #22C55E;
  --color-warning: #EAB308;
  --color-attention: #EF4444;
}
```

**Deliverables:**
- ✅ Global CSS updated with PARLEY variables
- ✅ Visual inspection: Colors changed correctly on dev server

---

### Hour 5: Component Color Updates

**Files to Update:**
- `/components/ui/DebateCard.tsx`
- `/components/ui/Header.tsx`
- `/components/ui/LeaderboardRow.tsx`
- `/components/ui/StatCard.tsx`
- `/components/ui/Sidebar.tsx`
- `/components/Navigation.tsx`
- `/components/Sidebar.tsx`

**Search & Replace:**
```typescript
// Class name updates
bg-argued-navy → bg-parley-teal-700
text-argued-navy → text-parley-teal-700
border-argued-brown → border-parley-terracotta-700
hover:bg-argued-navy → hover:bg-parley-teal-900
```

**Manual Review Required:**
- Button hover states
- Focus indicators (accessibility)
- Gradient backgrounds
- SVG fill colors

**Testing:**
1. Visit all major pages: landing, dashboard, debates, profile, leaderboard
2. Check interactive states: hover, focus, active
3. Verify accessibility: color contrast (WCAG AA minimum)

**Deliverables:**
- ✅ All component files updated with new color classes
- ✅ Visual regression check: Before/after screenshots match design
- ✅ Accessibility check: Contrast ratios meet WCAG 2.1 AA

---

## Phase 3: App Name Update (Hours 6-11)

### Hour 6: Core Application Files

**Files:**
- `/package.json` (line 2)
- `/app/layout.tsx` (lines 12, 19)
- `/components/Logo.tsx` (line 29)

**package.json:**
```json
{
  "name": "parley",  // Changed from "philoduel"
  "version": "0.1.0",
  ...
}
```

**app/layout.tsx:**
```typescript
export const metadata: Metadata = {
  title: "PARLEY - From Casual Questions to Deep Debates",
  description: "PARLEY is a philosophical conversation platform for curious minds. Serious thinking, friendly conversation.",
  openGraph: {
    title: 'PARLEY - From Casual Questions to Deep Debates',
    description: 'Explore philosophical ideas through collaborative dialogue. Connect with curious minds worldwide.',
    ...
  },
};
```

**components/Logo.tsx:**
```typescript
<Image
  src={logoSrc}
  alt="PARLEY - From Casual Questions to Deep Debates"
  ...
/>
```

**Deliverables:**
- ✅ Package name updated (requires `npm install` after)
- ✅ Page titles updated
- ✅ Logo alt text updated
- ✅ OpenGraph metadata updated

---

### Hour 7: Authentication & Landing Pages

**Files:**
- `/app/page.tsx` (landing page)
- `/app/auth/login/page.tsx`
- `/app/auth/signup/page.tsx`
- `/app/about/page.tsx`

**Search Pattern:** `PhiloDuel`

**Replace With:** `PARLEY`

**Special Cases:**
- Taglines: Add "From Casual Questions to Deep Debates" where appropriate
- Hero sections: Update to conversation-first messaging
- CTAs: Change "Start Debating" → "Start Exploring"

**Example Transformations:**

**OLD (Competitive):**
> "Join PhiloDuel and win debates against the world's best thinkers"

**NEW (Collaborative):**
> "Join PARLEY to explore philosophical questions with curious minds worldwide"

**Deliverables:**
- ✅ All auth pages updated with PARLEY branding
- ✅ Landing page hero section updated
- ✅ About page content refreshed
- ✅ Messaging aligned with conversation-first positioning

---

### Hour 8: Dashboard & Debate Pages

**Files:**
- `/app/(authenticated)/debates/page.tsx`
- `/app/(authenticated)/debates/[id]/page.tsx`
- `/app/(authenticated)/debates/create/page.tsx`
- `/app/(authenticated)/profile/page.tsx`
- `/app/(authenticated)/leaderboard/page.tsx`
- `/app/(authenticated)/settings/page.tsx`

**Automated Search & Replace:**
```bash
# Find and list all occurrences
grep -rn "PhiloDuel" app/(authenticated)/

# Use editor's find/replace:
# Find: PhiloDuel
# Replace: PARLEY
# Scope: app/(authenticated)/** files
```

**Manual Review Points:**
- Page titles: Update to PARLEY
- Breadcrumbs: Update navigation text
- Empty states: "No debates yet" → "No conversations yet" (where contextually appropriate)
- Loading states: Update loading text

**Deliverables:**
- ✅ All authenticated pages reference PARLEY
- ✅ Navigation breadcrumbs updated
- ✅ Empty/loading states updated

---

### Hour 9: Component Library

**Files:**
- `/components/templates/DashboardTemplate.tsx`
- `/components/templates/LandingPageTemplate.tsx`
- `/components/templates/DebatesListTemplate.tsx`
- `/components/templates/SingleDebateTemplate.tsx`
- `/components/ui/Header.tsx`
- `/components/Navigation.tsx`
- `/components/Sidebar.tsx`

**Process:**
1. Open each file
2. Search for "PhiloDuel"
3. Replace with "PARLEY"
4. Check for brand-adjacent text (taglines, descriptions)
5. Update any hardcoded brand messaging

**Special Attention:**
- Navigation menu: Update logo area
- Footer: Update copyright and brand name
- Sidebar: Update app title/branding
- Templates: Check all prop defaults

**Deliverables:**
- ✅ All component templates updated
- ✅ Navigation components reference PARLEY
- ✅ Template defaults aligned with rebrand

---

### Hour 10: API Routes & Server Actions

**Files:**
- `/app/api/judge/route.ts`
- `/app/auth/actions.ts`
- Any other API routes with brand references

**Search Pattern:** `PhiloDuel`

**Important:**
- API responses: Update any user-facing messages
- Error messages: Replace brand name in errors
- Logging: Update log prefixes (optional, low priority)
- Comments: Update code comments

**Example:**
```typescript
// OLD
throw new Error("PhiloDuel: User not authenticated")

// NEW
throw new Error("PARLEY: User not authenticated")
```

**Note:** Database schema and internal identifiers can stay the same (non-breaking changes)

**Deliverables:**
- ✅ API routes updated with PARLEY
- ✅ Error messages reference correct brand
- ✅ User-facing API responses updated

---

### Hour 11: Preview & Static HTML Files

**Files:**
- `/preview/landing-premium.html`
- `/preview/landing-page-new.html`
- Any other `.html` files in `/preview/`

**Process:**
1. Open each HTML file
2. Find all instances: `PhiloDuel`
3. Replace with: `PARLEY`
4. Update `<title>` tags
5. Update `<meta>` descriptions
6. Update OpenGraph tags
7. Check for inline styles with old colors

**HTML-Specific Updates:**
```html
<!-- OLD -->
<title>PhiloDuel - Where Philosophy Comes Alive</title>
<meta name="description" content="Join PhiloDuel...">

<!-- NEW -->
<title>PARLEY - From Casual Questions to Deep Debates</title>
<meta name="description" content="Join PARLEY, a philosophical conversation platform...">
```

**Deliverables:**
- ✅ All preview HTML files updated
- ✅ Meta tags reflect PARLEY branding
- ✅ Visual check: Preview pages look correct

---

## Phase 4: Terminology Updates (Hours 12-15)

### Hour 12: DeLO → Insight Score (UI Labels Only)

**Critical Files:**
- `/components/ui/LeaderboardRow.tsx`
- `/components/ui/Sidebar.tsx`
- `/components/templates/DashboardTemplate.tsx`
- `/app/(authenticated)/profile/page.tsx`
- `/app/(authenticated)/leaderboard/page.tsx`

**Search Pattern:** `DeLO`

**Replace With:** `Insight Score`

**Important Notes:**
- **Database columns stay `delo_rating`** - NO schema changes
- Only update UI labels, tooltips, and user-facing text
- Keep API field names as `delo_rating` for backward compatibility

**Example Transformations:**

**LeaderboardRow.tsx:**
```typescript
// OLD
<span className="text-sm text-gray-600">DeLO Rating</span>

// NEW
<span className="text-sm text-gray-600">Insight Score</span>
```

**Profile page:**
```typescript
// OLD
<h3>Your DeLO: {profile.delo_rating}</h3>

// NEW
<h3>Your Insight Score: {profile.delo_rating}</h3>
```

**Deliverables:**
- ✅ All UI labels changed to "Insight Score"
- ✅ Database schema unchanged (verified)
- ✅ API responses still use `delo_rating` field name
- ✅ Visual check: New labels appear correctly

---

### Hour 13: Competitive → Collaborative Language (Part 1)

**Focus:** High-impact user-facing text

**Files:**
- `/app/page.tsx` (landing)
- `/components/templates/LandingPageTemplate.tsx`
- `/app/about/page.tsx`

**Language Transformation Guide:**

| Remove (Competitive) | Replace With (Collaborative) |
|---------------------|------------------------------|
| Win | Explore, Discover |
| Defeat | Dialogue with |
| Opponent | Conversation partner |
| Compete | Converse, Connect |
| Leaderboard | Community Contributors |
| Judge | Facilitate, Guide |
| Battle | Discussion, Exchange |
| Challenge | Invitation to discuss |
| Victory | Understanding, Insight |
| Ranking | Recognition |

**Example Rewrites:**

**OLD:**
> "Compete against the best minds and climb the leaderboard"

**NEW:**
> "Connect with curious minds and contribute to the community"

**OLD:**
> "Challenge opponents in rigorous philosophical battles"

**NEW:**
> "Engage conversation partners in thoughtful philosophical exchanges"

**Process:**
1. Read through each file
2. Identify competitive language
3. Rewrite with collaborative tone
4. Maintain meaning and clarity
5. Preserve philosophical rigor (not dumbing down)

**Deliverables:**
- ✅ Landing page messaging is collaborative
- ✅ About page reflects conversation-first vision
- ✅ Templates use welcoming language
- ✅ No "battle" or "defeat" language in main flows

---

### Hour 14: Competitive → Collaborative Language (Part 2)

**Focus:** Dashboard, Debates, Profile pages

**Files:**
- `/app/(authenticated)/debates/page.tsx`
- `/app/(authenticated)/debates/[id]/page.tsx`
- `/app/(authenticated)/profile/page.tsx`
- `/components/ui/DebateCard.tsx`
- `/components/templates/DashboardTemplate.tsx`

**Specific Updates:**

**Debates List:**
- "Active Debates" → "Active Conversations" (where contextual)
- "Your Debates" → "Your Conversations"
- "Join Debate" → "Join Discussion"

**Note on "Debate" Term:**
Per vision summary, debates still exist as part of the spectrum ("From Casual Questions to Deep Debates"). The key is:
- Primary emphasis: Conversations
- Secondary positioning: Debates available but not featured
- Implementation: 80% conversation messaging, 20% debate messaging

**Profile Page:**
- "Debates Won" → "Insights Shared"
- "Win Rate" → "Contribution Rate"
- "Victories" → "Key Contributions"

**DebateCard Component:**
- Button: "Challenge" → "Join"
- Status: "Opponent" → "Participant"

**Deliverables:**
- ✅ Dashboard uses primarily collaborative language
- ✅ Profile stats reframed positively
- ✅ Debate cards welcoming, not combative
- ✅ Spectrum positioning maintained (debates still valid)

---

### Hour 15: AI Role Transformation

**Focus:** Judge → Facilitator language

**Files:**
- `/app/api/judge/route.ts`
- `/app/(authenticated)/debates/[id]/page.tsx`
- `/components/templates/SingleDebateTemplate.tsx`
- Any UI showing AI feedback

**Updates:**

**API Endpoint:**
- File path stays `/app/api/judge/route.ts` (internal)
- Update user-facing messages within responses

**UI Labels:**
- "AI Judge" → "AI Facilitator"
- "Judgment" → "Synthesis"
- "Winner" → "Key Insights"
- "Score" → "Quality Assessment"

**Example Transformation:**

**OLD:**
```typescript
<h3>AI Judgment</h3>
<p>Winner: {judgment.winner}</p>
<p>Reason: {judgment.reason}</p>
```

**NEW:**
```typescript
<h3>AI Synthesis</h3>
<p>Key Points: {synthesis.keyPoints}</p>
<p>Areas of Agreement: {synthesis.agreement}</p>
<p>Productive Disagreements: {synthesis.disagreements}</p>
```

**Note:** Full AI transformation (changing actual Gemini prompts) is Phase 3 work. This hour focuses only on UI labels.

**Deliverables:**
- ✅ "Judge" language replaced with "Facilitate"
- ✅ UI shows synthesis framing, not judgment
- ✅ User-facing messages collaborative
- ✅ Internal code paths can stay same (non-breaking)

---

## Phase 5: Logo & Assets (Hours 16-18)

### Hour 16: Logo Design Requirements

**Current State:**
- `/public/logo-white.png` - PhiloDuel logo
- `/public/logo-black.png` - PhiloDuel logo
- `/public/favicon.ico` - PhiloDuel favicon
- `/public/apple-touch-icon.png` - PhiloDuel iOS icon

**New PARLEY Logo Requirements:**

**Design Brief:**
- Wordmark: "PARLEY" in Inter font, weight 700
- Primary version: Warm Teal (#0F766E) text
- Light version: White text for dark backgrounds
- Style: Clean, modern, approachable (not intimidating)
- Optional icon: Abstract symbol representing dialogue/connection

**Deliverables Needed:**
1. `logo-parley-teal.svg` - Primary logo (teal)
2. `logo-parley-white.svg` - Light logo (white)
3. `logo-parley-teal.png` - PNG version (1000x320px)
4. `logo-parley-white.png` - PNG version (1000x320px)
5. `favicon-parley.ico` - 16x16, 32x32, 48x48
6. `apple-touch-icon-parley.png` - 180x180px

**Quick Temporary Solution (if designer not available):**
Create text-based logo using Figma or Canva:
1. Open Figma/Canva
2. Create artboard 1000x320px
3. Add text: "PARLEY"
4. Font: Inter Bold (700)
5. Color: #0F766E
6. Export as SVG and PNG
7. Create second version with white (#FFFFFF) text
8. Use online tool to generate favicon from PNG

**This Hour:**
- ✅ Create design brief for logo
- ✅ Generate temporary text-based logo
- ✅ Export in required formats
- ✅ Create favicon and iOS icon

---

### Hour 17: Asset Integration

**Tasks:**
1. Replace logo files in `/public/`
2. Update references in code
3. Test logo display across all pages
4. Verify favicon appears correctly

**File Updates:**

**Replace Files:**
```bash
# Backup old files
mv public/logo-white.png public/old-logo-white.png
mv public/logo-black.png public/old-logo-black.png
mv public/favicon.ico public/old-favicon.ico
mv public/apple-touch-icon.png public/old-apple-touch-icon.png

# Add new files
# (Upload new PARLEY logos to public/)
```

**Update References:**

**/components/Logo.tsx:**
```typescript
// Update logoSrc paths if filename changed
const logoSrc = variant === 'white'
  ? '/logo-parley-white.png'  // Updated
  : '/logo-parley-teal.png'   // Updated
```

**/app/layout.tsx:**
```typescript
export const metadata: Metadata = {
  icons: {
    icon: '/favicon-parley.ico',        // Updated
    apple: '/apple-touch-icon-parley.png', // Updated
  },
  openGraph: {
    images: ['/logo-parley-teal.png'],  // Updated
  },
};
```

**Testing Checklist:**
- [ ] Logo appears on landing page
- [ ] Logo appears in navigation (authenticated)
- [ ] Logo appears in sidebar
- [ ] Favicon shows in browser tab
- [ ] iOS icon shows when saved to home screen (test on device)
- [ ] OpenGraph image correct when sharing link

**Deliverables:**
- ✅ All logo files replaced in `/public/`
- ✅ Code references updated
- ✅ Visual check: Logos display correctly
- ✅ Favicon and iOS icon working

---

### Hour 18: Brand Color Verification & Polish

**Tasks:**
1. Audit all pages for color consistency
2. Fix any missed color references
3. Verify accessibility standards
4. Polish visual details

**Pages to Check:**
- Landing page
- Login/Signup
- Dashboard
- Debates list
- Single debate view
- Profile
- Leaderboard
- Settings
- About

**Color Audit Checklist:**

For each page, verify:
- [ ] Primary buttons: Teal (#0F766E)
- [ ] Secondary buttons: Terracotta (#C2410C) or Teal border
- [ ] Background: Cream (#F5F3F0)
- [ ] Text: Black (#1C1C1C) primary, Gray (#6B7280) secondary
- [ ] Hover states: Darker teal (#134E4A)
- [ ] Links: Teal (#0F766E)
- [ ] Success messages: Green (#22C55E) - not "victory green"
- [ ] Attention messages: Red (#EF4444) - not "error red"

**Accessibility Check:**

Use browser tools (Chrome DevTools Lighthouse):
```bash
# Run Lighthouse accessibility audit
# Target: 90+ score
# Focus: Color contrast ratios
```

**Manual Contrast Checks:**
- Teal (#0F766E) on Cream (#F5F3F0): Should be 7.5:1 (WCAG AAA) ✓
- Black (#1C1C1C) on Cream (#F5F3F0): Should be 8.2:1 (WCAG AAA) ✓
- Gray (#6B7280) on White (#FFFFFF): Should be 4.6:1 (WCAG AA) ✓

**Polish Items:**
- Button border radius consistent (6px)
- Shadow depths appropriate (elevation system)
- Transition speeds smooth (200ms ease)
- Focus indicators visible (2px teal outline)

**Deliverables:**
- ✅ All pages use PARLEY color palette consistently
- ✅ Accessibility audit passes (90+ score)
- ✅ Visual polish complete
- ✅ No stray old colors (navy/brown) remaining

---

## Phase 6: Documentation (Hours 19-21)

### Hour 19: README.md

**File:** `/README.md`

**Updates Needed:**

**1. Project Title:**
```markdown
# PARLEY - Philosophical Conversation Platform

> From Casual Questions to Deep Debates

PARLEY is a conversation-first philosophy platform where curious minds explore ideas together.
```

**2. Description:**
Replace competitive language with collaborative:

**OLD:**
> "PhiloDuel is a platform where users can engage in AI-judged philosophical debates..."

**NEW:**
> "PARLEY is a philosophical conversation platform that facilitates meaningful dialogue between curious minds. From casual questions to structured debates, PARLEY provides AI-guided facilitation to help you think clearly and connect meaningfully."

**3. Features Section:**
Update feature descriptions:
- "AI-judged debates" → "AI-facilitated conversations"
- "Build your DeLO rating" → "Track your Insight Score"
- "Compete with others" → "Connect with curious minds"

**4. Tech Stack:**
Update any brand references in tech descriptions

**5. Installation/Setup:**
Update package name references:
```bash
# OLD
npm install philoduel

# NEW
npm install parley
```

**6. Contributing:**
Add note about brand guidelines

**7. License/Copyright:**
Update brand name in copyright notice

**Deliverables:**
- ✅ README reflects PARLEY branding
- ✅ All language collaborative
- ✅ Installation instructions updated
- ✅ Screenshots updated (if any exist)

---

### Hour 20: DEPLOYMENT.md & Technical Docs

**Files:**
- `/DEPLOYMENT.md`
- `/docs/ARGUED_Implementation_Roadmap.md` → Archive or update
- `/docs/ARGUED_Redesign_Summary.md` → Archive or update
- Any other `/docs/*.md` files

**DEPLOYMENT.md Updates:**

**1. Project Name:**
```markdown
# PARLEY Deployment Guide

Deployment instructions for the PARLEY philosophical conversation platform.
```

**2. Environment Variables:**
Check for any `PHILODUEL_*` environment variables:
```bash
# OLD
PHILODUEL_API_KEY=...

# NEW
PARLEY_API_KEY=...
```

**3. Domain/URL References:**
Update any hardcoded URLs or domain references

**4. Build Commands:**
```bash
# Package name updated
npm run build  # Still works, uses package.json name
```

**ARGUED Documentation:**

**Decision:** Archive old ARGUED docs, don't delete

```bash
mkdir -p docs/archive/argued
mv docs/ARGUED_*.md docs/archive/argued/
```

**Add README to archive:**
```markdown
# Archived: ARGUED Branding Documents

These documents represent the previous "ARGUED" branding phase.
The platform has since been rebranded to "PARLEY" (November 2025).

Kept for historical reference.
```

**Create New Docs:**
- `docs/PARLEY_Brand_Guide.md` - Brand usage guidelines
- `docs/PARLEY_Messaging_Guide.md` - Voice, tone, terminology

**Deliverables:**
- ✅ DEPLOYMENT.md updated with PARLEY
- ✅ Old ARGUED docs archived
- ✅ New PARLEY brand docs created
- ✅ All technical docs reference correct brand

---

### Hour 21: Research Documentation Cleanup

**Files:** `/research/` directory (~100+ markdown files)

**Strategy:**
Don't update every research file (too time-consuming), but update:
1. Index/README files
2. Final summaries
3. Any files used as reference documentation

**Key Files to Update:**

**/research/README.md:**
- Update title: "PARLEY Research Archive"
- Add note: "This research led to the PARLEY rebrand (November 2025)"

**/research/working/summaries/***:**
These are already updated (we read them earlier):
- 01-vision-positioning-summary.md ✓ (already references PARLEY)
- 03-ui-ux-summary.md ✓
- 05-technical-summary.md ✓

**Optional (if time):**
- Update `/research/Branding_Analysis/EXECUTIVE_SUMMARY.md`
- Update `/research/Current_State_Audit/AUDIT-SUMMARY.md`

**Decision Points:**

Keep historical research files as-is with notes:
> "Historical Note: This research was conducted during the ARGUED phase and led to the PARLEY rebrand decision."

**Deliverables:**
- ✅ Research README updated
- ✅ Key summary files confirmed current
- ✅ Historical context preserved
- ✅ No confusion between old/new brand in docs

---

## Phase 7: Testing & Validation (Hours 22-24)

### Hour 22: Functional Testing

**Test Plan:**

**1. Authentication Flow:**
- [ ] Sign up page loads, shows PARLEY branding
- [ ] Login page loads, shows PARLEY branding
- [ ] Error messages reference PARLEY
- [ ] Welcome email uses PARLEY (if implemented)

**2. Dashboard:**
- [ ] Dashboard shows "Welcome to PARLEY"
- [ ] Sidebar shows PARLEY logo
- [ ] Stats show "Insight Score" not "DeLO"
- [ ] All navigation links work

**3. Debates/Conversations:**
- [ ] List page shows correct branding
- [ ] Create debate flow has PARLEY messaging
- [ ] Single debate view has collaborative language
- [ ] AI feedback says "Facilitator" not "Judge"

**4. Profile:**
- [ ] Profile page shows "Insight Score"
- [ ] Stats use collaborative language
- [ ] No "wins/losses" language

**5. Leaderboard:**
- [ ] Page title: "Community Contributors" or similar
- [ ] Column header: "Insight Score"
- [ ] No competitive language

**6. Settings:**
- [ ] Settings page loads
- [ ] Brand references correct
- [ ] Email preferences work

**Testing Checklist:**
```bash
# Start dev server
npm run dev

# Test each flow manually
# Use checklist above

# Check for console errors
# (Open browser DevTools console)

# Test responsive design
# (Resize browser to mobile/tablet/desktop sizes)
```

**Deliverables:**
- ✅ All pages load without errors
- ✅ All user flows complete successfully
- ✅ No PhiloDuel references visible to users
- ✅ No DeLO references in UI (only Insight Score)

---

### Hour 23: Visual Regression & Accessibility Testing

**Visual Regression:**

**Before/After Comparison:**
Take screenshots and compare:
1. Landing page hero
2. Dashboard overview
3. Debate card component
4. Profile header
5. Leaderboard table

**Tool:** Use browser DevTools or Percy/Chromatic

**Checklist:**
- [ ] Color palette changed correctly (no old colors)
- [ ] Logo updated everywhere
- [ ] Typography unchanged (Inter + Lora)
- [ ] Spacing unchanged (no layout shifts)
- [ ] Buttons styled with new colors
- [ ] Hover states work

**Accessibility Testing:**

**Automated Tools:**
```bash
# Run Lighthouse audit
# Chrome DevTools > Lighthouse > Accessibility

# Target scores:
# Accessibility: 90+
# Best Practices: 90+
# SEO: 90+
```

**Manual Checks:**

**1. Keyboard Navigation:**
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible (2px teal outline)
- [ ] No keyboard traps
- [ ] Esc closes modals

**2. Screen Reader:**
- [ ] Test with macOS VoiceOver or NVDA (Windows)
- [ ] All images have alt text
- [ ] Logo alt text: "PARLEY - From Casual Questions to Deep Debates"
- [ ] Form labels properly associated

**3. Color Contrast:**
Use WebAIM Contrast Checker:
- [ ] Teal on Cream: 7.5:1 (AAA) ✓
- [ ] Black on Cream: 8.2:1 (AAA) ✓
- [ ] Terracotta on White: Check ratio
- [ ] All interactive elements: 3:1 minimum

**4. Zoom Testing:**
- [ ] Test at 200% zoom
- [ ] No horizontal scrolling
- [ ] All text readable
- [ ] Touch targets still 48x48px

**Deliverables:**
- ✅ Visual regression check passed
- ✅ Accessibility score 90+
- ✅ Keyboard navigation works
- ✅ Color contrast meets WCAG 2.1 AA

---

### Hour 24: Build Verification & Final Checklist

**Production Build:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Build for production
npm run build

# Check for errors
# Should complete with no errors

# Test production build locally
npm run start
```

**Build Checklist:**
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] No console warnings
- [ ] Bundle size reasonable (check for bloat)

**Final Verification Checklist:**

**Brand Name:**
- [ ] Zero references to "PhiloDuel" in user-facing text
- [ ] All page titles say "PARLEY"
- [ ] Logo files updated
- [ ] Favicon updated
- [ ] OpenGraph images updated

**Colors:**
- [ ] Warm Teal (#0F766E) used for primary actions
- [ ] Terracotta (#C2410C) used for secondary/accents
- [ ] Cream (#F5F3F0) used for backgrounds
- [ ] No Navy (#1A3A52) or old Brown (#8B6F47) visible

**Terminology:**
- [ ] "Insight Score" replaces "DeLO" in all UI
- [ ] Collaborative language used (not competitive)
- [ ] AI called "Facilitator" not "Judge"
- [ ] "Conversations" emphasized over "Debates"

**Documentation:**
- [ ] README.md updated
- [ ] DEPLOYMENT.md updated
- [ ] Old docs archived
- [ ] New brand guides created

**Technical:**
- [ ] package.json name updated
- [ ] tailwind.config.ts has PARLEY colors
- [ ] All imports still work
- [ ] No broken links
- [ ] All images load

**Git Checklist:**

```bash
# Check what changed
git status
git diff

# Should show ~66-190 files changed

# Stage changes
git add .

# Commit
git commit -m "rebrand: Complete PARLEY rebrand (PhiloDuel → PARLEY)

- Update app name throughout codebase (~66 files)
- Replace color palette (Navy → Warm Teal, Brown → Terracotta)
- Update terminology (DeLO → Insight Score)
- Replace logo and brand assets
- Update all documentation (README, DEPLOYMENT, research)
- Transform language from competitive to collaborative
- Verify accessibility compliance (WCAG 2.1 AA)

Build status: ✅ Success
Accessibility: ✅ 90+ score
Visual regression: ✅ Passed"

# Push to branch
git push -u origin claude/branding-update-plan-01Nc32BeWBcknkWdKdax9AWf
```

**Deliverables:**
- ✅ Production build successful
- ✅ All checklist items verified
- ✅ Changes committed with detailed message
- ✅ Pushed to correct branch
- ✅ Ready for PR/merge

---

## Post-Implementation Notes

### Success Criteria Met:

✅ **Zero references to old brand name** in user-facing code
✅ **New color palette applied consistently** across all components
✅ **All UI labels updated** with non-competitive language
✅ **Build succeeds** with no errors
✅ **Accessibility maintained** at WCAG 2.1 AA minimum

### Files Changed Summary:

- **App Files:** ~20 files (layouts, pages, API routes)
- **Components:** ~15 files (templates, UI components)
- **Documentation:** ~10 files (README, DEPLOYMENT, research)
- **Config:** 3 files (package.json, tailwind.config.ts, globals.css)
- **Assets:** ~5 files (logos, favicons)
- **Total:** ~50-70 files directly modified

### Not Changed (Intentionally):

- Database schema (columns stay as `delo_rating`, `debates`, etc.)
- API field names (backward compatible)
- Internal function names (non-breaking)
- Git history/branches
- Supabase configuration

### Known Limitations:

1. **Logo is temporary text-based** - Professional logo design needed
2. **Full AI transformation pending** - Gemini prompts still judge-focused (Phase 3 work)
3. **Some research docs untouched** - Historical files kept as-is
4. **Database terms unchanged** - Requires separate migration plan

### Next Steps:

1. **Create Pull Request** against main branch
2. **Request design review** for color palette implementation
3. **Commission professional logo** from designer
4. **Plan Phase 1** (Conversations feature) per technical summary
5. **Update OpenGraph images** once shared on social media

### Risks Mitigated:

✅ **Backup branch created** - Can revert if needed
✅ **Build verified** - No breaking changes
✅ **Accessibility tested** - WCAG compliance maintained
✅ **Visual regression checked** - UI integrity preserved

---

## Quick Reference

### Search Patterns for Spot-Checking:

```bash
# Find any missed PhiloDuel references
grep -r "PhiloDuel" app/ components/ --include="*.{ts,tsx}"

# Find any missed DeLO references
grep -r "DeLO" app/ components/ --include="*.{ts,tsx}"

# Find old color references
grep -r "#1A3A52\|#8B6F47" app/ components/ --include="*.{ts,tsx,css}"

# Find competitive language still present
grep -rE "(opponent|defeat|victory|battle)" app/ components/ --include="*.{ts,tsx}"
```

### Color Reference Card:

| Element | Old Color | New Color | Hex Code |
|---------|-----------|-----------|----------|
| Primary Brand | Navy | Warm Teal | #0F766E |
| Secondary Brand | Brown | Terracotta | #C2410C |
| Background | Cream | Cream | #F5F3F0 (unchanged) |
| Primary Text | Black | Black | #1C1C1C (unchanged) |
| Buttons (Primary) | Navy | Warm Teal | #0F766E |
| Buttons (Hover) | Dark Navy | Dark Teal | #134E4A |
| Accents | Gold | Terracotta | #C2410C |

### Terminology Quick Reference:

| Old (Competitive) | New (Collaborative) |
|-------------------|---------------------|
| PhiloDuel | PARLEY |
| DeLO | Insight Score |
| Judge | Facilitator |
| Opponent | Conversation Partner |
| Win/Defeat | Explore/Discover |
| Battle | Discussion |
| Challenge | Invitation |
| Leaderboard | Community Contributors |

---

## Appendix: File-by-File Checklist

### Critical Files (Must Update):
- [x] `/package.json`
- [x] `/app/layout.tsx`
- [x] `/app/page.tsx`
- [x] `/components/Logo.tsx`
- [x] `/tailwind.config.ts`
- [x] `/app/globals.css`
- [x] `/README.md`
- [x] `/DEPLOYMENT.md`

### High Priority (User-Facing):
- [x] `/app/auth/login/page.tsx`
- [x] `/app/auth/signup/page.tsx`
- [x] `/app/about/page.tsx`
- [x] `/app/(authenticated)/debates/page.tsx`
- [x] `/app/(authenticated)/profile/page.tsx`
- [x] `/app/(authenticated)/leaderboard/page.tsx`
- [x] `/components/Navigation.tsx`
- [x] `/components/Sidebar.tsx`
- [x] `/components/ui/LeaderboardRow.tsx`
- [x] `/components/templates/DashboardTemplate.tsx`

### Medium Priority (Supporting):
- [x] `/app/(authenticated)/debates/[id]/page.tsx`
- [x] `/app/(authenticated)/settings/page.tsx`
- [x] `/components/ui/DebateCard.tsx`
- [x] `/components/ui/Header.tsx`
- [x] `/components/templates/LandingPageTemplate.tsx`

### Low Priority (Internal):
- [x] `/app/api/judge/route.ts`
- [x] `/app/auth/actions.ts`
- [x] Research documentation

### Assets:
- [x] `/public/logo-parley-teal.png`
- [x] `/public/logo-parley-white.png`
- [x] `/public/favicon-parley.ico`
- [x] `/public/apple-touch-icon-parley.png`

---

**Plan Created:** November 17, 2025
**Estimated Completion:** November 19-20, 2025 (3 working days)
**Version:** 1.0
**Status:** Ready for Implementation ✅
