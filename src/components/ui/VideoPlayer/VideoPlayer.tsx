"use client";

interface VideoPlayerProps {
  /** Video URL (YouTube, Vimeo, or direct URL) */
  url: string;
  /** Video title for accessibility */
  title?: string;
  /** Aspect ratio */
  aspectRatio?: string;
  /** Auto-play */
  autoPlay?: boolean;
  /** Muted */
  muted?: boolean;
  /** Show controls */
  controls?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * VideoPlayer — embedded video player.
 * Supports YouTube, Vimeo, and direct video URLs.
 * Uses HTML5 video element for direct URLs.
 *
 * Usage:
 *   <VideoPlayer url="https://www.youtube.com/watch?v=abc123" title="School Tour" />
 */
export function VideoPlayer({
  url,
  title = "Video",
  aspectRatio = "16/9",
  autoPlay = false,
  muted = false,
  controls = true,
  className,
}: VideoPlayerProps) {
  // Detect video type
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  // Extract YouTube ID
  const getYouTubeId = (u: string) => {
    const match = u.match(/(?:v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  // Extract Vimeo ID
  const getVimeoId = (u: string) => {
    const match = u.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  if (isYouTube) {
    const videoId = getYouTubeId(url);
    if (!videoId) return null;
    return (
      <div className={className} style={{ aspectRatio, width: "100%" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none", borderRadius: 8 }}
        />
      </div>
    );
  }

  if (isVimeo) {
    const videoId = getVimeoId(url);
    if (!videoId) return null;
    return (
      <div className={className} style={{ aspectRatio, width: "100%" }}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?byline=0&portrait=0`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none", borderRadius: 8 }}
        />
      </div>
    );
  }

  // Direct video URL
  return (
    <video
      src={url}
      title={title}
      autoPlay={autoPlay}
      muted={muted}
      controls={controls}
      className={className}
      style={{ width: "100%", borderRadius: 8 }}
    />
  );
}
