import { Card } from "@/shared/ui/card";
import { Hero } from "@/shared/ui/hero";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  CULTURAL_ACTIVITIES_PAGE,
  CULTURAL_PROGRAMMES,
} from "@/domains/beyond-academics/beyond.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  CULTURAL_ACTIVITIES_PAGE.metaTitle,
  CULTURAL_ACTIVITIES_PAGE.metaDescription,
  "/beyond-academics/cultural-activities",
);

export default function CulturalActivitiesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          {
            label: CULTURAL_ACTIVITIES_PAGE.breadcrumb.label,
            href: CULTURAL_ACTIVITIES_PAGE.breadcrumb.href,
          },
          {
            label: CULTURAL_ACTIVITIES_PAGE.breadcrumb.currentLabel,
            href: "/beyond-academics/cultural-activities",
          },
        ]}
      />
      <Breadcrumb
        href={CULTURAL_ACTIVITIES_PAGE.breadcrumb.href}
        label={CULTURAL_ACTIVITIES_PAGE.breadcrumb.label}
        currentLabel={CULTURAL_ACTIVITIES_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={CULTURAL_ACTIVITIES_PAGE.heroEyebrow}
        heading={CULTURAL_ACTIVITIES_PAGE.heroHeading}
        description={CULTURAL_ACTIVITIES_PAGE.heroDescription}
        backgroundImage={`/images/${getHeroImage("arts-hero").filename}`}
      />

      <Section
        background="soft"
        padding="xlarge"
        ariaLabel={CULTURAL_ACTIVITIES_PAGE.sectionAriaLabel}
      >
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              {CULTURAL_ACTIVITIES_PAGE.sectionHeading}
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {CULTURAL_PROGRAMMES.map((programme) => (
                <Card key={programme.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <div style={{ fontSize: "2.5rem" }}>{programme.icon}</div>
                    <Heading level="h3" variant="card">
                      {programme.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {programme.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
