"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventStatusBadge } from "@/components/events/event-status-badge";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Event {
  id: string;
  type: string;
  date: Date;
  location: string;
  clientName: string;
  status: string;
}

interface UpcomingEventsProps {
  events: Event[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Upcoming Events</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/events">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{event.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event.date)}
                  </p>
                  <p className="text-sm">{event.clientName}</p>
                </div>
                <EventStatusBadge status={event.status} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}