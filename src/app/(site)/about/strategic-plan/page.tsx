import { Card } from "@/components/content/Card";
import { CardGridPage } from "@/components/templates";
import { Heading } from "@/components/primitives/Heading";
import { Stack } from "@/components/layout/Stack";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { STRATEGIC_PLAN_PAGE, STRATEGIC_PLAN_POINTS } from "@/data/about";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  STRATEGIC_PLAN_PAGE.metaTitle,
  STRATEGIC_PLAN_PAGE.metaDescription,
);

export default function StrategicPlanPage() {
  return (
    <CardGridPage
      breadcrumb={STRATEGIC_PLAN_PAGE.breadcrumb}
      heroEyebrow={STRATEGIC_PLAN_PAGE.heroEyebrow}
      heroHeading={STRATEGIC_PLAN_PAGE.heroHeading}
      heroDescription={STRATEGIC_PLAN_PAGE.heroDescription}
      heroBackgroundImage={`/images/${COMMUNITY_IMAGES[3]?.filename ?? COMMUNITY_IMAGES[0].filename}`}
      sectionHeading={STRATEGIC_PLAN_PAGE.sectionHeading}
      items={STRATEGIC_PLAN_POINTS}
      columns={2}
      renderCard={(point) => (
        <Card key={point.title} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {point.title}
            </Heading>
            <Text variant="muted" size="medium">
              {point.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={STRATEGIC_PLAN_PAGE.sectionAriaLabel}
    />
  );
}
