"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./achievements-section.module.css";
import type { Achievement } from "@/domains/homepage/sections.data";

const ACHIEVEMENT_ICONS: Record<string, string> = {
  award:
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock: "M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  trophy:
    "M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0012 0V2z",
  "graduation-cap": "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 2.5 3.5 6 4.5 3.5-1 6-2.5 6-4.5v-5",
  music: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z",
};

interface AchievementsSectionProps {
  eyebrow: string;
  heading: string;
  achievements: Achievement[];
  ariaLabel?: string;
}

export function AchievementsSection({
  eyebrow,
  heading,
  achievements,
  ariaLabel = "Achievements",
}: AchievementsSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    duration: 25,
  });

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Sync embla's "can scroll" state on mount. This is a one-time
    // initialization from an external store (embla's internal state),
    // not a cascading re-render trigger.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.heading}>{heading}</h2>

        <div className={styles.carousel} ref={emblaRef}>
          <div className={styles.carouselInner}>
            {achievements.map((achievement) => {
              const path = ACHIEVEMENT_ICONS[achievement.icon] ?? ACHIEVEMENT_ICONS.award;

              return (
                <div key={achievement.title} className={styles.card}>
                  <div className={styles.cardIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={styles.iconSvg}
                    >
                      <path d={path} />
                    </svg>
                  </div>
                  {achievement.year && <span className={styles.year}>{achievement.year}</span>}
                  <h3 className={styles.cardTitle}>{achievement.title}</h3>
                  <p className={styles.cardDescription}>{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!prevEnabled}
            aria-label="Previous achievement"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => emblaApi?.scrollNext()}
            disabled={!nextEnabled}
            aria-label="Next achievement"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
