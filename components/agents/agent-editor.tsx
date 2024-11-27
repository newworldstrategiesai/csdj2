
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VoicePreview } from "@/components/voice/voice-preview";
import { type VoiceAgent } from "@/lib/types";

interface AgentEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (agent: VoiceAgent) => void;
  initialAgent?: VoiceAgent;
}

export function AgentEditor({
  open,
  onOpenChange,
  onSave,
  initialAgent,
}: AgentEditorProps) {
  const [formData, setFormData] = useState<Partial<VoiceAgent>>(
    initialAgent || {
      name: "",
      description: "",
      voiceId: "",
      personality: "",
      useCase: "",
      prompts: {
        greeting: "",
        fallback: "",
        closing: "",
      },
      active: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.description &&
      formData.voiceId &&
      formData.personality &&
      formData.useCase &&
      formData.prompts
    ) {
      onSave({
        ...formData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as VoiceAgent);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Voice Agent</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voiceId">Voice ID</Label>
              <Input
                id="voiceId"
                value={formData.voiceId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, voiceId: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personality">Personality</Label>
            <Textarea
              id="personality"
              value={formData.personality}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, personality: e.target.value }))
              }
              placeholder="Describe the agent's personality traits..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="useCase">Use Case</Label>
            <Textarea
              id="useCase"
              value={formData.useCase}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, useCase: e.target.value }))
              }
              placeholder="Describe when this agent should be used..."
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Prompts</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="greeting">Greeting Message</Label>
                <Textarea
                  id="greeting"
                  value={formData.prompts?.greeting}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      prompts: {
                        ...prev.prompts!,
                        greeting: e.target.value,
                      },
                    }))
                  }
                  required
                />
                {formData.voiceId && (
                  <VoicePreview
                    text={formData.prompts?.greeting || ""}
                    voiceId={formData.voiceId}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fallback">Fallback Message</Label>
                <Textarea
                  id="fallback"
                  value={formData.prompts?.fallback}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      prompts: {
                        ...prev.prompts!,
                        fallback: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closing">Closing Message</Label>
                <Textarea
                  id="closing"
                  value={formData.prompts?.closing}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      prompts: {
                        ...prev.prompts!,
                        closing: e.target.value,
                      },
                    }))
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Agent</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
