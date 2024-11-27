
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { AgentEditor } from "@/components/agents/agent-editor";
import { AgentList } from "@/components/agents/agent-list";
import { type VoiceAgent } from "@/lib/types";

const mockAgents: VoiceAgent[] = [
  {
    id: "1",
    name: "Sarah",
    description: "Professional and friendly DJ booking assistant",
    voiceId: "voice1",
    personality: "Professional, friendly, and helpful",
    useCase: "Initial inquiries and booking consultations",
    prompts: {
      greeting: "Hello! I'm Sarah from M10 DJ Company. How can I assist you with your event today?",
      fallback: "I apologize, but I want to make sure I understand your request correctly. Could you please rephrase that?",
      closing: "Thank you for contacting M10 DJ Company. We'll have someone reach out to discuss your event in detail.",
    },
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function AgentsPage() {
  const [agents, setAgents] = useState<VoiceAgent[]>(mockAgents);
  const [showEditor, setShowEditor] = useState(false);

  const handleSaveAgent = (agent: VoiceAgent) => {
    setAgents((prev) => [...prev, { ...agent, id: crypto.randomUUID() }]);
    setShowEditor(false);
  };

  const handleToggleAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, active: !agent.active } : agent
      )
    );
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== agentId));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Voice Agents</h1>
          <p className="text-muted-foreground mt-2">
            Configure and manage your AI voice assistants
          </p>
        </div>
        <Button onClick={() => setShowEditor(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Agent
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <AgentList
            agents={agents}
            onToggle={handleToggleAgent}
            onDelete={handleDeleteAgent}
          />
        </Card>
      </div>

      <AgentEditor
        open={showEditor}
        onOpenChange={setShowEditor}
        onSave={handleSaveAgent}
      />
    </div>
  );
}