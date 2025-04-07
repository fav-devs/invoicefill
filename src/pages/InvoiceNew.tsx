import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Mic, Wand2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const InvoiceNew: React.FC = () => {
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Invoice Number</label>
                    <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      INV-2023-001
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Client</label>
                  <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    Select a client...
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Line Items</CardTitle>
              <CardDescription>Add the products or services you're billing for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
                    <div className="col-span-6">Description</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Rate</div>
                    <div className="col-span-2">Amount</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-12 gap-2 p-4 items-center">
                    <div className="col-span-6">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Website Development
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        1
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        $1,500.00
                      </div>
                    </div>
                    <div className="col-span-2 font-medium">$1,500.00</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <span>Add Line Item</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="space-y-1">
                <div className="text-sm">Subtotal: $1,500.00</div>
                <div className="text-sm">Tax (10%): $150.00</div>
                <div className="text-base font-bold">Total: $1,650.00</div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes & Terms</CardTitle>
              <CardDescription>Add any additional information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <div className="min-h-[100px] w-full rounded-md border border-input bg-background p-3 text-sm">
                    Thank you for your business!
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Terms</label>
                  <div className="min-h-[100px] w-full rounded-md border border-input bg-background p-3 text-sm">
                    Payment due within 30 days.
                  </div>
                </div>
              </div>
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
            <CardContent className="flex justify-center">
              <div className="border rounded-md w-full aspect-[8.5/11] bg-white flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Preview will appear here</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate PDF</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Save Draft</Button>
        <Button>Finalize Invoice</Button>
      </div>
    </div>
  );
};

export default InvoiceNew;
