"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import styles from "./Accordion.module.css";

interface AccordionItem {
  trigger: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * Accordion — accessible collapsible content panels.
 * Uses @radix-ui/react-accordion for WAI-ARIA compliance.
 *
 * Usage:
 *   <Accordion items={[{ trigger: "Q?", content: "A!" }]} />
 */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className={`${styles.root} ${className ?? ""}`}
    >
      {items.map((item, i) => (
        <AccordionPrimitive.Item key={i} value={`item-${i}`} className={styles.item}>
          <AccordionPrimitive.Trigger className={styles.trigger}>
            <span>{item.trigger}</span>
            <svg
              className={styles.chevron}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </AccordionPrimitive.Trigger>
          <AccordionPrimitive.Content className={styles.content}>
            <div className={styles.contentInner}>{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
