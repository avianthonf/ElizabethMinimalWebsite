import { Card } from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Section } from "@/shared/ui/section";
import { Stack } from "@/shared/ui/stack";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Hero } from "@/shared/ui/hero";
import { Breadcrumb } from "@/widgets/breadcrumb/breadcrumb";
import { BreadcrumbJsonLd } from "@/widgets/breadcrumb/breadcrumb-jsonld";
import { createPageMetadata } from "@/shared/lib/page-utils";
import {
  ACHIEVEMENTS_PAGE,
  SSC_RESULT_BANNER,
  ACHIEVEMENTS,
} from "@/domains/about/achievements.data";
import { COMMUNITY_IMAGES } from "@/domains/media/images.data";
import styles from "./achievements.module.css";

export const metadata = createPageMetadata(
  ACHIEVEMENTS_PAGE.metaTitle,
  ACHIEVEMENTS_PAGE.metaDescription,
  "/about/achievements",
);

export default function AchievementsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { label: "Home", href: "/" },
          { label: ACHIEVEMENTS_PAGE.breadcrumb.label, href: ACHIEVEMENTS_PAGE.breadcrumb.href },
          { label: ACHIEVEMENTS_PAGE.breadcrumb.currentLabel, href: "/about/achievements" },
        ]}
      />
      <Breadcrumb
        href={ACHIEVEMENTS_PAGE.breadcrumb.href}
        label={ACHIEVEMENTS_PAGE.breadcrumb.label}
        currentLabel={ACHIEVEMENTS_PAGE.breadcrumb.currentLabel}
      />
      <Hero
        eyebrow={ACHIEVEMENTS_PAGE.heroEyebrow}
        heading={ACHIEVEMENTS_PAGE.heroHeading}
        description={ACHIEVEMENTS_PAGE.heroDescription}
        backgroundImage={`/images/${COMMUNITY_IMAGES[2].filename}`}
      />

      {SSC_RESULT_BANNER.enabled && (
        <Section background="primary" padding="large" ariaLabel="SSC Results 2025-26">
          <Container width="narrow">
            <Stack gap="small">
              <Text variant="eyebrow" className={styles.bannerEyebrow}>
                {SSC_RESULT_BANNER.heading}
              </Text>
              <Heading level="h2" variant="hero" className={styles.bannerValue}>
                {SSC_RESULT_BANNER.subtitle}
              </Heading>
              <Text variant="muted" size="large" className={styles.bannerDesc}>
                {SSC_RESULT_BANNER.description}
              </Text>
            </Stack>
          </Container>
        </Section>
      )}

      <Section background="paper" padding="xlarge" ariaLabel={ACHIEVEMENTS_PAGE.sectionAriaLabel}>
        <Container width="wide">
          <Stack gap="large">
            <Heading level="h2" variant="section">
              Milestones & Recognition
            </Heading>
            <div className={styles.achievementsGrid}>
              {ACHIEVEMENTS.map((achievement) => (
                <Card key={achievement.title} variant="default" padding="medium">
                  <Stack gap="small">
                    <Text variant="eyebrow">{achievement.category}</Text>
                    <Heading level="h3" variant="card">
                      {achievement.title}
                    </Heading>
                    <Text variant="muted" size="medium">
                      {achievement.description}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
