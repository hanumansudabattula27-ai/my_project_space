// src/components/env-matrix/hydra-application-level/addcustomfieldmodal.tsx
'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface AddCustomFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fieldName: string, fieldValue: string) => void;
  theme: any;
  isDark: boolean;
  existingFields?: string[];
}

export default function AddCustomFieldModal({
  isOpen,
  onClose,
  onSubmit,
  theme,
  isDark,
  existingFields = []
}: AddCustomFieldModalProps) {
  const [fieldName, setFieldName] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (!fieldName.trim()) {
      setError('Field name is required');
      return;
    }

    if (!fieldValue.trim()) {
      setError('Field value is required');
      return;
    }

    // Check if field already exists
    const normalizedName = fieldName.trim().toLowerCase();
    if (existingFields.map(f => f.toLowerCase()).includes(normalizedName)) {
      setError('This field already exists');
      return;
    }

    // Validate field name (alphanumeric and underscore only)
    if (!/^[a-zA-Z0-9_]+$/.test(fieldName.trim())) {
      setError('Field name can only contain letters, numbers, and underscores');
      return;
    }

    onSubmit(fieldName.trim(), fieldValue.trim());
    setFieldName('');
    setFieldValue('');
  };

  const handleClose = () => {
    setFieldName('');
    setFieldValue('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${theme.card} border rounded-xl max-w-md w-full shadow-lg`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${theme.text}`}>
            Add Custom Field
          </h2>
          <button
            onClick={handleClose}
            className={`p-2 rounded hover:bg-opacity-80 transition-all ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className={`p-3 rounded-lg text-sm ${isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'}`}>
              {error}
            </div>
          )}

          <div>
            <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
              Field Name
            </label>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="e.g., status, owner, version"
              className={`w-full px-3 py-2 ${theme.input} rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all`}
              autoFocus
            />
            <p className={`text-xs ${theme.textSecondary} mt-1`}>
              Letters, numbers, and underscores only
            </p>
          </div>

          <div>
            <label className={`block text-sm font-semibold ${theme.text} mb-2`}>
              Field Value
            </label>
            <input
              type="text"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="e.g., active, team-A, 1.0.0"
              className={`w-full px-3 py-2 ${theme.input} rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm transition-all`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t p-4 flex items-center justify-end gap-2 ${isDark ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-50'}`}>
          <button
            onClick={handleClose}
            className={`px-4 py-2 border-2 rounded-lg font-semibold text-sm hover:opacity-80 transition-all ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 ${theme.accent} text-white rounded-lg font-semibold text-sm hover:scale-105 transition-all flex items-center gap-2`}
          >
            <Plus size={16} />
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
}












// // src/components/env-matrix/hydra-application-level/zonecard.tsx
// // MINIMAL CHANGES ONLY - Add custom fields to existing metadata

// 'use client';

// import { useState } from 'react';
// import { Application, Zone } from '@/types';
// import { Server, ChevronDown, ChevronRight, Edit2, Save, X } from 'lucide-react';
// import AddCustomFieldModal from './addcustomfieldmodal';

// interface ZoneCardProps {
//   zone: Zone;
//   zoneIndex: number;
//   envIndex: number;
//   serviceIndex: number;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   searchQuery: string;
// }

// export default function ZoneCard({
//   zone,
//   zoneIndex,
//   envIndex,
//   serviceIndex,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   searchQuery,
// }: ZoneCardProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isEditingZone, setIsEditingZone] = useState(false);
//   const [editedZone, setEditedZone] = useState(zone);
//   // NEW: Add state for custom field modal
//   const [isAddingCustomField, setIsAddingCustomField] = useState(false);

//   const updateZone = (updatedZone: Zone) => {
//     const updatedProjects = [...application.Projects];
//     const updatedServices = [...updatedProjects[projectIndex].services];
//     const updatedEnvironments = [...updatedServices[serviceIndex].environments];
//     const updatedZones = [...updatedEnvironments[envIndex].Zones];
//     updatedZones[zoneIndex] = updatedZone;
//     updatedEnvironments[envIndex] = {
//       ...updatedEnvironments[envIndex],
//       Zones: updatedZones,
//     };
//     updatedServices[serviceIndex] = {
//       ...updatedServices[serviceIndex],
//       environments: updatedEnvironments,
//     };
//     updatedProjects[projectIndex] = {
//       ...updatedProjects[projectIndex],
//       services: updatedServices,
//     };
//     onUpdate({ ...application, Projects: updatedProjects });
//   };

//   const handleSave = () => {
//     updateZone(editedZone);
//     setIsEditingZone(false);
//   };

//   const handleCancel = () => {
//     setEditedZone(zone);
//     setIsEditingZone(false);
//   };

//   // NEW: Handle custom field addition
//   const handleAddCustomField = (fieldName: string, fieldValue: string) => {
//     setEditedZone((prev) => ({
//       ...prev,
//       metadata: {
//         ...(prev.metadata || {}),
//         [fieldName]: fieldValue,
//       },
//     }));
//     setIsAddingCustomField(false);
//   };

//   // NEW: Handle custom field deletion
//   const handleDeleteCustomField = (fieldName: string) => {
//     setEditedZone((prev) => {
//       const newMetadata = { ...prev.metadata };
//       delete newMetadata[fieldName];
//       return {
//         ...prev,
//         metadata: newMetadata,
//       };
//     });
//   };

//   // NEW: Handle custom field update
//   const handleUpdateCustomField = (fieldName: string, fieldValue: string) => {
//     setEditedZone((prev) => ({
//       ...prev,
//       metadata: {
//         ...(prev.metadata || {}),
//         [fieldName]: fieldValue,
//       },
//     }));
//   };

//   const isHighlighted = searchQuery && 
//     (zone.ZoneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//      zone.vipName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//      zone.vipIP?.toLowerCase().includes(searchQuery.toLowerCase()));

//   return (
//     <div className={`border rounded-lg overflow-hidden ${
//       isHighlighted
//         ? isDark ? 'border-yellow-500 bg-yellow-900/10' : 'border-yellow-400 bg-yellow-50'
//         : isDark ? 'border-slate-600 bg-slate-800/50' : 'border-gray-200 bg-white'
//     }`}>
//       {/* Zone Header */}
//       <div className={`p-3 ${
//         isDark ? 'bg-slate-700/50' : 'bg-gray-50'
//       }`}>
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-2">
//             <Server size={16} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
//             <h6 className={`text-base font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
//               {zone.ZoneName}
//             </h6>
//           </div>
//           <div className="flex items-center gap-1">
//             {isEditing && !isEditingZone && (
//               <button
//                 onClick={() => setIsEditingZone(true)}
//                 className={`p-1 rounded hover:bg-opacity-80 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
//               >
//                 <Edit2 size={14} className={theme.textSecondary} />
//               </button>
//             )}
//             {isEditingZone && (
//               <>
//                 <button
//                   onClick={handleSave}
//                   className="p-1 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   <Save size={14} />
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="p-1 bg-gray-600 text-white rounded hover:bg-gray-700"
//                 >
//                   <X size={14} />
//                 </button>
//               </>
//             )}
//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className={`p-1 rounded ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
//             >
//               {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
//             </button>
//           </div>
//         </div>

//         {/* Quick Info - UNCHANGED */}
//         <div className="space-y-2">
//           {isEditingZone ? (
//             <>
//               <input
//                 type="text"
//                 value={editedZone.vipName}
//                 onChange={(e) => setEditedZone({ ...editedZone, vipName: e.target.value })}
//                 className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
//                 placeholder="VIP Name"
//               />
//               <input
//                 type="text"
//                 value={editedZone.vipIP}
//                 onChange={(e) => setEditedZone({ ...editedZone, vipIP: e.target.value })}
//                 className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
//                 placeholder="VIP IP"
//               />
//             </>
//           ) : (
//             <>
//               <div className="flex items-center gap-2">
//                 <span className={`text-base font-semibold ${theme.text}`}>VIP:</span>
//                 <span className={`text-base ${theme.textSecondary} truncate`}>{zone.vipName}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className={`text-base font-semibold ${theme.text}`}>IP:</span>
//                 <span className={`text-base ${theme.textSecondary} font-mono`}>{zone.vipIP}</span>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Expanded Details */}
//       {isExpanded && (
//         <div className={`p-3 border-t ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
//           <div className="space-y-3 text-base">
//             {/* f5Device - UNCHANGED */}
//             {zone.f5Device && zone.f5Device.length > 0 && (
//               <div className="flex gap-2">
//                 <span className={`font-semibold ${theme.text} min-w-[120px]`}>F5 Devices:</span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.f5Device?.join(', ')}
//                       onChange={(e) => setEditedZone({ 
//                         ...editedZone, 
//                         f5Device: e.target.value.split(',').map(s => s.trim()) 
//                       })}
//                       className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.f5Device.join(', ')
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* Firewall - UNCHANGED */}
//             {(zone.firewall || isEditingZone) && (
//               <div className="flex gap-2">
//                 <span className={`font-semibold ${theme.text} min-w-[120px]`}>Firewall:</span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.firewall}
//                       onChange={(e) => setEditedZone({ ...editedZone, firewall: e.target.value })}
//                       className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.firewall || 'N/A'
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* Count - UNCHANGED */}
//             {(zone.count || isEditingZone) && (
//               <div className="flex gap-2">
//                 <span className={`font-semibold ${theme.text} min-w-[120px]`}>Count:</span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.count}
//                       onChange={(e) => setEditedZone({ ...editedZone, count: e.target.value })}
//                       className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.count || 'N/A'
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* CPU - UNCHANGED */}
//             {(zone.cpu || isEditingZone) && (
//               <div className="flex gap-2">
//                 <span className={`font-semibold ${theme.text} min-w-[120px]`}>CPU:</span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.cpu}
//                       onChange={(e) => setEditedZone({ ...editedZone, cpu: e.target.value })}
//                       className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.cpu || 'N/A'
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* Memory - UNCHANGED */}
//             {(zone.memory || isEditingZone) && (
//               <div className="flex gap-2">
//                 <span className={`font-semibold ${theme.text} min-w-[120px]`}>Memory:</span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.memory}
//                       onChange={(e) => setEditedZone({ ...editedZone, memory: e.target.value })}
//                       className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.memory || 'N/A'
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* NEW: Custom Fields from metadata - SEAMLESSLY ADDED */}
//             {editedZone.metadata && Object.keys(editedZone.metadata).length > 0 && (
//               <>
//                 {Object.entries(editedZone.metadata).map(([key, value]) => (
//                   <div key={key} className="flex gap-2">
//                     <span className={`font-semibold ${theme.text} min-w-[120px]`}>{key}:</span>
//                     <span className={theme.textSecondary}>
//                       {isEditingZone ? (
//                         <div className="flex gap-2 items-center flex-1">
//                           <input
//                             type="text"
//                             value={String(value)}
//                             onChange={(e) => handleUpdateCustomField(key, e.target.value)}
//                             className={`flex-1 px-2 py-1 text-base ${theme.input} rounded border`}
//                           />
//                           <button
//                             onClick={() => handleDeleteCustomField(key)}
//                             className={`px-2 py-1 text-sm font-semibold rounded transition-all ${
//                               isDark
//                                 ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
//                                 : 'bg-red-100 text-red-700 hover:bg-red-200'
//                             }`}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       ) : (
//                         String(value)
//                       )}
//                     </span>
//                   </div>
//                 ))}
//               </>
//             )}

