# Data Migration Considerations

**Date:** November 2025  
**Scope:** Transitioning from debate-centric to conversation-first data model  
**Focus:** Practical data handling, validation, and business continuity

---

## EXECUTIVE SUMMARY

### Current Data Volume
- **Profiles**: < 100 users
- **Debates**: < 10 debates
- **Arguments**: < 50 messages
- **Judgments**: 0 judgments
- **Total size**: < 1MB

### Migration Complexity
- **LOW** - Minimal current data makes migration straightforward
- No performance concerns
- Easy to test and verify
- Quick rollback possible if needed

### Key Consideration
**Because there's minimal user data and the platform is early, this is the IDEAL time to do a complete schema overhaul.** Users won't lose valuable history; the architecture aligns with the vision.

---

## DATA INVENTORY & MAPPING

### Profiles Table → Stay (with modifications)

**Current Data**: ~100 users

| Current Field | Status | Future |
|---|---|---|
| `id` | ✅ Keep | Same (UUID PK) |
| `username` | ✅ Keep | Same (unique) |
| `display_name` | ✅ Keep | Same |
| `bio` | ✅ Keep | Same |
| `reputation_score` | ❌ Remove | Delete from DB |
| `debates_won` | ❌ Remove | Delete from DB |
| `debates_participated` | ⚠️ Transform | → `conversations_participated_in` |
| `delo_rating` | ❌ Remove | Delete from DB |
| `created_at` | ✅ Keep | Same |
| `updated_at` | ✅ Keep | Same |

**Migration SQL**:
```sql
BEGIN TRANSACTION;

-- Step 1: Add new columns
ALTER TABLE profiles ADD COLUMN expertise_areas TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN learning_interests TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN profile_visibility TEXT DEFAULT 'public';
ALTER TABLE profiles ADD COLUMN preferred_conversation_depth TEXT DEFAULT 'exploratory';
ALTER TABLE profiles ADD COLUMN total_messages INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN conversations_initiated INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN conversations_participated_in INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN last_active_at TIMESTAMPTZ DEFAULT NOW();

-- Step 2: Populate derived columns (before deletion)
UPDATE profiles SET
  conversations_participated_in = debates_participated,
  total_messages = 0,  -- Will be updated from arguments table
  conversations_initiated = 0;  -- Will be updated from debates table

-- Step 3: Calculate total_messages from arguments
UPDATE profiles p SET
  total_messages = (
    SELECT COUNT(*) FROM arguments a WHERE a.user_id = p.id
  );

-- Step 4: Calculate conversations_initiated from debates
UPDATE profiles p SET
  conversations_initiated = (
    SELECT COUNT(*) FROM debates d WHERE d.created_by = p.id
  );

-- Step 5: Remove old competitive fields
ALTER TABLE profiles DROP COLUMN debates_won;
ALTER TABLE profiles DROP COLUMN debates_participated;
ALTER TABLE profiles DROP COLUMN reputation_score;
ALTER TABLE profiles DROP COLUMN delo_rating;

-- Step 6: Drop related index
DROP INDEX IF EXISTS profiles_delo_rating_idx;

COMMIT;
```

