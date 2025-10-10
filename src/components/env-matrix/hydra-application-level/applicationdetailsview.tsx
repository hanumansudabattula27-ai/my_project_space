// // src/components/env-matrix/ApplicationDetailsView.tsx
// 'use client';

// import { useState } from 'react';
// import { Application } from '@/types';
// import ProjectSection from './projectsection';
// import { ChevronDown, ChevronRight, Package, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

// interface ApplicationDetailsViewProps {
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
// }

// export default function ApplicationDetailsView({
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
// }: ApplicationDetailsViewProps) {
//   const [expandedSections, setExpandedSections] = useState({
//     appFields: true,
//     projects: true,
//   });
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState('');
//   const [isAddingField, setIsAddingField] = useState(false);
//   const [newFieldKey, setNewFieldKey] = useState('');
//   const [newFieldValue, setNewFieldValue] = useState('');

//   const toggleSection = (section: keyof typeof expandedSections) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   const getAllFields = (): Record<string, any> => {
//     return {
//       aimId: application.aimId,
//       applicationName: application.applicationName,
//       ...(application.metadata || {}),
//     };
//   };

//   const handleEditField = (fieldKey: string, currentValue: any) => {
//     setEditingField(fieldKey);
//     setEditValue(String(currentValue || ''));
//   };

//   const handleSaveField = (fieldKey: string) => {
//     const coreFields = ['aimId', 'applicationName'];
    
//     let updatedApp = { ...application };
    
//     if (coreFields.includes(fieldKey)) {
//       (updatedApp as any)[fieldKey] = editValue;
//     } else {
//       updatedApp.metadata = {
//         ...updatedApp.metadata,
//         [fieldKey]: editValue,
//       };
//     }
    
//     onUpdate(updatedApp);
//     setEditingField(null);
//   };

//   const handleDeleteField = (fieldKey: string) => {
//     const coreFields = ['aimId', 'applicationName'];
    
//     if (coreFields.includes(fieldKey)) {
//       if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
//         const updatedApp = { ...application };
//         (updatedApp as any)[fieldKey] = '';
//         onUpdate(updatedApp);
//       }
//     } else {
//       const updatedMetadata = { ...application.metadata };
//       delete updatedMetadata[fieldKey];
//       onUpdate({ ...application, metadata: updatedMetadata });
//     }
//   };

//   const handleAddField = () => {
//     if (newFieldKey.trim() && newFieldValue.trim()) {
//       const updatedApp = {
//         ...application,
//         metadata: {
//           ...application.metadata,
//           [newFieldKey.trim()]: newFieldValue.trim(),
//         },
//       };
//       onUpdate(updatedApp);
//       setNewFieldKey('');
//       setNewFieldValue('');
//       setIsAddingField(false);
//     }
//   };

//   const totalServices = application.Projects?.reduce(
//     (total, project) => total + (project.services?.length || 0),
//     0
//   ) || 0;

//   const totalEnvironments = application.Projects?.reduce(
//     (total, project) =>
//       total +
//       (project.services?.reduce(
//         (envTotal, service) => envTotal + (service.environments?.length || 0),
//         0
//       ) || 0),
//     0
//   ) || 0;

//   const allFields = getAllFields();

//   return (
//     <div className="space-y-6">
//       {/* Summary Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className={`${theme.card} border rounded-xl p-6`}>
//           <div className="flex items-center gap-3 mb-2">
//             <Package size={24} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
//             <h3 className={`text-sm font-semibold ${theme.textSecondary}`}>Total Projects</h3>
//           </div>
//           <p className={`text-4xl font-bold ${theme.text}`}>
//             {application.Projects?.length || 0}
//           </p>
//         </div>

//         <div className={`${theme.card} border rounded-xl p-6`}>
//           <div className="flex items-center gap-3 mb-2">
//             <Package size={24} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
//             <h3 className={`text-sm font-semibold ${theme.textSecondary}`}>Total Services</h3>
//           </div>
//           <p className={`text-4xl font-bold ${theme.text}`}>{totalServices}</p>
//         </div>

