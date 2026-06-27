#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# Ralph Wiggum Iterative Loop for PI Coding Agent
# ═══════════════════════════════════════════════════════════════════════════════
#
# Two-phase loop:
#   Phase 1 (DISCOVER) — Audit codebase against specs, find the LARGEST gap
#   Phase 2 (EXECUTE)  — Fix that one gap, commit, move on
#
# Usage:
#   ./scripts/ralph-wiggum-loop.sh                    # Run with defaults
#   ./scripts/ralph-wiggum-loop.sh --max-iter 20      # Limit iterations
#   ./scripts/ralph-wiggum-loop.sh --dry-run           # Audit only, no fixes
#   ./scripts/ralph-wiggum-loop.sh --spec docs/MY.md  # Custom spec file
#
# The loop terminates when:
#   - Phase 1 reports "NO GAPS" (all specs satisfied)
#   - Max iterations reached
#   - PI agent returns non-zero (error/abort)
#   - User sends SIGINT (Ctrl+C)
#
# Logs: logs/ralph-wiggum/YYYY-MM-DD_HH-MM-SS.log
# State: .pi/ralph-progress.md (persists across runs)
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

# ── Configuration ────────────────────────────────────────────────────────────
MAX_ITERATIONS=50
DRY_RUN=false
SPEC_FILE="docs/HORIZONTAL_REDESIGN_SPEC.md"
PROGRESS_FILE=".pi/ralph-progress.md"
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="${PROJECT_ROOT}/logs/ralph-wiggum"
TIMESTAMP="$(date +%Y-%m-%d_%H-%M-%S)"
LOG_FILE="${LOG_DIR}/${TIMESTAMP}.log"
MODEL=""  # Empty = use pi defaults; set to e.g. "claude-sonnet-4-20250514" to override

# ── Parse arguments ──────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case $1 in
    --max-iter)   MAX_ITERATIONS="$2"; shift 2 ;;
    --dry-run)    DRY_RUN=true; shift ;;
    --spec)       SPEC_FILE="$2"; shift 2 ;;
    --model)      MODEL="$2"; shift 2 ;;
    -h|--help)
      head -20 "$0" | tail -15
      exit 0
      ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# ── Setup ────────────────────────────────────────────────────────────────────
mkdir -p "$LOG_DIR"
mkdir -p "$(dirname "$PROJECT_ROOT/$PROGRESS_FILE")"

# Initialize progress file if missing
if [[ ! -f "$PROJECT_ROOT/$PROGRESS_FILE" ]]; then
  cat > "$PROJECT_ROOT/$PROGRESS_FILE" << 'EOF'
# Ralph Wiggum Progress

_Iterative improvement tracker. Updated automatically by the loop._

## Completed Iterations

(none yet)

## Current Status

- Gaps found: pending first audit
- Gaps fixed: 0
- Last iteration: —
EOF
fi

# ── Logging helpers ──────────────────────────────────────────────────────────
log() {
  local level="$1"; shift
  local msg="$*"
  local ts
  ts="$(date +%H:%M:%S)"
  local line="[${ts}] [${level}] ${msg}"
  echo "$line" | tee -a "$LOG_FILE"
}

log_section() {
  local title="$*"
  echo "" | tee -a "$LOG_FILE"
  echo "════════════════════════════════════════════════════════════════" | tee -a "$LOG_FILE"
  echo "  ${title}" | tee -a "$LOG_FILE"
  echo "════════════════════════════════════════════════════════════════" | tee -a "$LOG_FILE"
  echo "" | tee -a "$LOG_FILE"
}

