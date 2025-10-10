// // src/components/env-matrix/projectSection.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Project } from '@/types';
// import ServiceSection from './servicesection';
// import { ChevronDown, ChevronRight, FolderOpen, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

// interface ProjectSectionProps {
//   project: Project;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
// }

// export default function ProjectSection({
//   project,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
// }: ProjectSectionProps) {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState('');
//   const [isAddingField, setIsAddingField] = useState(false);
//   const [newFieldKey, setNewFieldKey] = useState('');
//   const [newFieldValue, setNewFieldValue] = useState('');

//   const getAllFields = (): Record<string, any> => {
//     return {
//       project: project.project,
//       ...(project.metadata || {}),
//     };
//   };

//   const updateProject = (updatedProject: Project) => {
//     const updatedProjects = [...application.Projects];
//     updatedProjects[projectIndex] = updatedProject;
//     onUpdate({ ...application, Projects: updatedProjects });
//   };

//   const handleEditField = (fieldKey: string, currentValue: any) => {
//     setEditingField(fieldKey);
//     setEditValue(String(currentValue || ''));
//   };

//   const handleSaveField = (fieldKey: string) => {
//     const coreFields = ['project'];
    
//     let updatedProject = { ...project };
    
//     if (coreFields.includes(fieldKey)) {
//       (updatedProject as any)[fieldKey] = editValue;
//     } else {
//       updatedProject.metadata = {
//         ...updatedProject.metadata,
//         [fieldKey]: editValue,
//       };
//     }
    
//     updateProject(updatedProject);
//     setEditingField(null);
//   };

//   const handleDeleteField = (fieldKey: string) => {
//     const coreFields = ['project'];
    
//     if (coreFields.includes(fieldKey)) {
//       if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
//         const updatedProject = { ...project };
//         (updatedProject as any)[fieldKey] = '';
//         updateProject(updatedProject);
//       }
//     } else {
//       const updatedMetadata = { ...project.metadata };
//       delete updatedMetadata[fieldKey];
//       updateProject({ ...project, metadata: updatedMetadata });
//     }
//   };

//   const handleAddField = () => {
//     if (newFieldKey.trim() && newFieldValue.trim()) {
//       const updatedProject = {
//         ...project,
//         metadata: {
//           ...project.metadata,
//           [newFieldKey.trim()]: newFieldValue.trim(),
//         },
//       };
//       updateProject(updatedProject);
//       setNewFieldKey('');
//       setNewFieldValue('');
//       setIsAddingField(false);
//     }
//   };

//   const allFields = getAllFields();

//   return (
//     <div className={`border-2 ${isDark ? 'border-slate-600' : 'border-teal-200'} rounded-xl overflow-hidden`}>
//       {/* Project Header */}
//       <div className={`${isDark ? 'bg-slate-700/30' : 'bg-teal-50'} p-5`}>
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="flex items-center gap-3 hover:opacity-80 transition-all w-full"
//         >
//           {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//           <FolderOpen size={24} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
//           <div className="text-left flex-1">
//             <h3 className={`text-lg font-bold ${theme.text}`}>{project.project}</h3>
//             <p className={`text-sm ${theme.textSecondary}`}>
//               {project.services?.length || 0} {project.services?.length === 1 ? 'service' : 'services'}
//             </p>
//           </div>
//         </button>
//       </div>

//       {isExpanded && (
//         <div className="p-5">
//           {/* All Fields (Existing + Custom) */}
//           <div className="space-y-2 mb-6">
//             {Object.entries(allFields).map(([key, value]) => {
//               if (!isEditing && !value) return null;

//               return (
//                 <div
//                   key={key}
//                   className={`flex items-center justify-between p-3 ${
//                     isDark ? 'bg-slate-700/50' : 'bg-white'
//                   } rounded-lg group`}
//                 >
//                   {editingField === key ? (
//                     <>
//                       <div className="flex-1 flex items-center gap-2">
//                         <span className={`text-sm font-semibold ${theme.text} min-w-[100px]`}>
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

//           {/* Services List */}
//           {project.services && project.services.length > 0 && (
//             <div className="space-y-4">
//               <h6 className={`text-sm font-bold ${theme.text}`}>Services</h6>
//               {project.services.map((service, serviceIndex) => (
//                 <ServiceSection
//                   key={serviceIndex}
//                   service={service}
//                   serviceIndex={serviceIndex}
//                   projectIndex={projectIndex}
//                   application={application}
//                   onUpdate={onUpdate}
//                   isEditing={isEditing}
//                   theme={theme}
//                   isDark={isDark}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }







// // src/components/env-matrix/ProjectSection.tsx - Add filters prop
// 'use client';

