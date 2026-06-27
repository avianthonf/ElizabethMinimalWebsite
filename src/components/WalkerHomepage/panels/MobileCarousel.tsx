"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MobileCarousel.module.css";

interface MobileCarouselProps {
  /** Carousel items — each child becomes a snap point */
  children: ReactNode;
  /** Gap between items in px */
  gap?: number;
  /** Additional CSS class on the scroll container */
  className?: string;
  /** Callback when the visible item index changes */
  onIndexChange?: (index: number) => void;
  /** Whether to show dot pagination indicators */
  showDots?: boolean;
}

/**
 * MobileCarousel — a pure CSS scroll-snap carousel for touch devices.
 *
 * Uses `scroll-snap-type: x mandatory` for native swipe + snap behavior.
 * No framer-motion dependency — compositor-only for 60fps.
 *
 * Dot pagination is rendered via JS (IntersectionObserver) for broad
 * browser support. Chrome 135+ has ::scroll-marker() as progressive
 * enhancement, but we use the JS approach for Firefox/Safari compat.
 */
export function MobileCarousel({
  children,
  gap = 16,
  className,
  onIndexChange,
  showDots = true,
}: MobileCarouselProps): ReactNode {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Count children and observe them for active state
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];
    setChildCount(items.length);

    // Disconnect previous observer
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = items.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveIndex(index);
              onIndexChange?.(index);
            }
          }
        }
      },
      {
        root: container,
        threshold: 0.6,
      },
    );

    for (const item of items) {
      observer.observe(item);
    }

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [children, onIndexChange]);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const items = Array.from(container.children) as HTMLElement[];
    const target = items[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, []);

  return (
    <div className={`${styles.carouselWrapper} ${className ?? ""}`}>
      <div
        ref={scrollRef}
        className={styles.carousel}
        style={{ gap: `${gap}px` }}
        role="region"
        aria-label="Carousel"
        aria-roledescription="carousel"
      >
        {children}
      </div>

      {showDots && childCount > 1 && (
        <div className={styles.dots} role="tablist" aria-label="Carousel navigation">
          {Array.from({ length: childCount }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to item ${i + 1}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
