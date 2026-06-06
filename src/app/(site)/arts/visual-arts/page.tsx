import { Card } from "@/components/content/Card";
import { CardGridPage } from "@/components/templates";
import { Heading } from "@/components/primitives/Heading";
import { Stack } from "@/components/layout/Stack";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { VISUAL_ARTS_PAGE, VISUAL_ARTS_PROGRAMS } from "@/data/arts";
import { ARTS_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  VISUAL_ARTS_PAGE.metaTitle,
  VISUAL_ARTS_PAGE.metaDescription,
);

export default function VisualArtsPage() {
  return (
    <CardGridPage
      heroEyebrow={VISUAL_ARTS_PAGE.heroEyebrow}
      heroHeading={VISUAL_ARTS_PAGE.heroHeading}
      heroDescription={VISUAL_ARTS_PAGE.heroDescription}
      heroBackgroundImage={`/images/${ARTS_IMAGES[1].filename}`}
      sectionHeading={VISUAL_ARTS_PAGE.sectionHeading}
      items={VISUAL_ARTS_PROGRAMS}
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
      sectionAriaLabel={VISUAL_ARTS_PAGE.sectionAriaLabel}
    />
  );
}
