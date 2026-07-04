/**
 * Shared scroll-lock utility with reference counting.
 *
 * Multiple components (MenuOverlay, SearchOverlay) may independently
 * request scroll-lock.  The body scroll stays locked as long as at
 * least one lock is active — closing one overlay doesn't accidentally
 * unlock scroll that another overlay needs.
 */

let lockCount = 0;
let previousOverflow: string | null = null;

export function lockBodyScroll(): void {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockCount++;
}

export function unlockBodyScroll(): void {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0 && previousOverflow !== null) {
    document.body.style.overflow = previousOverflow;
    previousOverflow = null;
  }
}

/**
 * Fetch the current scroll-lock ref count — useful for debugging.
 * Not used in production code paths.
 */
export function getScrollLockCount(): number {
  return lockCount;
}
