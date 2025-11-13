# CONTENT DISCOVERY & RECOMMENDATION ALGORITHMS
## Surfacing Quality Philosophy in the Age of Information Overload

**Mission**: Help users find the best philosophical content without algorithmic manipulation

---

## EXECUTIVE SUMMARY

Discovery algorithms determine what users see—and thus shape the platform culture. PhiloDuel's algorithms prioritize **quality over engagement**, **diversity over echo chambers**, and **user control over platform manipulation**.

**2025 Research Insights**:
- **Twitter/X algorithm**: Distills 500M tweets/day to handful for users (1.5 sec, 220 CPU seconds)
- **GraphJet**: Real-time interaction graph for recommendations (Twitter's engine)
- **SimClusters**: Identifies communities based on influential users
- **EU Digital Services Act**: Mandates assessment of algorithmic harms to democracy
- **Reddit's "Best" algorithm**: Balances quality + engagement + recency

**Core Principle**: Algorithms should **elevate discourse**, not just maximize engagement.

---

## 1. CORE RANKING ALGORITHM

### The PhiloDuel "Best" Algorithm

**Goal**: Surface highest-quality philosophical arguments

**Ranking Formula** (weighted sum):

```
Score = (Quality × 0.40) + (Engagement × 0.30) + (Recency × 0.20) + (Personalization × 0.10)
```

---

### Component 1: Quality Score (40%)

**Sub-Metrics**:

1. **Upvote Ratio** (30% of Quality):
   - Formula: Upvotes / (Upvotes + Downvotes)
   - Min threshold: 10 votes (avoid noise)
   - Target: 70%+ for quality content

2. **Citation Rate** (25% of Quality):
   - % of factual claims with sources
   - Scholarly rigor indicator
   - Target: 40%+ for advanced arguments

3. **Argument Depth** (20% of Quality):
   - Character count (proxy for depth)
   - Weighted: 200-2000 chars = optimal (too short/long penalized)
   - Structure analysis (intro, premises, conclusion)

4. **Fallacy-Free Score** (15% of Quality):
   - AI detects common fallacies
   - Penalty for logical errors
   - Target: <10% fallacy rate

5. **Good Faith Score** (10% of Quality):
   - Steel-manning vs. strawmanning
   - Respectful tone
   - Addresses opponent's points

**Quality Calculation**:
```
Quality = (0.30 × UpvoteRatio) + (0.25 × CitationRate) +
          (0.20 × DepthScore) + (0.15 × FallacyFree) +
          (0.10 × GoodFaith)
```

**Why 40% Weight**: Quality is paramount for intellectual community

---

### Component 2: Engagement Score (30%)

**Sub-Metrics**:

1. **Comment Depth** (35% of Engagement):
   - # of substantive replies (>50 chars)
   - Threaded discussion depth
   - Indicates stimulating content

2. **"Changed My View" Awards** (30% of Engagement):
   - Highest form of impact
   - Changed someone's mind = success
   - Rare but highly valued

3. **Reading Time** (20% of Engagement):
   - Avg time spent reading (vs. skimming)
   - Completion rate (read to end?)
   - Indicates actual engagement

4. **Shares** (10% of Engagement):
   - Users sharing argument
   - Viral potential
   - Indicates value

5. **Upvote Velocity** (5% of Engagement):
   - Rate of upvotes (not just total)
   - Early momentum indicator
   - Anti-gaming: Suspicious spikes flagged

**Engagement Calculation**:
```
Engagement = (0.35 × CommentDepth) + (0.30 × ChangedViews) +
             (0.20 × ReadingTime) + (0.10 × Shares) +
             (0.05 × UpvoteVelocity)
```

**Why 30% Weight**: Engagement matters, but not at cost of quality

---

### Component 3: Recency Score (20%)

**Time Decay Function**:

```
Recency = e^(-λ × age_in_hours)

Where λ = decay constant:
- Hot Takes: λ = 0.1 (fast decay, 24-hour relevance)
- Standard Debates: λ = 0.05 (medium decay, week relevance)
- Deep Dives: λ = 0.01 (slow decay, month+ relevance)
- Evergreen: λ = 0.001 (minimal decay, timeless)
```

**Content Types**:
- **Trending** (24 hours): Daily dilemmas, hot takes
- **Recent** (7 days): Standard debates, arguments
- **Current** (30 days): Deep philosophical essays
- **Timeless** (no decay): Classic arguments, FAQs

**Recency Boosts**:
- New user content (first 10 posts): 2x recency weight (help newcomers)
- Revived discussions (new comment on old post): Temporary recency boost
- Seasonal content (trolley problem in October): Contextual boost

**Why 20% Weight**: Fresh content matters, but timeless philosophy also valuable

---

### Component 4: Personalization Score (10%)

**User Interest Modeling**:

**Explicit Signals** (40%):
- Subscribed schools (#stoicism, #utilitarianism)
- Followed topics (#ethics, #metaphysics)
- User-declared interests (profile)

**Implicit Signals** (60%):
- Debate history (revealed preference)
- Upvote patterns (what resonates)
- Reading time by topic (actual consumption)
- Skill tree progression (learning focus)

**Similarity Calculation**:
```
Personalization = cosine_similarity(user_vector, content_vector)

User vector: [Ethics: 0.9, Logic: 0.6, Stoicism: 0.8, ...]
Content vector: [Ethics: 1.0, Stoicism: 0.7, ...]
```

**Diversity Injection**:
- **30% off-profile content**: Prevent echo chambers
- Cross-school recommendations
- Opposing viewpoints (flagged as "Challenge Your Beliefs")
- Serendipity (random high-quality content)

**Why Only 10% Weight**: Personalization helps, but platform-wide quality and diversity matter more

---

## 2. SPECIALIZED ALGORITHMS

### Algorithm: "For You" Feed (Personalized)

**Composition**:
- **40%**: Your subscriptions (chosen content)
- **30%**: Recommended based on behavior (algorithmic)
- **20%**: Popular across platform (community favorites)
- **10%**: Serendipity (random discovery)

**Update Frequency**: Real-time (new content appears immediately)

**User Control**:
- Adjust sliders (more/less personalization)
- "Not interested" feedback
- "Show me more like this" button
- Reset recommendations

---

### Algorithm: "Trending" (Platform-Wide)

**Goal**: Surface what's hot right now

**Trending Score**:
```
Trending = (Upvote Velocity × 0.50) + (Comment Velocity × 0.30) +
           (Share Velocity × 0.20)

Velocity = activity_last_hour / activity_previous_hour
```

**Time Windows**:
- **Now Trending** (last 1 hour): Real-time buzz
- **Today's Hot Topics** (last 24 hours): Daily trends
- **This Week** (last 7 days): Sustained interest
- **Rising** (sudden spike): Early trend detection

**Diversity Requirements**:
- Max 2 arguments from same user in Top 10
- Min 3 different schools represented
- Balance topics (not all ethics)

**Anti-Gaming**:
- Sockpuppet detection (coordinated upvoting)
- Velocity spike analysis (sudden jump = suspicious)
- Source diversity (upvotes from diverse users)

---

### Algorithm: "Best of All Time" (Historical)

**Goal**: Canonical arguments on each topic

**Ranking**:
```
BestScore = (Quality × 0.60) + (Engagement × 0.30) + (Longevity × 0.10)

Longevity = sustained engagement over time (not just initial spike)
```

**Categories**:
- Best Ethics Arguments
- Best Logic Puzzles
- Best Metaphysical Debates
- Best "Changed My View" Moments
- Best Steel Man Arguments

**Curation**:
- Algorithmic baseline (top scored)
- Expert review (philosophy PhDs validate)
- Community vote (quarterly "Hall of Fame" elections)

**Use Cases**:
- Onboarding (show newcomers best content)
- Learning resource (study canonical arguments)
- Platform showcase (external marketing)

---

### Algorithm: "Recommended for You" (Machine Learning)

**Technique**: Collaborative Filtering + Content-Based Hybrid

**Training Data**:
- User engagement history (upvotes, reads, comments)
- Content features (topics, schools, quality scores)
- Social graph (connections, similar users)

**Model**: Matrix Factorization (SVD)
- Users × Content matrix
- Predict missing entries (what user would like but hasn't seen)
- Recommend highest predicted scores

**Cold Start Solutions**:
- New users: Popular content + interest-based (from onboarding quiz)
- New content: Show to similar users first (early validation)
- Hybrid approach: Combine content features + behavior when data sparse

**Model Updates**: Weekly retrain (fresh patterns)

---

## 3. SPECIALIZED DISCOVERY FEATURES

### Feature: "Explore" Tab

**Structure**:

**Trending Topics**:
- Hot philosophical discussions (last 24 hours)
- Rising debates (sudden interest spike)
- Seasonal topics (contextual)

**Philosophical Schools**:
- Stoicism highlights
- Existentialism debates
- Utilitarian forum hot takes

**Topic Channels**:
- Ethics arena trending
- Logic puzzle of the day
- Metaphysics deep dive

**Collections**:
- "Introduction to Stoicism" (curated beginner content)
- "Free Will Debates" (all perspectives)
- "Best of Changed My View" (impactful arguments)

---

### Feature: Search & Filters

**Search Capabilities**:

1. **Full-Text Search**:
   - Search all arguments, debates, comments
   - Relevance ranking (TF-IDF + quality boost)
   - Filters: school, topic, date range, quality threshold

2. **Argument Search**:
   - Find arguments on specific topic
   - Filter by quality score, DeLO rating of author
   - Sort by best, most recent, most "Changed My View"

3. **User Search**:
   - Find philosophers by expertise, school, rating
   - Filter by active/inactive, mentorship availability
   - Connection suggestions integrated

4. **Philosophical Concept Search**:
   - Search by philosophical term ("categorical imperative")
   - Auto-suggest related concepts
   - Link to glossary + related debates

**Advanced Filters**:
- **Quality**: Min upvote ratio, citation required
- **Engagement**: Min comments, "Changed My View" only
- **Source**: Specific schools, users, time periods
- **Format**: Hot takes, standard debates, deep dives

---

### Feature: "Similar Arguments" Recommendations

**Trigger**: After reading argument

**Algorithm**:
- Content similarity (topic, school, structure)
- Opposing viewpoints ("Here's the counterargument")
- Related topics ("If you liked this ethics argument, try metaphysics")

**Display**:
- Sidebar: "Related Arguments" (3-5 suggestions)
- Opposing view highlighted: "See the other side"
- Deep dive: "Want to go deeper on this topic?"

---

### Feature: "Philosophy Rabbit Holes"

**Concept**: Guided deep dives into philosophical topics

**Implementation**:
- Start with beginner question ("What is free will?")
- Curated progression: Intro → Intermediate → Advanced → Expert
- Adaptive: Skip known content, focus on gaps
- Multi-format: Videos, essays, debates, quizzes

**Example Rabbit Hole**: "Free Will"
1. **Intro**: What is free will? (5-min explainer)
2. **Positions**: Determinism, libertarianism, compatibilism
3. **Arguments**: Best cases for each position
4. **Debates**: Watch experts argue both sides
5. **Practice**: Debate AI on free will
6. **Advanced**: Neuroscience, quantum mechanics, moral responsibility
7. **Expert**: Contemporary research, cutting-edge debates

**Progress Tracking**:
- Completion percentage
- XP earned (skill tree progression)
- Badges unlocked ("Free Will Scholar")

---

## 4. ANTI-ECHO CHAMBER MECHANICS

### Problem: Filter Bubbles

**Definition**: Users only see content they already agree with

**Detection**:
- **Ideological Diversity Score**: 0 (echo chamber) to 1 (max diversity)
- Track school representation in feed
- Monitor opposing viewpoint exposure

**Target**: 0.7+ diversity score for all users

---

### Solution 1: Mandatory Diversity Injection

**Implementation**:
- **30% of feed = opposing viewpoints** (flagged as "Challenge Your Beliefs")
- Cross-school content (even if not subscribed)
- Devil's advocate arguments (best cases against your position)

**Example**:
- User subscribes to Stoicism
- Feed includes: 70% Stoic content + 30% Epicurean, Existentialist, etc.

---

### Solution 2: "Steel Man Sunday"

**Weekly Feature**:
- Sunday: Front page features best arguments **against** popular positions
- Community votes on strongest steel-manned oppositions
- Rewards for engaging with opposing views

**Goal**: Normalize intellectual honesty and perspective-taking

---

### Solution 3: Cross-School Debates

**Algorithmic Boost**:
- Stoic vs. Utilitarian debates get 2x visibility
- Cross-tradition dialogues featured
- Tournament matchups ensure diverse matchups

**Community Events**:
- Monthly cross-school tournaments
- Inter-tradition collaborations
- "Philosophy Olympics" (all schools compete)

---

### Solution 4: Diversity Badges & Rewards

**Incentives**:
- "Open-Minded" badge: Engage with 5+ opposing viewpoints weekly
- "Bridge Builder" badge: Connect ideas across schools
- "Changed My Mind" badge: Publicly change position (highest honor)
- XP bonuses for cross-school engagement

---

## 5. ALGORITHMIC TRANSPARENCY & USER CONTROL

### Transparency Measures

**Why am I seeing this?**
- Every recommendation has explanation
- "Trending in Stoicism" / "Recommended based on your ethics interest"
- Click for full explanation (algorithm breakdown)

**Algorithm Audits**:
- Quarterly reports on feed composition
- Diversity metrics published
- Quality metrics tracked
- Community feedback integrated

**Open Algorithm** (Future):
- Open-source core ranking algorithm
- Community can propose improvements
- Transparent updates and changes

**Inspired by**: Bluesky's algorithmic choice (50,000+ custom feeds)

---

### User Control

**Feed Preferences**:
- Adjust sliders:
  - More/less personalization
  - More/less trending content
  - More/less opposing views (min 20%, max 50%)
  - More/less new users vs. established

**Content Filters**:
- Hide specific topics (e.g., political philosophy)
- Mute users (without unfollowing)
- Downweight schools (see less Stoicism)
- Upweight schools (see more Ethics)

**Alternative Algorithms** (Advanced):
- "Pure Chronological" (no ranking)
- "Only Subscriptions" (no recommendations)
- "Maximum Diversity" (60% opposing views)
- "Expert Mode" (academic-level only)

**Custom Feeds** (Future, Bluesky-inspired):
- Create your own algorithm
- Share with community
- Marketplace of feeds

---

## 6. ALGORITHMIC ETHICS & SAFEGUARDS

### Principle 1: Quality Over Engagement

**Dilemma**: Controversial content drives engagement but may harm discourse

**Solution**:
- Quality weighted 40% (highest)
- Engagement only 30%
- Controversial ≠ bad, but must be **well-argued**
- Flame wars downranked (low good faith score)

---

### Principle 2: Diversity Over Homogeneity

**Dilemma**: Personalization creates filter bubbles

**Solution**:
- Mandatory 30% opposing viewpoints
- Diversity score tracked and rewarded
- Cross-school content boosted
- Echo chamber detection and intervention

---

### Principle 3: Human Oversight Over Full Automation

**Dilemma**: Algorithms can amplify biases

**Solution**:
- Philosophy PhDs review "Best of All Time"
- Community votes on featured content
- Moderators can manually boost quality content
- Governance council audits algorithm quarterly

---

### Principle 4: Transparency Over Black Boxes

**Dilemma**: Users don't trust opaque algorithms

**Solution**:
- "Why am I seeing this?" explanation always available
- Quarterly transparency reports
- Open-source core algorithm (future)
- User control over algorithmic weights

---

## 7. ALGORITHM PERFORMANCE METRICS

### Success Indicators

**Quality Metrics**:
- Average feed quality score: **70+** (high-quality content surfaced)
- Citation rate in feed: **40%+** (scholarly rigor)
- Fallacy rate: **<10%** (logical quality)

**Diversity Metrics**:
- User diversity score: **0.7+** (anti-echo chamber)
- Cross-school content: **30%+** of feed
- Opposing viewpoints engaged: **20%+** of users click

**Engagement Metrics**:
- Click-through rate: **15%+** (relevant recommendations)
- Reading completion: **60%+** (actually engaged, not just clicked)
- "Changed My View" rate: **5%+** (impactful content)

**User Satisfaction**:
- Feed satisfaction rating: **7/10+** (quarterly survey)
- Algorithm trust score: **70%+** (users trust recommendations)
- "Not interested" rate: **<5%** (relevant suggestions)

---

## 8. TECHNICAL IMPLEMENTATION

### Technology Stack

**Recommendation Engine**:
- **Real-time**: Redis (caching), Apache Kafka (event streaming)
- **Batch processing**: Apache Spark (weekly model training)
- **ML Models**: TensorFlow/PyTorch (collaborative filtering)
- **Graph Database**: Neo4j (social graph, connection analysis)

**Scalability**:
- Handle 500M daily events (inspired by Twitter scale)
- Sub-1.5 second feed generation
- Distributed processing (horizontal scaling)

---

### Data Pipeline

**Collection**:
- User events (upvotes, reads, comments) → Kafka stream
- Content features (topics, schools, quality) → Database
- Social graph (connections, similar users) → Neo4j

**Processing**:
- Real-time scoring (trending, hot topics)
- Batch processing (weekly model retraining)
- Feature engineering (quality scores, diversity metrics)

**Serving**:
- Precomputed feeds (cached for frequent access)
- Personalized ranking (on-the-fly for each user)
- A/B testing (algorithm experiments)

---

## FINAL RECOMMENDATIONS

### Design for Quality, Not Just Engagement

**Don't**: Optimize for time on platform (engagement trap)
**Do**: Optimize for intellectual growth (quality content)

**Success**: Users leave **smarter**, not just entertained

---

### Embrace Diversity, Fight Echo Chambers

**Don't**: Give users only what they want (filter bubble)
**Do**: Challenge users with opposing views (intellectual growth)

**Success**: Users engage with **diverse perspectives**, not just confirmation bias

---

### Transparency Builds Trust

**Don't**: Hide algorithmic decisions (black box)
**Do**: Explain recommendations, publish metrics, allow control

**Success**: Users **trust** the algorithm (not suspicious)

---

## CONCLUSION

Discovery algorithms shape platform culture. PhiloDuel's algorithms prioritize:
1. **Quality** (40% weight)
2. **Engagement** (30%, but not at quality's expense)
3. **Recency** (20%, fresh but also timeless)
4. **Personalization** (10%, helpful but not dominating)

**Plus mandatory diversity** (30% opposing views), **transparency** (explain all recommendations), and **user control** (customize your feed).

**The Promise**:
> "An algorithm that makes you smarter, not just more engaged. That challenges your beliefs, not just confirms them. That you can trust, because you understand and control it."

**Measurable Success**:
- **70+ quality score** in feeds
- **0.7+ diversity score** for users
- **15%+ click-through** (relevance)
- **7/10+ satisfaction** (user trust)

**The Result**: A discovery algorithm that **elevates philosophical discourse** instead of optimizing for clicks.

---

**Research Complete**
**Date**: November 2025
**Based on**: Twitter/X algorithm (2025), Reddit "Best" algorithm, EU DSA research on algorithmic harms, Bluesky's algorithmic choice, recommendation system best practices
