"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { Link } from "@/shared/ui/link";
import { TypewriterText } from "@/shared/ui/motion/motion-text";
import styles from "./hero-carousel.module.css";
import type { HeroSlide } from "@/domains/homepage/sections.data";

interface HeroCarouselProps {
  slides: HeroSlide[];
  ariaLabel?: string;
}

/**
 * HeroCarousel — auto-advancing carousel for homepage hero slides.
 *
 * Video support:
 * - Dual-format: MP4 (H.264 baseline) + WebM (VP9) via <source>
 * - Poster frame while video loads
 * - Respects prefers-reduced-motion (shows poster instead of playing)
 * - muted + playsInline for iOS/mobile autoplay
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
    breakpoints: {
      "(prefers-reduced-motion: reduce)": { duration: 0 },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const sectionRef = useRef<HTMLElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  // Stable ref to emblaApi — avoids recreating the autoplay interval on reInit.
  const emblaApiRef = useRef(emblaApi);

  // Keep emblaApiRef in sync in an effect (not render) per react-hooks/refs rule.
  useEffect(() => {
    emblaApiRef.current = emblaApi;
  }, [emblaApi]);

  // Detect reduced-motion preference changes.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Sync dot indicators with the current snap.
  useEffect(() => {
    if (!emblaApi) return;
    const select = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", select);
    emblaApi.on("reInit", select);
    return () => {
      emblaApi.off("select", select);
      emblaApi.off("reInit", select);
    };
  }, [emblaApi]);

  // Autoplay — pauses on hover/focus, respects reduced motion and user pause.
  // Uses emblaApiRef to keep the interval stable across embla reInit.
  useEffect(() => {
    if (isPaused || userPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      emblaApiRef.current?.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, userPaused, prefersReducedMotion]);

  // Announce slide changes via live region for screen readers.
  useEffect(() => {
    if (!liveRef.current || slides.length === 0) return;
    const slide = slides[selectedIndex];
    if (slide) {
      liveRef.current.textContent = `Slide ${selectedIndex + 1} of ${slides.length}: ${slide.heading}`;
    }
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
  }, []);

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
              {slide.videoFilename && !prefersReducedMotion ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={`/videos/${slide.videoFilename.replace(/\.(mp4|webm)$/, "-poster.jpg")}`}
                  className={styles.image}
                  aria-hidden="true"
                >
                  <source
                    src={`/videos/${slide.videoFilename.replace(/\.\w+$/, ".webm")}`}
                    type="video/webm"
                  />
                  <source
                    src={`/videos/${slide.videoFilename.replace(/\.\w+$/, ".mp4")}`}
                    type="video/mp4"
                  />
                </video>
              ) : slide.imageFilename ? (
                <Image
                  src={`/images/${slide.imageFilename}`}
                  alt={slide.imageAlt}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : undefined}
                  className={styles.image}
                  sizes="100vw"
                  quality={85}
                />
              ) : null}
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
