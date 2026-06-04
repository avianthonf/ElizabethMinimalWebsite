"use client";

import type { ReactNode } from "react";
import styles from "./GalleryFilter.module.css";

export type GalleryCategory = "All" | "Academics" | "Athletics" | "Community" | "Student Life" | "General";

const CATEGORIES: GalleryCategory[] = [
  "All",
  "Academics",
  "Athletics",
  "Community",
  "Student Life",
  "General",
];

export interface GalleryFilterProps {
  active: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
  className?: string;
}

export function GalleryFilter({
  active,
  onChange,
  className,
}: GalleryFilterProps): ReactNode {
  return (
    <div
      className={[styles.filterBar, className ?? ""].filter(Boolean).join(" ")}
      role="tablist"
      aria-label="Filter gallery by category"
    >
      {CATEGORIES.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={active === category}
          className={`${styles.pill} ${active === category ? styles.active : ""}`}
          onClick={() => onChange(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
