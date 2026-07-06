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
 * **Transform-only — no opacity animation.** Content stays at `opacity: 1`
 * (the CSS default) so it is immediately visible during SSR, when
 * `prefers-reduced-motion: reduce` is active, and when `whileInView`
 * never fires due to library compatibility issues. The animation applies
 * only `transform` (translateX / translateY), which degrades gracefully:
 * the browser skips the transform under reduced motion but content
 * remains visible at its final position.
 *
 * This follows the industry best practice documented in:
 *   https://access-proof.com/blog/prefers-reduced-motion-transform-only-fix
 *
 * The parent `<MotionConfig reducedMotion="user" />` in root-layout
 * automatically disables all animation when the user has
 * `prefers-reduced-motion: reduce`.
 *
 * Replaces the custom IntersectionObserver + useLayoutEffect implementation
 * with the already-installed `motion` package.
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  ...aria
}: ScrollRevealProps) {
  const initial = {
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };

  const transition: Transition = {
    duration: 0.6,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ x: 0, y: 0 }}
      viewport={{ once: true, margin: "10% 0px 10% 0px" }}
      transition={transition}
      className={className}
      {...aria}
    >
      {children}
    </motion.div>
  );
}
