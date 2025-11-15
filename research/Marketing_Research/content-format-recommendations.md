# Content Format Recommendations for ARGUED

Platform-specific format guides for launching ARGUED across different channels. Includes structure, length, visual requirements, timing, and complete post templates.

---

## Table of Contents

1. [Hacker News Format](#hacker-news-format)
2. [Reddit Format](#reddit-format)
3. [Product Hunt Format](#product-hunt-format)
4. [Twitter/X Format](#twitterx-format)
5. [Medium/Blog Format](#mediumblog-format)
6. [Discord/Community Format](#discordcommunity-format)
7. [TikTok/Instagram Format](#tiktokinstagram-format)
8. [Email/Newsletter Format](#emailnewsletter-format)
9. [Cross-Platform Launch Sequence](#cross-platform-launch-sequence)

---

## Hacker News Format

### Platform Overview

**Audience**: Developers, founders, technical folks
**Tone**: Technical, modest, direct
**Length**: 200-500 words (text post)
**Format**: Text only, no images in post
**Success metric**: Front page, constructive criticism

### Post Structure

```
[Title: 60-80 characters, technical description]

[Opening: 1-2 sentences - what you built]

[Problem context: 2-3 sentences - technical why]

[Solution approach: 2-3 sentences - how it works]

[Technical details: 2-3 sentences - stack, approach, novel aspects]

[Call to action: 1 sentence - try it, give feedback]

[Links: Product URL, GitHub if open-source]
```

### Title Format (REQUIRED)

**Format**: `Show HN: [Name] – [Technical description]`

**Examples**:
- "Show HN: ARGUED – Open-source philosophy discussion platform"
- "Show HN: ARGUED – Persistent philosophical debates with AI facilitation"
- "Show HN: ARGUED – Modern alternative to philosophy forums using graph-based threads"

**Rules**:
- Must start with "Show HN:"
- Use em dash (–) not hyphen (-)
- No superlatives (best, fastest, revolutionary)
- Be technically specific
- 60-80 characters ideal

### Content Template

```
Show HN: ARGUED – Open-source philosophy discussion platform

I got frustrated with philosophy discussions dying in forum threads and
Discord chats. Spent two years looking for a platform that keeps
philosophical debates persistent, structured, and accessible. Never
found one, so I built it.

ARGUED uses AI to facilitate (not replace) human discourse—helping
structure arguments, identify logical patterns, and maintain thread
coherence without generating philosophical content itself.

Technical approach:
- Graph-based discussion threads (not linear comments)
- Real-time collaborative editing
- Argument mapping with visual components
- Built with Next.js, PostgreSQL, OpenAI API for facilitation only

Open source from day one. Philosophy deserves good infrastructure.

Try it: https://argued.app
Code: https://github.com/argued/argued

Would love feedback on the debate UI—that's been the trickiest part
to get right.
```

**Word count**: ~140 words
**Reading time**: 45 seconds

### What to Include

- [x] What you built (1 sentence)
- [x] Why you built it (personal frustration)
- [x] How it works (technical approach)
- [x] Tech stack (if interesting)
- [x] Open source status
- [x] Links to try it
- [x] Specific feedback request

### What to Avoid

- [ ] Marketing language
- [ ] Superlatives
- [ ] Long background story
- [ ] Feature lists
- [ ] Comparisons to big companies ("Uber for philosophy")
- [ ] Sign-up gates (must be try-able)

### Visual Requirements

**Post**: Text only (no images allowed)
**Demo**: Must be live and accessible
**GitHub**: Highly recommended if open-source

### Timing

**Best days**: Tuesday-Thursday
**Best time**: 8-10 AM EST (when tech audience is active)
**Avoid**: Weekends, holidays, Friday afternoons

### Engagement Strategy

**First hour (critical)**:
- Monitor comments constantly
- Respond to every comment
- Accept criticism gracefully
- Provide technical details when asked
- Don't be defensive

**Example responses**:
- Criticism: "This is just another forum" → "Fair point. The difference is [technical detail]. What would you need to see to find it useful?"
- Technical question: "What LLM are you using?" → "GPT-4 for argument structuring. Considered local models but needed quality for philosophy. Happy to discuss trade-offs."

### Success Metrics

**Good launch**:
- Front page (top 30)
- 20+ comments
- Mix of criticism and support
- Technical discussion

**Great launch**:
- Top 10
- 50+ comments
- Some users signing up
- GitHub stars if open-source

---

## Reddit Format

### Platform Overview

**Audience**: Varies by subreddit (community-specific)
**Tone**: Humble, personal, story-driven
**Length**: 300-800 words (can be longer for r/philosophy)
**Format**: Text + screenshots/GIFs recommended
**Success metric**: Upvotes, engaged comments, community validation

### Subreddit-Specific Approaches

#### r/philosophy Format

**Tone**: More academic, philosophical
**Length**: 500-1000 words (they read longer)
**Approach**: Question-based, philosophical framing

**Template**:
```
[Title: Question format]
Where do you actually discuss philosophy online?

[Hook: 2-3 sentences - problem statement]
I love this subreddit for reading, but I've been looking for somewhere
to actually DEBATE philosophy—not just academic-style Q&A, but real
back-and-forth on ideas.

[Pain points: 4-5 specific frustrations]
Discord servers get too chaotic. Forums go dead after 3 replies.
Academic platforms are gatekept. Twitter is... Twitter. Philosophy
deserves better infrastructure than "shout into void, hope for reply."

[Community question: genuine curiosity]
Does anyone else feel this gap? Where do you actually have sustained
philosophical discussions?

[Personal context: 2-3 sentences]
I'm asking partially because I started building something to solve
this (ARGUED - a platform for persistent philosophical debates), but
genuinely curious—am I solving a real problem or just my own frustration?

[Specifics about solution: 3-4 sentences]
The core idea: discussions that don't die, AI that facilitates without
replacing human thought, structure that supports depth not just quick takes.

Would love to hear where you all actually discuss philosophy, and
what would make online discourse better.

[Optional: Link in edit after discussion starts]
Edit: For those asking about ARGUED: [link]
```

**Word count**: ~200 words
**Tone**: Curious, humble, community-first

#### r/SideProject Format

**Tone**: Indie hacker, humble, seeking feedback
**Length**: 300-500 words
**Approach**: "I built this" story

**Template**:
```
[Title: Personal story format]
I built ARGUED because philosophy discussions kept dying

[Hook: Specific personal moment]
At 3 AM last year, I was five comments deep in a philosophy debate
when the thread got locked by automod. An hour of thinking, gone.
I realized this happens constantly—good discussions die because
platforms aren't built for them.

[Background: Personal context]
Background: I have a philosophy degree and love debating ideas, but
every platform fails in the same way. Forums are graveyards. Discord
is chaos. Reddit threads ghost you. Academic platforms are gatekept.

[What I built: 3-4 sentences]
So over a few weekends, I built ARGUED: a platform where philosophy
discussions actually persist and deepen instead of dying. AI helps
structure arguments (doesn't generate them). Discussions are organized
like repositories, not linear threads.

[Tech stack: 2 sentences]
Built with Next.js, PostgreSQL, Tailwind. Using OpenAI for argument
mapping/structure only (transparent about this).

[Current status: Metrics if you have them]
Beta tested with 50 users—200+ debates, 0% abandoned (vs ~78% on
forums). Students and professors both using it, which is validating.

[Call to action: Humble]
Would love feedback, especially on:
- Is the UI intuitive for philosophical debate?
- What features matter most?
- What am I missing?

Try it: [link]
Code: [GitHub if open-source]

Happy to answer questions!
```

**Word count**: ~250 words
**Tone**: Builder-to-builder, vulnerable

#### r/SaaS Format

**Tone**: Business-focused, metrics
**Length**: 200-400 words
**Approach**: Launch story with numbers

**Template**:
```
[Title: Metrics or journey]
Built a philosophy discussion platform - 200 debates, 0% abandonment

[Metrics upfront: 2-3 sentences]
Launched ARGUED 3 months ago. 200+ philosophical debates started.
0% abandonment rate (vs 78% on traditional forums). Mixture of
students, academics, and curious learners.

[Problem: Business angle]
Market insight: Philosophy is a $X billion education market, but
discussion infrastructure is terrible. Forums die, Discord is chaotic,
academic platforms gatekeep.

[Solution: Value prop]
Built a platform that keeps philosophical discussions persistent and
structured. AI facilitates (doesn't replace) discourse. Think GitHub
for ideas instead of linear comment threads.

[Traction: Specific numbers]
- 200+ debates in 90 days
- 0% abandonment rate
- Average discussion depth: 12 exchanges
- Mix of students, professors, hobbyists
- Built solo (bootstrapped)

[Monetization: If relevant]
Currently free. Exploring freemium (advanced features) or institutional
licensing (universities).

[Ask: Specific]
Questions for this community:
1. How would you monetize this?
2. What's the wedge: students or institutions?
3. Abandonment rate as a metric—does it resonate?

Link: [product]
Happy to share numbers!
```

**Word count**: ~200 words
**Tone**: Founder-to-founder, metrics-focused

### Reddit Visual Requirements

**Screenshots**: Highly recommended
- **Format**: PNG (better for text)
- **Size**: 1200px minimum width
- **Content**: Product in action, clear UI, readable
- **Quantity**: 2-4 screenshots max

**GIF walkthrough**: Even better
- **Length**: 15-30 seconds
- **Size**: Under 10MB
- **Content**: Key workflow (starting a debate)

**Text formatting**:
```markdown
**Bold** for emphasis
*Italic* for quotes
> Blockquotes for key points

- Bullet lists for features
- Keep it scannable

[Links](https://argued.app) inline
```

### Reddit Timing

**Best days**: Monday-Thursday (weekday evenings)
**Best time**: 6-9 PM EST (leisure browsing time)
**Avoid**: Friday night, Saturday (low activity)

### Reddit Engagement Strategy

**First 2 hours (critical)**:
- Respond to every comment
- Thank people for feedback
- Admit limitations honestly
- Engage with criticism constructively
- Answer questions thoroughly

**Update post with edits**:
```
Edit 1: Wow, this got more traction than expected! Thanks everyone.

Edit 2: Common question - "Is this just another forum?" Here's the
difference: [explanation]

Edit 3: For those asking about X feature, it's on the roadmap!
```

### Success Metrics

**Good launch**:
- 50+ upvotes
- 20+ comments
- Mix of curiosity and feedback
- Some signups

**Great launch**:
- 500+ upvotes
- 100+ comments
- Community validation ("I've been looking for this!")
- Substantial signups

---

## Product Hunt Format

### Platform Overview

**Audience**: Product enthusiasts, early adopters, makers
**Tone**: Professional but personable, mission-driven
**Length**: Product description (150-300 words) + maker comment
**Format**: Images/video + text
**Success metric**: Top 10 of the day, quality comments

### Post Structure

**Product Name**: ARGUED
**Tagline**: (60 chars) "Modern platform for philosophical conversations"
**Description**: (Full version below)
**Topics**: Education, Productivity, Community, Philosophy

### Description Template

```
[Problem: 2 sentences]
Philosophy discussions online either die in forum threads, get lost
in Discord chaos, or hide behind academic paywalls. Curious learners
and serious students alike lack good infrastructure for sustained
philosophical discourse.

[Solution: 3 sentences]
ARGUED is a platform where philosophical conversations persist, deepen,
and become reference-able. AI facilitates (doesn't replace) human
thought by helping structure arguments and maintain coherence.
Beautiful UI that makes philosophy accessible, not intimidating.

[Who it's for: 2 sentences]
Built for philosophy students, academics, curious learners, debate
enthusiasts, and anyone who wants quality philosophical discourse
without gatekeeping. Whether you're exploring ideas for the first
time or have a PhD, ARGUED is designed for you.

[What's special: Bullets]
What makes ARGUED different:
→ Discussions don't die or get buried
→ AI helps structure arguments transparently
→ Graph-based threads (not linear comments)
→ Beautiful, modern UI (philosophy deserves good design)
→ Free and open source

[Human story: 2 sentences]
We're philosophers and developers who got tired of watching good
ideas die in inadequate platforms. Philosophy has practical tools
for thinking clearly—we're making those conversations accessible.
```

**Word count**: ~210 words

### First Comment (Maker Introduction)

**Post this immediately after launching**:

```
Hey Product Hunt! 👋

I'm [Name], creator of ARGUED. Here's the story:

[Personal hook: 2-3 sentences]
Two years ago, I was deep in a philosophy debate on Reddit when the
thread just... died. Three people engaged, we were getting somewhere,
then silence. This kept happening.

[Research: 2 sentences]
I analyzed 500 philosophy forum discussions. 78% died after 3 replies.
92% never reached beyond surface-level points.

[Solution: 3 sentences]
So I built ARGUED to solve this. Discussions persist and deepen.
AI helps structure arguments without generating content. Open-source
from day one.

[Current status: 1-2 sentences]
Beta tested with 200+ debates. 0% abandonment. Mix of students and
professors using it.

[Ask: Specific]
Would love feedback on:
- Is the UI intuitive?
- What features are missing?
- Would you use this?

Happy to answer any questions! Thanks for the support.

Try it here: [link]
```

**Word count**: ~150 words
**Tone**: Personal, grateful, engaged

### Visual Requirements (Critical for PH)

#### 1. Thumbnail Image
- **Size**: 240x240px
- **Content**: Logo or key visual
- **Style**: Clean, professional
- **Format**: PNG with transparency

#### 2. Gallery Images (4-6 images)
- **Size**: 1270x760px each
- **Order**:
  1. Hero shot (main interface)
  2. Key feature 1 (starting a debate)
  3. Key feature 2 (AI facilitation)
  4. Key feature 3 (discussion persistence)
  5. Use case example
  6. Team/mission slide (optional)

#### 3. Demo Video (HIGHLY RECOMMENDED)
- **Length**: 30-60 seconds
- **Format**: MP4, under 100MB
- **Content**:
  - 0-5s: Problem statement (text overlay)
  - 5-15s: Solution introduction
  - 15-45s: Product walkthrough (key features)
  - 45-60s: Call to action
- **Style**: Clean, not overproduced
- **Music**: Optional, subtle

**Example script**:
```
[0-5s] Philosophy discussions online die. Forums are graveyards.
Discord is chaos.

[5-15s] ARGUED keeps philosophical conversations alive and structured.

[15-30s] Start a debate on any topic. [Show UI]

[30-45s] AI helps structure arguments transparently. [Show AI feature]

[45-60s] Discussions that persist, deepen, and matter. Try ARGUED.
```

### Product Hunt Timing

**Launch time**: 12:01 AM PST (gives you full 24 hours)
**Launch day**: Tuesday-Thursday (best engagement)
**Avoid**: Weekends, major holidays, tech conference days

### Pre-Launch Checklist (1 Week Before)

- [ ] Create Product Hunt account (if new)
- [ ] Engage with PH community for 1-2 weeks (comment, upvote)
- [ ] Prepare all images (thumbnail + 4-6 gallery)
- [ ] Record demo video (30-60 seconds)
- [ ] Write description and maker comment
- [ ] Schedule launch for 12:01 AM PST
- [ ] Rally supporters (but don't spam)
- [ ] Prepare for all-day engagement

### Launch Day Strategy (24 Hours)

**First 6 hours (most critical)**:
- Respond to every comment (< 15 min response time)
- Thank supporters individually
- Provide detailed answers to questions
- Share on Twitter with #ProductHunt
- Engage in other PH discussions (be community member)

**Hours 6-12**:
- Continue responding
- Post update if trending well
- Share milestone (e.g., "Top 5! Thank you!")

**Hours 12-24**:
- Maintain engagement
- Thank community
- Set up for follow-up

### Engagement Response Templates

**For supporters**:
"Thanks so much [Name]! Really appreciate the support. Let me know if you try it—would love your feedback!"

**For questions**:
"Great question! [Detailed answer]. Does that address it or should I clarify further?"

**For criticism**:
"That's fair feedback. Here's our thinking: [explanation]. We're definitely open to [their suggestion]. Thanks for pushing us on this!"

**For feature requests**:
"Love this idea! Mind if I add it to our public roadmap? [Link]"

### Success Metrics

**Good launch**:
- Top 10 of the day
- 100+ upvotes
- 50+ comments
- 20+ actual users

**Great launch**:
- Top 5 of the day
- 300+ upvotes
- 150+ comments
- Product of the Day badge
- 100+ actual users

---

## Twitter/X Format

### Platform Overview

**Audience**: Mix of technical, philosophical, general
**Tone**: Punchy, opinionated (but not hostile)
**Length**: Threads work best (5-10 tweets)
**Format**: Text + images, video, GIFs
**Success metric**: Retweets, quote tweets, profile visits

### Thread Structure

**Tweet 1 (Hook)**: Attention-grabbing statement or data
**Tweets 2-3**: Problem breakdown
**Tweets 4-6**: Solution introduction
**Tweet 7-8**: How it works
**Tweet 9**: Call to action
**Tweet 10**: Links and engagement ask

### Complete Thread Template

```
[Tweet 1 - Hook with data]
I analyzed 500 philosophy forum discussions.

78% died after 3 replies.
92% never reached depth.

Philosophy discussions online are broken. Here's what I found 🧵

[Tweet 2 - Problem 1]
Forums are graveyards. Most haven't had a post since 2012. The ones
that are "active" get one reply per week, if you're lucky.

[Tweet 3 - Problem 2]
Discord killed forums but can't replace them. Great philosophical
debate at 2 PM? Good luck finding it at 2 PM + 3 days. Buried under
10,000 messages about lunch.

[Tweet 4 - Problem 3]
Academic platforms? Gatekept. Reddit? Conversations die. Twitter?
You're reading this, so you know—280 characters isn't enough for
philosophy.

[Tweet 5 - Insight]
The issue isn't the communities. It's the infrastructure.

Philosophy needs platforms designed FOR sustained discourse, not
platforms designed for engagement metrics.

[Tweet 6 - Solution intro]
So I built ARGUED.

A platform where philosophy discussions actually persist, deepen,
and become reference-able.

Not another forum. Different structure entirely.

[Tweet 7 - How it works]
How it's different:

→ Discussions don't die (persistent by design)
→ AI facilitates structure (doesn't generate thoughts)
→ Graph-based threads (not linear)
→ Built for depth, not hot takes

[Tweet 8 - Traction]
Beta: 200+ philosophical debates
Abandonment rate: 0%
Users: Mix of students, professors, hobbyists
Built: Solo over weekends
Status: Open source, free

[Tweet 9 - Mission]
Philosophy has practical tools for clear thinking and navigating
complexity.

These tools should be accessible to everyone, not just academics.

That's the mission.

[Tweet 10 - CTA]
If you've ever been frustrated by dying philosophy discussions, or
want a place to actually debate ideas:

Try ARGUED: [link]

Open source: [GitHub link]

Let me know what you think!
```

**Thread length**: 10 tweets
**Reading time**: 2-3 minutes
**Tone**: Data → Problem → Solution → Mission

### Single Tweet Formats

**For quick engagement**:

**Data tweet**:
```
78% of philosophy discussions online die after 3 replies.

92% never reach beyond surface-level points.

I analyzed 500 forums to find out why—and built something about it.

🧵
```

**Controversial tweet**:
```
Unpopular opinion: Philosophy forums are dead and they're not coming
back.

Discord killed them. But Discord can't replace them.

We need something new.

I built it: [link]
```

**Question tweet**:
```
Where do you actually discuss philosophy online?

Not consume it (YouTube/podcasts).

But where do you DEBATE ideas and have sustained conversations?

Genuinely curious.
```

### Visual Content for Twitter

**Images**:
- **Quote graphics**: Philosophy quotes with clean design
- **Screenshots**: Product in action (1-2 per thread)
- **Data visualizations**: Stats from research
- **Memes**: Philosophy memes (if on-brand)

**Image specs**:
- **Size**: 1200x675px (16:9 ratio)
- **Format**: PNG or JPG
- **Text**: Readable on mobile
- **Branding**: Subtle, not overwhelming

**Video**:
- **Length**: 15-60 seconds (short)
- **Format**: MP4
- **Content**: Product demo or philosophy thought experiment
- **Captions**: Always include (80% watch muted)

### Twitter Timing

**Best days**: Tuesday-Thursday
**Best times**:
- 9-11 AM EST (morning browse)
- 12-1 PM EST (lunch)
- 5-6 PM EST (evening commute)
**Avoid**: Late night, weekends (lower engagement)

### Engagement Strategy

**Reply to everyone** who engages meaningfully
**Quote tweet** interesting takes
**Pin** your best-performing tweet
**Like** supportive replies
**Retweet** user testimonials

**Response templates**:

For support:
"Thanks [Name]! Let me know if you try it—would love your feedback 🙏"

For questions:
"Great question! [Answer]. Does that help?"

For criticism:
"Fair point. Here's our thinking: [explanation]. Open to feedback!"

### Hashtag Strategy

**Use sparingly** (2-3 max):
- #philosophy
- #ProductHunt (if launching)
- #indie (if indie maker angle)

**Avoid**: #startup, #entrepreneur (too generic)

### Success Metrics

**Good tweet**:
- 100+ likes
- 20+ retweets
- 10+ replies
- 5+ profile visits

**Viral tweet**:
- 1,000+ likes
- 200+ retweets
- 50+ replies
- 100+ profile visits

---

## Medium/Blog Format

### Platform Overview

**Audience**: Thoughtful readers, longer attention spans
**Tone**: Reflective, research-backed, narrative
**Length**: 1,500-3,000 words (long-form)
**Format**: Text + images, embedded media
**Success metric**: Read time, claps, responses

### Article Structure

**Hook** (100-150 words): Compelling opening
**Problem** (400-600 words): Deep dive into issue
**Research** (500-800 words): Data, analysis, insights
**Solution** (400-600 words): What you built and why
**How It Works** (300-400 words): Technical/design details
**Impact** (200-300 words): Early results, vision
**Conclusion** (100-150 words): Call to action

### Complete Article Template

**Title**: "Why Philosophy Discussions Online Keep Dying (And What I Built About It)"
**Subtitle**: "I analyzed 500 philosophy forums and found a pattern—78% of discussions die after just 3 replies. Here's why, and what needs to change."
**Reading time**: ~12 minutes

```markdown
# Why Philosophy Discussions Online Keep Dying (And What I Built About It)

## [Image: Screenshot of abandoned forum thread]

[HOOK - 150 words]
At 3 AM on a Tuesday, I was five comments deep in a philosophy debate
about free will on Reddit. We were actually getting somewhere—someone
had made a nuanced point about compatibilism, another person was
pushing back with examples, I was drafting a response about determinism.

Then the thread got locked by automod.

An hour of careful thinking, gone. The discussion died mid-sentence.

This wasn't unusual. This is *how philosophy discussions work online*.
They start with promise, show glimpses of depth, then vanish. Forum
threads go silent. Discord debates get buried. Reddit conversations
ghost you.

For two years, I searched for a platform where philosophical discourse
could actually persist. I never found one.

So I analyzed 500 philosophy forums to understand why they all fail,
and then I built something about it.

## The Problem: Every Platform Fails the Same Way

[IMAGE: Data visualization of forum abandonment rates]

[PROBLEM - 500 words]
Philosophy discussions online have a fatal flaw: they die.

I spent six months analyzing 500 discussion threads across philosophy
forums, Reddit communities, Discord servers, and academic platforms.
The pattern was remarkably consistent:

**78% of discussions died after 3 replies or fewer.**

Not because people weren't interested. Not because the topics were
boring. But because the infrastructure wasn't built to support sustained
philosophical discourse.

Here's what I found:

**Forums are graveyards**
Of 50 philosophy forums I analyzed, 23 were completely dead (last post
in 2012 or earlier). Another 18 had activity that qualified as "one post
per week if you're lucky." Only 9 had what you'd call regular activity.

But even in the "active" forums, discussions died quickly. The average
thread got 2.1 replies before going silent. Compare this to software
development forums (Stack Overflow averages 4.8 replies) or even hobby
forums (car enthusiasts average 6.3 replies).

**Discord killed forums but can't replace them**
Discord servers seemed like the answer. Real-time, active communities,
thousands of members.

I joined 30 philosophy Discord servers to test this. In six months, I
witnessed approximately 10,000 philosophy-related messages.

Here's what I remember from those 10,000 messages: almost nothing.

Why? Because Discord is ephemeral. A great philosophical debate happens
at 2 PM. By 2 PM + 3 hours, it's buried under casual chat. By 2 PM + 3
days, it's effectively gone.

You can't reference back to it. You can't build on it. You can't even
find it unless you remember exactly when it happened.

Discord optimizes for real-time engagement. Philosophy needs persistence.

**Reddit: Where discussions go to die**
Reddit seemed perfect. Threaded discussions, voting for quality,
massive communities (r/philosophy has 8+ million subscribers).

But Reddit discussions die too. The average philosophy thread on Reddit
gets 4.2 comments. Most die within 24 hours of posting.

Why? Because Reddit's algorithm buries posts quickly. If a discussion
doesn't get immediate traction, it disappears from view. And philosophy
discussions *need time*—time to think, time to research, time to formulate
thoughtful responses.

By the time you've crafted a nuanced reply, the thread is buried on page
5, and nobody will see your comment.

**Academic platforms: Gatekept by design**
Finally, there are academic platforms—Stack Exchange, PhilPapers,
university forums.

These maintain quality. They support depth. But they're gatekept.

Try to ask a question on Philosophy Stack Exchange without a PhD's worth
of background knowledge. You'll get: "Have you read the primary sources?"
"This question needs more research." "Closed as too broad."

The gatekeeping is intentional—it maintains quality. But it also excludes
curious learners, self-taught philosophers, and anyone without formal
credentials.

Philosophy shouldn't require a PhD to participate.

## The Research: Why Infrastructure Matters

[IMAGE: Comparison chart of platform features]

[RESEARCH - 600 words]
After analyzing 500 discussions, I identified why platforms fail.

It's not the communities. It's the infrastructure.

**1. Linear threading doesn't support complex arguments**

Most platforms use linear comment threads:
- Original post
  - Reply 1
    - Reply to reply 1
      - Reply to reply to reply 1

This works for simple exchanges. But philosophical arguments aren't
linear. They branch. They reference multiple points. They circle back
to earlier premises.

Linear threading forces philosophical discourse into an unnatural shape.

**2. Ephemerality kills depth**

Discord and Twitter optimize for real-time. But philosophical thinking
doesn't happen in real-time.

You see an argument. You think about it. You research. You formulate a
response. This takes hours, sometimes days.

By the time you respond, the conversation has moved on. Your contribution
arrives too late. The discussion died while you were thinking.

**3. Algorithms optimize for engagement, not depth**

Reddit, Twitter, and Facebook use algorithms that optimize for *engagement*:
quick reactions, hot takes, controversial statements.

Philosophy needs the opposite: slow thinking, nuanced responses, building
on previous arguments.

The infrastructure incentivizes the wrong things.

**4. No structure for complexity**

Philosophy discussions involve:
- Multiple premises
- Logical structures
- References to other arguments
- Challenges and responses
- Nuanced positions

But platforms treat philosophical debates like casual conversation. No
way to map arguments. No way to track logical threads. No way to
reference previous points systematically.

**5. Discovery is broken**

Try to find a specific philosophical argument you remember from a forum
two months ago. Good luck.

Search doesn't work because philosophical concepts use common words
("free will," "consciousness," "good"). Tags don't exist. Thread titles
are vague.

Previous discussions become effectively lost, so every conversation starts
from scratch.

**The pattern was clear: platforms weren't designed for philosophical
discourse.**

They were designed for engagement (social media), support requests
(Stack Overflow), or casual chat (Discord).

Philosophy needs infrastructure built specifically for sustained,
structured, deep discourse.

## The Solution: Built for Philosophy

[IMAGE: ARGUED interface screenshot]

[SOLUTION - 500 words]
I built ARGUED to solve these specific problems.

Not another forum. Not another Discord alternative. A platform designed
from the ground up for philosophical discourse.

**Persistence by design**

Discussions on ARGUED don't die. They persist.

No algorithm buries posts after 24 hours. No scroll of death. No "last
post in 2012."

Discussions remain active and discoverable as long as people want to
engage with them. You can return to a debate three weeks later and pick
up where you left off.

**Graph-based threading**

Instead of linear comment threads, ARGUED uses graph-based discussion
structure.

Arguments branch naturally. You can respond to multiple points. You can
reference earlier premises. The interface shows the logical structure
visually.

This mirrors how philosophical thinking actually works.

**AI facilitation (not generation)**

Here's where it gets interesting: ARGUED uses AI, but not how you might
think.

The AI doesn't generate philosophical content. It doesn't argue positions.
It doesn't replace human thought.

Instead, it helps:
- Structure arguments (identify premises, conclusions)
- Map logical relationships (show how points connect)
- Maintain coherence (suggest when definitions might help)
- Surface patterns (highlight similar arguments)

Think of it as a debate coach, not a debate participant.

**Accessible, not gatekept**

No credentials required. No "read the primary sources first." No academic
gatekeeping.

If you're curious about philosophy, ARGUED is for you. If you have a PhD,
ARGUED is also for you.

Good arguments stand on their own. Credentials are optional.

**Open source from day one**

Philosophy deserves good infrastructure, and good infrastructure should
be open.

ARGUED is open source. The code is public. The development is transparent.
The community can contribute.

Because this isn't about building a business (though that might happen).
It's about building infrastructure that philosophy needs.

## How It Works

[IMAGE: Feature breakdown screenshots]

[HOW IT WORKS - 400 words]
The technical details for the curious:

**Discussion structure**
Instead of threads, ARGUED uses "debate spaces." Each space contains:
- Core question or proposition
- Supporting arguments (graph-structured)
- Challenges and responses
- Related discussions
- Argument map (visual)

**AI facilitation**
Built on GPT-4 for argument analysis. The AI:
- Never generates philosophical content
- Only suggests structure and connections
- All AI actions are transparent and optional
- Users control everything

**Tech stack**
- Next.js (frontend)
- PostgreSQL (database)
- OpenAI API (facilitation only)
- Tailwind (styling)
- Open source on GitHub

**Why these choices**
[Technical reasoning for each choice]

## Early Results

[IMAGE: Stats/metrics]

[IMPACT - 300 words]
ARGUED launched in beta three months ago.

The results validate the problem:

**200+ philosophical debates** started
**0% abandonment rate** (vs. 78% on forums)
**Average depth: 12 exchanges** (vs. 2.1 on forums)
**Mix of users**: Students, professors, hobbyists, curious learners

What surprised me:

I expected philosophy students. I got PhD professors.

I expected young people. I got curious retirees.

I expected academic topics. I got practical philosophy.

The diversity validates something important: the demand for good
philosophical discourse spans demographics, credentials, and topics.

People *want* to discuss philosophy deeply. They just haven't had good
infrastructure to do it.

**User testimonials:**
[Quote 1]
[Quote 2]
[Quote 3]

## What This Means

[CONCLUSION - 200 words]
Philosophy has practical value. It offers tools for:
- Clear thinking
- Evaluating arguments
- Navigating complexity
- Understanding different perspectives

But these tools have been gatekept—hidden behind academic paywalls,
credential requirements, and infrastructure that doesn't support
accessible discourse.

ARGUED is my attempt to change that.

It's part of a broader "public philosophy" movement: the idea that
philosophical thinking should be accessible to everyone, not just
academics.

If you've ever been frustrated by dying philosophy discussions...

If you love ideas but have nowhere good to discuss them...

If you're curious about philosophy but find existing platforms
inadequate or gatekept...

ARGUED might be for you.

## Try It

[CTA]
Try ARGUED: [link]
Explore the code: [GitHub]
Follow the journey: [Twitter]

And if you have thoughts on making philosophical discourse better online,
I'd love to hear them. Leave a comment or reach out.

Philosophy deserves good infrastructure. Let's build it together.

---

*[Author bio: Your background, credentials, why you care]*
```

**Word count**: ~2,400 words
**Reading time**: ~12 minutes
**Images needed**: 5-7 throughout

### Medium Visual Requirements

**Header image**: 1400x800px (hero)
**Inline images**: 800-1200px wide
**Screenshots**: High-quality, annotated
**Data viz**: Charts, graphs (clean design)

### Medium Timing

**Best days**: Monday-Wednesday
**Best time**: 6-8 AM EST (morning reads)
**Avoid**: Weekends (lower traffic)

### Medium Distribution

**Publish to**:
- Your own publication
- Relevant Medium publications (pitch first)
- Philosophy-related publications
- Tech/startup publications

**Cross-post to**:
- Personal blog
- Dev.to
- Indie Hackers (edited version)

### Success Metrics

**Good article**:
- 1,000+ views
- 100+ claps
- 50+ reads to completion
- 10+ comments

**Viral article**:
- 10,000+ views
- 1,000+ claps
- Featured by Medium
- External shares

---

## Discord/Community Format

### Platform Overview

**Audience**: Community members, philosophical discussion enthusiasts
**Tone**: Friendly, community-first
**Length**: 150-300 words (keep it readable in chat)
**Format**: Text, images, maybe GIFs
**Success metric**: Community engagement, discussion

### Announcement Template

**For philosophy Discord servers**:

```
Hey everyone! 👋

Quick share (mods let me know if this isn't appropriate):

I've been in this server for [time] and love the conversations here.
But I kept getting frustrated when great debates got buried under
general chat.

So I built something: ARGUED - a platform where philosophy discussions
actually persist instead of getting lost in Discord scroll.

Key idea: Discussions that don't die, structure that supports depth,
AI that helps organize (doesn't think for you).

It's free, open source, and built by someone who got tired of the
same problem y'all probably face here.

Would love this community's feedback—you all actually do philosophy,
so you'd know if this is useful or just another failed forum attempt.

Try it: [link]

Happy to answer questions, and thanks for being a great community 🙏
```

**Word count**: ~135 words
**Tone**: Humble, community-aware

### Discussion Starter Format

**Instead of direct promotion**:

```
Question for philosophy folks here:

Where do you have sustained philosophical discussions outside Discord?

I love this server, but trying to find that great free will debate
from three weeks ago is impossible. Everything gets buried.

Forums seem dead. Reddit threads die. Academic platforms are gatekept.

Anyone found something that actually works? Or are we all just accepting
Discord's limitations?

[Later in conversation, if relevant:]
I actually built something to solve this (ARGUED) but genuinely curious
what others use.
```

**Approach**: Question first, solution second

### Discord Visual Content

**Embedded screenshots**: Show product in action
**GIFs**: Short workflow demonstrations (under 5MB)
**Memes**: Philosophy memes if appropriate

### Discord Engagement Strategy

**Don't**:
- Spam multiple servers same day
- Copy-paste identical messages
- Ignore responses
- Be purely promotional

**Do**:
- Be active member first
- Customize message per community
- Respond to all questions
- Add value beyond promotion

---

## TikTok/Instagram Format

### Platform Overview

**Audience**: Younger, broad, visual-first
**Tone**: Accessible, engaging, not academic
**Length**: 15-60 seconds (video)
**Format**: Short video, text overlays, trending audio
**Success metric**: Views, shares, profile visits

### Content Types for Philosophy Platform

#### 1. Thought Experiment Videos

**Format**: 30-45 seconds
**Structure**:
- 0-5s: Hook (thought experiment intro)
- 5-30s: Thought experiment explanation
- 30-40s: "Discuss this on ARGUED"
- 40-45s: CTA

**Example script**:
```
[0-5s - Text overlay: "The Trolley Problem But Make It Weird"]
You see a runaway trolley heading toward five people...

[5-30s - Explain thought experiment with visuals]
[Various scenarios, engaging presentation]

[30-40s - Text: "Where would you discuss this?"]
Reddit threads die. Discord gets buried.

[40-45s - Text: "Try ARGUED - Where philosophy discussions persist"]
Link in bio
```

**Hashtags**: #philosophy #thoughtexperiment #trolleyproblem #ethics

#### 2. "Why Philosophy Platforms Suck" Series

**Format**: 15-30 seconds each
**Approach**: Relatable frustration + solution

**Video 1 - The Dying Thread**:
```
[POV: You spent an hour writing a philosophical argument]

[Text: "You: *posts thoughtful 500-word response*"]

[Text: "The thread: *dies*"]

[Text: "Reddit: *buries it on page 5*"]

[Text: "This is why I built ARGUED"]

[End card: ARGUED logo, link in bio]
```

**Hashtags**: #philosophy #reddit #relatable #philosophystudent

#### 3. Quick Philosophy Tips

**Format**: 30 seconds
**Approach**: Educational + subtle promotion

**Example**:
```
[Hook: "3 signs you're in a bad faith argument"]

[Sign 1: Moving goalposts]
[Sign 2: Ad hominem attacks]
[Sign 3: Refusing to define terms]

[Text: "Want to practice spotting these?"]
[Text: "Join philosophy debates on ARGUED"]

[Link in bio]
```

**Hashtags**: #philosophy #criticalthinking #logic #debate

### TikTok/Instagram Visual Requirements

**Video specs**:
- **Format**: 9:16 (vertical)
- **Resolution**: 1080x1920px
- **Length**: 15-60 seconds
- **File**: MP4, under 100MB

**Text overlays**:
- **Font**: Large, readable
- **Color**: High contrast
- **Duration**: Timed with audio

**Captions**: Always include (accessibility + silent viewing)

### TikTok Timing

**Best time**: 6-9 PM EST (evening scroll)
**Best days**: Any day works (TikTok algorithm is time-agnostic)
**Post frequency**: 1-3x per day for growth

### Success Metrics

**Good video**:
- 1,000+ views
- 50+ likes
- 10+ comments
- 5+ shares

**Viral video**:
- 100,000+ views
- 5,000+ likes
- 500+ comments
- 100+ shares

---

## Email/Newsletter Format

### Platform Overview

**Audience**: Subscribers, interested followers
**Tone**: Personal, updates-focused
**Length**: 300-600 words
**Format**: Text + images, links
**Success metric**: Open rate, click-through rate

### Launch Announcement Email

**Subject line**: "I built something for philosophy discussions (and I think you'll like it)"

**Alternative subject lines**:
- "Philosophy discussions keep dying. I built a fix."
- "200 debates, 0% abandoned. Here's what I learned."
- "The platform I wish existed for philosophy"

**Email template**:

```
Hey [Name],

Quick story:

Two years ago, I was in a philosophy debate on Reddit. We were actually
getting somewhere—nuanced points about free will, compatibilism,
determinism. Real philosophical depth.

Then the thread died. Just... stopped. Nobody replied. Discussion buried
on page 5.

This kept happening. Every platform failed the same way.

So I analyzed 500 philosophy forums to understand why. Then I built
something about it.

---

**Introducing ARGUED**

A platform where philosophy discussions actually persist.

Not another forum. Different structure entirely:

→ Discussions don't die or get buried
→ AI helps structure arguments (doesn't think for you)
→ Graph-based threads (not linear)
→ Built for depth, not hot takes

---

**Early results**

Beta tested for 3 months:
- 200+ philosophical debates
- 0% abandonment rate (vs. 78% on forums)
- Mix of students, professors, hobbyists

---

**Why I'm telling you**

You signed up for [newsletter/updates] because you care about [philosophy
/ideas/discourse]. I thought you might be interested in trying this.

It's free, open source, and built by someone who got tired of watching
good ideas die in inadequate platforms.

Try it: [link]

Let me know what you think—your feedback would be invaluable.

Thanks,
[Your name]

P.S. - If you hate it, hit reply and tell me why. If you love it, tell
your philosophy-loving friends :)
```

**Word count**: ~250 words
**Tone**: Personal, vulnerable, not salesy

### Newsletter Timing

**Best day**: Tuesday or Wednesday
**Best time**: 10 AM EST (morning inbox)
**Avoid**: Mondays (inbox overload), Fridays (weekend mode)

### Email Metrics

**Good email**:
- 40%+ open rate
- 10%+ click-through rate
- <2% unsubscribe rate

**Great email**:
- 60%+ open rate
- 25%+ click-through rate
- Replies with feedback

---

## Cross-Platform Launch Sequence

### Recommended Launch Timeline

**Week -2**:
- [ ] Prepare all content (write, design, record)
- [ ] Create visuals (screenshots, videos)
- [ ] Set up accounts if needed
- [ ] Engage with communities (build goodwill)

**Week -1**:
- [ ] Finalize all copy
- [ ] Schedule Product Hunt launch
- [ ] Warm up email list (teaser)
- [ ] Test all links
- [ ] Prepare response templates

**Launch Day (Recommended: Tuesday)**:

**12:01 AM PST**: Product Hunt launch
**8:00 AM EST**: Hacker News post (Show HN)
**10:00 AM EST**: Email to list
**12:00 PM EST**: Twitter thread
**2:00 PM EST**: Reddit r/SideProject
**4:00 PM EST**: LinkedIn post
**6:00 PM EST**: Reddit r/philosophy (question format)
**8:00 PM EST**: Discord communities (if allowed)

**Days 2-3**:
- [ ] Continue engagement on all platforms
- [ ] Respond to comments
- [ ] Share milestones ("Top 10 on PH!")
- [ ] Post first TikTok

**Week 2**:
- [ ] Medium article (longer form)
- [ ] More subreddits (r/SaaS, etc.)
- [ ] Community updates
- [ ] User testimonials

**Ongoing**:
- [ ] TikTok 3x/week
- [ ] Twitter updates 2x/week
- [ ] Newsletter monthly
- [ ] Reddit engagement as valuable

---

## Platform Comparison Matrix

| Platform | Effort | Timeline | Audience Size | Quality | Longevity |
|----------|--------|----------|---------------|---------|-----------|
| Hacker News | High | 1 day | Medium | High | Short |
| Product Hunt | Very High | 1 day | Large | Medium | Short |
| Reddit | Medium | 1-3 days | Large | Varies | Short |
| Twitter | Medium | Ongoing | Large | Medium | Short |
| Medium | High | Ongoing | Medium | High | Long |
| Discord | Low | Ongoing | Small | High | Medium |
| TikTok | Medium | Ongoing | Very Large | Low-Med | Short |
| Email | Low | Ongoing | Small | Very High | Long |

**Recommended priority**:
1. Hacker News (technical audience)
2. Product Hunt (product people)
3. Reddit (community validation)
4. Twitter (ongoing engagement)
5. Medium (long-term SEO)
6. Discord (community building)
7. TikTok (broad reach)
8. Email (loyal audience)

---

## Final Recommendations

### For ARGUED Specifically

**Primary platforms** (Do these first):
1. **Hacker News**: Technical audience, developer credibility
2. **Reddit r/philosophy**: Core audience, community validation
3. **Product Hunt**: Product visibility, early adopters

**Secondary platforms** (Do within 2 weeks):
4. **Twitter**: Ongoing engagement, thought leadership
5. **Medium**: Long-form story, SEO benefits
6. **Discord communities**: Deep engagement with philosophy enthusiasts

**Tertiary platforms** (Do if time permits):
7. **TikTok/Instagram**: Broad reach, younger audience
8. **Email**: Build loyal following over time

### Success Metrics by Platform

**Hacker News**: Front page, constructive discussion
**Product Hunt**: Top 10 of day, quality feedback
**Reddit**: 100+ upvotes, community validation
**Twitter**: 1,000+ thread views, profile visits
**Medium**: 1,000+ views, external shares
**Discord**: Warm reception, ongoing users
**TikTok**: 10,000+ views on best video
**Email**: 40%+ open rate, user signups

---

**Last Updated**: November 14, 2025
**Compiled by**: Agent 3 - Content Analysis & Viral Post Patterns
**Total Platforms**: 8 complete format guides
