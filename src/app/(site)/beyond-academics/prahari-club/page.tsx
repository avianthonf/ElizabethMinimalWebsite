import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Grid } from "@/shared/ui/grid";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  PRAHARI_PAGE,
  PRAHARI_INTRO,
  PRAHARI_CLUB_DETAILS,
  PRAHARI_NATIONAL_CONTEXT,
} from "@/domains/beyond-academics/prahari.data";
import { STUDENT_LIFE_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(PRAHARI_PAGE.metaTitle, PRAHARI_PAGE.metaDescription);

export default function PrahariClubPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: "Beyond Academics", href: "/beyond-academics" },
          { label: "Prahari Club", href: "#" },
        ]}
      />
      <Breadcrumb href="/beyond-academics" label="Beyond Academics" currentLabel="Prahari Club" />
      <Hero
        eyebrow={PRAHARI_PAGE.heroEyebrow}
        heading={PRAHARI_PAGE.heroHeading}
        description={PRAHARI_PAGE.heroDescription}
        backgroundImage={`/images/${STUDENT_LIFE_IMAGES[1].filename}`}
      />

      {/* Intro Section */}
      <Section background="paper" padding="xlarge" ariaLabel="Prahari Club introduction">
        <Container width="narrow">
          <Stack gap="medium">
            <Heading level="h2" variant="section">
              {PRAHARI_INTRO.heading}
            </Heading>
            <p
              style={{
                whiteSpace: "pre-line",
                color: "var(--p-color-muted)",
                fontSize: "var(--p-font-size-large)",
                lineHeight: "1.7",
              }}
            >
              {PRAHARI_INTRO.body}
            </p>
          </Stack>
        </Container>
      </Section>

      {/* Club Details & Activities */}
      <Section background="soft" padding="xlarge" ariaLabel="Prahari Club details">
        <Container width="wide">
          <Stack gap="xlarge">
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {PRAHARI_CLUB_DETAILS.heading}
              </Heading>
              <Stack gap="small">
                <Text variant="muted" size="medium">
                  <strong>Members:</strong> {PRAHARI_CLUB_DETAILS.members}
                </Text>
                <Text variant="muted" size="medium">
                  <strong>Established:</strong> Academic Year {PRAHARI_CLUB_DETAILS.establishedYear}
                </Text>
                <Text variant="muted" size="medium">
                  {PRAHARI_CLUB_DETAILS.logoUnveiled}
                </Text>
              </Stack>
            </Stack>

            <Heading level="h3" variant="card">
              Activities & Initiatives
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {PRAHARI_CLUB_DETAILS.activities.map((activity) => (
                <Card key={activity.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {activity.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {activity.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Grid>

            <Text variant="muted" size="large">
              {PRAHARI_CLUB_DETAILS.closingStatement}
            </Text>
          </Stack>
        </Container>
      </Section>

      {/* National Context */}
      <Section background="paper" padding="xlarge" ariaLabel="National context">
        <Container width="narrow">
          <Stack gap="medium">
            <Heading level="h2" variant="section">
              {PRAHARI_NATIONAL_CONTEXT.heading}
            </Heading>
            <Text variant="muted" size="large">
              {PRAHARI_NATIONAL_CONTEXT.body}
            </Text>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
