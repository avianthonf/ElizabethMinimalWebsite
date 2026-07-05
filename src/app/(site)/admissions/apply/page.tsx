import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { PageShell } from "@/components/layout";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import { ADMISSION_STEPS } from "@/domains/admissions/admissions.data";

export const metadata = createPageMetadata(
  "Apply",
  "Learn about the admission process at St. Elizabeth's High School — from inquiry to enrollment. Six clear steps to join our school community.",
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
      <Section background="paper" padding="xlarge" ariaLabel="Admission steps">
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              How to Apply
            </Heading>
            <Stack gap="medium">
              {ADMISSION_STEPS.map((step) => (
                <Card key={step.step} variant="default" padding="medium">
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
