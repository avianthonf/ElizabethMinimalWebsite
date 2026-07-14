"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

/**
 * ConfettiTrigger — fires a confetti celebration on mount.
 *
 * Used on the contact thank-you page to delight users after form submission.
 * Uses canvas-confetti for lightweight, dependency-free confetti bursts.
 * Fires staggered bursts from both corners for a dramatic effect.
 * Respects prefers-reduced-motion — no confetti for accessibility users.
 */
export interface ConfettiTriggerProps {
  duration?: number;
}

export function ConfettiTrigger({ duration = 3000 }: ConfettiTriggerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    // Respect reduced-motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#c9a96e", "#0f1d35", "#ffffff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#c9a96e", "#0f1d35", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Small initial burst for instant feedback
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#c9a96e", "#0f1d35", "#ffffff"],
    });

    const rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      fired.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
