# Hacker News "Show HN" Posts

**Platform:** Hacker News
**Format:** Show HN posts
**Target Audience:** Technical builders, indie hackers, engineering-minded folks
**Tone:** Humble builder sharing work, technical details, seeking feedback

---

## Best Practices for HN

### DO:
- Lead with the technical problem you solved
- Explain your architecture and tech choices
- Be transparent about the early stage
- Engage deeply in comments (respond to technical questions)
- Share what you learned building it
- Ask for specific technical feedback

### DON'T:
- Use marketing language or hype
- Over-promise features
- Ignore criticism or be defensive
- Spam with multiple posts
- Forget to engage in comments

### Posting Strategy:
- **Best time:** Weekday mornings, 8-10 AM EST (when East Coast wakes up)
- **Alternative:** Sunday evening 6-9 PM EST (catches both coasts)
- **Avoid:** Friday afternoons, Saturday mornings
- **Preparation:** Have your dev environment ready to answer technical questions
- **Engagement window:** First 2 hours are critical—stay online

---

## POST VARIATION 1: Technical Problem Focus

### Title:
```
Show HN: ARGUED – Platform for AI-judged philosophical debates using Gemini 2.5
```

### Post Content:
```
Hey HN,

I built ARGUED to solve a problem I kept running into: having interesting philosophical discussions online always devolved into noise. Reddit threads get buried, Twitter optimizes for hot takes, and academic forums are ghost towns with terrible UX.

I wanted structured debates where arguments are judged on merit (logic, evidence, rhetoric) rather than popularity. So I built a platform where Gemini 2.5 Flash acts as an impartial judge, scoring arguments and providing detailed reasoning.

**The technical approach:**

- Next.js 15 (App Router) for the frontend
- Supabase for auth, database, and real-time subscriptions
- Gemini 2.5 Flash for AI judgment with custom prompting
- TypeScript throughout for type safety
- Deployed on Vercel

**The interesting technical challenges:**

1. **AI Judgment Consistency:** Getting Gemini to be fair and consistent across debates required careful prompt engineering. I score three dimensions (logic, evidence, rhetoric) separately and aggregate, which reduces bias.

2. **Fact-checking integration:** The AI identifies factual claims and flags them for verification. This was tricky because I needed to avoid false positives while catching genuine misinformation.

3. **Real-time debate updates:** Using Supabase subscriptions to show when opponents submit arguments, when AI is judging, etc. Had to handle edge cases around simultaneous submissions.

**Current stage:** Early beta with core features working. You can create debates, submit arguments, get AI judgment, and earn reputation points.

**What I'm looking for feedback on:**

- Is AI judgment fair enough? How would you improve the scoring?
- What other features would make philosophical discourse better?
- Tech stack thoughts? Any gotchas with this architecture at scale?

Try it out: [your-url-here]

Built this mostly solo over the past few months. Would love to hear what HN thinks—both on the concept and the technical execution.
```

**Technical Details to Emphasize in Comments:**
- Gemini 2.5 Flash costs (~$0.00001 per judgment, very scalable)
- Database schema design (normalized for debate rounds, judgments)
- How you're handling rate limiting for AI API
- Prompt engineering approach
- Future plans for caching judgments

---

## POST VARIATION 2: Builder Journey Focus

### Title:
```
Show HN: I built an AI-judged debate platform to escape Twitter philosophy arguments
```

