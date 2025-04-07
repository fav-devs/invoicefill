import React from 'react';
import { useTemplates } from '@/context/TemplateContext';
import { formatDate } from '@/lib/utils';
import { FileText, FileSpreadsheet, MoreHorizontal, Edit, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TemplateListProps {
  filter?: 'all' | 'invoice' | 'proposal';
  onApplyTemplate: (templateId: string) => void;
  onEditTemplate: (templateId: string) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({ 
  filter = 'all',
  onApplyTemplate,
  onEditTemplate
}) => {
  const { templates, deleteTemplate } = useTemplates();

  // Filter templates based on the filter prop
  const filteredTemplates = templates.filter(template => {
    if (filter === 'all') return true;
    return template.type === filter;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium">
          <div className="col-span-4">Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-1">Last Used</div>
          <div className="col-span-1"></div>
        </div>
        <Separator />
        {filteredTemplates.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No templates found.
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <React.Fragment key={template.id}>
              <div className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-accent/50">
                <div className="col-span-4 flex items-center space-x-2">
                  {template.type === 'invoice' ? (
                    <FileText className="h-4 w-4 text-primary" />
                  ) : (
                    <FileSpreadsheet className="h-4 w-4 text-primary" />
                  )}
                  <span className="font-medium">{template.name}</span>
                </div>
                <div className="col-span-2">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                    {template.type === 'invoice' ? 'Invoice' : 'Proposal'}
                  </span>
                </div>
                <div className="col-span-4 text-sm text-muted-foreground">{template.description}</div>
                <div className="col-span-1 text-xs text-muted-foreground">
                  {template.lastUsed ? formatDate(template.lastUsed) : 'Never'}
                </div>
                <div className="col-span-1 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onApplyTemplate(template.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Use Template</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditTemplate(template.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => deleteTemplate(template.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Separator />
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default TemplateList;
