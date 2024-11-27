
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateEditor } from "@/components/leads/template-editor";
import { TemplateList } from "@/components/leads/template-list";
import { PlusCircle } from "lucide-react";

export default function TemplatesPage() {
  const [selectedTab, setSelectedTab] = useState("email");
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Communication Templates</h1>
          <p className="text-muted-foreground mt-2">
            Manage your email and SMS templates for different pipeline stages
          </p>
        </div>
        <Button onClick={() => setShowEditor(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <Card className="p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="email">Email Templates</TabsTrigger>
            <TabsTrigger value="sms">SMS Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <TemplateList type="email" />
          </TabsContent>
          <TabsContent value="sms">
            <TemplateList type="sms" />
          </TabsContent>
        </Tabs>
      </Card>

      <TemplateEditor
        open={showEditor}
        onOpenChange={setShowEditor}
        type={selectedTab}
      />
    </div>
  );
}
