"use client";

import { useState, useCallback, type ReactNode, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { VALUES } from "@/data/homepage";
import { VALUES_IMAGES } from "@/data/images";
import { ValueCard } from "./ValueCard";
import { ExpandedView } from "./ExpandedView";
import { easings } from "@/lib/easings";
import styles from "./ValuesPanel.module.css";

/** Composed className for the orchestrator's wrapping HorizontalPage. */
export const valuesPanelClass = styles.valuesPanel;

/** Per-value stats for the expanded view. */
const VALUE_STATS: Record<string, { value: string; label: string }[]> = {
  "01": [
    { value: "50+", label: "Years of Tradition" },
    { value: "100%", label: "Values-Based Education" },
  ],
  "02": [
    { value: "98%", label: "Graduation Rate" },
    { value: "1:15", label: "Teacher-Student Ratio" },
  ],
  "03": [
    { value: "1,200+", label: "Students" },
    { value: "40+", label: "Clubs & Activities" },
  ],
};

/**
 * AmbientBackground — fixed-position aurora gradient + film grain.
 * Renders relative to the panel so it stays within the horizontal scroll.
 */
function AmbientBackground(): ReactNode {
  return (
    <div className={styles.ambientBg}>
      <div className={styles.ivoryBase} />
      <div className={styles.auroraLayer} id="values-aurora" />
      <div className={styles.warmGlow} />
      <div className={styles.filmGrain} />
      <div className={styles.vignette} />
    </div>
  );
}

/**
 * FloatingParticles — ambient light motes drifting through the space.
 *
 * Positions are deterministically generated from the index so the
 * component is a pure function (no Math.random during render).
 */
function FloatingParticles(): ReactNode {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: ((i * 13) % 7) * 14.28 + 7.14, // deterministic spread 0-100
    y: ((i * 29) % 11) * 9.09 + 4.54,
    size: ((i * 7) % 3) + 1.5,
    duration: ((i * 17) % 10) + 18,
    delay: (i * 11) % 8,
    opacity: ((i * 5) % 12) * 0.025 + 0.1,
  }));

  return (
    <div className={styles.particlesContainer}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={styles.particle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(p.id) * 20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: easings.gentle,
          }}
        />
      ))}
    </div>
  );
}

/**
 * KineticTitle — 3D flip word reveal with gold shimmer on italic words.
 */
function KineticTitle(): ReactNode {
  const titleWords = [
    { text: "Values", gold: false },
    { text: "That", gold: false },
    { text: "Shape", gold: false },
  ];

  const line2Words = [
    { text: "Our", gold: true },
    { text: "Community", gold: true },
  ];

  const wordVariants = {
    hidden: { y: 80, opacity: 0, rotateX: -40 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1.0, ease: easings.silk },
    },
  };

  return (
    <div className={styles.kineticTitle}>
      <motion.p
        className={styles.eyebrow}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: easings.silk }}
      >
        We Believe
      </motion.p>

      <motion.h1
        className={styles.titleLine}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.5 },
          },
        }}
        style={{ perspective: 1000 } as CSSProperties}
      >
        <span className={styles.titleLine}>
          {titleWords.map((w) => (
            <motion.span key={w.text} variants={wordVariants} className={styles.titleWord}>
              {w.text}
            </motion.span>
          ))}
        </span>
        <br />
        <span className={styles.titleLine}>
          {line2Words.map((w) => (
            <motion.span
              key={w.text}
              variants={wordVariants}
              className={w.gold ? styles.titleWordGold : styles.titleWord}
            >
              {w.text}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5, ease: easings.silk }}
      >
        Guided by our motto{" "}
        <em style={{ color: "#1A1A1A", fontStyle: "normal", fontWeight: 500 }}>
          Truth and Honesty
        </em>{" "}
        — and the principle of{" "}
        <em style={{ color: "#1A1A1A", fontStyle: "normal", fontWeight: 500 }}>
          Guiding Minds, Nurturing Hearts, Building Futures.
        </em>
      </motion.p>

      <motion.div
        className={styles.decorativeLine}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.8, ease: easings.silk }}
      />
    </div>
  );
}

/**
 * ValuesPanel — pure content component.
 *
 * Gold-accented ivory art gallery atmosphere. 3 cards with 3D tilt,
 * parallax, and an expanded view on click. Stays within the existing
 * horizontal scroll — no standalone routing, no Lenis.
 */
export function ValuesPanel(): ReactNode {
  const [expandedNumber, setExpandedNumber] = useState<string | null>(null);
  const values = VALUES;

  const closeExpanded = useCallback(() => setExpandedNumber(null), []);

  const expandedValue = values.find((v) => v.number === expandedNumber) ?? null;
  const expandedKey = expandedValue?.title?.toLowerCase() as keyof typeof VALUES_IMAGES | undefined;
  const expandedImage = expandedKey ? VALUES_IMAGES[expandedKey] : null;

  return (
    <>
      <AmbientBackground />
      <FloatingParticles />

      {/* Text column — left */}
      <div className={styles.text}>
        <KineticTitle />
      </div>

      {/* Card row — right */}
      <div className={styles.cardTrack}>
        {values.map((v, i) => {
          const imageKey = v.title.toLowerCase() as keyof typeof VALUES_IMAGES;
          const asset = VALUES_IMAGES[imageKey];
          return (
            <ValueCard
              key={v.number}
              value={v}
              index={i}
              imageSrc={`/images/${asset.filename}`}
              imageAlt={asset.alt}
              onExpand={() => setExpandedNumber(v.number)}
            />
          );
        })}
      </div>

      {/* Expanded view overlay */}
      <ExpandedView
        value={expandedValue}
        imageSrc={expandedImage ? `/images/${expandedImage.filename}` : "/images/DSC07463.jpg"}
        imageAlt={expandedImage?.alt ?? ""}
        stats={expandedNumber ? VALUE_STATS[expandedNumber] : undefined}
        onClose={closeExpanded}
      />
    </>
  );
}
