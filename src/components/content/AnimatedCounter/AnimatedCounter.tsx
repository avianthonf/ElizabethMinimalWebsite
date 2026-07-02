"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  /** End value */
  end: number;
  /** Duration in seconds */
  duration?: number;
  /** Prefix (e.g., "$") */
  prefix?: string;
  /** Suffix (e.g., "+") */
  suffix?: string;
  /** Decimal places */
  decimals?: number;
  /** Separator (e.g., ",") */
  separator?: string;
  /** Additional className */
  className?: string;
}

/**
 * AnimatedCounter — number that counts up when scrolled into view.
 * Uses react-countup + react-intersection-observer.
 *
 * Usage:
 *   <AnimatedCounter end={500} suffix="+" duration={2} />
 */
export function AnimatedCounter({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
  className,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${end}${suffix}`}>
      {inView ? (
        <CountUp
          end={end}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          separator={separator}
          enableScrollSpy
          scrollSpyOnce
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
}
