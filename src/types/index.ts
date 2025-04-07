// Client model
export interface Client {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
}

// Company model (user's company)
export interface Company {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
  taxId?: string;
  logo?: string;
}

// Line item model
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

// Invoice model
export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  client: Client;
  company: Company;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes?: string;
  terms?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt: string;
  updatedAt: string;
}

// Proposal model
export interface Proposal {
  id: string;
  proposalNumber: string;
  date: string;
  expiryDate: string;
  client: Client;
  company: Company;
  title: string;
  scope: string;
  timeline: TimelineItem[];
  pricing: PricingItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes?: string;
  terms?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Timeline item for proposals
export interface TimelineItem {
  id: string;
  phase: string;
  deliverables: string;
  duration: string;
}

// Pricing item for proposals
export interface PricingItem {
  id: string;
  service: string;
  rate: number;
  total: number;
}

// Template model
export interface Template {
  id: string;
  name: string;
  type: 'invoice' | 'proposal';
  description: string;
  content: Invoice | Proposal;
  createdAt: string;
  updatedAt: string;
  lastUsed?: string;
}
