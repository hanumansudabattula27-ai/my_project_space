// // src/components/ApplicationHome.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { HomePageData } from '@/types';
// import StatCard from './statscard';
// import PlatformCard from './platformcard';
// import { Search, RefreshCw, Plus } from 'lucide-react';


// export default function ApplicationHome() {
//   const router = useRouter();
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [homeData, setHomeData] = useState<HomePageData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

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
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/env-matrix/homepage');
//         const result = await response.json();
        
//         if (result.success) {
//           setHomeData(result.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch home data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePlatformSelect = (platformType: string) => {
//     router.push(`/tools/env-matrix/${platformType}`);
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
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className={theme.textSecondary}>Loading platforms...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!homeData) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <p className="text-red-600">Failed to load platform data</p>
//         </div>
//       </div>
//     );
//   }

//   const { platforms, globalStats } = homeData;

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6`}>
//       <section className="max-w-7xl mx-auto pt-12 pb-8">
//         <div className="text-center max-w-4xl mx-auto mb-12">
//           <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-teal-900/30 border-teal-800' : 'bg-teal-100 border-teal-200'} border mb-6`}>
//             <span className={`w-2 h-2 ${isDark ? 'bg-teal-400' : 'bg-teal-600'} rounded-full animate-pulse`}></span>
//             <span className={`text-sm font-semibold ${isDark ? 'text-teal-300' : 'text-teal-900'}`}>
//               Multi-Platform Management
//             </span>
//           </div>

//           <h1 className={`text-5xl lg:text-6xl font-extrabold ${theme.text} mb-6 tracking-tight`}>
//             Application{' '}
//             <span className={`${isDark ? 'bg-gradient-to-r from-teal-400 to-cyan-400' : 'bg-gradient-to-r from-teal-600 to-cyan-600'} bg-clip-text text-transparent`}>
//               Management
//             </span>
//             {' '}Hub
//           </h1>

//           <p className={`text-xl ${theme.textSecondary} mb-10 max-w-2xl mx-auto leading-relaxed`}>
//             Unified platform for managing Hydra cloud infrastructure and legacy systems. 
//             Monitor, deploy, and scale with confidence.
//           </p>

//           <div className="max-w-2xl mx-auto mb-8">
//             <div className="relative">
//               <div className="absolute left-5 top-1/2 -translate-y-1/2">
//                 <Search className={theme.textSecondary} size={20} />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search applications, services, or environments..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`w-full px-6 py-4 pl-14 text-base rounded-2xl border-2 ${theme.input} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all`}
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery('')}
//                   className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textSecondary} hover:opacity-70`}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
//             <StatCard value={globalStats.totalApplications} label="Applications" icon="📱" theme={theme} isDark={isDark} />
//             <StatCard value={globalStats.totalServices} label="Services" icon="⚡" theme={theme} isDark={isDark} />
//             <StatCard value={globalStats.totalZones} label="Zones" icon="🌍" theme={theme} isDark={isDark} />
//             <StatCard value={globalStats.totalPlatforms} label="Platforms" icon="🚀" theme={theme} isDark={isDark} />
//           </div>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto py-8">
//         <div className="mb-12">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div>
//               <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Select Platform</h2>
//               <p className={theme.textSecondary}>Choose your hosting environment to view and manage applications</p>
//             </div>

//             <div className="flex items-center gap-3">
//               <button className={`px-5 py-2.5 ${theme.card} border rounded-xl text-sm font-semibold ${theme.text} hover:opacity-80 transition-all flex items-center gap-2`}>
//                 <RefreshCw size={16} />
//                 Refresh
//               </button>
//               <button className={`px-5 py-2.5 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2`}>
//                 <Plus size={16} />
//                 New Application
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
//           {platforms.map((platform) => (
//             <PlatformCard key={platform.type} platform={platform} onSelect={handlePlatformSelect} theme={theme} isDark={isDark} />
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className={`lg:col-span-2 ${theme.card} border rounded-2xl p-8`}>
//             <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <QuickActionButton icon="📊" title="View Reports" description="Analytics & insights" theme={theme} isDark={isDark} />
//               <QuickActionButton icon="🔧" title="System Health" description="Monitor status" theme={theme} isDark={isDark} />
//               <QuickActionButton icon="📁" title="All Projects" description="Browse projects" theme={theme} isDark={isDark} />
//               <QuickActionButton icon="⚙️" title="Settings" description="Configure platforms" theme={theme} isDark={isDark} />
//             </div>
//           </div>

