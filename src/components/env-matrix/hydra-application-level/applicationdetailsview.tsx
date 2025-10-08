// src/components/env-matrix/ApplicationDetailsView.tsx
'use client';

import { useState } from 'react';
import { Application } from '@/types';
import ProjectSection from './projectsection';
import { ChevronDown, ChevronRight, Package, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

interface ApplicationDetailsViewProps {
  application: Application;
  onUpdate: (app: Application) => void;
  isEditing: boolean;
  theme: any;
  isDark: boolean;
}

export default function ApplicationDetailsView({
  application,
  onUpdate,
  isEditing,
  theme,
  isDark,
}: ApplicationDetailsViewProps) {
  const [expandedSections, setExpandedSections] = useState({
    appFields: true,
    projects: true,
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getAllFields = (): Record<string, any> => {
    return {
      aimId: application.aimId,
      applicationName: application.applicationName,
      ...(application.metadata || {}),
    };
  };

  const handleEditField = (fieldKey: string, currentValue: any) => {
    setEditingField(fieldKey);
    setEditValue(String(currentValue || ''));
  };

  const handleSaveField = (fieldKey: string) => {
    const coreFields = ['aimId', 'applicationName'];
    
    let updatedApp = { ...application };
    
    if (coreFields.includes(fieldKey)) {
      (updatedApp as any)[fieldKey] = editValue;
    } else {
      updatedApp.metadata = {
        ...updatedApp.metadata,
        [fieldKey]: editValue,
      };
    }
    
    onUpdate(updatedApp);
    setEditingField(null);
  };

  const handleDeleteField = (fieldKey: string) => {
    const coreFields = ['aimId', 'applicationName'];
    
    if (coreFields.includes(fieldKey)) {
      if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
        const updatedApp = { ...application };
        (updatedApp as any)[fieldKey] = '';
        onUpdate(updatedApp);
      }
    } else {
      const updatedMetadata = { ...application.metadata };
      delete updatedMetadata[fieldKey];
      onUpdate({ ...application, metadata: updatedMetadata });
    }
  };

  const handleAddField = () => {
    if (newFieldKey.trim() && newFieldValue.trim()) {
      const updatedApp = {
        ...application,
        metadata: {
          ...application.metadata,
          [newFieldKey.trim()]: newFieldValue.trim(),
        },
      };
      onUpdate(updatedApp);
      setNewFieldKey('');
      setNewFieldValue('');
      setIsAddingField(false);
    }
  };

  const totalServices = application.Projects?.reduce(
    (total, project) => total + (project.services?.length || 0),
    0
  ) || 0;

  const totalEnvironments = application.Projects?.reduce(
    (total, project) =>
      total +
      (project.services?.reduce(
        (envTotal, service) => envTotal + (service.environments?.length || 0),
        0
      ) || 0),
    0
  ) || 0;

  const allFields = getAllFields();

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${theme.card} border rounded-xl p-6`}>
          <div className="flex items-center gap-3 mb-2">
            <Package size={24} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
            <h3 className={`text-sm font-semibold ${theme.textSecondary}`}>Total Projects</h3>
          </div>
          <p className={`text-4xl font-bold ${theme.text}`}>
            {application.Projects?.length || 0}
          </p>
        </div>

        <div className={`${theme.card} border rounded-xl p-6`}>
          <div className="flex items-center gap-3 mb-2">
            <Package size={24} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
            <h3 className={`text-sm font-semibold ${theme.textSecondary}`}>Total Services</h3>
          </div>
          <p className={`text-4xl font-bold ${theme.text}`}>{totalServices}</p>
        </div>

        <div className={`${theme.card} border rounded-xl p-6`}>
          <div className="flex items-center gap-3 mb-2">
            <Package size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            <h3 className={`text-sm font-semibold ${theme.textSecondary}`}>Total Environments</h3>
          </div>
          <p className={`text-4xl font-bold ${theme.text}`}>{totalEnvironments}</p>
        </div>
      </div>

      {/* Application Fields Section */}
      <div className={`${theme.card} border rounded-2xl overflow-hidden`}>
        <button
          onClick={() => toggleSection('appFields')}
          className={`w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-all ${
            isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
          }`}
        >
          <h2 className={`text-xl font-bold ${theme.text} flex items-center gap-3`}>
            {expandedSections.appFields ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
            Application Details
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'
          }`}>
            {Object.keys(allFields).length} fields
          </span>
        </button>

        {expandedSections.appFields && (
          <div className="px-6 pb-6">
            <div className="space-y-2 pt-4">
              {Object.entries(allFields).map(([key, value]) => {
                if (!isEditing && !value) return null;

                return (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-4 ${
                      isDark ? 'bg-slate-700/50' : 'bg-gray-50'
                    } rounded-lg group`}
                  >
                    {editingField === key ? (
                      <>
                        <div className="flex-1 flex items-center gap-2">
                          <span className={`text-sm font-semibold ${theme.text} min-w-[140px]`}>
                            {key}:
                          </span>
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className={`flex-1 px-3 py-2 ${theme.input} rounded border`}
                            autoFocus
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSaveField(key)}
                            className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={() => setEditingField(null)}
                            className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex-1">
                          <span className={`font-semibold ${theme.text}`}>{key}: </span>
                          <span className={theme.textSecondary}>{value as string}</span>
                        </div>
                        {isEditing && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditField(key, value)}
                              className={`p-2 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'} rounded`}
                            >
                              <Edit2 size={16} className={theme.textSecondary} />
                            </button>
                            <button
                              onClick={() => handleDeleteField(key)}
                              className={`p-2 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'} rounded`}
                            >
                              <Trash2 size={16} className="text-red-600" />
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}

              {/* Add New Field */}
              {isEditing && (
                <>
                  {isAddingField ? (
                    <div className={`p-4 ${isDark ? 'bg-slate-700/30' : 'bg-gray-100'} rounded-lg`}>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={newFieldKey}
                          onChange={(e) => setNewFieldKey(e.target.value)}
                          placeholder="Field name"
                          className={`px-3 py-2 ${theme.input} rounded border`}
                        />
                        <input
                          type="text"
                          value={newFieldValue}
                          onChange={(e) => setNewFieldValue(e.target.value)}
                          placeholder="Value"
                          className={`px-3 py-2 ${theme.input} rounded border`}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddField}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingField(false);
                            setNewFieldKey('');
                            setNewFieldValue('');
                          }}
                          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingField(true)}
                      className={`w-full px-4 py-3 ${theme.accent} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90`}
                    >
                      <Plus size={18} />
                      Add New Field
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className={`${theme.card} border rounded-2xl overflow-hidden`}>
        <button
          onClick={() => toggleSection('projects')}
          className={`w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-all ${
            isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
          }`}
        >
          <h2 className={`text-xl font-bold ${theme.text} flex items-center gap-3`}>
            {expandedSections.projects ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
            Projects & Services
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'
          }`}>
            {application.Projects?.length || 0} projects
          </span>
        </button>

        {expandedSections.projects && (
          <div className="px-6 pb-6 space-y-6">
            {application.Projects && application.Projects.length > 0 ? (
              application.Projects.map((project, projectIndex) => (
                <ProjectSection
                  key={projectIndex}
                  project={project}
                  projectIndex={projectIndex}
                  application={application}
                  onUpdate={onUpdate}
                  isEditing={isEditing}
                  theme={theme}
                  isDark={isDark}
                />
              ))
            ) : (
              <p className={`text-center py-8 ${theme.textSecondary}`}>
                No projects found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}