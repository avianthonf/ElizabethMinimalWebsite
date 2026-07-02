"use client";

import { useState, type ReactNode } from "react";
import styles from "./Tabs.module.css";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

/**
 * Tabs — accessible tabbed navigation.
 * Uses keyboard navigation and ARIA attributes.
 *
 * Usage:
 *   <Tabs
 *     tabs={[
 *       { id: "overview", label: "Overview", content: <Overview /> },
 *       { id: "curriculum", label: "Curriculum", content: <Curriculum /> },
 *     ]}
 *   />
 */
export function Tabs({ tabs, defaultTab, onChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            disabled={tab.disabled}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div id={`panel-${activeTab}`} role="tabpanel" className={styles.panel}>
        {activeContent}
      </div>
    </div>
  );
}
