import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { MOTTO_ANTHEM_PAGE, SCHOOL_MOTTO } from "@/data/about-motto";
import { COMMUNITY_IMAGES } from "@/data/images";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";

export const metadata = createPageMetadata(MOTTO_ANTHEM_PAGE.metaTitle, MOTTO_ANTHEM_PAGE.metaDescription);

export default function MottoAnthemPage() {
  return (
    <ContentPage
      breadcrumb={MOTTO_ANTHEM_PAGE.breadcrumb}
      heroEyebrow={MOTTO_ANTHEM_PAGE.heroEyebrow}
      heroHeading={MOTTO_ANTHEM_PAGE.heroHeading}
      heroDescription={MOTTO_ANTHEM_PAGE.heroDescription}
      heroBackgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
      sectionHeading={SCHOOL_MOTTO.heading}
      items={[SCHOOL_MOTTO]}
      layout="list"
      renderItem={(item) => (
        <Card variant="default" padding="medium">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              {item.text}
            </Heading>
            <Text variant="muted" size="medium">
              {item.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={MOTTO_ANTHEM_PAGE.sectionAriaLabel}
    />
  );
}
