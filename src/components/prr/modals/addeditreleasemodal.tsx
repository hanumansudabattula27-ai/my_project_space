// // src/components/prr/AddEditPRRReleaseModal.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';
// import { X, Plus, Trash2 } from 'lucide-react';
// import { getTheme } from '@/lib/prr/theme';
// import { PRRApplication } from '@/types/prr/type';

// interface AddEditPRRReleaseModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (data: PRRApplication) => Promise<void>;
//   initialData?: PRRApplication;
//   mode: 'add' | 'edit';
// }

// const TABS = [
//   { id: 1, label: 'Basic Info', icon: '📋' },
//   { id: 2, label: 'Feature & Design', icon: '⚙️' },
//   { id: 3, label: 'Platform Config', icon: '🔧' },
//   { id: 4, label: 'Deployment & GTM', icon: '🚀' },
//   { id: 5, label: 'Observability', icon: '📊' },
//   { id: 6, label: 'Testing', icon: '✅' },
//   { id: 7, label: 'Onboarding', icon: '📝' },
//   { id: 8, label: 'Documentation', icon: '📚' },
//   { id: 9, label: 'Approvals', icon: '✓' },
// ];

// export default function AddEditPRRReleaseModal({
//   isOpen,
//   onClose,
//   onSave,
//   initialData,
//   mode,
// }: AddEditPRRReleaseModalProps) {
//   const { resolvedTheme } = useTheme();
//   const isDark = resolvedTheme === 'dark';
//   const theme = getTheme(isDark);

//   const [currentTab, setCurrentTab] = useState(1);
//   const [isSaving, setIsSaving] = useState(false);

//   const [formData, setFormData] = useState<Partial<PRRApplication>>(
//     initialData || {
//       aimId: '',
//       basicInformation: {
//         platform: '',
//         projectName: '',
//         status: '',
//         releaseDate: '',
//       },
//       featureAndDesignDetails: {
//         featureDetails: '',
//         apiDesign: '',
//         apiEndpoints: [],
//         flowDiagram: '',
//         toggleFeatures: { value: '' },
//         gitHubRepo: '',
//       },
//       platformConfiguration: {
//         glooHsm: { type: '', color: '' },
//         numberOfZones: { value: '', color: '' },
//         consumers: [],
//       },
//       deploymentAndGTMConfiguration: {
//         gtmStatus: '',
//         healthCheckURL: '',
//       },
//       observabilityAndMonitoring: {
//         dashboardLinks: {
//           environment: '',
//           platforms: [],
//         },
//         alertsConfigured: { status: '', details: '' },
//       },
//       testingReadiness: {
//         regressionTesting: { status: '', comments: '' },
//         performanceTesting: { status: '', comments: '' },
//         chaosFailoverTesting: { status: '', comments: '' },
//       },
//       onboardingAndIntegrations: {
//         fvaasOnboarding: { status: '', link: '' },
//         eidDashboardOnboarding: { status: '', link: '' },
//         dartOnboarding: { status: '', link: '' },
//         resilienceToolOnboarding: { status: '', link: '' },
//         netAppMapperOnboarding: { status: '', link: '' },
//       },
//       documentation: {
//         status: '',
//         content: '',
//         sreDocumentation: '',
//       },
//       approvalsAndSignOff: {
//         sreReviewer: { name: '', date: '', comments: '' },
//         qaLead: { name: '', date: '', comments: '' },
//         productOwner: { name: '', date: '', comments: '' },
//         engineeringOwner: { name: '', date: '', comments: '' },
//       },
//     }
//   );

