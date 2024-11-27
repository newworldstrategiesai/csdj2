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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { type AutomationRule } from "@/lib/types";

interface AutomationRuleEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (rule: AutomationRule) => void;
  initialRule?: AutomationRule | null;
}

export function AutomationRuleEditor({
  open,
  onOpenChange,
  onSave,
  initialRule,
}: AutomationRuleEditorProps) {
  const [formData, setFormData] = useState<Partial<AutomationRule>>(
    initialRule || {
      name: "",
      description: "",
      trigger: {
        type: "stage_change",
        stage: "",
      },
      conditions: [],
      actions: [],
      enabled: true,
    }
  );

  const handleAddAction = () => {
    setFormData((prev) => ({
      ...prev,
      actions: [
        ...(prev.actions || []),
        {
          type: "send_email",
          template: "",
          delay: 0,
        },
      ],
    }));
  };

  const handleRemoveAction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      actions: prev.actions?.filter((_, i) => i !== index),
    }));
  };

  const handleActionChange = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      actions: prev.actions?.map((action, i) =>
        i === index ? { ...action, [field]: value } : action
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.trigger && formData.actions?.length) {
      onSave({
        ...formData,
        id: initialRule?.id || crypto.randomUUID(),
        createdAt: initialRule?.createdAt || new Date(),
        updatedAt: new Date(),
      } as AutomationRule);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialRule ? "Edit" : "Create"} Automation Rule
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Rule Name</Label>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Trigger</Label>
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={formData.trigger?.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    trigger: { ...prev.trigger!, type: value as any },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select trigger type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stage_change">Stage Change</SelectItem>
                  <SelectItem value="communication_received">
                    Communication Received
                  </SelectItem>
                  <SelectItem value="task_completed">Task Completed</SelectItem>
                </SelectContent>
              </Select>

              {formData.trigger?.type === "stage_change" && (
                <Select
                  value={formData.trigger.stage}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      trigger: { ...prev.trigger!, stage: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New Lead</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Meeting Scheduled">
                      Meeting Scheduled
                    </SelectItem>
                    <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                    <SelectItem value="Contract Sent">Contract Sent</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Actions</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddAction}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Action
              </Button>
            </div>
            <div className="space-y-4">
              {formData.actions?.map((action, index) => (
                <div
                  key={index}
                  className="flex items-end gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label>Action Type</Label>
                      <Select
                        value={action.type}
                        onValueChange={(value) =>
                          handleActionChange(index, "type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="send_email">Send Email</SelectItem>
                          <SelectItem value="send_sms">Send SMS</SelectItem>
                          <SelectItem value="create_task">Create Task</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Template</Label>
                      <Select
                        value={action.template}
                        onValueChange={(value) =>
                          handleActionChange(index, "template", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome</SelectItem>
                          <SelectItem value="follow_up">Follow Up</SelectItem>
                          <SelectItem value="meeting_reminder">
                            Meeting Reminder
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Delay (hours)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={action.delay}
                        onChange={(e) =>
                          handleActionChange(
                            index,
                            "delay",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveAction(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
            <Button type="submit">Save Rule</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}