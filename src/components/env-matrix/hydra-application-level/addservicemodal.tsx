// // src/components/env-matrix/hydra-application-level/addservicemodal.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Application, Service, Zone } from '@/types';
// import { X, Plus, Loader2 } from 'lucide-react';

// interface AddServiceModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   projectName: string;
//   projectIndex: number;
//   application: Application;
//   onSuccess: (newService: Service) => void;
// }

// interface FormData {
//   serviceName: string;
//   applicationDomain: string;
//   hostingPlatform: string;
//   environments: {
//     [key: string]: { environmentName: string; GTM: string; namehydra: string; abcGTM: string; firewallProfile: string; zones: Zone[] };
//   };
// }

// export default function AddServiceModal({
//   isOpen,
//   onClose,
//   projectName,
//   projectIndex,
//   application,
//   onSuccess,
// }: AddServiceModalProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState<FormData>({
//     serviceName: '',
//     applicationDomain: '',
//     hostingPlatform: 'Hydra',
//     environments: {},
//   });
//   const [activeEnvTab, setActiveEnvTab] = useState<string>('');

//   useEffect(() => {
//     if (isOpen) {
//       setCurrentStep(1);
//       setFormData({
//         serviceName: '',
//         applicationDomain: '',
//         hostingPlatform: 'Hydra',
//         environments: {},
//       });
//       setActiveEnvTab('');
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleStep1Next = () => {
//     if (!formData.serviceName.trim() || !formData.applicationDomain.trim()) {
//       alert('Please fill in all required fields');
//       return;
//     }
//     setCurrentStep(2);
//   };

//   const handleAddEnvironment = () => {
//     const envKey = `env_${Object.keys(formData.environments).length}`;
//     setFormData(prev => ({
//       ...prev,
//       environments: {
//         ...prev.environments,
//         [envKey]: {
//           environmentName: '',
//           GTM: '',
//           namehydra: '',
//           abcGTM: '',
//           firewallProfile: '',
//           zones: [],
//         },
//       },
//     }));
//     setActiveEnvTab(envKey);
//   };

//   const handleEnvironmentChange = (envKey: string, field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       environments: {
//         ...prev.environments,
//         [envKey]: {
//           ...prev.environments[envKey],
//           [field]: value,
//         },
//       },
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
//       environments: {
//         ...prev.environments,
//         [envKey]: {
//           ...prev.environments[envKey],
//           zones: [...prev.environments[envKey].zones, newZone],
//         },
//       },
//     }));
//   };

//   const handleZoneChange = (envKey: string, zoneIndex: number, field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       environments: {
//         ...prev.environments,
//         [envKey]: {
//           ...prev.environments[envKey],
//           zones: prev.environments[envKey].zones.map((z, zi) =>
//             zi === zoneIndex ? { ...z, [field]: value } : z
//           ),
//         },
//       },
//     }));
//   };

//   const handleStep2Next = () => {
//     if (Object.keys(formData.environments).length === 0 || 
//         Object.values(formData.environments).some((env: any) => !env.environmentName.trim())) {
//       alert('Please add at least one environment with a name');
//       return;
//     }
//     setCurrentStep(3);
//   };

//   const handleSubmit = () => {
//     const newService: Service = {
//       serviceName: formData.serviceName,
//       applicationDomain: formData.applicationDomain,
//       hostingPlatform: formData.hostingPlatform,
//       environments: Object.values(formData.environments).map((env: any) => ({
//         environmentName: env.environmentName,
//         GTM: env.GTM,
//         namehydra: env.namehydra,
//         abcGTM: env.abcGTM,
//         firewallProfile: env.firewallProfile || '',
//         Zones: env.zones,
//         metadata: {},
//       })),
//       metadata: {},
//     };

//     // Return data to parent - NO API CALL
//     onSuccess(newService);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
//       <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full mx-4 my-8">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-t-xl">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Service</h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Step {currentStep} of 3 • Project: {projectName}</p>
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
//           {/* Step 1: Service Details */}
//           {currentStep === 1 && (
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Service Details</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                     Service Name *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Payment API"
//                     value={formData.serviceName}
//                     onChange={(e) => setFormData(prev => ({ ...prev, serviceName: e.target.value }))}
//                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                     Application Domain *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., api.payment.com"
//                     value={formData.applicationDomain}
//                     onChange={(e) => setFormData(prev => ({ ...prev, applicationDomain: e.target.value }))}
//                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                     Hosting Platform
//                   </label>
//                   <select
//                     value={formData.hostingPlatform}
//                     onChange={(e) => setFormData(prev => ({ ...prev, hostingPlatform: e.target.value }))}
//                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option>Hydra</option>
//                     <option>AWS</option>
//                     <option>Azure</option>
//                     <option>GCP</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Environments */}
//           {currentStep === 2 && (
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Add Environments</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add one or more environments</p>

//               {/* Environment Tabs */}
//               <div className="mb-4 flex gap-2 flex-wrap">
//                 {Object.entries(formData.environments).map(([envKey, env]: [string, any]) => (
//                   <button
//                     key={envKey}
//                     onClick={() => setActiveEnvTab(envKey)}
//                     className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
//                       activeEnvTab === envKey
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {env.environmentName || `Env ${Object.keys(formData.environments).indexOf(envKey) + 1}`}
//                   </button>
//                 ))}
//                 <button
//                   onClick={handleAddEnvironment}
//                   className="px-4 py-2 rounded-lg font-semibold text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all flex items-center gap-1"
//                 >
//                   <Plus size={16} />
//                   Add Env
//                 </button>
//               </div>

//               {/* Active Environment Form */}
//               {activeEnvTab && formData.environments[activeEnvTab] && (
//                 <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg space-y-3">
//                   <input
//                     type="text"
//                     placeholder="Environment Name (e.g., Development, Staging, Production)"
//                     value={formData.environments[activeEnvTab].environmentName}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'environmentName', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                   />
//                   <input
//                     type="text"
//                     placeholder="GTM"
//                     value={formData.environments[activeEnvTab].GTM}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'GTM', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Name Hydra"
//                     value={formData.environments[activeEnvTab].namehydra}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'namehydra', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                   />
//                   <input
//                     type="text"
//                     placeholder="ABC GTM"
//                     value={formData.environments[activeEnvTab].abcGTM}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'abcGTM', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Firewall Profile"
//                     value={formData.environments[activeEnvTab].firewallProfile}
//                     onChange={(e) => handleEnvironmentChange(activeEnvTab, 'firewallProfile', e.target.value)}
//                     className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                   />

//                   {/* Zones Section */}
//                   <div className="mt-4 pt-4 border-t border-gray-300 dark:border-slate-600">
//                     <div className="flex items-center justify-between mb-3">
//                       <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Zones</h4>
//                       <button
//                         onClick={() => handleAddZone(activeEnvTab)}
//                         className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1"
//                       >
//                         <Plus size={12} />
//                         Add Zone
//                       </button>
//                     </div>

//                     {formData.environments[activeEnvTab].zones.map((zone, zoneIndex) => (
//                       <div key={zoneIndex} className="bg-white dark:bg-slate-900 p-3 rounded mb-2 border border-gray-200 dark:border-slate-700">
//                         <div className="grid grid-cols-2 gap-2">
//                           <input
//                             type="text"
//                             placeholder="Zone Name"
//                             value={zone.ZoneName}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'ZoneName', e.target.value)}
//                             className="col-span-2 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="VIP Name"
//                             value={zone.vipName}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipName', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="VIP IP"
//                             value={zone.vipIP}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipIP', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="F5 Devices (comma-separated)"
//                             value={zone.f5Device?.join(', ') || ''}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'f5Device', e.target.value)}
//                             className="col-span-2 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="Firewall"
//                             value={zone.firewall}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'firewall', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="Count"
//                             value={zone.count}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'count', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="CPU"
//                             value={zone.cpu}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'cpu', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           />
//                           <input
//                             type="text"
//                             placeholder="Memory"
//                             value={zone.memory}
//                             onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'memory', e.target.value)}
//                             className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Step 3: Review */}
//           {currentStep === 3 && (
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Review & Submit</h3>
              
//               <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-4">
//                 <h4 className="font-bold text-gray-900 dark:text-white mb-3">⚡ {formData.serviceName}</h4>
//                 <div className="space-y-2 text-sm">
//                   <p className="text-gray-600 dark:text-gray-400">
//                     <span className="font-semibold">Domain:</span> {formData.applicationDomain}
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     <span className="font-semibold">Platform:</span> {formData.hostingPlatform}
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     <span className="font-semibold">Environments:</span> {Object.keys(formData.environments).length}
//                   </p>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     <span className="font-semibold">Zones:</span> {Object.values(formData.environments).reduce((sum: number, env: any) => sum + env.zones.length, 0)}
//                   </p>
//                 </div>
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

//             {currentStep < 3 && (
//               <button
//                 onClick={() => currentStep === 1 ? handleStep1Next() : handleStep2Next()}
//                 className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all"
//               >
//                 Next →
//               </button>
//             )}

//             {currentStep === 3 && (
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
import { Service, Zone } from '@/types';
import { X, Plus } from 'lucide-react';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectIndex: number;
  onSuccess: (newService: Service) => void;
}

