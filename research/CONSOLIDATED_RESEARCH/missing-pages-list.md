# Philosophy App - Missing Pages for Conversation-First Vision

**Last Updated:** 2025-11-14  
**Analysis:** Pages needed to support conversation-first philosophical platform  
**Current App Status:** Missing core conversation features

---

## Core Missing Pages (Critical)

### 1. Conversations List / Home Feed
- **Route Path:** `/conversations` or `/home`
- **Component Type:** Server Component
- **Priority:** CRITICAL - Default authenticated page
- **Purpose:** Main page after login - browse all conversations
- **Why Missing:**
  - Currently shows debates list, which is being removed
  - Needs to be landing page for authenticated users
  - Primary content discovery interface
- **Should Replace:** `/debates` page
- **Required Features:**
  - List of active conversations
  - Sort by: recent, most active, trending
  - Search conversations
  - Filter by topic/tag (if topics implemented)
  - Quick create conversation button
  - "Last activity" timestamp
  - Participant count
  - Brief preview of latest message
  - Status (active, archived)
  - Join button or "View" link
- **Database Dependencies:**
  - `conversations` table (new)
  - `messages` table (new)
  - `conversation_participants` table (new)
  - `profiles` table
- **UI Components Needed:**
  - ConversationCard component
  - SearchBar component
  - FilterTabs component
- **User Interactions:**
  - Click to enter conversation
  - Search/filter
  - Sort options
  - Create new

---

### 2. Conversation Detail Page (Thread View)
- **Route Path:** `/conversations/[id]`
- **Component Type:** Server Component with Client Components
- **Priority:** CRITICAL - Core feature
- **Purpose:** View single conversation thread and participate
- **Why Missing:**
  - Currently shows debate detail with FOR/AGAINST positions
  - Needs to support multi-party conversation model
  - Core interaction point for users
- **Should Replace:** `/debates/[id]` page
- **Required Features:**
  - Conversation topic and description
  - Full participant list (not two-sided)
  - Chronological message thread with:
    - Author name
    - Timestamp
    - Message content
    - Edit/delete for author only
  - Message submission form
  - Reply/threading capability (optional)
  - Related conversations section
  - Participant management (view, invite, remove for creator)
  - Archive/close conversation (for creator)
  - User profiles on hover
- **Database Dependencies:**
  - `conversations` table
  - `messages` table
  - `conversation_participants` table
  - `profiles` table
- **UI Components Needed:**
  - MessageThread component
  - MessageItem component
  - ParticipantList component
  - MessageForm component
  - RelatedConversations component
- **User Interactions:**
  - Write and submit message
  - Edit own message
  - Delete own message
  - View participant profiles
  - Join conversation (if not participant)
  - Leave conversation (except creator)
  - View message history

---

### 3. Start a Conversation Page
- **Route Path:** `/conversations/create`
- **Component Type:** Client Component
- **Priority:** CRITICAL - User-generated content
- **Purpose:** Form to create new conversations
- **Why Missing:**
  - Currently shows debate creation
  - Needs conversation-first form instead
  - No competitor/position model
- **Should Replace:** `/debates/create` page
- **Required Features:**
  - Conversation title field (required)
  - Description field (optional)
  - Topic tags/categories (optional):
    - Ethics, Metaphysics, Epistemology, Logic, Aesthetics
    - Politics, Social Philosophy, Philosophy of Mind
    - Other custom tags
  - Privacy setting:
    - Public (anyone can join)
    - Private (invite only)
  - Instructions explaining conversation model:
    - "Create a topic you want to explore"
    - "Others will join and share perspectives"
    - "Discuss, learn, and grow together"
    - "No winners - just meaningful dialogue"
  - Form validation
  - Preview conversation before creating
  - Submit and redirect to conversation page
- **Database Dependencies:**
  - `conversations` table (insert)
  - `profiles` table (get current user)
  - `conversation_participants` table (auto-add creator)
- **UI Components Needed:**
  - CategorySelect component
  - PrivacyToggle component
  - FormValidation
- **User Interactions:**
  - Fill form fields
  - Select categories
  - Choose privacy setting
  - Create conversation
  - Auto-join as creator

---

## Secondary Missing Pages (Important)

