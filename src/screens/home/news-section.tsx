import Image from "next/image";
import { Link } from "next-view-transitions";
import styles from "./news-section.module.css";
import type { NewsItemData } from "@/domains/homepage/homepage.data";

interface NewsSectionProps {
  eyebrow: string;
  heading: string;
  news: NewsItemData[];
  ctaText: string;
  ctaHref: string;
  ariaLabel?: string;
}

export function NewsSection({
  eyebrow,
  heading,
  news,
  ctaText,
  ctaHref,
  ariaLabel = "Latest news",
}: NewsSectionProps) {
  const displayNews = news.slice(0, 3);

  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.heading}>{heading}</h2>

        <div className={styles.grid}>
          {displayNews.map((item) => (
            <Link key={item.href} href={item.href} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={`/images/${item.imageFilename}`}
                  alt={item.title}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 33vw, 25vw"
                  className={styles.image}
                  loading="lazy"
                  quality={80}
                />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.date}>{item.date}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardExcerpt}>{item.excerpt}</p>
              </div>
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
