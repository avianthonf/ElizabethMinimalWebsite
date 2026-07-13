import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { Button } from "@/shared/ui/button";
import styles from "./hero.module.css";

export interface HeroProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  align?: "left" | "center";
  className?: string;
}

export function Hero({
  eyebrow,
  heading,
  subheading,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  align = "left",
  className,
}: HeroProps): ReactNode {
  const hasMedia = Boolean(backgroundImage || backgroundVideo);

  const composedClassName = [
    styles.hero,
    hasMedia && styles.hasMedia,
    overlay && styles.overlay,
    align === "center" && styles.centered,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={composedClassName} {...(hasMedia ? { "data-header-theme": "light" } : {})}>
      {backgroundVideo && (
        <video
          className={styles.video}
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          fetchPriority="high"
          className={styles.bgImage}
          sizes="100vw"
          aria-hidden="true"
        />
      )}

      {hasMedia && <div className={styles.mediaFallback} role="presentation" aria-hidden="true" />}

      <Container width="default">
        <div className={styles.content}>
          {eyebrow && (
            <Text variant="eyebrow" className={styles.eyebrow}>
              {eyebrow}
            </Text>
          )}

          <Heading level="h1" variant={hasMedia ? "hero" : "section"}>
            {heading}
          </Heading>

          {subheading && <p className={styles.subheading}>{subheading}</p>}

          {description && (
            <Text
              variant={hasMedia ? "body" : "muted"}
              size="large"
              className={hasMedia ? styles.lightText : undefined}
            >
              {description}
            </Text>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div className={styles.ctas}>
              {primaryCTA && (
                <Button href={primaryCTA.href} variant="primary" size="large">
                  {primaryCTA.text}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  href={secondaryCTA.href}
                  variant={hasMedia ? "secondary" : "ghost"}
                  size="large"
                  className={hasMedia ? styles.secondaryLight : undefined}
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
