import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LayoutTemplate, FileText, FileSpreadsheet, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Templates: React.FC = () => {
  // Mock data for templates
  const templates = [
    { id: 1, name: 'Basic Invoice', type: 'invoice', description: 'Simple invoice template with essential fields', lastUsed: '2 days ago' },
    { id: 2, name: 'Detailed Invoice', type: 'invoice', description: 'Comprehensive invoice with detailed line items and notes', lastUsed: '1 week ago' },
    { id: 3, name: 'Marketing Proposal', type: 'proposal', description: 'Proposal template for marketing services', lastUsed: '3 days ago' },
    { id: 4, name: 'Web Development Proposal', type: 'proposal', description: 'Proposal for web development projects', lastUsed: '2 weeks ago' },
    { id: 5, name: 'Consulting Services', type: 'proposal', description: 'Template for consulting service proposals', lastUsed: 'Never' },
    { id: 6, name: 'Minimal Invoice', type: 'invoice', description: 'Clean, minimal invoice design', lastUsed: '1 month ago' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutTemplate className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Template Management</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">Create and manage templates for invoices and proposals.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Categories</CardTitle>
              <CardDescription>Browse by document type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-md p-2 bg-accent cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <LayoutTemplate className="h-4 w-4" />
                    <span className="text-sm font-medium">All Templates</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{templates.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-md p-2 hover:bg-accent cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Invoice Templates</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{templates.filter(t => t.type === 'invoice').length}</span>
                </div>
                <div className="flex items-center justify-between rounded-md p-2 hover:bg-accent cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="text-sm font-medium">Proposal Templates</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{templates.filter(t => t.type === 'proposal').length}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                <span>New Category</span>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                <span>Create New Template</span>
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                <span>Import Template</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>All Templates</CardTitle>
                <CardDescription>Manage your document templates</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    className="h-9 rounded-md border border-input bg-background pl-8 pr-3 text-sm"
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-4">Description</div>
                    <div className="col-span-1">Last Used</div>
                    <div className="col-span-1"></div>
                  </div>
                  <Separator />
                  {templates.map((template) => (
                    <React.Fragment key={template.id}>
                      <div className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-accent/50">
                        <div className="col-span-4 flex items-center space-x-2">
                          {template.type === 'invoice' ? (
                            <FileText className="h-4 w-4 text-primary" />
                          ) : (
                            <FileSpreadsheet className="h-4 w-4 text-primary" />
                          )}
                          <span className="font-medium">{template.name}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                            {template.type === 'invoice' ? 'Invoice' : 'Proposal'}
                          </span>
                        </div>
                        <div className="col-span-4 text-sm text-muted-foreground">{template.description}</div>
                        <div className="col-span-1 text-xs text-muted-foreground">{template.lastUsed}</div>
                        <div className="col-span-1 flex justify-end">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Separator />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {templates.length} templates
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recently Used Templates</CardTitle>
              <CardDescription>Your most frequently used templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.slice(0, 3).map((template) => (
                  <div key={template.id} className="flex flex-col space-y-3 rounded-md border p-4 hover:border-primary cursor-pointer">
                    <div className="flex items-center space-x-2">
                      {template.type === 'invoice' ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : (
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                      )}
                      <h3 className="font-semibold">{template.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                    <div className="flex justify-end mt-auto pt-2">
                      <Button variant="outline" size="sm">Use Template</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Templates;