//           <div className={`${theme.card} border rounded-2xl p-8`}>
//             <h3 className={`text-xl font-bold ${theme.text} mb-6`}>System Status</h3>
//             <div className="space-y-4">
//               <StatusItem platform="Hydra" status="online" uptime="99.9%" theme={theme} />
//               <StatusItem platform="Non-Hydra" status="online" uptime="98.5%" theme={theme} />
//               <div className={`pt-4 mt-4 border-t ${isDark ? 'border-slate-700' : 'border-teal-200'}`}>
//                 <p className={`text-sm ${theme.textSecondary}`}>All systems operational</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// interface QuickActionButtonProps {
//   icon: string;
//   title: string;
//   description: string;
//   theme: any;
//   isDark: boolean;
// }

// function QuickActionButton({ icon, title, description, theme, isDark }: QuickActionButtonProps) {
//   return (
//     <button className={`flex items-start gap-3 p-4 rounded-xl ${isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'} border hover:opacity-80 transition-all group text-left`}>
//       <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
//       <div>
//         <h4 className={`font-semibold ${theme.text} text-sm mb-0.5`}>{title}</h4>
//         <p className={`text-xs ${theme.textSecondary}`}>{description}</p>
//       </div>
//     </button>
//   );
// }

// interface StatusItemProps {
//   platform: string;
//   status: 'online' | 'offline' | 'maintenance';
//   uptime: string;
//   theme: any;
// }

// function StatusItem({ platform, status, uptime, theme }: StatusItemProps) {
//   const statusColors: Record<'online' | 'offline' | 'maintenance', string> = { 
//     online: 'bg-green-500', 
//     offline: 'bg-red-500', 
//     maintenance: 'bg-yellow-500' 
//   };
  
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status]} animate-pulse`}></div>
//         <span className={`font-medium ${theme.text}`}>{platform}</span>
//       </div>
//       <span className={`text-sm ${theme.textSecondary}`}>{uptime}</span>
//     </div>
//   );
// }



// // src/components/ApplicationHome.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { HomePageData } from '@/types';
// import StatCard from './statscard';
// import PlatformCard from './platformcard';
// import AddApplicationModal from '@/components/env-matrix/hydra-application-level/addapplicationmodal';
// import { Search, RefreshCw, Plus } from 'lucide-react';


// export default function ApplicationHome() {
//   const router = useRouter();
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [homeData, setHomeData] = useState<HomePageData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false); // ← ADD THIS

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
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/env-matrix/homepage');
//         const result = await response.json();
        
//         if (result.success) {
//           setHomeData(result.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch home data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePlatformSelect = (platformType: string) => {
//     router.push(`/tools/env-matrix/${platformType}`);
//   };

//   // ← ADD THIS HANDLER
//   const handleModalSuccess = () => {
//     // Refresh the page to show new application
//     window.location.reload();
//   };

//   // ← ADD THIS HANDLER
//   const handleRefresh = () => {
//     window.location.reload();
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
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className={theme.textSecondary}>Loading platforms...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!homeData) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="text-center">
//           <p className="text-red-600">Failed to load platform data</p>
//         </div>
//       </div>
//     );
//   }

//   const { platforms, globalStats } = homeData;

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6`}>
//       {/* ← ADD MODAL HERE */}
//       <AddApplicationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSuccess={handleModalSuccess}
//       />

//       <section className="max-w-7xl mx-auto pt-12 pb-8">
//         <div className="text-center max-w-4xl mx-auto mb-12">
//           <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-teal-900/30 border-teal-800' : 'bg-teal-100 border-teal-200'} border mb-6`}>
//             <span className={`w-2 h-2 ${isDark ? 'bg-teal-400' : 'bg-teal-600'} rounded-full animate-pulse`}></span>
//             <span className={`text-sm font-semibold ${isDark ? 'text-teal-300' : 'text-teal-900'}`}>
//               Multi-Platform Management
//             </span>
//           </div>

//           <h1 className={`text-5xl lg:text-6xl font-extrabold ${theme.text} mb-6 tracking-tight`}>
//             Application{' '}
//             <span className={`${isDark ? 'bg-gradient-to-r from-teal-400 to-cyan-400' : 'bg-gradient-to-r from-teal-600 to-cyan-600'} bg-clip-text text-transparent`}>
//               Management
//             </span>
//             {' '}Hub
//           </h1>

//           <p className={`text-xl ${theme.textSecondary} mb-10 max-w-2xl mx-auto leading-relaxed`}>
//             Unified platform for managing Hydra cloud infrastructure and legacy systems. 
//             Monitor, deploy, and scale with confidence.
//           </p>

