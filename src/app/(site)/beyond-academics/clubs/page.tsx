import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/pages/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { CLUBS_PAGE, CLUBS } from "@/domains/beyond-academics/beyond.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(CLUBS_PAGE.metaTitle, CLUBS_PAGE.metaDescription);

export default function ClubsPage() {
  return (
    <ContentPage
      heroEyebrow={CLUBS_PAGE.heroEyebrow}
      heroHeading={CLUBS_PAGE.heroHeading}
      heroDescription={CLUBS_PAGE.heroDescription}
      heroBackgroundImage={`/images/${getHeroImage("student-life-hero").filename}`}
      sectionHeading={CLUBS_PAGE.sectionHeading}
      sectionDescription={CLUBS_PAGE.sectionDescription}
      items={CLUBS}
      columns={2}
      renderItem={(club) => (
        <Card key={club.name} variant="default" padding="medium">
          <Stack gap="small">
            <Text variant="eyebrow">{club.category}</Text>
            <Heading level="h3" variant="card">
              {club.name}
            </Heading>
            <Text variant="muted" size="medium">
              {club.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={CLUBS_PAGE.sectionAriaLabel}
    />
  );
}
