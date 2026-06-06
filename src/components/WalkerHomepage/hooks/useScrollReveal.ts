"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export interface UseScrollRevealReturn {
  /** Callback ref — attach to the element you want to observe */
  ref: (node: HTMLElement | null) => void;
  /** True once the element has intersected the viewport (one-shot) */
  isVisible: boolean;
}

/**
 * Per-element one-shot scroll reveal via IntersectionObserver.
 *
 * Each invocation creates an independent observer that fires once
 * when the observed element enters the viewport, then disconnects.
 * On filter change, React key remounts reset each card's observer.
 *
 * Falls back to showing the element immediately when
 * IntersectionObserver is unavailable (SSR / old browsers).
 */
export function useScrollReveal(threshold: number = 0.15): UseScrollRevealReturn {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasIntersectedRef = useRef(false);

  // Fallback: show immediately if IntersectionObserver isn't available
  const [supportsObserver] = useState(() => {
    if (typeof window === "undefined") return false;
    return "IntersectionObserver" in window;
  });

  // Immediately mark visible when observer isn't supported
  useEffect(() => {
    if (!supportsObserver && !hasIntersectedRef.current) {
      hasIntersectedRef.current = true;
      setIsVisible(true);
    }
  }, [supportsObserver]);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      // Disconnect previous observer (cleanup on node change)
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // Node was unmounted — nothing to do
      if (!node) return;

      // Already visible (e.g. no-observer fallback) — skip observing
      if (hasIntersectedRef.current) return;

      // If observer isn't supported, mark visible immediately
      if (!supportsObserver) {
        hasIntersectedRef.current = true;
        setIsVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              hasIntersectedRef.current = true;
              setIsVisible(true);
              observer.disconnect();
              observerRef.current = null;
            }
          });
        },
        {
          root: null, // browser viewport
          rootMargin: "0px 0px -40px 0px",
          threshold,
        },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [supportsObserver, threshold],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return { ref, isVisible };
}
