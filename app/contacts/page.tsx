"use client";

import { useState, useEffect } from "react";
import { ContactsTable } from "@/components/contacts/contacts-table";
import { useToast } from "@/hooks/use-toast";
import { type Contact } from "@/lib/types";
import { contactQueries } from "@/lib/supabase/queries/contacts";
import { useAuth } from "@/components/auth/auth-provider";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const loadContacts = async () => {
      if (!user?.id) return;

      try {
        const data = await contactQueries.getAll(user.id);
        setContacts(data.map(contact => ({
          id: contact.id,
          first_name: contact.first_name || "",
          last_name: contact.last_name || "",
          phone: contact.phone || "",
          user_id: contact.user_id || "",
          email: contact.email_address || "",
          company: contact.company || "",
          position: contact.position || "",
          notes: contact.notes || "",
          created_at: new Date(contact.created_at || ""),
          last_contacted: contact.last_contacted ? new Date(contact.last_contacted) : null,
        })));
      } catch (error) {
        console.error("Error loading contacts:", error);
        toast({
          title: "Error",
          description: "Failed to load contacts",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [user?.id, toast]);

  // Rest of the component remains the same...
}