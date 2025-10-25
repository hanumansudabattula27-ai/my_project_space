// // // src/components/env-matrix/zonecard.tsx
// // 'use client';

// // import { useState } from 'react';
// // import { Application, Zone } from '@/types';
// // import { Server, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

// // interface ZoneCardProps {
// //   zone: Zone;
// //   zoneIndex: number;
// //   envIndex: number;
// //   serviceIndex: number;
// //   projectIndex: number;
// //   application: Application;
// //   onUpdate: (app: Application) => void;
// //   isEditing: boolean;
// //   theme: any;
// //   isDark: boolean;
// // }

// // export default function ZoneCard({
// //   zone,
// //   zoneIndex,
// //   envIndex,
// //   serviceIndex,
// //   projectIndex,
// //   application,
// //   onUpdate,
// //   isEditing,
// //   theme,
// //   isDark,
// // }: ZoneCardProps) {
// //   const [editingField, setEditingField] = useState<string | null>(null);
// //   const [editValue, setEditValue] = useState('');
// //   const [isAddingField, setIsAddingField] = useState(false);
// //   const [newFieldKey, setNewFieldKey] = useState('');
// //   const [newFieldValue, setNewFieldValue] = useState('');

// //   // Combine all fields (existing + custom metadata)
// //   const getAllFields = (): Record<string, any> => {
// //     return {
// //       ZoneName: zone.ZoneName,
// //       vipName: zone.vipName,
// //       vipIP: zone.vipIP,
// //       f5Device: zone.f5Device,
// //       firewall: zone.firewall,
// //       count: zone.count,
// //       cpu: zone.cpu,
// //       memory: zone.memory,
// //       ...(zone.metadata || {}),
// //     };
// //   };

// //   const updateZone = (updatedZone: Zone) => {
// //     const updatedProjects = [...application.Projects];
// //     const updatedServices = [...updatedProjects[projectIndex].services];
// //     const updatedEnvironments = [...updatedServices[serviceIndex].environments];
// //     const updatedZones = [...updatedEnvironments[envIndex].Zones];
// //     updatedZones[zoneIndex] = updatedZone;
// //     updatedEnvironments[envIndex] = {
// //       ...updatedEnvironments[envIndex],
// //       Zones: updatedZones,
// //     };
// //     updatedServices[serviceIndex] = {
// //       ...updatedServices[serviceIndex],
// //       environments: updatedEnvironments,
// //     };
// //     updatedProjects[projectIndex] = {
// //       ...updatedProjects[projectIndex],
// //       services: updatedServices,
// //     };
// //     onUpdate({ ...application, Projects: updatedProjects });
// //   };

// //   const handleEditField = (fieldKey: string, currentValue: any) => {
// //     setEditingField(fieldKey);
// //     setEditValue(Array.isArray(currentValue) ? currentValue.join(', ') : String(currentValue));
// //   };

// //   const handleSaveField = (fieldKey: string) => {
// //     const coreFields = ['ZoneName', 'vipName', 'vipIP', 'f5Device', 'firewall', 'count', 'cpu', 'memory'];
    
// //     let updatedZone = { ...zone };
    
// //     if (coreFields.includes(fieldKey)) {
// //       // Update core field
// //       if (fieldKey === 'f5Device') {
// //         updatedZone[fieldKey] = editValue.split(',').map(s => s.trim());
// //       } else {
// //         (updatedZone as any)[fieldKey] = editValue;
// //       }
// //     } else {
// //       // Update custom field in metadata
// //       updatedZone.metadata = {
// //         ...updatedZone.metadata,
// //         [fieldKey]: editValue,
// //       };
// //     }
    
// //     updateZone(updatedZone);
// //     setEditingField(null);
// //   };

// //   const handleDeleteField = (fieldKey: string) => {
// //     const coreFields = ['ZoneName', 'vipName', 'vipIP', 'f5Device', 'firewall', 'count', 'cpu', 'memory'];
    
// //     if (coreFields.includes(fieldKey)) {
// //       if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
// //         const updatedZone = { ...zone };
// //         (updatedZone as any)[fieldKey] = '';
// //         updateZone(updatedZone);
// //       }
// //     } else {
// //       // Delete custom field from metadata
// //       const updatedMetadata = { ...zone.metadata };
// //       delete updatedMetadata[fieldKey];
// //       updateZone({ ...zone, metadata: updatedMetadata });
// //     }
// //   };

