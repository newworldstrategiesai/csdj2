
"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit2, Trash2, Play } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { type VoiceAgent } from "@/lib/types";
import { VoicePreview } from "@/components/voice/voice-preview";

interface AgentListProps {
  agents: VoiceAgent[];
  onToggle: (agentId: string) => void;
  onDelete: (agentId: string) => void;
}

export function AgentList({ agents, onToggle, onDelete }: AgentListProps) {
  return (
    <div className="space-y-4">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="border rounded-lg p-6 space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    agent.active
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {agent.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {agent.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={agent.active}
                onCheckedChange={() => onToggle(agent.id)}
              />
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(agent.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Personality</p>
              <p className="text-muted-foreground">{agent.personality}</p>
            </div>
            <div>
              <p className="font-medium">Use Case</p>
              <p className="text-muted-foreground">{agent.useCase}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-sm">Voice Preview</p>
            <VoicePreview
              text={agent.prompts.greeting}
              voiceId={agent.voiceId}
            />
          </div>

          <div className="text-xs text-muted-foreground">
            Created {formatDate(agent.createdAt)}
            {agent.updatedAt > agent.createdAt &&
              ` • Updated ${formatDate(agent.updatedAt)}`}
          </div>
        </div>
      ))}
    </div>
  );
}