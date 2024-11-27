import { NextResponse } from 'next/server';
import { CommunicationService } from '@/lib/services/communication-service';

export async function POST(request: Request) {
  try {
    const { phone, content, clientId } = await request.json();

    if (!phone || !content || !clientId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const communication = await CommunicationService.handleIncomingSMS(
      phone,
      content,
      clientId
    );

    return NextResponse.json(communication);
  } catch (error) {
    console.error('Error processing SMS:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}