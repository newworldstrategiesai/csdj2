"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { type Client } from "@/lib/types";

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
    accessorKey: "musicPreferences",
    header: "Music Preferences",
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">
        {(row.getValue("musicPreferences") as string[]).join(", ")}
      </div>
    ),
  },
];

const mockClients: Client[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    musicPreferences: ["Pop", "Rock"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock data as needed
];

export default function ClientsPage() {
  const [clients] = useState<Client[]>(mockClients);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}