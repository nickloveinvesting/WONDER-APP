# Complete Database Schema Audit
**Date:** November 2025  
**Status:** Current Implementation vs. Conversation-First Vision  
**Scope:** All tables, columns, relationships, indexes, functions, and constraints

---

## EXECUTIVE SUMMARY

### Current Schema Overview
The database currently implements a **debate-centric** schema with 4 core tables:
- `profiles` - User profiles with reputation and debate stats
- `debates` - Debate threads with competitive structure
- `arguments` - Arguments within debates (for/against positions)
- `judgments` - AI-judged outcomes with winners

**Total Tables:** 4  
**Total Columns:** 28  
**Primary Functions:** 2  
**Triggers:** 2  
**Indexes:** 6  
**RLS Policies:** 7  

### Vision Alignment Assessment
- **DEBATES TABLE**: ❌ REMOVE/TRANSFORM - Debate-specific structure incompatible with conversation-first vision
- **ARGUMENTS TABLE**: 🔄 TRANSFORM - Can be adapted for conversations but needs significant restructuring
- **JUDGMENTS TABLE**: ❌ REMOVE - Winner-based judging contradicts collaborative dialogue
- **PROFILES TABLE**: ✅ KEEP (with modifications) - User management needed, but stats must change

---

## TABLE INVENTORY & DETAILED DOCUMENTATION

### TABLE 1: `profiles` (User Data)

#### Purpose
Extends Supabase `auth.users` table with profile information, reputation tracking, and debate statistics.

#### Complete Schema Definition
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  reputation_score INTEGER DEFAULT 0,
  debates_won INTEGER DEFAULT 0,
  debates_participated INTEGER DEFAULT 0,
  delo_rating INTEGER DEFAULT 1000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30)
);
```

#### Column Documentation

| Column | Type | Constraints | Purpose | Notes |
|--------|------|-----------|---------|-------|
| `id` | UUID | PRIMARY KEY, FK to auth.users | User identifier | Cascade delete from auth.users |
| `username` | TEXT | UNIQUE, NOT NULL, LENGTH 3-30 | Username for login | Case-sensitive, immutable in current design |
| `display_name` | TEXT | NULL allowed | User's display name | For UI display, separate from username |
| `bio` | TEXT | NULL allowed | User biography | Can be NULL (optional profile completion) |
| `reputation_score` | INTEGER | DEFAULT 0 | **DEBATE STAT** - Reputation from wins | **VISION MISALIGNED**: Debate-specific metric |
| `debates_won` | INTEGER | DEFAULT 0 | **DEBATE STAT** - Count of debate wins | **VISION MISALIGNED**: Not applicable to conversations |
| `debates_participated` | INTEGER | DEFAULT 0 | **DEBATE STAT** - Count of debates | **VISION MISALIGNED**: Not applicable to conversations |
| `delo_rating` | INTEGER | DEFAULT 1000 | **DEBATE STAT** - DeLO rating system | **VISION MISALIGNED**: Competitive ELO-style rating |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Account creation timestamp | Immutable |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last profile update timestamp | Updated on profile changes |

#### Relationships
- **FK to auth.users**: One-to-one relationship (CASCADE DELETE)
- **Referenced by debates.created_by, debates.for_participant, debates.against_participant, debates.winner_id**
- **Referenced by arguments.user_id**
- **Referenced by judgments** (implicit via debate participation)

#### Indexes
- `profiles_username_idx` - BTREE on username (for login lookups)
- `profiles_delo_rating_idx` - BTREE DESC on delo_rating (for leaderboard sorting)

#### Row-Level Security Policies
1. **SELECT**: Public - Everyone can view all profiles
   ```sql
   CREATE POLICY "Public profiles are viewable by everyone"
     ON profiles FOR SELECT USING (true);
   ```

2. **INSERT**: Owner only - Users can create their own profile
   ```sql
   CREATE POLICY "Users can insert their own profile"
     ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
   ```

3. **UPDATE**: Owner only - Users can update their own profile
   ```sql
   CREATE POLICY "Users can update their own profile"
     ON profiles FOR UPDATE USING (auth.uid() = id);
   ```

#### Triggers
- **on_auth_user_created** - Automatically creates profile when auth.users record is created

#### Data Volume Estimate
- **Current:** < 100 profiles
- **Expected (1 year):** 10K-50K profiles
- **Expected (3 years):** 100K-500K profiles

#### Current Sample Data Structure
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "philosophical_alice",
  "display_name": "Alice Chen",
  "bio": "Exploring ethics and epistemology",
  "reputation_score": 45,
  "debates_won": 3,
  "debates_participated": 8,
  "delo_rating": 1250,
  "created_at": "2025-01-13T10:30:00Z",
  "updated_at": "2025-01-14T15:22:00Z"
}
```

