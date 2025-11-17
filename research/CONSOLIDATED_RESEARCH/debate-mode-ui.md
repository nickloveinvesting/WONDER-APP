# Debate Mode UI

## Executive Summary

Debate mode is an **optional competitive feature** that transforms collaborative philosophical conversation into structured argumentation with opposing positions. This research examines Kialo, traditional debate platforms, and argument mapping tools to design a debate interface that signals competitive framing while maintaining philosophical rigor and good faith engagement.

**Key Recommendations:**
- **Opt-in activation:** Debates are explicitly chosen, never default
- **Pro/con visualization:** Kialo-style argument trees show claim hierarchy
- **Position assignment:** Clear sides (affirmative/negative or multi-position)
- **Structured rounds:** Turn-based argumentation with optional time limits
- **Argument mapping:** Visual connections between claims, rebuttals, evidence
- **Audience/judge roles:** Observers can vote or evaluate arguments
- **Resolution tracking:** Track if minds changed or positions evolved
- **Exit to conversation:** Easy transition back to collaborative mode

**Critical Insight:** Debate mode should feel like a structured game with clear rules, distinct from the platform's default collaborative ethos. Users must consciously choose competition.

---

## Feature Overview

**Purpose:** Enable structured competitive argumentation where participants defend opposing positions, aiming to persuade audience/judges or test arguments rigorously.

**User Value:**
- **For Debaters:** Practice argumentation skills, test position strength, competitive engagement
- **For Audience:** Learn from structured opposing viewpoints, vote on arguments
- **For Judges:** Evaluate argument quality, provide constructive feedback
- **For Topic Exploration:** See comprehensive pro/con analysis of philosophical questions

**Unique Requirements:**
- Clear visual distinction from collaborative conversation
- Structured turn-taking with optional time constraints
- Argument hierarchy visualization (claim → support → rebuttal)
- Fair rules enforcement without feeling restrictive
- Competitive scoring/judgment without toxicity
- Ability to "change sides" or acknowledge good arguments
- Gradual escalation: simple debates → complex multi-position tournaments

**When Debate Mode Is Appropriate:**
- ✅ Well-defined propositions with clear sides
- ✅ Users want to test argument strength competitively
- ✅ Educational context (practice argumentation)
- ✅ Exploring controversial topics with structured rules
- ✅ Users explicitly choose competitive engagement

**When Debate Mode Is NOT Appropriate:**
- ❌ Open-ended philosophical exploration
- ❌ Collaborative truth-seeking
- ❌ Nuanced positions without clear sides
- ❌ When users want conversation, not competition
- ❌ Default mode for any discussion

---

## Platform Analysis

### Kialo (Argument Mapping & Debate)
**Similar Feature:** Structured debate with pro/con argument trees

**What Works Well:**
- **Visual argument hierarchy:** Central thesis with branching pro/con claims
- **Color coding:** Green for pro arguments, red for con—instant visual understanding
- **Nested structure:** Each claim has its own pro/con sub-arguments
- **Claim voting:** Users vote arguments up/down based on quality
- **Collaborative:** Anyone can add arguments to either side
- **Impact scores:** Shows argument strength based on community voting
- **Claim linking:** Reference other claims, avoid repetition
- **Comprehensive coverage:** Builds complete map of all positions

**What Doesn't Work:**
- **Not truly competitive:** No formal sides or winners
- **Can become overwhelming:** Thousands of arguments hard to navigate
- **No time constraints:** Debates never "end"
- **Limited moderation:** Quality varies widely
- **No judge system:** Just community votes
- **Lacks turn structure:** Not traditional debate format
- **Difficult to follow:** Tree structure can be confusing for newcomers

**Key Takeaways:**
- Argument tree visualization is powerful for seeing full landscape
- Color coding (green/red) makes positions instantly clear
- Nested pro/con structure shows argument depth
- Voting on argument quality separates good from weak claims
- Need balance between comprehensive coverage and focused debate
- Pure collaboration lacks competitive structure some users want

### Argunet (Open-Source Argument Mapping)
**Similar Feature:** Argument visualization for complex debates

**What Works Well:**
- **Formal logic structure:** Premises, conclusions, inferences clearly marked
- **Export capabilities:** Generate PDFs, images of argument maps
- **Educational focus:** Used in philosophy seminars for teaching
- **Reconstruction:** Can map existing debates/texts
- **Live event moderation:** Used for real-time debate visualization

**What Doesn't Work:**
- **High learning curve:** Requires understanding formal logic
- **Not user-friendly:** Interface designed for experts
- **No competitive features:** Pure analysis, not debate platform
- **Desktop-only:** Not accessible on mobile
- **Limited collaboration:** Difficult for multiple users simultaneously

**Key Takeaways:**
- Formal logical structure can enhance argument quality
- Visual mapping helps identify fallacies and gaps
- Educational applications are valuable
- Need simpler version for casual users

### Argdown (Argument Syntax & Visualization)
**Similar Feature:** Markdown-like syntax for argument mapping

**What Works Well:**
- **Simple syntax:** Easy to write arguments as text, auto-generate map
- **Real-time visualization:** See argument structure as you type
- **Export options:** PDF, image, web embeds
- **Supports relations:** Attack, support, entailment clearly shown
- **Lightweight:** Text-based, easy to learn

