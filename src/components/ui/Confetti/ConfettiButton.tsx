"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

type ConfettiOptions = Parameters<typeof confetti>[0];

interface ConfettiButtonProps {
  children: React.ReactNode;
  /** Confetti configuration */
  config?: ConfettiOptions;
  className?: string;
}

/**
 * ConfettiButton — triggers confetti animation on click.
 * Uses canvas-confetti for celebration effects.
 *
 * Usage:
 *   <ConfettiButton>🎉 Celebrate!</ConfettiButton>
 */
export function ConfettiButton({ children, config, className }: ConfettiButtonProps) {
  const fire = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#0c217c", "#c9a84c", "#0c4a6e", "#ffffff"],
      ...config,
    });
  }, [config]);

  return (
    <button onClick={fire} className={className} type="button">
      {children}
    </button>
  );
}

/**
 * fireConfetti — programmatic confetti trigger.
 * Import and call directly for automatic confetti.
 *
 * Usage:
 *   import { fireConfetti } from "@/components/ui/Confetti/ConfettiButton";
 *   fireConfetti(); // On form submit success, etc.
 */
export function fireConfetti(config?: ConfettiOptions) {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#0c217c", "#c9a84c", "#0c4a6e", "#ffffff"],
    ...config,
  });
}
