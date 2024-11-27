import { type Lead } from '../types';
import { EMAIL_TEMPLATES } from '../templates/email-templates';
import { SMS_TEMPLATES } from '../templates/sms-templates';
import { EmailService } from './email-service';
import { TwilioService } from './twilio-service';

export class CommunicationScheduler {
  static async scheduleFollowUps(lead: Lead): Promise<void> {
    const schedule = this.getFollowUpSchedule(lead.stage);
    
    for (const task of schedule) {
      await this.scheduleTask(lead, task);
    }
  }

  private static getFollowUpSchedule(stage: string) {
    const schedules: Record<string, Array<{
      type: 'Email' | 'SMS';
      template: string;
      delay: number; // hours
    }>> = {
      'New': [
        { type: 'Email', template: 'welcome', delay: 0 },
        { type: 'Email', template: 'follow-up', delay: 24 },
        { type: 'SMS', template: 'follow-up', delay: 48 }
      ],
      'Contacted': [
        { type: 'Email', template: 'follow-up', delay: 48 },
        { type: 'SMS', template: 'follow-up', delay: 72 }
      ],
      'Proposal Sent': [
        { type: 'Email', template: 'follow-up', delay: 48 },
        { type: 'SMS', template: 'proposal-sent', delay: 72 },
        { type: 'Email', template: 'follow-up', delay: 120 }
      ],
      'Contract Sent': [
        { type: 'Email', template: 'deposit-reminder', delay: 24 },
        { type: 'SMS', template: 'contract-sent', delay: 48 }
      ]
    };

    return schedules[stage] || [];
  }

  private static async scheduleTask(lead: Lead, task: {
    type: 'Email' | 'SMS';
    template: string;
    delay: number;
  }): Promise<void> {
    const scheduledTime = new Date(Date.now() + task.delay * 60 * 60 * 1000);

    // In a real app, this would use a job queue system
    setTimeout(async () => {
      try {
        if (task.type === 'Email') {
          const template = EMAIL_TEMPLATES[task.template](lead);
          await EmailService.sendEmail(lead.clientId, template);
        } else {
          const message = SMS_TEMPLATES[task.template](lead);
          await TwilioService.sendSMS(lead.clientId, message);
        }
      } catch (error) {
        console.error('Error executing scheduled task:', error);
      }
    }, task.delay * 60 * 60 * 1000);

    // Log scheduled task
    console.log(`Scheduled ${task.type} (${task.template}) for ${scheduledTime}`);
  }
}