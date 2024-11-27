import { parseMessage, type ParsedMessage } from '../parsers/message-parser';
import type { Communication } from '../types';

export class CommunicationService {
  static processIncomingMessage(
    type: 'Email' | 'SMS',
    content: string,
    clientId: string
  ): Communication {
    const parsed = parseMessage(content);

    return {
      id: crypto.randomUUID(),
      type,
      clientId,
      content,
      parsed,
      createdAt: new Date()
    };
  }

  static async handleIncomingEmail(email: string, content: string, clientId: string) {
    const communication = this.processIncomingMessage('Email', content, clientId);
    // TODO: Store in database
    return communication;
  }

  static async handleIncomingSMS(phone: string, content: string, clientId: string) {
    const communication = this.processIncomingMessage('SMS', content, clientId);
    // TODO: Store in database
    return communication;
  }
}