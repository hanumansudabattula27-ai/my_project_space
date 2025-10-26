// // src/components/env-matrix/hydra-application-level/addprojectmodal.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Application, Project, Service, Environment, Zone } from '@/types';
// import { X, Plus, Loader2 } from 'lucide-react';

// interface AddProjectModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   application: Application;
//   onSuccess: (newProject: Project) => void;
// }

// interface FormData {
//   projects: Array<{ name: string }>;
//   services: Array<{
//     serviceName: string;
//     applicationDomain: string;
//     hostingPlatform: string;
//     projectIndex: number;
//     environments: {
//       [key: string]: { environmentName: string; GTM: string; namehydra: string; abcGTM: string; firewallProfile: string; zones: Zone[] };
//     };
//   }>;
// }

// export default function AddProjectModal({
//   isOpen,
//   onClose,
//   application,
//   onSuccess,
// }: AddProjectModalProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState<FormData>({
//     projects: [{ name: '' }],
//     services: [],
//   });

//   const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
//   const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
//   const [activeEnvTab, setActiveEnvTab] = useState<string>('');

//   useEffect(() => {
//     if (isOpen) {
//       setCurrentStep(1);
//       setFormData({
//         projects: [{ name: '' }],
//         services: [],
//       });
//       setCurrentProjectIndex(0);
//       setCurrentServiceIndex(0);
//       setActiveEnvTab('');
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleAddProject = () => {
//     setFormData(prev => ({
//       ...prev,
//       projects: [...prev.projects, { name: '' }],
//     }));
//   };

//   const handleRemoveProject = (index: number) => {
//     if (formData.projects.length > 1) {
//       setFormData(prev => ({
//         ...prev,
//         projects: prev.projects.filter((_, i) => i !== index),
//       }));
//     }
//   };

//   const handleProjectNameChange = (index: number, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       projects: prev.projects.map((p, i) => (i === index ? { name: value } : p)),
//     }));
//   };

//   const handleStep1Next = () => {
//     if (formData.projects.some(p => !p.name.trim())) {
//       alert('Please fill in all project names');
//       return;
//     }
//     setCurrentStep(2);
//   };

//   const handleAddService = () => {
//     setFormData(prev => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceName: '',
//           applicationDomain: '',
//           hostingPlatform: 'Hydra',
//           projectIndex: currentProjectIndex,
//           environments: {},
//         },
//       ],
//     }));
//     setCurrentServiceIndex(formData.services.length);
//     setActiveEnvTab('');
//   };

//   const handleServiceChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.map((s, i) =>
//         i === currentServiceIndex ? { ...s, [field]: value } : s
//       ),
//     }));
//   };

//   const handleStep2Next = () => {
//     const currentProjectServices = formData.services.filter(s => s.projectIndex === currentProjectIndex);
//     if (currentProjectServices.length === 0 || currentProjectServices.some(s => !s.serviceName.trim() || !s.applicationDomain.trim())) {
//       alert('Please add at least one service with all required fields');
//       return;
//     }
//     setCurrentStep(3);
//     if (!activeEnvTab) {
//       setActiveEnvTab(`env_0_0`);
//     }
//   };

//   const handleAddEnvironment = () => {
//     const currentService = formData.services[currentServiceIndex];
//     const envKey = `env_${currentProjectIndex}_${currentServiceIndex}_${Object.keys(currentService.environments).length}`;
    
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.map((s, i) =>
//         i === currentServiceIndex
//           ? {
//               ...s,
//               environments: {
//                 ...s.environments,
//                 [envKey]: {
//                   environmentName: '',
//                   GTM: '',
//                   namehydra: '',
//                   abcGTM: '',
//                   firewallProfile: '',
//                   zones: [],
//                 },
//               },
//             }
//           : s
//       ),
//     }));
//     setActiveEnvTab(envKey);
//   };

//   const handleEnvironmentChange = (envKey: string, field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.map((s, i) =>
//         i === currentServiceIndex
//           ? {
//               ...s,
//               environments: {
//                 ...s.environments,
//                 [envKey]: {
//                   ...s.environments[envKey],
//                   [field]: value,
//                 },
//               },
//             }
//           : s
//       ),
//     }));
//   };

//   const handleAddZone = (envKey: string) => {
//     const newZone: Zone = {
//       ZoneName: '',
//       vipName: '',
//       vipIP: '',
//       f5Device: [],
//       firewall: '',
//       count: '',
//       cpu: '',
//       memory: '',
//       metadata: {},
//     };

//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.map((s, i) =>
//         i === currentServiceIndex
//           ? {
//               ...s,
//               environments: {
//                 ...s.environments,
//                 [envKey]: {
//                   ...s.environments[envKey],
//                   zones: [...s.environments[envKey].zones, newZone],
//                 },
//               },
//             }
//           : s
//       ),
//     }));
//   };

//   const handleZoneChange = (envKey: string, zoneIndex: number, field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.map((s, i) =>
//         i === currentServiceIndex
//           ? {
//               ...s,
//               environments: {
//                 ...s.environments,
//                 [envKey]: {
//                   ...s.environments[envKey],
//                   zones: s.environments[envKey].zones.map((z, zi) =>
//                     zi === zoneIndex ? { ...z, [field]: value } : z
//                   ),
//                 },
//               },
//             }
//           : s
//       ),
//     }));
//   };

//   const handleStep3Next = () => {
//     const currentService = formData.services[currentServiceIndex];
//     if (Object.keys(currentService.environments).length === 0 || 
//         Object.values(currentService.environments).some((env: any) => !env.environmentName.trim())) {
//       alert('Please add at least one environment with a name');
//       return;
//     }
    
//     // Move to next service or step 4
//     const nextServiceIndex = formData.services.findIndex((s, i) => i > currentServiceIndex && s.projectIndex === currentProjectIndex);
//     if (nextServiceIndex !== -1) {
//       setCurrentServiceIndex(nextServiceIndex);
//       setActiveEnvTab('');
//       setCurrentStep(2);
//     } else {
//       setCurrentStep(4);
//     }
//   };

//   const handleSubmit = () => {
//     // Build the Project object with all nested data
//     const newProject: Project = {
//       project: formData.projects[currentProjectIndex].name,
//       services: formData.services
//         .filter(s => s.projectIndex === currentProjectIndex)
//         .map(s => ({
//           serviceName: s.serviceName,
//           applicationDomain: s.applicationDomain,
//           hostingPlatform: s.hostingPlatform,
//           environments: Object.values(s.environments).map((env: any) => ({
//             environmentName: env.environmentName,
//             GTM: env.GTM,
//             namehydra: env.namehydra,
//             abcGTM: env.abcGTM,
//             firewallProfile: env.firewallProfile || '',
//             Zones: env.zones,
//             metadata: {},
//           })),
//           metadata: {},
//         })),
//       metadata: {},
//     };

//     // Return data to parent - NO API CALL
//     onSuccess(newProject);
//     onClose();
//   };

//   const currentProject = formData.projects[currentProjectIndex];
//   const currentService = formData.services[currentServiceIndex];
//   const currentEnvironments = currentService?.environments || {};

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
//       <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full mx-4 my-8">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-t-xl">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Project</h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Step {currentStep} of 4</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-all"
//           >
//             <X size={24} className="text-gray-600 dark:text-gray-400" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6 max-h-[60vh] overflow-y-auto">
//           {/* Step 1: Projects */}
//           {currentStep === 1 && (
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Project Details</h3>
//               <div className="space-y-3">
//                 {formData.projects.map((project, index) => (
//                   <div key={index} className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Enter project name"
//                       value={project.name}
//                       onChange={(e) => handleProjectNameChange(index, e.target.value)}
//                       className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     />
//                     {formData.projects.length > 1 && (
//                       <button
//                         onClick={() => handleRemoveProject(index)}
//                         className="px-3 py-2.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   onClick={handleAddProject}
//                   className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
//                 >
//                   <Plus size={16} />
//                   Add Another Project
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Services */}
//           {currentStep === 2 && (
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Add Services to "{currentProject.name}"</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add one or more services for this project</p>
              
//               <div className="space-y-4">
//                 {formData.services
//                   .filter(s => s.projectIndex === currentProjectIndex)
//                   .map((service, index) => (
//                     <div
//                       key={index}
//                       className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                         currentServiceIndex === formData.services.indexOf(service)
//                           ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
//                           : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800'
//                       }`}
//                       onClick={() => setCurrentServiceIndex(formData.services.indexOf(service))}
//                     >
//                       <input
//                         type="text"
//                         placeholder="Service Name"
//                         value={service.serviceName}
//                         onChange={(e) => handleServiceChange('serviceName', e.target.value)}
//                         onClick={(e) => e.stopPropagation()}
//                         className="w-full px-3 py-2 mb-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Application Domain"
//                         value={service.applicationDomain}
//                         onChange={(e) => handleServiceChange('applicationDomain', e.target.value)}
//                         onClick={(e) => e.stopPropagation()}
//                         className="w-full px-3 py-2 mb-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       />
//                       <select
//                         value={service.hostingPlatform}
//                         onChange={(e) => handleServiceChange('hostingPlatform', e.target.value)}
//                         onClick={(e) => e.stopPropagation()}
//                         className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
//                       >
//                         <option>Hydra</option>
//                         <option>AWS</option>
//                         <option>Azure</option>
//                         <option>GCP</option>
//                       </select>
//                     </div>
//                   ))}
//                 <button
//                   onClick={handleAddService}
//                   className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
//                 >
//                   <Plus size={16} />
//                   Add Another Service
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Environments */}
//           {currentStep === 3 && currentService && (
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Add Environments to "{currentService.serviceName}"</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add one or more environments</p>

