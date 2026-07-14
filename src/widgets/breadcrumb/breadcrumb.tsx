import Link from "next/link";
import { Container } from "@/shared/ui/container";
import styles from "./breadcrumb.module.css";

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
        <ol className={styles.list}>
          <li>
            <Link href={href} className={styles.link}>
              {label}
            </Link>
          </li>
          <li>
            <span className={styles.separator} aria-hidden="true">
              {" / "}
            </span>
            <span className={styles.current} aria-current="page">
              {currentLabel}
            </span>
          </li>
        </ol>
      </Container>
    </nav>
  );
}
