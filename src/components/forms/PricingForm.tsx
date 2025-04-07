import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import { useProposal } from '@/context/ProposalContext';
import { formatCurrency } from '@/lib/utils';

const PricingForm: React.FC = () => {
  const { proposal, addPricingItem, updatePricingItem, removePricingItem } = useProposal();

  const handleInputChange = (
    id: string,
    field: string,
    value: string | number
  ) => {
    updatePricingItem(id, field as any, value);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
          <div className="col-span-6">Service</div>
          <div className="col-span-3">Rate</div>
          <div className="col-span-2">Total</div>
          <div className="col-span-1"></div>
        </div>
        <Separator />
        {proposal.pricing.map((item) => (
          <React.Fragment key={item.id}>
            <div className="grid grid-cols-12 gap-2 p-4 items-center">
              <div className="col-span-6">
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={item.service}
                  onChange={(e) =>
                    handleInputChange(item.id, 'service', e.target.value)
                  }
                  placeholder="Enter service description"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={item.rate}
                  onChange={(e) =>
                    handleInputChange(item.id, 'rate', Number(e.target.value))
                  }
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div className="col-span-2 font-medium">
                {formatCurrency(item.total)}
              </div>
              <div className="col-span-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePricingItem(item.id)}
                  disabled={proposal.pricing.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
        onClick={addPricingItem}
      >
        <Plus className="h-4 w-4" />
        <span>Add Service</span>
      </Button>

      <div className="flex justify-end space-y-1 pt-4">
        <div className="w-1/3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatCurrency(proposal.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax ({proposal.taxRate}%):</span>
            <span>{formatCurrency(proposal.taxAmount)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-base font-bold">
            <span>Total:</span>
            <span>{formatCurrency(proposal.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