**What Doesn't Work:**
- **Syntax barrier:** Still requires learning special notation
- **No debate features:** Just argument representation
- **Limited interactivity:** More documentation than discussion platform
- **No competitive elements:** Analysis tool, not debate tool

**Key Takeaways:**
- Text-based argument input is faster than visual editors
- Auto-generation of maps from structured text is powerful
- Need both simple input and rich visualization

### Traditional Debate Platforms (DebateGraph, IDebate)
**Similar Feature:** Structured competitive debates

**What Works Well:**
- **Clear sides:** Affirmative vs negative, pro vs con
- **Round structure:** Opening statements, rebuttals, cross-examination, closing
- **Time limits:** Enforces conciseness and fairness
- **Judge scoring:** Rubrics for argument quality, evidence, delivery
- **Winner declaration:** Clear outcomes
- **Tournament formats:** Multiple debates, advancement

**What Doesn't Work:**
- **Rigid formats:** Traditional academic debate rules feel constraining
- **Intimidating:** Requires debate experience/training
- **Limited visualization:** Text-based arguments, no mapping
- **Winner-takes-all:** Discourages nuance and mind-changing
- **Performance focus:** Rewards rhetoric over reasoning
- **Gatekeeping:** Formal debate culture can be exclusionary

**Key Takeaways:**
- Structure and rules create fairness
- Time limits maintain engagement and prevent endless arguments
- Judging needs clear criteria
- Too much rigidity alienates casual participants
- Need balance between structure and accessibility

---

## Design Patterns

### Pattern 1: Activating Debate Mode

**Description:** Explicit choice to transform conversation into debate, with clear signaling of mode change.

**User Flow:**
1. From existing conversation thread, any participant can suggest "Move to Debate Mode"
2. Proposition is clearly defined (e.g., "Resolved: Free will exists")
3. Participants choose sides (affirmative/negative) or decline
4. Rules are set: rounds, time limits, judging method
5. All participants confirm understanding of debate format
6. Visual UI shifts to debate mode (distinct styling)
7. Debate begins with structured rounds

**Visual Design:**
```
Transition from Conversation to Debate:

┌────────────────────────────────────────────────────────┐
│  Thread: "Do We Have Free Will?"              🗨️ 47    │
│  ─────────────────────────────────────────────────     │
│  [Ongoing conversation about free will...]             │
│                                                         │
│  ┌─────────────────────────────────────────────┐      │
│  │ 💡 Sarah suggested:                          │      │
│  │                                              │      │
│  │ "This seems like a good topic for a         │      │
│  │  structured debate. Want to try Debate Mode?"│      │
│  │                                              │      │
│  │ [Maybe Later] [Set Up Debate]               │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
└────────────────────────────────────────────────────────┘

Debate Setup Screen:

┌────────────────────────────────────────────────────────┐
│  ⚔️ Create Debate                               [✕]    │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Proposition (clearly worded):                          │
│  ┌────────────────────────────────────────────────┐   │
│  │ Resolved: Humans possess free will.            │   │
│  └────────────────────────────────────────────────┘   │
│                                                         │
│  Debate Format:                                         │
│  (•) Two-sided (Affirmative vs Negative)               │
│  ( ) Multi-position (3+ distinct views)                │
│                                                         │
│  Assign Sides:                                          │
│  ┌────────────────────────────────────────────────┐   │
│  │ Affirmative (arguing FOR proposition):         │   │
│  │ • [S] Sarah Chen                               │   │
│  │ • [M] Marcus Williams                          │   │
│  │                                              │   │
│  │ Negative (arguing AGAINST proposition):        │   │
│  │ • [J] James Rodriguez                          │   │
│  │ • [E] Emma Thompson                            │   │
│  └────────────────────────────────────────────────┘   │
│                                                         │
│  Structure:                                             │
│  ☑ Opening statements (5 min each side)                │
│  ☑ Rebuttals (3 min each side)                         │
│  ☑ Cross-examination (2 min each side)                 │
│  ☑ Closing statements (3 min each side)                │
│  ☐ Include audience Q&A                                │
│                                                         │
│  Time Limits:                                           │
│  ( ) No time limits (async, thoughtful)                │
│  (•) Moderate (24 hours per round)                     │
│  ( ) Fast (2 hours per round)                          │
│  ( ) Live debate (real-time with countdown)            │
│                                                         │
│  Judging:                                               │
│  ( ) Audience vote (all members can vote)              │
│  (•) Designated judges (select 3-5 judges)             │
│  ( ) No winner (exploratory debate)                    │
│                                                         │
│  ℹ️ Debate mode changes how conversation works:        │
│  • Competitive, not collaborative                      │
│  • Structured turns and time limits                    │
│  • Arguments are scored/judged                         │
│  • Winning is the goal                                 │
│                                                         │
│  Everyone must agree to debate format before starting. │
│                                                         │
│  [Cancel]                              [Start Debate]  │
└────────────────────────────────────────────────────────┘
```

**States:**
- **Suggested:** Debate mode proposed, participants deciding
- **Configuring:** Setting up rules and sides
- **Confirming:** All participants reviewing and accepting terms
- **Active:** Debate in progress
- **Paused:** Debate temporarily suspended
- **Concluded:** Debate finished, results shown
- **Archived:** Past debate available for review

