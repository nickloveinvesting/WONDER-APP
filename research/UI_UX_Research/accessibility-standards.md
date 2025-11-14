# Accessibility Standards

## Executive Summary

Accessibility is not optional—it is a fundamental requirement for an inclusive philosophy platform. This document outlines our commitment to WCAG 2.1 AA compliance as a minimum standard, with a focus on achieving AAA where possible. Philosophy is for everyone, and our platform must be accessible to users with visual, auditory, motor, and cognitive disabilities.

**Key Insights:**
- WCAG 2.1 AA is the international standard and legally required in many jurisdictions (EU by June 2025, US federal sites by 2026-2027)
- Screen readers require semantic HTML, proper ARIA labels, and logical document structure
- Keyboard navigation must be fully functional—no mouse should be required
- Nested conversation threads present unique accessibility challenges that require careful ARIA implementation
- Testing with real users and assistive technology is essential

**Our Commitment:** We will meet WCAG 2.1 AA as our baseline and strive for AAA compliance where feasible, particularly for reading-intensive philosophical content.

---

## Accessibility Standards Overview

### WCAG 2.1 AA Requirements

The Web Content Accessibility Guidelines (WCAG) 2.1 provides an international standard for web accessibility. Level AA is the industry standard and legally required for many organizations.

**Four Core Principles (POUR):**

1. **Perceivable** - Information and user interface components must be presentable to users in ways they can perceive
2. **Operable** - User interface components and navigation must be operable
3. **Understandable** - Information and the operation of user interface must be understandable
4. **Robust** - Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies

### Compliance Levels

- **Level A** (Essential) - If not met, assistive technology may not be able to operate the page
- **Level AA** (Ideal Support) - Required for government websites and our target standard
- **Level AAA** (Specialized Support) - Enhanced accessibility for specific content areas

### Legal Requirements (2025)

- **European Accessibility Act (EAA):** WCAG 2.1 AA required by June 28, 2025 for all digital content in EU
- **U.S. ADA Title II:** WCAG 2.1 AA required by 2026 (entities over 50K) and 2027 (smaller entities)
- **Section 508:** Federal agencies must provide comparable access for disabled users

### Our Commitment

**Minimum Standard:** WCAG 2.1 AA compliance across all features

**Enhanced Goals:**
- AAA contrast ratios (7:1) for body text where possible
- AAA target sizes for touch interactions where feasible
- Beyond-compliance features for long-form philosophical reading
- Continuous user testing with assistive technology users

---

## Platform Analysis

### GOV.UK Design System

**Accessibility features:**
- Fully compliant with WCAG 2.2 AA (ahead of requirements)
- Accessible components and patterns library
- Comprehensive accessibility testing documentation
- Plain language guidelines integrated

**WCAG compliance:** WCAG 2.2 AA (exceeds current requirements)

**What works well:**
- Systematic approach to accessibility across all components
- Clear documentation of accessibility requirements for each pattern
- Progressive enhancement philosophy
- Focus on semantic HTML first, ARIA second
- Extensive guidance on plain language writing
- Three principles: web accessibility, universal design, progressive enhancement

**What we can improve:**
- GOV.UK emphasizes that using their design system doesn't automatically make a service accessible—we must conduct additional research, design, development, and testing
- Their iterative approach to accessibility improvements should inform our continuous improvement process

**Key takeaways:**
- Accessibility must be built into every component from the start
- Using accessible components doesn't guarantee an accessible service—integration matters
- Plain language is essential for government communication and equally important for philosophy
- WCAG 2.2 should be our target, not just 2.1

### WebAIM (Web Accessibility In Mind)

**Accessibility features:**
- Comprehensive screen reader compatibility guidelines
- Extensive testing tools and resources
- User survey data on screen reader preferences
- Practical implementation guides

**WCAG compliance:** Exceeds WCAG—provides implementation guidance

