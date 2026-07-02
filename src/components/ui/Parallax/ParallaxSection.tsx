"use client";

import { type ReactNode, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface ParallaxSectionProps {
  children: ReactNode;
  /** Parallax speed (0 = static, 1 = normal, 2 = fast) */
  speed?: number;
  /** Direction */
  direction?: "up" | "down" | "left" | "right";
  /** Offset in pixels */
  offset?: number;
  /** Trigger animation */
  triggerOnce?: boolean;
  className?: string;
}

/**
 * ParallaxSection — scroll-based parallax effect.
 * Uses intersection observer + CSS transforms for performance.
 *
 * Usage:
 *   <ParallaxSection speed={0.5}>
 *     <div>Content moves slower than scroll</div>
 *   </ParallaxSection>
 */
export function ParallaxSection({
  children,
  speed = 0.5,
  direction = "up",
  offset = 50,
  triggerOnce = true,
  className,
}: ParallaxSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold: 0,
  });

  const getTransform = () => {
    if (!inView) {
      switch (direction) {
        case "up":
          return `translateY(${offset}px)`;
        case "down":
          return `translateY(-${offset}px)`;
        case "left":
          return `translateX(${offset}px)`;
        case "right":
          return `translateX(-${offset}px)`;
      }
    }
    return "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: getTransform(),
        transition: `transform ${800 + speed * 400}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      {children}
    </div>
  );
}
