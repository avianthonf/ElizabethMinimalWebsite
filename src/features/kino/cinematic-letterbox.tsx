"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CinematicLetterbox — a cinematic opening on first homepage visit.
 *
 * Shows a horizontal letterbox (black bars) that open from center
 * to reveal the hero content. Uses a sessionStorage flag so the
 * effect only plays ONCE per browser session.
 *
 * Falls back to instant reveal when prefers-reduced-motion is active.
 * Fully CSS-driven: no runtime animation cost after the initial reveal.
 */
export function CinematicLetterbox({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    // Check if we've seen the animation this session
    let alreadySeen = false;
    try {
      if (sessionStorage.getItem("stelizabeths-letterbox-seen")) alreadySeen = true;
    } catch {
      /* unavailable */
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) alreadySeen = true;

    if (alreadySeen) {
      setRevealed(true);
      return;
    }

    // Trigger the CSS transition for the letterbox bars
    const container = containerRef.current;
    if (!container) return;

    const topBar = container.firstElementChild as HTMLElement | null;
    const bottomBar = topBar?.nextElementSibling as HTMLElement | null;
    const inner = bottomBar?.nextElementSibling as HTMLElement | null;

    requestAnimationFrame(() => {
      if (topBar) topBar.style.height = "0";
      if (bottomBar) bottomBar.style.height = "0";
      if (inner) inner.style.opacity = "1";
    });

    // Complete after transition
    const timeout = setTimeout(() => {
      setRevealed(true);
      try {
        sessionStorage.setItem("stelizabeths-letterbox-seen", "1");
      } catch {
        /* unavailable */
      }
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  // Already revealed — render normally
  if (revealed) return <>{children}</>;

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", overflow: "hidden", minHeight: "100dvh" }}
    >
      {/* Top bar */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "50vh",
          background: "var(--color-primary-navy, #1B2A4A)",
          zIndex: 10000,
          transition: "height 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "height",
        }}
      />
      {/* Bottom bar */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50vh",
          background: "var(--color-primary-navy, #1B2A4A)",
          zIndex: 10000,
          transition: "height 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "height",
        }}
      />
      {/* Content behind the letterbox */}
      <div style={{ opacity: 0, transition: "opacity 0.4s ease-in 0.3s" }}>{children}</div>
    </div>
  );
}
