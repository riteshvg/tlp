#!/bin/bash
# deploy.sh — build, commit, and deploy to Netlify
# Usage:
#   ./deploy.sh "your commit message"          — build + push + deploy
#   ./deploy.sh "your commit message" --draft  — build + push + deploy as draft (preview URL only)

set -e

MSG=${1:-"update site"}
DRAFT=${2:-""}

if [ "$DRAFT" != "--draft" ]; then
  echo "⚠️  Production deploy costs ~15 Netlify credits."
  read -p "   Proceed? (y/N) " confirm
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Cancelled. Use --draft for a free preview URL."
    exit 0
  fi
fi

echo "▶ Building site..."
hugo

echo "▶ Staging changes..."
git add content/ layouts/ static/ public/ config/ netlify.toml 2>/dev/null || true

if git diff --cached --quiet; then
  echo "  No changes to commit, skipping git step."
else
  echo "▶ Committing..."
  git commit -m "$MSG"

  echo "▶ Pushing to GitHub..."
  git push origin main
fi

echo "▶ Deploying to Netlify..."
if [ "$DRAFT" = "--draft" ]; then
  netlify deploy --dir=public
  echo "✔ Draft deployed — check the preview URL above."
else
  netlify deploy --prod --dir=public
  echo "✔ Live at https://www.thelearningproject.in"
fi
