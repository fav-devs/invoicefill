import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Mic, Wand2 } from 'lucide-react';
import { InvoiceProvider, useInvoice } from '@/context/InvoiceContext';
import InvoiceDetails from '@/components/forms/InvoiceDetails';
import LineItemsForm from '@/components/forms/LineItemsForm';
import NotesTermsForm from '@/components/forms/NotesTermsForm';
import InvoicePreview from '@/components/preview/InvoicePreview';
import PdfGenerator from '@/components/preview/PdfGenerator';

// Inner component that uses the invoice context
const InvoiceForm: React.FC = () => {
  const { saveInvoice, resetInvoice } = useInvoice();
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">Create a professional invoice for your clients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>Enter the basic information for this invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceDetails />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Line Items</CardTitle>
              <CardDescription>Add the products or services you're billing for</CardDescription>
            </CardHeader>
            <CardContent>
              <LineItemsForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes & Terms</CardTitle>
              <CardDescription>Add any additional information</CardDescription>
            </CardHeader>
            <CardContent>
              <NotesTermsForm />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get help with your invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full flex items-center space-x-2" variant="outline">
                  <Mic className="h-4 w-4" />
                  <span>Voice to Text</span>
                </Button>
                <Button className="w-full flex items-center space-x-2" variant="outline">
                  <Wand2 className="h-4 w-4" />
                  <span>Generate Content</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your invoice will look</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center overflow-auto max-h-[500px]">
              <div ref={previewRef} className="border rounded-md w-full bg-white">
                <InvoicePreview />
              </div>
            </CardContent>
            <CardFooter>
              <PdfGenerator previewRef={previewRef} />
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={resetInvoice}>Reset</Button>
        <Button variant="outline">Save Draft</Button>
        <Button onClick={saveInvoice}>Finalize Invoice</Button>
      </div>
    </div>
  );
};

// Wrapper component that provides the invoice context
const InvoiceNew: React.FC = () => {
  return (
    <InvoiceProvider>
      <InvoiceForm />
    </InvoiceProvider>
  );
};

export default InvoiceNew;
