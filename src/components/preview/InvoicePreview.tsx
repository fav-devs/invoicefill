import React from 'react';
import { useInvoice } from '@/context/InvoiceContext';
import { formatCurrency, formatDate } from '@/lib/utils';

const InvoicePreview: React.FC = () => {
  const { invoice } = useInvoice();

  return (
    <div className="bg-white rounded-md border p-6 text-black">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-gray-600">{invoice.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <h2 className="font-bold text-lg">{invoice.company.name}</h2>
          <p className="text-sm text-gray-600">{invoice.company.address.street}</p>
          <p className="text-sm text-gray-600">
            {invoice.company.address.city}, {invoice.company.address.state} {invoice.company.address.zipCode}
          </p>
          <p className="text-sm text-gray-600">{invoice.company.address.country}</p>
          <p className="text-sm text-gray-600">{invoice.company.phone}</p>
          <p className="text-sm text-gray-600">{invoice.company.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Bill To:</h3>
          <p className="font-semibold">{invoice.client.name}</p>
          <p className="text-sm text-gray-600">{invoice.client.address.street}</p>
          <p className="text-sm text-gray-600">
            {invoice.client.address.city}, {invoice.client.address.state} {invoice.client.address.zipCode}
          </p>
          <p className="text-sm text-gray-600">{invoice.client.address.country}</p>
          <p className="text-sm text-gray-600">{invoice.client.email}</p>
          {invoice.client.phone && (
            <p className="text-sm text-gray-600">{invoice.client.phone}</p>
          )}
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-semibold text-gray-600">Invoice Date:</div>
            <div>{invoice.date ? formatDate(invoice.date) : 'N/A'}</div>
            
            <div className="font-semibold text-gray-600">Due Date:</div>
            <div>{invoice.dueDate ? formatDate(invoice.dueDate) : 'N/A'}</div>
            
            <div className="font-semibold text-gray-600">Status:</div>
            <div className="capitalize">{invoice.status}</div>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2 text-left text-gray-600">Description</th>
            <th className="py-2 text-right text-gray-600">Quantity</th>
            <th className="py-2 text-right text-gray-600">Rate</th>
            <th className="py-2 text-right text-gray-600">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.lineItems.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="py-3">{item.description}</td>
              <td className="py-3 text-right">{item.quantity}</td>
              <td className="py-3 text-right">{formatCurrency(item.rate)}</td>
              <td className="py-3 text-right">{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="w-1/3">
          <div className="flex justify-between py-1">
            <span className="font-semibold text-gray-600">Subtotal:</span>
            <span>{formatCurrency(invoice.subtotal)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-semibold text-gray-600">Tax ({invoice.taxRate}%):</span>
            <span>{formatCurrency(invoice.taxAmount)}</span>
          </div>
          <div className="flex justify-between py-1 border-t border-gray-300 font-bold">
            <span>Total:</span>
            <span>{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || invoice.terms) && (
        <div className="border-t border-gray-300 pt-4">
          {invoice.notes && (
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-1">Notes:</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}
          {invoice.terms && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Terms:</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;
