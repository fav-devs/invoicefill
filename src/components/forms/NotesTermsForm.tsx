import React from 'react';
import { useInvoice } from '@/context/InvoiceContext';

const NotesTermsForm: React.FC = () => {
  const { invoice, updateInvoiceField } = useInvoice();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateInvoiceField(name as keyof typeof invoice, value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Notes</label>
        <textarea
          name="notes"
          className="min-h-[100px] w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={invoice.notes || ''}
          onChange={handleInputChange}
          placeholder="Add any notes for your client..."
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Terms</label>
        <textarea
          name="terms"
          className="min-h-[100px] w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={invoice.terms || ''}
          onChange={handleInputChange}
          placeholder="Add your payment terms..."
        />
      </div>
    </div>
  );
};

export default NotesTermsForm;
