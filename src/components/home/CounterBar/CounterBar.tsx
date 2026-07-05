"use client";

import { useEffect, useRef, useState } from "react";
import { NumberTicker } from "@/components/ui/NumberTicker/NumberTicker";
import styles from "./CounterBar.module.css";
import type { CounterStat } from "@/domains/homepage/sections.data";

interface CounterBarProps {
  stats: CounterStat[];
  ariaLabel?: string;
}

function CounterItem({ stat }: { stat: CounterStat }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.item}>
      <div className={styles.value} aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}>
        {stat.prefix && <span className={styles.prefix}>{stat.prefix}</span>}
        {hasAnimated ? (
          <NumberTicker value={stat.value} className={styles.number} />
        ) : (
          <span className={styles.number}>0</span>
        )}
        {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
      </div>
      <p className={styles.label}>{stat.label}</p>
    </div>
  );
}

export function CounterBar({ stats, ariaLabel = "School statistics" }: CounterBarProps) {
  return (
    <section className={styles.root} aria-label={ariaLabel}>
      <div className={styles.inner}>
        {stats.map((stat) => (
          <CounterItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
