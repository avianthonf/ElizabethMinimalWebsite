import { useState, useLayoutEffect } from "react";

const DESKTOP_BREAKPOINT = 1100;

/**
 * SSR-safe hook that returns whether the viewport is at least
 * DESKTOP_BREAKPOINT pixels wide.
 *
 * Strategy:
 * - Defaults to `true` on the server (desktop-first SSR — the majority
 *   of visitors to a school website browse on laptops/desktops).
 * - Uses `useLayoutEffect` (not `useEffect`) so the correction to
 *   `false` on narrow viewports happens synchronously BEFORE the
 *   browser paints. This prevents a visible layout flash.
 * - The parent orchestrator adds `suppressHydrationWarning` on its
 *   root element since the server-rendered desktop layout's className
 *   differs from the client-corrected mobile layout's className.
 * - Uses `window.matchMedia` for efficient, event-driven updates.
 * - Cleans up the listener on unmount.
 */
export function useIsDesktop(breakpoint = DESKTOP_BREAKPOINT): boolean {
  const [isDesktop, setIsDesktop] = useState(true);

  useLayoutEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);

    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };

    // Set initial value from the live query (blocks paint)
    update(mql);

    // Listen for changes (e.g. resize, orientation)
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}
