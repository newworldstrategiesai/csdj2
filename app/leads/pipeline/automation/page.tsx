"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { AutomationRuleEditor } from "@/components/leads/automation-rule-editor";
import { AutomationRuleList } from "@/components/leads/automation-rule-list";
import { type AutomationRule } from "@/lib/types";

const mockRules: AutomationRule[] = [
  {
    id: "1",
    name: "New Lead Follow-up",
    description: "Automatically send welcome email and schedule follow-up task",
    trigger: {
      type: "stage_change",
      stage: "New",
    },
    actions: [
      {
        type: "send_email",
        template: "welcome",
        delay: 0,
      },
      {
        type: "create_task",
        template: "follow_up_call",
        delay: 24,
      },
    ],
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Contract Sent Reminder",
    description: "Send reminder if contract not signed within 48 hours",
    trigger: {
      type: "stage_change",
      stage: "Contract Sent",
    },
    conditions: [
      {
        field: "contract.status",
        operator: "equals",
        value: "sent",
      },
    ],
    actions: [
      {
        type: "send_email",
        template: "contract_reminder",
        delay: 48,
      },
      {
        type: "send_sms",
        template: "contract_reminder",
        delay: 72,
      },
    ],
    enabled: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function AutomationPage() {
  const [rules, setRules] = useState<AutomationRule[]>(mockRules);
  const [showEditor, setShowEditor] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);

  const handleSaveRule = (rule: AutomationRule) => {
    if (editingRule) {
      setRules((prev) =>
        prev.map((r) => (r.id === editingRule.id ? rule : r))
      );
    } else {
      setRules((prev) => [...prev, { ...rule, id: crypto.randomUUID() }]);
    }
    setShowEditor(false);
    setEditingRule(null);
  };

  const handleEditRule = (rule: AutomationRule) => {
    setEditingRule(rule);
    setShowEditor(true);
  };

  const handleToggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== ruleId));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Automation Rules</h1>
          <p className="text-muted-foreground mt-2">
            Configure automated actions based on pipeline events
          </p>
        </div>
        <Button onClick={() => setShowEditor(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Rule
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <AutomationRuleList
            rules={rules}
            onEdit={handleEditRule}
            onToggle={handleToggleRule}
            onDelete={handleDeleteRule}
          />
        </Card>
      </div>

      <AutomationRuleEditor
        open={showEditor}
        onOpenChange={(open) => {
          setShowEditor(open);
          if (!open) setEditingRule(null);
        }}
        onSave={handleSaveRule}
        initialRule={editingRule}
      />
    </div>
  );
}