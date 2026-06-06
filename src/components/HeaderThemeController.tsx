"use client";

import { useEffect } from "react";

/**
 * Dynamically sets --header-color CSS variable based on which
 * [data-header-theme] element is closest to the viewport center.
 *
 * Works for both:
 *  - Vertical-scroll pages (IntersectionObserver fallback +
 *    scroll-driven rect check)
 *  - Horizontal-scroll pages (bounding rects reflect
 *    translate3d visual position, so centre-of-screen
 *    detection works identically)
 *
 * Markers:
 *   data-header-theme="light" → dark section bg → white header text
 *   data-header-theme="dark"  → light section bg → dark header text
 *   (no attribute)            → defaults to dark
 */

const HEADER_VAR = "--header-color";
const LIGHT_COLOR = "var(--s-color-surface)";
const DARK_COLOR = "var(--s-color-text)";
const ATTR = "[data-header-theme]";

function resolveTheme(theme: string | undefined): string {
  return theme === "light" ? LIGHT_COLOR : DARK_COLOR;
}

export function HeaderThemeController(): null {
  useEffect(() => {
    const root = document.documentElement;

    // ── Default ───────────────────────────────────────
    root.style.setProperty(HEADER_VAR, DARK_COLOR);

    // ── IntersectionObserver for vertical-scroll pages ─
    const header = document.querySelector<HTMLElement>("[data-header]");
    const headerHeight = header?.offsetHeight ?? 60;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const theme = (entry.target as HTMLElement).dataset.headerTheme;
            root.style.setProperty(HEADER_VAR, resolveTheme(theme));
            return; // first intersecting = closest to top
          }
        }
      },
      { rootMargin: `-${headerHeight}px 0px 0px 0px` },
    );

    const attrs = document.querySelectorAll(ATTR);
    attrs.forEach((el) => io.observe(el));

    // ── Scroll handler for horizontal-scroll pages ────
    // IntersectionObserver sees all sticky panels at top:0.
    // This handler checks bounding rects (post-transform) to
    // find the panel nearest the viewport horizontal centre.
    let ticking = false;

    function onScroll(): void {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const panels = document.querySelectorAll<HTMLElement>(ATTR);
        const viewportMidX = window.innerWidth / 2;
        const viewportMidY = window.innerHeight / 2;

        let best: HTMLElement | null = null;
        let bestDist = Infinity;

        panels.forEach((panel) => {
          const r = panel.getBoundingClientRect();

          // Panel must have meaningful presence in the viewport
          const visibleW = Math.min(r.right, window.innerWidth) - Math.max(r.left, 0);
          const visibleH = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
          if (visibleW <= 4 || visibleH <= 4) return;

          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dist = Math.hypot(cx - viewportMidX, cy - viewportMidY);

          if (dist < bestDist) {
            bestDist = dist;
            best = panel;
          }
        });

        if (best) {
          const el = best as HTMLElement;
          const theme = el.dataset.headerTheme;
          root.style.setProperty(HEADER_VAR, resolveTheme(theme));
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
