import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { IconCard } from "@/components/content/IconCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/primitives/Heading";
import { Icon } from "@/components/primitives/Icon";
import { AcademicIcon } from "@/components/icons/AcademicIcon";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";
import { WHY_ST_ELIZABETH_POINTS } from "@/data/admissions";
import { HERO_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Why St. Elizabeth? | St. Elizabeth High School",
  description:
    "Discover what makes St. Elizabeth High School special — academic excellence, values-based education, holistic development, and a nurturing community.",
};

export default function WhyPage() {
  const heroImage = HERO_IMAGES.find((i) => i.section === "admissions-hero");

  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Discover"
          heading="Why St. Elizabeth?"
          description="Find out why families across North Goa choose St. Elizabeth High School for their children's education."
          backgroundImage={`/images/${heroImage?.filename ?? HERO_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Why choose St. Elizabeth"
        >
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
                        <AcademicIcon />
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
      </main>
      <Footer
        intro={FOOTER_INTRO}
        sections={FOOTER_SECTIONS}
        socialLinks={FOOTER_SOCIAL_LINKS}
        copyright={FOOTER_COPYRIGHT}
      />
    </>
  );
}
