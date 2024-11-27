```typescript
import { NextResponse } from 'next/server';
import { StripeService } from '@/lib/services/stripe-service';
import { TwilioService } from '@/lib/services/twilio-service';

export async function POST(request: Request) {
  try {
    const event = await request.json();

    // Handle Stripe webhook events
    if (event.type === 'payment_intent.succeeded') {
      const { metadata } = event.data.object;
      const { phoneNumber, song, artist } = metadata;

      // Send confirmation to user
      await TwilioService.sendSMS(
        phoneNumber,
        `Payment received! "${song}" by ${artist} has been added to the queue.`
      );

      // Update request status in database
      // TODO: Implement database update
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```