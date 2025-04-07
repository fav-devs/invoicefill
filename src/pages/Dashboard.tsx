import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FileSpreadsheet, LayoutTemplate, Plus, Clock, TrendingUp, Settings, Users, DollarSign, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  // Mock data for recent activity
  const recentActivity = [
    { id: 1, type: 'invoice', name: 'Website Development', client: 'Acme Corp', date: '2 hours ago', status: 'paid', amount: 4500 },
    { id: 2, type: 'proposal', name: 'Marketing Campaign', client: 'TechStart Inc', date: '1 day ago', status: 'sent', amount: 12000 },
    { id: 3, type: 'invoice', name: 'Logo Design', client: 'Green Leaf', date: '3 days ago', status: 'draft', amount: 1200 },
    { id: 4, type: 'invoice', name: 'SEO Optimization', client: 'Acme Corp', date: '5 days ago', status: 'overdue', amount: 2800 },
  ];

  // Mock data for stats
  const stats = {
    totalInvoices: 24,
    totalProposals: 12,
    pendingPayments: 3,
    totalRevenue: 48750,
    activeClients: 8,
    completionRate: 85,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      className="container mx-auto p-6 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header with welcome message */}
      <motion.div className="flex flex-col space-y-2" variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to InvoiceFill. Create and manage your documents.</p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </Button>
            <Button variant="default" size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Document</span>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-2">${stats.totalRevenue.toLocaleString()}</h3>
                  <p className="text-xs text-muted-foreground mt-1">From {stats.totalInvoices} invoices</p>
                </div>
                <div className="bg-primary/20 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                  <h3 className="text-2xl font-bold mt-2">{stats.activeClients}</h3>
                  <p className="text-xs text-muted-foreground mt-1">+2 this month</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <h3 className="text-2xl font-bold mt-2">{stats.completionRate}%</h3>
                  <div className="mt-2 w-full">
                    <Progress value={stats.completionRate} className="h-2" />
                  </div>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                  <h3 className="text-2xl font-bold mt-2">{stats.pendingPayments}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-md transition-all h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Create new documents and manage your business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild className="flex flex-col h-24 space-y-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all">
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
                    <Users className="h-6 w-6" />
                    <span>Add Client</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity and Documents */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <Tabs defaultValue="activity" className="h-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent Activity
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documents
                </TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/activity">View All</Link>
              </Button>
            </div>

            <TabsContent value="activity" className="mt-0 h-[400px] overflow-auto">
              <Card className="border-0 shadow-none h-full">
                <CardContent className="p-0 space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 rounded-md border p-4 hover:bg-accent/50 transition-colors">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {activity.type === 'invoice' ? (
                          <FileText className="h-5 w-5 text-primary" />
                        ) : (
                          <FileSpreadsheet className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{activity.name}</p>
                          <Badge
                            variant={activity.status === 'paid' ? 'default' :
                                    activity.status === 'sent' ? 'outline' :
                                    activity.status === 'draft' ? 'secondary' : 'destructive'}
                            className="capitalize"
                          >
                            {activity.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">{activity.client}</p>
                          <p className="text-sm font-medium">${activity.amount.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                          <Button variant="ghost" size="sm" className="h-7 px-2">View</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-0 h-[400px] overflow-auto">
              <Card className="border-0 shadow-none h-full">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-3 rounded-md border p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-primary/10 p-1.5 rounded-full">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="font-medium">Website Development</h3>
                        </div>
                        <Badge variant="outline" className="capitalize">Paid</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Invoice #INV-2023-001</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Client: Acme Corp</p>
                        <p className="text-sm font-medium">$4,500.00</p>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 rounded-md border p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-primary/10 p-1.5 rounded-full">
                            <FileSpreadsheet className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="font-medium">Marketing Campaign</h3>
                        </div>
                        <Badge variant="outline" className="capitalize">Sent</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Proposal #PRO-2023-008</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Client: TechStart Inc</p>
                        <p className="text-sm font-medium">$12,000.00</p>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 rounded-md border p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-primary/10 p-1.5 rounded-full">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="font-medium">Logo Design</h3>
                        </div>
                        <Badge variant="secondary" className="capitalize">Draft</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Invoice #INV-2023-002</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Client: Green Leaf</p>
                        <p className="text-sm font-medium">$1,200.00</p>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 rounded-md border p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="bg-primary/10 p-1.5 rounded-full">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="font-medium">SEO Optimization</h3>
                        </div>
                        <Badge variant="destructive" className="capitalize">Overdue</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Invoice #INV-2023-003</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Client: Acme Corp</p>
                        <p className="text-sm font-medium">$2,800.00</p>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