---

### TABLE 2: `debates` (Content - Debate-Specific)

#### Purpose
Represents debate threads with two opposing participants and AI judgment. **This table embodies the OLD debate-centric vision.**

#### Complete Schema Definition
```sql
CREATE TABLE debates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed')),
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  for_participant UUID REFERENCES profiles(id) ON DELETE SET NULL,
  against_participant UUID REFERENCES profiles(id) ON DELETE SET NULL,
  winner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

#### Column Documentation

| Column | Type | Constraints | Purpose | Issues |
|--------|------|-----------|---------|--------|
| `id` | UUID | PRIMARY KEY | Debate identifier | Auto-generated |
| `topic` | TEXT | NOT NULL | Debate topic/question | Debate-specific format |
| `description` | TEXT | NULL allowed | Debate description/context | Optional detail |
| `status` | TEXT | CHECK constraint | Debate workflow status | Values: 'open', 'in_progress', 'completed' |
| `created_by` | UUID | FK to profiles | Debate creator | Can delete if creator deleted |
| `for_participant` | UUID | FK to profiles | "Pro" side participant | **DEBATE STRUCTURE** - Not in conversation model |
| `against_participant` | UUID | FK to profiles | "Con" side participant | **DEBATE STRUCTURE** - Not in conversation model |
| `winner_id` | UUID | FK to profiles | Judge-declared winner | **COMPETITIVE** - Incompatible with collaborative vision |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp | For sorting/discovery |
| `completed_at` | TIMESTAMPTZ | NULL allowed | Completion timestamp | When debate was judged |

#### Relationships
- **FK created_by**: Many debates per user (creator)
- **FK for_participant**: Many debates per user (one side)
- **FK against_participant**: Many debates per user (other side)
- **FK winner_id**: Zero or one winner per debate
- **1-to-Many to arguments**: Each debate has multiple arguments
- **1-to-1 to judgments**: Each debate gets one judgment

#### Indexes
- `debates_status_idx` - BTREE on status (for discovery filtering)
- `debates_created_at_idx` - BTREE DESC on created_at (for sorting by recency)

#### Row-Level Security Policies
1. **SELECT**: Public - Everyone can view all debates
   ```sql
   CREATE POLICY "Debates are viewable by everyone"
     ON debates FOR SELECT USING (true);
   ```

2. **INSERT**: Authenticated only - Must set yourself as created_by
   ```sql
   CREATE POLICY "Authenticated users can create debates"
     ON debates FOR INSERT WITH CHECK (auth.uid() = created_by);
   ```

3. **UPDATE**: Participants only - Creator or participants can update
   ```sql
   CREATE POLICY "Participants can update their debates"
     ON debates FOR UPDATE USING (
       auth.uid() = created_by OR
       auth.uid() = for_participant OR
       auth.uid() = against_participant
     );
   ```

#### Triggers
- **debate_completed_reputation_update** - Fires when status changes to 'completed', updates reputation scores

#### Data Volume Estimate
- **Current:** < 10 debates
- **Expected (1 year):** 100-500 debates
- **Expected (3 years):** 1K-10K conversations

#### Current Sample Data Structure
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440111",
  "topic": "Is artificial intelligence a threat to humanity?",
  "description": "Exploring AI safety, benefits, and existential risks",
  "status": "in_progress",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "for_participant": "550e8400-e29b-41d4-a716-446655440001",
  "against_participant": "550e8400-e29b-41d4-a716-446655440002",
  "winner_id": null,
  "created_at": "2025-01-13T10:30:00Z",
  "completed_at": null
}
```

#### Vision Alignment: ❌ REMOVE/TRANSFORM

