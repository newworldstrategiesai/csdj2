"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Send } from "lucide-react";
import { ContractService } from "@/lib/services/contract-service";
import { SendContractDialog } from "./send-contract-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Contract, ContractData } from "@/lib/types";

interface ContractActionsProps {
  contract: Contract;
  contractData: ContractData;
  onContractSent: () => void;
  onShowSigning: () => void;
}

export function ContractActions({
  contract,
  contractData,
  onContractSent,
  onShowSigning,
}: ContractActionsProps) {
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await ContractService.downloadContract(contract.id, contractData);
      toast({
        title: "Success",
        description: "Contract downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download contract",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={handleDownload} disabled={downloading}>
        <Download className="mr-2 h-4 w-4" />
        {downloading ? "Downloading..." : "Download PDF"}
      </Button>
      {contract.status === "Draft" && (
        <>
          <SendContractDialog
            contractId={contract.id}
            contractData={contractData}
            onSent={onContractSent}
          />
          <Button onClick={onShowSigning}>Sign Contract</Button>
        </>
      )}
    </div>
  );
}