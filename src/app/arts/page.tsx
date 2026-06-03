import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { ImageCard } from "@/components/content/ImageCard";
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
import { ARTS_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Arts | St. Elizabeth High School",
  description:
    "Explore the visual and performing arts at St. Elizabeth High School — drawing, painting, sculpture, music, dance, and drama.",
};

export default function ArtsPage() {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Create"
          heading="Arts at St. Elizabeth"
          description="Nurturing creativity and self-expression through a rich programme of visual and performing arts that celebrates Goa's vibrant cultural heritage."
          backgroundImage={`/images/${ARTS_IMAGES[0].filename}`}
        />

        <Section
          background="soft"
          padding="xlarge"
          ariaLabel="Arts programmes"
        >
          <Container>
            <Stack gap="xlarge">
              <Stack gap="medium">
                <Text variant="eyebrow">Programmes</Text>
                <Heading level="h2" variant="section">
                  Visual & Performing Arts
                </Heading>
                <Text variant="muted" size="medium">
                  Our arts programmes encourage students to express their
                  individuality, build confidence, and develop an appreciation
                  for the arts that lasts a lifetime.
                </Text>
              </Stack>
              <Grid columns={2} gap="large" responsive>
                <ImageCard
                  image={`/images/${ARTS_IMAGES[1].filename}`}
                  imageAlt="Visual Arts at St. Elizabeth High School"
                  title="Visual Arts"
                  description="Drawing, painting, sculpture, and art history — explore your creative voice through hands-on practice and study."
                  aspectRatio="4:3"
                  href="/arts/visual-arts"
                />
                <ImageCard
                  image={`/images/${ARTS_IMAGES[2]?.filename ?? ARTS_IMAGES[1].filename}`}
                  imageAlt="Performing Arts at St. Elizabeth High School"
                  title="Performing Arts"
                  description="Music, dance, and drama — develop confidence and collaboration skills on stage and in the spotlight."
                  aspectRatio="4:3"
                  href="/arts/performing-arts"
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
