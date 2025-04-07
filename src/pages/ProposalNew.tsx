import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileSpreadsheet, Mic, Wand2, DollarSign, Clock } from 'lucide-react';
import { ProposalProvider, useProposal } from '@/context/ProposalContext';
import ProposalDetails from '@/components/forms/ProposalDetails';
import ScopeForm from '@/components/forms/ScopeForm';
import TimelineForm from '@/components/forms/TimelineForm';
import PricingForm from '@/components/forms/PricingForm';
import ProposalNotesTermsForm from '@/components/forms/ProposalNotesTermsForm';
import ProposalPreview from '@/components/preview/ProposalPreview';
import ProposalPdfGenerator from '@/components/preview/ProposalPdfGenerator';

// Inner component that uses the proposal context
const ProposalForm: React.FC = () => {
  const { saveProposal, resetProposal } = useProposal();
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Create New Proposal</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">Create a professional business proposal for your clients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Details</CardTitle>
              <CardDescription>Enter the basic information for this proposal</CardDescription>
            </CardHeader>
            <CardContent>
              <ProposalDetails />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scope of Work</CardTitle>
              <CardDescription>Describe the services you'll provide</CardDescription>
            </CardHeader>
            <CardContent>
              <ScopeForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>Define the project schedule</CardDescription>
              </div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <TimelineForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Define your pricing structure</CardDescription>
              </div>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <PricingForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes & Terms</CardTitle>
              <CardDescription>Add any additional information</CardDescription>
            </CardHeader>
            <CardContent>
              <ProposalNotesTermsForm />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get help with your proposal</CardDescription>
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
              <CardTitle>Templates</CardTitle>
              <CardDescription>Use a pre-made template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-accent cursor-pointer">
                  <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Marketing Proposal</p>
                    <p className="text-xs text-muted-foreground">Standard marketing services</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-accent cursor-pointer">
                  <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Web Development</p>
                    <p className="text-xs text-muted-foreground">Website creation services</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-accent cursor-pointer">
                  <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Consulting Services</p>
                    <p className="text-xs text-muted-foreground">Business consulting</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your proposal will look</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center overflow-auto max-h-[500px]">
              <div ref={previewRef} className="border rounded-md w-full bg-white">
                <ProposalPreview />
              </div>
            </CardContent>
            <CardFooter>
              <ProposalPdfGenerator previewRef={previewRef} />
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={resetProposal}>Reset</Button>
        <Button variant="outline">Save Draft</Button>
        <Button onClick={saveProposal}>Finalize Proposal</Button>
      </div>
    </div>
  );
};

// Wrapper component that provides the proposal context
const ProposalNew: React.FC = () => {
  return (
    <ProposalProvider>
      <ProposalForm />
    </ProposalProvider>
  );
};

export default ProposalNew;
