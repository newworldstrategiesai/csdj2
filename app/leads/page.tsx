"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Client } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/clients/${client.id}`}>View Details</Link>
          </Button>
        </div>
      );
    },
  },
];

const mockLeads: Client[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    musicPreferences: ["Pop", "Rock"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function LeadsPage() {
  const [leads] = useState<Client[]>(mockLeads);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track potential clients
          </p>
        </div>
        <Button asChild>
          <Link href="/leads/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Lead
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={leads} />
    </div>
  );
}