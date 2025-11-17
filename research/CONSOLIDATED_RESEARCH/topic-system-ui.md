# Topic System UI

## Executive Summary

A robust topic/tag system is essential for organizing philosophical discussions, discovering content, and building identity around areas of interest. This research examines Reddit communities, Stack Exchange tags, and content platforms to design a hierarchical topic system that balances discoverability with depth.

**Key Recommendations:**
- **Hierarchical taxonomy:** Three-tier system (Meta > Field > Sub-field)
- **Follow/unfollow topics:** Personalized content feeds based on interests
- **Topic pages:** Dedicated hubs showing discussions, reading groups, debates
- **Smart filtering:** Combine multiple topics, filter by activity type
- **Topic-based notifications:** Granular control over alerts
- **Related topics:** Discover connected areas of philosophy
- **Trending topics:** Surface active discussions without popularity contest
- **User-generated subtopics:** Community can propose new categories

**Critical Insight:** Philosophy topics overlap and interconnect. The system must support viewing content through multiple lenses, not rigid categorization.

---

## Feature Overview

**Purpose:** Organize philosophical content by subject matter, enable interest-based discovery, facilitate topic-specific communities, and support personalized content filtering.

**User Value:**
- **Discovery:** Find discussions on specific philosophical topics
- **Focus:** Filter feed to areas of interest
- **Identity:** Build profile around philosophical interests
- **Community:** Connect with others interested in same topics
- **Navigation:** Browse platform's knowledge structure
- **Notifications:** Get alerts for topics you care about

**Unique Requirements:**
- **Hierarchical structure:** Philosophy has natural taxonomy (Ethics > Applied Ethics > Bioethics)
- **Cross-categorization:** Same discussion can span multiple topics (Mind + Metaphysics)
- **Flexible depth:** Some users want broad categories, others narrow specializations
- **Emerging topics:** Support new philosophical movements/debates
- **Academic alignment:** Match standard philosophy department organization
- **Accessible naming:** Clear to beginners, precise for experts

---

## Platform Analysis

### Reddit (Subreddit System)
**Similar Feature:** Topic-based communities with subscription model

**What Works Well:**
- **Simple follow model:** Subscribe to topics (subreddits) of interest
- **Personalized feed:** Home shows content from followed topics
- **Topic pages:** r/philosophy has dedicated space with own rules, mods
- **Multireddits:** Combine multiple topics into custom feeds
- **Flairs:** Tag posts with subtopics within subreddit
- **Discovery:** Recommended communities based on activity
- **Trending:** See active discussions across subreddits

**What Doesn't Work:**
- **Flat hierarchy:** Subreddits don't nest (no r/philosophy/ethics/bioethics)
- **Fragmentation:** Many overlapping subreddits (r/philosophy, r/askphilosophy, r/academicphilosophy)
- **Inconsistent naming:** Hard to predict subreddit names
- **No cross-posting context:** Same content in multiple places
- **Mod fiefdoms:** Subreddit quality varies wildly by moderation
- **Echo chambers:** Easy to only follow agreeable topics

**Key Takeaways:**
- Following topics for personalized feed is essential
- Topic pages need dedicated space and identity
- Need better hierarchical organization than flat subreddits
- Discovery mechanisms important for finding new topics
- Cross-topic functionality needed

### Stack Exchange (Tag System)
**Similar Feature:** Hierarchical tags with synonyms and related tags

**What Works Well:**
- **Multi-tagging:** Questions tagged with multiple relevant topics
- **Tag hierarchy:** Tags can have parent/child relationships
- **Tag synonyms:** Multiple names point to same canonical tag
- **Tag wikis:** Each tag has description, usage guidance
- **Tag expertise:** Users build reputation in specific tags
- **Filter by tags:** View only questions in specific tags
- **Related tags:** Suggestions for similar/connected topics
- **Tag editing:** Community can retag content for accuracy
- **Tag stats:** Show activity level, question count

