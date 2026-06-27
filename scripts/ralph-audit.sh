#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# Ralph Wiggum — Standalone Gap Audit (Phase 1 Only)
# ═══════════════════════════════════════════════════════════════════════════════
# Runs ONLY the discover phase — finds the largest gap without fixing it.
# Useful for understanding what needs to be done before committing to fixes.
#
# Usage:
#   ./scripts/ralph-audit.sh                    # Audit with default spec
#   ./scripts/ralph-audit.sh --spec docs/X.md   # Custom spec file
#   ./scripts/ralph-audit.sh --all              # Find ALL gaps (not just largest)
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SPEC_FILE="docs/HORIZONTAL_REDESIGN_SPEC.md"
PROGRESS_FILE=".pi/ralph-progress.md"
FIND_ALL=false
MODEL=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --spec)   SPEC_FILE="$2"; shift 2 ;;
    --all)    FIND_ALL=true; shift ;;
    --model)  MODEL="$2"; shift 2 ;;
    *)        shift ;;
  esac
done

# Build the prompt
if [[ "$FIND_ALL" == "true" ]]; then
  AUDIT_PROMPT="You are a Senior Staff Engineer performing a COMPREHENSIVE gap audit.

Read the specification at '${SPEC_FILE}' and the progress at '${PROGRESS_FILE}'.
Then audit the ENTIRE codebase against the spec and list ALL remaining gaps.

For each gap, provide:
- id, severity (critical/high/medium/low), file, element, description, current vs expected behavior, fix instructions.

Output as a JSON array of gaps inside a fenced code block. If no gaps remain, output an empty array.

Focus on: CSS properties, responsive breakpoints, mobile layout, scroll-snap, touch targets, viewport units, safe-area padding, flex-direction conflicts, missing media queries."
else
  AUDIT_PROMPT="You are a Senior Staff Engineer performing a gap audit.

Read the specification at '${SPEC_FILE}' and the progress at '${PROGRESS_FILE}'.
Then audit the codebase to find the SINGLE LARGEST gap.

Output a JSON object with: status (GAP_FOUND or NO_GAPS), gap details (id, severity, file, element, description, current vs expected, fix instructions), and rationale for why this is the largest gap."
fi

AUDIT_PROMPT="${AUDIT_PROMPT}

Read the actual source files (CSS modules, TSX components) to verify. Do NOT guess — confirm by reading the code."

echo "🔍 Running gap audit..."
echo "   Spec: ${SPEC_FILE}"
echo "   Mode: $(${FIND_ALL} && echo 'ALL gaps' || echo 'Largest gap only')"
echo ""

# Run PI
pi_args=("-p" "--no-session" "-a")
if [[ -n "$MODEL" ]]; then
  pi_args+=("--model" "$MODEL")
fi

echo "$AUDIT_PROMPT" | pi "${pi_args[@]}"