run_pi() {
  local prompt="$1"
  local phase_label="$2"
  local iter_num="$3"
  local pi_args=("-p" "--no-session" "-a")

  if [[ -n "$MODEL" ]]; then
    pi_args+=("--model" "$MODEL")
  fi

  log "INFO" "Running PI (${phase_label}) — iteration ${iter_num}..."
  log "DEBUG" "Prompt length: ${#prompt} chars"

  local output
  local exit_code=0
  output=$(echo "$prompt" | pi "${pi_args[@]}" 2>>"$LOG_FILE") || exit_code=$?

  if [[ $exit_code -ne 0 ]]; then
    log "ERROR" "PI exited with code ${exit_code}"
    log "ERROR" "Output: ${output:0:500}"
    return $exit_code
  fi

  log "INFO" "PI returned ${#output} chars"
  echo "$output"
  return 0
}

# ── Git helpers ──────────────────────────────────────────────────────────────
git_stash_if_dirty() {
  if ! git diff --quiet HEAD 2>/dev/null || ! git diff --quiet --cached 2>/dev/null; then
    log "INFO" "Stashing uncommitted changes..."
    git stash push -m "ralph-wiggum-pre-iter-${ITERATION}" --quiet 2>>"$LOG_FILE"
    STASHED=true
  else
    STASHED=false
  fi
}

git_pop_stash() {
  if [[ "${STASHED:-false}" == "true" ]]; then
    log "INFO" "Restoring stashed changes..."
    git stash pop --quiet 2>>"$LOG_FILE" || true
  fi
}

git_commit_if_changed() {
  local msg="$1"
  if ! git diff --quiet HEAD 2>/dev/null || ! git diff --quiet --cached 2>/dev/null; then
    git add -A
    git commit -m "$msg" --quiet 2>>"$LOG_FILE"
    local sha
    sha="$(git rev-parse --short HEAD)"
    log "INFO" "Committed: ${sha} — ${msg}"
    return 0
  else
    log "INFO" "No changes to commit"
    return 1
  fi
}

# ── Trap for clean exit ──────────────────────────────────────────────────────
cleanup() {
  log "WARN" "Interrupted. Cleaning up..."
  git_pop_stash
  log "INFO" "Log saved to: ${LOG_FILE}"
  exit 130
}
trap cleanup SIGINT SIGTERM

# ═══════════════════════════════════════════════════════════════════════════════
#  MAIN LOOP
# ═══════════════════════════════════════════════════════════════════════════════

ITERATION=0
TOTAL_GAPS_FIXED=0

log_section "RALPH WIGGUM LOOP — STARTED"
log "INFO" "Project:    ${PROJECT_ROOT}"
log "INFO" "Spec:       ${SPEC_FILE}"
log "INFO" "Max iters:  ${MAX_ITERATIONS}"
log "INFO" "Dry run:    ${DRY_RUN}"
log "INFO" "Log file:   ${LOG_FILE}"
log "INFO" "Progress:   ${PROGRESS_FILE}"
log "INFO" "Model:      ${MODEL:-pi-default}"
echo ""

# Verify spec file exists
if [[ ! -f "${PROJECT_ROOT}/${SPEC_FILE}" ]]; then
  log "ERROR" "Spec file not found: ${SPEC_FILE}"
  log "ERROR" "Create the spec file first, or use --spec to specify one."
  exit 1
fi

while [[ $ITERATION -lt $MAX_ITERATIONS ]]; do
  ITERATION=$((ITERATION + 1))

  log_section "ITERATION ${ITERATION}/${MAX_ITERATIONS}"

  # ── Pre-flight ───────────────────────────────────────────────────────────
  log "INFO" "Pre-flight: checking git status..."
  git_stash_if_dirty

  # ═════════════════════════════════════════════════════════════════════════
  #  PHASE 1: DISCOVER — Find the largest gap
  # ═════════════════════════════════════════════════════════════════════════
  log_section "PHASE 1: DISCOVER — Finding largest gap"

  DISCOVER_PROMPT="You are a Senior Staff Engineer performing a gap audit.

## Your Task
Read the specification file at '${SPEC_FILE}' and the progress file at '${PROGRESS_FILE}'.
Then audit the codebase to find the SINGLE LARGEST gap between the spec and current state.