**What Doesn't Work:**
- **Tag proliferation:** Hundreds of poorly-defined tags
- **Inconsistent usage:** Users tag differently
- **Too granular:** Over-specific tags fragment content
- **Requires expertise:** New users struggle with tagging
- **No visual hierarchy:** Tag relationships not obvious in UI

**Key Takeaways:**
- Multi-tagging is crucial for overlapping topics
- Tag descriptions help consistent usage
- Related tag suggestions aid discovery
- Need balance between specificity and consolidation
- Visual hierarchy helps navigation

### Medium (Topic Following)
**Similar Feature:** Topic tags with follow functionality

**What Works Well:**
- **Topic pages:** Curated collection of articles on topic
- **Follow topics:** Personalized feed based on interests
- **Topic suggestions:** Recommendations based on reading
- **Multiple topics per article:** Content can span topics
- **Topic stats:** Followers, stories, writers
- **Trending within topic:** See active discussions in category

**What Doesn't Work:**
- **No hierarchy:** All topics at same level
- **Spam tags:** Authors over-tag for visibility
- **Inconsistent quality:** Topic curation varies
- **No community:** Topics are just content aggregators
- **Algorithm-driven:** Less user control over what appears

**Key Takeaways:**
- Clean topic pages with clear branding
- Follow model works well for personalization
- Need quality control for tagging
- Topic pages should be more than just content lists

### Goodreads (Genre & Shelves)
**Similar Feature:** Genre categorization with custom shelves

**What Works Well:**
- **Genre hierarchy:** Fiction > Science Fiction > Cyberpunk
- **Custom shelves:** Users create personal categorizations
- **Genre discovery:** Browse books by category
- **Multiple genres:** Books can span categories
- **Popular shelves:** See how community categorizes books

**What Doesn't Work:**
- **Rigid genres:** Limited to predefined categories
- **Shelf chaos:** Too many custom shelves create confusion
- **No genre communities:** Genres are just filters, not hubs
- **Inconsistent tagging:** User-generated shelves vary wildly

**Key Takeaways:**
- Hierarchical categorization aids navigation
- Balance predefined vs custom organization
- Popular categorizations reveal community consensus

---

## Design Patterns

### Pattern 1: Topic Hierarchy Navigation

**Description:** Three-tier taxonomy showing philosophy's structure from broad to specific.

**User Flow:**
1. User clicks "Topics" from main navigation
2. Sees top-level meta-categories (5-7 major areas)
3. Expands category to see fields (10-15 per meta)
4. Expands field to see sub-fields (specialized topics)
5. Can follow at any level of specificity
6. Breadcrumb shows current position in hierarchy

