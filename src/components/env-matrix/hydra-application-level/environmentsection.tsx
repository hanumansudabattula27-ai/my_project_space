// // src/components/env-matrix/environmentsection.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Environment } from '@/types';
// import ZoneCard from './zonecard';
// import { ChevronDown, ChevronRight, Cloud, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

// interface EnvironmentSectionProps {
//   environment: Environment;
//   envIndex: number;
//   serviceIndex: number;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
// }

// export default function EnvironmentSection({
//   environment,
//   envIndex,
//   serviceIndex,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
// }: EnvironmentSectionProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState('');
//   const [isAddingField, setIsAddingField] = useState(false);
//   const [newFieldKey, setNewFieldKey] = useState('');
//   const [newFieldValue, setNewFieldValue] = useState('');

//   // Combine all fields (existing + custom metadata)
//   const getAllFields = (): Record<string, any> => {
//     return {
//       environmentName: environment.environmentName,
//       GTM: environment.GTM,
//       namehydra: environment.namehydra,
//       abcGTM: environment.abcGTM,
//       firewallProfile: environment.firewallProfile,
//       ...(environment.metadata || {}),
//     };
//   };

//   const updateEnvironment = (updatedEnv: Environment) => {
//     const updatedProjects = [...application.Projects];
//     const updatedServices = [...updatedProjects[projectIndex].services];
//     const updatedEnvironments = [...updatedServices[serviceIndex].environments];
//     updatedEnvironments[envIndex] = updatedEnv;
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
//     setEditValue(String(currentValue || ''));
//   };

//   const handleSaveField = (fieldKey: string) => {
//     const coreFields = ['environmentName', 'GTM', 'namehydra', 'abcGTM', 'firewallProfile'];
    
//     let updatedEnv = { ...environment };
    
//     if (coreFields.includes(fieldKey)) {
//       (updatedEnv as any)[fieldKey] = editValue;
//     } else {
//       updatedEnv.metadata = {
//         ...updatedEnv.metadata,
//         [fieldKey]: editValue,
//       };
//     }
    
//     updateEnvironment(updatedEnv);
//     setEditingField(null);
//   };

//   const handleDeleteField = (fieldKey: string) => {
//     const coreFields = ['environmentName', 'GTM', 'namehydra', 'abcGTM', 'firewallProfile'];
    
//     if (coreFields.includes(fieldKey)) {
//       if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
//         const updatedEnv = { ...environment };
//         (updatedEnv as any)[fieldKey] = '';
//         updateEnvironment(updatedEnv);
//       }
//     } else {
//       const updatedMetadata = { ...environment.metadata };
//       delete updatedMetadata[fieldKey];
//       updateEnvironment({ ...environment, metadata: updatedMetadata });
//     }
//   };

//   const handleAddField = () => {
//     if (newFieldKey.trim() && newFieldValue.trim()) {
//       const updatedEnv = {
//         ...environment,
//         metadata: {
//           ...environment.metadata,
//           [newFieldKey.trim()]: newFieldValue.trim(),
//         },
//       };
//       updateEnvironment(updatedEnv);
//       setNewFieldKey('');
//       setNewFieldValue('');
//       setIsAddingField(false);
//     }
//   };

//   const allFields = getAllFields();

//   const getEnvColor = (envName: string) => {
//     if (envName.includes('E1')) return isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700';
//     if (envName.includes('E2')) return isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
//     if (envName.includes('E3')) return isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700';
//     return isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700';
//   };

//   return (
//     <div className={`border ${isDark ? 'border-slate-600' : 'border-gray-200'} rounded-lg overflow-hidden`}>
//       {/* Environment Header */}
//       <div className={`${isDark ? 'bg-slate-800/50' : 'bg-gray-50'} p-4`}>
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="flex items-center gap-3 hover:opacity-80 transition-all w-full"
//         >
//           {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//           <Cloud size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
//           <div className="text-left flex-1">
//             <div className="flex items-center gap-3">
//               <h5 className={`text-md font-bold ${theme.text}`}>{environment.environmentName}</h5>
//               <span className={`px-3 py-1 rounded-full text-xs font-bold ${getEnvColor(environment.environmentName)}`}>
//                 {environment.Zones?.length || 0} zones
//               </span>
//             </div>
//           </div>
//         </button>
//       </div>

//       {isExpanded && (
//         <div className="p-4">
//           {/* All Fields (Existing + Custom) */}
//           <div className="space-y-2 mb-4">
//             {Object.entries(allFields).map(([key, value]) => {
//               if (!isEditing && !value) return null;

//               return (
//                 <div
//                   key={key}
//                   className={`flex items-center justify-between p-3 ${
//                     isDark ? 'bg-slate-700/50' : 'bg-gray-50'
//                   } rounded-lg group`}
//                 >
//                   {editingField === key ? (
//                     <>
//                       <div className="flex-1 flex items-center gap-2">
//                         <span className={`text-sm font-semibold ${theme.text} min-w-[120px]`}>
//                           {key}:
//                         </span>
//                         <input
//                           type="text"
//                           value={editValue}
//                           onChange={(e) => setEditValue(e.target.value)}
//                           className={`flex-1 px-3 py-1.5 ${theme.input} rounded border text-sm`}
//                           autoFocus
//                         />
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <button
//                           onClick={() => handleSaveField(key)}
//                           className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700"
//                         >
//                           <Save size={14} />
//                         </button>
//                         <button
//                           onClick={() => setEditingField(null)}
//                           className="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="flex-1">
//                         <span className={`text-sm font-semibold ${theme.text}`}>{key}: </span>
//                         <span className={`text-sm ${theme.textSecondary}`}>{value}</span>
//                       </div>
//                       {isEditing && (
//                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <button
//                             onClick={() => handleEditField(key, value)}
//                             className={`p-1.5 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'} rounded`}
//                           >
//                             <Edit2 size={14} className={theme.textSecondary} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteField(key)}
//                             className={`p-1.5 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'} rounded`}
//                           >
//                             <Trash2 size={14} className="text-red-600" />
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               );
//             })}

