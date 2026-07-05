import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// ── Mocks ────────────────────────────────────────────────────────────────

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

vi.mock("@/features/menu", () => ({
  MenuOverlay: () => <div data-testid="menu-overlay" />,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/widgets/header/header", () => ({
  Header: () => <header data-testid="header" />,
}));

// Mock the HomePage
vi.mock("@/pages/home", () => ({
  HomePage: () => <main data-testid="homepage">Homepage</main>,
}));

// ── Homepage ─────────────────────────────────────────────────────────────

import HomePage from "../page";
import AboutPage from "../(site)/about/page";
import AboutMissionPage from "../(site)/about/mission/page";
import AboutHistoryPage from "../(site)/about/history/page";
import AboutStaffPage from "../(site)/about/staff/page";
import AboutAlumniPage from "../(site)/about/alumni/page";
import AdmissionsPage from "../(site)/admissions/page";
import AdmissionsWhyPage from "../(site)/admissions/why/page";
import AdmissionsApplyPage from "../(site)/admissions/apply/page";
import AdmissionsInfrastructurePage from "../(site)/admissions/infrastructure/page";
import AcademicsPage from "../(site)/academics/page";
import AcademicsCurriculumPage from "../(site)/academics/curriculum/page";
import AcademicsLibraryPage from "../(site)/academics/library/page";
import BeyondAcademicsPage from "../(site)/beyond-academics/page";
import BeyondAcademicsClubsPage from "../(site)/beyond-academics/clubs/page";
import BeyondAcademicsSportsPage from "../(site)/beyond-academics/sports/page";
import NewsPage from "../(site)/news/page";
import ContactPage from "../(site)/contact/page";

// ── Tests ────────────────────────────────────────────────────────────────

describe("Page Smoke Tests", () => {
  describe("Home '/'", () => {
    it("renders without crashing", () => {
      render(<HomePage />);
      expect(screen.getByTestId("homepage")).toBeDefined();
    });
  });

  describe("About '/about'", () => {
    it("renders the page heading", () => {
      render(<AboutPage />);
      expect(screen.getByText("About St. Elizabeth")).toBeDefined();
    });
  });

  describe("About '/about/mission'", () => {
    it("renders Mission & Values heading", () => {
      render(<AboutMissionPage />);
      expect(screen.getByRole("heading", { level: 1, name: "Mission & Values" })).toBeDefined();
    });
  });

  describe("About '/about/history'", () => {
    it("renders School History heading", () => {
      render(<AboutHistoryPage />);
      expect(screen.getByText("School History")).toBeDefined();
    });
  });

  describe("About '/about/staff'", () => {
    it("renders Staff & Leadership heading", () => {
      render(<AboutStaffPage />);
      expect(screen.getByRole("heading", { level: 1, name: "Staff & Leadership" })).toBeDefined();
    });
  });

  describe("About '/about/alumni'", () => {
    it("renders the alumni community heading", () => {
      render(<AboutAlumniPage />);
      expect(screen.getByText("St. Elizabeth Alumni")).toBeDefined();
    });
  });

  describe("Admissions '/admissions'", () => {
    it("renders the page heading", () => {
      render(<AdmissionsPage />);
      expect(screen.getByText("Admissions at St. Elizabeth")).toBeDefined();
    });
  });

  describe("Admissions '/admissions/why'", () => {
    it("renders Why St. Elizabeth heading", () => {
      render(<AdmissionsWhyPage />);
      expect(screen.getByText("Why St. Elizabeth?")).toBeDefined();
    });
  });

  describe("Admissions '/admissions/apply'", () => {
    it("renders Admission Steps heading", () => {
      render(<AdmissionsApplyPage />);
      expect(screen.getByText("Admission Steps")).toBeDefined();
    });
  });

  describe("Admissions '/admissions/infrastructure'", () => {
    it("renders Campus Infrastructure heading", () => {
      render(<AdmissionsInfrastructurePage />);
      expect(screen.getByText("Infrastructure & Facilities")).toBeDefined();
    });
  });

  describe("Academics '/academics'", () => {
    it("renders the page heading", () => {
      render(<AcademicsPage />);
      expect(screen.getByRole("heading", { level: 1, name: "Academics" })).toBeDefined();
    });
  });

  describe("Academics '/academics/curriculum'", () => {
    it("renders the page", () => {
      render(<AcademicsCurriculumPage />);
      expect(screen.getByRole("main")).toBeDefined();
    });
  });

  describe("Academics '/academics/library'", () => {
    it("renders the page", () => {
      render(<AcademicsLibraryPage />);
      expect(screen.getByRole("main")).toBeDefined();
    });
  });

  describe("Beyond Academics '/beyond-academics'", () => {
    it("renders the page", () => {
      render(<BeyondAcademicsPage />);
      expect(screen.getByRole("main")).toBeDefined();
    });
  });

  describe("Beyond Academics '/beyond-academics/clubs'", () => {
    it("renders Clubs heading", () => {
      render(<BeyondAcademicsClubsPage />);
      expect(screen.getByText("Clubs & Organizations")).toBeDefined();
    });
  });

  describe("Beyond Academics '/beyond-academics/sports'", () => {
    it("renders Sports heading", () => {
      render(<BeyondAcademicsSportsPage />);
      expect(screen.getByText("Sports & Athletics")).toBeDefined();
    });
  });

  describe("News '/news'", () => {
    it("renders the page heading", () => {
      render(<NewsPage />);
      expect(screen.getByText("News & Events")).toBeDefined();
    });
  });

  describe("Contact '/contact'", () => {
    it("renders the page heading", () => {
      render(<ContactPage />);
      expect(screen.getByRole("heading", { level: 1, name: "Contact Us" })).toBeDefined();
    });
  });
});
