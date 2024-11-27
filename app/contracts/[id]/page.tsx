"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContractSigning } from "@/components/contracts/contract-signing";
import { ContractStatusBadge } from "@/components/contracts/contract-status-badge";
import { ContractActions } from "@/components/contracts/contract-actions";
import { DEFAULT_CONTRACT_TEMPLATE } from "@/lib/contracts/default-template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractService } from "@/lib/services/contract-service";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { Contract } from "@/lib/types";

export async function generateStaticParams() {
  // In a real app, this would fetch all contract IDs from the database
  return [{ id: "1" }];
}

// Mock data - In a real app, this would come from an API
const mockContract: Contract = {
  id: "1",
  eventId: "1",
  clientId: "1",
  status: "Draft",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockContractData = {
  clientName: "John Doe",
  eventName: "Summer Wedding",
  eventType: "Wedding",
  eventDate: "2024-06-15",
  startTime: "16:00",
  endTime: "23:00",
  venueName: "Grand Hotel",
  venueAddress: "123 Main St, City, State",
  totalAmount: 2500,
  retainerAmount: 500,
  remainingBalance: 2000,
  paymentDueDate: "2024-05-15",
};

export default function ContractPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [showSigning, setShowSigning] = useState(false);
  const [contract, setContract] = useState(mockContract);
  const { toast } = useToast();

  const handleSign = async (signature: string) => {
    try {
      const signedContract = await ContractService.signContract(params.id, signature);
      setContract(signedContract);
      toast({
        title: "Success",
        description: "Contract signed successfully",
      });
      router.push("/contracts");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign contract",
        variant: "destructive",
      });
    }
  };

  const handleContractSent = () => {
    setContract((prev) => ({
      ...prev,
      status: "Sent",
    }));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Contract Details</h1>
          <div className="flex items-center space-x-2">
            <ContractStatusBadge status={contract.status} />
            <span className="text-sm text-muted-foreground">
              Created {formatDate(contract.createdAt)}
            </span>
          </div>
        </div>
        <ContractActions
          contract={contract}
          contractData={mockContractData}
          onContractSent={handleContractSent}
          onShowSigning={() => setShowSigning(true)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Event Name</div>
              <div>{mockContractData.eventName}</div>
              <div className="font-medium">Event Type</div>
              <div>{mockContractData.eventType}</div>
              <div className="font-medium">Date</div>
              <div>{formatDate(mockContractData.eventDate)}</div>
              <div className="font-medium">Time</div>
              <div>{`${mockContractData.startTime} - ${mockContractData.endTime}`}</div>
              <div className="font-medium">Venue</div>
              <div>{mockContractData.venueName}</div>
              <div className="font-medium">Address</div>
              <div>{mockContractData.venueAddress}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Total Amount</div>
              <div>${mockContractData.totalAmount.toLocaleString()}</div>
              <div className="font-medium">Retainer</div>
              <div>${mockContractData.retainerAmount.toLocaleString()}</div>
              <div className="font-medium">Remaining Balance</div>
              <div>${mockContractData.remainingBalance.toLocaleString()}</div>
              <div className="font-medium">Due Date</div>
              <div>{formatDate(mockContractData.paymentDueDate)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ContractSigning
        open={showSigning}
        onOpenChange={setShowSigning}
        contractData={mockContractData}
        onSign={handleSign}
        template={DEFAULT_CONTRACT_TEMPLATE}
      />
    </div>
  );
}