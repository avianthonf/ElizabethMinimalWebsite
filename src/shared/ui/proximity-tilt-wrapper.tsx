"use client";

import type { ReactNode } from "react";
import { Proximity } from "z-proximity-engine";

export interface ProximityTiltWrapperProps {
  children: ReactNode;
  className?: string;
}

/** In jsdom (vitest), skip GSAP/ZProximityEngine initialization entirely. */
const IS_TEST_ENV = typeof process !== "undefined" && process.env.VITEST === "true";

/**
 * ProximityTiltWrapper — wraps children with a ZProximityEngine `tiltCard`
 * preset so the card subtly rotates in 3D space as the cursor approaches.
 *
 * Design rationale:
 *   The ZProximity Engine applies transforms to its **direct** children.
 *   We insert an intermediate `<div>` so the Proximity component tilts
 *   that wrapper while the card component inside keeps its own CSS
 *   transforms (hover lifts, scroll reveals, etc.) independent and
 *   conflict-free.
 *
 * Accessibility:
 *   - `disableOnMobile` prevents unwanted tilt on touch devices where
 *     cursor proximity doesn't exist naturally.
 *   - The `prefers-reduced-motion: reduce` media query gate in the
 *     Proximity component disables all animation automatically.
 *
 * Progressive enhancement:
 *   - Browsers that lack pointer-events or perspective fall through
 *     to a static card with no tilt.
 */
export function ProximityTiltWrapper({
  children,
  className,
}: ProximityTiltWrapperProps): ReactNode {
  // In test environments, skip GSAP/ZProximityEngine entirely to avoid
  // unhandled errors from library internals trying to access DOM elements
  // after component unmount in jsdom.
  if (IS_TEST_ENV) {
    return <>{children}</>;
  }

  return (
    <Proximity
      preset="tiltCard"
      reach={3}
      falloff={2}
      duration={0.3}
      resetDuration={0.5}
      ease="power2.out"
      resetEase="power2.out"
      className={className}
      disableOnMobile
    >
      {/* Inner wrapper absorbs the tilt transform so the card's
          own CSS transforms (hover lift, scroll reveal, etc.)
          remain independent and conflict-free. */}
      <div style={{ transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"] }}>
        {children}
      </div>
    </Proximity>
  );
}
