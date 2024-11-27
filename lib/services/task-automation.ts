import { type Lead, type LeadStage } from '../types';
import { CommunicationScheduler } from './communication-scheduler';
import { ContractService } from './contract-service';
import { EmailService } from './email-service';

export class TaskAutomation {
  static async handleStageTransition(
    lead: Lead,
    fromStage: LeadStage,
    toStage: LeadStage
  ): Promise<void> {
    // Log stage transition
    console.log(`Lead ${lead.id} moved from ${fromStage} to ${toStage}`);

    // Schedule stage-specific follow-ups
    await CommunicationScheduler.scheduleFollowUps(lead);

    // Handle stage-specific tasks
    switch (toStage) {
      case 'Contacted':
        await this.handleContactedStage(lead);
        break;
      case 'Meeting Scheduled':
        await this.handleMeetingScheduled(lead);
        break;
      case 'Proposal Sent':
        await this.handleProposalSent(lead);
        break;
      case 'Contract Sent':
        await this.handleContractSent(lead);
        break;
      case 'Contract Signed':
        await this.handleContractSigned(lead);
        break;
      case 'Deposit Paid':
        await this.handleDepositPaid(lead);
        break;
    }
  }

  private static async handleContactedStage(lead: Lead): Promise<void> {
    // Create calendar invite link
    const calendarLink = await this.generateCalendarLink(lead);
    
    // Send calendar link via email
    await EmailService.sendEmail(lead.clientId, {
      subject: 'Schedule Your DJ Consultation',
      body: `Book your consultation here: ${calendarLink}`
    });
  }

  private static async handleMeetingScheduled(lead: Lead): Promise<void> {
    // Send meeting confirmation and prep questionnaire
    await EmailService.sendEmail(lead.clientId, {
      subject: 'Meeting Confirmed - Preparation Details',
      body: 'Please complete our questionnaire before the meeting: [Link]'
    });
  }

  private static async handleProposalSent(lead: Lead): Promise<void> {
    // Set proposal expiration reminder
    setTimeout(async () => {
      const proposal = await this.getProposal(lead.id);
      if (!proposal.accepted) {
        await EmailService.sendEmail(lead.clientId, {
          subject: 'Your DJ Proposal is Expiring Soon',
          body: 'Your custom proposal expires in 24 hours. Lock in your date now!'
        });
      }
    }, 6 * 24 * 60 * 60 * 1000); // 6 days
  }

  private static async handleContractSent(lead: Lead): Promise<void> {
    // Monitor contract status
    const checkContractStatus = setInterval(async () => {
      const contract = await ContractService.getContract(lead.id);
      if (contract.signed) {
        clearInterval(checkContractStatus);
        await this.handleStageTransition(lead, 'Contract Sent', 'Contract Signed');
      }
    }, 60 * 60 * 1000); // Every hour
  }

  private static async handleContractSigned(lead: Lead): Promise<void> {
    // Generate and send invoice
    const invoice = await this.generateInvoice(lead);
    await EmailService.sendEmail(lead.clientId, {
      subject: 'Your DJ Services Invoice',
      body: `View and pay your invoice here: ${invoice.paymentLink}`
    });
  }

  private static async handleDepositPaid(lead: Lead): Promise<void> {
    // Send welcome package and next steps
    await EmailService.sendEmail(lead.clientId, {
      subject: 'Welcome to the M10 DJ Family!',
      body: 'Here\'s your welcome package and next steps: [Link]'
    });
  }

  // Helper methods (would be implemented in a real app)
  private static async generateCalendarLink(lead: Lead): Promise<string> {
    return 'https://calendar.example.com/book';
  }

  private static async getProposal(leadId: string): Promise<any> {
    return { accepted: false };
  }

  private static async generateInvoice(lead: Lead): Promise<any> {
    return { paymentLink: 'https://payment.example.com/invoice' };
  }
}