"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RequestQRCode } from "@/components/requests/qr-code";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";
import { type SongRequest } from "@/lib/types";

const columns: ColumnDef<SongRequest>[] = [
  {
    accessorKey: "song",
    header: "Song",
  },
  {
    accessorKey: "artist",
    header: "Artist",
  },
  {
    accessorKey: "phoneNumber",
    header: "Requested By",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.getValue("status") === "paid"
            ? "bg-green-100 text-green-800"
            : row.getValue("status") === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : row.getValue("status") === "played"
            ? "bg-blue-100 text-blue-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (row.getValue("priority") ? "Rush" : "Standard"),
  },
  {
    accessorKey: "paymentAmount",
    header: "Amount",
    cell: ({ row }) => `$${row.getValue("paymentAmount")}`,
  },
  {
    accessorKey: "createdAt",
    header: "Requested At",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
];

const mockRequests: SongRequest[] = [
  {
    id: "1",
    song: "Sweet Caroline",
    artist: "Neil Diamond",
    phoneNumber: "+1234567890",
    status: "paid",
    priority: true,
    paymentId: "pi_123",
    paymentAmount: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function RequestsPage() {
  const [settings, setSettings] = useState({
    phoneNumber: "+1234567890",
    basePrice: 5,
    rushPrice: 20,
    enabled: true,
    autoApprove: true,
  });

  const [requests] = useState<SongRequest[]>(mockRequests);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Song Requests</h1>
          <p className="text-muted-foreground mt-2">
            Manage song requests and payment settings
          </p>
        </div>
        <Button variant="outline" onClick={handlePrint}>
          Print QR Code
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Request Phone Number</Label>
              <Input
                id="phoneNumber"
                value={settings.phoneNumber}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="basePrice">Standard Request Price ($)</Label>
              <Input
                id="basePrice"
                type="number"
                min="0"
                value={settings.basePrice}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    basePrice: parseInt(e.target.value),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rushPrice">Rush Request Price ($)</Label>
              <Input
                id="rushPrice"
                type="number"
                min="0"
                value={settings.rushPrice}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    rushPrice: parseInt(e.target.value),
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Requests</Label>
                <p className="text-sm text-muted-foreground">
                  Allow guests to submit song requests
                </p>
              </div>
              <Switch
                checked={settings.enabled}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, enabled: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-approve Paid Requests</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically add paid requests to the queue
                </p>
              </div>
              <Switch
                checked={settings.autoApprove}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, autoApprove: checked }))
                }
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Request Instructions</h2>
          <div className="space-y-4">
            <RequestQRCode phoneNumber={settings.phoneNumber} />
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Format:</span> Song Name - Artist
              </p>
              <p className="text-sm">
                <span className="font-medium">Example:</span> Sweet Caroline - Neil
                Diamond
              </p>
              <p className="text-sm">
                <span className="font-medium">Regular Request:</span> $
                {settings.basePrice}
              </p>
              <p className="text-sm">
                <span className="font-medium">Rush Request:</span> $
                {settings.rushPrice}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Request Queue</h2>
        <DataTable columns={columns} data={requests} />
      </Card>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .p-8 > *:not(:nth-child(2)) {
            display: none;
          }
          .p-8, [data-qr-code] * {
            visibility: visible;
          }
          [data-qr-code] {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
}