//   useEffect(() => {
//     if (isOpen) {
//       setCurrentTab(1);
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleInputChange = (path: string, value: any) => {
//     setFormData((prev) => {
//       const keys = path.split('.');
//       let current: any = { ...prev };
//       let target = current;

//       for (let i = 0; i < keys.length - 1; i++) {
//         if (typeof target[keys[i]] === 'object' && !Array.isArray(target[keys[i]])) {
//           target[keys[i]] = { ...target[keys[i]] };
//         }
//         target = target[keys[i]];
//       }

//       target[keys[keys.length - 1]] = value;
//       return current;
//     });
//   };

//   const handleAddItem = (path: string, item: any) => {
//     const keys = path.split('.');
//     let current: any = formData;

//     for (let i = 0; i < keys.length; i++) {
//       current = current[keys[i]];
//     }

//     if (Array.isArray(current)) {
//       handleInputChange(path, [...current, item]);
//     }
//   };

//   const handleRemoveItem = (path: string, index: number) => {
//     const keys = path.split('.');
//     let current: any = formData;

//     for (let i = 0; i < keys.length; i++) {
//       current = current[keys[i]];
//     }

//     if (Array.isArray(current)) {
//       handleInputChange(path, current.filter((_: any, i: number) => i !== index));
//     }
//   };

//   const handleSave = async () => {
//     try {
//       setIsSaving(true);
//       await onSave(formData as PRRApplication);
//       onClose();
//     } catch (error) {
//       console.error('Error saving:', error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className={`fixed inset-0 ${theme.modal.overlay} flex items-center justify-center z-50 p-4`}>
//       <div className={`${theme.modal.background} rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col`}>
//         {/* Header */}
//         <div className={`border-b ${theme.modal.border} p-6 flex justify-between items-center`}>
//           <div>
//             <h2 className={`text-2xl font-bold ${theme.text.primary}`}>
//               {mode === 'add' ? 'Create New Release' : 'Edit Release'}
//             </h2>
//             <p className={`text-sm ${theme.text.secondary} mt-1`}>Tab {currentTab} of 9</p>
//           </div>
//           <button
//             onClick={onClose}
//             className={`p-1 rounded-lg ${theme.card.hover}`}
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Tab Navigation */}
//         <div className={`border-b ${theme.modal.border} overflow-x-auto`}>
//           <div className="flex">
//             {TABS.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setCurrentTab(tab.id)}
//                 className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap text-sm font-medium transition-colors relative ${
//                   currentTab === tab.id
//                     ? theme.text.primary
//                     : `${theme.text.secondary}`
//                 }`}
//               >
//                 <span>{tab.icon}</span>
//                 <span className="hidden sm:inline">{tab.label}</span>
//                 {currentTab === tab.id && (
//                   <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.progressBar.fill}`}></div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {currentTab === 1 && (
//             <div className="space-y-4">
//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Platform *</label>
//                 <select
//                   value={formData.basicInformation?.platform || ''}
//                   onChange={(e) => handleInputChange('basicInformation.platform', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 >
//                   <option value="">Select Platform</option>
//                   <option value="Hydra">Hydra</option>
//                   <option value="AWS">AWS</option>
//                   <option value="GCP">GCP</option>
//                   <option value="TIMS">TIMS</option>
//                   <option value="One Dato">One Dato</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Project/Service Name *</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., payment-service"
//                   value={formData.basicInformation?.projectName || ''}
//                   onChange={(e) => handleInputChange('basicInformation.projectName', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 />
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Status *</label>
//                 <select
//                   value={formData.basicInformation?.status || ''}
//                   onChange={(e) => handleInputChange('basicInformation.status', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="LIVE">LIVE</option>
//                   <option value="NON-LIVE">NON-LIVE</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Release Date *</label>
//                 <input
//                   type="date"
//                   value={formData.basicInformation?.releaseDate || ''}
//                   onChange={(e) => handleInputChange('basicInformation.releaseDate', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 />
//               </div>
//             </div>
//           )}

//           {currentTab === 2 && (
//             <div className="space-y-4">
//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Feature Details</label>
//                 <textarea
//                   placeholder="Feature description..."
//                   value={formData.featureAndDesignDetails?.featureDetails || ''}
//                   onChange={(e) => handleInputChange('featureAndDesignDetails.featureDetails', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus} h-20`}
//                 />
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>API Design</label>
//                 <input
//                   type="text"
//                   placeholder="API design details..."
//                   value={formData.featureAndDesignDetails?.apiDesign || ''}
//                   onChange={(e) => handleInputChange('featureAndDesignDetails.apiDesign', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 />
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>API Endpoints</label>
//                 <div className="space-y-2">
//                   {(formData.featureAndDesignDetails?.apiEndpoints || []).map((endpoint, idx) => (
//                     <div key={idx} className="flex gap-2">
//                       <input
//                         type="text"
//                         value={endpoint}
//                         onChange={(e) => {
//                           const updated = [...(formData.featureAndDesignDetails?.apiEndpoints || [])];
//                           updated[idx] = e.target.value;
//                           handleInputChange('featureAndDesignDetails.apiEndpoints', updated);
//                         }}
//                         className={`flex-1 px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                       />
//                       <button
//                         onClick={() => handleRemoveItem('featureAndDesignDetails.apiEndpoints', idx)}
//                         className={`p-2 rounded ${theme.error.background}`}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => handleAddItem('featureAndDesignDetails.apiEndpoints', '')}
//                     className={`flex items-center gap-2 px-4 py-2 border border-dashed rounded ${theme.button.secondary}`}
//                   >
//                     <Plus className="w-4 h-4" /> Add Endpoint
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Flow Diagram</label>
//                 <input
//                   type="text"
//                   placeholder="Flow diagram link..."
//                   value={formData.featureAndDesignDetails?.flowDiagram || ''}
//                   onChange={(e) => handleInputChange('featureAndDesignDetails.flowDiagram', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 />
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>GitHub Repo</label>
//                 <input
//                   type="text"
//                   placeholder="GitHub repository link..."
//                   value={formData.featureAndDesignDetails?.gitHubRepo || ''}
//                   onChange={(e) => handleInputChange('featureAndDesignDetails.gitHubRepo', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 />
//               </div>
//             </div>
//           )}