//         <div className={`${theme.card} border rounded-xl p-6`}>
//           <div className="flex items-center gap-3 mb-2">
//             <Package size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
//             <h3 className={`text-sm font-semibold ${theme.textSecondary}`}>Total Environments</h3>
//           </div>
//           <p className={`text-4xl font-bold ${theme.text}`}>{totalEnvironments}</p>
//         </div>
//       </div>

//       {/* Application Fields Section */}
//       <div className={`${theme.card} border rounded-2xl overflow-hidden`}>
//         <button
//           onClick={() => toggleSection('appFields')}
//           className={`w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-all ${
//             isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
//           }`}
//         >
//           <h2 className={`text-xl font-bold ${theme.text} flex items-center gap-3`}>
//             {expandedSections.appFields ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
//             Application Details
//           </h2>
//           <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//             isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'
//           }`}>
//             {Object.keys(allFields).length} fields
//           </span>
//         </button>

//         {expandedSections.appFields && (
//           <div className="px-6 pb-6">
//             <div className="space-y-2 pt-4">
//               {Object.entries(allFields).map(([key, value]) => {
//                 if (!isEditing && !value) return null;

//                 return (
//                   <div
//                     key={key}
//                     className={`flex items-center justify-between p-4 ${
//                       isDark ? 'bg-slate-700/50' : 'bg-gray-50'
//                     } rounded-lg group`}
//                   >
//                     {editingField === key ? (
//                       <>
//                         <div className="flex-1 flex items-center gap-2">
//                           <span className={`text-sm font-semibold ${theme.text} min-w-[140px]`}>
//                             {key}:
//                           </span>
//                           <input
//                             type="text"
//                             value={editValue}
//                             onChange={(e) => setEditValue(e.target.value)}
//                             className={`flex-1 px-3 py-2 ${theme.input} rounded border`}
//                             autoFocus
//                           />
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => handleSaveField(key)}
//                             className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
//                           >
//                             <Save size={16} />
//                           </button>
//                           <button
//                             onClick={() => setEditingField(null)}
//                             className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="flex-1">
//                           <span className={`font-semibold ${theme.text}`}>{key}: </span>
//                           <span className={theme.textSecondary}>{value as string}</span>
//                         </div>
//                         {isEditing && (
//                           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <button
//                               onClick={() => handleEditField(key, value)}
//                               className={`p-2 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'} rounded`}
//                             >
//                               <Edit2 size={16} className={theme.textSecondary} />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteField(key)}
//                               className={`p-2 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'} rounded`}
//                             >
//                               <Trash2 size={16} className="text-red-600" />
//                             </button>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 );
//               })}

//               {/* Add New Field */}
//               {isEditing && (
//                 <>
//                   {isAddingField ? (
//                     <div className={`p-4 ${isDark ? 'bg-slate-700/30' : 'bg-gray-100'} rounded-lg`}>
//                       <div className="grid grid-cols-2 gap-3 mb-3">
//                         <input
//                           type="text"
//                           value={newFieldKey}
//                           onChange={(e) => setNewFieldKey(e.target.value)}
//                           placeholder="Field name"
//                           className={`px-3 py-2 ${theme.input} rounded border`}
//                         />
//                         <input
//                           type="text"
//                           value={newFieldValue}
//                           onChange={(e) => setNewFieldValue(e.target.value)}
//                           placeholder="Value"
//                           className={`px-3 py-2 ${theme.input} rounded border`}
//                         />
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={handleAddField}
//                           className="flex-1 px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
//                         >
//                           Add
//                         </button>
//                         <button
//                           onClick={() => {
//                             setIsAddingField(false);
//                             setNewFieldKey('');
//                             setNewFieldValue('');
//                           }}
//                           className="flex-1 px-4 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => setIsAddingField(true)}
//                       className={`w-full px-4 py-3 ${theme.accent} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90`}
//                     >
//                       <Plus size={18} />
//                       Add New Field
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Projects Section */}
//       <div className={`${theme.card} border rounded-2xl overflow-hidden`}>
//         <button
//           onClick={() => toggleSection('projects')}
//           className={`w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-all ${
//             isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
//           }`}
//         >
//           <h2 className={`text-xl font-bold ${theme.text} flex items-center gap-3`}>
//             {expandedSections.projects ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
//             Projects & Services
//           </h2>
//           <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//             isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'
//           }`}>
//             {application.Projects?.length || 0} projects
//           </span>
//         </button>

