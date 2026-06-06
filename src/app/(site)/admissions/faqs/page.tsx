import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata, getHeroImage } from "@/lib/page-utils";
import { FAQS } from "@/data/admissions";

export const metadata = createPageMetadata(
  "FAQs",
  "Find answers to frequently asked questions about admissions, curriculum, transportation, financial assistance, and more at St. Elizabeth High School.",
);

export default function FAQsPage() {
  const heroImage = getHeroImage("admissions-hero");

  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Questions"
          heading="Frequently Asked Questions"
          description="Find answers to the most common questions about St. Elizabeth High School and the admissions process."
          backgroundImage={`/images/${heroImage.filename}`}
        />
      }
    >
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
    </PageShell>
  );
}
