"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import { type Task } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface TaskBoardProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

const COLUMNS = [
  { id: "pending", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

export function TaskBoard({ tasks, onUpdateTask }: TaskBoardProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    onUpdateTask(draggableId, { status: newStatus });
  };

  const getTasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{column.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
                <div className="space-y-2">
                  {getTasksByStatus(column.id).map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{task.title}</h4>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  task.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : task.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>
                            {task.description && (
                              <p className="text-sm text-muted-foreground">
                                {task.description}
                              </p>
                            )}
                            <div className="flex justify-between items-center text-sm">
                              <span>{task.category}</span>
                              <span className="text-muted-foreground">
                                Due {formatDate(task.dueDate)}
                              </span>
                            </div>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}