```typescript
import { type AutomationRule, type Lead } from '../types';
import { EmailService } from './email-service';
import { TwilioService } from './twilio-service';
import { TaskService } from './task-service';

export class RuleEngine {
  private static rules: AutomationRule[] = [];

  static initialize(rules: AutomationRule[]) {
    this.rules = rules.filter(rule => rule.enabled);
  }

  static async evaluateRules(lead: Lead, context: Record<string, any> = {}): Promise<void> {
    try {
      const applicableRules = this.findApplicableRules(lead, context);
      
      for (const rule of applicableRules) {
        await this.executeRule(rule, lead, context);
      }
    } catch (error) {
      console.error('Error evaluating rules:', error);
      throw error;
    }
  }

  private static findApplicableRules(
    lead: Lead,
    context: Record<string, any>
  ): AutomationRule[] {
    return this.rules.filter(rule => {
      switch (rule.trigger.type) {
        case 'stage_change':
          return context.oldStage && context.newStage === rule.trigger.stage;
        case 'communication_received':
          return context.communicationType === 'email' || context.communicationType === 'sms';
        case 'task_completed':
          return context.taskId && context.taskStatus === 'completed';
        default:
          return false;
      }
    });
  }

  private static async executeRule(
    rule: AutomationRule,
    lead: Lead,
    context: Record<string, any>
  ): Promise<void> {
    for (const action of rule.actions) {
      try {
        await this.scheduleAction(action, lead, context);
      } catch (error) {
        console.error(`Error executing action for rule ${rule.id}:`, error);
      }
    }
  }

  private static async scheduleAction(
    action: AutomationRule['actions'][0],
    lead: Lead,
    context: Record<string, any>
  ): Promise<void> {
    const executeTime = new Date(Date.now() + action.delay * 60 * 60 * 1000);

    // In a real app, this would use a job queue system
    setTimeout(async () => {
      try {
        await this.executeAction(action, lead, context);
      } catch (error) {
        console.error('Error executing scheduled action:', error);
      }
    }, action.delay * 60 * 60 * 1000);

    // Log scheduled action
    console.log(`Scheduled ${action.type} for ${executeTime}`);
  }

  private static async executeAction(
    action: AutomationRule['actions'][0],
    lead: Lead,
    context: Record<string, any>
  ): Promise<void> {
    switch (action.type) {
      case 'send_email':
        await EmailService.sendTemplatedEmail(lead.clientId, action.template, {
          lead,
          context,
        });
        break;

      case 'send_sms':
        await TwilioService.sendTemplatedSMS(lead.clientId, action.template, {
          lead,
          context,
        });
        break;

      case 'create_task':
        await TaskService.createTask({
          leadId: lead.id,
          template: action.template,
          dueDate: new Date(Date.now() + action.delay * 60 * 60 * 1000),
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}
```