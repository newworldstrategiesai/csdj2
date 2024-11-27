"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailTemplateEditor } from "@/components/emails/email-template-editor";
import { EmailPreview } from "@/components/emails/email-preview";
import { type ColumnDef } from "@tanstack/react-table";
import { type Communication } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Mail, Reply, Star, Archive, Trash2 } from "lucide-react";

const columns: ColumnDef<Communication>[] = [
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.starred && <Star className="h-4 w-4 text-yellow-500" />}
        <span>{row.getValue("subject") || "No Subject"}</span>
      </div>
    ),
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate">{row.getValue("content")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
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
    ),
  },
];

const mockEmails: Communication[] = [
  {
    id: "1",
    type: "Email",
    clientId: "1",
    subject: "Wedding DJ Inquiry",
    from: "john@example.com",
    content: "Hi, I'm interested in booking a DJ for my wedding on June 15th at Grand Hotel.",
    parsed: {
      eventType: "Wedding",
      eventDate: "2024-06-15",
      location: "Grand Hotel",
    },
    starred: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    type: "Email",
    clientId: "2",
    subject: "Corporate Event",
    from: "sarah@company.com",
    content: "Looking for a DJ for our annual company party.",
    parsed: {
      eventType: "Corporate",
      eventDate: "2024-07-01",
    },
    starred: false,
    createdAt: new Date(),
  },
];

export default function EmailsPage() {
  const [emails] = useState<Communication[]>(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Communication | null>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Email Management</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your email communications
          </p>
        </div>
        <Button onClick={() => setShowTemplateEditor(true)}>
          <Mail className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1 p-4">
              <DataTable
                columns={columns}
                data={emails}
                onRowClick={(row) => setSelectedEmail(row.original)}
              />
            </Card>

            <Card className="md:col-span-2 p-4">
              {selectedEmail ? (
                <EmailPreview email={selectedEmail} />
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                  <Mail className="h-12 w-12 mb-4" />
                  <p>Select an email to view</p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <Card className="p-4">
            <DataTable columns={columns} data={[]} />
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="p-4">
            <EmailTemplateEditor
              open={showTemplateEditor}
              onOpenChange={setShowTemplateEditor}
            />
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Email Settings</h2>
            {/* Email settings content */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}