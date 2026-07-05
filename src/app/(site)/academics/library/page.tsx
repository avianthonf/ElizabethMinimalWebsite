import { Card } from "@/shared/ui/card";
import { ContentPage } from "@/screens/generic";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { LIBRARY_RESOURCES } from "@/domains/academics/academics.data";
import { ACADEMICS_IMAGES } from "@/domains/media/images.data";

const LIBRARY_PAGE = {
  metaTitle: "Library",
  metaDescription:
    "The library at St. Elizabeth's High School — a well-stocked resource centre with thousands of volumes and digital resources.",
  breadcrumb: { href: "/academics", label: "Academics", currentLabel: "Library" },
  heroEyebrow: "Discover",
  heroHeading: "Library",
  heroDescription:
    "A well-stocked library and digital resource centre supporting research, reading, and lifelong learning habits.",
  sectionHeading: "Library Resources",
  sectionAriaLabel: "Library resources and services",
} as const;

export const metadata = createPageMetadata(LIBRARY_PAGE.metaTitle, LIBRARY_PAGE.metaDescription);

export default function LibraryPage() {
  return (
    <ContentPage
      breadcrumb={LIBRARY_PAGE.breadcrumb}
      heroEyebrow={LIBRARY_PAGE.heroEyebrow}
      heroHeading={LIBRARY_PAGE.heroHeading}
      heroDescription={LIBRARY_PAGE.heroDescription}
      heroBackgroundImage={`/images/${ACADEMICS_IMAGES[3].filename}`}
      sectionHeading={LIBRARY_PAGE.sectionHeading}
      items={LIBRARY_RESOURCES}
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
      sectionAriaLabel={LIBRARY_PAGE.sectionAriaLabel}
    />
  );
}
