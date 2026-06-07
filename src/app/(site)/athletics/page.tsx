import { Hero } from "@/components/content/Hero";
import { IconCard } from "@/components/content/IconCard";
import { ImageCard } from "@/components/content/ImageCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Icon } from "@/components/primitives/Icon";
import { SchoolIcon } from "@/components/icons/SchoolIcon";
import { createPageMetadata } from "@/lib/page-utils";
import { SPORTS, ATHLETICS_STATS } from "@/data/athletics";
import { ATHLETICS_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  "Athletics",
  "Discover athletics at St. Elizabeth's High School — basketball, football, cricket, volleyball, athletics, swimming, tennis, and more.",
);

export default function AthleticsPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Compete"
          heading="Athletics at St. Elizabeth"
          description="Building character, teamwork, and resilience through sport. Our athletics program offers seven competitive sports across multiple seasons."
          backgroundImage={`/images/${ATHLETICS_IMAGES[0].filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="Sports programs"
      >
        <Container>
          <Stack gap="xlarge">
            <Stack gap="medium">
              <Text variant="eyebrow">Programs</Text>
              <Heading level="h2" variant="section">
                Our Sports Programs
              </Heading>
              <Text variant="muted" size="medium">
                From the basketball court to the swimming pool, St. Elizabeth
                offers a diverse range of athletic opportunities that promote
                physical fitness, sportsmanship, and personal growth.
              </Text>
            </Stack>
            <Grid columns={3} gap="large" responsive>
              {SPORTS.map((sport, index) => (
                <ImageCard
                  key={sport.name}
                  image={`/images/${ATHLETICS_IMAGES[(index % (ATHLETICS_IMAGES.length - 1)) + 1].filename}`}
                  imageAlt={sport.name}
                  title={sport.name}
                  description={`${sport.description} Seasons: ${sport.seasons.join(", ")}.`}
                  aspectRatio="4:3"
                  href={`/athletics/teams#${sport.name.toLowerCase()}`}
                />
              ))}
            </Grid>

            <Grid columns={3} gap="medium">
              <IconCard
                icon={
                  <Icon size="medium">
                    <SchoolIcon variant="sports" />
                  </Icon>
                }
                title={ATHLETICS_STATS.teams}
                description="Varsity Teams"
              />
              <IconCard
                icon={
                  <Icon size="medium">
                    <SchoolIcon variant="sports" />
                  </Icon>
                }
                title={ATHLETICS_STATS.athletes}
                description="Student-Athletes"
              />
              <IconCard
                icon={
                  <Icon size="medium">
                    <SchoolIcon variant="sports" />
                  </Icon>
                }
                title={ATHLETICS_STATS.championships}
                description="Championships"
              />
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
