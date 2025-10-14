// // src/app/tools/env-matrix/[platform]/[aimId]/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { Application } from '@/types';
// import ApplicationDetailsView from '@/components/env-matrix/hydra-application-level/applicationdetailsview';
// import { ArrowLeft, Edit, Trash2, Save, X } from 'lucide-react';

// export default function ApplicationDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [application, setApplication] = useState<Application | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);

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

//   useEffect(() => {
//     const fetchApplication = async () => {
//       try {
//         const response = await fetch(`/api/env-matrix/applications?platform=${platform}`);
//         const result = await response.json();
        
//         if (result.success) {
//           const app = result.data.find((a: Application) => a.aimId === aimId);
//           if (app) {
//             setApplication(app);
//           } else {
//             console.error('Application not found');
//           }
//         }
//       } catch (error) {
//         console.error('Failed to fetch application:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (mounted) {
//       fetchApplication();
//     }
//   }, [platform, aimId, mounted]);

//   const handleSave = async () => {
//     // TODO: Call backend API to save changes
//     console.log('Saving application:', application);
//     // await fetch(`/api/backend/applications/${aimId}`, {
//     //   method: 'PUT',
//     //   body: JSON.stringify(application)
//     // });
//     setIsEditing(false);
//   };

//   const handleDelete = async () => {
//     if (confirm('Are you sure you want to delete this application?')) {
//       // TODO: Call backend API to delete
//       console.log('Deleting application:', aimId);
//       // await fetch(`/api/backend/applications/${aimId}`, { method: 'DELETE' });
//       router.push(`/tools/env-matrix/${platform}`);
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
//           <p className={theme.textSecondary}>Loading application details...</p>
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

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text}`}>
//       <div className="max-w-7xl mx-auto px-6 py-8 pt-20">
//         {/* Header */}
//         <div className={`${theme.card} border rounded-2xl p-6 mb-8`}>
//           <div className="flex items-center justify-between mb-6">
//             <button
//               onClick={() => router.push(`/tools/env-matrix/${platform}`)}
//               className={`text-sm ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} flex items-center gap-2 font-medium transition-colors`}
//             >
//               <ArrowLeft size={16} />
//               Back to {platform === 'hydra' ? 'Hydra' : 'Non-Hydra'} Applications
//             </button>

//             <div className="flex items-center gap-3">
//               {isEditing ? (
//                 <>
//                   <button
//                     onClick={() => setIsEditing(false)}
//                     className={`px-5 py-2.5 ${theme.card} border-2 rounded-xl text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
//                   >
//                     <X size={18} />
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSave}
//                     className={`px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg`}
//                   >
//                     <Save size={18} />
//                     Save Changes
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className={`px-5 py-2.5 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105`}
//                   >
//                     <Edit size={18} />
//                     Edit
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className={`px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105`}
//                   >
//                     <Trash2 size={18} />
//                     Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Application Header */}
//           <div className="flex items-center gap-6">
//             <div className={`w-20 h-20 ${
//               platform === 'hydra'
//                 ? isDark ? 'bg-gradient-to-br from-teal-600 to-cyan-700' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
//                 : isDark ? 'bg-gradient-to-br from-orange-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-red-600'
//             } rounded-2xl flex items-center justify-center text-4xl shadow-xl`}>
//               {platform === 'hydra' ? '🌐' : '🔧'}
//             </div>
//             <div>
//               <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
//                 {application.applicationName}
//               </h1>
//               <div className="flex items-center gap-4">
//                 <span className={`text-sm ${theme.textSecondary}`}>
//                   ID: <span className="font-mono">{application.aimId}</span>
//                 </span>
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                   isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
//                 }`}>
//                   Active
//                 </span>
//                 {application.updatedAt && (
//                   <span className={`text-sm ${theme.textSecondary}`}>
//                     Updated: {new Date(application.updatedAt).toLocaleDateString()}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Application Details View */}
//         <ApplicationDetailsView
//           application={application}
//           onUpdate={handleApplicationUpdate}
//           isEditing={isEditing}
//           theme={theme}
//           isDark={isDark}
//         />
//       </div>
//     </div>
//   );
// }

