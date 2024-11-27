```typescript
import { NextResponse } from 'next/server';
import { TwilioService } from '@/lib/services/twilio-service';
import { AutomationService } from '@/lib/services/automation-service';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const messageType = data.get('MessageType');

    switch (messageType) {
      case 'voice':
        return handleVoiceWebhook(data);
      case 'message':
        return handleMessageWebhook(data);
      default:
        return NextResponse.json(
          { error: 'Invalid message type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error handling Twilio webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleVoiceWebhook(data: FormData) {
  const callSid = data.get('CallSid') as string;
  const recordingUrl = data.get('RecordingUrl') as string;
  const transcription = data.get('TranscriptionText') as string;

  if (transcription) {
    await AutomationService.handleIncomingCommunication('Call', transcription, {
      callSid,
      recordingUrl,
    });
  }

  return NextResponse.json({ success: true });
}

async function handleMessageWebhook(data: FormData) {
  const messageSid = data.get('MessageSid') as string;
  const from = data.get('From') as string;
  const body = data.get('Body') as string;

  await AutomationService.handleIncomingCommunication('SMS', body, {
    messageSid,
    from,
  });

  return NextResponse.json({ success: true });
}