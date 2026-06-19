"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { easings, durations, springPresets } from "@/lib/easings";
import styles from "./ValuesPanel.module.css";

interface ValueCardData {
  number: string;
  title: string;
  body: string;
}

interface ValueCardProps {
  value: ValueCardData;
  index: number;
  imageSrc: string;
  imageAlt: string;
  onExpand: () => void;
}

/**
 * ValueCard — The Gallery of Light artifact.
 *
 * 8 visual layers stacked via CSS positioning + Framer Motion spring physics.
 * Responds to mouse position with 3D tilt, parallax image offset, and
 * cursor-following warm glow. Click triggers layoutId morph to ExpandedView.
 */
export function ValueCard({
  value,
  index,
  imageSrc,
  imageAlt,
  onExpand,
}: ValueCardProps): ReactNode {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position normalised to card centre (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt — spring-damped for natural weight
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springPresets.tilt);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springPresets.tilt);

  // Parallax — image moves opposite to tilt
  const imageX = useTransform(mouseX, [-0.5, 0.5], ["8%", "-8%"]);
  const imageY = useTransform(mouseY, [-0.5, 0.5], ["8%", "-8%"]);

  // Scales
  const imageScale = useSpring(1, springPresets.medium);
  const cardScale = useSpring(1, springPresets.light);

  // Glow position follow
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    imageScale.set(1.12);
    cardScale.set(1.03);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    imageScale.set(1);
    cardScale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      data-cursor="card"
      className={styles.valueCard}
      layoutId={`vcard-${value.number}`}
      onClick={onExpand}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale: cardScale,
        perspective: 1200,
      }}
      initial={{ opacity: 0, y: 80, rotateY: -12 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        duration: durations.deliberate,
        delay: 0.8 + index * 0.2,
        ease: easings.silk,
      }}
    >
      {/* LAYER 1: Image with parallax */}
      <motion.div
        layoutId={`vimage-${value.number}`}
        className={styles.cardImage}
        style={{ x: imageX, y: imageY, scale: imageScale }}
      >
        <img src={imageSrc} alt={imageAlt} loading="lazy" draggable={false} />
      </motion.div>

      {/* LAYER 2: Dark gradient overlay */}
      <motion.div
        className={styles.cardOverlay}
        animate={{ opacity: isHovered ? 1 : 0.85 }}
        transition={{ duration: durations.normal, ease: easings.silk }}
      />

      {/* LAYER 3: Cursor-following warm glow */}
      <motion.div
        className={`${styles.cardGlow} ${isHovered ? styles.cardGlowVisible : ""}`}
        style={{
          background: `radial-gradient(
            500px circle at ${glowX.get()} ${glowY.get()},
            rgba(201, 169, 110, 0.15),
            transparent 50%
          )`,
        }}
      />

      {/* LAYER 4: Glass sheen */}
      <div className={styles.cardSheen} />

      {/* LAYER 5: Oversized watermark number */}
      <motion.div
        className={styles.cardWatermark}
        animate={{
          y: isHovered ? -12 : 0,
          opacity: isHovered ? 0.15 : 0.08,
        }}
        transition={{ duration: durations.normal, ease: easings.silk }}
      >
        {value.number}
      </motion.div>

      {/* LAYER 6: Content block */}
      <motion.div layoutId={`vcontent-${value.number}`} className={styles.cardContent}>
        <motion.div
          className={styles.cardCategory}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 1.2 + index * 0.15,
            duration: durations.normal,
          }}
        >
          Core Value
        </motion.div>

        <motion.h3
          className={styles.cardTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.3 + index * 0.15,
            duration: durations.slow,
            ease: easings.silk,
          }}
        >
          {value.title}
        </motion.h3>

        <motion.p
          className={styles.cardDescription}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
            y: 0,
          }}
          transition={{ duration: durations.normal, ease: easings.silk }}
        >
          {value.body}
        </motion.p>

        <motion.div
          className={styles.cardCta}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 40 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: durations.normal, ease: easings.snap }}
        >
          <span className={styles.cardCtaInner}>
            Explore Value
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </motion.div>
      </motion.div>

      {/* LAYER 7: Top gold accent line */}
      <motion.div
        className={styles.cardAccent}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: durations.normal, ease: easings.snap }}
      />

      {/* LAYER 8: Border highlight */}
      <motion.div
        className={styles.cardBorder}
        animate={{
          boxShadow: isHovered
            ? "0 0 0 1px rgba(201,169,110,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 0 0 1px rgba(255,255,255,0.05)",
        }}
        transition={{ duration: durations.normal, ease: easings.silk }}
      />
    </motion.div>
  );
}