**Visual Design:**
```
Desktop Topic Hierarchy:

┌──────────────────────────────────────────────────────────────┐
│  Topics                               [Search Topics] [+New]  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 📚 Browse Topics                                        │ │
│  │                                                         │ │
│  │ > Metaphysics & Epistemology                           │ │
│  │   ├─ Metaphysics (245 discussions) [Follow]            │ │
│  │   │  ├─ Free Will & Determinism (89)                   │ │
│  │   │  ├─ Mind-Body Problem (67)                         │ │
│  │   │  ├─ Personal Identity (54)                         │ │
│  │   │  └─ Time & Space (43)                              │ │
│  │   ├─ Epistemology (198 discussions) [Follow]           │ │
│  │   │  ├─ Skepticism (76)                                │ │
│  │   │  ├─ Justification (65)                             │ │
│  │   │  ├─ A Priori Knowledge (34)                        │ │
│  │   │  └─ Epistemic Virtue (23)                          │ │
│  │   └─ Logic (156 discussions) [Following ✓]            │ │
│  │      ├─ Formal Logic (87)                              │ │
│  │      ├─ Informal Logic (45)                            │ │
│  │      └─ Philosophy of Logic (24)                       │ │
│  │                                                         │ │
│  │ v Ethics & Political Philosophy                        │ │
│  │   ├─ Ethics (512 discussions) [Following ✓]           │ │
│  │   │  ├─ Normative Ethics (234) [Following ✓]          │ │
│  │   │  │  ├─ Consequentialism (89)                       │ │
│  │   │  │  ├─ Deontology (76)                             │ │
│  │   │  │  └─ Virtue Ethics (69)                          │ │
│  │   │  ├─ Applied Ethics (178)                           │ │
│  │   │  │  ├─ Bioethics (54)                              │ │
│  │   │  │  ├─ Environmental Ethics (43)                   │ │
│  │   │  │  ├─ Business Ethics (38)                        │ │
│  │   │  │  └─ Animal Ethics (43)                          │ │
│  │   │  └─ Meta-Ethics (100)                              │ │
│  │   │     ├─ Moral Realism (45)                          │ │
│  │   │     └─ Moral Psychology (34)                       │ │
│  │   └─ Political Philosophy (287) [Follow]               │ │
│  │      ├─ Justice (123)                                  │ │
│  │      ├─ Liberty (89)                                   │ │
│  │      └─ Democracy (75)                                 │ │
│  │                                                         │ │
│  │ > Philosophy of Mind & Cognitive Science              │ │
│  │ > Philosophy of Science                                │ │
│  │ > History of Philosophy                                │ │
│  │ > Continental Philosophy                               │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  Your Followed Topics (12):                                  │
│  Ethics • Logic • Existentialism • Phil of Mind •            │
│  German Idealism • Applied Ethics • Consciousness • ...      │
│  [Manage Followed Topics]                                    │
│                                                               │
└──────────────────────────────────────────────────────────────┘

Mobile Topic Navigation:

┌────────────────────────┐
│ Topics         [🔍]    │
├────────────────────────┤
│                        │
│ > Metaphysics &        │
│   Epistemology         │
│                        │
│ v Ethics & Political   │
│   Philosophy           │
│   • Ethics (512) ✓     │
│   • Political Phil     │
│     (287)              │
│                        │
│ > Philosophy of Mind   │
│                        │
│ > Philosophy of        │
│   Science              │
│                        │
│ > History of           │
│   Philosophy           │
│                        │
│ > Continental          │
│   Philosophy           │
│                        │
├────────────────────────┤
│ Following (12)         │
│ [Manage]               │
└────────────────────────┘
```

**States:**
- **Collapsed:** Showing only top-level categories
- **Expanded:** Showing subcategories and sub-sub-categories
- **Following:** User follows topic, indicated with checkmark
- **Active:** Recently active topics highlighted

### Pattern 2: Topic Page (Dedicated Hub)

**Description:** Comprehensive view of single topic showing all related content and activity.

**User Flow:**
1. User clicks on specific topic from hierarchy or search
2. Lands on topic page with description and stats
3. Sees active discussions, reading groups, debates on topic
4. Can filter by content type
5. Follow/unfollow topic from page
6. View related topics
7. See who else follows topic
8. Contribute new content to topic

