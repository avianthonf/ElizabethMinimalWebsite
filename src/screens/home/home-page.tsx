import { ScrollReveal } from "@/shared/ui/scroll-reveal";
import { HeroCarousel } from "./hero-carousel";
import { CounterBar } from "./counter-bar";
import { AchievementTicker } from "@/features/marquee";
import { WelcomeSection } from "./welcome-section";
import { LeadershipSection } from "./leadership-section";
import { WhySection } from "./why-section";
import { ProgramsGrid } from "./programs-grid";
import { HolisticSection } from "./holistic-section";
import { GallerySection } from "./gallery-section";
import { CampusThenNow } from "./campus-then-now";
import { AchievementsSection } from "./achievements-section";
import { StudentLifeSection } from "./student-life-section";
import { TestimonialsSection } from "./testimonials-section";
import { AdmissionsCTA } from "./admissions-cta";
import { NewsSection } from "./news-section";
import { EventsPreview } from "./events-preview";
import { LocateSection } from "./locate-section";

import { TESTIMONIALS, LATEST_NEWS } from "@/domains/homepage/homepage.data";
import { getUpcomingEvents } from "@/domains/homepage/events.fetcher";
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
} from "@/domains/homepage/sections.data";

const whyPointsData = WHY_POINTS.map((p) => ({
  title: p.title,
  description: p.description,
}));

export async function HomePage() {
  const hsEvents = await getUpcomingEvents();

  return (
    <>
      {/* S1: Hero Carousel — no scroll reveal (it's the hero) */}
      <HeroCarousel slides={HERO_SLIDES} ariaLabel="Featured highlights" />

      {/* S2: Counter Bar — no scroll reveal (immediately visible below hero) */}
      <CounterBar stats={COUNTER_STATS} ariaLabel="Key school statistics" />

      {/* S2b: Achievement Ticker Strip */}
      <AchievementTicker
        items={[
          "GBSHSE Affiliated — Goa Board of Secondary and Higher Secondary Education",
          "Since 1954 — Seven Decades of Educational Excellence in Pomburpa",
          "97.38% SSC Pass Percentage — Academic Year 2025-26",
          "State-Level Sports Participation — Inter-School Athletics & Team Sports",
          "Cultural Award Winners — Goa State Cultural Competitions",
          "Alumni Serving Across 20+ Countries — Doctors, Engineers, Teachers, Leaders",
          "Inter-House Competition Legacy — Red, Yellow, Blue & Green Houses",
          "Community Recognition — Active Parish & Village Engagement Since Inception",
        ]}
      />

      {/* S3: Welcome / About */}
      <ScrollReveal delay={0.1}>
        <WelcomeSection
          {...WELCOME_CONTENT}
          images={WELCOME_CAROUSEL_IMAGES}
          ariaLabel="Welcome to St. Elizabeth's"
        />
      </ScrollReveal>

      {/* S3b: Leadership Messages */}
      <ScrollReveal direction="right" delay={0.1}>
        <LeadershipSection ariaLabel="Messages from our leadership" />
      </ScrollReveal>

      {/* S4: Why St. Elizabeth's */}
      <ScrollReveal direction="left" delay={0.1}>
        <WhySection
          {...WHY_CONTENT}
          points={whyPointsData}
          ariaLabel={WHY_CONTENT.sectionAriaLabel}
        />
      </ScrollReveal>

      {/* S5: Programs at a Glance */}
      <ScrollReveal direction="right" delay={0.1}>
        <ProgramsGrid
          {...PROGRAMS_CONTENT}
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
          {...GALLERY_CONTENT}
          images={GALLERY_IMAGES}
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
          {...ACHIEVEMENTS_CONTENT}
          achievements={ACHIEVEMENTS}
          ariaLabel={ACHIEVEMENTS_CONTENT.sectionAriaLabel}
        />
      </ScrollReveal>

      {/* S9: Student Life */}
      <ScrollReveal direction="right" delay={0.1}>
        <StudentLifeSection
          {...STUDENT_LIFE_CONTENT}
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
          {...ADMISSIONS_CTA_CONTENT}
          steps={ADMISSIONS_CTA_STEPS}
          ariaLabel={ADMISSIONS_CTA_CONTENT.sectionAriaLabel}
        />
      </ScrollReveal>

      {/* S12: Upcoming Events */}
      <ScrollReveal direction="right" delay={0.1}>
        <EventsPreview events={hsEvents} />
      </ScrollReveal>

      {/* S13: News & Events */}
      <ScrollReveal direction="left" delay={0.1}>
        <NewsSection
          {...NEWS_HOMEPAGE_CONTENT}
          news={LATEST_NEWS}
          ariaLabel={NEWS_HOMEPAGE_CONTENT.sectionAriaLabel}
        />
      </ScrollReveal>

      {/* S14: Locate Us */}
      <ScrollReveal delay={0.1}>
        <LocateSection {...LOCATE_CONTENT} ariaLabel={LOCATE_CONTENT.sectionAriaLabel} />
      </ScrollReveal>
    </>
  );
}
