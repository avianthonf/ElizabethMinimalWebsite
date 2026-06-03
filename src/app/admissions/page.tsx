import type { Metadata } from "next";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { Hero } from "@/components/content/Hero";
import { IconCard } from "@/components/content/IconCard";
import { Card } from "@/components/content/Card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { Grid } from "@/components/layout/Grid";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Icon } from "@/components/primitives/Icon";
import { Link } from "@/components/primitives/Link";
import { CommunityIcon } from "@/components/icons/CommunityIcon";
import { AcademicIcon } from "@/components/icons/AcademicIcon";
import { ArtsIcon } from "@/components/icons/ArtsIcon";
import { SportsIcon } from "@/components/icons/SportsIcon";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";
import { HERO_IMAGES } from "@/data/images";

export const metadata: Metadata = {
  title: "Admissions | St. Elizabeth High School",
  description:
    "Begin your journey at St. Elizabeth High School. Learn about admissions, tuition, and how to apply.",
};

export default function AdmissionsPage() {
  const heroImage = HERO_IMAGES.find((i) => i.section === "admissions-hero");

  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={false} fixed />
      <main id="main-content">
        <Hero
          eyebrow="Join Us"
          heading="Admissions at St. Elizabeth"
          description="Discover a nurturing school community where your child will be known, challenged, and supported to reach their full potential."
          backgroundImage={`/images/${heroImage?.filename ?? HERO_IMAGES[0].filename}`}
        />

        <Section
          background="paper"
          padding="xlarge"
          ariaLabel="Admissions information"
        >
          <Container>
            <SplitLayout
              ratio="2-1"
              left={
                <Stack gap="large">
                  <Stack gap="medium">
                    <Text variant="eyebrow">Welcome</Text>
                    <Heading level="h2" variant="section">
                      Begin Your Journey
                    </Heading>
                    <Text variant="muted" size="medium">
                      Choosing the right school is one of the most important
                      decisions a family makes. At St. Elizabeth High School,
                      we&apos;re here to guide you through every step of the
                      admissions process.
                    </Text>
                  </Stack>
                  <Grid columns={2} gap="medium" responsive>
                    <IconCard
                      icon={
                        <Icon size="medium">
                          <AcademicIcon />
                        </Icon>
                      }
                      title="Why St. Elizabeth?"
                      description="Discover what sets our school apart from the rest."
                      href="/admissions/why"
                    />
                    <IconCard
                      icon={
                        <Icon size="medium">
                          <CommunityIcon />
                        </Icon>
                      }
                      title="Plan Your Visit"
                      description="Experience our campus and community firsthand."
                      href="/admissions/visit"
                    />
                    <IconCard
                      icon={
                        <Icon size="medium">
                          <ArtsIcon />
                        </Icon>
                      }
                      title="Apply"
                      description="Complete your application and take the first step."
                      href="/admissions/apply"
                    />
                    <IconCard
                      icon={
                        <Icon size="medium">
                          <SportsIcon />
                        </Icon>
                      }
                      title="Tuition & Assistance"
                      description="Learn about tuition fees and financial aid options."
                      href="/admissions/tuition"
                    />
                  </Grid>
                </Stack>
              }
              right={
                <Stack gap="medium">
                  <Heading level="h3" variant="card">
                    Key Dates
                  </Heading>
                  <Card variant="default" padding="medium">
                    <Stack gap="small">
                      <Text variant="eyebrow">Admissions Open</Text>
                      <Text variant="muted" size="small">
                        Applications open in January for the upcoming academic
                        year beginning in June.
                      </Text>
                    </Stack>
                  </Card>
                  <Card variant="default" padding="medium">
                    <Stack gap="small">
                      <Text variant="eyebrow">Open House</Text>
                      <Text variant="muted" size="small">
                        Join us for our annual Open House to tour the campus and
                        meet our faculty.
                      </Text>
                    </Stack>
                  </Card>
                  <Link href="/admissions/faqs" variant="default">
                    View Frequently Asked Questions →
                  </Link>
                </Stack>
              }
            />
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
