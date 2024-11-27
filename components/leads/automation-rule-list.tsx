"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Edit2, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { type AutomationRule } from "@/lib/types";

interface AutomationRuleListProps {
  rules: AutomationRule[];
  onEdit: (rule: AutomationRule) => void;
  onToggle: (ruleId: string) => void;
  onDelete: (ruleId: string) => void;
}

export function AutomationRuleList({
  rules,
  onEdit,
  onToggle,
  onDelete,
}: AutomationRuleListProps) {
  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="border rounded-lg p-6 space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{rule.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    rule.enabled
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {rule.enabled ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {rule.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={rule.enabled}
                onCheckedChange={() => onToggle(rule.id)}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(rule)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(rule.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Trigger</p>
              <p className="text-muted-foreground">
                {rule.trigger.type === "stage_change"
                  ? `When lead moves to ${rule.trigger.stage} stage`
                  : rule.trigger.type === "communication_received"
                  ? "When new communication is received"
                  : "When task is completed"}
              </p>
            </div>
            <div>
              <p className="font-medium">Actions</p>
              <ul className="text-muted-foreground space-y-1">
                {rule.actions.map((action, index) => (
                  <li key={index}>
                    {action.type === "send_email"
                      ? "Send email"
                      : action.type === "send_sms"
                      ? "Send SMS"
                      : "Create task"}{" "}
                    using {action.template} template
                    {action.delay > 0 && ` after ${action.delay} hours`}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Created {formatDate(rule.createdAt)}
            {rule.updatedAt > rule.createdAt &&
              ` • Updated ${formatDate(rule.updatedAt)}`}
          </div>
        </div>
      ))}
    </div>
  );
}