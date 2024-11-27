
"use client";

import { Card } from "@/components/ui/card";
import { Phone, VoicemailIcon, Clock, PhoneOff } from "lucide-react";

const metrics = [
  {
    title: "Total Calls",
    value: "2,456",
    change: "+12%",
    icon: Phone,
  },
  {
    title: "Average Duration",
    value: "4m 32s",
    change: "-2%",
    icon: Clock,
  },
  {
    title: "Voicemails",
    value: "342",
    change: "+5%",
    icon: VoicemailIcon,
  },
  {
    title: "Missed Calls",
    value: "123",
    change: "-8%",
    icon: PhoneOff,
  },
];

export function CallMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
            <div className="rounded-full p-3 bg-secondary">
              <metric.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <span
              className={`text-xs ${
                metric.change.startsWith("+")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {metric.change} from last month
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