**Issues:**
- **Forced binary structure**: "For/Against" presumes two-sided debate format
- **Winner field**: Incompatible with collaborative dialogue goal
- **Status workflow**: Designed for judged debates, not continuous conversations
- **No multi-perspective support**: Conversation-first requires 3+ perspectives on same topic

**Migration Strategy:**
- OPTION A (REMOVE): Delete all debate records, create new `conversations` table
- OPTION B (TRANSFORM): Rename to `conversations`, restructure fields:
  - Remove `for_participant`, `against_participant`, `winner_id`
  - Replace with `conversation_type` (e.g., 'open_discussion', 'moderated_dialogue')
  - Change `status` to reflect conversation state (active, archived, featured)
  - Add `perspectives_count` to track diversity

---

### TABLE 3: `arguments` (Content - Arguments/Messages)

#### Purpose
Contains individual arguments/messages within debate threads. **Structured as pro/con positions within debates.**

#### Complete Schema Definition
```sql
CREATE TABLE arguments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debate_id UUID REFERENCES debates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  position TEXT NOT NULL CHECK (position IN ('for', 'against')),
  content TEXT NOT NULL,
  round INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Column Documentation

| Column | Type | Constraints | Purpose | Issues |
|--------|------|-----------|---------|--------|
| `id` | UUID | PRIMARY KEY | Argument identifier | Auto-generated |
| `debate_id` | UUID | FK to debates | Parent debate | CASCADE delete if debate deleted |
| `user_id` | UUID | FK to profiles | Author | CASCADE delete if user deleted |
| `position` | TEXT | CHECK ('for'/'against') | Argument side | **DEBATE STRUCTURE** - Binary only, not multi-perspective |
| `content` | TEXT | NOT NULL | Argument text | No length limit |
| `round` | INTEGER | DEFAULT 1 | Debate round number | For ordered discussion structure |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp | Immutable |

#### Relationships
- **FK debate_id**: Many arguments per debate (1-to-Many)
- **FK user_id**: Many arguments per user (1-to-Many)
- **No direct FK to judgments** - Implicit relationship via debate_id

#### Indexes
- `arguments_debate_id_idx` - BTREE on debate_id (for retrieving arguments by debate)

#### Row-Level Security Policies
1. **SELECT**: Public - Everyone can view all arguments
   ```sql
   CREATE POLICY "Arguments are viewable by everyone"
     ON arguments FOR SELECT USING (true);
   ```

2. **INSERT**: Authenticated only - Can only insert as yourself
   ```sql
   CREATE POLICY "Authenticated users can create arguments"
     ON arguments FOR INSERT WITH CHECK (auth.uid() = user_id);
   ```

#### Triggers
- None (argument creation doesn't trigger reputation updates; only debate completion does)

#### Data Volume Estimate
- **Current:** < 50 arguments
- **Expected (1 year):** 500-2000 arguments
- **Expected (3 years):** 10K-50K messages

#### Current Sample Data Structure
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440222",
  "debate_id": "660e8400-e29b-41d4-a716-446655440111",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "position": "for",
  "content": "AI development is beneficial because it augments human capabilities...",
  "round": 1,
  "created_at": "2025-01-13T11:00:00Z"
}
```

#### Vision Alignment: 🔄 TRANSFORM

**Issues:**
- **Binary position field**: Can't represent multiple perspectives simultaneously
- **Debate-specific structure**: Assumes for/against binary
- **No perspective framing**: Doesn't capture philosophical approach or assumptions
- **No threading**: Flat structure doesn't support conversation nesting

**Migration Strategy:**
- Rename to `conversation_messages` or `contributions`
- Remove `position` field
- Add new fields:
  - `perspective_type` - nullable, for multi-perspective framing
  - `parent_message_id` - self-FK for nested threading
  - `edited_at` - track edits to original message
  - `is_edited` - boolean flag
- Transform debate_id references to conversation_id (after debates → conversations rename)
- For existing "for" arguments: set perspective_type to "supporting_main_thesis"
- For existing "against" arguments: set perspective_type to "critical_analysis"

---

### TABLE 4: `judgments` (Engagement - Winner Declaration)

#### Purpose
Stores AI-generated judgments declaring debate winners and providing reasoning. **This is purely competitive/debate-specific.**

