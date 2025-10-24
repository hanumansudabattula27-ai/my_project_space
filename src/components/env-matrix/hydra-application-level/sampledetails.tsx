
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

//         {/* Quick Info - INCREASED FONT SIZE & PADDING */}
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
//             {/* f5Device */}
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

//             {/* Firewall */}
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

//             {/* Count */}
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

//             {/* CPU */}
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

//             {/* Memory */}
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

//             {/* Metadata */}
//             {zone.metadata && Object.keys(zone.metadata).length > 0 && (
//               <div className={`pt-3 border-t ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
//                 <p className={`font-semibold ${theme.text} mb-2 text-base`}>Additional Fields:</p>
//                 <div className="space-y-2">
//                   {Object.entries(zone.metadata).map(([key, value]) => (
//                     <div key={key} className="flex gap-2">
//                       <span className={`font-semibold ${theme.text} min-w-[120px]`}>{key}:</span>
//                       <span className={theme.textSecondary}>{String(value)}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Collapsed Quick Stats - INCREASED FONT SIZE & PADDING */}
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
//     </div>
//   );
// }




// .....................



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
// ........................


// // src/components/env-matrix/hydra-application-level/servicesection.tsx
// 'use client';

// import { useState } from 'react';
// import { Application, Service } from '@/types';
// import EnvironmentSection from './environmentsection';
// import { ChevronDown, ChevronRight, Activity, Edit2, Save, X } from 'lucide-react';

// interface ServiceSectionProps {
//   service: Service;
//   serviceIndex: number;
//   projectIndex: number;
//   application: Application;
//   onUpdate: (app: Application) => void;
//   isEditing: boolean;
//   theme: any;
//   isDark: boolean;
//   searchQuery: string;
//   isExpanded: boolean;
//   onServiceOpen: (index: number) => void;
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
//   searchQuery,
//   isExpanded,
//   onServiceOpen,
// }: ServiceSectionProps) {
//   const [isEditingService, setIsEditingService] = useState(false);
//   const [editedService, setEditedService] = useState(service);
//   const [expandedEnvIndex, setExpandedEnvIndex] = useState<number | null>(null);

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

//   const handleSave = () => {
//     updateService(editedService);
//     setIsEditingService(false);
//   };

//   const handleCancel = () => {
//     setEditedService(service);
//     setIsEditingService(false);
//   };

//   const handleToggle = () => {
//     onServiceOpen(serviceIndex);
//   };

//   const handleEnvOpen = (envIndex: number) => {
//     setExpandedEnvIndex(expandedEnvIndex === envIndex ? null : envIndex);
//   };

//   // Filter environments
//   const filteredEnvironments = service.environments?.filter(env => {
//     if (!searchQuery) return true;
//     const searchLower = searchQuery.toLowerCase();
//     const envText = JSON.stringify(env).toLowerCase();
//     return envText.includes(searchLower);
//   }) || [];

//   const hasMatchingEnv = searchQuery && filteredEnvironments.length > 0;
//   const shouldAutoExpand = hasMatchingEnv && !isExpanded;

//   const isHighlighted = searchQuery && 
//     service.serviceName.toLowerCase().includes(searchQuery.toLowerCase());

//   return (
//     <div className={`border rounded-lg overflow-hidden ${
//       isHighlighted 
//         ? isDark ? 'border-yellow-500' : 'border-yellow-400'
//         : isDark ? 'border-slate-600' : 'border-gray-300'
//     }`}>
//       {/* Service Header - FIXED: No nested buttons */}
//       <div className={`w-full flex items-center justify-between p-4 ${
//         isDark ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-gray-50 hover:bg-gray-100'
//       }`}>
//         {/* Left Side - Clickable Toggle Area */}
//         <button
//           onClick={handleToggle}
//           className="flex items-center gap-3 hover:opacity-80 transition-all flex-1"
//         >
//           {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//           <Activity size={20} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
//           <div className="text-left">
//             {isEditingService ? (
//               <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
//                 <input
//                   type="text"
//                   value={editedService.serviceName}
//                   onChange={(e) => setEditedService({ ...editedService, serviceName: e.target.value })}
//                   className={`text-base font-bold px-2 py-1 ${theme.input} rounded border`}
//                   placeholder="Service Name"
//                 />
//                 <input
//                   type="text"
//                   value={editedService.applicationDomain}
//                   onChange={(e) => setEditedService({ ...editedService, applicationDomain: e.target.value })}
//                   className={`text-sm px-2 py-1 ${theme.input} rounded border`}
//                   placeholder="Domain"
//                 />
//               </div>
//             ) : (
//               <>
//                 <h4 className={`text-base font-bold ${theme.text} ${isHighlighted ? 'text-yellow-500' : ''}`}>
//                   {service.serviceName}
//                 </h4>
//                 <p className={`text-sm ${theme.textSecondary} mt-1`}>
//                   {service.applicationDomain} • {filteredEnvironments.length} env{filteredEnvironments.length !== 1 ? 's' : ''}
//                 </p>
//               </>
//             )}
//           </div>
//         </button>

