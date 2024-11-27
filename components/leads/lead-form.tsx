"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EVENT_TYPES } from "@/lib/parsers/event-type-parser";
import { MUSIC_GENRES } from "@/lib/parsers/music-preferences-parser";
import type { Client, Event } from "@/lib/types";

interface LeadFormProps {
  onSubmit: (data: { client: Partial<Client>; event: Partial<Event> }) => void;
  initialData?: { client: Partial<Client>; event: Partial<Event> };
}

export function LeadForm({ onSubmit, initialData }: LeadFormProps) {
  const [formData, setFormData] = useState({
    client: {
      name: initialData?.client.name || "",
      email: initialData?.client.email || "",
      phone: initialData?.client.phone || "",
      musicPreferences: initialData?.client.musicPreferences || [],
    },
    event: {
      type: initialData?.event.type || "",
      date: initialData?.event.date
        ? new Date(initialData.event.date).toISOString().split("T")[0]
        : "",
      location: initialData?.event.location || "",
      notes: initialData?.event.notes || "",
      status: "Lead",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      client: formData.client,
      event: {
        ...formData.event,
        date: formData.event.date ? new Date(formData.event.date) : new Date(),
      },
    });
  };

  const handleClientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      client: { ...prev.client, [name]: value },
    }));
  };

  const handleEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      event: { ...prev.event, [name]: value },
    }));
  };

  const handleEventTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      event: { ...prev.event, type: value },
    }));
  };

  const handleMusicPreferencesChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      client: {
        ...prev.client,
        musicPreferences: prev.client.musicPreferences?.includes(value)
          ? prev.client.musicPreferences.filter((genre) => genre !== value)
          : [...(prev.client.musicPreferences || []), value],
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Client Information</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.client.name}
                onChange={handleClientChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.client.email}
                onChange={handleClientChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.client.phone}
              onChange={handleClientChange}
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Event Details</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select
                value={formData.event.type}
                onValueChange={handleEventTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.event.date}
                onChange={handleEventChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Venue / Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.event.location}
              onChange={handleEventChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Music Preferences</Label>
            <div className="grid grid-cols-3 gap-2">
              {MUSIC_GENRES.map((genre) => (
                <Button
                  key={genre}
                  type="button"
                  variant={
                    formData.client.musicPreferences?.includes(genre)
                      ? "default"
                      : "outline"
                  }
                  className="justify-start"
                  onClick={() => handleMusicPreferencesChange(genre)}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.event.notes}
              onChange={handleEventChange}
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Review Details</Button>
      </div>
    </form>
  );
}