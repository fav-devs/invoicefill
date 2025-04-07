import React, { createContext, useContext, useState, useEffect } from 'react';
import { Template, Invoice, Proposal } from '@/types';
import { 
  generateId,
  saveToLocalStorage,
  getFromLocalStorage
} from '@/lib/utils';
import { mockInvoice, mockProposal } from '@/data/mockData';

// Define the context type
interface TemplateContextType {
  templates: Template[];
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
  addTemplate: (name: string, type: 'invoice' | 'proposal', description: string, content: Invoice | Proposal) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  applyTemplate: (templateId: string) => Invoice | Proposal | null;
}

// Create the context
const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

// Initial templates
const initialTemplates: Template[] = [
  {
    id: generateId(),
    name: 'Basic Invoice',
    type: 'invoice',
    description: 'A simple invoice template with essential fields',
    content: { ...mockInvoice, id: generateId() },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUsed: null,
  },
  {
    id: generateId(),
    name: 'Detailed Invoice',
    type: 'invoice',
    description: 'Comprehensive invoice with detailed line items and notes',
    content: { 
      ...mockInvoice, 
      id: generateId(),
      notes: 'Thank you for your business! We appreciate your prompt payment.\n\nPayment Methods:\n- Bank Transfer\n- Credit Card\n- PayPal',
      terms: 'Payment due within 30 days. Late payments are subject to a 1.5% monthly interest charge.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUsed: null,
  },
  {
    id: generateId(),
    name: 'Marketing Proposal',
    type: 'proposal',
    description: 'Proposal template for marketing services',
    content: { ...mockProposal, id: generateId() },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUsed: null,
  },
  {
    id: generateId(),
    name: 'Web Development Proposal',
    type: 'proposal',
    description: 'Proposal for web development projects',
    content: { 
      ...mockProposal, 
      id: generateId(),
      title: 'Web Development Project Proposal',
      scope: 'Our team will design and develop a custom website including:\n\n1. Custom design based on your brand guidelines\n2. Responsive layout for all devices\n3. Content management system implementation\n4. Basic SEO optimization\n5. Browser testing and quality assurance',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastUsed: null,
  },
];

// Provider component
export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved templates from local storage or use initial templates
  const savedTemplates = getFromLocalStorage<Template[]>('templates');
  const [templates, setTemplates] = useState<Template[]>(savedTemplates || initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Save to local storage whenever templates change
  useEffect(() => {
    saveToLocalStorage('templates', templates);
  }, [templates]);

  // Add a new template
  const addTemplate = (
    name: string, 
    type: 'invoice' | 'proposal', 
    description: string, 
    content: Invoice | Proposal
  ) => {
    const newTemplate: Template = {
      id: generateId(),
      name,
      type,
      description,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUsed: null,
    };

    setTemplates(prev => [...prev, newTemplate]);
    return newTemplate;
  };

  // Update an existing template
  const updateTemplate = (id: string, updates: Partial<Template>) => {
    setTemplates(prev => 
      prev.map(template => 
        template.id === id 
          ? { 
              ...template, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            } 
          : template
      )
    );
  };

  // Delete a template
  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  // Apply a template to create a new document
  const applyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    if (!template) return null;
    
    // Update the last used timestamp
    updateTemplate(templateId, { 
      lastUsed: new Date().toISOString() 
    });
    
    // Create a new document from the template
    const newContent = {
      ...template.content,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return newContent;
  };

  return (
    <TemplateContext.Provider
      value={{
        templates,
        selectedTemplate,
        setSelectedTemplate,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        applyTemplate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

// Custom hook to use the template context
export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
};