**What works well:**
- 76% of screen reader users always or often navigate by headings when available
- Emphasis on semantic HTML structure before ARIA
- Clear guidance on skip links and navigation shortcuts
- Comprehensive link text best practices
- Focus on testing with default screen reader settings

**What we can improve:**
- WebAIM warns against testing with screen readers unless you know how to use them—we should hire expert testers
- Their emphasis on heading structure is critical for our long-form philosophical content

**Key takeaways:**
- Heading structure is the #1 navigation method for screen reader users
- Every link must make sense when read by itself
- Skip links are essential for bypassing repetitive navigation
- Test with real screen reader users, not just automated tools
- "Click here" and "more" link text must be avoided

### A11Y Project

**Accessibility features:**
- Community-driven accessibility checklist
- WCAG-based implementation guidance
- Practical, actionable recommendations
- Focus on keyboard navigation

**WCAG compliance:** WCAG 2.1 AA target

**What works well:**
- Emphasis that "there is no such thing as perfect accessibility"
- Content is the most important part—plain language is essential
- Keyboard navigation is critical for users who cannot use a mouse
- Landmark regions (nav, main, etc.) communicate page layout
- Title attributes have issues and should be avoided

**What we can improve:**
- Their recommendation to use plain language and avoid idioms is crucial for philosophy
- Warning about title attributes—we should use visible labels instead
- Emphasis on keyboard navigation for all functionality

**Key takeaways:**
- Accessibility is a continuous process, not a one-time achievement
- Keyboard operation is essential—some users cannot use a mouse
- Semantic HTML (nav, main, article) is fundamental
- Plain language matters even for complex philosophical content
- Community resources and checklists can guide implementation

---

## Screen Reader Optimization

### Semantic HTML Structure

Screen readers rely on semantic HTML to understand and navigate content. Use proper HTML5 elements:

```html
<header>
  <nav aria-label="Main navigation">
    <!-- Navigation content -->
  </nav>
</header>

<main id="main-content">
  <article>
    <h1>Philosophical Argument Title</h1>
    <section>
      <h2>Main Claim</h2>
      <!-- Content -->
    </section>
  </article>
</main>

<aside aria-label="Related arguments">
  <!-- Sidebar content -->
</aside>

<footer>
  <!-- Footer content -->
</footer>
```

**Essential Semantic Elements:**
- `<header>` - Site or article header
- `<nav>` - Navigation sections
- `<main>` - Main content (only one per page)
- `<article>` - Self-contained content (philosophical arguments)
- `<section>` - Thematic grouping of content
- `<aside>` - Tangentially related content
- `<footer>` - Site or article footer

### Heading Structure

Headings are the #1 navigation method for screen reader users (76% always/often use them). Create a logical heading hierarchy:

**Best Practices:**
- Only one `<h1>` per page (the main topic/title)
- Don't skip heading levels (h1 → h2 → h3, not h1 → h3)
- Headings should represent an accurate outline of content
- Front-load important information in headings

**Example for Philosophical Argument:**
```html
<h1>The Trolley Problem: A Utilitarian Analysis</h1>
  <h2>Introduction</h2>
  <h2>Background</h2>
    <h3>Historical Context</h3>
    <h3>Variations of the Problem</h3>
  <h2>Utilitarian Framework</h2>
    <h3>Greatest Happiness Principle</h3>
    <h3>Calculating Consequences</h3>
  <h2>Analysis</h2>
    <h3>Argument For Pulling the Lever</h3>
    <h3>Counterarguments</h3>
  <h2>Conclusion</h2>
```

### ARIA Labels and Landmarks

Use ARIA to enhance accessibility when semantic HTML isn't sufficient:

**Landmark Roles:**
```html
<nav aria-label="Main navigation">
<nav aria-label="Thread navigation">
<main aria-label="Philosophical argument">
<aside aria-label="Related discussions">
<section aria-label="Comments" aria-describedby="comment-count">
```

