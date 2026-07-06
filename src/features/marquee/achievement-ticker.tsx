"use client";

import Marquee from "react-fast-marquee";

interface AchievementTickerProps {
  items: string[];
  speed?: number;
}

const GOLD_BULLET = (
  <span aria-hidden="true" style={{ color: "var(--color-accent-gold, #c9a96e)", margin: "0 12px" }}>
    ◆
  </span>
);

/**
 * AchievementTicker — a horizontally scrolling ticker of school
 * achievements rendered below the CounterBar on the homepage.
 *
 * Uses react-fast-marquee for GPU-accelerated CSS animation.
 * Respects prefers-reduced-motion — pauses when reduced-motion is preferred.
 */
export function AchievementTicker({ items, speed = 35 }: AchievementTickerProps) {
  return (
    <div
      style={{
        background: "var(--color-primary-navy, #1B2A4A)",
        padding: "12px 0",
        borderTop: "2px solid var(--color-accent-gold, #c9a96e)",
        borderBottom: "2px solid var(--color-accent-gold, #c9a96e)",
      }}
    >
      <Marquee speed={speed} gradient={false} pauseOnHover style={{ maxWidth: "100%" }}>
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              color: "var(--color-surface-paper, #FFFAF0)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {GOLD_BULLET}
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
