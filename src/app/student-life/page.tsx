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
import { CLUBS, STUDENT_LIFE_INTRO } from "@/data/student-life";
import { STUDENT_LIFE_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Student Life | St. Elizabeth High School",
  description:
    "Discover student life at St. Elizabeth High School — clubs, organizations, traditions, and a vibrant community beyond the classroom.",
};

export default function StudentLifePage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Belong"
          heading="Student Life"
          description={STUDENT_LIFE_INTRO.body}
          backgroundImage={`/images/${STUDENT_LIFE_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Clubs and organizations"
        >
          <Container>
            <Stack gap="xlarge">
              <Stack gap="medium">
                <Text variant="eyebrow">Get Involved</Text>
                <Heading level="h2" variant="section">
                  {STUDENT_LIFE_INTRO.heading}
                </Heading>
              </Stack>
              <Grid columns={3} gap="medium" responsive>
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
