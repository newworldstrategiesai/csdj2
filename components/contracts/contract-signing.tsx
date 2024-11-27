"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SignaturePad } from "./signature-pad";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ContractData } from "@/lib/contracts/contract-template";

interface ContractSigningProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contractData: ContractData;
  onSign: (signature: string) => void;
  template: string;
}

export function ContractSigning({
  open,
  onOpenChange,
  contractData,
  onSign,
  template,
}: ContractSigningProps) {
  const [signature, setSignature] = useState("");

  const handleSign = () => {
    if (!signature) return;
    onSign(signature);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Sign Contract</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6">
          <ScrollArea className="h-[40vh] w-full rounded-md border p-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h2>Contract Terms</h2>
              <p>
                By signing below, you agree to the terms and conditions outlined in
                this contract.
              </p>
              {/* Contract content would be displayed here */}
            </div>
          </ScrollArea>
          <div>
            <h3 className="text-lg font-semibold mb-4">Sign Here</h3>
            <SignaturePad onChange={setSignature} />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSign} disabled={!signature}>
              Sign Contract
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}