### 4. Community Directory / Members Page
- **Route Path:** `/community` or `/members`
- **Component Type:** Server Component
- **Priority:** HIGH - Replaces competitive leaderboard
- **Purpose:** Discover and connect with other community members
- **Why Missing:**
  - Currently shows competitive leaderboard with DeLO rating
  - Community-focused feature missing
  - No way to discover experts by topic
- **Should Replace:** `/leaderboard` page
- **Required Features:**
  - Searchable member directory
  - Filter by:
    - Topic of interest
    - Activity level
    - Expertise area
    - Join date
  - Member cards showing:
    - Avatar/profile picture
    - Username
    - Bio/about (short)
    - Topics of interest (tags)
    - Conversation count (not wins)
    - Message count (not rating)
    - Join date
    - Last active date
  - View profile link
  - Sort options:
    - Recently active
    - Most conversations
    - Joined recently
    - Alphabetical
  - Desktop table + mobile cards
  - No competitive ranking or "leaderboard" language
- **Database Dependencies:**
  - `profiles` table
  - `conversation_participants` table (for activity metrics)
  - `messages` table (for contribution count)
- **UI Components Needed:**
  - MemberCard component
  - MemberTable component
  - FilterPanel component
  - SearchBar component
- **Key Differences from Current Leaderboard:**
  - No DeLO rating
  - No win/loss record
  - No ranking numbers
  - Focus on expertise areas, not competition
  - Metrics focused on collaboration, not victory

---

### 5. User Profile - Public View
- **Route Path:** `/users/[username]` (new) or `/profile/[username]`
- **Component Type:** Server Component
- **Priority:** HIGH - Community feature
- **Purpose:** View other users' public profiles
- **Why Missing:**
  - Currently only own profile accessible
  - No way to learn about other community members
  - Needed for community building
- **Should Be Different From:**
  - Current `/profile` page (which is own profile)
  - This is VIEW OTHER USER PROFILE
- **Required Features:**
  - User info:
    - Username
    - Avatar
    - Bio
    - Topics of interest
    - Join date
  - Statistics:
    - Conversation count
    - Message count
    - Last active
    - Topics participated in
  - Activity feed:
    - Recent conversations (optional)
    - Recent messages (optional)
  - List of conversations they're in
  - "Send Message" button (if DMs implemented)
  - "Follow" button (if following implemented)
  - Privacy: Show only public data
- **Database Dependencies:**
  - `profiles` table
  - `conversation_participants` table
  - `messages` table
- **UI Components Needed:**
  - UserCard component
  - ActivityFeed component
  - ConversationList component
- **Security Considerations:**
  - Only show public profile data
  - Respect privacy settings
  - Don't expose private conversations

---

## Utility/Enhancement Pages (Important but Secondary)

### 6. Search / Discovery Page
- **Route Path:** `/search`
- **Component Type:** Server Component
- **Priority:** HIGH - Content discovery
- **Purpose:** Search conversations and members
- **Why Missing:**
  - Currently no search functionality
  - Users need way to find conversations on topics they care about
  - Growing community will need discovery tools
- **Features:**
  - Unified search box
  - Search conversations by:
    - Topic/title
    - Description content
    - Tags
  - Search members by:
    - Username
    - Bio
    - Expertise area
  - Filters:
    - Content type (conversation/member)
    - Date range
    - Activity level
    - Topic area
  - Results with:
    - Preview
    - Join/View buttons
    - Relevance ranking
- **Database Dependencies:**
  - `conversations` table (full-text search)
  - `messages` table (search content)
  - `profiles` table
- **Search Implementation:**
  - Consider Supabase full-text search
  - Or simple LIKE/ILIKE queries to start

---

### 7. Topics / Categories Page
- **Route Path:** `/topics`
- **Component Type:** Server Component
- **Priority:** MEDIUM - Organization feature
- **Purpose:** Browse conversations organized by philosophical topic
- **Why Missing:**
  - Currently no topic organization
  - Growing list of conversations needs categorization
  - Philosophy has natural topic divisions
