import type { ReactNode } from "react";
import { Suspense } from "react";
import { Header } from "@/widgets/header/header";
import { Footer } from "@/widgets/footer/footer";
import { AnnouncementBar } from "@/widgets/announcement-bar/announcement-bar";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/domains/nav/navigation.data";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar
        message="Admissions Open for 2026-27 — Applications now being accepted for all grades"
        href="/admissions/apply"
        linkText="Apply Now"
      />
      <Header navLinks={HEADER_NAV_LINKS} transparent={true} noScrollBar={true} fixed />
      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Suspense fallback={<footer />}>
        <Footer
          intro={FOOTER_INTRO}
          sections={FOOTER_SECTIONS}
          socialLinks={FOOTER_SOCIAL_LINKS}
          copyright={FOOTER_COPYRIGHT}
        />
      </Suspense>
    </>
  );
}
