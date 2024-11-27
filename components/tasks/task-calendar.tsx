"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { type Task } from "@/lib/types";

interface TaskCalendarProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  onDateSelect: (start: Date, end: Date) => void;
}

export function TaskCalendar({ tasks, onTaskClick, onDateSelect }: TaskCalendarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const calendarTasks = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    allDay: true,
    className: `priority-${task.priority} status-${task.status}`,
    extendedProps: {
      description: task.description,
      category: task.category,
      priority: task.priority,
      status: task.status,
    },
  }));

  return (
    <Card className="p-4">
      <style jsx global>{`
        .fc {
          --fc-border-color: hsl(var(--border));
          --fc-button-text-color: hsl(var(--foreground));
          --fc-button-bg-color: hsl(var(--background));
          --fc-button-border-color: hsl(var(--border));
          --fc-button-hover-bg-color: hsl(var(--accent));
          --fc-button-hover-border-color: hsl(var(--accent));
          --fc-button-active-bg-color: hsl(var(--accent));
          --fc-button-active-border-color: hsl(var(--accent));
          --fc-event-bg-color: hsl(var(--primary));
          --fc-event-border-color: hsl(var(--primary));
          --fc-today-bg-color: hsl(var(--accent) / 0.1);
        }

        .fc .fc-button {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          border-radius: var(--radius);
        }

        .fc .fc-button-primary:not(:disabled).fc-button-active,
        .fc .fc-button-primary:not(:disabled):active {
          background-color: hsl(var(--accent));
          border-color: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
        }

        .fc-event {
          cursor: pointer;
          padding: 2px 4px;
          font-size: 0.875rem;
        }

        .priority-high {
          background-color: hsl(var(--destructive) / 0.2) !important;
          border-color: hsl(var(--destructive)) !important;
          color: hsl(var(--destructive)) !important;
        }

        .priority-medium {
          background-color: hsl(var(--warning) / 0.2) !important;
          border-color: hsl(var(--warning)) !important;
          color: hsl(var(--warning)) !important;
        }

        .priority-low {
          background-color: hsl(var(--success) / 0.2) !important;
          border-color: hsl(var(--success)) !important;
          color: hsl(var(--success)) !important;
        }

        .status-completed {
          opacity: 0.6;
          text-decoration: line-through;
        }
      `}</style>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={calendarTasks}
        eventClick={(info) => onTaskClick(info.event.id)}
        selectable={true}
        select={(info) => onDateSelect(info.start, info.end)}
        height="auto"
        aspectRatio={1.8}
      />
    </Card>
  );
}