interface FormData {
  serviceName: string;
  applicationDomain: string;
  hostingPlatform: string;
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
}

export default function AddServiceModal({
  isOpen,
  onClose,
  projectName,
  projectIndex,
  onSuccess,
}: AddServiceModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceName: '',
    applicationDomain: '',
    hostingPlatform: 'Hydra',
    environments: {},
  });

  const [activeEnvTab, setActiveEnvTab] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        serviceName: '',
        applicationDomain: '',
        hostingPlatform: 'Hydra',
        environments: {},
      });
      setActiveEnvTab('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleServiceChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStep1Next = () => {
    if (!formData.serviceName.trim() || !formData.applicationDomain.trim()) {
      alert('Please fill in all service details');
      return;
    }
    setCurrentStep(2);
  };

  const handleAddEnvironment = () => {
    const envKey = `env_${Object.keys(formData.environments).length}`;
    
    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [envKey]: {
          environmentName: '',
          GTM: '',
          namehydra: '',
          abcGTM: '',
          firewallProfile: '',
          zones: [],
        },
      },
    }));
    setActiveEnvTab(envKey);
  };

  const handleEnvironmentChange = (envKey: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [envKey]: {
          ...prev.environments[envKey],
          [field]: value,
        },
      },
    }));
  };

  const handleRemoveEnvironment = (envKey: string) => {
    setFormData(prev => ({
      ...prev,
      environments: Object.fromEntries(
        Object.entries(prev.environments).filter(([key]) => key !== envKey)
      ),
    }));
    setActiveEnvTab('');
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
      environments: {
        ...prev.environments,
        [envKey]: {
          ...prev.environments[envKey],
          zones: [...prev.environments[envKey].zones, newZone],
        },
      },
    }));
  };

  const handleZoneChange = (envKey: string, zoneIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [envKey]: {
          ...prev.environments[envKey],
          zones: prev.environments[envKey].zones.map((z, zi) =>
            zi === zoneIndex ? { ...z, [field]: value } : z
          ),
        },
      },
    }));
  };

  const handleRemoveZone = (envKey: string, zoneIndex: number) => {
    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [envKey]: {
          ...prev.environments[envKey],
          zones: prev.environments[envKey].zones.filter((_, zi) => zi !== zoneIndex),
        },
      },
    }));
  };

  const handleStep2Next = () => {
    if (Object.keys(formData.environments).length === 0 || 
        Object.values(formData.environments).some((env: any) => !env.environmentName.trim())) {
      alert('Please add at least one environment with a name');
      return;
    }
    setCurrentStep(3);
  };

  const handleSubmit = () => {
    const newService: Service = {
      serviceName: formData.serviceName,
      applicationDomain: formData.applicationDomain,
      hostingPlatform: formData.hostingPlatform,
      environments: Object.values(formData.environments).map((env: any) => ({
        environmentName: env.environmentName,
        GTM: env.GTM,
        namehydra: env.namehydra,
        abcGTM: env.abcGTM,
        firewallProfile: env.firewallProfile || '',
        Zones: env.zones,
        metadata: {},
      })),
      metadata: {},
    };

    onSuccess(newService);
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const currentEnvironments = formData.environments || {};

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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Service</h2>
              <p className="text-slate-400 text-sm mt-0.5">Follow the steps below to create a new service</p>
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
              { num: 1, label: 'Service' },
              { num: 2, label: 'Environments' },
              { num: 3, label: 'Review' },
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
                {index < 2 && (
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
          {/* Step 1: Service Details */}
          {currentStep === 1 && (
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Service Configuration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Project: <span className="font-semibold">{projectName}</span>
              </p>

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
                      value={formData.serviceName}
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
                      value={formData.applicationDomain}
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
                      value={formData.hostingPlatform}
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
            </div>
          )}

          {/* Step 2: Environments */}
          {currentStep === 2 && (
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Environment Configuration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Service: <span className="font-semibold">{formData.serviceName}</span>
              </p>

              <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4">
                <div className="flex border-b-2 border-gray-300 dark:border-slate-600 mb-4">
                  {Object.entries(currentEnvironments).map(([envKey, env]: [string, any], index) => (
                    <button
                      key={envKey}
                      onClick={() => setActiveEnvTab(envKey)}
                      className={`px-4 py-2.5 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                        activeEnvTab === envKey
                          ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                          : 'border-transparent text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {env.environmentName || `Env ${index + 1}`}
                      {activeEnvTab === envKey && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveEnvironment(envKey);
                          }}
                          className="hover:text-red-600"
                        >
                          <X size={14} />
                        </button>
                      )}
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
                        <div key={zoneIndex} className="bg-white dark:bg-slate-700 p-3 rounded mb-2 border border-gray-200 dark:border-slate-600 flex items-start gap-2">
                          <div className="flex-1 grid grid-cols-2 gap-2">
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
                          </div>
                          <button
                            onClick={() => handleRemoveZone(activeEnvTab, zoneIndex)}
                            className="mt-1 p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Review & Submit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Review your service details before submitting</p>
              
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-200 dark:border-teal-700 rounded-xl p-4">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Service Summary</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Service:</span> {formData.serviceName}</p>
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Domain:</span> {formData.applicationDomain}</p>
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Platform:</span> {formData.hostingPlatform}</p>
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Environments:</span> {Object.keys(formData.environments).length}</p>
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Total Zones:</span> {Object.values(formData.environments).reduce((sum, e: any) => sum + e.zones.length, 0)}</p>
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

            {currentStep < 3 && (
              <button
                onClick={() => {
                  if (currentStep === 1) handleStep1Next();
                  else if (currentStep === 2) handleStep2Next();
                }}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-all"
              >
                Next →
              </button>
            )}

            {currentStep === 3 && (
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
