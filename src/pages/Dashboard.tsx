import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FileSpreadsheet, LayoutTemplate, Plus, Clock, TrendingUp, Settings } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for recent activity
  const recentActivity = [
    { id: 1, type: 'invoice', name: 'Website Development', client: 'Acme Corp', date: '2 hours ago' },
    { id: 2, type: 'proposal', name: 'Marketing Campaign', client: 'TechStart Inc', date: '1 day ago' },
    { id: 3, type: 'invoice', name: 'Logo Design', client: 'Green Leaf', date: '3 days ago' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to InvoiceFill. Create and manage your documents.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button asChild className="flex flex-col h-24 space-y-2">
                <Link to="/invoice/new">
                  <FileText className="h-6 w-6" />
                  <span>New Invoice</span>
                </Link>
              </Button>
              <Button asChild className="flex flex-col h-24 space-y-2" variant="outline">
                <Link to="/proposal/new">
                  <FileSpreadsheet className="h-6 w-6" />
                  <span>New Proposal</span>
                </Link>
              </Button>
              <Button asChild className="flex flex-col h-24 space-y-2" variant="outline">
                <Link to="/templates">
                  <LayoutTemplate className="h-6 w-6" />
                  <span>Templates</span>
                </Link>
              </Button>
              <Button asChild className="flex flex-col h-24 space-y-2" variant="secondary">
                <Link to="/clients/new">
                  <Plus className="h-6 w-6" />
                  <span>Add Client</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 rounded-md border p-4">
                  {activity.type === 'invoice' ? (
                    <FileText className="h-5 w-5 text-primary" />
                  ) : (
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.client}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/activity">View All Activity</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Stats and Documents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statistics</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">Total Invoices</div>
                <div className="font-bold">24</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Total Proposals</div>
                <div className="font-bold">12</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">Templates Used</div>
                <div className="font-bold">8</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">AI Assistance</div>
                <div className="font-bold">65%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Your recently created documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-3 rounded-md border p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Website Development</h3>
                </div>
                <p className="text-sm text-muted-foreground">Invoice #INV-2023-001</p>
                <p className="text-sm">Client: Acme Corp</p>
                <p className="text-sm font-medium">$4,500.00</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
              <div className="flex flex-col space-y-3 rounded-md border p-4">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Marketing Campaign</h3>
                </div>
                <p className="text-sm text-muted-foreground">Proposal #PRO-2023-008</p>
                <p className="text-sm">Client: TechStart Inc</p>
                <p className="text-sm font-medium">$12,000.00</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/invoices">All Invoices</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/proposals">All Proposals</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
