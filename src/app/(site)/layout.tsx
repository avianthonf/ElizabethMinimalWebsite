import type { ReactNode } from "react";
import { Suspense } from "react";
import { Header } from "@/widgets/header/header";
import { Footer } from "@/widgets/footer/footer";
import { ReadingProgressBar } from "@/features/progress";
import { AnnouncementBar } from "@/widgets/announcement-bar/announcement-bar";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/domains/nav/navigation.data";
import { getCurrentAnnouncement } from "@/domains/homepage/announcements.fetcher";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const announcement = await getCurrentAnnouncement();

  return (
    <>
      {announcement.enabled && (
        <>
          {/* Pre-set --announcement-height baseline on <html> for SSR first-frame correctness.
              The AnnouncementBar's useLayoutEffect refines via ResizeObserver post-hydration. */}
          <style
            dangerouslySetInnerHTML={{
              __html: `html { --announcement-height: 42px; }`,
            }}
          />
          <AnnouncementBar
            message={announcement.message}
            href={announcement.href}
            linkText={announcement.linkText}
            storageKey={announcement.storageKey}
          />
        </>
      )}
      <ReadingProgressBar />
      <Header navLinks={HEADER_NAV_LINKS} transparent={true} fixed />
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
