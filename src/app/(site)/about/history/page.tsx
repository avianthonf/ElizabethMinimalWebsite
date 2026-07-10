import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { HISTORY_INTRO, HISTORY_TIMELINE, HISTORY_CLOSING } from "@/domains/about/about.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";
import styles from "./history.module.css";

export const metadata = createPageMetadata(
  "History",
  "Explore the history of St. Elizabeth's High School — founded in 1954, a Catholic, co-educational English-medium institution in Pomburpa, Goa.",
);

export default function HistoryPage() {
  return (
    <>
      <Breadcrumb href="/about" label="About" currentLabel="History" />
      <Hero
        eyebrow="Our Story"
        heading="School History"
        description="Since 1954, St. Elizabeth's High School has been a beacon of quality education in Pomburpa, Bardez, Goa."
        backgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel="School history">
        <Container width="narrow">
          <Stack gap="large">
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {HISTORY_INTRO.heading}
              </Heading>
              <Text variant="muted" size="large">
                {HISTORY_INTRO.body}
              </Text>
            </Stack>
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
            <p
              style={{
                whiteSpace: "pre-line",
                color: "var(--p-color-muted)",
                fontSize: "var(--p-font-size-large)",
                lineHeight: "1.7",
              }}
            >
              {HISTORY_CLOSING.body}
            </p>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
