import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata, getHeroImage } from "@/lib/page-utils";
import { ADMISSION_STEPS } from "@/data/admissions";

export const metadata = createPageMetadata(
  "Apply",
  "Learn about the admission process at St. Elizabeth High School — from inquiry to enrollment. Six clear steps to join our school community.",
);

export default function ApplyPage() {
  const heroImage = getHeroImage("admissions-hero");

  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Apply"
          heading="Admission Steps"
          description="Our straightforward admissions process is designed to help families navigate every stage — from initial inquiry to the first day of school."
          backgroundImage={`/images/${heroImage.filename}`}
        />
      }
    >
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
    </PageShell>
  );
}
