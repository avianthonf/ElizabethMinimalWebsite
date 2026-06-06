import type { ReactNode } from "react";
import styles from "./TestimonialCard.module.css";

export type TestimonialRole = "alumni" | "student" | "parent" | "teacher";

export interface TestimonialCardProps {
  quote: string;
  attribution: string;
  role: TestimonialRole;
  className?: string;
}

export function TestimonialCard({
  quote,
  attribution,
  role,
  className,
}: TestimonialCardProps): ReactNode {
  const composedClassName = [styles.card, className].filter(Boolean).join(" ");

  return (
    <article className={composedClassName}>
      <blockquote className={styles.quote} cite={attribution}>
        <span className={styles.quoteMark} aria-hidden>"</span>
        {quote}
        <span className={styles.quoteMark} aria-hidden>"</span>
      </blockquote>
      <footer className={styles.footer}>
        <div className={styles.attribution}>{attribution}</div>
        <span
          className={`${styles.roleBadge} ${styles[role]}`}
          aria-label={`Role: ${role}`}
        >
          {role}
        </span>
      </footer>
    </article>
  );
}
