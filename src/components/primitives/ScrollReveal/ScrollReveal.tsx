"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ScrollReveal.module.css";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Override the default animation direction */
  direction?: "up" | "left" | "right";
  /** Animation delay in milliseconds */
  delay?: number;
  /** ARIA attributes for the wrapper section */
  role?: string;
  "aria-label"?: string;
}

/**
 * ScrollReveal — SSR-safe progressive scroll-in animation.
 *
 * Render strategy:
 *  1. Server renders content with NO transform / NO opacity override
 *     (i.e. fully visible) so the initial HTML is crawlable and visible
 *     even without JS.
 *  2. On client mount, we read the actual intersection state. If the
 *     element is already in the viewport, the reveal animation plays
 *     from the in-view state (i.e. no visible jump). If it is below
 *     the fold, the observer attaches and animates in on intersection.
 *  3. `prefers-reduced-motion: reduce` short-circuits everything and
 *     leaves content fully visible.
 *
 * Why not motion/react `m.div` with `whileInView`?
 *  - The `initial` state is server-rendered into HTML as
 *    `style="opacity:0;transform:translateY(40px)"`, which means
 *    SSR / no-JS users see nothing.
 *  - The motion bundle (~28KB gzipped) is not needed for a simple
 *    fade-and-slide.
 *  - A CSS-driven animation is smaller, deterministic, and easy to
 *    debug in DevTools.
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  ...aria
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Start as `true` so SSR / first paint shows the content. We only
  // flip to `false` once we've confirmed the element is below the fold
  // AND we're going to animate it in. This prevents a FOUC.
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    // One-time init from external sources (matchMedia, IntersectionObserver).
    // The setState-in-effect lint rule is suppressed for the whole effect
    // because this is the correct pattern for syncing from external stores.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (mq.matches) {
      setReducedMotion(true);
      setVisible(true);
      return;
    }
    setReducedMotion(false);
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setReducedMotion(true);
        setVisible(true);
      }
    };
    mq.addEventListener("change", handler);

    const node = ref.current;
    if (!node) {
      return () => mq.removeEventListener("change", handler);
    }

    // Check if the element is already in view on mount (above-the-fold).
    const rect = node.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const inView = rect.top < viewportHeight && rect.bottom > 0;

    if (inView) {
      // Already visible — leave as-is. The "from" state never applies,
      // so no animation needed; user sees content immediately.
      setVisible(true);
    } else {
      // Below the fold — hide it now, then animate in on intersection.
      setVisible(false);
    }

    return () => mq.removeEventListener("change", handler);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (reducedMotion || visible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, visible]);

  const composedClassName = [
    styles.root,
    styles[direction],
    visible ? styles.visible : styles.hidden,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={composedClassName}
      style={{ transitionDelay: `${delay}ms` }}
      {...aria}
    >
      {children}
    </div>
  );
}
