// // // src/components/env-matrix/CardGridView.tsx
// // 'use client';

// // import { Application, Zone } from '@/types';
// // import { FilterState } from './simplefilter';
// // import { Server, Cpu, HardDrive, MapPin, Globe, Activity } from 'lucide-react';

// // interface CardGridViewProps {
// //   application: Application;
// //   filters: FilterState;
// //   onZoneClick: (zone: Zone, context: { project: string; service: string; env: string }) => void;
// //   theme: any;
// //   isDark: boolean;
// // }

// // interface FlatZone extends Zone {
// //   projectName: string;
// //   serviceName: string;
// //   environmentName: string;
// //   serviceDomain: string;
// //   hostingPlatform: string;
// // }

// // export default function CardGridView({
// //   application,
// //   filters,
// //   onZoneClick,
// //   theme,
// //   isDark,
// // }: CardGridViewProps) {
// //   // Flatten zones with context
// //   const flattenZones = (): FlatZone[] => {
// //     const zones: FlatZone[] = [];

// //     application.Projects?.forEach(project => {
// //       project.services?.forEach(service => {
// //         service.environments?.forEach(env => {
// //           env.Zones?.forEach(zone => {
// //             zones.push({
// //               ...zone,
// //               projectName: project.project,
// //               serviceName: service.serviceName,
// //               environmentName: env.environmentName,
// //               serviceDomain: service.applicationDomain,
// //               hostingPlatform: service.hostingPlatform,
// //             });
// //           });
// //         });
// //       });
// //     });

// //     return zones;
// //   };

// //   // Apply filters
// //   const applyFilters = (zones: FlatZone[]): FlatZone[] => {
// //     return zones.filter(zone => {
// //       // Search filter
// //       if (filters.searchQuery) {
// //         const searchLower = filters.searchQuery.toLowerCase();
// //         const searchableText = `
// //           ${zone.ZoneName} 
// //           ${zone.vipName} 
// //           ${zone.vipIP} 
// //           ${zone.projectName} 
// //           ${zone.serviceName} 
// //           ${zone.environmentName}
// //           ${zone.metadata?.datacenter || ''}
// //         `.toLowerCase();
        
// //         if (!searchableText.includes(searchLower)) return false;
// //       }

// //       // Environment filter
// //       if (filters.environments.length > 0) {
// //         if (!filters.environments.includes(zone.environmentName)) return false;
// //       }

// //       // Project filter
// //       if (filters.projectNames.length > 0) {
// //         if (!filters.projectNames.includes(zone.projectName)) return false;
// //       }

// //       // Service filter
// //       if (filters.serviceNames.length > 0) {
// //         if (!filters.serviceNames.includes(zone.serviceName)) return false;
// //       }

// //       // Datacenter filter
// //       if (filters.datacenter.length > 0) {
// //         if (!zone.metadata?.datacenter || !filters.datacenter.includes(zone.metadata.datacenter as string)) {
// //           return false;
// //         }
// //       }

// //       return true;
// //     });
// //   };

// //   // Check if zone should be highlighted
// //   const shouldHighlight = (zone: FlatZone): boolean => {
// //     const { cpuThreshold, memoryThreshold } = filters.highlightCriteria;
    
// //     if (cpuThreshold && zone.cpu) {
// //       const cpuValue = parseInt(zone.cpu);
// //       if (cpuValue >= cpuThreshold) return true;
// //     }

// //     if (memoryThreshold && zone.memory) {
// //       const memoryValue = parseInt(zone.memory.replace(/[^0-9]/g, ''));
// //       if (memoryValue >= memoryThreshold) return true;
// //     }

// //     return false;
// //   };

// //   const allZones = flattenZones();
// //   const filteredZones = applyFilters(allZones);

// //   const getEnvColor = (envName: string) => {
// //     if (envName.includes('E1')) return isDark ? 'from-green-900/30 to-green-800/30' : 'from-green-100 to-green-200';
// //     if (envName.includes('E2')) return isDark ? 'from-yellow-900/30 to-yellow-800/30' : 'from-yellow-100 to-yellow-200';
// //     if (envName.includes('E3')) return isDark ? 'from-red-900/30 to-red-800/30' : 'from-red-100 to-red-200';
// //     return isDark ? 'from-blue-900/30 to-blue-800/30' : 'from-blue-100 to-blue-200';
// //   };

