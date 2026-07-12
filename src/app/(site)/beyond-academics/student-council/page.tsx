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
  STUDENT_COUNCIL_PAGE,
  STUDENT_COUNCIL_INTRO,
  STUDENT_COUNCIL_ROLES,
  HOUSE_SYSTEM,
  INVESTITURE_CEREMONY,
} from "@/domains/beyond-academics/beyond.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  STUDENT_COUNCIL_PAGE.metaTitle,
  STUDENT_COUNCIL_PAGE.metaDescription,
  "/beyond-academics/student-council",
);

export default function StudentCouncilPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          {
            label: STUDENT_COUNCIL_PAGE.breadcrumb.label,
            href: STUDENT_COUNCIL_PAGE.breadcrumb.href,
          },
          {
            label: STUDENT_COUNCIL_PAGE.breadcrumb.currentLabel,
            href: "/beyond-academics/student-council",
          },
        ]}
      />
      <Breadcrumb
        href={STUDENT_COUNCIL_PAGE.breadcrumb.href}
        label={STUDENT_COUNCIL_PAGE.breadcrumb.label}
        currentLabel={STUDENT_COUNCIL_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={STUDENT_COUNCIL_PAGE.heroEyebrow}
        heading={STUDENT_COUNCIL_PAGE.heroHeading}
        description={STUDENT_COUNCIL_PAGE.heroDescription}
        backgroundImage={`/images/${getHeroImage("student-life-hero").filename}`}
      />

      {/* Introduction */}
      <Section background="paper" padding="large" ariaLabel="Student council introduction">
        <Container width="narrow">
          <p
            style={{
              fontSize: "var(--p-font-size-large)",
              lineHeight: "1.8",
              color: "var(--p-color-muted)",
              textAlign: "center",
            }}
          >
            {STUDENT_COUNCIL_INTRO.body}
          </p>
        </Container>
      </Section>

      {/* Council Structure */}
      <Section background="soft" padding="xlarge" ariaLabel={STUDENT_COUNCIL_PAGE.sectionAriaLabel}>
        <Container>
          <Stack gap="large">
            <Heading level="h2" variant="section">
              {STUDENT_COUNCIL_PAGE.sectionHeading}
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {STUDENT_COUNCIL_ROLES.map((role, index) => (
                <Card key={index} variant="default" padding="medium">
                  <Stack gap="small">
                    <div style={{ fontSize: "2rem" }}>{role.icon}</div>
                    <Heading level="h3" variant="card">
                      {role.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {role.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* House System */}
      <Section background="paper" padding="xlarge" ariaLabel="House system">
        <Container>
          <Stack gap="large">
            <div>
              <Heading level="h2" variant="section">
                {HOUSE_SYSTEM.heading}
              </Heading>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "var(--p-font-size-large)",
                  lineHeight: "1.8",
                  color: "var(--p-color-muted)",
                }}
              >
                {HOUSE_SYSTEM.intro}
              </p>
            </div>
            <Grid columns={4} gap="medium" responsive>
              {HOUSE_SYSTEM.houses.map((house) => (
                <div
                  key={house.name}
                  style={{
                    borderTop: `4px solid ${house.color}`,
                  }}
                >
                  <Card variant="default" padding="medium">
                    <Stack gap="small">
                      <div style={{ fontSize: "3rem", textAlign: "center" }}>{house.emoji}</div>
                      <div style={{ textAlign: "center" }}>
                        <Heading level="h3" variant="card">
                          {house.name}
                        </Heading>
                      </div>
                    </Stack>
                  </Card>
                </div>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Investiture Ceremony */}
      <Section background="soft" padding="xlarge" ariaLabel="Investiture ceremony">
        <Container width="narrow">
          <Stack gap="medium">
            <div style={{ textAlign: "center" }}>
              <Heading level="h2" variant="section">
                {INVESTITURE_CEREMONY.heading}
              </Heading>
            </div>
            <p
              style={{
                fontSize: "var(--p-font-size-large)",
                lineHeight: "1.8",
                color: "var(--p-color-muted)",
                textAlign: "center",
              }}
            >
              {INVESTITURE_CEREMONY.description}
            </p>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
