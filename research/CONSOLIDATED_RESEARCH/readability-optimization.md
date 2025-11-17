# Readability Optimization

## Executive Summary

Philosophical arguments can span thousands of words, requiring extended reading sessions. Readability optimization is essential for making complex philosophical discourse accessible and enjoyable for all users. This document provides research-backed guidelines for typography, spacing, contrast, and reading modes optimized for long-form content.

**Key Insights:**
- Minimum 16px base font size, with 18-20px preferred for body text
- Line height of 1.5-1.8 (WCAG minimum 1.5, optimal 1.4-1.65 for body text)
- 45-75 characters per line (66 is ideal, 80 max per WCAG)
- WCAG AA contrast: 4.5:1 for text, AAA: 7:1 (aim for AAA on body text)
- Sans-serif fonts generally more readable on screens
- User customization is critical—readers have different needs
- Dark mode requires careful contrast consideration

**Our Commitment:** Design for extended reading sessions with excellent default typography and extensive user customization options.

---

## Typography Best Practices

### Font Family Selection

**Screen Readability:**
Sans-serif fonts are generally more readable on screens than serif fonts, especially at smaller sizes and on lower-resolution displays.

**Recommended Font Stacks:**

**Primary Body Text (Sans-Serif):**
```css
body {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
}
```

**Alternative for Enhanced Readability:**
```css
body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}
```

**Dyslexia-Friendly Option (User Preference):**
```css
body.dyslexia-friendly {
  font-family:
    'OpenDyslexic',
    'Comic Sans MS',
    'Arial',
    sans-serif;
  letter-spacing: 0.05em;
  word-spacing: 0.16em;
}
```

**Serif Option (User Preference for Some):**
```css
body.serif-mode {
  font-family:
    'Georgia',
    'Times New Roman',
    Times,
    serif;
}
```

### Dyslexia-Friendly Typography

**Recommended Fonts:**
- **OpenDyslexic** - Weighted bottoms to prevent letter rotation
- **Dyslexie** - Unique letter shapes to reduce confusion
- **Comic Sans MS** - Surprisingly effective, distinct letter shapes
- **Arial** - Simple, clear letterforms
- **Verdana** - Generous spacing, designed for screens

**Design Characteristics:**
- Increased letter spacing (0.05-0.12em)
- Increased word spacing (0.16em)
- Larger font sizes (minimum 16px, prefer 18-20px)
- Avoiding italics where possible
- Left-aligned text (no justify)
- Shorter paragraph lengths

**Important Research Note:** Studies show mixed results on dyslexia-specific fonts. Spacing, size, and layout often matter more than the specific font. Offering user choice is most effective.

### Font Sizes

**Base Size:**
- **Minimum:** 16px (WCAG recommendation)
- **Recommended:** 18-20px for body text
- **Large Text:** 18pt (24px) or 14pt bold (18.66px)

**Size Scale:**
```css
:root {
  /* Base size */
  --font-size-base: 18px;

  /* Scale */
  --font-size-xs: 0.75rem;   /* 13.5px */
  --font-size-sm: 0.875rem;  /* 15.75px */
  --font-size-md: 1rem;      /* 18px - body text */
  --font-size-lg: 1.125rem;  /* 20.25px */
  --font-size-xl: 1.25rem;   /* 22.5px */
  --font-size-2xl: 1.5rem;   /* 27px */
  --font-size-3xl: 1.875rem; /* 33.75px */
  --font-size-4xl: 2.25rem;  /* 40.5px */
}

/* Typography Application */
body {
  font-size: var(--font-size-md);
}

h1 {
  font-size: var(--font-size-4xl);
  line-height: 1.2;
}

h2 {
  font-size: var(--font-size-3xl);
  line-height: 1.25;
}

h3 {
  font-size: var(--font-size-2xl);
  line-height: 1.3;
}

.caption, .metadata {
  font-size: var(--font-size-sm);
}
```

**User Scaling:**
Users must be able to scale text to 200% without loss of content or functionality (WCAG 1.4.4 Level AA).

```css
/* Support browser text zoom - use relative units */
html {
  font-size: 100%; /* Respects user browser settings */
}

body {
  font-size: 1.125rem; /* 18px if user hasn't changed base */
}

/* Support user font size preference */
@media (prefers-reduced-motion: reduce) {
  /* Users who prefer reduced motion may also prefer larger text */
}
```

### Font Weight

