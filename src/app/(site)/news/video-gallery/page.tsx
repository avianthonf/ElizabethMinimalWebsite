import Link from "next/link";
import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  VIDEO_GALLERY_PAGE,
  VIDEO_GALLERY_ITEMS,
  YOUTUBE_CHANNEL,
} from "@/domains/news/video.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  VIDEO_GALLERY_PAGE.metaTitle,
  VIDEO_GALLERY_PAGE.metaDescription,
);

export default function VideoGalleryPage() {
  return (
    <>
      <Hero
        eyebrow={VIDEO_GALLERY_PAGE.heroEyebrow}
        heading={VIDEO_GALLERY_PAGE.heroHeading}
        description={VIDEO_GALLERY_PAGE.heroDescription}
        backgroundImage={`/images/${getHeroImage("news-hero").filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel={VIDEO_GALLERY_PAGE.sectionAriaLabel}>
        <Container>
          <Stack gap="xlarge">
            <Breadcrumb
              href={VIDEO_GALLERY_PAGE.breadcrumb.href}
              label={VIDEO_GALLERY_PAGE.breadcrumb.label}
              currentLabel={VIDEO_GALLERY_PAGE.breadcrumb.currentLabel}
            />

            {/* Channel header — link to the full YouTube channel */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <a
                href={YOUTUBE_CHANNEL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Visit our YouTube Channel →
              </a>
            </div>

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
                        {video.placeholder && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 400,
                              color: "var(--color-text-muted, #666)",
                              marginLeft: "0.5rem",
                            }}
                          >
                            Coming Soon
                          </span>
                        )}
                      </Heading>
                      <Text variant="muted" size="small">
                        {video.description}
                      </Text>
                      {video.placeholder ? (
                        <Link
                          href={YOUTUBE_CHANNEL.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--color-accent, #1a56db)",
                            textDecoration: "underline",
                          }}
                        >
                          Watch on YouTube →
                        </Link>
                      ) : (
                        <a
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--color-accent, #1a56db)",
                            textDecoration: "underline",
                          }}
                        >
                          Watch →
                        </a>
                      )}
                    </Stack>
                  </div>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