//           {currentTab === 3 && (
//             <div className="space-y-4">
//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>GLOO/HSM</label>
//                 <select
//                   value={formData.platformConfiguration?.glooHsm?.type || ''}
//                   onChange={(e) => {
//                     const type = e.target.value;
//                     const color = type === 'GLOO' ? 'red' : type === 'HSM' ? 'green' : '';
//                     handleInputChange('platformConfiguration.glooHsm', { type, color });
//                   }}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 >
//                   <option value="">Select Type</option>
//                   <option value="GLOO">GLOO</option>
//                   <option value="HSM">HSM</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Number of Zones</label>
//                 <input
//                   type="number"
//                   value={formData.platformConfiguration?.numberOfZones?.value || ''}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     const numValue = parseInt(value || '0');
//                     const color = numValue < 6 ? 'red' : numValue >= 6 ? 'green' : '';
//                     handleInputChange('platformConfiguration.numberOfZones', { value, color });
//                   }}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 />
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Consumers</label>
//                 <div className="space-y-2">
//                   {(formData.platformConfiguration?.consumers || []).map((consumer, idx) => (
//                     <div key={idx} className="flex gap-2">
//                       <input
//                         type="text"
//                         value={consumer}
//                         onChange={(e) => {
//                           const updated = [...(formData.platformConfiguration?.consumers || [])];
//                           updated[idx] = e.target.value;
//                           handleInputChange('platformConfiguration.consumers', updated);
//                         }}
//                         className={`flex-1 px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                       />
//                       <button
//                         onClick={() => handleRemoveItem('platformConfiguration.consumers', idx)}
//                         className={`p-2 rounded ${theme.error.background}`}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     onClick={() => handleAddItem('platformConfiguration.consumers', '')}
//                     className={`flex items-center gap-2 px-4 py-2 border border-dashed rounded ${theme.button.secondary}`}
//                   >
//                     <Plus className="w-4 h-4" /> Add Consumer
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {currentTab === 4 && (
//             <div className="space-y-4">
//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>GTM Status</label>
//                 <select
//                   value={formData.deploymentAndGTMConfiguration?.gtmStatus || ''}
//                   onChange={(e) => handleInputChange('deploymentAndGTMConfiguration.gtmStatus', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 >
//                   <option value="">Select GTM Status</option>
//                   <option value="Topology">Topology</option>
//                   <option value="Round Robin">Round Robin</option>
//                   <option value="Ratio">Ratio</option>
//                   <option value="Not Applicable">Not Applicable</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Health Check URL</label>
//                 <input
//                   type="text"
//                   placeholder="https://api.example.com/health"
//                   value={formData.deploymentAndGTMConfiguration?.healthCheckURL || ''}
//                   onChange={(e) => handleInputChange('deploymentAndGTMConfiguration.healthCheckURL', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 />
//               </div>
//             </div>
//           )}

//           {currentTab === 5 && (
//             <div className="space-y-4">
//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Environment</label>
//                 <input
//                   type="text"
//                   placeholder="E1, E2, E3"
//                   value={formData.observabilityAndMonitoring?.dashboardLinks?.environment || ''}
//                   onChange={(e) => handleInputChange('observabilityAndMonitoring.dashboardLinks.environment', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 />
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Alerts Configured</label>
//                 <select
//                   value={formData.observabilityAndMonitoring?.alertsConfigured?.status || ''}
//                   onChange={(e) => handleInputChange('observabilityAndMonitoring.alertsConfigured.status', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 >
//                   <option value="">Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Alert Details</label>
//                 <input
//                   type="text"
//                   placeholder="Email, Slack, PagerDuty..."
//                   value={formData.observabilityAndMonitoring?.alertsConfigured?.details || ''}
//                   onChange={(e) => handleInputChange('observabilityAndMonitoring.alertsConfigured.details', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 />
//               </div>
//             </div>
//           )}

//           {currentTab === 6 && (
//             <div className="space-y-4">
//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Regression Testing</label>
//                 <select
//                   value={formData.testingReadiness?.regressionTesting?.status || ''}
//                   onChange={(e) => handleInputChange('testingReadiness.regressionTesting.status', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pass">Pass</option>
//                   <option value="Fail">Fail</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Performance Testing</label>
//                 <select
//                   value={formData.testingReadiness?.performanceTesting?.status || ''}
//                   onChange={(e) => handleInputChange('testingReadiness.performanceTesting.status', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pass">Pass</option>
//                   <option value="Fail">Fail</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Chaos/Failover Testing</label>
//                 <select
//                   value={formData.testingReadiness?.chaosFailoverTesting?.status || ''}
//                   onChange={(e) => handleInputChange('testingReadiness.chaosFailoverTesting.status', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pass">Pass</option>
//                   <option value="Fail">Fail</option>
//                 </select>
//               </div>
//             </div>
//           )}

//           {currentTab === 7 && (
//             <div className="space-y-4">
//               {['fvaasOnboarding', 'eidDashboardOnboarding', 'dartOnboarding', 'resilienceToolOnboarding', 'netAppMapperOnboarding'].map((field) => (
//                 <div key={field}>
//                   <label className={`block text-sm font-semibold ${theme.text.primary} mb-2 capitalize`}>
//                     {field.replace('Onboarding', '')}
//                   </label>
//                   <div className="space-y-2">
//                     <select
//                       value={(formData.onboardingAndIntegrations as any)?.[field]?.status || ''}
//                       onChange={(e) => handleInputChange(`onboardingAndIntegrations.${field}.status`, e.target.value)}
//                       className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                     >
//                       <option value="">Select</option>
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                     </select>
//                     <input
//                       type="text"
//                       placeholder="Link or reference..."
//                       value={(formData.onboardingAndIntegrations as any)?.[field]?.link || ''}
//                       onChange={(e) => handleInputChange(`onboardingAndIntegrations.${field}.link`, e.target.value)}
//                       className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {currentTab === 8 && (
//             <div className="space-y-4">
//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Documentation Status</label>
//                 <select
//                   value={formData.documentation?.status || ''}
//                   onChange={(e) => handleInputChange('documentation.status', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                 >
//                   <option value="">Select</option>
//                   <option value="Complete">Complete</option>
//                   <option value="Incomplete">Incomplete</option>
//                 </select>
//               </div>

//               <div>
//                 <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>SRE Documentation</label>
//                 <textarea
//                   placeholder="Runbooks and operational guides..."
//                   value={formData.documentation?.sreDocumentation || ''}
//                   onChange={(e) => handleInputChange('documentation.sreDocumentation', e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus} h-24`}
//                 />
//               </div>
//             </div>
//           )}

//           {currentTab === 9 && (
//             <div className="space-y-4">
//               {['sreReviewer', 'qaLead', 'productOwner', 'engineeringOwner'].map((field) => (
//                 <div key={field} className={`p-4 border rounded-lg ${theme.card.background}`}>
//                   <label className={`block text-sm font-semibold ${theme.text.primary} mb-3 capitalize`}>
//                     {field.replace(/([A-Z])/g, ' $1')}
//                   </label>
//                   <div className="grid grid-cols-2 gap-3 mb-3">
//                     <input
//                       type="text"
//                       placeholder="Name"
//                       value={(formData.approvalsAndSignOff as any)?.[field]?.name || ''}
//                       onChange={(e) => handleInputChange(`approvalsAndSignOff.${field}.name`, e.target.value)}
//                       className={`px-3 py-2 border rounded text-sm ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                     />
//                     <input
//                       type="date"
//                       value={(formData.approvalsAndSignOff as any)?.[field]?.date || ''}
//                       onChange={(e) => handleInputChange(`approvalsAndSignOff.${field}.date`, e.target.value)}
//                       className={`px-3 py-2 border rounded text-sm ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
//                     />
//                   </div>
//                   <textarea
//                     placeholder="Comments..."
//                     value={(formData.approvalsAndSignOff as any)?.[field]?.comments || ''}
//                     onChange={(e) => handleInputChange(`approvalsAndSignOff.${field}.comments`, e.target.value)}
//                     className={`w-full px-3 py-2 border rounded text-sm ${theme.input.background} ${theme.input.border} ${theme.input.focus} h-12`}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className={`border-t ${theme.modal.border} p-6 flex justify-between items-center`}>
//           <button
//             onClick={onClose}
//             className={`px-6 py-2 border ${theme.card.border} rounded-lg font-semibold ${theme.text.primary} ${theme.card.hover}`}
//           >
//             Cancel
//           </button>

//           <div className="flex gap-3">
//             <button
//               onClick={() => setCurrentTab(Math.max(1, currentTab - 1))}
//               disabled={currentTab === 1}
//               className={`px-6 py-2 border ${theme.card.border} rounded-lg font-semibold ${
//                 currentTab === 1 ? 'opacity-50 cursor-not-allowed' : theme.card.hover
//               } ${theme.text.primary}`}
//             >
//               ◄ Previous
//             </button>

//             {currentTab === 9 ? (
//               <button
//                 onClick={handleSave}
//                 disabled={isSaving}
//                 className={`px-6 py-2 ${theme.button.primary} rounded-lg font-semibold ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 {isSaving ? 'Saving...' : mode === 'add' ? 'Create Release' : 'Update Release'}
//               </button>
//             ) : (
//               <button
//                 onClick={() => setCurrentTab(Math.min(9, currentTab + 1))}
//                 className={`px-6 py-2 ${theme.button.primary} rounded-lg font-semibold`}
//               >
//                 Next ►
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/prr/AddEditPRRReleaseModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { X, Plus, Trash2 } from 'lucide-react';
import { getTheme } from '@/lib/prr/theme';
import { PRRApplication } from '@/types/prr/type';

interface AddEditPRRReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PRRApplication) => Promise<void>;
  initialData?: PRRApplication;
  mode: 'add' | 'edit';
}

