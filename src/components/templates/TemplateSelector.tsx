import React from 'react';
import { useTemplates } from '@/context/TemplateContext';
import TemplateCard from './TemplateCard';

interface TemplateSelectorProps {
  type: 'invoice' | 'proposal';
  onApplyTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ type, onApplyTemplate }) => {
  const { templates } = useTemplates();
  
  // Filter templates by type
  const filteredTemplates = templates.filter(template => template.type === type);
  
  // Sort by last used (most recent first)
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (!a.lastUsed) return 1;
    if (!b.lastUsed) return -1;
    return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
  });
  
  // Take only the top 3 templates
  const recentTemplates = sortedTemplates.slice(0, 3);
  
  return (
    <div className="space-y-2">
      {recentTemplates.length === 0 ? (
        <p className="text-sm text-muted-foreground">No templates available.</p>
      ) : (
        recentTemplates.map(template => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            onApply={onApplyTemplate} 
          />
        ))
      )}
    </div>
  );
};

export default TemplateSelector;
