"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NumberTicker.module.css";

interface NumberTickerProps {
  value: number;
  duration?: number;
  className?: string;
  ariaLabel?: string;
}

/**
 * Animates a number from 0 to `value` using requestAnimationFrame.
 * Respects `prefers-reduced-motion` — falls back to displaying the final value immediately.
 */
export function NumberTicker({
  value,
  duration = 2000,
  className,
  ariaLabel,
}: NumberTickerProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mq.matches;

    if (prefersReducedMotion) {
      queueMicrotask(() => setCount(value));
      return;
    }

    let frameId: number | null = null;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);

      setCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [value, duration]);

  const composedClass = [styles.ticker, className].filter(Boolean).join(" ");

  return (
    <span
      className={composedClass}
      aria-label={ariaLabel ?? String(count)}
      role="status"
      aria-live="polite"
    >
      {count}
    </span>
  );
}