**Body Text:**
- Regular weight (400) for body text
- Medium (500) for emphasis
- Bold (700) for strong emphasis and headings

**Avoid:**
- Light weights (300 or below) for body text—harder to read
- Excessive bolding—reduces effectiveness

```css
body {
  font-weight: 400;
}

strong, b {
  font-weight: 600; /* Slightly heavier for emphasis */
}

h1, h2, h3 {
  font-weight: 700;
}

.thread-author {
  font-weight: 500; /* Medium weight for secondary emphasis */
}
```

### Line Height (Leading)

**WCAG Requirement:** Minimum 1.5 times the font size

**Optimal Ranges:**
- **Body text:** 1.5-1.65 (sweet spot: 1.5-1.6)
- **Headings:** 1.1-1.3
- **Captions/short lines:** 1.3-1.4

**Why It Matters:**
Lines that are too tight make it hard for eyes to track to the next line. Lines that are too loose feel disconnected.

```css
:root {
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 1.75;
}

body {
  line-height: var(--line-height-normal); /* 1.5 */
}

h1, h2, h3, h4, h5, h6 {
  line-height: var(--line-height-tight); /* 1.25 */
}

.long-form-content {
  line-height: var(--line-height-relaxed); /* 1.625 - easier for extended reading */
}

/* User preference option */
body.relaxed-spacing {
  line-height: var(--line-height-loose); /* 1.75 */
}
```

### Line Length (Measure)

**Optimal Line Length:**
- **Ideal:** 66 characters per line
- **Acceptable:** 45-75 characters
- **Maximum (WCAG 1.4.8):** 80 characters

**Why It Matters:**
Lines that are too long tire the eyes and make it hard to find the start of the next line. Lines that are too short break up reading rhythm.

```css
.article-content {
  max-width: 65ch; /* ~65 characters, adjusts with font size */
  margin-inline: auto;
}

.wide-content {
  max-width: 75ch; /* Slightly wider for tables, code */
}

/* Responsive considerations */
@media (max-width: 768px) {
  .article-content {
    max-width: 100%;
    padding-inline: 1.5rem;
  }
}
```

**Relationship to Container Width:**
The wider the column, the larger the line height should be. For very wide text (90+ characters), increase line height to 1.7-1.8.

### Paragraph Spacing

**Between Paragraphs:**
Adequate spacing helps readers parse content structure.

```css
p {
  margin-bottom: 1.25em; /* Relative to font size */
}

p + p {
  margin-top: 0;
}

/* For philosophical arguments, slightly more space */
.argument-content p {
  margin-bottom: 1.5em;
}

/* User preference for extra spacing */
body.generous-spacing p {
  margin-bottom: 2em;
}
```

### Letter Spacing (Tracking)

**Normal Text:**
Default letter spacing is usually fine, but slight adjustments can help.

```css
body {
  letter-spacing: 0.01em; /* Very subtle increase */
}

/* Headings often benefit from tighter tracking */
h1, h2, h3 {
  letter-spacing: -0.01em;
}

/* All caps need more spacing */
.all-caps {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Dyslexia-friendly option */
body.dyslexia-friendly {
  letter-spacing: 0.05em;
  word-spacing: 0.16em;
}
```

---

## Color Contrast

### WCAG Contrast Requirements

**Level AA (Minimum):**
- **Normal text:** 4.5:1 contrast ratio
- **Large text (18pt/24px or 14pt/18.66px bold):** 3:1
- **UI components:** 3:1

**Level AAA (Enhanced):**
- **Normal text:** 7:1 contrast ratio
- **Large text:** 4.5:1

**Our Target:** AAA (7:1) for body text, AA minimum for all other text

### Light Mode Color Palette

```css
:root {
  /* Background */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-bg-tertiary: #e9ecef;

  /* Text */
  --color-text-primary: #1a1a1a;      /* 16.9:1 contrast - AAA */
  --color-text-secondary: #4a4a4a;    /* 9.7:1 contrast - AAA */
  --color-text-tertiary: #6c757d;     /* 5.9:1 contrast - AA */

  /* Links */
  --color-link: #0051a3;              /* 7.3:1 contrast - AAA */
  --color-link-hover: #003d7a;        /* 10.2:1 contrast - AAA */

  /* UI Elements */
  --color-border: #ced4da;            /* 3.2:1 contrast - AA for UI */
  --color-focus: #005fcc;             /* For focus indicators */
}

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}

a {
  color: var(--color-link);
}

a:hover {
  color: var(--color-link-hover);
}
```

