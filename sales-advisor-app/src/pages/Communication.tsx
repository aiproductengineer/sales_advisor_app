import React, { useState } from 'react';
import { MessageSquare, Mail, Send } from 'lucide-react';
import { mockTemplates } from '../data/mockData';
import { MessageTemplate, TemplateCategory } from '../types';

const CHANNEL_ICONS = {
  email: <Mail className="w-4 h-4" />,
  sms: <MessageSquare className="w-4 h-4" />,
  whatsapp: <MessageSquare className="w-4 h-4" />,
};

export const Communication: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);

  const filteredTemplates = selectedCategory === 'all'
    ? mockTemplates
    : mockTemplates.filter((t) => t.category === selectedCategory);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-display font-bold mb-3">Communication Templates</h1>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <FilterButton
            label="All"
            active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          />
          <FilterButton
            label="Occasion"
            active={selectedCategory === 'occasion'}
            onClick={() => setSelectedCategory('occasion')}
          />
          <FilterButton
            label="Follow-up"
            active={selectedCategory === 'followup'}
            onClick={() => setSelectedCategory('followup')}
          />
          <FilterButton
            label="Education"
            active={selectedCategory === 'education'}
            onClick={() => setSelectedCategory('education')}
          />
        </div>
      </div>

      {/* Template List or Detail */}
      {selectedTemplate ? (
        <TemplateDetail template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={() => setSelectedTemplate(template)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
      active
        ? 'bg-primary-700 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

interface TemplateCardProps {
  template: MessageTemplate;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  const getCategoryColor = () => {
    switch (template.category) {
      case 'occasion':
        return 'bg-pink-100 text-pink-800';
      case 'followup':
        return 'bg-blue-100 text-blue-800';
      case 'education':
        return 'bg-purple-100 text-purple-800';
      case 'promotional':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelColor = () => {
    switch (template.channel) {
      case 'whatsapp':
        return 'bg-green-100 text-green-800';
      case 'email':
        return 'bg-blue-100 text-blue-800';
      case 'sms':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className="card hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{template.name}</h3>
        <span className={`badge ${getChannelColor()} flex items-center gap-1`}>
          {CHANNEL_ICONS[template.channel]}
          {template.channel}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{template.body}</p>

      <div className="flex items-center justify-between">
        <span className={`badge ${getCategoryColor()}`}>
          {template.category}
        </span>
        <span className="text-xs text-gray-500">
          {template.variables.length} variables
        </span>
      </div>
    </div>
  );
};

interface TemplateDetailProps {
  template: MessageTemplate;
  onBack: () => void;
}

const TemplateDetail: React.FC<TemplateDetailProps> = ({ template, onBack }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleVariableChange = (variable: string, value: string) => {
    setFormData((prev) => ({ ...prev, [variable]: value }));
  };

  const getPreviewBody = () => {
    let preview = template.body;
    Object.entries(formData).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`\\{${key}\\}`, 'g'), value || `{${key}}`);
    });
    return preview;
  };

  const handleSend = () => {
    alert('Send feature - would open customer selection and send message');
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white p-6">
        <button
          onClick={onBack}
          className="mb-4 text-sm hover:underline"
        >
          ← Back to templates
        </button>
        <h1 className="text-2xl font-display font-bold mb-2">{template.name}</h1>
        <div className="flex gap-2">
          <span className="badge bg-white/20 text-white">
            {template.category}
          </span>
          <span className="badge bg-white/20 text-white flex items-center gap-1">
            {CHANNEL_ICONS[template.channel]}
            {template.channel}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Subject (for email) */}
        {template.subject && (
          <div className="card">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <p className="text-gray-900">{template.subject}</p>
          </div>
        )}

        {/* Variables */}
        {template.variables.length > 0 && (
          <div className="card">
            <h3 className="font-semibold mb-3">Variables</h3>
            <div className="space-y-3">
              {template.variables.map((variable) => (
                <div key={variable}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {variable}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${variable}`}
                    value={formData[variable] || ''}
                    onChange={(e) => handleVariableChange(variable, e.target.value)}
                    className="input"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="card bg-gray-50">
          <h3 className="font-semibold mb-3">Preview</h3>
          {template.subject && (
            <div className="mb-3 pb-3 border-b border-gray-200">
              <p className="text-xs text-gray-600 mb-1">Subject:</p>
              <p className="font-medium">{template.subject}</p>
            </div>
          )}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm whitespace-pre-wrap text-gray-800">
              {getPreviewBody()}
            </p>
          </div>
        </div>

        {/* Template Body */}
        <div className="card">
          <h3 className="font-semibold mb-2">Original Template</h3>
          <p className="text-sm text-gray-600 font-mono bg-gray-50 p-3 rounded whitespace-pre-wrap">
            {template.body}
          </p>
        </div>

        {/* Compliance Notice */}
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Compliance Notice</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Customer consent will be verified before sending</li>
            <li>• DND list will be checked automatically</li>
            <li>• Messages will not be sent during quiet hours (9 PM - 9 AM)</li>
            <li>• All communications are logged for audit purposes</li>
          </ul>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3"
        >
          <Send className="w-5 h-5" />
          Use Template
        </button>
      </div>
    </div>
  );
};
