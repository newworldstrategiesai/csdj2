"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskEditor } from "@/components/tasks/task-editor";
import { TaskBoard } from "@/components/tasks/task-board";
import { TaskCalendar } from "@/components/tasks/task-calendar";
import { type ColumnDef } from "@tanstack/react-table";
import { type Task } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { PlusCircle, Calendar, ListTodo } from "lucide-react";
import { taskQueries } from "@/lib/supabase/queries/tasks";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/hooks/use-toast";

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.getValue("priority") === "high"
            ? "bg-red-100 text-red-800"
            : row.getValue("priority") === "medium"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {row.getValue("priority")}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => formatDate(row.getValue("dueDate")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.getValue("status") === "completed"
            ? "bg-green-100 text-green-800"
            : row.getValue("status") === "in_progress"
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {row.getValue("status")}
      </span>
    ),
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [view, setView] = useState<"list" | "board" | "calendar">("list");
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadTasks = async () => {
      if (!user?.id) return;

      try {
        const data = await taskQueries.getAll(user.id);
        setTasks(data.map(task => ({
          ...task,
          dueDate: new Date(task.due_date),
          createdAt: new Date(task.created_at),
          updatedAt: new Date(task.updated_at),
        })));
      } catch (error) {
        console.error("Error loading tasks:", error);
        toast({
          title: "Error",
          description: "Failed to load tasks",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user?.id, toast]);

  const handleCreateTask = async (task: Task) => {
    if (!user?.id) return;

    try {
      const newTask = await taskQueries.create({
        ...task,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setTasks(prev => [...prev, {
        ...newTask,
        dueDate: new Date(newTask.due_date),
        createdAt: new Date(newTask.created_at),
        updatedAt: new Date(newTask.updated_at),
      }]);
      setShowEditor(false);
      setEditingTask(undefined);
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await taskQueries.update(taskId, {
        ...updates,
        updated_at: new Date().toISOString(),
      });

      setTasks(prev => prev.map(task => 
        task.id === taskId ? {
          ...updatedTask,
          dueDate: new Date(updatedTask.due_date),
          createdAt: new Date(updatedTask.created_at),
          updatedAt: new Date(updatedTask.updated_at),
        } : task
      ));
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setShowEditor(true);
    }
  };

  const handleDateSelect = (start: Date, end: Date) => {
    setEditingTask(undefined);
    setShowEditor(true);
    const newTask: Partial<Task> = {
      dueDate: start,
      status: "pending",
      priority: "medium",
    };
    setEditingTask(newTask as Task);
  };

  if (loading) {
    return <div className="p-8">Loading tasks...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track your tasks and to-dos
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Tabs value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList>
              <TabsTrigger value="list">
                <ListTodo className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
              <TabsTrigger value="board">
                <ListTodo className="h-4 w-4 mr-2" />
                Board
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => {
            setEditingTask(undefined);
            setShowEditor(true);
          }}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <Card className="p-6">
        {view === "list" && <DataTable columns={columns} data={tasks} />}
        {view === "board" && (
          <TaskBoard tasks={tasks} onUpdateTask={handleUpdateTask} />
        )}
        {view === "calendar" && (
          <TaskCalendar
            tasks={tasks}
            onTaskClick={handleTaskClick}
            onDateSelect={handleDateSelect}
          />
        )}
      </Card>

      <TaskEditor
        open={showEditor}
        onOpenChange={setShowEditor}
        onSubmit={handleCreateTask}
        initialTask={editingTask}
      />
    </div>
  );
}