//         {expandedSections.projects && (
//           <div className="px-6 pb-6 space-y-6">
//             {application.Projects && application.Projects.length > 0 ? (
//               application.Projects.map((project, projectIndex) => (
//                 <ProjectSection
//                   key={projectIndex}
//                   project={project}
//                   projectIndex={projectIndex}
//                   application={application}
//                   onUpdate={onUpdate}
//                   isEditing={isEditing}
//                   theme={theme}
//                   isDark={isDark}
//                 />
//               ))
//             ) : (
//               <p className={`text-center py-8 ${theme.textSecondary}`}>
//                 No projects found
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











// // src/components/env-matrix/ApplicationDetailsView.tsx
// 'use client';

// import { useState } from 'react';
// import { Application } from '@/types';
// import { FilterState } from './smartfilterbar';
// import ProjectSection from './projectsection';
// import { ChevronDown, ChevronRight, Package, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

// interface ApplicationDetailsViewProps {
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   filters: FilterState;
// }

// export default function ApplicationDetailsView({
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   filters,
// }: ApplicationDetailsViewProps) {
//   const [expandedSections, setExpandedSections] = useState({
//     appFields: true,
//     projects: true,
//   });
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState('');
//   const [isAddingField, setIsAddingField] = useState(false);
//   const [newFieldKey, setNewFieldKey] = useState('');
//   const [newFieldValue, setNewFieldValue] = useState('');

//   const toggleSection = (section: keyof typeof expandedSections) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   const getAllFields = (): Record<string, any> => {
//     return {
//       aimId: application.aimId,
//       applicationName: application.applicationName,
//       ...(application.metadata || {}),
//     };
//   };

//   const handleEditField = (fieldKey: string, currentValue: any) => {
//     setEditingField(fieldKey);
//     setEditValue(String(currentValue || ''));
//   };

//   const handleSaveField = (fieldKey: string) => {
//     const coreFields = ['aimId', 'applicationName'];
    
//     let updatedApp = { ...application };
    
//     if (coreFields.includes(fieldKey)) {
//       (updatedApp as any)[fieldKey] = editValue;
//     } else {
//       updatedApp.metadata = {
//         ...updatedApp.metadata,
//         [fieldKey]: editValue,
//       };
//     }
    
//     onUpdate(updatedApp);
//     setEditingField(null);
//   };

//   const handleDeleteField = (fieldKey: string) => {
//     const coreFields = ['aimId', 'applicationName'];
    
//     if (coreFields.includes(fieldKey)) {
//       if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
//         const updatedApp = { ...application };
//         (updatedApp as any)[fieldKey] = '';
//         onUpdate(updatedApp);
//       }
//     } else {
//       const updatedMetadata = { ...application.metadata };
//       delete updatedMetadata[fieldKey];
//       onUpdate({ ...application, metadata: updatedMetadata });
//     }
//   };

//   const handleAddField = () => {
//     if (newFieldKey.trim() && newFieldValue.trim()) {
//       const updatedApp = {
//         ...application,
//         metadata: {
//           ...application.metadata,
//           [newFieldKey.trim()]: newFieldValue.trim(),
//         },
//       };
//       onUpdate(updatedApp);
//       setNewFieldKey('');
//       setNewFieldValue('');
//       setIsAddingField(false);
//     }
//   };

//   // Check if project matches filters
//   const projectMatchesFilters = (projectIndex: number): boolean => {
//     const project = application.Projects[projectIndex];
    
