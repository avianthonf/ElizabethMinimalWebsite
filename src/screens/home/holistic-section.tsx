import { Link } from "next-view-transitions";
import styles from "./holistic-section.module.css";

interface HolisticCard {
  title: string;
  description: string;
  href: string;
  accent: string;
}

const HOLISTIC_CARDS: HolisticCard[] = [
  {
    title: "Academics",
    description: "Rigorous CBSE curriculum with dedicated faculty and modern teaching methods.",
    href: "/academics",
    accent: "var(--p-color-navy)",
  },
  {
    title: "Sports",
    description: "Seven competitive sports with inter-house and inter-school tournaments.",
    href: "/beyond-academics/sports",
    accent: "var(--p-color-deep-blue)",
  },
  {
    title: "Arts & Culture",
    description: "Visual arts, music, dance, and drama — celebrating creativity and Goan heritage.",
    href: "/beyond-academics/cultural-activities",
    accent: "var(--p-color-gold)",
  },
  {
    title: "Leadership",
    description: "Student council, club presidents, and prefects — developing tomorrow's leaders.",
    href: "/beyond-academics/student-council",
    accent: "var(--p-color-navy-dark)",
  },
];

interface HolisticSectionProps {
  ariaLabel?: string;
}

export function HolisticSection({ ariaLabel = "Holistic education" }: HolisticSectionProps) {
  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Left column: 2 stacked cards */}
          <div className={styles.column}>
            {HOLISTIC_CARDS.slice(0, 2).map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={styles.card}
                style={{ "--card-accent": card.accent } as React.CSSProperties}
              >
                <div className={styles.cardArrow} aria-hidden="true">
                  →
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </Link>
            ))}
          </div>

          {/* Center: Hero text box */}
          <div className={styles.centerBox}>
            <p className={styles.centerEyebrow}>Our Philosophy</p>
            <h2 className={styles.centerHeading}>Holistic Education</h2>
            <p className={styles.centerBody}>
              At St. Elizabeth&apos;s, we believe education extends far beyond textbooks. Our
              holistic approach nurtures the mind, body, and spirit — developing confident,
              compassionate, and well-rounded individuals ready to thrive in a changing world.
            </p>
          </div>

          {/* Right column: 2 stacked cards */}
          <div className={styles.column}>
            {HOLISTIC_CARDS.slice(2, 4).map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={styles.card}
                style={{ "--card-accent": card.accent } as React.CSSProperties}
              >
                <div className={styles.cardArrow} aria-hidden="true">
                  →
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