// //   const handleAddField = () => {
// //     if (newFieldKey.trim() && newFieldValue.trim()) {
// //       const updatedZone = {
// //         ...zone,
// //         metadata: {
// //           ...zone.metadata,
// //           [newFieldKey.trim()]: newFieldValue.trim(),
// //         },
// //       };
// //       updateZone(updatedZone);
// //       setNewFieldKey('');
// //       setNewFieldValue('');
// //       setIsAddingField(false);
// //     }
// //   };

// //   const allFields = getAllFields();

// //   return (
// //     <div className={`${theme.card} border rounded-lg overflow-hidden hover:shadow-lg transition-all`}>
// //       {/* Zone Header */}
// //       <div className={`${isDark ? 'bg-gradient-to-r from-slate-700 to-slate-600' : 'bg-gradient-to-r from-teal-500 to-cyan-500'} p-3`}>
// //         <div className="flex items-center gap-2">
// //           <Server size={18} className="text-white" />
// //           <h6 className="text-sm font-bold text-white">{zone.ZoneName}</h6>
// //         </div>
// //       </div>

// //       {/* All Fields (Existing + Custom) */}
// //       <div className="p-4 space-y-2">
// //         {Object.entries(allFields).map(([key, value]) => {
// //           // Skip empty values in view mode
// //           if (!isEditing && (!value || (Array.isArray(value) && value.length === 0))) {
// //             return null;
// //           }

// //           const displayValue = Array.isArray(value) ? value.join(', ') : String(value);

// //           return (
// //             <div
// //               key={key}
// //               className={`flex items-center justify-between p-3 ${
// //                 isDark ? 'bg-slate-700/50' : 'bg-gray-50'
// //               } rounded-lg group`}
// //             >
// //               {editingField === key ? (
// //                 // Edit Mode for this field
// //                 <>
// //                   <div className="flex-1 flex items-center gap-2">
// //                     <span className={`text-sm font-semibold ${theme.text} min-w-[100px]`}>
// //                       {key}:
// //                     </span>
// //                     <input
// //                       type="text"
// //                       value={editValue}
// //                       onChange={(e) => setEditValue(e.target.value)}
// //                       className={`flex-1 px-3 py-1.5 ${theme.input} rounded border text-sm`}
// //                       autoFocus
// //                     />
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <button
// //                       onClick={() => handleSaveField(key)}
// //                       className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700"
// //                       title="Save"
// //                     >
// //                       <Save size={14} />
// //                     </button>
// //                     <button
// //                       onClick={() => setEditingField(null)}
// //                       className="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700"
// //                       title="Cancel"
// //                     >
// //                       <X size={14} />
// //                     </button>
// //                   </div>
// //                 </>
// //               ) : (
// //                 // View Mode
// //                 <>
// //                   <div className="flex-1">
// //                     <span className={`text-sm font-semibold ${theme.text}`}>{key}: </span>
// //                     <span className={`text-sm ${theme.textSecondary}`}>{displayValue}</span>
// //                   </div>
// //                   {isEditing && (
// //                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
// //                       <button
// //                         onClick={() => handleEditField(key, value)}
// //                         className={`p-1.5 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'} rounded transition-colors`}
// //                         title="Edit"
// //                       >
// //                         <Edit2 size={14} className={theme.textSecondary} />
// //                       </button>
// //                       <button
// //                         onClick={() => handleDeleteField(key)}
// //                         className={`p-1.5 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'} rounded transition-colors`}
// //                         title="Delete"
// //                       >
// //                         <Trash2 size={14} className="text-red-600" />
// //                       </button>
// //                     </div>
// //                   )}
// //                 </>
// //               )}
// //             </div>
// //           );
// //         })}

// //         {/* Add New Field */}
// //         {isEditing && (
// //           <>
// //             {isAddingField ? (
// //               <div className={`p-3 ${isDark ? 'bg-slate-700/30' : 'bg-gray-100'} rounded-lg`}>
// //                 <div className="grid grid-cols-2 gap-2 mb-2">
// //                   <input
// //                     type="text"
// //                     value={newFieldKey}
// //                     onChange={(e) => setNewFieldKey(e.target.value)}
// //                     placeholder="Field name"
// //                     className={`px-3 py-2 ${theme.input} rounded border text-sm`}
// //                   />
// //                   <input
// //                     type="text"
// //                     value={newFieldValue}
// //                     onChange={(e) => setNewFieldValue(e.target.value)}
// //                     placeholder="Value"
// //                     className={`px-3 py-2 ${theme.input} rounded border text-sm`}
// //                   />
// //                 </div>
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={handleAddField}
// //                     className="flex-1 px-3 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 text-sm"
// //                   >
// //                     Add
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setIsAddingField(false);
// //                       setNewFieldKey('');
// //                       setNewFieldValue('');
// //                     }}
// //                     className="flex-1 px-3 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700 text-sm"
// //                   >
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </div>
// //             ) : (
// //               <button
// //                 onClick={() => setIsAddingField(true)}
// //                 className={`w-full px-4 py-2.5 ${theme.accent} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90`}
// //               >
// //                 <Plus size={16} />
// //                 Add New Field
// //               </button>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }










