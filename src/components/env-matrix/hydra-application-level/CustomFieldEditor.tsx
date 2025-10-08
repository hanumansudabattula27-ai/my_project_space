// src/components/env-matrix/CustomFieldEditor.tsx
'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface CustomFieldEditorProps {
  level: 'application' | 'project' | 'service' | 'environment' | 'zone';
  metadata: Record<string, any>;
  onChange: (metadata: Record<string, any>) => void;
  theme: any;
  isDark: boolean;
}

export default function CustomFieldEditor({
  level,
  metadata = {},
  onChange,
  theme,
  isDark,
}: CustomFieldEditorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (newKey.trim() && newValue.trim()) {
      onChange({ ...metadata, [newKey.trim()]: newValue.trim() });
      setNewKey('');
      setNewValue('');
      setIsAdding(false);
    }
  };

  const handleDelete = (key: string) => {
    const updated = { ...metadata };
    delete updated[key];
    onChange(updated);
  };

  const handleStartEdit = (key: string, value: string) => {
    setEditingKey(key);
    setEditKey(key);
    setEditValue(value);
  };

  const handleSaveEdit = (oldKey: string) => {
    if (editKey.trim() && editValue.trim()) {
      const updated = { ...metadata };
      if (oldKey !== editKey.trim()) {
        delete updated[oldKey];
      }
      updated[editKey.trim()] = editValue.trim();
      onChange(updated);
      setEditingKey(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditKey('');
    setEditValue('');
  };

  return (
    <div className="space-y-4 pt-4">
      {/* Existing Fields */}
      <div className="space-y-2">
        {Object.entries(metadata).map(([key, value]) => (
          <div
            key={key}
            className={`flex items-center gap-3 p-4 ${
              isDark ? 'bg-slate-700/50' : 'bg-gray-50'
            } rounded-lg`}
          >
            {editingKey === key ? (
              <>
                <input
                  type="text"
                  value={editKey}
                  onChange={(e) => setEditKey(e.target.value)}
                  className={`flex-1 px-3 py-2 ${theme.input} rounded-lg border text-sm`}
                  placeholder="Field name"
                />
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className={`flex-1 px-3 py-2 ${theme.input} rounded-lg border text-sm`}
                  placeholder="Value"
                />
                <button
                  onClick={() => handleSaveEdit(key)}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  title="Save"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title="Cancel"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <div className="flex-1">
                  <span className={`font-semibold ${theme.text} text-sm`}>{key}:</span>
                  <span className={`ml-3 ${theme.textSecondary} text-sm`}>
                    {value as string}
                  </span>
                </div>
                <button
                  onClick={() => handleStartEdit(key, value as string)}
                  className={`p-2 ${
                    isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
                  } rounded-lg transition-colors`}
                  title="Edit"
                >
                  <Edit2 size={16} className={theme.textSecondary} />
                </button>
                <button
                  onClick={() => handleDelete(key)}
                  className={`p-2 ${
                    isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'
                  } rounded-lg transition-colors`}
                  title="Delete"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add New Field Form */}
      {isAdding ? (
        <div className={`p-4 ${isDark ? 'bg-slate-700/30' : 'bg-gray-100'} rounded-lg`}>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="Field name (e.g., owner, priority)"
              className={`px-3 py-2 ${theme.input} rounded-lg border text-sm`}
            />
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Value"
              className={`px-3 py-2 ${theme.input} rounded-lg border text-sm`}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 text-sm"
            >
              Add Field
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewKey('');
                setNewValue('');
              }}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className={`w-full px-4 py-3 ${theme.accent} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all`}
        >
          <Plus size={18} />
          Add Custom Field
        </button>
      )}

      {Object.keys(metadata).length === 0 && !isAdding && (
        <p className={`text-center py-6 text-sm ${theme.textSecondary}`}>
          No custom fields yet. Click "Add Custom Field" to create one.
        </p>
      )}
    </div>
  );
}