import Link from "next/link";
import styles from "./student-life-section.module.css";
import type { ProgramBox } from "@/domains/homepage/sections.data";

interface StudentLifeSectionProps {
  eyebrow: string;
  heading: string;
  cards: ProgramBox[];
  ctaText: string;
  ctaHref: string;
  ariaLabel?: string;
}

export function StudentLifeSection({
  eyebrow,
  heading,
  cards,
  ctaText,
  ctaHref,
  ariaLabel = "Student life",
}: StudentLifeSectionProps) {
  const displayCards = cards.slice(0, 5);

  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.heading}>{heading}</h2>

        <div className={styles.grid}>
          {displayCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={styles.card}
              style={{ "--card-color": card.color } as React.CSSProperties}
            >
              <div className={styles.cardIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.iconSvg}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </Link>
          ))}
        </div>

        <div className={styles.ctaWrapper}>
          <Link href={ctaHref} className={styles.cta}>
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
