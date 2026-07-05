import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/components/templates";
import { Heading } from "@/shared/ui/heading";
import { Stack } from "@/shared/ui/stack";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { MISSION_PAGE, MISSION_STATEMENT } from "@/domains/about/about.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(MISSION_PAGE.metaTitle, MISSION_PAGE.metaDescription);

export default function MissionPage() {
  return (
    <ContentPage
      breadcrumb={MISSION_PAGE.breadcrumb}
      heroEyebrow={MISSION_PAGE.heroEyebrow}
      heroHeading={MISSION_PAGE.heroHeading}
      heroDescription={MISSION_PAGE.heroDescription}
      heroBackgroundImage={`/images/${COMMUNITY_IMAGES[2].filename}`}
      sectionHeading={MISSION_STATEMENT.heading}
      sectionDescription={MISSION_STATEMENT.body}
      items={MISSION_STATEMENT.values}
      columns={2}
      renderItem={(value) => (
        <Card key={value.title} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {value.title}
            </Heading>
            <Text variant="muted" size="medium">
              {value.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={MISSION_PAGE.sectionAriaLabel}
    />
  );
}
