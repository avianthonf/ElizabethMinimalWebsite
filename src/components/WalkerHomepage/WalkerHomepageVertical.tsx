"use client";

import { useState } from "react";
import { LoadOverlay } from "@/components/LoadOverlay";
import { HeaderThemeController } from "@/components/HeaderThemeController";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { MenuOverlay } from "@/components/navigation/MenuOverlay";
import { useMenuState } from "./hooks/useMenuState";
import { HeroPanel } from "./panels/HeroPanel";
import { ValuesPanel } from "./panels/ValuesPanel";
import { StatsPanel } from "./panels/StatsPanel";
import { GalleryPanel } from "./panels/GalleryPanel";
import { TestimonialsPanel } from "./panels/TestimonialsPanel";
import { CTAPanel, ctaPanelClass } from "./panels/CTAPanel";
import { NewsPanel, newsPanelClass } from "./panels/NewsPanel";
import { HEADER_NAV_LINKS } from "@/data/navigation";

import styles from "./WalkerHomepage.module.css";

/**
 * WalkerHomepageVertical — stacks all homepage panels vertically
 * with natural scroll for mobile/tablet (< 1100px).
 *
 * @see WalkerHomepage for the orchestrator and the desktop version.
 */
export function WalkerHomepageVertical(): React.ReactNode {
  const [showOverlay, setShowOverlay] = useState(true);
  const menu = useMenuState();

  return (
    <main id="main-content" className={styles.verticalPage}>
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

      {/* ── Panel 1: Hero (full viewport) ────────────────────────────── */}
      <section
        className={styles.verticalHero}
        data-header-theme="light"
        aria-label="St. Elizabeth's High School — introduction"
      >
        <HeroPanel onMenuOpen={menu.open} />
      </section>

      {/* ── Panel 2: Values ────────────────────────────────────────────── */}
      <div data-header-theme="dark">
        <ValuesPanel layout="vertical" />
      </div>

      {/* ── Panel 3: Stats ─────────────────────────────────────────────── */}
      <div data-header-theme="dark">
        <StatsPanel layout="vertical" />
      </div>

      {/* ── Panel 4: Gallery ───────────────────────────────────────────── */}
      <div data-header-theme="dark">
        <GalleryPanel layout="vertical" />
      </div>

      {/* ── Panel 5: Testimonials ───────────────────────────────────────── */}
      <div data-header-theme="dark">
        <TestimonialsPanel layout="vertical" />
      </div>

      {/* ── Panel 6: CTA ───────────────────────────────────────────────── */}
      <section className={ctaPanelClass} data-header-theme="light" aria-label="Call to action — Join our community">
        <CTAPanel />
      </section>

      {/* ── Panel 7: Latest News ────────────────────────────────────────── */}
      <section className={newsPanelClass} data-header-theme="dark" aria-label="Latest news and events">
        <NewsPanel />
      </section>

      {/* ── Panel 8: Footer ────────────────────────────────────────────── */}
      <div data-header-theme="light">
        <Footer background="primary" />
      </div>
    </main>
  );
}
