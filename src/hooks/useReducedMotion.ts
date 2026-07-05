"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns true if the user has requested reduced motion
 * via their operating system preference.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const initialised = useRef(false);

  useEffect(() => {
    // First render: set initial value synchronously — no microtask needed.
    if (!initialised.current) {
      initialised.current = true;
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReduced(mq.matches);
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
