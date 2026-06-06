import { Card } from "@/components/content/Card";
import { ListPage } from "@/components/templates";
import { Heading } from "@/components/primitives/Heading";
import { Stack } from "@/components/layout/Stack";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { CLUBS_PAGE, CLUBS } from "@/data/student-life";
import { STUDENT_LIFE_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  CLUBS_PAGE.metaTitle,
  CLUBS_PAGE.metaDescription,
);

export default function ClubsPage() {
  return (
    <ListPage
      heroEyebrow={CLUBS_PAGE.heroEyebrow}
      heroHeading={CLUBS_PAGE.heroHeading}
      heroDescription={CLUBS_PAGE.heroDescription}
      heroBackgroundImage={`/images/${STUDENT_LIFE_IMAGES[1].filename}`}
      sectionHeading={CLUBS_PAGE.sectionHeading}
      sectionDescription={CLUBS_PAGE.sectionDescription}
      items={CLUBS}
      layout="grid"
      columns={2}
      renderItem={(club) => (
        <Card key={club.name} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {club.name}
            </Heading>
            <Text variant="caption">{club.category}</Text>
            <Text variant="muted" size="small">
              {club.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={CLUBS_PAGE.sectionAriaLabel}
    />
  );
}