### Post Content:
```
I got tired of philosophical discussions on Twitter and Reddit being determined by who has more followers or who posts first, so I built a platform where AI judges arguments based on actual reasoning quality.

**What it does:**

Two people debate a philosophical topic (e.g., "Is free will an illusion?"). Each submits one argument. Gemini 2.5 Flash judges both arguments on:

- Logic: Is the reasoning sound?
- Evidence: Are claims supported?
- Rhetoric: Is it clear and persuasive?

Winner gets reputation points. AI provides detailed feedback on both arguments.

**Why I built this:**

I'm a philosophy enthusiast who couldn't find a good middle ground between:
- Twitter (low quality, driven by virality)
- Academic journals (too formal, months of peer review)
- Debate.org-style platforms (too competitive, gameable)

I wanted something where you could have a serious but accessible philosophical discussion that's judged fairly.

**Tech stack:**

Built with Next.js 15, Supabase (PostgreSQL + Auth + Real-time), and Gemini 2.5 Flash for AI. TypeScript throughout. Took about 3 months of solo development.

**Interesting challenges:**

- Making AI judgment feel fair and explainable
- Preventing gaming of the reputation system
- UI for displaying complex arguments clearly
- Real-time updates during debate rounds

**What's working:**

The AI judgment is surprisingly good. It catches logical fallacies, asks for evidence when claims are unsupported, and can identify when rhetoric is strong but logic is weak.

**What needs work:**

- More debate formats (currently just one-round debates)
- Better discovery (finding interesting debates to join)
- Community features (following topics, debate series)

**Try it:** [your-url-here]

This is very much a v1. I'd love feedback from the HN community, especially on the AI judgment quality and what features would make this useful for you.

Tech questions welcome—happy to dive into implementation details.
```

**Engagement Strategy:**
- Respond to every technical question within 30 minutes
- Share code snippets when asked
- Be honest about limitations
- If someone suggests a feature, ask them to elaborate
- Link to GitHub if you open-source parts

---

## POST VARIATION 3: AI Fairness Angle

### Title:
```
Show HN: Using Gemini 2.5 to judge philosophical debates fairly
```

### Post Content:
```
I've been experimenting with using LLMs as impartial judges for philosophical debates, and I'm surprised by how well it works.

**The problem:**

Online philosophical discussions are typically judged by:
- Upvotes (popularity contest)
- Moderation (subjective)
- Nothing (just endless arguing)

None of these reward quality reasoning.

**My approach:**

Built a debate platform where Gemini 2.5 Flash judges arguments across three dimensions:

1. **Logic:** Sound reasoning, valid inferences, avoiding fallacies
2. **Evidence:** Supporting claims with relevant examples/data
3. **Rhetoric:** Clarity, structure, persuasiveness

Each argument gets scored 0-10 on each dimension, with detailed written feedback explaining the scores.

**The interesting part:**

I was skeptical AI could judge philosophical arguments fairly, but after ~50 test debates, it's performing better than expected:

- Catches common fallacies (ad hominem, strawman, false dichotomy)
- Identifies unsupported claims and asks for evidence
- Rewards clear structure and logical flow
- Provides substantive feedback, not just scores

**Technical implementation:**

- Next.js 15 app with Supabase backend
- Carefully engineered prompts with scoring rubrics
- Temperature set to 0.3 for consistency
- Three separate API calls (one per dimension) then aggregate
- Cost: ~$0.00001 per judgment

**What I'm testing:**

- Consistency: Does the same argument get similar scores across multiple judgments?
- Bias detection: Does it favor certain philosophical positions?
- Explainability: Can users understand why they got their scores?

**Results so far:**

- Consistency is good (within 1-2 points on re-judgment)
- No obvious bias toward specific positions
- Feedback is detailed enough to be useful

**Try it:** [your-url-here]

I'm curious what HN thinks:
- Is this a valid use case for LLMs?
- How would you improve the judging algorithm?
- What would make you trust an AI judge?

Early beta, built solo, feedback very welcome.
```

**Technical Discussion Points:**
- Share your prompt engineering approach
- Discuss temperature settings and why
- Explain how you prevent prompt injection
- Talk about scaling costs
- Mention plans for human review/appeals

---

## COMMENT ENGAGEMENT PLAYBOOK

### When someone asks about fairness:
```
Great question. Fairness is the hardest part. My approach:

1. Three separate judgments (logic, evidence, rhetoric) to reduce single-point bias
2. Temperature 0.3 for consistency
3. Detailed written feedback so users can see the reasoning
4. Planning to add appeals where humans review controversial judgments

I've tested ~50 debates and consistency is within 1-2 points on re-judgment. But I'm actively working on improving this—any suggestions?
```