**Important ARIA Attributes:**
- `aria-label` - Provides accessible name when visible label isn't present
- `aria-labelledby` - References another element for the accessible name
- `aria-describedby` - Provides additional description
- `aria-current="page"` - Indicates current page in navigation
- `aria-expanded="true/false"` - For expandable sections (threads, accordions)
- `aria-live="polite"` - For dynamic content updates
- `aria-required="true"` - For required form fields

### Nested Conversation Threading for Screen Readers

**Critical Challenge:** Deeply nested conversation threads can be confusing for screen readers.

**ARIA Tree Pattern for Threads:**

```html
<div role="tree" aria-label="Philosophical discussion thread">
  <div role="treeitem" aria-expanded="true" aria-level="1">
    <div class="comment-content">
      <h3 id="comment-1">Original Argument by Alice</h3>
      <p>Kant's categorical imperative suggests...</p>
    </div>

    <div role="group">
      <div role="treeitem" aria-expanded="true" aria-level="2">
        <div class="comment-content">
          <h4 id="comment-2">Reply by Bob</h4>
          <p>I disagree with your interpretation because...</p>
        </div>

        <div role="group">
          <div role="treeitem" aria-level="3">
            <div class="comment-content">
              <h5 id="comment-3">Reply by Alice</h5>
              <p>That's a good point, but consider...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Alternative: List-based Threading:**

For simpler implementation, use nested lists with clear hierarchy:

```html
<div class="thread-container">
  <article id="comment-1" aria-labelledby="author-1">
    <h3 id="author-1">Alice's Original Argument</h3>
    <p>Content...</p>

    <div class="replies" aria-label="Replies to Alice">
      <article id="comment-2" aria-labelledby="author-2">
        <h4 id="author-2">Bob's Reply</h4>
        <p>Reply content...</p>
        <p><a href="#comment-1">In reply to Alice</a></p>

        <div class="replies" aria-label="Replies to Bob">
          <article id="comment-3" aria-labelledby="author-3">
            <h5 id="author-3">Alice's Response</h5>
            <p>Response content...</p>
            <p><a href="#comment-2">In reply to Bob</a></p>
          </article>
        </div>
      </article>
    </div>
  </article>
</div>
```

**Best Practices for Threaded Conversations:**
- Use `aria-level` to indicate nesting depth
- Provide clear "in reply to" context
- Include author names in headings
- Use consistent heading hierarchy (h3 → h4 → h5)
- Limit visual nesting depth (consider "show more" for deep threads)
- Provide "jump to parent comment" links
- Announce thread depth to screen readers

### Skip Links and Navigation Shortcuts

**Skip to Main Content:**
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content" tabindex="-1">
  <!-- Main content -->
</main>
```

**Multiple Skip Links:**
```html
<div class="skip-links">
  <a href="#main-content">Skip to main content</a>
  <a href="#thread-navigation">Skip to thread navigation</a>
  <a href="#search">Skip to search</a>
</div>
```

**CSS for Skip Links (visible on focus):**
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Link Text Best Practices

Every link must make sense when read by itself. Screen reader users often navigate via link lists.

**Bad Examples:**
- "Click here" ❌
- "More" ❌
- "Read more" ❌
- "Link" ❌

**Good Examples:**
- "Read Kant's Critique of Pure Reason" ✅
- "Reply to Alice's argument about consequentialism" ✅
- "View all comments on this thread" ✅
- "Edit your profile" ✅

**For Repeated Links:**
```html
<a href="/arguments/123">
  The Trolley Problem
  <span class="visually-hidden"> - Read full argument</span>
</a>
```

### Alt Text for Images and Diagrams

Philosophical content often includes diagrams (argument maps, decision trees, etc.).