### Pattern 2: Debate Interface (Two-Sided)

**Description:** Split-screen or color-coded interface showing opposing arguments with clear turn structure.

**User Flow:**
1. Debate canvas shows proposition at top
2. Affirmative and negative sides clearly distinguished (green/blue vs red/orange)
3. Current round and time limit displayed prominently
4. Active speaker's area highlighted
5. Arguments appear in their side's column
6. Can reference opponent's arguments for rebuttal
7. Timer counts down for timed rounds
8. Next speaker automatically activated when turn ends

**Visual Design:**
```
Desktop Debate View (Two-Sided):

┌──────────────────────────────────────────────────────────────┐
│ ⚔️ DEBATE: Humans possess free will          Round 2 of 4    │
│                                              [Pause] [End]    │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  📜 Resolved: Humans possess free will.                      │
│                                                               │
├─────────────────────────────┬────────────────────────────────┤
│ ✅ AFFIRMATIVE              │ ❌ NEGATIVE                     │
│ Sarah, Marcus               │ James, Emma                     │
│                             │                                 │
│ Round 2: Rebuttals          │ ⏱️ YOUR TURN - 2:34 remaining  │
│                             │                                 │
│ ┌─────────────────────────┐│ ┌──────────────────────────┐   │
│ │ Opening Statement       ││ │ Opening Statement        │   │
│ │ (Sarah, 8 min ago)      ││ │ (James, 5 min ago)       │   │
│ │                         ││ │                          │   │
│ │ "Free will is the       ││ │ "All human actions are   │   │
│ │ capacity to choose      ││ │ determined by prior      │   │
│ │ between alternatives... ││ │ causes. Neuroscience...  │   │
│ │                         ││ │                          │   │
│ │ [View Full]             ││ │ [View Full]              │   │
│ └─────────────────────────┘│ └──────────────────────────┘   │
│                             │                                 │
│ ┌─────────────────────────┐│ ┌──────────────────────────┐   │
│ │ Rebuttal (Round 2)      ││ │ Composing Rebuttal...    │   │
│ │ (Sarah, just now)       ││ │                          │   │
│ │                         ││ │ James responds:          │   │
│ │ "James claims all       ││ │ ┌───────────────────────┐│   │
│ │ actions are determined, ││ │ │                       ││   │
│ │ but this ignores the    ││ │ │ [Writing response...] ││   │
│ │ experience of           ││ │ │                       ││   │
│ │ deliberation..."        ││ │ │                       ││   │
│ │                         ││ │ └───────────────────────┘│   │
│ │ 📊 Argument strength: ●●│││ │                          │   │
│ │ 💬 3 audience comments  ││ │ [Post Rebuttal]          │   │
│ └─────────────────────────┘│ │                          │   │
│                             │ │ 💡 Suggested rebuttals:  │   │
│                             │ │ • Address deliberation   │   │
│                             │ │   experience claim       │   │
│                             │ │ • Counter with           │   │
│                             │ │   neuroscience evidence  │   │
│                             │ │ [View More]              │   │
│                             │ └──────────────────────────┘   │
│                             │                                 │
└─────────────────────────────┴────────────────────────────────┘

Mobile Debate View (Stacked):

┌────────────────────────────┐
│ ⚔️ DEBATE             [⋮]  │
│ Free Will              2/4 │
├────────────────────────────┤
│ 📜 Resolved: Humans        │
│    possess free will       │
├────────────────────────────┤
│ ⏱️ James's Turn            │
│    2:34 remaining          │
├────────────────────────────┤
│                            │
│ [✅ Affirmative] [❌ Negative]│
│                            │
│ ❌ Negative: Rebuttal      │
│ (James composing...)       │
│                            │
│ [View Affirmative Args ↑]  │
│                            │
│ ┌───────────────────────┐ │
│ │ [Writing rebuttal...] │ │
│ │                       │ │
│ │                       │ │
│ └───────────────────────┘ │
│                            │
│ Time: 2:30                 │
│ [Post Rebuttal]            │
│                            │
│ 💡 Suggestions ▼           │
│                            │
└────────────────────────────┘
```

**States:**
- **Your turn:** Active speaker composing argument
- **Opponent's turn:** Waiting for other side's response
- **Time warning:** < 1 minute remaining in timed round
- **Round complete:** Both sides finished, advancing to next round
- **Cross-examination:** Special Q&A format
- **Judging:** Debate complete, judges evaluating

### Pattern 3: Argument Mapping View (Kialo-Style)

**Description:** Hierarchical tree showing all pro/con arguments with nested support/rebuttal structure.

**User Flow:**
1. Central proposition at top
2. Major arguments branch left (affirmative) and right (negative)
3. Each argument has sub-arguments supporting or attacking it
4. Can expand/collapse branches
5. Vote on individual argument quality
6. Add new arguments to tree
7. Link arguments to avoid duplication
8. Filter by argument strength, author, time

