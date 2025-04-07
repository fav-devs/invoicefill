import React from 'react';
import { Template } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FileSpreadsheet } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onApply: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onApply }) => {
  return (
    <Card className="hover:border-primary cursor-pointer transition-colors">
      <CardContent className="p-4 flex flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
            {template.type === 'invoice' ? (
              <FileText className="h-5 w-5 text-primary" />
            ) : (
              <FileSpreadsheet className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">{template.name}</p>
            <p className="text-xs text-muted-foreground">{template.description}</p>
          </div>
        </div>
        <div className="flex justify-end mt-auto pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onApply(template.id)}
          >
            Use Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
