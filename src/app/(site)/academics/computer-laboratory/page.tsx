import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { COMPUTER_LAB_PAGE, COMPUTER_LAB_FACILITIES } from "@/domains/academics/computer.data";
import { ACADEMICS_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  COMPUTER_LAB_PAGE.metaTitle,
  COMPUTER_LAB_PAGE.metaDescription,
);

export default function ComputerLabPage() {
  return (
    <ContentPage
      breadcrumb={COMPUTER_LAB_PAGE.breadcrumb}
      heroEyebrow={COMPUTER_LAB_PAGE.heroEyebrow}
      heroHeading={COMPUTER_LAB_PAGE.heroHeading}
      heroDescription={COMPUTER_LAB_PAGE.heroDescription}
      heroBackgroundImage={`/images/${ACADEMICS_IMAGES[5].filename}`}
      sectionHeading={COMPUTER_LAB_PAGE.sectionHeading}
      items={COMPUTER_LAB_FACILITIES}
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
      sectionAriaLabel={COMPUTER_LAB_PAGE.sectionAriaLabel}
    />
  );
}