//               {/* Environment Tabs */}
//               <div className="mb-4 flex gap-2 flex-wrap">
//                 {Object.entries(currentEnvironments).map(([envKey, env]: [string, any]) => (
//                   <button
//                     key={envKey}
//                     onClick={() => setActiveEnvTab(envKey)}
//                     className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
//                       activeEnvTab === envKey
//                         ? 'bg-teal-600 text-white'
//                         : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {env.environmentName || `Env ${Object.keys(currentEnvironments).indexOf(envKey) + 1}`}
//                   </button>
//                 ))}
//                 <button
//                   onClick={handleAddEnvironment}
//                   className="px-4 py-2 rounded-lg font-semibold text-sm bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-all flex items-center gap-1"
//                 >
//                   <Plus size={16} />
//                   Add Env
//                 </button>
//               </div>

//               {/* Active Environment Form */}
//               {activeEnvTab && currentEnvironments[activeEnvTab] && (
//                 <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg space-y-3">
//                   <input
//                     type="text"
//                     placeholder="Environment Name (e.g., Development, Staging, Production)"
//                     value={currentEnvironments[activeEnvTab].environmentName}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'environmentName', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//                   />
//                   <input
//                     type="text"
//                     placeholder="GTM"
//                     value={currentEnvironments[activeEnvTab].GTM}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'GTM', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Name Hydra"
//                     value={currentEnvironments[activeEnvTab].namehydra}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'namehydra', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//                   />
//                   <input
//                     type="text"
//                     placeholder="ABC GTM"
//                     value={currentEnvironments[activeEnvTab].abcGTM}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'abcGTM', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Firewall Profile"
//                     value={currentEnvironments[activeEnvTab].firewallProfile}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'firewallProfile', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
//                   />