### Dark Mode Considerations

Dark mode is NOT just inverting colors—it requires careful consideration to avoid eye strain.

**Dark Mode Best Practices:**
- Use off-black (#121212 to #1e1e1e), not pure black (#000000)
- Use off-white (#e0e0e0 to #f0f0f0), not pure white (#ffffff)
- Reduce contrast slightly from light mode (pure white on pure black is too harsh)
- Desaturate colors slightly
- Use elevated surfaces (cards) with subtle lightening

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Backgrounds - not pure black! */
    --color-bg-primary: #1a1a1a;
    --color-bg-secondary: #242424;
    --color-bg-tertiary: #2e2e2e;

    /* Text - not pure white! */
    --color-text-primary: #e8e8e8;      /* ~13:1 contrast */
    --color-text-secondary: #b8b8b8;    /* ~7:1 contrast */
    --color-text-tertiary: #8a8a8a;     /* ~4.5:1 contrast */

    /* Links - slightly desaturated */
    --color-link: #6ba3ff;              /* 7.5:1 contrast */
    --color-link-hover: #8ab8ff;        /* 9:1 contrast */

    /* UI Elements */
    --color-border: #404040;            /* 3.5:1 contrast */
    --color-focus: #6ba3ff;
  }
}

/* Manual dark mode toggle */
body.dark-mode {
  /* Same as above prefers-color-scheme */
}
```

**Testing Dark Mode:**
1. Check all contrast ratios (they change in dark mode!)
2. Test with actual users in low-light environments
3. Verify images/diagrams work in both modes
4. Consider offering contrast adjustment slider

### Color Blindness Considerations

**Types of Color Blindness:**
- **Protanopia** (red-blind): ~1% of males
- **Deuteranopia** (green-blind): ~1% of males
- **Tritanopia** (blue-blind): Rare
- **Achromatopsia** (complete color blindness): Very rare

**Design Principles:**
1. **Never use color alone to convey information**
2. Use patterns, icons, or text labels in addition to color
3. Ensure sufficient contrast for all color combinations
4. Test with color blindness simulators

**Example: Thread Depth Indicators**
```html
<!-- Bad: Color only -->
<div class="thread depth-1" style="border-left: 3px solid blue;">

<!-- Good: Color + visual indicator + text -->
<div class="thread depth-1" aria-label="Depth level 1">
  <span class="depth-indicator" aria-hidden="true">
    <span class="depth-line"></span>
    <span class="depth-number">1</span>
  </span>
  <!-- Content -->
</div>
```

**Color Palette for Accessibility:**
```css
/* Use color pairs with sufficient contrast AND distinct hues */
:root {
  --color-success: #0e7c3a;  /* Green - distinct from red even in grayscale */
  --color-error: #c41e3a;    /* Red - distinct from green even in grayscale */
  --color-warning: #8f5a00;  /* Orange/brown - works in protanopia */
  --color-info: #0051a3;     /* Blue - works in most types */
}

/* Ensure sufficient difference in lightness, not just hue */
```

**Testing Tools:**
- Chromatic Vision Simulator (browser extension)
- Coblis — Color Blindness Simulator
- Color Oracle (desktop app)
- Built-in macOS/iOS color filters

---

## Reading Modes

### Default Reading Mode

**Optimized for Long-Form Content:**

```css
.article-content {
  /* Typography */
  font-size: 1.125rem;        /* 18px */
  line-height: 1.6;
  max-width: 65ch;
  margin-inline: auto;

  /* Spacing */
  padding-block: 3rem;
  padding-inline: 1.5rem;

  /* Color */
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
}

.article-content p {
  margin-bottom: 1.5em;
}

.article-content h2 {
  margin-top: 2.5em;
  margin-bottom: 0.75em;
}

.article-content h3 {
  margin-top: 2em;
  margin-bottom: 0.5em;
}
```

### Focus Mode (Distraction-Free Reading)

Remove all distractions for immersive reading:

```css
body.focus-mode {
  /* Hide navigation, sidebars, etc. */
}

body.focus-mode .article-content {
  max-width: 70ch;
  margin-inline: auto;
  padding-block: 4rem;

  /* Increased contrast for focus */
  background-color: #ffffff;
  color: #000000;

  /* Centered, isolated */
  min-height: 100vh;
}

body.focus-mode .sidebar,
body.focus-mode .header-nav,
body.focus-mode .footer {
  display: none;
}

