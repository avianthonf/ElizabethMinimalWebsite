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
import { ADMISSION_STEPS } from "@/data/admissions";
import { HERO_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Apply | St. Elizabeth High School",
  description:
    "Learn about the admission process at St. Elizabeth High School — from inquiry to enrollment. Six clear steps to join our school community.",
};

export default function ApplyPage() {
  const heroImage = HERO_IMAGES.find((i) => i.section === "admissions-hero");

  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Apply"
          heading="Admission Steps"
          description="Our straightforward admissions process is designed to help families navigate every stage — from initial inquiry to the first day of school."
          backgroundImage={`/images/${heroImage?.filename ?? HERO_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Admission steps"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                How to Apply
              </Heading>
              <Stack gap="medium">
                {ADMISSION_STEPS.map((step) => (
                  <Card
                    key={step.step}
                    variant="default"
                    padding="medium"
                  >
                    <Stack gap="small">
                      <Text variant="eyebrow">
                        Step {step.step}: {step.title}
                      </Text>
                      <Text variant="muted" size="medium">
                        {step.description}
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