**Visual Design:**
```
Topic Page (Desktop):

┌──────────────────────────────────────────────────────────────┐
│  Topics > Ethics > Normative Ethics                   [Follow]│
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   Normative Ethics                      │ │
│  │                                                         │ │
│  │  The study of ethical action, investigating which      │ │
│  │  actions are right and which are wrong, and which      │ │
│  │  standards and principles should guide moral choice.   │ │
│  │                                                         │ │
│  │  234 discussions • 18 reading groups • 5 active debates│ │
│  │  1,247 followers                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌──────────────┬──────────────────────────────────────────┤
│  │ Subtopics:   │  Content                                  │
│  │              │                                           │
│  │ ✓ Consequen- │  [All] [Discussions] [Reading Groups]    │
│  │   tialism    │  [Debates] [Socratic Dialogues]          │
│  │   (89)       │                                           │
│  │              │  Sort: [Recent ▼] [Active ▼] [Top]       │
│  │ ○ Deontology │                                           │
│  │   (76)       │  ───────────────────────────────────────  │
│  │              │                                           │
│  │ ○ Virtue     │  📌 Pinned Discussion                     │
│  │   Ethics     │  "Introduction to Normative Ethics -      │
│  │   (69)       │   Start Here"                             │
│  │              │  Comprehensive overview for newcomers...  │
│  │              │  💬 87  ↑ 156  📅 Updated 2 days ago     │
│  │              │                                           │
│  │ [See All]    │  ───────────────────────────────────────  │
│  │              │                                           │
│  ├──────────────┤  🔥 Active Now                           │
│  │              │                                           │
│  │ Related:     │  💬 "Can consequentialism account for     │
│  │              │      justice?"                            │
│  │ • Ethics     │  Sarah started 2h ago • 23 comments       │
│  │ • Meta-Ethics│  [Join Discussion]                        │
│  │ • Applied    │                                           │
│  │   Ethics     │  📚 "Kant Reading Group - Groundwork"    │
│  │ • Moral      │  Weekly meetings • 8 members • Ch 2 now   │
│  │   Philosophy │  [View Group]                             │
│  │              │                                           │
│  ├──────────────┤  ⚔️ "Utilitarianism vs Deontology"      │
│  │              │  Live debate • 47 watching                │
│  │ Popular Now: │  [Join Audience]                          │
│  │              │                                           │
│  │ • Free Will  │  ───────────────────────────────────────  │
│  │ • Conscious- │                                           │
│  │   ness       │  💬 Recent Discussions                    │
│  │ • Political  │                                           │
│  │   Philosophy │  "Understanding Kant's categorical        │
│  │              │   imperative"                             │
│  │              │  Marcus • 34 comments • 5h ago            │
│  │              │                                           │
│  │              │  "Is there a place for emotions in        │
│  │              │   moral reasoning?"                       │
│  │              │  Emma • 28 comments • 1d ago              │
│  │              │                                           │
│  │              │  "Virtue ethics and modern moral          │
│  │              │   dilemmas"                               │
│  │              │  James • 45 comments • 2d ago             │
│  │              │                                           │
│  │              │  [Load More Discussions]                  │
│  │              │                                           │
│  └──────────────┴───────────────────────────────────────────┘
│                                                               │
└──────────────────────────────────────────────────────────────┘

Topic Page (Mobile):

┌────────────────────────┐
│ ← Normative Ethics     │
│                  [★ Follow]│
├────────────────────────┤
│                        │
│ Study of ethical       │
│ action...              │
│                        │
│ 234 discussions        │
│ 1,247 followers        │
├────────────────────────┤
│ [All] [Discussions]    │
│ [Groups] [Debates]     │
│                        │
│ Recent ▼               │
├────────────────────────┤
│                        │
│ 📌 Pinned              │
│ "Intro to Normative    │
│  Ethics - Start Here"  │
│ 💬87 ↑156              │
│                        │
│ ────────────────────   │
│                        │
│ 🔥 Active Now          │
│                        │
│ 💬 "Can consequen-     │
│    tialism account..." │
│ 23 comments • 2h       │
│                        │
│ 📚 Kant Reading Group  │
│ 8 members • Ch 2       │
│                        │
│ ⚔️ "Utilitarianism    │
│    vs Deontology"      │
│ Live • 47 watching     │
│                        │
│ [Load More]            │
│                        │
└────────────────────────┘
```

**States:**
- **Following:** User subscribes to topic
- **Not following:** Option to follow visible
- **Active:** Content being created/discussed now
- **Filtered:** Showing only specific content types

### Pattern 3: Personalized Topic Feed

**Description:** Home feed filtered to show only content from followed topics.

**User Flow:**
1. User navigates to home/feed
2. Sees content from all followed topics by default
3. Can filter to specific topic or combination
4. Toggle between "Following" and "All Topics"
5. Inline topic indicators show source of each post
6. Can follow/unfollow topics without leaving feed
7. Suggested topics appear based on engagement

