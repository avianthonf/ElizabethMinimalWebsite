import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { SPORTS_PAGE, SPORTS } from "@/domains/beyond-academics/beyond.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  SPORTS_PAGE.metaTitle,
  SPORTS_PAGE.metaDescription,
  "/beyond-academics/sports",
);

export default function SportsPage() {
  return (
    <ContentPage
      heroEyebrow={SPORTS_PAGE.heroEyebrow}
      heroHeading={SPORTS_PAGE.heroHeading}
      heroDescription={SPORTS_PAGE.heroDescription}
      heroBackgroundImage={`/images/${getHeroImage("athletics-hero").filename}`}
      sectionHeading={SPORTS_PAGE.sectionHeading}
      items={SPORTS}
      columns={2}
      renderItem={(sport) => (
        <Card key={sport.name} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {sport.name}
            </Heading>
            <Text variant="caption">{sport.seasons.join(", ")}</Text>
            <Text variant="muted" size="medium">
              {sport.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={SPORTS_PAGE.sectionAriaLabel}
    />
  );
}
