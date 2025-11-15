# Terminology Guidelines: New Language Framework

**Purpose:** Establish consistent language to support collaborative conversation positioning
**Audience:** Developers, product managers, content writers, designers
**Implementation:** Use when writing new features, updating documentation, or refactoring code

---

## FOUNDATIONAL PRINCIPLE

**Old Frame (Competitive):**
- Winning and losing
- Opponents in conflict
- Judges determining winners
- Debates as combat

**New Frame (Collaborative):**
- Quality contributions
- Conversation partners
- Facilitated evaluation
- Discussions as exploration

The shift is fundamental: from **adversarial evaluation** to **collaborative learning**.

---

## TERMINOLOGY MAPPING & GUIDELINES

### CATEGORY 1: CORE ACTIVITIES

#### OLD: "Debate" / "Debating"
#### NEW: "Discussion" / "Conversation" / "Forum Topic"

**When to use which:**
- **Discussion** - Formal, structured conversations (most common)
- **Conversation** - Casual, natural dialogue
- **Forum Topic** - Community-oriented, broader context
- **Thread** - Asynchronous conversation with history

**Examples:**
```
OLD: "Active Debates"
NEW: "Active Discussions"

OLD: "Create a Debate"
NEW: "Start a Discussion"

OLD: "Debate Topics"
NEW: "Discussion Topics"

OLD: "Join the debate"
NEW: "Join the conversation"

OLD: "Debating philosophy"
NEW: "Discussing ideas" or "Exploring philosophical questions"
```

**Code:**
```
// OLD
const debates = await db.from('debates').select()

// NEW
const discussions = await db.from('discussions').select()

// OLD
<Link href="/debates/123">View Debate</Link>

// NEW
<Link href="/discussions/123">View Discussion</Link>
```

**Database:**
```
-- OLD
CREATE TABLE debates (...)

-- NEW (migration needed)
CREATE TABLE discussions (...)
```

---

#### OLD: "Argument"
#### NEW: "Contribution" / "Perspective" / "Response"

**When to use which:**
- **Contribution** - Any input to a discussion (most neutral)
- **Perspective** - Viewpoint or opinion
- **Response** - Reply to another contribution
- **Insight** - Particularly valuable or novel contribution

**Examples:**
```
OLD: "Submit your argument"
NEW: "Share your perspective"

OLD: "Read this argument carefully"
NEW: "Consider this viewpoint"

OLD: "Strong arguments on both sides"
NEW: "Thoughtful perspectives from both participants"

OLD: "Arguments table"
NEW: "Contributions table" or "Perspectives table"

OLD: "View all arguments in this debate"
NEW: "See all contributions to this discussion"
```

**Code:**
```
// OLD
const arguments = await db.from('arguments').select()

// NEW
const contributions = await db.from('contributions').select()

// OLD
<div className="argument-card">
  <h3>{argument.content}</h3>
</div>

// NEW
<div className="contribution-card">
  <h3>{contribution.insight}</h3>
</div>
```

---

#### OLD: "Position" (for/against)
#### NEW: "Contribution Type" or "Perspective Type"

**When to use which:**
- **Contribution Type** - Technical database term
- **Perspective Type** - User-facing description
- **Viewpoint** - Generic term

**If using sequential model:**
- **Opening** - First contribution
- **Response** - Direct reply
- **Reflection** - Meta-commentary
- **Synthesis** - Bringing together themes

**Examples:**
```
OLD: "What's your position on this?"
NEW: "What's your perspective on this?"

OLD: "Position: For"
NEW: "Taking the position..." → "I believe..."

OLD: database column: position ENUM ('for', 'against')
NEW: database column: contribution_type ENUM ('opening', 'response', 'reflection')
```

---

### CATEGORY 2: EVALUATION & JUDGMENT

#### OLD: "Judge" / "Judging" / "Judgment"
#### NEW: "Evaluate" / "Assessment" / "Evaluation"

