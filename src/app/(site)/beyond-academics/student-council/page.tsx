import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  STUDENT_COUNCIL_PAGE,
  STUDENT_COUNCIL_ROLES,
} from "@/domains/beyond-academics/beyond.data";
import { getHeroImage } from "@/shared/lib/page-utils";

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
