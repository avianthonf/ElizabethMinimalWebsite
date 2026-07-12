import { Hero } from "@/shared/ui/hero";
import { ImageCard } from "@/shared/ui/image-card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { getNewsArticles } from "@/domains/news/news.fetcher";
import { HERO_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  "News & Events",
  "Stay informed with the latest news, events, and achievements from St. Elizabeth's High School in Pomburpa, Goa.",
  "/news",
);

export default async function NewsPage() {
  const articles = await getNewsArticles();

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
              {articles.map((article) => (
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
            <p
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                color: "var(--p-color-text-muted)",
                fontSize: "1rem",
                lineHeight: "1.6",
              }}
            >
              More News Coming Soon...
              <br />
              This page is regularly updated with the latest events, celebrations, achievements, and
              announcements from St. Elizabeth&apos;s High School. Be sure to visit again to stay
              informed about what&apos;s happening in our school.
            </p>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
