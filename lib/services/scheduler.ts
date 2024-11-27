```typescript
type ScheduledJob = {
  id: string;
  type: string;
  data: any;
  executeAt: Date;
  executed: boolean;
};

export class Scheduler {
  private static jobs: ScheduledJob[] = [];
  private static interval: NodeJS.Timer | null = null;

  static initialize() {
    // Check for due jobs every minute
    this.interval = setInterval(() => {
      this.processDueJobs();
    }, 60 * 1000);
  }

  static async scheduleJob(params: {
    type: string;
    data: any;
    executeAt: Date;
  }): Promise<string> {
    const job: ScheduledJob = {
      id: crypto.randomUUID(),
      type: params.type,
      data: params.data,
      executeAt: params.executeAt,
      executed: false,
    };

    this.jobs.push(job);
    return job.id;
  }

  static async cancelJob(jobId: string): Promise<void> {
    this.jobs = this.jobs.filter(job => job.id !== jobId);
  }

  private static async processDueJobs() {
    const now = new Date();
    const dueJobs = this.jobs.filter(
      job => !job.executed && job.executeAt <= now
    );

    for (const job of dueJobs) {
      try {
        await this.executeJob(job);
        job.executed = true;
      } catch (error) {
        console.error(`Error executing job ${job.id}:`, error);
      }
    }

    // Clean up executed jobs older than 24 hours
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    this.jobs = this.jobs.filter(
      job => !job.executed || job.executeAt > yesterday
    );
  }

  private static async executeJob(job: ScheduledJob): Promise<void> {
    switch (job.type) {
      case 'send_email':
        // Execute email job
        break;
      case 'send_sms':
        // Execute SMS job
        break;
      case 'create_task':
        // Execute task creation
        break;
      default:
        throw new Error(`Unknown job type: ${job.type}`);
    }
  }

  static cleanup() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
```