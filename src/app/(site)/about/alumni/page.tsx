import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  ALUMNI_INTRO,
  ALUMNI_NETWORK,
  ALUMNI_STATISTICS,
  ALUMNI_TESTIMONIALS,
  ALUMNI_EVENTS,
} from "@/domains/about/alumni.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  "Alumni",
  "Connect with the St. Elizabeth's High School alumni community. Stay involved, attend events, and support the school that shaped you.",
  "/about/alumni",
);

export default function AlumniPage() {
  return (
    <>
      <Breadcrumb href="/about" label="About" currentLabel="Alumni" />
      <Hero
        eyebrow="Reconnect"
        heading="St. Elizabeth Alumni"
        description={ALUMNI_INTRO.body}
        backgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
      />

      {/* Alumni Network */}
      <Section background="soft" padding="xlarge" ariaLabel="Alumni community">
        <Container width="narrow">
          <Stack gap="medium">
            <Heading level="h2" variant="section">
              {ALUMNI_NETWORK.heading}
            </Heading>
            <p
              style={{
                whiteSpace: "pre-line",
                color: "var(--p-color-muted)",
                fontSize: "var(--p-font-size-large)",
                lineHeight: "1.7",
              }}
            >
              {ALUMNI_NETWORK.body}
            </p>
          </Stack>
        </Container>
      </Section>

      {/* Statistics */}
      <Section background="paper" padding="xlarge" ariaLabel="Alumni statistics">
        <Container>
          <Grid columns={3} gap="medium" responsive>
            {ALUMNI_STATISTICS.map((stat) => (
              <Card key={stat.label} variant="default" padding="medium">
                <Stack gap="small">
                  <Text variant="eyebrow">{stat.value}</Text>
                  <Heading level="h3" variant="card">
                    {stat.label}
                  </Heading>
                  <Text variant="muted" size="small">
                    {stat.description}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section background="soft" padding="xlarge" ariaLabel="Alumni testimonials">
        <Container width="narrow">
          <Stack gap="medium">
            <Heading level="h2" variant="section">
              {ALUMNI_TESTIMONIALS.heading}
            </Heading>
            <p
              style={{
                whiteSpace: "pre-line",
                color: "var(--p-color-muted)",
                fontSize: "var(--p-font-size-large)",
                lineHeight: "1.7",
              }}
            >
              {ALUMNI_TESTIMONIALS.body}
            </p>
          </Stack>
        </Container>
      </Section>

      {/* Alumni Events */}
      <Section background="paper" padding="xlarge" ariaLabel="Alumni events">
        <Container>
          <Stack gap="medium">
            <Heading level="h2" variant="section">
              Upcoming Events
            </Heading>
            <Grid columns={3} gap="medium" responsive>
              {ALUMNI_EVENTS.map((event) => (
                <Card key={event.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {event.title}
                    </Heading>
                    <Text variant="caption">{event.date}</Text>
                    <Text variant="muted" size="small">
                      {event.description}
                    </Text>
                    <Text variant="caption">{event.location}</Text>
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