**Data Loss Assessment**: ❌ No data loss (reputation fields weren't being used; debates_participated calculated to conversations_participated_in)

---

### Debates Table → Conversations Table

**Current Data**: < 10 debates

| Current Field | Maps To | Transformation |
|---|---|---|
| `id` | `conversations.id` | 1:1 copy |
| `topic` | `conversations.title` | Rename field |
| `description` | `conversations.description` | 1:1 copy |
| `status` | `conversations.status` | Map enum values |
| `created_by` | `conversations.creator_id` | Rename field |
| `for_participant` | ❌ Deleted | Binary structure no longer applies |
| `against_participant` | ❌ Deleted | Binary structure no longer applies |
| `winner_id` | ❌ Deleted | Winner concept doesn't exist |
| `created_at` | `conversations.created_at` | 1:1 copy |
| `completed_at` | `conversations.archived_at` | Conditional mapping |

**Status Value Mapping**:
```
'open'        → 'active'       (conversation is ongoing)
'in_progress' → 'active'       (still ongoing)
'completed'   → 'archived'     (was judged/completed, now archived)
```

**Migration SQL**:
```sql
-- Create new table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  topic_id UUID,
  topic_tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active',
  conversation_type TEXT DEFAULT 'open_discussion',
  creator_id UUID NOT NULL,
  moderator_id UUID,
  perspectives_count INTEGER DEFAULT 0,
  messages_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  featured_until TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- Migrate data
INSERT INTO conversations (
  id, title, description, creator_id, created_at, updated_at,
  status, archived_at
)
SELECT 
  d.id,
  d.topic,
  d.description,
  d.created_by,
  d.created_at,
  d.created_at,  -- No update_at in old schema, use created_at
  CASE d.status 
    WHEN 'completed' THEN 'archived'
    WHEN 'open' THEN 'active'
    WHEN 'in_progress' THEN 'active'
    ELSE 'active'
  END,
  CASE WHEN d.status = 'completed' THEN d.completed_at ELSE NULL END
FROM debates d;

-- Update denormalized counts
UPDATE conversations c SET
  messages_count = (
    SELECT COUNT(*) FROM arguments a WHERE a.debate_id = c.id
  ),
  perspectives_count = (
    SELECT COUNT(DISTINCT position) FROM arguments a WHERE a.debate_id = c.id
  );
```

**Data Loss Assessment**: 
- ❌ No content loss (debate text, timestamps preserved)
- ⚠️ Participant association lost (for_participant, against_participant)
  - **Rationale**: Binary structure incompatible with multi-perspective model
  - **Mitigation**: All arguments preserved as conversation messages; participants implicit through messages
- ❌ Winner declared (winner_id) no longer relevant
  - **Rationale**: Conversation-first doesn't declare winners
  - **Mitigation**: If needed, data can be archived separately

---

### Arguments Table → Conversation_Messages Table

**Current Data**: < 50 arguments

| Current Field | Maps To | Transformation |
|---|---|---|
| `id` | `conversation_messages.id` | 1:1 copy |
| `debate_id` | `conversation_messages.conversation_id` | Rename field |
| `user_id` | `conversation_messages.user_id` | 1:1 copy |
| `position` | `conversation_messages.perspective_type` | Map enum values |
| `content` | `conversation_messages.content` | 1:1 copy |
| `round` | ❌ Deleted | Round numbering no longer needed |
| `created_at` | `conversation_messages.created_at` | 1:1 copy |

**Position → Perspective Type Mapping**:
```
'for'     → 'supporting'    (supports main thesis/position)
'against' → 'critical'      (critical analysis/alternative view)
NULL      → NULL            (no perspective specified)
```

**Migration SQL**:
```sql
-- Create new table
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  user_id UUID NOT NULL,
  parent_message_id UUID,
  content TEXT NOT NULL,
  perspective_type TEXT DEFAULT NULL,
  is_key_point BOOLEAN DEFAULT FALSE,
  is_revised BOOLEAN DEFAULT FALSE,
  reply_count INTEGER DEFAULT 0,
  quality_score DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- Migrate arguments
INSERT INTO conversation_messages (
  id, conversation_id, user_id, content, perspective_type, created_at
)
SELECT 
  a.id,
  a.debate_id,
  a.user_id,
  a.content,
  CASE a.position
    WHEN 'for' THEN 'supporting'
    WHEN 'against' THEN 'critical'
    ELSE NULL
  END,
  a.created_at
FROM arguments a;
```

**Data Loss Assessment**: 
- ❌ No content loss (message text, author, timestamps preserved)
- ⚠️ Round number lost
  - **Rationale**: Round-based debate structure incompatible with conversation threading
  - **Mitigation**: Chronological order preserved; if needed, parent_message_id can be inferred

---

### Judgments Table → Delete

**Current Data**: 0 judgments (table is empty)

**Migration**: Simply drop the table. No data to preserve.

```sql
DROP TABLE IF EXISTS judgments;
DROP FUNCTION IF EXISTS update_reputation_after_debate();
DROP TRIGGER IF EXISTS debate_completed_reputation_update ON debates;
```

**Data Loss Assessment**: ✅ No loss (table was empty)

---

## VALIDATION CHECKLIST

### Before Migration
- [ ] Backup all databases (via Supabase dashboard)
- [ ] Export debates, arguments, judgments to CSV (for reference)
- [ ] Document current data statistics:
  - User count
  - Debate count
  - Arguments per debate
  - Timestamps range
- [ ] Communicate with any active users about maintenance window

### During Migration
- [ ] Create new tables with correct schema
- [ ] Migrate profiles (add/modify columns)
- [ ] Migrate debates → conversations
- [ ] Migrate arguments → conversation_messages
- [ ] Verify foreign key relationships
- [ ] Test RLS policies
- [ ] Validate data integrity:
  - All IDs properly migrated
  - All timestamps intact
  - User associations preserved
  - Message content complete
- [ ] Check for orphaned records (shouldn't be any)

### After Migration
- [ ] Row counts match:
  ```sql
  -- Should match across old/new
  SELECT COUNT(*) FROM debates_backup;
  SELECT COUNT(*) FROM conversations;
  
  SELECT COUNT(*) FROM arguments_backup;
  SELECT COUNT(*) FROM conversation_messages;
  ```
- [ ] Sample data inspection
- [ ] Application testing against new schema
- [ ] Performance testing (indexes, queries)
- [ ] RLS policy testing
- [ ] Archive old tables (keep for 30 days)

---

## DATA INTEGRITY CHECKS

### Key Validation Queries

**Check 1: All conversations have creators**
```sql
SELECT COUNT(*) FROM conversations WHERE creator_id IS NULL;
-- Expected: 0
```

**Check 2: All messages have conversations**
```sql
SELECT COUNT(*) FROM conversation_messages 
WHERE conversation_id NOT IN (SELECT id FROM conversations);
-- Expected: 0
```

**Check 3: All messages have users**
```sql
SELECT COUNT(*) FROM conversation_messages 
WHERE user_id NOT IN (SELECT id FROM profiles);
-- Expected: 0
```

**Check 4: Message counts match**
```sql
-- Old way
SELECT COUNT(*) FROM arguments_backup;

-- New way  
SELECT COUNT(*) FROM conversation_messages;
-- Expected: Same number
```

**Check 5: User activity preserved**
```sql
SELECT COUNT(DISTINCT user_id) FROM arguments_backup;
SELECT COUNT(DISTINCT user_id) FROM conversation_messages;
-- Expected: Same number
```

**Check 6: Creator participation integrity**
```sql
-- Users who created debates should have messages
SELECT DISTINCT created_by FROM debates_backup
EXCEPT
SELECT DISTINCT user_id FROM arguments_backup;
-- Expected: Some difference OK (creators might not have posted args)
```

---

## ROLLBACK PROCEDURE

**If something goes wrong during migration:**

### Option 1: Restore from Backup (Recommended)
```bash
# Supabase dashboard → Project → Database → Backups
# Select backup from before migration, restore database
# Entire database returns to pre-migration state
```

### Option 2: Manual Rollback (if backup restore doesn't work)
```sql
BEGIN TRANSACTION;

-- Drop new tables
DROP TABLE IF EXISTS conversation_messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;

-- Restore old tables from backup
CREATE TABLE debates AS SELECT * FROM debates_backup;
CREATE TABLE arguments AS SELECT * FROM arguments_backup;
CREATE TABLE judgments AS SELECT * FROM judgments_backup;

-- Restore indexes
CREATE INDEX debates_status_idx ON debates(status);
CREATE INDEX debates_created_at_idx ON debates(created_at DESC);
CREATE INDEX arguments_debate_id_idx ON arguments(debate_id);
CREATE INDEX judgments_debate_id_idx ON judgments(debate_id);

-- Restore functions/triggers
-- [Rerun original migration SQL]

ROLLBACK;  -- Or COMMIT if you want to keep changes
```

---

## USER COMMUNICATION PLAN

### Before Migration
Email/notification to users:
```
Subject: Platform Maintenance - Brief Downtime Expected

We're updating our platform to better support philosophical conversations
(not competitive debates). This requires a brief maintenance window.

Expected downtime: [2-4 hours on DATE at TIME]
Impact: Platform will be read-only during this time

Your data:
- All your conversations and messages will be preserved
- User profiles remain unchanged
- No data loss expected

Questions? Contact us at [support email]
```

### After Migration
```
Subject: Welcome Back - Platform Updated!

We've migrated to a conversation-first model that better aligns with our
collaborative vision. Here's what changed:

Database changes:
- "Debates" are now "Conversations" (more inclusive term)
- Focus on multi-perspective dialogue, not winners/losers
- New feedback system (no competitive ratings)

Your profile:
- All your data preserved
- Competitive metrics (DeLO rating, debates won) removed
- New engagement tracking added

What works the same:
- Your username, bio, profile
- All your messages and conversations
- Access to all previous discussions

Coming soon:
- [List new features being built]
```

---

## TESTING STRATEGY

### Unit Tests (Per table)

**Profiles migration**:
- [ ] All existing profiles migrated
- [ ] Old competitive fields deleted
- [ ] New fields initialized with defaults
- [ ] Data integrity maintained (no NULL on required fields)

**Conversations migration**:
- [ ] All debates became conversations
- [ ] Status mapping correct ('completed' → 'archived')
- [ ] Creator relationships preserved
- [ ] No orphaned records
- [ ] Message count denormalization accurate

**Messages migration**:
- [ ] All arguments became messages
- [ ] Conversation relationships correct
- [ ] User relationships intact
- [ ] Perspective type mapping correct
- [ ] Content and timestamps preserved

**New tables**:
- [ ] Foreign keys work correctly
- [ ] Constraints enforced
- [ ] Default values applied
- [ ] Indexes function properly

### Integration Tests

**RLS Policies**:
- [ ] Public can see active conversations
- [ ] Only creators see drafts
- [ ] Users can create conversations
- [ ] Users can edit own messages
- [ ] Moderators can moderate

**Application Compatibility**:
- [ ] Can fetch conversations list
- [ ] Can fetch conversation messages
- [ ] Can create new conversation
- [ ] Can post message
- [ ] Can update profile
- [ ] Can view user profiles

**Data Relationships**:
- [ ] No orphaned messages
- [ ] No broken foreign keys
- [ ] Cascading deletes work
- [ ] Soft deletes honored

---

## POST-MIGRATION MAINTENANCE

### Week 1 After Migration
- Daily monitoring of error logs
- User feedback collection
- Performance monitoring
- Data consistency checks

### Week 2-4 After Migration
- Monitor for any lagging issues
- Update analytics/reporting
- Clean up backup data (if all stable)
- Document lessons learned

### Month 2+ After Migration
- Keep backups for 30 days minimum
- Monitor performance trends
- Prepare for next schema evolution

---

## BUSINESS CONTINUITY CONSIDERATIONS

### Minimal Disruption
- Low user count means minimal notification burden
- Small data volume means quick migration
- Few integrations means fewer things to break
- Can test thoroughly in advance

### Risk Mitigation
1. **Backup strategy**: Automatic Supabase backups
2. **Testing environment**: Migrate test data first
3. **Staging period**: Keep old tables for 1 week while new system runs
4. **Quick rollback**: Can restore from backup if critical issues

### User Impact
- **Uptime**: 2-4 hour maintenance window
- **Data loss**: None expected
- **Functionality**: Improved (new features enabled)
- **Performance**: Potentially faster (better indexes)

---

## FAQ & TROUBLESHOOTING

### Q: Will my data be lost?
**A:** No. All conversations and messages are being migrated with full fidelity. Only competitive metrics (debates won, DeLO rating) are being removed because they're incompatible with the new vision.

### Q: What happens to my debate history?
**A:** Your debates become conversations. All arguments you posted are still there as messages. The competitive framing (winner declared) is removed, but the discussion itself is preserved.

### Q: What about my DeLO rating?
**A:** The DeLO rating is being removed as part of the shift from competitive to collaborative. Focus is now on contribution quality (measured by community feedback) rather than competitive rank.

### Q: Why am I losing debates_won?
**A:** Because the conversation-first model doesn't have winners. Philosophy happens through dialogue, not through declarations of victory.

### Q: Can I see my old debates?
**A:** Yes! They're archived in the conversations table with status='archived'. You can read-only view them anytime.

### Q: How long will downtime take?
**A:** 2-4 hours depending on data volume and testing needs. Small dataset means quick migration.

### Q: What if something breaks?
**A:** We have backups and can restore instantly if anything goes critically wrong. We'll test thoroughly before migrating.

---

## SUCCESS METRICS

### Technical Success
- [ ] 100% of records migrated
- [ ] 0 data loss
- [ ] All RLS policies working
- [ ] Performance equal or better
- [ ] 0 orphaned records

### User Success
- [ ] 0 complaints about data loss
- [ ] Users can access their conversations
- [ ] New features functional
- [ ] Downtime < 4 hours
- [ ] Positive feedback on new model

