import { type Contract, type ContractData } from '../types';
import { generateContractContent } from '../contracts/contract-template';
import { DEFAULT_CONTRACT_TEMPLATE } from '../contracts/default-template';

export class ContractService {
  static async generatePDF(contractData: ContractData): Promise<Blob> {
    try {
      const content = generateContractContent(DEFAULT_CONTRACT_TEMPLATE, contractData);
      
      // In a real app, this would use a PDF generation service
      // For now, we'll create a simple blob
      const blob = new Blob([content], { type: 'application/pdf' });
      return blob;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  static async signContract(contractId: string, signature: string): Promise<Contract> {
    try {
      // In a real app, this would make an API call to update the contract
      const signedContract: Contract = {
        id: contractId,
        eventId: '1',
        clientId: '1',
        status: 'Signed',
        signedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return signedContract;
    } catch (error) {
      console.error('Error signing contract:', error);
      throw error;
    }
  }

  static async downloadContract(contractId: string, contractData: ContractData): Promise<void> {
    try {
      const pdf = await this.generatePDF(contractData);
      const url = URL.createObjectURL(pdf);
      const link = document.createElement('a');
      link.href = url;
      link.download = `contract-${contractId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading contract:', error);
      throw error;
    }
  }
}