const TABS = [
  { id: 1, label: 'Basic Info', icon: '📋' },
  { id: 2, label: 'Feature & Design', icon: '⚙️' },
  { id: 3, label: 'Platform Config', icon: '🔧' },
  { id: 4, label: 'Deployment & GTM', icon: '🚀' },
  { id: 5, label: 'Observability', icon: '📊' },
  { id: 6, label: 'Testing', icon: '✅' },
  { id: 7, label: 'Onboarding', icon: '📝' },
  { id: 8, label: 'Documentation', icon: '📚' },
  { id: 9, label: 'Approvals', icon: '✓' },
];

const DEFAULT_FORM_DATA: Partial<PRRApplication> = {
  aimId: '',
  basicInformation: {
    platform: 'Hydra',
    projectName: '',
    status: 'LIVE',
    releaseDate: '',
  },
  featureAndDesignDetails: {
    featureDetails: '',
    apiDesign: '',
    apiEndpoints: [],
    flowDiagram: '',
    toggleFeatures: { value: '' },
    gitHubRepo: '',
  },
  platformConfiguration: {
    glooHsm: { type: '', color: '' },
    numberOfZones: { value: '', color: '' },
    consumers: [],
  },
  deploymentAndGTMConfiguration: {
    gtmStatus: '',
    healthCheckURL: '',
  },
  observabilityAndMonitoring: {
    dashboardLinks: {
      environment: '',
      platforms: [],
    },
    alertsConfigured: { status: '', details: '' },
  },
  testingReadiness: {
    regressionTesting: { status: '', comments: '' },
    performanceTesting: { status: '', comments: '' },
    chaosFailoverTesting: { status: '', comments: '' },
  },
  onboardingAndIntegrations: {
    fvaasOnboarding: { status: '', link: '' },
    eidDashboardOnboarding: { status: '', link: '' },
    dartOnboarding: { status: '', link: '' },
    resilienceToolOnboarding: { status: '', link: '' },
    netAppMapperOnboarding: { status: '', link: '' },
  },
  documentation: {
    status: '',
    content: '',
    sreDocumentation: '',
  },
  approvalsAndSignOff: {
    sreReviewer: { name: '', date: '', comments: '' },
    qaLead: { name: '', date: '', comments: '' },
    productOwner: { name: '', date: '', comments: '' },
    engineeringOwner: { name: '', date: '', comments: '' },
  },
};

