import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Hero } from "@/shared/ui/hero";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { createPageMetadata } from "@/shared/lib/page-utils";
import { VISION, MISSION, VALUES, VALUES_INTRO, MISSION_PAGE } from "@/domains/about/about.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";
import { Grid } from "@/shared/ui/grid";

export const metadata = createPageMetadata(MISSION_PAGE.metaTitle, MISSION_PAGE.metaDescription);

export default function MissionPage() {
  return (
    <>
      <Breadcrumb
        href={MISSION_PAGE.breadcrumb.href}
        label={MISSION_PAGE.breadcrumb.label}
        currentLabel={MISSION_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={MISSION_PAGE.heroEyebrow}
        heading={MISSION_PAGE.heroHeading}
        description={MISSION_PAGE.heroDescription}
        backgroundImage={`/images/${COMMUNITY_IMAGES[2].filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel="Vision and mission">
        <Container width="narrow">
          <Stack gap="xlarge">
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {VISION.heading}
              </Heading>
              <Text variant="muted" size="large">
                {VISION.body}
              </Text>
            </Stack>
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {MISSION.heading}
              </Heading>
              <Text variant="muted" size="large">
                {MISSION.body}
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section background="soft" padding="xlarge" ariaLabel={MISSION_PAGE.sectionAriaLabel}>
        <Container width="wide">
          <Stack gap="large">
            <Stack gap="medium">
              <Heading level="h2" variant="section">
                {VALUES_INTRO.heading}
              </Heading>
              <Text variant="muted" size="large">
                {VALUES_INTRO.body}
              </Text>
            </Stack>
            <Grid columns={2}>
              {VALUES.map((value) => (
                <Card key={value.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Heading level="h3" variant="card">
                      {value.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {value.description}
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
