import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { EDUCATIONAL_TOURS_PAGE, EDUCATIONAL_TOURS } from "@/data/beyond-academics";
import { getHeroImage } from "@/lib/page-utils";

export const metadata = createPageMetadata(EDUCATIONAL_TOURS_PAGE.metaTitle, EDUCATIONAL_TOURS_PAGE.metaDescription);

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