//     // Check project name filter
//     if (filters.projectNames.length > 0) {
//       if (!filters.projectNames.includes(project.project)) {
//         return false;
//       }
//     }

//     // Check if any service in project matches service filter
//     if (filters.serviceNames.length > 0) {
//       const hasMatchingService = project.services?.some(service =>
//         filters.serviceNames.includes(service.serviceName)
//       );
//       if (!hasMatchingService) return false;
//     }

//     // Check if any environment matches environment filter
//     if (filters.environments.length > 0) {
//       const hasMatchingEnv = project.services?.some(service =>
//         service.environments?.some(env =>
//           filters.environments.includes(env.environmentName)
//         )
//       );
//       if (!hasMatchingEnv) return false;
//     }

//     // Check datacenter filter
//     if (filters.datacenter.length > 0) {
//       const hasMatchingDatacenter = project.services?.some(service =>
//         service.environments?.some(env =>
//           env.Zones?.some(zone =>
//             zone.metadata?.datacenter && filters.datacenter.includes(zone.metadata.datacenter as string)
//           )
//         )
//       );
//       if (!hasMatchingDatacenter) return false;
//     }

//     // Search query
//     if (filters.searchQuery) {
//       const searchLower = filters.searchQuery.toLowerCase();
//       const projectText = JSON.stringify(project).toLowerCase();
//       if (!projectText.includes(searchLower)) return false;
//     }

//     return true;
//   };

//   const totalServices = application.Projects?.reduce(
//     (total, project) => total + (project.services?.length || 0),
//     0
//   ) || 0;

//   const totalEnvironments = application.Projects?.reduce(
//     (total, project) =>
//       total +
//       (project.services?.reduce(
//         (envTotal, service) => envTotal + (service.environments?.length || 0),
//         0
//       ) || 0),
//     0
//   ) || 0;

//   const allFields = getAllFields();

//   // Filter projects
//   const filteredProjects = application.Projects?.filter((_, index) =>
//     projectMatchesFilters(index)
//   ) || [];

//   const hasActiveFilters = 
//     filters.environments.length > 0 ||
//     filters.projectNames.length > 0 ||
//     filters.serviceNames.length > 0 ||
//     filters.datacenter.length > 0 ||
//     filters.searchQuery.length > 0;

//   return (
//     <div className="space-y-6">
//       {/* Summary Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className={`${theme.card} border rounded-xl p-6`}>
//           <div className="flex items-center gap-3 mb-2">
//             <Package size={24} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
//             <h3 className={`text-sm font-semibold ${theme.textSecondary}`}>Total Projects</h3>
//           </div>
//           <p className={`text-4xl font-bold ${theme.text}`}>
//             {application.Projects?.length || 0}
//           </p>
//           {hasActiveFilters && filteredProjects.length !== application.Projects?.length && (
//             <p className={`text-sm ${theme.textSecondary} mt-2`}>
//               Showing {filteredProjects.length} filtered
//             </p>
//           )}
//         </div>

//         <div className={`${theme.card} border rounded-xl p-6`}>
//           <div className="flex items-center gap-3 mb-2">
//             <Package size={24} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
//             <h3 className={`text-sm font-semibold ${theme.textSecondary}`}>Total Services</h3>
//           </div>
//           <p className={`text-4xl font-bold ${theme.text}`}>{totalServices}</p>
//         </div>

//         <div className={`${theme.card} border rounded-xl p-6`}>
//           <div className="flex items-center gap-3 mb-2">
//             <Package size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
//             <h3 className={`text-sm font-semibold ${theme.textSecondary}`}>Total Environments</h3>
//           </div>
//           <p className={`text-4xl font-bold ${theme.text}`}>{totalEnvironments}</p>
//         </div>
//       </div>

//       {/* Filter Status Message */}
//       {hasActiveFilters && (
//         <div className={`${isDark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4`}>
//           <p className={`text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
//             🔍 Filters Active: Showing {filteredProjects.length} of {application.Projects?.length || 0} projects
//           </p>
//         </div>
//       )}

