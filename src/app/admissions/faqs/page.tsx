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
import { FAQS } from "@/data/admissions";
import { HERO_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "FAQs | St. Elizabeth High School",
  description:
    "Find answers to frequently asked questions about admissions, curriculum, transportation, financial assistance, and more at St. Elizabeth High School.",
};

export default function FAQsPage() {
  const heroImage = HERO_IMAGES.find((i) => i.section === "admissions-hero");

  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Questions"
          heading="Frequently Asked Questions"
          description="Find answers to the most common questions about St. Elizabeth High School and the admissions process."
          backgroundImage={`/images/${heroImage?.filename ?? HERO_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Frequently asked questions"
        >
          <Container width="narrow">
            <Stack gap="large">
              <Heading level="h2" variant="section">
                Common Questions
              </Heading>
              <Stack gap="medium">
                {FAQS.map((faq) => (
                  <Card key={faq.question} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {faq.question}
                      </Heading>
                      <Text variant="muted" size="medium">
                        {faq.answer}
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