// import { useState } from 'react';
// import { Application, Project } from '@/types';
// import { FilterState } from './smartfilterbar';
// import ServiceSection from './servicesection';
// import { ChevronDown, ChevronRight, FolderOpen, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

// interface ProjectSectionProps {
//   project: Project;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   filters: FilterState;
// }

// export default function ProjectSection({
//   project,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   filters,
// }: ProjectSectionProps) {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState('');
//   const [isAddingField, setIsAddingField] = useState(false);
//   const [newFieldKey, setNewFieldKey] = useState('');
//   const [newFieldValue, setNewFieldValue] = useState('');

//   const getAllFields = (): Record<string, any> => {
//     return {
//       project: project.project,
//       ...(project.metadata || {}),
//     };
//   };

//   const updateProject = (updatedProject: Project) => {
//     const updatedProjects = [...application.Projects];
//     updatedProjects[projectIndex] = updatedProject;
//     onUpdate({ ...application, Projects: updatedProjects });
//   };

//   const handleEditField = (fieldKey: string, currentValue: any) => {
//     setEditingField(fieldKey);
//     setEditValue(String(currentValue || ''));
//   };

//   const handleSaveField = (fieldKey: string) => {
//     const coreFields = ['project'];
    
//     let updatedProject = { ...project };
    
//     if (coreFields.includes(fieldKey)) {
//       (updatedProject as any)[fieldKey] = editValue;
//     } else {
//       updatedProject.metadata = {
//         ...updatedProject.metadata,
//         [fieldKey]: editValue,
//       };
//     }
    
//     updateProject(updatedProject);
//     setEditingField(null);
//   };

//   const handleDeleteField = (fieldKey: string) => {
//     const coreFields = ['project'];
    
//     if (coreFields.includes(fieldKey)) {
//       if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
//         const updatedProject = { ...project };
//         (updatedProject as any)[fieldKey] = '';
//         updateProject(updatedProject);
//       }
//     } else {
//       const updatedMetadata = { ...project.metadata };
//       delete updatedMetadata[fieldKey];
//       updateProject({ ...project, metadata: updatedMetadata });
//     }
//   };

//   const handleAddField = () => {
//     if (newFieldKey.trim() && newFieldValue.trim()) {
//       const updatedProject = {
//         ...project,
//         metadata: {
//           ...project.metadata,
//           [newFieldKey.trim()]: newFieldValue.trim(),
//         },
//       };
//       updateProject(updatedProject);
//       setNewFieldKey('');
//       setNewFieldValue('');
//       setIsAddingField(false);
//     }
//   };

//   // Filter services
//   const filteredServices = project.services?.filter(service => {
//     // Service name filter
//     if (filters.serviceNames.length > 0) {
//       if (!filters.serviceNames.includes(service.serviceName)) return false;
//     }

//     // Environment filter
//     if (filters.environments.length > 0) {
//       const hasMatchingEnv = service.environments?.some(env =>
//         filters.environments.includes(env.environmentName)
//       );
//       if (!hasMatchingEnv) return false;
//     }

//     // Datacenter filter
//     if (filters.datacenter.length > 0) {
//       const hasMatchingDatacenter = service.environments?.some(env =>
//         env.Zones?.some(zone =>
//           zone.metadata?.datacenter && filters.datacenter.includes(zone.metadata.datacenter as string)
//         )
//       );
//       if (!hasMatchingDatacenter) return false;
//     }

//     // Search query
//     if (filters.searchQuery) {
//       const searchLower = filters.searchQuery.toLowerCase();
//       const serviceText = JSON.stringify(service).toLowerCase();
//       if (!serviceText.includes(searchLower)) return false;
//     }

//     return true;
//   }) || [];

//   const allFields = getAllFields();

//   return (
//     <div className={`border-2 ${isDark ? 'border-slate-600' : 'border-teal-200'} rounded-xl overflow-hidden`}>
//       {/* Project Header */}
//       <div className={`${isDark ? 'bg-slate-700/30' : 'bg-teal-50'} p-5`}>
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="flex items-center gap-3 hover:opacity-80 transition-all w-full"
//         >
//           {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//           <FolderOpen size={24} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
//           <div className="text-left flex-1">
//             <h3 className={`text-lg font-bold ${theme.text}`}>{project.project}</h3>
//             <p className={`text-sm ${theme.textSecondary}`}>
//               {filteredServices.length} of {project.services?.length || 0} {project.services?.length === 1 ? 'service' : 'services'}
//             </p>
//           </div>
//         </button>
//       </div>

