import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { SPORTS_PAGE, SPORTS } from "@/data/beyond-academics";
import { getHeroImage } from "@/lib/page-utils";

export const metadata = createPageMetadata(SPORTS_PAGE.metaTitle, SPORTS_PAGE.metaDescription);

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