//         {/* Right Side - Action Buttons */}
//         <div className="flex items-center gap-2">
//           {isEditing && !isEditingService && (
//             <div
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsEditingService(true);
//               }}
//               className={`p-2 rounded hover:bg-opacity-80 cursor-pointer ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
//             >
//               <Edit2 size={14} className={theme.textSecondary} />
//             </div>
//           )}
//           {isEditingService && (
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
//           <span className={`px-3 py-1 rounded text-sm font-bold ${
//             isDark ? 'bg-cyan-900/30 text-cyan-300' : 'bg-cyan-100 text-cyan-700'
//           }`}>
//             {service.environments?.length || 0}
//           </span>
//         </div>
//       </div>

//       {/* Service Content */}
//       {(isExpanded || shouldAutoExpand) && (
//         <div className="p-4 pt-0 space-y-3">
//           {filteredEnvironments.length > 0 ? (
//             filteredEnvironments.map((environment, index) => {
//               const originalIndex = service.environments.findIndex(e => e.environmentName === environment.environmentName);
//               return (
//                 <EnvironmentSection
//                   key={originalIndex}
//                   environment={environment}
//                   envIndex={originalIndex}
//                   serviceIndex={serviceIndex}
//                   projectIndex={projectIndex}
//                   application={application}
//                   onUpdate={onUpdate}
//                   isEditing={isEditing}
//                   theme={theme}
//                   isDark={isDark}
//                   searchQuery={searchQuery}
//                   isExpanded={expandedEnvIndex === originalIndex}
//                   onEnvOpen={handleEnvOpen}
//                 />
//               );
//             })
//           ) : (
//             <p className={`text-center py-4 text-sm ${theme.textSecondary}`}>
//               No environments match the search
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


// ......................................



// // src/components/env-matrix/hydra-application-level/projectsection.tsx
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
//   selectedService: string;
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
//   selectedService,
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

//   // Filter services
//   const filteredServices = project.services?.filter(service => {
//     // If service filter is active, show only that service
//     if (selectedService && service.serviceName !== selectedService) {
//       return false;
//     }
    
//     // Search filter (separate from filter)
//     if (searchQuery) {
//       const searchLower = searchQuery.toLowerCase();
//       const serviceText = JSON.stringify(service).toLowerCase();
//       return serviceText.includes(searchLower);
//     }
    
//     return true;
//   }) || [];

//   // Auto-expand if service is filtered or search matches
//   const hasMatchingService = (selectedService || searchQuery) && filteredServices.length > 0;
//   const shouldAutoExpand = hasMatchingService && !isExpanded;

//   return (
//     <div className={`${theme.card} border rounded-lg overflow-hidden`}>
//       {/* Project Header - No nested buttons */}
//       <div className={`w-full flex items-center justify-between p-4 ${
//         isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
//       }`}>
//         {/* Left Side - Clickable Toggle Area */}
//         <button
//           onClick={handleToggle}
//           className="flex items-center gap-3 hover:opacity-80 transition-all flex-1"
//         >
//           {isExpanded || shouldAutoExpand ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
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
//               {selectedService && filteredServices.length !== project.services?.length && 
//                 ` (filtered from ${project.services?.length || 0})`
//               }
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
//               {selectedService || searchQuery
//                 ? 'No services match the current filter or search'
//                 : 'No services found'}
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }




// ....................

// // src/components/env-matrix/hydra-application-level/applicationdetailsview.tsx
// 'use client';

// import { useState } from 'react';
// import { Application } from '@/types';
// import ProjectSection from './projectsection';
// import SimpleFilter from '@/components/env-matrix/hydra-application-level/simplefilter';

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
//   const [selectedProject, setSelectedProject] = useState('');
//   const [selectedService, setSelectedService] = useState('');

//   const handleProjectOpen = (index: number) => {
//     setExpandedProjectIndex(expandedProjectIndex === index ? null : index);
//   };

//   // Filter projects based on ONLY search (separate from filter)
//   let filteredProjects = application.Projects || [];

//   // Apply FILTER (Project/Service dropdowns)
//   if (selectedProject) {
//     filteredProjects = filteredProjects.filter(p => p.project === selectedProject);
//   }

