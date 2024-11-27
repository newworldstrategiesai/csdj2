import { type Lead, type AutomationRule, type LeadStage } from '../types';
import { EmailService } from './email-service';
import { TwilioService } from './twilio-service';
import { TaskService } from './task-service';
import { PipelineService } from './pipeline-service';

export class AutomationService {
  private static rules: AutomationRule[] = [];

  static initialize(rules: AutomationRule[]) {
    this.rules = rules.filter(rule => rule.enabled);
  }

  static async handleStageChange(
    leadId: string,
    fromStage: LeadStage,
    toStage: LeadStage
  ): Promise<void> {
    try {
      const lead = await PipelineService.getLead(leadId);
      const applicableRules = this.findApplicableRules(lead, {
        type: 'stage_change',
        fromStage,
        toStage,
      });

      for (const rule of applicableRules) {
        await this.executeRule(rule, lead);
      }
    } catch (error) {
      console.error('Error handling stage change:', error);
      throw error;
    }
  }

  static async handleIncomingCommunication(
    type: 'Email' | 'SMS' | 'Call',
    content: string,
    metadata: Record<string, any>
  ): Promise<void> {
    try {
      // Extract event details from communication
      const eventDetails = await this.extractEventDetails(content);

      // Create or update lead
      const lead = await this.processLeadFromCommunication(type, eventDetails, metadata);

      // Find and execute applicable rules
      const applicableRules = this.findApplicableRules(lead, {
        type: 'communication_received',
        communicationType: type,
      });

      for (const rule of applicableRules) {
        await this.executeRule(rule, lead);
      }
    } catch (error) {
      console.error('Error handling incoming communication:', error);
      throw error;
    }
  }

  static async extractEventDetails(content: string): Promise<Record<string, any>> {
    // In a real app, this would use NLP to extract event details
    const details: Record<string, any> = {};

    // Simple regex patterns for demonstration
    const datePattern = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/;
    const eventTypePattern = /\b(wedding|birthday|corporate|party)\b/i;

    const dateMatch = content.match(datePattern);
    if (dateMatch) {
      details.eventDate = new Date(dateMatch[0]);
    }

    const eventTypeMatch = content.match(eventTypePattern);
    if (eventTypeMatch) {
      details.eventType = eventTypeMatch[0].charAt(0).toUpperCase() + 
                         eventTypeMatch[0].slice(1).toLowerCase();
    }

    return details;
  }

  private static async processLeadFromCommunication(
    type: 'Email' | 'SMS' | 'Call',
    eventDetails: Record<string, any>,
    metadata: Record<string, any>
  ): Promise<Lead> {
    // In a real app, this would create or update a lead in the database
    const lead: Lead = {
      id: crypto.randomUUID(),
      clientId: metadata.from || metadata.phoneNumber,
      stage: 'New',
      source: type,
      status: 'Active',
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return lead;
  }

  private static findApplicableRules(
    lead: Lead,
    context: Record<string, any>
  ): AutomationRule[] {
    return this.rules.filter(rule => {
      // Check trigger type
      if (rule.trigger.type !== context.type) {
        return false;
      }

      // Check stage for stage_change triggers
      if (rule.trigger.type === 'stage_change' && 
          rule.trigger.stage !== context.toStage) {
        return false;
      }

      // Check conditions if they exist
      if (rule.conditions && rule.conditions.length > 0) {
        return this.evaluateConditions(rule.conditions, lead, context);
      }

      return true;
    });
  }

  private static evaluateConditions(
    conditions: AutomationRule['conditions'],
    lead: Lead,
    context: Record<string, any>
  ): boolean {
    if (!conditions) return true;

    return conditions.every(condition => {
      const value = this.getFieldValue(condition.field, lead, context);

      switch (condition.operator) {
        case 'equals':
          return value === condition.value;
        case 'contains':
          return typeof value === 'string' && 
                 value.toLowerCase().includes(String(condition.value).toLowerCase());
        case 'greater_than':
          return typeof value === 'number' && value > Number(condition.value);
        case 'less_than':
          return typeof value === 'number' && value < Number(condition.value);
        default:
          return false;
      }
    });
  }

  private static getFieldValue(
    field: string,
    lead: Lead,
    context: Record<string, any>
  ): any {
    const parts = field.split('.');
    let value: any = { ...lead, ...context };

    for (const part of parts) {
      if (value && typeof value === 'object') {
        value = value[part];
      } else {
        return undefined;
      }
    }

    return value;
  }

  private static async executeRule(
    rule: AutomationRule,
    lead: Lead
  ): Promise<void> {
    for (const action of rule.actions) {
      try {
        await this.scheduleAction(action, lead);
      } catch (error) {
        console.error(`Error executing action for rule ${rule.id}:`, error);
      }
    }
  }

  private static async scheduleAction(
    action: AutomationRule['actions'][0],
    lead: Lead
  ): Promise<void> {
    const executeTime = new Date(Date.now() + action.delay * 60 * 60 * 1000);

    // In a real app, this would use a job queue system
    setTimeout(async () => {
      try {
        await this.executeAction(action, lead);
      } catch (error) {
        console.error('Error executing scheduled action:', error);
      }
    }, action.delay * 60 * 60 * 1000);

    // Log scheduled action
    console.log(`Scheduled ${action.type} for ${executeTime}`);
  }

  private static async executeAction(
    action: AutomationRule['actions'][0],
    lead: Lead
  ): Promise<void> {
    switch (action.type) {
      case 'send_email':
        await EmailService.sendTemplatedEmail(lead.clientId, action.template, {
          lead,
        });
        break;

      case 'send_sms':
        await TwilioService.sendTemplatedSMS(lead.clientId, action.template, {
          lead,
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