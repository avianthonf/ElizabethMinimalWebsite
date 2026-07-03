import Image from "next/image";
import { Link } from "@/components/primitives/Link";
import styles from "./WelcomeSection.module.css";

interface WelcomeImage {
  filename: string;
  alt: string;
}

interface WelcomeSectionProps {
  eyebrow: string;
  heading: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  images: WelcomeImage[];
  ariaLabel?: string;
}

/**
 * Welcome section — server component.
 *
 * Renders a two-column layout: text + stacked images. Images are stacked
 * with CSS (no JavaScript carousel) — only the first image is fully visible,
 * the others are layered behind for depth. This is intentional: the section
 * is above the fold and should load fast with zero JS.
 */
export function WelcomeSection({
  eyebrow,
  heading,
  body,
  ctaText,
  ctaHref,
  images,
  ariaLabel = "Welcome",
}: WelcomeSectionProps) {
  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        {/* ── Left: Text ───────────────────────────────── */}
        <div className={styles.text}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>{body}</p>
          <Link href={ctaHref} className={styles.cta}>
            {ctaText}
          </Link>
        </div>

        {/* ── Right: Stacked images ────────────────────── */}
        <div className={styles.imageStack}>
          {images.map((img, i) => (
            <div
              key={i}
              className={styles.imageWrapper}
              style={{ "--image-index": i } as React.CSSProperties}
            >
              <Image
                src={`/images/${img.filename}`}
                alt={img.alt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.carouselImage}
                loading={i === 0 ? "eager" : "lazy"}
                quality={85}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
