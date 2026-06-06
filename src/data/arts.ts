/**
 * Arts content for St. Elizabeth High School.
 */

export interface ArtsProgram {
  id: string;
  name: string;
  description: string;
  category: 'visual' | 'performing';
  image: string;
  faculty: string[];
  schedule?: string;
}

export const VISUAL_ARTS_PROGRAMS = [
  {
    title: "Drawing & Painting",
    description: "Students explore color theory, composition, and various media including watercolor, acrylic, and charcoal to develop their artistic voice.",
  },
  {
    title: "Sculpture & 3D Design",
    description: "Hands-on exploration of form, texture, and space using clay, papier-mâché, and recycled materials.",
  },
  {
    title: "Art History & Appreciation",
    description: "Understanding the great artistic traditions of India and the world, from classical to contemporary, and their cultural contexts.",
  },
] as const;

export const VISUAL_ARTS_PAGE = {
  metaTitle: "Visual Arts",
  metaDescription:
    "Explore the visual arts programme at St. Elizabeth High School — drawing, painting, sculpture, 3D design, and art history.",
  heroEyebrow: "Create",
  heroHeading: "Visual Arts",
  heroDescription:
    "Develop your artistic voice through hands-on practice in drawing, painting, sculpture, and art appreciation.",
  sectionHeading: "Our Programmes",
  sectionAriaLabel: "Visual arts programmes",
} as const;

export const PERFORMING_ARTS_PAGE = {
  metaTitle: "Performing Arts",
  metaDescription:
    "Explore the performing arts programme at St. Elizabeth High School — music, dance, drama, and our annual arts festival.",
  heroEyebrow: "Perform",
  heroHeading: "Performing Arts",
  heroDescription:
    "Find your voice on stage — through music, dance, and drama — and celebrate Goa's rich performance traditions.",
  sectionHeading: "Our Programmes",
  sectionAriaLabel: "Performing arts programmes",
} as const;

export const PERFORMING_ARTS_PROGRAMS = [
  {
    title: "Music",
    description: "Vocal and instrumental instruction including choir, school band, and individual practice sessions. Students perform at school events and community celebrations.",
  },
  {
    title: "Dance",
    description: "Classical Indian dance, folk dance, and contemporary movement — celebrating Goa's rich performance traditions while embracing modern expression.",
  },
  {
    title: "Drama & Theatre",
    description: "From script reading to stage production, students develop confidence, collaboration, and creative expression through our annual school play and drama club.",
  },
  {
    title: "Annual Arts Festival",
    description: "A showcase of student creativity featuring art exhibitions, musical performances, dance recitals, and theatrical productions for the entire school community.",
  },
] as const;

// ── Async data getter (CMS-ready) ─────────────────────────────────────

export interface ArtsData {
  VISUAL_ARTS_PAGE: typeof VISUAL_ARTS_PAGE;
  VISUAL_ARTS_PROGRAMS: typeof VISUAL_ARTS_PROGRAMS;
  PERFORMING_ARTS_PAGE: typeof PERFORMING_ARTS_PAGE;
  PERFORMING_ARTS_PROGRAMS: typeof PERFORMING_ARTS_PROGRAMS;
}

export async function getArtsData(): Promise<ArtsData> {
  return { VISUAL_ARTS_PAGE, VISUAL_ARTS_PROGRAMS, PERFORMING_ARTS_PAGE, PERFORMING_ARTS_PROGRAMS };
}
