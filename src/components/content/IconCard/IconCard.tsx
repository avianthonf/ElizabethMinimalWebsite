import type { ReactNode } from "react";
import { Card } from "@/components/content/Card";
import { ConditionalLink } from "@/components/primitives/ConditionalLink/ConditionalLink";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import styles from "./IconCard.module.css";

export interface IconCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function IconCard({ icon, title, description, href, className }: IconCardProps): ReactNode {
  return (
    <ConditionalLink href={href} className={href ? styles.cardLink : undefined}>
      <Card variant="icon" className={className}>
        <div className={styles.iconWrapper}>{icon}</div>
        <Heading level="h3" variant="card">
          {title}
        </Heading>
        <Text variant="muted" size="small">
          {description}
        </Text>
      </Card>
    </ConditionalLink>
  );
}