//       {isExpanded && (
//         <div className="p-5">
//           {/* All Fields (Existing + Custom) */}
//           <div className="space-y-2 mb-6">
//             {Object.entries(allFields).map(([key, value]) => {
//               if (!isEditing && !value) return null;

//               return (
//                 <div
//                   key={key}
//                   className={`flex items-center justify-between p-3 ${
//                     isDark ? 'bg-slate-700/50' : 'bg-white'
//                   } rounded-lg group`}
//                 >
//                   {editingField === key ? (
//                     <>
//                       <div className="flex-1 flex items-center gap-2">
//                         <span className={`text-sm font-semibold ${theme.text} min-w-[100px]`}>
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

//           {/* Services List */}
//           {filteredServices.length > 0 ? (
//             <div className="space-y-4">
//               <h6 className={`text-sm font-bold ${theme.text}`}>Services</h6>
//               {filteredServices.map((service, filteredIndex) => {
//                 // Find original index
//                 const originalIndex = project.services.findIndex(s => s.serviceName === service.serviceName);
                
//                 return (
//                   <ServiceSection
//                     key={originalIndex}
//                     service={service}
//                     serviceIndex={originalIndex}
//                     projectIndex={projectIndex}
//                     application={application}
//                     onUpdate={onUpdate}
//                     isEditing={isEditing}
//                     theme={theme}
//                     isDark={isDark}
//                     filters={filters}
//                   />
//                 );
//               })}
//             </div>
//           ) : (
//             <p className={`text-center py-6 text-sm ${theme.textSecondary}`}>
//               No services match the current filters
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }









// // src/components/env-matrix/hydra-application-level/projectsection.tsx
// 'use client';

// import { Application, Project } from '@/types';
// import ServiceSection from './servicesection';
// import { ChevronDown, ChevronRight, FolderOpen } from 'lucide-react';

// interface ProjectSectionProps {
//   project: Project;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   searchQuery: string;
//   isExpanded: boolean;
//   onToggle: () => void;
// }

// export default function ProjectSection({
//   project,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   searchQuery,
//   isExpanded,
//   onToggle,
// }: ProjectSectionProps) {

//   const updateProject = (updatedProject: Project) => {
//     const updatedProjects = [...application.Projects];
//     updatedProjects[projectIndex] = updatedProject;
//     onUpdate({ ...application, Projects: updatedProjects });
//   };

//   // Filter services
//   const filteredServices = project.services?.filter(service => {
//     if (!searchQuery) return true;
//     const searchLower = searchQuery.toLowerCase();
//     const serviceText = JSON.stringify(service).toLowerCase();
//     return serviceText.includes(searchLower);
//   }) || [];

//   return (
//     <div className={`${theme.card} border rounded-lg overflow-hidden`}>
//       {/* Project Header */}
//       <button
//         onClick={onToggle}
//         className={`w-full flex items-center justify-between p-4 hover:opacity-80 transition-all ${
//           isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
//         }`}
//       >
//         <div className="flex items-center gap-3">
//           {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//           <FolderOpen size={20} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
//           <div className="text-left">
//             <h3 className={`text-base font-bold ${theme.text}`}>{project.project}</h3>
//             <p className={`text-xs ${theme.textSecondary}`}>
//               {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//         </div>
//         <span className={`px-2 py-1 rounded text-xs font-bold ${
//           isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-700'
//         }`}>
//           {project.services?.length || 0}
//         </span>
//       </button>

//       {/* Project Content */}
//       {isExpanded && (
//         <div className="p-4 pt-0 space-y-3">
//           {filteredServices.length > 0 ? (
//             filteredServices.map((service, index) => {
//               const originalIndex = project.services.findIndex(s => s.serviceName === service.serviceName);
//               return (
//                 <ServiceSection
//                   key={originalIndex}
//                   service={service}
//                   serviceIndex={originalIndex}
//                   projectIndex={projectIndex}
//                   application={application}
//                   onUpdate={onUpdate}
//                   isEditing={isEditing}
//                   theme={theme}
//                   isDark={isDark}
//                   searchQuery={searchQuery}
//                 />
//               );
//             })
//           ) : (
//             <p className={`text-center py-6 text-sm ${theme.textSecondary}`}>
//               No services match the search
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



// src/components/env-matrix/hydra-application-level/projectsection.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Project } from '@/types';
// import ServiceSection from './servicesection';
// import { ChevronDown, ChevronRight, FolderOpen, Edit2, Save, X } from 'lucide-react';

// interface ProjectSectionProps {
//   project: Project;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   searchQuery: string;
//   isExpanded: boolean;
//   onToggle: () => void;
//   onProjectOpen: (index: number) => void;
// }

