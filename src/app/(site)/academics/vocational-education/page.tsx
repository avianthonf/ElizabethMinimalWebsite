import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import { VOCATIONAL_PAGE, VOCATIONAL_AREAS } from "@/domains/academics/vocational.data";

export const metadata = createPageMetadata(
  VOCATIONAL_PAGE.metaTitle,
  VOCATIONAL_PAGE.metaDescription,
);

export default function VocationalEducationPage() {
  const heroImage = getHeroImage("academics-hero");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Academics", href: "/academics" },
          {
            label: VOCATIONAL_PAGE.breadcrumb.currentLabel,
            href: "/academics/vocational-education",
          },
        ]}
      />
      <Breadcrumb
        href={VOCATIONAL_PAGE.breadcrumb.href}
        label={VOCATIONAL_PAGE.breadcrumb.label}
        currentLabel={VOCATIONAL_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={VOCATIONAL_PAGE.heroEyebrow}
        heading={VOCATIONAL_PAGE.heroHeading}
        description={VOCATIONAL_PAGE.heroDescription}
        backgroundImage={`/images/${heroImage.filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel={VOCATIONAL_PAGE.sectionAriaLabel}>
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              {VOCATIONAL_PAGE.sectionHeading}
            </Heading>
            <Grid columns={3} gap="medium" responsive>
              {VOCATIONAL_AREAS.map((area) => (
                <Card key={area.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {area.title}
                    </Heading>
                    <Text variant="muted" size="small">
                      {area.description}
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
