# Long-Form Content Handling for Philosophical Discourse

## Executive Summary

Philosophical arguments often exceed 1000-2000+ words, requiring specialized UI patterns to maintain readability and engagement. Based on research across reading platforms and UX best practices, we recommend:

**Core Recommendations:**
- **"Load More" hybrid approach** over pure infinite scroll or pagination
- **Automatic table of contents** for posts >500 words
- **Reading progress indicators** with time estimates
- **Collapsible sections** with persistent state
- **Smart preview/expansion** for long replies in threads
- **Performance optimization** (virtualization, lazy loading)

**Key Insight:** Long-form content requires progressive disclosure without losing context. Users need to **navigate, skim, and deep-read** the same content in different ways. One-size-fits-all pagination or infinite scroll fails for philosophical discourse.

**Load Pattern Priority:**
1. Show first 1000-1500 words immediately
2. "Continue Reading" button at natural breakpoint
3. Load remaining content on demand
4. Preserve scroll position and reading state
5. Allow direct deep-linking to sections

---

## Platform Analysis

### Medium - Long-Form Article Handling

**Content Strategy:**
- Optimized for 1000-3000 word articles
- Smooth infinite scroll (no pagination)
- Reading time estimate at top
- Progress bar shows completion
- Related articles at bottom
- No truncation or "read more"

**What Works Well:**
- Seamless reading experience (no interruptions)
- Progress bar motivates completion
- Time estimate helps users plan reading
- Typography optimized for long sessions
- Clean, distraction-free presentation
- Good performance even for 5000+ word pieces
- Mobile scrolling smooth and natural

**What Doesn't Work:**
- Very long articles (10,000+ words) become scroll marathons
- No table of contents for navigation
- Can't jump to specific sections easily
- Hard to skim structure before committing
- Related content at bottom interrupts reading flow
- Comments separated from content (not inline)

**Metrics:**
- Average article: 7-minute read (1400-1750 words)
- Reading time: 200-250 words/minute estimate
- Progress bar updates every scroll frame
- Related articles load on reaching bottom

**Key Takeaways:**
- Infinite scroll works well up to ~3000 words
- Reading time + progress crucial for long content
- Beyond 5000 words, need navigation aids
- Typography quality matters more for long-form
- Don't interrupt reading flow with UI
- Consider table of contents for philosophy (often longer)

---

### Substack - Newsletter Long-Form

**Content Strategy:**
- Built for long-form newsletters (1000-5000+ words)
- Infinite scroll, no pagination
- Email-first, web-second approach
- Simple linear reading
- Comments at bottom

**What Works Well:**
- Handles very long content (10,000+ word essays)
- Email format encourages complete reading
- Simple, distraction-free layout
- Archive browsing easy
- Works across email and web

**What Doesn't Work:**
- No table of contents or navigation
- Very long articles require extensive scrolling
- Comment section has poor scroll memory (major complaint)
- Slow loading for long comment threads
- No reading progress indicator (until recently)
- Can't bookmark specific sections
- Hard to reference specific parts

**User Complaints:**
- "Can't see all nested comments at once"
- "Comment load time forever"
- "Never jumps to where I left off"
- "Desktop identical to mobile (no optimization)"

**Key Takeaways:**
- Long-form works but needs better navigation
- Scroll position memory critical for return visits
- Comment performance matters for engagement
- Need section navigation for 5000+ word pieces
- Desktop should differ from mobile experience
- Reading position persistence essential

---

### Discourse - Long Thread Handling

**Content Strategy:**
- Optimized for 100-1000+ post discussions
- Infinite scroll with "Load More" options
- Timeline navigation on right side
- Summary view (top posts)
- Reading progress tracking
- Jump to unread functionality

