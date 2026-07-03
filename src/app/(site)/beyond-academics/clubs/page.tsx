import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { CLUBS_PAGE, CLUBS } from "@/data/beyond-academics";
import { getHeroImage } from "@/lib/page-utils";

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
