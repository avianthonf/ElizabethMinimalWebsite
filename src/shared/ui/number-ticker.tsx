"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion";
import styles from "./number-ticker.module.css";

interface NumberTickerProps {
  value: number;
  duration?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Animated number counter using Motion's imperative `animate()`.
 *
 * Motion's `animate()` is hardware-accelerated and frame-accurate.
 * When `prefers-reduced-motion: reduce` is active, the final value is
 * shown immediately with no animation.
 *
 * Accessibility: `role="status"` so screen readers announce the final
 * value once — not rapid-fire intermediate values.
 */
export function NumberTicker({ value, duration = 2, className, ariaLabel }: NumberTickerProps) {
  const scopeRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const node = scopeRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = String(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1] as const,
      onUpdate(latest) {
        node.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return (
    <span
      ref={scopeRef}
      className={[styles.ticker, className].filter(Boolean).join(" ")}
      aria-label={ariaLabel ?? String(value)}
      role="status"
      aria-live="polite"
    >
      0
    </span>
  );
}
