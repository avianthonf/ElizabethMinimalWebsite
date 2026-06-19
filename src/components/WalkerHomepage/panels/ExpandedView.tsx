"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { easings, durations } from "@/lib/easings";
import styles from "./ValuesPanel.module.css";

interface ValueCardData {
  number: string;
  title: string;
  body: string;
}

interface ExpandedStat {
  value: string;
  label: string;
}

interface ExpandedViewProps {
  value: ValueCardData | null;
  imageSrc: string;
  imageAlt: string;
  stats?: ExpandedStat[];
  onClose: () => void;
}

/**
 * ExpandedView — cinematic full-screen card morph via Framer layoutId.
 *
 * Each content element has a choreographed entrance delay.
 * Backdrop blur + film grain create depth. layoutId matches
 * ValueCard for a seamless "card becomes screen" transition.
 */
export function ExpandedView({
  value,
  imageSrc,
  imageAlt,
  stats,
  onClose,
}: ExpandedViewProps): ReactNode {
  if (!value) return null;

  return (
    <AnimatePresence>
      {value && (
        <motion.div
          className={styles.expandedOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: durations.quick }}
        >
          {/* Backdrop */}
          <motion.div
            className={styles.expandedBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.slow }}
            onClick={onClose}
          />

          {/* Expanded card (morphs from ValueCard via layoutId) */}
          <motion.div
            layoutId={`vcard-${value.number}`}
            className={styles.expandedCard}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 28,
              mass: 0.9,
            }}
          >
            {/* Full-bleed image */}
            <motion.img
              layoutId={`vimage-${value.number}`}
              src={imageSrc}
              alt={imageAlt}
              className={styles.expandedImage}
            />

            {/* Gradient overlays */}
            <div className={styles.expandedGradients}>
              <div className={styles.expandedGradientBase} />
              <div className={styles.expandedGradientBottom} />
            </div>

            {/* Film grain */}
            <div className={styles.expandedGrain} />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className={styles.expandedCloseBtn}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              aria-label="Close expanded view"
            >
              <X size={20} />
            </motion.button>

            {/* Content — choreographed entrance */}
            <motion.div layoutId={`vcontent-${value.number}`} className={styles.expandedContent}>
              {/* Category label */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3,
                  duration: durations.normal,
                  ease: easings.silk,
                }}
              >
                <span className={styles.expandedCategory}>
                  <span className={styles.expandedCategoryLine} />
                  Our Core Value — {value.number}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                className={styles.expandedTitle}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: durations.deliberate,
                  ease: easings.silk,
                }}
              >
                {value.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                className={styles.expandedDesc}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.55,
                  duration: durations.slow,
                  ease: easings.silk,
                }}
              >
                {value.body}
              </motion.p>

              {/* Stats row (if provided) */}
              {stats && stats.length > 0 && (
                <motion.div
                  className={styles.expandedStats}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: durations.normal }}
                >
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.8 + i * 0.12,
                        duration: durations.normal,
                        ease: easings.silk,
                      }}
                    >
                      <p className={styles.statValue}>{stat.value}</p>
                      <p className={styles.statLabel}>{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* CTA button */}
              <motion.div
                className={styles.expandedCta}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: durations.normal }}
              >
                <motion.button
                  className={styles.expandedCtaBtn}
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Learn More About {value.title}
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
