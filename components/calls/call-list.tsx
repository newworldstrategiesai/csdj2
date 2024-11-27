
"use client";

import { useState, useEffect } from "react";
import { VoiceService } from "@/lib/services/voice-service";
import { DataTable } from "@/components/ui/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type CallLog } from "@/lib/types";
import { CallStatusBadge } from "./call-status-badge";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, Phone } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<CallLog>[] = [
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "direction",
    header: "Direction",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("direction")}</span>
    ),
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

export function CallList() {
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCalls = async () => {
      try {
        const callHistory = await VoiceService.getCallHistory();
        setCalls(callHistory);
      } catch (error) {
        console.error("Error loading calls:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, []);

  if (loading) {
    return <div>Loading calls...</div>;
  }

  return <DataTable columns={columns} data={calls} />;
}
