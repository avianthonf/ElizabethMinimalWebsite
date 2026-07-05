"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ScrollReveal.module.css";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
  role?: string;
  "aria-label"?: string;
}

/**
 * ScrollReveal — SSR-safe progressive scroll-in animation.
 *
 * Strategy:
 *  1. Start HIDDEN with `visibility: hidden` — preserves layout space
 *     (no CLS) and is crawlable by search engines.
 *  2. In `useLayoutEffect` (runs BEFORE paint), immediately set
 *     visible=true for above-fold elements so they paint immediately.
 *  3. For below-fold elements, attach an IntersectionObserver that
 *     sets visible=true on scroll-in, triggering the CSS animation.
 *  4. `prefers-reduced-motion: reduce` sets everything visible.
 *
 * Why visibility:hidden instead of opacity:0?
 *  - visibility:hidden preserves layout space → no CLS
 *  - It's crawlable by search engines
 *  - It prevents the "reverse FOUC" where content flashes visible
 *    (SSR) then hidden (useEffect) then visible (IntersectionObserver)
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  ...aria
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Start hidden — useLayoutEffect will immediately set visible for
  // above-fold elements BEFORE the first paint.
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    /* eslint-disable react-hooks/set-state-in-effect */
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const inView = rect.top < viewportHeight && rect.bottom > 0;

    if (inView) {
      setVisible(true);
      return;
    }

    // Below the fold — keep hidden, attach IntersectionObserver.
    const reducer = (e: MediaQueryListEvent) => {
      if (e.matches) setVisible(true);
    };
    mq.addEventListener("change", reducer);

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

    return () => {
      mq.removeEventListener("change", reducer);
      observer.disconnect();
    };
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

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
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      {...aria}
    >
      {children}
    </div>
  );
}
