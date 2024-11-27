```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface TemplateListProps {
  type: "email" | "sms";
}

// Mock data
const mockTemplates = {
  email: [
    {
      id: "1",
      name: "Welcome Email",
      subject: "Welcome to M10 DJ Company",
      stage: "New Lead",
      lastModified: "2024-03-15",
    },
    {
      id: "2",
      name: "Follow-up Email",
      subject: "Following up on your DJ inquiry",
      stage: "Contacted",
      lastModified: "2024-03-14",
    },
  ],
  sms: [
    {
      id: "1",
      name: "Welcome SMS",
      stage: "New Lead",
      lastModified: "2024-03-15",
    },
    {
      id: "2",
      name: "Meeting Reminder",
      stage: "Meeting Scheduled",
      lastModified: "2024-03-14",
    },
  ],
};

export function TemplateList({ type }: TemplateListProps) {
  const templates = mockTemplates[type];

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="space-y-1">
            <p className="font-medium">{template.name}</p>
            {type === "email" && (
              <p className="text-sm text-muted-foreground">
                Subject: {template.subject}
              </p>
            )}
            <div className="flex items-center gap-2">
              <span className="text-xs bg-secondary px-2 py-1 rounded">
                {template.stage}
              </span>
              <span className="text-xs text-muted-foreground">
                Last modified: {template.lastModified}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
```