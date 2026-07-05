"use client";

import { type ReactNode } from "react";
import { motion, type Transition } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
  role?: string;
  "aria-label"?: string;
}

/**
 * Scroll-triggered reveal using Motion's native ScrollTimeline (hardware
 * accelerated when available, falling back to pooled IntersectionObserver).
 *
 * Motion's `whileInView` with `once: true` fires once when the element enters
 * the viewport.  The parent `<MotionConfig reducedMotion="user" />` in
 * root-layout automatically disables all animation when the user has
 * `prefers-reduced-motion: reduce` — no manual media-query handling needed.
 *
 * Replaces the custom IntersectionObserver + useLayoutEffect implementation
 * with a 0.6 KB hook from the already-installed `motion` package.
 *
 * The old CSS-module approach (visibility:hidden → visible transitions) is
 * fully replaced — Motion handles the initial render state and animation
 * orchestration.
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  ...aria
}: ScrollRevealProps) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };

  const transition: Transition = {
    duration: 0.6,
    delay,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={transition}
      className={className}
      {...aria}
    >
      {children}
    </motion.div>
  );
}
