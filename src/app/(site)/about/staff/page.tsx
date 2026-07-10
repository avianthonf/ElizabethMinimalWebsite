import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Heading } from "@/shared/ui/heading";
import { Stack } from "@/shared/ui/stack";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { STAFF_PAGE, STAFF_MEMBERS } from "@/domains/about/about.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  STAFF_PAGE.metaTitle,
  STAFF_PAGE.metaDescription,
  "/about/staff",
);

export default function StaffPage() {
  return (
    <ContentPage
      breadcrumb={STAFF_PAGE.breadcrumb}
      heroEyebrow={STAFF_PAGE.heroEyebrow}
      heroHeading={STAFF_PAGE.heroHeading}
      heroDescription={STAFF_PAGE.heroDescription}
      heroBackgroundImage={`/images/${COMMUNITY_IMAGES[1].filename}`}
      sectionHeading={STAFF_PAGE.sectionHeading}
      items={STAFF_MEMBERS}
      layout="list"
      renderItem={(member) => (
        <Card key={member.role} variant="default" padding="medium">
          <Stack gap="small">
            {member.name && (
              <Heading level="h3" variant="card">
                {member.name}
              </Heading>
            )}
            <Text variant="eyebrow">{member.role}</Text>
            <Text variant="muted" size="small">
              {member.department}
            </Text>
            <Text variant="muted" size="medium">
              {member.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel={STAFF_PAGE.sectionAriaLabel}
    />
  );
}
