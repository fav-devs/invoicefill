import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

const ScopeForm: React.FC = () => {
  const { proposal, updateProposalField } = useProposal();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateProposalField('scope', e.target.value);
  };

  const generateSampleScope = () => {
    const sampleScope = `Our team will develop and execute a comprehensive ${proposal.title || 'project'} including:

1. Initial discovery and requirements gathering
2. Strategic planning and roadmap development
3. Design and development phase
4. Implementation and testing
5. Launch and post-launch support
6. Ongoing maintenance and updates`;

    updateProposalField('scope', sampleScope);
  };

  return (
    <div className="space-y-4">
      <textarea
        className="min-h-[200px] w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value={proposal.scope}
        onChange={handleInputChange}
        placeholder="Describe the scope of work for this proposal..."
      />
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center space-x-2"
        onClick={generateSampleScope}
      >
        <Wand2 className="h-4 w-4" />
        <span>Generate Sample Scope</span>
      </Button>
    </div>
  );
};

export default ScopeForm;