**Complex Diagrams:**
```html
<figure>
  <img
    src="/diagrams/trolley-problem.png"
    alt="Diagram showing the trolley problem: a runaway trolley heading toward 5 people, with option to pull lever to divert to track with 1 person"
  >
  <figcaption>
    The classic trolley problem scenario
  </figcaption>
</figure>

<!-- For very complex diagrams, provide text alternative -->
<details>
  <summary>Text description of diagram</summary>
  <p>The diagram illustrates the classic trolley problem...</p>
</details>
```

**Decorative Images:**
```html
<img src="/decorative-border.png" alt="" role="presentation">
```

### Focus Management

**Managing Focus in Dynamic Interactions:**

When opening a modal or dialog:
```javascript
// Store the element that triggered the modal
const triggerElement = document.activeElement;

// Move focus to modal
modal.focus();

// When closing modal, return focus
modal.addEventListener('close', () => {
  triggerElement.focus();
});
```

**For Single-Page App Navigation:**
```javascript
// After route change, move focus to main heading
router.afterEach(() => {
  const mainHeading = document.querySelector('h1');
  mainHeading.setAttribute('tabindex', '-1');
  mainHeading.focus();
});
```

---

## Keyboard Navigation

### Full Keyboard Support Requirements

**Core Principle:** Every interactive element and function must be operable with keyboard only—no mouse required.

**Essential Keyboard Shortcuts:**
- `Tab` - Move forward through interactive elements
- `Shift + Tab` - Move backward through interactive elements
- `Enter` - Activate links and buttons
- `Space` - Activate buttons, toggle checkboxes
- `Arrow keys` - Navigate within components (dropdowns, tabs, etc.)
- `Esc` - Close dialogs, cancel operations
- `F6` - Navigate between major page sections (optional but helpful)

### Logical Tab Order

**Tab order should follow visual flow:** left to right, top to bottom.

**Natural HTML Order:**
```html
<!-- This creates natural tab order -->
<nav>
  <a href="/">Home</a>
  <a href="/explore">Explore</a>
  <a href="/profile">Profile</a>
</nav>

<main>
  <h1>Main Content</h1>
  <button>Primary Action</button>
  <button>Secondary Action</button>
</main>
```

**Avoid `tabindex` Positive Values:**
```html
<!-- Bad: Positive tabindex breaks natural order -->
<button tabindex="3">Third</button>
<button tabindex="1">First</button>
<button tabindex="2">Second</button>

<!-- Good: Natural order or tabindex="0" -->
<button>First</button>
<button>Second</button>
<button>Third</button>
```

**Strategic Tabindex Use:**
- `tabindex="0"` - Include in natural tab order
- `tabindex="-1"` - Programmatically focusable but not in tab order (for focus management)
- Positive values - **Avoid!** They break natural tab order

### Focus Indicators

**WCAG 2.4.7 (Level A):** Focus indicators must be visible.

**WCAG 2.4.13 (Level AAA):** Focus indicator must have:
- 3:1 contrast ratio with unfocused state
- Minimum 2px thickness

**CSS Implementation:**
```css
/* Default browser outline is acceptable but can be improved */
:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* Use :focus-visible for mouse vs keyboard distinction */
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}

/* Never do this without providing alternative */
:focus {
  outline: none; /* ❌ WCAG violation unless you provide alternative */
}

/* Good alternative focus style */
button:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 95, 204, 0.5);
  border: 2px solid #005fcc;
}
```

### Keyboard Shortcuts for Common Actions

**Philosophy Platform Specific Shortcuts:**

| Shortcut | Action | Context |
|----------|--------|---------|
| `?` | Show keyboard shortcuts help | Global |
| `/` | Focus search | Global |
| `c` | Compose new argument | Authenticated users |
| `r` | Reply to current thread | Thread view |
| `n` | Next comment | Thread navigation |
| `p` | Previous comment | Thread navigation |
| `u` | Navigate up to parent comment | Nested threads |
| `Esc` | Close modal/dialog | Modal open |
| `j` | Next argument | List view |
| `k` | Previous argument | List view |

