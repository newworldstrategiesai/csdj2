"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { CallLog } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { CallStatusBadge } from "@/components/calls/call-status-badge";
import { Button } from "@/components/ui/button";
import { Phone, Download } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<CallLog>[] = [
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "direction",
    header: "Direction",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <CallStatusBadge status={row.getValue("status")} />
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => `${row.getValue("duration")}s`,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const call = row.original;
      return (
        <div className="flex items-center gap-2">
          {call.recordingUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={call.recordingUrl} target="_blank">
                <Download className="h-4 w-4 mr-1" />
                Recording
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href={`/calls/${call.id}`}>
              <Phone className="h-4 w-4 mr-1" />
              Details
            </Link>
          </Button>
        </div>
      );
    },
  },
];

const mockCalls: CallLog[] = [
  {
    id: "1",
    phoneNumber: "+1234567890",
    direction: "inbound",
    status: "completed",
    duration: 120,
    recordingUrl: "https://example.com/recording.mp3",
    transcription: "Hey, I'm interested in booking a DJ for my wedding...",
    createdAt: new Date(),
  },
];

export default function CallsPage() {
  const [calls] = useState<CallLog[]>(mockCalls);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Call Logs</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your incoming and outgoing calls
        </p>
      </div>
      <DataTable columns={columns} data={calls} />
    </div>
  );
}