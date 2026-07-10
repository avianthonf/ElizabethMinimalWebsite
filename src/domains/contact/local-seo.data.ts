/**
 * Local SEO data for St. Elizabeth's High School.
 *
 * Provides structured area-served, landmark, transportation, and
 * frequently-searched-term data for local search optimization.
 */

export const LOCAL_SEO = {
  areasServed: [
    "Pomburpa",
    "Olaulim",
    "Bardez",
    "Mapusa",
    "Calangute",
    "Candolim",
    "Panjim",
    "North Goa",
  ],
  nearbyLandmarks: [
    { name: "Pomburpa Church", relation: "Walking distance" },
    { name: "Mapusa City", relation: "8 km (15 minutes)" },
    { name: "Panjim City", relation: "15 km (30 minutes)" },
    { name: "Calangute Beach", relation: "12 km (25 minutes)" },
  ],
  transportOptions: [
    {
      mode: "School Bus",
      routes: "North Goa routes covering Panjim, Mapusa, Calangute, and surrounding villages",
    },
    {
      mode: "Public Bus",
      routes: "Kadamba Transport Corporation buses connecting Pomburpa to Mapusa and Panjim",
    },
    {
      mode: "Private Vehicle",
      routes: "Well-connected via all-weather roads; parking available on campus",
    },
  ],
  frequentlySearchedTerms: [
    "English medium school in Pomburpa",
    "best school in Bardez Goa",
    "Catholic school North Goa",
    "GBSHSE school near Mapusa",
    "aided school Goa admissions 2026",
    "school with small class size Goa",
  ],
  comparisonSearchTerms: [
    "GBSHSE school vs CBSE school Bardez",
    "aided school vs private school Goa",
    "Catholic school Pomburpa vs Bastora",
    "small school benefits Goa",
    "best school near Mapusa not CBSE",
  ],
} as const;

export interface LocalSeoData {
  LOCAL_SEO: typeof LOCAL_SEO;
}

export async function getLocalSeoData(): Promise<LocalSeoData> {
  return { LOCAL_SEO };
}
