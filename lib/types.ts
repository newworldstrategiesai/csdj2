// Contact types
export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_id: string;
  email?: string;
  company?: string;
  position?: string;
  notes?: string;
  created_at: Date;
  last_contacted: Date | null;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  category: string;
  assignedTo: string;
  dueDate: Date | string;
  status: "pending" | "in_progress" | "completed";
  recurrence?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    endDate?: Date;
    daysOfWeek?: number[];
  };
  relatedTo?: {
    type: "lead" | "event" | "contract";
    id: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Add other types as needed...