import { SocialProofBadge } from "./social-proof-badge";
import { SCHOOL_CONFIG, SCHOOL_STATS } from "@/shared/config";
import styles from "./social-proof-grid.module.css";

/**
 * SocialProofGrid - Grid of animated social proof statistics
 *
 * Displays key school statistics in an animated grid format.
 * Numbers count up when scrolled into view.
 */
export function SocialProofGrid() {
  return (
    <div className={styles.grid} role="region" aria-label="School statistics">
      <SocialProofBadge
        value={new Date().getFullYear() - SCHOOL_CONFIG.FOUNDED_YEAR}
        label="Years of Excellence"
        suffix="+"
        duration={2000}
        delay={0}
      />
      <SocialProofBadge
        value={SCHOOL_STATS.CURRENT_ENROLLMENT}
        label="Happy Students"
        suffix="+"
        duration={2000}
        delay={100}
      />
      <SocialProofBadge
        value={SCHOOL_STATS.STAFF_COUNT}
        label="Expert Faculty"
        suffix="+"
        duration={2000}
        delay={200}
      />
      <SocialProofBadge
        value={SCHOOL_STATS.STUDENT_TEACHER_RATIO}
        label="Student-Teacher Ratio"
        suffix=":1"
        duration={2000}
        delay={300}
      />
    </div>
  );
}
