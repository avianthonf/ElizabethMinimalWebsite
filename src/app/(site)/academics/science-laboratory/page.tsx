import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { SCIENCE_LAB_PAGE, SCIENCE_LAB_FACILITIES } from "@/domains/academics/science.data";
import { ACADEMICS_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  SCIENCE_LAB_PAGE.metaTitle,
  SCIENCE_LAB_PAGE.metaDescription,
);

export default function ScienceLabPage() {
  return (
    <ContentPage
      breadcrumb={SCIENCE_LAB_PAGE.breadcrumb}
      heroEyebrow={SCIENCE_LAB_PAGE.heroEyebrow}
      heroHeading={SCIENCE_LAB_PAGE.heroHeading}
      heroDescription={SCIENCE_LAB_PAGE.heroDescription}
      heroBackgroundImage={`/images/${ACADEMICS_IMAGES[4].filename}`}
      sectionHeading={SCIENCE_LAB_PAGE.sectionHeading}
      items={SCIENCE_LAB_FACILITIES}
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
      sectionAriaLabel={SCIENCE_LAB_PAGE.sectionAriaLabel}
    />
  );
}
