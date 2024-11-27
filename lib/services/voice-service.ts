import { TwilioService } from './twilio-service';
import { type CallLog } from '../types';

interface VoiceConfig {
  defaultGreeting: string;
  voiceId: string; // ElevenLabs voice ID
  useCustomVoice: boolean;
}

export class VoiceService {
  private static config: VoiceConfig = {
    defaultGreeting: "Hello, thank you for calling M10 DJ Company. How can I help you today?",
    voiceId: "",
    useCustomVoice: false,
  };

  static setConfig(config: Partial<VoiceConfig>) {
    this.config = { ...this.config, ...config };
  }

  static async handleIncomingCall(callSid: string, callerNumber: string): Promise<string> {
    try {
      // Check if caller is in database
      const caller = await this.getCallerInfo(callerNumber);
      
      // Generate personalized greeting
      const greeting = caller 
        ? `Hey ${caller.name}, welcome back to M10 DJ Company. How can I assist you today?`
        : this.config.defaultGreeting;

      // Generate TwiML for call handling
      const twiml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Gather input="speech" timeout="3" language="en-US">
            <Say voice="${this.config.useCustomVoice ? 'alice' : 'neural'}">${greeting}</Say>
          </Gather>
          <Record transcribe="true" maxLength="300" />
        </Response>
      `;

      return twiml;
    } catch (error) {
      console.error('Error handling incoming call:', error);
      throw error;
    }
  }

  static async handleSpeechInput(
    callSid: string,
    speechResult: string
  ): Promise<string> {
    try {
      // Process speech with AI
      const response = await this.processAIResponse(speechResult);

      // Generate TwiML for response
      const twiml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Say voice="${this.config.useCustomVoice ? 'alice' : 'neural'}">${response}</Say>
          <Gather input="speech" timeout="3" language="en-US" />
        </Response>
      `;

      return twiml;
    } catch (error) {
      console.error('Error handling speech input:', error);
      throw error;
    }
  }

  private static async getCallerInfo(phoneNumber: string) {
    // In a real app, this would query the database
    return null;
  }

  private static async processAIResponse(input: string): Promise<string> {
    // In a real app, this would use an AI service
    return "I understand you're interested in our DJ services. Would you like to schedule a consultation?";
  }

  static async getCallHistory(limit: number = 20): Promise<CallLog[]> {
    try {
      return await TwilioService.getCallLogs();
    } catch (error) {
      console.error('Error fetching call history:', error);
      throw error;
    }
  }

  static async getCallRecording(callSid: string): Promise<string> {
    try {
      return await TwilioService.getCallRecording(callSid);
    } catch (error) {
      console.error('Error fetching call recording:', error);
      throw error;
    }
  }

  static async getCallTranscription(callSid: string): Promise<string> {
    try {
      return await TwilioService.getCallTranscription(callSid);
    } catch (error) {
      console.error('Error fetching call transcription:', error);
      throw error;
    }
  }
}