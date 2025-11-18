# Ponder Platform Testing Instructions

I need you to help me systematically test the new Ponder platform features. The platform has been transformed from a debate app into a Reddit-style community with quadrants, Snap/Zap voting, and private journals.

## Context: What Was Built

**Database changes applied:**
- Added quadrants (AI & Technology, Philosophy, Morality & Ethics, Economics & Society)
- Added Snap/Zap voting system with automatic count tracking
- Added private journal system with publish-to-community flow
- All migrations have been successfully applied to Supabase

**Key files to be aware of:**
- `/debates` - Main feed with quadrant navigation and voting
- `/debates/create` - Create post with quadrant selector
- `/journal` - Private journal list
- `/journal/new` - Create journal entry
- `/journal/[id]` - View/edit/publish journal entry

**Tech stack:**
- Next.js 15 App Router
- Supabase (PostgreSQL + Auth)
- TypeScript + React
- Project location: `/Users/nickfijimorris/Philosophy-app`

---

## Your Mission: Test All 6 Feature Sets

Please work through each test systematically, documenting what you find. If something breaks, investigate the error and suggest fixes.

---

### TEST 1: Quadrant Navigation & Filtering

**Steps:**
1. Navigate to `http://localhost:3000/debates` (or the deployed URL)
2. Look for left sidebar with 4 quadrant tabs
3. Verify you see:
   - "All Posts" tab
   - "AI & Technology" with Cpu icon
   - "Philosophy" with Lightbulb icon
   - "Morality & Ethics" with Heart icon
   - "Economics & Society" with TrendingUp icon
4. Click "AI & Technology"
5. Check URL updates to `/debates?quadrant=ai_technology`
6. Check feed filters (may be empty if no posts in that quadrant)
7. Click "All Posts" - should show all posts again
8. Try each quadrant tab

**What to verify:**
- [ ] Left sidebar renders correctly
- [ ] Clicking quadrants updates URL
- [ ] Feed filters by quadrant (or shows empty state)
- [ ] "All Posts" shows unfiltered feed
- [ ] Quadrant colors match their gradients

**Expected issues:**
- Empty states if no posts exist yet (this is fine)
- Need to create posts first (move to Test 3)

**If errors occur:**
- Check browser console for JavaScript errors
- Check that `QuadrantNav` component is rendering
- Verify debates table has `quadrant` column

---

### TEST 2: Snap/Zap Voting System

**Prerequisites:** You need at least one post to exist (create one first if needed via Test 3)

**Steps:**
1. Go to `/debates`
2. Find a post in the feed
3. Look for vertical voting column on left side of post
4. You should see:
   - Zap button (lightning bolt pointing up)
   - Net score number (colored: teal if positive, gray if zero, gray if negative)
   - Snap button (lightning bolt pointing down/rotated)
5. Click the Snap button (top lightning)
6. Number should increment by 1 immediately (optimistic update)
7. Click Snap again
8. Number should decrement by 1 (toggle off)
9. Click Zap button (bottom lightning)
10. Number should decrement by 1 (switch from Snap to Zap)
11. Refresh the page
12. Vote should persist (button should still be highlighted)

**What to verify:**
- [ ] Vote buttons render correctly
- [ ] Clicking Snap increases score
- [ ] Clicking same button again removes vote (toggle)
- [ ] Clicking opposite button switches vote
- [ ] Optimistic UI updates happen instantly
- [ ] Votes persist after page refresh
- [ ] Net score color coding works (teal for positive)
- [ ] Only one vote allowed per user per post

**Expected behavior:**
- First click Snap: score goes from 0 to +1 (or increases by 1)
- Second click Snap: score returns to previous (toggle off)
- Click Zap after Snap: score decreases by 2 (removes Snap, adds Zap)

**If errors occur:**
- Check browser console for errors
- Verify `post_votes` table exists
- Check RLS policies are enabled
- Verify triggers `update_post_vote_counts()` are working
- Look at `lib/actions/voting.ts` for server action errors

---

### TEST 3: Create Post with Quadrant Selection

