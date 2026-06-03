import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { IconCard } from "@/components/content/IconCard";
import { ImageCard } from "@/components/content/ImageCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Icon } from "@/components/primitives/Icon";
import { SportsIcon } from "@/components/icons/SportsIcon";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";
import { SPORTS, ATHLETICS_STATS } from "@/data/athletics";
import { ATHLETICS_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Athletics | St. Elizabeth High School",
  description:
    "Discover athletics at St. Elizabeth High School — basketball, football, cricket, volleyball, athletics, swimming, tennis, and more.",
};

export default function AthleticsPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Compete"
          heading="Athletics at St. Elizabeth"
          description="Building character, teamwork, and resilience through sport. Our athletics program offers seven competitive sports across multiple seasons."
          backgroundImage={`/images/${ATHLETICS_IMAGES[0].filename}`}
        />

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
                      <SportsIcon />
                    </Icon>
                  }
                  title={ATHLETICS_STATS.teams}
                  description="Varsity Teams"
                />
                <IconCard
                  icon={
                    <Icon size="medium">
                      <SportsIcon />
                    </Icon>
                  }
                  title={ATHLETICS_STATS.athletes}
                  description="Student-Athletes"
                />
                <IconCard
                  icon={
                    <Icon size="medium">
                      <SportsIcon />
                    </Icon>
                  }
                  title={ATHLETICS_STATS.championships}
                  description="Championships"
                />
              </Grid>
            </Stack>
          </Container>
        </Section>
      </main>
      <Footer
        intro={FOOTER_INTRO}
        sections={FOOTER_SECTIONS}
        socialLinks={FOOTER_SOCIAL_LINKS}
        copyright={FOOTER_COPYRIGHT}
      />
    </>
  );
}
