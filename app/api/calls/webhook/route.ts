import { NextResponse } from 'next/server';
import { TwilioService } from '@/lib/services/twilio-service';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const callSid = data.get('CallSid') as string;

    if (!callSid) {
      return NextResponse.json(
        { error: 'Missing CallSid' },
        { status: 400 }
      );
    }

    await TwilioService.handleIncomingCall(callSid);

    // Return TwiML for call handling
    const twiml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say>Hello! Thank you for calling M10 DJ Company. Please leave a message after the tone.</Say>
        <Record maxLength="300" transcribe="true" />
      </Response>
    `;

    return new NextResponse(twiml, {
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Error handling call webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}