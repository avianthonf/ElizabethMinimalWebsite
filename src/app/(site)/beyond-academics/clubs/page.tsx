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
  CLUBS_PAGE,
  CLUBS,
  PRAHARI_CLUB,
  ECOSE_CLUB,
} from "@/domains/beyond-academics/beyond.data";
import { getHeroImage } from "@/shared/lib/page-utils";

export const metadata = createPageMetadata(
  CLUBS_PAGE.metaTitle,
  CLUBS_PAGE.metaDescription,
  "/beyond-academics/clubs",
);

export default function ClubsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: CLUBS_PAGE.breadcrumb.label, href: CLUBS_PAGE.breadcrumb.href },
          { label: CLUBS_PAGE.breadcrumb.currentLabel, href: "/beyond-academics/clubs" },
        ]}
      />
      <Breadcrumb
        href={CLUBS_PAGE.breadcrumb.href}
        label={CLUBS_PAGE.breadcrumb.label}
        currentLabel={CLUBS_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={CLUBS_PAGE.heroEyebrow}
        heading={CLUBS_PAGE.heroHeading}
        description={CLUBS_PAGE.heroDescription}
        backgroundImage={`/images/${getHeroImage("student-life-hero").filename}`}
      />

      {/* The Prahari Club - Featured */}
      <Section background="paper" padding="xlarge" ariaLabel="The Prahari Club">
        <Container>
          <Stack gap="large">
            <div>
              <Heading level="h2" variant="section">
                {PRAHARI_CLUB.name}
              </Heading>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "var(--p-font-size-large)",
                  lineHeight: "1.8",
                  color: "var(--p-color-muted)",
                }}
              >
                {PRAHARI_CLUB.intro}
              </p>
            </div>

            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <Heading level="h3" variant="card">
                  Club Highlights
                </Heading>
              </div>
              <Grid columns={2} gap="medium" responsive>
                {PRAHARI_CLUB.highlights.map((highlight, index) => (
                  <Card key={index} variant="default" padding="medium">
                    <Stack gap="small">
                      <div style={{ fontSize: "2rem" }}>{highlight.icon}</div>
                      <Heading level="h4" variant="card">
                        {highlight.title}
                      </Heading>
                      <Text variant="muted" size="small">
                        {highlight.description}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </div>
          </Stack>
        </Container>
      </Section>

      {/* ECOSE Club - Featured */}
      <Section background="soft" padding="xlarge" ariaLabel="ECOSE Club">
        <Container>
          <Stack gap="large">
            <div>
              <Heading level="h2" variant="section">
                {ECOSE_CLUB.name}
              </Heading>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "var(--p-font-size-large)",
                  lineHeight: "1.8",
                  color: "var(--p-color-muted)",
                }}
              >
                {ECOSE_CLUB.intro}
              </p>
            </div>

            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <Heading level="h3" variant="card">
                  At a Glance
                </Heading>
              </div>
              <Grid columns={2} gap="medium" responsive>
                {ECOSE_CLUB.atAGlance.map((item, index) => (
                  <Card key={index} variant="default" padding="medium">
                    <Stack gap="small">
                      <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                      <Heading level="h4" variant="card">
                        {item.title}
                      </Heading>
                      <Text variant="muted" size="small">
                        {item.description}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </div>

            <div>
              <div style={{ marginBottom: "1.5rem" }}>
                <Heading level="h3" variant="card">
                  ECOSE Structure
                </Heading>
              </div>
              <p style={{ marginBottom: "1.5rem", color: "var(--p-color-muted)" }}>
                To promote teamwork and leadership, ECOSE is organised into five nature-themed
                groups, each celebrating a unique aspect of Goa&apos;s biodiversity.
              </p>
              <Stack gap="medium">
                {ECOSE_CLUB.structure.map((group, idx) => (
                  <Card key={idx} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h4" variant="card">
                        {group.group}
                      </Heading>
                      <div
                        style={{
                          fontStyle: "italic",
                          color: "var(--p-color-muted)",
                          fontSize: "var(--p-font-size-small)",
                        }}
                      >
                        {group.inspiration}
                      </div>
                      <div style={{ fontWeight: "500", fontSize: "var(--p-font-size-small)" }}>
                        Teams: {group.teams.join(" • ")}
                      </div>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </div>

            <div>
              <div style={{ marginBottom: "1rem" }}>
                <Heading level="h3" variant="card">
                  What We Do
                </Heading>
              </div>
              <Grid columns={2} gap="small" responsive>
                {ECOSE_CLUB.activities.map((activity, index) => (
                  <div key={index} style={{ fontSize: "var(--p-font-size-medium)" }}>
                    {activity}
                  </div>
                ))}
              </Grid>
            </div>

            <div style={{ textAlign: "center" }}>
              <Card variant="default" padding="medium">
                <div style={{ marginBottom: "0.5rem" }}>
                  <Heading level="h3" variant="card">
                    {ECOSE_CLUB.motto}
                  </Heading>
                </div>
                <p
                  style={{
                    fontStyle: "italic",
                    color: "var(--p-color-muted)",
                    fontSize: "var(--p-font-size-large)",
                  }}
                >
                  {ECOSE_CLUB.tagline}
                </p>
              </Card>
            </div>
          </Stack>
        </Container>
      </Section>

      {/* Other Clubs */}
      <Section background="paper" padding="xlarge" ariaLabel={CLUBS_PAGE.sectionAriaLabel}>
        <Container>
          <Stack gap="large">
            <div>
              <Heading level="h2" variant="section">
                {CLUBS_PAGE.sectionHeading}
              </Heading>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "var(--p-font-size-large)",
                  lineHeight: "1.8",
                  color: "var(--p-color-muted)",
                }}
              >
                {CLUBS_PAGE.sectionDescription}
              </p>
            </div>
            <Grid columns={2} gap="medium" responsive>
              {CLUBS.map((club) => (
                <Card key={club.name} variant="default" padding="medium">
                  <Stack gap="small">
                    <Text variant="eyebrow">{club.category}</Text>
                    <Heading level="h3" variant="card">
                      {club.name}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {club.description}
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
