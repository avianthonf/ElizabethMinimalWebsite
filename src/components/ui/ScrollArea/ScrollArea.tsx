"use client";

import { type ReactNode, useRef, useState, useEffect } from "react";
import styles from "./ScrollArea.module.css";

interface ScrollAreaProps {
  children: ReactNode;
  /** Maximum height */
  maxHeight?: number;
  /** Show scrollbar */
  showScrollbar?: boolean;
  /** Horizontal scrolling */
  horizontal?: boolean;
  className?: string;
}

/**
 * ScrollArea — styled scrollable container with thin scrollbar.
 *
 * Usage:
 *   <ScrollArea maxHeight={300}>
 *     <LongContent />
 *   </ScrollArea>
 */
export function ScrollArea({
  children,
  maxHeight = 300,
  showScrollbar = true,
  horizontal = false,
  className,
}: ScrollAreaProps) {
  return (
    <div
      className={`${styles.wrapper} ${showScrollbar ? styles.showScrollbar : ""} ${horizontal ? styles.horizontal : ""} ${className ?? ""}`}
      style={{ maxHeight: horizontal ? undefined : maxHeight }}
    >
      {children}
    </div>
  );
}