// export default function ProjectSection({
//   project,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
//   searchQuery,
//   isExpanded,
//   onToggle,
//   onProjectOpen,
// }: ProjectSectionProps) {
//   const [isEditingProject, setIsEditingProject] = useState(false);
//   const [editedProject, setEditedProject] = useState(project);
//   const [expandedServiceIndex, setExpandedServiceIndex] = useState<number | null>(null);

//   const updateProject = (updatedProject: Project) => {
//     const updatedProjects = [...application.Projects];
//     updatedProjects[projectIndex] = updatedProject;
//     onUpdate({ ...application, Projects: updatedProjects });
//   };

//   const handleSave = () => {
//     updateProject(editedProject);
//     setIsEditingProject(false);
//   };

//   const handleCancel = () => {
//     setEditedProject(project);
//     setIsEditingProject(false);
//   };

//   const handleToggle = () => {
//     onProjectOpen(projectIndex);
//     onToggle();
//   };

//   const handleServiceOpen = (serviceIndex: number) => {
//     setExpandedServiceIndex(expandedServiceIndex === serviceIndex ? null : serviceIndex);
//   };

//   const filteredServices = project.services?.filter(service => {
//     if (!searchQuery) return true;
//     const searchLower = searchQuery.toLowerCase();
//     const serviceText = JSON.stringify(service).toLowerCase();
//     return serviceText.includes(searchLower);
//   }) || [];

//   const hasMatchingService = searchQuery && filteredServices.length > 0;
//   const shouldAutoExpand = hasMatchingService && !isExpanded;

//   return (
//     <div className={`${theme.card} border rounded-lg overflow-hidden`}>
//       {/* Project Header - FIXED: No nested buttons */}
//       <div className={`w-full flex items-center justify-between p-4 ${
//         isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
//       }`}>
//         {/* Left Side - Clickable Toggle Area */}
//         <button
//           onClick={handleToggle}
//           className="flex items-center gap-3 hover:opacity-80 transition-all flex-1"
//         >
//           {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//           <FolderOpen size={22} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
//           <div className="text-left">
//             {isEditingProject ? (
//               <input
//                 type="text"
//                 value={editedProject.project}
//                 onChange={(e) => setEditedProject({ ...editedProject, project: e.target.value })}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`text-lg font-bold px-2 py-1 ${theme.input} rounded border`}
//               />
//             ) : (
//               <h3 className={`text-lg font-bold ${theme.text}`}>{project.project}</h3>
//             )}
//             <p className={`text-sm ${theme.textSecondary} mt-1`}>
//               {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//         </button>

//         {/* Right Side - Action Buttons */}
//         <div className="flex items-center gap-2">
//           {isEditing && !isEditingProject && (
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsEditingProject(true);
//               }}
//               className={`p-2 rounded hover:bg-opacity-80 cursor-pointer ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
//             >
//               <Edit2 size={16} className={theme.textSecondary} />
//             </div>
//           )}
//           {isEditingProject && (
//             <>
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleSave();
//                 }}
//                 className="p-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
//               >
//                 <Save size={16} />
//               </div>
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleCancel();
//                 }}
//                 className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
//               >
//                 <X size={16} />
//               </div>
//             </>
//           )}
//           <span className={`px-3 py-1 rounded text-sm font-bold ${
//             isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-700'
//           }`}>
//             {project.services?.length || 0}
//           </span>
//         </div>
//       </div>

//       {/* Project Content */}
//       {(isExpanded || shouldAutoExpand) && (
//         <div className="p-4 pt-0 space-y-3">
//           {filteredServices.length > 0 ? (
//             filteredServices.map((service, index) => {
//               const originalIndex = project.services.findIndex(s => s.serviceName === service.serviceName);
//               return (
//                 <ServiceSection
//                   key={originalIndex}
//                   service={service}
//                   serviceIndex={originalIndex}
//                   projectIndex={projectIndex}
//                   application={application}
//                   onUpdate={onUpdate}
//                   isEditing={isEditing}
//                   theme={theme}
//                   isDark={isDark}
//                   searchQuery={searchQuery}
//                   isExpanded={expandedServiceIndex === originalIndex}
//                   onServiceOpen={handleServiceOpen}
//                 />
//               );
//             })
//           ) : (
//             <p className={`text-center py-6 text-sm ${theme.textSecondary}`}>
//               No services match the search
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }






// src/components/env-matrix/hydra-application-level/projectsection.tsx
'use client';

import { useState } from 'react';
import { Application, Project } from '@/types';
import ServiceSection from './servicesection';
import { ChevronDown, ChevronRight, FolderOpen, Edit2, Save, X } from 'lucide-react';

