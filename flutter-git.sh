#!/bin/bash

set -e

BRANCH="feat/flutter-mobile"

echo "→ Switching to $BRANCH..."
git switch "$BRANCH"

echo "→ Syncing with origin..."
git pull --ff-only origin "$BRANCH"

echo "→ Staging changes..."
git add -A

echo
echo "Changes to commit:"
git status --short
echo

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

read -r -p "Commit message: " COMMIT_MESSAGE

if [ -z "$COMMIT_MESSAGE" ]; then
  echo "Commit cancelled: message cannot be empty."
  exit 1
fi

echo
echo "→ Creating commit..."
git commit -m "$COMMIT_MESSAGE"

echo "→ Pushing to $BRANCH..."
git push origin "$BRANCH"

echo
echo "✓ Flutter changes pushed successfully."
