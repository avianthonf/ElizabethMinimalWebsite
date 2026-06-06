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
import { LIBRARY_RESOURCES } from "@/data/academics";

export const metadata = createPageMetadata(
  "Libraries",
  "Explore the library and digital resource centre at St. Elizabeth High School — supporting research, reading, and lifelong learning.",
);

export default function LibrariesPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Discover"
          heading="Libraries"
          description="A well-stocked library and digital resource centre supporting research, reading, and lifelong learning habits."
          backgroundImage={`/images/${ACADEMICS_IMAGES[3].filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="Library and resources"
      >
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Our Library
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {LIBRARY_RESOURCES.map((resource) => (
                <Card key={resource.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {resource.title}
                    </Heading>
                    <Text variant="muted" size="small">
                      {resource.description}
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