/* Keep skip link accessible */
body.focus-mode .skip-link {
  display: block;
}
```

**Keyboard Shortcut:**
- Press `f` to toggle focus mode
- Press `Esc` to exit focus mode

### High Contrast Mode

For users with low vision:

```css
body.high-contrast {
  --color-bg-primary: #ffffff;
  --color-text-primary: #000000;
  --color-link: #0000ee;
  --color-link-hover: #0000aa;
  --color-border: #000000;

  /* Remove shadows and subtle effects */
  --shadow-sm: none;
  --shadow-md: none;
}

body.high-contrast button {
  border: 2px solid #000000;
}

/* Windows High Contrast Mode support */
@media (prefers-contrast: high) {
  /* Automatic high contrast adjustments */
  body {
    background-color: Canvas;
    color: CanvasText;
  }

  a {
    color: LinkText;
  }

  button {
    border: 2px solid ButtonBorder;
    background-color: ButtonFace;
    color: ButtonText;
  }
}
```

### User Customization Options

**Reading Preferences Panel:**

Allow users to customize:
1. **Font size:** 14px, 16px, 18px (default), 20px, 22px, 24px
2. **Font family:** Sans-serif (default), Serif, Dyslexia-friendly, Monospace
3. **Line height:** Compact (1.4), Normal (1.5), Relaxed (1.65), Loose (1.8)
4. **Line width:** Narrow (55ch), Medium (65ch - default), Wide (75ch), Full width
5. **Theme:** Light, Dark, Auto, High Contrast
6. **Paragraph spacing:** Normal, Generous
7. **Letter spacing:** Normal, Increased (dyslexia-friendly)

**Implementation:**

```javascript
// Save user preferences
function saveReadingPreferences(preferences) {
  localStorage.setItem('reading-preferences', JSON.stringify(preferences));
  applyReadingPreferences(preferences);
}

// Apply preferences
function applyReadingPreferences(preferences) {
  const root = document.documentElement;

  root.style.setProperty('--font-size-base', `${preferences.fontSize}px`);
  root.style.setProperty('--line-height-base', preferences.lineHeight);
  root.style.setProperty('--content-max-width', preferences.lineWidth);

  document.body.className = '';
  if (preferences.fontFamily === 'dyslexia') {
    document.body.classList.add('dyslexia-friendly');
  } else if (preferences.fontFamily === 'serif') {
    document.body.classList.add('serif-mode');
  }

  if (preferences.theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (preferences.theme === 'high-contrast') {
    document.body.classList.add('high-contrast');
  }

  if (preferences.spacing === 'generous') {
    document.body.classList.add('generous-spacing');
  }
}

// Load preferences on page load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('reading-preferences');
  if (saved) {
    applyReadingPreferences(JSON.parse(saved));
  }
});
```

**Preferences UI:**

```html
<div class="reading-preferences" role="dialog" aria-labelledby="prefs-title">
  <h2 id="prefs-title">Reading Preferences</h2>

  <fieldset>
    <legend>Font Size</legend>
    <input type="range" min="14" max="24" step="2" value="18"
           aria-label="Font size in pixels">
    <output>18px</output>
  </fieldset>

  <fieldset>
    <legend>Font Family</legend>
    <label>
      <input type="radio" name="font" value="sans" checked>
      Sans-serif
    </label>
    <label>
      <input type="radio" name="font" value="serif">
      Serif
    </label>
    <label>
      <input type="radio" name="font" value="dyslexia">
      Dyslexia-friendly
    </label>
  </fieldset>

  <fieldset>
    <legend>Line Height</legend>
    <label>
      <input type="radio" name="line-height" value="1.4">
      Compact (1.4)
    </label>
    <label>
      <input type="radio" name="line-height" value="1.5" checked>
      Normal (1.5)
    </label>
    <label>
      <input type="radio" name="line-height" value="1.65">
      Relaxed (1.65)
    </label>
    <label>
      <input type="radio" name="line-height" value="1.8">
      Loose (1.8)
    </label>
  </fieldset>

  <!-- More options... -->

  <button type="button" onclick="savePreferences()">
    Save Preferences
  </button>
  <button type="button" onclick="resetToDefaults()">
    Reset to Defaults
  </button>