**Implementation Example:**
```javascript
document.addEventListener('keydown', (event) => {
  // Ignore if user is typing in input field
  if (event.target.matches('input, textarea, select')) {
    return;
  }

  switch(event.key) {
    case '/':
      event.preventDefault();
      document.querySelector('#search-input').focus();
      break;
    case '?':
      event.preventDefault();
      openKeyboardShortcutsModal();
      break;
    case 'Escape':
      closeOpenModals();
      break;
  }
});
```

### Escape Hatches

**Always Provide Exit Routes:**
- `Esc` key closes modals and dialogs
- `Esc` cancels editing mode
- Close buttons with clear labels
- "Cancel" buttons in forms

**Modal Dialog Keyboard Trap:**
```javascript
// Trap focus within modal while open
const modal = document.querySelector('.modal');
const focusableElements = modal.querySelectorAll(
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
);
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

modal.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    if (event.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  if (event.key === 'Escape') {
    closeModal();
  }
});
```

---

## Component Accessibility Requirements

### Button Component

**Semantic HTML:**
```html
<button type="button">Submit Argument</button>
```

**ARIA labels (when text isn't sufficient):**
```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>
```

**Keyboard support:**
- `Enter` and `Space` activate (automatic with `<button>`)
- `Tab` for focus navigation

**Screen reader:**
- Announces role as "button"
- Announces accessible name
- Announces state (disabled, pressed, etc.)

**Focus management:**
- Must have visible focus indicator
- Disabled buttons should be not focusable (use `disabled` attribute)

### Link Component

**Semantic HTML:**
```html
<a href="/arguments/kant-categorical-imperative">
  Kant's Categorical Imperative
</a>
```

**ARIA labels:**
```html
<a href="/profile/alice" aria-label="View Alice's profile">
  <img src="alice-avatar.jpg" alt="">
  Alice
</a>
```

**Keyboard support:**
- `Enter` activates link
- `Tab` for focus navigation

**Screen reader:**
- Announces role as "link"
- Announces link text
- Should make sense out of context

### Form Input Component

**Semantic HTML with label:**
```html
<label for="argument-title">
  Argument Title
  <span class="required" aria-label="required">*</span>
</label>
<input
  type="text"
  id="argument-title"
  name="title"
  aria-required="true"
  aria-describedby="title-hint title-error"
>
<div id="title-hint" class="hint">
  A clear, concise title for your philosophical argument
</div>
<div id="title-error" class="error" role="alert">
  <!-- Error message if validation fails -->
</div>
```

**ARIA labels:**
- `aria-required="true"` for required fields
- `aria-describedby` for hints and errors
- `aria-invalid="true"` when validation fails
- `aria-label` only when visible label isn't possible

**Keyboard support:**
- All standard input keyboard interactions
- `Tab` to navigate between fields

**Screen reader:**
- Announces label, role, value, state
- Announces hint text via aria-describedby
- Announces errors immediately (role="alert")

### Dropdown/Select Component

**Semantic HTML:**
```html
<label for="philosophy-branch">Philosophy Branch</label>
<select id="philosophy-branch" name="branch">
  <option value="">Select a branch...</option>
  <option value="ethics">Ethics</option>
  <option value="metaphysics">Metaphysics</option>
  <option value="epistemology">Epistemology</option>
</select>
```

**Custom dropdown (more complex):**
```html
<div class="dropdown">
  <button
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-labelledby="dropdown-label"
  >
    Select branch
  </button>
  <ul role="listbox" id="dropdown-label" hidden>
    <li role="option" aria-selected="false">Ethics</li>
    <li role="option" aria-selected="false">Metaphysics</li>
    <li role="option" aria-selected="false">Epistemology</li>
  </ul>
</div>
```

**Keyboard support:**
- `Enter` or `Space` to open dropdown
- `Arrow keys` to navigate options
- `Enter` to select option
- `Esc` to close without selecting
- Type-ahead to jump to options

### Thread/Comment Component

**Semantic HTML:**
```html
<article
  id="comment-42"
  class="comment"
  aria-labelledby="comment-42-author"
  data-depth="2"
>
  <header>
    <h4 id="comment-42-author">
      <a href="/profile/alice">Alice</a>'s reply
    </h4>
    <time datetime="2025-11-14T10:30:00Z">
      2 hours ago
    </time>
    <a href="#comment-35" class="parent-link">
      In reply to Bob
    </a>
  </header>

  <div class="comment-body">
    <p>I think your interpretation of Kant...</p>
  </div>

  <footer>
    <button type="button" aria-expanded="false" aria-controls="reply-form-42">
      Reply
    </button>
    <button type="button" aria-label="Upvote this comment">
      <span aria-hidden="true">↑</span> 15
    </button>
  </footer>

  <div id="reply-form-42" hidden>
    <!-- Reply form -->
  </div>

  <div class="replies" aria-label="Replies to Alice">
    <!-- Nested replies -->
  </div>
</article>
```

**ARIA labels:**
- `aria-labelledby` for comment author
- `aria-controls` for expandable replies
- `aria-expanded` for reply form state
- Clear hierarchy with headings

**Keyboard support:**
- `Tab` to navigate between comments
- `n`/`p` shortcuts for next/previous (custom)
- `u` to go to parent comment (custom)
- `r` to reply (custom)

**Screen reader:**
- Announces author, timestamp, nesting level
- Clear "in reply to" context
- Reply count for nested threads

---

## Testing Guidelines

### Manual Testing

**Keyboard Navigation Testing:**
1. Unplug your mouse
2. Navigate entire site using only keyboard
3. Verify all interactive elements are reachable
4. Check that focus is always visible
5. Test all forms can be completed
6. Verify modals can be opened, used, and closed
7. Check tab order is logical

**Screen Reader Testing:**

**Tools:**
- **NVDA** (Windows, free): Most used Windows screen reader
- **JAWS** (Windows, commercial): Enterprise standard
- **VoiceOver** (macOS/iOS, built-in): Apple platform screen reader
- **TalkBack** (Android, built-in): Android screen reader
- **ORCA** (Linux, free): Linux screen reader

**Testing Process:**
1. Use default screen reader settings
2. Navigate by headings (H key in most screen readers)
3. Navigate by landmarks (D key in most screen readers)
4. Navigate by links (tab or link list)
5. Test forms completely
6. Verify announcements for dynamic content
7. Test with screen reader users (not just developers)

**Color Contrast Checking:**

**Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Colour Contrast Analyser (CCA) by TPGi
- Browser DevTools (Chrome, Firefox built-in checkers)

**Process:**
1. Check all text against backgrounds
2. Verify 4.5:1 for normal text (WCAG AA)
3. Verify 3:1 for large text (18pt+)
4. Check 3:1 for UI components
5. Test in grayscale mode
6. Simulate color blindness (browser extensions)

**Font Scaling/Zoom Testing:**
1. Test at 200% zoom (WCAG requirement)
2. Test browser text-only zoom
3. Verify no content is cut off or overlapping
4. Check that horizontal scrolling isn't required
5. Verify functionality remains intact

**Visual Testing:**
1. Test in Windows High Contrast Mode
2. Test in Dark Mode
3. Verify focus indicators are visible
4. Check for color-only information
5. Verify text alternatives for non-text content

### Automated Testing

**Browser Extensions:**
- **axe DevTools** - Comprehensive accessibility testing
- **WAVE** - Visual accessibility evaluation
- **Lighthouse** - Built into Chrome DevTools
- **IBM Equal Access** - Accessibility checker

**Command-Line Tools:**
- **pa11y** - Automated testing tool
- **axe-core** - Accessibility engine
- **jest-axe** - Jest integration for unit tests

**CI/CD Integration:**
```javascript
// Example: jest-axe in React component test
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('ArgumentCard should have no accessibility violations', async () => {
  const { container } = render(<ArgumentCard title="Test" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Lighthouse CI:**
```yaml
# .github/workflows/accessibility.yml
name: Accessibility Audit
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

**Important Note:** Automated testing catches only ~30-40% of accessibility issues. Manual testing and user testing are essential.

### User Testing with Assistive Technology Users

**Why It Matters:**
- Real users find issues automated tools miss
- Different screen readers behave differently
- Users have developed strategies developers don't anticipate
- Validates that technical compliance = usable experience

**Recruitment:**
- Partner with disability organizations
- Offer fair compensation
- Include diverse users (different disabilities, AT, experience levels)
- Test with both power users and beginners

**Testing Sessions:**
1. Task-based testing (e.g., "Find an argument about Kant")
2. Open exploration
3. Think-aloud protocol
4. Post-task questionnaire
5. Follow-up interview

**Key Questions:**
- Can users accomplish core tasks?
- Where do they encounter barriers?
- What workarounds do they develop?
- What's confusing or frustrating?
- What works well?

---

## Accessibility Checklist

### Content
- [ ] All images have descriptive alt text (or alt="" for decorative)
- [ ] Complex diagrams have text alternatives
- [ ] Headings form a logical hierarchy (h1 → h2 → h3, no skipping)
- [ ] Link text is descriptive and makes sense out of context
- [ ] Language of page is set (`<html lang="en">`)
- [ ] Page has a descriptive title
- [ ] Content is written in plain language where possible

### Color & Contrast
- [ ] Text contrast is at least 4.5:1 (WCAG AA)
- [ ] Large text (18pt+) contrast is at least 3:1
- [ ] UI components contrast is at least 3:1
- [ ] Information is not conveyed by color alone
- [ ] Color blindness has been considered
- [ ] Dark mode has sufficient contrast

### Keyboard Navigation
- [ ] All functionality is keyboard accessible
- [ ] Tab order is logical (follows visual flow)
- [ ] Focus indicators are visible (2px, 3:1 contrast)
- [ ] No keyboard traps (can escape all interactions)
- [ ] Skip links are provided
- [ ] Keyboard shortcuts are documented
- [ ] Esc key closes modals/dialogs

### Screen Readers
- [ ] Semantic HTML is used throughout
- [ ] ARIA labels are appropriate (not excessive)
- [ ] Landmarks identify page regions
- [ ] Dynamic content updates are announced
- [ ] Form labels are properly associated
- [ ] Error messages are clear and announced
- [ ] Nested threads have clear hierarchy

### Forms
- [ ] All inputs have associated labels
- [ ] Required fields are marked (aria-required)
- [ ] Error messages are descriptive and announced
- [ ] Form validation is accessible
- [ ] Success messages are announced

### Interactive Elements
- [ ] Buttons use `<button>` element
- [ ] Links use `<a>` element with href
- [ ] Touch targets are minimum 44x44px (AAA) or 24x24px (AA for WCAG 2.2)
- [ ] Interactive elements have visible labels
- [ ] Disabled states are clear and announced

### Media
- [ ] Videos have captions
- [ ] Audio content has transcripts
- [ ] Auto-playing media can be paused
- [ ] Media controls are accessible

### Mobile
- [ ] Site is responsive and works at 200% zoom
- [ ] Content reflows without horizontal scrolling
- [ ] Touch targets are appropriately sized
- [ ] Pinch zoom is not disabled

### Testing
- [ ] Passed automated testing (axe, Lighthouse)
- [ ] Manually tested with keyboard only
- [ ] Tested with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Tested with color contrast analyzers
- [ ] Tested at 200% zoom
- [ ] Tested with real users with disabilities

---

## Implementation Priority

### MVP (Phase 1) - Accessibility is NOT Optional!

**Critical Requirements:**
1. ✅ **Semantic HTML structure** (header, nav, main, article, footer)
2. ✅ **Proper heading hierarchy** (h1 → h2 → h3, no skipping)
3. ✅ **WCAG AA color contrast** (4.5:1 text, 3:1 UI components)
4. ✅ **Full keyboard navigation** (all features accessible via keyboard)
5. ✅ **Visible focus indicators** (3:1 contrast, 2px minimum)
6. ✅ **Skip links** (skip to main content)
7. ✅ **ARIA labels** for all interactive elements
8. ✅ **Form labels** properly associated with inputs
9. ✅ **Alt text** for all images
10. ✅ **Responsive design** that works at 200% zoom
11. ✅ **Basic screen reader testing** (NVDA/VoiceOver)
12. ✅ **Automated testing** (axe, Lighthouse in CI/CD)

**Threaded Conversations (MVP):**
- Clear heading hierarchy for nested comments
- "In reply to" context for each comment
- Logical tab order through threads
- ARIA labels for thread structure

**Estimated Timeline:** Baked into every sprint—accessibility is built in, not bolted on.

### Phase 2 - Enhanced Accessibility

**Enhanced Features:**
1. ✅ **AAA color contrast** (7:1) for body text
2. ✅ **Custom keyboard shortcuts** (j/k navigation, r to reply)
3. ✅ **Advanced screen reader optimization** (aria-live regions)
4. ✅ **Focus mode** for reading (minimal distractions)
5. ✅ **Reading preferences** (font size, line height, font family)
6. ✅ **Comprehensive user testing** with AT users
7. ✅ **Advanced thread navigation** (jump to parent, collapse/expand all)
8. ✅ **High Contrast Mode** support
9. ✅ **Dyslexia-friendly font option**
10. ✅ **Progress indicators** for long content

**Estimated Timeline:** Months 3-6

### Phase 3 - Future Enhancements

**Advanced Personalization:**
1. ✅ **Text-to-speech integration** for long-form content
2. ✅ **Simple summaries** of complex arguments (AI-generated)
3. ✅ **Visual argument maps** with full text alternatives
4. ✅ **Voice input** for composing arguments
5. ✅ **Reading time estimates**
6. ✅ **Bookmark and resume reading**
7. ✅ **Multi-language support** with proper lang attributes
8. ✅ **Cognitive accessibility features** (simplified vocabulary toggle)
9. ✅ **Advanced customization** (save personal accessibility preferences)
10. ✅ **Accessibility preference profiles** (one-click presets)

**Estimated Timeline:** Months 6-12

---

## Key Resources

### Standards & Guidelines
- **WCAG 2.1:** https://www.w3.org/TR/WCAG21/
- **WCAG 2.2:** https://www.w3.org/TR/WCAG22/
- **Section 508:** https://www.section508.gov/
- **ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/

### Tools & Testing
- **WebAIM:** https://webaim.org/
- **A11Y Project:** https://www.a11yproject.com/
- **axe DevTools:** https://www.deque.com/axe/devtools/
- **Lighthouse:** Built into Chrome DevTools
- **Colour Contrast Analyser:** https://www.tpgi.com/color-contrast-checker/

### Platform Examples
- **GOV.UK Design System:** https://design-system.service.gov.uk/
- **U.S. Web Design System:** https://designsystem.digital.gov/
- **BBC Global Experience Language (GEL):** https://www.bbc.co.uk/gel

### Learning Resources
- **WebAIM Screen Reader Survey:** https://webaim.org/projects/screenreadersurvey9/
- **Inclusive Components:** https://inclusive-components.design/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

## Conclusion

Accessibility is the foundation of an inclusive philosophy platform. By meeting WCAG 2.1 AA standards, optimizing for screen readers, ensuring full keyboard navigation, and conducting regular testing with assistive technology users, we create a platform where philosophical discourse is truly accessible to everyone.

**Remember:** There is no such thing as "perfect accessibility"—it's an ongoing commitment to continuous improvement and user-centered design.
