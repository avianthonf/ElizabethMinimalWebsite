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
import { PERFORMING_ARTS_PROGRAMS } from "@/data/arts";
import { ARTS_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Performing Arts | St. Elizabeth High School",
  description:
    "Explore the performing arts programme at St. Elizabeth High School — music, dance, drama, and our annual arts festival.",
};

export default function PerformingArtsPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Perform"
          heading="Performing Arts"
          description="Find your voice on stage — through music, dance, and drama — and celebrate Goa's rich performance traditions."
          backgroundImage={`/images/${ARTS_IMAGES[2].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Performing arts programmes"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Our Programmes
              </Heading>
              <Stack gap="medium">
                {PERFORMING_ARTS_PROGRAMS.map((program) => (
                  <Card key={program.title} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {program.title}
                      </Heading>
                      <Text variant="muted" size="medium">
                        {program.description}
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
