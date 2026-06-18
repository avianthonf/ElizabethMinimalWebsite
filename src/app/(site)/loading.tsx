import styles from "./loading.module.css";

export default function SiteLoading() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading page">
      <p>Loading…</p>
    </div>
  );
}
