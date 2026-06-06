import type { ReactNode } from "react";
import Image from "next/image";
import { Card } from "@/components/content/Card";
import { ConditionalLink } from "@/components/primitives/ConditionalLink/ConditionalLink";
import { Heading } from "@/components/primitives/Heading";
import { Text, type TextVariant } from "@/components/primitives/Text";
import styles from "./ImageCard.module.css";

// Re-export for module consumers who import ImageCardProps
export type { TextVariant } from "@/components/primitives/Text";

export type ImagePosition = "top" | "left";
export type ImageAspectRatio = "16:9" | "4:3" | "1:1";

export interface ImageCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description?: string;
  descriptionVariant?: TextVariant;
  imagePosition?: ImagePosition;
  aspectRatio?: ImageAspectRatio;
  href?: string;
  className?: string;
}

const aspectRatioClass: Record<ImageAspectRatio, string> = {
  "16:9": styles.ar16x9,
  "4:3": styles.ar4x3,
  "1:1": styles.ar1x1,
};

export function ImageCard({
  image,
  imageAlt,
  title,
  description,
  descriptionVariant = "muted",
  imagePosition = "top",
  aspectRatio = "16:9",
  href,
  className,
}: ImageCardProps): ReactNode {
  return (
    <ConditionalLink href={href} className={href ? styles.cardLink : undefined}>
      <Card variant="image" className={className}>
        <div
          className={`${styles.imageWrapper} ${imagePosition === "left" ? styles.imageLeft : styles.imageTop} ${aspectRatioClass[aspectRatio]}`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            quality={90}
            className={styles.image}
            sizes={imagePosition === "left" ? "(max-width: 760px) 100vw, 50vw" : "100vw"}
          />
        </div>
        <div className={styles.textContent}>
          <Heading level="h3" variant="card">
            {title}
          </Heading>
          {description && <Text variant={descriptionVariant} size="small">{description}</Text>}
        </div>
      </Card>
    </ConditionalLink>
  );
}
