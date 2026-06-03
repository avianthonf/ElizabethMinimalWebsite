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
import { TUITION_INFO } from "@/data/admissions";
import { HERO_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Tuition & Financial Assistance | St. Elizabeth High School",
  description:
    "Learn about tuition fees and financial assistance at St. Elizabeth High School. We are committed to making quality education accessible to all families.",
};

export default function TuitionPage() {
  const heroImage = HERO_IMAGES.find((i) => i.section === "admissions-hero");

  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Invest"
          heading="Tuition & Financial Assistance"
          description="St. Elizabeth High School is committed to making quality education accessible to families across North Goa."
          backgroundImage={`/images/${heroImage?.filename ?? HERO_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Tuition and financial assistance"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Stack gap="medium">
                <Heading level="h2" variant="section">
                  {TUITION_INFO.heading}
                </Heading>
                <Text variant="muted" size="medium">
                  {TUITION_INFO.body}
                </Text>
              </Stack>
              <Card variant="default" padding="medium">
                <Stack gap="small">
                  <Text variant="eyebrow">Financial Assistance</Text>
                  <Text variant="muted" size="medium">
                    {TUITION_INFO.assistanceIntro}
                  </Text>
                </Stack>
              </Card>
              <Card variant="default" padding="medium">
                <Stack gap="small">
                  <Text variant="eyebrow">How to Apply for Assistance</Text>
                  <Text variant="muted" size="small">
                    Families interested in financial assistance should indicate
                    this on their application form. Our admissions team will
                    guide you through the confidential application process,
                    which includes a review of your family&apos;s financial
                    circumstances.
                  </Text>
                </Stack>
              </Card>
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
