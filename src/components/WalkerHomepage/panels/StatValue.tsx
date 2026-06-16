"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface StatValueProps {
  /** Raw stat value string, e.g. "1949", "1200+", "CBSE" */
  value: string;
  /** Additional className for the wrapping element */
  className?: string;
}

function parseStatValue(value: string): { num: number | null; suffix: string } {
  const match = value.match(/^(\d+)(.*)/);
  if (!match) return { num: null, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export function StatValue({ value, className }: StatValueProps): ReactNode {
  const { ref, isVisible } = useScrollReveal(0.3);
  const { num, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(num !== null ? `0${suffix}` : value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || num === null || hasAnimated.current) return;
    hasAnimated.current = true;

    const target = num;
    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${current.toLocaleString()}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isVisible, num, suffix]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
