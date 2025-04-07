import React, { createContext, useContext, useState, useEffect } from 'react';
import { Proposal, TimelineItem, PricingItem, Client } from '@/types';
import { 
  generateId, 
  generateProposalNumber, 
  calculatePricingTotal,
  calculateTaxAmount,
  calculateTotal,
  getTodayISO,
  getDueDateISO,
  saveToLocalStorage,
  getFromLocalStorage
} from '@/lib/utils';
import { mockCompany, mockClients } from '@/data/mockData';

// Define the context type
interface ProposalContextType {
  proposal: Proposal;
  setProposal: React.Dispatch<React.SetStateAction<Proposal>>;
  clients: Client[];
  addTimelineItem: () => void;
  updateTimelineItem: (id: string, field: keyof TimelineItem, value: string) => void;
  removeTimelineItem: (id: string) => void;
  addPricingItem: () => void;
  updatePricingItem: (id: string, field: keyof PricingItem, value: string | number) => void;
  removePricingItem: (id: string) => void;
  updateClient: (clientId: string) => void;
  updateProposalField: <K extends keyof Proposal>(field: K, value: Proposal[K]) => void;
  saveProposal: () => void;
  resetProposal: () => void;
}

// Create the context
const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

// Initial empty timeline item
const emptyTimelineItem: TimelineItem = {
  id: generateId(),
  phase: '',
  deliverables: '',
  duration: '',
};

// Initial empty pricing item
const emptyPricingItem: PricingItem = {
  id: generateId(),
  service: '',
  rate: 0,
  total: 0,
};

// Initial proposal state
const initialProposalState: Proposal = {
  id: generateId(),
  proposalNumber: generateProposalNumber(),
  date: getTodayISO(),
  expiryDate: getDueDateISO(),
  client: mockClients[0], // Default to first client
  company: mockCompany,
  title: '',
  scope: '',
  timeline: [{ ...emptyTimelineItem }],
  pricing: [{ ...emptyPricingItem }],
  subtotal: 0,
  taxRate: 10, // Default tax rate
  taxAmount: 0,
  total: 0,
  notes: 'Thank you for considering our proposal.',
  terms: 'This proposal is valid for 30 days.',
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Provider component
export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved proposal from local storage or use initial state
  const savedProposal = getFromLocalStorage<Proposal>('currentProposal');
  const [proposal, setProposal] = useState<Proposal>(savedProposal || initialProposalState);
  const [clients] = useState<Client[]>(mockClients);

  // Recalculate totals whenever pricing items or tax rate changes
  useEffect(() => {
    const subtotal = calculatePricingTotal(proposal.pricing);
    const taxAmount = calculateTaxAmount(subtotal, proposal.taxRate);
    const total = calculateTotal(subtotal, taxAmount);

    setProposal(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
      updatedAt: new Date().toISOString(),
    }));
  }, [proposal.pricing, proposal.taxRate]);

  // Save to local storage whenever proposal changes
  useEffect(() => {
    saveToLocalStorage('currentProposal', proposal);
  }, [proposal]);

  // Add a new timeline item
  const addTimelineItem = () => {
    setProposal(prev => ({
      ...prev,
      timeline: [...prev.timeline, { ...emptyTimelineItem, id: generateId() }],
    }));
  };

  // Update a timeline item
  const updateTimelineItem = (id: string, field: keyof TimelineItem, value: string) => {
    setProposal(prev => ({
      ...prev,
      timeline: prev.timeline.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Remove a timeline item
  const removeTimelineItem = (id: string) => {
    setProposal(prev => ({
      ...prev,
      timeline: prev.timeline.filter(item => item.id !== id),
    }));
  };

  // Add a new pricing item
  const addPricingItem = () => {
    setProposal(prev => ({
      ...prev,
      pricing: [...prev.pricing, { ...emptyPricingItem, id: generateId() }],
    }));
  };

  // Update a pricing item
  const updatePricingItem = (id: string, field: keyof PricingItem, value: string | number) => {
    setProposal(prev => {
      const updatedPricingItems = prev.pricing.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // If updating the rate, also update the total
          if (field === 'rate') {
            updatedItem.total = Number(value);
          }
          
          return updatedItem;
        }
        return item;
      });
      
      return {
        ...prev,
        pricing: updatedPricingItems,
      };
    });
  };

  // Remove a pricing item
  const removePricingItem = (id: string) => {
    setProposal(prev => ({
      ...prev,
      pricing: prev.pricing.filter(item => item.id !== id),
    }));
  };

  // Update client
  const updateClient = (clientId: string) => {
    const selectedClient = clients.find(client => client.id === clientId);
    if (selectedClient) {
      setProposal(prev => ({
        ...prev,
        client: selectedClient,
      }));
    }
  };

  // Update any proposal field
  const updateProposalField = <K extends keyof Proposal>(field: K, value: Proposal[K]) => {
    setProposal(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Save proposal (in a real app, this would send to a server)
  const saveProposal = () => {
    // For now, just update the status and save to local storage
    setProposal(prev => ({
      ...prev,
      status: 'sent',
      updatedAt: new Date().toISOString(),
    }));
    
    // Save to proposals list
    const savedProposals = getFromLocalStorage<Proposal[]>('proposals') || [];
    const updatedProposals = [...savedProposals.filter(prop => prop.id !== proposal.id), proposal];
    saveToLocalStorage('proposals', updatedProposals);
    
    // Could add notification here
    console.log('Proposal saved:', proposal);
  };

  // Reset proposal to initial state
  const resetProposal = () => {
    setProposal({
      ...initialProposalState,
      id: generateId(),
      proposalNumber: generateProposalNumber(),
      date: getTodayISO(),
      expiryDate: getDueDateISO(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <ProposalContext.Provider
      value={{
        proposal,
        setProposal,
        clients,
        addTimelineItem,
        updateTimelineItem,
        removeTimelineItem,
        addPricingItem,
        updatePricingItem,
        removePricingItem,
        updateClient,
        updateProposalField,
        saveProposal,
        resetProposal,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};

// Custom hook to use the proposal context
export const useProposal = () => {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error('useProposal must be used within a ProposalProvider');
  }
  return context;
};
