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
import { LANGUAGE_PROGRAMS } from "@/data/academics";

export const metadata = createPageMetadata(
  "World Languages",
  "Explore the World Languages programme at St. Elizabeth's High School — Hindi, Konkani, and Sanskrit, connecting students to India's rich linguistic heritage.",
);

export default function LanguagesPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Explore"
          heading="World Languages"
          description="Expanding horizons through language learning, connecting students to India's rich linguistic and cultural heritage."
          backgroundImage={`/images/${ACADEMICS_IMAGES[2].filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="World languages programme"
      >
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Language Programmes
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {LANGUAGE_PROGRAMS.map((program) => (
                <Card key={program.name} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {program.name}
                    </Heading>
                    <Text variant="muted" size="small">
                      {program.description}
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
