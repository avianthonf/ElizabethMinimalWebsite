import { Hero } from "@/shared/ui/hero";
import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { PageShell } from "@/components/layout";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { NOTABLE_ALUMNI, ALUMNI_EVENTS, ALUMNI_INTRO } from "@/domains/about/alumni.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  "Alumni",
  "Connect with the St. Elizabeth's High School alumni community. Stay involved, attend events, and support the school that shaped you.",
);

export default function AlumniPage() {
  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Reconnect"
          heading="St. Elizabeth Alumni"
          description={ALUMNI_INTRO.body}
          backgroundImage={`/images/${COMMUNITY_IMAGES[0].filename}`}
        />
      }
    >
      <Section background="soft" padding="xlarge" ariaLabel="Alumni community">
        <Container>
          <Stack gap="xlarge">
            <Breadcrumb href="/about" label="About" currentLabel="Alumni" />
            <Stack gap="medium">
              <Text variant="eyebrow">Our Community</Text>
              <Heading level="h2" variant="section">
                {ALUMNI_INTRO.heading}
              </Heading>
            </Stack>

            <Stack gap="medium">
              <Heading level="h3" variant="section">
                Notable Alumni
              </Heading>
              <Grid columns={3} gap="medium" responsive>
                {NOTABLE_ALUMNI.map((alum) => (
                  <Card key={alum.name} variant="default" padding="medium">
                    <Stack gap="small">
                      <Heading level="h3" variant="card">
                        {alum.name}
                      </Heading>
                      <Text variant="caption">{alum.class}</Text>
                      <Text variant="muted" size="small">
                        {alum.achievement}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </Stack>

            <Stack gap="medium">
              <Heading level="h3" variant="section">
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
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
