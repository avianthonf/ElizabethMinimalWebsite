"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { ImageCard } from "@/components/content/ImageCard";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Link } from "@/components/primitives/Link";
import { useReducedMotion } from "@/components/WalkerHomepage/hooks/useReducedMotion";
import { useGsapStaggerReveal } from "@/hooks/useGsapStaggerReveal";
import { LATEST_NEWS } from "@/data/homepage";
import shared from "./shared.module.css";
import styles from "./NewsPanel.module.css";

/** Composed className for the orchestrator's wrapping HorizontalPage. */
export const newsPanelClass = `${shared.panel} ${styles.newsPanel}`;

/** News section content. Wrapping HorizontalPage is applied by the orchestrator. */
export function NewsPanel(): ReactNode {
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useGsapStaggerReveal({
    container: cardsRef,
    disabled: prefersReduced,
    stagger: 0.15,
    duration: 0.8,
    y: 30,
  });

  return (
    <>
      {/* Sidebar — left column: heading + CTA */}
      <div className={styles.sidebar}>
        <Text variant="eyebrow">Latest News &amp; Events</Text>
        <Heading level="h2" variant="section">
          What&rsquo;s Happening
        </Heading>
        <div className={styles.newsCta}>
          <Link href="/news" className={styles.newsCtaLink}>
            View All News
          </Link>
        </div>
      </div>

      {/* Cards row — right column: 3 news image cards */}
      <div ref={cardsRef} className={styles.cardsRow}>
        {LATEST_NEWS.map((item) => (
          <ImageCard
            key={item.href}
            image={`/images/${item.imageFilename}`}
            imageAlt={item.title}
            title={item.title}
            description={`${item.date} — ${item.excerpt}`}
            descriptionVariant="body"
            aspectRatio="16:9"
            href={item.href}
            className={styles.newsCard}
          />
        ))}
      </div>
    </>
  );
}