//             {/* Add New Field */}
//             {isEditing && (
//               <>
//                 {isAddingField ? (
//                   <div className={`p-3 ${isDark ? 'bg-slate-700/30' : 'bg-gray-100'} rounded-lg`}>
//                     <div className="grid grid-cols-2 gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={newFieldKey}
//                         onChange={(e) => setNewFieldKey(e.target.value)}
//                         placeholder="Field name"
//                         className={`px-3 py-2 ${theme.input} rounded border text-sm`}
//                       />
//                       <input
//                         type="text"
//                         value={newFieldValue}
//                         onChange={(e) => setNewFieldValue(e.target.value)}
//                         placeholder="Value"
//                         className={`px-3 py-2 ${theme.input} rounded border text-sm`}
//                       />
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleAddField}
//                         className="flex-1 px-3 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 text-sm"
//                       >
//                         Add
//                       </button>
//                       <button
//                         onClick={() => {
//                           setIsAddingField(false);
//                           setNewFieldKey('');
//                           setNewFieldValue('');
//                         }}
//                         className="flex-1 px-3 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700 text-sm"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => setIsAddingField(true)}
//                     className={`w-full px-4 py-2.5 ${theme.accent} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90`}
//                   >
//                     <Plus size={16} />
//                     Add New Field
//                   </button>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Zones Grid */}
//           {environment.Zones && environment.Zones.length > 0 && (
//             <div>
//               <h6 className={`text-sm font-bold ${theme.text} mb-3`}>Zones</h6>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {environment.Zones.map((zone, zoneIndex) => (
//                   <ZoneCard
//                     key={zoneIndex}
//                     zone={zone}
//                     zoneIndex={zoneIndex}
//                     envIndex={envIndex}
//                     serviceIndex={serviceIndex}
//                     projectIndex={projectIndex}
//                     application={application}
//                     onUpdate={onUpdate}
//                     isEditing={isEditing}
//                     theme={theme}
//                     isDark={isDark}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }














// // src/components/env-matrix/EnvironmentSection.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Environment } from '@/types';
// import { FilterState } from './smartfilterbar';
// import ZoneCard from './zonecard';
// import { ChevronDown, ChevronRight, Cloud, Edit2, Trash2, Plus, Save, X, Link as LinkIcon } from 'lucide-react';

// interface EnvironmentSectionProps {
//   environment: Environment;
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

// export default function EnvironmentSection({
//   environment,
//   envIndex,
//   serviceIndex,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   filters,
// }: EnvironmentSectionProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState('');
//   const [isAddingField, setIsAddingField] = useState(false);
//   const [newFieldKey, setNewFieldKey] = useState('');
//   const [newFieldValue, setNewFieldValue] = useState('');

//   const getAllFields = (): Record<string, any> => {
//     return {
//       environmentName: environment.environmentName,
//       GTM: environment.GTM,
//       namehydra: environment.namehydra,
//       abcGTM: environment.abcGTM,
//       firewallProfile: environment.firewallProfile,
//       ...(environment.metadata || {}),
//     };
//   };

//   const updateEnvironment = (updatedEnv: Environment) => {
//     const updatedProjects = [...application.Projects];
//     const updatedServices = [...updatedProjects[projectIndex].services];
//     const updatedEnvironments = [...updatedServices[serviceIndex].environments];
//     updatedEnvironments[envIndex] = updatedEnv;
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
//     setEditValue(String(currentValue || ''));
//   };

//   const handleSaveField = (fieldKey: string) => {
//     const coreFields = ['environmentName', 'GTM', 'namehydra', 'abcGTM', 'firewallProfile'];
    
//     let updatedEnv = { ...environment };
    
//     if (coreFields.includes(fieldKey)) {
//       (updatedEnv as any)[fieldKey] = editValue;
//     } else {
//       updatedEnv.metadata = {
//         ...updatedEnv.metadata,
//         [fieldKey]: editValue,
//       };
//     }
    
//     updateEnvironment(updatedEnv);
//     setEditingField(null);
//   };

//   const handleDeleteField = (fieldKey: string) => {
//     const coreFields = ['environmentName', 'GTM', 'namehydra', 'abcGTM', 'firewallProfile'];
    
//     if (coreFields.includes(fieldKey)) {
//       if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
//         const updatedEnv = { ...environment };
//         (updatedEnv as any)[fieldKey] = '';
//         updateEnvironment(updatedEnv);
//       }
//     } else {
//       const updatedMetadata = { ...environment.metadata };
//       delete updatedMetadata[fieldKey];
//       updateEnvironment({ ...environment, metadata: updatedMetadata });
//     }
//   };

//   const handleAddField = () => {
//     if (newFieldKey.trim() && newFieldValue.trim()) {
//       const updatedEnv = {
//         ...environment,
//         metadata: {
//           ...environment.metadata,
//           [newFieldKey.trim()]: newFieldValue.trim(),
//         },
//       };
//       updateEnvironment(updatedEnv);
//       setNewFieldKey('');
//       setNewFieldValue('');
//       setIsAddingField(false);
//     }
//   };

//   // Filter zones
//   const filteredZones = environment.Zones?.filter(zone => {
//     // Datacenter filter
//     if (filters.datacenter.length > 0) {
//       if (!zone.metadata?.datacenter || !filters.datacenter.includes(zone.metadata.datacenter as string)) {
//         return false;
//       }
//     }

//     // Search query
//     if (filters.searchQuery) {
//       const searchLower = filters.searchQuery.toLowerCase();
//       const zoneText = JSON.stringify(zone).toLowerCase();
//       if (!zoneText.includes(searchLower)) return false;
//     }

//     return true;
//   }) || [];

//   const allFields = getAllFields();

//   const getEnvColor = (envName: string) => {
//     if (envName.includes('E1')) return isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700';
//     if (envName.includes('E2')) return isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
//     if (envName.includes('E3')) return isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700';
//     return isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700';
//   };

//   // Check if environment should be highlighted
//   const isHighlighted = filters.searchQuery && 
//     environment.environmentName.toLowerCase().includes(filters.searchQuery.toLowerCase());

//   return (
//     <div className={`border ${
//       isHighlighted
//         ? isDark ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' : 'border-yellow-400 shadow-lg shadow-yellow-400/20'
//         : isDark ? 'border-slate-600' : 'border-gray-200'
//     } rounded-lg overflow-hidden transition-all`}>
//       {/* Environment Header */}
//       <div className={`${isDark ? 'bg-slate-800/50' : 'bg-gray-50'} p-4`}>
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="flex items-center gap-3 hover:opacity-80 transition-all w-full"
//         >
//           {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//           <Cloud size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
//           <div className="text-left flex-1">
//             <div className="flex items-center gap-3">
//               <h5 className={`text-md font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
//                 {environment.environmentName}
//               </h5>
//               <span className={`px-3 py-1 rounded-full text-xs font-bold ${getEnvColor(environment.environmentName)}`}>
//                 {filteredZones.length} of {environment.Zones?.length || 0} zones
//               </span>
//             </div>
//             <div className="flex items-center gap-3 mt-1">
//               {environment.GTM && (
//                 <span className={`text-xs ${theme.textSecondary} flex items-center gap-1`}>
//                   <LinkIcon size={10} />
//                   {environment.GTM}
//                 </span>
//               )}
//             </div>
//           </div>
//         </button>
//       </div>

