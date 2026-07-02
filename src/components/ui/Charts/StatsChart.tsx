"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
}

interface StatsChartProps {
  data: ChartDataItem[];
  title?: string;
  height?: number;
  showGrid?: boolean;
  className?: string;
}

/**
 * StatsChart — responsive bar chart for school statistics.
 * Uses recharts for data visualization.
 *
 * Usage:
 *   <StatsChart
 *     data={[
 *       { label: "Math", value: 95 },
 *       { label: "Science", value: 88 },
 *     ]}
 *     title="Academic Performance"
 *   />
 */
export function StatsChart({
  data,
  title,
  height = 300,
  showGrid = true,
  className,
}: StatsChartProps) {
  const colors = useMemo(
    () => [
      "#0c217c", // royal-blue
      "#c9a84c", // gold
      "#0c4a6e", // deep-blue
      "#2563eb", // blue-600
      "#059669", // emerald-600
      "#d97706", // amber-600
      "#dc2626", // red-600
      "#7c3aed", // violet-600
    ],
    [],
  );

  return (
    <div className={className}>
      {title && (
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: "1rem",
            color: "var(--s-color-text, #171717)",
          }}
        >
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(23,23,23,0.08)" />}
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "#5f5f5f" }}
            axisLine={{ stroke: "rgba(23,23,23,0.14)" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#5f5f5f" }}
            axisLine={{ stroke: "rgba(23,23,23,0.14)" }}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid rgba(23,23,23,0.14)",
              borderRadius: 8,
              fontSize: 14,
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.label} fill={entry.color ?? colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
