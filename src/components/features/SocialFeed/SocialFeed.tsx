"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { Separator } from "@/components/ui/Separator/Separator";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { CopyButton } from "@/components/ui/CopyButton/CopyButton";
import styles from "./SocialFeed.module.css";

interface SocialPost {
  id: string;
  author: string;
  handle: string;
  content: string;
  date: string;
  likes: number;
  shares: number;
  avatar?: string;
}

const samplePosts: SocialPost[] = [
  {
    id: "1",
    author: "St. Elizabeth's High School",
    handle: "@stelizabeths",
    content:
      "🎉 Congratulations to our Class of 2026! 98% pass rate with 12 students scoring above 95%. We're incredibly proud of their achievements! #StElizabeths #AcademicExcellence",
    date: "2h ago",
    likes: 234,
    shares: 45,
  },
  {
    id: "2",
    author: "St. Elizabeth's High School",
    handle: "@stelizabeths",
    content:
      "🏫 Our annual science fair showcased 50+ innovative projects from students across all grades. The future of science is bright in Goa! 🔬⚗️",
    date: "1d ago",
    likes: 189,
    shares: 32,
  },
  {
    id: "3",
    author: "St. Elizabeth's High School",
    handle: "@stelizabeths",
    content:
      "⚽ Our football team secured 2nd place in the inter-school tournament! Hard work and teamwork paid off. Congratulations, team! 🏆",
    date: "3d ago",
    likes: 312,
    shares: 67,
  },
];

/**
 * SocialFeed — social media feed display.
 * Shows school social posts with engagement metrics.
 */
export function SocialFeed() {
  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <h3 className={styles.title}>📱 Social Feed</h3>
        <CopyButton text="https://stelizabeths.edu.in" label="Share" copiedMessage="Link copied!" />
      </div>

      <Separator />

      <div className={styles.posts}>
        {samplePosts.map((post) => (
          <article key={post.id} className={styles.post}>
            <div className={styles.postHeader}>
              <Avatar src={post.avatar} alt={post.author} fallback="SE" size={40} />
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{post.author}</span>
                <span className={styles.authorHandle}>{post.handle}</span>
              </div>
              <span className={styles.date}>{post.date}</span>
            </div>

            <p className={styles.content}>{post.content}</p>

            <div className={styles.engagement}>
              <span className={styles.metric}>❤️ {post.likes}</span>
              <span className={styles.metric}>🔄 {post.shares}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
