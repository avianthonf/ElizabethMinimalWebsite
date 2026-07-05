import styles from "./why-section.module.css";

interface WhyPoint {
  title: string;
  description: string;
  icon?: string;
}

interface WhySectionProps {
  eyebrow: string;
  heading: string;
  points: WhyPoint[];
  ariaLabel?: string;
}

/**
 * Maps a point title to a Lucide icon name.
 * Used as CSS class for icon rendering via background images or inline SVGs.
 */
function mapIcon(name: string): string {
  const map: Record<string, string> = {
    "Academic Excellence": "graduation-cap",
    "Values-Based Education": "star",
    "Holistic Development": "sparkles",
    "Nurturing Community": "heart-handshake",
    "Dedicated Faculty": "users",
  };
  return map[name] ?? "star";
}

const ICON_PATHS: Record<string, string> = {
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  "graduation-cap": "M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 2 2.5 3.5 6 4.5 3.5-1 6-2.5 6-4.5v-5",
  "heart-handshake":
    "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  sparkles:
    "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
};

export function WhySection({
  eyebrow,
  heading,
  points,
  ariaLabel = "Why choose us",
}: WhySectionProps) {
  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.heading}>{heading}</h2>

        <div className={styles.grid}>
          {points.slice(0, 3).map((point) => {
            const iconName = mapIcon(point.title);
            const path = ICON_PATHS[iconName];

            return (
              <div key={point.title} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <svg
                    className={styles.icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </div>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.cardDescription}>{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