// // src/components/env-matrix/ZoneCard.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Zone } from '@/types';
// import { FilterState } from './smartfilterbar';
// import { Server, Wifi, HardDrive, Cpu, Database, Shield, ChevronDown, ChevronRight, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

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
//   filters: FilterState;
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
//   filters,
// }: ZoneCardProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState('');
//   const [isAddingField, setIsAddingField] = useState(false);
//   const [newFieldKey, setNewFieldKey] = useState('');
//   const [newFieldValue, setNewFieldValue] = useState('');

//   // Combine all fields (existing + custom metadata)
//   const getAllFields = (): Record<string, any> => {
//     return {
//       ZoneName: zone.ZoneName,
//       vipName: zone.vipName,
//       vipIP: zone.vipIP,
//       f5Device: zone.f5Device,
//       firewall: zone.firewall,
//       count: zone.count,
//       cpu: zone.cpu,
//       memory: zone.memory,
//       ...(zone.metadata || {}),
//     };
//   };

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

//   const handleEditField = (fieldKey: string, currentValue: any) => {
//     setEditingField(fieldKey);
//     setEditValue(Array.isArray(currentValue) ? currentValue.join(', ') : String(currentValue));
//   };

//   const handleSaveField = (fieldKey: string) => {
//     const coreFields = ['ZoneName', 'vipName', 'vipIP', 'f5Device', 'firewall', 'count', 'cpu', 'memory'];
    
//     let updatedZone = { ...zone };
    
//     if (coreFields.includes(fieldKey)) {
//       if (fieldKey === 'f5Device') {
//         updatedZone[fieldKey] = editValue.split(',').map(s => s.trim());
//       } else {
//         (updatedZone as any)[fieldKey] = editValue;
//       }
//     } else {
//       updatedZone.metadata = {
//         ...updatedZone.metadata,
//         [fieldKey]: editValue,
//       };
//     }
    
//     updateZone(updatedZone);
//     setEditingField(null);
//   };

//   const handleDeleteField = (fieldKey: string) => {
//     const coreFields = ['ZoneName', 'vipName', 'vipIP', 'f5Device', 'firewall', 'count', 'cpu', 'memory'];
    
//     if (coreFields.includes(fieldKey)) {
//       if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
//         const updatedZone = { ...zone };
//         (updatedZone as any)[fieldKey] = '';
//         updateZone(updatedZone);
//       }
//     } else {
//       const updatedMetadata = { ...zone.metadata };
//       delete updatedMetadata[fieldKey];
//       updateZone({ ...zone, metadata: updatedMetadata });
//     }
//   };

//   const handleAddField = () => {
//     if (newFieldKey.trim() && newFieldValue.trim()) {
//       const updatedZone = {
//         ...zone,
//         metadata: {
//           ...zone.metadata,
//           [newFieldKey.trim()]: newFieldValue.trim(),
//         },
//       };
//       updateZone(updatedZone);
//       setNewFieldKey('');
//       setNewFieldValue('');
//       setIsAddingField(false);
//     }
//   };

//   // Check if zone should be highlighted based on criteria
//   const shouldHighlight = (): boolean => {
//     const { cpuThreshold, memoryThreshold } = filters.highlightCriteria;
    
//     // CPU threshold check
//     if (cpuThreshold && zone.cpu) {
//       const cpuValue = parseInt(zone.cpu);
//       if (!isNaN(cpuValue) && cpuValue >= cpuThreshold) return true;
//     }

//     // Memory threshold check
//     if (memoryThreshold && zone.memory) {
//       const memoryValue = parseInt(zone.memory.replace(/[^0-9]/g, ''));
//       if (!isNaN(memoryValue) && memoryValue >= memoryThreshold) return true;
//     }

//     // Search query highlight
//     if (filters.searchQuery) {
//       const searchLower = filters.searchQuery.toLowerCase();
//       const zoneText = JSON.stringify(zone).toLowerCase();
//       if (zoneText.includes(searchLower)) return true;
//     }

