"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type Communication } from "@/lib/types";

const columns: ColumnDef<Communication>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "content",
    header: "Content",
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

const mockCommunications: Communication[] = [
  {
    id: "1",
    type: "Email",
    clientId: "1",
    content: "Wedding inquiry for June 15th at Grand Hotel",
    parsed: {
      eventType: "Wedding",
      eventDate: "2024-06-15",
      location: "Grand Hotel",
    },
    createdAt: new Date(),
  },
  // Add more mock data as needed
];

export default function CommunicationsPage() {
  const [communications] = useState<Communication[]>(mockCommunications);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Communications</h1>
      </div>
      <DataTable columns={columns} data={communications} />
    </div>
  );
}