"use client";

import { useEffect, useState } from "react";
import CursorKit from "@ri-dev/react-cursor-kit";
import type { CursorKitType } from "@ri-dev/react-cursor-kit";

const SCHOOL_CURSOR: CursorKitType = {
  innerSize: 8,
  innerColor: "#c9a96e",
  innerOpacity: 0.9,
  innerBorderRadius: "50%",
  outerSize: 40,
  outerColor: "#c9a96e",
  outerOpacity: 0.3,
  outerBorderWidth: 2,
  outerBorderStyle: "solid",
  outerBorderColor: "#c9a96e",
  outerBorderRadius: "50%",
  trailingSpeed: 0.07,
  showSystemCursor: false,
};

/**
 * SchoolCursor — custom cursor wrapper for the homepage.
 *
 * Renders a gold (#c9a96e) cursor with a larger trailing ring when
 * on the homepage. Gated behind prefers-reduced-motion: only renders
 * when the user hasn't requested reduced motion.
 *
 * SSR-safe: renders null on server, enables on client mount only
 * if motion is not reduced.
 */
export function SchoolCursor({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from external media query
      setEnabled(true);
    }
  }, []);

  if (!enabled) return <>{children}</>;

  return <CursorKit {...SCHOOL_CURSOR}>{children}</CursorKit>;
}
