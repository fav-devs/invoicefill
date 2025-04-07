import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ProposalNew: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Proposal</h1>
        <Button variant="outline" asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
      <div className="bg-card p-6 rounded-lg shadow">
        <p className="text-muted-foreground mb-4">Proposal form will be implemented here</p>
      </div>
    </div>
  );
};

export default ProposalNew;
