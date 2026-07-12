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
  INFRASTRUCTURE_PAGE,
  INFRASTRUCTURE_INTRO,
  LEARNING_SPACES,
  SPORTS_ACTIVITIES,
  TECHNOLOGY_COMMUNICATION,
  SAFETY_SECURITY,
} from "@/domains/admissions/infrastructure.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  INFRASTRUCTURE_PAGE.metaTitle,
  INFRASTRUCTURE_PAGE.metaDescription,
  "/admissions/infrastructure",
);

export default function InfrastructurePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          {
            label: INFRASTRUCTURE_PAGE.breadcrumb.label,
            href: INFRASTRUCTURE_PAGE.breadcrumb.href,
          },
          {
            label: INFRASTRUCTURE_PAGE.breadcrumb.currentLabel,
            href: "/admissions/infrastructure",
          },
        ]}
      />
      <Breadcrumb
        href={INFRASTRUCTURE_PAGE.breadcrumb.href}
        label={INFRASTRUCTURE_PAGE.breadcrumb.label}
        currentLabel={INFRASTRUCTURE_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={INFRASTRUCTURE_PAGE.heroEyebrow}
        heading={INFRASTRUCTURE_PAGE.heroHeading}
        description={INFRASTRUCTURE_PAGE.heroDescription}
        backgroundImage={`/images/${getHeroImage("admissions-hero").filename}`}
      />

      {/* Introduction */}
      <Section background="paper" padding="large" ariaLabel="Infrastructure introduction">
        <Container width="narrow">
          <p
            style={{
              fontSize: "var(--p-font-size-large)",
              lineHeight: "1.8",
              color: "var(--p-color-muted)",
              textAlign: "center",
            }}
          >
            {INFRASTRUCTURE_INTRO.body}
          </p>
        </Container>
      </Section>

      {/* Learning Spaces */}
      <Section background="soft" padding="xlarge" ariaLabel="Learning spaces">
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Learning Spaces
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {LEARNING_SPACES.map((space, index) => (
                <Card key={index} variant="default" padding="medium">
                  <Stack gap="small">
                    <div style={{ fontSize: "2.5rem" }}>{space.icon}</div>
                    <Heading level="h3" variant="card">
                      {space.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {space.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Sports & Activities */}
      <Section background="paper" padding="xlarge" ariaLabel="Sports and activities facilities">
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Sports & Activities
            </Heading>
            <Grid columns={3} gap="medium" responsive>
              {SPORTS_ACTIVITIES.map((facility, index) => (
                <Card key={index} variant="default" padding="medium">
                  <Stack gap="small">
                    <div style={{ fontSize: "2.5rem" }}>{facility.icon}</div>
                    <Heading level="h3" variant="card">
                      {facility.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {facility.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Technology & Communication */}
      <Section background="soft" padding="xlarge" ariaLabel="Technology and communication">
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Technology & Communication
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {TECHNOLOGY_COMMUNICATION.map((tech, index) => (
                <Card key={index} variant="default" padding="medium">
                  <Stack gap="small">
                    <div style={{ fontSize: "2.5rem" }}>{tech.icon}</div>
                    <Heading level="h3" variant="card">
                      {tech.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {tech.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Safety & Security */}
      <Section background="paper" padding="xlarge" ariaLabel="Safety and security">
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Safety & Security
            </Heading>
            <Stack gap="medium">
              {SAFETY_SECURITY.map((security, index) => (
                <Card key={index} variant="default" padding="medium">
                  <Stack gap="small">
                    <div style={{ fontSize: "2.5rem" }}>{security.icon}</div>
                    <Heading level="h3" variant="card">
                      {security.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {security.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
