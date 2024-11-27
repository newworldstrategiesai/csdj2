```typescript
import { type VoiceConfig } from '../types';
import { ElevenLabsAPI } from './elevenlabs-service';
import { TwilioService } from './twilio-service';

export class VoiceAIService {
  private static config: VoiceConfig = {
    defaultGreeting: "Hello, thank you for calling. How can I help you today?",
    voiceId: "",
    useCustomVoice: false,
    maxRecordingDuration: 300,
    transcribeRecordings: true,
  };

  static setConfig(config: Partial<VoiceConfig>) {
    this.config = { ...this.config, ...config };
  }

  static async handleIncomingCall(
    callSid: string,
    callerNumber: string
  ): Promise<string> {
    try {
      // Generate TwiML for call handling
      const twiml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Gather input="speech" timeout="3" language="en-US">
            <Say voice="${this.config.useCustomVoice ? 'alice' : 'neural'}">${
              this.config.defaultGreeting
            }</Say>
          </Gather>
          <Record transcribe="true" maxLength="${this.config.maxRecordingDuration}" />
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

  static async handleRecording(
    callSid: string,
    recordingUrl: string,
    transcription?: string
  ): Promise<void> {
    try {
      // Store recording and transcription
      await TwilioService.storeCallRecording(callSid, recordingUrl);
      
      if (transcription) {
        await TwilioService.storeCallTranscription(callSid, transcription);
      }
    } catch (error) {
      console.error('Error handling recording:', error);
      throw error;
    }
  }

  private static async processAIResponse(input: string): Promise<string> {
    // In a real app, this would use an AI service
    return "I understand you're interested in our services. Would you like to schedule a consultation?";
  }

  static async synthesizeVoice(text: string, voiceId: string): Promise<string> {
    try {
      return await ElevenLabsAPI.synthesizeSpeech(text, voiceId);
    } catch (error) {
      console.error('Error synthesizing voice:', error);
      throw error;
    }
  }
}