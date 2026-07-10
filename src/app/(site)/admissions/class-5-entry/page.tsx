import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Link } from "@/shared/ui/link";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import {
  CLASS5_ENTRY_PAGE,
  CLASS5_BENEFITS,
  CLASS5_FEEDER_SCHOOLS,
} from "@/domains/admissions/class5-entry.data";

export const metadata = createPageMetadata(
  CLASS5_ENTRY_PAGE.metaTitle,
  CLASS5_ENTRY_PAGE.metaDescription,
);

export default function Class5EntryPage() {
  const heroImage = getHeroImage("admissions-hero");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Admissions", href: "/admissions" },
          { label: CLASS5_ENTRY_PAGE.breadcrumb.currentLabel, href: "/admissions/class-5-entry" },
        ]}
      />
      <Breadcrumb
        href={CLASS5_ENTRY_PAGE.breadcrumb.href}
        label={CLASS5_ENTRY_PAGE.breadcrumb.label}
        currentLabel={CLASS5_ENTRY_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={CLASS5_ENTRY_PAGE.heroEyebrow}
        heading={CLASS5_ENTRY_PAGE.heroHeading}
        description={CLASS5_ENTRY_PAGE.heroDescription}
        backgroundImage={`/images/${heroImage.filename}`}
      />

      {/* Benefits */}
      <Section background="paper" padding="xlarge" ariaLabel={CLASS5_ENTRY_PAGE.sectionAriaLabel}>
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              {CLASS5_ENTRY_PAGE.sectionHeading}
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {CLASS5_BENEFITS.map((benefit) => (
                <Card key={benefit.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {benefit.title}
                    </Heading>
                    <Text variant="muted" size="small">
                      {benefit.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Feeder Schools */}
      <Section background="soft" padding="xlarge" ariaLabel="Transition from primary schools">
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              {CLASS5_FEEDER_SCHOOLS.heading}
            </Heading>
            <Text variant="muted" size="medium">
              {CLASS5_FEEDER_SCHOOLS.body}
            </Text>
            <div style={{ textAlign: "center" }}>
              <Link href="/admissions/apply" variant="default">
                Start Class 5 Application →
              </Link>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
