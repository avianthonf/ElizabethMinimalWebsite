"use client";

import type { ReactNode } from "react";
import { LoadOverlay } from "@/components/LoadOverlay";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { HorizontalPage } from "@/components/HorizontalScroll";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { MenuOverlay } from "@/components/navigation/MenuOverlay";
import type { UseMenuStateReturn } from "./hooks/useMenuState";
import { HeroPanel, heroPanelClass } from "./panels/HeroPanel";
import { ValuesPanel, valuesPanelClass } from "./panels/ValuesPanel";
import { StatsPanel, statsPanelClass } from "./panels/StatsPanel";
import { GalleryPanel, galleryPanelClass } from "./panels/GalleryPanel";
import { TestimonialsPanel, testimonialsPanelClass } from "./panels/TestimonialsPanel";
import { CTAPanel, ctaPanelClass } from "./panels/CTAPanel";
import { NewsPanel, newsPanelClass } from "./panels/NewsPanel";
import { HEADER_NAV_LINKS } from "@/data/navigation";
import shared from "./panels/shared.module.css";

import styles from "./WalkerHomepage.module.css";

interface WalkerHomepageDesktopProps {
  menu: UseMenuStateReturn;
}

/**
 * WalkerHomepageDesktop — horizontal scroll experience.
 *
 * The orchestrator owns ALL layout wrapping (HorizontalPage
 * configuration). Panels are pure content — no layout awareness.
 *
 * @see WalkerHomepage for the orchestrator that routes between
 * this component and the vertical mobile layout.
 */
export function WalkerHomepageDesktop({ menu }: WalkerHomepageDesktopProps): ReactNode {
  return (
    <main id="main-content" className={styles.page} suppressHydrationWarning>
      <LoadOverlay />

      <Header
        brandText="St. Elizabeth's High School"
        navLinks={HEADER_NAV_LINKS}
        transparent
        fixed
        noScrollBar
        onMenuClick={menu.open}
        isMenuOpen={menu.isOpen}
        menuButtonRef={menu.triggerRef}
      />

      <MenuOverlay isOpen={menu.isOpen} onClose={menu.close} />

      <HorizontalScroll
        height="100vh"
        gap="0px"
        ariaLabel="St. Elizabeth homepage — horizontally scrolling content panels"
      >
        {/* ── Panel 1: Photo Hero (100vw) ─────────────────────────────── */}
        <HorizontalPage
          width="100vw"
          screen
          headerTheme="light"
          className={heroPanelClass}
          ariaLabel="St. Elizabeth's High School — introduction"
        >
          <HeroPanel onMenuOpen={menu.open} />
        </HorizontalPage>

        {/* ── Panel 2: "We Believe" Values ────────────────────────────── */}
        <HorizontalPage
          width="clamp(1600px, 115vw, 2400px)"
          headerTheme="dark"
          className={`${shared.panel} ${valuesPanelClass}`}
          ariaLabel="St. Elizabeth values — Faith, Excellence, Community"
        >
          <ValuesPanel />
        </HorizontalPage>

        {/* ── Panel 3: School Stats ───────────────────────────────────── */}
        <HorizontalPage
          width="clamp(1200px, 95vw, 1800px)"
          headerTheme="dark"
          className={`${shared.panel} ${statsPanelClass}`}
          ariaLabel="St. Elizabeth's High School — key statistics"
        >
          <StatsPanel />
        </HorizontalPage>

        {/* ── Panel 4: Masonry Mosaic Gallery ─────────────────────────── */}
        <HorizontalPage
          width="clamp(1800px, 180vw, 5000px)"
          headerTheme="light"
          className={`${shared.panel} ${galleryPanelClass}`}
          ariaLabel="Photo gallery — Academics, Athletics, Arts, Student Life"
        >
          <GalleryPanel className={galleryPanelClass} />
        </HorizontalPage>

        {/* ── Panel 5: Testimonials ───────────────────────────────────── */}
        <HorizontalPage
          width="clamp(1400px, 110vw, 2200px)"
          headerTheme="dark"
          className={`${shared.panel} ${testimonialsPanelClass}`}
          ariaLabel="Testimonials from students, alumni, and parents"
        >
          <TestimonialsPanel />
        </HorizontalPage>

        {/* ── Panel 6: CTA Banner ─────────────────────────────────────── */}
        <HorizontalPage
          width="clamp(900px, 80vw, 1400px)"
          headerTheme="light"
          className={ctaPanelClass}
          ariaLabel="Call to action — Join our community"
        >
          <CTAPanel />
        </HorizontalPage>

        {/* ── Panel 7: Latest News ────────────────────────────────────── */}
        <HorizontalPage
          width="clamp(1400px, 110vw, 2200px)"
          headerTheme="dark"
          className={newsPanelClass}
          ariaLabel="Latest news and events"
        >
          <NewsPanel />
        </HorizontalPage>

        {/* ── Panel 8: Footer (100vw) ─────────────────────────────────── */}
        <HorizontalPage
          width="100vw"
          screen
          headerTheme="light"
          ariaLabel="Site footer with contact information and links"
        >
          <Footer background="primary" />
        </HorizontalPage>
      </HorizontalScroll>
    </main>
  );
}
