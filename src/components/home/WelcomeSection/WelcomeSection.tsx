"use client";

import useEmblaCarousel from "embla-carousel-react";
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

export function WelcomeSection({
  eyebrow,
  heading,
  body,
  ctaText,
  ctaHref,
  images,
  ariaLabel = "Welcome",
}: WelcomeSectionProps) {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    duration: 30,
  });

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

        {/* ── Right: Image carousel ─────────────────────── */}
        <div className={styles.carousel} ref={emblaRef}>
          <div className={styles.carouselInner}>
            {images.map((img, i) => (
              <div key={i} className={styles.carouselSlide}>
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
      </div>
    </section>
  );
}
