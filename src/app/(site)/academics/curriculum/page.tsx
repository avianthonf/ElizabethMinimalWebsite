import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Hero } from "@/shared/ui/hero";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  CURRICULUM_INTRO,
  CURRICULUM_HIGHLIGHTS,
  CURRICULUM_PAGE,
  NEP_READINESS,
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
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          { label: "Curriculum", href: "/academics/curriculum" },
        ]}
      />
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

            {/* NEP 2020 Readiness Section */}
            <div
              style={{
                marginTop: "var(--p-space-large)",
                padding: "var(--p-space-large)",
                background: "var(--p-color-cream, #f9f6f0)",
                borderRadius: "8px",
              }}
            >
              <Stack gap="medium">
                <Heading level="h2" variant="section">
                  {NEP_READINESS.heading}
                </Heading>
                <Text variant="muted" size="large">
                  {NEP_READINESS.body}
                </Text>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "var(--p-space-small)",
                  }}
                >
                  {NEP_READINESS.timeline.map((item) => (
                    <Card key={item.year} variant="default" padding="small">
                      <Stack gap="small">
                        <Text variant="eyebrow">{item.year}</Text>
                        <Text variant="muted" size="medium">
                          {item.milestone}
                        </Text>
                      </Stack>
                    </Card>
                  ))}
                </div>
                <ul style={{ paddingLeft: "1.25rem", color: "var(--p-color-muted)" }}>
                  {NEP_READINESS.highlights.map((h) => (
                    <li key={h} style={{ marginBottom: "0.25rem" }}>
                      <Text variant="muted" size="medium">
                        {h}
                      </Text>
                    </li>
                  ))}
                </ul>
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
