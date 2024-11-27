import { NextResponse } from 'next/server';
import { CommunicationService } from '@/lib/services/communication-service';

export async function POST(request: Request) {
  try {
    const { email, content, clientId } = await request.json();

    if (!email || !content || !clientId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const communication = await CommunicationService.handleIncomingEmail(
      email,
      content,
      clientId
    );

    return NextResponse.json(communication);
  } catch (error) {
    console.error('Error processing email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}