## Rules
1. Read the spec file FIRST to understand what the target state should be.
2. Read the progress file to see what has ALREADY been fixed.
3. Examine the actual source code (CSS, TSX, component files) to find what DOESN'T match the spec yet.
4. Prioritize gaps by IMPACT — the gap that, if fixed, would improve the experience the most.
5. Focus on ONE gap only — the biggest one.
6. Consider: missing CSS rules, wrong flex-direction on mobile, missing responsive breakpoints, elements that should stack but don't, missing scroll-snap, missing touch targets, missing safe-area padding, wrong viewport units, etc.

## Output Format
Write your findings as a JSON block inside a fenced code block. The JSON must have this exact structure:

\`\`\`json
{
  \"status\": \"GAP_FOUND\" | \"NO_GAPS\",
  \"gap\": {
    \"id\": \"unique-slug\",
    \"severity\": \"critical\" | \"high\" | \"medium\" | \"low\",
    \"file\": \"path/to/file.tsx or path/to/file.module.css\",
    \"element\": \"CSS selector or component name\",
    \"description\": \"What is wrong in plain English\",
    \"current_behavior\": \"What happens now\",
    \"expected_behavior\": \"What should happen per the spec\",
    \"fix_instructions\": \"Exact steps to fix this — be specific about what CSS properties to add/change and where\"
  },
  \"rationale\": \"Why THIS gap is the largest — what makes it more impactful than other gaps\"
}
\`\`\`

If ALL gaps from the spec are already fixed, output:
\`\`\`json
{
  \"status\": \"NO_GAPS\",
  \"summary\": \"Brief description of what was verified as complete\"
}
\`\`\`

## Important
- Do NOT fix anything. Only find and report.
- Do NOT create or modify files. Only read and analyze.
- Be specific — vague gaps are not actionable.
- The fix_instructions must be detailed enough for another agent to execute without ambiguity."

  DISCOVER_OUTPUT=$(run_pi "$DISCOVER_PROMPT" "DISCOVER" "$ITERATION") || {
    log "ERROR" "Phase 1 failed. Retrying next iteration..."
    git_pop_stash
    sleep 5
    continue
  }

  # Parse the JSON output
  GAP_STATUS=$(echo "$DISCOVER_OUTPUT" | grep -o '"status"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"status"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')

  if [[ -z "$GAP_STATUS" ]]; then
    # Try to extract from code block
    GAP_STATUS=$(echo "$DISCOVER_OUTPUT" | sed -n '/```json/,/```/{/```/d;p}' | grep -o '"status"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
  fi

  log "INFO" "Phase 1 result: ${GAP_STATUS:-PARSE_FAILED}"

  if [[ "$GAP_STATUS" == "NO_GAPS" ]]; then
    log_section "🎉 ALL GAPS RESOLVED"
    log "INFO" "The spec is fully satisfied. Loop complete."
    log "INFO" "Total iterations: ${ITERATION}"
    log "INFO" "Total gaps fixed: ${TOTAL_GAPS_FIXED}"

    # Save final status
    cat >> "$PROJECT_ROOT/$PROGRESS_FILE" << EOF

---

