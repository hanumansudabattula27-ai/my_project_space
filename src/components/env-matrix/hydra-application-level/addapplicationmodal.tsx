// // src/components/env-matrix/AddApplicationModal.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Application, Zone } from '@/types';
// import { X, Plus } from 'lucide-react';

// interface AddApplicationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// type PlatformType = 'hydra' | 'non-hydra' | '';

// interface FormData {
//   platform: PlatformType;
//   aimId: string;
//   applicationName: string;
//   projects: Array<{ name: string }>;
//   services: Array<{
//     serviceName: string;
//     applicationDomain: string;
//     hostingPlatform: string;
//     projectName: string;
//     environments: {
//       E1: { GTM: string; namehydra: string; abcGTM: string; firewallProfile: string; zones: Zone[] };
//       E2: { GTM: string; namehydra: string; abcGTM: string; firewallProfile: string; zones: Zone[] };
//       E3: { GTM: string; namehydra: string; abcGTM: string; firewallProfile: string; zones: Zone[] };
//     };
//   }>;
// }

// export default function AddApplicationModal({
//   isOpen,
//   onClose,
//   onSuccess,
// }: AddApplicationModalProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState<FormData>({
//     platform: '',
//     aimId: '',
//     applicationName: '',
//     projects: [{ name: '' }],
//     services: [],
//   });

//   const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
//   const [activeEnvTab, setActiveEnvTab] = useState<'E1' | 'E2' | 'E3'>('E1');