interface ProjectSectionProps {
  project: Project;
  projectIndex: number;
  application: Application;
  onUpdate: (app: Application) => void;
  isEditing: boolean;
  theme: any;
  isDark: boolean;
  searchQuery: string;
  selectedService: string;
  isExpanded: boolean;
  onToggle: () => void;
  onProjectOpen: (index: number) => void;
}

export default function ProjectSection({
  project,
  projectIndex,
  application,
  onUpdate,
  isEditing,
  theme,
  isDark,
  searchQuery,
  selectedService,
  isExpanded,
  onToggle,
  onProjectOpen,
}: ProjectSectionProps) {
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [expandedServiceIndex, setExpandedServiceIndex] = useState<number | null>(null);

  const updateProject = (updatedProject: Project) => {
    const updatedProjects = [...application.Projects];
    updatedProjects[projectIndex] = updatedProject;
    onUpdate({ ...application, Projects: updatedProjects });
  };

  const handleSave = () => {
    updateProject(editedProject);
    setIsEditingProject(false);
  };

  const handleCancel = () => {
    setEditedProject(project);
    setIsEditingProject(false);
  };

  const handleToggle = () => {
    onProjectOpen(projectIndex);
    onToggle();
  };

  const handleServiceOpen = (serviceIndex: number) => {
    setExpandedServiceIndex(expandedServiceIndex === serviceIndex ? null : serviceIndex);
  };

  // Filter services
  const filteredServices = project.services?.filter(service => {
    // If service filter is active, show only that service
    if (selectedService && service.serviceName !== selectedService) {
      return false;
    }
    
    // Search filter (separate from filter)
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const serviceText = JSON.stringify(service).toLowerCase();
      return serviceText.includes(searchLower);
    }
    
    return true;
  }) || [];

  // Auto-expand if service is filtered or search matches
  const hasMatchingService = (selectedService || searchQuery) && filteredServices.length > 0;
  const shouldAutoExpand = hasMatchingService && !isExpanded;

  return (
    <div className={`${theme.card} border rounded-lg overflow-hidden`}>
      {/* Project Header - No nested buttons */}
      <div className={`w-full flex items-center justify-between p-4 ${
        isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
      }`}>
        {/* Left Side - Clickable Toggle Area */}
        <button
          onClick={handleToggle}
          className="flex items-center gap-3 hover:opacity-80 transition-all flex-1"
        >
          {isExpanded || shouldAutoExpand ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          <FolderOpen size={22} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
          <div className="text-left">
            {isEditingProject ? (
              <input
                type="text"
                value={editedProject.project}
                onChange={(e) => setEditedProject({ ...editedProject, project: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                className={`text-lg font-bold px-2 py-1 ${theme.input} rounded border`}
              />
            ) : (
              <h3 className={`text-lg font-bold ${theme.text}`}>{project.project}</h3>
            )}
            <p className={`text-sm ${theme.textSecondary} mt-1`}>
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
              {selectedService && filteredServices.length !== project.services?.length && 
                ` (filtered from ${project.services?.length || 0})`
              }
            </p>
          </div>
        </button>

        {/* Right Side - Action Buttons */}
        <div className="flex items-center gap-2">
          {isEditing && !isEditingProject && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingProject(true);
              }}
              className={`p-2 rounded hover:bg-opacity-80 cursor-pointer ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
            >
              <Edit2 size={16} className={theme.textSecondary} />
            </div>
          )}
          {isEditingProject && (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="p-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
              >
                <Save size={16} />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
              >
                <X size={16} />
              </div>
            </>
          )}
          <span className={`px-3 py-1 rounded text-sm font-bold ${
            isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-700'
          }`}>
            {project.services?.length || 0}
          </span>
        </div>
      </div>

      {/* Project Content */}
      {(isExpanded || shouldAutoExpand) && (
        <div className="p-4 pt-0 space-y-3">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => {
              const originalIndex = project.services.findIndex(s => s.serviceName === service.serviceName);
              return (
                <ServiceSection
                  key={originalIndex}
                  service={service}
                  serviceIndex={originalIndex}
                  projectIndex={projectIndex}
                  application={application}
                  onUpdate={onUpdate}
                  isEditing={isEditing}
                  theme={theme}
                  isDark={isDark}
                  searchQuery={searchQuery}
                  isExpanded={expandedServiceIndex === originalIndex}
                  onServiceOpen={handleServiceOpen}
                />
              );
            })
          ) : (
            <p className={`text-center py-6 text-sm ${theme.textSecondary}`}>
              {selectedService || searchQuery
                ? 'No services match the current filter or search'
                : 'No services found'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}