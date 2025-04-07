import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LayoutTemplate, FileText, FileSpreadsheet, Plus, Search, Filter } from 'lucide-react';
import { TemplateProvider, useTemplates } from '@/context/TemplateContext';
import { InvoiceProvider } from '@/context/InvoiceContext';
import { ProposalProvider } from '@/context/ProposalContext';
import TemplateList from '@/components/templates/TemplateList';
import TemplateForm from '@/components/templates/TemplateForm';

// Inner component that uses the templates context
const TemplatesContent: React.FC = () => {
  const navigate = useNavigate();
  const { templates } = useTemplates();

  const [filter, setFilter] = useState<'all' | 'invoice' | 'proposal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingTemplateId, setEditingTemplateId] = useState<string | undefined>();
  const [initialType, setInitialType] = useState<'invoice' | 'proposal'>('invoice');

  // Handle applying a template
  const handleApplyTemplate = (templateId: string) => {
    // In a real app, this would apply the template to a new document
    const template = templates.find(t => t.id === templateId);
    if (template) {
      if (template.type === 'invoice') {
        navigate('/invoice/new');
      } else {
        navigate('/proposal/new');
      }
    }
  };

  // Filter templates based on search query and filter type
  const filteredTemplates = templates.filter(template => {
    // Apply type filter
    if (filter !== 'all' && template.type !== filter) return false;

    // Apply search filter
    if (searchQuery.trim() === '') return true;

    const query = searchQuery.toLowerCase();
    return (
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query)
    );
  });

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
                <div
                  className={`flex items-center justify-between rounded-md p-2 cursor-pointer ${filter === 'all' ? 'bg-accent' : 'hover:bg-accent'}`}
                  onClick={() => setFilter('all')}
                >
                  <div className="flex items-center space-x-2">
                    <LayoutTemplate className="h-4 w-4" />
                    <span className="text-sm font-medium">All Templates</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{templates.length}</span>
                </div>
                <div
                  className={`flex items-center justify-between rounded-md p-2 cursor-pointer ${filter === 'invoice' ? 'bg-accent' : 'hover:bg-accent'}`}
                  onClick={() => setFilter('invoice')}
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Invoice Templates</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{templates.filter(t => t.type === 'invoice').length}</span>
                </div>
                <div
                  className={`flex items-center justify-between rounded-md p-2 cursor-pointer ${filter === 'proposal' ? 'bg-accent' : 'hover:bg-accent'}`}
                  onClick={() => setFilter('proposal')}
                >
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="text-sm font-medium">Proposal Templates</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{templates.filter(t => t.type === 'proposal').length}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {/* Category button removed as it's not needed for now */}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full justify-start"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormMode('create');
                  setInitialType('invoice');
                  setIsFormOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                <span>Create Invoice Template</span>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormMode('create');
                  setInitialType('proposal');
                  setIsFormOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                <span>Create Proposal Template</span>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSearchQuery('')}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TemplateList
                  filter={filter}
                  onApplyTemplate={handleApplyTemplate}
                  onEditTemplate={(templateId) => {
                    setEditingTemplateId(templateId);
                    setFormMode('edit');
                    setIsFormOpen(true);
                  }}
                />
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
                {templates
                  .sort((a, b) => {
                    if (!a.lastUsed) return 1;
                    if (!b.lastUsed) return -1;
                    return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
                  })
                  .slice(0, 3)
                  .map((template) => (
                    <div
                      key={template.id}
                      className="flex flex-col space-y-3 rounded-md border p-4 hover:border-primary cursor-pointer"
                      onClick={() => handleApplyTemplate(template.id)}
                    >
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
      {/* Template form dialog */}
      <TemplateForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        mode={formMode}
        editingTemplateId={editingTemplateId}
        initialType={initialType}
      />
    </div>
  );
};

// Wrapper component that provides the contexts
const Templates: React.FC = () => {
  return (
    <TemplateProvider>
      <InvoiceProvider>
        <ProposalProvider>
          <TemplatesContent />
        </ProposalProvider>
      </InvoiceProvider>
    </TemplateProvider>
  );
};

export default Templates;