// // src/app/tools/env-matrix/[platform]/[aimId]/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { Application, Zone } from '@/types';
// import ApplicationDetailsView from '@/components/env-matrix/hydra-application-level/applicationdetailsview';
// import SmartFilterBar, { FilterState } from '@/components/env-matrix/hydra-application-level/smartfilterbar';
// import CardGridView from '@/components/env-matrix/hydra-application-level/cardgridview';
// import { ArrowLeft, Edit, Trash2, Save, X, LayoutGrid, List } from 'lucide-react';

// type ViewMode = 'tree' | 'cards';

// export default function ApplicationDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [application, setApplication] = useState<Application | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [viewMode, setViewMode] = useState<ViewMode>('tree');
//   const [filters, setFilters] = useState<FilterState>({
//     environments: [],
//     cpuRange: null,
//     memoryRange: null,
//     datacenter: [],
//     projectNames: [],
//     serviceNames: [],
//     highlightCriteria: {},
//     searchQuery: '',
//   });

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

//   useEffect(() => {
//     const fetchApplication = async () => {
//       try {
//         const response = await fetch(`/api/env-matrix/applications?platform=${platform}`);
//         const result = await response.json();
        
//         if (result.success) {
//           const app = result.data.find((a: Application) => a.aimId === aimId);
//           if (app) {
//             setApplication(app);
//           } else {
//             console.error('Application not found');
//           }
//         }
//       } catch (error) {
//         console.error('Failed to fetch application:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (mounted) {
//       fetchApplication();
//     }
//   }, [platform, aimId, mounted]);

//   const handleSave = async () => {
//     console.log('Saving application:', application);
//     setIsEditing(false);
//   };

//   const handleDelete = async () => {
//     if (confirm('Are you sure you want to delete this application?')) {
//       console.log('Deleting application:', aimId);
//       router.push(`/tools/env-matrix/${platform}`);
//     }
//   };

//   const handleApplicationUpdate = (updatedApp: Application) => {
//     setApplication(updatedApp);
//   };

//   const handleFilterChange = (newFilters: FilterState) => {
//     setFilters(newFilters);
//   };

//   const handleZoneClick = (zone: Zone, context: { project: string; service: string; env: string }) => {
//     console.log('Zone clicked:', zone, context);
//     // TODO: Open modal or navigate to zone details
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
//           <p className={theme.textSecondary}>Loading application details...</p>
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

//   return (
//     <div className={`min-h-screen bg-gradient-to-br pt-25 ${theme.background} ${theme.text}`}>
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Header */}
//         <div className={`${theme.card} border rounded-2xl p-6 mb-8`}>
//           <div className="flex items-center justify-between mb-6">
//             <button
//               onClick={() => router.push(`/tools/env-matrix/${platform}`)}
//               className={`text-sm ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} flex items-center gap-2 font-medium transition-colors`}
//             >
//               <ArrowLeft size={16} />
//               Back to {platform === 'hydra' ? 'Hydra' : 'Non-Hydra'} Applications
//             </button>

//             <div className="flex items-center gap-3">
//               {/* View Mode Toggle */}
//               <div className={`flex items-center gap-1 p-1 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
//                 <button
//                   onClick={() => setViewMode('tree')}
//                   className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
//                     viewMode === 'tree'
//                       ? `${theme.accent} text-white shadow-lg`
//                       : `${isDark ? 'text-gray-300 hover:bg-slate-600' : 'text-gray-600 hover:bg-gray-200'}`
//                   }`}
//                 >
//                   <List size={16} />
//                   Tree View
//                 </button>
//                 <button
//                   onClick={() => setViewMode('cards')}
//                   className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
//                     viewMode === 'cards'
//                       ? `${theme.accent} text-white shadow-lg`
//                       : `${isDark ? 'text-gray-300 hover:bg-slate-600' : 'text-gray-600 hover:bg-gray-200'}`
//                   }`}
//                 >
//                   <LayoutGrid size={16} />
//                   Card Grid
//                 </button>
//               </div>

