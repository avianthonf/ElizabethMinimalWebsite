"use client";

import { TypeAnimation } from "react-type-animation";

interface TypingEffectProps {
  /** Array of strings to type in sequence */
  sequences: string[];
  /** Typing speed in ms */
  speed?: number;
  /** Delete speed in ms */
  deleteSpeed?: number;
  /** Pause before deleting in ms */
  pauseFor?: number;
  /** Loop the animation */
  loop?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * TypingEffect — typewriter text animation.
 * Uses react-type-animation for smooth typing effects.
 *
 * Usage:
 *   <TypingEffect
 *     sequences={["Welcome", 1000, "To Our School", 1000, "Excellence", 1000]}
 *     loop
 *   />
 */
export function TypingEffect({
  sequences,
  speed = 50,
  deleteSpeed = 30,
  pauseFor = 1500,
  loop = true,
  className,
}: TypingEffectProps) {
  // Build sequences array for react-type-animation
  // Format: [string, delay, string, delay, ...]
  const flatSequences: (string | number)[] = [];
  for (let i = 0; i < sequences.length; i++) {
    flatSequences.push(sequences[i]);
    if (i < sequences.length - 1) {
      flatSequences.push(pauseFor);
    }
  }

  return (
    <TypeAnimation
      sequence={flatSequences}
      speed={speed as never}
      deletionSpeed={deleteSpeed as never}
      repeat={loop ? Infinity : 0}
      className={className}
      wrapper="span"
    />
  );
}
