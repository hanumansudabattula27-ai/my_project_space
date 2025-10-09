// // src/components/env-matrix/servicesection.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Service } from '@/types';
// import EnvironmentSection from './environmentsection';
// import { ChevronDown, ChevronRight, Activity, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

// interface ServiceSectionProps {
//   service: Service;
//   serviceIndex: number;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
// }

// export default function ServiceSection({
//   service,
//   serviceIndex,
//   projectIndex,
//   application,
//   onUpdate,
//   isEditing,
//   theme,
//   isDark,
// }: ServiceSectionProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [editingField, setEditingField] = useState<string | null>(null);
//   const [editValue, setEditValue] = useState('');
//   const [isAddingField, setIsAddingField] = useState(false);
//   const [newFieldKey, setNewFieldKey] = useState('');
//   const [newFieldValue, setNewFieldValue] = useState('');

//   const getAllFields = (): Record<string, any> => {
//     return {
//       serviceName: service.serviceName,
//       applicationDomain: service.applicationDomain,
//       hostingPlatform: service.hostingPlatform,
//       ...(service.metadata || {}),
//     };
//   };

//   const updateService = (updatedService: Service) => {
//     const updatedProjects = [...application.Projects];
//     const updatedServices = [...updatedProjects[projectIndex].services];
//     updatedServices[serviceIndex] = updatedService;
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
//     const coreFields = ['serviceName', 'applicationDomain', 'hostingPlatform'];
    
//     let updatedService = { ...service };
    
//     if (coreFields.includes(fieldKey)) {
//       (updatedService as any)[fieldKey] = editValue;
//     } else {
//       updatedService.metadata = {
//         ...updatedService.metadata,
//         [fieldKey]: editValue,
//       };
//     }
    
//     updateService(updatedService);
//     setEditingField(null);
//   };

//   const handleDeleteField = (fieldKey: string) => {
//     const coreFields = ['serviceName', 'applicationDomain', 'hostingPlatform'];
    
//     if (coreFields.includes(fieldKey)) {
//       if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
//         const updatedService = { ...service };
//         (updatedService as any)[fieldKey] = '';
//         updateService(updatedService);
//       }
//     } else {
//       const updatedMetadata = { ...service.metadata };
//       delete updatedMetadata[fieldKey];
//       updateService({ ...service, metadata: updatedMetadata });
//     }
//   };

//   const handleAddField = () => {
//     if (newFieldKey.trim() && newFieldValue.trim()) {
//       const updatedService = {
//         ...service,
//         metadata: {
//           ...service.metadata,
//           [newFieldKey.trim()]: newFieldValue.trim(),
//         },
//       };
//       updateService(updatedService);
//       setNewFieldKey('');
//       setNewFieldValue('');
//       setIsAddingField(false);
//     }
//   };

//   const allFields = getAllFields();

//   return (
//     <div className={`border ${isDark ? 'border-slate-600' : 'border-gray-300'} rounded-xl overflow-hidden`}>
//       {/* Service Header */}
//       <div className={`${isDark ? 'bg-slate-700/50' : 'bg-gray-100'} p-4`}>
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="flex items-center gap-3 hover:opacity-80 transition-all w-full"
//         >
//           {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//           <Activity size={20} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
//           <div className="text-left flex-1">
//             <h4 className={`text-md font-bold ${theme.text}`}>{service.serviceName}</h4>
//             <p className={`text-xs ${theme.textSecondary} mt-1`}>
//               {service.environments?.length || 0} environments
//             </p>
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
//                         <span className={`text-sm font-semibold ${theme.text} min-w-[140px]`}>
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

//           {/* Environments List */}
//           {service.environments && service.environments.length > 0 && (
//             <div className="space-y-3">
//               <h6 className={`text-sm font-bold ${theme.text}`}>Environments</h6>
//               {service.environments.map((environment, envIndex) => (
//                 <EnvironmentSection
//                   key={envIndex}
//                   environment={environment}
//                   envIndex={envIndex}
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









// src/components/env-matrix/ServiceSection.tsx
'use client';

import { useState } from 'react';
import { Application, Service } from '@/types';
import { FilterState } from './smartfilterbar';
import EnvironmentSection from './environmentsection';
import { ChevronDown, ChevronRight, Activity, Edit2, Trash2, Plus, Save, X, Globe, Server } from 'lucide-react';

interface ServiceSectionProps {
  service: Service;
  serviceIndex: number;
  projectIndex: number;
  application: Application;
  onUpdate: (app: Application) => void;
  isEditing: boolean;
  theme: any;
  isDark: boolean;
  filters: FilterState;
}