//               {/* Edit/Save/Delete Buttons */}
//               {isEditing ? (
//                 <>
//                   <button
//                     onClick={() => setIsEditing(false)}
//                     className={`px-5 py-2.5 ${theme.card} border-2 rounded-xl text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
//                   >
//                     <X size={18} />
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSave}
//                     className={`px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg`}
//                   >
//                     <Save size={18} />
//                     Save Changes
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className={`px-5 py-2.5 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105`}
//                   >
//                     <Edit size={18} />
//                     Edit
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className={`px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105`}
//                   >
//                     <Trash2 size={18} />
//                     Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Application Header */}
//           <div className="flex items-center gap-6">
//             <div className={`w-20 h-20 ${
//               platform === 'hydra'
//                 ? isDark ? 'bg-gradient-to-br from-teal-600 to-cyan-700' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
//                 : isDark ? 'bg-gradient-to-br from-orange-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-red-600'
//             } rounded-2xl flex items-center justify-center text-4xl shadow-xl`}>
//               {platform === 'hydra' ? '🌐' : '🔧'}
//             </div>
//             <div>
//               <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
//                 {application.applicationName}
//               </h1>
//               <div className="flex items-center gap-4">
//                 <span className={`text-sm ${theme.textSecondary}`}>
//                   ID: <span className="font-mono">{application.aimId}</span>
//                 </span>
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                   isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
//                 }`}>
//                   Active
//                 </span>
//                 {application.updatedAt && (
//                   <span className={`text-sm ${theme.textSecondary}`}>
//                     Updated: {new Date(application.updatedAt).toLocaleDateString()}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Smart Filter Bar */}
//         <SmartFilterBar
//           application={application}
//           onFilterChange={handleFilterChange}
//           theme={theme}
//           isDark={isDark}
//         />

//         {/* Content based on View Mode */}
//         {viewMode === 'tree' ? (
//           <ApplicationDetailsView
//             application={application}
//             onUpdate={handleApplicationUpdate}
//             isEditing={isEditing}
//             theme={theme}
//             isDark={isDark}
//             filters={filters}
//           />
//         ) : (
//           <CardGridView
//             application={application}
//             filters={filters}
//             onZoneClick={handleZoneClick}
//             theme={theme}
//             isDark={isDark}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
















