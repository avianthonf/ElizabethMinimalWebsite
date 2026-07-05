import type { ReactNode } from "react";
import { Header } from "@/widgets/header/header";
import { Footer } from "@/widgets/footer/footer";
import {
  HEADER_NAV_LINKS,
  FOOTER_SECTIONS,
  FOOTER_INTRO,
  FOOTER_SOCIAL_LINKS,
  FOOTER_COPYRIGHT,
} from "@/domains/nav/navigation.data";

export interface PageShellProps {
  children: ReactNode;
  /** Optional hero content rendered between the header/skip-link and the main content wrapper */
  hero?: ReactNode;
  /** Header background theme: 'light' = solid background, 'dark' = transparent (default: 'light') */
  headerTheme?: "light" | "dark";
}

/**
 * Universal page shell that absorbs the repeated Header + skip link +
 * <main id="main-content"> + Footer pattern used across all inner pages.
 *
 * Pages should wrap their content inside PageShell and pass any hero
 * (and breadcrumb navigation above the hero) via the `hero` prop.
 */
export function PageShell({ children, hero, headerTheme = "light" }: PageShellProps): ReactNode {
  return (
    <>
      <Header navLinks={HEADER_NAV_LINKS} transparent={headerTheme === "dark"} fixed />
      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>
      {hero}
      <main id="main-content" tabIndex={-1}>
        {children}
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
