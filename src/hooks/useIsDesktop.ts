"use client";

import { useState, useEffect } from "react";

const DESKTOP_BREAKPOINT = 1100;

/**
 * SSR-safe hook that returns whether the viewport is at least
 * DESKTOP_BREAKPOINT pixels wide.
 *
 * - Defaults to `true` on the server to avoid hydration mismatches
 *   (desktop is the primary layout).
 * - Uses `window.matchMedia` for efficient, event-driven updates.
 * - Cleans up the listener on unmount.
 */
export function useIsDesktop(breakpoint = DESKTOP_BREAKPOINT): boolean {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);

    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };

    // Set initial value from the live query
    update(mql);

    // Listen for changes (e.g. resize, orientation)
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}
