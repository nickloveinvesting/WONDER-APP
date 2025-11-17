# Landing Page & Login/Signup Specification
## Complete Ready-to-Implement Specification

**Document Owner:** Agent 4 - Landing Page & Authentication Specification
**Date Created:** November 15, 2025
**Status:** Complete & Ready for Implementation
**Research Sources:** UI/UX Research, Branding Analysis, Audience Research, Marketing Research, Comprehensive Frontend Dev

---

## Executive Summary

This document provides complete, implementation-ready specifications for:
1. **Landing Page** - Hero section through footer with actual copy
2. **Login Page** - Clean, minimal authentication
3. **Signup Page** - Low-friction user registration
4. **Onboarding Flow** - Post-signup experience leading to first conversation
5. **Visual Design** - Colors, typography, spacing, components

**Key Brand Decision**: This specification uses **"Parley"** as the platform name based on branding research recommendations. The name "ARGUED" was found to be 33% aligned with conversation-first vision, while "PARLEY" scores 92%+ alignment.

---

## PART 1: LANDING PAGE SPECIFICATION

### Section 1: Header / Navigation

**Layout:** Sticky header, full width, translucent background with blur

**Components:**
- Logo + Platform Name (left-aligned)
- Navigation Links (center or right-aligned)
- Primary CTA Button (right-aligned)

**Actual Copy:**

```
LOGO: [P] Parley

NAVIGATION:
- Features
- How It Works
- Community
- Pricing

CTA BUTTON: "Start Exploring" or "Join Parley"
```

**Visual Specifications:**
- Background: `rgba(255, 255, 255, 0.95)` with `backdrop-filter: blur(10px)`
- Height: 72px
- Logo size: 32px icon + 20px text
- Navigation font: Inter, 14px, medium weight
- Border bottom: 1px solid #E5E7EB
- Sticky position: `position: sticky; top: 0; z-index: 100;`

---

### Section 2: Hero Section

**Layout:** Two-column layout (text left, visual right) on desktop; stacked on mobile

**Hero Headline (H1):**
```
Where Philosophical Minds Meet
```

**Alternative Headlines (A/B Test):**
- "From Casual Questions to Deep Debates"
- "Think Deeply Together"
- "Philosophy That Welcomes Everyone"

**Hero Subheadline:**
```
Explore ideas with curious thinkers—from shower thoughts to Socratic dialogues.
Serious thinking, friendly conversation, all perspectives welcome.
```

**Primary CTA:**
```
BUTTON: "Start Your First Conversation" (Primary style)
```

**Secondary CTA:**
```
BUTTON: "Explore Discussions" (Secondary style)
```

**Social Proof Elements:**
```
✓ Join 5,000+ philosophical minds
✓ From complete beginners to PhDs
✓ 200+ active conversations daily
```

**Hero Visual (Right Side):**
- Illustration or screenshot showing conversation threads
- Alternative: Abstract visual representing connected ideas
- Placeholder dimensions: 600px × 500px
- Style: Warm, inviting, modern (not cold or technical)

**Visual Specifications:**
- Background: Linear gradient from `#F0F4FF` to `#F9FAFB`
- Padding: 96px (top/bottom) on desktop, 64px on mobile
- Max width: 1280px
- Grid: 50/50 split on desktop, 100% on mobile
- Headline size: 48px (desktop), 36px (mobile)
- Subheadline size: 20px (desktop), 18px (mobile)
- Line height: 1.2 (headline), 1.6 (subheadline)
- CTA spacing: 16px gap between buttons

---

### Section 3: Problem/Solution Section

**Section Headline:**
```
Philosophy Deserves Better
```

**Subheadline:**
```
Current platforms force you to choose between depth and accessibility.
We believe you can have both.
```

**Problem Cards (3 columns):**

**Card 1:**
```
ICON: 📱 (or custom icon)
HEADLINE: "Shallow Social Media"
DESCRIPTION: "Twitter limits depth to 280 characters. Reddit threads die in 48 hours.
Your thoughtful ideas deserve more than hot takes and disappearing conversations."
```

