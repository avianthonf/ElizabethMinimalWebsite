"use client";

import { useState, useCallback, useRef } from "react";
import { LoadOverlay } from "@/components/LoadOverlay";
import { HorizontalPage, HorizontalScroll } from "@/components/HorizontalScroll";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { ValueCard } from "@/components/content/ValueCard";
import { IconCard } from "@/components/content/IconCard";
import { ImageCard } from "@/components/content/ImageCard";
import { Card } from "@/components/content/Card";
import { CTASection } from "@/components/content/CTASection";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Link } from "@/components/primitives/Link";
import { Icon } from "@/components/primitives/Icon";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { CommunityIcon } from "@/components/icons/CommunityIcon";
import { AcademicIcon } from "@/components/icons/AcademicIcon";
import { SportsIcon } from "@/components/icons/SportsIcon";

import {
  HERO_CONTENT,
  VALUES,
  STATS,
  TESTIMONIALS,
  CTA_CONTENT,
  LATEST_NEWS,
} from "@/data/homepage";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
  MENU_CATEGORIES,
} from "@/data/navigation";
import { MenuOverlay } from "@/components/navigation/MenuOverlay";
import {
  HERO_IMAGES,
  HOMEPAGE_GRID_IMAGES,
  VALUES_IMAGES,
  ACADEMICS_HERO,
  ATHLETICS_IMAGES,
  ARTS_IMAGES,
  STUDENT_LIFE_IMAGES,
  COMMUNITY_IMAGES,
  CONTACT_IMAGES,
  NEWS_IMAGES,
} from "@/data/images";
import type { ImageAsset } from "@/data/images";

import styles from "./WalkerHomepage.module.css";

// ── Icon mapping for stat IconCards ────────────────────────────────────
const statIcons = [
  <Icon key="founded" size="large" decorative><CommunityIcon /></Icon>,
  <Icon key="students" size="large" decorative><AcademicIcon /></Icon>,
  <Icon key="affiliated" size="large" decorative><SportsIcon /></Icon>,
];