export default function ServiceSection({
  service,
  serviceIndex,
  projectIndex,
  application,
  onUpdate,
  isEditing,
  theme,
  isDark,
  filters,
}: ServiceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');

  const getAllFields = (): Record<string, any> => {
    return {
      serviceName: service.serviceName,
      applicationDomain: service.applicationDomain,
      hostingPlatform: service.hostingPlatform,
      ...(service.metadata || {}),
    };
  };

  const updateService = (updatedService: Service) => {
    const updatedProjects = [...application.Projects];
    const updatedServices = [...updatedProjects[projectIndex].services];
    updatedServices[serviceIndex] = updatedService;
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
    const coreFields = ['serviceName', 'applicationDomain', 'hostingPlatform'];
    
    let updatedService = { ...service };
    
    if (coreFields.includes(fieldKey)) {
      (updatedService as any)[fieldKey] = editValue;
    } else {
      updatedService.metadata = {
        ...updatedService.metadata,
        [fieldKey]: editValue,
      };
    }
    
    updateService(updatedService);
    setEditingField(null);
  };

  const handleDeleteField = (fieldKey: string) => {
    const coreFields = ['serviceName', 'applicationDomain', 'hostingPlatform'];
    
    if (coreFields.includes(fieldKey)) {
      if (confirm(`Are you sure you want to delete the core field "${fieldKey}"?`)) {
        const updatedService = { ...service };
        (updatedService as any)[fieldKey] = '';
        updateService(updatedService);
      }
    } else {
      const updatedMetadata = { ...service.metadata };
      delete updatedMetadata[fieldKey];
      updateService({ ...service, metadata: updatedMetadata });
    }
  };

  const handleAddField = () => {
    if (newFieldKey.trim() && newFieldValue.trim()) {
      const updatedService = {
        ...service,
        metadata: {
          ...service.metadata,
          [newFieldKey.trim()]: newFieldValue.trim(),
        },
      };
      updateService(updatedService);
      setNewFieldKey('');
      setNewFieldValue('');
      setIsAddingField(false);
    }
  };

  // Filter environments
  const filteredEnvironments = service.environments?.filter(env => {
    // Environment filter
    if (filters.environments.length > 0) {
      if (!filters.environments.includes(env.environmentName)) return false;
    }

    // Datacenter filter
    if (filters.datacenter.length > 0) {
      const hasMatchingDatacenter = env.Zones?.some(zone =>
        zone.metadata?.datacenter && filters.datacenter.includes(zone.metadata.datacenter as string)
      );
      if (!hasMatchingDatacenter) return false;
    }

    // Search query
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      const envText = JSON.stringify(env).toLowerCase();
      if (!envText.includes(searchLower)) return false;
    }

    return true;
  }) || [];

  const allFields = getAllFields();

  // Check if service should be highlighted based on search
  const isHighlighted = filters.searchQuery && 
    service.serviceName.toLowerCase().includes(filters.searchQuery.toLowerCase());

  return (
    <div className={`border ${
      isHighlighted 
        ? isDark ? 'border-yellow-500 shadow-lg shadow-yellow-500/20' : 'border-yellow-400 shadow-lg shadow-yellow-400/20'
        : isDark ? 'border-slate-600' : 'border-gray-300'
    } rounded-xl overflow-hidden transition-all`}>
      {/* Service Header */}
      <div className={`${isDark ? 'bg-slate-700/50' : 'bg-gray-100'} p-4`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 hover:opacity-80 transition-all w-full"
        >
          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          <Activity size={20} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
          <div className="text-left flex-1">
            <h4 className={`text-md font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
              {service.serviceName}
            </h4>
            <div className="flex items-center gap-4 mt-1">
              <span className={`text-xs ${theme.textSecondary} flex items-center gap-1`}>
                <Globe size={12} />
                {service.applicationDomain}
              </span>
              <span className={`text-xs ${theme.textSecondary} flex items-center gap-1`}>
                <Server size={12} />
                {service.hostingPlatform}
              </span>
              <span className={`text-xs ${theme.textSecondary}`}>
                {filteredEnvironments.length} of {service.environments?.length || 0} environments
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
                        <span className={`text-sm font-semibold ${theme.text} min-w-[140px]`}>
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

          {/* Environments List */}
          {filteredEnvironments.length > 0 ? (
            <div className="space-y-3">
              <h6 className={`text-sm font-bold ${theme.text}`}>Environments</h6>
              {filteredEnvironments.map((environment, filteredIndex) => {
                // Find original index
                const originalIndex = service.environments.findIndex(e => e.environmentName === environment.environmentName);
                
                return (
                  <EnvironmentSection
                    key={originalIndex}
                    environment={environment}
                    envIndex={originalIndex}
                    serviceIndex={serviceIndex}
                    projectIndex={projectIndex}
                    application={application}
                    onUpdate={onUpdate}
                    isEditing={isEditing}
                    theme={theme}
                    isDark={isDark}
                    filters={filters}
                  />
                );
              })}
            </div>
          ) : (
            <p className={`text-center py-6 text-sm ${theme.textSecondary}`}>
              No environments match the current filters
            </p>
          )}
        </div>
      )}
    </div>
  );
}