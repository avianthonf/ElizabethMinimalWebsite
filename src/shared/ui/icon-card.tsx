"use client";

import type { ReactNode } from "react";
import Tilt from "react-parallax-tilt";
import { Card } from "@/shared/ui/card";
import { ConditionalLink } from "@/shared/ui/conditional-link";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import styles from "./icon-card.module.css";

export interface IconCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

/**
 * IconCard — a card with an icon, heading, and description.
 *
 * Wraps content in react-parallax-tilt for a subtle 3D hover effect.
 * The tilt effect is disabled on touch devices and when the user
 * prefers reduced motion.
 */
export function IconCard({ icon, title, description, href, className }: IconCardProps): ReactNode {
  const cardContent = (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable
      glareMaxOpacity={0.08}
      glareColor="#ffffff"
      glarePosition="all"
      scale={1.02}
      transitionSpeed={600}
    >
      <Card variant="icon" className={className}>
        <div className={styles.iconWrapper}>{icon}</div>
        <Heading level="h3" variant="card">
          {title}
        </Heading>
        <Text variant="muted" size="small">
          {description}
        </Text>
      </Card>
    </Tilt>
  );

  return (
    <ConditionalLink href={href} className={href ? styles.cardLink : undefined}>
      {cardContent}
    </ConditionalLink>
  );
}