#### Complete Schema Definition
```sql
CREATE TABLE judgments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debate_id UUID REFERENCES debates(id) ON DELETE CASCADE,
  winner_position TEXT CHECK (winner_position IN ('for', 'against', 'tie')),
  reasoning TEXT NOT NULL,
  fact_checks JSONB DEFAULT '[]'::jsonb,
  scores JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Column Documentation

| Column | Type | Constraints | Purpose | **VISION ISSUES** |
|--------|------|-----------|---------|------------------|
| `id` | UUID | PRIMARY KEY | Judgment identifier | Auto-generated |
| `debate_id` | UUID | FK to debates | Judged debate | CASCADE delete if debate deleted |
| `winner_position` | TEXT | CHECK ('for'/'against'/'tie') | Declared winner | **DECLARES WINNERS** - Incompatible with collaborative dialogue |
| `reasoning` | TEXT | NOT NULL | Explanation of judgment | Used to educate, but still declares winner |
| `fact_checks` | JSONB | DEFAULT '[]' | Array of fact-check results | Future expansion point |
| `scores` | JSONB | DEFAULT '{}' | Scoring details (logic, clarity, evidence) | Future expansion point |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Judgment creation | Typically when debate ends |

#### Relationships
- **FK debate_id**: One judgment per debate (1-to-1 relationship)
  - Debate can have 0 or 1 judgment (NULL before completion)
  - Judgment references exactly one debate

#### Indexes
- `judgments_debate_id_idx` - BTREE on debate_id (for retrieving judgment for debate)

#### Row-Level Security Policies
1. **SELECT**: Public - Everyone can view all judgments
   ```sql
   CREATE POLICY "Judgments are viewable by everyone"
     ON judgments FOR SELECT USING (true);
   ```

#### Triggers
- None (judgments don't trigger any updates; debates trigger reputation updates)

#### Data Volume Estimate
- **Current:** 0 judgments
- **Expected (1 year):** 100-500 judgments
- **Expected (3 years):** 1K-10K judgments

#### Current Sample Data Structure
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440333",
  "debate_id": "660e8400-e29b-41d4-a716-446655440111",
  "winner_position": "tie",
  "reasoning": "Both participants presented well-reasoned arguments...",
  "fact_checks": [
    {
      "claim": "AI can increase productivity",
      "result": "TRUE",
      "source": "McKinsey 2024 study"
    }
  ],
  "scores": {
    "argument_strength_for": 8,
    "argument_strength_against": 8,
    "evidence_quality_for": 7,
    "evidence_quality_against": 8,
    "clarity_for": 9,
    "clarity_against": 8
  },
  "created_at": "2025-01-14T15:00:00Z"
}
```

#### Vision Alignment: ❌ REMOVE

**Issues:**
- **Winner declaration**: Core incompatibility with collaborative dialogue philosophy
- **Competitive framing**: Entire table embodies "winning vs losing" mindset
- **Not applicable to conversations**: Conversations don't need judges; they're collaborative
- **AI judging role**: Vision calls for AI as facilitator (Socratic guide), not judge

**Migration Strategy:**
- **DELETE entire table** - No equivalent in conversation-first model
- If fact-checking still needed, create separate `fact_checks` table with:
  - Link to conversation_message or conversation (not judges)
  - Fact-check results without winner declaration
  - Community flagging for verification needs (not AI judging)
- If quality analysis still needed, move scoring to `message_feedback` table:
  - Multi-dimensional feedback (thought-provoking, well-reasoned, clear, etc.)
  - Community voting, not AI judgment
  - No "winner" field

---

## FUNCTIONS & TRIGGERS DOCUMENTATION

### FUNCTION 1: `handle_new_user()`

#### Purpose
Automatically creates a profile record when a new user signs up via auth.

#### Definition
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Philosopher')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Trigger
```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

#### Behavior
- **When**: After auth.users INSERT
- **For each**: Individual user signup
- **Does**: Creates corresponding profiles row with:
  - Username from auth metadata or fallback (user_XXXXXXXX)
  - Display name from auth metadata or fallback ("Philosopher")
  - Default values for all other fields

#### Data Flow
```
auth.users (email signup)
  ↓
on_auth_user_created trigger fires
  ↓
handle_new_user() executes
  ↓
