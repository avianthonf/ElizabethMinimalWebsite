import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Button } from "@/components/primitives/Button";
import type { SectionBackground } from "@/components/layout/Section";
import Image from "next/image";
import styles from "./CTASection.module.css";

export type CTABackground = "primary" | "blue" | "soft";

export interface CTASectionProps {
  heading: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  background?: CTABackground;
  centered?: boolean;
  className?: string;
  eyebrow?: string;
  image?: { src: string; alt: string };
}

const bgMap: Record<CTABackground, SectionBackground> = {
  primary: "primary",
  blue: "blue",
  soft: "soft",
};

export function CTASection({
  heading,
  description,
  primaryCTA,
  secondaryCTA,
  background = "primary",
  centered = true,
  className,
  eyebrow,
  image,
}: CTASectionProps): ReactNode {
  const isDark = background === "primary" || background === "blue";
  const hasImage = !!image;

  const ctaContent = (
    <Stack gap="large">
      {eyebrow && (
        <Text variant="eyebrow" as="p" className={isDark ? styles.lightText : undefined}>
          {eyebrow}
        </Text>
      )}

      <Heading
        level="h2"
        variant="section"
        className={isDark ? styles.lightHeading : undefined}
      >
        {heading}
      </Heading>

      {description && (
        <Text variant={isDark ? "body" : "muted"} size="large" className={isDark ? styles.lightText : undefined}>
          {description}
        </Text>
      )}

      {(primaryCTA || secondaryCTA) && (
        <div className={`${styles.ctas} ${centered && !hasImage ? styles.ctasCentered : ""}`}>
          {primaryCTA && (
            <Button href={primaryCTA.href} variant="lightButton" size="large">
              {primaryCTA.text}
            </Button>
          )}
          {secondaryCTA && (
            <Button
              href={secondaryCTA.href}
              variant="ghost"
              size="large"
              className={isDark ? styles.ghostLight : undefined}
            >
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      )}
    </Stack>
  );

  if (hasImage) {
    return (
      <Section background={bgMap[background]} padding="xlarge" className={className}>
        <Container width="wide">
          <div className={styles.splitLayout}>
            <div className={styles.textCol}>
              <div className={styles.bodyText}>{ctaContent}</div>
            </div>
            <div className={styles.imageCol}>
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={450}
                className={styles.image}
                priority
              />
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  // Default: centered text-only layout
  return (
    <Section background={bgMap[background]} padding="xlarge" className={className}>
      <Container width="narrow">
        <div className={`${styles.content} ${centered ? styles.centered : ""}`}>
          {ctaContent}
        </div>
      </Container>
    </Section>
  );
}
