import Image from "next/image";
import Link from "next/link";
import styles from "./GallerySection.module.css";

interface GalleryImage {
  filename: string;
  alt: string;
  span: "normal" | "tall";
}

interface GallerySectionProps {
  eyebrow: string;
  heading: string;
  images: GalleryImage[];
  ctaText: string;
  ctaHref: string;
  ariaLabel?: string;
}

export function GallerySection({
  eyebrow,
  heading,
  images,
  ctaText,
  ctaHref,
  ariaLabel = "Photo gallery",
}: GallerySectionProps) {
  const displayImages = images.slice(0, 7);

  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.grid}>
          {displayImages.map((img, i) => (
            <div
              key={i}
              className={`${styles.item} ${img.span === "tall" ? styles.itemTall : styles.itemNormal}`}
            >
              <Image
                src={`/images/${img.filename}`}
                alt={img.alt}
                fill
                sizes="(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw"
                className={styles.image}
                loading="lazy"
                quality={80}
              />
            </div>
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