//           <div className="max-w-2xl mx-auto mb-8">
//             <div className="relative">
//               <div className="absolute left-5 top-1/2 -translate-y-1/2">
//                 <Search className={theme.textSecondary} size={20} />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search applications, services, or environments..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`w-full px-6 py-4 pl-14 text-base rounded-2xl border-2 ${theme.input} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all`}
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery('')}
//                   className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textSecondary} hover:opacity-70`}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
//             <StatCard value={globalStats.totalApplications} label="Applications" icon="📱" theme={theme} isDark={isDark} />
//             <StatCard value={globalStats.totalServices} label="Services" icon="⚡" theme={theme} isDark={isDark} />
//             <StatCard value={globalStats.totalZones} label="Zones" icon="🌍" theme={theme} isDark={isDark} />
//             <StatCard value={globalStats.totalPlatforms} label="Platforms" icon="🚀" theme={theme} isDark={isDark} />
//           </div>
//         </div>
//       </section>

//       <section className="max-w-7xl mx-auto py-8">
//         <div className="mb-12">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div>
//               <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Select Platform</h2>
//               <p className={theme.textSecondary}>Choose your hosting environment to view and manage applications</p>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* ← UPDATE REFRESH BUTTON */}
//               <button 
//                 onClick={handleRefresh}
//                 className={`px-5 py-2.5 ${theme.card} border rounded-xl text-sm font-semibold ${theme.text} hover:opacity-80 transition-all flex items-center gap-2`}
//               >
//                 <RefreshCw size={16} />
//                 Refresh
//               </button>
              
//               {/* ← UPDATE NEW APPLICATION BUTTON */}
//               <button 
//                 onClick={() => setIsModalOpen(true)}
//                 className={`px-5 py-2.5 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105`}
//               >
//                 <Plus size={16} />
//                 New Application
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
//           {platforms.map((platform) => (
//             <PlatformCard key={platform.type} platform={platform} onSelect={handlePlatformSelect} theme={theme} isDark={isDark} />
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className={`lg:col-span-2 ${theme.card} border rounded-2xl p-8`}>
//             <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <QuickActionButton icon="📊" title="View Reports" description="Analytics & insights" theme={theme} isDark={isDark} />
//               <QuickActionButton icon="🔧" title="System Health" description="Monitor status" theme={theme} isDark={isDark} />
//               <QuickActionButton icon="📁" title="All Projects" description="Browse projects" theme={theme} isDark={isDark} />
//               <QuickActionButton icon="⚙️" title="Settings" description="Configure platforms" theme={theme} isDark={isDark} />
//             </div>
//           </div>

//           <div className={`${theme.card} border rounded-2xl p-8`}>
//             <h3 className={`text-xl font-bold ${theme.text} mb-6`}>System Status</h3>
//             <div className="space-y-4">
//               <StatusItem platform="Hydra" status="online" uptime="99.9%" theme={theme} />
//               <StatusItem platform="Non-Hydra" status="online" uptime="98.5%" theme={theme} />
//               <div className={`pt-4 mt-4 border-t ${isDark ? 'border-slate-700' : 'border-teal-200'}`}>
//                 <p className={`text-sm ${theme.textSecondary}`}>All systems operational</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// interface QuickActionButtonProps {
//   icon: string;
//   title: string;
//   description: string;
//   theme: any;
//   isDark: boolean;
// }

// function QuickActionButton({ icon, title, description, theme, isDark }: QuickActionButtonProps) {
//   return (
//     <button className={`flex items-start gap-3 p-4 rounded-xl ${isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'} border hover:opacity-80 transition-all group text-left`}>
//       <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
//       <div>
//         <h4 className={`font-semibold ${theme.text} text-sm mb-0.5`}>{title}</h4>
//         <p className={`text-xs ${theme.textSecondary}`}>{description}</p>
//       </div>
//     </button>
//   );
// }

// interface StatusItemProps {
//   platform: string;
//   status: 'online' | 'offline' | 'maintenance';
//   uptime: string;
//   theme: any;
// }

