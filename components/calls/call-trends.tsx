
"use client";

import { Card } from "@/components/ui/card";

const trends = [
  {
    metric: "Peak Call Hours",
    value: "10 AM - 2 PM",
    trend: "Consistent with last month",
  },
  {
    metric: "Most Common Duration",
    value: "3-5 minutes",
    trend: "Increased from 2-4 minutes",
  },
  {
    metric: "Busiest Day",
    value: "Monday",
    trend: "Changed from Wednesday",
  },
  {
    metric: "Response Rate",
    value: "85%",
    trend: "Improved by 5%",
  },
];

export function CallTrends() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Key Insights</h2>
      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend.metric}
            className="flex flex-col space-y-1 p-4 border rounded-lg"
          >
            <span className="text-sm font-medium">{trend.metric}</span>
            <span className="text-2xl font-bold">{trend.value}</span>
            <span className="text-sm text-muted-foreground">
              {trend.trend}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
