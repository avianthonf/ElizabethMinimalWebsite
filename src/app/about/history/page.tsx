import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";
import { HISTORY_TIMELINE } from "@/data/about";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "History | St. Elizabeth High School",
  description:
    "Explore the history of St. Elizabeth High School — from its founding in 1949 to a thriving community of 1200+ students in Pomburpa, Goa.",
};

export default function HistoryPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Our Story"
          heading="School History"
          description="Since 1949, St. Elizabeth High School has been a beacon of quality education in Pomburpa, Bardez, Goa."
          backgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
        />

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
              <Stack gap="medium">
                {HISTORY_TIMELINE.map((entry) => (
                  <Card key={entry.year} variant="default" padding="medium">
                    <Stack gap="small">
                      <Text variant="eyebrow">{entry.year}</Text>
                      <Text variant="muted" size="medium">
                        {entry.event}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer
        intro={FOOTER_INTRO}
        sections={FOOTER_SECTIONS}
        socialLinks={FOOTER_SOCIAL_LINKS}
        copyright={FOOTER_COPYRIGHT}
      />
    </>
  );
}
