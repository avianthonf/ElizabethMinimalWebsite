import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  BEYOND_ACADEMICS_PAGE,
  BEYOND_ACADEMICS_INTRO,
  BEYOND_ACADEMICS_SECTIONS,
} from "@/domains/beyond-academics/beyond.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  BEYOND_ACADEMICS_PAGE.metaTitle,
  BEYOND_ACADEMICS_PAGE.metaDescription,
);

export default function BeyondAcademicsPage() {
  return (
    <>
      <Hero
        eyebrow={BEYOND_ACADEMICS_PAGE.heroEyebrow}
        heading={BEYOND_ACADEMICS_PAGE.heroHeading}
        description={BEYOND_ACADEMICS_PAGE.heroDescription}
        backgroundImage={`/images/${getHeroImage("student-life-hero").filename}`}
      />

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
    </>
  );
}