**Visual Design:**
```
Personalized Feed:

┌──────────────────────────────────────────────────────────────┐
│  Philosophy Platform                    [@username] [Search]  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [Following (12)] [All Topics] [Trending]                    │
│                                                               │
│  Filter topics:  [Ethics ✓] [Logic ✓] [+2 more ▼] [Clear]   │
│                                                               │
│  ───────────────────────────────────────────────────────────  │
│                                                               │
│  💬 Discussion                         Ethics • Applied Ethics│
│  "Should we prioritize climate change over other causes?"    │
│  Sarah Chen • 34 comments • 2 hours ago                      │
│  [Ethics] [Applied Ethics] [Environmental Ethics]            │
│                                                               │
│  Climate ethics involves weighing competing moral claims...  │
│  [Continue Reading]                                           │
│                                                               │
│  ───────────────────────────────────────────────────────────  │
│                                                               │
│  📚 Reading Group                                        Logic│
│  "Symbolic Logic Study Group - Week 3"                       │
│  Marcus • 8 members • Starting soon                          │
│  [Logic] [Formal Logic]                                      │
│                                                               │
│  We're covering truth tables and logical equivalences...     │
│  [Join Group]                                                 │
│                                                               │
│  ───────────────────────────────────────────────────────────  │
│                                                               │
│  🤔 Socratic Dialogue                    Philosophy of Mind   │
│  "What is consciousness?"                                     │
│  Facilitated by Dr. Kim • 3 participants • Turn 8            │
│  [Phil of Mind] [Consciousness] [Qualia]                     │
│                                                               │
│  [View Dialogue]                                              │
│                                                               │
│  ───────────────────────────────────────────────────────────  │
│                                                               │
│  💡 Suggested Topic:                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Philosophy of Language                                  │ │
│  │ Similar to your interests in Logic and Phil of Mind     │ │
│  │ 87 discussions • 456 followers                          │ │
│  │ [Follow] [Dismiss]                                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ⚔️ Debate                                              Ethics│
│  "Resolved: Moral relativism is incoherent"                  │
│  James vs Emma • Round 3 of 4 • 47 watching                  │
│  [Ethics] [Meta-Ethics] [Moral Relativism]                   │
│                                                               │
│  [Watch Debate]                                               │
│                                                               │
│  ───────────────────────────────────────────────────────────  │
│                                                               │
│  [Load More]                                                  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**States:**
- **Following:** Showing only followed topics
- **All:** Showing content from all topics
- **Filtered:** Specific topic(s) selected
- **Trending:** Popular content across platform

### Pattern 4: Topic Discovery & Suggestions

**Description:** Helping users find new topics based on interests and engagement patterns.

**User Flow:**
1. System analyzes user's followed topics and participation
2. Identifies related and complementary topics
3. Surfaces suggestions in multiple contexts:
   - During browsing (sidebar)
   - After reading content (end of thread)
   - In topic pages (related topics)
   - Dedicated discovery page
4. User can explore, follow, or dismiss suggestions
5. Suggestions improve over time based on feedback

**Visual Design:**
```
Topic Discovery Page:

┌──────────────────────────────────────────────────────────────┐
│  Discover Topics                                      [✕]     │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Based on your interest in Ethics and Logic:                 │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Meta-Ethics                                    [Follow] │ │
│  │                                                         │ │
│  │ Foundational questions about the nature of morality,   │ │
│  │ moral language, and ethical reasoning.                 │ │
│  │                                                         │ │
│  │ 156 discussions • 789 followers                        │ │
│  │                                                         │ │
│  │ Related to: Ethics, Moral Philosophy, Epistemology     │ │
│  │                                                         │ │
│  │ Popular discussions:                                    │ │
│  │ • "Is morality objective or subjective?"               │ │
│  │ • "Moral realism vs anti-realism"                      │ │
│  │                                                         │ │
│  │ [View Topic Page] [Not Interested]                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Deontic Logic                                  [Follow] │ │
│  │                                                         │ │
│  │ Logic of obligation, permission, and prohibition.      │ │
│  │ Bridges formal logic and ethical theory.               │ │
│  │                                                         │ │
│  │ 43 discussions • 234 followers                         │ │
│  │                                                         │ │
│  │ Related to: Logic, Ethics, Normative Ethics            │ │
│  │                                                         │ │
│  │ [View Topic Page] [Not Interested]                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  Trending This Week:                                          │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ AI Ethics                                      [Follow] │ │
│  │                                                         │ │
│  │ 🔥 67 new discussions this week                        │ │
│  │ Hot debate: "Can AI systems be moral agents?"          │ │
│  │                                                         │ │
│  │ 89 discussions • 1,023 followers                       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  Browse All Topics:                                           │
│  [View Topic Hierarchy]                                       │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**States:**
- **Recommended:** Personalized suggestions
- **Trending:** Popular topics this week
- **Related:** Connected to followed topics
- **Followed:** Already following, show different suggestions

