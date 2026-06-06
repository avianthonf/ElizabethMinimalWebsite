import type { ReactNode } from "react";
import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import type { MapConfig } from "@/data/visits";

export interface VisitInfoCard {
  /** Small eyebrow label (renders as "eyebrow" variant) */
  eyebrow: string;
  /** Card body content — text or any ReactNode */
  content: ReactNode;
}

export type { MapConfig };

export interface VisitPageProps {
  /** Hero eyebrow text */
  heroEyebrow: string;
  /** Hero heading (h1) text */
  heroHeading: string;
  /** Hero description paragraph */
  heroDescription: string;
  /** Hero background image URL */
  heroBackgroundImage: string;
  /** Left-column section heading (h2) */
  sectionHeading: string;
  /** Introductory paragraph below the section heading */
  introText: string;
  /** Info cards rendered in the left column below the intro */
  infoCards: readonly VisitInfoCard[];
  /** Map and address configuration for the right column */
  mapConfig: MapConfig;
  /** Accessible label for the content <section> */
  sectionAriaLabel: string;
}

/**
 * Generic template for visit/directions pages that share a SplitLayout +
 * info-cards-on-left + map-on-right pattern.
 *
 * Used by: admissions/visit, contact/visit
 */
export function VisitPage({
  heroEyebrow,
  heroHeading,
  heroDescription,
  heroBackgroundImage,
  sectionHeading,
  introText,
  infoCards,
  mapConfig,
  sectionAriaLabel,
}: VisitPageProps): ReactNode {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow={heroEyebrow}
          heading={heroHeading}
          description={heroDescription}
          backgroundImage={heroBackgroundImage}
        />
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel={sectionAriaLabel}>
        <Container width="wide">
          <SplitLayout
            ratio="2-1"
            left={
              <Stack gap="large">
                <Stack gap="medium">
                  <Heading level="h2" variant="section">
                    {sectionHeading}
                  </Heading>
                  <Text variant="muted" size="medium">
                    {introText}
                  </Text>
                </Stack>
                {infoCards.map((card) => (
                  <Card key={card.eyebrow} variant="default" padding="medium">
                    <Stack gap="small">
                      <Text variant="eyebrow">{card.eyebrow}</Text>
                      {card.content}
                    </Stack>
                  </Card>
                ))}
              </Stack>
            }
            right={
              <Stack gap="medium">
                <Heading level="h3" variant="card">
                  {mapConfig.title}
                </Heading>
                {mapConfig.addressLines}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    border: "1px solid var(--s-color-border)",
                  }}
                >
                  <iframe
                    src={mapConfig.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="St. Elizabeth High School on Google Maps"
                  />
                </div>
              </Stack>
            }
          />
        </Container>
      </Section>
    </PageShell>
  );
}
