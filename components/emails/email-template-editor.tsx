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

interface EmailTemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmailTemplateEditor({
  open,
  onOpenChange,
}: EmailTemplateEditorProps) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    trigger: "",
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
          <DialogTitle>Create Email Template</DialogTitle>
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
            <Label htmlFor="trigger">Trigger</Label>
            <Select
              value={formData.trigger}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, trigger: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select when to send" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new_lead">New Lead</SelectItem>
                <SelectItem value="follow_up">Follow Up</SelectItem>
                <SelectItem value="contract_sent">Contract Sent</SelectItem>
                <SelectItem value="payment_received">Payment Received</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={10}
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