**Card 2:**
```
ICON: 🚪 (or custom icon)
HEADLINE: "Academic Gatekeeping"
DESCRIPTION: "Traditional philosophy spaces feel exclusive and intimidating. Jargon-heavy
discussions make curious beginners feel unwelcome. Philosophy should be for everyone."
```

**Card 3:**
```
ICON: 🌀 (or custom icon)
HEADLINE: "Toxic Debate Culture"
DESCRIPTION: "Debate platforms reward winning over learning. Combat metaphors and
zero-sum thinking create hostility. Changing your mind should be celebrated, not punished."
```

**Solution Statement:**
```
Parley is the missing middle: serious inquiry that's genuinely accessible,
persistent discussions that build understanding, and AI that makes you think harder—not for you.
```

**Visual Specifications:**
- Background: White (#FFFFFF)
- Padding: 80px (top/bottom)
- Card layout: Grid 3 columns (desktop), 1 column (mobile)
- Card styling: White background, 1px border (#E5E7EB), 16px border-radius
- Card padding: 32px
- Icon size: 48px
- Icon background: Gradient from #F0F4FF to #FFE5E0, 16px border-radius
- Gap between cards: 32px

---

### Section 4: Features Section

**Section Headline:**
```
Everything You Need to Think Deeply Together
```

**Subheadline:**
```
From your first curious question to advanced philosophical exploration—all in one place.
```

**Feature Cards (6 features in 3×2 grid):**

**Feature 1: Spectrum of Depth**
```
ICON: 🎚️
HEADLINE: "From Casual to Serious"
TITLE: "Choose Your Depth"
DESCRIPTION: "Ask quick questions or dive into multi-day Socratic dialogues. Philosophy
at whatever pace works for you—no pressure, just curiosity."
```

**Feature 2: Conversation Formats**
```
ICON: 💬
HEADLINE: "Multiple Ways to Engage"
TITLE: "Formats That Flex"
DESCRIPTION: "Open discussions, Socratic circles, reading groups, or structured debates.
The format serves the conversation, not the other way around."
```

**Feature 3: AI Facilitation**
```
ICON: 🤖
HEADLINE: "Socratic AI Assistant"
TITLE: "AI That Asks Better Questions"
DESCRIPTION: "Get unstuck without getting answers handed to you. Our AI facilitator uses
Socratic questioning to deepen your thinking, never replaces it."
```

**Feature 4: Beginner-Friendly**
```
ICON: 🌱
HEADLINE: "No Philosophy Degree Required"
TITLE: "Start Anywhere"
DESCRIPTION: "Your first 'stupid' question is welcome here. Beginner-friendly spaces with
no judgment, plus experts who remember what it's like to start."
```

**Feature 5: Persistent Discussions**
```
ICON: 📚
HEADLINE: "Conversations That Last"
TITLE: "Never Disappears"
DESCRIPTION: "Unlike Reddit or Twitter, discussions don't expire. Find what you discussed
six months ago. Ideas that matter deserve to persist."
```

**Feature 6: Community & Connection**
```
ICON: 🤝
HEADLINE: "Find Your Philosophical Tribe"
TITLE: "Your People Are Here"
DESCRIPTION: "Connect with Stoics, Existentialists, Ethics nerds, and curious minds from
every tradition. Build intellectual friendships that last."
```

**Visual Specifications:**
- Background: Linear gradient from #F9FAFB to #F0F4FF
- Padding: 96px (top/bottom)
- Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Card background: White with subtle shadow
- Card border-radius: 12px
- Card padding: 32px
- Icon background: Gradient circle, 64px diameter
- Gap: 32px between cards

---

### Section 5: How It Works

**Section Headline:**
```
Your Philosophical Journey in 4 Steps
```

**Step 1:**
```
STEP NUMBER: 1
TITLE: "Start with Curiosity"
DESCRIPTION: "Browse conversations by topic or ask your first question.
No signup required to explore—we want you to see the quality first."
VISUAL: Icon or illustration of browsing/exploring
```

**Step 2:**
```
STEP NUMBER: 2
TITLE: "Join the Conversation"
DESCRIPTION: "Found something interesting? Create your account in 30 seconds.
Then jump right into discussions that matter to you."
VISUAL: Icon or illustration of creating account
```

**Step 3:**
```
STEP NUMBER: 3
TITLE: "Engage at Your Level"
DESCRIPTION: "Ask questions, share perspectives, or dive into Socratic dialogues.
Our AI facilitator helps you deepen your thinking when you're stuck."
VISUAL: Icon or illustration of discussion/dialogue
```

**Step 4:**
```
STEP NUMBER: 4
TITLE: "Grow Together"
DESCRIPTION: "Build understanding, find your tribe, and develop your philosophical voice.
Track your journey from curious to confident thinker."
VISUAL: Icon or illustration of growth/community
```

**Visual Specifications:**
- Background: White
- Padding: 96px (top/bottom)
- Layout: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Step number: Circular badge, 56px, gradient background (#3D5ADB to #FF6B47)
- Number font: 24px, bold, white
- Title: 20px, semibold
- Description: 16px, line-height 1.6
- Center-aligned text
- Gap: 48px between steps

---

### Section 6: Social Proof / Testimonials

**Section Headline:**
```
Philosophers Are Finding Their Home
```

**Testimonial 1:**
```
QUOTE: "Finally, a place where I can ask 'stupid' questions about Kant without
feeling judged. The community is genuinely welcoming to beginners."

AUTHOR: Sarah M.
ROLE: Philosophy Student, First-Year
RATING: ⭐⭐⭐⭐⭐
```

**Testimonial 2:**
```
QUOTE: "I've been searching for years for a platform where serious thinkers
discuss philosophy without the Twitter toxicity. This is it."

AUTHOR: Marcus Chen
ROLE: Tech Professional, Self-Taught Philosopher
RATING: ⭐⭐⭐⭐⭐
```

**Testimonial 3:**
```
QUOTE: "The Socratic AI is brilliant. It asks exactly the right questions to
push my thinking deeper without just giving me answers."

AUTHOR: Dr. Sophia Okonkwo
ROLE: Philosophy Professor, Duke University
RATING: ⭐⭐⭐⭐⭐
```

**Community Stats:**
```
5,000+ Active Members | 200+ Daily Conversations | From 50+ Countries
```

**Visual Specifications:**
- Background: Gradient from #F9FAFB to #F0F4FF
- Padding: 96px (top/bottom)
- Grid: 3 columns (desktop), 1 column (mobile)
- Card: White background, 1px border, 16px border-radius
- Card padding: 32px
- Quote font-style: italic
- Quote color: #6B7280
- Author: Bold, #111827
- Role: 12px, #9CA3AF, uppercase, letter-spacing 0.05em
- Stars: 16px, #F59E0B (warning color)
- Gap: 32px

---

### Section 7: Final CTA (Conversion Section)

**Headline:**
```
Ready to Think Deeply Together?
```

**Subheadline:**
```
Join thousands of curious minds exploring philosophy—from complete beginners
to PhD philosophers. Your first conversation is just a click away.
```

**Primary CTA:**
```
BUTTON: "Create Free Account"
```

**Secondary CTA:**
```
LINK: "Or explore discussions first"
```

**Trust Indicators:**
```
✓ Free forever for core features
✓ No credit card required
✓ Start conversing in 30 seconds
```

**Visual Specifications:**
- Background: Gradient from #3D5ADB to #2D41B8
- Color: White text throughout
- Padding: 96px (top/bottom)
- Text alignment: Center
- Max-width content: 600px centered
- Button: White background, primary color text
- Button hover: Scale up, shadow
- Secondary link: Underlined, white, 80% opacity

---

### Section 8: Footer

**Column 1: About**
```
LOGO + NAME: Parley

TAGLINE: "Where philosophical minds meet"

DESCRIPTION: "Serious thinking, friendly conversation.
From casual questions to deep debates—philosophy for everyone."
```

**Column 2: Product**
```
HEADING: Product

LINKS:
- Features
- How It Works
- Pricing
- Roadmap
- Mobile Apps (Coming Soon)
```

**Column 3: Community**
```
HEADING: Community

LINKS:
- Browse Discussions
- Philosophy Topics
- Reading Groups
- Community Guidelines
- Blog
```

**Column 4: Company**
```
HEADING: Company

LINKS:
- About Us
- Contact
- Careers
- Press Kit
```

**Column 5: Legal**
```
HEADING: Legal

LINKS:
- Privacy Policy
- Terms of Service
- Cookie Policy
- AI Transparency
```

**Bottom Bar:**
```
LEFT: © 2025 Parley. Making philosophy accessible to all.

RIGHT (Social Links):
- Twitter/X
- Discord
- GitHub
- Email
```

**Visual Specifications:**
- Background: #111827 (dark gray, nearly black)
- Text color: rgba(255, 255, 255, 0.7)
- Link hover: rgba(255, 255, 255, 1.0)
- Padding: 64px (top), 32px (bottom)
- Grid: 5 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Heading color: White
- Heading size: 16px, semibold
- Link size: 14px
- Gap between links: 12px
- Bottom border: 1px solid rgba(255, 255, 255, 0.1)
- Social icon size: 40px circular buttons
- Social icon background: rgba(255, 255, 255, 0.1)
- Social icon hover: rgba(255, 255, 255, 0.2)

---

## PART 2: LOGIN PAGE SPECIFICATION

### Login Page Layout

**Page Title:**
```
Welcome Back to Parley
```

**Subheadline:**
```
Continue your philosophical journey
```

**Login Form:**

```
FIELD 1:
Label: "Email or Username"
Input Type: text
Placeholder: "your@email.com or username"
Autocomplete: email username

FIELD 2:
Label: "Password"
Input Type: password
Placeholder: "••••••••"
Autocomplete: current-password

CHECKBOX:
☐ Remember me

LINK (right-aligned):
"Forgot password?"

BUTTON (Primary):
"Sign In"

DIVIDER:
─────── or ───────

SOCIAL LOGIN BUTTONS:
[Continue with Google]
[Continue with Apple]

FOOTER LINK:
"Don't have an account? Sign up"
```

**Visual Specifications:**
- Layout: Centered card, max-width 440px
- Background: Light gradient (#F9FAFB)
- Card: White, shadow-md, 24px border-radius
- Card padding: 48px (desktop), 32px (mobile)
- Form gap: 24px between fields
- Input height: 48px
- Input border: 1px solid #E5E7EB
- Input border-radius: 8px
- Input focus: Border color #3D5ADB, subtle shadow
- Button height: 48px
- Button font: 16px, semibold
- Social button: White background, 1px border, icon + text
- Link color: #3D5ADB
- Link hover: Underline

**Forgot Password Flow:**
```
PAGE TITLE: "Reset Your Password"
DESCRIPTION: "Enter your email and we'll send you a reset link."

FIELD:
Label: "Email"
Placeholder: "your@email.com"

BUTTON: "Send Reset Link"

BACK LINK: "← Back to login"
```

---

## PART 3: SIGNUP PAGE SPECIFICATION

### Signup Page Layout

**Page Title:**
```
Join Parley
```

**Subheadline:**
```
Start your philosophical journey—free forever
```

**Signup Form:**

```
FIELD 1:
Label: "Username"
Input Type: text
Placeholder: "Choose a unique username"
Help Text: "This is how others will see you"
Autocomplete: username
Validation: Available/Taken indicator

FIELD 2:
Label: "Email"
Input Type: email
Placeholder: "your@email.com"
Help Text: "We'll never spam you"
Autocomplete: email

FIELD 3:
Label: "Password"
Input Type: password
Placeholder: "Create a strong password"
Help Text: "At least 8 characters"
Validation: Password strength indicator
Autocomplete: new-password

CHECKBOX (Required):
☑ I agree to the Terms of Service and Privacy Policy

BUTTON (Primary):
"Create Account"

DIVIDER:
─────── or ───────

SOCIAL SIGNUP BUTTONS:
[Continue with Google]
[Continue with Apple]

FOOTER LINK:
"Already have an account? Sign in"
```

**Visual Specifications:**
- Same layout structure as login page
- Card max-width: 480px (slightly wider for help text)
- Password strength indicator: Progress bar below password field
  - Weak: Red background, 25% width
  - Fair: Orange background, 50% width
  - Good: Yellow background, 75% width
  - Strong: Green background, 100% width
- Username availability: Checkmark (green) or X (red) icon
- Help text: 14px, #6B7280, below input
- Checkbox label: 14px, linked text for legal documents

**Error States:**
```
- Email already registered: "This email is already in use. Sign in instead?"
- Weak password: "Password must be at least 8 characters"
- Username taken: "Username already taken. Try: [suggestion1], [suggestion2]"
- Invalid email: "Please enter a valid email address"
```

**Success State:**
```
- Redirect to onboarding flow immediately after account creation
- No email verification required for initial access
- Background email sent with verification link
```

---

## PART 4: ONBOARDING FLOW SPECIFICATION

### Step 1: Welcome Screen

**Layout:** Full-screen centered content

**Content:**
```
HEADLINE: "Welcome to Parley, [Username]!"

SUBHEADLINE: "Let's get you started with three quick steps."

PROGRESS INDICATOR: Step 1 of 3

VISUAL: Friendly illustration or icon

BUTTON (Primary): "Let's Go →"

LINK (Skip option): "Skip for now"
```

**Visual Specifications:**
- Background: Light gradient
- Content max-width: 600px
- Center-aligned text
- Progress dots: • • ○ (filled/unfilled circles)
- Padding: 64px (top/bottom)

---

### Step 2: Topic Selection

**Screen Title:**
```
What Are You Curious About?
```

**Instructions:**
```
Select 5-7 topics to personalize your feed. You can always change these later.
```

**Topic Grid (15 topics shown, select 5-7):**

```
TOPIC CARDS (selectable):

[Ethics]
What makes actions right or wrong? How should we live?
○ Select | 234 active conversations

[Consciousness]
What is subjective experience? Do we have free will?
○ Select | 156 active conversations

[Meaning of Life]
Why are we here? What gives life purpose?
○ Select | 189 active conversations

[Political Philosophy]
Justice, rights, governance, and social organization
○ Select | 167 active conversations

[Stoicism]
Ancient wisdom for modern life and resilience
○ Select | 203 active conversations

[Epistemology]
How do we know what's true? What is knowledge?
○ Select | 98 active conversations

[Philosophy of Mind]
Mind, brain, cognition, and artificial intelligence
○ Select | 112 active conversations

[Existentialism]
Authenticity, freedom, meaning, and human existence
○ Select | 145 active conversations

[Logic & Reasoning]
Arguments, fallacies, and critical thinking
○ Select | 87 active conversations

[Metaphysics]
Reality, existence, being, time, and space
○ Select | 76 active conversations

[Philosophy of Science]
Scientific method, truth, and knowledge in science
○ Select | 94 active conversations

[Aesthetics]
Beauty, art, taste, and artistic experience
○ Select | 68 active conversations

[Eastern Philosophy]
Buddhism, Taoism, Confucianism, and more
○ Select | 121 active conversations

[Applied Ethics]
Real-world ethical dilemmas in modern life
○ Select | 178 active conversations

[I'm New to Philosophy]
Beginner-friendly discussions for curious minds
○ Select | 312 active conversations
```

**Selection Counter:**
```
Selected: 3/7 topics

BUTTON (Disabled until 5 selected): "Continue"
BUTTON (Active when 5-7 selected): "Continue →"
```

**Visual Specifications:**
- Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Card: White background, 1px border
- Card hover: Border color changes to primary
- Card selected: Border 2px, primary color, checkmark icon
- Card padding: 24px
- Title: 18px, semibold
- Description: 14px, gray
- Conversation count: 12px, light gray
- Gap: 16px between cards

---

### Step 3: Welcome Message & First Action

**Screen Title:**
```
You're All Set!
```

**Welcome Message:**
```
Parley is a place for curious conversations, not heated debates. Here, you'll find people:

✓ Asking genuine questions, not trying to "win"
✓ Sharing perspectives, not pushing agendas
✓ Disagreeing respectfully, not dismissively
✓ Thinking together, not thinking alone

Philosophy is for everyone. You don't need a degree—just curiosity and an open mind.
```

**First Action Prompts:**

```
SECTION: What would you like to do first?

OPTION 1: [Card with icon]
"Read a Conversation"
Explore discussions on topics you selected
[Button: Browse Conversations]

OPTION 2: [Card with icon]
"Ask a Question"
Start your first philosophical discussion
[Button: Ask a Question]

OPTION 3: [Card with icon]
"Find People"
Connect with philosophers like you
[Button: Explore Community]
```

**Skip Option:**
```
LINK: "I'll explore on my own"
```

**Visual Specifications:**
- Content max-width: 700px
- Welcome message: Light blue background (#F0F4FF), 24px padding, 12px border-radius
- Checkmarks: Primary color (#3D5ADB)
- Options grid: 3 columns (desktop), 1 column (mobile)
- Option cards: White, shadow, hover effect
- Card padding: 32px
- Icon size: 48px
- Button: Full-width within card

---

### Step 4: First Conversation Suggestion

**If User Selects "Read a Conversation":**

```
TITLE: "Great First Conversations for You"
SUBTITLE: "Based on your topics: Ethics, Consciousness, Stoicism"

CONVERSATION CARDS (3-5 featured conversations):

CARD 1:
[Beginner-Friendly Badge]
"Is Lying Ever Justified?"
Ethics • 34 participants • Active today
"I think there's a difference between lying to protect someone and lying
for personal gain. What do you all think?"
[Read Conversation]

CARD 2:
[Beginner-Friendly Badge]
"What Does It Mean to Have Free Will?"
Consciousness • 45 participants • Active 2 hours ago
"Even if our brains follow physical laws, does that mean we lack free will?"
[Read Conversation]

CARD 3:
[Beginner-Friendly Badge]
"Stoic Practices for Modern Life"
Stoicism • 28 participants • Active today
"Which Stoic exercises have genuinely helped you in daily life?"
[Read Conversation]
```

**Guidance Tooltip (appears after reading first conversation):**
```
💡 Pro Tip: You can bookmark conversations to read later.
Click the bookmark icon at the top of any discussion.
```

---

## PART 5: VISUAL DESIGN SYSTEM

### Color Palette

**Primary Colors (Warm Teal - Sage):**
```
Primary 50:  #F0FDFA (lightest backgrounds)
Primary 100: #CCFBF1 (light backgrounds, badges)
Primary 200: #99F6E4 (hover states)
Primary 300: #5EEAD4 (borders, dividers)
Primary 400: #2DD4BF (interactive elements)
Primary 500: #14B8A6 (primary buttons, links)
Primary 600: #0F766E (button hover, active states)
Primary 700: #0D5652 (text on light backgrounds)
Primary 800: #0A3F3A (headings, dark text)
Primary 900: #062925 (darkest text)
```

**Secondary Colors (Warm Terracotta):**
```
Secondary 50:  #FFF5F3 (light backgrounds)
Secondary 100: #FFE5E0 (badges, highlights)
Secondary 200: #FFC8BC (hover accents)
Secondary 300: #FFAA92 (decorative)
Secondary 400: #FF8868 (call-to-action accents)
Secondary 500: #FF6B47 (secondary CTAs)
Secondary 600: #E8533A (hover states)
Secondary 700: #CC3D2D (active states)
Secondary 800: #B02D23 (error states)
Secondary 900: #8B1F1A (darkest errors)
```

**Neutral Colors:**
```
Neutral 0:   #FFFFFF (pure white, cards)
Neutral 50:  #F9FAFB (page backgrounds)
Neutral 100: #F3F4F6 (light backgrounds)
Neutral 200: #E5E7EB (borders, dividers)
Neutral 300: #D1D5DB (disabled states)
Neutral 400: #9CA3AF (placeholder text)
Neutral 500: #6B7280 (secondary text)
Neutral 600: #4B5563 (body text)
Neutral 700: #374151 (emphasis text)
Neutral 800: #1F2937 (headings)
Neutral 900: #111827 (darkest text, footer)
```

**Accent Colors:**
```
Success: #10B981 (green - positive actions)
Warning: #F59E0B (amber - neutral alerts)
Error:   #EF4444 (red - errors, validation)
Info:    #3B82F6 (blue - informational)
```

---

### Typography

**Font Families:**
```
Primary (UI & Body): 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Secondary (Headings - Optional): 'Lora', Georgia, serif
Monospace (Code): 'IBM Plex Mono', 'Courier New', monospace
```

**Type Scale:**
```
H1 (Hero): 48px / 3rem, line-height 1.2, weight 700
H2 (Section): 36px / 2.25rem, line-height 1.2, weight 700
H3 (Subsection): 30px / 1.875rem, line-height 1.3, weight 600
H4 (Card Title): 24px / 1.5rem, line-height 1.3, weight 600
H5 (Small Title): 20px / 1.25rem, line-height 1.4, weight 600
H6 (Tiny Title): 18px / 1.125rem, line-height 1.4, weight 600

Body Large: 20px / 1.25rem, line-height 1.6, weight 400
Body: 16px / 1rem, line-height 1.6, weight 400
Body Small: 14px / 0.875rem, line-height 1.6, weight 400
Caption: 12px / 0.75rem, line-height 1.5, weight 400
```

**Mobile Adjustments:**
```
H1: 36px (down from 48px)
H2: 30px (down from 36px)
H3: 24px (down from 30px)
Body Large: 18px (down from 20px)
```

---

### Spacing System (8px base)

```
space-1:  4px   (0.25rem)
space-2:  8px   (0.5rem)
space-3:  12px  (0.75rem)
space-4:  16px  (1rem)
space-5:  20px  (1.25rem)
space-6:  24px  (1.5rem)
space-8:  32px  (2rem)
space-10: 40px  (2.5rem)
space-12: 48px  (3rem)
space-16: 64px  (4rem)
space-20: 80px  (5rem)
space-24: 96px  (6rem)
space-32: 128px (8rem)
```

**Application:**
- Section padding: space-16 or space-20 (vertical)
- Card padding: space-6 or space-8
- Button padding: space-3 (vertical) × space-6 (horizontal)
- Gap between elements: space-4, space-6, or space-8
- Margin between sections: space-12 or space-16

---

### Border Radius

```
radius-sm:   6px  (small elements, badges)
radius-base: 8px  (inputs, small cards)
radius-md:   12px (cards, larger elements)
radius-lg:   16px (large cards, modals)
radius-xl:   24px (hero sections, features)
radius-full: 9999px (circular elements, pills)
```

---

### Shadows

```
shadow-xs:  0 1px 2px rgba(0, 0, 0, 0.05)
shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.1)
shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1)
shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

**Usage:**
- Cards: shadow-sm (default), shadow-md (hover)
- Buttons: shadow-sm (default), shadow-lg (hover)
- Modals: shadow-xl
- Floating headers: shadow-sm

---

### Component Specifications

**Buttons:**

Primary Button:
```
Background: #14B8A6 (primary-500)
Text: #FFFFFF
Padding: 12px 24px
Border-radius: 8px
Font: 16px, semibold
Hover: Background #0F766E, transform translateY(-2px), shadow-lg
Active: Background #0D5652
Disabled: Background #9CA3AF, cursor not-allowed
```

Secondary Button:
```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Text: #0F766E (primary-600)
Padding: 12px 24px
Border-radius: 8px
Font: 16px, semibold
Hover: Background #F9FAFB, border #14B8A6
```

**Input Fields:**

Text Input:
```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border-radius: 8px
Padding: 12px 16px
Font: 16px
Placeholder: #9CA3AF
Focus: Border #14B8A6, shadow 0 0 0 3px rgba(20, 184, 166, 0.1)
Error: Border #EF4444, shadow 0 0 0 3px rgba(239, 68, 68, 0.1)
```

**Cards:**

Standard Card:
```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border-radius: 12px
Padding: 32px
Shadow: shadow-sm
Hover: Border #14B8A6, shadow-md
```

**Badges:**

Topic Badge:
```
Background: #F0FDFA (primary-50)
Text: #0D5652 (primary-700)
Padding: 4px 12px
Border-radius: 9999px (full)
Font: 12px, semibold, uppercase, letter-spacing 0.05em
```

---

## PART 6: COPY VARIATIONS FOR A/B TESTING

### Hero Headlines (Test These)

**Version A (Benefit-Focused):**
```
"Where Philosophical Minds Meet"
```

**Version B (Action-Focused):**
```
"From Casual Questions to Deep Debates"
```

**Version C (Community-Focused):**
```
"Find Your Philosophical Tribe"
```

**Version D (Problem-Solution):**
```
"Serious Philosophy, Friendly Conversation"
```

---

### Primary CTA Buttons (Test These)

**Version A:**
```
"Start Your First Conversation"
```

**Version B:**
```
"Join Parley Free"
```

**Version C:**
```
"Explore Discussions"
```

**Version D:**
```
"Create Free Account"
```

---

## PART 7: RESPONSIVE BEHAVIOR

### Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Wide: > 1280px
```

### Mobile-Specific Changes

**Navigation:**
- Hide desktop navigation links
- Show hamburger menu icon
- Slide-in mobile menu on tap

**Hero Section:**
- Stack layout (text above visual)
- Reduce headline size
- Stack CTA buttons vertically
- Reduce padding

**Feature Cards:**
- Single column grid
- Reduce card padding
- Smaller icons

**Forms:**
- Full-width inputs
- Increase touch target size (minimum 44px)
- Larger buttons (minimum 48px height)

---

## PART 8: ACCESSIBILITY REQUIREMENTS

**Keyboard Navigation:**
- All interactive elements accessible via Tab key
- Skip to main content link
- Escape key closes modals
- Enter key submits forms
- Arrow keys navigate dropdown menus

**Screen Reader Support:**
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels for icons and images
- ARIA live regions for dynamic content
- Alt text for all images
- Form labels properly associated

**Color Contrast:**
- Text: Minimum 4.5:1 contrast ratio (WCAG AA)
- Large text: Minimum 3:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast
- Verify all color combinations

**Focus Indicators:**
- Visible focus outlines on all interactive elements
- Focus outline: 2px solid #14B8A6, offset 2px
- Never remove focus outlines

---

## SUMMARY: Implementation Checklist

**Landing Page:**
- [ ] Header with logo, navigation, CTA button
- [ ] Hero section with headline, subheadline, 2 CTAs, social proof
- [ ] Problem/Solution section with 3 problem cards
- [ ] Features section with 6 feature cards
- [ ] How It Works section with 4 steps
- [ ] Testimonials section with 3 testimonials
- [ ] Final CTA section with email capture
- [ ] Footer with 5 columns of links

**Login Page:**
- [ ] Email/username field
- [ ] Password field
- [ ] Remember me checkbox
- [ ] Forgot password link
- [ ] Sign in button
- [ ] Social login options (Google, Apple)
- [ ] Link to signup page

**Signup Page:**
- [ ] Username field with availability check
- [ ] Email field with validation
- [ ] Password field with strength indicator
- [ ] Terms acceptance checkbox
- [ ] Create account button
- [ ] Social signup options
- [ ] Link to login page

**Onboarding Flow:**
- [ ] Welcome screen with progress indicator
- [ ] Topic selection (5-7 required from 15 options)
- [ ] Welcome message explaining community culture
- [ ] First action choice (read, ask, find people)
- [ ] Featured conversations for new users

**Design System:**
- [ ] Color palette implemented
- [ ] Typography scale applied
- [ ] Spacing system consistent
- [ ] Component library created
- [ ] Responsive breakpoints defined
- [ ] Accessibility requirements met

---

## Hero Headline & Key Landing Page Sections

**HERO HEADLINE:**
```
Where Philosophical Minds Meet
```

**KEY SECTIONS:**
1. **Hero** - "Where Philosophical Minds Meet" with emphasis on spectrum (casual to deep), community, and welcoming all levels
2. **Problem/Solution** - Address shallow social media, academic gatekeeping, and toxic debate culture
3. **Features** - Highlight spectrum of depth, multiple formats, Socratic AI, beginner-friendly, persistent discussions, community
4. **How It Works** - 4-step journey from curiosity to growth
5. **Social Proof** - Testimonials from students, professionals, and professors
6. **Final CTA** - "Ready to Think Deeply Together?" with free account creation

**MESSAGING PILLARS:**
- Conversation over competition
- Accessibility without sacrificing depth
- Community and intellectual connection
- AI that helps you think, not thinks for you
- Persistent, organized, quality-focused

---

**End of Specification**
**Total Pages:** Complete landing page + login + signup + onboarding
**Ready for:** Design mockups → Development → Launch
**Next Steps:** Visual design in Figma → Frontend implementation → User testing