### Loop completed — ${TIMESTAMP}
- Status: ALL GAPS RESOLVED
- Iterations: ${ITERATION}
- Gaps fixed: ${TOTAL_GAPS_FIXED}
EOF
    break
  fi

  if [[ "$GAP_STATUS" != "GAP_FOUND" ]]; then
    log "WARN" "Could not parse Phase 1 output. Saving raw output for inspection."
    echo "$DISCOVER_OUTPUT" > "${LOG_DIR}/${TIMESTAMP}_iter${ITERATION}_discover_raw.txt"
    log "WARN" "Raw output saved to: ${LOG_DIR}/${TIMESTAMP}_iter${ITERATION}_discover_raw.txt"
    git_pop_stash
    sleep 3
    continue
  fi

  # Extract gap details for logging
  GAP_ID=$(echo "$DISCOVER_OUTPUT" | sed -n '/```json/,/```/{/```/d;p}' | grep -o '"id"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
  GAP_SEVERITY=$(echo "$DISCOVER_OUTPUT" | sed -n '/```json/,/```/{/```/d;p}' | grep -o '"severity"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
  GAP_FILE=$(echo "$DISCOVER_OUTPUT" | sed -n '/```json/,/```/{/```/d;p}' | grep -o '"file"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)".*/\1/')
  GAP_ELEMENT=$(echo "$DISCOVER_OUTPUT" | sed -n '/```json/,/```/{/```/d;p}' | grep -o '"element"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)".*/\1/')

  log "INFO" "Largest gap identified:"
  log "INFO" "  ID:         ${GAP_ID:-unknown}"
  log "INFO" "  Severity:   ${GAP_SEVERITY:-unknown}"
  log "INFO" "  File:       ${GAP_FILE:-unknown}"
  log "INFO" "  Element:    ${GAP_ELEMENT:-unknown}"

  # Save full discovery output
  echo "$DISCOVER_OUTPUT" > "${LOG_DIR}/${TIMESTAMP}_iter${ITERATION}_discover.txt"
  log "INFO" "Full discovery saved to: ${LOG_DIR}/${TIMESTAMP}_iter${ITERATION}_discover.txt"

  # If dry run, skip Phase 2
  if [[ "$DRY_RUN" == "true" ]]; then
    log "INFO" "Dry run mode — skipping Phase 2"
    git_pop_stash
    continue
  fi

  # ═════════════════════════════════════════════════════════════════════════
  #  PHASE 2: EXECUTE — Fix the largest gap
  # ═════════════════════════════════════════════════════════════════════════
  log_section "PHASE 2: EXECUTE — Fixing gap: ${GAP_ID}"

  # Extract fix instructions from the discovery output
  FIX_INSTRUCTIONS=$(echo "$DISCOVER_OUTPUT" | sed -n '/```json/,/```/{/```/d;p}' | grep -o '"fix_instructions"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"fix_instructions"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')

  EXECUTE_PROMPT="You are a Senior Staff Engineer executing a targeted fix.

## Context
The gap audit found ONE specific gap to fix. Here is the full audit:

${DISCOVER_OUTPUT}

## Your Task
Execute the fix described in the audit. Follow these steps:

1. Read the file(s) identified in the gap to understand the current code.
2. Apply the fix as described in fix_instructions.
3. Verify the fix by reading the file again and confirming the change is correct.
4. Run \`npm run typecheck\` to verify TypeScript compiles.
5. Run \`npm run lint\` to verify no lint errors (warnings are OK).
6. Run \`npm run test -- --passWithNoTests\` to verify tests pass.

## Rules
1. Make ONLY the changes described in fix_instructions. Do not refactor or improve anything else.
2. Use the existing design token system (--s-color-*, --p-color-*, --text-scale, etc.).
3. Use CSS Modules (existing pattern), not inline styles or utility classes.
4. Include @media (max-width: 760px) overrides for mobile.
5. Include env(safe-area-inset-bottom) for mobile bottom padding.
6. Include min-height: 100dvh for mobile panel heights.
7. Respect prefers-reduced-motion: reduce.
8. Do NOT modify desktop behavior (≥1100px).
9. Do NOT change any test files.
10. Do NOT commit — I will commit after verifying.

## Output Format
After completing the fix, output a summary:

\`\`\`json
{
  \"status\": \"FIXED\" | \"FAILED\",
  \"gap_id\": \"${GAP_ID}\",
  \"files_changed\": [\"list\", \"of\", \"files\"],
  \"summary\": \"Brief description of what was changed\",
  \"verification\": {
    \"typecheck\": \"pass\" | \"fail\",
    \"lint\": \"pass\" | \"fail\",
    \"tests\": \"pass\" | \"fail\"
  }
}
\`\`\`

If the fix cannot be completed (e.g., tests fail, typecheck fails), output FAILED with details."

  EXECUTE_OUTPUT=$(run_pi "$EXECUTE_PROMPT" "EXECUTE" "$ITERATION") || {
    log "ERROR" "Phase 2 failed. Rolling back..."
    git checkout -- . 2>>"$LOG_FILE" || true
    git_pop_stash
    sleep 5
    continue
  }

  # Save execution output
  echo "$EXECUTE_OUTPUT" > "${LOG_DIR}/${TIMESTAMP}_iter${ITERATION}_execute.txt"
  log "INFO" "Full execution output saved to: ${LOG_DIR}/${TIMESTAMP}_iter${ITERATION}_execute.txt"

  # Parse execution result
  EXEC_STATUS=$(echo "$EXECUTE_OUTPUT" | sed -n '/```json/,/```/{/```/d;p}' | grep -o '"status"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)".*/\1/')

  if [[ "$EXEC_STATUS" == "FIXED" ]]; then
    log "INFO" "Phase 2: Fix applied successfully"

    # Commit the fix
    COMMIT_MSG="ralph: fix ${GAP_ID} (iter ${ITERATION}/${MAX_ITERATIONS})

