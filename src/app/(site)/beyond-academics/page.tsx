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
import { BEYOND_ACADEMICS_PAGE, BEYOND_ACADEMICS_INTRO, BEYOND_ACADEMICS_SECTIONS } from "@/data/beyond-academics";
import { getHeroImage } from "@/lib/page-utils";

export const metadata = createPageMetadata(BEYOND_ACADEMICS_PAGE.metaTitle, BEYOND_ACADEMICS_PAGE.metaDescription);

export default function BeyondAcademicsPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow={BEYOND_ACADEMICS_PAGE.heroEyebrow}
          heading={BEYOND_ACADEMICS_PAGE.heroHeading}
          description={BEYOND_ACADEMICS_PAGE.heroDescription}
          backgroundImage={`/images/${getHeroImage("student-life-hero").filename}`}
        />
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel="Beyond academics overview">
        <Container width="narrow">
          <Stack gap="xlarge">
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {BEYOND_ACADEMICS_INTRO.heading}
              </Heading>
              <Text variant="muted" size="medium">
                {BEYOND_ACADEMICS_INTRO.body}
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section background="soft" padding="xlarge" ariaLabel="Explore student life areas">
        <Container>
          <Grid columns={3} gap="medium" responsive>
            {BEYOND_ACADEMICS_SECTIONS.map((section) => (
              <Card key={section.title} variant="default" padding="medium">
                <Stack gap="small">
                  <Heading level="h3" variant="card">
                    {section.title}
                  </Heading>
                  <Text variant="muted" size="small">
                    {section.description}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </PageShell>
  );
}