### Pattern 5: Multi-Topic Filtering & Combinations

**Description:** Advanced filtering to view content at intersection of multiple topics.

**User Flow:**
1. User wants to see content combining multiple interests
2. Selects 2-3 topics to filter simultaneously
3. Sees only content tagged with all selected topics
4. Can save filter as custom view
5. Useful for niche intersections (e.g., "Ethics + Philosophy of Mind + Neuroscience")

**Visual Design:**
```
Multi-Topic Filter:

┌────────────────────────────────────────────────────────┐
│  Advanced Topic Filter                          [✕]    │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Show content tagged with:                              │
│                                                         │
│  ☑ Ethics                                    [Remove]  │
│  ☑ Philosophy of Mind                        [Remove]  │
│  ☑ Neuroscience                              [Remove]  │
│                                                         │
│  [+ Add Another Topic]                                  │
│                                                         │
│  Match: (•) All selected topics (AND)                  │
│         ( ) Any selected topic (OR)                    │
│                                                         │
│  ─────────────────────────────────────────────────     │
│                                                         │
│  Results: 12 discussions found                          │
│                                                         │
│  💬 "Free will and neuroscience: compatibilism?"       │
│     Ethics • Phil of Mind • Neuroscience               │
│     45 comments • 3 days ago                           │
│                                                         │
│  📚 "Reading: Dennett on Consciousness & Neuroscience" │
│     Phil of Mind • Neuroscience                        │
│     8 members • Currently reading                      │
│                                                         │
│  ⚔️ "Debate: Can brain scans determine moral          │
│      responsibility?"                                  │
│     Ethics • Neuroscience                              │
│     Live now • 23 watching                             │
│                                                         │
│  [View All Results]                                     │
│                                                         │
│  ─────────────────────────────────────────────────     │
│                                                         │
│  ☐ Save this filter as "Neuroethics"                   │
│                                                         │
│  [Apply Filter] [Clear]                                │
│                                                         │
└────────────────────────────────────────────────────────┘
```

**States:**
- **Building:** Selecting topics to combine
- **Applied:** Filter active, showing results
- **Saved:** Custom filter saved for quick access
- **No results:** Selected combination has no content

---

## Component Needs

### Core Components:
- **TopicHierarchyTree**: Collapsible tree showing topic taxonomy
- **TopicCard**: Individual topic with description, stats, follow button
- **TopicBreadcrumb**: Shows position in hierarchy (Meta > Field > Subfield)
- **TopicFollowButton**: Toggle follow/unfollow
- **TopicTag**: Small pill showing topic label (clickable)
- **TopicPageHeader**: Topic name, description, stats at top of topic page
- **ContentTypeFilter**: Tabs for discussions, groups, debates, etc.

### Discovery Components:
- **TopicSuggestion**: Recommended topic with explanation
- **RelatedTopics**: List of connected topics
- **TrendingTopics**: Topics with recent activity spike
- **TopicSearch**: Search with autocomplete and suggestions

### Feed Components:
- **TopicFilterBar**: Select which topics to show in feed
- **TopicIndicator**: Shows source topic(s) of content item
- **AllTopicsToggle**: Switch between followed and all content

### Advanced Components:
- **MultiTopicSelector**: Choose multiple topics for AND/OR filtering
- **SavedFilters**: Quick access to custom topic combinations
- **TopicStats**: Visualizations of topic activity, growth

---

## User Flows

### Flow 1: Following Topics to Personalize Feed

