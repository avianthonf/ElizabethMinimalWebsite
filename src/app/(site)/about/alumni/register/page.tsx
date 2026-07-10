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
import {
  ALUMNI_REGISTRATION_PAGE,
  ALUMNI_BENEFITS,
} from "@/domains/about/alumni-registration.data";

export const metadata = createPageMetadata(
  ALUMNI_REGISTRATION_PAGE.metaTitle,
  ALUMNI_REGISTRATION_PAGE.metaDescription,
);

export default function AlumniRegistrationPage() {
  const heroImage = getHeroImage("alumni-hero");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          {
            label: ALUMNI_REGISTRATION_PAGE.breadcrumb.currentLabel,
            href: "/about/alumni/register",
          },
        ]}
      />
      <Breadcrumb
        href={ALUMNI_REGISTRATION_PAGE.breadcrumb.href}
        label={ALUMNI_REGISTRATION_PAGE.breadcrumb.label}
        currentLabel={ALUMNI_REGISTRATION_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={ALUMNI_REGISTRATION_PAGE.heroEyebrow}
        heading={ALUMNI_REGISTRATION_PAGE.heroHeading}
        description={ALUMNI_REGISTRATION_PAGE.heroDescription}
        backgroundImage={`/images/${heroImage.filename}`}
      />

      {/* Benefits */}
      <Section background="soft" padding="xlarge" ariaLabel="Alumni benefits">
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Why Register?
            </Heading>
            <Grid columns={3} gap="medium" responsive>
              {ALUMNI_BENEFITS.map((benefit) => (
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

      {/* Registration Form */}
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel={ALUMNI_REGISTRATION_PAGE.sectionAriaLabel}
      >
        <Container width="narrow">
          <Stack gap="large">
            <div>
              <Heading level="h2" variant="section">
                {ALUMNI_REGISTRATION_PAGE.sectionHeading}
              </Heading>
              <p
                style={{
                  marginTop: "var(--p-space-small)",
                  color: "var(--p-color-muted)",
                  fontSize: "var(--p-font-size-medium)",
                  lineHeight: "1.6",
                }}
              >
                {ALUMNI_REGISTRATION_PAGE.sectionDescription}
              </p>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "0",
                paddingBottom: "140%",
              }}
            >
              <iframe
                src={ALUMNI_REGISTRATION_PAGE.googleFormUrl}
                title="Alumni Registration Form"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "var(--p-radius-medium)",
                }}
                loading="lazy"
              />
            </div>
            <Text variant="caption">
              Prefer not to use the form? Email us directly at info@stelizabethhighschool.in with
              your full name, year of passing, and current contact details.
            </Text>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
