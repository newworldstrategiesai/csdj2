"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/leads/lead-form";
import { LeadSummary } from "@/components/leads/lead-summary";
import type { Client, Event } from "@/lib/types";

export default function NewLeadPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    client: Partial<Client>;
    event: Partial<Event>;
  }>({
    client: {},
    event: {
      status: "Lead",
    },
  });

  const handleSubmit = async (data: {
    client: Partial<Client>;
    event: Partial<Event>;
  }) => {
    setFormData(data);
    setStep(2);
  };

  const handleConfirm = async () => {
    try {
      // In a real app, this would make API calls to create the client and event
      console.log("Creating new lead:", formData);
      router.push("/events");
    } catch (error) {
      console.error("Error creating lead:", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Lead</h1>
        <p className="text-muted-foreground mt-2">
          Create a new lead by entering client and event details
        </p>
      </div>

      <Card className="p-6">
        {step === 1 ? (
          <LeadForm onSubmit={handleSubmit} initialData={formData} />
        ) : (
          <LeadSummary
            data={formData}
            onEdit={() => setStep(1)}
            onConfirm={handleConfirm}
          />
        )}
      </Card>
    </div>
  );
}