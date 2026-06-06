import { Card } from "@/components/content/Card";
import { CardGridPage } from "@/components/templates";
import { Heading } from "@/components/primitives/Heading";
import { Stack } from "@/components/layout/Stack";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { PERFORMING_ARTS_PAGE, PERFORMING_ARTS_PROGRAMS } from "@/data/arts";
import { ARTS_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  PERFORMING_ARTS_PAGE.metaTitle,
  PERFORMING_ARTS_PAGE.metaDescription,
);

export default function PerformingArtsPage() {
  return (
    <CardGridPage
      heroEyebrow={PERFORMING_ARTS_PAGE.heroEyebrow}
      heroHeading={PERFORMING_ARTS_PAGE.heroHeading}
      heroDescription={PERFORMING_ARTS_PAGE.heroDescription}
      heroBackgroundImage={`/images/${ARTS_IMAGES[2].filename}`}
      sectionHeading={PERFORMING_ARTS_PAGE.sectionHeading}
      items={PERFORMING_ARTS_PROGRAMS}
      renderCard={(program) => (
        <Card key={program.title} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {program.title}
            </Heading>
            <Text variant="muted" size="medium">
              {program.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={PERFORMING_ARTS_PAGE.sectionAriaLabel}
    />
  );
}
