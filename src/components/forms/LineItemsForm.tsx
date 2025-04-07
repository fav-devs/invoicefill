import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import { useInvoice } from '@/context/InvoiceContext';
import { formatCurrency } from '@/lib/utils';

const LineItemsForm: React.FC = () => {
  const { invoice, addLineItem, updateLineItem, removeLineItem } = useInvoice();

  const handleInputChange = (
    id: string,
    field: string,
    value: string | number
  ) => {
    updateLineItem(id, field as any, value);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
          <div className="col-span-6">Description</div>
          <div className="col-span-2">Quantity</div>
          <div className="col-span-2">Rate</div>
          <div className="col-span-1">Amount</div>
          <div className="col-span-1"></div>
        </div>
        <Separator />
        {invoice.lineItems.map((item) => (
          <React.Fragment key={item.id}>
            <div className="grid grid-cols-12 gap-2 p-4 items-center">
              <div className="col-span-6">
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={item.description}
                  onChange={(e) =>
                    handleInputChange(item.id, 'description', e.target.value)
                  }
                  placeholder="Enter item description"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={item.quantity}
                  onChange={(e) =>
                    handleInputChange(item.id, 'quantity', Number(e.target.value))
                  }
                  min="1"
                  step="1"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={item.rate}
                  onChange={(e) =>
                    handleInputChange(item.id, 'rate', Number(e.target.value))
                  }
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="col-span-1 font-medium">
                {formatCurrency(item.amount)}
              </div>
              <div className="col-span-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLineItem(item.id)}
                  disabled={invoice.lineItems.length === 1}
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
        onClick={addLineItem}
      >
        <Plus className="h-4 w-4" />
        <span>Add Line Item</span>
      </Button>

      <div className="flex justify-end space-y-1 pt-4">
        <div className="w-1/3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatCurrency(invoice.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax ({invoice.taxRate}%):</span>
            <span>{formatCurrency(invoice.taxAmount)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-base font-bold">
            <span>Total:</span>
            <span>{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineItemsForm;