- **Features:**
  - List of philosophical topics:
    - Ethics
    - Metaphysics
    - Epistemology
    - Logic
    - Aesthetics
    - Philosophy of Mind
    - Philosophy of Language
    - Social Philosophy
    - Political Philosophy
    - Other (custom)
  - For each topic:
    - Count of conversations
    - Count of participants
    - Recent conversations preview
    - "View all" link
  - Topic cards with:
    - Topic name
    - Description
    - Conversation count
    - Member count
  - Browse by topic
  - Create new conversation in specific topic
- **Database Dependencies:**
  - `conversations` table (filter by topic tags)
  - `profiles` table

---

### 8. Notifications Page
- **Route Path:** `/notifications`
- **Component Type:** Server Component
- **Priority:** MEDIUM - User engagement
- **Purpose:** View all platform notifications
- **Why Missing:**
  - Currently only stub in settings (UI, not functional)
  - Users need notifications for activity
  - Required for engagement
- **Features:**
  - Notification types:
    - New message in conversation you're in
    - Someone replied to your message
    - You were added to conversation
    - Someone started following you (if implemented)
  - Filter by type
  - Mark as read/unread
  - Delete notifications
  - Notification settings link
  - Chronological list
  - "Clear all" button
  - Unread count badge on nav
- **Database Dependencies:**
  - New `notifications` table
  - Notifications linked to users, conversations, messages
- **Related UI:**
  - Notification bell in header
  - Unread badge

---

### 9. User Settings - Profile Edit
- **Route Path:** `/settings/profile` or `/profile/edit`
- **Component Type:** Client Component
- **Priority:** HIGH - User needs
- **Purpose:** Edit user profile information
- **Why Missing:**
  - Currently only read-only profile view
  - Users need to update their information
  - No bio/avatar upload currently possible
- **Features:**
  - Edit fields:
    - Username (possibly locked after creation)
    - Display name
    - Bio/About (longer text)
    - Profile picture (optional avatar upload)
    - Email (maybe read-only from auth)
  - Topics of interest (multi-select):
    - Checkboxes for philosophical topics
    - Custom topic entry
  - Visibility settings:
    - Public profile toggle
    - Show email toggle
  - Save changes button
  - Confirm unsaved changes warning
  - Success message on save
- **Database Dependencies:**
  - `profiles` table (update)
  - File storage for avatar (optional)
- **UI Components Needed:**
  - FormFields component
  - TopicSelector component
  - AvatarUpload component (optional)

---

### 10. Help / FAQ Page
- **Route Path:** `/help` or `/faq`
- **Component Type:** Server Component
- **Priority:** LOW - Information only
- **Purpose:** Help users understand platform features
- **Why Missing:**
  - Currently no help resources
  - Users need guidance on conversation etiquette
  - Explains philosophy of platform
- **Features:**
  - FAQ sections:
    - Getting Started
    - Creating Conversations
    - Participating in Discussions
    - Community Guidelines
    - Technical Issues
    - Account Management
  - Expandable Q&A items
  - Search within FAQ
  - Contact/Report link
  - Video tutorials (optional future)
- **No database dependencies** - static content

---

### 11. Terms of Service / Privacy Policy
- **Route Path:** `/terms` and `/privacy`
- **Component Type:** Server Component
- **Priority:** LOW - Legal/Required
- **Purpose:** Legal documentation
- **Why Missing:**
  - Required for any real platform
  - User trust and legal protection
- **Features:**
  - Full text of policies
  - Consistent formatting
  - Link from footer
  - Accept on signup (checkbox)
- **No database dependencies** - static content

---

### 12. Contact / Report Issue
- **Route Path:** `/contact` or `/report`
- **Component Type:** Client Component or Form
- **Priority:** MEDIUM - Community moderation
- **Purpose:** Report problematic content/behavior
- **Why Missing:**
  - Currently no moderation/reporting system
  - Needed as community grows
  - User safety feature
- **Features:**
  - Report form with:
    - Report type (spam, offensive, off-topic, etc.)
    - Subject
    - Description
    - Link to content (conversation/message)
  - Contact form for feedback
  - Email submission to admins
  - Confirmation message
- **Database Dependencies:**
  - Optional `reports` table
  - Optional `feedback` table

---

## Missing Components (Supporting)

### Components Needed Across Multiple Pages

1. **MessageThread Component**
   - Renders conversation messages chronologically
   - Shows author, timestamp, content
   - Edit/delete options for author

