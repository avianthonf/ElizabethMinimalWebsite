import Link from "next/link";
import { MapEmbedLazy } from "@/features/map/map-embed-lazy";
import styles from "./locate-section.module.css";

interface LocateSectionProps {
  eyebrow: string;
  heading: string;
  address: string;
  phone: string;
  email: string;
  ctaText: string;
  ctaHref: string;
  ariaLabel?: string;
}

export function LocateSection({
  eyebrow,
  heading,
  address,
  phone,
  email,
  ctaText,
  ctaHref,
  ariaLabel = "Locate us",
}: LocateSectionProps) {
  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Map Column */}
          <div className={styles.mapColumn}>
            <MapEmbedLazy />
          </div>

          {/* Info Column */}
          <div className={styles.infoColumn}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.heading}>{heading}</h2>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.infoIcon}
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className={styles.infoText}>{address}</p>
              </div>
              <div className={styles.infoItem}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.infoIcon}
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className={styles.infoLink}>
                  {phone}
                </a>
              </div>
              <div className={styles.infoItem}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.infoIcon}
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${email}`} className={styles.infoLink}>
                  {email}
                </a>
              </div>
            </div>

            <Link href={ctaHref} className={styles.cta} target="_blank" rel="noopener noreferrer">
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