export default function AddEditPRRReleaseModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}: AddEditPRRReleaseModalProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const theme = getTheme(isDark);

  const [currentTab, setCurrentTab] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<PRRApplication>>(
    initialData || DEFAULT_FORM_DATA
  );

  useEffect(() => {
    if (isOpen) {
      setCurrentTab(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (path: string, value: any) => {
    setFormData((prev) => {
      const keys = path.split('.');
      let current: any = { ...prev };
      let target = current;

      for (let i = 0; i < keys.length - 1; i++) {
        if (typeof target[keys[i]] === 'object' && !Array.isArray(target[keys[i]])) {
          target[keys[i]] = { ...target[keys[i]] };
        }
        target = target[keys[i]];
      }

      target[keys[keys.length - 1]] = value;
      return current;
    });
  };

  const handleAddItem = (path: string, item: any) => {
    const keys = path.split('.');
    let current: any = formData;

    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }

    if (Array.isArray(current)) {
      handleInputChange(path, [...current, item]);
    }
  };

  const handleRemoveItem = (path: string, index: number) => {
    const keys = path.split('.');
    let current: any = formData;

    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }

    if (Array.isArray(current)) {
      handleInputChange(path, current.filter((_: any, i: number) => i !== index));
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(formData as PRRApplication);
      onClose();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`fixed inset-0 ${theme.modal.overlay} flex items-center justify-center z-50 p-4`}>
      <div className={`${theme.modal.background} rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col`}>
        {/* Header */}
        <div className={`border-b ${theme.modal.border} p-6 flex justify-between items-center`}>
          <div>
            <h2 className={`text-2xl font-bold ${theme.text.primary}`}>
              {mode === 'add' ? 'Create New Release' : 'Edit Release'}
            </h2>
            <p className={`text-sm ${theme.text.secondary} mt-1`}>Tab {currentTab} of 9</p>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg ${theme.card.hover}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className={`border-b ${theme.modal.border} overflow-x-auto`}>
          <div className="flex">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap text-sm font-medium transition-colors relative ${
                  currentTab === tab.id
                    ? theme.text.primary
                    : `${theme.text.secondary}`
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                {currentTab === tab.id && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.progressBar.fill}`}></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentTab === 1 && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Platform *</label>
                <select
                  value={formData.basicInformation?.platform || ''}
                  onChange={(e) => handleInputChange('basicInformation.platform', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                >
                  <option value="">Select Platform</option>
                  <option value="Hydra">Hydra</option>
                  <option value="AWS">AWS</option>
                  <option value="GCP">GCP</option>
                  <option value="TIMS">TIMS</option>
                  <option value="One Dato">One Dato</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Project/Service Name *</label>
                <input
                  type="text"
                  placeholder="e.g., payment-service"
                  value={formData.basicInformation?.projectName || ''}
                  onChange={(e) => handleInputChange('basicInformation.projectName', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Status *</label>
                <select
                  value={formData.basicInformation?.status || ''}
                  onChange={(e) => handleInputChange('basicInformation.status', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                >
                  <option value="">Select Status</option>
                  <option value="LIVE">LIVE</option>
                  <option value="NON-LIVE">NON-LIVE</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Release Date *</label>
                <input
                  type="date"
                  value={formData.basicInformation?.releaseDate || ''}
                  onChange={(e) => handleInputChange('basicInformation.releaseDate', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                />
              </div>
            </div>
          )}

          {currentTab === 2 && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Feature Details</label>
                <textarea
                  placeholder="Feature description..."
                  value={formData.featureAndDesignDetails?.featureDetails || ''}
                  onChange={(e) => handleInputChange('featureAndDesignDetails.featureDetails', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus} h-20`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>API Design</label>
                <input
                  type="text"
                  placeholder="API design details..."
                  value={formData.featureAndDesignDetails?.apiDesign || ''}
                  onChange={(e) => handleInputChange('featureAndDesignDetails.apiDesign', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>API Endpoints</label>
                <div className="space-y-2">
                  {(formData.featureAndDesignDetails?.apiEndpoints || []).map((endpoint, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={endpoint}
                        onChange={(e) => {
                          const updated = [...(formData.featureAndDesignDetails?.apiEndpoints || [])];
                          updated[idx] = e.target.value;
                          handleInputChange('featureAndDesignDetails.apiEndpoints', updated);
                        }}
                        className={`flex-1 px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                      />
                      <button
                        onClick={() => handleRemoveItem('featureAndDesignDetails.apiEndpoints', idx)}
                        className={`p-2 rounded ${theme.error.background}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddItem('featureAndDesignDetails.apiEndpoints', '')}
                    className={`flex items-center gap-2 px-4 py-2 border border-dashed rounded ${theme.button.secondary}`}
                  >
                    <Plus className="w-4 h-4" /> Add Endpoint
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Flow Diagram</label>
                <input
                  type="text"
                  placeholder="Flow diagram link..."
                  value={formData.featureAndDesignDetails?.flowDiagram || ''}
                  onChange={(e) => handleInputChange('featureAndDesignDetails.flowDiagram', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>GitHub Repo</label>
                <input
                  type="text"
                  placeholder="GitHub repository link..."
                  value={formData.featureAndDesignDetails?.gitHubRepo || ''}
                  onChange={(e) => handleInputChange('featureAndDesignDetails.gitHubRepo', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                />
              </div>
            </div>
          )}

          {currentTab === 3 && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>GLOO/HSM</label>
                <select
                  value={formData.platformConfiguration?.glooHsm?.type || ''}
                  onChange={(e) => {
                    const type = e.target.value;
                    const color = type === 'GLOO' ? 'red' : type === 'HSM' ? 'green' : '';
                    handleInputChange('platformConfiguration.glooHsm', { type, color });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                >
                  <option value="">Select Type</option>
                  <option value="GLOO">GLOO</option>
                  <option value="HSM">HSM</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Number of Zones</label>
                <input
                  type="number"
                  value={formData.platformConfiguration?.numberOfZones?.value || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numValue = parseInt(value || '0');
                    const color = numValue < 6 ? 'red' : numValue >= 6 ? 'green' : '';
                    handleInputChange('platformConfiguration.numberOfZones', { value, color });
                  }}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Consumers</label>
                <div className="space-y-2">
                  {(formData.platformConfiguration?.consumers || []).map((consumer, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={consumer}
                        onChange={(e) => {
                          const updated = [...(formData.platformConfiguration?.consumers || [])];
                          updated[idx] = e.target.value;
                          handleInputChange('platformConfiguration.consumers', updated);
                        }}
                        className={`flex-1 px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                      />
                      <button
                        onClick={() => handleRemoveItem('platformConfiguration.consumers', idx)}
                        className={`p-2 rounded ${theme.error.background}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddItem('platformConfiguration.consumers', '')}
                    className={`flex items-center gap-2 px-4 py-2 border border-dashed rounded ${theme.button.secondary}`}
                  >
                    <Plus className="w-4 h-4" /> Add Consumer
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentTab === 4 && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>GTM Status</label>
                <select
                  value={formData.deploymentAndGTMConfiguration?.gtmStatus || ''}
                  onChange={(e) => handleInputChange('deploymentAndGTMConfiguration.gtmStatus', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                >
                  <option value="">Select GTM Status</option>
                  <option value="Topology">Topology</option>
                  <option value="Round Robin">Round Robin</option>
                  <option value="Ratio">Ratio</option>
                  <option value="Not Applicable">Not Applicable</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Health Check URL</label>
                <input
                  type="text"
                  placeholder="https://api.example.com/health"
                  value={formData.deploymentAndGTMConfiguration?.healthCheckURL || ''}
                  onChange={(e) => handleInputChange('deploymentAndGTMConfiguration.healthCheckURL', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                />
              </div>
            </div>
          )}

          {currentTab === 5 && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Environment</label>
                <input
                  type="text"
                  placeholder="E1, E2, E3"
                  value={formData.observabilityAndMonitoring?.dashboardLinks?.environment || ''}
                  onChange={(e) => handleInputChange('observabilityAndMonitoring.dashboardLinks.environment', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Alerts Configured</label>
                <select
                  value={formData.observabilityAndMonitoring?.alertsConfigured?.status || ''}
                  onChange={(e) => handleInputChange('observabilityAndMonitoring.alertsConfigured.status', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Alert Details</label>
                <input
                  type="text"
                  placeholder="Email, Slack, PagerDuty..."
                  value={formData.observabilityAndMonitoring?.alertsConfigured?.details || ''}
                  onChange={(e) => handleInputChange('observabilityAndMonitoring.alertsConfigured.details', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                />
              </div>
            </div>
          )}

          {currentTab === 6 && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Regression Testing</label>
                <select
                  value={formData.testingReadiness?.regressionTesting?.status || ''}
                  onChange={(e) => handleInputChange('testingReadiness.regressionTesting.status', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                >
                  <option value="">Select Status</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Performance Testing</label>
                <select
                  value={formData.testingReadiness?.performanceTesting?.status || ''}
                  onChange={(e) => handleInputChange('testingReadiness.performanceTesting.status', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                >
                  <option value="">Select Status</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Chaos/Failover Testing</label>
                <select
                  value={formData.testingReadiness?.chaosFailoverTesting?.status || ''}
                  onChange={(e) => handleInputChange('testingReadiness.chaosFailoverTesting.status', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                >
                  <option value="">Select Status</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                </select>
              </div>
            </div>
          )}

          {currentTab === 7 && (
            <div className="space-y-4">
              {['fvaasOnboarding', 'eidDashboardOnboarding', 'dartOnboarding', 'resilienceToolOnboarding', 'netAppMapperOnboarding'].map((field) => (
                <div key={field}>
                  <label className={`block text-sm font-semibold ${theme.text.primary} mb-2 capitalize`}>
                    {field.replace('Onboarding', '')}
                  </label>
                  <div className="space-y-2">
                    <select
                      value={(formData.onboardingAndIntegrations as any)?.[field]?.status || ''}
                      onChange={(e) => handleInputChange(`onboardingAndIntegrations.${field}.status`, e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Link or reference..."
                      value={(formData.onboardingAndIntegrations as any)?.[field]?.link || ''}
                      onChange={(e) => handleInputChange(`onboardingAndIntegrations.${field}.link`, e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentTab === 8 && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>Documentation Status</label>
                <select
                  value={formData.documentation?.status || ''}
                  onChange={(e) => handleInputChange('documentation.status', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                >
                  <option value="">Select</option>
                  <option value="Complete">Complete</option>
                  <option value="Incomplete">Incomplete</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-semibold ${theme.text.primary} mb-2`}>SRE Documentation</label>
                <textarea
                  placeholder="Runbooks and operational guides..."
                  value={formData.documentation?.sreDocumentation || ''}
                  onChange={(e) => handleInputChange('documentation.sreDocumentation', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${theme.input.background} ${theme.input.border} ${theme.input.focus} h-24`}
                />
              </div>
            </div>
          )}

          {currentTab === 9 && (
            <div className="space-y-4">
              {['sreReviewer', 'qaLead', 'productOwner', 'engineeringOwner'].map((field) => (
                <div key={field} className={`p-4 border rounded-lg ${theme.card.background}`}>
                  <label className={`block text-sm font-semibold ${theme.text.primary} mb-3 capitalize`}>
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={(formData.approvalsAndSignOff as any)?.[field]?.name || ''}
                      onChange={(e) => handleInputChange(`approvalsAndSignOff.${field}.name`, e.target.value)}
                      className={`px-3 py-2 border rounded text-sm ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                    />
                    <input
                      type="date"
                      value={(formData.approvalsAndSignOff as any)?.[field]?.date || ''}
                      onChange={(e) => handleInputChange(`approvalsAndSignOff.${field}.date`, e.target.value)}
                      className={`px-3 py-2 border rounded text-sm ${theme.input.background} ${theme.input.border} ${theme.input.focus}`}
                    />
                  </div>
                  <textarea
                    placeholder="Comments..."
                    value={(formData.approvalsAndSignOff as any)?.[field]?.comments || ''}
                    onChange={(e) => handleInputChange(`approvalsAndSignOff.${field}.comments`, e.target.value)}
                    className={`w-full px-3 py-2 border rounded text-sm ${theme.input.background} ${theme.input.border} ${theme.input.focus} h-12`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`border-t ${theme.modal.border} p-6 flex justify-between items-center`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 border ${theme.card.border} rounded-lg font-semibold ${theme.text.primary} ${theme.card.hover}`}
          >
            Cancel
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentTab(Math.max(1, currentTab - 1))}
              disabled={currentTab === 1}
              className={`px-6 py-2 border ${theme.card.border} rounded-lg font-semibold ${
                currentTab === 1 ? 'opacity-50 cursor-not-allowed' : theme.card.hover
              } ${theme.text.primary}`}
            >
              ◄ Previous
            </button>

            {currentTab === 9 ? (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-6 py-2 ${theme.button.primary} rounded-lg font-semibold ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaving ? 'Saving...' : mode === 'add' ? 'Create Release' : 'Update Release'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab(Math.min(9, currentTab + 1))}
                className={`px-6 py-2 ${theme.button.primary} rounded-lg font-semibold`}
              >
                Next ►
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}