//             {/* NEW: Add Custom Field Button - visible only when editing */}
//             {isEditingZone && (
//               <button
//                 onClick={() => setIsAddingCustomField(true)}
//                 className={`w-full px-3 py-2 mt-3 border-2 border-dashed rounded-lg font-semibold text-sm transition-all ${
//                   isDark
//                     ? 'border-slate-600 text-slate-400 hover:border-teal-500 hover:text-teal-400'
//                     : 'border-gray-300 text-gray-600 hover:border-teal-500 hover:text-teal-600'
//                 }`}
//               >
//                 + Add Custom Field
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Collapsed Quick Stats - UNCHANGED */}
//       {!isExpanded && (
//         <div className={`px-3 pb-2 flex items-center gap-4 text-base ${theme.textSecondary}`}>
//           {zone.cpu && (
//             <div className="flex gap-2">
//               <span className="font-semibold">CPU:</span>
//               <span>{zone.cpu}</span>
//             </div>
//           )}
//           {zone.memory && (
//             <div className="flex gap-2">
//               <span className="font-semibold">RAM:</span>
//               <span>{zone.memory}</span>
//             </div>
//           )}
//           {zone.count && (
//             <div className="flex gap-2">
//               <span className="font-semibold">Count:</span>
//               <span>{zone.count}</span>
//             </div>
//           )}
//         </div>
//       )}

//       {/* NEW: Custom Field Modal */}
//       <AddCustomFieldModal
//         isOpen={isAddingCustomField}
//         onClose={() => setIsAddingCustomField(false)}
//         onSubmit={handleAddCustomField}
//         theme={theme}
//         isDark={isDark}
//         existingFields={Object.keys(editedZone.metadata || {})}
//       />
//     </div>
//   );
// }