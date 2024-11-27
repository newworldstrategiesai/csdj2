```typescript
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatDate } from "@/lib/utils";
import { CallMetrics } from "@/components/calls/call-metrics";
import { CallTrends } from "@/components/calls/call-trends";
import { CallQualityMetrics } from "@/components/calls/call-quality-metrics";
import { CallVolumeByTime } from "@/components/calls/call-volume-by-time";

// Mock data
const callVolumeData = [
  { date: "2024-01", inbound: 45, outbound: 32 },
  { date: "2024-02", inbound: 52, outbound: 38 },
  { date: "2024-03", inbound: 58, outbound: 42 },
  { date: "2024-04", inbound: 63, outbound: 45 },
  { date: "2024-05", inbound: 70, outbound: 48 },
];

const callStatusData = [
  { name: "Completed", value: 150 },
  { name: "Missed", value: 30 },
  { name: "Voicemail", value: 45 },
  { name: "Failed", value: 15 },
];

const COLORS = ["#4CAF50", "#FF5252", "#FFC107", "#9C27B0"];

export default function CallAnalyticsPage() {
  const [selectedPeriod] = useState("month");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Call Analytics</h1>

      <CallMetrics />

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Call Volume Trends</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={callVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => formatDate(date)}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => formatDate(date)}
                  formatter={(value) => [`${value} calls`, ""]}
                />
                <Line
                  type="monotone"
                  dataKey="inbound"
                  stroke="#4CAF50"
                  name="Inbound"
                />
                <Line
                  type="monotone"
                  dataKey="outbound"
                  stroke="#2196F3"
                  name="Outbound"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Call Status Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={callStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {callStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <CallQualityMetrics />
        <CallVolumeByTime />
        <CallTrends />
      </div>
    </div>
  );
}
```