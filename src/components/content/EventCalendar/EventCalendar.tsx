"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import styles from "./EventCalendar.module.css";
import "react-calendar/dist/Calendar.css";

interface Event {
  date: Date;
  title: string;
  description?: string;
}

interface EventCalendarProps {
  /** List of events */
  events?: Event[];
  /** Additional className */
  className?: string;
}

/**
 * EventCalendar — interactive calendar with school events.
 * Uses react-calendar + date-fns for date formatting.
 *
 * Usage:
 *   <EventCalendar events={[{ date: new Date(), title: "Open Day" }]} />
 */
export function EventCalendar({
  events = [{ date: new Date(), title: "Today" }],
  className,
}: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const tileContent = ({ date }: { date: Date }) => {
    const dayEvents = events.filter(
      (e) => format(e.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
    );
    if (dayEvents.length === 0) return null;
    return (
      <div className={styles.eventDots}>
        {dayEvents.slice(0, 3).map((_, i) => (
          <span key={i} className={styles.dot} />
        ))}
      </div>
    );
  };

  const selectedEvents = selectedDate
    ? events.filter((e) => format(e.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"))
    : [];

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      <Calendar
        onChange={(value) => setSelectedDate(value as Date)}
        value={selectedDate}
        tileContent={tileContent}
        className={styles.calendar}
      />
      {selectedDate && (
        <div className={styles.eventsPanel}>
          <h3 className={styles.eventsTitle}>Events for {format(selectedDate, "MMMM d, yyyy")}</h3>
          {selectedEvents.length === 0 ? (
            <p className={styles.noEvents}>No events on this day.</p>
          ) : (
            <ul className={styles.eventList}>
              {selectedEvents.map((event, i) => (
                <li key={i} className={styles.eventItem}>
                  <strong>{event.title}</strong>
                  {event.description && <p>{event.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