**Visual Design:**
```
Argument Map View:

┌──────────────────────────────────────────────────────────────┐
│ 🗺️ Argument Map                              [List View] [✕] │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│                 Humans possess free will                      │
│                          │                                    │
│          ┌───────────────┴────────────────┐                  │
│          │                                 │                  │
│    ✅ PRO (4 args)                   ❌ CON (5 args)         │
│          │                                 │                  │
│    ┌─────┴──────┐                   ┌─────┴──────┐          │
│    │            │                   │            │          │
│  ┌─▼──────┐  ┌─▼──────┐         ┌─▼──────┐  ┌─▼──────┐   │
│  │We      │  │Moral   │         │Neural  │  │Determin│   │
│  │experience│ │responsibility│   │determinism│ │ism    │   │
│  │choice  │  │requires│         │shows   │  │from    │   │
│  │        │  │free will│        │causation│ │physics │   │
│  │↑87 ↓12││  │↑56 ↓23││         │↑92 ↓8 ││  │↑67 ↓34││   │
│  └────────┘  └────────┘         └────────┘  └────────┘   │
│      │           │                   │           │          │
│   ┌──┴──┐     ┌─┴──┐             ┌─┴──┐     ┌─┴──┐       │
│  ┌▼────┐│    ┌▼───┐│            ┌▼───┐│    ┌▼───┐│       │
│  │PRO  ││    │CON ││            │PRO ││    │CON ││       │
│  │     ││    │    ││            │    ││    │    ││       │
│  │Deliber││   │Could││           │Compatible││  │Quantum││       │
│  │-ation ││   │be  ││            │with    ││  │indeter-││       │
│  │proves ││   │illusion││         │some    ││  │minacy ││       │
│  │choice ││   │    ││            │causation││ │      ││       │
│  │exists ││   │    ││            │        ││  │      ││       │
│  │↑45↓8││    │↑34↓12││           │↑23↓45││  │↑12↓56││       │
│  └─────┘│    └────┘│            └────┘│  └────┘│       │
│  [+Add] │    [+Add]│            [+Add]│  [+Add]│       │
│                                                               │
│  ─────────────────────────────────────────────────────       │
│                                                               │
│  💡 Click any argument to expand, vote, or reply              │
│  ✅ Green = Pro arguments  ❌ Red = Con arguments             │
│  ↑↓ = Community voting (higher = stronger argument)          │
│                                                               │
│  [Expand All] [Collapse All] [Filter] [Export as PDF]        │
│                                                               │
└──────────────────────────────────────────────────────────────┘

Argument Detail View (Expanded):

┌────────────────────────────────────────────────────────┐
│ ← Back to Map                                          │
├────────────────────────────────────────────────────────┤
│                                                         │
│ ❌ CON Argument                                         │
│                                                         │
│ "Neural determinism shows all actions are caused by    │
│  prior brain states, leaving no room for free will."   │
│                                                         │
│ 👤 Posted by: James Rodriguez                          │
│ 📅 2 hours ago                                         │
│ 📊 Strength: ↑92 ↓8                                    │
│                                                         │
│ ─────────────────────────────────────────────────      │
│                                                         │
│ Supporting Arguments (PRO this claim):                  │
│                                                         │
│ ✅ "fMRI studies show brain activity precedes          │
│     conscious awareness of decisions" (Marcus)         │
│     ↑67 ↓15  [View] [Reply]                            │
│                                                         │
│ ✅ "Libet experiments demonstrate neural initiation    │
│     before subjective choice" (Emma)                   │
│     ↑54 ↓23  [View] [Reply]                            │
│                                                         │
│ Attacking Arguments (CON this claim):                   │
│                                                         │
│ ❌ "Determinism and free will may be compatible        │
│     (compatibilism)" (Sarah)                           │
│     ↑78 ↓12  [View] [Reply]                            │
│                                                         │
│ ❌ "Quantum indeterminacy at neural level undermines   │
│     strict determinism" (Marcus)                       │
│     ↑34 ↓56  [View] [Reply]                            │
│                                                         │
│ [Add Supporting Argument] [Add Counter-Argument]        │
│                                                         │
│ Your Vote:  ↑ Upvote  ↓ Downvote  (vote on quality,    │
│            not agreement!)                              │
│                                                         │
└────────────────────────────────────────────────────────┘
```

**States:**
- **Collapsed:** Showing only major arguments
- **Expanded:** Full tree with all sub-arguments
- **Focused:** Zoomed into one argument branch
- **Filtered:** Showing only high-quality or recent arguments
- **Adding:** Composing new argument to add to tree

### Pattern 4: Judging & Scoring Interface

**Description:** Tools for judges to evaluate arguments based on clear criteria and provide feedback.

**User Flow:**
1. Judge accesses debate at conclusion or during rounds
2. Reviews all arguments from both sides
3. Scores based on rubric: logic, evidence, clarity, rebuttal quality
4. Writes feedback for each side
5. Declares winner or scores tied
6. Results shared with debaters and audience
7. Detailed breakdown shows which arguments scored highest