//       {isExpanded && (
//         <div className="p-4">
//           {/* All Fields (Existing + Custom) */}
//           <div className="space-y-2 mb-4">
//             {Object.entries(allFields).map(([key, value]) => {
//               if (!isEditing && !value) return null;

//               return (
//                 <div
//                   key={key}
//                   className={`flex items-center justify-between p-3 ${
//                     isDark ? 'bg-slate-700/50' : 'bg-gray-50'
//                   } rounded-lg group`}
//                 >
//                   {editingField === key ? (
//                     <>
//                       <div className="flex-1 flex items-center gap-2">
//                         <span className={`text-sm font-semibold ${theme.text} min-w-[120px]`}>
//                           {key}:
//                         </span>
//                         <input
//                           type="text"
//                           value={editValue}
//                           onChange={(e) => setEditValue(e.target.value)}
//                           className={`flex-1 px-3 py-1.5 ${theme.input} rounded border text-sm`}
//                           autoFocus
//                         />
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <button
//                           onClick={() => handleSaveField(key)}
//                           className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700"
//                         >
//                           <Save size={14} />
//                         </button>
//                         <button
//                           onClick={() => setEditingField(null)}
//                           className="p-1.5 bg-gray-600 text-white rounded hover:bg-gray-700"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="flex-1">
//                         <span className={`text-sm font-semibold ${theme.text}`}>{key}: </span>
//                         <span className={`text-sm ${theme.textSecondary}`}>{value}</span>
//                       </div>
//                       {isEditing && (
//                         <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <button
//                             onClick={() => handleEditField(key, value)}
//                             className={`p-1.5 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'} rounded`}
//                           >
//                             <Edit2 size={14} className={theme.textSecondary} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteField(key)}
//                             className={`p-1.5 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'} rounded`}
//                           >
//                             <Trash2 size={14} className="text-red-600" />
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               );
//             })}

//             {/* Add New Field */}
//             {isEditing && (
//               <>
//                 {isAddingField ? (
//                   <div className={`p-3 ${isDark ? 'bg-slate-700/30' : 'bg-gray-100'} rounded-lg`}>
//                     <div className="grid grid-cols-2 gap-2 mb-2">
//                       <input
//                         type="text"
//                         value={newFieldKey}
//                         onChange={(e) => setNewFieldKey(e.target.value)}
//                         placeholder="Field name"
//                         className={`px-3 py-2 ${theme.input} rounded border text-sm`}
//                       />
//                       <input
//                         type="text"
//                         value={newFieldValue}
//                         onChange={(e) => setNewFieldValue(e.target.value)}
//                         placeholder="Value"
//                         className={`px-3 py-2 ${theme.input} rounded border text-sm`}
//                       />
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={handleAddField}
//                         className="flex-1 px-3 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 text-sm"
//                       >
//                         Add
//                       </button>
//                       <button
//                         onClick={() => {
//                           setIsAddingField(false);
//                           setNewFieldKey('');
//                           setNewFieldValue('');
//                         }}
//                         className="flex-1 px-3 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700 text-sm"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => setIsAddingField(true)}
//                     className={`w-full px-4 py-2.5 ${theme.accent} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90`}
//                   >
//                     <Plus size={16} />
//                     Add New Field
//                   </button>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Zones Grid */}
//           {filteredZones.length > 0 ? (
//             <div>
//               <h6 className={`text-sm font-bold ${theme.text} mb-3`}>Zones</h6>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 {filteredZones.map((zone, filteredIndex) => {
//                   // Find original index
//                   const originalIndex = environment.Zones.findIndex(z => z.ZoneName === zone.ZoneName);
                  
//                   return (
//                     <ZoneCard
//                       key={originalIndex}
//                       zone={zone}
//                       zoneIndex={originalIndex}
//                       envIndex={envIndex}
//                       serviceIndex={serviceIndex}
//                       projectIndex={projectIndex}
//                       application={application}
//                       onUpdate={onUpdate}
//                       isEditing={isEditing}
//                       theme={theme}
//                       isDark={isDark}
//                       filters={filters}
//                     />
//                   );
//                 })}
//               </div>
//             </div>
//           ) : (
//             <p className={`text-center py-6 text-sm ${theme.textSecondary}`}>
//               No zones match the current filters
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



// // src/components/env-matrix/hydra-application-level/environmentsection.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Environment } from '@/types';
// import ZoneCard from './zonecard';
// import { ChevronDown, ChevronRight, Cloud } from 'lucide-react';

// interface EnvironmentSectionProps {
//   environment: Environment;
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

// export default function EnvironmentSection({
//   environment,
//   envIndex,
//   serviceIndex,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   searchQuery,
// }: EnvironmentSectionProps) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const updateEnvironment = (updatedEnv: Environment) => {
//     const updatedProjects = [...application.Projects];
//     const updatedServices = [...updatedProjects[projectIndex].services];
//     const updatedEnvironments = [...updatedServices[serviceIndex].environments];
//     updatedEnvironments[envIndex] = updatedEnv;
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

//   // Filter zones
//   const filteredZones = environment.Zones?.filter(zone => {
//     if (!searchQuery) return true;
//     const searchLower = searchQuery.toLowerCase();
//     const zoneText = JSON.stringify(zone).toLowerCase();
//     return zoneText.includes(searchLower);
//   }) || [];

//   const getEnvColor = (envName: string) => {
//     if (envName.includes('E1')) return isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700';
//     if (envName.includes('E2')) return isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
//     if (envName.includes('E3')) return isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700';
//     return isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700';
//   };

//   const isHighlighted = searchQuery && 
//     environment.environmentName.toLowerCase().includes(searchQuery.toLowerCase());