//                   {/* Zones Section */}
//                   <div className="mt-4 pt-4 border-t border-gray-300 dark:border-slate-600">
//                     <div className="flex items-center justify-between mb-3">
//                       <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Zones</h4>
//                       <button
//                         onClick={() => handleAddZone(activeEnvTab)}
//                         className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-semibold flex items-center gap-1"
//                       >
//                         <Plus size={12} />
//                         Add Zone
//                       </button>
//                     </div>

//                     {currentEnvironments[activeEnvTab].zones.map((zone, zoneIndex) => (
//                       <div key={zoneIndex} className="bg-white dark:bg-slate-900 p-3 rounded mb-2 border border-gray-200 dark:border-slate-700">
//                         <div className="grid grid-cols-2 gap-2 mb-2">
//                           <input
//                             type="text"
//                             placeholder="Zone Name"
//                             value={zone.ZoneName}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'ZoneName', e.target.value)}
//                             className="col-span-2 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="VIP Name"
//                             value={zone.vipName}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipName', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="VIP IP"
//                             value={zone.vipIP}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipIP', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="F5 Devices (comma-separated)"
//                             value={zone.f5Device?.join(', ') || ''}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'f5Device', e.target.value)}
//                             className="col-span-2 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="Firewall"
//                             value={zone.firewall}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'firewall', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="Count"
//                             value={zone.count}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'count', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="CPU"
//                             value={zone.cpu}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'cpu', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="Memory"
//                             value={zone.memory}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'memory', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Step 4: Review */}
//           {currentStep === 4 && (
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Review & Submit</h3>
              