//   useEffect(() => {
//     if (isOpen) {
//       setCurrentStep(1);
//       setFormData({
//         platform: '',
//         aimId: '',
//         applicationName: '',
//         projects: [{ name: '' }],
//         services: [],
//       });
//       setCurrentServiceIndex(0);
//       setActiveEnvTab('E1');
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handlePlatformSelect = (platform: PlatformType) => {
//     setFormData(prev => ({ ...prev, platform }));
//     setCurrentStep(2);
//   };

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

//   const handleStep2Next = () => {
//     if (!formData.aimId || !formData.applicationName || formData.projects.some(p => !p.name)) {
//       alert('Please fill in all required fields');
//       return;
//     }
    
//     if (formData.services.length === 0) {
//       setFormData(prev => ({
//         ...prev,
//         services: [
//           {
//             serviceName: '',
//             applicationDomain: '',
//             hostingPlatform: prev.platform === 'hydra' ? 'Hydra' : 'Non-Hydra',
//             projectName: prev.projects[0].name,
//             environments: {
//               E1: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
//               E2: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
//               E3: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
//             },
//           },
//         ],
//       }));
//     }
//     setCurrentStep(3);
//   };

//   const handleAddService = () => {
//     setFormData(prev => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceName: '',
//           applicationDomain: '',
//           hostingPlatform: prev.platform === 'hydra' ? 'Hydra' : 'Non-Hydra',
//           projectName: prev.projects[0].name,
//           environments: {
//             E1: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
//             E2: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
//             E3: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
//           },
//         },
//       ],
//     }));
//     setCurrentServiceIndex(formData.services.length);
//   };

//   const handleServiceChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.map((s, i) =>
//         i === currentServiceIndex ? { ...s, [field]: value } : s
//       ),
//     }));
//   };

//   const handleEnvironmentChange = (env: 'E1' | 'E2' | 'E3', field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.map((s, i) =>
//         i === currentServiceIndex
//           ? {
//               ...s,
//               environments: {
//                 ...s.environments,
//                 [env]: {
//                   ...s.environments[env],
//                   [field]: value,
//                 },
//               },
//             }
//           : s
//       ),
//     }));
//   };

//   const handleAddZone = (env: 'E1' | 'E2' | 'E3') => {
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
//                 [env]: {
//                   ...s.environments[env],
//                   zones: [...s.environments[env].zones, newZone],
//                 },
//               },
//             }
//           : s
//       ),
//     }));
//   };

//   const handleZoneChange = (env: 'E1' | 'E2' | 'E3', zoneIndex: number, field: string, value: any) => {
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.map((s, i) =>
//         i === currentServiceIndex
//           ? {
//               ...s,
//               environments: {
//                 ...s.environments,
//                 [env]: {
//                   ...s.environments[env],
//                   zones: s.environments[env].zones.map((z, zi) =>
//                     zi === zoneIndex ? { ...z, [field]: value } : z
//                   ),
//                 },
//               },
//             }
//           : s
//       ),
//     }));
//   };

//   const handleRemoveZone = (env: 'E1' | 'E2' | 'E3', zoneIndex: number) => {
//     setFormData(prev => ({
//       ...prev,
//       services: prev.services.map((s, i) =>
//         i === currentServiceIndex
//           ? {
//               ...s,
//               environments: {
//                 ...s.environments,
//                 [env]: {
//                   ...s.environments[env],
//                   zones: s.environments[env].zones.filter((_, zi) => zi !== zoneIndex),
//                 },
//               },
//             }
//           : s
//       ),
//     }));
//   };

//   const handleSubmit = async () => {
//     const applicationData: Partial<Application> = {
//       aimId: formData.aimId,
//       applicationName: formData.applicationName,
//       Projects: formData.projects.map(project => ({
//         project: project.name,
//         services: formData.services
//           .filter(s => s.projectName === project.name)
//           .map(service => ({
//             serviceName: service.serviceName,
//             applicationDomain: service.applicationDomain,
//             hostingPlatform: service.hostingPlatform,
//             environments: [
//               {
//                 environmentName: 'E1',
//                 GTM: service.environments.E1.GTM,
//                 namehydra: service.environments.E1.namehydra,
//                 abcGTM: service.environments.E1.abcGTM,
//                 firewallProfile: service.environments.E1.firewallProfile,
//                 Zones: service.environments.E1.zones,
//               },
//               {
//                 environmentName: 'E2',
//                 GTM: service.environments.E2.GTM,
//                 namehydra: service.environments.E2.namehydra,
//                 abcGTM: service.environments.E2.abcGTM,
//                 firewallProfile: service.environments.E2.firewallProfile,
//                 Zones: service.environments.E2.zones,
//               },
//               {
//                 environmentName: 'E3',
//                 GTM: service.environments.E3.GTM,
//                 namehydra: service.environments.E3.namehydra,
//                 abcGTM: service.environments.E3.abcGTM,
//                 firewallProfile: service.environments.E3.firewallProfile,
//                 Zones: service.environments.E3.zones,
//               },
//             ].filter(env => env.GTM || env.Zones.length > 0),
//             metadata: {},
//           })),
//         metadata: {},
//       })),
//       metadata: {},
//     };

//     try {
//       const response = await fetch('/api/env-matrix/applications', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...applicationData,
//           platform: formData.platform,
//         }),
//       });

//       if (response.ok) {
//         alert('Application created successfully!');
//         onSuccess();
//         onClose();
//       } else {
//         const error = await response.json();
//         alert(`Failed to create application: ${error.message || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error creating application:', error);
//       alert('Error creating application. Please try again.');
//     }
//   };

//   const currentService = formData.services[currentServiceIndex];

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
//       <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-4xl my-8 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
//           >
//             <X size={20} />
//           </button>
//           <h2 className="text-2xl font-bold">Add New Application</h2>
//           <p className="text-blue-100 text-sm mt-1">Follow the steps below to create a new application</p>
//         </div>

//         {/* Progress Steps */}
//         <div className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
//           <div className="flex items-center justify-between max-w-2xl mx-auto">
//             {[
//               { num: 1, label: 'Platform' },
//               { num: 2, label: 'App Info' },
//               { num: 3, label: 'Services' },
//               { num: 4, label: 'Review' },
//             ].map((step, index) => (
//               <div key={step.num} className="flex items-center flex-1">
//                 <div className="flex flex-col items-center flex-1">
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
//                       currentStep > step.num
//                         ? 'bg-green-500 text-white'
//                         : currentStep === step.num
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-300 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
//                     }`}
//                   >
//                     {currentStep > step.num ? '✓' : step.num}
//                   </div>
//                   <span
//                     className={`mt-1 text-xs font-semibold ${
//                       currentStep >= step.num
//                         ? 'text-blue-600 dark:text-blue-400'
//                         : 'text-gray-500 dark:text-gray-400'
//                     }`}
//                   >
//                     {step.label}
//                   </span>
//                 </div>
//                 {index < 3 && (
//                   <div
//                     className={`h-0.5 flex-1 mx-1 rounded ${
//                       currentStep > step.num
//                         ? 'bg-green-500'
//                         : 'bg-gray-300 dark:bg-slate-700'
//                     }`}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
          
//           {/* Step 1: Platform Selection - MEDIUM SIZE */}
//           {currentStep === 1 && (
//             <div className="max-w-2xl mx-auto">
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                 Select Hosting Platform
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//                 Choose where this application will be hosted
//               </p>

//               <div className="grid grid-cols-2 gap-4">
//                 <button
//                   onClick={() => handlePlatformSelect('hydra')}
//                   className="group border-2 border-gray-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl p-6 text-center transition-all hover:shadow-lg"
//                 >
//                   <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
//                     🌐
//                   </div>
//                   <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
//                     Hydra Platform
//                   </h4>
//                   <p className="text-xs text-gray-600 dark:text-gray-400">
//                     Cloud-based hosting
//                   </p>
//                 </button>

//                 <button
//                   onClick={() => handlePlatformSelect('non-hydra')}
//                   className="group border-2 border-gray-300 dark:border-slate-600 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl p-6 text-center transition-all hover:shadow-lg"
//                 >
//                   <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
//                     🔧
//                   </div>
//                   <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
//                     Non-Hydra Platform
//                   </h4>
//                   <p className="text-xs text-gray-600 dark:text-gray-400">
//                     Legacy systems
//                   </p>
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Application Information */}
//           {currentStep === 2 && (
//             <div className="max-w-2xl mx-auto">
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                 Application Information
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//                 Provide basic details about the application
//               </p>

//               <div className="space-y-4">
//                 {/* Application ID */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
//                     Application ID (aimid) <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.aimId}
//                     onChange={(e) => setFormData(prev => ({ ...prev, aimId: e.target.value }))}
//                     placeholder="e.g., 400402444"
//                     className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
//                   />
//                   <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
//                     Unique identifier for this application
//                   </p>
//                 </div>

//                 {/* Application Name */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
//                     Application Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.applicationName}
//                     onChange={(e) => setFormData(prev => ({ ...prev, applicationName: e.target.value }))}
//                     placeholder="e.g., Infrastructure Problem"
//                     className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
//                   />
//                 </div>

//                 {/* Projects */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
//                     Projects <span className="text-red-500">*</span>
//                   </label>
//                   <div className="space-y-2">
//                     {formData.projects.map((project, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <input
//                           type="text"
//                           value={project.name}
//                           onChange={(e) => handleProjectNameChange(index, e.target.value)}
//                           placeholder="Project name"
//                           className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
//                         />
//                         {formData.projects.length > 1 && (
//                           <button
//                             onClick={() => handleRemoveProject(index)}
//                             className="p-2.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
//                           >
//                             <X size={18} />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   <button
//                     onClick={handleAddProject}
//                     className="mt-2 px-3 py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center gap-2 text-sm font-semibold"
//                   >
//                     <Plus size={16} />
//                     Add Another Project
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Services - I'll continue in next message */}
          
//         </div>

//         {/* Footer Buttons */}
       
//        {/* Step 3: Services */}
//           {currentStep === 3 && currentService && (
//             <div className="max-w-3xl mx-auto">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                     Service Configuration
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                     Service {currentServiceIndex + 1} of {formData.services.length}
//                   </p>
//                 </div>
                
//                 {formData.services.length > 1 && (
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setCurrentServiceIndex(Math.max(0, currentServiceIndex - 1))}
//                       disabled={currentServiceIndex === 0}
//                       className="px-3 py-1.5 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold disabled:opacity-50"
//                     >
//                       ← Prev
//                     </button>
//                     <span className="text-xs text-gray-600 dark:text-gray-400">
//                       {currentServiceIndex + 1}/{formData.services.length}
//                     </span>
//                     <button
//                       onClick={() => setCurrentServiceIndex(Math.min(formData.services.length - 1, currentServiceIndex + 1))}
//                       disabled={currentServiceIndex === formData.services.length - 1}
//                       className="px-3 py-1.5 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold disabled:opacity-50"
//                     >
//                       Next →
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 {/* Service Basic Info */}
//                 <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4">
//                   <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Service Details</h4>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {/* Service Name */}
//                     <div className="md:col-span-2">
//                       <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
//                         Service Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         value={currentService.serviceName}
//                         onChange={(e) => handleServiceChange('serviceName', e.target.value)}
//                         placeholder="e.g., first-service"
//                         className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400"
//                       />
//                     </div>