//   return (
//     <div className={`border rounded-lg overflow-hidden ${
//       isHighlighted
//         ? isDark ? 'border-yellow-500' : 'border-yellow-400'
//         : isDark ? 'border-slate-600' : 'border-gray-200'
//     }`}>
//       {/* Environment Header */}
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className={`w-full flex items-center justify-between p-3 hover:opacity-80 transition-all ${
//           isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-gray-50 hover:bg-gray-100'
//         }`}
//       >
//         <div className="flex items-center gap-2">
//           {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
//           <Cloud size={16} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
//           <div className="text-left">
//             <h5 className={`text-sm font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
//               {environment.environmentName}
//             </h5>
//             {environment.GTM && (
//               <p className={`text-xs ${theme.textSecondary} truncate max-w-[300px]`}>
//                 {environment.GTM}
//               </p>
//             )}
//           </div>
//         </div>
//         <span className={`px-2 py-0.5 rounded text-xs font-bold ${getEnvColor(environment.environmentName)}`}>
//           {filteredZones.length}
//         </span>
//       </button>

//       {/* Environment Content */}
//       {isExpanded && (
//         <div className="p-3 pt-0">
//           {/* Environment Details */}
//           <div className={`mb-3 p-2 rounded text-xs ${isDark ? 'bg-slate-900/50' : 'bg-white'}`}>
//             <div className="grid grid-cols-2 gap-2">
//               {environment.GTM && (
//                 <div>
//                   <span className={`font-semibold ${theme.text}`}>GTM: </span>
//                   <span className={theme.textSecondary}>{environment.GTM}</span>
//                 </div>
//               )}
//               {environment.namehydra && (
//                 <div>
//                   <span className={`font-semibold ${theme.text}`}>Hydra: </span>
//                   <span className={theme.textSecondary}>{environment.namehydra}</span>
//                 </div>
//               )}
//               {environment.abcGTM && (
//                 <div>
//                   <span className={`font-semibold ${theme.text}`}>ABC GTM: </span>
//                   <span className={theme.textSecondary}>{environment.abcGTM}</span>
//                 </div>
//               )}
//               {environment.firewallProfile && (
//                 <div>
//                   <span className={`font-semibold ${theme.text}`}>Firewall: </span>
//                   <span className={theme.textSecondary}>{environment.firewallProfile}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Zones Grid */}
//           {filteredZones.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//               {filteredZones.map((zone, index) => {
//                 const originalIndex = environment.Zones.findIndex(z => z.ZoneName === zone.ZoneName);
//                 return (
//                   <ZoneCard
//                     key={originalIndex}
//                     zone={zone}
//                     zoneIndex={originalIndex}
//                     envIndex={envIndex}
//                     serviceIndex={serviceIndex}
//                     projectIndex={projectIndex}
//                     application={application}
//                     onUpdate={onUpdate}
//                     isEditing={isEditing}
//                     theme={theme}
//                     isDark={isDark}
//                     searchQuery={searchQuery}
//                   />
//                 );
//               })}
//             </div>
//           ) : (
//             <p className={`text-center py-4 text-xs ${theme.textSecondary}`}>
//               No zones match the search
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }







// // src/components/env-matrix/hydra-application-level/environmentsection.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Environment } from '@/types';
// import ZoneCard from './zonecard';
// import { ChevronDown, ChevronRight, Cloud, Edit2, Save, X } from 'lucide-react';

// interface EnvironmentSectionProps {
//   environment: Environment;
//   envIndex: number;
//   serviceIndex: number;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   searchQuery: string;
//   isExpanded: boolean;
//   onEnvOpen: (index: number) => void;
// }

// export default function EnvironmentSection({
//   environment,
//   envIndex,
//   serviceIndex,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   searchQuery,
//   isExpanded,
//   onEnvOpen,
// }: EnvironmentSectionProps) {
//   const [isEditingEnv, setIsEditingEnv] = useState(false);
//   const [editedEnv, setEditedEnv] = useState(environment);

//   const updateEnvironment = (updatedEnv: Environment) => {
//     const updatedProjects = [...application.Projects];
//     const updatedServices = [...updatedProjects[projectIndex].services];
//     const updatedEnvironments = [...updatedServices[serviceIndex].environments];
//     updatedEnvironments[envIndex] = updatedEnv;
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
//     updateEnvironment(editedEnv);
//     setIsEditingEnv(false);
//   };

//   const handleCancel = () => {
//     setEditedEnv(environment);
//     setIsEditingEnv(false);
//   };

//   const handleToggle = () => {
//     onEnvOpen(envIndex);
//   };

//   // Filter zones
//   const filteredZones = environment.Zones?.filter(zone => {
//     if (!searchQuery) return true;
//     const searchLower = searchQuery.toLowerCase();
//     const zoneText = JSON.stringify(zone).toLowerCase();
//     return zoneText.includes(searchLower);
//   }) || [];

//   const hasMatchingZone = searchQuery && filteredZones.length > 0;
//   const shouldAutoExpand = hasMatchingZone && !isExpanded;

//   const getEnvColor = (envName: string) => {
//     if (envName.includes('E1')) return isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700';
//     if (envName.includes('E2')) return isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
//     if (envName.includes('E3')) return isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700';
//     return isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700';
//   };

//   const isHighlighted = searchQuery && 
//     environment.environmentName.toLowerCase().includes(searchQuery.toLowerCase());

//   return (
//     <div className={`border rounded-lg overflow-hidden ${
//       isHighlighted
//         ? isDark ? 'border-yellow-500' : 'border-yellow-400'
//         : isDark ? 'border-slate-600' : 'border-gray-200'
//     }`}>
//       {/* Environment Header */}
//       <div className={`w-full flex items-center justify-between p-3 ${
//         isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-gray-50 hover:bg-gray-100'
//       }`}>
//         {/* Left Side - Clickable Toggle Area */}
//         <button
//           onClick={handleToggle}
//           className="flex items-center gap-3 hover:opacity-80 transition-all flex-1"
//         >
//           {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//           <Cloud size={18} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
//           <div className="text-left">
//             {isEditingEnv ? (
//               <input
//                 type="text"
//                 value={editedEnv.environmentName}
//                 onChange={(e) => setEditedEnv({ ...editedEnv, environmentName: e.target.value })}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`text-base font-bold px-2 py-1 ${theme.input} rounded border`}
//               />
//             ) : (
//               <>
//                 <h5 className={`text-base font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
//                   {environment.environmentName}
//                 </h5>
//                 {environment.GTM && (
//                   <p className={`text-sm ${theme.textSecondary} truncate max-w-[300px] mt-1`}>
//                     {environment.GTM}
//                   </p>
//                 )}
//               </>
//             )}
//           </div>
//         </button>