export function WalkerHomepage(): React.ReactNode {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuOpen = useCallback(() => setIsMenuOpen(true), []);
  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
    // Restore focus to the Menu button when overlay closes
    menuButtonRef.current?.focus();
  }, []);

  return (
    <main id="main-content" className={styles.page}>
      <LoadOverlay />

      <Header
        brandText="St. Elizabeth High School"
        navLinks={HEADER_NAV_LINKS}
        transparent
        fixed
        onMenuClick={handleMenuOpen}
        isMenuOpen={isMenuOpen}
        menuButtonRef={menuButtonRef}
      />

      <MenuOverlay
        categories={MENU_CATEGORIES}
        previewImages={{
          ABOUT: HERO_IMAGES.find((i: ImageAsset) => i.section === "about-hero")?.filename ?? "",
          ADMISSIONS: HERO_IMAGES.find((i: ImageAsset) => i.section === "admissions-hero")?.filename ?? "",
          ACADEMICS: ACADEMICS_HERO.filename,
          ATHLETICS: ATHLETICS_IMAGES[0]?.filename ?? "",
          ARTS: ARTS_IMAGES[0]?.filename ?? "",
          "STUDENT LIFE": STUDENT_LIFE_IMAGES[0]?.filename ?? "",
          ALUMNI: COMMUNITY_IMAGES[0]?.filename ?? "",
          NEWS: NEWS_IMAGES[0]?.filename ?? "",
          CONTACT: CONTACT_IMAGES[0]?.filename ?? "",
          "HOW TO HELP": COMMUNITY_IMAGES[1]?.filename ?? "",
        }}
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
      />

      <HorizontalScroll height="100vh" gap="0px" ariaLabel="St. Elizabeth homepage — horizontally scrolling content panels">

        {/* ══════════════════════════════════════════════════════════════
            PANEL 1: Photo Hero (100vw, screen mode)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage screen headerTheme="light" className={`${styles.panel} ${styles.heroPanel}`} ariaLabel="St. Elizabeth High School — introduction">
          <div
            className={styles.heroBackground}
            style={{ backgroundImage: `url('/images/${HERO_IMAGES[0].filename}')` }}
            role="img"
            aria-label={HERO_IMAGES[0].alt}
          />
          <div className={styles.heroGradient} role="presentation" aria-hidden="true" />
          <div className={styles.heroOverlay}>
            <p className={styles.heroStatement}>{HERO_CONTENT.statement}</p>
            <h1 className={styles.heroHeading}>{HERO_CONTENT.heading}</h1>
          </div>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 2: "We Believe" Values (60vw desktop)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage
          width="clamp(960px, 85vw, 1400px)"
          tabletWidth="min(1040px, 110vw)"
          mobileWidth="max(760px, 180vw)"
          smallMobileWidth="max(720px, 200vw)"
          landscapeWidth="max(960px, 125vw)"
          headerTheme="dark"
          className={`${styles.panel} ${styles.valuesPanel}`}
          ariaLabel="St. Elizabeth values — Faith, Excellence, Community"
        >
          <div className={styles.valuesIntro}>
            <Text variant="eyebrow" as="p">We Believe</Text>
            <Heading level="h2" variant="section">Values That Shape Our Community</Heading>
            <Text variant="muted" as="p" size="medium">
              At St. Elizabeth High School, we are guided by our motto &lsquo;Truth and Honesty&rsquo;
              and the principle of &lsquo;Guiding Minds, Nurturing Hearts, Building Futures.&rsquo;
            </Text>
          </div>
          <div className={styles.valuesCards}>
            {VALUES.map((value) => {
              const imageKey = value.title.toLowerCase() as keyof typeof VALUES_IMAGES;
              const asset = VALUES_IMAGES[imageKey];
              return (
                <ValueCard
                  key={value.number}
                  number={value.number}
                  title={value.title}
                  body={value.body}
                  image={`/images/${asset.filename}`}
                  imageAlt={asset.alt}
                />
              );
            })}
          </div>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 3: Photo Grid (120vw desktop)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage
          width="clamp(1400px, 120vw, 2200px)"
          tabletWidth="min(1100px, 140vw)"
          mobileWidth="max(760px, 220vw)"
          smallMobileWidth="max(720px, 240vw)"
          landscapeWidth="max(1200px, 150vw)"
          headerTheme="dark"
          className={`${styles.panel} ${styles.gridPanel}`}
          ariaLabel="Photo gallery — Academics, Athletics, Arts, Student Life"
        >
          <Section background="paper" padding="large" className={styles.gridSection}>
            <Container width="wide">
              <Stack gap="large">
                <div className={styles.gridHeader}>
                  <Text variant="eyebrow" as="p">Experience St. Elizabeth</Text>
                  <Heading level="h2" variant="section">Life at Our School</Heading>
                </div>
                <Grid columns={4} gap="medium" responsive>
                  {HOMEPAGE_GRID_IMAGES.map((img: ImageAsset) => (
                    <ImageCard
                      key={img.filename}
                      image={`/images/${img.filename}`}
                      imageAlt={img.alt}
                      title={img.category.charAt(0).toUpperCase() + img.category.slice(1)}
                      aspectRatio="4:3"
                      href={`/${img.category === "general" ? "about" : img.category}`}
                    />
                  ))}
                </Grid>
              </Stack>
            </Container>
          </Section>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 4: School Stats (50vw desktop)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage
          width="clamp(700px, 50vw, 1000px)"
          tabletWidth="min(700px, 90vw)"
          mobileWidth="max(760px, 175vw)"
          smallMobileWidth="max(720px, 195vw)"
          landscapeWidth="max(720px, 105vw)"
          headerTheme="dark"
          className={`${styles.panel} ${styles.statsPanel}`}
          ariaLabel="School statistics — Founded 1949, 1200+ students, CBSE affiliated"
        >
          <SplitLayout
            left={
              <Stack gap="medium">
                <Text variant="eyebrow">Our Legacy</Text>
                <Heading level="h2" variant="section">Since 1949</Heading>
                <Text variant="muted" size="medium">
                  St. Elizabeth High School has been educating students in Pomburpa, Goa, India.
                  Guided by our motto &lsquo;Truth and Honesty,&rsquo; we foster a supportive
                  environment where every child discovers their potential and purpose.
                </Text>
                <Link href="/about/history">Learn About Our History</Link>
              </Stack>
            }
            right={
              <Grid columns={3} gap="medium" responsive>
                {STATS.map((stat, i) => (
                  <IconCard
                    key={stat.label}
                    icon={statIcons[i]}
                    title={stat.value}
                    description={`${stat.label} — ${stat.description}`}
                  />
                ))}
              </Grid>
            }
            ratio="1-2"
          />
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 5: Testimonials (80vw desktop)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage
          width="clamp(1100px, 80vw, 1600px)"
          tabletWidth="min(900px, 110vw)"
          mobileWidth="max(760px, 200vw)"
          smallMobileWidth="max(720px, 220vw)"
          landscapeWidth="max(1000px, 130vw)"
          headerTheme="dark"
          className={`${styles.panel} ${styles.testimonialsPanel}`}
          ariaLabel="Testimonials from students, alumni, and parents"
        >
          <Section background="soft" padding="xlarge" className={styles.testimonialsSection}>
            <Container>
              <Stack gap="xlarge">
                <div className={styles.testimonialsHeader}>
                  <Text variant="eyebrow">Voices of Our Community</Text>
                  <Heading level="h2" variant="section">What They Say</Heading>
                </div>
                <Grid columns={3} gap="large" responsive>
                  {TESTIMONIALS.map((t) => (
                    <Card key={t.attribution} variant="default" padding="large">
                      <Stack gap="medium">
                        <Text variant="body" as="p" size="medium">
                          &ldquo;{t.quote}&rdquo;
                        </Text>
                        <div>
                          <Text variant="caption" as="span">
                            {t.attribution}
                          </Text>
                        </div>
                      </Stack>
                    </Card>
                  ))}
                </Grid>
              </Stack>
            </Container>
          </Section>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 6: CTA Banner (100vw, screen mode)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage screen headerTheme="light" className={`${styles.panel} ${styles.ctaPanel}`} ariaLabel="Call to action — Join our community">
          <CTASection
            heading={CTA_CONTENT.heading}
            description={CTA_CONTENT.description}
            primaryCTA={CTA_CONTENT.primaryCTA}
            secondaryCTA={CTA_CONTENT.secondaryCTA}
            background="blue"
            centered
          />
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 7: Latest News (100vw, screen mode)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage screen headerTheme="dark" className={`${styles.panel} ${styles.newsPanel}`} ariaLabel="Latest news and events">
          <Section background="paper" padding="xlarge" className={styles.newsSection}>
            <Container>
              <Stack gap="xlarge">
                <div className={styles.newsHeader}>
                  <Text variant="eyebrow">Latest News &amp; Events</Text>
                  <Heading level="h2" variant="section">What&rsquo;s Happening</Heading>
                </div>
                <Grid columns={3} gap="large" responsive>
                  {LATEST_NEWS.map((item) => (
                    <ImageCard
                      key={item.href}
                      image={`/images/${item.imageFilename}`}
                      imageAlt={item.title}
                      title={item.title}
                      description={`${item.date} — ${item.excerpt}`}
                      aspectRatio="4:3"
                      href={item.href}
                    />
                  ))}
                </Grid>
                <div className={styles.newsCta}>
                  <Link href="/news">View All News</Link>
                </div>
              </Stack>
            </Container>
          </Section>
        </HorizontalPage>

        {/* ══════════════════════════════════════════════════════════════
            PANEL 8: Footer (100vw, screen mode)
            ══════════════════════════════════════════════════════════════ */}
        <HorizontalPage screen headerTheme="light" className={`${styles.panel} ${styles.footerPanel}`} ariaLabel="Site footer with contact information and links">
          <Footer
            intro={FOOTER_INTRO}
            sections={FOOTER_SECTIONS}
            socialLinks={FOOTER_SOCIAL_LINKS}
            copyright={FOOTER_COPYRIGHT}
            background="maroon"
          />
        </HorizontalPage>

      </HorizontalScroll>
    </main>
  );
}
