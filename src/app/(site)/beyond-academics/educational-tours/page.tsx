import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/pages/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { EDUCATIONAL_TOURS_PAGE, EDUCATIONAL_TOURS } from "@/domains/beyond-academics/beyond.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  EDUCATIONAL_TOURS_PAGE.metaTitle,
  EDUCATIONAL_TOURS_PAGE.metaDescription,
);

export default function EducationalToursPage() {
  return (
    <ContentPage
      heroEyebrow={EDUCATIONAL_TOURS_PAGE.heroEyebrow}
      heroHeading={EDUCATIONAL_TOURS_PAGE.heroHeading}
      heroDescription={EDUCATIONAL_TOURS_PAGE.heroDescription}
      heroBackgroundImage={`/images/${getHeroImage("about-hero").filename}`}
      sectionHeading={EDUCATIONAL_TOURS_PAGE.sectionHeading}
      items={EDUCATIONAL_TOURS}
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
      sectionAriaLabel={EDUCATIONAL_TOURS_PAGE.sectionAriaLabel}
    />
  );
}
