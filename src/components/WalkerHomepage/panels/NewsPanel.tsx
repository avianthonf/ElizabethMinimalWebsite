"use client";

import type { ReactNode } from "react";
import { ImageCard } from "@/components/content/ImageCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
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
    <Section background="paper" padding="xlarge" className={styles.newsSection}>
      <Container>
        <Stack gap="xlarge">
          <div className={styles.newsHeader}>
            <Text variant="eyebrow">Latest News &amp; Events</Text>
            <Heading level="h2" variant="section">What&rsquo;s Happening</Heading>
          </div>
          <Grid columns={3} gap="large" responsive>
            {LATEST_NEWS.map((item) => (
              <ImageCard
                key={item.href}
                image={`/images/${item.imageFilename}`}
                imageAlt={item.title}
                title={item.title}
                description={`${item.date} — ${item.excerpt}`}
                aspectRatio="4:3"
                href={item.href}
              />
            ))}
          </Grid>
          <div className={styles.newsCta}>
            <Link href="/news">View All News</Link>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
