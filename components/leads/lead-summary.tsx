"use client";

import { Button } from "@/components/ui/button";
import { EventStatusBadge } from "@/components/events/event-status-badge";
import { formatDate } from "@/lib/utils";
import type { Client, Event } from "@/lib/types";

interface LeadSummaryProps {
  data: {
    client: Partial<Client>;
    event: Partial<Event>;
  };
  onEdit: () => void;
  onConfirm: () => void;
}

export function LeadSummary({ data, onEdit, onConfirm }: LeadSummaryProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Lead Summary</h2>
          <EventStatusBadge status="Lead" />
        </div>

        <div className="grid gap-8">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Client Information
            </h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium">Name</dt>
                <dd className="text-sm">{data.client.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Email</dt>
                <dd className="text-sm">{data.client.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Phone</dt>
                <dd className="text-sm">{data.client.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Music Preferences</dt>
                <dd className="text-sm">
                  {data.client.musicPreferences?.join(", ")}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Event Details
            </h3>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium">Event Type</dt>
                <dd className="text-sm">{data.event.type}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Date</dt>
                <dd className="text-sm">
                  {data.event.date && formatDate(data.event.date)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium">Location</dt>
                <dd className="text-sm">{data.event.location}</dd>
              </div>
              {data.event.notes && (
                <div className="col-span-2">
                  <dt className="text-sm font-medium">Notes</dt>
                  <dd className="text-sm whitespace-pre-wrap">
                    {data.event.notes}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onEdit}>
          Edit Details
        </Button>
        <Button onClick={onConfirm}>Create Lead</Button>
      </div>
    </div>
  );
}