**What Works Well:**
- Timeline allows jumping to any point in thread
- Progress indicator shows position
- Summary view surfaces best content
- "Jump to unread" saves time
- Handles 1000+ post threads gracefully
- Excellent performance at scale
- Smart loading (don't load entire thread)
- Bookmark specific posts in thread

**What Doesn't Work:**
- Can be overwhelming for new users
- Timeline UI takes up space
- Summary may miss important context
- Long individual posts not handled specially
- No post-level table of contents

**Innovation:**
- **Timeline scrubber** (shows position in discussion)
- **Post counting** ("Post 45 of 234")
- **Jump to date** functionality
- **Unread tracking** across sessions

**Key Takeaways:**
- Timeline navigation essential for long discussions
- Progress tracking improves orientation
- Summary view helps new users catch up
- Need smart loading for performance
- Session state persistence crucial
- Consider adapting timeline for long posts

---

### Reddit - Handling Long Posts & Threads

**Content Strategy:**
- Comments limited to 10,000 characters
- Posts can be very long
- Infinite scroll through threads
- "Continue this thread →" for deep nesting
- "Load more comments" for collapsed branches
- No built-in navigation for long posts

**What Works Well:**
- Character limits prevent extremely long comments
- Collapse/expand helps manage long threads
- "Continue thread" handles deep nesting
- Can link directly to comments
- Lazy loading improves performance
- Works reasonably on mobile

**What Doesn't Work:**
- No table of contents for long posts
- Can't navigate within a long post
- Scrolling through 1000+ comment threads tedious
- No reading position memory
- Hard to find specific part of long discussion
- "Load more" pattern can be annoying (constant clicking)
- Deep nesting becomes unreadable

**Character Limits:**
- Comment: 10,000 characters (~1,500-2,000 words)
- Post: 40,000 characters (~6,000-8,000 words)
- Encourages concision but limits deep analysis

**Key Takeaways:**
- Character limits prevent extreme length
- But philosophy needs longer form than 2000 words
- Collapse/expand essential for thread management
- Need better navigation for long posts
- "Load more" pattern has UX costs
- Deep linking to sections valuable

---

### Academic Philosophy Journals (SEP, PhilPapers)

**Content Strategy:**
- Very long articles (5,000-15,000+ words)
- Table of contents at top
- Numbered sections and subsections
- Footnotes and citations
- Print-inspired layout
- Often paginated PDFs

**What Works Well:**
- Table of contents essential for navigation
- Section numbering enables citation
- Footnotes preserve reading flow
- Scholarly apparatus (citations, references)
- Can jump to specific sections
- Printable format
- Deep hierarchical structure

**What Doesn't Work:**
- Poor mobile experience
- PDFs not web-native
- Often slow to load
- Print paradigm doesn't leverage web
- Footnotes can break on web
- No reading progress indicators
- No bookmarking specific passages
- Accessibility often poor

**Structure Example:**
```
1. Introduction
2. Historical Background
   2.1 Ancient Views
   2.2 Modern Developments
3. The Core Argument
   3.1 Premise One
   3.2 Premise Two
   3.3 Conclusion
4. Objections and Replies
   4.1 The First Objection
   ...
```

**Key Takeaways:**
- Table of contents essential for long philosophical content
- Section numbering enables precise reference
- Hierarchical structure natural for philosophy
- Web can improve on print (interactive TOC, bookmarks)
- Need footnote handling for scholarly work
- Consider both browsing and deep reading modes
- 10,000+ words needs serious navigation aids

---

### Wikipedia - Long Article Navigation

**Content Strategy:**
- Articles range from 500 to 50,000+ words
- Table of contents auto-generated from headings
- Collapsible TOC on mobile
- Section edit links
- Footnotes as click-to-reveal
- Infinite scroll (no pagination)

**What Works Well:**
- Automatic TOC from heading structure
- TOC sticky/persistent on desktop
- Section deep-linking works perfectly
- Collapsible sections on mobile
- Footnotes don't interrupt reading
- Fast loading despite length
- Can edit individual sections
- Search within page

**What Doesn't Work:**
- Dense information (not optimized for reading pleasure)
- Typography basic
- No reading progress indicator
- Can be overwhelming for long articles
- TOC takes up space
- No reading mode or focus view

**TOC Implementation:**
```
Contents [hide]
1 Overview
2 History
  2.1 Early development
  2.2 Modern era
3 Core concepts
  3.1 Definition
  3.2 Applications
4 See also
5 References
```

**Key Takeaways:**
- Auto-generate TOC from heading hierarchy
- Make TOC collapsible/hideable
- Section deep-linking essential
- Wikipedia proves long-form web content works
- Reference/footnote pattern worth studying
- Need better typography for philosophical reading
- Consider "reading view" toggle

---

## Design Patterns for Long Content

### Pattern 1: Hybrid Load More (Recommended)

**Description:**
Show initial content (1000-1500 words), then "Continue Reading" button at natural break, loads remaining content seamlessly.

**How It Works:**
```
[First 1000-1500 words shown immediately]

┌────────────────────────────────────────┐
│                                         │
│  Continue Reading (5 min remaining)    │← Clear CTA
│                                         │
└────────────────────────────────────────┘

[On click, loads remaining content smoothly]
[No page reload, seamless expansion]
```

**Best For:**
- Articles 2000-5000 words
- Philosophy posts with clear section breaks
- Balancing initial load time and completeness
- Mobile-first performance

**Examples:**
- Twitter thread expansion
- LinkedIn "see more"
- News sites (some)

**Pros:**
- Fast initial load
- User controls when to load more
- Natural break points preserve reading flow
- Works well on slow connections
- Clear content boundaries
- Better analytics (see who continues)

**Cons:**
- Interrupts reading flow (minor)
- Extra click required
- May frustrate fast readers
- Need intelligent break point detection

**Implementation:**
```javascript
// Detect natural break point (after ~1200 words or section break)
function findBreakPoint(content) {
  const words = content.split(/\s+/);
  const targetWords = 1200;

  // Find nearest section break after target
  const sections = content.split(/\n#{1,3}\s/); // H1-H3
  // Return index after first major section past target
}

// Load more on click
function expandContent() {
  const remaining = document.getElementById('remaining-content');
  remaining.style.display = 'block';
  button.style.display = 'none';
  updateReadingProgress(); // Recalculate with full content
}
```

**When to Break:**
- After first 1000-1500 words
- At natural section boundary (heading)
- Before major topic shift
- After introduction/setup
- NOT mid-argument or mid-paragraph

---

### Pattern 2: Infinite Scroll

**Description:**
All content loads seamlessly as user scrolls. No pagination, no "load more" buttons.

**How It Works:**
- Entire article rendered initially, OR
- Content loads in chunks as scroll approaches bottom
- Smooth, uninterrupted reading experience

**Best For:**
- Medium-length content (1000-3000 words)
- Mobile reading
- Narrative/linear content
- When performance allows

**Examples:**
- Medium
- Substack
- Most modern blogs

**Pros:**
- Seamless reading experience
- No interruptions or clicks
- Natural on mobile
- Good for narrative flow
- Familiar pattern

**Cons:**
- Can feel endless for very long content
- Performance issues at 5000+ words
- Difficult to navigate back to specific section
- Scroll position can be lost
- Footer never reached
- Analytics challenging

**Implementation:**
```javascript
// Simple infinite scroll
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // When near bottom, load more
  if (scrollTop + clientHeight >= scrollHeight - 500) {
    loadNextChunk();
  }
});
```

**Optimization:**
- Lazy load images
- Virtualize very long content
- Preserve scroll position on navigation
- Provide "back to top" button
- Consider reading progress indicator

---

### Pattern 3: Pagination

**Description:**
Content split across multiple pages. "Page 1", "Page 2", etc. with explicit navigation.

**How It Works:**
```
[Page 1 content]

┌────────────────────────────────────┐
│ ← Previous  | Page 2 of 5 | Next → │
└────────────────────────────────────┘
```

**Best For:**
- Very long content (10,000+ words)
- Print-inspired reading
- SEO considerations
- Ad-revenue optimization (not our use case)

**Examples:**
- Traditional news sites
- Some academic journals
- Multi-chapter content

**Pros:**
- Clear progress (page X of Y)
- Manageable chunks
- Good for SEO (multiple URLs)
- Reduces initial load
- Easy to bookmark specific pages
- Footer accessible

**Cons:**
- Interrupts reading flow (major issue)
- Annoying for users (widely disliked)
- Extra clicks frustrating
- Loses reading momentum
- Feels antiquated
- Mobile-unfriendly

**Our Recommendation:**
❌ **Avoid pagination for philosophy content.** Interrupts deep reading flow. Only consider for multi-chapter books or guides.

---

### Pattern 4: Collapsible Sections

**Description:**
Long content divided into collapsible sections. Expand/collapse to manage length.

**How It Works:**
```
▼ 1. Introduction (expanded)
   [Full content visible]

▶ 2. Historical Background (collapsed)
   [Click to expand]

▼ 3. Core Argument (expanded)
   [Full content visible]
```

**Best For:**
- Structured philosophical arguments
- Reference content
- Content with clear sections
- Users who want to skip around

**Examples:**
- Wikipedia mobile (some implementations)
- Accordion UIs
- FAQ pages
- Documentation

**Pros:**
- User controls what to see
- Reduces visual overwhelm
- Good for reference/scanning
- Section structure clear
- Works well on mobile

**Cons:**
- Requires active management (cognitive load)
- May hide important content
- Interrupts linear reading
- Accessibility challenges
- Need to remember what's collapsed
- Not ideal for narrative flow

**Our Recommendation:**
⚠️ **Use selectively.** Good for optional sections (footnotes, references, appendices) but not main argument flow.

**Implementation:**
```html
<section class="collapsible-section">
  <h2 class="section-header" aria-expanded="true">
    <button aria-controls="section-1">
      Introduction
    </button>
  </h2>
  <div id="section-1" class="section-content">
    [Content]
  </div>
</section>
```

---

### Pattern 5: Table of Contents Navigation

**Description:**
Auto-generated TOC from heading structure. Allows jumping to sections.

**How It Works:**
```
┌────────────────────────┐
│ Contents               │
│ 1. Introduction        │← Click to jump
│ 2. Background          │
│    2.1 History         │
│    2.2 Modern Views    │
│ 3. Core Argument       │
│ 4. Objections          │
└────────────────────────┘

[Article content with sections]
```

**Best For:**
- Long-form content (3000+ words)
- Structured arguments
- Academic/philosophical writing
- Reference material
- Users who want to skim first

**Examples:**
- Wikipedia
- Academic journals
- Technical documentation
- Long blog posts

**Pros:**
- Excellent navigation for long content
- Shows structure at a glance
- Can jump to relevant section
- Helps skimming/scanning
- Section deep-linking
- Good for research/reference
- Accessibility (skip navigation)

**Cons:**
- Takes up screen space
- May be ignored by linear readers
- Requires good heading structure
- Can clutter on mobile
- Needs sticky positioning

**Our Recommendation:**
✅ **Strongly recommended for philosophy posts >1500 words.** Essential for navigation and structure clarity.

**Implementation:**
```javascript
// Auto-generate TOC from headings
function generateTOC() {
  const headings = document.querySelectorAll('article h2, article h3');
  const toc = document.getElementById('toc');

  headings.forEach((heading, index) => {
    // Add ID for linking
    heading.id = `section-${index}`;

    // Create TOC entry
    const level = parseInt(heading.tagName.substring(1));
    const link = document.createElement('a');
    link.href = `#section-${index}`;
    link.textContent = heading.textContent;
    link.style.paddingLeft = `${(level - 2) * 1}em`;

    toc.appendChild(link);
  });
}
```

---

## Handling Very Long Posts (5000+ Words)

### Auto-Generated Structure

**For posts exceeding 5000 words, automatically provide:**

1. **Reading Time Estimate**
   ```
   ⏱️ 23 min read • 4,600 words
   ```

2. **Table of Contents**
   ```
   In this post:
   • Introduction (2 min)
   • Historical Context (5 min)
   • The Core Argument (8 min)
   • Objections & Replies (6 min)
   • Conclusion (2 min)
   ```

3. **Progress Indicator**
   ```
   [████████░░░░░░░] 60% • 9 min remaining
   ```

4. **Section Navigation**
   ```
   ← Previous: Background | Next: Objections →
   ```

5. **Bookmark/Save Prompt**
   ```
   This is a long read. Bookmark to finish later?
   [Bookmark for Later] [No, thanks]
   ```

---

### Progressive Disclosure Strategy

**Initial Load (Fast):**
- Title, author, metadata
- First 1000-1500 words
- Table of contents
- Reading time estimate

**On Scroll or "Continue":**
- Remaining content loads
- Images lazy load
- Comments stay collapsed

**On Demand:**
- Footnotes expand on click
- References load when needed
- Related articles at end

**Optimization:**
```javascript
// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadSection(entry.target);
    }
  });
}, {
  rootMargin: '200px' // Start loading 200px before visible
});

