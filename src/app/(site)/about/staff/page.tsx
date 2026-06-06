import { Card } from "@/components/content/Card";
import { ListPage } from "@/components/templates";
import { Heading } from "@/components/primitives/Heading";
import { Stack } from "@/components/layout/Stack";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { STAFF_PAGE, STAFF_MEMBERS } from "@/data/about";
import { COMMUNITY_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  STAFF_PAGE.metaTitle,
  STAFF_PAGE.metaDescription,
);

export default function StaffPage() {
  return (
    <ListPage
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
