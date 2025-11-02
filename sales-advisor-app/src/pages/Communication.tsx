import React, { useState } from 'react';
import { MessageSquare, Mail, Send, Sparkles, Shield } from 'lucide-react';
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
      <div className="p-4">
        <div className="card-premium p-5 mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h1 className="text-2xl font-display font-bold mb-1 text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-luxury-gold" />
              Communication Templates
            </h1>
            <p className="text-gray-400 text-sm">Pre-approved messages for luxury retail</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
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
    className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
      active
        ? 'btn-primary'
        : 'btn-glass'
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
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'followup':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'education':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'promotional':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getChannelColor = () => {
    switch (template.channel) {
      case 'whatsapp':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'email':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'sms':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div
      onClick={onClick}
      className="glass-card-hover p-4 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-white">{template.name}</h3>
          <span className={`badge ${getChannelColor()} flex items-center gap-1`}>
            {CHANNEL_ICONS[template.channel]}
            {template.channel}
          </span>
        </div>

        <p className="text-sm text-gray-300 line-clamp-2 mb-3">{template.body}</p>

        <div className="flex items-center justify-between">
          <span className={`badge ${getCategoryColor()}`}>
            {template.category}
          </span>
          <span className="text-xs text-gray-500">
            {template.variables.length} variables
          </span>
        </div>
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
      <div className="relative overflow-hidden p-6 m-4 glass-card">
        <div className="absolute top-0 right-0 w-48 h-48 bg-luxury-gold/10 rounded-full blur-3xl" />
        <button
          onClick={onBack}
          className="mb-4 text-sm text-gray-400 hover:text-luxury-gold transition-colors"
        >
          ← Back to templates
        </button>
        <div className="relative z-10">
          <h1 className="text-2xl font-display font-bold mb-2 text-white">{template.name}</h1>
          <div className="flex gap-2">
            <span className="badge bg-purple-500/20 text-purple-300 border-purple-500/30">
              {template.category}
            </span>
            <span className="badge bg-blue-500/20 text-blue-300 border-blue-500/30 flex items-center gap-1">
              {CHANNEL_ICONS[template.channel]}
              {template.channel}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Subject (for email) */}
        {template.subject && (
          <div className="glass-card p-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Subject
            </label>
            <p className="text-gray-200">{template.subject}</p>
          </div>
        )}

        {/* Variables */}
        {template.variables.length > 0 && (
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3 text-white">Variables</h3>
            <div className="space-y-3">
              {template.variables.map((variable) => (
                <div key={variable}>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
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
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3 text-white">Preview</h3>
          {template.subject && (
            <div className="mb-3 pb-3 border-b border-white/10">
              <p className="text-xs text-gray-500 mb-1">Subject:</p>
              <p className="font-medium text-gray-300">{template.subject}</p>
            </div>
          )}
          <div className="bg-white/5 p-4 rounded-lg border border-white/10 backdrop-blur-xl">
            <p className="text-sm whitespace-pre-wrap text-gray-200">
              {getPreviewBody()}
            </p>
          </div>
        </div>

        {/* Template Body */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-2 text-white">Original Template</h3>
          <p className="text-sm text-gray-400 font-mono bg-white/5 p-3 rounded whitespace-pre-wrap">
            {template.body}
          </p>
        </div>

        {/* Compliance Notice */}
        <div className="glass-card p-4 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30">
          <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Compliance Notice
          </h3>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>• Customer consent will be verified before sending</li>
            <li>• DND list will be checked automatically</li>
            <li>• Messages will not be sent during quiet hours (9 PM - 9 AM)</li>
            <li>• All communications are logged for audit purposes</li>
          </ul>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Send className="w-5 h-5" />
            Use Template
          </span>
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
        </button>
      </div>
    </div>
  );
};
