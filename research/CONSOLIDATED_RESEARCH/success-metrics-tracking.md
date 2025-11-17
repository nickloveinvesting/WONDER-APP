# ARGUED Success Metrics & Tracking
## What to Measure, How to Track, What "Good" Looks Like

---

## Executive Summary: What Success Means

### Minimum Viable Success (Month 1)
- **300+ signups** total
- **50+ active users** (posted or debated at least once)
- **5+ quality debates** ongoing
- **Positive sentiment** on 80%+ of launch posts
- **One strong channel** identified (clear winner)
- **Zero major outages** during critical launch period

### Good Success (Month 1)
- **1,000+ signups** total
- **200+ active users**
- **20+ quality debates** ongoing
- **Product Hunt Top 5**
- **Hacker News front page**
- **Clear channel attribution** (know what works)
- **Organic word-of-mouth** starting (non-paid signups growing)

### Exceptional Success (Month 1)
- **3,000+ signups** total
- **500+ active users**
- **50+ quality debates** ongoing
- **Product Hunt #1**
- **Press coverage** (TechCrunch, The Verge, etc.)
- **Influencer mentions**
- **Strong community culture** established
- **Viral moment** (something shared widely)

---

## The North Star Metric

### Primary Metric: Quality Active Users (QAU)

**Definition**: Users who have participated in at least one debate with 3+ back-and-forth exchanges OR received a "changed my mind" award

**Why This Metric**:
- Quality over quantity
- Measures actual value delivered
- Predicts retention
- Aligns with mission (thoughtful discourse)
- Leading indicator of community health

**Target**:
- Week 1: 20 QAUs
- Week 2: 50 QAUs
- Week 4: 100 QAUs
- Month 2: 200 QAUs
- Month 3: 400 QAUs

### Secondary Metrics

1. **Total Signups** (vanity but useful)
2. **Signup → Active Conversion** (% who post within 7 days)
3. **7-Day Retention** (% who return after first visit)
4. **30-Day Retention** (% still active after 30 days)
5. **"Changed My Mind" Awards** per 100 debates
6. **Average Debate Depth** (exchanges per debate)
7. **Time to First Value** (signup → first meaningful interaction)

---

## Platform-Specific Metrics

### Product Hunt

#### Metrics to Track

**Immediate (During Launch Day)**:
- Upvotes by hour (track momentum)
- Comments count
- Comment sentiment (positive/neutral/negative)
- Rank position by hour
- Traffic driven to site
- Signups from PH (use UTM: ?utm_source=producthunt)

