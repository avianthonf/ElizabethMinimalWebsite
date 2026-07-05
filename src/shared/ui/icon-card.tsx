import type { ReactNode } from "react";
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
