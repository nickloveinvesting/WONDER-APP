# PhiloDuel Brand Identity Guide

## 1. BRAND ESSENCE

**Tagline:** "Where Philosophy Comes Alive"

**Brand Promise:** 
We make philosophical thinking fashionable again by creating a platform where rigorous debate meets community, where ideas are tested fairly, and where intellectuals feel like they belong.

**Core Values:**
- **Rigor** - Serious philosophy with fair judgment
- **Inclusivity** - Open to all thinkers, experts to beginners
- **Community** - Belonging with your philosophical tribe
- **Truth** - Facts matter, arguments must be sound
- **Excellence** - Attract the best minds

---

## 2. VISUAL IDENTITY

### 2.1 Color Palette

#### Primary Color: Deep Indigo (Wisdom & Intellect)
- **Hex:** #3d5adb
- **RGB:** rgb(61, 90, 219)
- **HSL:** hsl(225, 72%, 55%)
- **Usage:** Primary CTA buttons, headers, active states, brand accent

**Indigo Family:**
- Light: #c2d7ff (backgrounds, hover states)
- Medium: #5680ff (accents, icons)
- Dark: #2d41b8 (text, strong emphasis)

#### Secondary Color: Coral/Crimson (Competition & Energy)
- **Hex:** #ff6b47
- **RGB:** rgb(255, 107, 71)
- **HSL:** hsl(14, 100%, 64%)
- **Usage:** Problem sections, urgency, debate energy, highlights

**Coral Family:**
- Light: #ffaa92 (backgrounds)
- Medium: #ff8868 (interactive)
- Dark: #e8533a (emphasis)

#### Neutral Colors (Backgrounds & Text)
- **White:** #ffffff (primary background)
- **Light Gray:** #f9fafb (secondary background)
- **Medium Gray:** #d1d5db (borders, dividers)
- **Dark Gray:** #4b5563 (secondary text)
- **Near Black:** #111827 (footer, primary text)

#### Semantic Colors
- **Success/Win:** #10b981 (winning debates, achievements)
- **Warning/Controversial:** #f59e0b (hotly debated topics)
- **Info:** #3d5adb (same as primary)

### 2.2 Color Usage Rules

