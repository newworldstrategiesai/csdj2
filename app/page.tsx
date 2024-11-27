"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { UpcomingEvents } from "@/components/dashboard/upcoming-events";
import { Calendar, Users, Music, DollarSign, PlusCircle } from "lucide-react";
import Link from "next/link";

const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 25000 },
  { month: "Jun", revenue: 28000 },
];

const upcomingEvents = [
  {
    id: "1",
    type: "Wedding",
    date: new Date("2024-06-15"),
    location: "Grand Hotel",
    clientName: "John & Sarah",
    status: "Confirmed",
  },
  {
    id: "2",
    type: "Corporate",
    date: new Date("2024-06-20"),
    location: "Tech Center",
    clientName: "ABC Corp",
    status: "Contracted",
  },
  {
    id: "3",
    type: "Birthday",
    date: new Date("2024-06-25"),
    location: "City Club",
    clientName: "Mike Smith",
    status: "Lead",
  },
];

export default function Dashboard() {
  const [totalEvents] = useState(12);
  const [activeClients] = useState(24);
  const [upcomingEventsCount] = useState(8);
  const [monthlyRevenue] = useState(28500);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome! Here's what's happening with your business
          </p>
        </div>
        <Button asChild>
          <Link href="/leads/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Lead
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Events"
          value={totalEvents}
          subtitle="+2 from last month"
          icon={Calendar}
        />
        <MetricCard
          title="Active Clients"
          value={activeClients}
          subtitle="+4 new this month"
          icon={Users}
        />
        <MetricCard
          title="Upcoming Events"
          value={upcomingEventsCount}
          subtitle="Next 30 days"
          icon={Music}
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString()}`}
          subtitle="+12% from last month"
          icon={DollarSign}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <RevenueChart data={revenueData} />
        <UpcomingEvents events={upcomingEvents} />
      </div>
    </div>
  );
}