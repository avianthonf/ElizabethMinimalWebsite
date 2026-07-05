"use client";

import { useState, useCallback } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { toast } from "sonner";
import styles from "./share-bar.module.css";

export interface ShareBarProps {
  url: string;
  title: string;
}

/**
 * ShareBar — social media share buttons for news articles.
 *
 * Renders Facebook, Twitter/X, WhatsApp, and Email share buttons,
 * plus a "Copy Link" button with clipboard toast feedback.
 */
export function ShareBar({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  }, [url]);

  const iconSize = 32;
  const borderRadius = 8;

  return (
    <div className={styles.bar}>
      <span className={styles.label}>Share this article</span>
      <div className={styles.buttons}>
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon size={iconSize} round={false} borderRadius={borderRadius} />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={iconSize} round={false} borderRadius={borderRadius} />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={iconSize} round={false} borderRadius={borderRadius} />
        </WhatsappShareButton>
        <EmailShareButton url={url} subject={title}>
          <EmailIcon size={iconSize} round={false} borderRadius={borderRadius} />
        </EmailShareButton>
        <button
          type="button"
          className={styles.copyButton}
          onClick={handleCopy}
          aria-label="Copy link"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span className={styles.copyLabel}>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
