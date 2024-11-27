```typescript
import { NextResponse } from 'next/server';
import { VoiceAIService } from '@/lib/services/voice-ai-service';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const callSid = data.get('CallSid') as string;
    const recordingUrl = data.get('RecordingUrl') as string;
    const transcription = data.get('TranscriptionText') as string;

    if (!callSid || !recordingUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await VoiceAIService.handleRecording(callSid, recordingUrl, transcription);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling recording:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```