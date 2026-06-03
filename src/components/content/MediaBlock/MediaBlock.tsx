import type { ReactNode } from "react";
import Image from "next/image";
import { SplitLayout } from "@/components/layout/SplitLayout";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Button } from "@/components/primitives/Button";
import { Stack } from "@/components/layout/Stack";
import styles from "./MediaBlock.module.css";

export type MediaType = "image" | "video";
export type MediaPosition = "left" | "right";

export interface MediaBlockProps {
  mediaType: MediaType;
  mediaSrc: string;
  mediaAlt?: string;
  heading: string;
  description: string;
  mediaPosition?: MediaPosition;
  cta?: { text: string; href: string };
  className?: string;
}

export function MediaBlock({
  mediaType,
  mediaSrc,
  mediaAlt = "",
  heading,
  description,
  mediaPosition = "left",
  cta,
  className,
}: MediaBlockProps): ReactNode {
  const mediaElement =
    mediaType === "video" ? (
      <video
        className={styles.mediaFit}
        src={mediaSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={mediaAlt}
      />
    ) : (
      <div className={styles.imageWrapper}>
        <Image
          src={mediaSrc}
          alt={mediaAlt}
          fill
          className={styles.mediaFit}
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      </div>
    );

  const textContent = (
    <Stack gap="medium">
      <Heading level="h2" variant="section">
        {heading}
      </Heading>
      <Text variant="muted" size="large">
        {description}
      </Text>
      {cta && (
        <div>
          <Button href={cta.href} variant="primary" size="medium">
            {cta.text}
          </Button>
        </div>
      )}
    </Stack>
  );

  return (
    <SplitLayout
      left={mediaPosition === "left" ? mediaElement : textContent}
      right={mediaPosition === "left" ? textContent : mediaElement}
      ratio="equal"
      gap="large"
      className={className}
    />
  );
}
