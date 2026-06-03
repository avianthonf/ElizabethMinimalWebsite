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
import { VISUAL_ARTS_PROGRAMS } from "@/data/arts";
import { ARTS_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Visual Arts | St. Elizabeth High School",
  description:
    "Explore the visual arts programme at St. Elizabeth High School — drawing, painting, sculpture, 3D design, and art history.",
};

export default function VisualArtsPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Create"
          heading="Visual Arts"
          description="Develop your artistic voice through hands-on practice in drawing, painting, sculpture, and art appreciation."
          backgroundImage={`/images/${ARTS_IMAGES[1].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Visual arts programmes"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Our Programmes
              </Heading>
              <Stack gap="medium">
                {VISUAL_ARTS_PROGRAMS.map((program) => (
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
