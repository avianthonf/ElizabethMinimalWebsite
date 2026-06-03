import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";
import { CLUBS } from "@/data/student-life";
import { STUDENT_LIFE_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Clubs & Organizations | St. Elizabeth High School",
  description:
    "Explore the clubs and organizations at St. Elizabeth High School — from debate and drama to eco club, student council, and community service.",
};

export default function ClubsPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Get Involved"
          heading="Clubs & Organizations"
          description="Discover your passion, develop leadership skills, and build lifelong friendships through our diverse range of student clubs and organizations."
          backgroundImage={`/images/${STUDENT_LIFE_IMAGES[1].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Clubs and organizations"
        >
          <Container width="narrow">
            <Stack gap="xlarge">
              <Stack gap="medium">
                <Heading level="h2" variant="section">
                  Explore Our Clubs
                </Heading>
                <Text variant="muted" size="medium">
                  With clubs spanning academics, arts, athletics, service, and
                  leadership, there&apos;s something for every student at St.
                  Elizabeth High School.
                </Text>
              </Stack>
              <Grid columns={2} gap="medium" responsive>
                {CLUBS.map((club) => (
                  <Card key={club.name} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {club.name}
                      </Heading>
                      <Text variant="caption">{club.category}</Text>
                      <Text variant="muted" size="small">
                        {club.description}
                      </Text>
                    </Stack>
                  </Card>
                ))}
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
