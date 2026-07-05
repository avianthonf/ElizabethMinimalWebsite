"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

/**
 * SmoothScrollProvider — native scroll only.
 *
 * Originally wrapped the app in Lenis for smooth scrolling, but Lenis
 * was removed because:
 *  1. It created wrapper/content DOM elements that interfered with
 *     `<main>`, `position: fixed` header, and scroll-reveal animations.
 *  2. It transformed scroll via `translate3d()`, which broke
 *     `IntersectionObserver`-based animations in `ScrollReveal`.
 *  3. Native browser smooth scroll is good enough for a content site.
 *
 * This component now only sets `scroll-behavior: smooth` on the html
 * element when the user has NOT requested reduced motion, and respects
 * the user's OS-level setting.
 *
 * The `children` pass-through is a no-op wrapper that exists for
 * backward compatibility with the import in `app/layout.tsx`.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const html = document.documentElement;

    const apply = (matches: boolean) => {
      if (matches) {
        html.style.scrollBehavior = "auto";
      } else {
        html.style.scrollBehavior = "smooth";
      }
    };

    apply(mq.matches);
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
      html.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
