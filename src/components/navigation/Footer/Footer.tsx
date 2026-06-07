import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Link } from "@/components/primitives/Link";
import styles from "./Footer.module.css";

export interface FooterSection {
  title: string;
  links: Array<{ text: string; href: string }>;
}

export interface FooterSocialLink {
  platform: string;
  href: string;
}

export interface FooterProps {
  sections?: FooterSection[];
  intro?: { heading: string; body: string };
  visualContent?: ReactNode;
  socialLinks?: FooterSocialLink[];
  copyright?: string;
  background?: "soft" | "primary";
  className?: string;
}

const DEFAULT_SECTIONS: FooterSection[] = [
  {
    title: "About",
    links: [
      { text: "Mission & Values", href: "/about/mission" },
      { text: "History", href: "/about/history" },
      { text: "Staff", href: "/about/staff" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { text: "Why St. Elizabeth", href: "/admissions/why" },
      { text: "Apply", href: "/admissions/apply" },
      { text: "Tuition", href: "/admissions/tuition" },
      { text: "FAQs", href: "/admissions/faqs" },
    ],
  },
  {
    title: "Academics",
    links: [
      { text: "Departments", href: "/academics/departments" },
      { text: "Languages", href: "/academics/languages" },
      { text: "Libraries", href: "/academics/libraries" },
      { text: "College Counseling", href: "/academics/college-counseling" },
    ],
  },
  {
    title: "Community",
    links: [
      { text: "Student Life", href: "/student-life" },
      { text: "Athletics", href: "/athletics" },
      { text: "Arts", href: "/arts" },
      { text: "Alumni", href: "/alumni" },
      { text: "News", href: "/news" },
      { text: "How to Help", href: "/how-to-help" },
    ],
  },
];

const DEFAULT_INTRO = {
  heading: "St. Elizabeth's High School",
  body: `Guiding Minds, Nurturing Hearts, Building Futures. A nurturing Catholic school in Pomburpa, Goa, rooted in Truth and Honesty since 1949.

Ven. Fr. Hilario Gonsalves Rd
Pomburpa, Bardez
Goa 403511, India

info@stelizabethhighschool.in`,
};

const DEFAULT_SOCIAL: FooterSocialLink[] = [
  { platform: "facebook", href: "https://facebook.com/stelizabethhighschool" },
  { platform: "instagram", href: "https://instagram.com/stelizabethhighschool" },
];

const DEFAULT_COPYRIGHT = `© ${new Date().getFullYear()} St. Elizabeth's High School, Pomburpa, Goa. All Rights Reserved.`;

const SOCIAL_ICONS: Record<string, ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
};

export function Footer({
  sections = DEFAULT_SECTIONS,
  intro = DEFAULT_INTRO,
  socialLinks = DEFAULT_SOCIAL,
  copyright = DEFAULT_COPYRIGHT,
  background = "primary",
  className,
}: FooterProps): ReactNode {
  const isDark = background === "primary";
  const composedClassName = [styles.footer, isDark ? styles.bgPrimary : styles.bgSoft, className]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className={composedClassName}>
      <Container width="default">
        <div className={styles.inner}>
          {/* Top row: intro + link columns */}
          <div className={styles.topRow}>
            <div className={styles.intro}>
              <Stack gap="medium">
                <Heading
                  level="h2"
                  variant="section"
                  className={isDark ? styles.lightHeading : undefined}
                >
                  {intro.heading}
                </Heading>
                <Text
                  variant="muted"
                  size="medium"
                  className={[styles.introBody, isDark ? styles.lightText : undefined]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {intro.body}
                </Text>
              </Stack>
            </div>

            {sections.length > 0 && (
              <Grid columns={sections.length as 2 | 3 | 4} gap="large" responsive>
                {sections.map((section) => (
                  <div key={section.title} className={styles.linkGroup}>
                    <Text
                      variant="eyebrow"
                      className={isDark ? styles.lightEyebrow : undefined}
                    >
                      {section.title}
                    </Text>
                    <ul className={styles.linkList}>
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} variant="footer">
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Grid>
            )}
          </div>

          {/* Bottom row: social + copyright */}
          <div className={styles.bottomRow}>
            {socialLinks.length > 0 && (
              <div className={styles.socialLinks}>
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`St. Elizabeth's High School on ${link.platform}`}
                    className={styles.socialLink}
                  >
                    {SOCIAL_ICONS[link.platform] ?? link.platform}
                  </a>
                ))}
              </div>
            )}

            {copyright && (
              <Text variant="caption" className={isDark ? styles.lightCaption : undefined}>
                {copyright}
              </Text>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