//   if (selectedService) {
//     filteredProjects = filteredProjects.filter(project =>
//       project.services?.some(service => service.serviceName === selectedService)
//     );
//   }

//   // Apply SEARCH (separate - searches everything)
//   if (searchQuery) {
//     filteredProjects = filteredProjects.filter((project) => {
//       const searchLower = searchQuery.toLowerCase();
//       const projectText = JSON.stringify(project).toLowerCase();
//       return projectText.includes(searchLower);
//     });
//   }

//   const hasActiveFilters = selectedProject !== '' || selectedService !== '';

//   return (
//     <div>
//       {/* Simple Filter Bar (Projects & Services Only) */}
//       <SimpleFilter
//         application={application}
//         selectedProject={selectedProject}
//         selectedService={selectedService}
//         onProjectChange={setSelectedProject}
//         onServiceChange={setSelectedService}
//         theme={theme}
//         isDark={isDark}
//       />

//       {/* Filter Status Message */}
//       {hasActiveFilters && (
//         <div className={`mb-4 ${isDark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-lg p-3`}>
//           <p className={`text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
//             🔍 Filtered: Showing {filteredProjects.length} of {application.Projects?.length || 0} projects
//             {selectedProject && ` | Project: ${selectedProject}`}
//             {selectedService && ` | Service: ${selectedService}`}
//           </p>
//         </div>
//       )}

//       {/* Projects List */}
//       <div className="space-y-4">
//         {filteredProjects.length > 0 ? (
//           filteredProjects.map((project, index) => {
//             const originalIndex = application.Projects.findIndex(p => p.project === project.project);
//             return (
//               <ProjectSection
//                 key={originalIndex}
//                 project={project}
//                 projectIndex={originalIndex}
//                 application={application}
//                 onUpdate={onUpdate}
//                 isEditing={isEditing}
//                 theme={theme}
//                 isDark={isDark}
//                 searchQuery={searchQuery}
//                 selectedService={selectedService}
//                 isExpanded={expandedProjectIndex === originalIndex}
//                 onToggle={() => {}}
//                 onProjectOpen={handleProjectOpen}
//               />
//             );
//           })
//         ) : (
//           <div className={`${theme.card} border rounded-lg p-12 text-center`}>
//             <p className={theme.textSecondary}>
//               {searchQuery || hasActiveFilters
//                 ? 'No results found'
//                 : 'No projects found'}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// ............................

// // src/app/tools/env-matrix/[platform]/[aimId]/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { Application } from '@/types';
// import ApplicationDetailsView from '@/components/env-matrix/hydra-application-level/applicationdetailsview';
// import { ArrowLeft, Edit, Trash2, Save, X, Search, RefreshCw } from 'lucide-react';

// export default function ApplicationDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [application, setApplication] = useState<Application | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const platform = params.platform as string;
//   const aimId = params.aimId as string;

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const isDark = mounted ? (resolvedTheme === 'dark' || currentTheme === 'dark') : false;

//   const theme = isDark ? {
//     background: "from-gray-900 via-gray-800 to-indigo-900",
//     card: "bg-slate-800 border-slate-600",
//     text: "text-white",
//     textSecondary: "text-gray-300",
//     input: "bg-slate-900 border-slate-600 text-white placeholder-gray-400",
//     accent: "bg-teal-600 hover:bg-teal-700",
//   } : {
//     background: "from-cyan-50 via-teal-50 to-amber-50",
//     card: "bg-white border-teal-200 shadow-sm",
//     text: "text-gray-900",
//     textSecondary: "text-gray-600",
//     input: "bg-gray-50 border-teal-300 text-gray-900 placeholder-gray-500",
//     accent: "bg-teal-600 hover:bg-teal-700",
//   };

//   const fetchApplication = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/env-matrix/applications?platform=${platform}`);
//       const result = await response.json();
      
//       if (result.success) {
//         const app = result.data.find((a: Application) => a.aimId === aimId);
//         if (app) {
//           setApplication(app);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch application:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (mounted) {
//       fetchApplication();
//     }
//   }, [platform, aimId, mounted]);

//   const handleSave = async () => {
//     try {
//       await fetch('/api/env-matrix/applications', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(application),
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error saving application:', error);
//     }
//   };

//   const handleDelete = async () => {
//     if (confirm('Are you sure you want to delete this application?')) {
//       try {
//         await fetch(`/api/env-matrix/applications?aimId=${aimId}&platform=${platform}`, {
//           method: 'DELETE',
//         });
//         router.push(`/tools/env-matrix/${platform}`);
//       } catch (error) {
//         console.error('Error deleting application:', error);
//       }
//     }
//   };