**When to use which:**
- **Evaluate** - Verb form (what the AI does)
- **Assessment** - The process
- **Evaluation** - The result
- **Analysis** - Breaking down for understanding

**Never use "judge" because it implies:**
- Legal authority
- Finality (judgments are rarely overturned)
- Binary right/wrong (not thinking/learning)

**Examples:**
```
OLD: "The judge determines the winner"
NEW: "The system evaluates the contributions"

OLD: "AI Judgment System"
NEW: "AI Evaluation Engine"

OLD: API endpoint: /api/judge
NEW: API endpoint: /api/evaluate or /api/assess

OLD: "Submit your debate for judgment"
NEW: "Submit your discussion for evaluation"

OLD: "Judgment scores"
NEW: "Evaluation scores" or "Quality assessment"

OLD: judgments table
NEW: evaluations table
```

---

#### OLD: "Winner" / "Winning" / "Defeated"
#### NEW: Remove concept, or reframe as "Quality" / "Strength" / "Effectiveness"

**This is critical:** Remove winner/loser framing entirely.

**Examples:**
```
OLD: "Congratulations! You won the debate!"
NEW: "Your thinking was evaluated highly"

OLD: "You lost this debate"
NEW: "Here's how your thinking could evolve"

OLD: "Victory" or "Defeat"
NEW: "Effective contribution" or "Learning opportunity"

OLD: "Winning strategy"
NEW: "Effective approach"

OLD: "You've won 47 debates"
NEW: "You've contributed to 47 discussions"

OLD: Database column: winner_id
NEW: Remove entirely, or rename to: featured_contributor_id
     (but don't track based on "winning")
```

---

#### OLD: "Score" (if used as win/loss indicator)
#### NEW: "Rating" / "Quality Metrics" / "Assessment Breakdown"

**Examples:**
```
OLD: "Debate Score: 8.5 (You Won)"
NEW: "Quality Assessment:
      • Logical Rigor: 8.5/10
      • Evidence Quality: 9.0/10
      • Clarity: 8.2/10
      • Relevance: 8.8/10"

OLD: Scoring = winner determination
NEW: Scoring = multi-dimensional quality assessment
```

---

### CATEGORY 3: PARTICIPANT RELATIONSHIPS

#### OLD: "Opponent" / "Opposition"
#### NEW: "Conversation Partner" / "Participant" / "Contributor"

**When to use which:**
- **Conversation Partner** - Emphasizes collaboration
- **Participant** - Neutral, inclusive
- **Contributor** - Emphasizes value added
- **Other User** - Generic fallback

**Examples:**
```
OLD: "Debate your opponent"
NEW: "Engage with your conversation partner"

OLD: "Opponent's argument"
NEW: "Your partner's perspective"

OLD: "Opponent analysis" (premium feature)
NEW: "Participant profile" or "Conversation partner insights"

OLD: "Weak opponent"
NEW: "Conversation partner at a different level"

OLD: Database: for_participant, against_participant
NEW: participant_1, participant_2 (or: primary_contributor, respondent)
```

---

#### OLD: "Compete" / "Competitive"
#### NEW: "Engage" / "Participate" / "Contribute"

**Examples:**
```
OLD: "Compete with philosophers worldwide"
NEW: "Engage with philosophers worldwide"

OLD: "Competitive rating system"
NEW: "Skill assessment system"

OLD: "Competition brings out the best"
NEW: "Engaging thoughtfully with others brings out the best"
```

---

### CATEGORY 4: RANKINGS & REPUTATION

#### OLD: "DeLO" (Debate Elo)
#### NEW: "Insight Score" / "Dialogue Rating" / "Contribution Score"

**Recommendation: "Insight Score"**

Because it:
- Emphasizes learning and understanding
- Removes "debate" reference
- More aspirational than "skill rating"