2. **ConversationCard Component**
   - Displays conversation preview
   - Topic, description, participants, last activity
   - Used in list and search results

3. **ParticipantList Component**
   - Shows all participants in conversation
   - Links to profiles
   - Invite/remove buttons (for creator)

4. **MessageForm Component**
   - Textarea for message input
   - Submit button with loading state
   - Character count (optional)
   - Markdown preview (optional)

5. **TopicSelector Component**
   - Multi-select checkboxes for topics
   - Custom topic entry
   - Tag display

6. **SearchBar Component**
   - Search input with clear button
   - Autocomplete suggestions (optional)
   - Search history (optional)

7. **FilterPanel Component**
   - Filter options for directory/search
   - Collapsible on mobile
   - Apply/clear filters buttons

8. **UserCard Component**
   - User profile preview
   - Avatar, username, bio
   - Topics, activity metrics
   - View profile link

9. **NotificationBell Component**
   - Header navigation component
   - Unread count badge
   - Dropdown with recent notifications

10. **RelatedConversations Component**
    - "You might also like" suggestions
    - Based on topic similarity
    - Shows in detail page sidebar

---

## Priority Implementation Order

### Phase 1: Core Conversation Features (CRITICAL)
1. Conversation List Page (`/conversations`)
2. Conversation Detail Page (`/conversations/[id]`)
3. Create Conversation Page (`/conversations/create`)
4. MessageThread & related components
5. Database migration: debates → conversations

### Phase 2: Community & Discovery (HIGH)
1. Community Directory (`/community`)
2. Public User Profiles (`/users/[username]`)
3. Search Page (`/search`)
4. Related components

### Phase 3: User Experience (MEDIUM)
1. Profile Edit Page (`/settings/profile`)
2. Notifications Page (`/notifications`)
3. Topics Page (`/topics`)
4. Notification system with database

### Phase 4: Polish & Legal (LOW)
1. Help/FAQ Page
2. Terms of Service
3. Privacy Policy
4. Contact/Report system

---

## Database Schema for Missing Features

### Conversations Table (rename from debates)
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  topic_tags TEXT[],
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity TIMESTAMPTZ DEFAULT NOW()
);
```

### Messages Table (rename from arguments)
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  is_deleted BOOLEAN DEFAULT FALSE
);
```

### Conversation Participants Table (new)
```sql
CREATE TABLE conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(conversation_id, user_id)
);
```

### Notifications Table (new)
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  related_conversation_id UUID REFERENCES conversations(id),
  related_message_id UUID REFERENCES messages(id),
  related_user_id UUID REFERENCES profiles(id),
  content TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Reports Table (optional)
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL,
  related_message_id UUID REFERENCES messages(id),
  related_conversation_id UUID REFERENCES conversations(id),
  description TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);
```

---

## Summary Table: Current vs Required Pages

| Feature | Current | Status | Needed |
|---------|---------|--------|--------|
| Home/Default Page | /debates (to delete) | ❌ Exists wrong | ✅ `/conversations` |
| Conversation View | /debates/[id] (to delete) | ❌ Wrong model | ✅ `/conversations/[id]` |
| Create Content | /debates/create (to delete) | ❌ Wrong form | ✅ `/conversations/create` |
| Community Discovery | /leaderboard (to delete) | ❌ Competitive | ✅ `/community` |
| Member Profiles | Private only | ❌ Missing | ✅ `/users/[username]` |
| Search | None | ❌ Missing | ✅ `/search` |
| Topic Browser | None | ❌ Missing | ✅ `/topics` |
| Notifications | Settings only (stub) | ⚠️ Non-functional | ✅ `/notifications` |
| Profile Edit | None | ❌ Missing | ✅ `/settings/profile` |
| Help | None | ❌ Missing | ✅ `/help` |
| Legal | None | ❌ Missing | ✅ `/terms`, `/privacy` |
| Report | None | ❌ Missing | ⚠️ `/report` (Phase 4) |
| Authentication | `/auth/login`, `/auth/signup` | ✅ Good | ✅ Keep as-is |
| Settings | `/settings` | ⚠️ Partial | ✅ Enhance |
| Profile (own) | `/profile` | ⚠️ Old metrics | ⚠️ Update content |

