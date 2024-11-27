"use client";

import { marked } from "marked";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ContractData } from "@/lib/contracts/contract-template";
import { ContractPDF } from "./contract-pdf";

interface ContractPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contractData: ContractData;
  onConfirm: () => void;
  template: string;
}

export function ContractPreview({
  open,
  onOpenChange,
  contractData,
  onConfirm,
  template,
}: ContractPreviewProps) {
  const content = template
    .replace("[Client's Full Name]", contractData.clientName)
    .replace("[Event Name]", contractData.eventName)
    .replace("[Event Type]", contractData.eventType)
    .replace("[Event Date]", new Date(contractData.eventDate).toLocaleDateString())
    .replace("[Start Time]", contractData.startTime)
    .replace("[End Time]", contractData.endTime)
    .replace("[Venue Name]", contractData.venueName)
    .replace("[Venue Address]", contractData.venueAddress)
    .replace("[Total Amount]", contractData.totalAmount.toLocaleString())
    .replace("[Retainer Amount]", contractData.retainerAmount.toLocaleString())
    .replace("[Remaining Balance]", contractData.remainingBalance.toLocaleString())
    .replace("[Payment Due Date]", new Date(contractData.paymentDueDate).toLocaleDateString())
    .replace("[Effective Date]", new Date().toLocaleDateString());

  const htmlContent = marked(content);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Contract Preview</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="preview" className="w-full h-[70vh]">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="h-full">
            <ScrollArea className="h-full w-full rounded-md border p-6">
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="pdf" className="h-full">
            <div className="h-full w-full rounded-md border">
              <ContractPDF data={contractData} />
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Edit
          </Button>
          <Button onClick={onConfirm}>Create Contract</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}