Gap: ${GAP_ELEMENT} in ${GAP_FILE}
Severity: ${GAP_SEVERITY}
Spec: ${SPEC_FILE}"
    git_commit_if_changed "$COMMIT_MSG" && {
      TOTAL_GAPS_FIXED=$((TOTAL_GAPS_FIXED + 1))
      log "INFO" "Gap ${GAP_ID} committed and counted."
    }

    # Update progress file
    cat >> "$PROJECT_ROOT/$PROGRESS_FILE" << EOF

### Iteration ${ITERATION} — $(date +%Y-%m-%d\ %H:%M)
- **Gap:** ${GAP_ID} (${GAP_SEVERITY})
- **File:** ${GAP_FILE}
- **Element:** ${GAP_ELEMENT}
- **Status:** FIXED ✅
- **Commit:** $(git rev-parse --short HEAD)
EOF
    log "INFO" "Progress file updated."

  else
    log "WARN" "Phase 2: Fix failed or verification failed"
    log "WARN" "Rolling back changes..."

    # Rollback
    git checkout -- . 2>>"$LOG_FILE" || true

    # Update progress file with failure
    cat >> "$PROJECT_ROOT/$PROGRESS_FILE" << EOF

### Iteration ${ITERATION} — $(date +%Y-%m-%d\ %H:%M)
- **Gap:** ${GAP_ID} (${GAP_SEVERITY})
- **File:** ${GAP_FILE}
- **Element:** ${GAP_ELEMENT}
- **Status:** FAILED ❌ (will retry)
EOF
  fi

  git_pop_stash

  # Brief pause between iterations to avoid rate limiting
  sleep 2
done

# ── Final summary ────────────────────────────────────────────────────────────
log_section "LOOP COMPLETE"
log "INFO" "Iterations:  ${ITERATION}/${MAX_ITERATIONS}"
log "INFO" "Gaps fixed:  ${TOTAL_GAPS_FIXED}"
log "INFO" "Log file:    ${LOG_FILE}"
log "INFO" "Progress:    ${PROGRESS_FILE}"

if [[ $ITERATION -ge $MAX_ITERATIONS ]]; then
  log "WARN" "Hit max iterations. Review remaining gaps manually."
fi

echo ""
echo "📊 Summary:"
echo "   Iterations: ${ITERATION}"
echo "   Gaps fixed: ${TOTAL_GAPS_FIXED}"
echo "   Log:        ${LOG_FILE}"
echo "   Progress:   ${PROGRESS_FILE}"
