"use client";

import { useEffect, useRef } from "react";

/**
 * Locks document body scroll when `isLocked` is true, and restores it
 * when `isLocked` becomes false or the component unmounts.
 *
 * Handles:
 * - Setting `overflow: hidden` on `document.body`
 * - Scrollbar width compensation via `paddingRight` to prevent layout shift
 * - Storing original inline styles and restoring them exactly on unlock
 */
export function useBodyScrollLock(isLocked: boolean): void {
  const originalStyleRef = useRef<{ overflow: string; paddingRight: string }>({
    overflow: "",
    paddingRight: "",
  });

  useEffect(() => {
    if (!isLocked) return;

    // ── Store original inline styles ──────────────────────────────

    originalStyleRef.current.overflow = document.body.style.overflow;
    originalStyleRef.current.paddingRight = document.body.style.paddingRight;

    // ── Calculate scrollbar width ─────────────────────────────────

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // ── Lock body scroll ──────────────────────────────────────────

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      const currentPadding =
        parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }

    // ── Restore on unlock or unmount ──────────────────────────────

    return () => {
      document.body.style.overflow = originalStyleRef.current.overflow;
      document.body.style.paddingRight =
        originalStyleRef.current.paddingRight;
    };
  }, [isLocked]);
}
