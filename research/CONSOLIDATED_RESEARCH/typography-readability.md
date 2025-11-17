# Typography & Readability for PhiloDuel

**Research Date:** November 2025
**Agent:** Visual Design & UX Researcher
**Session:** 3 - Design & Identity

---

## Executive Summary

Typography is the invisible art that makes or breaks reading experiences. For PhiloDuel—a text-heavy philosophical platform—getting typography right is not optional; it's existential. This document synthesizes research from Medium, Substack, academic journals, and mobile UX best practices to create readable, beautiful, and accessible typography.

---

## 1. FUNDAMENTAL PRINCIPLES

### Typography Serves Understanding

**Core Truth:** Typography is not about making text beautiful. It's about making ideas accessible.

**Goals:**
1. **Transparency**: Text should be effortless to read
2. **Hierarchy**: Structure should be instantly recognizable
3. **Emphasis**: Important ideas should stand out
4. **Rhythm**: Reading should feel natural, not exhausting

**Anti-Goals:**
- Don't prioritize aesthetics over legibility
- Don't use trends that harm readability
- Don't sacrifice accessibility for design

---

## 2. FONT SELECTION

### Body Text Fonts

**Criteria:**
- High x-height (tall lowercase letters)
- Open apertures (clear letter shapes)
- Distinct characters (1 vs l vs I)
- Strong hinting (renders well at small sizes)
- Professional but approachable

### Recommended Options

**Tier 1: Excellent for Philosophy**

1. **Inter**
   - Purpose: Modern sans-serif designed for screens
   - Strengths: Exceptional clarity, large x-height, variable font
   - Use case: Primary body text
   - Sizes: 16-18px body, 14-16px UI

2. **Charter**
   - Purpose: Serif designed for low-resolution
   - Strengths: Readable at small sizes, classic academic feel
   - Use case: Long-form reading mode
   - Sizes: 18-20px body
   - Note: Used by Practical Typography

3. **IBM Plex Sans**
   - Purpose: Corporate but friendly
   - Strengths: Clear, modern, excellent font family
   - Use case: Interface + body text
   - Sizes: 16-18px body, 14-16px UI

4. **Source Sans Pro**
   - Purpose: Adobe's open-source UI font
   - Strengths: Clean, professional, great weights
   - Use case: Primary body text
   - Sizes: 16-18px body

**Tier 2: Safe Alternatives**

