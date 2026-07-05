"use client";

import type { CalendarOptions } from "@fullcalendar/core";
import FullCalendarMod from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

// FullCalendar v6+ injects styles automatically via JavaScript.
// No separate CSS imports needed.

interface EventsCalendarInnerProps {
  options: CalendarOptions;
}

export function EventsCalendarInner({ options }: EventsCalendarInnerProps) {
  return <FullCalendarMod plugins={[dayGridPlugin, listPlugin]} {...options} />;
}
