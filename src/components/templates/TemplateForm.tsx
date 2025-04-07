import React, { useState, useEffect } from 'react';
import { useTemplates } from '@/context/TemplateContext';
import { Template } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { useInvoice } from '@/context/InvoiceContext';
import { useProposal } from '@/context/ProposalContext';

interface TemplateFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingTemplateId?: string;
  mode: 'create' | 'edit';
  initialType?: 'invoice' | 'proposal';
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  isOpen,
  onClose,
  editingTemplateId,
  mode,
  initialType = 'invoice'
}) => {
  const { templates, addTemplate, updateTemplate } = useTemplates();
  const { invoice } = useInvoice();
  const { proposal } = useProposal();

  const [name, setName] = useState('');
  const [type, setType] = useState<'invoice' | 'proposal'>(initialType);
  const [description, setDescription] = useState('');

  // If editing, load the template data
  useEffect(() => {
    if (mode === 'edit' && editingTemplateId) {
      const template = templates.find(t => t.id === editingTemplateId);
      if (template) {
        setName(template.name);
        setType(template.type);
        setDescription(template.description);
      }
    } else {
      // For create mode, set default values
      setName('');
      setType(initialType);
      setDescription('');
    }
  }, [mode, editingTemplateId, templates, initialType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'create') {
      // Create new template
      const content = type === 'invoice' ? invoice : proposal;
      addTemplate(name, type, description, content);
    } else if (mode === 'edit' && editingTemplateId) {
      // Update existing template
      updateTemplate(editingTemplateId, {
        name,
        type,
        description,
        updatedAt: new Date().toISOString()
      });
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Create New Template' : 'Edit Template'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'create' 
                ? 'Create a reusable template for future documents.' 
                : 'Update the template details.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Template Name
              </label>
              <input
                id="name"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter template name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Template Type
              </label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={type}
                onChange={(e) => setType(e.target.value as 'invoice' | 'proposal')}
                disabled={mode === 'edit'} // Can't change type when editing
              >
                <option value="invoice">Invoice</option>
                <option value="proposal">Proposal</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="min-h-[80px] w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter template description"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create Template' : 'Update Template'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateForm;
