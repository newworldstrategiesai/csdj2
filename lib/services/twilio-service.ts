import type { CallLog } from '../types';

export class TwilioService {
  private static accountSid: string;
  private static authToken: string;
  private static phoneNumber: string;

  static initialize(params: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  }) {
    this.accountSid = params.accountSid;
    this.authToken = params.authToken;
    this.phoneNumber = params.phoneNumber;
  }

  static async makeCall(phoneNumber: string): Promise<void> {
    try {
      const response = await fetch('/api/calls/make', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate call');
      }
    } catch (error) {
      console.error('Error making call:', error);
      throw error;
    }
  }

  static async sendSMS(phoneNumber: string, message: string): Promise<void> {
    try {
      const response = await fetch('/api/sms/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  static async getCallLogs(): Promise<CallLog[]> {
    try {
      const response = await fetch('/api/calls/logs');
      if (!response.ok) {
        throw new Error('Failed to fetch call logs');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching call logs:', error);
      throw error;
    }
  }

  static async storeCallRecording(
    callSid: string,
    recordingUrl: string
  ): Promise<void> {
    try {
      const response = await fetch('/api/calls/recording', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ callSid, recordingUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to store call recording');
      }
    } catch (error) {
      console.error('Error storing call recording:', error);
      throw error;
    }
  }

  static async storeCallTranscription(
    callSid: string,
    transcription: string
  ): Promise<void> {
    try {
      const response = await fetch('/api/calls/transcription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ callSid, transcription }),
      });

      if (!response.ok) {
        throw new Error('Failed to store call transcription');
      }
    } catch (error) {
      console.error('Error storing call transcription:', error);
      throw error;
    }
  }
}