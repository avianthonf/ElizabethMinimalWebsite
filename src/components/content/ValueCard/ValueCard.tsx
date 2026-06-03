import type { ReactNode } from "react";
import { Badge } from "@/components/primitives/Badge";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Card } from "@/components/content/Card";
import styles from "./ValueCard.module.css";

export interface ValueCardProps {
  number: string;
  title: string;
  body: string;
  className?: string;
}

export function ValueCard({ number, title, body, className }: ValueCardProps): ReactNode {
  return (
    <Card variant="value" className={className}>
      <div className={styles.inner}>
        <Badge variant="number" color="maroon">
          {number}
        </Badge>
        <Heading level="h3" variant="card">
          {title}
        </Heading>
        <Text variant="muted">{body}</Text>
      </div>
    </Card>
  );
}
