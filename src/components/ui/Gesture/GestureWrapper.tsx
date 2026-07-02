"use client";

import { type ReactNode, useState } from "react";
import { useGesture } from "@use-gesture/react";
import styles from "./GestureWrapper.module.css";

interface GestureWrapperProps {
  children: ReactNode;
  /** Enable drag */
  draggable?: boolean;
  /** Enable pinch zoom */
  pinchable?: boolean;
  /** Enable hover effect */
  hoverable?: boolean;
  /** Callback on drag end */
  onDragEnd?: (x: number, y: number) => void;
  /** Callback on pinch */
  onPinch?: (scale: number) => void;
  className?: string;
}

/**
 * GestureWrapper — adds touch gesture interactions.
 * Uses @use-gesture/react for drag, pinch, and hover.
 *
 * Usage:
 *   <GestureWrapper draggable onDragEnd={handleDrop}>
 *     <DraggableCard />
 *   </GestureWrapper>
 */
export function GestureWrapper({
  children,
  draggable = false,
  pinchable = false,
  hoverable = true,
  onDragEnd,
  onPinch,
  className,
}: GestureWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx, my], last, memo }) => {
        if (last) onDragEnd?.(mx, my);
        return memo;
      },
      onPinch: ({ offset: [scale] }) => {
        onPinch?.(scale);
      },
      onHover: ({ hovering }) => {
        setIsHovered(hovering ?? false);
      },
    },
    {
      drag: draggable ? { enabled: true } : { enabled: false },
      pinch: pinchable ? { enabled: true } : { enabled: false },
      hover: hoverable ? { enabled: true } : { enabled: false },
    },
  );

  return (
    <div
      {...bind()}
      className={`${styles.wrapper} ${isHovered ? styles.hovered : ""} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
