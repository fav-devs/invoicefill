import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import ClientSelector from './ClientSelector';

const ProposalDetails: React.FC = () => {
  const { proposal, updateProposalField } = useProposal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateProposalField(name as keyof typeof proposal, value);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Proposal Number</label>
          <input
            type="text"
            name="proposalNumber"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={proposal.proposalNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={proposal.date}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={proposal.expiryDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Tax Rate (%)</label>
          <input
            type="number"
            name="taxRate"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={proposal.taxRate}
            onChange={handleInputChange}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
      </div>

      <ClientSelector contextType="proposal" />

      <div className="space-y-2">
        <label className="text-sm font-medium">Project Title</label>
        <input
          type="text"
          name="title"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={proposal.title}
          onChange={handleInputChange}
          placeholder="Enter project title"
        />
      </div>
    </div>
  );
};

export default ProposalDetails;