// function StatusItem({ platform, status, uptime, theme }: StatusItemProps) {
//   const statusColors: Record<'online' | 'offline' | 'maintenance', string> = { 
//     online: 'bg-green-500', 
//     offline: 'bg-red-500', 
//     maintenance: 'bg-yellow-500' 
//   };
  
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status]} animate-pulse`}></div>
//         <span className={`font-medium ${theme.text}`}>{platform}</span>
//       </div>
//       <span className={`text-sm ${theme.textSecondary}`}>{uptime}</span>
//     </div>
//   );
// }





// // src/components/ApplicationHome.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { HomePageData } from '@/types';
// import StatCard from './statscard';
// import PlatformCard from './platformcard';
// import AddApplicationModal from '@/components/env-matrix/hydra-application-level/addapplicationmodal';
// import { Search, RefreshCw, Plus } from 'lucide-react';

// export default function ApplicationHome() {
//   const router = useRouter();
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [homeData, setHomeData] = useState<HomePageData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

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
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/env-matrix/homepage');
//         const result = await response.json();
        
//         if (result.success) {
//           setHomeData(result.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch home data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlePlatformSelect = (platformType: string) => {
//     router.push(`/tools/env-matrix/${platformType}`);
//   };

//   const handleModalSuccess = () => {
//     window.location.reload();
//   };

//   const handleRefresh = () => {
//     window.location.reload();
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
//           <p className={theme.textSecondary}>Loading platforms...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!homeData) {
//     return (
//       <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
//         <div className="text-center">
//           <p className="text-red-600">Failed to load platform data</p>
//         </div>
//       </div>
//     );
//   }

//   const { platforms, globalStats } = homeData;

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} pt-25`}>
//       <AddApplicationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSuccess={handleModalSuccess}
//       />

//       <div className="max-w-7xl mx-auto px-6 py-6">
//         {/* COMPACT HEADER */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className={`text-3xl font-bold ${theme.text}`}>
//                 Application Management
//               </h1>
//               <p className={`text-sm ${theme.textSecondary} mt-1`}>
//                 Manage Hydra and Non-Hydra platforms
//               </p>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={handleRefresh}
//                 className={`px-4 py-2 ${theme.card} border rounded-lg text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
//               >
//                 <RefreshCw size={16} />
//                 Refresh
//               </button>
              
//               <button 
//                 onClick={() => setIsModalOpen(true)}
//                 className={`px-4 py-2 ${theme.accent} text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-2 hover:scale-105`}
//               >
//                 <Plus size={16} />
//                 New Application
//               </button>
//             </div>
//           </div>

//           {/* COMPACT SEARCH */}
//           <div className="relative">
//             <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={18} />
//             <input
//               type="text"
//               placeholder="Search applications, services, environments..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme.input} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all text-sm`}
//             />
//           </div>
//         </div>

//         {/* COMPACT STATS - USING STATCARD COMPONENT */}
//         <div className="grid grid-cols-4 gap-4 mb-6">
//           <StatCard 
//             value={globalStats.totalApplications} 
//             label="Applications" 
//             icon="📱" 
//             theme={theme} 
//             isDark={isDark} 
//           />
//           <StatCard 
//             value={globalStats.totalServices} 
//             label="Services" 
//             icon="⚡" 
//             theme={theme} 
//             isDark={isDark} 
//           />
//           <StatCard 
//             value={globalStats.totalZones} 
//             label="Zones" 
//             icon="🌍" 
//             theme={theme} 
//             isDark={isDark} 
//           />
//           <StatCard 
//             value={globalStats.totalPlatforms} 
//             label="Platforms" 
//             icon="🚀" 
//             theme={theme} 
//             isDark={isDark} 
//           />
//         </div>

//         {/* PLATFORM CARDS - USING PLATFORMCARD COMPONENT */}
//         <div>
//           <h2 className={`text-xl font-bold ${theme.text} mb-4`}>Select Platform</h2>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {platforms.map((platform) => (
//               <PlatformCard 
//                 key={platform.type} 
//                 platform={platform} 
//                 onSelect={handlePlatformSelect} 
//                 theme={theme} 
//                 isDark={isDark} 
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/components/ApplicationHome.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { HomePageData } from '@/types';
import PlatformCard from './platformcard';
import AddApplicationModal from '@/components/env-matrix/hydra-application-level/addapplicationmodal';
import { Search, RefreshCw, Plus } from 'lucide-react';

