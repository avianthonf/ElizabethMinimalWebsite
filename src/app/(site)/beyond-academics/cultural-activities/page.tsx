import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  CULTURAL_ACTIVITIES_PAGE,
  CULTURAL_PROGRAMMES,
} from "@/domains/beyond-academics/beyond.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  CULTURAL_ACTIVITIES_PAGE.metaTitle,
  CULTURAL_ACTIVITIES_PAGE.metaDescription,
  "/beyond-academics/cultural-activities",
);

export default function CulturalActivitiesPage() {
  return (
    <ContentPage
      heroEyebrow={CULTURAL_ACTIVITIES_PAGE.heroEyebrow}
      heroHeading={CULTURAL_ACTIVITIES_PAGE.heroHeading}
      heroDescription={CULTURAL_ACTIVITIES_PAGE.heroDescription}
      heroBackgroundImage={`/images/${getHeroImage("arts-hero").filename}`}
      sectionHeading={CULTURAL_ACTIVITIES_PAGE.sectionHeading}
      items={CULTURAL_PROGRAMMES}
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
      sectionAriaLabel={CULTURAL_ACTIVITIES_PAGE.sectionAriaLabel}
    />
  );
}