// src/app/tools/env-matrix/[platform]/[aimId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Application } from '@/types';
import ApplicationDetailsView from '@/components/env-matrix/hydra-application-level/applicationdetailsview';
import { ArrowLeft, Edit, Trash2, Save, X, Search, RefreshCw } from 'lucide-react';

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const platform = params.platform as string;
  const aimId = params.aimId as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme === 'dark' || currentTheme === 'dark') : false;

  const theme = isDark ? {
    background: "from-gray-900 via-gray-800 to-indigo-900",
    card: "bg-slate-800 border-slate-600",
    text: "text-white",
    textSecondary: "text-gray-300",
    input: "bg-slate-900 border-slate-600 text-white placeholder-gray-400",
    accent: "bg-teal-600 hover:bg-teal-700",
  } : {
    background: "from-cyan-50 via-teal-50 to-amber-50",
    card: "bg-white border-teal-200 shadow-sm",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    input: "bg-gray-50 border-teal-300 text-gray-900 placeholder-gray-500",
    accent: "bg-teal-600 hover:bg-teal-700",
  };

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/env-matrix/applications?platform=${platform}`);
      const result = await response.json();
      
      if (result.success) {
        const app = result.data.find((a: Application) => a.aimId === aimId);
        if (app) {
          setApplication(app);
        }
      }
    } catch (error) {
      console.error('Failed to fetch application:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchApplication();
    }
  }, [platform, aimId, mounted]);

  const handleSave = async () => {
    try {
      await fetch('/api/env-matrix/applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this application?')) {
      try {
        await fetch(`/api/env-matrix/applications?aimId=${aimId}&platform=${platform}`, {
          method: 'DELETE',
        });
        router.push(`/tools/env-matrix/${platform}`);
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const handleApplicationUpdate = (updatedApp: Application) => {
    setApplication(updatedApp);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={theme.textSecondary}>Loading application...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Application Not Found</h2>
          <button
            onClick={() => router.push(`/tools/env-matrix/${platform}`)}
            className={`px-6 py-3 ${theme.accent} text-white rounded-xl font-semibold`}
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  const totalProjects = application.Projects?.length || 0;
  const totalServices = application.Projects?.reduce((total, proj) => 
    total + (proj.services?.length || 0), 0) || 0;
  const totalEnvironments = application.Projects?.reduce((total, proj) =>
    total + (proj.services?.reduce((sTotal, service) => 
      sTotal + (service.environments?.length || 0), 0) || 0), 0) || 0;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} pt-25`}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        {/* COMPACT HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/tools/env-matrix/${platform}`)}
              className={`text-sm ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} flex items-center gap-2 font-medium transition-colors`}
            >
              <ArrowLeft size={16} />
              Back
            </button>
            
            <div className="h-6 w-px bg-gray-300 dark:bg-slate-600"></div>
            
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${
                platform === 'hydra'
                  ? isDark ? 'bg-gradient-to-br from-teal-600 to-cyan-700' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
                  : isDark ? 'bg-gradient-to-br from-orange-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-red-600'
              } rounded-lg flex items-center justify-center text-xl`}>
                {application.applicationName[0].toUpperCase()}
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme.text}`}>
                  {application.applicationName}
                </h1>
                <p className={`text-xs ${theme.textSecondary}`}>
                  ID: {application.aimId} • {totalProjects} projects • {totalServices} services
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchApplication}
              className={`px-4 py-2 ${theme.card} border rounded-lg text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className={`px-4 py-2 ${theme.card} border rounded-lg text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2`}
                >
                  <Save size={16} />
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className={`px-4 py-2 ${theme.accent} text-white rounded-lg font-semibold flex items-center gap-2 text-sm hover:scale-105 transition-all`}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2 text-sm hover:scale-105 transition-all`}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* COMPACT SEARCH */}
        <div className="mb-6">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={18} />
            <input
              type="text"
              placeholder="Search projects, services, environments, zones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all text-sm`}
            />
          </div>
        </div>

        {/* COMPACT STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className={`${theme.card} border rounded-lg p-4`}>
            <p className={`text-xs font-semibold ${theme.textSecondary} mb-1`}>Projects</p>
            <p className={`text-2xl font-bold ${theme.text}`}>{totalProjects}</p>
          </div>
          <div className={`${theme.card} border rounded-lg p-4`}>
            <p className={`text-xs font-semibold ${theme.textSecondary} mb-1`}>Services</p>
            <p className={`text-2xl font-bold ${theme.text}`}>{totalServices}</p>
          </div>
          <div className={`${theme.card} border rounded-lg p-4`}>
            <p className={`text-xs font-semibold ${theme.textSecondary} mb-1`}>Environments</p>
            <p className={`text-2xl font-bold ${theme.text}`}>{totalEnvironments}</p>
          </div>
          <div className={`${theme.card} border rounded-lg p-4`}>
            <p className={`text-xs font-semibold ${theme.textSecondary} mb-1`}>Status</p>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
              isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
            }`}>
              Active
            </span>
          </div>
        </div>

        {/* APPLICATION CONTENT */}
        <ApplicationDetailsView
          application={application}
          onUpdate={handleApplicationUpdate}
          isEditing={isEditing}
          theme={theme}
          isDark={isDark}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}