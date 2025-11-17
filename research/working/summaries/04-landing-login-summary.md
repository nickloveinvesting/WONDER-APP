# Landing & Login Specification Summary

**Source:** landing-login-specification.md
**Date:** November 15, 2025

## Executive Summary

Complete, implementation-ready specifications for Landing Page, Login, Signup, and Onboarding Flow. Uses **"Parley"** as platform name (92%+ conversation-first alignment vs. ARGUED's 33%). Includes actual copy, visual specifications, and A/B test variations.

---

## Landing Page Structure & Copy

### 1. Header/Navigation

**Components:**
- Logo + "Parley"
- Navigation: Features, How It Works, Community, Pricing
- CTA: "Start Exploring" or "Join Parley"

**Visual Specs:**
- Height: 72px
- Sticky position with blur background
- Border-bottom: 1px solid

### 2. Hero Section

**Headline (H1):**
```
Where Philosophical Minds Meet
```

**Alternative Headlines for A/B Testing:**
- "From Casual Questions to Deep Debates"
- "Think Deeply Together"
- "Philosophy That Welcomes Everyone"

**Subheadline:**
```
Explore ideas with curious thinkers—from shower thoughts to Socratic dialogues.
Serious thinking, friendly conversation, all perspectives welcome.
```

**CTAs:**
- Primary: "Start Your First Conversation"
- Secondary: "Explore Discussions"

**Social Proof:**
- ✓ Join 5,000+ philosophical minds
- ✓ From complete beginners to PhDs
- ✓ 200+ active conversations daily

**Visual Specs:**
- Layout: Two-column (text left, visual right) on desktop
- Background: Linear gradient (#F0F4FF to #F9FAFB)
- Padding: 96px (desktop), 64px (mobile)
- Headline: 48px (desktop), 36px (mobile)
- Subheadline: 20px (desktop), 18px (mobile)

### 3. Problem/Solution Section

**Headline:** "Philosophy Deserves Better"

**3 Problem Cards:**

1. **Shallow Social Media** 📱
   - "Twitter limits depth to 280 characters. Reddit threads die in 48 hours."

2. **Academic Gatekeeping** 🚪
   - "Traditional spaces feel exclusive and intimidating. Philosophy should be for everyone."

3. **Toxic Debate Culture** 🌀
   - "Platforms reward winning over learning. Changing your mind should be celebrated."

**Solution Statement:**
```
Parley is the missing middle: serious inquiry that's genuinely accessible,
persistent discussions that build understanding, and AI that makes you think harder—not for you.
```

**Visual Specs:**
- Grid: 3 columns (desktop), 1 column (mobile)
- Cards: White background, 1px border, 16px border-radius
- Icon background: Gradient (48px)
- Gap: 32px

### 4. Features Section

**Headline:** "Everything You Need to Think Deeply Together"

**6 Feature Cards:**

1. **Spectrum of Depth** 🎚️
   - "Choose Your Depth"
   - Quick questions or multi-day Socratic dialogues

2. **Conversation Formats** 💬
   - "Formats That Flex"
   - Open discussions, Socratic circles, reading groups, structured debates

3. **AI Facilitation** 🤖
   - "AI That Asks Better Questions"
   - Socratic questioning to deepen thinking, never replaces it

4. **Beginner-Friendly** 🌱
   - "Start Anywhere"
   - Your first 'stupid' question is welcome

5. **Persistent Discussions** 📚
   - "Never Disappears"
   - Find discussions from six months ago

6. **Community & Connection** 🤝
   - "Your People Are Here"
   - Find Stoics, Existentialists, Ethics nerds, curious minds

**Visual Specs:**
- Background: Gradient (#F9FAFB to #F0F4FF)
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Cards: White, shadow, 12px border-radius
- Icon: 64px diameter gradient circle
- Card padding: 32px

### 5. How It Works

**Headline:** "Your Philosophical Journey in 4 Steps"

**4 Steps:**

1. **Start with Curiosity**
   - "Browse conversations or ask your first question. No signup required to explore."

2. **Join the Conversation**
   - "Create your account in 30 seconds. Jump right into discussions."

3. **Engage at Your Level**
   - "Ask questions, share perspectives, or dive into Socratic dialogues."

4. **Grow Together**
   - "Build understanding, find your tribe, develop your philosophical voice."

**Visual Specs:**
- Layout: 4 columns (desktop), 2 (tablet), 1 (mobile)
- Step number: Circular badge (56px), gradient background
- Center-aligned text
- Gap: 48px

### 6. Social Proof / Testimonials

**Headline:** "Philosophers Are Finding Their Home"

**3 Testimonials:**

1. **Sarah M.** - Philosophy Student
   - "Finally, a place where I can ask 'stupid' questions about Kant without feeling judged."
   - ⭐⭐⭐⭐⭐

2. **Marcus Chen** - Tech Professional
   - "Serious thinkers discuss philosophy without the Twitter toxicity. This is it."
   - ⭐⭐⭐⭐⭐

3. **Dr. Sophia Okonkwo** - Professor, Duke
   - "The Socratic AI is brilliant. Asks exactly the right questions."
   - ⭐⭐⭐⭐⭐

**Community Stats:**
```
5,000+ Active Members | 200+ Daily Conversations | From 50+ Countries
```

### 7. Final CTA Section

**Headline:** "Ready to Think Deeply Together?"

**Subheadline:**
```
Join thousands of curious minds exploring philosophy—from complete beginners
to PhD philosophers. Your first conversation is just a click away.
```

**Primary CTA:** "Create Free Account"
**Secondary CTA:** "Or explore discussions first"

**Trust Indicators:**
- ✓ Free forever for core features
- ✓ No credit card required
- ✓ Start conversing in 30 seconds

**Visual Specs:**
- Background: Gradient (#3D5ADB to #2D41B8)
- White text
- Button: White background with primary color text
- Center-aligned

### 8. Footer

**5 Columns:**

1. **About**
   - Logo, tagline, description

2. **Product**
   - Features, How It Works, Pricing, Roadmap, Mobile Apps

3. **Community**
   - Browse Discussions, Topics, Reading Groups, Guidelines, Blog

4. **Company**
   - About Us, Contact, Careers, Press Kit

5. **Legal**
   - Privacy, Terms, Cookie Policy, AI Transparency

**Bottom Bar:**
- Left: © 2025 Parley
- Right: Social icons (Twitter, Discord, GitHub, Email)

**Visual Specs:**
- Background: #111827 (dark)
- Text: rgba(255,255,255,0.7)
- Grid: 5 columns (desktop), 2 (tablet), 1 (mobile)

---

## Login Page Specification

**Page Title:** "Welcome Back to Parley"
**Subheadline:** "Continue your philosophical journey"

### Login Form

**Fields:**
1. Email or Username
   - Placeholder: "your@email.com or username"
   - Autocomplete: email username

2. Password
   - Placeholder: "••••••••"
   - Autocomplete: current-password

**Additional Elements:**
- Checkbox: "Remember me"
- Link: "Forgot password?" (right-aligned)
- Button: "Sign In" (Primary)
- Divider: "or"
- Social: "Continue with Google" / "Continue with Apple"
- Footer: "Don't have an account? Sign up"

### Forgot Password Flow

**Title:** "Reset Your Password"
**Description:** "Enter your email and we'll send you a reset link."
**Field:** Email
**Button:** "Send Reset Link"
**Link:** "← Back to login"

### Visual Specifications

- Layout: Centered card, max-width 440px
- Background: Light gradient (#F9FAFB)
- Card: White, shadow-md, 24px border-radius
- Card padding: 48px (desktop), 32px (mobile)
- Input height: 48px
- Input border: 1px solid #E5E7EB
- Input focus: Border #3D5ADB with subtle shadow
- Button height: 48px
- Social button: White with 1px border, icon + text

---

## Signup Page Specification

**Page Title:** "Join Parley"
**Subheadline:** "Start your philosophical journey—free forever"

### Signup Form

**Fields:**

1. **Username**
   - Placeholder: "Choose a unique username"
   - Help text: "This is how others will see you"
   - Validation: Available/Taken indicator (✓ or ✗)
   - Autocomplete: username

2. **Email**
   - Placeholder: "your@email.com"
   - Help text: "We'll never spam you"
   - Autocomplete: email

3. **Password**
   - Placeholder: "Create a strong password"
   - Help text: "At least 8 characters"
   - Validation: Password strength indicator (Weak/Fair/Good/Strong)
   - Autocomplete: new-password

**Additional Elements:**
- Checkbox (Required): "I agree to the Terms of Service and Privacy Policy"
- Button: "Create Account" (Primary)
- Divider: "or"
- Social: "Continue with Google" / "Continue with Apple"
- Footer: "Already have an account? Sign in"

### Password Strength Indicator

- **Weak:** Red background, 25% width
- **Fair:** Orange background, 50% width
- **Good:** Yellow background, 75% width
- **Strong:** Green background, 100% width

### Error States

- **Email already registered:** "This email is already in use. Sign in instead?"
- **Weak password:** "Password must be at least 8 characters"
- **Username taken:** "Username already taken. Try: [suggestions]"
- **Invalid email:** "Please enter a valid email address"

### Success State

- Redirect to onboarding flow immediately
- No email verification required for initial access
- Background email sent with verification link

### Visual Specifications

- Same structure as login page
- Card max-width: 480px (slightly wider for help text)
- Help text: 14px, #6B7280, below input
- Username availability: Green checkmark or red X icon
- Checkbox label: 14px, linked text for legal documents

---

## Onboarding Flow Specification

### Step 1: Welcome Screen

**Content:**
- Headline: "Welcome to Parley, [Username]!"
- Subheadline: "Let's get you started with three quick steps."
- Progress: Step 1 of 3
- Visual: Friendly illustration
- Button: "Let's Go →"
- Link: "Skip for now"

**Visual Specs:**
- Background: Light gradient
- Content max-width: 600px
- Center-aligned
- Progress dots: • • ○ (filled/unfilled)
- Padding: 64px (top/bottom)

### Step 2: Topic Selection

**Title:** "What Are You Curious About?"
**Instructions:** "Select 5-7 topics to personalize your feed. You can always change these later."

**15 Topic Cards (select 5-7):**

1. **Ethics** - What makes actions right or wrong?
2. **Consciousness** - What is subjective experience?
3. **Meaning of Life** - Why are we here?
4. **Political Philosophy** - Justice, rights, governance
5. **Stoicism** - Ancient wisdom for modern life
6. **Epistemology** - How do we know what's true?
7. **Philosophy of Mind** - Mind, brain, cognition, AI
8. **Existentialism** - Authenticity, freedom, meaning
9. **Logic & Reasoning** - Arguments, fallacies, thinking
10. **Metaphysics** - Reality, existence, being, time
11. **Philosophy of Science** - Scientific method, truth
12. **Aesthetics** - Beauty, art, taste
13. **Eastern Philosophy** - Buddhism, Taoism, Confucianism
14. **Applied Ethics** - Real-world ethical dilemmas
15. **I'm New to Philosophy** - Beginner-friendly discussions

**Each Card Shows:**
- Title
- Brief description
- Conversation count (e.g., "234 active conversations")
- Selection indicator

**Selection Counter:** "Selected: 3/7 topics"
**Button:** "Continue →" (enabled when 5-7 selected)

**Visual Specs:**
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Card: White, 1px border
- Card selected: 2px border, primary color, checkmark icon
- Card padding: 24px
- Gap: 16px

### Step 3: Welcome Message & First Action

**Title:** "You're All Set!"

**Welcome Message:**
```
Parley is a place for curious conversations, not heated debates. Here, you'll find people:

✓ Asking genuine questions, not trying to "win"
✓ Sharing perspectives, not pushing agendas
✓ Disagreeing respectfully, not dismissively
✓ Thinking together, not thinking alone

Philosophy is for everyone. You don't need a degree—just curiosity and an open mind.
```

**First Action Prompts (3 options):**

1. **"Read a Conversation"**
   - "Explore discussions on topics you selected"
   - [Button: Browse Conversations]

2. **"Ask a Question"**
   - "Start your first philosophical discussion"
   - [Button: Ask a Question]

3. **"Find People"**
   - "Connect with philosophers like you"
   - [Button: Explore Community]

**Skip Option:** "I'll explore on my own"

**Visual Specs:**
- Content max-width: 700px
- Welcome message: Light blue background, 24px padding
- Checkmarks: Primary color
- Options grid: 3 columns (desktop), 1 (mobile)
- Option cards: White, shadow, hover effect
- Card padding: 32px

### Step 4: First Conversation Suggestion

**If User Selects "Read a Conversation":**

**Title:** "Great First Conversations for You"
**Subtitle:** "Based on your topics: Ethics, Consciousness, Stoicism"

**3-5 Featured Conversation Cards:**

Example Card:
```
[Beginner-Friendly Badge]
"Is Lying Ever Justified?"
Ethics • 34 participants • Active today
"I think there's a difference between lying to protect someone and lying
for personal gain. What do you all think?"
[Read Conversation]
```

**Guidance Tooltip:**
```
💡 Pro Tip: You can bookmark conversations to read later.
Click the bookmark icon at the top of any discussion.
```

---

## Visual Design System

### Color Palette

**Primary (Warm Teal):**
- Primary 500: #14B8A6 (buttons, links)
- Primary 600: #0F766E (button hover)
- Primary 700: #0D5652 (text on light backgrounds)

**Secondary (Terracotta):**
- Secondary 500: #FF6B47 (secondary CTAs)
- Secondary 600: #E8533A (hover states)

**Neutral:**
- 0: #FFFFFF (cards)
- 50: #F9FAFB (page backgrounds)
- 200: #E5E7EB (borders)
- 500: #6B7280 (secondary text)
- 800: #1F2937 (headings)
- 900: #111827 (footer)

**Accent:**
- Success: #10B981 (green)
- Warning: #F59E0B (amber)
- Error: #EF4444 (red)
- Info: #3B82F6 (blue)

### Typography

**Font Families:**
- Primary: 'Inter', sans-serif
- Secondary (optional): 'Lora', serif
- Monospace: 'IBM Plex Mono', monospace

**Type Scale:**
- H1 (Hero): 48px, weight 700 (36px mobile)
- H2 (Section): 36px, weight 700 (30px mobile)
- H3: 30px, weight 600 (24px mobile)
- H4: 24px, weight 600
- Body: 16px, line-height 1.6
- Body Large: 20px, line-height 1.6 (18px mobile)

### Spacing System (8px base)

```
space-1: 4px    space-6: 24px    space-16: 64px
space-2: 8px    space-8: 32px    space-20: 80px
space-3: 12px   space-10: 40px   space-24: 96px
space-4: 16px   space-12: 48px   space-32: 128px
space-5: 20px
```

**Application:**
- Section padding: space-16 or space-20 (vertical)
- Card padding: space-6 or space-8
- Button padding: space-3 × space-6
- Gap between elements: space-4, space-6, or space-8

### Border Radius

```
radius-sm: 6px     (badges)
radius-base: 8px   (inputs, small cards)
radius-md: 12px    (cards)
radius-lg: 16px    (large cards, modals)
radius-xl: 24px    (hero sections)
radius-full: 9999px (circular, pills)
```

### Shadows

```
shadow-xs: 0 1px 2px rgba(0,0,0,0.05)
shadow-sm: 0 1px 3px rgba(0,0,0,0.1)
shadow-md: 0 4px 6px rgba(0,0,0,0.1)
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
shadow-xl: 0 20px 25px rgba(0,0,0,0.1)
```

---

## Component Specifications

### Buttons

**Primary Button:**
- Background: #14B8A6
- Text: #FFFFFF
- Padding: 12px 24px
- Border-radius: 8px
- Font: 16px, semibold
- Hover: Background #0F766E, lift effect, shadow-lg
- Active: Background #0D5652

**Secondary Button:**
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Text: #0F766E
- Hover: Background #F9FAFB, border #14B8A6

### Input Fields

**Text Input:**
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border-radius: 8px
- Padding: 12px 16px
- Font: 16px
- Focus: Border #14B8A6, shadow ring
- Error: Border #EF4444, red shadow ring

### Cards

**Standard Card:**
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border-radius: 12px
- Padding: 32px
- Shadow: shadow-sm
- Hover: Border #14B8A6, shadow-md

### Badges

**Topic Badge:**
- Background: #F0FDFA
- Text: #0D5652
- Padding: 4px 12px
- Border-radius: 9999px (full)
- Font: 12px, semibold, uppercase

---

## A/B Testing Variations

### Hero Headlines to Test

**Version A (Benefit):** "Where Philosophical Minds Meet"
**Version B (Action):** "From Casual Questions to Deep Debates"
**Version C (Community):** "Find Your Philosophical Tribe"
**Version D (Problem-Solution):** "Serious Philosophy, Friendly Conversation"

### Primary CTA Buttons to Test

**Version A:** "Start Your First Conversation"
**Version B:** "Join Parley Free"
**Version C:** "Explore Discussions"
**Version D:** "Create Free Account"

---

## Responsive Behavior

### Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Wide: > 1280px
```

### Mobile-Specific Changes

**Navigation:**
- Hide desktop links, show hamburger menu
- Slide-in mobile menu

**Hero:**
- Stack layout (text above visual)
- Reduce headline size
- Stack CTAs vertically

**Grids:**
- Feature cards: Single column
- Forms: Full-width inputs
- Touch targets: Minimum 44px height

---

## Accessibility Requirements

**Keyboard Navigation:**
- Tab key for all interactive elements
- Skip to main content link
- Escape closes modals
- Enter submits forms
- Arrow keys for dropdowns

**Screen Reader:**
- Semantic HTML (header, nav, main, footer)
- ARIA labels for icons
- Alt text for images
- Form labels properly associated

**Color Contrast:**
- Text: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

**Focus Indicators:**
- Visible focus outlines
- 2px solid #14B8A6, offset 2px
- Never remove focus outlines

---

## Implementation Checklist

### Landing Page
- [ ] Header (logo, nav, CTA)
- [ ] Hero section
- [ ] Problem/Solution (3 cards)
- [ ] Features (6 cards)
- [ ] How It Works (4 steps)
- [ ] Testimonials (3)
- [ ] Final CTA
- [ ] Footer (5 columns)

### Login Page
- [ ] Email/username field
- [ ] Password field
- [ ] Remember me checkbox
- [ ] Forgot password link
- [ ] Sign in button
- [ ] Social login (Google, Apple)
- [ ] Link to signup

### Signup Page
- [ ] Username (with availability check)
- [ ] Email (with validation)
- [ ] Password (with strength indicator)
- [ ] Terms checkbox
- [ ] Create account button
- [ ] Social signup
- [ ] Link to login

### Onboarding
- [ ] Welcome screen (progress indicator)
- [ ] Topic selection (5-7 from 15)
- [ ] Welcome message
- [ ] First action choice
- [ ] Featured conversations

### Design System
- [ ] Color palette
- [ ] Typography scale
- [ ] Spacing system
- [ ] Component library
- [ ] Responsive breakpoints
- [ ] Accessibility compliance

---

## Key Messaging Pillars

1. **Conversation over competition**
2. **Accessibility without sacrificing depth**
3. **Community and intellectual connection**
4. **AI that helps you think, not thinks for you**
5. **Persistent, organized, quality-focused**

**Next Steps:** Visual design in Figma → Frontend implementation → User testing