//       {/* Application Fields Section */}
//       <div className={`${theme.card} border rounded-2xl overflow-hidden`}>
//         <button
//           onClick={() => toggleSection('appFields')}
//           className={`w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-all ${
//             isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
//           }`}
//         >
//           <h2 className={`text-xl font-bold ${theme.text} flex items-center gap-3`}>
//             {expandedSections.appFields ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
//             Application Details
//           </h2>
//           <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//             isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'
//           }`}>
//             {Object.keys(allFields).length} fields
//           </span>
//         </button>

//         {expandedSections.appFields && (
//           <div className="px-6 pb-6">
//             <div className="space-y-2 pt-4">
//               {Object.entries(allFields).map(([key, value]) => {
//                 if (!isEditing && !value) return null;

//                 return (
//                   <div
//                     key={key}
//                     className={`flex items-center justify-between p-4 ${
//                       isDark ? 'bg-slate-700/50' : 'bg-gray-50'
//                     } rounded-lg group`}
//                   >
//                     {editingField === key ? (
//                       <>
//                         <div className="flex-1 flex items-center gap-2">
//                           <span className={`text-sm font-semibold ${theme.text} min-w-[140px]`}>
//                             {key}:
//                           </span>
//                           <input
//                             type="text"
//                             value={editValue}
//                             onChange={(e) => setEditValue(e.target.value)}
//                             className={`flex-1 px-3 py-2 ${theme.input} rounded border`}
//                             autoFocus
//                           />
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => handleSaveField(key)}
//                             className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
//                           >
//                             <Save size={16} />
//                           </button>
//                           <button
//                             onClick={() => setEditingField(null)}
//                             className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="flex-1">
//                           <span className={`font-semibold ${theme.text}`}>{key}: </span>
//                           <span className={theme.textSecondary}>{value as string}</span>
//                         </div>
//                         {isEditing && (
//                           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <button
//                               onClick={() => handleEditField(key, value)}
//                               className={`p-2 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'} rounded`}
//                             >
//                               <Edit2 size={16} className={theme.textSecondary} />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteField(key)}
//                               className={`p-2 ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-100'} rounded`}
//                             >
//                               <Trash2 size={16} className="text-red-600" />
//                             </button>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 );
//               })}

//               {/* Add New Field */}
//               {isEditing && (
//                 <>
//                   {isAddingField ? (
//                     <div className={`p-4 ${isDark ? 'bg-slate-700/30' : 'bg-gray-100'} rounded-lg`}>
//                       <div className="grid grid-cols-2 gap-3 mb-3">
//                         <input
//                           type="text"
//                           value={newFieldKey}
//                           onChange={(e) => setNewFieldKey(e.target.value)}
//                           placeholder="Field name"
//                           className={`px-3 py-2 ${theme.input} rounded border`}
//                         />
//                         <input
//                           type="text"
//                           value={newFieldValue}
//                           onChange={(e) => setNewFieldValue(e.target.value)}
//                           placeholder="Value"
//                           className={`px-3 py-2 ${theme.input} rounded border`}
//                         />
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={handleAddField}
//                           className="flex-1 px-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
//                         >
//                           Add
//                         </button>
//                         <button
//                           onClick={() => {
//                             setIsAddingField(false);
//                             setNewFieldKey('');
//                             setNewFieldValue('');
//                           }}
//                           className="flex-1 px-4 py-2 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => setIsAddingField(true)}
//                       className={`w-full px-4 py-3 ${theme.accent} text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90`}
//                     >
//                       <Plus size={18} />
//                       Add New Field
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Projects Section */}
//       <div className={`${theme.card} border rounded-2xl overflow-hidden`}>
//         <button
//           onClick={() => toggleSection('projects')}
//           className={`w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-all ${
//             isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
//           }`}
//         >
//           <h2 className={`text-xl font-bold ${theme.text} flex items-center gap-3`}>
//             {expandedSections.projects ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
//             Projects & Services
//           </h2>
//           <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//             isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'
//           }`}>
//             {hasActiveFilters
//               ? `${filteredProjects.length} / ${application.Projects?.length || 0}`
//               : `${application.Projects?.length || 0}`
//             } projects
//           </span>
//         </button>

