import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import { useProposal } from '@/context/ProposalContext';

const TimelineForm: React.FC = () => {
  const { proposal, addTimelineItem, updateTimelineItem, removeTimelineItem } = useProposal();

  const handleInputChange = (
    id: string,
    field: string,
    value: string
  ) => {
    updateTimelineItem(id, field as any, value);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
          <div className="col-span-4">Phase</div>
          <div className="col-span-4">Deliverables</div>
          <div className="col-span-3">Timeline</div>
          <div className="col-span-1"></div>
        </div>
        <Separator />
        {proposal.timeline.map((item) => (
          <React.Fragment key={item.id}>
            <div className="grid grid-cols-12 gap-2 p-4 items-center">
              <div className="col-span-4">
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={item.phase}
                  onChange={(e) =>
                    handleInputChange(item.id, 'phase', e.target.value)
                  }
                  placeholder="Enter phase name"
                />
              </div>
              <div className="col-span-4">
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={item.deliverables}
                  onChange={(e) =>
                    handleInputChange(item.id, 'deliverables', e.target.value)
                  }
                  placeholder="Enter deliverables"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={item.duration}
                  onChange={(e) =>
                    handleInputChange(item.id, 'duration', e.target.value)
                  }
                  placeholder="e.g., 2 weeks"
                />
              </div>
              <div className="col-span-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTimelineItem(item.id)}
                  disabled={proposal.timeline.length === 1}
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
        onClick={addTimelineItem}
      >
        <Plus className="h-4 w-4" />
        <span>Add Phase</span>
      </Button>
    </div>
  );
};

export default TimelineForm;
