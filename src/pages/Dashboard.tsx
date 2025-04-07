import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Invoices</h2>
          <p className="text-muted-foreground mb-4">Create and manage your invoices</p>
          <div className="flex space-x-4">
            <Button asChild>
              <Link to="/invoice/new">Create Invoice</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/invoices">View All</Link>
            </Button>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Proposals</h2>
          <p className="text-muted-foreground mb-4">Create and manage your proposals</p>
          <div className="flex space-x-4">
            <Button asChild>
              <Link to="/proposal/new">Create Proposal</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/proposals">View All</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-card p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Templates</h2>
        <p className="text-muted-foreground mb-4">Manage your document templates</p>
        <Button asChild>
          <Link to="/templates">Manage Templates</Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
