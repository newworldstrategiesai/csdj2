
"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const hourlyData = [
  { hour: "9AM", calls: 23 },
  { hour: "10AM", calls: 45 },
  { hour: "11AM", calls: 56 },
  { hour: "12PM", calls: 38 },
  { hour: "1PM", calls: 42 },
  { hour: "2PM", calls: 51 },
  { hour: "3PM", calls: 44 },
  { hour: "4PM", calls: 35 },
  { hour: "5PM", calls: 28 },
];

export function CallVolumeByTime() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Call Volume by Time</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calls" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
