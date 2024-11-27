
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

// Mock data
const conversionData = [
  { date: "2024-01", leads: 45, conversions: 12 },
  { date: "2024-02", leads: 52, conversions: 15 },
  { date: "2024-03", leads: 58, conversions: 18 },
  { date: "2024-04", leads: 63, conversions: 22 },
  { date: "2024-05", leads: 70, conversions: 25 },
];

const stageData = [
  { name: "New", value: 30 },
  { name: "Contacted", value: 25 },
  { name: "Meeting Scheduled", value: 20 },
  { name: "Proposal Sent", value: 15 },
  { name: "Contract Sent", value: 10 },
];

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];

export default function PipelineAnalyticsPage() {
  const [selectedPeriod] = useState("month");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Pipeline Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Conversion Rate</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => formatDate(date)}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => formatDate(date)}
                  formatter={(value) => [`${value}`, ""]}
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#FF6B6B"
                  name="Leads"
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="#4ECDC4"
                  name="Conversions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Pipeline Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
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
                  {stageData.map((entry, index) => (
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

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Stage Metrics</h2>
          <div className="space-y-4">
            {stageData.map((stage, index) => (
              <div key={stage.name} className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{stage.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {stage.value} leads
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(stage.value / 30) * 100}%`,
                        backgroundColor: COLORS[index],
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Communication Stats</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Email Response Rate</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">SMS Response Rate</span>
                <span className="text-sm text-muted-foreground">82%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "82%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Call Answer Rate</span>
                <span className="text-sm text-muted-foreground">60%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
