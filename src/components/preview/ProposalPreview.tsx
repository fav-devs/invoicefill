import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { formatCurrency, formatDate } from '@/lib/utils';

const ProposalPreview: React.FC = () => {
  const { proposal } = useProposal();

  return (
    <div className="bg-white rounded-md border p-6 text-black">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">PROPOSAL</h1>
          <p className="text-gray-600">{proposal.proposalNumber}</p>
        </div>
        <div className="text-right">
          <h2 className="font-bold text-lg">{proposal.company.name}</h2>
          <p className="text-sm text-gray-600">{proposal.company.address.street}</p>
          <p className="text-sm text-gray-600">
            {proposal.company.address.city}, {proposal.company.address.state} {proposal.company.address.zipCode}
          </p>
          <p className="text-sm text-gray-600">{proposal.company.address.country}</p>
          <p className="text-sm text-gray-600">{proposal.company.phone}</p>
          <p className="text-sm text-gray-600">{proposal.company.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Prepared For:</h3>
          <p className="font-semibold">{proposal.client.name}</p>
          <p className="text-sm text-gray-600">{proposal.client.address.street}</p>
          <p className="text-sm text-gray-600">
            {proposal.client.address.city}, {proposal.client.address.state} {proposal.client.address.zipCode}
          </p>
          <p className="text-sm text-gray-600">{proposal.client.address.country}</p>
          <p className="text-sm text-gray-600">{proposal.client.email}</p>
          {proposal.client.phone && (
            <p className="text-sm text-gray-600">{proposal.client.phone}</p>
          )}
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-semibold text-gray-600">Proposal Date:</div>
            <div>{proposal.date ? formatDate(proposal.date) : 'N/A'}</div>
            
            <div className="font-semibold text-gray-600">Expiry Date:</div>
            <div>{proposal.expiryDate ? formatDate(proposal.expiryDate) : 'N/A'}</div>
            
            <div className="font-semibold text-gray-600">Status:</div>
            <div className="capitalize">{proposal.status}</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{proposal.title || 'Project Proposal'}</h2>
        <div className="whitespace-pre-line text-gray-700">{proposal.scope}</div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Project Timeline</h3>
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 text-left text-gray-600">Phase</th>
              <th className="py-2 text-left text-gray-600">Deliverables</th>
              <th className="py-2 text-right text-gray-600">Timeline</th>
            </tr>
          </thead>
          <tbody>
            {proposal.timeline.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3">{item.phase}</td>
                <td className="py-3">{item.deliverables}</td>
                <td className="py-3 text-right">{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Investment</h3>
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 text-left text-gray-600">Service</th>
              <th className="py-2 text-right text-gray-600">Rate</th>
              <th className="py-2 text-right text-gray-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {proposal.pricing.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3">{item.service}</td>
                <td className="py-3 text-right">{formatCurrency(item.rate)}</td>
                <td className="py-3 text-right">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-4">
          <div className="w-1/3">
            <div className="flex justify-between py-1">
              <span className="font-semibold text-gray-600">Subtotal:</span>
              <span>{formatCurrency(proposal.subtotal)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-semibold text-gray-600">Tax ({proposal.taxRate}%):</span>
              <span>{formatCurrency(proposal.taxAmount)}</span>
            </div>
            <div className="flex justify-between py-1 border-t border-gray-300 font-bold">
              <span>Total:</span>
              <span>{formatCurrency(proposal.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {(proposal.notes || proposal.terms) && (
        <div className="border-t border-gray-300 pt-4">
          {proposal.notes && (
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-1">Notes:</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{proposal.notes}</p>
            </div>
          )}
          {proposal.terms && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Terms:</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{proposal.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProposalPreview;