//         {/* Right Side - Action Buttons */}
//         <div className="flex items-center gap-2">
//           {isEditing && !isEditingEnv && (
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsEditingEnv(true);
//               }}
//               className={`p-2 rounded hover:bg-opacity-80 cursor-pointer ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
//             >
//               <Edit2 size={14} className={theme.textSecondary} />
//             </div>
//           )}
//           {isEditingEnv && (
//             <>
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleSave();
//                 }}
//                 className="p-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
//               >
//                 <Save size={14} />
//               </div>
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleCancel();
//                 }}
//                 className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
//               >
//                 <X size={14} />
//               </div>
//             </>
//           )}
//           <span className={`px-3 py-1 rounded text-sm font-bold ${getEnvColor(environment.environmentName)}`}>
//             {filteredZones.length}
//           </span>
//         </div>
//       </div>

//       {/* Environment Content */}
//       {(isExpanded || shouldAutoExpand) && (
//         <div className="p-3 pt-0">
//           {/* Environment Details - EDITABLE VERSION */}
//           {isEditingEnv ? (
//             <div className={`mb-3 p-3 rounded ${isDark ? 'bg-slate-900/50' : 'bg-white'}`}>
//               <div className="grid grid-cols-1 gap-3">
//                 {/* GTM */}
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>
//                     GTM
//                   </label>
//                   <input
//                     type="text"
//                     value={editedEnv.GTM || ''}
//                     onChange={(e) => setEditedEnv({ ...editedEnv, GTM: e.target.value })}
//                     placeholder="e.g., payment.app.dev.com"
//                     className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
//                   />
//                 </div>

//                 {/* Name Hydra */}
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>
//                     Name Hydra
//                   </label>
//                   <input
//                     type="text"
//                     value={editedEnv.namehydra || ''}
//                     onChange={(e) => setEditedEnv({ ...editedEnv, namehydra: e.target.value })}
//                     placeholder="e.g., allowpaymenthydra.com"
//                     className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
//                   />
//                 </div>

//                 {/* ABC GTM */}
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>
//                     ABC GTM
//                   </label>
//                   <input
//                     type="text"
//                     value={editedEnv.abcGTM || ''}
//                     onChange={(e) => setEditedEnv({ ...editedEnv, abcGTM: e.target.value })}
//                     placeholder="e.g., abc-gtm-value"
//                     className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
//                   />
//                 </div>

//                 {/* Firewall Profile */}
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>
//                     Firewall Profile
//                   </label>
//                   <input
//                     type="text"
//                     value={editedEnv.firewallProfile || ''}
//                     onChange={(e) => setEditedEnv({ ...editedEnv, firewallProfile: e.target.value })}
//                     placeholder="e.g., production"
//                     className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className={`mb-3 p-3 rounded text-base ${isDark ? 'bg-slate-900/50' : 'bg-white'}`}>
//               <div className="grid grid-cols-2 gap-3">
//                 {environment.GTM && (
//                   <div className="flex gap-2">
//                     <span className={`font-semibold ${theme.text}`}>GTM:</span>
//                     <span className={theme.textSecondary}>{environment.GTM}</span>
//                   </div>
//                 )}
//                 {environment.namehydra && (
//                   <div className="flex gap-2">
//                     <span className={`font-semibold ${theme.text}`}>Hydra:</span>
//                     <span className={theme.textSecondary}>{environment.namehydra}</span>
//                   </div>
//                 )}
//                 {environment.abcGTM && (
//                   <div className="flex gap-2">
//                     <span className={`font-semibold ${theme.text}`}>ABC GTM:</span>
//                     <span className={theme.textSecondary}>{environment.abcGTM}</span>
//                   </div>
//                 )}
//                 {environment.firewallProfile && (
//                   <div className="flex gap-2">
//                     <span className={`font-semibold ${theme.text}`}>Firewall:</span>
//                     <span className={theme.textSecondary}>{environment.firewallProfile}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Zones Grid */}
//           {filteredZones.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {filteredZones.map((zone, index) => {
//                 const originalIndex = environment.Zones.findIndex(z => z.ZoneName === zone.ZoneName);
//                 return (
//                   <ZoneCard
//                     key={originalIndex}
//                     zone={zone}
//                     zoneIndex={originalIndex}
//                     envIndex={envIndex}
//                     serviceIndex={serviceIndex}
//                     projectIndex={projectIndex}
//                     application={application}
//                     onUpdate={onUpdate}
//                     isEditing={isEditing}
//                     theme={theme}
//                     isDark={isDark}
//                     searchQuery={searchQuery}
//                   />
//                 );
//               })}
//             </div>
//           ) : (
//             <p className={`text-center py-4 text-sm ${theme.textSecondary}`}>
//               No zones match the search
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }





















// 'use client';

// import { useState, useEffect } from 'react';
// import { Application, Environment, Zone } from '@/types';
// import ZoneCard from './zonecard';
// import { ChevronDown, ChevronRight, Cloud, Edit2, Save, X, Plus } from 'lucide-react';

// interface EnvironmentSectionProps {
//   environment: Environment;
//   envIndex: number;
//   serviceIndex: number;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   searchQuery: string;
//   isExpanded: boolean;
//   onEnvOpen: (index: number) => void;
// }

// export default function EnvironmentSection({
//   environment,
//   envIndex,
//   serviceIndex,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   searchQuery,
//   isExpanded,
//   onEnvOpen,
// }: EnvironmentSectionProps) {
//   const [isEditingEnv, setIsEditingEnv] = useState(false);
//   const [editedEnv, setEditedEnv] = useState(environment);
//   const [isAddingZone, setIsAddingZone] = useState(false);
//   const [newZoneName, setNewZoneName] = useState('');
//   const [newZoneVIP, setNewZoneVIP] = useState('');
//   const [newZoneIP, setNewZoneIP] = useState('');

//   // Auto-reset edit mode when global isEditing turns off
//   useEffect(() => {
//     if (!isEditing && isEditingEnv) {
//       setIsEditingEnv(false);
//       setEditedEnv(environment);
//     }
//   }, [isEditing]);

//   // Auto-reset add mode when global isEditing turns off
//   useEffect(() => {
//     if (!isEditing && isAddingZone) {
//       setIsAddingZone(false);
//       setNewZoneName('');
//       setNewZoneVIP('');
//       setNewZoneIP('');
//     }
//   }, [isEditing]);

//   const updateEnvironment = (updatedEnv: Environment) => {
//     const updatedProjects = [...application.Projects];
//     const updatedServices = [...updatedProjects[projectIndex].services];
//     const updatedEnvironments = [...updatedServices[serviceIndex].environments];
//     updatedEnvironments[envIndex] = updatedEnv;
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
//     updateEnvironment(editedEnv);
//     setIsEditingEnv(false);
//   };

