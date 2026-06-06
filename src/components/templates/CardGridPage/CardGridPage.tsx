import Link from "next/link";
import type { ReactNode } from "react";
import { Hero } from "@/components/content/Hero";
import { Container } from "@/components/layout/Container";
import { Grid, type GridColumns } from "@/components/layout/Grid";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";

export interface CardGridPageProps<T> {
  /** Hero eyebrow text (optional — when omitted, no eyebrow renders) */
  heroEyebrow?: string;
  /** Hero heading (h1) text */
  heroHeading: string;
  /** Hero description paragraph (optional) */
  heroDescription?: string;
  /** Hero background image URL (optional) */
  heroBackgroundImage?: string;
  /** Optional breadcrumb rendered above the hero */
  breadcrumb?: { href: string; label: string; currentLabel: string };
  /** Section heading (h2) — when omitted, no section heading renders */
  sectionHeading?: string;
  /** Optional descriptive paragraph below the section heading */
  sectionDescription?: string;
  /** Items to render as cards */
  items: readonly T[];
  /** Render function for each card — receives item and index */
  renderCard: (item: T, index: number) => ReactNode;
  /** Grid columns (2 | 3 | 4). When omitted, falls back to a vertical Stack. */
  columns?: GridColumns;
  /** Container width constraint (default: "narrow") */
  containerWidth?: "narrow" | "default" | "wide";
  /** Accessible label for the content <section> */
  sectionAriaLabel: string;
}

/**
 * Generic template for pages that display a grid (or stack) of cards
 * behind a Hero banner. Handles PageShell, optional breadcrumb, section
 * heading, and the card layout automatically.
 */
export function CardGridPage<T>({
  heroEyebrow,
  heroHeading,
  heroDescription,
  heroBackgroundImage,
  breadcrumb,
  sectionHeading,
  sectionDescription,
  items,
  renderCard,
  columns,
  containerWidth = "narrow",
  sectionAriaLabel,
}: CardGridPageProps<T>): ReactNode {
  return (
    <PageShell
      hero={
        <>
          {breadcrumb && (
            <nav
              aria-label="Breadcrumb"
              style={{
                padding: "var(--spacing-md) 0 0",
                fontSize: "calc(var(--text-scale) * 0.85rem)",
                color: "var(--s-color-text-muted)",
              }}
            >
              <Container width="narrow">
                <Link
                  href={breadcrumb.href}
                  style={{
                    color: "var(--s-color-text-muted)",
                    textDecoration: "underline",
                  }}
                >
                  {breadcrumb.label}
                </Link>
                {` / ${breadcrumb.currentLabel}`}
              </Container>
            </nav>
          )}
          <Hero
            eyebrow={heroEyebrow}
            heading={heroHeading}
            description={heroDescription}
            backgroundImage={heroBackgroundImage}
          />
        </>
      }
    >
      <Section background="paper" padding="xlarge" ariaLabel={sectionAriaLabel}>
        <Container width={containerWidth}>
          <Stack gap="large">
            {(sectionHeading || sectionDescription) && (
              <Stack gap="medium">
                {sectionHeading && (
                  <Heading level="h2" variant="section">
                    {sectionHeading}
                  </Heading>
                )}
                {sectionDescription && (
                  <Text variant="muted" size="medium">
                    {sectionDescription}
                  </Text>
                )}
              </Stack>
            )}
            {columns ? (
              <Grid columns={columns} gap="medium" responsive>
                {items.map((item, index) => renderCard(item, index))}
              </Grid>
            ) : (
              <Stack gap="medium">
                {items.map((item, index) => renderCard(item, index))}
              </Stack>
            )}
          </Stack>
        </Container>
      </Section>
    </PageShell>
  );
}
