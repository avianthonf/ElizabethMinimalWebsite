import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { AnnouncementBar } from "@/components/ui/AnnouncementBar/AnnouncementBar";
import { ScrollReveal } from "@/components/primitives/ScrollReveal/ScrollReveal";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/data/navigation";
import { HeroCarousel } from "./HeroCarousel/HeroCarousel";
import { CounterBar } from "./CounterBar/CounterBar";
import { WelcomeSection } from "./WelcomeSection/WelcomeSection";
import { WhySection } from "./WhySection/WhySection";
import { ProgramsGrid } from "./ProgramsGrid/ProgramsGrid";
import { HolisticSection } from "./HolisticSection/HolisticSection";
import { GallerySection } from "./GallerySection/GallerySection";
import { CampusThenNow } from "./CampusThenNow/CampusThenNow";
import { AchievementsSection } from "./AchievementsSection/AchievementsSection";
import { StudentLifeSection } from "./StudentLifeSection/StudentLifeSection";
import { TestimonialsSection } from "./TestimonialsSection/TestimonialsSection";
import { AdmissionsCTA } from "./AdmissionsCTA/AdmissionsCTA";
import { NewsSection } from "./NewsSection/NewsSection";
import { EventsPreview } from "./EventsPreview/EventsPreview";
import { LocateSection } from "./LocateSection/LocateSection";

import { TESTIMONIALS, LATEST_NEWS } from "@/data/homepage";
import {
  HERO_SLIDES,
  COUNTER_STATS,
  WELCOME_CONTENT,
  WELCOME_CAROUSEL_IMAGES,
  WHY_CONTENT,
  WHY_POINTS,
  PROGRAM_BOXES,
  PROGRAMS_CONTENT,
  GALLERY_CONTENT,
  GALLERY_IMAGES,
  ACHIEVEMENTS,
  ACHIEVEMENTS_CONTENT,
  STUDENT_LIFE_CARDS,
  STUDENT_LIFE_CONTENT,
  ADMISSIONS_CTA_CONTENT,
  ADMISSIONS_CTA_STEPS,
  NEWS_HOMEPAGE_CONTENT,
  LOCATE_CONTENT,
} from "@/data/homepage-sections";

const whyPointsData = WHY_POINTS.map((p) => ({
  title: p.title,
  description: p.description,
}));