</div>
```

---

## Platform Examples

### Medium

**What works well:**
- Clean, distraction-free reading experience
- Excellent default typography (serif font, generous spacing)
- Optimal line length (~70 characters)
- Focus on content, minimal UI
- Responsive images
- Reading time estimate

**Typography Specs:**
- Font: Serif (Charter or Georgia fallback)
- Size: 21px base
- Line height: 1.58
- Paragraph spacing: 29px
- Max width: ~680px (translates to ~70-75 characters)

**What we can improve:**
- Limited user customization (can't change font size/family easily)
- No built-in high contrast or dyslexia modes
- Dark mode is available but requires sign-in

**Key takeaways:**
- Simple, focused reading experience reduces cognitive load
- Generous typography (21px, 1.58 line-height) is comfortable for extended reading
- White space is a feature, not a bug
- Reading time estimates help users plan
- Progressive image loading maintains reading flow

### Substack

**What works well:**
- Email-optimized readability (works in email clients and web)
- Clean typography with good contrast
- Mobile-first responsive design
- Font size feels slightly larger than typical web content

**Typography Specs:**
- Font: System font stack (excellent cross-platform support)
- Size: 18-20px base (varies by device)
- Line height: ~1.6
- Paragraph spacing: Generous
- Responsive scaling

**What we can improve:**
- Limited accessibility features
- No reading mode options
- Basic dark mode support

**Key takeaways:**
- System fonts load instantly and feel native
- Email-safe typography principles apply to web reading too
- Mobile-first ensures readability on all devices
- Simple is often better—avoid over-design

### Wikipedia

**What works well:**
- High information density with maintained readability
- Excellent link contrast and underlines
- Clear heading hierarchy
- Semantic HTML structure
- Multi-language support with appropriate typography per language

**Typography Specs:**
- Font: System serif stack (Georgia, Times New Roman)
- Size: 16px base (on the small side)
- Line height: 1.6
- Max width: ~960px (wide, but broken into columns on complex pages)

**What we can improve:**
- Small default font size could be larger
- Line length is too long on some pages
- Limited built-in customization

**Accessibility strengths:**
- Excellent semantic HTML
- Comprehensive alt text on images
- Good heading structure
- Works well with screen readers
- Multiple language support

**Key takeaways:**
- Information-dense content requires extra attention to hierarchy
- Wikipedia's readability comes from structure, not just typography
- Semantic HTML benefits both humans and machines
- Multi-column layouts can help with very wide screens

---

## Implementation Priority

### MVP (Phase 1) - Essential Readability

**Critical Features:**
1. ✅ **18px base font size** (minimum 16px)
2. ✅ **1.5 line height minimum** (1.6 for body text)
3. ✅ **65-character line length** (max-width: 65ch)
4. ✅ **WCAG AA contrast** (4.5:1 minimum, aim for 7:1 on body text)
5. ✅ **System font stack** (fast loading, accessible)
6. ✅ **Responsive typography** (scales with viewport)
7. ✅ **200% zoom support** (WCAG requirement)
8. ✅ **Clear heading hierarchy**
9. ✅ **Generous paragraph spacing** (1.5em)
10. ✅ **Dark mode** with proper contrast

**CSS Foundation:**
```css
:root {
  --font-size-base: 18px;
  --line-height-base: 1.6;
  --content-max-width: 65ch;
  --color-text: #1a1a1a;
  --color-bg: #ffffff;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text);
  background-color: var(--color-bg);
}

