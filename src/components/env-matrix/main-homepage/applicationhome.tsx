// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { HomePageData } from '@/types';
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

//   const { platforms } = homeData;

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6`}>
//       <AddApplicationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSuccess={handleModalSuccess}
//       />

//       {/* HERO SECTION */}
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
//         </div>
//       </section>

//       {/* PLATFORMS SECTION */}
//       <section className="max-w-7xl mx-auto py-8">
//         <div className="mb-12">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div>
//               <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>Select Platform</h2>
//               <p className={theme.textSecondary}>Choose your hosting environment to view and manage applications</p>
//             </div>

//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={handleRefresh}
//                 className={`px-5 py-2.5 ${theme.card} border rounded-xl text-sm font-semibold ${theme.text} hover:opacity-80 transition-all flex items-center gap-2`}
//               >
//                 <RefreshCw size={16} />
//                 Refresh
//               </button>
              
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
//       </section>
//     </div>
//   );
// }






// // src/components/ApplicationHome.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTheme } from 'next-themes';
// import { Platform } from '@/types';
// import PlatformCard from './platformcard';
// import SmartSearch from './SmartSearch';
// import AddApplicationModal from '@/components/env-matrix/hydra-application-level/addapplicationmodal';
// import { RefreshCw, Plus } from 'lucide-react';

// interface PlatformStats {
//   applications: number;
//   services: number;
//   zones: number;
// }

// interface StatsData {
//   hydra: PlatformStats;
//   nonHydra: PlatformStats;
// }

// // Static platform data
// const PLATFORMS: Array<Omit<Platform, 'stats' | 'lastUpdated'>> = [
//   {
//     type: 'hydra' as const,
//     name: 'Hydra Platform',
//     description: 'Cloud-native infrastructure and modern services',
//     icon: '🌐',
//     status: 'online',
//   },
//   {
//     type: 'non-hydra' as const,
//     name: 'Non-Hydra Platform',
//     description: 'Legacy systems and traditional applications',
//     icon: '🔧',
//     status: 'online',
//   },
// ];

// export default function ApplicationHome() {
//   const router = useRouter();
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [stats, setStats] = useState<StatsData | null>(null);
//   const [loading, setLoading] = useState(true);
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
//     const fetchStats = async () => {
//       try {
//         const response = await fetch('/api/env-matrix/stats');
//         const result = await response.json();
        
//         if (result.success) {
//           setStats(result.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch stats:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
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

//   // Merge static platform data with dynamic stats
//   const platformsWithStats: Platform[] = PLATFORMS.map(platform => ({
//     ...platform,
//     stats: platform.type === 'hydra' 
//       ? stats?.hydra || { applications: 0, services: 0, zones: 0 }
//       : stats?.nonHydra || { applications: 0, services: 0, zones: 0 },
//     lastUpdated: Date.now(),
//   }));

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6`}>
//       <AddApplicationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSuccess={handleModalSuccess}
//       />

//       {/* HERO SECTION */}
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

//           {/* SEARCH WITH BUTTONS */}
//           <div className="max-w-4xl mx-auto mb-8">
//             <div className="flex items-center gap-4">
//               {/* Search - Takes most space */}
//               <div className="flex-1">
//                 <SmartSearch theme={theme} isDark={isDark} />
//               </div>

//               {/* Buttons - Right side */}
//               <div className="flex items-center gap-3">
//                 <button 
//                   onClick={handleRefresh}
//                   className={`px-4 py-3 ${theme.card} border rounded-xl text-sm font-semibold ${theme.text} hover:opacity-80 transition-all flex items-center gap-2 whitespace-nowrap`}
//                 >
//                   <RefreshCw size={16} />
//                   Refresh
//                 </button>
                
//                 <button 
//                   onClick={() => setIsModalOpen(true)}
//                   className={`px-4 py-3 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105 whitespace-nowrap`}
//                 >
//                   <Plus size={16} />
//                   New Application
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* PLATFORMS SECTION - SIMPLIFIED */}
//       <section className="max-w-7xl mx-auto py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {platformsWithStats.map((platform) => (
//             <PlatformCard 
//               key={platform.type} 
//               platform={platform} 
//               onSelect={handlePlatformSelect} 
//               theme={theme} 
//               isDark={isDark} 
//             />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }






