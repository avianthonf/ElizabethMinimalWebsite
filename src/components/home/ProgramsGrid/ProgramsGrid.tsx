import Link from "next/link";
import styles from "./ProgramsGrid.module.css";
import type { ProgramBox } from "@/domains/homepage/sections.data";

interface ProgramsGridProps {
  eyebrow: string;
  heading: string;
  boxes: ProgramBox[];
  ariaLabel?: string;
}

export function ProgramsGrid({
  eyebrow,
  heading,
  boxes,
  ariaLabel = "Programmes at a glance",
}: ProgramsGridProps) {
  // First box is large, remaining 6 form a 3×2 grid
  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.grid}>
          {boxes.map((box, i) => (
            <Link
              key={box.title}
              href={box.href}
              className={`${styles.box} ${i === 0 ? styles.boxLarge : ""}`}
              style={{ "--box-color": box.color } as React.CSSProperties}
            >
              <span className={styles.boxNumber}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.boxTitle}>{box.title}</h3>
              <p className={styles.boxDescription}>{box.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
