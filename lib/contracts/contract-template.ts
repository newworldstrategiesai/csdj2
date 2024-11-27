export interface ContractTemplate {
  id: string;
  name: string;
  content: string;
}

export interface ContractData {
  clientName: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  venueName: string;
  venueAddress: string;
  totalAmount: number;
  retainerAmount: number;
  remainingBalance: number;
  paymentDueDate: string;
}

export function generateContractContent(template: string, data: ContractData): string {
  return template
    .replace("[Client's Full Name]", data.clientName)
    .replace("[Event Name]", data.eventName)
    .replace("[Event Type]", data.eventType)
    .replace("[Event Date]", data.eventDate)
    .replace("[Start Time]", data.startTime)
    .replace("[End Time]", data.endTime)
    .replace("[Venue Name]", data.venueName)
    .replace("[Venue Address]", data.venueAddress)
    .replace("[Total Amount]", data.totalAmount.toString())
    .replace("[Retainer Amount]", data.retainerAmount.toString())
    .replace("[Remaining Balance]", data.remainingBalance.toString())
    .replace("[Payment Due Date]", data.paymentDueDate)
    .replace("[Effective Date]", new Date().toLocaleDateString());
}