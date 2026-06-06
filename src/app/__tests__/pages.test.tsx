import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// ── Mocks ────────────────────────────────────────────────────────────────

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

vi.mock("@/components/HorizontalScroll", () => ({
  HorizontalScroll: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="horizontal-scroll">{children}</div>
  ),
  HorizontalPage: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="horizontal-page">{children}</div>
  ),
}));

vi.mock("@/components/LoadOverlay", () => ({
  LoadOverlay: () => <div data-testid="load-overlay" />,
}));

vi.mock("@/components/navigation/MenuOverlay", () => ({
  MenuOverlay: () => <div data-testid="menu-overlay" />,
}));

vi.mock("@/components/HeaderThemeController", () => ({
  HeaderThemeController: () => null,
}));

vi.mock("@/components/navigation/Header", () => ({
  Header: () => <header data-testid="header" />,
}));

// ── Homepage ─────────────────────────────────────────────────────────────

import HomePage from "../page";
import AboutPage from "../(site)/about/page";
import AboutMissionPage from "../(site)/about/mission/page";
import AboutHistoryPage from "../(site)/about/history/page";
import AboutStaffPage from "../(site)/about/staff/page";
import AboutStrategicPlanPage from "../(site)/about/strategic-plan/page";
import AdmissionsPage from "../(site)/admissions/page";
import AdmissionsWhyPage from "../(site)/admissions/why/page";
import AdmissionsVisitPage from "../(site)/admissions/visit/page";
import AdmissionsApplyPage from "../(site)/admissions/apply/page";
import AdmissionsTuitionPage from "../(site)/admissions/tuition/page";
import AdmissionsFaqsPage from "../(site)/admissions/faqs/page";
import AcademicsPage from "../(site)/academics/page";
import AcademicsDepartmentsPage from "../(site)/academics/departments/page";
import AcademicsLanguagesPage from "../(site)/academics/languages/page";
import AcademicsLibrariesPage from "../(site)/academics/libraries/page";
import AcademicsCollegeCounselingPage from "../(site)/academics/college-counseling/page";
import AthleticsPage from "../(site)/athletics/page";
import AthleticsTeamsPage from "../(site)/athletics/teams/page";
import ArtsPage from "../(site)/arts/page";
import ArtsVisualArtsPage from "../(site)/arts/visual-arts/page";
import ArtsPerformingArtsPage from "../(site)/arts/performing-arts/page";
import StudentLifePage from "../(site)/student-life/page";
import StudentLifeClubsPage from "../(site)/student-life/clubs/page";
import AlumniPage from "../(site)/alumni/page";
import NewsPage from "../(site)/news/page";
import ContactPage from "../(site)/contact/page";
import ContactVisitPage from "../(site)/contact/visit/page";
import HowToHelpPage from "../(site)/how-to-help/page";
import HowToHelpGivePage from "../(site)/how-to-help/give/page";

// ── Tests ────────────────────────────────────────────────────────────────

