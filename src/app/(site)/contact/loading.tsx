import styles from "../loading.module.css";

export default function ContactLoading() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading contact page">
      <p>Loading…</p>
    </div>
  );
}
