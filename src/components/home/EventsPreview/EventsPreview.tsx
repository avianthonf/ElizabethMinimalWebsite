import Link from "next/link";
import { UPCOMING_EVENTS, EVENT_ICON_MAP, EVENT_TYPE_ICON_PATHS } from "@/data/homepage-events";
import styles from "./EventsPreview.module.css";

export function EventsPreview() {
  const events = UPCOMING_EVENTS.slice(0, 4);

  return (
    <section className={styles.root} aria-label="Upcoming events">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Coming Up</p>
          <h2 className={styles.heading}>Upcoming Events</h2>
        </div>

        <div className={styles.grid}>
          {events.map((event) => {
            const iconName = EVENT_ICON_MAP[event.type];
            const path = EVENT_TYPE_ICON_PATHS[iconName];

            return (
              <div key={event.title} className={styles.card}>
                <div className={styles.cardIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <p className={styles.cardDate}>
                    <time dateTime={event.date}>{event.date}</time>
                    {event.time && <span className={styles.cardTime}> — {event.time}</span>}
                  </p>
                  {event.location && (
                    <p className={styles.cardLocation}>{event.location}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.ctaWrapper}>
          <Link href="/news" className={styles.cta}>
            View Full Calendar
          </Link>
        </div>
      </div>
    </section>
  );
}
