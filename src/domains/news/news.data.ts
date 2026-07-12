/**
 * News content for St. Elizabeth's High School.
 */

export interface NewsArticle {
  title: string;
  date: string;
  excerpt: string;
  imageFilename: string;
  category: string;
  href: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    title: "International Day of Yoga",
    date: "21 June 2026",
    excerpt:
      "Students of St. Elizabeth's High School celebrated the International Day of Yoga by participating in a guided yoga session that promoted physical fitness, mental well-being, and mindfulness. As part of the celebrations, a group of students also proudly represented the school at the State-Level International Day of Yoga Programme held at Shyama Prasad Mukherjee Indoor Stadium, Taleigao, joining participants from across Goa in promoting the message of health, harmony, and holistic well-being.",
    imageFilename: "DSC07576.jpg",
    category: "Events",
    href: "/news/international-day-of-yoga-2026",
  },
  {
    title: "Van Mahotsav Week Celebration",
    date: "1-7 July 2026",
    excerpt:
      "Students enthusiastically celebrated Van Mahotsav Week through a variety of activities that promoted environmental awareness and conservation. The week featured tree plantation drives, nature-based learning experiences, and initiatives that encouraged students to care for and protect the environment.",
    imageFilename: "DSC07290.jpg",
    category: "Events",
    href: "/news/van-mahotsav-week-2026",
  },
  {
    title: "Manager's Day Celebration",
    date: "11 July 2026",
    excerpt:
      "The school community came together to celebrate Manager's Day, expressing heartfelt gratitude and appreciation for the guidance, vision, and dedicated service of our School Manager. The celebration included cultural performances, messages of appreciation, and memorable moments shared by students and staff.",
    imageFilename: "DSC07504.jpg",
    category: "Events",
    href: "/news/managers-day-2026",
  },
  {
    title: "Annual Day Celebration 2024",
    date: "November 15, 2024",
    excerpt:
      "Students, staff, and families gathered to celebrate another year of academic and co-curricular achievement at St. Elizabeth's High School. The evening featured cultural performances, award presentations, and a keynote address celebrating our school community.",
    imageFilename: "DSC07504.jpg",
    category: "Events",
    href: "/news/annual-day-2024",
  },
  {
    title: "Sports Meet XXII — A Display of Spirit",
    date: "November 22, 2024",
    excerpt:
      "Houses competed with passion and sportsmanship at the 22nd annual inter-house sports meet. Track events, relays, and team sports brought out the best in our student-athletes.",
    imageFilename: "DSC07546.jpg",
    category: "Athletics",
    href: "/news/sports-meet-xxii",
  },
  {
    title: "Feast Day Celebrations at St. Elizabeth",
    date: "November 19, 2024",
    excerpt:
      "The school community came together in prayer and celebration for the annual Feast Day, honouring our patron saint's legacy of service and compassion.",
    imageFilename: "DSC07555.jpg",
    category: "Community",
    href: "/news/feast-day-2024",
  },
  {
    title: "Students Excel in GBSHSE Board Examinations",
    date: "May 2024",
    excerpt:
      "St. Elizabeth's High School students achieved outstanding results in the GBSHSE Class X board examinations, with several students scoring above 95% and the school achieving a 100% pass rate.",
    imageFilename: "DSC07576.jpg",
    category: "Academics",
    href: "/news/gbshse-results-2024",
  },
  {
    title: "Science Exhibition Showcases Student Innovation",
    date: "October 2024",
    excerpt:
      "From working models of renewable energy systems to robotics demonstrations, the annual science exhibition highlighted the creativity and scientific thinking of our students.",
    imageFilename: "DSC07502.jpg",
    category: "Academics",
    href: "/news/science-exhibition-2024",
  },
  {
    title: "Goa Schools Basketball Championship",
    date: "January 2025",
    excerpt:
      "Our senior basketball team reached the semi-finals of the Goa Inter-School Basketball Championship, demonstrating exceptional teamwork and sportsmanship throughout the tournament.",
    imageFilename: "DSC07495.jpg",
    category: "Athletics",
    href: "/news/basketball-championship-2025",
  },
  {
    title: "St. Elizabeth's Fully Prepared for NEP 2026-27 Rollout",
    date: "June 15, 2026",
    excerpt:
      "With Goa implementing the National Education Policy for all classes from the 2026-27 academic year, St. Elizabeth's High School is fully prepared with NEP-aligned curriculum, vocational education opportunities, and credit-based assessment systems.",
    imageFilename: "DSC07290.jpg",
    category: "Academics",
    href: "/news/nep-2026-readiness",
  },
];

export const UPCOMING_EVENTS = [
  {
    title: "Parent-Teacher Meeting",
    date: "Last Saturday of each month",
    description:
      "Parents are invited to meet with teachers to discuss student progress and development.",
  },
  {
    title: "Open House 2026",
    date: "January 2026",
    description:
      "Prospective families are welcome to tour our campus, meet faculty, and experience the St. Elizabeth difference.",
  },
  {
    title: "Annual Arts Festival",
    date: "February 2026",
    description:
      "A celebration of student creativity featuring art exhibitions, musical performances, and theatrical productions.",
  },
] as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface NewsData {
  NEWS_ARTICLES: typeof NEWS_ARTICLES;
  UPCOMING_EVENTS: typeof UPCOMING_EVENTS;
}

export async function getNewsData(): Promise<NewsData> {
  return { NEWS_ARTICLES, UPCOMING_EVENTS };
}
