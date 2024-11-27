"use client";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Reply, Star, Archive, Trash2 } from "lucide-react";
import { type Communication } from "@/lib/types";

interface EmailPreviewProps {
  email: Communication;
}

export function EmailPreview({ email }: EmailPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{email.subject}</h2>
          <p className="text-sm text-muted-foreground">
            From: {email.from} • {formatDate(email.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Star className={`h-4 w-4 ${email.starred ? "text-yellow-500" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Reply className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="prose prose-sm max-w-none dark:prose-invert">
        <p>{email.content}</p>
      </div>

      {email.parsed && (
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Extracted Information</h3>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            {email.parsed.eventType && (
              <>
                <dt className="text-muted-foreground">Event Type:</dt>
                <dd>{email.parsed.eventType}</dd>
              </>
            )}
            {email.parsed.eventDate && (
              <>
                <dt className="text-muted-foreground">Event Date:</dt>
                <dd>{formatDate(email.parsed.eventDate)}</dd>
              </>
            )}
            {email.parsed.location && (
              <>
                <dt className="text-muted-foreground">Location:</dt>
                <dd>{email.parsed.location}</dd>
              </>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}