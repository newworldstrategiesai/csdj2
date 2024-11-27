
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { TwilioService } from "@/lib/services/twilio-service";
import { useToast } from "@/hooks/use-toast";

interface VoiceCallButtonProps {
  phoneNumber: string;
  onCallInitiated?: () => void;
}

export function VoiceCallButton({ phoneNumber, onCallInitiated }: VoiceCallButtonProps) {
  const [calling, setCalling] = useState(false);
  const { toast } = useToast();

  const handleCall = async () => {
    setCalling(true);
    try {
      await TwilioService.makeCall(phoneNumber);
      toast({
        title: "Call Initiated",
        description: `Calling ${phoneNumber}...`,
      });
      onCallInitiated?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate call",
        variant: "destructive",
      });
    } finally {
      setCalling(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCall}
      disabled={calling}
    >
      <Phone className="h-4 w-4 mr-2" />
      {calling ? "Calling..." : "Call"}
    </Button>
  );
}
