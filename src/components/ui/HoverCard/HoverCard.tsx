"use client";

import { type ReactNode, useState, useRef, useEffect } from "react";
import styles from "./HoverCard.module.css";

interface HoverCardProps {
  children: ReactNode;
  /** Content to show on hover */
  content: ReactNode;
  /** Delay before showing */
  delayDuration?: number;
  /** Side to align */
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

/**
 * HoverCard — shows content on hover with delay.
 * Accessible hover popover for rich previews.
 *
 * Usage:
 *   <HoverCard content={<UserProfile user={user} />}>
 *     <span>{user.name}</span>
 *   </HoverCard>
 */
export function HoverCard({
  children,
  content,
  delayDuration = 300,
  side = "top",
  className,
}: HoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(true), delayDuration);
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${className ?? ""}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {children}
      {isOpen && (
        <div className={`${styles.content} ${styles[side]}`} role="tooltip">
          {content}
        </div>
      )}
    </div>
  );
}
