import { Hero } from "@/components/content/Hero";
import { ImageCard } from "@/components/content/ImageCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { ARTS_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  "Arts",
  "Explore the visual and performing arts at St. Elizabeth's High School — drawing, painting, sculpture, music, dance, and drama.",
);

export default function ArtsPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Create"
          heading="Arts at St. Elizabeth"
          description="Nurturing creativity and self-expression through a rich programme of visual and performing arts that celebrates Goa's vibrant cultural heritage."
          backgroundImage={`/images/${ARTS_IMAGES[0].filename}`}
        />
      }
    >
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
                imageAlt="Visual Arts at St. Elizabeth's High School"
                title="Visual Arts"
                description="Drawing, painting, sculpture, and art history — explore your creative voice through hands-on practice and study."
                aspectRatio="4:3"
                href="/arts/visual-arts"
              />
              <ImageCard
                image={`/images/${ARTS_IMAGES[2]?.filename ?? ARTS_IMAGES[1].filename}`}
                imageAlt="Performing Arts at St. Elizabeth's High School"
                title="Performing Arts"
                description="Music, dance, and drama — develop confidence and collaboration skills on stage and in the spotlight."
                aspectRatio="4:3"
                href="/arts/performing-arts"
              />
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