//     return false;
//   };

//   const allFields = getAllFields();
//   const isHighlighted = shouldHighlight();

//   return (
//     <div className={`${theme.card} border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all ${
//       isHighlighted
//         ? isDark
//           ? 'border-yellow-500 shadow-lg shadow-yellow-500/20 ring-2 ring-yellow-500/30'
//           : 'border-yellow-400 shadow-lg shadow-yellow-400/20 ring-2 ring-yellow-400/30'
//         : 'border-transparent'
//     }`}>
//       {/* Zone Header */}
//       <div className={`${
//         isHighlighted
//           ? isDark
//             ? 'bg-gradient-to-r from-yellow-900/40 to-orange-900/40'
//             : 'bg-gradient-to-r from-yellow-100 to-orange-100'
//           : isDark
//             ? 'bg-gradient-to-r from-slate-700 to-slate-600'
//             : 'bg-gradient-to-r from-teal-500 to-cyan-500'
//       } p-3 relative`}>
//         {isHighlighted && (
//           <div className="absolute top-2 right-2">
//             <span className={`px-2 py-1 rounded-full text-xs font-bold ${
//               isDark ? 'bg-yellow-600 text-yellow-100' : 'bg-yellow-500 text-white'
//             } flex items-center gap-1 shadow-lg`}>
//               ⭐ Highlighted
//             </span>
//           </div>
//         )}
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Server size={18} className={isHighlighted ? 'text-yellow-600' : 'text-white'} />
//             <h6 className={`text-sm font-bold ${
//               isHighlighted
//                 ? isDark ? 'text-yellow-300' : 'text-yellow-800'
//                 : 'text-white'
//             }`}>
//               {zone.ZoneName}
//             </h6>
//           </div>
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className={`p-1 rounded transition-colors ${
//               isHighlighted
//                 ? 'hover:bg-yellow-500/20'
//                 : 'hover:bg-white/20'
//             }`}
//           >
//             {isExpanded ? (
//               <ChevronDown size={16} className={isHighlighted ? 'text-yellow-600' : 'text-white'} />
//             ) : (
//               <ChevronRight size={16} className={isHighlighted ? 'text-yellow-600' : 'text-white'} />
//             )}
//           </button>
//         </div>

//         {/* Highlight Reason */}
//         {isHighlighted && filters.highlightCriteria && (
//           <div className="mt-2 text-xs">
//             {filters.highlightCriteria.cpuThreshold && zone.cpu && parseInt(zone.cpu) >= filters.highlightCriteria.cpuThreshold && (
//               <span className={`${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
//                 🔥 CPU: {zone.cpu} ≥ {filters.highlightCriteria.cpuThreshold}
//               </span>
//             )}
//             {filters.highlightCriteria.memoryThreshold && zone.memory && 
//               parseInt(zone.memory.replace(/[^0-9]/g, '')) >= filters.highlightCriteria.memoryThreshold && (
//               <span className={`ml-2 ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
//                 💾 Memory: {zone.memory} ≥ {filters.highlightCriteria.memoryThreshold}GB
//               </span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Zone Basic Info */}
//       <div className="p-3 space-y-2">
//         <div className="flex items-start gap-2">
//           <Wifi size={14} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
//           <div className="flex-1 min-w-0">
//             <p className={`text-xs font-semibold ${theme.text}`}>VIP Name</p>
//             <p className={`text-xs ${theme.textSecondary} truncate`}>{zone.vipName}</p>
//           </div>
//         </div>

//         <div className="flex items-start gap-2">
//           <Database size={14} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
//           <div className="flex-1">
//             <p className={`text-xs font-semibold ${theme.text}`}>VIP IP</p>
//             <p className={`text-xs ${theme.textSecondary} font-mono`}>{zone.vipIP}</p>
//           </div>
//         </div>

//         {/* Expandable Detailed Info */}
//         {isExpanded && (
//           <>
//             <div className={`pt-2 mt-2 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
//               {/* All Fields */}
//               <div className="space-y-2">
//                 {Object.entries(allFields).map(([key, value]) => {
//                   if (!isEditing && (!value || (Array.isArray(value) && value.length === 0))) {
//                     return null;
//                   }

//                   const displayValue = Array.isArray(value) ? value.join(', ') : String(value);

