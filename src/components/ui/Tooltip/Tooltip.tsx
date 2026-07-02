"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

/**
 * Tooltip — accessible hover tooltip.
 * Uses @radix-ui/react-tooltip for WAI-ARIA compliance.
 *
 * Usage:
 *   <Tooltip content="Click to save">
 *     <button>Save</button>
 *   </Tooltip>
 */
export function Tooltip({ content, children, side = "top", sideOffset = 4 }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content side={side} sideOffset={sideOffset} className={styles.content}>
            {content}
            <TooltipPrimitive.Arrow className={styles.arrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
