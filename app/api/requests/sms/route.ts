```typescript
import { NextResponse } from 'next/server';
import { TwilioService } from '@/lib/services/twilio-service';
import { StripeService } from '@/lib/services/stripe-service';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const from = data.get('From') as string;
    const body = data.get('Body') as string;

    if (!from || !body) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse song request
    const [song, artist] = body.split('-').map(part => part.trim());
    
    if (!song || !artist) {
      await TwilioService.sendSMS(
        from,
        'Please use the format: Song Name - Artist Name'
      );
      return NextResponse.json({ success: true });
    }

    // Create payment link
    const paymentLink = await StripeService.createPaymentLink({
      amount: 1000, // $10.00
      description: `Song Request: ${song} by ${artist}`,
      metadata: {
        phoneNumber: from,
        song,
        artist,
      },
    });

    // Send payment link to user
    await TwilioService.sendSMS(
      from,
      `Great choice! Pay here to request "${song}" by ${artist}: ${paymentLink}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing song request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```