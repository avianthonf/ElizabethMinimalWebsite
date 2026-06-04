"use client";

import type { ReactNode } from "react";
import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./GalleryLightbox.module.css";

export interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
  subCaption?: string;
}

export interface GalleryLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps): ReactNode | null {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Save and restore focus
  useEffect(() => {
    if (currentIndex < 0) return;
    prevFocusRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();
  }, [currentIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
      }
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (currentIndex < 0) return;

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Restore focus
      prevFocusRef.current?.focus();
    };
  }, [currentIndex, handleKeyDown]);

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose],
  );

  // Don't render if no image is selected
  if (currentIndex < 0 || currentIndex >= images.length) {
    return null;
  }

  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${currentIndex + 1} of ${images.length}: ${current.caption}`}
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        className={styles.closeButton}
        onClick={onClose}
        type="button"
        aria-label="Close image viewer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Previous arrow */}
      {hasPrev && (
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={onPrev}
          type="button"
          aria-label="Previous image"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {hasNext && (
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={onNext}
          type="button"
          aria-label="Next image"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div className={styles.imageContainer}>
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className={styles.image}
          sizes="100vw"
          priority
        />
      </div>

      {/* Caption */}
      <div className={styles.captionBar}>
        <span className={styles.caption}>{current.caption}</span>
        {current.subCaption && (
          <span className={styles.subCaption}>{current.subCaption}</span>
        )}
        <span className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>,
    document.body,
  );
}
