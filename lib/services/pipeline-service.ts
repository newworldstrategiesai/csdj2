```typescript
import { type Lead, type LeadActivity, type LeadStage } from '../types';
import { EmailService } from './email-service';
import { TwilioService } from './twilio-service';
import { AutomationService } from './automation-service';

export class PipelineService {
  static async moveToStage(leadId: string, stage: LeadStage): Promise<Lead> {
    try {
      // Get current lead data
      const lead = await this.getLead(leadId);
      const oldStage = lead.stage;
      
      // Update lead stage
      lead.stage = stage;
      lead.updatedAt = new Date();

      // Log the stage change
      await this.logActivity({
        id: crypto.randomUUID(),
        leadId,
        type: "Stage Change",
        content: `Stage changed from ${oldStage} to ${stage}`,
        createdAt: new Date(),
        createdBy: "system",
      });

      // Trigger stage-specific automations
      await this.handleStageAutomation(lead);

      return lead;
    } catch (error) {
      console.error('Error moving lead to stage:', error);
      throw error;
    }
  }

  static async handleStageAutomation(lead: Lead): Promise<void> {
    try {
      switch (lead.stage) {
        case "New":
          await this.sendWelcomeEmail(lead);
          break;
        case "Contacted":
          await this.scheduleFollowUp(lead);
          break;
        case "Meeting Scheduled":
          await this.sendMeetingConfirmation(lead);
          break;
        case "Proposal Sent":
          await this.scheduleProposalFollowUp(lead);
          break;
        case "Contract Sent":
          await this.scheduleContractFollowUp(lead);
          break;
        case "Contract Signed":
          await this.sendDepositInvoice(lead);
          break;
        case "Deposit Paid":
          await this.createEvent(lead);
          break;
      }
    } catch (error) {
      console.error('Error handling stage automation:', error);
      throw error;
    }
  }

  private static async getLead(leadId: string): Promise<Lead> {
    // In a real app, this would fetch from the database
    return {
      id: leadId,
      clientId: "1",
      stage: "New",
      source: "Email",
      status: "Active",
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private static async logActivity(activity: LeadActivity): Promise<void> {
    // In a real app, this would save to the database
    console.log('Logging activity:', activity);
  }

  private static async sendWelcomeEmail(lead: Lead): Promise<void> {
    const emailContent = {
      subject: "Welcome to M10 DJ Company",
      template: "welcome-email",
      data: {
        leadId: lead.id,
      },
    };

    await EmailService.sendEmail(lead.clientId, emailContent);
  }

  private static async scheduleFollowUp(lead: Lead): Promise<void> {
    const followUp = {
      type: "Call" as const,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      description: "Follow up on initial contact",
    };

    // Update lead with next action
    lead.nextAction = followUp;
  }

  private static async sendMeetingConfirmation(lead: Lead): Promise<void> {
    const emailContent = {
      subject: "Meeting Confirmation",
      template: "meeting-confirmation",
      data: {
        leadId: lead.id,
      },
    };

    await EmailService.sendEmail(lead.clientId, emailContent);
    await TwilioService.sendSMS(lead.clientId, "Your meeting with M10 DJ Company has been confirmed.");
  }

  private static async scheduleProposalFollowUp(lead: Lead): Promise<void> {
    const followUp = {
      type: "Call" as const,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 48 hours from now
      description: "Follow up on proposal",
    };

    lead.nextAction = followUp;
  }

  private static async scheduleContractFollowUp(lead: Lead): Promise<void> {
    const followUp = {
      type: "Email" as const,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 72 hours from now
      description: "Follow up on contract",
    };

    lead.nextAction = followUp;
  }

  private static async sendDepositInvoice(lead: Lead): Promise<void> {
    const emailContent = {
      subject: "Deposit Invoice for Your Event",
      template: "deposit-invoice",
      data: {
        leadId: lead.id,
      },
    };

    await EmailService.sendEmail(lead.clientId, emailContent);
  }

  private static async createEvent(lead: Lead): Promise<void> {
    // In a real app, this would create an event in the database
    console.log('Creating event for lead:', lead.id);
  }
}