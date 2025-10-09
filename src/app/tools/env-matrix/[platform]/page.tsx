// // src/app/tools/env-matrix/[platform]/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { Application } from '@/types';
// import ApplicationCard from '@/components/env-matrix/applicationcard';
// import PlatformDashboardPanel from '@/components/env-matrix/hydra-page-level/platformdashboardpanel';
// import { Search } from 'lucide-react';

// export default function PlatformPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [filteredApps, setFilteredApps] = useState<Application[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedProject, setSelectedProject] = useState<string>('all');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

//   const platform = params.platform as string;

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

//   const fetchApplications = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/env-matrix/applications?platform=${platform}`);
//       const result = await response.json();
      
//       if (result.success) {
//         setApplications(result.data);
//         setFilteredApps(result.data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch applications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (mounted) {
//       fetchApplications();
//     }
//   }, [platform, mounted]);

//   // Filter logic
//   useEffect(() => {
//     let filtered = applications;

//     if (searchQuery) {
//       filtered = filtered.filter(app => 
//         app.applicationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         app.aimId?.toString().includes(searchQuery)
//       );
//     }

//     if (selectedProject !== 'all') {
//       filtered = filtered.filter(app => 
//         app.Projects?.some(project => project.project === selectedProject)
//       );
//     }

//     setFilteredApps(filtered);
//   }, [searchQuery, selectedProject, applications]);

//   // Get unique projects
//   const allProjects = Array.from(
//     new Set(applications.flatMap(app => 
//       app.Projects?.map(project => project.project) || []
//     ))
//   );

//   const handleRefresh = () => {
//     fetchApplications();
//   };

//   const handleNewApplication = () => {
//     console.log('New application clicked');
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
//           <p className={theme.textSecondary}>Loading applications...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text}`}>
//       <div className="max-w-7xl mx-auto px-6 py-8 pt-25">
        
//         {/* Hero Section - Platform Info */}
//         <PlatformDashboardPanel 
//   platform={platform}
//   totalApps={applications.length}
//   theme={theme}
//   isDark={isDark}
//   onRefresh={handleRefresh}
//   onNewApplication={handleNewApplication}
// />

//         {/* Search and Filters */}
//         <div className={`${theme.card} border rounded-2xl p-6 mb-8`}>
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={20} />
//               <input
//                 type="text"
//                 placeholder="Search by name or ID..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`w-full pl-12 pr-4 py-3 ${theme.input} rounded-xl border-2 focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all`}
//               />
//             </div>

//             {/* Project Filter */}
//             <select
//               value={selectedProject}
//               onChange={(e) => setSelectedProject(e.target.value)}
//               className={`px-4 py-3 ${theme.input} rounded-xl border-2 focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all`}
//             >
//               <option value="all">All Projects</option>
//               {allProjects.map(project => (
//                 <option key={project} value={project}>{project}</option>
//               ))}
//             </select>

//             {/* View Mode Toggle */}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`px-4 py-3 rounded-xl font-semibold transition-all ${
//                   viewMode === 'grid' 
//                     ? `${theme.accent} text-white` 
//                     : `${theme.card} ${theme.text} border`
//                 }`}
//               >
//                 Grid
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`px-4 py-3 rounded-xl font-semibold transition-all ${
//                   viewMode === 'list' 
//                     ? `${theme.accent} text-white` 
//                     : `${theme.card} ${theme.text} border`
//                 }`}
//               >
//                 List
//               </button>
//             </div>
//           </div>

//           {/* Active Filters */}
//           {(searchQuery || selectedProject !== 'all') && (
//             <div className="flex items-center gap-2 mt-4">
//               <span className={`text-sm ${theme.textSecondary}`}>Active filters:</span>
//               {searchQuery && (
//                 <span className={`px-3 py-1 ${isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'} rounded-full text-sm font-semibold flex items-center gap-2`}>
//                   Search: {searchQuery}
//                   <button onClick={() => setSearchQuery('')} className="hover:opacity-70">✕</button>
//                 </span>
//               )}
//               {selectedProject !== 'all' && (
//                 <span className={`px-3 py-1 ${isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'} rounded-full text-sm font-semibold flex items-center gap-2`}>
//                   Project: {selectedProject}
//                   <button onClick={() => setSelectedProject('all')} className="hover:opacity-70">✕</button>
//                 </span>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Results Count */}
//         <div className="mb-6">
//           <h2 className={`text-2xl font-bold ${theme.text}`}>
//             Applications
//             <span className={`ml-3 text-lg font-normal ${theme.textSecondary}`}>
//               ({filteredApps.length} {filteredApps.length === 1 ? 'result' : 'results'})
//             </span>
//           </h2>
//         </div>

