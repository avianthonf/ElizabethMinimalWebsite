import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  NEWSLETTER_PAGE,
  NEWSLETTER_INTRO,
  NEWSLETTER_ARCHIVE,
} from "@/domains/news/newsletter.data";
import { getHeroImage } from "@/shared/lib/page-utils";
import { NewsletterSignup } from "@/features/newsletter/newsletter-signup";

export const metadata = createPageMetadata(
  NEWSLETTER_PAGE.metaTitle,
  NEWSLETTER_PAGE.metaDescription,
  "/news/newsletter",
);

export default function NewsletterPage() {
  return (
    <>
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
      {/* Newsletter Signup Form */}
      <section
        style={{
          padding: "var(--spacing-2xl) var(--spacing-lg)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <NewsletterSignup />
      </section>
    </>
  );
}
