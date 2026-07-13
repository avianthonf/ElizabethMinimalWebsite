/**
 * Skeleton loader for admin list pages.
 *
 * Renders a simple table-shaped placeholder during data fetch.
 * Each row represents one skeleton row for the table body.
 */

import styles from "./admin-list-skeleton.module.css";

interface AdminListSkeletonProps {
  /** Number of placeholder rows to render. Defaults to 6. */
  rows?: number;
}

export function AdminListSkeleton({ rows = 6 }: AdminListSkeletonProps) {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={styles.row}>
          <div className={styles.cell} style={{ maxWidth: "28ch" }} />
          <div className={styles.cell} style={{ maxWidth: "12ch" }} />
          <div className={styles.cell} />
        </div>
      ))}
    </div>
  );
}
