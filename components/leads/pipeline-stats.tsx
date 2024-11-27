"use client";

import { Card } from "@/components/ui/card";
import { type Lead } from "@/lib/types";

interface PipelineStatsProps {
  leads: Lead[];
}

export function PipelineStats({ leads }: PipelineStatsProps) {
  const totalLeads = leads.length;
  const activeLeads = leads.filter((lead) => lead.status === "Active").length;
  const wonLeads = leads.filter((lead) => lead.status === "Won").length;
  const lostLeads = leads.filter((lead) => lead.status === "Lost").length;

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <Card className="p-4">
        <div className="text-sm font-medium text-muted-foreground">
          Total Leads
        </div>
        <div className="text-2xl font-bold">{totalLeads}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium text-muted-foreground">
          Active Leads
        </div>
        <div className="text-2xl font-bold">{activeLeads}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium text-muted-foreground">Won</div>
        <div className="text-2xl font-bold">{wonLeads}</div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-medium text-muted-foreground">Lost</div>
        <div className="text-2xl font-bold">{lostLeads}</div>
      </Card>
    </div>
  );
}