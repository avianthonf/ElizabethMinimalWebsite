import { Card } from "@/components/content/Card";
import { CardGridPage } from "@/components/templates";
import { Heading } from "@/components/primitives/Heading";
import { Stack } from "@/components/layout/Stack";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { MISSION_PAGE, MISSION_STATEMENT } from "@/data/about";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  MISSION_PAGE.metaTitle,
  MISSION_PAGE.metaDescription,
);

export default function MissionPage() {
  return (
    <CardGridPage
      breadcrumb={MISSION_PAGE.breadcrumb}
      heroEyebrow={MISSION_PAGE.heroEyebrow}
      heroHeading={MISSION_PAGE.heroHeading}
      heroDescription={MISSION_PAGE.heroDescription}
      heroBackgroundImage={`/images/${COMMUNITY_IMAGES[2].filename}`}
      sectionHeading={MISSION_STATEMENT.heading}
      sectionDescription={MISSION_STATEMENT.body}
      items={MISSION_STATEMENT.values}
      columns={2}
      renderCard={(value) => (
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