//   const handleApplicationUpdate = (updatedApp: Application) => {
//     setApplication(updatedApp);
//   };

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className={theme.textSecondary}>Loading application...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!application) {
//     return (
//       <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
//         <div className="text-center">
//           <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Application Not Found</h2>
//           <button
//             onClick={() => router.push(`/tools/env-matrix/${platform}`)}
//             className={`px-6 py-3 ${theme.accent} text-white rounded-xl font-semibold`}
//           >
//             Back to Applications
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const totalProjects = application.Projects?.length || 0;
//   const totalServices = application.Projects?.reduce((total, proj) => 
//     total + (proj.services?.length || 0), 0) || 0;
//   const totalEnvironments = application.Projects?.reduce((total, proj) =>
//     total + (proj.services?.reduce((sTotal, service) => 
//       sTotal + (service.environments?.length || 0), 0) || 0), 0) || 0;

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} pt-25`}>
//       <div className="max-w-7xl mx-auto px-6 py-6">
        
//         {/* COMPACT HEADER */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.push(`/tools/env-matrix/${platform}`)}
//               className={`text-sm ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} flex items-center gap-2 font-medium transition-colors`}
//             >
//               <ArrowLeft size={16} />
//               Back
//             </button>
            
//             <div className="h-6 w-px bg-gray-300 dark:bg-slate-600"></div>
            
//             <div className="flex items-center gap-3">
//               <div className={`w-10 h-10 ${
//                 platform === 'hydra'
//                   ? isDark ? 'bg-gradient-to-br from-teal-600 to-cyan-700' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
//                   : isDark ? 'bg-gradient-to-br from-orange-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-red-600'
//               } rounded-lg flex items-center justify-center text-xl`}>
//                 {application.applicationName[0].toUpperCase()}
//               </div>
//               <div>
//                 <h1 className={`text-2xl font-bold ${theme.text}`}>
//                   {application.applicationName}
//                 </h1>
//                 <p className={`text-xs ${theme.textSecondary}`}>
//                   ID: {application.aimId} • {totalProjects} projects • {totalServices} services
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={fetchApplication}
//               className={`px-4 py-2 ${theme.card} border rounded-lg text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
//             >
//               <RefreshCw size={16} />
//               Refresh
//             </button>
//             {isEditing ? (
//               <>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className={`px-4 py-2 ${theme.card} border rounded-lg text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
//                 >
//                   <X size={16} />
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSave}
//                   className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2`}
//                 >
//                   <Save size={16} />
//                   Save
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className={`px-4 py-2 ${theme.accent} text-white rounded-lg font-semibold flex items-center gap-2 text-sm hover:scale-105 transition-all`}
//                 >
//                   <Edit size={16} />
//                   Edit
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2 text-sm hover:scale-105 transition-all`}
//                 >
//                   <Trash2 size={16} />
//                   Delete
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* COMPACT SEARCH */}
//         <div className="mb-6">
//           <div className="relative">
//             <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={18} />
//             <input
//               type="text"
//               placeholder="Search projects, services, environments, zones..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all text-sm`}
//             />
//           </div>
//         </div>

//         {/* COMPACT STATS */}
//         <div className="grid grid-cols-4 gap-4 mb-6">
//           <div className={`${theme.card} border rounded-lg p-4`}>
//             <p className={`text-xs font-semibold ${theme.textSecondary} mb-1`}>Projects</p>
//             <p className={`text-2xl font-bold ${theme.text}`}>{totalProjects}</p>
//           </div>
//           <div className={`${theme.card} border rounded-lg p-4`}>
//             <p className={`text-xs font-semibold ${theme.textSecondary} mb-1`}>Services</p>
//             <p className={`text-2xl font-bold ${theme.text}`}>{totalServices}</p>
//           </div>
//           <div className={`${theme.card} border rounded-lg p-4`}>
//             <p className={`text-xs font-semibold ${theme.textSecondary} mb-1`}>Environments</p>
//             <p className={`text-2xl font-bold ${theme.text}`}>{totalEnvironments}</p>
//           </div>
//           <div className={`${theme.card} border rounded-lg p-4`}>
//             <p className={`text-xs font-semibold ${theme.textSecondary} mb-1`}>Status</p>
//             <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
//               isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
//             }`}>
//               Active
//             </span>
//           </div>
//         </div>

//         {/* APPLICATION CONTENT */}
//         <ApplicationDetailsView
//           application={application}
//           onUpdate={handleApplicationUpdate}
//           isEditing={isEditing}
//           theme={theme}
//           isDark={isDark}
//           searchQuery={searchQuery}
//         />
//       </div>
//     </div>
//   );
// }