export default function ApplicationHome() {
  const router = useRouter();
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/env-matrix/homepage');
        const result = await response.json();
        
        if (result.success) {
          setHomeData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlatformSelect = (platformType: string) => {
    router.push(`/tools/env-matrix/${platformType}`);
  };

  const handleModalSuccess = () => {
    window.location.reload();
  };

  const handleRefresh = () => {
    window.location.reload();
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
          <p className={theme.textSecondary}>Loading platforms...</p>
        </div>
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-red-600">Failed to load platform data</p>
        </div>
      </div>
    );
  }

  const { platforms } = homeData;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6`}>
      <AddApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto pt-12 pb-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-teal-900/30 border-teal-800' : 'bg-teal-100 border-teal-200'} border mb-6`}>
            <span className={`w-2 h-2 ${isDark ? 'bg-teal-400' : 'bg-teal-600'} rounded-full animate-pulse`}></span>
            <span className={`text-sm font-semibold ${isDark ? 'text-teal-300' : 'text-teal-900'}`}>
              Multi-Platform Management
            </span>
          </div>

          <h1 className={`text-5xl lg:text-6xl font-extrabold ${theme.text} mb-6 tracking-tight`}>
            Application{' '}
            <span className={`${isDark ? 'bg-gradient-to-r from-teal-400 to-cyan-400' : 'bg-gradient-to-r from-teal-600 to-cyan-600'} bg-clip-text text-transparent`}>
              Management
            </span>
            {' '}Hub
          </h1>

          <p className={`text-xl ${theme.textSecondary} mb-10 max-w-2xl mx-auto leading-relaxed`}>
            Unified platform for managing Hydra cloud infrastructure and legacy systems. 
            Monitor, deploy, and scale with confidence.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2">
                <Search className={theme.textSecondary} size={20} />
              </div>
              <input
                type="text"
                placeholder="Search applications, services, or environments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-6 py-4 pl-14 text-base rounded-2xl border-2 ${theme.input} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textSecondary} hover:opacity-70`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORMS SECTION */}
      <section className="max-w-7xl mx-auto py-8">
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Select Platform</h2>
              <p className={theme.textSecondary}>Choose your hosting environment to view and manage applications</p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleRefresh}
                className={`px-5 py-2.5 ${theme.card} border rounded-xl text-sm font-semibold ${theme.text} hover:opacity-80 transition-all flex items-center gap-2`}
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className={`px-5 py-2.5 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105`}
              >
                <Plus size={16} />
                New Application
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {platforms.map((platform) => (
            <PlatformCard key={platform.type} platform={platform} onSelect={handlePlatformSelect} theme={theme} isDark={isDark} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 ${theme.card} border rounded-2xl p-8`}>
            <h3 className={`text-xl font-bold ${theme.text} mb-6`}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <QuickActionButton icon="📊" title="View Reports" description="Analytics & insights" theme={theme} isDark={isDark} />
              <QuickActionButton icon="🔧" title="System Health" description="Monitor status" theme={theme} isDark={isDark} />
              <QuickActionButton icon="📁" title="All Projects" description="Browse projects" theme={theme} isDark={isDark} />
              <QuickActionButton icon="⚙️" title="Settings" description="Configure platforms" theme={theme} isDark={isDark} />
            </div>
          </div>

          <div className={`${theme.card} border rounded-2xl p-8`}>
            <h3 className={`text-xl font-bold ${theme.text} mb-6`}>System Status</h3>
            <div className="space-y-4">
              <StatusItem platform="Hydra" status="online" uptime="99.9%" theme={theme} />
              <StatusItem platform="Non-Hydra" status="online" uptime="98.5%" theme={theme} />
              <div className={`pt-4 mt-4 border-t ${isDark ? 'border-slate-700' : 'border-teal-200'}`}>
                <p className={`text-sm ${theme.textSecondary}`}>All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface QuickActionButtonProps {
  icon: string;
  title: string;
  description: string;
  theme: any;
  isDark: boolean;
}

function QuickActionButton({ icon, title, description, theme, isDark }: QuickActionButtonProps) {
  return (
    <button className={`flex items-start gap-3 p-4 rounded-xl ${isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'} border hover:opacity-80 transition-all group text-left`}>
      <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
      <div>
        <h4 className={`font-semibold ${theme.text} text-sm mb-0.5`}>{title}</h4>
        <p className={`text-xs ${theme.textSecondary}`}>{description}</p>
      </div>
    </button>
  );
}

interface StatusItemProps {
  platform: string;
  status: 'online' | 'offline' | 'maintenance';
  uptime: string;
  theme: any;
}

function StatusItem({ platform, status, uptime, theme }: StatusItemProps) {
  const statusColors: Record<'online' | 'offline' | 'maintenance', string> = { 
    online: 'bg-green-500', 
    offline: 'bg-red-500', 
    maintenance: 'bg-yellow-500' 
  };
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status]} animate-pulse`}></div>
        <span className={`font-medium ${theme.text}`}>{platform}</span>
      </div>
      <span className={`text-sm ${theme.textSecondary}`}>{uptime}</span>
    </div>
  );
}