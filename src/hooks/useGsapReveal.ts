"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseGsapRevealOptions {
  /** Target elements to animate */
  targets: RefObject<HTMLElement | null>;
  /** Animation properties */
  animation?: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    delay?: number;
  };
  /** ScrollTrigger configuration */
  scrollTrigger?: {
    trigger?: RefObject<HTMLElement | null>;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    toggleActions?: string;
  };
  /** Whether to disable animation (for reduced motion) */
  disabled?: boolean;
}

/**
 * Hook for GSAP scroll-triggered reveal animations.
 * Respects prefers-reduced-motion.
 */
export function useGsapReveal({
  targets,
  animation = {},
  scrollTrigger = {},
  disabled = false,
}: UseGsapRevealOptions): void {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (disabled) return;

    const target = targets.current;
    if (!target) return;

    const {
      y = 30,
      opacity = 0,
      duration = 0.8,
      stagger = 0.12,
      ease = "power2.out",
      delay = 0,
    } = animation;

    const {
      trigger,
      start = "top 85%",
      end = "top 20%",
      scrub = false,
      toggleActions = "play none none none",
    } = scrollTrigger;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger?.current ?? target,
        start,
        end,
        scrub,
        toggleActions,
      },
    });

    tl.fromTo(
      target,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        delay,
      },
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, [disabled, targets, animation, scrollTrigger]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      timelineRef.current?.scrollTrigger?.kill();
    };
  }, []);
}

export interface UseGsapCharRevealOptions {
  /** Container element with the text to split */
  container: RefObject<HTMLElement | null>;
  /** Whether to disable animation */
  disabled?: boolean;
}

/**
 * SplitText-style character reveal using GSAP.
 * Wraps each character in a span and animates them in.
 */
export function useGsapCharReveal({ container, disabled = false }: UseGsapCharRevealOptions): void {
  useEffect(() => {
    if (disabled) return;

    const el = container.current;
    if (!el) return;

    const originalText = el.textContent;
    if (!originalText) return;

    // Store original text for cleanup
    const savedText = originalText;

    // Create document fragment with character spans
    const fragment = document.createDocumentFragment();
    const chars: HTMLSpanElement[] = [];

    for (const char of originalText) {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity";
      fragment.appendChild(span);
      chars.push(span);
    }

    // Clear and append new content
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(fragment);

    // Animate characters in with stagger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      chars,
      {
        y: 20,
        opacity: 0,
        rotateX: -40,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power2.out",
      },
    );

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
      // Restore original text content
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
      el.textContent = savedText;
    };
  }, [disabled, container]);
}

export interface UseGsapParallaxOptions {
  /** Element to apply parallax to */
  element: RefObject<HTMLElement | null>;
  /** Speed factor (0 = no parallax, 1 = full scroll speed) */
  speed?: number;
  /** Whether to disable */
  disabled?: boolean;
}

/**
 * Smooth parallax effect using GSAP ScrollTrigger.
 */
export function useGsapParallax({
  element,
  speed = 0.3,
  disabled = false,
}: UseGsapParallaxOptions): void {
  useEffect(() => {
    if (disabled) return;

    const el = element.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(el, {
          y: (progress - 0.5) * speed * 100,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [disabled, element, speed]);
}
