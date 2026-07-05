import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { STUDENT_COUNCIL_PAGE, STUDENT_COUNCIL_ROLES } from "@/data/beyond-academics";
import { getHeroImage } from "@/lib/page-utils";

export const metadata = createPageMetadata(
  STUDENT_COUNCIL_PAGE.metaTitle,
  STUDENT_COUNCIL_PAGE.metaDescription,
);

export default function StudentCouncilPage() {
  return (
    <ContentPage
      heroEyebrow={STUDENT_COUNCIL_PAGE.heroEyebrow}
      heroHeading={STUDENT_COUNCIL_PAGE.heroHeading}
      heroDescription={STUDENT_COUNCIL_PAGE.heroDescription}
      heroBackgroundImage={`/images/${getHeroImage("student-life-hero").filename}`}
      sectionHeading={STUDENT_COUNCIL_PAGE.sectionHeading}
      items={STUDENT_COUNCIL_ROLES}
      columns={2}
      renderItem={(role) => (
        <Card key={role.title} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {role.title}
            </Heading>
            <Text variant="muted" size="medium">
              {role.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={STUDENT_COUNCIL_PAGE.sectionAriaLabel}
    />
  );
}