**Examples:**
```
OLD: "Your DeLO rating: 1,450"
NEW: "Your Insight Score: 1,450"

OLD: "DeLO Leaderboard"
NEW: "Insight Score Leaderboard"

OLD: Database column: delo_rating
NEW: Database column: insight_score (or alias: delo_rating AS insight_score)

OLD: "Highest DeLO philosophers"
NEW: "Top Contributors by Insight Score"
```

---

#### OLD: "Win Rate" / "Wins/Losses"
#### NEW: "Contribution Rate" / "Participation Rate"

**Examples:**
```
OLD: "68% win rate"
NEW: "Contributor to 68 discussions"

OLD: "47 wins, 15 losses"
NEW: "Contributed to 47 discussions"
     (remove loss count entirely)

OLD: Database column: debates_won
NEW: Database column: discussions_participated

OLD: "Undefeated Champion"
NEW: "Consistent Contributor" or "Thoughtful Participant"
```

---

#### OLD: "Leaderboard" (if competitive framing)
#### NEW: "Leaderboard" (if community framing)

**Leaderboard is OK, but change what it measures:**

```
OLD: Leaderboard ranks by wins/losses
NEW: Leaderboard ranks by:
  1. Insight Score (primary)
  2. Discussions Participated
  3. Average Quality Rating
  4. Badges Earned (community contributions)

OLD: #1 - Alice Smith (50 wins, 5 losses)
NEW: #1 - Alice Smith (Insight Score: 2,100, 127 discussions)
```

---

### CATEGORY 5: ACHIEVEMENTS & BADGES

#### Rename achievement language:

```
OLD → NEW

"Undefeated" → "Consistent Contributor"
"20-Win Streak" → "20 Consecutive Discussions"
"Debate Champion" → "Insight Leader"
"Victory Specialist" → "Quality Contributor"
"Arguing Master" → "Thoughtful Discussant"
"First Win" → "First Contribution"
"Ruthless Debater" → "Engaged Discussant"
"Tournament Champion" → "Community Leader"
```

---

### CATEGORY 6: USER-FACING MESSAGES

#### After Evaluation (Instead of "You Won/Lost")

```
EXAMPLE PROGRESSION:

After evaluation, instead of "You won!", say:

1. STRENGTHS FOCUS:
   "Your logical reasoning was compelling"
   "You provided strong evidence"
   "Your clarity was excellent"

2. GROWTH FOCUS:
   "Here's where your thinking could evolve"
   "Consider exploring this counterpoint"
   "Your partner brought up an interesting angle"

3. LEARNING FOCUS:
   "Both perspectives offer value"
   "Here's what each side did well"
   "This discussion surfaced important nuances"

4. COMPARATIVE (if you must compare):
   "Your thinking aligned more with this criteria:
    - Logic: 8.5 vs 7.2
    - Evidence: 9.0 vs 7.8
    ...but your partner excelled at:
    - Openness: 9.2 vs 8.1"
```

---

#### Achievement Announcements

```
OLD: "Achievement Unlocked: 10-Win Streak!"
NEW: "Milestone Reached: 10 Consecutive Quality Discussions!"

OLD: "Congrats! You're now a Champion!"
NEW: "Congrats! You're now recognized as a Thoughtful Contributor!"

OLD: "You dominated your opponent!"
NEW: "You engaged thoughtfully with your partner!"
```

---

#### Invitation/Matching Messages

```
OLD: "You've been matched with an opponent"
NEW: "You're connected with a conversation partner"

OLD: "Prepare to battle"
NEW: "Prepare for thoughtful exchange"

OLD: "Defeat your rival"
NEW: "Engage with your partner"
```

---

### CATEGORY 7: FEATURE DESCRIPTIONS

#### Premium Features

```
OLD: "Advanced opponent analysis"
NEW: "Participant insights tool"

OLD: "Faster battle matching"
NEW: "Faster conversation connection"

OLD: "Dominate the leaderboard"
NEW: "Rise in community respect"
```