.article-content {
  max-width: var(--content-max-width);
  margin-inline: auto;
}
```

**Estimated Timeline:** Week 1-2 of development

### Phase 2 - Enhanced Reading Experience

**Enhanced Features:**
1. ✅ **User font size control** (14-24px range)
2. ✅ **Font family options** (Sans-serif, Serif, Dyslexia-friendly)
3. ✅ **Line height options** (1.4, 1.5, 1.65, 1.8)
4. ✅ **Focus mode** (distraction-free reading)
5. ✅ **High contrast mode**
6. ✅ **AAA contrast on body text** (7:1)
7. ✅ **Reading preferences panel** (save settings)
8. ✅ **Dark mode toggle** (not just auto)
9. ✅ **Line width options** (55ch, 65ch, 75ch, full)
10. ✅ **Paragraph spacing control**

**Estimated Timeline:** Month 2-3

### Phase 3 - Advanced Customization

**Advanced Features:**
1. ✅ **Custom color themes** (beyond light/dark)
2. ✅ **Reading progress indicator**
3. ✅ **Font preview in preferences**
4. ✅ **Preference profiles** (quick presets: dyslexia-friendly, high contrast, etc.)
5. ✅ **Per-article preferences** (some users might want different settings for different content)
6. ✅ **Reading time estimates**
7. ✅ **Bookmark and resume reading position**
8. ✅ **Print-optimized styles**
9. ✅ **PDF export with typography preservation**
10. ✅ **Sync preferences across devices** (for logged-in users)

**Estimated Timeline:** Month 4-6

---

## Testing Readability

### Manual Testing

**Readability Checklist:**
- [ ] Read a 2000-word article—is it comfortable?
- [ ] Test at different zoom levels (100%, 150%, 200%)
- [ ] Read in different lighting conditions
- [ ] Test on multiple devices (desktop, tablet, phone)
- [ ] Try different font size preferences
- [ ] Read in both light and dark mode
- [ ] Test with dyslexia-friendly settings
- [ ] Print a page—does it look good?

**Quantitative Tests:**
- Measure actual characters per line at default width
- Verify contrast ratios with tools
- Check font sizes render as expected
- Test line-height calculations

### User Testing

**Questions for Users:**
1. How comfortable was reading for 10+ minutes?
2. Did you feel eye strain?
3. Was the font size appropriate?
4. Was the line spacing comfortable?
5. Did you wish you could change anything?
6. How was the contrast (too stark, too subtle, just right)?
7. Did you use dark mode? How was it?
8. Would you use customization options if available?

### A/B Testing

**Variables to Test:**
- Default font size (16px vs 18px vs 20px)
- Line height (1.5 vs 1.6 vs 1.7)
- Line width (60ch vs 65ch vs 70ch)
- Font family (system sans vs serif)
- Paragraph spacing

**Metrics:**
- Time on page (longer = more engaged reading)
- Scroll depth (did they finish the article?)
- Return rate (do they come back?)
- Preference survey results
- Accessibility feedback

---

## Accessibility Integration

Readability and accessibility are inseparable. All readability features should:

1. **Be keyboard accessible** - All customization controls
2. **Be screen reader friendly** - Announce preference changes
3. **Respect user preferences** - prefers-color-scheme, prefers-reduced-motion
4. **Work with zoom** - Don't break at 200% zoom
5. **Maintain contrast** - In all modes and themes
6. **Be testable** - Automated contrast checking in CI/CD

**Example: Accessible Preference Toggle**

```html
<button
  type="button"
  aria-pressed="false"
  aria-label="Enable dark mode"
  onclick="toggleDarkMode()"
>
  <svg aria-hidden="true"><!-- icon --></svg>
  <span>Dark Mode</span>
</button>

<script>
function toggleDarkMode() {
  const button = event.target;
  const isDark = document.body.classList.toggle('dark-mode');

  button.setAttribute('aria-pressed', isDark);
  button.setAttribute('aria-label', isDark ? 'Disable dark mode' : 'Enable dark mode');

  // Announce to screen readers
  announceToScreenReader(isDark ? 'Dark mode enabled' : 'Dark mode disabled');

  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'visually-hidden';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
}
</script>
```

---

## Key Resources

### Typography References
- **Practical Typography** by Matthew Butterick: https://practicaltypography.com/
- **Typography for Lawyers** (applies to all content): https://typographyforlawyers.com/
- **Web Typography** by Richard Rutter
- **The Elements of Typographic Style** by Robert Bringhurst

### Tools
- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Colour Contrast Analyser (CCA):** https://www.tpgi.com/color-contrast-checker/
- **Type Scale:** https://type-scale.com/
- **Modular Scale:** https://www.modularscale.com/
- **Google Fonts:** https://fonts.google.com/ (filter by readability features)

### Research
- **Readability Research:** Bayer University studies on line length and reading speed
- **WebAIM Typography Guidelines:** https://webaim.org/articles/typography/
- **A11Y Style Guide Typography:** https://a11y-style-guide.com/

---

## Conclusion

Readability optimization is fundamental to making philosophical discourse accessible. By implementing research-backed typography, ensuring excellent contrast, and providing extensive user customization, we create a platform where extended reading is comfortable and enjoyable for everyone.

**Key Principles:**
1. Start with excellent defaults (18px, 1.6 line-height, 65ch width)
2. Provide user customization (people have different needs)
3. Test with real users reading long-form content
4. Maintain accessibility in all reading modes
5. Measure and iterate based on feedback

**Remember:** The best typography is invisible—readers should focus on ideas, not struggle with presentation.
