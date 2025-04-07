import React from 'react';
import { useInvoice } from '@/context/InvoiceContext';
import { useProposal } from '@/context/ProposalContext';
import { Client } from '@/types';

interface ClientSelectorProps {
  contextType?: 'invoice' | 'proposal';
}

const ClientSelector: React.FC<ClientSelectorProps> = ({ contextType = 'invoice' }) => {
  // Try to use the invoice context
  const invoiceContext = React.useContext(require('@/context/InvoiceContext').InvoiceContext);
  // Try to use the proposal context
  const proposalContext = React.useContext(require('@/context/ProposalContext').ProposalContext);

  // Determine which context to use based on the contextType prop or availability
  const context = contextType === 'invoice' ? invoiceContext : proposalContext;

  // If neither context is available, use the one that is available
  const actualContext = context || invoiceContext || proposalContext;

  if (!actualContext) {
    throw new Error('ClientSelector must be used within either an InvoiceProvider or ProposalProvider');
  }

  const { clients, updateClient } = actualContext;
  const document = 'invoice' in actualContext ? actualContext.invoice : actualContext.proposal;

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateClient(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Client</label>
      <select
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={document.client.id}
        onChange={handleClientChange}
      >
        {clients.map((client: Client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClientSelector;
