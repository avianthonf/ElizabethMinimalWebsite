"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/style.css";

interface VideoEmbedProps {
  /** YouTube video ID (e.g., "dQw4w9WgXcQ") */
  videoId: string;
  /** Video title for accessibility */
  title: string;
  /** Aspect ratio */
  aspectRatio?: "16/9" | "4/3";
  /** Additional className */
  className?: string;
}

/**
 * VideoEmbed — lazy-loaded YouTube embed with privacy-enhanced mode.
 * Uses react-lite-youtube-embed for performance (no tracking until play).
 *
 * Usage:
 *   <VideoEmbed videoId="abc123" title="School Tour" />
 */
export function VideoEmbed({ videoId, title, aspectRatio = "16/9", className }: VideoEmbedProps) {
  return (
    <div className={className} style={{ aspectRatio, width: "100%" }}>
      <LiteYouTubeEmbed id={videoId} title={title} />
    </div>
  );
}