**End of Day**:
- Final rank (#1, Top 5, Top 10, etc.)
- Total upvotes
- Total comments
- Click-through rate (views → clicks to site)
- Conversion rate (clicks → signups)
- Quality of signups (did they activate?)

**Week Later**:
- Featured in newsletter? (bonus visibility)
- Any badges/awards?
- Long-tail traffic (people still finding via PH)
- Retention of PH signups vs other sources

#### What "Good" Looks Like

| Metric | Minimum | Good | Great | Exceptional |
|--------|---------|------|-------|-------------|
| Final Rank | Top 20 | Top 10 | Top 5 | #1 |
| Upvotes | 100+ | 200+ | 400+ | 800+ |
| Comments | 15+ | 30+ | 50+ | 100+ |
| Signups | 50+ | 150+ | 300+ | 500+ |
| Conversion Rate | 5% | 10% | 15% | 20% |
| 7-Day Retention | 20% | 30% | 40% | 50% |

#### How to Track
```
Google Analytics:
- UTM: ?utm_source=producthunt&utm_medium=launch&utm_campaign=launch_day

Track in Spreadsheet:
- Hour-by-hour rank position
- Upvote count every 2 hours
- Comments (flag important ones)
- Sentiment coding (positive/neutral/negative)

Post-Launch Analysis:
- Cohort analysis: PH signups vs others
- Quality score: Did they engage?
- Retention curve: Week 1, 2, 3, 4
```

#### Red Flags
- 🚩 Stuck outside top 20 after 4 hours
- 🚩 Negative comment ratio > 30%
- 🚩 Low click-through (people upvoting but not visiting)
- 🚩 High signup but zero engagement (wrong audience)
- 🚩 Competitor getting more attention same day

---

### Hacker News

#### Metrics to Track

**During Peak Hours (First 6 Hours)**:
- Points every 30 minutes
- Front page position
- Comments count
- Comment sentiment
- Traffic spike
- Signups (use UTM: ?utm_source=hackernews)

**End of Day**:
- Peak position reached
- Peak points achieved
- Total comments
- Time on front page
- Traffic driven
- Signup conversion

**Quality Metrics**:
- Depth of discussion (technical? philosophical?)
- Any notable commenters (PG, other influencers)
- Sentiment analysis (HN can be harsh)
- Quality of feedback (actionable insights?)

#### What "Good" Looks Like

| Metric | Minimum | Good | Great | Exceptional |
|--------|---------|------|-------|-------------|
| Peak Points | 20+ | 50+ | 150+ | 300+ |
| Peak Position | Top 30 | Top 10 | Top 5 | #1-2 |
| Time on Front Page | 1 hour | 3 hours | 6 hours | 12+ hours |
| Comments | 10+ | 30+ | 100+ | 200+ |
| Signups | 30+ | 100+ | 300+ | 500+ |
| Conversion Rate | 5% | 10% | 15% | 20% |

#### How to Track
```
Manual Tracking:
- Screenshot when you hit front page
- Track points every 30 min (first 6 hours)
- Track position every hour
- Log when you fall off front page

Automated:
- HN Algolia API for tracking
- Google Analytics for traffic
- UTM parameters for attribution

Comment Analysis:
- Tag: Technical / Skeptical / Supportive / Question
- Response tracking: Did we respond? How fast?
- Insights: What did we learn?
```

#### Red Flags
- 🚩 Flagged/removed (violated guidelines)
- 🚩 Negative comment ratio > 50%
- 🚩 Never reached front page
- 🚩 High traffic but zero signups (wrong audience)
- 🚩 Lots of "this has been tried before" comments

#### HN-Specific Success Indicators
- ✅ Thoughtful technical discussion
- ✅ PG or other influencers commenting
- ✅ Spawns related discussion threads
- ✅ People defending your approach in comments
- ✅ Reaches HN newsletter (next day email)

---

### Reddit

#### Metrics to Track (Per Subreddit)

**During Active Period (First 6 Hours)**:
- Upvotes
- Upvote ratio (% positive)
- Comments
- Comment sentiment
- Time to first comment
- Traffic driven

**End of Day**:
- Final upvotes
- Final comments
- Post position (hot/top)
- Signups from this post (UTM: ?utm_source=reddit&utm_medium=r/subredditname)

**Quality Indicators**:
- Discussion quality (shallow vs deep)
- Expert participation
- Community reception (welcomed vs hostile)
- Any rule violations/removals

#### What "Good" Looks Like (Per Post)

| Metric | Minimum | Good | Great | Exceptional |
|--------|---------|------|-------|-------------|
| Upvotes | 50+ | 100+ | 500+ | 1000+ |
| Upvote Ratio | 60% | 70% | 80% | 90% |
| Comments | 10+ | 25+ | 50+ | 100+ |
| Signups | 10+ | 30+ | 100+ | 200+ |
| Conversion Rate | 3% | 7% | 12% | 18% |

#### How to Track
```
Spreadsheet Per Subreddit:
- Subreddit name
- Post time
- Final upvotes
- Upvote ratio
- Comments count
- Sentiment (positive/mixed/negative)
- Signups (via UTM)
- Banned/removed? (yes/no)
- Would post again? (yes/no)

Aggregate Metrics:
- Best performing subreddits (rank by signups)
- Best upvote ratio (community fit)
- Best conversion rate (quality traffic)
- Time invested vs return (ROI)
```

#### Red Flags
- 🚩 Removed by moderators (rule violation)
- 🚩 Banned from subreddit
- 🚩 Upvote ratio < 50% (community rejection)
- 🚩 Lots of "spam" comments
- 🚩 High traffic but zero engagement on platform

#### Reddit-Specific Success Indicators
- ✅ Upvote ratio > 75%
- ✅ Deep discussion in comments
- ✅ Users defending project in thread
- ✅ Moderators engage positively
- ✅ Cross-posts to related subreddits (organic)
- ✅ Users mention it later in other threads

---

### Twitter/X

#### Metrics to Track

**Tweet Performance**:
- Impressions
- Engagement rate (likes + RTs + replies / impressions)
- Likes
- Retweets
- Quote tweets (sentiment)
- Replies
- Link clicks
- Profile visits

**Campaign Performance**:
- Follower growth during launch period
- Mentions of ARGUED
- Influencer engagement
- Signups from Twitter (UTM: ?utm_source=twitter)

#### What "Good" Looks Like (Launch Thread)

| Metric | Minimum | Good | Great | Exceptional |
|--------|---------|------|-------|-------------|
| Impressions | 5,000+ | 10,000+ | 25,000+ | 50,000+ |
| Engagement Rate | 2% | 4% | 6% | 10% |
| Likes | 30+ | 100+ | 300+ | 1000+ |
| Retweets | 10+ | 30+ | 100+ | 300+ |
| Signups | 20+ | 50+ | 150+ | 300+ |

#### How to Track
```
Twitter Analytics:
- Built-in analytics for impressions/engagement
- Track daily during launch week
- Monitor mentions and @replies

Manual Tracking:
- Who retweeted (any influencers?)
- Quote tweet sentiment
- Quality of replies
- Follow-up conversations

Attribution:
- UTM: ?utm_source=twitter&utm_campaign=launch
- Track signups in GA
```

#### Red Flags
- 🚩 Extremely low engagement rate (< 0.5%)
- 🚩 Lots of negative quote tweets
- 🚩 Ratio'd (more replies than likes - usually bad)
- 🚩 High impressions but zero clicks (message isn't compelling)

#### Twitter-Specific Success Indicators
- ✅ Influencer retweets/engagement
- ✅ Positive quote tweets with additions
- ✅ Spawns discussion threads
- ✅ People tagging friends
- ✅ Saves/bookmarks (people want to return)

---

## Cross-Platform Analytics

### Master Tracking Spreadsheet

**Columns to Track**:
```
| Date | Platform | Post Type | URL | Impressions | Clicks | CTR | Signups | Conversion | Sentiment | Notes |
```

**Example Row**:
```
| 2024-03-15 | Reddit | r/SideProject | [url] | ~50,000 | 2,500 | 5% | 125 | 5% | Positive | Great discussion, would post again |
```

### Channel Attribution

**Use UTM Parameters Consistently**:
```
Product Hunt: ?utm_source=producthunt&utm_medium=launch&utm_campaign=launch_day
Hacker News: ?utm_source=hackernews&utm_medium=show_hn&utm_campaign=launch_day
Reddit: ?utm_source=reddit&utm_medium=r/[subreddit]&utm_campaign=launch_week
Twitter: ?utm_source=twitter&utm_medium=organic&utm_campaign=launch_thread
Email: ?utm_source=email&utm_medium=beta_announcement&utm_campaign=public_launch
```

**Track in Google Analytics**:
- Acquisition → Campaigns
- See which UTMs driving most traffic
- See which converting best
- Cohort by source (retention by channel)

### Quality vs Quantity by Channel

**Track Both**:
1. **Volume**: How many signups from each channel?
2. **Quality**: How many became active users?

**Quality Score Formula**:
```
Quality Score = (Active Users / Total Signups) × 100

Example:
- Product Hunt: 200 signups, 80 active = 40% quality score
- Reddit: 150 signups, 90 active = 60% quality score
→ Reddit drove better quality despite fewer total signups
```

**Retention by Channel**:
```
Track in Cohorts:
- Week 1 retention by source
- Week 2 retention by source
- Week 4 retention by source

Identify:
- Which channels drive "sticky" users?
- Which drive one-time curious visitors?
- Where to double down vs deprioritize
```

---

## Engagement Quality Metrics

### Debate Quality Indicators

**Track These**:
1. **Average Debate Length** (number of exchanges)
   - Target: 5+ exchanges minimum
   - Great: 10+ exchanges

2. **"Changed My Mind" Rate**
   - Formula: (Changed Mind awards / Total debates) × 100
   - Target: 10%+ of debates result in mind change
   - Great: 20%+

3. **Argument Quality** (subjective but important)
   - Well-sourced (citations)
   - Logically structured
   - Addresses counterarguments
   - Civil tone

4. **Diversity of Viewpoints**
   - Are debates one-sided or genuine disagreement?
   - Ratio of agreement vs disagreement
   - Presence of minority opinions

5. **User Satisfaction**
   - Post-debate survey: "Was this valuable?" (Yes/Somewhat/No)
   - Target: 70%+ say "Yes"

### Community Health Metrics

**Weekly Check**:
1. **Toxicity Rate**
   - (Flagged comments / Total comments) × 100
   - Target: < 5%

2. **New User Engagement**
   - % of new signups who post within 7 days
   - Target: > 30%

3. **Power User Concentration**
   - Are 80% of debates from 20% of users? (Pareto)
   - Is activity too concentrated? (risk if they leave)
   - Want: Healthy distribution

4. **Topic Diversity**
   - How many different topics being discussed?
   - Too narrow = echo chamber forming
   - Too broad = lack of focus

5. **Response Time**
   - How quickly do debates get responses?
   - Dead debates = bad sign
   - Target: < 4 hours for first response

---

## Retention Metrics

### Cohort Analysis

**Track by Signup Week**:
```
Week 0 (Signup week): 100 users signed up
Week 1 Retention: 60 returned (60%)
Week 2 Retention: 45 returned (45%)
Week 4 Retention: 35 returned (35%)
```

**What Good Looks Like**:
- Week 1: 40%+ retention
- Week 2: 30%+ retention
- Week 4: 20%+ retention
- Month 3: 15%+ retention

**Retention Curves**:
- Plot retention over time
- Compare cohorts (Week 1 signups vs Week 2, etc.)
- Identify if getting better or worse over time

### Churn Analysis

**Track When People Leave**:
- After signup (never activated)
- After first session (tried once, didn't return)
- After first week (initial interest faded)
- After first month (medium-term churn)

**Exit Survey** (if they cancel/delete):
```
Quick question: What made you decide to stop using ARGUED?
- Not relevant to my interests
- Too time-consuming
- Didn't understand how to use it
- Community wasn't what I expected
- Technical issues
- Other: [open text]
```

---

## Leading vs Lagging Indicators

### Leading Indicators (Predict Future Success)

**Good Signs**:
- ✅ High signup → activation rate (people try it)
- ✅ Long session times (people engaged)
- ✅ Users inviting friends (organic growth starting)
- ✅ Repeat visits within first week (habit forming)
- ✅ Deep debates starting (product working)
- ✅ Positive unsolicited feedback (word spreading)
- ✅ Questions about features (people want more)

**Warning Signs**:
- 🚩 High signup, low activation (curiosity but no value)
- 🚩 Short session times (confused or bored)
- 🚩 No repeat visits (tried once, done)
- 🚩 Shallow debates (not delivering value)
- 🚩 Lots of lurkers, few participants (engagement problem)
- 🚩 Negative feedback increasing (product-market fit issue)

### Lagging Indicators (Measure Past Success)

**Track These**:
- Total signups (cumulative)
- Revenue (if monetized)
- Press coverage
- Social media followers
- Search traffic
- Brand mentions

**Why They Lag**:
- Result of earlier work
- Hard to change quickly
- Good for reporting, not for steering

---

## Channel Performance Dashboard

### Weekly Review Template

**For Each Channel**:
```
CHANNEL: [Product Hunt / Hacker News / Reddit / etc.]

This Week:
- Posts: [number]
- Traffic: [visits]
- Signups: [number]
- Conversion: [%]
- Sentiment: [Positive/Mixed/Negative]

Quality Metrics:
- Active Users: [number] ([%] of signups)
- 7-Day Retention: [%]
- Quality Score: [calculated]

What Worked:
- [specific thing that worked]

What Didn't:
- [specific thing that didn't work]

Learning:
- [key insight]

Next Week Plan:
- [specific action based on learnings]
```

### Monthly Channel Ranking

**Rank by**:
1. **Quality Active Users** (most important)
2. **Total Signups**
3. **Cost per Quality User** (time invested / QAU)
4. **Retention Rate**
5. **ROI** (results vs effort)

**Example Ranking** (Month 1):
```
1. Hacker News
   - 150 signups, 90 active (60% quality)
   - Best retention (50% week 4)
   - Most engaged users
   → Double down here

2. Product Hunt
   - 300 signups, 90 active (30% quality)
   - Good volume, medium quality
   - Decent retention (35% week 4)
   → Continue but don't over-invest

3. Reddit (r/philosophy)
   - 50 signups, 35 active (70% quality!)
   - Low volume, highest quality
   - Excellent retention (55% week 4)
   → Quality channel, post more

4. Reddit (r/SideProject)
   - 200 signups, 40 active (20% quality)
   - High volume, low quality
   - Poor retention (15% week 4)
   → Deprioritize, wrong audience

5. Twitter
   - 100 signups, 20 active (20% quality)
   - Awareness channel, not conversion
   - Poor retention (10% week 4)
   → Good for awareness, bad for acquisition
```

**Decision**: Focus on HN and r/philosophy for user acquisition. Use Twitter for awareness/updates only.

---

## Success Milestones & When to Celebrate

### Week 1 Milestones
- [ ] 100 signups
- [ ] 20 active users
- [ ] First "changed my mind" award
- [ ] Product Hunt front page
- [ ] Hacker News front page
- [ ] First quality debate (10+ exchanges)

### Week 2 Milestones
- [ ] 250 signups
- [ ] 50 active users
- [ ] 5 concurrent debates
- [ ] First user invites friend (organic)
- [ ] First unsolicited positive tweet

### Week 4 Milestones
- [ ] 500 signups
- [ ] 100 active users
- [ ] 20 concurrent debates
- [ ] Clear best channel identified
- [ ] 30%+ 7-day retention
- [ ] First power user emerged

### Month 2 Milestones
- [ ] 1,000 signups
- [ ] 200 active users
- [ ] Organic growth > paid/promoted
- [ ] First press mention
- [ ] Community self-moderating starting
- [ ] First "ARGUED helped me understand X" testimonial

### Month 3 Milestones (Product-Market Fit Signals)
- [ ] 2,000 signups
- [ ] 400 active users
- [ ] People seeking out the platform (search traffic)
- [ ] Users spending 30+ min per session
- [ ] 40%+ week 4 retention
- [ ] Active daily without your prompting
- [ ] Community culture clearly established

---

## What "Good" Looks Like: Detailed Benchmarks

### By Industry Standards (Social Platforms)

**Signup → Active Conversion**:
- Poor: < 20%
- Average: 20-30%
- Good: 30-40%
- Excellent: 40%+

**7-Day Retention**:
- Poor: < 20%
- Average: 20-30%
- Good: 30-40%
- Excellent: 40%+

**30-Day Retention**:
- Poor: < 10%
- Average: 10-20%
- Good: 20-30%
- Excellent: 30%+

**Session Time**:
- Poor: < 2 minutes
- Average: 2-5 minutes
- Good: 5-15 minutes
- Excellent: 15+ minutes

### Debate-Specific Metrics

**Debates per Active User per Week**:
- Minimum: 0.5 (participates every other week)
- Good: 1 (one debate per week)
- Great: 2+ (highly engaged)

**Average Debate Length**:
- Minimum: 3 exchanges (barely qualifies as debate)
- Good: 5-7 exchanges (substantive)
- Great: 10+ exchanges (deep engagement)

**"Changed My Mind" Rate**:
- Minimum: 5% (occasionally happens)
- Good: 10% (regular occurrence)
- Great: 20%+ (core feature working)

**Civil Discourse Rate**:
- Minimum: 80% (some toxicity)
- Good: 90% (mostly civil)
- Great: 95%+ (consistently excellent)

---

## Red Flags & When to Pivot

### Red Flags by Category

**Product Issues**:
- 🚩 Signups but zero activation (onboarding broken?)
- 🚩 Users trying once and never returning (no value delivered?)
- 🚩 Short session times (confused? bored?)
- 🚩 High churn after first week (novelty wore off?)

**Market Issues**:
- 🚩 Wrong audience signing up (not your target)
- 🚩 Consistent "I don't get it" feedback
- 🚩 Low engagement across all channels (no PMF?)
- 🚩 Users comparing to wrong category (positioning issue)

**Community Issues**:
- 🚩 Increasing toxicity
- 🚩 Echo chamber forming (one viewpoint dominating)
- 🚩 Power users leaving
- 🚩 New users not integrating

**Business Issues**:
- 🚩 Unsustainable burn rate (time/money)
- 🚩 Channels all performing poorly
- 🚩 No clear path to sustainability
- 🚩 Team burnout

### When to Pivot vs Persevere

**Pivot If**:
- Consistent negative feedback on core concept
- No engagement despite good traffic
- Wrong market entirely (enterprise not consumer, etc.)
- Fundamentally broken unit economics
- 3+ months with no traction improvement

**Persevere If**:
- Some channels working (even if others aren't)
- Core users deeply engaged (even if few)
- Positive trend lines (growing, even if slow)
- Product-market fit with small niche (can expand)
- Solvable problems (tech issues, UX issues, etc.)

### Pivot Signals Specific to ARGUED

**Consider Pivoting If**:
- People use it for shallow debates (Twitter-style), not deep discourse
- Lurkers dominate, few willing to debate publicly
- One ideology dominates, can't achieve balance
- Users want quick answers, not long debates
- Success comes from non-philosophical topics (wrong direction)

**Strong Signal to Pivot**:
- Beta users stop using it (people who said they wanted this don't actually use it)

---

## Tracking Tools & Setup

### Essential Tools

**Analytics**:
- **Google Analytics 4**: Traffic, conversions, cohorts
- **Mixpanel or Amplitude**: User behavior tracking (if budget allows)
- **Internal Analytics**: Track debate-specific metrics (custom)

**Channel Tracking**:
- **Product Hunt**: Native analytics
- **Twitter Analytics**: Built-in
- **Reddit**: Manual + Google Analytics
- **Hacker News**: Manual + Algolia API

**Dashboard**:
- **Google Sheets**: Master tracking spreadsheet
- **Data Studio**: Automated dashboard (connects to GA)
- **Notion**: Qualitative notes, insights

### Recommended Setup

**Week 0 (Before Launch)**:
```
✅ Google Analytics installed and tested
✅ UTM parameters documented and ready
✅ Tracking spreadsheet template created
✅ Event tracking set up (signup, first post, first debate, etc.)
✅ Dashboard created (even if empty)
✅ Daily check-in calendar reminder set
```

**Daily Tracking (Launch Week)**:
```
Morning:
- Check overnight signups
- Review new user activation rate
- Check retention (previous cohorts)

Afternoon:
- Update platform-specific metrics (PH rank, HN points, etc.)
- Log all posts made with links
- Review comments/feedback

Evening:
- Daily summary (what worked, what didn't)
- Tomorrow's plan
- Update master dashboard
```

**Weekly Review**:
```
Every Monday:
- Previous week cohort analysis
- Channel performance ranking
- Qualitative feedback summary
- Next week planning based on data
- Update stakeholders (if applicable)
```

---

## Attribution Challenges & Solutions

### Challenge: Multi-Touch Attribution

**Problem**: User might see Product Hunt → see Twitter post → come via Google search → sign up. Which channel gets credit?

**Solutions**:
1. **First Touch**: Product Hunt gets credit (started awareness)
2. **Last Touch**: Google gets credit (final click)
3. **Linear**: All three get equal credit
4. **Time Decay**: Google gets most, Product Hunt least

**Recommendation for ARGUED**:
- Use **Last Touch** for simplicity in early days
- Track **first touch** manually via signup survey: "How did you first hear about us?"

### Challenge: Delayed Conversion

**Problem**: User sees HN post Tuesday, signs up Friday via Google search. HN doesn't get credit.

**Solution**:
- Ask on signup: "How did you hear about ARGUED?"
- Multiple choice + "Other"
- Cross-reference with UTM data

### Challenge: Offline Word of Mouth

**Problem**: User hears from friend, signs up directly. No tracking.

**Solution**:
- Signup survey question: "How did you hear about us?"
- Option: "Friend or colleague (who?)"
- Track referrals explicitly
- This is GOOD NEWS (organic growth!)

---

## Qualitative Metrics (Often More Important Than Quantitative)

### User Feedback Categories

**Track These Themes**:
1. **Value Proposition**
   - Did they "get it"?
   - What did they think it was for?
   - Did it match expectation?

2. **First Impression**
   - Confusing or clear?
   - Exciting or meh?
   - Professional or amateurish?

3. **Feature Requests**
   - What do they want?
   - What's missing?
   - What's blocking them?

4. **Comparisons**
   - What do they compare you to?
   - Better or worse?
   - Different or similar?

5. **Emotional Response**
   - Excited?
   - Skeptical?
   - Hopeful?
   - Frustrated?

### Tracking Qualitative Feedback

**Use Tags**:
```
Feedback Database (Notion/Airtable):

Columns:
- Date
- Source (PH comment, email, survey, etc.)
- User
- Quote
- Tags (value-prop, feature-request, bug, praise, criticism)
- Sentiment (positive/neutral/negative)
- Actionable? (yes/no)
- Status (open/addressed/wontfix)
```

**Weekly Review**:
- What are the most common themes?
- What's surprising?
- What should we act on?
- What should we communicate better?

---

## The Metrics That Actually Matter (Honest Take)

### Early Days (Week 1-4): Focus on These

**1. Are people using it?**
- Active users (not just signups)
- Repeat visits
- Time spent

**2. Are they getting value?**
- Completing key actions (posting, debating)
- Positive feedback
- Coming back

**3. Are we learning?**
- Quality of feedback
- Understanding what works
- Identifying what doesn't

### Growth Phase (Month 2-3): Add These

**4. Is it spreading?**
- Organic signups
- Word of mouth
- User referrals

**5. Is it sustainable?**
- Retention curves flattening (not falling to zero)
- Community self-organizing
- Decreasing support burden

### Everything Else Is Noise (Early On)

**Don't Obsess Over** (yet):
- Total signups (vanity)
- Social media followers (vanity)
- Press coverage (nice but not essential)
- Product Hunt rank (one day, doesn't predict success)

**Why**:
- These don't predict whether product works
- Can be gamed or lucky
- Distract from real work (building great product)

---

## Success Story: What It Looks Like When It Works

### Month 1 Snapshot (Good Launch)
```
Signups: 1,200
Active Users: 250 (21% conversion)
Quality Active Users: 150 (13%)
Retention (Week 4): 35%

Top Channel: Hacker News (350 signups, 60% quality)
Surprise Channel: r/philosophy (50 signups, 80% quality)
Disappointing Channel: Twitter (200 signups, 5% quality)

Debates:
- Total: 45
- Average length: 7 exchanges
- "Changed mind" rate: 12%
- Topics: AI, free will, ethics, political philosophy

Community:
- 5 power users emerged
- Users inviting friends
- First moderators identified
- Culture of civil discourse forming

Feedback:
- "Finally, a place for actual discussions!"
- "Exactly what the internet needs"
- "Can you add [feature]?" (dozens of requests)

Challenges:
- Some confusion on UX
- Mobile experience lacking
- Moderation load increasing
- Need better onboarding
```

### What This Tells Us
✅ Product-market fit showing (high engagement from right users)
✅ Sustainable (good retention)
✅ Scalable (organic growth starting)
✅ Clear next steps (prioritized from feedback)

**Verdict**: Keep going, double down on what works

---

## Final Checklist: Metrics Setup

**Before Launch**:
- [ ] Google Analytics installed
- [ ] Event tracking configured
- [ ] UTM parameters ready
- [ ] Tracking spreadsheet created
- [ ] Signup survey ready ("How did you hear about us?")
- [ ] Dashboard set up
- [ ] Daily check-in reminder scheduled

**Week 1**:
- [ ] Daily metrics review
- [ ] All posts logged with UTMs
- [ ] Feedback tagged and categorized
- [ ] First cohort tracked (launch week signups)

**Week 2**:
- [ ] Weekly review completed
- [ ] Channel performance ranked
- [ ] Retention curves plotted
- [ ] Quality metrics analyzed
- [ ] Next week plan adjusted based on data

**Week 4**:
- [ ] Month 1 retrospective
- [ ] Full channel attribution analysis
- [ ] Cohort comparison (week 1 vs 2 vs 3 vs 4)
- [ ] Qualitative feedback synthesis
- [ ] Strategic decisions based on data

---

## The Most Important Metric of All

### Are You Building Something People Love?

**Signals of Love**:
- ✅ Users telling friends without prompting
- ✅ Passionate feedback (positive and negative)
- ✅ Users spending significant time
- ✅ Users contributing (not just consuming)
- ✅ Users defending it in other forums
- ✅ Users feeling ownership ("our community")

**If You Have This**:
- Numbers will follow
- Growth will come
- Success is likely

**If You Don't**:
- No amount of marketing fixes it
- Optimize metrics won't save you
- Go back to product/market fit

---

*Remember: Metrics are a map, not the territory. They guide you, but the real success is creating something that makes people's lives better. If people love ARGUED, the metrics will reflect that. If they don't, no metric optimization will help.*

**Start with love. Measure to guide. But never mistake the measurement for the meaning.**
