import { NextResponse } from 'next/server';
import { VoiceAIService } from '@/lib/services/voice-ai-service';

export async function POST(request: Request) {
  try {
    const { phoneNumber, voiceId, firstMessage } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Initialize voice configuration
    await VoiceAIService.setConfig({
      voiceId,
      defaultGreeting: firstMessage,
      useCustomVoice: !!voiceId,
    });

    // Generate TwiML for the call
    const twiml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say voice="${voiceId ? 'alice' : 'neural'}">${firstMessage}</Say>
        <Record transcribe="true" maxLength="300" />
      </Response>
    `;

    return new NextResponse(twiml, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Error making call:', error);
    return NextResponse.json(
      { error: 'Failed to make call' },
      { status: 500 }
    );
  }
}