"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { VoicePreview } from "@/components/voice/voice-preview";
import { useToast } from "@/hooks/use-toast";
import { Phone, User, VoicemailIcon } from "lucide-react";
import { parsePhoneNumber } from "libphonenumber-js";

export default function DialerPage() {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [useCustomVoice, setUseCustomVoice] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState("");
  const [firstMessage, setFirstMessage] = useState(
    "Hello, this is M10 DJ Company. How can I assist you with your event today?"
  );
  const [calling, setCalling] = useState(false);

  const handlePhoneNumberChange = (value: string) => {
    try {
      const phoneNumber = parsePhoneNumber(value, "US");
      if (phoneNumber) {
        setPhoneNumber(phoneNumber.format("E.164"));
      } else {
        setPhoneNumber(value);
      }
    } catch (error) {
      setPhoneNumber(value);
    }
  };

  const handleCall = async () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a phone number",
        variant: "destructive",
      });
      return;
    }

    setCalling(true);
    try {
      const response = await fetch("/api/calls/make", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          voiceId: useCustomVoice ? selectedVoiceId : undefined,
          firstMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate call");
      }

      toast({
        title: "Call Initiated",
        description: `Calling ${phoneNumber}...`,
      });
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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dialer</h1>
        <p className="text-muted-foreground mt-2">
          Make outbound calls with AI voice assistance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  id="phoneNumber"
                  placeholder="+1234567890"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {/* Open contacts */}}
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Use Custom Voice</Label>
                <p className="text-sm text-muted-foreground">
                  Enable ElevenLabs voice synthesis
                </p>
              </div>
              <Switch
                checked={useCustomVoice}
                onCheckedChange={setUseCustomVoice}
              />
            </div>

            {useCustomVoice && (
              <div className="space-y-2">
                <Label htmlFor="voiceId">Voice ID</Label>
                <Input
                  id="voiceId"
                  value={selectedVoiceId}
                  onChange={(e) => setSelectedVoiceId(e.target.value)}
                  placeholder="Enter ElevenLabs Voice ID"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="firstMessage">First Message</Label>
              <Textarea
                id="firstMessage"
                value={firstMessage}
                onChange={(e) => setFirstMessage(e.target.value)}
                rows={3}
              />
              {useCustomVoice && selectedVoiceId && (
                <VoicePreview
                  text={firstMessage}
                  voiceId={selectedVoiceId}
                />
              )}
            </div>

            <Button
              className="w-full"
              onClick={handleCall}
              disabled={calling}
            >
              <Phone className="mr-2 h-4 w-4" />
              {calling ? "Calling..." : "Make Call"}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Calls</h2>
              <Button variant="outline" size="sm">
                <VoicemailIcon className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {/* Recent calls will be displayed here */}
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent calls
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}