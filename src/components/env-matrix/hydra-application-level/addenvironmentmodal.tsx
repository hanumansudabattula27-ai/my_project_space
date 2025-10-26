// // src/components/env-matrix/hydra-application-level/addenvironmentmodal.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Application, Environment, Zone } from '@/types';
// import { X, Plus, Loader2 } from 'lucide-react';

// interface AddEnvironmentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   serviceName: string;
//   projectIndex: number;
//   serviceIndex: number;
//   application: Application;
//   onSuccess: (newEnvironment: Environment) => void;
// }

// interface FormData {
//   environmentName: string;
//   GTM: string;
//   namehydra: string;
//   abcGTM: string;
//   firewallProfile: string;
//   zones: Zone[];
// }

// export default function AddEnvironmentModal({
//   isOpen,
//   onClose,
//   serviceName,
//   projectIndex,
//   serviceIndex,
//   application,
//   onSuccess,
// }: AddEnvironmentModalProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState<FormData>({
//     environmentName: '',
//     GTM: '',
//     namehydra: '',
//     abcGTM: '',
//     firewallProfile: '',
//     zones: [],
//   });

//   useEffect(() => {
//     if (isOpen) {
//       setCurrentStep(1);
//       setFormData({
//         environmentName: '',
//         GTM: '',
//         namehydra: '',
//         abcGTM: '',
//         firewallProfile: '',
//         zones: [],
//       });
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleStep1Next = () => {
//     if (!formData.environmentName.trim()) {
//       alert('Please fill in environment name');
//       return;
//     }
//     setCurrentStep(2);
//   };

//   const handleAddZone = () => {
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
//       zones: [...prev.zones, newZone],
//     }));
//   };

//   const handleZoneChange = (zoneIndex: number, field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       zones: prev.zones.map((z, zi) =>
//         zi === zoneIndex ? { ...z, [field]: value } : z
//       ),
//     }));
//   };

//   const handleRemoveZone = (zoneIndex: number) => {
//     setFormData(prev => ({
//       ...prev,
//       zones: prev.zones.filter((_, zi) => zi !== zoneIndex),
//     }));
//   };

//   const handleSubmit = () => {
//     const newEnvironment: Environment = {
//       environmentName: formData.environmentName,
//       GTM: formData.GTM,
//       namehydra: formData.namehydra,
//       abcGTM: formData.abcGTM,
//       firewallProfile: formData.firewallProfile || '',
//       Zones: formData.zones,
//       metadata: {},
//     };

//     // Return data to parent - NO API CALL
//     onSuccess(newEnvironment);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
//       <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full mx-4 my-8">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-t-xl">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Environment</h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Step {currentStep} of 2 • Service: {serviceName}</p>
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
//           {/* Step 1: Environment Details */}
//           {currentStep === 1 && (
//             <div>
//               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Environment Details</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                     Environment Name *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Development, Staging, Production"
//                     value={formData.environmentName}
//                     onChange={(e) => setFormData(prev => ({ ...prev, environmentName: e.target.value }))}
//                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">GTM</label>
//                   <input
//                     type="text"
//                     placeholder="e.g., payment.app.dev.com"
//                     value={formData.GTM}
//                     onChange={(e) => setFormData(prev => ({ ...prev, GTM: e.target.value }))}
//                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name Hydra</label>
//                   <input
//                     type="text"
//                     placeholder="e.g., allowpaymenthydra.com"
//                     value={formData.namehydra}
//                     onChange={(e) => setFormData(prev => ({ ...prev, namehydra: e.target.value }))}
//                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ABC GTM</label>
//                   <input
//                     type="text"
//                     placeholder="e.g., abc-gtm-value"
//                     value={formData.abcGTM}
//                     onChange={(e) => setFormData(prev => ({ ...prev, abcGTM: e.target.value }))}
//                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Firewall Profile</label>
//                   <input
//                     type="text"
//                     placeholder="e.g., production"
//                     value={formData.firewallProfile}
//                     onChange={(e) => setFormData(prev => ({ ...prev, firewallProfile: e.target.value }))}
//                     className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Zones */}
//           {currentStep === 2 && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add Zones</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add one or more zones for this environment</p>
//                 </div>
//                 <button
//                   onClick={handleAddZone}
//                   className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2"
//                 >
//                   <Plus size={16} />
//                   Add Zone
//                 </button>
//               </div>

//               {formData.zones.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                   <p>No zones added yet. Click "Add Zone" to get started.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {formData.zones.map((zone, zoneIndex) => (
//                     <div key={zoneIndex} className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
//                       <div className="flex items-center justify-between mb-3">
//                         <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Zone {zoneIndex + 1}</h4>
//                         <button
//                           onClick={() => handleRemoveZone(zoneIndex)}
//                           className="text-red-600 hover:text-red-700 text-sm font-semibold"
//                         >
//                           Remove
//                         </button>
//                       </div>

//                       <div className="grid grid-cols-2 gap-3">
//                         <input
//                           type="text"
//                           placeholder="Zone Name"
//                           value={zone.ZoneName}
//                           onChange={(e) => handleZoneChange(zoneIndex, 'ZoneName', e.target.value)}
//                           className="col-span-2 px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                         />
//                         <input
//                           type="text"
//                           placeholder="VIP Name"
//                           value={zone.vipName}
//                           onChange={(e) => handleZoneChange(zoneIndex, 'vipName', e.target.value)}
//                           className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                         />
//                         <input
//                           type="text"
//                           placeholder="VIP IP"
//                           value={zone.vipIP}
//                           onChange={(e) => handleZoneChange(zoneIndex, 'vipIP', e.target.value)}
//                           className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                         />
//                         <input
//                           type="text"
//                           placeholder="F5 Devices (comma-separated)"
//                           value={zone.f5Device?.join(', ') || ''}
//                           onChange={(e) => handleZoneChange(zoneIndex, 'f5Device', e.target.value)}
//                           className="col-span-2 px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                         />
//                         <input
//                           type="text"
//                           placeholder="Firewall"
//                           value={zone.firewall}
//                           onChange={(e) => handleZoneChange(zoneIndex, 'firewall', e.target.value)}
//                           className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                         />
//                         <input
//                           type="text"
//                           placeholder="Count"
//                           value={zone.count}
//                           onChange={(e) => handleZoneChange(zoneIndex, 'count', e.target.value)}
//                           className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                         />
//                         <input
//                           type="text"
//                           placeholder="CPU"
//                           value={zone.cpu}
//                           onChange={(e) => handleZoneChange(zoneIndex, 'cpu', e.target.value)}
//                           className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                         />
//                         <input
//                           type="text"
//                           placeholder="Memory"
//                           value={zone.memory}
//                           onChange={(e) => handleZoneChange(zoneIndex, 'memory', e.target.value)}
//                           className="px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
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

//             {currentStep === 1 && (
//               <button
//                 onClick={handleStep1Next}
//                 className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm transition-all"
//               >
//                 Next →
//               </button>
//             )}

//             {currentStep === 2 && (
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
import { Environment, Zone } from '@/types';
import { X, Plus } from 'lucide-react';

interface AddEnvironmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  projectIndex: number;
  serviceIndex: number;
  onSuccess: (newEnvironment: Environment) => void;
}

