
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";

interface VoicePreviewProps {
  text: string;
  voiceId: string;
}

export function VoicePreview({ text, voiceId }: VoicePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    try {
      if (isPlaying && audio) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        return;
      }

      // In a real app, this would call the ElevenLabs API
      const audioUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      
      newAudio.onended = () => {
        setIsPlaying(false);
      };

      await newAudio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePlay}
        disabled={!voiceId}
      >
        {isPlaying ? (
          <Square className="h-4 w-4 mr-2" />
        ) : (
          <Play className="h-4 w-4 mr-2" />
        )}
        {isPlaying ? "Stop" : "Preview Voice"}
      </Button>
      {!voiceId && (
        <p className="text-sm text-muted-foreground">
          Enter a Voice ID to preview
        </p>
      )}
    </div>
  );
}
