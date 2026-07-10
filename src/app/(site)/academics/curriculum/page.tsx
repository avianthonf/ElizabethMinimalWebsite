import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Hero } from "@/shared/ui/hero";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  CURRICULUM_INTRO,
  CURRICULUM_HIGHLIGHTS,
  CURRICULUM_PAGE,
} from "@/domains/academics/academics.data";
import { ACADEMICS_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  CURRICULUM_PAGE.metaTitle,
  CURRICULUM_PAGE.metaDescription,
  "/academics/curriculum",
);

export default function CurriculumPage() {
  return (
    <>
      <Breadcrumb href="/academics" label="Academics" currentLabel="Curriculum" />
      <Hero
        eyebrow={CURRICULUM_PAGE.heroEyebrow}
        heading={CURRICULUM_PAGE.heroHeading}
        description={CURRICULUM_PAGE.heroDescription}
        backgroundImage={`/images/${ACADEMICS_IMAGES[0].filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel={CURRICULUM_PAGE.sectionAriaLabel}>
        <Container width="wide">
          <Stack gap="large">
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {CURRICULUM_INTRO.heading}
              </Heading>
              <Text variant="muted" size="large">
                {CURRICULUM_INTRO.body}
              </Text>
            </Stack>
            <Heading level="h3" variant="section">
              {CURRICULUM_PAGE.sectionHeading}
            </Heading>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "var(--p-space-medium)",
              }}
            >
              {CURRICULUM_HIGHLIGHTS.map((item) => (
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
              ))}
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