//         {expandedSections.projects && (
//           <div className="px-6 pb-6 space-y-6">
//             {filteredProjects.length > 0 ? (
//               filteredProjects.map((project, projectIndex) => {
//                 // Find the original index
//                 const originalIndex = application.Projects.findIndex(p => p.project === project.project);
                
//                 return (
//                   <ProjectSection
//                     key={originalIndex}
//                     project={project}
//                     projectIndex={originalIndex}
//                     application={application}
//                     onUpdate={onUpdate}
//                     isEditing={isEditing}
//                     theme={theme}
//                     isDark={isDark}
//                     filters={filters}
//                   />
//                 );
//               })
//             ) : (
//               <p className={`text-center py-8 ${theme.textSecondary}`}>
//                 {hasActiveFilters
//                   ? 'No projects match the current filters'
//                   : 'No projects found'
//                 }
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







// // src/components/env-matrix/hydra-application-level/applicationdetailsview.tsx
// 'use client';

// import { useState } from 'react';
// import { Application } from '@/types';
// import ProjectSection from './projectsection';
// import { ChevronDown, ChevronRight } from 'lucide-react';

// interface ApplicationDetailsViewProps {
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   searchQuery: string;
// }

// export default function ApplicationDetailsView({
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   searchQuery,
// }: ApplicationDetailsViewProps) {
//   const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});

//   const toggleProject = (index: number) => {
//     setExpandedProjects(prev => ({ ...prev, [index]: !prev[index] }));
//   };

//   // Filter projects based on search
//   const filteredProjects = application.Projects?.filter((project) => {
//     if (!searchQuery) return true;
//     const searchLower = searchQuery.toLowerCase();
//     const projectText = JSON.stringify(project).toLowerCase();
//     return projectText.includes(searchLower);
//   }) || [];

//   return (
//     <div className="space-y-4">
//       {filteredProjects.length > 0 ? (
//         filteredProjects.map((project, index) => {
//           const originalIndex = application.Projects.findIndex(p => p.project === project.project);
//           return (
//             <ProjectSection
//               key={originalIndex}
//               project={project}
//               projectIndex={originalIndex}
//               application={application}
//               onUpdate={onUpdate}
//               isEditing={isEditing}
//               theme={theme}
//               isDark={isDark}
//               searchQuery={searchQuery}
//               isExpanded={expandedProjects[originalIndex]}
//               onToggle={() => toggleProject(originalIndex)}
//             />
//           );
//         })
//       ) : (
//         <div className={`${theme.card} border rounded-lg p-12 text-center`}>
//           <p className={theme.textSecondary}>
//             {searchQuery ? `No results found for "${searchQuery}"` : 'No projects found'}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }





// // src/components/env-matrix/hydra-application-level/applicationdetailsview.tsx
// 'use client';

// import { useState } from 'react';
// import { Application } from '@/types';
// import ProjectSection from './projectsection';

// interface ApplicationDetailsViewProps {
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   searchQuery: string;
// }

// export default function ApplicationDetailsView({
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   searchQuery,
// }: ApplicationDetailsViewProps) {
//   const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);

//   const handleProjectOpen = (index: number) => {
//     // If clicking the same project, toggle it. Otherwise, close others and open this one
//     setExpandedProjectIndex(expandedProjectIndex === index ? null : index);
//   };

//   // Filter projects based on search
//   const filteredProjects = application.Projects?.filter((project) => {
//     if (!searchQuery) return true;
//     const searchLower = searchQuery.toLowerCase();
//     const projectText = JSON.stringify(project).toLowerCase();
//     return projectText.includes(searchLower);
//   }) || [];

