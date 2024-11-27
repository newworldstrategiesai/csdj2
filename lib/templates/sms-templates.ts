import { type Lead } from '../types';

export const SMS_TEMPLATES: Record<string, (lead: Lead) => string> = {
  'welcome': (lead: Lead) => 
    `Welcome to M10 DJ Company! We've received your inquiry and will contact you shortly. Meanwhile, check out our packages: [Link]`,

  'follow-up': (lead: Lead) =>
    `Hi ${lead.clientName}, following up on your DJ services inquiry. Would you like to schedule a quick call? Book here: [Link]`,

  'proposal-sent': (lead: Lead) =>
    `Your custom DJ proposal is ready! Check your email or view it here: [Link]. Valid for 7 days.`,

  'contract-sent': (lead: Lead) =>
    `Your DJ contract is ready for review! Sign here: [Link]. The date will be held for 48 hours.`,

  'deposit-reminder': (lead: Lead) =>
    `Reminder: Complete your DJ booking by submitting the deposit payment ($${lead.depositAmount}). Pay here: [Link]`,

  'booking-confirmation': (lead: Lead) =>
    `Booking confirmed! Your event on ${lead.eventDate} is locked in. Check your email for next steps.`,

  'meeting-reminder': (lead: Lead) =>
    `Reminder: Your consultation call with M10 DJ Company is tomorrow at ${lead.meetingTime}. Need to reschedule? [Link]`
};