//   const handleCancel = () => {
//     setEditedEnv(environment);
//     setIsEditingEnv(false);
//   };

//   const handleToggle = () => {
//     onEnvOpen(envIndex);
//   };

//   // Handle adding new zone
//   const handleAddZone = () => {
//     if (!newZoneName.trim()) {
//       alert('Zone name cannot be empty');
//       return;
//     }
//     if (!newZoneVIP.trim()) {
//       alert('VIP name cannot be empty');
//       return;
//     }
//     if (!newZoneIP.trim()) {
//       alert('VIP IP cannot be empty');
//       return;
//     }

//     const newZone: Zone = {
//       ZoneName: newZoneName,
//       vipName: newZoneVIP,
//       vipIP: newZoneIP,
//       f5Device: [],
//       firewall: '',
//       count: '',
//       cpu: '',
//       memory: '',
//       metadata: {},
//     };

//     const updatedZones = [...editedEnv.Zones, newZone];
//     const updatedEnvData = { ...editedEnv, Zones: updatedZones };
//     updateEnvironment(updatedEnvData);

//     setIsAddingZone(false);
//     setNewZoneName('');
//     setNewZoneVIP('');
//     setNewZoneIP('');
//   };

//   const handleCancelAddZone = () => {
//     setIsAddingZone(false);
//     setNewZoneName('');
//     setNewZoneVIP('');
//     setNewZoneIP('');
//   };

//   // Filter zones
//   const filteredZones = environment.Zones?.filter(zone => {
//     if (!searchQuery) return true;
//     const searchLower = searchQuery.toLowerCase();
//     const zoneText = JSON.stringify(zone).toLowerCase();
//     return zoneText.includes(searchLower);
//   }) || [];

//   const hasMatchingZone = searchQuery && filteredZones.length > 0;
//   const shouldAutoExpand = hasMatchingZone && !isExpanded;

//   const getEnvColor = (envName: string) => {
//     if (envName.includes('E1')) return isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700';
//     if (envName.includes('E2')) return isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
//     if (envName.includes('E3')) return isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700';
//     return isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700';
//   };

//   const isHighlighted = searchQuery && 
//     environment.environmentName.toLowerCase().includes(searchQuery.toLowerCase());

//   return (
//     <div className={`border rounded-lg overflow-hidden ${
//       isHighlighted
//         ? isDark ? 'border-yellow-500' : 'border-yellow-400'
//         : isDark ? 'border-slate-600' : 'border-gray-200'
//     }`}>
//       {/* Environment Header */}
//       <div className={`w-full flex items-center justify-between p-3 ${
//         isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-gray-50 hover:bg-gray-100'
//       }`}>
//         {/* Left Side - Clickable Toggle Area */}
//         <button
//           onClick={handleToggle}
//           className="flex items-center gap-3 hover:opacity-80 transition-all flex-1"
//         >
//           {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//           <Cloud size={18} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
//           <div className="text-left">
//             {isEditingEnv ? (
//               <input
//                 type="text"
//                 value={editedEnv.environmentName}
//                 onChange={(e) => setEditedEnv({ ...editedEnv, environmentName: e.target.value })}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`text-base font-bold px-2 py-1 ${theme.input} rounded border`}
//               />
//             ) : (
//               <>
//                 <h5 className={`text-base font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
//                   {environment.environmentName}
//                 </h5>
//                 {environment.GTM && (
//                   <p className={`text-sm ${theme.textSecondary} truncate max-w-[300px] mt-1`}>
//                     {environment.GTM}
//                   </p>
//                 )}
//               </>
//             )}
//           </div>
//         </button>

//         {/* Right Side - Action Buttons */}
//         <div className="flex items-center gap-2">
//           {isEditing && !isEditingEnv && (
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsEditingEnv(true);
//               }}
//               className={`p-2 rounded hover:bg-opacity-80 cursor-pointer ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
//             >
//               <Edit2 size={14} className={theme.textSecondary} />
//             </div>
//           )}
//           {isEditingEnv && (
//             <>
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleSave();
//                 }}
//                 className="p-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
//               >
//                 <Save size={14} />
//               </div>
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleCancel();
//                 }}
//                 className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
//               >
//                 <X size={14} />
//               </div>
//             </>
//           )}
//           <span className={`px-3 py-1 rounded text-sm font-bold ${getEnvColor(environment.environmentName)}`}>
//             {filteredZones.length}
//           </span>
//         </div>
//       </div>

//       {/* Environment Content */}
//       {(isExpanded || shouldAutoExpand) && (
//         <div className="p-3 pt-0">
//           {/* Environment Details - EDITABLE VERSION */}
//           {isEditingEnv ? (
//             <div className={`mb-3 p-3 rounded ${isDark ? 'bg-slate-900/50' : 'bg-white'}`}>
//               <div className="grid grid-cols-1 gap-3">
//                 {/* GTM */}
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>GTM</label>
//                   <input
//                     type="text"
//                     value={editedEnv.GTM || ''}
//                     onChange={(e) => setEditedEnv({ ...editedEnv, GTM: e.target.value })}
//                     placeholder="e.g., payment.app.dev.com"
//                     className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
//                   />
//                 </div>
//                 {/* Name Hydra */}
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>Name Hydra</label>
//                   <input
//                     type="text"
//                     value={editedEnv.namehydra || ''}
//                     onChange={(e) => setEditedEnv({ ...editedEnv, namehydra: e.target.value })}
//                     placeholder="e.g., allowpaymenthydra.com"
//                     className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
//                   />
//                 </div>
//                 {/* ABC GTM */}
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>ABC GTM</label>
//                   <input
//                     type="text"
//                     value={editedEnv.abcGTM || ''}
//                     onChange={(e) => setEditedEnv({ ...editedEnv, abcGTM: e.target.value })}
//                     placeholder="e.g., abc-gtm-value"
//                     className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
//                   />
//                 </div>
//                 {/* Firewall Profile */}
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>Firewall Profile</label>
//                   <input
//                     type="text"
//                     value={editedEnv.firewallProfile || ''}
//                     onChange={(e) => setEditedEnv({ ...editedEnv, firewallProfile: e.target.value })}
//                     placeholder="e.g., production"
//                     className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
//                   />
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className={`mb-3 p-3 rounded text-base ${isDark ? 'bg-slate-900/50' : 'bg-white'}`}>
//               <div className="grid grid-cols-2 gap-3">
//                 {environment.GTM && (
//                   <div className="flex gap-2">
//                     <span className={`font-semibold ${theme.text}`}>GTM:</span>
//                     <span className={theme.textSecondary}>{environment.GTM}</span>
//                   </div>
//                 )}
//                 {environment.namehydra && (
//                   <div className="flex gap-2">
//                     <span className={`font-semibold ${theme.text}`}>Hydra:</span>
//                     <span className={theme.textSecondary}>{environment.namehydra}</span>
//                   </div>
//                 )}
//                 {environment.abcGTM && (
//                   <div className="flex gap-2">
//                     <span className={`font-semibold ${theme.text}`}>ABC GTM:</span>
//                     <span className={theme.textSecondary}>{environment.abcGTM}</span>
//                   </div>
//                 )}
//                 {environment.firewallProfile && (
//                   <div className="flex gap-2">
//                     <span className={`font-semibold ${theme.text}`}>Firewall:</span>
//                     <span className={theme.textSecondary}>{environment.firewallProfile}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Zones Grid */}
//           {filteredZones.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
//               {filteredZones.map((zone, index) => {
//                 const originalIndex = environment.Zones.findIndex(z => z.ZoneName === zone.ZoneName);
//                 return (
//                   <ZoneCard
//                     key={originalIndex}
//                     zone={zone}
//                     zoneIndex={originalIndex}
//                     envIndex={envIndex}
//                     serviceIndex={serviceIndex}
//                     projectIndex={projectIndex}
//                     application={application}
//                     onUpdate={onUpdate}
//                     isEditing={isEditing}
//                     theme={theme}
//                     isDark={isDark}
//                     searchQuery={searchQuery}
//                   />
//                 );
//               })}
//             </div>
//           ) : (
//             <p className={`text-center py-4 text-sm ${theme.textSecondary} mb-3`}>
//               No zones match the search
//             </p>
//           )}

