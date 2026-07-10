"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./social-proof-badge.module.css";

interface SocialProofBadgeProps {
  /** Main statistic value */
  value: number;
  /** Label for the statistic */
  label: string;
  /** Optional suffix (e.g., "+", "years", "%") */
  suffix?: string;
  /** Optional prefix (e.g., "$", "#") */
  prefix?: string;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
}

/**
 * SocialProofBadge - Animated statistic counter for social proof
 *
 * Displays an animated number that counts up from 0 to the target value.
 * Uses Intersection Observer to trigger animation when scrolled into view.
 */
export function SocialProofBadge({
  value,
  label,
  suffix = "",
  prefix = "",
  duration = 2000,
  delay = 0,
}: SocialProofBadgeProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  const animateCount = useCallback(() => {
    const startTime = Date.now();

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function (ease-out-cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentCount = Math.floor(easedProgress * value);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value); // Ensure final value is exact
      }
    };

    requestAnimationFrame(updateCount);
  }, [duration, value]);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Start animation after delay
            setTimeout(() => {
              animateCount();
              setHasAnimated(true);
            }, delay);
          }
        });
      },
      { threshold: 0.5 },
    );

    const element = badgeRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated, delay, animateCount]);

  return (
    <div ref={badgeRef} className={styles.badge} role="group" aria-label={`${value} ${label}`}>
      <div className={styles.value} aria-live="polite" aria-atomic="true">
        {prefix}
        <span className={styles.number}>{count.toLocaleString()}</span>
        {suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
