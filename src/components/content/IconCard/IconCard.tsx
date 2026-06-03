import type { ReactNode } from "react";
import { Card } from "@/components/content/Card";
import { Heading } from "@/components/primitives/Heading";
import { Text } from "@/components/primitives/Text";
import { Link } from "@/components/primitives/Link";
import styles from "./IconCard.module.css";

export interface IconCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function IconCard({ icon, title, description, href, className }: IconCardProps): ReactNode {
  const content = (
    <Card variant="icon" className={className}>
      <div className={styles.iconWrapper}>{icon}</div>
      <Heading level="h3" variant="card">
        {title}
      </Heading>
      <Text variant="muted" size="small">
        {description}
      </Text>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className={styles.cardLink}>
        {content}
      </Link>
    );
  }

  return content;
}
