```typescript
import sgMail from '@sendgrid/mail';
import { type EmailTemplate } from '../templates/email-templates';

export class EmailService {
  static initialize(apiKey: string) {
    sgMail.setApiKey(apiKey);
  }

  static async sendEmail(
    to: string,
    template: EmailTemplate
  ): Promise<void> {
    try {
      await sgMail.send({
        to,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject: template.subject,
        html: template.body,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  static async sendTemplatedEmail(
    to: string,
    templateName: string,
    data: Record<string, any>
  ): Promise<void> {
    try {
      // In a real app, this would fetch the template from a database
      const template = {
        subject: 'Test Email',
        body: 'This is a test email',
      };

      await this.sendEmail(to, template);
    } catch (error) {
      console.error('Error sending templated email:', error);
      throw error;
    }
  }
}