//           {/* Add New Zone Button - Only in Edit Mode */}
//           {isEditing && !isAddingZone && (
//             <button
//               onClick={() => setIsAddingZone(true)}
//               className={`w-full py-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 transition-all ${
//                 isDark 
//                   ? 'border-blue-500/50 hover:border-blue-500 hover:bg-blue-900/20 text-blue-300' 
//                   : 'border-blue-400/50 hover:border-blue-500 hover:bg-blue-50 text-blue-600'
//               }`}
//             >
//               <Plus size={18} />
//               Add New Zone
//             </button>
//           )}

//           {/* Add Zone Form */}
//           {isAddingZone && (
//             <div className={`p-4 rounded-lg border-2 ${
//               isDark ? 'bg-slate-900/50 border-blue-500/30' : 'bg-blue-50 border-blue-300'
//             }`}>
//               <h4 className={`text-base font-bold ${theme.text} mb-3`}>New Zone</h4>
//               <div className="space-y-3">
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>Zone Name</label>
//                   <input
//                     type="text"
//                     value={newZoneName}
//                     onChange={(e) => setNewZoneName(e.target.value)}
//                     placeholder="e.g., Zone-A"
//                     className={`w-full px-3 py-2 ${theme.input} rounded border`}
//                   />
//                 </div>
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>VIP Name</label>
//                   <input
//                     type="text"
//                     value={newZoneVIP}
//                     onChange={(e) => setNewZoneVIP(e.target.value)}
//                     placeholder="e.g., payment-vip"
//                     className={`w-full px-3 py-2 ${theme.input} rounded border`}
//                   />
//                 </div>
//                 <div>
//                   <label className={`text-sm font-semibold ${theme.text} block mb-1`}>VIP IP</label>
//                   <input
//                     type="text"
//                     value={newZoneIP}
//                     onChange={(e) => setNewZoneIP(e.target.value)}
//                     placeholder="e.g., 192.168.1.1"
//                     className={`w-full px-3 py-2 ${theme.input} rounded border`}
//                   />
//                 </div>
//                 <div className="flex gap-2 justify-end">
//                   <button
//                     onClick={handleCancelAddZone}
//                     className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 font-semibold flex items-center gap-2"
//                   >
//                     <X size={16} />
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleAddZone}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold flex items-center gap-2"
//                   >
//                     <Save size={16} />
//                     Add Zone
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }











// src/components/env-matrix/hydra-application-level/environmentsection.tsx
'use client';