export function HomePage() {
  return (
    <>
      <AnnouncementBar
        message="Admissions Open for 2026-27 — Applications now being accepted for all grades"
        href="/admissions/apply"
        linkText="Apply Now"
      />
      <Header
        navLinks={HEADER_NAV_LINKS}
        transparent={true}
        noScrollBar={true}
        fixed
      />
      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        {/* S1: Hero Carousel — no scroll reveal (it's the hero) */}
        <HeroCarousel
          slides={HERO_SLIDES}
          ariaLabel="Featured highlights"
        />

        {/* S2: Counter Bar */}
        <ScrollReveal>
          <CounterBar
            stats={COUNTER_STATS}
            ariaLabel="Key school statistics"
          />
        </ScrollReveal>

        {/* S3: Welcome / About */}
        <ScrollReveal delay={0.1}>
          <WelcomeSection
            eyebrow={WELCOME_CONTENT.eyebrow}
            heading={WELCOME_CONTENT.heading}
            body={WELCOME_CONTENT.body}
            ctaText={WELCOME_CONTENT.ctaText}
            ctaHref={WELCOME_CONTENT.ctaHref}
            images={WELCOME_CAROUSEL_IMAGES}
            ariaLabel="Welcome to St. Elizabeth's"
          />
        </ScrollReveal>

        {/* S4: Why St. Elizabeth's */}
        <ScrollReveal direction="left" delay={0.1}>
          <WhySection
            eyebrow={WHY_CONTENT.eyebrow}
            heading={WHY_CONTENT.heading}
            points={whyPointsData}
            ariaLabel={WHY_CONTENT.sectionAriaLabel}
          />
        </ScrollReveal>

        {/* S5: Programs at a Glance */}
        <ScrollReveal direction="right" delay={0.1}>
          <ProgramsGrid
            eyebrow={PROGRAMS_CONTENT.eyebrow}
            heading={PROGRAMS_CONTENT.heading}
            boxes={PROGRAM_BOXES}
            ariaLabel={PROGRAMS_CONTENT.sectionAriaLabel}
          />
        </ScrollReveal>

        {/* S6: Holistic Education */}
        <ScrollReveal delay={0.15}>
          <HolisticSection ariaLabel="Holistic education" />
        </ScrollReveal>

        {/* S7: Photo Gallery */}
        <ScrollReveal delay={0.1}>
          <GallerySection
            eyebrow={GALLERY_CONTENT.eyebrow}
            heading={GALLERY_CONTENT.heading}
            images={GALLERY_IMAGES}
            ctaText={GALLERY_CONTENT.ctaText}
            ctaHref={GALLERY_CONTENT.ctaHref}
            ariaLabel={GALLERY_CONTENT.sectionAriaLabel}
          />
        </ScrollReveal>

        {/* S7b: Campus Then & Now */}
        <ScrollReveal direction="right" delay={0.1}>
          <CampusThenNow
            beforeImage={{
              filename: "DSC07317.jpg",
              alt: "Historic view of St. Elizabeth's campus",
              label: "Then",
            }}
            afterImage={{
              filename: "DSC07580.jpg",
              alt: "Modern St. Elizabeth's campus with facilities",
              label: "Now",
            }}
          />
        </ScrollReveal>

        {/* S8: Achievements */}
        <ScrollReveal direction="left" delay={0.1}>
          <AchievementsSection
            eyebrow={ACHIEVEMENTS_CONTENT.eyebrow}
            heading={ACHIEVEMENTS_CONTENT.heading}
            achievements={ACHIEVEMENTS}
            ariaLabel={ACHIEVEMENTS_CONTENT.sectionAriaLabel}
          />
        </ScrollReveal>

        {/* S9: Student Life */}
        <ScrollReveal direction="right" delay={0.1}>
          <StudentLifeSection
            eyebrow={STUDENT_LIFE_CONTENT.eyebrow}
            heading={STUDENT_LIFE_CONTENT.heading}
            cards={STUDENT_LIFE_CARDS.map((s, i) => ({
              title: s.title,
              description: s.description,
              href: s.href,
              color: [
                "var(--p-color-navy)",
                "var(--s-color-accent)",
                "var(--p-color-gold)",
                "var(--p-color-deep-blue)",
                "var(--p-color-navy)",
              ][i % 5],
            }))}
            ctaText={STUDENT_LIFE_CONTENT.ctaText}
            ctaHref={STUDENT_LIFE_CONTENT.ctaHref}
            ariaLabel={STUDENT_LIFE_CONTENT.sectionAriaLabel}
          />
        </ScrollReveal>

        {/* S10: Testimonials */}
        <ScrollReveal delay={0.15}>
          <TestimonialsSection
            testimonials={TESTIMONIALS}
            ariaLabel="Testimonials and community voices"
          />
        </ScrollReveal>

        {/* S11: Admissions CTA */}
        <ScrollReveal delay={0.1}>
          <AdmissionsCTA
            steps={ADMISSIONS_CTA_STEPS}
            heading={ADMISSIONS_CTA_CONTENT.heading}
            description={ADMISSIONS_CTA_CONTENT.description}
            primaryCtaText={ADMISSIONS_CTA_CONTENT.primaryCtaText}
            primaryCtaHref={ADMISSIONS_CTA_CONTENT.primaryCtaHref}
            ariaLabel={ADMISSIONS_CTA_CONTENT.sectionAriaLabel}
          />
        </ScrollReveal>

        {/* S12: Upcoming Events */}
        <ScrollReveal direction="right" delay={0.1}>
          <EventsPreview />
        </ScrollReveal>

        {/* S13: News & Events */}
        <ScrollReveal direction="left" delay={0.1}>
          <NewsSection
            eyebrow={NEWS_HOMEPAGE_CONTENT.eyebrow}
            heading={NEWS_HOMEPAGE_CONTENT.heading}
            news={LATEST_NEWS}
            ctaText={NEWS_HOMEPAGE_CONTENT.ctaText}
            ctaHref={NEWS_HOMEPAGE_CONTENT.ctaHref}
            ariaLabel={NEWS_HOMEPAGE_CONTENT.sectionAriaLabel}
          />
        </ScrollReveal>

        {/* S14: Locate Us */}
        <ScrollReveal delay={0.1}>
          <LocateSection
            eyebrow={LOCATE_CONTENT.eyebrow}
            heading={LOCATE_CONTENT.heading}
            address={LOCATE_CONTENT.address}
            phone={LOCATE_CONTENT.phone}
            email={LOCATE_CONTENT.email}
            ctaText={LOCATE_CONTENT.ctaText}
            ctaHref={LOCATE_CONTENT.ctaHref}
            ariaLabel={LOCATE_CONTENT.sectionAriaLabel}
          />
        </ScrollReveal>
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