**Visual Design:**
```
Judge Scorecard:

┌────────────────────────────────────────────────────────┐
│ 🏆 Judge Scorecard: Free Will Debate          [Submit] │
├────────────────────────────────────────────────────────┤
│                                                         │
│ You are judging this debate. Evaluate based on:        │
│ • Logical coherence and reasoning                      │
│ • Quality and relevance of evidence                    │
│ • Effective rebuttals and responses                    │
│ • Clarity and persuasiveness                           │
│                                                         │
│ ───────────────────────────────────────────────        │
│                                                         │
│ ✅ AFFIRMATIVE SIDE (Sarah, Marcus)                    │
│                                                         │
│ Logical Reasoning:     ●●●●●○○○○○ (5/10)              │
│ Evidence Quality:      ●●●●●●●○○○ (7/10)              │
│ Rebuttal Effectiveness: ●●●●●●○○○○ (6/10)             │
│ Clarity & Persuasion:  ●●●●●●●●○○ (8/10)              │
│                                                         │
│ Total: 26/40                                            │
│                                                         │
│ Feedback for Affirmative:                               │
│ ┌────────────────────────────────────────────────┐    │
│ │ Strong appeal to phenomenology of choice, but  │    │
│ │ could better address neuroscience evidence...  │    │
│ │                                                 │    │
│ └────────────────────────────────────────────────┘    │
│                                                         │
│ ───────────────────────────────────────────────        │
│                                                         │
│ ❌ NEGATIVE SIDE (James, Emma)                         │
│                                                         │
│ Logical Reasoning:     ●●●●●●●●○○ (8/10)              │
│ Evidence Quality:      ●●●●●●●●●○ (9/10)              │
│ Rebuttal Effectiveness: ●●●●●●●○○○ (7/10)             │
│ Clarity & Persuasion:  ●●●●●●○○○○ (6/10)              │
│                                                         │
│ Total: 30/40                                            │
│                                                         │
│ Feedback for Negative:                                  │
│ ┌────────────────────────────────────────────────┐    │
│ │ Excellent use of empirical evidence from       │    │
│ │ neuroscience. Could be more charitable to      │    │
│ │ compatibilist positions...                     │    │
│ └────────────────────────────────────────────────┘    │
│                                                         │
│ ───────────────────────────────────────────────        │
│                                                         │
│ Decision:                                               │
│ ( ) Affirmative wins                                   │
│ (•) Negative wins                                      │
│ ( ) Tie / No clear winner                             │
│                                                         │
│ Overall Comments:                                       │
│ ┌────────────────────────────────────────────────┐    │
│ │ Both sides presented strong arguments. The     │    │
│ │ negative edge came from stronger empirical...  │    │
│ └────────────────────────────────────────────────┘    │
│                                                         │
│ [Save Draft] [Submit Judgment]                         │
│                                                         │
│ Note: Debaters will see your scores and feedback.      │
└────────────────────────────────────────────────────────┘

Results View (After Judging):

┌────────────────────────────────────────────────────────┐
│ 🏆 Debate Results: Humans possess free will            │
├────────────────────────────────────────────────────────┤
│                                                         │
│ ❌ NEGATIVE WINS (2 of 3 judges)                       │
│                                                         │
│ Judge Scores:                                           │
│                                                         │
│ Judge 1 (Dr. Chen):      Negative 32-28                │
│ Judge 2 (Prof. Kim):     Negative 30-26                │
│ Judge 3 (Sarah M.):      Affirmative 29-27             │
│                                                         │
│ ───────────────────────────────────────────────        │
│                                                         │
│ Category Breakdown:                                     │
│                                                         │
│                      Aff    Neg                         │
│ Logical Reasoning:   6.3    7.7 ⭐                      │
│ Evidence Quality:    6.7    8.3 ⭐                      │
│ Rebuttals:           7.0    6.7                         │
│ Clarity:             7.3    6.0                         │
│                                                         │
│ ───────────────────────────────────────────────        │
│                                                         │
│ Audience Vote: (optional)                               │
│ Affirmative: ████████░░░░░░░░░░░░ 34%                 │
│ Negative:    ████████████████░░░░░ 66%                 │
│                                                         │
│ 47 audience members voted                              │
│                                                         │
│ ───────────────────────────────────────────────        │
│                                                         │
│ Top-Rated Arguments:                                    │
│                                                         │
│ 🥇 "Neural determinism..." (James) - 92 votes          │
│ 🥈 "We experience deliberation..." (Sarah) - 87 votes  │
│ 🥉 "Moral responsibility requires..." (Marcus) - 78    │
│                                                         │
│ [View Judge Feedback] [View Full Debate]               │
│ [Debate Again?] [Return to Conversation Mode]          │
│                                                         │
└────────────────────────────────────────────────────────┘
```

**States:**
- **Scoring:** Judge actively evaluating arguments
- **Draft saved:** Partial scoring saved, can return later
- **Submitted:** Judge has finalized scores
- **Results pending:** Waiting for all judges
- **Results public:** Final results shared with all participants

### Pattern 5: Exiting Debate Mode

**Description:** Clear path to end debate and return to collaborative conversation.

**User Flow:**
1. Debate concludes (winner declared or exploratory end)
2. Results and feedback displayed
3. Option to "Continue Conversation" appears
4. If selected, creates new thread linked to debate
5. Mode changes back to collaborative (no sides, no competition)
6. Can reference debate arguments but no longer bound by positions
7. Debaters can express changed views or nuances

