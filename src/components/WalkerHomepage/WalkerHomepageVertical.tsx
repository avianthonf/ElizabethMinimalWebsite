"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { LoadOverlay } from "@/components/LoadOverlay";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { MenuOverlay } from "@/components/navigation/MenuOverlay";
import type { UseMenuStateReturn } from "./hooks/useMenuState";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { HeroPanel } from "./panels/HeroPanel";
import { ValuesPanel, valuesPanelClass } from "./panels/ValuesPanel";
import { StatsPanel, statsPanelClass } from "./panels/StatsPanel";
import {
  GalleryPanel,
  verticalGalleryPanelClass,
} from "./panels/GalleryPanel";
import { TestimonialsPanel, testimonialsPanelClass } from "./panels/TestimonialsPanel";
import { CTAPanel, ctaPanelClass } from "./panels/CTAPanel";
import { NewsPanel, newsPanelClass } from "./panels/NewsPanel";
import { HEADER_NAV_LINKS } from "@/data/navigation";
import shared from "./panels/shared.module.css";

import styles from "./WalkerHomepage.module.css";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

interface WalkerHomepageVerticalProps {
  menu: UseMenuStateReturn;
}

/**
 * WalkerHomepageVertical — stacks all homepage panels vertically
 * with natural scroll for mobile/tablet (< 1100px).
 *
 * The orchestrator owns ALL layout wrapping. Panels are pure content
 * — no layout awareness or self-wrapping.
 *
 * @see WalkerHomepage for the orchestrator and the desktop version.
 */
export function WalkerHomepageVertical({ menu }: WalkerHomepageVerticalProps): ReactNode {
  const prefersReduced = useReducedMotion();

  return (
    <main id="main-content" className={styles.verticalPage} suppressHydrationWarning>
      <LoadOverlay />

      <Header
        brandText="St. Elizabeth's High School"
        navLinks={HEADER_NAV_LINKS}
        transparent
        fixed
        onMenuClick={menu.open}
        isMenuOpen={menu.isOpen}
        menuButtonRef={menu.triggerRef}
      />

      <MenuOverlay isOpen={menu.isOpen} onClose={menu.close} />

      {/* ── Panel 1: Hero (full viewport) ────────────────────────────── */}
      <section
        className={styles.verticalHero}
        data-header-theme="light"
        aria-label="St. Elizabeth's High School — introduction"
      >
        <HeroPanel onMenuOpen={menu.open} />
      </section>

      {/* ── Panel 2: Values ────────────────────────────────────────────── */}
      <motion.section
        className={`${shared.panel} ${valuesPanelClass}`}
        data-header-theme="dark"
        aria-label="St. Elizabeth values — Faith, Excellence, Community"
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionVariants}
      >
        <ValuesPanel />
      </motion.section>

      {/* ── Panel 3: Stats ─────────────────────────────────────────────── */}
      <motion.section
        className={`${shared.panel} ${statsPanelClass}`}
        data-header-theme="dark"
        aria-label="St. Elizabeth's High School — key statistics"
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionVariants}
      >
        <StatsPanel />
      </motion.section>

      {/* ── Panel 4: Gallery ───────────────────────────────────────────── */}
      <motion.section
        className={shared.panel}
        data-header-theme="dark"
        aria-label="Photo gallery — Academics, Athletics, Arts, Student Life"
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionVariants}
      >
        <GalleryPanel className={verticalGalleryPanelClass} />
      </motion.section>

      {/* ── Panel 5: Testimonials ───────────────────────────────────────── */}
      <motion.section
        className={`${shared.panel} ${testimonialsPanelClass}`}
        data-header-theme="dark"
        aria-label="Testimonials from students, alumni, and parents"
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionVariants}
      >
        <TestimonialsPanel />
      </motion.section>

      {/* ── Panel 6: CTA ───────────────────────────────────────────────── */}
      <motion.section
        className={`${shared.panel} ${ctaPanelClass}`}
        data-header-theme="light"
        aria-label="Call to action — Join our community"
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionVariants}
      >
        <CTAPanel />
      </motion.section>

      {/* ── Panel 7: Latest News ────────────────────────────────────────── */}
      <motion.section
        className={`${shared.panel} ${newsPanelClass}`}
        data-header-theme="dark"
        aria-label="Latest news and events"
        initial={prefersReduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionVariants}
      >
        <NewsPanel />
      </motion.section>

      {/* ── Panel 8: Footer ────────────────────────────────────────────── */}
      <section
        className={shared.panel}
        data-header-theme="light"
        aria-label="Site footer with contact information and links"
      >
        <Footer background="primary" />
      </section>
    </main>
  );
}
