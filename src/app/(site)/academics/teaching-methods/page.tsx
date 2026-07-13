import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { TEACHING_METHODS_PAGE, TEACHING_METHODS } from "@/domains/academics/teaching.data";
import { ACADEMICS_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  TEACHING_METHODS_PAGE.metaTitle,
  TEACHING_METHODS_PAGE.metaDescription,
  "/academics/teaching-methods",
);

export default function TeachingMethodsPage() {
  return (
    <ContentPage
      breadcrumb={TEACHING_METHODS_PAGE.breadcrumb}
      heroEyebrow={TEACHING_METHODS_PAGE.heroEyebrow}
      heroHeading={TEACHING_METHODS_PAGE.heroHeading}
      heroDescription={TEACHING_METHODS_PAGE.heroDescription}
      heroBackgroundImage={`/images/${ACADEMICS_IMAGES[1]!.filename}`}
      sectionHeading={TEACHING_METHODS_PAGE.sectionHeading}
      items={TEACHING_METHODS}
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
      sectionAriaLabel={TEACHING_METHODS_PAGE.sectionAriaLabel}
    />
  );
}
