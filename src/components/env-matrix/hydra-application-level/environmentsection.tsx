// src/components/env-matrix/environmentsection.tsx
'use client';

import { useState } from 'react';
import { Application, Environment } from '@/types';
import ZoneCard from './zonecard';
import { ChevronDown, ChevronRight, Cloud, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

interface EnvironmentSectionProps {
  environment: Environment;
  envIndex: number;
  serviceIndex: number;
  projectIndex: number;
  application: Application;
  onUpdate: (app: Application) => void;
  isEditing: boolean;
  theme: any;
  isDark: boolean;
}

export default function EnvironmentSection({
  environment,
  envIndex,
  serviceIndex,
  projectIndex,
  application,
  onUpdate,
  isEditing,
  theme,
  isDark,
}: EnvironmentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  // Combine all fields (existing + custom metadata)
  const getAllFields = (): Record<string, any> => {
    return {
      environmentName: environment.environmentName,
      GTM: environment.GTM,
      namehydra: environment.namehydra,
      abcGTM: environment.abcGTM,
      firewallProfile: environment.firewallProfile,
      ...(environment.metadata || {}),
    };
  };

  const updateEnvironment = (updatedEnv: Environment) => {
    const updatedProjects = [...application.Projects];
    const updatedServices = [...updatedProjects[projectIndex].services];
    const updatedEnvironments = [...updatedServices[serviceIndex].environments];
    updatedEnvironments[envIndex] = updatedEnv;
    updatedServices[serviceIndex] = {
      ...updatedServices[serviceIndex],
      environments: updatedEnvironments,
    };
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      services: updatedServices,
    };
    onUpdate({ ...application, Projects: updatedProjects });
  };

  const handleEditField = (fieldKey: string, currentValue: any) => {
    setEditingField(fieldKey);
    setEditValue(String(currentValue || ''));
  };

  const handleSaveField = (fieldKey: string) => {
    const coreFields = ['environmentName', 'GTM', 'namehydra', 'abcGTM', 'firewallProfile'];
    
    let updatedEnv = { ...environment };
    
    if (coreFields.includes(fieldKey)) {
      (updatedEnv as any)[fieldKey] = editValue;
    } else {
      updatedEnv.metadata = {
        ...updatedEnv.metadata,
        [fieldKey]: editValue,
      };
    }
    
    updateEnvironment(updatedEnv);
    setEditingField(null);
  };

  const handleDeleteField = (fieldKey: string) => {
    const coreFields = ['environmentName', 'GTM', 'namehydra', 'abcGTM', 'firewallProfile'];
    
    if (coreFields.includes(fieldKey)) {
      if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
        const updatedEnv = { ...environment };
        (updatedEnv as any)[fieldKey] = '';
        updateEnvironment(updatedEnv);
      }
    } else {
      const updatedMetadata = { ...environment.metadata };
      delete updatedMetadata[fieldKey];
      updateEnvironment({ ...environment, metadata: updatedMetadata });
    }
  };

  const handleAddField = () => {
    if (newFieldKey.trim() && newFieldValue.trim()) {
      const updatedEnv = {
        ...environment,
        metadata: {
          ...environment.metadata,
          [newFieldKey.trim()]: newFieldValue.trim(),
        },
      };
      updateEnvironment(updatedEnv);
      setNewFieldKey('');
      setNewFieldValue('');
      setIsAddingField(false);
    }
  };

  const allFields = getAllFields();

  const getEnvColor = (envName: string) => {
    if (envName.includes('E1')) return isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700';
    if (envName.includes('E2')) return isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
    if (envName.includes('E3')) return isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700';
    return isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700';
  };

  return (
    <div className={`border ${isDark ? 'border-slate-600' : 'border-gray-200'} rounded-lg overflow-hidden`}>
      {/* Environment Header */}
      <div className={`${isDark ? 'bg-slate-800/50' : 'bg-gray-50'} p-4`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 hover:opacity-80 transition-all w-full"
        >
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <Cloud size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
          <div className="text-left flex-1">
            <div className="flex items-center gap-3">
              <h5 className={`text-md font-bold ${theme.text}`}>{environment.environmentName}</h5>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getEnvColor(environment.environmentName)}`}>
                {environment.Zones?.length || 0} zones
              </span>
            </div>
          </div>
        </button>
      </div>

      {isExpanded && (
        <div className="p-4">
          {/* All Fields (Existing + Custom) */}
          <div className="space-y-2 mb-4">
            {Object.entries(allFields).map(([key, value]) => {
              if (!isEditing && !value) return null;

              return (
                <div
                  key={key}
                  className={`flex items-center justify-between p-3 ${
                    isDark ? 'bg-slate-700/50' : 'bg-gray-50'
                  } rounded-lg group`}
                >
                  {editingField === key ? (
                    <>
                      <div className="flex-1 flex items-center gap-2">
                        <span className={`text-sm font-semibold ${theme.text} min-w-[120px]`}>
                          {key}:
                        </span>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className={`flex-1 px-3 py-1.5 ${theme.input} rounded border text-sm`}
                          autoFocus
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSaveField(key)}
                          className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          <Save size={14} />
                        </button>
                        <button
                          onClick={() => setEditingField(null)}
                          className="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <span className={`text-sm font-semibold ${theme.text}`}>{key}: </span>
                        <span className={`text-sm ${theme.textSecondary}`}>{value}</span>
                      </div>
                      {isEditing && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditField(key, value)}
                            className={`p-1.5 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'} rounded`}
                          >
                            <Edit2 size={14} className={theme.textSecondary} />
                          </button>
                          <button
                            onClick={() => handleDeleteField(key)}
                            className={`p-1.5 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'} rounded`}
                          >
                            <Trash2 size={14} className="text-red-600" />
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
                  <div className={`p-3 ${isDark ? 'bg-slate-700/30' : 'bg-gray-100'} rounded-lg`}>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={newFieldKey}
                        onChange={(e) => setNewFieldKey(e.target.value)}
                        placeholder="Field name"
                        className={`px-3 py-2 ${theme.input} rounded border text-sm`}
                      />
                      <input
                        type="text"
                        value={newFieldValue}
                        onChange={(e) => setNewFieldValue(e.target.value)}
                        placeholder="Value"
                        className={`px-3 py-2 ${theme.input} rounded border text-sm`}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddField}
                        className="flex-1 px-3 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 text-sm"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingField(false);
                          setNewFieldKey('');
                          setNewFieldValue('');
                        }}
                        className="flex-1 px-3 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddingField(true)}
                    className={`w-full px-4 py-2.5 ${theme.accent} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90`}
                  >
                    <Plus size={16} />
                    Add New Field
                  </button>
                )}
              </>
            )}
          </div>

          {/* Zones Grid */}
          {environment.Zones && environment.Zones.length > 0 && (
            <div>
              <h6 className={`text-sm font-bold ${theme.text} mb-3`}>Zones</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {environment.Zones.map((zone, zoneIndex) => (
                  <ZoneCard
                    key={zoneIndex}
                    zone={zone}
                    zoneIndex={zoneIndex}
                    envIndex={envIndex}
                    serviceIndex={serviceIndex}
                    projectIndex={projectIndex}
                    application={application}
                    onUpdate={onUpdate}
                    isEditing={isEditing}
                    theme={theme}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}