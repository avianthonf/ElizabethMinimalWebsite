"use client";

import { useState } from "react";
import { StatsChart } from "@/components/ui/Charts/StatsChart";
import { Progress } from "@/components/ui/Progress/Progress";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { ConfettiButton } from "@/components/ui/Confetti/ConfettiButton";
import { Separator } from "@/components/ui/Separator/Separator";
import styles from "./SchoolDashboard.module.css";

/**
 * SchoolDashboard — interactive school statistics dashboard.
 * Ties together: recharts, Progress, Avatar, Tabs, Confetti, Separator.
 */

const departmentData = [
  { label: "Mathematics", value: 92, color: "#0c217c" },
  { label: "Science", value: 88, color: "#c9a84c" },
  { label: "English", value: 95, color: "#0c4a6e" },
  { label: "History", value: 85, color: "#2563eb" },
  { label: "Arts", value: 90, color: "#059669" },
];

const topStudents = [
  { name: "Ananya Shetty", grade: "X-A", score: 98.2, avatar: "" },
  { name: "Rohan D'Mello", grade: "X-B", score: 96.8, avatar: "" },
  { name: "Priya Naik", grade: "X-A", score: 95.5, avatar: "" },
  { name: "Aditya Kulkarni", grade: "X-C", score: 94.1, avatar: "" },
  { name: "Meera Fernandes", grade: "X-B", score: 93.7, avatar: "" },
];

export function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState("performance");

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2 className={styles.title}>📊 School Performance Dashboard</h2>
        <ConfettiButton config={{ particleCount: 50, spread: 60 }} className={styles.celebrateBtn}>
          🎉 Celebrate!
        </ConfettiButton>
      </div>

      <Tabs
        tabs={[
          {
            id: "performance",
            label: "Academic Performance",
            content: (
              <div className={styles.section}>
                <StatsChart data={departmentData} title="Department-wise Pass Rate (%)" />
                <Separator />
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <span className={styles.statValue}>94.2%</span>
                    <span className={styles.statLabel}>Overall Pass Rate</span>
                  </div>
                  <div className={styles.statCard}>
                    <span className={styles.statValue}>1,247</span>
                    <span className={styles.statLabel}>Total Students</span>
                  </div>
                  <div className={styles.statCard}>
                    <span className={styles.statValue}>48</span>
                    <span className={styles.statLabel}>Faculty Members</span>
                  </div>
                  <div className={styles.statCard}>
                    <span className={styles.statValue}>15:1</span>
                    <span className={styles.statLabel}>Student-Teacher Ratio</span>
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: "toppers",
            label: "Top Performers",
            content: (
              <div className={styles.section}>
                {topStudents.map((student, i) => (
                  <div key={student.name} className={styles.studentRow}>
                    <span className={styles.rank}>#{i + 1}</span>
                    <Avatar
                      alt={student.name}
                      fallback={student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                      size={36}
                    />
                    <div className={styles.studentInfo}>
                      <span className={styles.studentName}>{student.name}</span>
                      <span className={styles.studentGrade}>{student.grade}</span>
                    </div>
                    <div className={styles.scoreBar}>
                      <Progress value={student.score} variant="success" size="sm" />
                    </div>
                    <span className={styles.score}>{student.score}%</span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            id: "attendance",
            label: "Attendance",
            content: (
              <div className={styles.section}>
                <div className={styles.attendanceGrid}>
                  <div className={styles.attCard}>
                    <span className={styles.attValue}>96.8%</span>
                    <span className={styles.attLabel}>This Month</span>
                    <Progress value={96.8} variant="success" />
                  </div>
                  <div className={styles.attCard}>
                    <span className={styles.attValue}>95.2%</span>
                    <span className={styles.attLabel}>This Quarter</span>
                    <Progress value={95.2} variant="default" />
                  </div>
                  <div className={styles.attCard}>
                    <span className={styles.attValue}>94.5%</span>
                    <span className={styles.attLabel}>This Year</span>
                    <Progress value={94.5} variant="warning" />
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        onChange={setActiveTab}
      />
    </div>
  );
}
