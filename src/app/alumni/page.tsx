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
import { NOTABLE_ALUMNI, ALUMNI_EVENTS, ALUMNI_INTRO } from "@/data/alumni";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Alumni | St. Elizabeth High School",
  description:
    "Connect with the St. Elizabeth High School alumni community. Stay involved, attend events, and support the school that shaped you.",
};

export default function AlumniPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Reconnect"
          heading="St. Elizabeth Alumni"
          description={ALUMNI_INTRO.body}
          backgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
        />

        <Section
          background="soft"
          padding="xlarge"
          ariaLabel="Alumni community"
        >
          <Container>
            <Stack gap="xlarge">
              <Stack gap="medium">
                <Text variant="eyebrow">Our Community</Text>
                <Heading level="h2" variant="section">
                  {ALUMNI_INTRO.heading}
                </Heading>
              </Stack>

              <Stack gap="medium">
                <Heading level="h3" variant="section">
                  Notable Alumni
                </Heading>
                <Grid columns={3} gap="medium" responsive>
                  {NOTABLE_ALUMNI.map((alum) => (
                    <Card key={alum.name} variant="default" padding="medium">
                      <Stack gap="small">
                        <Heading level="h3" variant="card">
                          {alum.name}
                        </Heading>
                        <Text variant="caption">{alum.class}</Text>
                        <Text variant="muted" size="small">
                          {alum.achievement}
                        </Text>
                      </Stack>
                    </Card>
                  ))}
                </Grid>
              </Stack>

              <Stack gap="medium">
                <Heading level="h3" variant="section">
                  Upcoming Events
                </Heading>
                <Grid columns={3} gap="medium" responsive>
                  {ALUMNI_EVENTS.map((event) => (
                    <Card
                      key={event.title}
                      variant="default"
                      padding="medium"
                    >
                      <Stack gap="small">
                        <Heading level="h3" variant="card">
                          {event.title}
                        </Heading>
                        <Text variant="caption">{event.date}</Text>
                        <Text variant="muted" size="small">
                          {event.description}
                        </Text>
                        <Text variant="caption">{event.location}</Text>
                      </Stack>
                    </Card>
                  ))}
                </Grid>
              </Stack>
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