profiles row created with defaults
```

#### Vision Impact
- ✅ **KEEP** - Still needed for conversation-first platform
- Profile creation still required
- Only the default field values may need adjustment (e.g., "Philosopher" → "Curious Learner")

---

### FUNCTION 2: `update_reputation_after_debate()`

#### Purpose
Updates user reputation scores when debates complete with a winner.

#### Definition
```sql
CREATE OR REPLACE FUNCTION update_reputation_after_debate()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.winner_id IS NOT NULL AND OLD.winner_id IS NULL THEN
    -- Winner gets 10 points
    UPDATE profiles
    SET reputation_score = reputation_score + 10,
        debates_won = debates_won + 1
    WHERE id = NEW.winner_id;

    -- Both participants get participation credit
    UPDATE profiles
    SET debates_participated = debates_participated + 1
    WHERE id IN (NEW.for_participant, NEW.against_participant);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### Trigger
```sql
CREATE TRIGGER debate_completed_reputation_update
  AFTER UPDATE ON debates
  FOR EACH ROW
  WHEN (NEW.status = 'completed' AND OLD.status != 'completed')
  EXECUTE FUNCTION update_reputation_after_debate();
```

#### Behavior
- **When**: After debates UPDATE
- **Condition**: status changes from non-completed to 'completed'
- **For each**: Individual debate completion
- **Does**:
  - Adds 10 points to winner's reputation_score
  - Increments winner's debates_won counter
  - Increments both participants' debates_participated

#### Data Flow
```
Judgment issued → debates.winner_id set, status='completed'
  ↓
debate_completed_reputation_update trigger fires
  ↓
update_reputation_after_debate() executes
  ↓
Winner's reputation_score += 10, debates_won += 1
Participants' debates_participated += 1
```

#### Vision Impact
- ❌ **REMOVE** - Incompatible with conversation-first vision
- Reputation and win/loss tracking are competitive metrics
- Conversation-first needs contribution quality metrics instead
- Would need complete replacement with new function(s)

#### Replacement Strategy
If contribution tracking is needed:
- Create `update_contribution_metrics()` function instead
- Track: messages_written, conversations_participated, learning_value (community feedback)
- Remove winner-based scoring entirely
- Use multi-dimensional feedback instead of binary win/loss

---

## AUTHORIZATION & SECURITY

### Row-Level Security (RLS) Overview

**All tables have RLS enabled:**
- `profiles`: `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;`
- `debates`: `ALTER TABLE debates ENABLE ROW LEVEL SECURITY;`
- `arguments`: `ALTER TABLE arguments ENABLE ROW LEVEL SECURITY;`
- `judgments`: `ALTER TABLE judgments ENABLE ROW LEVEL SECURITY;`

### Policy Summary

#### Profiles (3 policies)
| Policy | Action | Who | Condition |
|--------|--------|-----|-----------|
| "Public profiles are viewable by everyone" | SELECT | Everyone | Always true (public) |
| "Users can insert their own profile" | INSERT | Authenticated | auth.uid() = id |
| "Users can update their own profile" | UPDATE | Authenticated | auth.uid() = id |

#### Debates (3 policies)
| Policy | Action | Who | Condition |
|--------|--------|-----|-----------|
| "Debates are viewable by everyone" | SELECT | Everyone | Always true (public) |
| "Authenticated users can create debates" | INSERT | Authenticated | auth.uid() = created_by |
| "Participants can update their debates" | UPDATE | Participants | auth.uid() IN (created_by, for_participant, against_participant) |

#### Arguments (2 policies)
| Policy | Action | Who | Condition |
|--------|--------|-----|-----------|
| "Arguments are viewable by everyone" | SELECT | Everyone | Always true (public) |
| "Authenticated users can create arguments" | INSERT | Authenticated | auth.uid() = user_id |

#### Judgments (1 policy)
| Policy | Action | Who | Condition |
|--------|--------|-----|-----------|
| "Judgments are viewable by everyone" | SELECT | Everyone | Always true (public) |

### Missing RLS Policies

**Current gaps:**
- **No DELETE policies** on any table - Can data be deleted?
- **No UPDATE policies** on arguments - Can arguments be edited?
- **No UPDATE policies** on judgments - Immutable by design?
- **Debates UPDATE policy** allows participants to change ANY field, including status and winner_id

