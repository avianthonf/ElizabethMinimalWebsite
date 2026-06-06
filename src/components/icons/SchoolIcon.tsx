import type { ReactNode } from "react";

export type SchoolIconVariant = "academic" | "arts" | "sports" | "community";

export interface SchoolIconProps {
  variant: SchoolIconVariant;
  size?: number;
}

const academicPath = (
  <>
    <path d="M21.42 10.922a1 1 0 00-.019-1.838L12.83 5.18a2 2 0 00-1.66 0L2.6 9.08a1 1 0 000 1.832l8.57 3.908a2 2 0 001.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0012 0v-3.5" />
  </>
);

const artsPath = (
  <>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13a1.65 1.65 0 01-.44-1.12 1.64 1.64 0 011.67-1.67c2 0 3.05-1.22 3.05-3 0-4.5-3.08-8.39-8.49-8.39z" />
    <circle cx="13.5" cy="6.5" r="1.5" />
    <circle cx="17.5" cy="10.5" r="1.5" />
    <circle cx="8.5" cy="7.5" r="1.5" />
    <circle cx="6.5" cy="12.5" r="1.5" />
  </>
);

const sportsPath = (
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    <path d="M2 12h20" />
  </>
);

const communityPath = (
  <>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </>
);

const paths: Record<SchoolIconVariant, ReactNode> = {
  academic: academicPath,
  arts: artsPath,
  sports: sportsPath,
  community: communityPath,
};

export function SchoolIcon({ variant, size = 24 }: SchoolIconProps): ReactNode {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[variant]}
    </svg>
  );
}
