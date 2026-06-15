"use client";

import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useMenuState } from "./hooks/useMenuState";
import { WalkerHomepageDesktop } from "./WalkerHomepageDesktop";
import { WalkerHomepageVertical } from "./WalkerHomepageVertical";

/**
 * WalkerHomepage — orchestrator that routes between the horizontal desktop
 * layout (≥1100px) and the vertical mobile/tablet layout (<1100px).
 *
 * Using a split-component architecture keeps each branch thin and
 * testable. The "heavy" parts (HorizontalScroll, RAF loops, etc.) are
 * **completely skipped** on mobile.
 *
 * `useMenuState` is lifted here so both branches share a single
 * menu state instance. The `useIsDesktop` hook defaults to `true`
 * for desktop-first SSR; `useLayoutEffect` corrects to `false` on
 * narrow viewports before paint, and `suppressHydrationWarning` on
 * each branch's root <main> prevents React hydration warnings.
 */
export function WalkerHomepage(): React.ReactNode {
  const isDesktop = useIsDesktop(1100);
  const menu = useMenuState();

  return isDesktop
    ? <WalkerHomepageDesktop menu={menu} />
    : <WalkerHomepageVertical menu={menu} />;
}
