"use client";

import { SearchOverlay, useSearchOverlay } from "./SearchOverlay";

/**
 * GlobalSearchOverlay — render-once wrapper for the SearchOverlay.
 * Place in the root layout so search is available on every page.
 * Manages its own open/close state via the useSearchOverlay hook.
 */
export function GlobalSearchOverlay() {
  const { open, closeOverlay } = useSearchOverlay();
  return <SearchOverlay open={open} onClose={closeOverlay} />;
}
