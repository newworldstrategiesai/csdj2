"use client";

import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, Plus } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <Phone className="h-4 w-4 mr-2" />
        Make Call
      </Button>
      <Button variant="outline" size="sm">
        <Mail className="h-4 w-4 mr-2" />
        Send Email
      </Button>
      <Button variant="outline" size="sm">
        <MessageSquare className="h-4 w-4 mr-2" />
        Send SMS
      </Button>
      <Button asChild>
        <Link href="/leads/new">
          <Plus className="h-4 w-4 mr-2" />
          New Lead
        </Link>
      </Button>
    </div>
  );
}