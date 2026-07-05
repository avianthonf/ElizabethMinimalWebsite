import { Link } from "next-view-transitions";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.code}>404</p>
      <h1 className={styles.heading}>Page Not Found</h1>
      <p className={styles.description}>
        The page you are looking for does not exist or has been moved. Please check the URL or
        return to the homepage.
      </p>
      <Link href="/" className={styles.homeLink}>
        Go to Homepage
      </Link>
    </div>
  );
}