//                     {/* Application Domain */}
//                     <div>
//                       <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
//                         Application Domain <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={currentService.applicationDomain}
//                         onChange={(e) => handleServiceChange('applicationDomain', e.target.value)}
//                         className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white"
//                       >
//                         <option value="">Select domain</option>
//                         <option value="Intranet">Intranet</option>
//                         <option value="Internet">Internet</option>
//                       </select>
//                     </div>

//                     {/* Hosting Platform */}
//                     <div>
//                       <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
//                         Hosting Platform <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={currentService.hostingPlatform}
//                         onChange={(e) => handleServiceChange('hostingPlatform', e.target.value)}
//                         className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white"
//                       >
//                         <option value="Hydra">Hydra</option>
//                         <option value="Non-Hydra">Non-Hydra</option>
//                       </select>
//                     </div>

//                     {/* Project Selection */}
//                     <div className="md:col-span-2">
//                       <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
//                         Project <span className="text-red-500">*</span>
//                       </label>
//                       <select
//                         value={currentService.projectName}
//                         onChange={(e) => handleServiceChange('projectName', e.target.value)}
//                         className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white"
//                       >
//                         {formData.projects.map((project, index) => (
//                           <option key={index} value={project.name}>
//                             {project.name}
//                           </option>
//                         ))}
//                       </select>
//                       <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                         Service must belong to one of the projects defined earlier
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Environment Tabs */}
//                 <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4">
//                   <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Environment Configuration</h4>
                  
//                   {/* Tabs */}
//                   <div className="flex border-b-2 border-gray-300 dark:border-slate-600 mb-4">
//                     {(['E1', 'E2', 'E3'] as const).map((env) => (
//                       <button
//                         key={env}
//                         onClick={() => setActiveEnvTab(env)}
//                         className={`px-4 py-2 font-bold text-sm transition-colors relative ${
//                           activeEnvTab === env
//                             ? 'text-blue-600 dark:text-blue-400'
//                             : 'text-gray-500 dark:text-gray-400'
//                         }`}
//                       >
//                         {env}
//                         {activeEnvTab === env && (
//                           <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
//                         )}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Tab Content */}
//                   <div className="space-y-3">
//                     {/* GTM */}
//                     <div>
//                       <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
//                         GTM
//                       </label>
//                       <input
//                         type="text"
//                         value={currentService.environments[activeEnvTab].GTM}
//                         onChange={(e) => handleEnvironmentChange(activeEnvTab, 'GTM', e.target.value)}
//                         placeholder="e.g., samplegtm.app.dev.com"
//                         className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400"
//                       />
//                     </div>