**Steps:**
1. Go to `/debates/create`
2. You should see a quadrant selector with 4 visual buttons
3. Click "AI & Technology" button
4. Button should highlight with blue gradient
5. Fill in:
   - Title: "Testing AI consciousness discussion"
   - Description: "This is a test post to verify quadrants work"
6. Click "Create Post"
7. Should redirect to `/debates/[id]` (the new post detail page)
8. Post should have "AI & Technology" badge
9. Go back to `/debates`
10. Post should appear in feed
11. Go to `/debates?quadrant=ai_technology`
12. Post should appear in AI & Technology filtered view

**What to verify:**
- [ ] Quadrant selector renders with 4 options
- [ ] Selected quadrant highlights visually
- [ ] Form accepts title and description
- [ ] "Create Post" button works
- [ ] Redirects to post detail after creation
- [ ] Post appears in main feed
- [ ] Post appears in correct quadrant filter
- [ ] Badge shows correct quadrant name

**Test with multiple quadrants:**
- Create one post in each quadrant
- Verify each appears in correct filtered view
- Verify all appear in "All Posts" view

**If errors occur:**
- Check browser console
- Verify `debates` table has `quadrant` column
- Check if default value is set correctly
- Look at `/debates/create/page.tsx` for form errors

---

### TEST 4: Journal System (Create & View)

**Steps:**
1. Go to `/journal`
2. You should see:
   - "My Journal" header
   - "My Notes" default folder (auto-created on signup)
   - Empty state OR recent entries if any exist
   - "New Entry" button
3. Click "New Entry"
4. Should navigate to `/journal/new`
5. Fill in:
   - Title: "Test Journal Entry"
   - Content: "This is my private journal entry for testing. It should only be visible to me."
   - Tags: "test, philosophy, consciousness" (comma-separated)
6. Click "Save Entry"
7. Should redirect to `/journal/[id]` (entry detail page)
8. Verify you see:
   - Entry title
   - Entry content (formatted)
   - Tags displayed as badges
   - "🔒 Private" badge
   - "Edit Entry" button
   - "Publish to Community" button
9. Go back to `/journal`
10. Entry should appear in recent entries list

**What to verify:**
- [ ] Journal page renders
- [ ] Default folder "My Notes" exists
- [ ] "New Entry" button navigates correctly
- [ ] Editor accepts title, content, tags
- [ ] Save button creates entry
- [ ] Entry detail page shows all fields
- [ ] Entry appears in journal list
- [ ] Privacy badge shows (🔒 Private)
- [ ] Tags render correctly