//   return (
//     <div className="space-y-4">
//       {filteredProjects.length > 0 ? (
//         filteredProjects.map((project, index) => {
//           const originalIndex = application.Projects.findIndex(p => p.project === project.project);
//           return (
//             <ProjectSection
//               key={originalIndex}
//               project={project}
//               projectIndex={originalIndex}
//               application={application}
//               onUpdate={onUpdate}
//               isEditing={isEditing}
//               theme={theme}
//               isDark={isDark}
//               searchQuery={searchQuery}
//               isExpanded={expandedProjectIndex === originalIndex}
//               onToggle={() => {}} // Not used anymore
//               onProjectOpen={handleProjectOpen}
//             />
//           );
//         })
//       ) : (
//         <div className={`${theme.card} border rounded-lg p-12 text-center`}>
//           <p className={theme.textSecondary}>
//             {searchQuery ? `No results found for "${searchQuery}"` : 'No projects found'}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }






// src/components/env-matrix/hydra-application-level/applicationdetailsview.tsx
'use client';

import { useState } from 'react';
import { Application } from '@/types';
import ProjectSection from './projectsection';
import SimpleFilter from '@/components/env-matrix/hydra-application-level/simplefilter';

interface ApplicationDetailsViewProps {
  application: Application;
  onUpdate: (app: Application) => void;
  isEditing: boolean;
  theme: any;
  isDark: boolean;
  searchQuery: string;
}

export default function ApplicationDetailsView({
  application,
  onUpdate,
  isEditing,
  theme,
  isDark,
  searchQuery,
}: ApplicationDetailsViewProps) {
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleProjectOpen = (index: number) => {
    setExpandedProjectIndex(expandedProjectIndex === index ? null : index);
  };

  // Filter projects based on ONLY search (separate from filter)
  let filteredProjects = application.Projects || [];

  // Apply FILTER (Project/Service dropdowns)
  if (selectedProject) {
    filteredProjects = filteredProjects.filter(p => p.project === selectedProject);
  }

  if (selectedService) {
    filteredProjects = filteredProjects.filter(project =>
      project.services?.some(service => service.serviceName === selectedService)
    );
  }

  // Apply SEARCH (separate - searches everything)
  if (searchQuery) {
    filteredProjects = filteredProjects.filter((project) => {
      const searchLower = searchQuery.toLowerCase();
      const projectText = JSON.stringify(project).toLowerCase();
      return projectText.includes(searchLower);
    });
  }

  const hasActiveFilters = selectedProject !== '' || selectedService !== '';

  return (
    <div>
      {/* Simple Filter Bar (Projects & Services Only) */}
      <SimpleFilter
        application={application}
        selectedProject={selectedProject}
        selectedService={selectedService}
        onProjectChange={setSelectedProject}
        onServiceChange={setSelectedService}
        theme={theme}
        isDark={isDark}
      />

      {/* Filter Status Message */}
      {hasActiveFilters && (
        <div className={`mb-4 ${isDark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-lg p-3`}>
          <p className={`text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
            🔍 Filtered: Showing {filteredProjects.length} of {application.Projects?.length || 0} projects
            {selectedProject && ` | Project: ${selectedProject}`}
            {selectedService && ` | Service: ${selectedService}`}
          </p>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => {
            const originalIndex = application.Projects.findIndex(p => p.project === project.project);
            return (
              <ProjectSection
                key={originalIndex}
                project={project}
                projectIndex={originalIndex}
                application={application}
                onUpdate={onUpdate}
                isEditing={isEditing}
                theme={theme}
                isDark={isDark}
                searchQuery={searchQuery}
                selectedService={selectedService}
                isExpanded={expandedProjectIndex === originalIndex}
                onToggle={() => {}}
                onProjectOpen={handleProjectOpen}
              />
            );
          })
        ) : (
          <div className={`${theme.card} border rounded-lg p-12 text-center`}>
            <p className={theme.textSecondary}>
              {searchQuery || hasActiveFilters
                ? 'No results found'
                : 'No projects found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}