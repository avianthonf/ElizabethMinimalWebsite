import type { ReactNode } from "react";
import Image from "next/image";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Card } from "@/components/content/Card";
import styles from "./ValueCard.module.css";

export interface ValueCardProps {
  number: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}

export function ValueCard({ number, title, body, image, imageAlt, className }: ValueCardProps): ReactNode {
  return (
    <Card variant="value" className={className}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 20vw"
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.overlay} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">{number}</span>
      <div className={styles.content}>
        <Heading level="h3" variant="card">{title}</Heading>
        <Text variant="muted">{body}</Text>
      </div>
    </Card>
  );
}
