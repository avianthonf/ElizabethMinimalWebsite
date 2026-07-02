"use client";

import { useState } from "react";
import { QRCodeDisplay } from "@/components/ui/QRCode/QRCodeDisplay";
import { CountdownTimer } from "@/components/ui/Countdown/CountdownTimer";
import { MarkdownRenderer } from "@/components/ui/Markdown/MarkdownRenderer";
import { Separator } from "@/components/ui/Separator/Separator";
import styles from "./SchoolBrochure.module.css";

/**
 * SchoolBrochure — school information display with QR code and countdown.
 * Ties together: react-qr-code, react-countdown, react-markdown.
 */
export function SchoolBrochure() {
  const brochureMarkdown = `
## 🎓 St. Elizabeth's High School

**Established:** 1961 | **Location:** Goa, India

### Our Mission
To provide holistic education that nurtures intellectual growth, character development, and social responsibility in a supportive Catholic environment.

### Key Highlights
- **1,247 students** across 12 grades
- **48 faculty members** with advanced degrees
- **94.2% pass rate** in board examinations
- **15:1 student-teacher ratio**

### Programs Offered
- **Academic:** Science, Commerce, Arts streams
- **Co-curricular:** Sports, Music, Art, Drama
- **Extra-curricular:** NCC, NSS, Scouts & Guides
- **Technology:** Computer Lab, STEM Innovation Hub
  `;

  return (
    <div className={styles.brochure}>
      <div className={styles.header}>
        <h3 className={styles.title}>🏫 School Information</h3>
      </div>

      <div className={styles.grid}>
        <div className={styles.content}>
          <MarkdownRenderer content={brochureMarkdown} />
        </div>

        <div className={styles.sidebar}>
          <div className={styles.qrSection}>
            <h4 className={styles.sectionTitle}>📱 Visit Our Website</h4>
            <QRCodeDisplay value="https://stelizabeths.edu.in" size={128} label="Scan to visit" />
          </div>

          <Separator />

          <div className={styles.countdownSection}>
            <h4 className={styles.sectionTitle}>⏰ Admission Deadline</h4>
            <CountdownTimer targetDate="2026-12-31" label="Applications close in" />
          </div>

          <Separator />

          <div className={styles.contactInfo}>
            <h4 className={styles.sectionTitle}>📞 Contact Us</h4>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone</span>
                <span className={styles.contactValue}>+91 832 225 1234</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>info@stelizabeths.edu.in</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Address</span>
                <span className={styles.contactValue}>Mapusa, Goa 403507</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