//               <div className="space-y-4">
//                 {formData.projects.map((project, pIdx) => {
//                   const projectServices = formData.services.filter(s => s.projectIndex === pIdx);
//                   if (projectServices.length === 0) return null;

//                   return (
//                     <div key={pIdx} className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-200 dark:border-teal-700 rounded-lg p-4">
//                       <h4 className="font-bold text-gray-900 dark:text-white mb-3">📁 {project.name}</h4>
//                       <div className="ml-4 space-y-2">
//                         {projectServices.map((service, sIdx) => (
//                           <div key={sIdx} className="bg-white dark:bg-slate-800 p-3 rounded">
//                             <p className="font-semibold text-gray-900 dark:text-white text-sm">⚡ {service.serviceName}</p>
//                             <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
//                               {service.applicationDomain} • {service.hostingPlatform} • {Object.keys(service.environments).length} envs • {Object.values(service.environments).reduce((sum: number, env: any) => sum + env.zones.length, 0)} zones
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900 flex items-center justify-between rounded-b-xl">
//           <button
//             onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
//             className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
//               currentStep === 1
//                 ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
//                 : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
//             }`}
//             disabled={currentStep === 1}
//           >
//             ← Back
//           </button>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={onClose}
//               className="px-5 py-2 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
//             >
//               Cancel
//             </button>

//             {currentStep < 4 && (
//               <button
//                 onClick={() => currentStep === 1 ? handleStep1Next() : currentStep === 2 ? handleStep2Next() : handleStep3Next()}
//                 className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-all"
//               >
//                 Next →
//               </button>
//             )}

//             {currentStep === 4 && (
//               <button
//                 onClick={handleSubmit}
//                 className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
//               >
//                 ✓ Submit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
import { Project, Zone } from '@/types';
import { X, Plus } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newProject: Project) => void;
}

interface FormData {
  projects: Array<{ name: string }>;
  services: Array<{
    serviceName: string;
    applicationDomain: string;
    hostingPlatform: string;
    projectIndex: number;
    environments: {
      [key: string]: {
        environmentName: string;
        GTM: string;
        namehydra: string;
        abcGTM: string;
        firewallProfile: string;
        zones: Zone[];
      };
    };
  }>;
}

