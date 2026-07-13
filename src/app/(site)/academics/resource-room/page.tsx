import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { RESOURCE_ROOM_PAGE, RESOURCE_ROOM_SERVICES } from "@/domains/academics/resource.data";
import { ACADEMICS_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  RESOURCE_ROOM_PAGE.metaTitle,
  RESOURCE_ROOM_PAGE.metaDescription,
  "/academics/resource-room",
);

export default function ResourceRoomPage() {
  return (
    <ContentPage
      breadcrumb={RESOURCE_ROOM_PAGE.breadcrumb}
      heroEyebrow={RESOURCE_ROOM_PAGE.heroEyebrow}
      heroHeading={RESOURCE_ROOM_PAGE.heroHeading}
      heroDescription={RESOURCE_ROOM_PAGE.heroDescription}
      heroBackgroundImage={`/images/${ACADEMICS_IMAGES[2]!.filename}`}
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
