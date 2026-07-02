"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseGsapStaggerRevealOptions {
  /** Container element holding the cards */
  container: RefObject<HTMLElement | null>;
  /** CSS selector for individual cards within the container */
  cardSelector?: string;
  /** Stagger delay between cards in seconds */
  stagger?: number;
  /** Animation duration per card */
  duration?: number;
  /** Y offset for the reveal */
  y?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** Whether to disable animation */
  disabled?: boolean;
}

/**
 * Hook for GSAP staggered card reveal animations.
 * Animates child elements of a container with a staggered entrance.
 * Respects prefers-reduced-motion via the disabled flag.
 */
export function useGsapStaggerReveal({
  container,
  cardSelector = ":scope > *",
  stagger = 0.12,
  duration = 0.7,
  y = 24,
  start = "top 80%",
  disabled = false,
}: UseGsapStaggerRevealOptions): void {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (disabled) {
      // Ensure cards are visible when animation is disabled
      const el = container.current;
      if (el) {
        const cards = el.querySelectorAll(cardSelector);
        cards.forEach((card) => {
          gsap.set(card, { opacity: 1, y: 0 });
        });
      }
      return;
    }

    const el = container.current;
    if (!el) return;

    const cards = el.querySelectorAll(cardSelector);
    if (cards.length === 0) return;

    // Set initial state
    gsap.set(cards, { opacity: 0, y });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, [disabled, container, cardSelector, stagger, duration, y, start]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      timelineRef.current?.scrollTrigger?.kill();
    };
  }, []);
}