**Light Mode (Default):**
- Background: White (#ffffff)
- Cards/Panels: Off-white (#f9fafb)
- Text Primary: Near black (#111827)
- Text Secondary: Dark gray (#4b5563)
- Text Tertiary: Medium gray (#6b7280)

**Dark Mode (Implemented):**
```css
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --border-color: #334155;
}
```

**Interactive States:**
- **Hover:** Indigo gets darker, elevation increases
- **Active:** Indigo-700 with reduced opacity overlay
- **Disabled:** Gray-300 with reduced opacity
- **Focus:** 2px solid indigo border with offset

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Font Stack

**Primary Font: Plus Jakarta Sans**
- Modern, geometric, friendly but intelligent
- Excellent readability at all sizes
- Premium feel without being pretentious
- Pair with: System fonts, Inter

**Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif

**Monospace Font: IBM Plex Mono**
- For code snippets, citations, logical notation
- Clear distinction from body text
- Professional appearance

### 3.2 Typographic Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 | 3rem (48px) | Bold (700) | 1.25 | -0.02em |
| H2 | 2.25rem (36px) | Bold (700) | 1.25 | -0.01em |
| H3 | 1.875rem (30px) | Semibold (600) | 1.375 | normal |
| H4 | 1.5rem (24px) | Semibold (600) | 1.375 | normal |
| H5 | 1.25rem (20px) | Semibold (600) | 1.5 | normal |
| Body Large | 1.125rem (18px) | Normal (400) | 1.625 | normal |
| Body | 1rem (16px) | Normal (400) | 1.5 | normal |
| Small | 0.875rem (14px) | Normal (400) | 1.5 | normal |
| Tiny | 0.75rem (12px) | Semibold (600) | 1.5 | 0.05em |

### 3.3 Typography Best Practices

- **Headings:** Bold, tight line height, tracking tight
- **Body Text:** Regular weight, 1.5-1.625 line height for readability
- **Links:** Indigo primary color, underline on hover
- **Citations/Code:** Monospace font, distinct visual treatment
- **Emphasis:** Use semibold, not italics
- **Mobile:** Minimum 16px base font size (no zoom issues)

---

## 4. LOGO & BRAND MARKS

### 4.1 Main Logo

**Logo Mark:** ⚔️ (Philosophical Duel sword icon)
**Primary Logo:** "PhiloDuel" wordmark + icon

**Variations:**
1. **Logo + Wordmark** (Primary - use most often)
   - Icon on left, wordmark to right
   - Minimum 32px icon height

2. **Icon Only** (App icon, favicons)
   - 512x512px SVG preferred
   - Gradient background: Indigo → Coral
   - Sword centered, sharp edges

3. **Wordmark Only** (Horizontal space constraints)
   - Color: Indigo-600
   - Font: Plus Jakarta Sans Bold

**Logo Spacing:**
- Minimum 1rem clear space around entire logo
- Never squeeze or distort
- Don't change colors without approval
- Prefer horizontal layout on desktop, stacked on mobile

### 4.2 Favicon & App Icon

- 16x16, 32x32, 64x64, 256x256, 512x512 versions
- Icon-only design: Sword on gradient
- Use Indigo to Coral gradient
- Ensure legibility at tiny sizes

### 4.3 Logo Colors

| Context | Color |
|---------|-------|
| Dark backgrounds | White |
| White backgrounds | Indigo-600 |
| Gradients | Indigo-600 to Coral |
| Disabled | Gray-300 |

---

## 5. IMAGERY & VISUAL STYLE

### 5.1 Photography Guidelines

- **Style:** Thoughtful, scholarly, contemplative
- **Diversity:** Feature real people from all backgrounds
- **Authenticity:** Avoid stock photo clichés (no "The Thinker" statue)
- **Lighting:** Natural, bright, even lighting preferred
- **Composition:** Focus on faces, genuine expressions

### 5.2 Illustration Style

- **Approach:** Minimalist geometric abstractions
- **Color:** Use brand color palette
- **Stroke Weight:** Consistent 2-3px strokes
- **Icons:** 64px, 48px, 32px variants
- **Complexity:** Simple → complex gradation

### 5.3 Icon System

- **Style:** Minimalist, geometric
- **Grid:** Based on 24px grid
- **Stroke Weight:** 1.5px
- **Corners:** Rounded (--radius-sm)
- **Colors:** Indigo primary, Coral secondary

**Key Icons:**
- ⚔️ Philosophical Duel
- 💬 Discussions
- 📚 Learning
- 🏆 Achievement
- 🎯 Goals
- ✅ Completed

---

## 6. BRAND VOICE & TONE

### 6.1 Voice Characteristics

- **Intelligent but Accessible:** No unnecessary jargon; explain concepts clearly
- **Provocative but Respectful:** Ask challenging questions; never demean
- **Confident but Humble:** We know our strengths; we're learning and evolving
- **Playful but Serious:** Philosophy is exciting; treat it seriously
- **Inclusive but Rigorous:** Welcome all levels; don't lower standards

### 6.2 Tone Examples

| Situation | Tone | Example |
|-----------|------|---------|
| Welcoming new users | Warm, encouraging | "Ready to sharpen your mind? Welcome to the duel." |
| Debate loss | Supportive, growth-focused | "Great arguments here. Here's where logic diverged." |
| Complex topic | Clear, patient | "Kant's categorical imperative sounds complex. Here's the core idea..." |
| Error message | Helpful, not condescending | "Email needs an @ symbol. Let's try again." |
| Community guidelines | Respectful but firm | "We value rigorous debate, not personal attacks." |

### 6.3 Brand Copy Templates

**Headlines (Problem → Solution):**
- "Twitter is shallow. Philosophy needs depth."
- "Tired of your debate being deleted? Ours are permanent."
- "The only AI judge that understands philosophy."

**Calls-to-Action:**
- "Claim Your Philosophy Name"
- "Start Your First Duel"
- "Join 500+ Philosophers"
- "Unlock Your Intellectual Potential"

**Value Props:**
- "Fair judgment through AI"
- "Build your philosophical reputation"
- "Find your thinking community"
- "Sharpen your arguments daily"

---

## 7. SPACING & LAYOUT SYSTEM

### 7.1 Spacing Scale (8px Base)

- **Space-1:** 4px (fine details)
- **Space-2:** 8px (tight grouping)
- **Space-4:** 16px (section margins)
- **Space-6:** 24px (component padding)
- **Space-8:** 32px (section spacing)
- **Space-16:** 64px (major spacing)
- **Space-24:** 96px (section breaks)

### 7.2 Grid System

- **Container Width:** 1280px (max)
- **Breakpoints:**
  - Mobile: 0-640px
  - Tablet: 640-1024px
  - Desktop: 1024px+
- **Gutter:** 24px (tablet), 32px (desktop)

---

## 8. COMPONENT LIBRARY

### 8.1 Buttons

**Primary Button**
- Background: Indigo-600
- Hover: Indigo-700, elevate 2px
- Active: Indigo-800, press down
- Disabled: Gray-300, cursor not-allowed

**Secondary Button**
- Background: Gray-100
- Border: 1px Gray-300
- Hover: Gray-200
- Active: Gray-300

**Text Button**
- No background, just text
- Color: Indigo-600
- Underline on hover

### 8.2 Cards

- Background: White
- Border: 1px Gray-200
- Padding: 24px (--space-8)
- Border-radius: 12px (--radius-lg)
- Box-shadow on hover: subtle elevation

### 8.3 Forms

- **Input Height:** 44px minimum (mobile touch target)
- **Input Padding:** 12px horizontal, 8px vertical
- **Border:** 1px Gray-300
- **Focus State:** 2px Indigo border, no box shadow
- **Error:** Red border, error message below

### 8.4 Badge/Pills

- Background: Indigo-50
- Text: Indigo-600
- Padding: 4px 12px
- Border-radius: full (9999px)
- Font-size: 12px (--text-xs)

---

## 9. DO's & DON'Ts

### DO ✓

- ✓ Use the color palette consistently
- ✓ Maintain breathing room (whitespace)
- ✓ Bold > Italic for emphasis
- ✓ Test on real devices, not just browsers
- ✓ Use semantic HTML
- ✓ Make interactive elements >= 44px
- ✓ Test color contrast (WCAG AA minimum 4.5:1)
- ✓ Respect reduced motion preferences
- ✓ Provide alt text for images
- ✓ Use brand voice consistently

### DON'T ✗

- ✗ Mix fonts (stick to Plus Jakarta Sans + IBM Plex Mono)
- ✗ Use black (#000) text (use near-black instead)
- ✗ Create custom colors outside palette
- ✗ Stack text under 16px on mobile
- ✗ Use all caps for long copy
- ✗ Forget about dark mode support
- ✗ Make jokes at others' expense
- ✗ Use generic tech jargon without explanation
- ✗ Ignore accessibility standards
- ✗ Change logo colors or proportions

---

## 10. SPECIAL APPLICATIONS

### 10.1 Dark Mode

```css
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --color-primary-600: #6b7ff9; /* Lighter indigo for readability */
}
```

### 10.2 Notification States

- **Success:** Green border-left, success icon, Green text
- **Warning:** Yellow border-left, warning icon, warning text  
- **Error:** Red border-left, error icon, red text
- **Info:** Indigo border-left, info icon, indigo text

### 10.3 Animated Elements

- **Duration:** 250ms standard (use --transition-base)
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)
- **Hover Effects:** Slight scale up (1.02) + shadow elevation
- **Loading:** Spinner using brand colors, rotating infinitely

---

## 11. IMPLEMENTATION CHECKLIST

When launching any new feature or page:

- [ ] Color palette matches guide exactly
- [ ] Typography follows scale system
- [ ] Spacing uses 8px grid
- [ ] Interactive elements >= 44px
- [ ] Color contrast WCAG AA passing
- [ ] Dark mode implemented
- [ ] Mobile responsive tested
- [ ] Accessibility tested (keyboard nav, screen readers)
- [ ] Brand voice consistent in copy
- [ ] Images follow photography guidelines
- [ ] Icons from approved system
- [ ] Buttons use semantic HTML
- [ ] Forms have proper labels and validation
- [ ] Animations respect prefers-reduced-motion
- [ ] No custom fonts/colors without approval

---

## 12. BRAND PARTNERSHIPS

### Approved Font Vendors
- Google Fonts (Plus Jakarta Sans, IBM Plex Mono)
- System fonts as fallback

### Approved Color Tools
- Figma (primary design tool)
- Coolors.co (for palette generation)
- Contrast-ratio.com (for accessibility checks)

### Design Assets Repository
- All files available in `/assets/brand/`
- SVG preferred for scalability
- PNG at 2x resolution for raster

---

## 13. CONTACT & APPROVAL

For brand questions, updates, or permission to use brand assets:

**Brand Manager:** [contact@philoduel.com]
**Legal:** Always get approval before using PhiloDuel name/logo externally
**Updated:** January 2025
**Version:** 1.0

---

This brand guide is a living document. Update it as the brand evolves, but maintain core principles: intelligence, integrity, community, and excellence.