//         {/* Applications Grid/List */}
//         {filteredApps.length === 0 ? (
//           <div className={`${theme.card} border rounded-2xl p-12 text-center`}>
//             <div className="text-6xl mb-4">🔍</div>
//             <h3 className={`text-xl font-bold ${theme.text} mb-2`}>No applications found</h3>
//             <p className={theme.textSecondary}>Try adjusting your search or filters</p>
//           </div>
//         ) : (
//           <div className={viewMode === 'grid' 
//             ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
//             : 'flex flex-col gap-4'
//           }>
//             {filteredApps.map((app, index) => (
//               <ApplicationCard
//                 key={app.aimId || `app-${index}`}
//                 application={app}
//                 viewMode={viewMode}
//                 theme={theme}
//                 isDark={isDark}
//                 onClick={() => router.push(`/tools/env-matrix/${platform}/${app.aimId}`)}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// // src/app/tools/env-matrix/[platform]/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { Application } from '@/types';
// import AddApplicationModal from '@/components/env-matrix/hydra-application-level/addapplicationmodal';
// import { ArrowLeft, Plus, Search, Filter } from 'lucide-react';

// export default function PlatformApplicationsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [applications, setApplications] = useState<Application[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const platform = params.platform as string;

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

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/env-matrix/applications?platform=${platform}`);
//       const result = await response.json();
      
//       if (result.success) {
//         setApplications(result.data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch applications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (mounted) {
//       fetchApplications();
//     }
//   }, [platform, mounted]);

//   const handleModalSuccess = () => {
//     fetchApplications(); // Refresh applications list
//     setIsModalOpen(false);
//   };

//   const handleApplicationClick = (aimId: string) => {
//     router.push(`/tools/env-matrix/${platform}/${aimId}`);
//   };

//   const filteredApplications = applications.filter(app =>
//     app.applicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     app.aimId.toLowerCase().includes(searchQuery.toLowerCase())
//   );

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
//           <p className={theme.textSecondary}>Loading applications...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text}`}>
//       {/* ADD APPLICATION MODAL */}
//       <AddApplicationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSuccess={handleModalSuccess}
//       />

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Header */}
//         <div className={`${theme.card} border rounded-2xl p-6 mb-8`}>
//           <div className="flex items-center justify-between">
//             <div>
//               <button
//                 onClick={() => router.push('/tools/env-matrix')}
//                 className={`text-sm ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} flex items-center gap-2 font-medium transition-colors mb-4`}
//               >
//                 <ArrowLeft size={16} />
//                 Back to Home
//               </button>

//               <div className="flex items-center gap-6">
//                 <div className={`w-20 h-20 ${
//                   platform === 'hydra'
//                     ? isDark ? 'bg-gradient-to-br from-teal-600 to-cyan-700' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
//                     : isDark ? 'bg-gradient-to-br from-orange-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-red-600'
//                 } rounded-2xl flex items-center justify-center text-4xl shadow-xl`}>
//                   {platform === 'hydra' ? '🌐' : '🔧'}
//                 </div>
//                 <div>
//                   <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
//                     {platform === 'hydra' ? 'Hydra' : 'Non-Hydra'} Applications
//                   </h1>
//                   <p className={`text-sm ${theme.textSecondary}`}>
//                     {applications.length} applications found
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* NEW APPLICATION BUTTON */}
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className={`px-5 py-3 ${theme.accent} text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-all`}
//             >
//               <Plus size={20} />
//               New Application
//             </button>
//           </div>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className={`${theme.card} border rounded-2xl p-6 mb-8`}>
//           <div className="flex items-center gap-4">
//             <div className="flex-1 relative">
//               <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={20} />
//               <input
//                 type="text"
//                 placeholder="Search applications by name or ID..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${theme.input} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all`}
//               />
//             </div>
//             <button className={`px-5 py-3 ${theme.card} border-2 rounded-xl font-semibold hover:opacity-80 transition-all flex items-center gap-2`}>
//               <Filter size={20} />
//               Filter
//             </button>
//           </div>
//         </div>