### Vision Impact on Authorization
- Need new RLS policies for conversations (multi-perspective participation)
- Need deletion policies (archive vs. delete semantics)
- Need edit permissions (who can edit messages after posting?)
- Need moderation policies (flagged content, moderator access)

---

## CONSTRAINTS & VALIDATIONS

### Primary Key Constraints
| Table | Column | Type | Constraint |
|-------|--------|------|-----------|
| profiles | id | UUID | PK + FK to auth.users |
| debates | id | UUID | PK (gen_random_uuid) |
| arguments | id | UUID | PK (gen_random_uuid) |
| judgments | id | UUID | PK (gen_random_uuid) |

### Foreign Key Constraints
| Table | Column | References | Action |
|-------|--------|-----------|--------|
| profiles | id | auth.users(id) | ON DELETE CASCADE |
| debates | created_by | profiles(id) | ON DELETE CASCADE |
| debates | for_participant | profiles(id) | ON DELETE SET NULL |
| debates | against_participant | profiles(id) | ON DELETE SET NULL |
| debates | winner_id | profiles(id) | ON DELETE SET NULL |
| arguments | debate_id | debates(id) | ON DELETE CASCADE |
| arguments | user_id | profiles(id) | ON DELETE CASCADE |
| judgments | debate_id | debates(id) | ON DELETE CASCADE |

### Check Constraints
| Table | Column | Constraint | Purpose |
|-------|--------|-----------|---------|
| profiles | username | LENGTH 3-30 | Ensure reasonable username length |
| debates | status | IN ('open', 'in_progress', 'completed') | Valid debate states |
| arguments | position | IN ('for', 'against') | Binary position only |
| judgments | winner_position | IN ('for', 'against', 'tie') | Valid judgment outcomes |

### Unique Constraints
| Table | Column | Type |
|-------|--------|------|
| profiles | username | UNIQUE |

---

## SUMMARY BY CATEGORY

### User Data Tables (1)
- ✅ **profiles**: User management, needs modifications to remove debate stats

### Content Tables (2)
- ❌ **debates**: Debate-specific, needs removal or major transformation
- 🔄 **arguments**: Can be adapted for conversations with restructuring

### Engagement Tables (1)
- ❌ **judgments**: Winner-based, fundamentally incompatible with collaborative vision

### Metadata Tables (0)
- Currently no tags, categories, topics, or labels table

### System Tables (0)
- No audit logs, error tracking, or system configuration tables

---

## GAPS & MISSING TABLES

### Not Yet Implemented
1. **Tags/Topics** - For categorizing conversations
2. **Categories** - For organizing conversations
3. **User Preferences** - For settings, notifications, privacy
4. **Follows/Subscriptions** - For following users or conversations
5. **Blocks** - For user blocking/moderation
6. **Moderation Logs** - For audit trail of moderation actions
7. **Feedback/Reactions** - For multi-dimensional response types
8. **Reading List** - For saved conversations
9. **Leaderboards** - (Currently using profiles table, should be separate)
10. **Analytics** - For usage tracking

---

## CRITICAL ISSUES SUMMARY

### High Priority
1. **Debate-specific structure**: debates table assumes binary pro/con, not multi-perspective
2. **Competitive metrics**: reputation_score, debates_won, delo_rating don't fit collaborative model
3. **Winner-based system**: judgments table declares winners, incompatible with dialogue
4. **Missing threaded messaging**: arguments table doesn't support message threading

### Medium Priority
1. **No topic/category system**: Can't organize conversations by subject
2. **No user preferences**: No settings for notifications, privacy, learning path
3. **No moderation support**: No way to flag, report, or moderate content
4. **Incomplete RLS**: Missing delete policies and edit permissions

### Low Priority
1. **No analytics tracking**: No usage or engagement metrics captured
2. **No saved/bookmarked items**: Users can't save conversations
3. **No social features**: Can't follow users or subscribe to topics
4. **Unused fields**: JSONB fields (fact_checks, scores) not integrated

---

## NEXT STEPS

See `schema-evolution-needed.md` for specific migration paths.
See `table-by-table-analysis.md` for per-table vision alignment.
See `data-migration-considerations.md` for data transition strategy.

