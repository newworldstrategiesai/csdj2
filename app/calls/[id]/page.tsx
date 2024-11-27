
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoiceService } from "@/lib/services/voice-service";
import { formatDate } from "@/lib/utils";
import { Download, Play } from "lucide-react";

export default function CallDetailsPage() {
  const params = useParams();
  const [call, setCall] = useState<any>(null);
  const [transcription, setTranscription] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCallDetails = async () => {
      try {
        // In a real app, this would fetch from an API
        const mockCall = {
          id: params.id,
          phoneNumber: "+1234567890",
          direction: "inbound",
          status: "completed",
          duration: 120,
          recordingUrl: "https://example.com/recording.mp3",
          createdAt: new Date(),
        };
        setCall(mockCall);

        const transcription = await VoiceService.getCallTranscription(params.id as string);
        setTranscription(transcription);
      } catch (error) {
        console.error("Error loading call details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCallDetails();
  }, [params.id]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!call) {
    return <div className="p-8">Call not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Call Details</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Call Information</h2>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Phone Number</dt>
              <dd>{call.phoneNumber}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Direction</dt>
              <dd className="capitalize">{call.direction}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Duration</dt>
              <dd>{call.duration} seconds</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Date</dt>
              <dd>{formatDate(call.createdAt)}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recording</h2>
          {call.recordingUrl ? (
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Play Recording
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground">No recording available</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Transcription</h2>
          {transcription ? (
            <div className="prose prose-sm max-w-none">
              <p>{transcription}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No transcription available</p>
          )}
        </Card>
      </div>
    </div>
  );
}