import { Hero } from "@/shared/ui/hero";
import { IconCard } from "@/shared/ui/icon-card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Grid } from "@/shared/ui/grid";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Icon } from "@/shared/ui/icon";
import { SchoolIcon } from "@/shared/ui/school-icon";
import { TestimonialsSection } from "@/screens/home/testimonials-section";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import { WHY_ST_ELIZABETH_POINTS } from "@/domains/admissions/admissions.data";
import { TESTIMONIALS } from "@/domains/homepage/homepage.data";

export const metadata = createPageMetadata(
  "Why St. Elizabeth?",
  "Discover what makes St. Elizabeth's High School special — academic excellence, values-based education, holistic development, and a nurturing community.",
  "/admissions/why",
  { ogImage: "/images/DSC07580.jpg" },
);

export default function WhyPage() {
  const heroImage = getHeroImage("admissions-hero");

  return (
    <>
      <Hero
        eyebrow="Discover"
        heading="Why St. Elizabeth?"
        description="Find out why families across North Goa choose St. Elizabeth's High School for their children's education."
        backgroundImage={`/images/${heroImage.filename}`}
      />

      <Section background="paper" padding="xlarge" ariaLabel="Why choose St. Elizabeth">
        <Container width="narrow">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              What Sets Us Apart
            </Heading>
            <Grid columns={2} gap="medium" responsive>
              {WHY_ST_ELIZABETH_POINTS.map((point) => (
                <IconCard
                  key={point.title}
                  icon={
                    <Icon size="medium">
                      <SchoolIcon variant="academic" />
                    </Icon>
                  }
                  title={point.title}
                  description={point.description}
                />
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section background="paper" padding="xlarge" ariaLabel="Testimonials from our community">
        <Container width="default">
          <Stack gap="large">
            <div style={{ textAlign: "center" }}>
              <Heading level="h2" variant="section">
                Hear From Our Community
              </Heading>
              <div style={{ marginTop: "0.5rem" }}>
                <Text variant="muted" size="large">
                  The experiences of our students, parents, alumni, and teachers reflect the values
                  and spirit that make St. Elizabeth&apos;s High School a special place to learn and
                  grow.
                </Text>
              </div>
            </div>
            <TestimonialsSection testimonials={TESTIMONIALS} ariaLabel="Community testimonials" />
          </Stack>
        </Container>
      </Section>
    </>
  );
}
