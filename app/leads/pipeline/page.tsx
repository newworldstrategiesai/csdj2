"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import { LeadCard } from "@/components/leads/lead-card";
import { QuickActions } from "@/components/leads/quick-actions";
import { PipelineStats } from "@/components/leads/pipeline-stats";
import { useToast } from "@/hooks/use-toast";
import { PipelineService } from "@/lib/services/pipeline-service";
import { type Lead, type LeadStage } from "@/lib/types";

const STAGES: LeadStage[] = [
  "New",
  "Contacted",
  "Meeting Scheduled",
  "Proposal Sent",
  "Contract Sent",
  "Contract Signed",
  "Deposit Paid",
  "Lost",
];

// Mock data
const mockLeads: Lead[] = [
  {
    id: "1",
    clientId: "1",
    stage: "New",
    source: "Email",
    status: "Active",
    notes: ["Initial inquiry about wedding DJ services"],
    nextAction: {
      type: "Call",
      dueDate: new Date("2024-06-01"),
      description: "Follow up on wedding inquiry",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function PipelinePage() {
  const [leads, setLeads] = useState(mockLeads);
  const { toast } = useToast();

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newStage = STAGES[parseInt(destination.droppableId)];
    const leadId = result.draggableId;

    try {
      // Update lead stage in the pipeline service
      await PipelineService.moveToStage(leadId, newStage);

      // Update local state
      const updatedLeads = leads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              stage: newStage,
              updatedAt: new Date(),
            }
          : lead
      );

      setLeads(updatedLeads);

      toast({
        title: "Lead Updated",
        description: `Lead moved to ${newStage} stage`,
      });
    } catch (error) {
      console.error("Error updating lead stage:", error);
      toast({
        title: "Error",
        description: "Failed to update lead stage",
        variant: "destructive",
      });
    }
  };

  const getLeadsByStage = (stage: LeadStage) =>
    leads.filter((lead) => lead.stage === stage);

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pipeline</h1>
          <p className="text-muted-foreground mt-2">
            Manage your leads through different stages
          </p>
        </div>
        <QuickActions />
      </div>

      <PipelineStats leads={leads} />

      <div className="mt-8">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-4 gap-4 overflow-x-auto">
            {STAGES.map((stage, index) => (
              <Droppable key={stage} droppableId={index.toString()}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[500px]"
                  >
                    <Card className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">{stage}</h3>
                        <span className="text-sm text-muted-foreground">
                          {getLeadsByStage(stage).length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {getLeadsByStage(stage).map((lead, index) => (
                          <Draggable
                            key={lead.id}
                            draggableId={lead.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <LeadCard lead={lead} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </Card>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}