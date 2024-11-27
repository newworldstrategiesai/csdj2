
import Stripe from 'stripe';

export class StripeService {
  private static stripe: Stripe;

  static initialize(secretKey: string) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    });
  }

  static async createPaymentLink(params: {
    amount: number;
    description: string;
    metadata: Record<string, string>;
  }): Promise<string> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Song Request',
                description: params.description,
              },
              unit_amount: params.amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/requests/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/requests/cancel`,
        metadata: params.metadata,
      });

      return session.url || '';
    } catch (error) {
      console.error('Error creating payment link:', error);
      throw error;
    }
  }

  static async handleWebhookEvent(event: any): Promise<void> {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object);
          break;
        // Add more event handlers as needed
      }
    } catch (error) {
      console.error('Error handling webhook event:', error);
      throw error;
    }
  }

  private static async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    // Update request status in database
    // Send notifications
    // Update queue
    console.log('Payment succeeded:', paymentIntent);
  }
}
