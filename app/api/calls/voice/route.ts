```typescript
import { NextResponse } from 'next/server';
import { VoiceAIService } from '@/lib/services/voice-ai-service';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const callSid = data.get('CallSid') as string;
    const callerNumber = data.get('From') as string;
    const speechResult = data.get('SpeechResult') as string;

    if (!callSid) {
      return NextResponse.json(
        { error: 'Missing CallSid' },
        { status: 400 }
      );
    }

    // Generate appropriate TwiML response
    const twiml = speechResult
      ? await VoiceAIService.handleSpeechInput(callSid, speechResult)
      : await VoiceAIService.handleIncomingCall(callSid, callerNumber);

    return new NextResponse(twiml, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Error handling voice call:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```