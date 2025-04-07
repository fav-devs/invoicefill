import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LineItem, PricingItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Generate an invoice number
export function generateInvoiceNumber(): string {
  const prefix = "INV";
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${prefix}-${year}-${randomNum}`;
}

// Generate a proposal number
export function generateProposalNumber(): string {
  const prefix = "PRO";
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${prefix}-${year}-${randomNum}`;
}

// Calculate line item amount
export function calculateLineItemAmount(quantity: number, rate: number): number {
  return quantity * rate;
}

// Calculate subtotal from line items
export function calculateSubtotal(lineItems: LineItem[]): number {
  return lineItems.reduce((sum, item) => sum + item.amount, 0);
}

// Calculate tax amount
export function calculateTaxAmount(subtotal: number, taxRate: number): number {
  return subtotal * (taxRate / 100);
}

// Calculate total
export function calculateTotal(subtotal: number, taxAmount: number): number {
  return subtotal + taxAmount;
}

// Calculate proposal pricing total
export function calculatePricingTotal(pricingItems: PricingItem[]): number {
  return pricingItems.reduce((sum, item) => sum + item.total, 0);
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Get today's date in ISO format
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

// Get a date 30 days from now in ISO format (for due dates)
export function getDueDateISO(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
}

// Save data to local storage
export function saveToLocalStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get data from local storage
export function getFromLocalStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data) as T;
  }
  return null;
}