// //   const getEnvBadgeColor = (envName: string) => {
// //     if (envName.includes('E1')) return isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-600 text-white';
// //     if (envName.includes('E2')) return isDark ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-600 text-white';
// //     if (envName.includes('E3')) return isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-600 text-white';
// //     return isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-600 text-white';
// //   };

// //   return (
// //     <div>
// //       {/* Summary */}
// //       <div className="mb-6 flex items-center justify-between">
// //         <div>
// //           <h3 className={`text-xl font-bold ${theme.text}`}>
// //             Zone Cards
// //           </h3>
// //           <p className={`text-sm ${theme.textSecondary} mt-1`}>
// //             Showing {filteredZones.length} of {allZones.length} zones
// //           </p>
// //         </div>

// //         {/* View Options */}
// //         <div className="flex items-center gap-2">
// //           <span className={`text-sm ${theme.textSecondary}`}>Sort by:</span>
// //           <select className={`px-3 py-1.5 ${theme.input} rounded-lg border text-sm`}>
// //             <option>Zone Name</option>
// //             <option>Environment</option>
// //             <option>CPU (High to Low)</option>
// //             <option>Memory (High to Low)</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* Cards Grid */}
// //       {filteredZones.length === 0 ? (
// //         <div className={`${theme.card} border rounded-2xl p-12 text-center`}>
// //           <p className={`text-lg font-semibold ${theme.text} mb-2`}>No zones found</p>
// //           <p className={`text-sm ${theme.textSecondary}`}>
// //             Try adjusting your filters to see more results
// //           </p>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //           {filteredZones.map((zone, index) => {
// //             const highlighted = shouldHighlight(zone);
            
// //             return (
// //               <div
// //                 key={index}
// //                 onClick={() => onZoneClick(zone, {
// //                   project: zone.projectName,
// //                   service: zone.serviceName,
// //                   env: zone.environmentName,
// //                 })}
// //                 className={`${theme.card} border-2 rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl ${
// //                   highlighted
// //                     ? isDark
// //                       ? 'border-yellow-500 shadow-lg shadow-yellow-500/20'
// //                       : 'border-yellow-400 shadow-lg shadow-yellow-400/20'
// //                     : 'border-transparent'
// //                 }`}
// //               >
// //                 {/* Card Header with Gradient */}
// //                 <div className={`bg-gradient-to-br ${getEnvColor(zone.environmentName)} p-4`}>
// //                   <div className="flex items-center justify-between mb-3">
// //                     <div className="flex items-center gap-2">
// //                       <Server size={20} className={isDark ? 'text-white' : 'text-gray-700'} />
// //                       <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
// //                         {zone.ZoneName}
// //                       </h4>
// //                     </div>
// //                     <span className={`px-2 py-1 rounded-full text-xs font-bold ${getEnvBadgeColor(zone.environmentName)}`}>
// //                       {zone.environmentName}
// //                     </span>
// //                   </div>

// //                   {/* Project & Service */}
// //                   <div className="space-y-1">
// //                     <p className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
// //                       {zone.projectName}
// //                     </p>
// //                     <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
// //                       {zone.serviceName}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 {/* Card Body */}
// //                 <div className="p-4 space-y-3">
// //                   {/* VIP Info */}
// //                   <div>
// //                     <div className="flex items-center gap-2 mb-1">
// //                       <Globe size={14} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
// //                       <span className={`text-xs font-semibold ${theme.textSecondary}`}>VIP</span>
// //                     </div>
// //                     <p className={`text-sm font-mono ${theme.text} truncate`}>{zone.vipName}</p>
// //                     <p className={`text-xs font-mono ${theme.textSecondary}`}>{zone.vipIP}</p>
// //                   </div>

// //                   {/* Resources */}
// //                   <div className="grid grid-cols-2 gap-3">
// //                     <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
// //                       <div className="flex items-center gap-2 mb-1">
// //                         <Cpu size={14} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
// //                         <span className={`text-xs ${theme.textSecondary}`}>CPU</span>
// //                       </div>
// //                       <p className={`text-lg font-bold ${theme.text}`}>{zone.cpu || 'N/A'}</p>
// //                     </div>

