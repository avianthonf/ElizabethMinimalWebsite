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
import { NEWS_ARTICLES } from "@/data/news";
import { HERO_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  "News & Events",
  "Stay informed with the latest news, events, and achievements from St. Elizabeth High School in Pomburpa, Goa.",
);

export default function NewsPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Stay Informed"
          heading="News & Events"
          description="The latest updates, achievements, and happenings from the St. Elizabeth High School community."
          backgroundImage={`/images/${HERO_IMAGES[0].filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="News articles"
      >
        <Container>
          <Stack gap="xlarge">
            <Stack gap="medium">
              <Text variant="eyebrow">Latest</Text>
              <Heading level="h2" variant="section">
                School News
              </Heading>
            </Stack>
            <Grid columns={3} gap="large" responsive>
              {NEWS_ARTICLES.map((article) => (
                <ImageCard
                  key={article.href}
                  image={`/images/${article.imageFilename}`}
                  imageAlt={article.title}
                  title={article.title}
                  description={`${article.date} — ${article.excerpt}`}
                  aspectRatio="4:3"
                  href={article.href}
                />
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
