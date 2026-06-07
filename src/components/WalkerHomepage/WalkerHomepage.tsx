"use client";

import { useIsDesktop } from "@/hooks/useIsDesktop";
import { WalkerHomepageDesktop } from "./WalkerHomepageDesktop";
import { WalkerHomepageVertical } from "./WalkerHomepageVertical";

/**
 * WalkerHomepage — orchestrator that routes between the horizontal desktop
 * layout (≥1100px) and the vertical mobile/tablet layout (<1100px).
 *
 * Using a split-component architecture keeps each branch thin and
 * testable. The “heavy” parts (HorizontalScroll, RAF loops, etc.) are
 * **completely skipped** on mobile.
 */
export function WalkerHomepage(): React.ReactNode {
  const isDesktop = useIsDesktop(1100);

  return isDesktop ? <WalkerHomepageDesktop /> : <WalkerHomepageVertical />;
}
