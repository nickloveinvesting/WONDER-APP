# Navigation Sidebar Migration

## Manual Steps Required

Before merging this PR, you need to delete the old debate routes:

```bash
cd /path/to/Philosophy-app
git checkout feature/navigation-sidebar-v2
git pull origin feature/navigation-sidebar-v2

# Delete old routes
rm -rf app/debates

# Commit the deletion
git add .
git commit -m "Remove old debate routes"
git push origin feature/navigation-sidebar-v2
```

## Why?

Next.js doesn't allow duplicate routes. We're moving from:
- `app/debates/` → `app/(authenticated)/debates/`

Both resolve to the same URL path, causing build errors.

## What Gets Deleted
- `app/debates/page.tsx`
- `app/debates/create/page.tsx`  
- `app/debates/[id]/page.tsx`
- `app/debates/[id]/DebateActions.tsx`

## What Gets Added
- `app/(authenticated)/layout.tsx` (new layout with sidebar)
- `app/(authenticated)/debates/page.tsx` (debates list)
- `app/(authenticated)/debates/create/page.tsx` (create debate)
- `app/(authenticated)/debates/[id]/page.tsx` (debate detail)
- `app/(authenticated)/debates/[id]/DebateActions.tsx` (actions component)
- `app/(authenticated)/profile/page.tsx` (new profile page)
- `app/(authenticated)/leaderboard/page.tsx` (new leaderboard)
- `components/Sidebar.tsx` (navigation sidebar)

After running the commands above, the build will succeed!
