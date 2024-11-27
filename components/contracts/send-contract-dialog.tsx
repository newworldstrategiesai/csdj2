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
import { Send } from "lucide-react";
import { EmailService } from "@/lib/services/email-service";
import type { ContractData } from "@/lib/contracts/contract-template";
import { useToast } from "@/hooks/use-toast";

interface SendContractDialogProps {
  contractId: string;
  contractData: ContractData;
  onSent: () => void;
}

export function SendContractDialog({
  contractId,
  contractData,
  onSent,
}: SendContractDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await EmailService.sendContractToClient(email, contractData, contractId);
      toast({
        title: "Contract Sent",
        description: `Contract has been sent to ${email}`,
      });
      setOpen(false);
      onSent();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send contract. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Send className="mr-2 h-4 w-4" />
          Send to Client
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Contract to Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Client Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Contract"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}