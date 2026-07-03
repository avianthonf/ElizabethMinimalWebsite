import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { NEWSLETTER_PAGE, NEWSLETTER_INTRO, NEWSLETTER_ARCHIVE } from "@/data/news-newsletter";
import { getHeroImage } from "@/lib/page-utils";

export const metadata = createPageMetadata(NEWSLETTER_PAGE.metaTitle, NEWSLETTER_PAGE.metaDescription);

export default function NewsletterPage() {
  return (
    <ContentPage
      breadcrumb={NEWSLETTER_PAGE.breadcrumb}
      heroEyebrow={NEWSLETTER_PAGE.heroEyebrow}
      heroHeading={NEWSLETTER_PAGE.heroHeading}
      heroDescription={NEWSLETTER_PAGE.heroDescription}
      heroBackgroundImage={`/images/${getHeroImage("news-hero").filename}`}
      sectionHeading={NEWSLETTER_INTRO.heading}
      sectionDescription={NEWSLETTER_INTRO.body}
      items={NEWSLETTER_ARCHIVE}
      layout="list"
      renderItem={(item) => (
        <Card key={item.title} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {item.title}
            </Heading>
            <Text variant="muted" size="small">
              {item.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={NEWSLETTER_PAGE.sectionAriaLabel}
    />
  );
}