//                     {/* namehydra */}
//                     <div>
//                       <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
//                         Name Hydra
//                       </label>
//                       <input
//                         type="text"
//                         value={currentService.environments[activeEnvTab].namehydra}
//                         onChange={(e) => handleEnvironmentChange(activeEnvTab, 'namehydra', e.target.value)}
//                         placeholder="e.g., allowsamplehydra.com"
//                         className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400"
//                       />
//                     </div>

//                     {/* abcGTM */}
//                     <div>
//                       <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
//                         ABC GTM
//                       </label>
//                       <input
//                         type="text"
//                         value={currentService.environments[activeEnvTab].abcGTM}
//                         onChange={(e) => handleEnvironmentChange(activeEnvTab, 'abcGTM', e.target.value)}
//                         placeholder="e.g., abc-gtm-value"
//                         className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400"
//                       />
//                     </div>

//                     {/* firewallProfile */}
//                     <div>
//                       <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
//                         Firewall Profile
//                       </label>
//                       <input
//                         type="text"
//                         value={currentService.environments[activeEnvTab].firewallProfile}
//                         onChange={(e) => handleEnvironmentChange(activeEnvTab, 'firewallProfile', e.target.value)}
//                         placeholder="e.g., production"
//                         className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400"
//                       />
//                     </div>

//                     {/* Zones */}
//                     <div className="pt-3 border-t border-gray-300 dark:border-slate-600">
//                       <div className="flex items-center justify-between mb-3">
//                         <h5 className="text-sm font-bold text-gray-900 dark:text-white">
//                           Zones ({currentService.environments[activeEnvTab].zones.length})
//                         </h5>
//                         <button
//                           onClick={() => handleAddZone(activeEnvTab)}
//                           className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1"
//                         >
//                           <Plus size={14} />
//                           Add Zone
//                         </button>
//                       </div>

//                       {currentService.environments[activeEnvTab].zones.length === 0 ? (
//                         <div className="text-center py-6 bg-white dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
//                           <p className="text-xs text-gray-500 dark:text-gray-400">No zones added yet</p>
//                         </div>
//                       ) : (
//                         <div className="space-y-3">
//                           {currentService.environments[activeEnvTab].zones.map((zone, zoneIndex) => (
//                             <div
//                               key={zoneIndex}
//                               className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg p-3"
//                             >
//                               <div className="flex items-center justify-between mb-2">
//                                 <h6 className="text-xs font-bold text-gray-900 dark:text-white">Zone {zoneIndex + 1}</h6>
//                                 <button
//                                   onClick={() => handleRemoveZone(activeEnvTab, zoneIndex)}
//                                   className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
//                                 >
//                                   <X size={14} />
//                                 </button>
//                               </div>

//                               <div className="grid grid-cols-2 gap-2">
//                                 {/* Zone Name */}
//                                 <div>
//                                   <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                                     Zone Name
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={zone.ZoneName}
//                                     onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'ZoneName', e.target.value)}
//                                     placeholder="Zone A"
//                                     className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white"
//                                   />
//                                 </div>

//                                 {/* VIP Name */}
//                                 <div>
//                                   <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                                     VIP Name
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={zone.vipName}
//                                     onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipName', e.target.value)}
//                                     placeholder="vip.com"
//                                     className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white"
//                                   />
//                                 </div>

//                                 {/* VIP IP */}
//                                 <div>
//                                   <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                                     VIP IP
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={zone.vipIP}
//                                     onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipIP', e.target.value)}
//                                     placeholder="10.7.78.100"
//                                     className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white"
//                                   />
//                                 </div>

//                                 {/* F5 Devices */}
//                                 <div>
//                                   <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                                     F5 Devices
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={zone.f5Device.join(', ')}
//                                     onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'f5Device', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
//                                     placeholder="device1, device2"
//                                     className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white"
//                                   />
//                                 </div>

//                                 {/* Firewall */}
//                                 <div>
//                                   <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                                     Firewall
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={zone.firewall}
//                                     onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'firewall', e.target.value)}
//                                     className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white"
//                                   />
//                                 </div>

//                                 {/* Count */}
//                                 <div>
//                                   <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                                     Count
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={zone.count}
//                                     onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'count', e.target.value)}
//                                     placeholder="4"
//                                     className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white"
//                                   />
//                                 </div>

//                                 {/* CPU */}
//                                 <div>
//                                   <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                                     CPU
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={zone.cpu}
//                                     onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'cpu', e.target.value)}
//                                     placeholder="8"
//                                     className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white"
//                                   />
//                                 </div>

//                                 {/* Memory */}
//                                 <div>
//                                   <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                                     Memory
//                                   </label>
//                                   <input
//                                     type="text"
//                                     value={zone.memory}
//                                     onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'memory', e.target.value)}
//                                     placeholder="16GB"
//                                     className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Add Another Service Button */}
//                 <button
//                   onClick={handleAddService}
//                   className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
//                 >
//                   <Plus size={16} />
//                   Add Another Service
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Review & Submit */}
//           {currentStep === 4 && (
//             <div className="max-w-3xl mx-auto">
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                 Review & Submit
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//                 Review your application details before submitting
//               </p>