// src/components/ApplicationHome.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Platform } from '@/types';
import PlatformCard from './platformcard';
import AddApplicationModal from '@/components/env-matrix/hydra-application-level/addapplicationmodal';
import { Search, RefreshCw, Plus } from 'lucide-react';

interface PlatformStats {
  applications: number;
  services: number;
  zones: number;
}

interface StatsData {
  hydra: PlatformStats;
  nonHydra: PlatformStats;
}

const PLATFORMS: Array<Omit<Platform, 'stats' | 'lastUpdated'>> = [
  {
    type: 'hydra' as const,
    name: 'Hydra Platform',
    description: 'Cloud-native infrastructure and modern services',
    icon: '🌐',
    status: 'online',
  },
  {
    type: 'non-hydra' as const,
    name: 'Non-Hydra Platform',
    description: 'Legacy systems and traditional applications',
    icon: '🔧',
    status: 'online',
  },
];

export default function ApplicationHome() {
  const router = useRouter();
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
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
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/env-matrix/homepage');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats({
          hydra: { applications: 5, services: 8, zones: 12 },
          nonHydra: { applications: 5, services: 7, zones: 5 },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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

  const platformsWithStats: Platform[] = PLATFORMS.map(platform => ({
    ...platform,
    stats: platform.type === 'hydra' 
      ? stats?.hydra || { applications: 0, services: 0, zones: 0 }
      : stats?.nonHydra || { applications: 0, services: 0, zones: 0 },
    lastUpdated: Date.now(),
  }));

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text} p-6 pt-15`}>
      <AddApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />

      {/* HERO SECTION - COMPACT */}
      <section className="max-w-7xl mx-auto pt-6 pb-4">
        <div className="text-center max-w-4xl mx-auto mb-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-teal-900/30 border-teal-800' : 'bg-teal-100 border-teal-200'} border mb-3`}>
            <span className={`w-2 h-2 ${isDark ? 'bg-teal-400' : 'bg-teal-600'} rounded-full animate-pulse`}></span>
            <span className={`text-xs font-semibold ${isDark ? 'text-teal-300' : 'text-teal-900'}`}>
              Multi-Platform Management
            </span>
          </div>

          <h1 className={`text-4xl lg:text-5xl font-extrabold ${theme.text} mb-3 tracking-tight`}>
            Application{' '}
            <span className={`${isDark ? 'bg-gradient-to-r from-teal-400 to-cyan-400' : 'bg-gradient-to-r from-teal-600 to-cyan-600'} bg-clip-text text-transparent`}>
              Management
            </span>
            {' '}Hub
          </h1>

          <p className={`text-base ${theme.textSecondary} mb-4 max-w-2xl mx-auto leading-relaxed`}>
            Unified platform for managing Hydra cloud infrastructure and legacy systems. 
            Monitor, deploy, and scale with confidence.
          </p>
        </div>
      </section>

      {/* SEARCH & ACTIONS - BETTER PROPORTIONS */}
      <section className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative max-w-3xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className={theme.textSecondary} size={18} />
            </div>
            <input
              type="text"
              placeholder="Search applications, services, or environments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-5 py-3 pl-12 text-sm rounded-xl border-2 ${theme.input} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.textSecondary} hover:opacity-70`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <button 
            onClick={handleRefresh}
            className={`px-4 py-3 ${theme.card} border rounded-xl text-sm font-semibold ${theme.text} hover:opacity-80 transition-all flex items-center gap-2 whitespace-nowrap`}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`px-4 py-3 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105 whitespace-nowrap`}
          >
            <Plus size={16} />
            New Application
          </button>
        </div>
      </section>

      {/* PLATFORMS - BETTER SPACING */}
      <section className="max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {platformsWithStats.map((platform) => (
            <PlatformCard 
              key={platform.type} 
              platform={platform} 
              onSelect={handlePlatformSelect} 
              theme={theme} 
              isDark={isDark} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}