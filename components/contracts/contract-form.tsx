"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import type { ContractData } from "@/lib/contracts/contract-template";
import { ContractPreview } from "./contract-preview";
import { DEFAULT_CONTRACT_TEMPLATE } from "@/lib/contracts/default-template";

interface ContractFormProps {
  onSubmit: (data: ContractData) => void;
}

export function ContractForm({ onSubmit }: ContractFormProps) {
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<ContractData>({
    clientName: "",
    eventName: "",
    eventType: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    venueName: "",
    venueAddress: "",
    totalAmount: 0,
    retainerAmount: 0,
    remainingBalance: 0,
    paymentDueDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleConfirm = () => {
    onSubmit(formData);
    setShowPreview(false);
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "totalAmount" || name === "retainerAmount"
        ? {
            remainingBalance:
              name === "totalAmount"
                ? Number(value) - formData.retainerAmount
                : formData.totalAmount - Number(value),
          }
        : {}),
    }));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Contract
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Contract</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Input
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venueName">Venue Name</Label>
                <Input
                  id="venueName"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venueAddress">Venue Address</Label>
                <Input
                  id="venueAddress"
                  name="venueAddress"
                  value={formData.venueAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAmount">Total Amount ($)</Label>
                <Input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retainerAmount">Retainer Amount ($)</Label>
                <Input
                  id="retainerAmount"
                  name="retainerAmount"
                  type="number"
                  value={formData.retainerAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentDueDate">Payment Due Date</Label>
                <Input
                  id="paymentDueDate"
                  name="paymentDueDate"
                  type="date"
                  value={formData.paymentDueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remainingBalance">Remaining Balance ($)</Label>
                <Input
                  id="remainingBalance"
                  name="remainingBalance"
                  type="number"
                  value={formData.remainingBalance}
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Preview Contract</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ContractPreview
        open={showPreview}
        onOpenChange={setShowPreview}
        contractData={formData}
        onConfirm={handleConfirm}
        template={DEFAULT_CONTRACT_TEMPLATE}
      />
    </>
  );
}