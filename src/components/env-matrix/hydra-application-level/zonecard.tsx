// src/components/env-matrix/zonecard.tsx
'use client';

import { useState } from 'react';
import { Application, Zone } from '@/types';
import { Server, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

interface ZoneCardProps {
  zone: Zone;
  zoneIndex: number;
  envIndex: number;
  serviceIndex: number;
  projectIndex: number;
  application: Application;
  onUpdate: (app: Application) => void;
  isEditing: boolean;
  theme: any;
  isDark: boolean;
}

export default function ZoneCard({
  zone,
  zoneIndex,
  envIndex,
  serviceIndex,
  projectIndex,
  application,
  onUpdate,
  isEditing,
  theme,
  isDark,
}: ZoneCardProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  // Combine all fields (existing + custom metadata)
  const getAllFields = (): Record<string, any> => {
    return {
      ZoneName: zone.ZoneName,
      vipName: zone.vipName,
      vipIP: zone.vipIP,
      f5Device: zone.f5Device,
      firewall: zone.firewall,
      count: zone.count,
      cpu: zone.cpu,
      memory: zone.memory,
      ...(zone.metadata || {}),
    };
  };

  const updateZone = (updatedZone: Zone) => {
    const updatedProjects = [...application.Projects];
    const updatedServices = [...updatedProjects[projectIndex].services];
    const updatedEnvironments = [...updatedServices[serviceIndex].environments];
    const updatedZones = [...updatedEnvironments[envIndex].Zones];
    updatedZones[zoneIndex] = updatedZone;
    updatedEnvironments[envIndex] = {
      ...updatedEnvironments[envIndex],
      Zones: updatedZones,
    };
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
    setEditValue(Array.isArray(currentValue) ? currentValue.join(', ') : String(currentValue));
  };

  const handleSaveField = (fieldKey: string) => {
    const coreFields = ['ZoneName', 'vipName', 'vipIP', 'f5Device', 'firewall', 'count', 'cpu', 'memory'];
    
    let updatedZone = { ...zone };
    
    if (coreFields.includes(fieldKey)) {
      // Update core field
      if (fieldKey === 'f5Device') {
        updatedZone[fieldKey] = editValue.split(',').map(s => s.trim());
      } else {
        (updatedZone as any)[fieldKey] = editValue;
      }
    } else {
      // Update custom field in metadata
      updatedZone.metadata = {
        ...updatedZone.metadata,
        [fieldKey]: editValue,
      };
    }
    
    updateZone(updatedZone);
    setEditingField(null);
  };

  const handleDeleteField = (fieldKey: string) => {
    const coreFields = ['ZoneName', 'vipName', 'vipIP', 'f5Device', 'firewall', 'count', 'cpu', 'memory'];
    
    if (coreFields.includes(fieldKey)) {
      if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
        const updatedZone = { ...zone };
        (updatedZone as any)[fieldKey] = '';
        updateZone(updatedZone);
      }
    } else {
      // Delete custom field from metadata
      const updatedMetadata = { ...zone.metadata };
      delete updatedMetadata[fieldKey];
      updateZone({ ...zone, metadata: updatedMetadata });
    }
  };

  const handleAddField = () => {
    if (newFieldKey.trim() && newFieldValue.trim()) {
      const updatedZone = {
        ...zone,
        metadata: {
          ...zone.metadata,
          [newFieldKey.trim()]: newFieldValue.trim(),
        },
      };
      updateZone(updatedZone);
      setNewFieldKey('');
      setNewFieldValue('');
      setIsAddingField(false);
    }
  };

  const allFields = getAllFields();

  return (
    <div className={`${theme.card} border rounded-lg overflow-hidden hover:shadow-lg transition-all`}>
      {/* Zone Header */}
      <div className={`${isDark ? 'bg-gradient-to-r from-slate-700 to-slate-600' : 'bg-gradient-to-r from-teal-500 to-cyan-500'} p-3`}>
        <div className="flex items-center gap-2">
          <Server size={18} className="text-white" />
          <h6 className="text-sm font-bold text-white">{zone.ZoneName}</h6>
        </div>
      </div>

      {/* All Fields (Existing + Custom) */}
      <div className="p-4 space-y-2">
        {Object.entries(allFields).map(([key, value]) => {
          // Skip empty values in view mode
          if (!isEditing && (!value || (Array.isArray(value) && value.length === 0))) {
            return null;
          }

          const displayValue = Array.isArray(value) ? value.join(', ') : String(value);

          return (
            <div
              key={key}
              className={`flex items-center justify-between p-3 ${
                isDark ? 'bg-slate-700/50' : 'bg-gray-50'
              } rounded-lg group`}
            >
              {editingField === key ? (
                // Edit Mode for this field
                <>
                  <div className="flex-1 flex items-center gap-2">
                    <span className={`text-sm font-semibold ${theme.text} min-w-[100px]`}>
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
                      title="Save"
                    >
                      <Save size={14} />
                    </button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700"
                      title="Cancel"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </>
              ) : (
                // View Mode
                <>
                  <div className="flex-1">
                    <span className={`text-sm font-semibold ${theme.text}`}>{key}: </span>
                    <span className={`text-sm ${theme.textSecondary}`}>{displayValue}</span>
                  </div>
                  {isEditing && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditField(key, value)}
                        className={`p-1.5 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'} rounded transition-colors`}
                        title="Edit"
                      >
                        <Edit2 size={14} className={theme.textSecondary} />
                      </button>
                      <button
                        onClick={() => handleDeleteField(key)}
                        className={`p-1.5 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'} rounded transition-colors`}
                        title="Delete"
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
    </div>
  );
}