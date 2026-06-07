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
    title: "Annual Day Celebration 2024",
    date: "November 15, 2024",
    excerpt: "Students, staff, and families gathered to celebrate another year of academic and co-curricular achievement at St. Elizabeth's High School. The evening featured cultural performances, award presentations, and a keynote address celebrating our school community.",
    imageFilename: "DSC07504.jpg",
    category: "Events",
    href: "/news/annual-day-2024",
  },
  {
    title: "Sports Meet XXII — A Display of Spirit",
    date: "November 22, 2024",
    excerpt: "Houses competed with passion and sportsmanship at the 22nd annual inter-house sports meet. Track events, relays, and team sports brought out the best in our student-athletes.",
    imageFilename: "DSC07546.jpg",
    category: "Athletics",
    href: "/news/sports-meet-xxii",
  },
  {
    title: "Feast Day Celebrations at St. Elizabeth",
    date: "November 19, 2024",
    excerpt: "The school community came together in prayer and celebration for the annual Feast Day, honouring our patron saint's legacy of service and compassion.",
    imageFilename: "DSC07555.jpg",
    category: "Community",
    href: "/news/feast-day-2024",
  },
  {
    title: "Students Excel in CBSE Board Examinations",
    date: "May 2024",
    excerpt: "St. Elizabeth's High School students achieved outstanding results in the CBSE Class X and XII board examinations, with several students scoring above 95% and the school achieving a 100% pass rate.",
    imageFilename: "DSC07576.jpg",
    category: "Academics",
    href: "/news/cbse-results-2024",
  },
  {
    title: "Science Exhibition Showcases Student Innovation",
    date: "October 2024",
    excerpt: "From working models of renewable energy systems to robotics demonstrations, the annual science exhibition highlighted the creativity and scientific thinking of our students.",
    imageFilename: "DSC07502.jpg",
    category: "Academics",
    href: "/news/science-exhibition-2024",
  },
  {
    title: "Goa Schools Basketball Championship",
    date: "January 2025",
    excerpt: "Our senior basketball team reached the semi-finals of the Goa Inter-School Basketball Championship, demonstrating exceptional teamwork and sportsmanship throughout the tournament.",
    imageFilename: "DSC07495.jpg",
    category: "Athletics",
    href: "/news/basketball-championship-2025",
  },
];

export const UPCOMING_EVENTS = [
  {
    title: "Parent-Teacher Meeting",
    date: "Last Saturday of each month",
    description: "Parents are invited to meet with teachers to discuss student progress and development.",
  },
  {
    title: "Open House 2026",
    date: "January 2026",
    description: "Prospective families are welcome to tour our campus, meet faculty, and experience the St. Elizabeth difference.",
  },
  {
    title: "Annual Arts Festival",
    date: "February 2026",
    description: "A celebration of student creativity featuring art exhibitions, musical performances, and theatrical productions.",
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