// Observe sections
document.querySelectorAll('.lazy-section').forEach(section => {
  observer.observe(section);
});
```

---

### Reading Session Management

**For 20+ Minute Reads:**

1. **Auto-Save Reading Position**
   ```javascript
   // Save scroll position every 5 seconds
   setInterval(() => {
     localStorage.setItem(`reading-pos-${postId}`, window.scrollY);
   }, 5000);

   // Restore on return
   window.scrollTo(0, localStorage.getItem(`reading-pos-${postId}`) || 0);
   ```

2. **"Resume Reading" Prompt**
   ```
   ┌─────────────────────────────────────┐
   │ Welcome back! You left off at:       │
   │ "The Core Argument" (60% complete)   │
   │                                      │
   │ [Resume Reading] [Start Over]        │
   └─────────────────────────────────────┘
   ```

3. **Reading Time Tracking**
   ```javascript
   // Track actual time spent reading (not just page open time)
   let readingTime = 0;
   let isReading = false;

   // Consider "reading" when page visible and recently active
   document.addEventListener('visibilitychange', () => {
     isReading = !document.hidden;
   });

   setInterval(() => {
     if (isReading) readingTime++;
   }, 1000);
   ```

---

## Table of Contents Implementation

### Desktop Layout

**Sticky TOC Sidebar:**
```
┌──────────────┬──────────────────────────────┐
│ Contents     │ Article Content              │
│ (sticky)     │                              │
│              │ # Introduction               │
│ Introduction │ [content]                    │
│ Background   │                              │
│   History    │ ## Historical Background     │
│   Modern     │ [content]                    │
│ Core Arg     │                              │
│ Objections   │                              │
│              │                              │
│              │                              │
│ [Scroll      │ [Article scrolls]            │
│  stays]      │                              │
└──────────────┴──────────────────────────────┘
```

**CSS Implementation:**
```css
.article-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.toc {
  position: sticky;
  top: 2rem;
  height: fit-content;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.toc a {
  display: block;
  padding: 0.5rem 0;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.toc a.active {
  color: var(--accent-color);
  font-weight: 600;
}
```

---

### Mobile TOC

**Collapsible at Top:**
```
┌──────────────────────────┐
│ [≡] Table of Contents    │← Tap to expand
└──────────────────────────┘

[Article content]

Expanded:
┌──────────────────────────┐
│ [×] Table of Contents    │
│ ─────────────────────── │
│ → Introduction           │
│ → Background             │
│ → Core Argument          │
│ → Objections             │
│ ─────────────────────── │
└──────────────────────────┘
```

**Floating Button:**
```
                    [Article content]




                                 [≡]← Floating TOC button
```

---

### Active Section Highlighting

**Track which section is visible:**
```javascript
// Intersection Observer to highlight current section in TOC
const sections = document.querySelectorAll('article h2, article h3');
const tocLinks = document.querySelectorAll('.toc a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active from all
      tocLinks.forEach(link => link.classList.remove('active'));

      // Add active to corresponding TOC link
      const id = entry.target.id;
      const activeLink = document.querySelector(`.toc a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, {
  rootMargin: '-100px 0px -80% 0px' // Trigger when section near top
});

sections.forEach(section => sectionObserver.observe(section));
```

---

## Collapse/Expand Patterns

### When to Use Collapse

**Good Use Cases:**
- ✅ Long comment threads (hide old/low-quality)
- ✅ Footnotes and references
- ✅ Appendices and supplementary material
- ✅ Quoted text from other sources
- ✅ Code blocks or technical details
- ✅ Off-topic tangents in discussions

**Poor Use Cases:**
- ❌ Main argument content
- ❌ Critical sections of posts
- ❌ Hiding important context
- ❌ Overusing to manage length (fix the length instead)

---

### Collapse UI Patterns

**Pattern 1: Heading Click**
```
▼ Footnotes and References
  [Content visible]

[Click heading to collapse]

▶ Footnotes and References
```

**Pattern 2: Explicit Button**
```
Footnotes and References          [Collapse ▲]
[Content visible]

Footnotes and References          [Expand ▼]
```

**Pattern 3: "Show More / Show Less"**
```
[First 3 footnotes visible]

Show all 15 footnotes ▼

[All footnotes visible]

Show fewer footnotes ▲
```

---

### Smart Default Collapse State

**Auto-collapse based on:**
- Content length (footnotes >10 items)
- User behavior (sections they skip)
- Content type (supplementary vs. core)
- Thread age (old discussions)
- Rating/engagement (low-value content)

**Persist User Preferences:**
```javascript
// Remember what user has collapsed
function saveCollapseState(sectionId, isCollapsed) {
  const state = JSON.parse(localStorage.getItem('collapse-state') || '{}');
  state[sectionId] = isCollapsed;
  localStorage.setItem('collapse-state', JSON.stringify(state));
}

// Restore on page load
function restoreCollapseState() {
  const state = JSON.parse(localStorage.getItem('collapse-state') || '{}');
  Object.entries(state).forEach(([id, isCollapsed]) => {
    const section = document.getElementById(id);
    if (section) {
      section.classList.toggle('collapsed', isCollapsed);
    }
  });
}
```

---

## Performance Optimization

### Virtualization for Very Long Content

**Problem:**
Rendering 10,000+ words with complex formatting can slow down the page.

**Solution:**
Virtualize content - only render visible portions.

**Implementation:**
```javascript
// Using react-window or similar
import { FixedSizeList } from 'react-window';

function VirtualizedArticle({ sections }) {
  return (
    <FixedSizeList
      height={window.innerHeight}
      itemCount={sections.length}
      itemSize={estimatedHeight}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {sections[index]}
        </div>
      )}
    </FixedSizeList>
  );
}
```

**When to Use:**
- Posts >10,000 words
- Discussions >500 comments
- Performance-critical situations
- Mobile devices

---

### Lazy Loading Images & Media

**Pattern:**
```html
<img
  src="placeholder.jpg"
  data-src="actual-image.jpg"
  loading="lazy"
  alt="Description"
/>
```

**Intersection Observer:**
```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

---

### Code Splitting & Lazy Loading

**Split content into chunks:**
```javascript
// Load initial content
import('./content-part-1.js').then(module => {
  renderContent(module.default);
});

// Load remaining on scroll or click
document.getElementById('load-more').addEventListener('click', async () => {
  const part2 = await import('./content-part-2.js');
  renderContent(part2.default);
});
```

---

### Debounced Scroll Handlers

**Problem:**
Scroll event fires hundreds of times per second.

**Solution:**
Debounce or throttle scroll handlers.

```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Debounced scroll handler
const handleScroll = debounce(() => {
  updateReadingProgress();
  saveScrollPosition();
}, 100);

window.addEventListener('scroll', handleScroll);
```

---

## Mobile Long-Form Considerations

### Mobile-Specific Challenges

**Problems:**
- Smaller screens make long content feel endless
- Scrolling fatigue on mobile
- Limited navigation options
- Performance more critical
- Connection may be slower

**Solutions:**
1. **More aggressive chunking** (load in 800-1000 word chunks)
2. **Floating navigation button** (TOC access)
3. **Reading progress more prominent**
4. **"Save for later" prompts**
5. **Offline reading support**

---

### Mobile TOC Pattern

**Bottom Sheet TOC:**
```
[Floating button in corner]
                              [≡]

[Tap opens bottom sheet]

┌──────────────────────────┐
│ ╌╌╌╌╌╌╌╌╌╌              │← Drag handle
│                          │
│ Table of Contents        │
│ ───────────────────────  │
│ → 1. Introduction        │
│ → 2. Background          │
│   → 2.1 History          │
│   → 2.2 Modern           │
│ → 3. Core Argument       │
│                          │
└──────────────────────────┘
```

**Swipe Gesture:**
- Swipe from left edge → TOC
- Swipe from right edge → Related content
- Swipe down → Dismiss

---

### Mobile Performance

**Optimizations:**
- Reduce images (lazy load aggressively)
- Simplify typography (fewer web fonts)
- Minimize animations
- Prefetch next section while reading current
- Support offline reading (service worker)

```javascript
// Service worker for offline reading
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Cache article for offline
async function cacheArticle(articleId) {
  const cache = await caches.open('articles-v1');
  await cache.add(`/articles/${articleId}`);
}
```

---

## Component Needs

### Essential Components (MVP)

1. **Reading Progress Bar**
   - Top position indicator (filled bar)
   - Percentage complete
   - Time remaining
   - Updates on scroll

2. **"Continue Reading" Button**
   - Appears at natural break (1000-1500 words)
   - Shows remaining content length
   - Smooth expansion on click
   - Updates progress on load

3. **Table of Contents**
   - Auto-generated from headings
   - Collapsible on mobile
   - Sticky on desktop
   - Active section highlighting
   - Click to jump navigation

4. **Reading Position Memory**
   - Auto-save scroll position
   - "Resume reading" prompt on return
   - Persist across sessions
   - Clear when user explicitly returns to top

5. **Section Headings**
   - Clear hierarchy (H1, H2, H3)
   - Linkable (deep links)
   - Accessible (proper semantics)
   - Collapsible (optional sections only)

---

### Enhanced Components (Phase 2)

6. **Timeline Navigator**
   - Visual representation of article sections
   - Click/tap to jump
   - Shows current position
   - Inspired by Discourse

7. **Reading Mode**
   - Hide TOC and sidebar
   - Focus on content only
   - Keyboard shortcut toggle
   - Minimal UI

8. **Smart Collapse/Expand**
   - Footnotes auto-collapse
   - Remember user preferences
   - Expand/collapse all option
   - Visual indication of collapsed content

9. **Section Progress**
   - Show progress within current section
   - "3 of 7 sections complete"
   - Section reading time estimates

---

### Advanced Components (Phase 3)

10. **Reading Statistics**
    - Time spent reading
    - Completion percentage
    - Sections visited
    - Return visit tracking

11. **Offline Reading**
    - Download for offline
    - Sync reading position
    - Offline bookmark management

12. **Smart Summaries**
    - AI-generated section summaries
    - Quick overview before deep dive
    - "Key points" extraction

---

## Implementation Priority

### MVP (Phase 1)

**Core Features:**
- ✅ Hybrid "Continue Reading" pattern for 2000+ word posts
- ✅ Reading progress indicator (bar + percentage + time)
- ✅ Auto-generated table of contents for 1500+ word posts
- ✅ Reading position memory (auto-save scroll)
- ✅ Mobile-optimized scrolling and navigation
- ✅ Lazy loading images
- ✅ Responsive typography (see reading-experience-optimization.md)

**Why This First:**
These features enable comfortable reading of philosophical long-form content without overwhelming users or sacrificing performance.

**Technical Requirements:**
- Intersection Observer for lazy loading
- LocalStorage for position memory
- Heading parsing for TOC generation
- Scroll event handling (debounced)
- Responsive breakpoints

---

### Phase 2 (Enhancements)

**Advanced Navigation:**
- ✅ Timeline navigator (Discourse-style)
- ✅ Section-by-section navigation (previous/next)
- ✅ "Jump to top" button
- ✅ Keyboard shortcuts (J/K for sections, Home/End)
- ✅ Deep linking to sections (share specific section)

**Collapse/Expand:**
- ✅ Collapsible footnotes and references
- ✅ Expandable supplementary sections
- ✅ Remember collapse state
- ✅ Expand/collapse all option

**Reading Experience:**
- ✅ Reading mode (distraction-free)
- ✅ Print/export options
- ✅ Reading time per section
- ✅ "Resume reading" prompt

**Why This Second:**
Enhances navigation and control for power readers without being essential for launch.

---

### Phase 3 (Future)

**Advanced Features:**
- 🔮 Offline reading support
- 🔮 Download for later
- 🔮 Reading statistics and analytics
- 🔮 Smart summaries (AI-generated)
- 🔮 Audio version / text-to-speech
- 🔮 Reading groups (collaborative reading)
- 🔮 Annotations on long-form posts
- 🔮 Related section recommendations

**Why This Later:**
Nice-to-have features for dedicated users. Implement based on demonstrated need.

---

## Best Practices Summary

### Do's ✅

1. **Provide Clear Navigation**
   - Table of contents for 1500+ words
   - Section headings with hierarchy
   - Reading progress indicator
   - Jump to top/bottom

2. **Optimize Loading**
   - Load initial 1000-1500 words fast
   - Lazy load images and remaining content
   - Virtualize very long content (10,000+ words)
   - Debounce scroll handlers

3. **Preserve Reading State**
   - Auto-save scroll position
   - Resume reading prompts
   - Remember collapse/expand state
   - Sync across sessions

4. **Progressive Disclosure**
   - "Continue reading" for 2000+ words
   - Collapsible supplementary sections
   - Expandable footnotes
   - Load more comments pattern

5. **Mobile Optimization**
   - Collapsible TOC
   - Floating navigation button
   - Touch-friendly targets
   - Optimized performance

---

### Don'ts ❌

1. **Don't Interrupt Reading Flow**
   - ❌ No pagination (avoid page breaks)
   - ❌ No aggressive ads mid-content
   - ❌ No "related articles" mid-post
   - ❌ No auto-playing videos

2. **Don't Hide Critical Content**
   - ❌ Don't auto-collapse main arguments
   - ❌ Don't hide important context
   - ❌ Don't require login to read
   - ❌ Don't truncate arbitrarily

3. **Don't Sacrifice Performance**
   - ❌ Don't load entire 10,000-word post at once
   - ❌ Don't render all images immediately
   - ❌ Don't use heavy animations
   - ❌ Don't ignore mobile performance

4. **Don't Lose User Context**
   - ❌ Don't lose scroll position on reload
   - ❌ Don't forget collapse state
   - ❌ Don't break deep links
   - ❌ Don't reset reading progress

---

## Wireframe Examples

### Long Post with TOC (Desktop)

```
┌──────────────┬─────────────────────────────────────────┐
│ Contents     │ ████████░░░░░░ 55% • 8 min remaining    │
│              ├─────────────────────────────────────────┤
│ Introduction │                                          │
│ Background   │ The Nature of Consciousness:            │
│ → History    │ An Extended Analysis                    │
│ → Modern     │ By Sarah Chen • 18 min read             │
│ Core Argument│                                          │
│ Objections   │ 1. Introduction                         │
│ Conclusion   │                                          │
│              │ [First 1500 words of content...]        │
│ [Scroll      │                                          │
│  stays]      │ [Continue Reading (12 min remaining)]   │
│              │                                          │
│              │ [Remaining content loads here]          │
│              │                                          │
└──────────────┴─────────────────────────────────────────┘
```

### Long Post (Mobile)

```
┌──────────────────────────┐
│ ████████░░░░░ 55%        │← Progress
├──────────────────────────┤
│ ☰ Contents               │← Collapsible TOC
│                          │
│ The Nature of            │
│ Consciousness            │
│                          │
│ Sarah Chen • 18 min read │
├──────────────────────────┤
│                          │
│ 1. Introduction          │
│                          │
│ [Content...]             │
│                          │
│ [Continue Reading ↓]     │← Button
│ 12 min remaining         │
│                          │
├──────────────────────────┤
│                     [≡]  │← Floating TOC button
└──────────────────────────┘
```

### "Resume Reading" Prompt

```
┌─────────────────────────────────────┐
│ Welcome back!                        │
│                                      │
│ You were reading:                    │
│ "The Nature of Consciousness"        │
│                                      │
│ Left off at: Section 3 (60% done)    │
│                                      │
│ [Resume Reading] [Start Over]        │
└─────────────────────────────────────┘
```

---

## Conclusion

For philosophical long-form content (1000-10,000+ words):

**Recommended Approach:**
1. **Hybrid loading** - Show 1000-1500 words, "Continue Reading" for rest
2. **Auto-generated TOC** - For posts >1500 words
3. **Reading progress** - Bar + time estimate
4. **Position memory** - Auto-save, resume reading
5. **Mobile-optimized** - Collapsible TOC, performance focus

**Key Principles:**
- Don't interrupt reading flow
- Provide navigation without forcing it
- Optimize performance at every step
- Remember user's reading state
- Progressive disclosure for length management

**MVP Focus:**
Get the fundamentals right - fast loading, clear navigation, preserved reading state. Advanced features (offline, analytics, summaries) can wait.

**Success Metrics:**
- Completion rate for long posts
- Time to first meaningful paint (<2s)
- Reading session length (target: 15+ minutes)
- Return rate for unfinished posts
- User satisfaction with navigation

Philosophy requires sustained attention. The UI should support deep reading, not fight it.
