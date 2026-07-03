"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Link } from "@/components/primitives/Link";
import styles from "./HeroCarousel.module.css";
import type { HeroSlide } from "@/data/homepage-sections";

interface HeroCarouselProps {
  slides: HeroSlide[];
  ariaLabel?: string;
}

export function HeroCarousel({ slides, ariaLabel = "Hero carousel" }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 25,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  // Autoplay — pauses on hover/focus, respects reduced motion.
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

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
      className={styles.root}
      aria-label={ariaLabel}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onSectionKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
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
                <h1 className={styles.heading}>{slide.heading}</h1>
                <Link href={slide.ctaHref} className={styles.cta}>
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Carousel navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ""}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === selectedIndex}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
