import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/pages/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { DEPARTMENTS } from "@/domains/academics/academics.data";
import { ACADEMICS_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  "Curriculum",
  "The CBSE curriculum at St. Elizabeth's High School — comprehensive education across all core subjects.",
);

export default function CurriculumPage() {
  return (
    <ContentPage
      heroEyebrow="Academics"
      heroHeading="Curriculum"
      heroDescription="Our comprehensive CBSE curriculum provides a strong foundation across all core subjects, nurturing curiosity, critical thinking, and a love of learning."
      heroBackgroundImage={`/images/${ACADEMICS_IMAGES[0].filename}`}
      sectionHeading="Academic Departments"
      sectionDescription="Explore our curriculum across every subject area — each supported by dedicated faculty and modern facilities."
      items={DEPARTMENTS}
      columns={2}
      renderItem={(item) => (
        <Card key={item.name} variant="default" padding="medium">
          <Stack gap="small">
            <Heading level="h3" variant="card">
              {item.name}
            </Heading>
            <Text variant="muted" size="medium">
              {item.description}
            </Text>
          </Stack>
        </Card>
      )}
      sectionAriaLabel="Academic curriculum and departments"
    />
  );
}
