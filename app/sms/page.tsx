"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type Communication } from "@/lib/types";

const columns: ColumnDef<Communication>[] = [
  {
    accessorKey: "content",
    header: "Message",
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {row.getValue("content")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleString();
    },
  },
];

const mockSMS: Communication[] = [
  {
    id: "1",
    type: "SMS",
    clientId: "1",
    content: "Can you DJ for my wedding on June 15th?",
    parsed: {
      eventType: "Wedding",
      eventDate: "2024-06-15",
    },
    createdAt: new Date(),
  },
  // Add more mock data as needed
];

export default function SMSPage() {
  const [messages] = useState<Communication[]>(mockSMS);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">SMS Messages</h1>
      </div>
      <DataTable columns={columns} data={messages} />
    </div>
  );
}