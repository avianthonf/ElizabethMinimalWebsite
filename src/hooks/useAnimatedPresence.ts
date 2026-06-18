"use client";

import { useEffect, useRef, useState } from "react";

export interface UseAnimatedPresenceResult {
  /** Whether the element should be in the DOM */
  shouldRender: boolean;
  /** Whether the entrance animation should be playing */
  isAnimating: boolean;
  /** Incremented on each open to force remount of animation children */
  mountKey: number;
}

/**
 * Manages enter/exit animation lifecycle for conditionally-rendered overlays.
 *
 * The open/close sequence requires setState inside useEffect because the
 * animation timing is relative to paint — this is the canonical React pattern
 * for mount/unmount animation orchestration.
 *
 * - On open: insert into DOM → animate in on next paint
 * - On close: animate out → remove from DOM after exit duration
 */
export function useAnimatedPresence(
  isOpen: boolean,
  { exitDuration = 200 }: { exitDuration?: number } = {},
): UseAnimatedPresenceResult {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mountKey, setMountKey] = useState(0);
  const prevOpenRef = useRef(isOpen);

  // This effect intentionally sets state to orchestrate enter/exit animation
  // timing relative to paint cycles — the canonical React pattern for
  // mount/unmount animation sequences.
  useEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = isOpen;

    if (isOpen && !wasOpen) {
      // Enter sequence: insert → animate in on next paint
      setShouldRender(true);
      setMountKey((prev) => prev + 1);

      const raf = requestAnimationFrame(() => {
        const innerRaf = requestAnimationFrame(() => {
          setIsAnimating(true);
        });
        return () => cancelAnimationFrame(innerRaf);
      });
      return () => cancelAnimationFrame(raf);
    }

    if (!isOpen && wasOpen) {
      // Exit sequence: animate out → remove from DOM
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, exitDuration + 20); // buffer after CSS transition
      return () => clearTimeout(timer);
    }
  }, [isOpen, exitDuration]);

  return { shouldRender, isAnimating, mountKey };
}
