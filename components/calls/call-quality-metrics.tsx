
"use client";

import { Card } from "@/components/ui/card";

const qualityMetrics = [
  {
    name: "Call Quality",
    value: 92,
    color: "bg-green-500",
  },
  {
    name: "Connection Success",
    value: 98,
    color: "bg-blue-500",
  },
  {
    name: "Voice Clarity",
    value: 88,
    color: "bg-purple-500",
  },
];

export function CallQualityMetrics() {
  return (
    <Card className="col-span-2 p-6">
      <h2 className="text-lg font-semibold mb-6">Call Quality Metrics</h2>
      <div className="space-y-6">
        {qualityMetrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{metric.name}</span>
              <span className="text-sm text-muted-foreground">
                {metric.value}%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full">
              <div
                className={`h-full rounded-full ${metric.color}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
