"use client";

import dynamic from "next/dynamic";
import type { CalendarOptions, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

// FullCalendar requires browser APIs — lazy-load with ssr:false.
// Plugins are imported at module level (pure JS, no browser APIs needed).
const FullCalendar = dynamic(
  async () => {
    const mod = await import("@fullcalendar/react");
    // Side-effect CSS imports (only executed on client)
    await import("@fullcalendar/core/index.css");
    await import("@fullcalendar/daygrid/index.css");
    await import("@fullcalendar/list/index.css");
    return { default: mod.default };
  },
  { ssr: false },
);

/**
 * 6 upcoming school events for the academic year 2026-27.
 * Color coding: Gold=Admissions, Navy=Academic, Blue=Cultural,
 * Green=Sports, Purple=Cultural, Red=Community.
 * Future: replace with CMS-powered data or a server API endpoint.
 */
export const SCHOOL_EVENTS: EventInput[] = [
  {
    title: "Admissions Open House",
    start: "2026-08-01",
    color: "#D4AF37",
    textColor: "#1B2A4A",
    extendedProps: { type: "admissions", location: "Main Campus" },
  },
  {
    title: "First Day of School",
    start: "2026-09-01",
    color: "#2E5090",
    extendedProps: { type: "academic", location: "All Classrooms" },
  },
  {
    title: "Teacher's Day Celebration",
    start: "2026-09-05",
    color: "#5DADE2",
    extendedProps: { type: "cultural", location: "Assembly Hall" },
  },
  {
    title: "Inter-House Sports Meet XXIII",
    start: "2026-10-10",
    end: "2026-10-12",
    color: "#27AE60",
    extendedProps: { type: "sports", location: "Sports Ground" },
  },
  {
    title: "Annual Day Celebrations",
    start: "2026-11-15",
    color: "#8E44AD",
    extendedProps: { type: "cultural", location: "Auditorium" },
  },
  {
    title: "Christmas Celebrations & Vacation",
    start: "2026-12-22",
    end: "2026-12-31",
    color: "#E74C3C",
    extendedProps: { type: "community", location: "Main Campus" },
  },
];

export function EventsCalendar() {
  const options: CalendarOptions = {
    plugins: [dayGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    events: SCHOOL_EVENTS,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,listYear",
    },
    height: "auto",
    firstDay: 1,
    buttonText: { today: "Today", month: "Month", list: "Year" },
    eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: "short" },
    noEventsText: "No events scheduled",
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <FullCalendar {...options} />
    </div>
  );
}
