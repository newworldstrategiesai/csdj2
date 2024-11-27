```typescript
import { NextResponse } from 'next/server';
import { AutomationService } from '@/lib/services/automation-service';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { from, subject, text } = data;

    await AutomationService.handleIncomingCommunication('Email', text, {
      from,
      subject,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling SendGrid webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}