import React from 'react';
import { useInvoice } from '@/context/InvoiceContext';
import ClientSelector from './ClientSelector';

const InvoiceDetails: React.FC = () => {
  const { invoice, updateInvoiceField } = useInvoice();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateInvoiceField(name as keyof typeof invoice, value);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={invoice.invoiceNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={invoice.date}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={invoice.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Tax Rate (%)</label>
          <input
            type="number"
            name="taxRate"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={invoice.taxRate}
            onChange={handleInputChange}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
      </div>

      <ClientSelector />
    </div>
  );
};

export default InvoiceDetails;
