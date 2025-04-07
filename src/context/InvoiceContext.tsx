import React, { createContext, useContext, useState, useEffect } from 'react';
import { Invoice, LineItem, Client } from '@/types';
import { 
  generateId, 
  generateInvoiceNumber, 
  calculateLineItemAmount,
  calculateSubtotal,
  calculateTaxAmount,
  calculateTotal,
  getTodayISO,
  getDueDateISO,
  saveToLocalStorage,
  getFromLocalStorage
} from '@/lib/utils';
import { mockCompany, mockClients } from '@/data/mockData';

// Define the context type
interface InvoiceContextType {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
  clients: Client[];
  addLineItem: () => void;
  updateLineItem: (id: string, field: keyof LineItem, value: string | number) => void;
  removeLineItem: (id: string) => void;
  updateClient: (clientId: string) => void;
  updateInvoiceField: <K extends keyof Invoice>(field: K, value: Invoice[K]) => void;
  saveInvoice: () => void;
  resetInvoice: () => void;
}

// Create the context
const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

// Initial empty line item
const emptyLineItem: LineItem = {
  id: generateId(),
  description: '',
  quantity: 1,
  rate: 0,
  amount: 0,
};

// Initial invoice state
const initialInvoiceState: Invoice = {
  id: generateId(),
  invoiceNumber: generateInvoiceNumber(),
  date: getTodayISO(),
  dueDate: getDueDateISO(),
  client: mockClients[0], // Default to first client
  company: mockCompany,
  lineItems: [{ ...emptyLineItem }],
  subtotal: 0,
  taxRate: 10, // Default tax rate
  taxAmount: 0,
  total: 0,
  notes: 'Thank you for your business!',
  terms: 'Payment due within 30 days.',
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Provider component
export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved invoice from local storage or use initial state
  const savedInvoice = getFromLocalStorage<Invoice>('currentInvoice');
  const [invoice, setInvoice] = useState<Invoice>(savedInvoice || initialInvoiceState);
  const [clients] = useState<Client[]>(mockClients);

  // Recalculate totals whenever line items or tax rate changes
  useEffect(() => {
    const subtotal = calculateSubtotal(invoice.lineItems);
    const taxAmount = calculateTaxAmount(subtotal, invoice.taxRate);
    const total = calculateTotal(subtotal, taxAmount);

    setInvoice(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
      updatedAt: new Date().toISOString(),
    }));
  }, [invoice.lineItems, invoice.taxRate]);

  // Save to local storage whenever invoice changes
  useEffect(() => {
    saveToLocalStorage('currentInvoice', invoice);
  }, [invoice]);

  // Add a new line item
  const addLineItem = () => {
    setInvoice(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { ...emptyLineItem, id: generateId() }],
    }));
  };

  // Update a line item
  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setInvoice(prev => {
      const updatedLineItems = prev.lineItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalculate amount if quantity or rate changed
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = calculateLineItemAmount(
              field === 'quantity' ? Number(value) : updatedItem.quantity,
              field === 'rate' ? Number(value) : updatedItem.rate
            );
          }
          
          return updatedItem;
        }
        return item;
      });
      
      return {
        ...prev,
        lineItems: updatedLineItems,
      };
    });
  };

  // Remove a line item
  const removeLineItem = (id: string) => {
    setInvoice(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id),
    }));
  };

  // Update client
  const updateClient = (clientId: string) => {
    const selectedClient = clients.find(client => client.id === clientId);
    if (selectedClient) {
      setInvoice(prev => ({
        ...prev,
        client: selectedClient,
      }));
    }
  };

  // Update any invoice field
  const updateInvoiceField = <K extends keyof Invoice>(field: K, value: Invoice[K]) => {
    setInvoice(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Save invoice (in a real app, this would send to a server)
  const saveInvoice = () => {
    // For now, just update the status and save to local storage
    setInvoice(prev => ({
      ...prev,
      status: 'sent',
      updatedAt: new Date().toISOString(),
    }));
    
    // Save to invoices list
    const savedInvoices = getFromLocalStorage<Invoice[]>('invoices') || [];
    const updatedInvoices = [...savedInvoices.filter(inv => inv.id !== invoice.id), invoice];
    saveToLocalStorage('invoices', updatedInvoices);
    
    // Could add notification here
    console.log('Invoice saved:', invoice);
  };

  // Reset invoice to initial state
  const resetInvoice = () => {
    setInvoice({
      ...initialInvoiceState,
      id: generateId(),
      invoiceNumber: generateInvoiceNumber(),
      date: getTodayISO(),
      dueDate: getDueDateISO(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        setInvoice,
        clients,
        addLineItem,
        updateLineItem,
        removeLineItem,
        updateClient,
        updateInvoiceField,
        saveInvoice,
        resetInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

// Custom hook to use the invoice context
export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};
