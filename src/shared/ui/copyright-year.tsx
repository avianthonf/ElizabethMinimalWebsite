"use client";

import { useState } from "react";

/**
 * CopyrightYear — renders the current year.
 *
 * A client component so the year is always fresh at render time, avoiding
 * the build-time staleness of `new Date().getFullYear()` in static exports.
 *
 * Uses useState with a lazy initializer — the year is computed once during
 * the first render and never changes.  For static builds over year boundaries,
 * there will be a brief SSR hydration mismatch (server renders build year,
 * client hydrates with current year), but React handles this gracefully and
 * the correct year is shown after hydration.
 */
export function CopyrightYear() {
  const [year] = useState(() => new Date().getFullYear());
  return <>{year}</>;
}
