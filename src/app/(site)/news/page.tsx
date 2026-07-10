import { Hero } from "@/shared/ui/hero";
import { ImageCard } from "@/shared/ui/image-card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { NEWS_ARTICLES } from "@/domains/news/news.data";
import { HERO_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  "News & Events",
  "Stay informed with the latest news, events, and achievements from St. Elizabeth's High School in Pomburpa, Goa.",
  "/news",
);

export default function NewsPage() {
  return (
    <>
      <Hero
        eyebrow="Stay Informed"
        heading="News & Events"
        description="The latest updates, achievements, and happenings from the St. Elizabeth's High School community."
        backgroundImage={`/images/${HERO_IMAGES[0].filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel="News articles">
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
    </>
  );
}
