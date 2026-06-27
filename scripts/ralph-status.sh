#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# Ralph Wiggum — Status Viewer
# ═══════════════════════════════════════════════════════════════════════════════
# Shows the current state of the iterative loop:
#   - Progress file (what's been fixed)
#   - Recent git log (commits from the loop)
#   - Latest log file (what happened)
#
# Usage:
#   ./scripts/ralph-status.sh              # Show all status
#   ./scripts/ralph-status.sh --progress   # Show progress file only
#   ./scripts/ralph-status.sh --log        # Show latest log tail
#   ./scripts/ralph-status.sh --git        # Show ralph commits only
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROGRESS_FILE="${PROJECT_ROOT}/.pi/ralph-progress.md"
LOG_DIR="${PROJECT_ROOT}/logs/ralph-wiggum"

show_progress() {
  if [[ -f "$PROGRESS_FILE" ]]; then
    echo "📋 PROGRESS FILE"
    echo "────────────────────────────────────────"
    cat "$PROGRESS_FILE"
    echo ""
  else
    echo "📋 No progress file found. Run the loop first."
    echo ""
  fi
}

show_log() {
  local latest
  latest=$(ls -t "$LOG_DIR"/*.log 2>/dev/null | head -1)
  if [[ -n "$latest" ]]; then
    echo "📝 LATEST LOG: $(basename "$latest")"
    echo "────────────────────────────────────────"
    tail -40 "$latest"
    echo ""
  else
    echo "📝 No log files found."
    echo ""
  fi
}

show_git() {
  echo "🔀 RALPH COMMITS"
  echo "────────────────────────────────────────"
  local count
  count=$(git -C "$PROJECT_ROOT" log --oneline --grep="ralph:" --format="%h %s" 2>/dev/null | wc -l | tr -d ' ')
  if [[ "$count" -gt 0 ]]; then
    git -C "$PROJECT_ROOT" log --oneline --grep="ralph:" --format="%C(yellow)%h%C(reset) %s" 2>/dev/null | head -20
    echo ""
    echo "  Total: ${count} commits"
  else
    echo "  No ralph commits found."
  fi
  echo ""
}

# Parse args
MODE="${1:-all}"
case "$MODE" in
  --progress) show_progress ;;
  --log)      show_log ;;
  --git)      show_git ;;
  *)
    show_progress
    show_git
    show_log
    ;;
esac
