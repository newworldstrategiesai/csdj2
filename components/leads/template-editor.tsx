
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

interface TemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "email" | "sms";
}

export function TemplateEditor({
  open,
  onOpenChange,
  type,
}: TemplateEditorProps) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    stage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save template
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Create New {type === "email" ? "Email" : "SMS"} Template
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
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
            <Label htmlFor="stage">Pipeline Stage</Label>
            <Select
              value={formData.stage}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, stage: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Lead</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="meeting">Meeting Scheduled</SelectItem>
                <SelectItem value="proposal">Proposal Sent</SelectItem>
                <SelectItem value="contract">Contract Sent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={8}
              required
            />
            <p className="text-sm text-muted-foreground">
              Available variables: {"{clientName}"}, {"{eventDate}"},
              {"{eventType}"}, {"{venue}"}
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Template</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}