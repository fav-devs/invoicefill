import React from 'react';
import { useInvoice } from '@/context/InvoiceContext';

const ClientSelector: React.FC = () => {
  const { clients, invoice, updateClient } = useInvoice();

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateClient(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Client</label>
      <select
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={invoice.client.id}
        onChange={handleClientChange}
      >
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClientSelector;
