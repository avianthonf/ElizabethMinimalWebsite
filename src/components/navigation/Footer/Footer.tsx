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
  background?: "soft" | "maroon";
  className?: string;
}

const DEFAULT_SECTIONS: FooterSection[] = [
  {
    title: "Quick Links",
    links: [
      { text: "Inquire", href: "/inquire" },
      { text: "Visit Campus", href: "/visit" },
      { text: "Summer Programs", href: "/summer" },
      { text: "About St. Elizabeth", href: "/about" },
    ],
  },
  {
    title: "Academics",
    links: [
      { text: "Curriculum", href: "/academics" },
      { text: "Faculty", href: "/faculty" },
      { text: "College Counseling", href: "/counseling" },
    ],
  },
  {
    title: "Community",
    links: [
      { text: "Athletics", href: "/athletics" },
      { text: "Arts", href: "/arts" },
      { text: "Student Life", href: "/student-life" },
    ],
  },
];

export function Footer({
  sections = DEFAULT_SECTIONS,
  intro,
  socialLinks,
  copyright,
  background = "maroon",
  className,
}: FooterProps): ReactNode {
  const isDark = background === "maroon";
  const composedClassName = [styles.footer, isDark ? styles.bgMaroon : styles.bgSoft, className]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className={composedClassName}>
      <Container width="default">
        <div className={styles.inner}>
          {/* Top row: intro + link columns */}
          <div className={styles.topRow}>
            {intro && (
              <div className={styles.intro}>
                <Stack gap="medium">
                  <Heading
                    level="h2"
                    variant="section"
                    className={isDark ? styles.lightHeading : undefined}
                  >
                    {intro.heading}
                  </Heading>
                  <Text variant="muted" size="medium" className={isDark ? styles.lightText : undefined}>
                    {intro.body}
                  </Text>
                </Stack>
              </div>
            )}

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
            {socialLinks && socialLinks.length > 0 && (
              <div className={styles.socialLinks}>
                {socialLinks.map((link) => (
                  <Link
                    key={link.platform}
                    href={link.href}
                    variant="footer"
                    ariaLabel={`${link.platform} page`}
                  >
                    {link.platform}
                  </Link>
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
