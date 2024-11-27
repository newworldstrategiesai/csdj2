```typescript
import { type Lead, type LeadStage } from '../types';
import { VoiceAIService } from './voice-ai-service';
import { PipelineService } from './pipeline-service';
import { AutomationService } from './automation-service';
import { TaskService } from './task-service';

export class PipelineVoiceService {
  static async handleCallInteraction(
    callSid: string,
    speechResult: string,
    metadata: Record<string, any>
  ): Promise<void> {
    try {
      // Process speech with AI
      const { intent, eventDetails } = await this.processCallIntent(speechResult);
      
      // Create or update lead based on the interaction
      const lead = await this.processLeadFromCall(intent, eventDetails, metadata);

      // Handle intent-specific pipeline actions
      await this.handleIntentActions(intent, lead, eventDetails);

      // Schedule follow-up tasks
      await this.scheduleFollowUpTasks(intent, lead);

      // Log the interaction
      await this.logCallInteraction(callSid, lead.id, intent, speechResult);
    } catch (error) {
      console.error('Error handling call interaction:', error);
      throw error;
    }
  }

  private static async processCallIntent(speechResult: string) {
    // Extract intent and details from speech
    const eventDetails = await AutomationService.extractEventDetails(speechResult);
    
    let intent = 'general_inquiry';
    
    if (eventDetails.eventType && eventDetails.eventDate) {
      intent = 'booking_request';
    } else if (speechResult.toLowerCase().includes('price') || 
               speechResult.toLowerCase().includes('cost')) {
      intent = 'pricing_inquiry';
    } else if (speechResult.toLowerCase().includes('available') || 
               speechResult.toLowerCase().includes('date')) {
      intent = 'availability_check';
    }

    return { intent, eventDetails };
  }

  private static async processLeadFromCall(
    intent: string,
    eventDetails: any,
    metadata: Record<string, any>
  ): Promise<Lead> {
    // Create or update lead
    const lead: Lead = {
      id: crypto.randomUUID(),
      clientId: metadata.phoneNumber,
      stage: this.determineInitialStage(intent),
      source: 'Call',
      status: 'Active',
      notes: [this.generateLeadNote(intent, eventDetails)],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return lead;
  }

  private static determineInitialStage(intent: string): LeadStage {
    switch (intent) {
      case 'booking_request':
        return 'New';
      case 'pricing_inquiry':
        return 'New';
      case 'availability_check':
        return 'New';
      default:
        return 'New';
    }
  }

  private static generateLeadNote(intent: string, eventDetails: any): string {
    switch (intent) {
      case 'booking_request':
        return `Inquired about ${eventDetails.eventType} on ${eventDetails.eventDate}`;
      case 'pricing_inquiry':
        return 'Requested pricing information';
      case 'availability_check':
        return `Checked availability for ${eventDetails.eventDate || 'upcoming dates'}`;
      default:
        return 'General inquiry via phone';
    }
  }

  private static async handleIntentActions(
    intent: string,
    lead: Lead,
    eventDetails: any
  ): Promise<void> {
    switch (intent) {
      case 'booking_request':
        await this.handleBookingRequest(lead, eventDetails);
        break;
      case 'pricing_inquiry':
        await this.handlePricingInquiry(lead);
        break;
      case 'availability_check':
        await this.handleAvailabilityCheck(lead, eventDetails);
        break;
    }
  }

  private static async handleBookingRequest(
    lead: Lead,
    eventDetails: any
  ): Promise<void> {
    // Move lead to appropriate stage
    await PipelineService.moveToStage(lead.id, 'New');

    // Create follow-up task
    await TaskService.createTask({
      leadId: lead.id,
      template: 'follow_up_call',
      dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
    });
  }

  private static async handlePricingInquiry(lead: Lead): Promise<void> {
    // Move lead to appropriate stage
    await PipelineService.moveToStage(lead.id, 'New');

    // Create task to send pricing information
    await TaskService.createTask({
      leadId: lead.id,
      template: 'send_pricing',
      dueDate: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
    });
  }

  private static async handleAvailabilityCheck(
    lead: Lead,
    eventDetails: any
  ): Promise<void> {
    // Move lead to appropriate stage
    await PipelineService.moveToStage(lead.id, 'New');

    // Create task to check and confirm availability
    await TaskService.createTask({
      leadId: lead.id,
      template: 'check_availability',
      dueDate: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
    });
  }

  private static async scheduleFollowUpTasks(
    intent: string,
    lead: Lead
  ): Promise<void> {
    // Schedule automated follow-up based on intent
    const followUpDelay = this.determineFollowUpDelay(intent);
    
    await TaskService.createTask({
      leadId: lead.id,
      template: 'follow_up_call',
      dueDate: new Date(Date.now() + followUpDelay * 60 * 60 * 1000),
    });
  }

  private static determineFollowUpDelay(intent: string): number {
    // Return delay in hours
    switch (intent) {
      case 'booking_request':
        return 2; // 2 hours
      case 'pricing_inquiry':
        return 4; // 4 hours
      case 'availability_check':
        return 3; // 3 hours
      default:
        return 24; // 24 hours
    }
  }

  private static async logCallInteraction(
    callSid: string,
    leadId: string,
    intent: string,
    content: string
  ): Promise<void> {
    // In a real app, this would save to the database
    console.log('Logging call interaction:', {
      callSid,
      leadId,
      intent,
      content,
      timestamp: new Date(),
    });
  }
}
```