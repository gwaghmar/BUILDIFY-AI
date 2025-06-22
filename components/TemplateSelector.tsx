'use client';

import React, { useState } from 'react';
import { APP_TEMPLATES, AppTemplate } from '@/lib/templates';

interface TemplateSelectorProps {
  onTemplateSelect: (template: AppTemplate) => void;
  selectedTemplateId?: string;
}

export default function TemplateSelector({ onTemplateSelect, selectedTemplateId }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);

  const categories = ['all', ...Array.from(new Set(APP_TEMPLATES.map(t => t.category)))];
  const filteredTemplates = selectedCategory === 'all' 
    ? APP_TEMPLATES 
    : APP_TEMPLATES.filter(t => t.category === selectedCategory);

  const displayedTemplates = showAll ? filteredTemplates : filteredTemplates.slice(0, 6);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-arcade-darker text-foreground hover:bg-primary/20'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedTemplates.map(template => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`arcade-card cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedTemplateId === template.id
                ? 'ring-2 ring-primary ring-opacity-50'
                : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-arcade text-lg text-primary">{template.name}</h3>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                ~{template.estimatedTokens} tokens
              </span>
            </div>
            <p className="text-sm text-foreground/80 mb-3">{template.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                {template.category}
              </span>
              <button className="text-xs text-primary hover:text-primary/80 font-medium">
                Use Template →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length > 6 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="arcade-button text-sm"
          >
            {showAll ? 'Show Less' : `Show ${filteredTemplates.length - 6} More Templates`}
          </button>
        </div>
      )}

      <div className="text-center text-sm text-foreground/60">
        <p>💡 Using templates can save up to 70% of tokens compared to custom prompts!</p>
      </div>
    </div>
  );
} 