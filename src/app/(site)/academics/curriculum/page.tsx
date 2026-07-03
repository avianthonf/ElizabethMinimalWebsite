import { Card } from "@/components/content/Card";
import { ContentPage } from "@/components/templates";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { createPageMetadata } from "@/lib/page-utils";
import { DEPARTMENTS } from "@/data/academics";
import { ACADEMICS_IMAGES } from "@/data/images";

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
