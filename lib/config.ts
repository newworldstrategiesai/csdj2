export const config = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Click Set Go DJ',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@clicksetgodj.com',
  twilioPhone: process.env.NEXT_PUBLIC_TWILIO_PHONE || '+1234567890',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
};