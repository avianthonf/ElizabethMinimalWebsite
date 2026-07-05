import Link from "next/link";
import styles from "./admissions-cta.module.css";
import type { AdmissionsStep } from "@/domains/homepage/sections.data";

interface AdmissionsCTAProps {
  steps: AdmissionsStep[];
  heading: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  ariaLabel?: string;
}

export function AdmissionsCTA({
  steps,
  heading,
  description,
  primaryCtaText,
  primaryCtaHref,
  ariaLabel = "Admissions",
}: AdmissionsCTAProps) {
  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.description}>{description}</p>

        <div className={styles.steps}>
          {steps.map((step) => (
            <Link key={step.step} href={step.href} className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.step}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </Link>
          ))}
        </div>

        <div className={styles.ctaWrapper}>
          <Link href={primaryCtaHref} className={styles.cta}>
            {primaryCtaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
