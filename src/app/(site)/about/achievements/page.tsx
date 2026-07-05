import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { ACHIEVEMENTS_PAGE, ACHIEVEMENTS } from "@/domains/about/achievements.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  ACHIEVEMENTS_PAGE.metaTitle,
  ACHIEVEMENTS_PAGE.metaDescription,
);

export default function AchievementsPage() {
  return (
    <ContentPage
      breadcrumb={ACHIEVEMENTS_PAGE.breadcrumb}
      heroEyebrow={ACHIEVEMENTS_PAGE.heroEyebrow}
      heroHeading={ACHIEVEMENTS_PAGE.heroHeading}
      heroDescription={ACHIEVEMENTS_PAGE.heroDescription}
      heroBackgroundImage={`/images/${COMMUNITY_IMAGES[2].filename}`}
      sectionHeading="Our Journey Through the Years"
      items={ACHIEVEMENTS}
      layout="list"
      renderItem={(achievement) => (
        <Card key={achievement.year} variant="default" padding="medium">
          <Stack gap="small">
            <Text variant="eyebrow">{achievement.year}</Text>
            <Heading level="h3" variant="card">
              {achievement.title}
            </Heading>
            <Text variant="muted" size="medium">
              {achievement.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={ACHIEVEMENTS_PAGE.sectionAriaLabel}
    />
  );
}
