"use client";

import { useState } from "react";
import { LoadOverlay } from "@/components/LoadOverlay";
import { HeaderThemeController } from "@/components/HeaderThemeController";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { HorizontalPage } from "@/components/HorizontalScroll";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { MenuOverlay } from "@/components/navigation/MenuOverlay";
import { useMenuState } from "./hooks/useMenuState";
import { HeroPanel, heroPanelClass } from "./panels/HeroPanel";
import { ValuesPanel } from "./panels/ValuesPanel";
import { StatsPanel } from "./panels/StatsPanel";
import { GalleryPanel } from "./panels/GalleryPanel";
import { TestimonialsPanel } from "./panels/TestimonialsPanel";
import { CTAPanel, ctaPanelClass } from "./panels/CTAPanel";
import { NewsPanel, newsPanelClass } from "./panels/NewsPanel";
import { HEADER_NAV_LINKS } from "@/data/navigation";

import styles from "./WalkerHomepage.module.css";

export function WalkerHomepage(): React.ReactNode {
  const [showOverlay, setShowOverlay] = useState(true);
  const menu = useMenuState();

  return (
    <main id="main-content" className={styles.page}>
      <LoadOverlay onComplete={() => setShowOverlay(false)} />

      {!showOverlay && (
        <Header
          brandText="St. Elizabeth's High School"
          navLinks={HEADER_NAV_LINKS}
          transparent
          fixed
          onMenuClick={menu.open}
          isMenuOpen={menu.isOpen}
          menuButtonRef={menu.triggerRef}
        />
      )}

      <MenuOverlay isOpen={menu.isOpen} onClose={menu.close} />

      <HeaderThemeController />

      <HorizontalScroll
        height="100vh"
        gap="0px"
        ariaLabel="St. Elizabeth homepage — horizontally scrolling content panels"
      >
        {/* ── Panel 1: Photo Hero (100vw) ─────────────────────────────── */}
        <HorizontalPage
          width="100vw"
          headerTheme="light"
          className={heroPanelClass}
          ariaLabel="St. Elizabeth's High School — introduction"
        >
          <HeroPanel onMenuOpen={menu.open} />
        </HorizontalPage>

        {/* ── Panel 2: "We Believe" Values ────────────────────────────── */}
        <ValuesPanel />

        {/* ── Panel 3: School Stats ───────────────────────────────────── */}
        <StatsPanel />

        {/* ── Panel 4: Masonry Mosaic Gallery ─────────────────────────── */}
        <GalleryPanel />

        {/* ── Panel 5: Testimonials ───────────────────────────────────── */}
        <TestimonialsPanel />

        {/* ── Panel 6: CTA Banner (100vw) ─────────────────────────────── */}
        <HorizontalPage
          width="100vw"
          headerTheme="light"
          className={ctaPanelClass}
          ariaLabel="Call to action — Join our community"
        >
          <CTAPanel />
        </HorizontalPage>

        {/* ── Panel 7: Latest News (100vw) ────────────────────────────── */}
        <HorizontalPage
          width="100vw"
          headerTheme="dark"
          className={newsPanelClass}
          ariaLabel="Latest news and events"
        >
          <NewsPanel />
        </HorizontalPage>

        {/* ── Panel 8: Footer (100vw) ─────────────────────────────────── */}
        <HorizontalPage
          width="100vw"
          headerTheme="light"
          ariaLabel="Site footer with contact information and links"
        >
          <Footer background="primary" />
        </HorizontalPage>
      </HorizontalScroll>
    </main>
  );
}
