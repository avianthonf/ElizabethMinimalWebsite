import type { TestimonialData } from "@/data/homepage";
import styles from "./TestimonialsSection.module.css";

interface TestimonialsSectionProps {
  testimonials: TestimonialData[];
  ariaLabel?: string;
}

export function TestimonialsSection({
  testimonials,
  ariaLabel = "Testimonials",
}: TestimonialsSectionProps) {
  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>What They Say</p>
        <h2 className={styles.heading}>Voices from Our Community</h2>

        <div className={styles.grid}>
          {testimonials.slice(0, 3).map((t) => (
            <blockquote key={t.attribution} className={styles.card}>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <footer className={styles.attribution}>
                <span className={styles.name}>{t.attribution}</span>
                <span className={styles.role}>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