//         {/* Applications Grid */}
//         {filteredApplications.length === 0 ? (
//           <div className={`${theme.card} border rounded-2xl p-12 text-center`}>
//             <div className="text-6xl mb-4">📭</div>
//             <h3 className={`text-2xl font-bold ${theme.text} mb-2`}>No Applications Found</h3>
//             <p className={theme.textSecondary}>
//               {searchQuery
//                 ? `No applications match "${searchQuery}"`
//                 : 'Get started by creating your first application'}
//             </p>
//             {!searchQuery && (
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className={`mt-6 px-6 py-3 ${theme.accent} text-white rounded-xl font-semibold inline-flex items-center gap-2`}
//               >
//                 <Plus size={20} />
//                 Create Application
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredApplications.map((app) => (
//               <button
//                 key={app.aimId}
//                 onClick={() => handleApplicationClick(app.aimId)}
//                 className={`${theme.card} border-2 rounded-2xl p-6 hover:border-teal-500 transition-all hover:shadow-xl text-left group`}
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className={`w-12 h-12 ${
//                     platform === 'hydra'
//                       ? isDark ? 'bg-teal-900/30' : 'bg-teal-100'
//                       : isDark ? 'bg-orange-900/30' : 'bg-orange-100'
//                   } rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
//                     {platform === 'hydra' ? '🌐' : '🔧'}
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                     isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
//                   }`}>
//                     Active
//                   </span>
//                 </div>

//                 <h3 className={`text-xl font-bold ${theme.text} mb-2 group-hover:text-teal-500 transition-colors`}>
//                   {app.applicationName}
//                 </h3>

//                 <div className={`text-sm ${theme.textSecondary} space-y-1 mb-4`}>
//                   <p>ID: <span className="font-mono">{app.aimId}</span></p>
//                   <p>{app.Projects.length} Project{app.Projects.length !== 1 ? 's' : ''}</p>
//                   <p>
//                     {app.Projects.reduce((total, proj) => total + proj.services.length, 0)} Service
//                     {app.Projects.reduce((total, proj) => total + proj.services.length, 0) !== 1 ? 's' : ''}
//                   </p>
//                 </div>

//                 {app.updatedAt && (
//                   <p className={`text-xs ${theme.textSecondary}`}>
//                     Updated: {new Date(app.updatedAt).toLocaleDateString()}
//                   </p>
//                 )}

//                 <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
//                   <span className={`text-sm font-semibold ${isDark ? 'text-teal-400' : 'text-teal-600'} group-hover:underline`}>
//                     View Details →
//                   </span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// src/app/tools/env-matrix/[platform]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Application } from '@/types';
import AddApplicationModal from '@/components/env-matrix/hydra-application-level/addapplicationmodal';
import { ArrowLeft, Plus, Search, LayoutGrid, List, RefreshCw } from 'lucide-react';

export default function PlatformApplicationsPage() {
  const params = useParams();
  const router = useRouter();
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const platform = params.platform as string;

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

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/env-matrix/applications?platform=${platform}`);
      const result = await response.json();
      
      if (result.success) {
        setApplications(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchApplications();
    }
  }, [platform, mounted]);

  const handleModalSuccess = () => {
    fetchApplications();
    setIsModalOpen(false);
  };

  const handleApplicationClick = (aimId: string) => {
    router.push(`/tools/env-matrix/${platform}/${aimId}`);
  };

  const filteredApplications = applications.filter(app =>
    app.applicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.aimId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalServices = applications.reduce((total, app) => 
    total + app.Projects.reduce((pTotal, proj) => pTotal + proj.services.length, 0), 0
  );

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
          <p className={theme.textSecondary}>Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text}`}>
      {/* ADD APPLICATION MODAL */}
      <AddApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* COMPACT HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/tools/env-matrix')}
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
                {platform === 'hydra' ? '🌐' : '🔧'}
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme.text}`}>
                  {platform === 'hydra' ? 'Hydra' : 'Non-Hydra'} Platform
                </h1>
                <p className={`text-xs ${theme.textSecondary}`}>
                  {applications.length} applications • {totalServices} services
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchApplications}
              className={`px-4 py-2 ${theme.card} border rounded-lg text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-4 py-2 ${theme.accent} text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-all text-sm`}
            >
              <Plus size={18} />
              New Application
            </button>
          </div>
        </div>

        {/* COMPACT SEARCH AND FILTERS */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={18} />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all text-sm`}
            />
          </div>

          {/* View Toggle */}
          <div className={`flex items-center gap-1 p-1 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                viewMode === 'grid'
                  ? `${theme.accent} text-white`
                  : `${theme.textSecondary} hover:opacity-70`
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                viewMode === 'list'
                  ? `${theme.accent} text-white`
                  : `${theme.textSecondary} hover:opacity-70`
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* APPLICATIONS */}
        {filteredApplications.length === 0 ? (
          <div className={`${theme.card} border rounded-xl p-12 text-center`}>
            <div className="text-5xl mb-3">📭</div>
            <h3 className={`text-xl font-bold ${theme.text} mb-2`}>No Applications Found</h3>
            <p className={`text-sm ${theme.textSecondary} mb-4`}>
              {searchQuery
                ? `No applications match "${searchQuery}"`
                : 'Get started by creating your first application'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsModalOpen(true)}
                className={`px-5 py-2.5 ${theme.accent} text-white rounded-lg font-semibold inline-flex items-center gap-2 text-sm`}
              >
                <Plus size={18} />
                Create Application
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW - COMPACT */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredApplications.map((app) => (
              <button
                key={app.aimId}
                onClick={() => handleApplicationClick(app.aimId)}
                className={`${theme.card} border rounded-xl p-4 hover:border-teal-500 transition-all hover:shadow-lg text-left group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${
                    platform === 'hydra'
                      ? isDark ? 'bg-teal-900/30' : 'bg-teal-100'
                      : isDark ? 'bg-orange-900/30' : 'bg-orange-100'
                  } rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                    {app.applicationName[0].toUpperCase()}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                  }`}>
                    Active
                  </span>
                </div>

                <h3 className={`text-base font-bold ${theme.text} mb-1 group-hover:text-teal-500 transition-colors line-clamp-1`}>
                  {app.applicationName}
                </h3>

                <p className={`text-xs ${theme.textSecondary} mb-3`}>
                  ID: {app.aimId}
                </p>

                <div className="flex items-center gap-3 text-xs">
                  <div className={`flex items-center gap-1 ${theme.textSecondary}`}>
                    <span className="font-semibold">{app.Projects.length}</span>
                    <span>Projects</span>
                  </div>
                  <div className={`flex items-center gap-1 ${theme.textSecondary}`}>
                    <span className="font-semibold">
                      {app.Projects.reduce((total, proj) => total + proj.services.length, 0)}
                    </span>
                    <span>Services</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* LIST VIEW - COMPACT */
          <div className="space-y-3">
            {filteredApplications.map((app) => (
              <button
                key={app.aimId}
                onClick={() => handleApplicationClick(app.aimId)}
                className={`w-full ${theme.card} border rounded-xl p-4 hover:border-teal-500 transition-all hover:shadow-lg text-left group flex items-center gap-4`}
              >
                <div className={`w-12 h-12 ${
                  platform === 'hydra'
                    ? isDark ? 'bg-teal-900/30' : 'bg-teal-100'
                    : isDark ? 'bg-orange-900/30' : 'bg-orange-100'
                } rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform flex-shrink-0`}>
                  {app.applicationName[0].toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`text-base font-bold ${theme.text} group-hover:text-teal-500 transition-colors`}>
                      {app.applicationName}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                    }`}>
                      Active
                    </span>
                  </div>
                  <p className={`text-sm ${theme.textSecondary}`}>
                    ID: {app.aimId} • {app.Projects.length} Projects • {app.Projects.reduce((total, proj) => total + proj.services.length, 0)} Services
                  </p>
                </div>

                <div className={`text-sm font-semibold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                  View →
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}