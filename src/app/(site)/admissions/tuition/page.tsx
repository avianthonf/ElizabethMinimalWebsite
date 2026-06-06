import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata, getHeroImage } from "@/lib/page-utils";
import { TUITION_INFO } from "@/data/admissions";

export const metadata = createPageMetadata(
  "Tuition & Financial Assistance",
  "Learn about tuition fees and financial assistance at St. Elizabeth High School. We are committed to making quality education accessible to all families.",
);

export default function TuitionPage() {
  const heroImage = getHeroImage("admissions-hero");

  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Invest"
          heading="Tuition & Financial Assistance"
          description="St. Elizabeth High School is committed to making quality education accessible to families across North Goa."
          backgroundImage={`/images/${heroImage.filename}`}
        />
      }
    >
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
    </PageShell>
  );
}