//                   return (
//                     <div
//                       key={key}
//                       className={`flex items-center justify-between p-3 ${
//                         isDark ? 'bg-slate-700/50' : 'bg-gray-50'
//                       } rounded-lg group`}
//                     >
//                       {editingField === key ? (
//                         <>
//                           <div className="flex-1 flex items-center gap-2">
//                             <span className={`text-sm font-semibold ${theme.text} min-w-[100px]`}>
//                               {key}:
//                             </span>
//                             <input
//                               type="text"
//                               value={editValue}
//                               onChange={(e) => setEditValue(e.target.value)}
//                               className={`flex-1 px-3 py-1.5 ${theme.input} rounded border text-sm`}
//                               autoFocus
//                             />
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <button
//                               onClick={() => handleSaveField(key)}
//                               className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700"
//                               title="Save"
//                             >
//                               <Save size={14} />
//                             </button>
//                             <button
//                               onClick={() => setEditingField(null)}
//                               className="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700"
//                               title="Cancel"
//                             >
//                               <X size={14} />
//                             </button>
//                           </div>
//                         </>
//                       ) : (
//                         <>
//                           <div className="flex-1">
//                             <span className={`text-sm font-semibold ${theme.text}`}>{key}: </span>
//                             <span className={`text-sm ${theme.textSecondary}`}>{displayValue}</span>
//                           </div>
//                           {isEditing && (
//                             <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                               <button
//                                 onClick={() => handleEditField(key, value)}
//                                 className={`p-1.5 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'} rounded transition-colors`}
//                                 title="Edit"
//                               >
//                                 <Edit2 size={14} className={theme.textSecondary} />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteField(key)}
//                                 className={`p-1.5 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'} rounded transition-colors`}
//                                 title="Delete"
//                               >
//                                 <Trash2 size={14} className="text-red-600" />
//                               </button>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   );
//                 })}

//                 {/* Add New Field */}
//                 {isEditing && (
//                   <>
//                     {isAddingField ? (
//                       <div className={`p-3 ${isDark ? 'bg-slate-700/30' : 'bg-gray-100'} rounded-lg`}>
//                         <div className="grid grid-cols-2 gap-2 mb-2">
//                           <input
//                             type="text"
//                             value={newFieldKey}
//                             onChange={(e) => setNewFieldKey(e.target.value)}
//                             placeholder="Field name"
//                             className={`px-3 py-2 ${theme.input} rounded border text-sm`}
//                           />
//                           <input
//                             type="text"
//                             value={newFieldValue}
//                             onChange={(e) => setNewFieldValue(e.target.value)}
//                             placeholder="Value"
//                             className={`px-3 py-2 ${theme.input} rounded border text-sm`}
//                           />
//                         </div>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={handleAddField}
//                             className="flex-1 px-3 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 text-sm"
//                           >
//                             Add
//                           </button>
//                           <button
//                             onClick={() => {
//                               setIsAddingField(false);
//                               setNewFieldKey('');
//                               setNewFieldValue('');
//                             }}
//                             className="flex-1 px-3 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700 text-sm"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => setIsAddingField(true)}
//                         className={`w-full px-4 py-2.5 ${theme.accent} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90`}
//                       >
//                         <Plus size={16} />
//                         Add New Field
//                       </button>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Collapsed View - Quick Stats */}
//       {!isExpanded && (
//         <div className={`px-3 pb-3 flex items-center justify-between text-xs ${theme.textSecondary}`}>
//           <div className="flex items-center gap-1">
//             <Cpu size={12} />
//             <span>CPU: {zone.cpu || 'N/A'}</span>
//           </div>
//           <span>•</span>
//           <div className="flex items-center gap-1">
//             <HardDrive size={12} />
//             <span>RAM: {zone.memory || 'N/A'}</span>
//           </div>
//           <span>•</span>
//           <div className="flex items-center gap-1">
//             <Server size={12} />
//             <span>Count: {zone.count || 'N/A'}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // src/components/env-matrix/hydra-application-level/zonecard.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Zone } from '@/types';
// import { Server, ChevronDown, ChevronRight, Edit2, Save, X } from 'lucide-react';

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
//             <Server size={14} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
//             <h6 className={`text-sm font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
//               {zone.ZoneName}
//             </h6>
//           </div>
//           <div className="flex items-center gap-1">
//             {isEditing && !isEditingZone && (
//               <button
//                 onClick={() => setIsEditingZone(true)}
//                 className={`p-1 rounded hover:bg-opacity-80 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
//               >
//                 <Edit2 size={12} className={theme.textSecondary} />
//               </button>
//             )}
//             {isEditingZone && (
//               <>
//                 <button
//                   onClick={handleSave}
//                   className="p-1 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   <Save size={12} />
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="p-1 bg-gray-600 text-white rounded hover:bg-gray-700"
//                 >
//                   <X size={12} />
//                 </button>
//               </>
//             )}
//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className={`p-1 rounded ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
//             >
//               {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
//             </button>
//           </div>
//         </div>

