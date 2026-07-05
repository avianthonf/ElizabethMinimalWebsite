import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { INFRASTRUCTURE_PAGE, INFRASTRUCTURE_FACILITIES } from "@/data/admissions-infrastructure";
import { getHeroImage } from "@/lib/page-utils";

export const metadata = createPageMetadata(
  INFRASTRUCTURE_PAGE.metaTitle,
  INFRASTRUCTURE_PAGE.metaDescription,
);

export default function InfrastructurePage() {
  return (
    <ContentPage
      breadcrumb={INFRASTRUCTURE_PAGE.breadcrumb}
      heroEyebrow={INFRASTRUCTURE_PAGE.heroEyebrow}
      heroHeading={INFRASTRUCTURE_PAGE.heroHeading}
      heroDescription={INFRASTRUCTURE_PAGE.heroDescription}
      heroBackgroundImage={`/images/${getHeroImage("admissions-hero").filename}`}
      sectionHeading="Campus Facilities"
      sectionDescription="Our campus in Pomburpa, Bardez, provides a safe, supportive, and well-equipped environment for learning and growth."
      items={INFRASTRUCTURE_FACILITIES}
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
      sectionAriaLabel={INFRASTRUCTURE_PAGE.sectionAriaLabel}
    />
  );
}