**Visual Design:**
```
Post-Debate Transition:

┌────────────────────────────────────────────────────────┐
│ 🏆 Debate Concluded                                    │
├────────────────────────────────────────────────────────┤
│                                                         │
│ ❌ Negative wins: "Humans possess free will"           │
│                                                         │
│ Great debate! Both sides presented strong arguments.   │
│                                                         │
│ ───────────────────────────────────────────────        │
│                                                         │
│ What's next?                                            │
│                                                         │
│ ┌────────────────────────────────────────────────┐    │
│ │ 💬 Continue Conversation                       │    │
│ │                                                 │    │
│ │ Move to collaborative mode to explore nuances, │    │
│ │ share insights from debate, or discuss points  │    │
│ │ without competitive structure.                 │    │
│ │                                                 │    │
│ │ [Start Conversation Thread]                    │    │
│ └────────────────────────────────────────────────┘    │
│                                                         │
│ ┌────────────────────────────────────────────────┐    │
│ │ 🔁 Rematch                                      │    │
│ │                                                 │    │
│ │ Debate the same or related topic again,        │    │
│ │ optionally switching sides.                    │    │
│ │                                                 │    │
│ │ [Setup New Debate]                             │    │
│ └────────────────────────────────────────────────┘    │
│                                                         │
│ ┌────────────────────────────────────────────────┐    │
│ │ 📊 Review & Share                               │    │
│ │                                                 │    │
│ │ Export debate, share with others, or save      │    │
│ │ for your portfolio.                            │    │
│ │                                                 │    │
│ │ [Export PDF] [Share Link] [Add to Profile]    │    │
│ └────────────────────────────────────────────────┘    │
│                                                         │
└────────────────────────────────────────────────────────┘

Conversation Mode (Post-Debate):

┌────────────────────────────────────────────────────────┐
│ 💬 Conversation: "Free Will - Deeper Thoughts"        │
│                                                         │
│ 🔗 Continued from debate: [View Debate Results]        │
├────────────────────────────────────────────────────────┤
│                                                         │
│ Sarah: "Now that the debate's over, I have to admit   │
│ James made some really compelling points about neural  │
│ determinism. I'm less confident in libertarian free    │
│ will than I was before."                               │
│                                                         │
│ 🤔 Changed view                                        │
│ 💬 3 replies  ↑ 12  🕐 5 min ago                       │
│                                                         │
│ ├─ James: "Thanks Sarah! Though I think your points   │
│ │  about compatibilism are worth exploring more. Maybe│
│ │  the debate was too binary?"                        │
│ │  💬 1 reply  ↑ 8  🕐 3 min ago                      │
│ │                                                      │
│ └─ Marcus: "Agreed. I think the real question is what │
│    we mean by 'free' - the debate helped clarify that│
│    we were using the term differently."               │
│    💬 Reply  ↑ 5  🕐 2 min ago                        │
│                                                         │
│ ─────────────────────────────────────────────────      │
│                                                         │
│ Note: This is collaborative mode - no sides,           │
│ no scoring, just exploring ideas together.             │
│                                                         │
└────────────────────────────────────────────────────────┘
```

**States:**
- **Concluded:** Debate finished, showing results
- **Transitioning:** Moving from debate to conversation mode
- **Post-debate conversation:** Collaborative discussion referencing debate
- **Archived:** Debate saved for future reference

---

## Component Needs

### Core Components:
- **DebateSetup**: Configuration interface for creating debates
- **PropositionCard**: Central statement being debated
- **SideLabel**: Clear visual indicators for affirmative/negative
- **ArgumentCard**: Individual argument with metadata (author, time, votes)
- **RoundIndicator**: Current round and phase of debate
- **TurnTimer**: Countdown for timed arguments
- **DebateCanvas**: Main area showing arguments from both sides
- **VotingWidget**: Upvote/downvote for argument quality

### Argument Mapping Components:
- **ArgumentTree**: Kialo-style hierarchical pro/con visualization
- **ArgumentNode**: Individual claim in tree with expand/collapse
- **ArgumentLink**: Visual connection between related arguments
- **TreeNavigator**: Controls for expanding, collapsing, filtering tree
- **StrengthIndicator**: Visual showing community voting on argument quality

### Judging Components:
- **JudgeScorecard**: Rubric-based evaluation interface
- **CategorySlider**: Score individual criteria (logic, evidence, etc.)
- **FeedbackComposer**: Text areas for judge comments
- **ResultsDisplay**: Winner declaration with score breakdown
- **AudienceVote**: Simple voting widget for spectators

### Transition Components:
- **ModeSwitch**: Visual indication of debate vs conversation mode
- **DebateResults**: Summary of concluded debate with options
- **ContinuationPrompt**: Invitation to move to conversation mode
- **ViewChangedBadge**: Mark when participant changed their view

---

## User Flows

### Flow 1: Starting a Debate from a Conversation

1. **Initiate:** User suggests debate mode in active conversation thread
2. **Proposition:** Clearly state debate resolution
3. **Sides:** Participants choose affirmative/negative (or decline)
4. **Rules:** Configure rounds, time limits, judging method
5. **Confirm:** All participants review and agree to debate format
6. **Transform:** UI shifts to debate mode (visual change signals competition)
7. **Begin:** First round (opening statements) starts
8. **Execute:** Structured rounds proceed according to rules
9. **Judge:** Evaluation based on chosen method (judges or audience)
10. **Results:** Winner declared with detailed feedback
11. **Reflect:** Option to continue conversation or exit

### Flow 2: Building an Argument Map (Kialo-Style)

