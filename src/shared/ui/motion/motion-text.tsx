"use client";

import { type ReactNode, type CSSProperties } from "react";
import { motion, type Transition } from "motion/react";

/**
 * Collection of Motion-powered text animation primitives.
 *
 * These replace individual library imports (reactbits, etc.) with
 * targeted components built directly on Motion's hardware-accelerated
 * engine.  No additional npm dependencies needed.
 *
 * All components respect `prefers-reduced-motion` via the ancestor
 * `<MotionConfig reducedMotion="user" />` in root-layout.
 */

/* ------------------------------------------------------------------ */
/*  SplitText — character-by-character reveal via parent stagger      */
/* ------------------------------------------------------------------ */

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function SplitText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  staggerDelay = 0.04,
}: SplitTextProps) {
  const chars = children.split("");

  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 12, rotateX: -30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <Tag className={className} aria-label={children}>
      <motion.span
        style={{ display: "inline", whiteSpace: "pre-wrap" }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            variants={child}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  GradientText — animated gradient that sweeps across the text       */
/* ------------------------------------------------------------------ */

interface GradientTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  /** CSS gradient stops, e.g. ["#1B2A4A", "#D4AF37", "#1B2A4A"] */
  colors?: string[];
  /** Animation duration in seconds */
  duration?: number;
  /** Inline styles passed to the underlying element */
  style?: CSSProperties;
}

export function GradientText({
  children,
  as: Tag = "span",
  className,
  colors = [
    "var(--p-color-navy,#1B2A4A)",
    "var(--p-color-gold,#D4AF37)",
    "var(--p-color-navy,#1B2A4A)",
  ],
  duration = 4,
  style,
}: GradientTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <Tag className={className} style={style} aria-label={children}>
      <motion.span
        style={{
          display: "inline",
          backgroundImage: gradient,
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  EntranceText — fade-blur-slide reveal for body/paragraph text      */
/* ------------------------------------------------------------------ */

interface EntranceTextProps {
  children: ReactNode;
  className?: string;
  /** Reveal direction */
  direction?: "up" | "down";
  delay?: number;
}

export function EntranceText({
  children,
  className,
  direction = "up",
  delay = 0,
}: EntranceTextProps) {
  const y = direction === "up" ? 20 : -20;
  const transition: Transition = {
    duration: 0.5,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  TypewriterText — character-by-character typewriter reveal          */
/* ------------------------------------------------------------------ */

interface TypewriterTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  /** Speed in ms per character, 40 = standard typing speed */
  speed?: number;
  delay?: number;
}

export function TypewriterText({
  children,
  as: Tag = "span",
  className,
  speed = 40,
  delay = 0,
}: TypewriterTextProps) {
  const chars = children.split("");

  const child = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: delay + (i * speed) / 1000 },
    }),
  };

  // For the outer container we use initial=hidden and animate=visible
  // so the stagger starts on mount, not on scroll.
  const container = {
    hidden: {},
    visible: {},
  };

  return (
    <Tag className={className} aria-label={children}>
      <motion.span
        style={{ display: "inline", whiteSpace: "pre-wrap" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            variants={child}
            custom={i}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
