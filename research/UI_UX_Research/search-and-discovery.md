# Search and Discovery

## Executive Summary

Effective search and discovery for a philosophical conversation platform must balance multiple user needs: targeted search ("find the trolley problem discussion"), exploratory browsing ("what are people talking about in ethics?"), and serendipitous discovery ("show me something interesting"). Research across content-heavy platforms reveals that the optimal approach combines **prominent global search** (always accessible in top-right), **multi-faceted filtering** (by topic, tag, date, engagement), **transparent sorting options** (trending, recent, most discussed), and **non-manipulative discovery mechanisms** (chronological with opt-in personalization).

**Key Recommendations:**

1. **Search Placement**: Persistent search bar in top-right corner of navigation (desktop) with icon that expands to full-screen overlay (mobile). Search should be accessible from every page via keyboard shortcut (/).

2. **Search Features**:
   - Real-time autocomplete with suggestions (conversations, topics, tags)
   - Scope selection (search all content, current topic only, specific domain)
   - Search syntax for power users (tag:ai-ethics, author:username, etc.)
   - Search history and saved searches (Phase 2)

3. **Filtering System**:
   - Faceted navigation with visible active filters (removable filter chips)
   - Primary filters: Topic categories, Tags, Date range, Engagement level, Difficulty
   - Filters update available options based on prior selections
   - Filter combinations use AND logic by default, OR within same facet

4. **Sorting Options**:
   - **Trending** (default): Active conversations in last 24-48 hours, weighted by engagement
   - **Recent**: Newest conversations first (chronological)
   - **Most Discussed**: Total reply/engagement count
   - **Unanswered**: Conversations with few/no replies
   - **Recommended** (opt-in Phase 2): Based on user reading/participation patterns
   - Sort options visible and changeable without leaving results page

5. **Discovery Mechanisms**:
   - **Trending Topics**: Show actively discussed topics without algorithmic manipulation (simple recency + engagement)
   - **Browse by Category**: Hierarchical navigation in sidebar
   - **Tag Cloud**: Visual representation of popular tags
   - **Random Conversation**: Serendipitous discovery feature (inspired by SEP)
   - **Related Conversations**: Based on shared tags and category, not opaque algorithms
   - **Following Feed**: User-curated topics and tags (opt-in personalization)

6. **Balancing Discovery**:
   - Default view: Chronological with trending boost (transparent algorithm)
   - Avoid hidden algorithmic feeds that create filter bubbles
   - Always allow users to switch to pure chronological
   - "Why am I seeing this?" explanations for recommended content
   - No dark patterns or engagement manipulation

This approach prioritizes transparency, user control, and content quality over engagement metrics and algorithmic manipulation—aligning with the platform's values of genuine philosophical discourse.

---

## Platform Analysis

### Stack Overflow
**What they do well:**
- **Prominent search**: Large search bar in top navigation, placeholder text guides syntax
- **Search syntax**: Advanced queries like `[tag] keyword` or `user:123 score:5`
- **Autocomplete**: Suggests questions, tags, users as you type
- **Search scope**: Can limit to specific tags before searching
- **Faceted filtering**: Left sidebar with filters (tags, date, score, answers, user)
- **Active filter display**: Shows applied filters as removable chips above results
- **Multiple sort options**: Newest, Active, Score, Frequent, Unanswered—clearly visible tabs
- **"Similar questions"**: Appears when asking question, prevents duplicates
- **Tag pages**: Each tag has dedicated page with description, related tags, top questions

**What doesn't work:**
- Search syntax not discoverable for new users (need to read documentation)
- Too many filter options can overwhelm (advanced filters hidden behind "more")
- No saved searches or search history

**Key takeaways:**
- Search bar should be large enough to suggest it's powerful
- Autocomplete is essential for discoverability
- Active filters must be visible and easily removable
- Sort options should be tabs, not hidden dropdown
- Tag-specific pages help users understand topics

---

### Reddit
**What they do well:**
- **Global search**: Always accessible in top bar, searches across all subreddits by default
- **Scope selection**: Filter results by subreddit, post type (posts/comments), time period
- **Sort options**: Relevance, Hot, Top (all time/year/month/week/day), New, Comments, Most Comments
- **Search within subreddit**: Subreddit-specific search is scoped automatically
- **Preview results**: See snippet of post content in results
- **Search history**: Recent searches saved (logged-in users)
- **Post filters**: Flair filtering within search results

**What doesn't work:**
- Reddit search historically poor (running joke among users)
- Relevance algorithm often misses obvious matches
- No advanced syntax for power users
- Can't search within comment threads easily
- Filter UI is clunky (dropdowns instead of facets)