1. **Create:** Start new argument map with central proposition
2. **Add Major Arguments:** Participants add top-level pro/con arguments
3. **Branch:** Each argument can have supporting or attacking sub-arguments
4. **Nest:** Sub-arguments can have their own pro/con branches (recursive)
5. **Vote:** Community votes on argument quality (not agreement)
6. **Link:** Connect related arguments to avoid duplication
7. **Refine:** Edit arguments for clarity, add evidence
8. **Filter:** View strongest arguments, recent additions, specific authors
9. **Synthesize:** Argument map shows comprehensive landscape of positions
10. **Export:** Save as PDF, image, or share link

### Flow 3: Judging a Completed Debate

1. **Assign:** Judge assigned (self-selected or invited) to evaluate debate
2. **Review:** Read through all arguments from both sides
3. **Evaluate:** Score each side on rubric criteria (logic, evidence, rebuttals, clarity)
4. **Feedback:** Write constructive comments for each side
5. **Decide:** Determine winner or declare tie
6. **Submit:** Finalize judgment (can save draft first)
7. **Aggregate:** If multiple judges, scores combined
8. **Publish:** Results shared with debaters and audience
9. **Discuss:** Optional post-judgment Q&A with debaters

### Flow 4: Switching from Debate to Conversation

1. **Conclude:** Debate ends with results displayed
2. **Reflect:** Participants review what they learned
3. **Option:** "Continue Conversation" button appears
4. **Create:** New thread created, linked to debate
5. **Mode Shift:** UI changes to collaborative mode (no sides, no scoring)
6. **Express:** Participants can share changed views, nuances, uncertainties
7. **Explore:** Discuss points that debate format couldn't accommodate
8. **Reference:** Can link to specific debate arguments
9. **Synthesize:** Work together toward deeper understanding

---

## Accessibility Considerations

### Cognitive Accessibility:
- **Clear mode signaling:** Debate vs conversation mode always obvious
- **Structured turns:** Unambiguous whose turn it is
- **Time warnings:** 1-minute warning before time expires
- **Rule clarity:** Debate rules always visible and understandable
- **Optional complexity:** Start with simple 2-sided debates, advance to multi-position

### Visual Accessibility:
- **Color + icons:** Don't rely solely on red/green for sides (use labels, icons too)
- **High contrast:** Argument cards, side indicators clearly distinguishable
- **Screen reader:** All argument trees, maps readable in linear format
- **Zoom-friendly:** Argument maps scale without losing structure
- **Focus indicators:** Keyboard navigation clearly shows current position

### Motor Accessibility:
- **Voice input:** Dictate arguments instead of typing
- **Keyboard shortcuts:** Navigate arguments, vote, expand/collapse without mouse
- **Large touch targets:** All interactive elements 44x44px minimum
- **Auto-save:** Arguments auto-saved during composition

### Temporal Accessibility:
- **Async option:** Turn-based debates don't require real-time participation
- **Extended time:** Can request longer time limits for accessibility
- **Pause capability:** Debates can be paused and resumed
- **No-time-limit mode:** Exploratory debates without countdown

---

## Mobile vs Desktop

### Desktop Experience (Primary for Debate Participation):
- **Split-screen:** Affirmative and negative sides side-by-side
- **Argument map:** Full tree visualization with interactive nodes
- **Rich composition:** Full text editor for crafting arguments
- **Multi-window:** Reference evidence, debate rules, previous arguments simultaneously
- **Judging:** Full scorecard with all criteria visible
- **Timer prominent:** Large countdown clock during timed rounds

### Mobile Experience (Primary for Spectating):
- **Stacked view:** Affirmative/negative arguments in single column, tabs to switch
- **Simplified map:** Linear list of arguments, expandable to tree
- **Quick composition:** Streamlined argument input
- **Compact timer:** Countdown in header bar
- **Voting:** Large upvote/downvote buttons for audience
- **Notifications:** Push alerts for turn changes, results
- **Judge scorecard:** One category at a time, swipe to next

### Cross-Device Sync:
- **Draft arguments:** Start on mobile, finish on desktop
- **Debate position:** Return to current round across devices
- **Votes sync:** Upvotes/downvotes consistent across platforms
- **Notifications:** Alerts on all devices

---

## Implementation Priority

### MVP (Phase 1): Basic Two-Sided Debates
**Timeline:** 8-10 weeks

**Must-Have Features:**
- ✅ Create debate from conversation or standalone
- ✅ Define clear proposition
- ✅ Two-sided format (affirmative vs negative)
- ✅ Assign sides (2-4 participants per side)
- ✅ Turn-based rounds (opening, rebuttal, closing)
- ✅ Async mode with time limits (24-48 hours per round)
- ✅ Basic argument cards (text, author, timestamp)
- ✅ Judge scorecard (simple rubric)
- ✅ Winner declaration
- ✅ Debate archive (view past debates)
- ✅ Exit to conversation mode

**Success Metrics:**
- 20+ debates created in first month
- 70% completion rate (debates that reach conclusion)
- Average 8-12 arguments per debate
- 80% of debates transition to post-debate conversation

### Phase 2: Argument Mapping & Enhanced Features
**Timeline:** 8-10 weeks after MVP

**Features:**
- ✅ Kialo-style argument tree visualization
- ✅ Pro/con hierarchical structure with nesting
- ✅ Community voting on argument quality
- ✅ Argument linking (reference without duplication)
- ✅ Live debate mode (real-time with countdown)
- ✅ Audience voting (in addition to judges)
- ✅ Multi-round debates (4+ rounds)
- ✅ Cross-examination rounds
- ✅ Argument strength indicators (vote-based)
- ✅ Export debate (PDF, image, link)
- ✅ Mobile-optimized debate interface