**If errors occur:**
- Check if `journal_folders` table exists
- Check if default folder trigger ran on user signup
- Verify `journal_entries` table exists
- Check RLS policies (should only show user's own entries)
- Look at `/journal/new/page.tsx` for form errors

---

### TEST 5: Publish Flow (Journal → Community)

**Prerequisites:** Complete Test 4 first (need a journal entry)

**Steps:**
1. Go to `/journal`
2. Click on your test journal entry
3. Should see entry detail page
4. Click "Publish to Community" button
5. Modal should open with:
   - Title: "Publish to Community"
   - Quadrant selector (4 options)
   - Info box explaining what happens
   - "Publish Now" and "Cancel" buttons
6. Select "Philosophy" quadrant
7. Click "Publish Now"
8. Should redirect to `/debates/[id]` (the newly created post)
9. Verify:
   - Post title matches journal entry title
   - Post description matches journal entry content
   - Post is in "Philosophy" quadrant
   - Post has tags from journal entry
10. Go back to `/journal/[id]` (the original entry)
11. Verify:
    - "Published" badge appears with date
    - "Publish to Community" button is replaced with "View Published Post"
    - Entry is marked as published
12. Click "View Published Post"
13. Should navigate back to the public post

**What to verify:**
- [ ] "Publish to Community" button appears on unpublished entries
- [ ] Modal opens with quadrant selector
- [ ] Publishing creates a new post in debates table
- [ ] Post inherits title, content, tags from journal entry
- [ ] Post appears in selected quadrant
- [ ] Journal entry updates to show published status
- [ ] Link between journal entry and post is maintained
- [ ] Button changes to "View Published Post"
- [ ] Cannot publish same entry twice

**Test edge cases:**
- Try clicking "Publish to Community" on already published entry (should not show button)
- Try publishing to different quadrants

**If errors occur:**
- Check `publishJournalEntry` function in `/lib/actions/journal.ts`
- Verify `published_debate_id` column exists in `journal_entries`
- Check that debates table accepts all required fields
- Look for transaction errors in server logs

---

### TEST 6: Edit & Delete Journal Entry

**Prerequisites:** Have at least one journal entry (from Test 4)

**Steps for Edit:**
1. Go to `/journal/[id]` (view your test entry)
2. Click "Edit Entry" button
3. Should navigate to `/journal/[id]/edit`
4. You should see:
   - Pre-filled title
   - Pre-filled content
   - Pre-filled tags
   - "Save Changes" button
   - Delete icon in top-right
5. Modify the title to: "Test Journal Entry (EDITED)"
6. Add more content: "\n\nThis is additional content added during edit."
7. Click "Save Changes"
8. Should redirect back to `/journal/[id]`
9. Verify changes appear
10. Check "Updated" timestamp changed

**Steps for Delete:**
1. From entry detail page, click "Edit Entry"
2. Click the delete icon (trash can)
3. Confirmation modal should appear:
   - "Delete Entry?" heading
   - Warning text
   - "Delete Permanently" button (red)
   - "Cancel" button
4. Click "Cancel" - modal should close, nothing deleted
5. Click delete icon again
6. Click "Delete Permanently"
7. Should redirect to `/journal`
8. Entry should no longer appear in list

**What to verify:**
- [ ] Edit page loads with pre-filled data
- [ ] Can modify title, content, tags
- [ ] Save updates the entry
- [ ] Updated timestamp changes
- [ ] Delete icon appears
- [ ] Delete confirmation modal shows
- [ ] Cancel preserves entry
- [ ] Confirm deletes entry
- [ ] Redirects to journal list after delete
- [ ] Entry removed from database

**Test edge cases:**
- Try editing a published entry (should still work)
- Try deleting a published entry (should delete entry, post remains)

**If errors occur:**
- Check `updateJournalEntry` function in `/lib/actions/journal.ts`
- Check `deleteJournalEntry` function
- Verify RLS policies allow user to update/delete own entries
- Look at `/journal/[id]/edit/page.tsx` for form errors

---

## After Testing: Report Format

Please provide a structured report:

### ✅ Working Features
List all features that worked perfectly

### ⚠️ Issues Found
For each issue:
- Feature: [name]
- Severity: Critical / High / Medium / Low
- Description: [what went wrong]
- Steps to reproduce: [exact steps]
- Error message: [if any]
- Suggested fix: [if you have one]

### 📊 Test Summary
- Total tests: 6
- Passed: [X]
- Failed: [X]
- Blocked: [X]

### 🔍 Additional Observations
Anything else you noticed (UX issues, performance, design feedback, etc.)

---

## Troubleshooting Guide

**If pages don't load:**
- Check if dev server is running: `npm run dev`
- Check for TypeScript errors: `npm run build`
- Check browser console for errors

**If voting doesn't work:**
- Verify you're logged in
- Check browser console for 401/403 errors (authentication)
- Check Supabase logs for RLS policy errors

**If journal doesn't show entries:**
- Check if default folder was created (run query: `SELECT * FROM journal_folders WHERE user_id = 'your-user-id'`)
- Verify RLS policies on `journal_entries` table

**If publish doesn't work:**
- Check Supabase logs for foreign key errors
- Verify `debates` table accepts all required columns
- Check `published_debate_id` column exists

**If you need to reset:**
- Delete test posts: `DELETE FROM debates WHERE topic LIKE '%Test%'`
- Delete test entries: `DELETE FROM journal_entries WHERE title LIKE '%Test%'`
- Delete test votes: `DELETE FROM post_votes WHERE user_id = 'your-user-id'`

---

## Start Testing Now

Begin with Test 1 and work through systematically. Document everything you find. Good luck! 🚀