// //                     <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
// //                       <div className="flex items-center gap-2 mb-1">
// //                         <HardDrive size={14} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
// //                         <span className={`text-xs ${theme.textSecondary}`}>RAM</span>
// //                       </div>
// //                       <p className={`text-lg font-bold ${theme.text}`}>{zone.memory || 'N/A'}</p>
// //                     </div>
// //                   </div>

// //                   {/* Additional Info */}
// //                   <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-slate-700">
// //                     {zone.count && (
// //                       <div className="flex items-center justify-between">
// //                         <span className={`text-xs ${theme.textSecondary}`}>Count:</span>
// //                         <span className={`text-xs font-semibold ${theme.text}`}>{zone.count}</span>
// //                       </div>
// //                     )}
                    
// //                     {zone.metadata?.datacenter && (
// //                       <div className="flex items-center gap-2">
// //                         <MapPin size={12} className={theme.textSecondary} />
// //                         <span className={`text-xs ${theme.textSecondary}`}>{zone.metadata.datacenter}</span>
// //                       </div>
// //                     )}

// //                     {zone.hostingPlatform && (
// //                       <div className="flex items-center gap-2">
// //                         <Activity size={12} className={theme.textSecondary} />
// //                         <span className={`text-xs ${theme.textSecondary}`}>{zone.hostingPlatform}</span>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Highlight Badge */}
// //                   {highlighted && (
// //                     <div className={`mt-3 px-3 py-2 rounded-lg text-center ${
// //                       isDark ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
// //                     }`}>
// //                       <span className="text-xs font-bold">⭐ Highlighted</span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* F5 Devices (if any) */}
// //                 {zone.f5Device && zone.f5Device.length > 0 && (
// //                   <div className={`px-4 pb-4`}>
// //                     <p className={`text-xs font-semibold ${theme.textSecondary} mb-2`}>F5 Devices:</p>
// //                     <div className="flex flex-wrap gap-1">
// //                       {zone.f5Device.map((device, idx) => (
// //                         <span
// //                           key={idx}
// //                           className={`px-2 py-1 rounded text-xs ${
// //                             isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-700'
// //                           }`}
// //                         >
// //                           {device}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }









// // src/components/ui/Toast.tsx
// 'use client';

// import { useEffect } from 'react';
// import { X, CheckCircle, AlertCircle } from 'lucide-react';

// interface ToastProps {
//   message: string;
//   type: 'success' | 'error';
//   onClose: () => void;
//   duration?: number;
// }

// export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
//   useEffect(() => {
//     if (type === 'success') {
//       const timer = setTimeout(onClose, duration);
//       return () => clearTimeout(timer);
//     }
//   }, [duration, onClose, type]);

//   return (
//     <div className="fixed top-4 right-4 z-[60] animate-slide-in">
//       <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl min-w-[300px] ${
//         type === 'success'
//           ? 'bg-green-600 text-white'
//           : 'bg-red-600 text-white'
//       }`}>
//         {type === 'success' ? (
//           <CheckCircle size={24} />
//         ) : (
//           <AlertCircle size={24} />
//         )}
//         <p className="font-semibold flex-1">{message}</p>
//         <button
//           onClick={onClose}
//           className="p-1 hover:bg-white/20 rounded transition-colors"
//         >
//           <X size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }





//  Add Better Validation Before Submit

// const handleSubmit = async () => {
//   // Validate that at least one service has data
//   const hasValidService = formData.services.some(service => {
//     const hasEnvData = Object.values(service.environments).some(
//       env => env.GTM || env.zones.length > 0
//     );
//     return service.serviceName && service.applicationDomain && hasEnvData;
//   });

//   if (!hasValidService) {
//     setToast({ 
//       message: 'At least one service must have a name, domain, and environment data', 
//       type: 'error' 
//     });
//     return;
//   }

//   setIsSubmitting(true);

//   // ... rest of submit code
// };



// 4. Add Tailwind Animation for Toast
// // tailwind.config.ts - Add to theme.extend
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         'slide-in': {
//           '0%': { transform: 'translateX(100%)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },
//       },
//       animation: {
//         'slide-in': 'slide-in 0.3s ease-out',
//       },
//     },
//   },
// };