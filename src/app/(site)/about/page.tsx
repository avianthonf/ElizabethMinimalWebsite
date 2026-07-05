import { Hero } from "@/shared/ui/hero";
import { MediaBlock } from "@/shared/ui/media-block";
import { CTASection } from "@/shared/ui/cta-section";
import { IconCard } from "@/shared/ui/icon-card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { SplitLayout } from "@/shared/ui/split-layout";
import { PageShell } from "@/components/layout";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Icon } from "@/shared/ui/icon";
import { SchoolIcon } from "@/shared/ui/school-icon";
import { createPageMetadata, getHeroImage } from "@/shared/lib/page-utils";
import { HERO_IMAGES } from "@/domains/media/images.data";

export const metadata = createPageMetadata(
  "About",
  "Learn about St. Elizabeth's High School's mission, history, and values in Pomburpa, Goa.",
);

export default function AboutPage() {
  const heroImage = getHeroImage("about-hero");

  return (
    <PageShell
      hero={
        <Hero
          eyebrow="Discover"
          heading="About St. Elizabeth"
          description="Guided by our motto 'Truth and Honesty,' St. Elizabeth's High School has been nurturing young minds in Pomburpa, Goa since 1949."
          backgroundImage={`/images/${heroImage.filename}`}
        />
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel="About St. Elizabeth">
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
                    St. Elizabeth&apos;s High School is a nurturing Catholic school community where
                    students are known, challenged, and supported. Our commitment to Truth and
                    Honesty shapes every aspect of school life — from academic excellence to
                    character formation.
                  </Text>
                </Stack>
                <MediaBlock
                  mediaType="image"
                  mediaSrc={`/images/${HERO_IMAGES[2]?.filename ?? HERO_IMAGES[0].filename}`}
                  mediaAlt="St. Elizabeth's High School campus"
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
                    title="Achievements"
                    description="Milestones & milestones"
                    href="/about/achievements"
                  />
                  <IconCard
                    icon={
                      <Icon size="medium">
                        <SchoolIcon variant="community" />
                      </Icon>
                    }
                    title="Alumni"
                    description="Our extended community"
                    href="/about/alumni"
                  />
                </Stack>
              </Stack>
            }
          />
        </Container>
      </Section>

      <CTASection
        heading="Ready to Learn More?"
        primaryCTA={{ text: "Contact Us", href: "/contact" }}
        secondaryCTA={{ text: "Book a Tour", href: "/contact/location-map" }}
        background="blue"
      />
    </PageShell>
  );
}