export default function AddProjectModal({
  isOpen,
  onClose,
  onSuccess,
}: AddProjectModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projects: [{ name: '' }],
    services: [],
  });

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [activeEnvTab, setActiveEnvTab] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        projects: [{ name: '' }],
        services: [],
      });
      setCurrentProjectIndex(0);
      setCurrentServiceIndex(0);
      setActiveEnvTab('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '' }],
    }));
  };

  const handleRemoveProject = (index: number) => {
    if (formData.projects.length > 1) {
      setFormData(prev => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index),
      }));
    }
  };

  const handleProjectNameChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((p, i) => (i === index ? { name: value } : p)),
    }));
  };

  const handleStep1Next = () => {
    if (formData.projects.some(p => !p.name.trim())) {
      alert('Please fill in all project names');
      return;
    }
    setCurrentStep(2);
  };

  const handleAddService = () => {
    setFormData(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          serviceName: '',
          applicationDomain: '',
          hostingPlatform: 'Hydra',
          projectIndex: currentProjectIndex,
          environments: {},
        },
      ],
    }));
    setCurrentServiceIndex(formData.services.length);
  };

  const handleServiceChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === currentServiceIndex ? { ...s, [field]: value } : s
      ),
    }));
  };

  const handleStep2Next = () => {
    const currentProjectServices = formData.services.filter(s => s.projectIndex === currentProjectIndex);
    if (currentProjectServices.length === 0 || currentProjectServices.some(s => !s.serviceName.trim() || !s.applicationDomain.trim())) {
      alert('Please add at least one service with all required fields');
      return;
    }
    setCurrentStep(3);
  };

  const handleAddEnvironment = () => {
    const currentService = formData.services[currentServiceIndex];
    const envKey = `env_${Object.keys(currentService.environments).length}`;
    
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === currentServiceIndex
          ? {
              ...s,
              environments: {
                ...s.environments,
                [envKey]: {
                  environmentName: '',
                  GTM: '',
                  namehydra: '',
                  abcGTM: '',
                  firewallProfile: '',
                  zones: [],
                },
              },
            }
          : s
      ),
    }));
    setActiveEnvTab(envKey);
  };

  const handleEnvironmentChange = (envKey: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === currentServiceIndex
          ? {
              ...s,
              environments: {
                ...s.environments,
                [envKey]: {
                  ...s.environments[envKey],
                  [field]: value,
                },
              },
            }
          : s
      ),
    }));
  };

  const handleAddZone = (envKey: string) => {
    const newZone: Zone = {
      ZoneName: '',
      vipName: '',
      vipIP: '',
      f5Device: [],
      firewall: '',
      count: '',
      cpu: '',
      memory: '',
      metadata: {},
    };

    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === currentServiceIndex
          ? {
              ...s,
              environments: {
                ...s.environments,
                [envKey]: {
                  ...s.environments[envKey],
                  zones: [...s.environments[envKey].zones, newZone],
                },
              },
            }
          : s
      ),
    }));
  };

  const handleZoneChange = (envKey: string, zoneIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === currentServiceIndex
          ? {
              ...s,
              environments: {
                ...s.environments,
                [envKey]: {
                  ...s.environments[envKey],
                  zones: s.environments[envKey].zones.map((z, zi) =>
                    zi === zoneIndex ? { ...z, [field]: value } : z
                  ),
                },
              },
            }
          : s
      ),
    }));
  };

  const handleStep3Next = () => {
    const currentService = formData.services[currentServiceIndex];
    if (Object.keys(currentService.environments).length === 0 || 
        Object.values(currentService.environments).some((env: any) => !env.environmentName.trim())) {
      alert('Please add at least one environment with a name');
      return;
    }
    
    const nextServiceIndex = formData.services.findIndex((s, i) => i > currentServiceIndex && s.projectIndex === currentProjectIndex);
    if (nextServiceIndex !== -1) {
      setCurrentServiceIndex(nextServiceIndex);
      setActiveEnvTab('');
      setCurrentStep(2);
    } else {
      setCurrentStep(4);
    }
  };

  const handleSubmit = () => {
    const newProject: Project = {
      project: formData.projects[currentProjectIndex].name,
      services: formData.services
        .filter(s => s.projectIndex === currentProjectIndex)
        .map(s => ({
          serviceName: s.serviceName,
          applicationDomain: s.applicationDomain,
          hostingPlatform: s.hostingPlatform,
          environments: Object.values(s.environments).map((env: any) => ({
            environmentName: env.environmentName,
            GTM: env.GTM,
            namehydra: env.namehydra,
            abcGTM: env.abcGTM,
            firewallProfile: env.firewallProfile || '',
            Zones: env.zones,
            metadata: {},
          })),
          metadata: {},
        })),
      metadata: {},
    };

    onSuccess(newProject);
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const currentService = formData.services[currentServiceIndex];
  const currentEnvironments = currentService?.environments || {};

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER with Progress Steps */}
        <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-t-xl border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Project</h2>
              <p className="text-slate-400 text-sm mt-0.5">Follow the steps below to create a new project</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-2xl">
            {[
              { num: 1, label: 'Project' },
              { num: 2, label: 'Services' },
              { num: 3, label: 'Environments' },
              { num: 4, label: 'Review' },
            ].map((step, index) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      currentStep > step.num
                        ? 'bg-green-500 text-white'
                        : currentStep === step.num
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-300 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {currentStep > step.num ? '✓' : step.num}
                  </div>
                  <span
                    className={`mt-1 text-xs font-semibold ${
                      currentStep >= step.num
                        ? 'text-teal-600 dark:text-teal-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < 3 && (
                  <div
                    className={`h-0.5 flex-1 mx-1 rounded ${
                      currentStep > step.num
                        ? 'bg-green-500'
                        : 'bg-gray-300 dark:bg-slate-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-slate-800">
          {/* Step 1: Projects */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Project Details</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Add one or more projects</p>

              <div className="space-y-3">
                {formData.projects.map((project, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Project name"
                      value={project.name}
                      onChange={(e) => handleProjectNameChange(index, e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white placeholder-gray-400"
                    />
                    {formData.projects.length > 1 && (
                      <button
                        onClick={() => handleRemoveProject(index)}
                        className="p-2.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddProject}
                  className="mt-2 px-3 py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors flex items-center gap-2 text-sm font-semibold"
                >
                  <Plus size={16} />
                  Add Another Project
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Services */}
          {currentStep === 2 && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Service Configuration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Project: <span className="font-semibold">{formData.projects[currentProjectIndex].name}</span>
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                    Service Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., first-service"
                    value={currentService?.serviceName || ''}
                    onChange={(e) => handleServiceChange('serviceName', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                      Application Domain <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={currentService?.applicationDomain || ''}
                      onChange={(e) => handleServiceChange('applicationDomain', e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select domain</option>
                      <option value="Intranet">Intranet</option>
                      <option value="Internet">Internet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                      Hosting Platform <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={currentService?.hostingPlatform || 'Hydra'}
                      onChange={(e) => handleServiceChange('hostingPlatform', e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Hydra">Hydra</option>
                      <option value="AWS">AWS</option>
                      <option value="Azure">Azure</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddService}
                className="mt-4 px-3 py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors flex items-center gap-2 text-sm font-semibold"
              >
                <Plus size={16} />
                Add Another Service
              </button>
            </div>
          )}

          {/* Step 3: Environments */}
          {currentStep === 3 && currentService && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Environment Configuration</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Service: <span className="font-semibold">{currentService.serviceName}</span>
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4">
                <div className="flex border-b-2 border-gray-300 dark:border-slate-600 mb-4">
                  {Object.entries(currentEnvironments).map(([envKey, env]: [string, any], index) => (
                    <button
                      key={envKey}
                      onClick={() => setActiveEnvTab(envKey)}
                      className={`px-4 py-2.5 text-sm font-bold transition-all border-b-2 ${
                        activeEnvTab === envKey
                          ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                          : 'border-transparent text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {env.environmentName || `Env ${index + 1}`}
                    </button>
                  ))}
                  <button
                    onClick={handleAddEnvironment}
                    className="px-4 py-2.5 text-sm font-bold text-teal-600 dark:text-teal-400 border-b-2 border-transparent hover:border-teal-600 transition-all"
                  >
                    + Add Environment
                  </button>
                </div>

                {activeEnvTab && currentEnvironments[activeEnvTab] && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        Environment Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Production"
                        value={currentEnvironments[activeEnvTab].environmentName}
                        onChange={(e) => handleEnvironmentChange(activeEnvTab, 'environmentName', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        hydraGtm
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., hydraGtm"
                        value={currentEnvironments[activeEnvTab].GTM}
                        onChange={(e) => handleEnvironmentChange(activeEnvTab, 'GTM', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        canonicalNameHydra
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., canonicalNameHydra"
                        value={currentEnvironments[activeEnvTab].namehydra}
                        onChange={(e) => handleEnvironmentChange(activeEnvTab, 'namehydra', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        ecpGtm
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., abc-gtm-value"
                        value={currentEnvironments[activeEnvTab].abcGTM}
                        onChange={(e) => handleEnvironmentChange(activeEnvTab, 'abcGTM', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        Firewall Profile
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., production"
                        value={currentEnvironments[activeEnvTab].firewallProfile}
                        onChange={(e) => handleEnvironmentChange(activeEnvTab, 'firewallProfile', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    {/* Zones */}
                    <div className="mt-4 pt-4 border-t border-gray-300 dark:border-slate-600">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Zones ({currentEnvironments[activeEnvTab].zones.length})</h4>
                        <button
                          onClick={() => handleAddZone(activeEnvTab)}
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-semibold"
                        >
                          + Add Zone
                        </button>
                      </div>

                      {currentEnvironments[activeEnvTab].zones.map((zone, zoneIndex) => (
                        <div key={zoneIndex} className="bg-white dark:bg-slate-700 p-3 rounded mb-2 border border-gray-200 dark:border-slate-600">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Zone Name"
                              value={zone.ZoneName}
                              onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'ZoneName', e.target.value)}
                              className="col-span-2 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                            <input
                              type="text"
                              placeholder="VIP Name"
                              value={zone.vipName}
                              onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipName', e.target.value)}
                              className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                            <input
                              type="text"
                              placeholder="VIP IP"
                              value={zone.vipIP}
                              onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipIP', e.target.value)}
                              className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                            <input
                              type="text"
                              placeholder="F5 Devices"
                              value={zone.f5Device?.join(', ') || ''}
                              onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'f5Device', e.target.value)}
                              className="col-span-2 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                            <input
                              type="text"
                              placeholder="Firewall"
                              value={zone.firewall}
                              onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'firewall', e.target.value)}
                              className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                            <input
                              type="text"
                              placeholder="Count"
                              value={zone.count}
                              onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'count', e.target.value)}
                              className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                            <input
                              type="text"
                              placeholder="CPU"
                              value={zone.cpu}
                              onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'cpu', e.target.value)}
                              className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                            <input
                              type="text"
                              placeholder="Memory"
                              value={zone.memory}
                              onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'memory', e.target.value)}
                              className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Review & Submit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Review your project details before submitting</p>
              
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-200 dark:border-teal-700 rounded-xl p-4">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Project Summary</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Project:</span> {formData.projects[currentProjectIndex].name}</p>
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Services:</span> {formData.services.filter(s => s.projectIndex === currentProjectIndex).length}</p>
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Total Environments:</span> {formData.services.filter(s => s.projectIndex === currentProjectIndex).reduce((sum, s) => sum + Object.keys(s.environments).length, 0)}</p>
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Total Zones:</span> {formData.services.filter(s => s.projectIndex === currentProjectIndex).reduce((sum, s) => sum + Object.values(s.environments).reduce((envSum: number, e: any) => envSum + e.zones.length, 0), 0)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 flex items-center justify-between rounded-b-xl">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
              currentStep === 1
                ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
            }`}
            disabled={currentStep === 1}
          >
            ← Back
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>

            {currentStep < 4 && (
              <button
                onClick={() => {
                  if (currentStep === 1) handleStep1Next();
                  else if (currentStep === 2) handleStep2Next();
                  else if (currentStep === 3) handleStep3Next();
                }}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-all"
              >
                Next →
              </button>
            )}

            {currentStep === 4 && (
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
              >
                ✓ Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}