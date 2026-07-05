"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { Link } from "@/shared/ui/link";
import { TypewriterText } from "@/shared/ui/motion/motion-text";
import styles from "./hero-carousel.module.css";
import type { HeroSlide } from "@/domains/homepage/sections.data";

// Spline 3D scene — lazy-loaded to avoid blocking initial render.
// Falls back silently to the existing gradient overlay.
const HeroSplineScene = dynamic(
  () => import("./hero-spline-scene").then((mod) => ({ default: mod.HeroSplineScene })),
  { ssr: false },
);

// Spline scene URL — replace with a custom-designed school campus scene.
// Current: generic abstract 3D background from Spline Community.
// To update: export from Spline editor → Code → React → copy the URL.
const SPLINE_SCENE_URL =
  "https://prod.spline.design/23e9e4ac-b5af-4395-9cf1-7f56cb1af18e/scene.splinecode";

interface HeroCarouselProps {
  slides: HeroSlide[];
  ariaLabel?: string;
}

/**
 * HeroCarousel — auto-advancing carousel for homepage hero slides.
 *
 * Accessibility:
 * - Keyboard navigation: ArrowLeft/ArrowRight
 * - Pause/play button for WCAG 2.2.2 auto-play compliance
 * - Live region announces slide changes to screen readers
 * - Pauses on focusin (bubbles) for child-focus awareness
 * - Respects prefers-reduced-motion
 * - Dots use role="group" with aria-current (not conflicting tablist pattern)
 */
export function HeroCarousel({ slides, ariaLabel = "Hero carousel" }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 25,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Sync dot indicators with the current snap.
  useEffect(() => {
    if (!emblaApi) return;
    // One-time sync from embla's external state. The "in-effect
    // setState" lint rule flags this, but it's intentional here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay — pauses on hover/focus, respects reduced motion and user pause.
  useEffect(() => {
    if (!emblaApi || isPaused || userPaused) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, isPaused, userPaused]);

  // Announce slide changes via live region for screen readers.
  useEffect(() => {
    if (!liveRef.current || slides.length === 0) return;
    liveRef.current.textContent = `Slide ${selectedIndex + 1} of ${slides.length}: ${slides[selectedIndex].heading}`;
  }, [selectedIndex, slides]);

  // focusin/focusout bubble — correctly handles focus on child elements
  // (e.g., CTA links inside slides). The old onFocus/onBlur on the section
  // fired blur when focus moved to a child, causing autoplay flicker.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onFocusIn = () => setIsPaused(true);
    const onFocusOut = (e: FocusEvent) => {
      if (!section.contains(e.relatedTarget as Node)) setIsPaused(false);
    };
    section.addEventListener("focusin", onFocusIn);
    section.addEventListener("focusout", onFocusOut);
    return () => {
      section.removeEventListener("focusin", onFocusIn);
      section.removeEventListener("focusout", onFocusOut);
    };
  }, [slides]);

  // Keyboard navigation: ArrowLeft/ArrowRight for carousel control.
  const onSectionKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!emblaApi) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi.scrollNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi.scrollPrev();
      }
    },
    [emblaApi],
  );

  if (slides.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={styles.root}
      aria-label={ariaLabel}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onSectionKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Live region for screen reader slide-change announcements */}
      <div
        ref={liveRef}
        className={styles.liveRegion}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* 3D Spline scene — renders behind the overlay, hidden from screen readers */}
      <HeroSplineScene sceneUrl={SPLINE_SCENE_URL} />

      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}: ${slide.heading}`}
            >
              <Image
                src={`/images/${slide.imageFilename}`}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                className={styles.image}
                sizes="100vw"
                quality={85}
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <p className={styles.tagline}>{slide.tagline}</p>
                <h1 className={styles.heading}>
                  {index === 0 ? (
                    <TypewriterText as="span" speed={35} delay={0.3}>
                      {slide.heading}
                    </TypewriterText>
                  ) : (
                    slide.heading
                  )}
                </h1>
                <Link href={slide.ctaHref} className={styles.cta}>
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots} role="group" aria-label="Carousel navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ""}`}
            aria-label={`Go to slide ${index + 1} of ${slides.length}`}
            aria-current={index === selectedIndex ? "true" : undefined}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>

      {/* Pause/play toggle for WCAG 2.2.2 compliance */}
      <button
        type="button"
        className={styles.pauseButton}
        onClick={() => setUserPaused((p) => !p)}
        aria-label={userPaused ? "Play carousel" : "Pause carousel"}
      >
        {userPaused ? (
          <Play size={16} aria-hidden="true" />
        ) : (
          <Pause size={16} aria-hidden="true" />
        )}
      </button>
    </section>
  );
}
