```typescript
interface Task {
  id: string;
  leadId: string;
  template: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TaskTemplate {
  description: string;
  defaultDelay: number; // hours
}

const TASK_TEMPLATES: Record<string, TaskTemplate> = {
  'follow_up_call': {
    description: 'Schedule follow-up call with lead',
    defaultDelay: 24,
  },
  'send_proposal': {
    description: 'Prepare and send proposal',
    defaultDelay: 48,
  },
  'contract_reminder': {
    description: 'Follow up on contract status',
    defaultDelay: 72,
  },
};

export class TaskService {
  private static tasks: Task[] = [];

  static async createTask(params: {
    leadId: string;
    template: string;
    dueDate: Date;
  }): Promise<Task> {
    const template = TASK_TEMPLATES[params.template];
    if (!template) {
      throw new Error(`Unknown task template: ${params.template}`);
    }

    const task: Task = {
      id: crypto.randomUUID(),
      leadId: params.leadId,
      template: params.template,
      description: template.description,
      dueDate: params.dueDate,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In a real app, this would save to the database
    this.tasks.push(task);

    return task;
  }

  static async completeTask(taskId: string): Promise<Task> {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    task.completed = true;
    task.updatedAt = new Date();

    return task;
  }

  static async getTasksForLead(leadId: string): Promise<Task[]> {
    return this.tasks.filter(task => task.leadId === leadId);
  }

  static async getDueTasks(): Promise<Task[]> {
    const now = new Date();
    return this.tasks.filter(
      task => !task.completed && task.dueDate <= now
    );
  }
}
```