1. **Onboarding:** New user prompted to select initial interests
2. **Browse:** View topic hierarchy or search
3. **Select:** Click topics of interest (3-5 recommended to start)
4. **Follow:** Click "Follow" button on each topic
5. **Feed Updates:** Home feed now shows content from followed topics
6. **Refine:** Add more topics or unfollow as interests evolve
7. **Discover:** System suggests related topics over time

### Flow 2: Exploring a Topic Page

1. **Navigate:** Click topic from hierarchy, search, or content tag
2. **Land:** Arrive at topic page with description
3. **Scan:** See active discussions, reading groups, debates
4. **Filter:** Choose content type (all, discussions only, etc.)
5. **Explore Subtopics:** Click to narrow to specific subfield
6. **Follow:** If interested, follow topic for feed updates
7. **Contribute:** Start new discussion or join existing content
8. **Related:** Discover connected topics via suggestions

### Flow 3: Multi-Topic Content Discovery

1. **Interest:** User interested in intersection of topics (e.g., Ethics + AI)
2. **Filter:** Open advanced filter, select both topics
3. **Match Type:** Choose AND (both tags) vs OR (either tag)
4. **Results:** See content tagged with both Ethics and AI
5. **Save:** Save filter as "AI Ethics" for quick access later
6. **Return:** Saved filter appears in quick access menu
7. **Share:** Can share filter URL with others interested in same combo

### Flow 4: Topic Suggestion Acceptance

1. **Engagement:** User actively participates in Ethics discussions
2. **Suggestion:** System suggests "Meta-Ethics" as related topic
3. **Review:** User sees suggestion with description and sample content
4. **Explore:** Clicks "View Topic Page" to learn more
5. **Sample:** Reads a few discussions on topic page
6. **Follow:** Decides to follow Meta-Ethics
7. **Feed Integration:** Meta-Ethics content now appears in personalized feed
8. **Refinement:** Can unfollow later if not relevant

---

## Accessibility Considerations

### Cognitive Accessibility:
- **Clear hierarchy:** Visual indentation shows topic relationships
- **Descriptions:** Every topic has plain-language explanation
- **Breadcrumbs:** Always show where you are in taxonomy
- **Search:** Don't require navigating complex hierarchy
- **Suggestions:** Help users discover topics without overwhelming choice

### Visual Accessibility:
- **High contrast:** Topic tags, buttons clearly distinguishable
- **Screen reader:** Tree navigation properly labeled
- **Keyboard:** Full keyboard navigation of hierarchy
- **Icons:** Consistent visual language for topic types

### Motor Accessibility:
- **Large targets:** Follow buttons, topic links easily clickable
- **Keyboard shortcuts:** Quick follow/unfollow, navigate hierarchy
- **Voice:** Can speak topic names to search

---

## Mobile vs Desktop

### Desktop:
- **Sidebar hierarchy:** Collapsible tree always visible
- **Wide topic pages:** Multi-column layout with filters
- **Hover previews:** See topic description on hover
- **Multi-select:** Easy to combine multiple topic filters

### Mobile:
- **Drawer navigation:** Slide-out topic hierarchy
- **Simplified pages:** Single column, essential info first
- **Swipe:** Swipe between related topics
- **Quick follow:** Large follow buttons, minimal taps

---

## Implementation Priority

### MVP (Phase 1):
- ✅ Two-tier hierarchy (Field > Subfield)
- ✅ Follow/unfollow topics
- ✅ Topic pages with discussions
- ✅ Personalized feed filtering
- ✅ Basic search
- ✅ Topic tags on content

### Phase 2:
- ✅ Three-tier hierarchy (Meta > Field > Subfield)
- ✅ Related topic suggestions
- ✅ Trending topics
- ✅ Multi-topic filtering
- ✅ Saved custom filters
- ✅ Topic notifications

### Phase 3:
- ✅ User-proposed topics
- ✅ Topic wikis/guides
- ✅ Cross-topic analytics
- ✅ Topic-based matching

---

*This document creates a hierarchical topic system that organizes philosophical content, enables personalized discovery, and supports both broad browsing and narrow specialization.*
