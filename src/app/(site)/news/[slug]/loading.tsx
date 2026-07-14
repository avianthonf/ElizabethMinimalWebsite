import styles from "../../loading.module.css";

export default function NewsArticleLoading() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading article">
      <p>Loading article…</p>
    </div>
  );
}