**Key takeaways:**
- Search quality matters—bad search kills user trust
- Scope selection (search everywhere vs. current context) is important
- Time-based filtering is heavily used
- Search should work on both posts and replies/comments

---

### Medium
**What they do well:**
- **Minimal search UI**: Icon expands to overlay, keeps focus on content until needed
- **Search scope**: Defaults to all Medium, can filter to followed topics
- **Tag suggestions**: Auto-suggests tags as you type
- **Topic browsing**: Dedicated "explore topics" page with visual cards
- **Personalized discovery**: "Based on your reading history" (but opt-in)
- **"New in [topic]"**: Shows recent content in followed topics
- **Claps metric**: Social proof for quality (though can be gamed)

**What doesn't work:**
- Over-reliance on algorithmic recommendations
- No way to see pure chronological feed in topic
- Limited filtering options (can't filter by date, length, etc.)
- Tag system is flat and inconsistent
- Search often surfaces paywalled content (frustrating)

**Key takeaways:**
- Search can be minimal/hidden until needed if browsing is primary
- Topic exploration should be visual and inviting
- Personalization should be opt-in, not forced
- Be transparent about why content is recommended

---

### Hacker News
**What they do well:**
- **No search in main UI**: Relies on third-party search (Algolia HN Search)
- **Simple sorting**: Implicit (rank by points) and explicit (new, best, active)
- **Trending is default**: Most engaged stories appear higher
- **Transparent ranking**: Points and time visible, users understand algorithm
- **No personalization**: Everyone sees same feed (egalitarian)

**What doesn't work:**
- Lack of official search is major limitation
- Can't filter by topic/category (flat structure)
- No way to search comments
- Third-party search tools required for anything beyond browsing

**Key takeaways:**
- Simplicity works when content is flat (not hierarchical)
- Transparent ranking builds trust
- For philosophy platform with deep hierarchy, HN approach is insufficient
- But: HN proves you don't need complex algorithms for engagement

---

### Notion
**What they do well:**
- **Quick Find**: Cmd/Ctrl+K opens universal search overlay
- **Searches everything**: Pages, content within pages, comments
- **Instant results**: Updates as you type with performance
- **Keyboard navigation**: Arrow keys + Enter to navigate results
- **Recent pages**: Shows recently viewed pages before searching
- **Scoped search**: Can search within current page or workspace
- **Filters**: Can filter by page type, date modified, created by

**What doesn't work:**
- Search across large workspaces can be slow
- No advanced search syntax
- Can't save searches
- Results UI is simple list (no rich previews)

**Key takeaways:**
- Keyboard-driven search (Cmd+K pattern) is beloved by power users
- Search should feel instant (perceived performance matters)
- Recent/frequent items shortcut search entirely
- Search overlay pattern works well for tools where search is secondary to browsing

---

### Stanford Encyclopedia of Philosophy (SEP)
**What they do well:**
- **Dedicated search page**: Clear, focused search experience
- **Search tips**: Documentation on how to search effectively
- **Multiple discovery paths**:
  - Alphabetical table of contents
  - Chronological "What's New"
  - Random entry (serendipity)
- **No algorithmic ranking**: Simple alphabetical or chronological
- **Related entries**: Links within articles to related topics

**What doesn't work:**
- Basic text search, no autocomplete
- No filtering beyond search results
- Can't search within entry content easily
- No tag system or cross-references beyond manual links
- Discovery relies heavily on knowing what to search for

**Key takeaways:**
- Multiple discovery paths serve different user intents
- Serendipity features support exploratory learning
- Search documentation helps users learn advanced features
- For modern platform, SEP's search is too basic—needs autocomplete, filters

---

### General UX Research Findings

**Search Bar Placement** (2024 research):
- **Top right**: Most common, expected location (13.43% usage)
- **Top center**: Works for search-heavy sites like Google, e-commerce (15.86% usage)
- **Top left**: Worst performing (7.72% usage)
- **Header vs. Navigation**: Header placement (global scope) vs. navigation bar (contextual)

**Autocomplete Best Practices**:
- Shows results after 2-3 characters typed
- Limits suggestions to 5-10 items to prevent overwhelm
- Categories suggestions (e.g., "Conversations", "Topics", "Tags")
- Highlights matching text in suggestions
- Keyboard navigable (arrow keys, enter)

**Filtering Design Patterns**:
- **Faceted navigation**: Most effective for multi-dimensional filtering
- **Active filters visible**: Show as chips/tags above results, removable with X
- **Filter counts**: Show number of results per filter option
- **Dynamic filters**: Update based on prior selections
- **Filter persistence**: Maintain filters when navigating (URL parameters)

**Sorting Best Practices**:
- Visible, not hidden in dropdown
- Default sort should match user intent (trending for discovery, chronological for updates)
- Allow changing sort without losing filters or search query
- Persist sort preference per user (if logged in)

---

## Search UI Patterns and Placement

### Desktop Search Design

**Recommended Pattern: Persistent Search Bar in Top Navigation**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo]           [Search conversations, topics, tags... ]  [🔔][👤] │
│                              400-500px                         │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- **Position**: Top navigation bar, right of center
- **Width**: 400-500px (comfortable for query length)
- **Height**: 40px (sufficient for 16px text + padding)
- **Placeholder**: "Search conversations, topics, tags..." (guides what's searchable)
- **Icon**: Magnifying glass on left side of input
- **Keyboard shortcut**: `/` focuses search (shown in tooltip)
- **Always visible**: Sticky with top nav during scroll

**Interaction:**
1. Click or keyboard focus activates search
2. Typing triggers autocomplete dropdown
3. Dropdown appears below search bar, aligned left
4. Arrow keys navigate suggestions, Enter selects
5. Clicking suggestion or pressing Enter executes search
6. Search results page loads with query retained

**Autocomplete Dropdown:**
```
┌─────────────────────────────────────────────┐
│ [Search: trolley problem          ][X]     │
├─────────────────────────────────────────────┤
│ Conversations                               │
│  💬 Trolley problem variations              │
│  💬 Trolley problem and utilitarianism      │
│  💬 Fat man trolley problem                 │
│                                             │
│ Topics                                      │
│  📁 Thought Experiments                     │
│                                             │
│ Tags                                        │
│  🏷️ #trolley-problem (47 conversations)    │
│  🏷️ #thought-experiments (132 conversations)│
│                                             │
│ Press Enter to search all results →        │
└─────────────────────────────────────────────┘
```

---

### Mobile Search Design

**Recommended Pattern: Search Icon → Full-Screen Overlay**

**Top Bar (collapsed state):**
```
┌───────────────────────────────┐
│ [☰] [Logo]         [🔍] [👤] │
└───────────────────────────────┘
```

**Full-Screen Search (expanded state):**
```
┌───────────────────────────────┐
│ [←] [Search...............][X]│
├───────────────────────────────┤
│                               │
│ Recent Searches               │
│  🕐 AI consciousness          │
│  🕐 Free will debate          │
│                               │
│ Trending Searches             │
│  🔥 Trolley problem           │
│  🔥 Determinism               │
│                               │
│ Browse Topics                 │
│  📁 Ethics                    │
│  📁 Epistemology              │
│  📁 Metaphysics               │
│                               │
└───────────────────────────────┘
```

**Specifications:**
- **Trigger**: Tap search icon in top bar
- **Transition**: Slide up from bottom or fade in (300ms)
- **Layout**: Full screen overlay with backdrop
- **Input**: Large, centered search input (48px height)
- **Keyboard**: Auto-focus on input, auto-open keyboard
- **Dismiss**: Back button, X button, or swipe down
- **Content**: Show recent searches, trending, quick browse options

**Mobile Autocomplete:**
```
┌───────────────────────────────┐
│ [←] [trolley problem......][X]│
├───────────────────────────────┤
│ 💬 Trolley problem variations │
│ 💬 Trolley problem and util.. │
│ 💬 Fat man trolley problem    │
│ ─────────────────────────────  │
│ 📁 Thought Experiments        │
│ ─────────────────────────────  │
│ 🏷️ #trolley-problem (47)     │
│ 🏷️ #thought-experiments (132)│
│ ─────────────────────────────  │
│ View all results →            │
└───────────────────────────────┘
```

---

### Search Results Page Design

**Desktop Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│ [Search: AI ethics]                                    [🔔][👤]│
├──────────┬───────────────────────────────────────────────────┤
│ Filters  │ Results for "AI ethics" (127 conversations)       │
│          │ ─────────────────────────────────────────────────  │
│ Topics ▼ │ [x] Tag: ai-ethics   [x] Domain: Ethics   [Sort: Trending ▼]│
│ ☑ Ethics │                                                   │
│ ☐ Mind   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│          │ 💬 Should AI systems have final say in terminal   │
│ Tags ▼   │ diagnoses?                                        │
│ ☑ ai-ethics│ Ethics > Applied Ethics > Bioethics • 32 replies│
│ ☐ bioethics│ Last active 2 hours ago • @username             │
│          │                                                   │
│ Date ▼   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ ☑ Today  │ 💬 Teaching ethics to medical AI systems         │
│ ☐ This Week│ Ethics > Applied Ethics > Bioethics • 18 replies│
│          │ Last active 5 hours ago • @username              │
│ More ▼   │                                                   │
│          │ [Show more results...]                            │
└──────────┴───────────────────────────────────────────────────┘
```

**Mobile Results:**
```
┌───────────────────────────────┐
│ [←] AI ethics            [⚙️] │
├───────────────────────────────┤
│ 127 results                   │
│ [x ai-ethics] [x Ethics]      │
│ [Sort: Trending ▼]            │
│ ─────────────────────────────  │
│ 💬 Should AI systems have     │
│ final say in terminal diagnos │
│ Ethics > Bioethics            │
│ 32 replies • 2h ago           │
│ ─────────────────────────────  │
│ 💬 Teaching ethics to medical │
│ AI systems                    │
│ Ethics > Bioethics            │
│ 18 replies • 5h ago           │
│ ─────────────────────────────  │
│ [Load more...]                │
└───────────────────────────────┘

[⚙️ opens filter panel as bottom sheet]
```

---

## Filtering Systems Design

### Faceted Navigation Structure

**Primary Filter Categories:**

1. **Topics** (Hierarchical)
   - Level 1: Philosophical Domain (Ethics, Epistemology, etc.)
   - Level 2: Sub-discipline (Applied Ethics, Meta-Ethics, etc.)
   - Level 3: Specific Topic (Bioethics, Technology Ethics, etc.)
   - Interaction: Checkboxes, indented hierarchy
   - Behavior: Selecting parent includes all children

2. **Tags** (Flat with Autocomplete)
   - Top tags shown (10-15 most relevant)
   - "Show all tags" expands full list
   - Search within tags (autocomplete)
   - Interaction: Checkbox or click to add filter chip

3. **Date Range**
   - Preset options: Today, This Week, This Month, This Year, All Time
   - Custom range picker for advanced users
   - Default: All Time

4. **Engagement Level**
   - Highly Discussed (20+ replies)
   - Some Discussion (5-19 replies)
   - Few Replies (1-4 replies)
   - Unanswered (0 replies)
   - Default: All

5. **Difficulty Level** (Phase 2)
   - Beginner
   - Intermediate
   - Advanced
   - Not Specified
   - Default: All

6. **Content Type** (Phase 2)
   - Conversations
   - Articles/Essays
   - Questions
   - Resources
   - Default: All

---

### Filter UI Components

**Active Filters Display:**
```
Results for "AI consciousness"  (47 conversations)

Active filters:
[x Philosophy of Mind]  [x consciousness]  [x This Month]  [Clear all]

[Sort: Trending ▼]  [Filter ⚙️]
```

**Mobile Filter Bottom Sheet:**
```
┌───────────────────────────────┐
│ Filters               [Apply] │
├───────────────────────────────┤
│ Topics                      ▼ │
│ ☑ Philosophy of Mind          │
│ ☐ Ethics                      │
│ ☐ Epistemology                │
│                               │
│ Tags                        ▼ │
│ ☑ consciousness               │
│ ☐ ai-ethics                   │
│ + Add tag                     │
│                               │
│ Date Range                  ▼ │
│ ◉ This Month                  │
│ ○ This Week                   │
│ ○ All Time                    │
│                               │
│ Engagement                  ▼ │
│ ☑ All                         │
│                               │
│ [Clear all]           [Apply] │
└───────────────────────────────┘
```

---

### Filter Logic

**Combining Filters:**
- **Within same facet (OR)**: Tag:[ai-ethics] OR Tag:[bioethics] → Shows conversations with either tag
- **Across facets (AND)**: Topic:[Ethics] AND Tag:[ai-ethics] AND Date:[This Week] → Shows only conversations matching all criteria
- **Exception**: Multiple topics use OR if not hierarchically related

**Dynamic Filter Updates:**
- After selecting "Ethics" domain, Tags facet shows only tags used in Ethics conversations
- Filter counts update: "bioethics (23)" shows 23 results in current filter context
- Grayed-out options have 0 results

**Filter Persistence:**
- Filters stored in URL parameters: `?topic=ethics&tag=ai-ethics&date=week&sort=trending`
- Allows sharing filtered views
- Back button returns to previous filter state
- Filters persist across session (localStorage for logged-in users)

---

## Sorting Options

### Core Sort Modes

1. **Trending** (Default for Discovery)
   - **Algorithm**: Activity in last 24-48 hours weighted by engagement
   - **Formula**: `score = (replies + likes) / (hours_since_activity)^1.5`
   - **Transparency**: Show "Last active X hours ago" and engagement count
   - **Use Case**: "What's happening in philosophy right now?"

2. **Recent** (Chronological)
   - **Algorithm**: Pure reverse chronological by conversation creation date
   - **Transparency**: Show creation timestamp
   - **Use Case**: "What are the newest conversations?"

3. **Most Discussed**
   - **Algorithm**: Total reply count (all-time)
   - **Transparency**: Show "X replies"
   - **Use Case**: "What are the biggest discussions in this topic?"

4. **Unanswered**
   - **Algorithm**: Conversations with 0-2 replies, sorted by creation date
   - **Transparency**: Show "No replies yet" or "2 replies"
   - **Use Case**: "Where can I contribute?"

5. **Following** (Logged-in Users)
   - **Algorithm**: Conversations in followed topics/tags, sorted by activity
   - **Transparency**: Show "Because you follow [topic/tag]"
   - **Use Case**: "What's new in my areas of interest?"

6. **Recommended** (Phase 2, Opt-In)
   - **Algorithm**: Based on reading history, participation patterns, followed users
   - **Transparency**: "Recommended because you engaged with [similar conversation]" with dismiss option
   - **Opt-in**: User must enable "Personalized recommendations" in settings
   - **Use Case**: "Conversations I might find interesting"

---

### Sort UI Pattern

**Desktop Tabs:**
```
┌─────────────────────────────────────────────────────────────┐
│ Ethics > Applied Ethics > Bioethics (127 conversations)     │
├─────────────────────────────────────────────────────────────┤
│ [Trending] [Recent] [Most Discussed] [Unanswered]           │
├─────────────────────────────────────────────────────────────┤
│ 💬 Conversation title...                                    │
│ 32 replies • Last active 2 hours ago                        │
│ ─────────────────────────────────────────────────────────    │
│ 💬 Another conversation...                                  │
└─────────────────────────────────────────────────────────────┘
```

**Mobile Dropdown:**
```
┌───────────────────────────────┐
│ Bioethics (127)               │
│ [Sort: Trending ▼]            │
├───────────────────────────────┤
│ ◉ Trending                    │
│ ○ Recent                      │
│ ○ Most Discussed              │
│ ○ Unanswered                  │
└───────────────────────────────┘
```

---

### Sort Persistence

- **Per-context**: Remember sort preference per topic (Ethics always shows Trending, but user's preference persists)
- **URL parameter**: `?sort=recent` allows sharing specific view
- **User preference**: Logged-in users can set default sort (global setting)
- **Local storage**: Anonymous users' preference stored locally

---

## Discovery Mechanisms

### 1. Trending Topics

**Purpose**: Surface actively discussed topics without algorithmic manipulation

**Implementation:**
```
┌─────────────────────────────────────────────┐
│ 🔥 Trending in Philosophy                   │
├─────────────────────────────────────────────┤
│ 1. AI Consciousness (32 active conversations)│
│    Philosophy of Mind • 🔺 324 replies today│
│                                             │
│ 2. Moral Responsibility in Deterministic... │
│    Metaphysics • 🔺 156 replies today       │
│                                             │
│ 3. Epistemic Injustice and Testimony       │
│    Epistemology • 🔺 98 replies today       │
│                                             │
│ [View all trending →]                       │
└─────────────────────────────────────────────┘
```

**Algorithm (Transparent):**
- Count active conversations (new reply in last 24 hours) per Level 2 or Level 3 topic
- Weight by total engagement (replies + likes)
- No personalization—same for all users
- Updates hourly

**Why it works:**
- Simple, understandable metric (activity)
- No hidden algorithm creating filter bubbles
- Shows genuine community interest
- Time-bounded (24 hours) keeps it fresh

---

### 2. Browse by Category

**Purpose**: Hierarchical exploration of philosophical domains

**Implementation**: Sidebar navigation (covered in navigation-patterns.md)

**Discovery Flow:**
1. User sees top-level domains (Ethics, Epistemology, etc.)
2. Expands domain to see sub-disciplines
3. Clicks sub-discipline to see specific topics
4. Clicks topic to see conversations (sorted by Trending default)

**Enhancements:**
- Show conversation counts per category
- Highlight categories with recent activity (green dot indicator)
- "Random Topic" button for serendipity

---

### 3. Tag Cloud

**Purpose**: Visual representation of popular tags for discovery

**Implementation:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🏷️ Popular Tags                                             │
├─────────────────────────────────────────────────────────────┤
│  ai-ethics    consciousness    free-will    trolley-problem │
│                                                             │
│     kant    utilitarianism    determinism    metaphysics    │
│                                                             │
│  epistemology    bioethics    thought-experiments  justice  │
│                                                             │
│ (size indicates popularity)         [View all tags →]      │
└─────────────────────────────────────────────────────────────┘
```

**Algorithm:**
- Tag size based on number of conversations tagged (logarithmic scale)
- Color based on recency of activity
- Click tag to see all conversations with that tag
- Randomize layout slightly each load (avoid positional bias)

**Why it works:**
- Visual pattern recognition aids discovery
- Shows what's popular without ranking
- Encourages exploration of unfamiliar topics

---

### 4. Random Conversation

**Purpose**: Serendipitous discovery (inspired by SEP's random entry)

**Implementation:**
```
Button in sidebar or explore page: [🎲 Random Conversation]

Clicking loads a random conversation from:
- Option 1 (MVP): Completely random across all conversations
- Option 2 (Better): Random from active conversations (replied to in last 30 days)
- Option 3 (Phase 2): Weighted random (popular topics more likely)
```

**Why it works:**
- Supports exploratory learning philosophy
- Surfaces old but valuable conversations
- Fun, low-stakes discovery mechanism
- Breaks filter bubbles

---

### 5. Related Conversations

**Purpose**: Discover similar discussions based on shared attributes

**Implementation:**
```
[At bottom of conversation page]

┌─────────────────────────────────────────────────────────────┐
│ Related Conversations                                       │
├─────────────────────────────────────────────────────────────┤
│ In the same topic (Bioethics):                              │
│ • AI bias in medical diagnosis                              │
│ • Genetic enhancement ethics                                │
│                                                             │
│ With similar tags ([ai-ethics], [consciousness]):           │
│ • Could a language model be conscious?                      │
│ • Robot rights and moral patients                           │
│                                                             │
│ [Explore more in AI Ethics →]                               │
└─────────────────────────────────────────────────────────────┘
```

**Algorithm (Transparent):**
1. Same Level 3 topic (primary category)
2. Shared tags (2+ tags in common)
3. Same Level 2 sub-discipline
4. Sorted by engagement (recent activity preferred)
5. Limit to 5-10 suggestions

**Why it works:**
- Based on explicit attributes (category, tags), not opaque ML
- Users understand why conversations are related
- Keeps users engaged in topic area
- Doesn't create filter bubbles (can always browse freely)

---

### 6. Following Feed

**Purpose**: User-curated content feed based on followed topics and tags

**Implementation:**
```
┌─────────────────────────────────────────────────────────────┐
│ Your Following Feed                          [Manage follows]│
├─────────────────────────────────────────────────────────────┤
│ 💬 New in AI Ethics (following: ai-ethics tag)              │
│ Should AI systems have final say...                         │
│ 32 replies • 2 hours ago                                    │
│ ─────────────────────────────────────────────────────────    │
│ 💬 New in Bioethics (following: Bioethics topic)            │
│ Genetic enhancement for intelligence?                       │
│ 18 replies • 5 hours ago                                    │
│ ─────────────────────────────────────────────────────────    │
│ [Show older] [Switch to Explore →]                          │
└─────────────────────────────────────────────────────────────┘
```

**Algorithm:**
- Simple chronological feed of new conversations in followed topics/tags
- User explicitly follows topics/tags (heart icon or "Follow" button)
- Can unfollow at any time
- Alternative view: Switch to "Explore" (all topics, not personalized)

**Why it works:**
- User control—explicitly opt-in by following
- Transparent—shows "because you follow X"
- Easy to manage (unfollow)
- Doesn't replace browsing/search, supplements it

---

## Balancing Algorithmic vs Chronological

### The Problem with Pure Algorithmic Feeds

**Issues:**
- **Filter bubbles**: Users only see content similar to what they've engaged with
- **Engagement manipulation**: Algorithms optimize for clicks/time, not quality
- **Opacity**: Users don't understand why content is shown
- **Loss of control**: Can't see "all" or browse freely
- **Echo chambers**: Reinforces existing beliefs, reduces exposure to diverse views

**Why it's wrong for philosophy:**
- Philosophy requires exposure to opposing views
- Engagement metrics (clicks, time) don't equal philosophical value
- Controversial topics (most engaging) shouldn't dominate feed
- Users need control to explore breadth of philosophy, not just interests

---

### The Problem with Pure Chronological Feeds

**Issues:**
- **Timing luck**: Quality content posted at "wrong" time gets buried
- **Volume overwhelm**: In active topics, hundreds of new conversations daily
- **No quality signal**: New ≠ good or interesting
- **Dead hours**: Low activity periods show stale content

**Why it's limiting for philosophy:**
- Quality philosophical discussions take time to develop
- Early activity indicates emerging interesting conversation
- Pure chronological buries ongoing discussions with new activity

---

### Recommended Hybrid Approach

**Default View: Transparent "Trending" Algorithm**

```
Algorithm: Activity-Weighted Recent

Inputs:
- Conversation creation date
- Last reply timestamp
- Total reply count (last 48 hours)
- Total engagement (likes, bookmarks) (last 48 hours)

Formula:
score = (recent_replies * 2 + recent_engagement) / (hours_since_last_activity ^ 1.5)

Where:
- recent_replies = replies in last 48 hours
- recent_engagement = likes + bookmarks in last 48 hours
- hours_since_last_activity = time since last reply

Decay factor 1.5 balances recency vs. engagement
```

**Transparency Measures:**
- Show "Last active X hours ago" on each conversation
- Show engagement metrics (32 replies, 15 likes)
- Users understand: Active + recent = higher placement
- No hidden factors (no personalization, no click-through rate optimization)

**User Controls:**
- Switch to "Recent" (pure chronological) anytime
- Switch to "Most Discussed" (all-time engagement)
- Switch to "Following" (personalized, but explicit)
- Default can be changed in user settings

---

### Personalization (Phase 2, Opt-In Only)

**Recommended Approach:**
```
Setting in user preferences (off by default):
☐ Enable personalized recommendations

If enabled:
- "Recommended" sort option appears
- Homepage can show "Recommended for you" section
- Sidebar shows "You might be interested in"

Always with explanation:
"Recommended because you engaged with [similar conversation]"
[Dismiss] [Why am I seeing this?]

"Why am I seeing this?" modal:
- You read conversations tagged [ai-ethics]
- You participate in Ethics discussions
- This conversation is similar to ones you've engaged with
[Manage recommendation settings]
```

**Why opt-in:**
- Users who want personalization get it
- Users who prefer browsing/search can ignore it
- Transparency builds trust
- Aligns with platform values (user control, not manipulation)

---

## Search Features (Advanced)

### Search Syntax for Power Users

**Basic Search:**
- `trolley problem` → Searches conversation titles, content, tags

**Advanced Syntax:**
- `tag:ai-ethics` → Only conversations tagged ai-ethics
- `topic:bioethics` → Only conversations in Bioethics topic
- `author:username` → Conversations started by username
- `replies:>20` → Conversations with more than 20 replies
- `created:<7d` → Conversations created in last 7 days
- Combinations: `tag:kant topic:ethics replies:>10`

**Implementation:**
- Syntax shown in search tips (? icon next to search)
- Autocomplete suggests syntax as user types
- Not required—natural language search works too

---

### Saved Searches (Phase 2)

**Use Case:** Users who regularly check specific combinations

**Example:**
- Save search: `tag:ai-ethics topic:bioethics sort:recent`
- Name it: "AI Bioethics Updates"
- Appears in sidebar under "Saved Searches"
- Click to run search and see new conversations

---

### Search History

**Implementation:**
- Last 10-20 searches saved locally (localStorage or user account)
- Shown in search dropdown before typing
- Clear history option
- Respects privacy (can disable in settings)

---

## Implementation Priority

### MVP (Must Have)
**Timeline: Sprint 1-2**

1. **Global Search Bar**
   - Persistent in top navigation (desktop)
   - Icon with full-screen overlay (mobile)
   - Basic text search across conversation titles and content
   - **Why MVP**: Core discovery mechanism

2. **Basic Autocomplete**
   - Suggest conversations as user types
   - Categorized: Conversations, Topics, Tags
   - Limit to 10 suggestions
   - **Why MVP**: Significantly improves search UX

3. **Search Results Page**
   - List of matching conversations with snippets
   - Basic relevance ranking (TF-IDF or simple keyword matching)
   - Pagination or infinite scroll
   - **Why MVP**: Display search results

4. **Core Sorting Options**
   - Trending (default)
   - Recent (chronological)
   - Most Discussed (all-time engagement)
   - **Why MVP**: Different user intents require different sorting

5. **Basic Filtering**
   - Filter by Topic (Level 1 domain)
   - Filter by Tag (top tags)
   - Active filter display (chips)
   - **Why MVP**: Refine search/browse results

6. **Trending Topics Section**
   - Homepage widget showing 5-10 trending topics
   - Based on activity in last 24 hours
   - **Why MVP**: Discovery and engagement driver

**Success Criteria:**
- 70%+ of users find target conversation within 3 searches/clicks
- Search→Results latency < 500ms
- Autocomplete appears within 200ms of typing

---

### Phase 2 (Enhancement)
**Timeline: Sprint 3-4**

1. **Advanced Autocomplete**
   - Show more context in suggestions (snippet, tags, category)
   - Preview results without leaving page (hover)
   - Keyboard shortcuts for navigation
   - **Why Phase 2**: Enhances core feature

2. **Full Faceted Filtering**
   - All filter categories (Topic, Tag, Date, Engagement, Difficulty)
   - Filter counts (show # results per option)
   - Dynamic filtering (options update based on selections)
   - **Why Phase 2**: Power users need granular filtering

3. **Search Syntax**
   - Advanced search operators (tag:, topic:, author:, etc.)
   - Search tips documentation
   - Syntax highlighting in search bar
   - **Why Phase 2**: Power user feature, not essential

4. **Following Feed**
   - User can follow topics/tags
   - Dedicated feed of followed content
   - Manage follows page
   - **Why Phase 2**: Personalization for engaged users

5. **Related Conversations**
   - Show at bottom of conversation page
   - Based on shared category and tags
   - **Why Phase 2**: Keeps users engaged, aids discovery

6. **Tag Cloud**
   - Visual tag exploration page
   - Size based on popularity
   - **Why Phase 2**: Nice discovery feature, not essential

7. **Random Conversation**
   - Button in sidebar or explore page
   - Weighted by activity (recent conversations more likely)
   - **Why Phase 2**: Fun feature, supports serendipity

**Success Criteria:**
- 40%+ of active users follow at least 3 topics/tags
- Advanced filtering used by 15%+ of users
- Related conversations clicked 20%+ of the time

---

### Future (Nice to Have)
**Timeline: Sprint 5+**

1. **Personalized Recommendations**
   - ML-based content recommendations
   - Based on reading/participation history
   - Opt-in with transparency
   - **Why Future**: Requires ML infrastructure and data

2. **Saved Searches**
   - Save complex filter/search combinations
   - Name and organize saved searches
   - Notifications for new results in saved search
   - **Why Future**: Niche power user feature

3. **Advanced Search Interface**
   - Form-based search builder (vs. syntax)
   - Boolean operators (AND, OR, NOT)
   - Search within conversation threads (replies)
   - **Why Future**: Complex feature for small user segment

4. **Search Analytics**
   - Track what users search for (identify gaps)
   - Suggest new topics/tags based on searches
   - Auto-correct common misspellings
   - **Why Future**: Useful but not user-facing

5. **Semantic Search**
   - Natural language understanding ("find discussions about whether AI can be conscious")
   - Concept matching beyond keyword (synonyms, related concepts)
   - **Why Future**: AI-powered, complex implementation

6. **Collaborative Filtering**
   - "Users who read this also read..."
   - Based on community patterns, not individual
   - **Why Future**: Requires significant usage data

7. **Topic Summaries**
   - AI-generated summary of topic (what's being discussed)
   - Key themes in last week/month
   - **Why Future**: AI-powered, validation needed

**Success Criteria:**
- Search/discovery drives 50%+ of content views (vs. direct navigation)
- Users discover content outside their primary interests
- No filter bubble effect (users exposed to diverse views)

---

## Conclusion

The recommended search and discovery architecture prioritizes **transparency, user control, and quality** over engagement manipulation. Key principles:

1. **Search is primary**: Always accessible, fast, with autocomplete
2. **Multiple discovery paths**: Browse hierarchy, search, tags, trending, random, following
3. **Transparent algorithms**: Simple, understandable ranking (activity + recency)
4. **User control**: Switch between sort modes, opt-in personalization
5. **No dark patterns**: No hidden algorithms, no engagement manipulation
6. **Balanced approach**: Trending (discovery) + Recent (chronological) + Most Discussed (popular) + Following (personalized opt-in)

Start with MVP (global search, autocomplete, basic filtering, core sorting, trending topics) to establish foundation, then enhance with Phase 2 features (advanced filtering, following feed, related conversations) based on user behavior. Avoid over-engineering—clarity and speed are more valuable than complex algorithms for philosophical discourse.