interface FormData {
  environmentName: string;
  GTM: string;
  namehydra: string;
  abcGTM: string;
  firewallProfile: string;
  zones: Zone[];
}

export default function AddEnvironmentModal({
  isOpen,
  onClose,
  serviceName,
  projectIndex,
  serviceIndex,
  onSuccess,
}: AddEnvironmentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    environmentName: '',
    GTM: '',
    namehydra: '',
    abcGTM: '',
    firewallProfile: '',
    zones: [],
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        environmentName: '',
        GTM: '',
        namehydra: '',
        abcGTM: '',
        firewallProfile: '',
        zones: [],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEnvironmentChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStep1Next = () => {
    if (!formData.environmentName.trim()) {
      alert('Please fill in the environment name');
      return;
    }
    setCurrentStep(2);
  };

  const handleAddZone = () => {
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
      zones: [...prev.zones, newZone],
    }));
  };

  const handleZoneChange = (zoneIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      zones: prev.zones.map((z, zi) =>
        zi === zoneIndex ? { ...z, [field]: value } : z
      ),
    }));
  };

  const handleRemoveZone = (zoneIndex: number) => {
    setFormData(prev => ({
      ...prev,
      zones: prev.zones.filter((_, zi) => zi !== zoneIndex),
    }));
  };

  const handleSubmit = () => {
    const newEnvironment: Environment = {
      environmentName: formData.environmentName,
      GTM: formData.GTM,
      namehydra: formData.namehydra,
      abcGTM: formData.abcGTM,
      firewallProfile: formData.firewallProfile || '',
      Zones: formData.zones,
      metadata: {},
    };

    onSuccess(newEnvironment);
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Environment</h2>
              <p className="text-slate-400 text-sm mt-0.5">Follow the steps below to create a new environment</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-xl">
            {[
              { num: 1, label: 'Environment' },
              { num: 2, label: 'Zones' },
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
          {/* Step 1: Environment Details */}
          {currentStep === 1 && (
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Environment Configuration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Service: <span className="font-semibold">{serviceName}</span>
              </p>

              <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">
                    Environment Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Production"
                    value={formData.environmentName}
                    onChange={(e) => handleEnvironmentChange('environmentName', e.target.value)}
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
                    value={formData.GTM}
                    onChange={(e) => handleEnvironmentChange('GTM', e.target.value)}
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
                    value={formData.namehydra}
                    onChange={(e) => handleEnvironmentChange('namehydra', e.target.value)}
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
                    value={formData.abcGTM}
                    onChange={(e) => handleEnvironmentChange('abcGTM', e.target.value)}
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
                    value={formData.firewallProfile}
                    onChange={(e) => handleEnvironmentChange('firewallProfile', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Zones */}
          {currentStep === 2 && (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Zone Configuration</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Environment: <span className="font-semibold">{formData.environmentName}</span></p>
                </div>
                <button
                  onClick={handleAddZone}
                  className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Zone
                </button>
              </div>

              {formData.zones.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">No zones added yet.</p>
                  <button
                    onClick={handleAddZone}
                    className="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-teal-500 hover:text-teal-500 transition-colors flex items-center gap-2 text-sm font-semibold justify-center mx-auto"
                  >
                    <Plus size={16} />
                    Add Zone
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.zones.map((zone, zoneIndex) => (
                    <div key={zoneIndex} className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Zone {zoneIndex + 1}</h4>
                        <button
                          onClick={() => handleRemoveZone(zoneIndex)}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">Zone Name</label>
                          <input
                            type="text"
                            placeholder="e.g., Zone-1"
                            value={zone.ZoneName}
                            onChange={(e) => handleZoneChange(zoneIndex, 'ZoneName', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">VIP Name</label>
                          <input
                            type="text"
                            placeholder="e.g., vip-name"
                            value={zone.vipName}
                            onChange={(e) => handleZoneChange(zoneIndex, 'vipName', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">VIP IP</label>
                          <input
                            type="text"
                            placeholder="e.g., 192.168.1.1"
                            value={zone.vipIP}
                            onChange={(e) => handleZoneChange(zoneIndex, 'vipIP', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">F5 Devices (comma separated)</label>
                          <input
                            type="text"
                            placeholder="e.g., f5-device-1, f5-device-2"
                            value={zone.f5Device?.join(', ') || ''}
                            onChange={(e) => handleZoneChange(zoneIndex, 'f5Device', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">Firewall</label>
                          <input
                            type="text"
                            placeholder="e.g., fw-1"
                            value={zone.firewall}
                            onChange={(e) => handleZoneChange(zoneIndex, 'firewall', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">Count</label>
                          <input
                            type="text"
                            placeholder="e.g., 3"
                            value={zone.count}
                            onChange={(e) => handleZoneChange(zoneIndex, 'count', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">CPU</label>
                          <input
                            type="text"
                            placeholder="e.g., 4 cores"
                            value={zone.cpu}
                            onChange={(e) => handleZoneChange(zoneIndex, 'cpu', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-900 dark:text-white mb-1">Memory</label>
                          <input
                            type="text"
                            placeholder="e.g., 8GB"
                            value={zone.memory}
                            onChange={(e) => handleZoneChange(zoneIndex, 'memory', e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Review & Submit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Review your environment details before submitting</p>
              
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-200 dark:border-teal-700 rounded-xl p-4">
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">Environment Summary</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Environment:</span> {formData.environmentName}</p>
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Zones:</span> {formData.zones.length}</p>
                  <p className="text-gray-600 dark:text-gray-400"><span className="font-semibold">Firewall Profile:</span> {formData.firewallProfile || 'N/A'}</p>
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
                  else if (currentStep === 2) setCurrentStep(3);
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