import Link from "next/link";
import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { HISTORY_TIMELINE } from "@/data/about";
import { COMMUNITY_IMAGES } from "@/data/images";
import styles from "./history.module.css";

export const metadata = createPageMetadata(
  "History",
  "Explore the history of St. Elizabeth High School — from its founding in 1949 to a thriving community of 1200+ students in Pomburpa, Goa.",
);

export default function HistoryPage() {
  return (
    <PageShell
      hero={
        <>
          <nav
            aria-label="Breadcrumb"
            style={{
              padding: "var(--spacing-md) 0 0",
              fontSize: "calc(var(--text-scale) * 0.85rem)",
              color: "var(--s-color-text-muted)",
            }}
          >
            <Container width="narrow">
              <Link href="/about" style={{ color: "var(--s-color-text-muted)", textDecoration: "underline" }}>
                About
              </Link>
              {" / History"}
            </Container>
          </nav>
          <Hero
            eyebrow="Our Story"
            heading="School History"
            description="Since 1949, St. Elizabeth High School has been a beacon of quality education in Pomburpa, Bardez, Goa."
            backgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
          />
        </>
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="School history timeline"
      >
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Our Journey
            </Heading>
            <div className={styles.timeline}>
              {HISTORY_TIMELINE.map((entry) => (
                <div key={entry.year} className={styles.entry}>
                  <div className={styles.year}>
                    <span className={styles.yearText}>{entry.year}</span>
                  </div>
                  <Card variant="default" padding="medium">
                    <Text variant="muted" size="medium">
                      {entry.event}
                    </Text>
                  </Card>
                </div>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
