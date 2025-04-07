import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileSpreadsheet, Mic, Wand2, Calendar, DollarSign, Clock, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ProposalNew: React.FC = () => {
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Proposal Number</label>
                    <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      PRO-2023-001
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Title</label>
                  <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    Marketing Campaign Proposal
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scope of Work</CardTitle>
              <CardDescription>Describe the services you'll provide</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="min-h-[150px] w-full rounded-md border border-input bg-background p-3 text-sm">
                  Our team will develop and execute a comprehensive marketing campaign including:

                  1. Market research and competitor analysis
                  2. Brand strategy development
                  3. Content creation for multiple platforms
                  4. Social media management
                  5. Performance tracking and reporting
                </div>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Wand2 className="h-4 w-4" />
                  <span>Generate Scope</span>
                </Button>
              </div>
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
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
                    <div className="col-span-4">Phase</div>
                    <div className="col-span-4">Deliverables</div>
                    <div className="col-span-4">Timeline</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-12 gap-2 p-4 items-center">
                    <div className="col-span-4">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Discovery
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Research Report
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        2 weeks
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-12 gap-2 p-4 items-center">
                    <div className="col-span-4">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Strategy
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Marketing Plan
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        3 weeks
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Phase</span>
                </Button>
              </div>
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
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
                    <div className="col-span-6">Service</div>
                    <div className="col-span-3">Rate</div>
                    <div className="col-span-3">Total</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-12 gap-2 p-4 items-center">
                    <div className="col-span-6">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Market Research
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        $2,500.00
                      </div>
                    </div>
                    <div className="col-span-3 font-medium">$2,500.00</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-12 gap-2 p-4 items-center">
                    <div className="col-span-6">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Content Creation
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        $4,000.00
                      </div>
                    </div>
                    <div className="col-span-3 font-medium">$4,000.00</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Service</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="space-y-1">
                <div className="text-sm">Subtotal: $6,500.00</div>
                <div className="text-sm">Tax (10%): $650.00</div>
                <div className="text-base font-bold">Total: $7,150.00</div>
              </div>
            </CardFooter>
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Templates</CardTitle>
                <CardDescription>Use a pre-made template</CardDescription>
              </div>
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
        <Button>Finalize Proposal</Button>
      </div>
    </div>
  );
};

export default ProposalNew;
