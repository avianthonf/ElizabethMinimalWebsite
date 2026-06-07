import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { ACADEMICS_IMAGES } from "@/data/images";
import { COLLEGE_COUNSELING_STEPS } from "@/data/academics";

export const metadata = createPageMetadata(
  "College Counseling",
  "Our college counseling programme at St. Elizabeth's High School guides students and families through university selection, applications, and career exploration.",
);

export default function CollegeCounselingPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Prepare"
          heading="College Counseling"
          description="Guiding students and families through university selection, application preparation, and career exploration."
          backgroundImage={`/images/${ACADEMICS_IMAGES[4].filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="College counseling programme"
      >
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Planning for the Future
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {COLLEGE_COUNSELING_STEPS.map((step) => (
                <Card key={step.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {step.title}
                    </Heading>
                    <Text variant="muted" size="small">
                      {step.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
