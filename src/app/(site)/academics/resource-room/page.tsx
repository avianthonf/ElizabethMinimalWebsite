import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { RESOURCE_ROOM_PAGE, RESOURCE_ROOM_SERVICES } from "@/data/academics-resource";
import { ACADEMICS_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  RESOURCE_ROOM_PAGE.metaTitle,
  RESOURCE_ROOM_PAGE.metaDescription,
);

export default function ResourceRoomPage() {
  return (
    <ContentPage
      breadcrumb={RESOURCE_ROOM_PAGE.breadcrumb}
      heroEyebrow={RESOURCE_ROOM_PAGE.heroEyebrow}
      heroHeading={RESOURCE_ROOM_PAGE.heroHeading}
      heroDescription={RESOURCE_ROOM_PAGE.heroDescription}
      heroBackgroundImage={`/images/${ACADEMICS_IMAGES[2].filename}`}
      sectionHeading={RESOURCE_ROOM_PAGE.sectionHeading}
      items={RESOURCE_ROOM_SERVICES}
      columns={2}
      renderItem={(item) => (
        <Card key={item.title} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {item.title}
            </Heading>
            <Text variant="muted" size="medium">
              {item.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={RESOURCE_ROOM_PAGE.sectionAriaLabel}
    />
  );
}