5. **System Fonts** (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
   - Strengths: Fast loading, familiar, optimized per platform
   - Weaknesses: Less character, varies by OS
   - Use case: Performance-critical views

6. **Georgia**
   - Strengths: Designed for screens, serif, familiar
   - Weaknesses: Feels dated
   - Use case: Classic academic mode

### Heading Fonts

**Options:**

**1. Same as body (RECOMMENDED)**
- Maintains consistency
- Reduces load time
- Uses weight/size for hierarchy
- Example: Inter at multiple weights

**2. Complementary serif/sans pairing**
- Headings: Serif (Charter, Merriweather, Lora)
- Body: Sans (Inter, IBM Plex Sans)
- Creates distinction
- Adds personality

**3. Display font for marketing only**
- Use decorative fonts sparingly
- Only for landing pages, not app
- Examples: Playfair Display, Bebas Neue

### Special-Purpose Fonts

**Monospace (Code/Logic):**
- JetBrains Mono
- Fira Code
- SF Mono
- Use for: Formal logic notation, code examples

**Dyslexia-Friendly:**
- OpenDyslexic
- Lexend
- Atkinson Hyperlegible
- Use for: Optional accessibility mode

---

## 3. FONT SIZING

### The Golden Rules

**Rule 1: Bigger Than You Think**
- Minimum body text: 16px (mobile and desktop)
- Optimal: 18px for reading-focused apps
- Large text: 20-22px for accessibility mode

**Rule 2: Relative Sizing**
- Use rem/em, not px
- Allows user scaling
- Maintains proportions
- Base: 16px = 1rem

### Size Scale

**Mobile (320px - 768px):**
```css
/* Body Text */
--text-xs: 0.75rem;   /* 12px - Labels, captions */
--text-sm: 0.875rem;  /* 14px - Secondary text */
--text-base: 1rem;    /* 16px - Primary body */
--text-lg: 1.125rem;  /* 18px - Emphasized body */

/* Headings */
--text-xl: 1.25rem;   /* 20px - H4 */
--text-2xl: 1.5rem;   /* 24px - H3 */
--text-3xl: 1.875rem; /* 30px - H2 */
--text-4xl: 2.25rem;  /* 36px - H1 */

/* Display */
--text-5xl: 3rem;     /* 48px - Hero text */
```

**Desktop (> 1024px):**
```css
/* Body Text */
--text-base: 1.125rem; /* 18px - Primary body */
--text-lg: 1.25rem;    /* 20px - Emphasized body */

/* Headings */
--text-xl: 1.375rem;   /* 22px - H4 */
--text-2xl: 1.75rem;   /* 28px - H3 */
--text-3xl: 2.25rem;   /* 36px - H2 */
--text-4xl: 3rem;      /* 48px - H1 */

/* Display */
--text-5xl: 4rem;      /* 64px - Hero text */
```

### Context-Specific Sizing

**Reading Mode:**
- Body: 20-22px (larger for comfort)
- Line height: 1.6-1.7
- Max width: 65-75 characters

**Debate View:**
- Body: 16-18px (more content visible)
- Line height: 1.5-1.6
- Max width: 75-85 characters

**Mobile List:**
- Body: 16px (conserve space)
- Line height: 1.5
- Truncate long text

---

## 4. LINE HEIGHT (LEADING)

### The Science

**Purpose:** Space between lines affects readability dramatically

**Research:**
- Too tight: Lines feel cramped, eyes lose place
- Too loose: Loses connection between lines
- Optimal: 1.4-1.6 for body text

### Recommended Values

**Body Text:**
- Sans-serif: 1.5-1.6
- Serif: 1.4-1.5
- Small text (< 14px): 1.6-1.7
- Large text (> 20px): 1.4-1.5

**Headings:**
- H1: 1.1-1.2
- H2: 1.2-1.3
- H3-H4: 1.3-1.4

**UI Elements:**
- Buttons: 1.0-1.2
- Labels: 1.3-1.4
- Captions: 1.4-1.5

**Formula:** Longer lines need more line height
```
Line height = 1.4 + (characters per line / 100)

Example:
- 50 characters: 1.4 + 0.5 = 1.9
- 75 characters: 1.4 + 0.75 = 2.15
- Practical max: 1.7
```

---

## 5. LINE LENGTH (MEASURE)

### The Research

**Optimal:** 50-75 characters per line (CPL)
- Below 50: Too choppy, constant line breaks
- Above 75: Hard to find next line
- Sweet spot: 65 characters

### Implementation

**Desktop:**
```css
.reading-content {
  max-width: 65ch; /* ch = character width */
  margin: 0 auto;
}
```

**Responsive:**
```css
.content {
  /* Mobile: Full width with padding */
  max-width: 100%;
  padding: 0 1.5rem;
}

@media (min-width: 768px) {
  .content {
    /* Tablet: Start limiting */
    max-width: 70ch;
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .content {
    /* Desktop: Optimal reading width */
    max-width: 65ch;
    padding: 0;
  }
}
```

### Multi-Column Layouts

**When to use:**
- Desktop with wide viewport (> 1440px)
- Dashboard/overview screens
- Not for primary reading

**Specifications:**
- Column width: 45-55ch each
- Gap: 2-4rem
- Max 2 columns for text
- 3+ columns for lists/cards

---

## 6. PARAGRAPH SPACING

### Vertical Rhythm

**Principle:** Consistent spacing creates visual harmony

**Spacing Scale:**
```css
/* Tight */
--space-xs: 0.25rem;  /* 4px */
--space-sm: 0.5rem;   /* 8px */
--space-md: 1rem;     /* 16px */
--space-lg: 1.5rem;   /* 24px */
--space-xl: 2rem;     /* 32px */
--space-2xl: 3rem;    /* 48px */
--space-3xl: 4rem;    /* 64px */
```

### Application

**Between Paragraphs:**
- Body text: 1.5rem (1.5x font size)
- Dense content: 1rem
- Spacious reading: 2rem

**Between Sections:**
- Minor break: 2rem
- Major break: 3rem
- Chapter/topic: 4rem

**Between Elements:**
- Heading → Body: 0.5rem
- Body → Heading: 2rem (more space before than after)
- List items: 0.5rem
- Between lists: 1.5rem

---

## 7. FONT WEIGHT

### Weight Scale

**Available weights (variable fonts):**
- 100: Thin
- 200: Extra Light
- 300: Light
- 400: Regular (body text)
- 500: Medium (emphasis)
- 600: Semi-bold (sub-headings)
- 700: Bold (headings)
- 800: Extra Bold (rare use)
- 900: Black (avoid)

### Usage Guidelines

**Body Text:**
- Default: 400 (Regular)
- Never use < 400 for body text
- Dark mode: Consider 300-400 (lighter weight)

**Emphasis:**
- Inline emphasis: 500-600 (Medium/Semi-bold)
- Avoid using 700+ inline (too heavy)
- Prefer semantic HTML (<strong>, <em>)

**Headings:**
- H1: 700 (Bold)
- H2: 600-700 (Semi-bold to Bold)
- H3: 600 (Semi-bold)
- H4: 500-600 (Medium to Semi-bold)

**UI Elements:**
- Buttons: 500-600
- Labels: 500
- Captions: 400
- Metadata: 400

**Dark Mode Adjustments:**
- Reduce weight by 100
- Example: 600 → 500
- Reason: Light text on dark appears heavier

---

## 8. COLOR & CONTRAST

### Body Text Contrast

**WCAG Standards:**
- Level AA: 4.5:1 (minimum)
- Level AAA: 7:1 (enhanced)
- Large text (18px+): 3:1 (AA)

**Practical Values:**

**Light Mode:**
```css
--text-primary: #1a1a1a;    /* 15:1 - Primary body */
--text-secondary: #4a4a4a;  /* 7:1 - Secondary text */
--text-tertiary: #737373;   /* 4.5:1 - Metadata */
--text-disabled: #a0a0a0;   /* 3:1 - Disabled */

--background: #ffffff;
```

**Dark Mode:**
```css
--text-primary: #e8e8e8;    /* 13:1 - Primary body */
--text-secondary: #b8b8b8;  /* 7:1 - Secondary text */
--text-tertiary: #8a8a8a;   /* 4.5:1 - Metadata */
--text-disabled: #5a5a5a;   /* 3:1 - Disabled */

--background: #1a1a1a;
```

### Color-Coded Arguments

**Pro/Con/Neutral:**
```css
/* Light Mode */
--color-pro: #059669;     /* Green - Supporting */
--color-con: #dc2626;     /* Red - Opposing */
--color-neutral: #6366f1; /* Purple - Neutral */
--color-question: #f59e0b;/* Amber - Question */

/* Dark Mode */
--color-pro: #10b981;     /* Lighter green */
--color-con: #f87171;     /* Lighter red */
--color-neutral: #818cf8; /* Lighter purple */
--color-question: #fbbf24;/* Lighter amber */
```

**Usage:**
- Border left: 4px solid
- Background: 5% opacity of color
- Icon: Full opacity color
- Never use color alone (add icons)

### Link Styling

**Options:**

**1. Underline (WCAG Recommended)**
```css
a {
  color: #2563eb;
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

**2. Color + Hover Underline**
```css
a {
  color: #2563eb;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
```

**3. Color + Icon**
```css
a {
  color: #2563eb;
}
a::after {
  content: "↗";
  font-size: 0.8em;
  margin-left: 0.2em;
}
```

---

## 9. SPECIAL TEXT TREATMENTS

### Quotes & Citations

**Block Quote:**
```css
blockquote {
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.6;
  padding-left: 1.5rem;
  border-left: 4px solid #cbd5e1;
  color: #475569;
  margin: 2rem 0;
}
```

**Inline Quote:**
- Use <q> tag with smart quotes
- Style: Italic or "quoted"
- Cite source inline

**Citation:**
```css
cite {
  font-size: 0.875rem;
  font-style: normal;
  color: #64748b;
  display: block;
  margin-top: 0.5rem;
}
```

### Emphasis Hierarchy

**Levels:**
1. **Bold** (strong): Key claims
2. *Italic* (emphasis): Terminology
3. `Code`: Formal notation
4. <mark>Highlight</mark>: User-marked
5. Underline: Avoid (looks like link)

### Definition Terms

**Pattern:**
```
**Epistemology**: The study of knowledge, its nature, and its limitations.
```

**Styling:**
```css
.definition-term {
  font-weight: 600;
  color: var(--color-primary);
}
```

### Footnotes & References

**Format:**
- Superscript numbers: <sup>1</sup>
- Link to reference
- Reference list at bottom

**Styling:**
```css
sup {
  font-size: 0.7em;
  vertical-align: super;
  line-height: 0;
}
```

---

## 10. RESPONSIVE TYPOGRAPHY

### Fluid Type Scales

**Problem:** Fixed sizes feel wrong at different viewport widths

**Solution:** Clamp function
```css
.fluid-text {
  font-size: clamp(
    1rem,           /* Minimum size */
    0.875rem + 0.5vw, /* Fluid size */
    1.5rem          /* Maximum size */
  );
}
```

**Implementation:**
```css
/* Heading 1: 28px - 48px */
h1 {
  font-size: clamp(1.75rem, 1.5rem + 1.5vw, 3rem);
}

/* Heading 2: 24px - 36px */
h2 {
  font-size: clamp(1.5rem, 1.25rem + 1vw, 2.25rem);
}

/* Body: 16px - 18px */
body {
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
}
```

### Breakpoint Adjustments

**Mobile First:**
```css
/* Base: Mobile */
body {
  font-size: 1rem;
  line-height: 1.5;
}

/* Tablet */
@media (min-width: 768px) {
  body {
    font-size: 1.0625rem; /* 17px */
    line-height: 1.55;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  body {
    font-size: 1.125rem; /* 18px */
    line-height: 1.6;
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  body {
    font-size: 1.125rem; /* Keep same */
    line-height: 1.65;    /* Slightly more */
  }
}
```

---

## 11. DARK MODE TYPOGRAPHY

### Key Differences

**Challenges:**
- Light text bleeds on dark backgrounds
- Pure black is harsh on eyes
- Contrast needs careful balancing

### Color Adjustments

**Don't use:**
- Pure black (#000000) backgrounds
- Pure white (#ffffff) text
- High-contrast extremes

**Do use:**
```css
/* Dark Mode */
--bg-primary: #1a1a1a;      /* Dark gray, not black */
--text-primary: #e8e8e8;    /* Off-white, not pure white */

/* Reduces stark contrast */
```

### Typography Adjustments

**Font weight:**
- Reduce by 100 (700 → 600)
- Reason: Light text appears heavier

**Letter spacing:**
- Increase slightly (+0.01em)
- Improves legibility

**Line height:**
- Reduce slightly (-0.05)
- Text appears more spaced in dark mode

**Implementation:**
```css
body {
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.6;
}

@media (prefers-color-scheme: dark) {
  body {
    font-weight: 300; /* Lighter */
    letter-spacing: 0.01em; /* Slightly more space */
    line-height: 1.55; /* Slightly less */
  }
}
```

---

## 12. ACCESSIBILITY

### Dyslexia Considerations

**Font choices:**
- Sans-serif preferred
- Large x-height
- Distinct letter shapes
- Weighted bottoms (b vs d)

**Settings:**
- Increase letter spacing (+0.12em)
- Increase word spacing (+0.16em)
- Increase line height (+0.2)
- Shorter line lengths (50-60ch)
- Off-white on off-black (not pure contrast)

**Optional font:**
- Provide OpenDyslexic option
- User-toggleable
- Save preference

### Low Vision

**Minimum sizes:**
- Never below 16px for body
- Provide zoom up to 200%
- Maintain layout when zoomed
- High contrast mode option

**Implementation:**
```css
/* Support browser zoom */
html {
  font-size: 100%; /* Don't set px */
}

/* Relative units throughout */
body {
  font-size: 1rem; /* Scales with browser */
}
```

### Color Blindness

**Don't rely on color alone:**
- Add icons
- Add text labels
- Use patterns/shapes
- Ensure sufficient contrast

**Test tools:**
- Color Oracle
- Sim Daltonism
- Chrome DevTools
- Accessible Colors

---

## 13. MEDIUM & SUBSTACK PATTERNS

### What They Do Right

**Medium:**
1. **Generous whitespace**: 40% of screen is empty
2. **Optimal line length**: ~65 characters
3. **Large body text**: 21px
4. **Perfect line height**: 1.58
5. **Sophisticated serif**: Charter or Signifier

**Substack:**
1. **Clean hierarchy**: Clear heading levels
2. **Readable on mobile**: Scales well
3. **Fast loading**: System fonts option
4. **Email-friendly**: Simple HTML
5. **Consistent spacing**: Predictable rhythm

### Application to PhiloDuel

**Adopt:**
- Large base font (18px minimum)
- Generous line height (1.5-1.6)
- Max width constraint (65-70ch)
- Serif option for reading mode

**Avoid:**
- Too much whitespace (we need more content density)
- Pure article layout (we have threaded discussions)
- Long paragraphs (break into argument chunks)

---

## 14. IMPLEMENTATION GUIDE

### CSS Custom Properties

```css
:root {
  /* Fonts */
  --font-body: 'Inter', -apple-system, system-ui, sans-serif;
  --font-heading: var(--font-body);
  --font-mono: 'JetBrains Mono', monospace;

  /* Sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;

  /* Colors */
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-tertiary: #737373;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #e8e8e8;
    --text-secondary: #b8b8b8;
    --text-tertiary: #8a8a8a;
  }
}
```

### Base Styles

```css
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-lg);
}

p {
  margin-bottom: var(--space-md);
}

.reading-mode {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  max-width: 65ch;
}
```

---

## 15. TESTING CHECKLIST

### Before Launch

**Readability:**
- [ ] Test on iPhone SE (small screen)
- [ ] Test on iPad (medium screen)
- [ ] Test on 27" monitor (large screen)
- [ ] Test with browser zoom 200%
- [ ] Test with system font size increased

**Accessibility:**
- [ ] Run WAVE accessibility checker
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Test keyboard navigation
- [ ] Check contrast ratios (WebAIM tool)
- [ ] Test with color blindness simulator

**Performance:**
- [ ] Measure font loading time
- [ ] Check for layout shift
- [ ] Verify font subsetting
- [ ] Test offline font fallbacks

**Cross-browser:**
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## CONCLUSION

Typography is the foundation of PhiloDuel's reading experience. Get it right, and users will stay for hours, engaged in deep philosophical discussions. Get it wrong, and they'll leave before finishing their first debate.

**Three Golden Rules:**

1. **Bigger Than You Think**: 16px minimum, 18px optimal
2. **Shorter Than You Want**: 65 characters per line maximum
3. **Lighter Than Necessary**: Let whitespace breathe

The goal: **Make philosophy feel as effortless to read as a tweet, but as intellectually satisfying as a journal article.**
