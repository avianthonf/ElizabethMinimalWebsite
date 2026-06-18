"use client";

import { type CSSProperties, type ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import shared from "./shared.module.css";

interface AnimatedCardProps {
  index: number;
  total: number;
  children: ReactNode;
  className?: string;
}

export function AnimatedCard({ index, total, children, className }: AnimatedCardProps): ReactNode {
  const { ref, isVisible } = useScrollReveal(0.15);

  const style = {
    "--stagger-index": index,
    "--stagger-total": total,
  } as CSSProperties;

  const classes = [
    shared["animated-card"],
    isVisible ? shared["animated-card--visible"] : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
