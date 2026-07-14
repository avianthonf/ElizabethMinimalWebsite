"use client";

import { useScrollmeter } from "@scrollmeter/react";

/**
 * ReadingProgressBar — a fixed-position scroll progress bar in school colors.
 *
 * Uses @scrollmeter/react for lightweight scroll progress tracking.
 * School gold (#c9a96e) on transparent background.
 * Respects @scrollmeter's internal prefers-reduced-motion handling.
 * Place once in the (site) layout to cover all inner pages.
 */
export function ReadingProgressBar() {
  const { targetRef } = useScrollmeter<HTMLDivElement>({
    barOptions: {
      color: "#c9a96e",
      height: 3,
      background: "transparent",
    },
  });

  return (
    <div
      ref={targetRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "var(--announcement-height, 0px)",
        left: 0,
        width: "100%",
        zIndex: 10001,
        pointerEvents: "none",
        transition: "top 200ms ease",
      }}
    />
  );
}
