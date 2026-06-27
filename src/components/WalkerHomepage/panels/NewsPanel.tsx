"use client";

import type { ReactNode } from "react";
import { ImageCard } from "@/components/content/ImageCard";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Link } from "@/components/primitives/Link";
import { LATEST_NEWS } from "@/data/homepage";
import shared from "./shared.module.css";
import styles from "./NewsPanel.module.css";

/** Composed className for the orchestrator's wrapping HorizontalPage. */
export const newsPanelClass = `${shared.panel} ${styles.newsPanel}`;

/** News section content. Wrapping HorizontalPage is applied by the orchestrator. */
export function NewsPanel(): ReactNode {
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
      <div className={styles.cardsRow}>
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
