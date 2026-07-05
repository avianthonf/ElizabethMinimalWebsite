import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Stack } from "@/shared/ui/stack";
import { MOTTO_ANTHEM_PAGE, SCHOOL_MOTTO } from "@/domains/about/motto.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  MOTTO_ANTHEM_PAGE.metaTitle,
  MOTTO_ANTHEM_PAGE.metaDescription,
);

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
