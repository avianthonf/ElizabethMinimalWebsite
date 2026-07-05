import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { ACHIEVEMENTS_PAGE, ACHIEVEMENTS } from "@/data/about-achievements";
import { COMMUNITY_IMAGES } from "@/data/images";

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
