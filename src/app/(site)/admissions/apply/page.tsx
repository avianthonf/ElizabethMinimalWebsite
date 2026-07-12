import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import { createWebPageSchema } from "@/shared/lib/structured-data";
import { safeJsonStringify } from "@/shared/lib/safe-json";
import { ADMISSION_STEPS } from "@/domains/admissions/admissions.data";

export const metadata = createPageMetadata(
  "Apply",
  "Learn about the admission process at St. Elizabeth's High School — from inquiry to enrollment. Six clear steps to join our school community.",
  "/admissions/apply",
);

export default function ApplyPage() {
  const heroImage = getHeroImage("admissions-hero");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonStringify(
            createWebPageSchema(
              "Apply",
              "Learn about the admission process at St. Elizabeth's High School — from inquiry to enrollment. Six clear steps to join our school community.",
              "/admissions/apply",
            ),
          ),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: "Apply", href: "/admissions/apply" },
        ]}
      />
      <Breadcrumb href="/admissions" label="Admissions" currentLabel="Apply" />
      <Hero
        eyebrow="Apply"
        heading="Admission Steps"
        description="Our straightforward admissions process is designed to help families navigate every stage — from initial inquiry to the first day of school."
        backgroundImage={`/images/${heroImage.filename}`}
      />

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
    </>
  );
}
