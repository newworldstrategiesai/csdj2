"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { type Lead } from "@/lib/types";

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{lead.source}</span>
          <span className="text-xs text-muted-foreground">
            {formatDate(lead.createdAt)}
          </span>
        </div>
        <div className="space-y-1">
          {lead.notes.map((note, index) => (
            <p key={index} className="text-sm">
              {note}
            </p>
          ))}
        </div>
        {lead.nextAction && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>
              {lead.nextAction.type} due {formatDate(lead.nextAction.dueDate)}
            </span>
          </div>
        )}
        <div className="flex justify-end space-x-2 mt-2">
          <Button variant="outline" size="sm">
            <Phone className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}