#### Community Features

```
OLD: "Steel-man your opponent's arguments"
NEW: "Strengthen your partner's perspective"

OLD: "Defeat their logic"
NEW: "Address their thinking thoughtfully"

OLD: "Outrank everyone"
NEW: "Become a recognized contributor"
```

---

## DOMAIN-SPECIFIC PHILOSOPHY TERMINOLOGY

When you have choices, prefer philosophical language:

```
Instead of competitive terms, use philosophical ones:

COMPETITION → INQUIRY
- "Compete" → "Inquire into"
- "Win" → "Arrive at truth"
- "Opponent" → "Interlocutor"
- "Debate" → "Dialogue"

KNOWLEDGE BUILDING:
- "I learned" not "I won"
- "We discovered" not "We fought"
- "Understanding deepened" not "Victory achieved"

SOCRATIC METHOD:
- "Question together" not "Battle"
- "Explore ideas" not "Attack arguments"
- "Refine thinking" not "Prove right"

ENGAGEMENT:
- "Engaged dialogue" not "Debate"
- "Thoughtful exchange" not "Competition"
- "Philosophical inquiry" not "Debate tournament"
```

---

## WRITING GUIDELINES

### Tone & Voice

**DO:**
- Use collaborative language
- Emphasize learning and growth
- Respect participant expertise
- Focus on insight and understanding
- Encourage intellectual humility

**DON'T:**
- Use war/combat metaphors
- Emphasize winning/losing
- Make participants feel judged
- Focus on defeating others
- Suggest intellectual dominance

### Example Rewrites

```
COMPETITIVE VERSION:
"PhiloDuel is where intellectuals battle for supremacy. 
Submit your arguments, crush your opponents, and dominate 
the leaderboard. Become a debate champion."

COLLABORATIVE VERSION:
"ARGUED is where intellectuals explore ideas together. 
Share your perspectives, engage with thoughtful partners, 
and become recognized for your contributions to meaningful 
philosophical discourse."

---

COMPETITIVE VERSION:
"Join the debate. Prove you're right. Win ratings points."

COLLABORATIVE VERSION:
"Join the conversation. Explore difficult ideas together. 
Grow your insight score through thoughtful contributions."

---

COMPETITIVE VERSION:
"Destroy weak arguments. Defeat your opponent. Rise in rank."

COLLABORATIVE VERSION:
"Strengthen opposing views through steel-manning. Learn from 
your partners. Rise as a recognized community contributor."
```

---

## STYLE GUIDE CHECKLIST

When writing new content, features, or documentation:

- [ ] No "win/lose" language
- [ ] No "defeat/victory" framing
- [ ] No "opponent" references
- [ ] No "judge/judgment" authority language
- [ ] No "battle/fight/combat" metaphors
- [ ] No "dominate/domination" language
- [ ] Use "discussion/conversation" not "debate"
- [ ] Use "contribution/perspective" not "argument"
- [ ] Use "evaluate/assess" not "judge"
- [ ] Use "conversation partner/participant" not "opponent"
- [ ] Emphasize learning and growth
- [ ] Emphasize collaboration and exploration
- [ ] Reference philosophical inquiry when relevant
- [ ] Use rating/quality metrics, not win/loss records

---

## EXCEPTIONS & EDGE CASES

**When it's OK to use old terminology:**

1. **Legacy documentation** - Mark as "old" and plan migration
2. **Technical code comments** - If essential, but prefer new terms
3. **Database migrations** - Include comment explaining change
4. **Research/analysis documents** - Can analyze competitive platforms
5. **Historical context** - When describing the old "ARGUED" positioning

**Avoid:**

- Mixing new and old terminology in same document
- Using competitive terms in any user-facing copy
- Explaining why you changed (confusing to users)

---

## IMPLEMENTATION CHECKLIST

For teams implementing this terminology:

### Phase 1: Brand & Awareness
- [ ] Update style guide
- [ ] Train team on new terminology
- [ ] Create terminology reference document (this file)
- [ ] Update design system language

### Phase 2: High-Visibility Areas
- [ ] Landing page copy
- [ ] Onboarding flows
- [ ] Feature descriptions
- [ ] Premium marketing copy

### Phase 3: Core UI
- [ ] Button labels
- [ ] Page headings
- [ ] Navigation labels
- [ ] Empty state messages

### Phase 4: Feedback & Messages
- [ ] Evaluation results messaging
- [ ] Achievement announcements
- [ ] Notification copy
- [ ] Error messages

### Phase 5: Documentation
- [ ] Help documentation
- [ ] Tutorials
- [ ] FAQs
- [ ] Community guidelines

### Phase 6: Code & Backend
- [ ] Code comments and strings
- [ ] Database field names (when feasible)
- [ ] API response messages
- [ ] Logging and analytics

---

## VOICE & TONE EXAMPLES

### WELCOMING, NOT COMPETITIVE
```
❌ "Prove your intellectual dominance"
✅ "Develop your philosophical expertise"

❌ "Outwit your opponents"
✅ "Engage thoughtfully with diverse perspectives"

❌ "Conquer the leaderboard"
✅ "Become a respected community voice"
```

### GROWTH-FOCUSED, NOT RANK-FOCUSED
```
❌ "Climb from Bronze to Gold Tier"
✅ "Deepen your insight score as you grow"

❌ "Beat 95% of users"
✅ "Contribute at the level of skilled philosophers"

❌ "Achieve Champion status"
✅ "Develop mastery through consistent engagement"
```

### EXPLORATORY, NOT ADVERSARIAL
```
❌ "Attack their flawed logic"
✅ "Explore alternative perspectives"

❌ "Defend your position at all costs"
✅ "Refine your thinking through dialogue"

❌ "Win the intellectual battle"
✅ "Discover deeper understanding"
```

---

## RESOURCES FOR TEAMS

**Keep handy:**
1. This terminology guide (terminology-guidelines.md)
2. Find & replace map (find-and-replace-map.md)
3. Branding audit (branding-terminology-audit.md)
4. Old vs new comparison chart (below)

**Comparison Quick Reference:**

| OLD TERM | NEW TERM | CONTEXT |
|----------|----------|---------|
| Debate/Debating | Discussion/Conversation | Activity |
| Argument | Contribution/Perspective | Content |
| Judge/Judging | Evaluate/Assessment | Process |
| Winner/Won | N/A (remove) | Result |
| Opponent | Participant/Partner | Relationship |
| DeLO | Insight Score | Metric |
| Position (for/against) | Contribution Type | Structure |
| Champion | Recognized Contributor | Status |
| Victory/Defeat | Quality Evaluation | Outcome |
| Compete | Engage/Participate | Action |
| Dominate | Contribute | Agency |
| Leaderboard | Leaderboard | Keep name, change metrics |

---

## FEEDBACK & ITERATION

This guide will evolve. As you use it:

1. **Document gaps** - Terms not covered?
2. **Track inconsistencies** - Where do users get confused?
3. **Gather feedback** - What resonates?
4. **Iterate quarterly** - Update guide based on real usage
5. **Share learnings** - Document what works/doesn't

**Questions to ask:**
- Do users understand collaborative intent?
- Do new terms feel natural or forced?
- Are there other competitive references we missed?
- What terminology emerges naturally from users?

---

## CONCLUSION

This terminology shift is foundational to repositioning your platform from competitive debates to collaborative conversations. Every word matters in shaping how users perceive the experience.

**Three guiding principles:**
1. **Replace competition with collaboration**
2. **Emphasize learning and growth**
3. **Use precise language that reflects values**

Use this guide consistently. The rebrand succeeds not through grand gestures but through sustained, careful language choices.