//         {/* Quick Info */}
//         <div className="space-y-1">
//           {isEditingZone ? (
//             <>
//               <input
//                 type="text"
//                 value={editedZone.vipName}
//                 onChange={(e) => setEditedZone({ ...editedZone, vipName: e.target.value })}
//                 className={`w-full px-2 py-1 text-xs ${theme.input} rounded border`}
//                 placeholder="VIP Name"
//               />
//               <input
//                 type="text"
//                 value={editedZone.vipIP}
//                 onChange={(e) => setEditedZone({ ...editedZone, vipIP: e.target.value })}
//                 className={`w-full px-2 py-1 text-xs ${theme.input} rounded border`}
//                 placeholder="VIP IP"
//               />
//             </>
//           ) : (
//             <>
//               <div className="flex items-center gap-2">
//                 <span className={`text-xs font-semibold ${theme.text}`}>VIP:</span>
//                 <span className={`text-xs ${theme.textSecondary} truncate`}>{zone.vipName}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className={`text-xs font-semibold ${theme.text}`}>IP:</span>
//                 <span className={`text-xs ${theme.textSecondary} font-mono`}>{zone.vipIP}</span>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Expanded Details */}
//       {isExpanded && (
//         <div className={`p-3 border-t ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
//           <div className="space-y-2 text-xs">
//             {/* f5Device */}
//             {zone.f5Device && zone.f5Device.length > 0 && (
//               <div>
//                 <span className={`font-semibold ${theme.text}`}>F5 Devices: </span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.f5Device?.join(', ')}
//                       onChange={(e) => setEditedZone({ 
//                         ...editedZone, 
//                         f5Device: e.target.value.split(',').map(s => s.trim()) 
//                       })}
//                       className={`w-full mt-1 px-2 py-1 ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.f5Device.join(', ')
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* Firewall */}
//             {(zone.firewall || isEditingZone) && (
//               <div>
//                 <span className={`font-semibold ${theme.text}`}>Firewall: </span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.firewall}
//                       onChange={(e) => setEditedZone({ ...editedZone, firewall: e.target.value })}
//                       className={`w-full mt-1 px-2 py-1 ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.firewall || 'N/A'
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* Count */}
//             {(zone.count || isEditingZone) && (
//               <div>
//                 <span className={`font-semibold ${theme.text}`}>Count: </span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.count}
//                       onChange={(e) => setEditedZone({ ...editedZone, count: e.target.value })}
//                       className={`w-full mt-1 px-2 py-1 ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.count || 'N/A'
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* CPU */}
//             {(zone.cpu || isEditingZone) && (
//               <div>
//                 <span className={`font-semibold ${theme.text}`}>CPU: </span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.cpu}
//                       onChange={(e) => setEditedZone({ ...editedZone, cpu: e.target.value })}
//                       className={`w-full mt-1 px-2 py-1 ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.cpu || 'N/A'
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* Memory */}
//             {(zone.memory || isEditingZone) && (
//               <div>
//                 <span className={`font-semibold ${theme.text}`}>Memory: </span>
//                 <span className={theme.textSecondary}>
//                   {isEditingZone ? (
//                     <input
//                       type="text"
//                       value={editedZone.memory}
//                       onChange={(e) => setEditedZone({ ...editedZone, memory: e.target.value })}
//                       className={`w-full mt-1 px-2 py-1 ${theme.input} rounded border`}
//                     />
//                   ) : (
//                     zone.memory || 'N/A'
//                   )}
//                 </span>
//               </div>
//             )}

//             {/* Metadata */}
//             {zone.metadata && Object.keys(zone.metadata).length > 0 && (
//               <div className={`pt-2 border-t ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
//                 <p className={`font-semibold ${theme.text} mb-1`}>Additional:</p>
//                 {Object.entries(zone.metadata).map(([key, value]) => (
//                   <div key={key} className="ml-2">
//                     <span className={`font-semibold ${theme.text}`}>{key}: </span>
//                     <span className={theme.textSecondary}>{String(value)}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Collapsed Quick Stats */}
//       {!isExpanded && (
//         <div className={`px-3 pb-2 flex items-center gap-3 text-xs ${theme.textSecondary}`}>
//           {zone.cpu && <span>CPU: {zone.cpu}</span>}
//           {zone.memory && <span>RAM: {zone.memory}</span>}
//           {zone.count && <span>Count: {zone.count}</span>}
//         </div>
//       )}
//     </div>
//   );
// }