import { useState, useEffect } from 'react';
import { Application, Environment, Zone } from '@/types';
import ZoneCard from './zonecard';
import AddItemModal from '@/components/env-matrix/hydra-application-level/additemmodal';
import { ChevronDown, ChevronRight, Cloud, Edit2, Save, X } from 'lucide-react';

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
  searchQuery: string;
  isExpanded: boolean;
  onEnvOpen: (index: number) => void;
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
  searchQuery,
  isExpanded,
  onEnvOpen,
}: EnvironmentSectionProps) {
  const [isEditingEnv, setIsEditingEnv] = useState(false);
  const [editedEnv, setEditedEnv] = useState(environment);
  const [isAddZoneModalOpen, setIsAddZoneModalOpen] = useState(false);

  // Reset local edit state when global isEditing becomes false
  useEffect(() => {
    if (!isEditing) {
      setIsEditingEnv(false);
      setEditedEnv(environment);
    }
  }, [isEditing, environment]);

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

  const handleSave = () => {
    updateEnvironment(editedEnv);
    setIsEditingEnv(false);
  };

  const handleCancel = () => {
    setEditedEnv(environment);
    setIsEditingEnv(false);
  };

  const handleToggle = () => {
    onEnvOpen(envIndex);
  };

  const handleAddZoneSubmit = (newZoneData: Zone) => {
    const updatedZones = [...(environment.Zones || []), newZoneData];
    const updatedEnvWithZone = { ...environment, Zones: updatedZones };
    updateEnvironment(updatedEnvWithZone);
    // Auto-expand to show new zone
    onEnvOpen(envIndex);
    setIsAddZoneModalOpen(false);
  };

  // Filter zones
  const filteredZones = environment.Zones?.filter(zone => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    const zoneText = JSON.stringify(zone).toLowerCase();
    return zoneText.includes(searchLower);
  }) || [];

  const hasMatchingZone = searchQuery && filteredZones.length > 0;
  const shouldAutoExpand = hasMatchingZone && !isExpanded;

  const getEnvColor = (envName: string) => {
    if (envName.includes('E1')) return isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700';
    if (envName.includes('E2')) return isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
    if (envName.includes('E3')) return isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700';
    return isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700';
  };

  const isHighlighted = searchQuery && 
    environment.environmentName.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div className={`border rounded-lg overflow-hidden ${
      isHighlighted
        ? isDark ? 'border-yellow-500' : 'border-yellow-400'
        : isDark ? 'border-slate-600' : 'border-gray-200'
    }`}>
      {/* Environment Header */}
      <div className={`w-full flex items-center justify-between p-3 ${
        isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-gray-50 hover:bg-gray-100'
      }`}>
        {/* Left Side - Clickable Toggle Area */}
        <button
          onClick={handleToggle}
          className="flex items-center gap-3 hover:opacity-80 transition-all flex-1"
        >
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <Cloud size={18} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
          <div className="text-left">
            {isEditingEnv ? (
              <input
                type="text"
                value={editedEnv.environmentName}
                onChange={(e) => setEditedEnv({ ...editedEnv, environmentName: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                className={`text-base font-bold px-2 py-1 ${theme.input} rounded border`}
              />
            ) : (
              <>
                <h5 className={`text-base font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
                  {environment.environmentName}
                </h5>
                {environment.GTM && (
                  <p className={`text-sm ${theme.textSecondary} truncate max-w-[300px] mt-1`}>
                    {environment.GTM}
                  </p>
                )}
              </>
            )}
          </div>
        </button>

        {/* Right Side - Action Buttons */}
        <div className="flex items-center gap-2">
          {isEditing && !isEditingEnv && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingEnv(true);
              }}
              className={`p-2 rounded hover:bg-opacity-80 cursor-pointer ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
            >
              <Edit2 size={14} className={theme.textSecondary} />
            </div>
          )}
          {isEditingEnv && (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="p-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
              >
                <Save size={14} />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
              >
                <X size={14} />
              </div>
            </>
          )}
          {isEditing && !isEditingEnv && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAddZoneModalOpen(true);
              }}
              className={`px-3 py-2 rounded text-sm font-semibold ${theme.accent} text-white hover:scale-105 transition-all`}
            >
              + Zone
            </button>
          )}
          <span className={`px-3 py-1 rounded text-sm font-bold ${getEnvColor(environment.environmentName)}`}>
            {filteredZones.length}
          </span>
        </div>
      </div>

      {/* Environment Content */}
      {(isExpanded || shouldAutoExpand) && (
        <div className="p-3 pt-0">
          {/* Environment Details - EDITABLE VERSION */}
          {isEditingEnv ? (
            <div className={`mb-3 p-3 rounded ${isDark ? 'bg-slate-900/50' : 'bg-white'}`}>
              <div className="grid grid-cols-1 gap-3">
                {/* GTM */}
                <div>
                  <label className={`text-sm font-semibold ${theme.text} block mb-1`}>
                    GTM
                  </label>
                  <input
                    type="text"
                    value={editedEnv.GTM || ''}
                    onChange={(e) => setEditedEnv({ ...editedEnv, GTM: e.target.value })}
                    placeholder="e.g., payment.app.dev.com"
                    className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
                  />
                </div>

                {/* Name Hydra */}
                <div>
                  <label className={`text-sm font-semibold ${theme.text} block mb-1`}>
                    Name Hydra
                  </label>
                  <input
                    type="text"
                    value={editedEnv.namehydra || ''}
                    onChange={(e) => setEditedEnv({ ...editedEnv, namehydra: e.target.value })}
                    placeholder="e.g., allowpaymenthydra.com"
                    className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
                  />
                </div>

                {/* ABC GTM */}
                <div>
                  <label className={`text-sm font-semibold ${theme.text} block mb-1`}>
                    ABC GTM
                  </label>
                  <input
                    type="text"
                    value={editedEnv.abcGTM || ''}
                    onChange={(e) => setEditedEnv({ ...editedEnv, abcGTM: e.target.value })}
                    placeholder="e.g., abc-gtm-value"
                    className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
                  />
                </div>

                {/* Firewall Profile */}
                <div>
                  <label className={`text-sm font-semibold ${theme.text} block mb-1`}>
                    Firewall Profile
                  </label>
                  <input
                    type="text"
                    value={editedEnv.firewallProfile || ''}
                    onChange={(e) => setEditedEnv({ ...editedEnv, firewallProfile: e.target.value })}
                    placeholder="e.g., production"
                    className={`w-full px-3 py-2 text-base ${theme.input} rounded border`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={`mb-3 p-3 rounded text-base ${isDark ? 'bg-slate-900/50' : 'bg-white'}`}>
              <div className="grid grid-cols-2 gap-3">
                {environment.GTM && (
                  <div className="flex gap-2">
                    <span className={`font-semibold ${theme.text}`}>GTM:</span>
                    <span className={theme.textSecondary}>{environment.GTM}</span>
                  </div>
                )}
                {environment.namehydra && (
                  <div className="flex gap-2">
                    <span className={`font-semibold ${theme.text}`}>Hydra:</span>
                    <span className={theme.textSecondary}>{environment.namehydra}</span>
                  </div>
                )}
                {environment.abcGTM && (
                  <div className="flex gap-2">
                    <span className={`font-semibold ${theme.text}`}>ABC GTM:</span>
                    <span className={theme.textSecondary}>{environment.abcGTM}</span>
                  </div>
                )}
                {environment.firewallProfile && (
                  <div className="flex gap-2">
                    <span className={`font-semibold ${theme.text}`}>Firewall:</span>
                    <span className={theme.textSecondary}>{environment.firewallProfile}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Zones Grid */}
          {filteredZones.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredZones.map((zone, index) => {
                const originalIndex = environment.Zones.findIndex(z => z.ZoneName === zone.ZoneName);
                return (
                  <ZoneCard
                    key={originalIndex}
                    zone={zone}
                    zoneIndex={originalIndex}
                    envIndex={envIndex}
                    serviceIndex={serviceIndex}
                    projectIndex={projectIndex}
                    application={application}
                    onUpdate={onUpdate}
                    isEditing={isEditing}
                    theme={theme}
                    isDark={isDark}
                    searchQuery={searchQuery}
                  />
                );
              })}
            </div>
          ) : (
            <p className={`text-center py-4 text-sm ${theme.textSecondary}`}>
              No zones match the search
            </p>
          )}
        </div>
      )}

      {/* Add Zone Modal */}
      <AddItemModal
        isOpen={isAddZoneModalOpen}
        itemType="zone"
        onClose={() => setIsAddZoneModalOpen(false)}
        onSubmit={handleAddZoneSubmit}
        theme={theme}
        isDark={isDark}
      />
    </div>
  );
}