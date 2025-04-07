import { Client, Company, Invoice, LineItem, Proposal, TimelineItem, PricingItem } from '@/types';
import { generateId, getTodayISO, getDueDateISO } from '@/lib/utils';

// Mock company data (user's company)
export const mockCompany: Company = {
  name: 'Able Limited',
  email: 'contact@ablelimited.com',
  address: {
    street: '123 Business Ave',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    country: 'USA',
  },
  phone: '(555) 123-4567',
  taxId: '12-3456789',
};

// Mock clients
export const mockClients: Client[] = [
  {
    id: generateId(),
    name: 'Acme Corporation',
    email: 'billing@acmecorp.com',
    address: {
      street: '789 Corporate Blvd',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    phone: '(555) 987-6543',
  },
  {
    id: generateId(),
    name: 'TechStart Inc',
    email: 'accounts@techstart.io',
    address: {
      street: '456 Innovation Way',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA',
    },
    phone: '(555) 456-7890',
  },
  {
    id: generateId(),
    name: 'Green Leaf Design',
    email: 'finance@greenleaf.co',
    address: {
      street: '321 Creative St',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'USA',
    },
    phone: '(555) 234-5678',
  },
];

// Mock line items
export const mockLineItems: LineItem[] = [
  {
    id: generateId(),
    description: 'Website Development',
    quantity: 1,
    rate: 1500,
    amount: 1500,
  },
  {
    id: generateId(),
    description: 'Logo Design',
    quantity: 1,
    rate: 500,
    amount: 500,
  },
  {
    id: generateId(),
    description: 'Content Creation (5 pages)',
    quantity: 5,
    rate: 100,
    amount: 500,
  },
];

// Mock invoice
export const mockInvoice: Invoice = {
  id: generateId(),
  invoiceNumber: 'INV-2023-001',
  date: getTodayISO(),
  dueDate: getDueDateISO(),
  client: mockClients[0],
  company: mockCompany,
  lineItems: mockLineItems,
  subtotal: 2500,
  taxRate: 10,
  taxAmount: 250,
  total: 2750,
  notes: 'Thank you for your business!',
  terms: 'Payment due within 30 days.',
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock timeline items
export const mockTimelineItems: TimelineItem[] = [
  {
    id: generateId(),
    phase: 'Discovery',
    deliverables: 'Research Report',
    duration: '2 weeks',
  },
  {
    id: generateId(),
    phase: 'Strategy',
    deliverables: 'Marketing Plan',
    duration: '3 weeks',
  },
  {
    id: generateId(),
    phase: 'Implementation',
    deliverables: 'Campaign Launch',
    duration: '4 weeks',
  },
];

// Mock pricing items
export const mockPricingItems: PricingItem[] = [
  {
    id: generateId(),
    service: 'Market Research',
    rate: 2500,
    total: 2500,
  },
  {
    id: generateId(),
    service: 'Content Creation',
    rate: 4000,
    total: 4000,
  },
  {
    id: generateId(),
    service: 'Campaign Management',
    rate: 3500,
    total: 3500,
  },
];

// Mock proposal
export const mockProposal: Proposal = {
  id: generateId(),
  proposalNumber: 'PRO-2023-001',
  date: getTodayISO(),
  expiryDate: getDueDateISO(),
  client: mockClients[1],
  company: mockCompany,
  title: 'Marketing Campaign Proposal',
  scope: 'Our team will develop and execute a comprehensive marketing campaign including:\n\n1. Market research and competitor analysis\n2. Brand strategy development\n3. Content creation for multiple platforms\n4. Social media management\n5. Performance tracking and reporting',
  timeline: mockTimelineItems,
  pricing: mockPricingItems,
  subtotal: 10000,
  taxRate: 10,
  taxAmount: 1000,
  total: 11000,
  notes: 'This proposal is valid for 30 days.',
  terms: 'Payment terms: 50% upfront, 50% upon completion.',
  status: 'draft',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
