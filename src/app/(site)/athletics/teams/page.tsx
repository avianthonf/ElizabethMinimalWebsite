import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { SPORTS } from "@/data/athletics";
import { ATHLETICS_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  "Teams & Schedules",
  "Explore team schedules and programmes across seven sports at St. Elizabeth's High School — basketball, football, cricket, volleyball, athletics, swimming, and tennis.",
);

export default function TeamsPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Our Teams"
          heading="Teams & Schedules"
          description="Seven varsity sports, dedicated coaches, and a tradition of athletic excellence that builds character on and off the field."
          backgroundImage={`/images/${ATHLETICS_IMAGES[1].filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="Sports teams and schedules"
      >
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Our Teams
            </Heading>
            <Stack gap="medium">
              {SPORTS.map((sport) => (
                <Card
                  key={sport.name}
                  variant="default"
                  padding="medium"
                >
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {sport.name}
                    </Heading>
                    <Text variant="caption">
                      Season: {sport.seasons.join(", ")}
                    </Text>
                    <Text variant="muted" size="medium">
                      {sport.description}
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