**Success Metrics:**
- 50% of debates use argument mapping
- Average argument depth of 3 levels (nested pro/con)
- 30% of debates use live mode
- Audience participation: 10+ votes per debate

### Phase 3: Advanced Debate Features
**Timeline:** 10-12 weeks after Phase 2

**Features:**
- ✅ Multi-position debates (3+ distinct views)
- ✅ Debate tournaments (bracket-style, multiple rounds)
- ✅ Debate templates (common philosophical topics)
- ✅ AI debate assistant (suggest arguments, rebuttals)
- ✅ Debate analysis (logical fallacy detection)
- ✅ Advanced judging (multiple rubrics, weighted criteria)
- ✅ Debate coaching (training mode with feedback)
- ✅ Team debates (2v2, 3v3)
- ✅ Video/voice debates (multimedia arguments)
- ✅ Debate leaderboard (ranked by judge scores, optional)
- ✅ Integration with reading groups (debate book claims)
- ✅ Debate challenges (open invitations to debate topics)

**Success Metrics:**
- 100+ debates per week
- 20% of users participate in debates
- 10% try facilitating/judging
- 50+ public argument maps created
- Cross-feature: 30% of debates linked to reading groups or topics

### Future Explorations:

**Potential Features:**
- **AI opponents:** Practice debating against AI with adjustable skill
- **Dialectic mode:** Hegelian thesis-antithesis-synthesis structure
- **Public debates:** Featured debates on homepage
- **Debate education:** Tutorial series on argumentation
- **Formal logic integration:** Validate argument structure
- **Evidence library:** Shared repository of sources, citations
- **Debate analytics:** Personal improvement tracking
- **Credentialing:** Debate badges, certifications (optional)
- **Spectator tools:** Live polling, Q&A during debates
- **Debate matchmaking:** Auto-pair users with opposing views

---

## Key Design Principles

1. **Opt-In Competition:** Debate mode is explicitly chosen, never default
2. **Clear Visual Distinction:** Debate UI looks/feels different from conversation
3. **Fair Structure:** Rules applied equally, no advantage to either side
4. **Quality Over Victory:** Encourage good arguments, not just winning
5. **Graceful Exit:** Easy transition back to collaborative mode
6. **Spectator Value:** Observers learn from structured argumentation
7. **Non-Toxic Competition:** Competitive without hostile or personal attacks
8. **Educational Focus:** Debates teach argumentation skills, philosophical rigor

---

## Critical Success Factors

### For Debaters:
- **Clear rules:** Understand structure, time limits, judging criteria upfront
- **Fair process:** Both sides have equal opportunity to present arguments
- **Constructive feedback:** Judges provide helpful critique, not just scores
- **Learning value:** Improve argumentation skills through participation
- **Non-hostile:** Competition doesn't become personal or toxic

### For Judges:
- **Clear criteria:** Rubric guides evaluation objectively
- **Training available:** Learn how to judge fairly and constructively
- **Time commitment:** Judging doesn't take excessive time
- **Impact:** Feedback influences debater growth

### For Audience:
- **Engaging:** Structured debates are interesting to watch
- **Educational:** Learn about topics and argumentation
- **Participatory:** Can vote, ask questions (where appropriate)
- **Accessible:** Easy to find and follow debates

### For Platform:
- **Optional feature:** Doesn't dominate platform, coexists with collaboration
- **Showcase quality:** Exemplary debates demonstrate philosophical depth
- **Community builder:** Friendly competition strengthens relationships
- **Differentiation:** Unique feature (structured philosophical debate with mapping)
- **Non-toxic culture:** Maintain platform's thoughtful, respectful ethos

---

## Open Questions for User Testing

1. **Adoption rate?** What % of users will actually want competitive debate mode?
2. **Mode clarity?** Is the visual distinction between debate/conversation clear enough?
3. **Judge burden?** Is judging too time-consuming, or manageable?
4. **Argument mapping value?** Do users prefer linear debates or tree visualization?
5. **Time limits?** What's optimal: 24hrs/round, 48hrs, or flexible?
6. **Live vs async?** Which format produces better debates?
7. **Toxicity risk?** Does competition lead to hostility, even with rules?
8. **Post-debate continuation?** Do debates naturally transition to conversation?
9. **Scoring necessity?** Do we need winners, or just structured exploration?
10. **Integration with other features?** Should debates link to reading groups, topics, profiles?

---

## Related Documentation

- See **socratic-dialogue-interface.md** for collaborative question-based inquiry (contrasts with competitive debate)
- See **reading-group-ui-patterns.md** for integrating debates about book claims/arguments
- See **profile-and-identity-design.md** for displaying debate participation and wins (if leaderboard implemented)
- See **topic-system-ui.md** for organizing debates by philosophical topics

---

*This document synthesizes research from Kialo (argument mapping), Argunet/Argdown (visualization tools), and traditional debate platforms to design a debate mode that offers structured competitive argumentation while maintaining the platform's commitment to good faith philosophical discourse. Debate mode is explicitly opt-in, visually distinct, and designed to complement—not replace—the platform's collaborative conversation features.*