//               <div className="space-y-4">
//                 {/* Application Summary */}
//                 <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4">
//                   <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Application Summary</h4>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <p className="text-xs text-gray-600 dark:text-gray-400">Platform</p>
//                       <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{formData.platform}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-600 dark:text-gray-400">Application ID</p>
//                       <p className="text-sm font-bold text-gray-900 dark:text-white">{formData.aimId}</p>
//                     </div>
//                     <div className="col-span-2">
//                       <p className="text-xs text-gray-600 dark:text-gray-400">Application Name</p>
//                       <p className="text-sm font-bold text-gray-900 dark:text-white">{formData.applicationName}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Statistics */}
//                 <div className="grid grid-cols-4 gap-3">
//                   <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-3 text-center">
//                     <p className="text-2xl font-bold text-green-600 dark:text-green-400">✓</p>
//                     <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{formData.projects.length} Projects</p>
//                   </div>
//                   <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-3 text-center">
//                     <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">✓</p>
//                     <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{formData.services.length} Services</p>
//                   </div>
//                   <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-3 text-center">
//                     <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">✓</p>
//                     <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
//                       {formData.services.reduce((total, s) => 
//                         total + Object.values(s.environments).filter(e => e.GTM || e.zones.length > 0).length, 0
//                       )} Envs
//                     </p>
//                   </div>
//                   <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-3 text-center">
//                     <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">✓</p>
//                     <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
//                       {formData.services.reduce((total, s) => 
//                         total + Object.values(s.environments).reduce((envTotal, e) => envTotal + e.zones.length, 0), 0
//                       )} Zones
//                     </p>
//                   </div>
//                 </div>

//                 {/* Detailed Breakdown */}
//                 <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
//                   <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Detailed Breakdown</h4>
                  
//                   {formData.projects.map((project, pIndex) => {
//                     const projectServices = formData.services.filter(s => s.projectName === project.name);
//                     if (projectServices.length === 0) return null;

//                     return (
//                       <div key={pIndex} className="mb-4 last:mb-0">
//                         <div className="flex items-center gap-2 mb-2">
//                           <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">
//                             {pIndex + 1}
//                           </div>
//                           <h5 className="text-sm font-bold text-gray-900 dark:text-white">{project.name}</h5>
//                         </div>

//                         <div className="ml-8 space-y-2">
//                           {projectServices.map((service, sIndex) => (
//                             <div key={sIndex} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2">
//                               <p className="text-xs font-semibold text-gray-900 dark:text-white">
//                                 {service.serviceName}
//                               </p>
//                               <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
//                                 {service.applicationDomain} • {service.hostingPlatform} • 
//                                 {' '}{Object.values(service.environments).filter(e => e.GTM || e.zones.length > 0).length} envs •
//                                 {' '}{Object.values(service.environments).reduce((total, e) => total + e.zones.length, 0)} zones
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           )}
//       </div>
//     </div>
//   );
// }




// src/components/env-matrix/AddApplicationModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Application, Zone } from '@/types';
import { X, Plus, Loader2 } from 'lucide-react';

interface AddApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type PlatformType = 'hydra' | 'non-hydra' | '';

interface FormData {
  platform: PlatformType;
  aimId: string;
  applicationName: string;
  projects: Array<{ name: string }>;
  services: Array<{
    serviceName: string;
    applicationDomain: string;
    hostingPlatform: string;
    projectName: string;
    environments: {
      E1: { GTM: string; namehydra: string; abcGTM: string; firewallProfile: string; zones: Zone[] };
      E2: { GTM: string; namehydra: string; abcGTM: string; firewallProfile: string; zones: Zone[] };
      E3: { GTM: string; namehydra: string; abcGTM: string; firewallProfile: string; zones: Zone[] };
    };
  }>;
}