// src/components/env-matrix/hydra-application-level/zonecard.tsx
'use client';

import { useState } from 'react';
import { Application, Zone } from '@/types';
import { Server, ChevronDown, ChevronRight, Edit2, Save, X } from 'lucide-react';

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
  searchQuery: string;
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
  searchQuery,
}: ZoneCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingZone, setIsEditingZone] = useState(false);
  const [editedZone, setEditedZone] = useState(zone);

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

  const handleSave = () => {
    updateZone(editedZone);
    setIsEditingZone(false);
  };

  const handleCancel = () => {
    setEditedZone(zone);
    setIsEditingZone(false);
  };

  const isHighlighted = searchQuery && 
    (zone.ZoneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     zone.vipName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     zone.vipIP?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`border rounded-lg overflow-hidden ${
      isHighlighted
        ? isDark ? 'border-yellow-500 bg-yellow-900/10' : 'border-yellow-400 bg-yellow-50'
        : isDark ? 'border-slate-600 bg-slate-800/50' : 'border-gray-200 bg-white'
    }`}>
      {/* Zone Header */}
      <div className={`p-3 ${
        isDark ? 'bg-slate-700/50' : 'bg-gray-50'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Server size={16} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
            <h6 className={`text-base font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
              {zone.ZoneName}
            </h6>
          </div>
          <div className="flex items-center gap-1">
            {isEditing && !isEditingZone && (
              <button
                onClick={() => setIsEditingZone(true)}
                className={`p-1 rounded hover:bg-opacity-80 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
              >
                <Edit2 size={14} className={theme.textSecondary} />
              </button>
            )}
            {isEditingZone && (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <Save size={14} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  <X size={14} />
                </button>
              </>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-1 rounded ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>
        </div>

        {/* Quick Info - INCREASED FONT SIZE & PADDING */}
        <div className="space-y-2">
          {isEditingZone ? (
            <>
              <input
                type="text"
                value={editedZone.vipName}
                onChange={(e) => setEditedZone({ ...editedZone, vipName: e.target.value })}
                className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
                placeholder="VIP Name"
              />
              <input
                type="text"
                value={editedZone.vipIP}
                onChange={(e) => setEditedZone({ ...editedZone, vipIP: e.target.value })}
                className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
                placeholder="VIP IP"
              />
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className={`text-base font-semibold ${theme.text}`}>VIP:</span>
                <span className={`text-base ${theme.textSecondary} truncate`}>{zone.vipName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-base font-semibold ${theme.text}`}>IP:</span>
                <span className={`text-base ${theme.textSecondary} font-mono`}>{zone.vipIP}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className={`p-3 border-t ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
          <div className="space-y-3 text-base">
            {/* f5Device */}
            {zone.f5Device && zone.f5Device.length > 0 && (
              <div className="flex gap-2">
                <span className={`font-semibold ${theme.text} min-w-[120px]`}>F5 Devices:</span>
                <span className={theme.textSecondary}>
                  {isEditingZone ? (
                    <input
                      type="text"
                      value={editedZone.f5Device?.join(', ')}
                      onChange={(e) => setEditedZone({ 
                        ...editedZone, 
                        f5Device: e.target.value.split(',').map(s => s.trim()) 
                      })}
                      className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
                    />
                  ) : (
                    zone.f5Device.join(', ')
                  )}
                </span>
              </div>
            )}

            {/* Firewall */}
            {(zone.firewall || isEditingZone) && (
              <div className="flex gap-2">
                <span className={`font-semibold ${theme.text} min-w-[120px]`}>Firewall:</span>
                <span className={theme.textSecondary}>
                  {isEditingZone ? (
                    <input
                      type="text"
                      value={editedZone.firewall}
                      onChange={(e) => setEditedZone({ ...editedZone, firewall: e.target.value })}
                      className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
                    />
                  ) : (
                    zone.firewall || 'N/A'
                  )}
                </span>
              </div>
            )}

            {/* Count */}
            {(zone.count || isEditingZone) && (
              <div className="flex gap-2">
                <span className={`font-semibold ${theme.text} min-w-[120px]`}>Count:</span>
                <span className={theme.textSecondary}>
                  {isEditingZone ? (
                    <input
                      type="text"
                      value={editedZone.count}
                      onChange={(e) => setEditedZone({ ...editedZone, count: e.target.value })}
                      className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
                    />
                  ) : (
                    zone.count || 'N/A'
                  )}
                </span>
              </div>
            )}

            {/* CPU */}
            {(zone.cpu || isEditingZone) && (
              <div className="flex gap-2">
                <span className={`font-semibold ${theme.text} min-w-[120px]`}>CPU:</span>
                <span className={theme.textSecondary}>
                  {isEditingZone ? (
                    <input
                      type="text"
                      value={editedZone.cpu}
                      onChange={(e) => setEditedZone({ ...editedZone, cpu: e.target.value })}
                      className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
                    />
                  ) : (
                    zone.cpu || 'N/A'
                  )}
                </span>
              </div>
            )}

            {/* Memory */}
            {(zone.memory || isEditingZone) && (
              <div className="flex gap-2">
                <span className={`font-semibold ${theme.text} min-w-[120px]`}>Memory:</span>
                <span className={theme.textSecondary}>
                  {isEditingZone ? (
                    <input
                      type="text"
                      value={editedZone.memory}
                      onChange={(e) => setEditedZone({ ...editedZone, memory: e.target.value })}
                      className={`w-full px-2 py-1 text-base ${theme.input} rounded border`}
                    />
                  ) : (
                    zone.memory || 'N/A'
                  )}
                </span>
              </div>
            )}

            {/* Metadata */}
            {zone.metadata && Object.keys(zone.metadata).length > 0 && (
              <div className={`pt-3 border-t ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
                <p className={`font-semibold ${theme.text} mb-2 text-base`}>Additional Fields:</p>
                <div className="space-y-2">
                  {Object.entries(zone.metadata).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <span className={`font-semibold ${theme.text} min-w-[120px]`}>{key}:</span>
                      <span className={theme.textSecondary}>{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Collapsed Quick Stats - INCREASED FONT SIZE & PADDING */}
      {!isExpanded && (
        <div className={`px-3 pb-2 flex items-center gap-4 text-base ${theme.textSecondary}`}>
          {zone.cpu && (
            <div className="flex gap-2">
              <span className="font-semibold">CPU:</span>
              <span>{zone.cpu}</span>
            </div>
          )}
          {zone.memory && (
            <div className="flex gap-2">
              <span className="font-semibold">RAM:</span>
              <span>{zone.memory}</span>
            </div>
          )}
          {zone.count && (
            <div className="flex gap-2">
              <span className="font-semibold">Count:</span>
              <span>{zone.count}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



























            // {/* Custom Fields Section */}
            // <div className={`pt-2 mt-2 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            //   <button
            //     onClick={() => setShowMetadata(!showMetadata)}
            //     className={`w-full px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
            //       showMetadata
            //         ? `${theme.accent} text-white`
            //         : `${isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-700'}`
            //     }`}
            //   >
            //     <span>Custom Fields</span>
            //     <span className={`px-2 py-0.5 rounded-full ${
            //       showMetadata ? 'bg-white/20' : isDark ? 'bg-slate-600' : 'bg-gray-200'
            //     }`}>
            //       {Object.keys(zone.metadata || {}).length}
            //     </span>
            //   </button>

            //   {showMetadata && (
            //     <div className="mt-2">
            //       {isEditing ? (
            //         <CustomFieldEditor
            //           level="zone"
            //           metadata={zone.metadata || {}}
            //           onChange={handleMetadataUpdate}
            //           theme={theme}
            //           isDark={isDark}
            //         />
            //       ) : (
            //         <div className="space-y-1">
            //           {Object.entries(zone.metadata || {}).length === 0 ? (
            //             <p className={`text-center py-3 text-xs ${theme.textSecondary}`}>
            //               No custom fields
            //             </p>
            //           ) : (
            //             Object.entries(zone.metadata || {}).map(([key, value]) => (
            //               <div
            //                 key={key}
            //                 className={`flex items-center justify-between p-2 ${
            //                   isDark ? 'bg-slate-700/50' : 'bg-gray-50'
            //                 } rounded`}
            //               >
            //                 <span className={`font-semibold ${theme.text} text-xs`}>{key}</span>
            //                 <span className={`${theme.textSecondary} text-xs`}>{value as string}</span>
            //               </div>
            //             ))
            //           )}
            //         </div>
            //       )}
            //     </div>
            //      )}
            