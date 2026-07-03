import { Hero } from "@/components/content/Hero";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { PageShell } from "@/components/layout";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { VIDEO_GALLERY_PAGE, VIDEO_GALLERY_ITEMS } from "@/data/news-video";
import { getHeroImage } from "@/lib/page-utils";

export const metadata = createPageMetadata(VIDEO_GALLERY_PAGE.metaTitle, VIDEO_GALLERY_PAGE.metaDescription);

export default function VideoGalleryPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow={VIDEO_GALLERY_PAGE.heroEyebrow}
          heading={VIDEO_GALLERY_PAGE.heroHeading}
          description={VIDEO_GALLERY_PAGE.heroDescription}
          backgroundImage={`/images/${getHeroImage("news-hero").filename}`}
        />
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel={VIDEO_GALLERY_PAGE.sectionAriaLabel}>
        <Container>
          <Stack gap="xlarge">
            <Breadcrumb
              href={VIDEO_GALLERY_PAGE.breadcrumb.href}
              label={VIDEO_GALLERY_PAGE.breadcrumb.label}
              currentLabel={VIDEO_GALLERY_PAGE.breadcrumb.currentLabel}
            />
            <Grid columns={3} gap="medium" responsive>
              {VIDEO_GALLERY_ITEMS.map((video) => (
                <Card key={video.title} variant="default" padding="small">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt={video.description}
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                  <div style={{ padding: "1rem" }}>
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {video.title}
                      </Heading>
                      <Text variant="muted" size="small">
                        {video.description}
                      </Text>
                    </Stack>
                  </div>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
