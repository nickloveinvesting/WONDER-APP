#!/bin/bash
set -e

echo "🚀 Starting migration to navigation sidebar structure..."

# Step 1: Remove old routes
echo "📁 Removing old debate routes..."
rm -rf app/debates

# Step 2: Commit the deletion
echo "✅ Committing changes..."
git add .
git commit -m "fix: Remove old debate routes to prevent duplicate path conflicts"

# Step 3: Push changes
echo "⬆️  Pushing to GitHub..."
git push origin feature/navigation-sidebar-v2

echo "✅ Migration complete! Vercel will now deploy successfully."
echo "🌐 Check your Vercel dashboard for the preview deployment."