### When someone asks about tech stack:
```
Tech stack:
- Next.js 15 (App Router)
- Supabase (PostgreSQL + Auth + Real-time)
- Gemini 2.5 Flash (via Google AI SDK)
- TypeScript, Tailwind CSS
- Deployed on Vercel

Total cost so far: ~$20/month (Supabase free tier + Gemini API usage is pennies).

Happy to share implementation details on any part of this.
```

### When someone criticizes AI judgment:
```
Totally valid concern. I was skeptical too.

My approach has been to be very transparent—every judgment includes detailed written reasoning, so users can see *why* they got their scores. If the AI is wrong, it should be obviously wrong.

I'm also planning appeals and human review for edge cases.

What would make you more comfortable with AI judgment? Curious to hear ideas.
```

### When someone asks about gaming the system:
```
Gaming is definitely a concern. Current protections:

1. AI looks for common tactics (keyword stuffing, filibustering)
2. Arguments are evaluated independently (you don't know your opponent's argument)
3. Rep system has diminishing returns
4. Planning to add human spot-checks

I'd love to hear about attack vectors I haven't considered. What would you try?
```

### When someone suggests a feature:
```
This is a great idea. Can you elaborate on how you'd use this?

I'm trying to figure out what features make philosophical discourse better vs. just adding complexity. Your use case would really help.
```

### When someone asks "why not just use Reddit?":
```
Reddit has great philosophy communities, but it's optimized for popularity (upvotes), not reasoning quality. The best argument can get buried if it's posted late or doesn't sound good in the first sentence.

I wanted a space where a well-reasoned but unpopular position can be fairly evaluated. Different tool for different use cases.
```

### When someone mentions competitors:
```
Yeah, [competitor] is great for [their strength]. What I'm trying to do differently is [your differentiation].

I see this more as complementary than competitive—there's room for different approaches to online discourse.
```

---

## POST-MORTEM TRACKING

Track these metrics after posting:

### Engagement Metrics:
- Points (aim for 50+ to reach front page)
- Comments (engage with all in first 2 hours)
- Time on front page
- Click-through rate to your app

### Qualitative Feedback:
- Technical concerns raised
- Feature requests mentioned
- Criticism patterns
- What resonated

### Follow-up Actions:
- Respond to all technical questions within 24 hours
- If a feature is requested 3+ times, consider it seriously
- If criticism is valid, acknowledge publicly and fix
- Follow up in a week with "I heard your feedback and built X"

---

## FOLLOW-UP POST STRATEGY

If your first Show HN goes well, you can post updates:

**4-6 weeks later:**
```
Show HN: ARGUED Update – Added [major feature] based on your feedback
```

**3 months later:**
```
Show HN: What I learned building an AI-judged debate platform (lessons)
```

**6 months later:**
```
Show HN: ARGUED is now open-source – here's what we learned
```

---

## RED FLAGS TO AVOID

Don't do these things:
- ❌ Post multiple times in the same week
- ❌ Delete and repost if it doesn't get traction
- ❌ Ask friends to upvote
- ❌ Be defensive in comments
- ❌ Ignore criticism
- ❌ Make the title too salesy
- ❌ Post and disappear (must engage in comments)
- ❌ Edit your post after people start commenting

---

## SUCCESS CRITERIA

A successful HN post:
- ✅ 50+ points (reaches front page)
- ✅ 30+ comments with substantive discussion
- ✅ You engage with every commenter
- ✅ Get 3+ feature ideas you hadn't considered
- ✅ Make connections with other builders
- ✅ Traffic spike to your app
- ✅ A few users actually try it and return

---

## FINAL CHECKLIST BEFORE POSTING

- [ ] App is actually usable (not just a landing page)
- [ ] You can stay online for 2-3 hours to engage
- [ ] You've tested the app with 5+ people
- [ ] You have screenshots/demo ready
- [ ] Your server can handle traffic
- [ ] You're prepared for technical questions
- [ ] You've read HN guidelines
- [ ] You're posting at optimal time
- [ ] You're mentally prepared for criticism
- [ ] You have analytics set up to track traffic

---

**Remember:** HN values substance over hype, technical depth over marketing, and genuine builders over promoters. Be yourself, be humble, be engaged.
