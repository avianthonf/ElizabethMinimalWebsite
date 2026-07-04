/**
 * Video Gallery content for St. Elizabeth's High School.
 * YouTube channel: https://www.youtube.com/channel/UC-tcx146Wg3S4PhDG8fefpQ
 */

export const VIDEO_GALLERY_PAGE = {
  metaTitle: "Video Gallery",
  metaDescription:
    "Video gallery of St. Elizabeth's High School — campus tours, event highlights, and student performances from our YouTube channel.",
  breadcrumb: { href: "/news", label: "News", currentLabel: "Video Gallery" },
  heroEyebrow: "Watch",
  heroHeading: "Video Gallery",
  heroDescription:
    "Experience St. Elizabeth's in motion — campus tours, event highlights, performances, and stories from our community.",
  sectionAriaLabel: "Video gallery",
} as const;

export type VideoGalleryItem = {
  title: string;
  description: string;
  platform: "youtube";
  videoId: string;
  thumbnail: string;
  publishedAt: string;
  duration?: string;
  /** When true, the video entry is a placeholder — channel videos exist but
   *  specific video IDs haven't been identified yet. The UI should render a
   *  link to the channel instead of an embed. */
  placeholder?: boolean;
};

export const VIDEO_GALLERY_ITEMS: VideoGalleryItem[] = [
  {
    title: "Annual Day 2024",
    description:
      "Highlights from our Annual Day celebration — student performances, awards, and a showcase of the cultural and academic achievements of the year.",
    platform: "youtube",
    videoId: "9ii1gFJrxS8",
    thumbnail: "/images/DSC07541.jpg",
    publishedAt: "2024-07-02",
    duration: "12:34",
  },
  {
    title: "Computer Lab with Raspberry Pi",
    description:
      "A look inside our computer laboratory where students learn programming and digital literacy using Raspberry Pi single-board computers.",
    platform: "youtube",
    videoId: "zFl70jKjL2s",
    thumbnail: "/images/DSC07335.jpg",
    publishedAt: "2023-06-10",
    duration: "4:18",
  },
  // ═══ Placeholder entries — videos exist on the YouTube channel but
  // specific video IDs haven't been published yet.  These render as
  // "coming soon" cards with a link to the channel. ═══════════════════
  {
    title: "Campus Tour",
    description:
      "A guided walk-through of St. Elizabeth's campus — classrooms, science labs, computer lab, library, chapel, and sports facilities.",
    platform: "youtube",
    // TODO: Replace with actual video ID from the YouTube channel
    videoId: "",
    thumbnail: "/images/DSC07346.jpg",
    publishedAt: "2024-01-15",
    placeholder: true,
  },
  {
    title: "Sports Meet Highlights",
    description:
      "Action from the Inter-House Sports Meet — track events, team sports, and the prize distribution ceremony.",
    platform: "youtube",
    // TODO: Replace with actual video ID from the YouTube channel
    videoId: "",
    thumbnail: "/images/DSC07570.jpg",
    publishedAt: "2024-11-20",
    placeholder: true,
  },
  {
    title: "Science Fair",
    description:
      "Students present their working models and experiments at the annual Science Fair — physics, chemistry, biology, and mathematics projects.",
    platform: "youtube",
    // TODO: Replace with actual video ID from the YouTube channel
    videoId: "",
    thumbnail: "/images/DSC07411.jpg",
    publishedAt: "2025-01-30",
    placeholder: true,
  },
  {
    title: "Christmas Concert",
    description:
      "The school choir and drama club present a heartwarming Christmas performance of carols, skits, and a nativity tableau.",
    platform: "youtube",
    // TODO: Replace with actual video ID from the YouTube channel
    videoId: "",
    thumbnail: "/images/DSC07416.jpg",
    publishedAt: "2024-12-22",
    placeholder: true,
  },
];

export const YOUTUBE_CHANNEL = {
  name: "St. Elizabeth's High School, Pomburpa",
  url: "https://www.youtube.com/channel/UC-tcx146Wg3S4PhDG8fefpQ",
  handle: "@StElizabethsPomburpa",
} as const;