export default function AddApplicationModal({
  isOpen,
  onClose,
  onSuccess,
}: AddApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    platform: '',
    aimId: '',
    applicationName: '',
    projects: [{ name: '' }],
    services: [],
  });

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [activeEnvTab, setActiveEnvTab] = useState<'E1' | 'E2' | 'E3'>('E1');

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsSubmitting(false);
      setFormData({
        platform: '',
        aimId: '',
        applicationName: '',
        projects: [{ name: '' }],
        services: [],
      });
      setCurrentServiceIndex(0);
      setActiveEnvTab('E1');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePlatformSelect = (platform: PlatformType) => {
    setFormData(prev => ({ ...prev, platform }));
    setCurrentStep(2);
  };

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

  const handleStep2Next = () => {
    if (!formData.aimId || !formData.applicationName || formData.projects.some(p => !p.name)) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (formData.services.length === 0) {
      setFormData(prev => ({
        ...prev,
        services: [
          {
            serviceName: '',
            applicationDomain: '',
            hostingPlatform: prev.platform === 'hydra' ? 'Hydra' : 'Non-Hydra',
            projectName: prev.projects[0].name,
            environments: {
              E1: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
              E2: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
              E3: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
            },
          },
        ],
      }));
    }
    setCurrentStep(3);
  };

  const handleStep3Next = () => {
    if (!currentService || !currentService.serviceName || !currentService.applicationDomain) {
      alert('Please fill in required service fields');
      return;
    }
    setCurrentStep(4);
  };

  const handleAddService = () => {
    setFormData(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          serviceName: '',
          applicationDomain: '',
          hostingPlatform: prev.platform === 'hydra' ? 'Hydra' : 'Non-Hydra',
          projectName: prev.projects[0].name,
          environments: {
            E1: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
            E2: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
            E3: { GTM: '', namehydra: '', abcGTM: '', firewallProfile: '', zones: [] },
          },
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

  const handleEnvironmentChange = (env: 'E1' | 'E2' | 'E3', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === currentServiceIndex
          ? {
              ...s,
              environments: {
                ...s.environments,
                [env]: {
                  ...s.environments[env],
                  [field]: value,
                },
              },
            }
          : s
      ),
    }));
  };

  const handleAddZone = (env: 'E1' | 'E2' | 'E3') => {
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
                [env]: {
                  ...s.environments[env],
                  zones: [...s.environments[env].zones, newZone],
                },
              },
            }
          : s
      ),
    }));
  };

  const handleZoneChange = (env: 'E1' | 'E2' | 'E3', zoneIndex: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === currentServiceIndex
          ? {
              ...s,
              environments: {
                ...s.environments,
                [env]: {
                  ...s.environments[env],
                  zones: s.environments[env].zones.map((z, zi) =>
                    zi === zoneIndex ? { ...z, [field]: value } : z
                  ),
                },
              },
            }
          : s
      ),
    }));
  };

  const handleRemoveZone = (env: 'E1' | 'E2' | 'E3', zoneIndex: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) =>
        i === currentServiceIndex
          ? {
              ...s,
              environments: {
                ...s.environments,
                [env]: {
                  ...s.environments[env],
                  zones: s.environments[env].zones.filter((_, zi) => zi !== zoneIndex),
                },
              },
            }
          : s
      ),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const applicationData: Partial<Application> = {
      aimId: formData.aimId,
      applicationName: formData.applicationName,
      Projects: formData.projects.map(project => ({
        project: project.name,
        services: formData.services
          .filter(s => s.projectName === project.name)
          .map(service => ({
            serviceName: service.serviceName,
            applicationDomain: service.applicationDomain,
            hostingPlatform: service.hostingPlatform,
            environments: [
              {
                environmentName: 'E1',
                GTM: service.environments.E1.GTM,
                namehydra: service.environments.E1.namehydra,
                abcGTM: service.environments.E1.abcGTM,
                firewallProfile: service.environments.E1.firewallProfile,
                Zones: service.environments.E1.zones,
              },
              {
                environmentName: 'E2',
                GTM: service.environments.E2.GTM,
                namehydra: service.environments.E2.namehydra,
                abcGTM: service.environments.E2.abcGTM,
                firewallProfile: service.environments.E2.firewallProfile,
                Zones: service.environments.E2.zones,
              },
              {
                environmentName: 'E3',
                GTM: service.environments.E3.GTM,
                namehydra: service.environments.E3.namehydra,
                abcGTM: service.environments.E3.abcGTM,
                firewallProfile: service.environments.E3.firewallProfile,
                Zones: service.environments.E3.zones,
              },
            ].filter(env => env.GTM || env.Zones.length > 0),
            metadata: {},
          })),
        metadata: {},
      })),
      metadata: {},
    };

    try {
      const response = await fetch('/api/env-matrix/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...applicationData,
          platform: formData.platform,
        }),
      });

      if (response.ok) {
        alert('Application created successfully!');
        onSuccess();
        onClose();
      } else {
        const error = await response.json();
        alert(`Failed to create application: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating application:', error);
      alert('Error creating application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const currentService = formData.services[currentServiceIndex];

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* COMPACT HEADER */}
        <div className="bg-slate-800 dark:bg-slate-900 px-6 py-4 rounded-t-xl relative border-b border-slate-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold text-white">Add New Application</h2>
          <p className="text-slate-400 text-sm mt-0.5">Follow the steps below to create a new application</p>
        </div>

        {/* COMPACT Progress Steps */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700 px-6 py-3">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Platform' },
              { num: 2, label: 'App Info' },
              { num: 3, label: 'Services' },
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

        {/* SCROLLABLE Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Step 1: Platform Selection */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Select Hosting Platform
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Choose where this application will be hosted
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handlePlatformSelect('hydra')}
                  className="group border-2 border-gray-300 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-500 rounded-xl p-6 text-center transition-all hover:shadow-lg"
                >
                  <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🌐
                  </div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    Hydra Platform
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Cloud-based hosting
                  </p>
                </button>

                <button
                  onClick={() => handlePlatformSelect('non-hydra')}
                  className="group border-2 border-gray-300 dark:border-slate-600 hover:border-orange-500 dark:hover:border-orange-500 rounded-xl p-6 text-center transition-all hover:shadow-lg"
                >
                  <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🔧
                  </div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    Non-Hydra Platform
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Legacy systems
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Application Information */}
          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Application Information
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Provide basic details about the application
              </p>

              <div className="space-y-4">
                {/* Application ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Application ID (aimId) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.aimId}
                    onChange={(e) => setFormData(prev => ({ ...prev, aimId: e.target.value }))}
                    placeholder="e.g., 400402444"
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white placeholder-gray-400"
                  />
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    Unique identifier for this application
                  </p>
                </div>

                {/* Application Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Application Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.applicationName}
                    onChange={(e) => setFormData(prev => ({ ...prev, applicationName: e.target.value }))}
                    placeholder="e.g., Infrastructure Problem"
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>

                {/* Projects */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Projects <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {formData.projects.map((project, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => handleProjectNameChange(index, e.target.value)}
                          placeholder="Project name"
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
                  </div>
                  <button
                    onClick={handleAddProject}
                    className="mt-2 px-3 py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors flex items-center gap-2 text-sm font-semibold"
                  >
                    <Plus size={16} />
                    Add Another Project
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Services */}
          {currentStep === 3 && currentService && (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Service Configuration
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Service {currentServiceIndex + 1} of {formData.services.length}
                  </p>
                </div>
                
                {formData.services.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentServiceIndex(Math.max(0, currentServiceIndex - 1))}
                      disabled={currentServiceIndex === 0}
                      className="px-3 py-1.5 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold disabled:opacity-50"
                    >
                      ← Prev
                    </button>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {currentServiceIndex + 1}/{formData.services.length}
                    </span>
                    <button
                      onClick={() => setCurrentServiceIndex(Math.min(formData.services.length - 1, currentServiceIndex + 1))}
                      disabled={currentServiceIndex === formData.services.length - 1}
                      className="px-3 py-1.5 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-xs font-semibold disabled:opacity-50"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Service Basic Info */}
                <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Service Details</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Service Name */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        Service Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={currentService.serviceName}
                        onChange={(e) => handleServiceChange('serviceName', e.target.value)}
                        placeholder="e.g., first-service"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    {/* Application Domain */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        Application Domain <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={currentService.applicationDomain}
                        onChange={(e) => handleServiceChange('applicationDomain', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Select domain</option>
                        <option value="Intranet">Intranet</option>
                        <option value="Internet">Internet</option>
                      </select>
                    </div>

                    {/* Hosting Platform */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        Hosting Platform <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={currentService.hostingPlatform}
                        onChange={(e) => handleServiceChange('hostingPlatform', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="Hydra">Hydra</option>
                        <option value="Non-Hydra">Non-Hydra</option>
                      </select>
                    </div>

                    {/* Project Selection */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        Project <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={currentService.projectName}
                        onChange={(e) => handleServiceChange('projectName', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {formData.projects.map((project, index) => (
                          <option key={index} value={project.name}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Service must belong to one of the projects defined earlier
                      </p>
                    </div>
                  </div>
                </div>

                {/* Environment Tabs */}
                <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Environment Configuration</h4>
                  
                  {/* Tabs */}
                  <div className="flex border-b-2 border-gray-300 dark:border-slate-600 mb-4">
                    {(['E1', 'E2', 'E3'] as const).map((env) => (
                      <button
                        key={env}
                        onClick={() => setActiveEnvTab(env)}
                        className={`px-4 py-2 font-bold text-sm transition-colors relative ${
                          activeEnvTab === env
                            ? 'text-teal-600 dark:text-teal-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {env}
                        {activeEnvTab === env && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content - ONLY JSON FIELDS */}
                  <div className="space-y-3">
                    {/* GTM */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        GTM
                      </label>
                      <input
                        type="text"
                        value={currentService.environments[activeEnvTab].GTM}
                        onChange={(e) => handleEnvironmentChange(activeEnvTab, 'GTM', e.target.value)}
                        placeholder="e.g., samplegtm.app.dev.com"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    {/* namehydra */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        Name Hydra
                      </label>
                      <input
                        type="text"
                        value={currentService.environments[activeEnvTab].namehydra}
                        onChange={(e) => handleEnvironmentChange(activeEnvTab, 'namehydra', e.target.value)}
                        placeholder="e.g., allowsamplehydra.com"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    {/* abcGTM */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        ABC GTM
                      </label>
                      <input
                        type="text"
                        value={currentService.environments[activeEnvTab].abcGTM}
                        onChange={(e) => handleEnvironmentChange(activeEnvTab, 'abcGTM', e.target.value)}
                        placeholder="e.g., abc-gtm-value"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    {/* firewallProfile */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        Firewall Profile
                      </label>
                      <input
                        type="text"
                        value={currentService.environments[activeEnvTab].firewallProfile}
                        onChange={(e) => handleEnvironmentChange(activeEnvTab, 'firewallProfile', e.target.value)}
                        placeholder="e.g., production"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    {/* Zones */}
                    <div className="pt-3 border-t border-gray-300 dark:border-slate-600">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-sm font-bold text-gray-900 dark:text-white">
                          Zones ({currentService.environments[activeEnvTab].zones.length})
                        </h5>
                        <button
                          onClick={() => handleAddZone(activeEnvTab)}
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Plus size={14} />
                          Add Zone
                        </button>
                      </div>

                      {currentService.environments[activeEnvTab].zones.length === 0 ? (
                        <div className="text-center py-6 bg-white dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400">No zones added yet</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {currentService.environments[activeEnvTab].zones.map((zone, zoneIndex) => (
                            <div
                              key={zoneIndex}
                              className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg p-3"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h6 className="text-xs font-bold text-gray-900 dark:text-white">Zone {zoneIndex + 1}</h6>
                                <button
                                  onClick={() => handleRemoveZone(activeEnvTab, zoneIndex)}
                                  className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                {/* ZoneName - EXACT JSON FIELD */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Zone Name
                                  </label>
                                  <input
                                    type="text"
                                    value={zone.ZoneName || ''}
                                    onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'ZoneName', e.target.value)}
                                    placeholder="Zone A"
                                    className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  />
                                </div>

                                {/* vipName - EXACT JSON FIELD */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    VIP Name
                                  </label>
                                  <input
                                    type="text"
                                    value={zone.vipName || ''}
                                    onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipName', e.target.value)}
                                    placeholder="allowdatadevsample.com"
                                    className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  />
                                </div>

                                {/* vipIP - EXACT JSON FIELD */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    VIP IP
                                  </label>
                                  <input
                                    type="text"
                                    value={zone.vipIP || ''}
                                    onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipIP', e.target.value)}
                                    placeholder="10.7.78.100"
                                    className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  />
                                </div>

                                {/* f5Device - EXACT JSON FIELD (array) */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    F5 Device
                                  </label>
                                  <input
                                    type="text"
                                    value={Array.isArray(zone.f5Device) ? zone.f5Device.join(', ') : ''}
                                    onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'f5Device', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                                    placeholder="device1, device2"
                                    className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  />
                                </div>

                                {/* firewall - EXACT JSON FIELD */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Firewall
                                  </label>
                                  <input
                                    type="text"
                                    value={zone.firewall || ''}
                                    onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'firewall', e.target.value)}
                                    placeholder=""
                                    className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  />
                                </div>

                                {/* count - EXACT JSON FIELD */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Count
                                  </label>
                                  <input
                                    type="text"
                                    value={zone.count || ''}
                                    onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'count', e.target.value)}
                                    placeholder=""
                                    className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  />
                                </div>

                                {/* cpu - EXACT JSON FIELD */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    CPU
                                  </label>
                                  <input
                                    type="text"
                                    value={zone.cpu || ''}
                                    onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'cpu', e.target.value)}
                                    placeholder=""
                                    className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  />
                                </div>

                                {/* memory - EXACT JSON FIELD */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                    Memory
                                  </label>
                                  <input
                                    type="text"
                                    value={zone.memory || ''}
                                    onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'memory', e.target.value)}
                                    placeholder=""
                                    className="w-full px-2 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add Another Service Button */}
                <button
                  onClick={handleAddService}
                  className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <Plus size={16} />
                  Add Another Service
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Review & Submit
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Review your application details before submitting
              </p>

              <div className="space-y-4">
                {/* Application Summary */}
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-200 dark:border-teal-700 rounded-xl p-4">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Application Summary</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Platform</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{formData.platform}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Application ID</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{formData.aimId}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Application Name</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{formData.applicationName}</p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">✓</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{formData.projects.length} Projects</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">✓</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{formData.services.length} Services</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">✓</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formData.services.reduce((total, s) => 
                        total + Object.values(s.environments).filter(e => e.GTM || e.zones.length > 0).length, 0
                      )} Envs
                    </p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">✓</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formData.services.reduce((total, s) => 
                        total + Object.values(s.environments).reduce((envTotal, e) => envTotal + e.zones.length, 0), 0
                      )} Zones
                    </p>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Detailed Breakdown</h4>
                  
                  {formData.projects.map((project, pIndex) => {
                    const projectServices = formData.services.filter(s => s.projectName === project.name);
                    if (projectServices.length === 0) return null;

                    return (
                      <div key={pIndex} className="mb-4 last:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900/30 rounded flex items-center justify-center text-teal-600 dark:text-teal-400 text-xs font-bold">
                            {pIndex + 1}
                          </div>
                          <h5 className="text-sm font-bold text-gray-900 dark:text-white">{project.name}</h5>
                        </div>

                        <div className="ml-8 space-y-2">
                          {projectServices.map((service, sIndex) => (
                            <div key={sIndex} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2">
                              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                                {service.serviceName}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {service.applicationDomain} • {service.hostingPlatform} • 
                                {' '}{Object.values(service.environments).filter(e => e.GTM || e.zones.length > 0).length} envs •
                                {' '}{Object.values(service.environments).reduce((total, e) => total + e.zones.length, 0)} zones
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER with Navigation Buttons */}
        <div className="border-t border-gray-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900 flex items-center justify-between rounded-b-xl">
          <button
            onClick={() => {
              if (currentStep > 1) setCurrentStep(prev => prev - 1);
            }}
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
            
            {currentStep === 2 && (
              <button
                onClick={handleStep2Next}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-all"
              >
                Next →
              </button>
            )}

            {currentStep === 3 && (
              <button
                onClick={handleStep3Next}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-all"
              >
                Review →
              </button>
            )}

            {currentStep === 4 && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    ✓ Submit
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

