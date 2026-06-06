import { Hero } from "@/components/content/Hero";
import { MediaBlock } from "@/components/content/MediaBlock";
import { CTASection } from "@/components/content/CTASection";
import { IconCard } from "@/components/content/IconCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { PageShell } from "@/components/layout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Icon } from "@/components/primitives/Icon";
import { SchoolIcon } from "@/components/icons/SchoolIcon";
import { createPageMetadata, getHeroImage } from "@/lib/page-utils";
import { HERO_IMAGES } from "@/data/images";

export const metadata = createPageMetadata(
  "About",
  "Learn about St. Elizabeth High School's mission, history, and values in Pomburpa, Goa.",
);

export default function AboutPage() {
  const heroImage = getHeroImage("about-hero");

  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Discover"
          heading="About St. Elizabeth"
          description="Guided by our motto 'Truth and Honesty,' St. Elizabeth High School has been nurturing young minds in Pomburpa, Goa since 1949."
          backgroundImage={`/images/${heroImage.filename}`}
        />
      }
    >
      <Section
        background="paper"
        padding="xlarge"
        ariaLabel="About St. Elizabeth"
      >
        <Container>
          <SplitLayout
            ratio="2-1"
            left={
              <Stack gap="large">
                <Stack gap="medium">
                  <Text variant="eyebrow">Our Story</Text>
                  <Heading level="h2" variant="section">
                    Educating the Whole Person
                  </Heading>
                  <Text variant="muted" size="medium">
                    St. Elizabeth High School is a nurturing Catholic school
                    community where students are known, challenged, and
                    supported. Our commitment to Truth and Honesty shapes
                    every aspect of school life — from academic excellence to
                    character formation.
                  </Text>
                </Stack>
                <MediaBlock
                  mediaType="image"
                  mediaSrc={`/images/${HERO_IMAGES[2]?.filename ?? HERO_IMAGES[0].filename}`}
                  mediaAlt="St. Elizabeth High School campus"
                  heading="A Tradition of Excellence"
                  description="For over seven decades, St. Elizabeth has provided quality education to students from across North Goa."
                  mediaPosition="left"
                  layout="stacked"
                  cta={{ text: "Our History", href: "/about/history" }}
                />
              </Stack>
            }
            right={
              <Stack gap="medium">
                <Heading level="h3" variant="card">
                  Explore
                </Heading>
                <Stack gap="small">
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="community" />
                      </Icon>
                    }
                    title="Mission & Values"
                    description="Our guiding principles"
                    href="/about/mission"
                  />
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="academic" />
                      </Icon>
                    }
                    title="History"
                    description="Since 1949"
                    href="/about/history"
                  />
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="arts" />
                      </Icon>
                    }
                    title="Staff"
                    description="Our leadership team"
                    href="/about/staff"
                  />
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="academic" />
                      </Icon>
                    }
                    title="Strategic Plan"
                    description="Priorities for the future"
                    href="/about/strategic-plan"
                  />
                </Stack>
              </Stack>
            }
          />
        </Container>
      </Section>

      <CTASection
        heading="Ready to Learn More?"
        primaryCTA={{ text: "Plan a Visit", href: "/contact/visit" }}
        background="blue"
      />
    </PageShell>
  );
}
