"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { type Contract } from "@/lib/types";
import { ContractStatusBadge } from "@/components/contracts/contract-status-badge";
import { ContractForm } from "@/components/contracts/contract-form";
import { formatDate } from "@/lib/utils";
import type { ContractData } from "@/lib/contracts/contract-template";

const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "id",
    header: "Contract ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <ContractStatusBadge status={row.getValue("status")} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    accessorKey: "signedAt",
    header: "Signed",
    cell: ({ row }) => {
      const date = row.getValue("signedAt");
      return date ? formatDate(date) : "-";
    },
  },
];

const mockContracts: Contract[] = [
  {
    id: "1",
    eventId: "1",
    clientId: "1",
    status: "Draft",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    eventId: "2",
    clientId: "2",
    status: "Signed",
    signedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);

  const handleCreateContract = (data: ContractData) => {
    const newContract: Contract = {
      id: crypto.randomUUID(),
      eventId: crypto.randomUUID(), // In real app, this would be linked to an actual event
      clientId: crypto.randomUUID(), // In real app, this would be linked to an actual client
      status: "Draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setContracts((prev) => [...prev, newContract]);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contracts</h1>
        <ContractForm onSubmit={handleCreateContract} />
      </div>
      <DataTable columns={columns} data={contracts} />
    </div>
  );
}