describe("Page Smoke Tests", () => {
  // ── Homepage ─────────────────────────────────────────────────────────

  describe("Home '/'", () => {
    it("renders without crashing", () => {
      render(<HomePage />);
      expect(screen.getByTestId("load-overlay")).toBeDefined();
      expect(screen.getByTestId("horizontal-scroll")).toBeDefined();
    });
  });

  // ── About ────────────────────────────────────────────────────────────

  describe("About '/about'", () => {
    it("renders the page heading", () => {
      render(<AboutPage />);
      expect(screen.getByText("About St. Elizabeth")).toBeDefined();
    });

    it("has a main landmark", () => {
      render(<AboutPage />);
      expect(screen.getByRole("main")).toBeDefined();
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
      expect(screen.getByText("Staff & Leadership")).toBeDefined();
    });
  });

  describe("About '/about/strategic-plan'", () => {
    it("renders Strategic Plan heading", () => {
      render(<AboutStrategicPlanPage />);
      expect(screen.getByText("Strategic Plan")).toBeDefined();
    });
  });

  // ── Admissions ────────────────────────────────────────────────────────

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

  describe("Admissions '/admissions/visit'", () => {
    it("renders Plan Your Visit heading", () => {
      render(<AdmissionsVisitPage />);
      expect(screen.getByText("Plan Your Visit")).toBeDefined();
    });
  });

  describe("Admissions '/admissions/apply'", () => {
    it("renders Admission Steps heading", () => {
      render(<AdmissionsApplyPage />);
      expect(screen.getByText("Admission Steps")).toBeDefined();
    });
  });

  describe("Admissions '/admissions/tuition'", () => {
    it("renders Tuition & Financial Assistance heading", () => {
      render(<AdmissionsTuitionPage />);
      expect(screen.getByRole("heading", { level: 1, name: "Tuition & Financial Assistance" })).toBeDefined();
    });
  });

  describe("Admissions '/admissions/faqs'", () => {
    it("renders FAQs heading", () => {
      render(<AdmissionsFaqsPage />);
      expect(screen.getByText("Frequently Asked Questions")).toBeDefined();
    });
  });

  // ── Academics ─────────────────────────────────────────────────────────

  describe("Academics '/academics'", () => {
    it("renders the page heading", () => {
      render(<AcademicsPage />);
      expect(screen.getByRole("heading", { level: 1, name: "Academics" })).toBeDefined();
    });
  });

  describe("Academics '/academics/departments'", () => {
    it("renders Departments heading", () => {
      render(<AcademicsDepartmentsPage />);
      expect(screen.getByText("Departments")).toBeDefined();
    });
  });

  describe("Academics '/academics/languages'", () => {
    it("renders World Languages heading", () => {
      render(<AcademicsLanguagesPage />);
      expect(screen.getByText("World Languages")).toBeDefined();
    });
  });

  describe("Academics '/academics/libraries'", () => {
    it("renders Libraries heading", () => {
      render(<AcademicsLibrariesPage />);
      expect(screen.getByRole("heading", { level: 1, name: "Libraries" })).toBeDefined();
    });
  });

  describe("Academics '/academics/college-counseling'", () => {
    it("renders College Counseling heading", () => {
      render(<AcademicsCollegeCounselingPage />);
      expect(screen.getByRole("heading", { level: 1, name: "College Counseling" })).toBeDefined();
    });
  });

  // ── Athletics ─────────────────────────────────────────────────────────

  describe("Athletics '/athletics'", () => {
    it("renders the page heading", () => {
      render(<AthleticsPage />);
      expect(screen.getByText("Athletics at St. Elizabeth")).toBeDefined();
    });
  });

  describe("Athletics '/athletics/teams'", () => {
    it("renders Teams heading", () => {
      render(<AthleticsTeamsPage />);
      expect(screen.getByText("Teams & Schedules")).toBeDefined();
    });
  });

  // ── Arts ──────────────────────────────────────────────────────────────

  describe("Arts '/arts'", () => {
    it("renders the page heading", () => {
      render(<ArtsPage />);
      expect(screen.getByText("Arts at St. Elizabeth")).toBeDefined();
    });
  });

  describe("Arts '/arts/visual-arts'", () => {
    it("renders Visual Arts heading", () => {
      render(<ArtsVisualArtsPage />);
      expect(screen.getByText("Visual Arts")).toBeDefined();
    });
  });

  describe("Arts '/arts/performing-arts'", () => {
    it("renders Performing Arts heading", () => {
      render(<ArtsPerformingArtsPage />);
      expect(screen.getByText("Performing Arts")).toBeDefined();
    });
  });

  // ── Student Life ──────────────────────────────────────────────────────

  describe("Student Life '/student-life'", () => {
    it("renders the page heading", () => {
      render(<StudentLifePage />);
      expect(screen.getByRole("heading", { level: 1, name: "Student Life" })).toBeDefined();
    });
  });

  describe("Student Life '/student-life/clubs'", () => {
    it("renders Clubs heading", () => {
      render(<StudentLifeClubsPage />);
      expect(screen.getByText("Clubs & Organizations")).toBeDefined();
    });
  });

  // ── Alumni ────────────────────────────────────────────────────────────

  describe("Alumni '/alumni'", () => {
    it("renders the page heading", () => {
      render(<AlumniPage />);
      expect(screen.getByText("St. Elizabeth Alumni")).toBeDefined();
    });
  });

  // ── News ──────────────────────────────────────────────────────────────

  describe("News '/news'", () => {
    it("renders the page heading", () => {
      render(<NewsPage />);
      expect(screen.getByText("News & Events")).toBeDefined();
    });
  });

  // ── Contact ───────────────────────────────────────────────────────────

  describe("Contact '/contact'", () => {
    it("renders the page heading", () => {
      render(<ContactPage />);
      expect(screen.getByText("Contact Us")).toBeDefined();
    });
  });

  describe("Contact '/contact/visit'", () => {
    it("renders Visit St. Elizabeth heading", () => {
      render(<ContactVisitPage />);
      expect(screen.getByText("Visit St. Elizabeth")).toBeDefined();
    });
  });

  // ── How to Help ───────────────────────────────────────────────────────

  describe("How to Help '/how-to-help'", () => {
    it("renders the page heading", () => {
      render(<HowToHelpPage />);
      expect(screen.getByRole("heading", { level: 1, name: "How to Help" })).toBeDefined();
    });
  });

  describe("How to Help '/how-to-help/give'", () => {
    it("renders Donations & Sponsorship heading", () => {
      render(<HowToHelpGivePage />);
      expect(screen.getByText("Donations & Sponsorship")).toBeDefined();
    });
  });
});
