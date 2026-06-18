import Link from "next/link";
import { Container } from "@/components/layout/Container";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps {
  /** href of the parent (clickable) crumb */
  href: string;
  /** label of the parent crumb */
  label: string;
  /** label of the current page (rendered as plain text) */
  currentLabel: string;
}

/**
 * Accessible breadcrumb navigation rendered above a Hero.
 *
 * Renders a `<nav aria-label="Breadcrumb">` containing a single
 * clickable parent link followed by the current page label.
 * The current page is marked with `aria-current="page"`.
 */
export function Breadcrumb({ href, label, currentLabel }: BreadcrumbProps): React.ReactNode {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <Container width="narrow">
        <Link href={href} className={styles.link}>
          {label}
        </Link>
        <span className={styles.separator} aria-hidden="true">
          {" / "}
        </span>
        <span className={styles.current} aria-current="page">
          {currentLabel}
        </span>
      </Container>
    </nav>
  );
}
