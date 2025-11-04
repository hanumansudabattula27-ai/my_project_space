
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';
// import StatsCard from '@/components/prr/prr-home-page/statscard';
// import SearchBar from '@/components/prr/prr-home-page/searchbar';
// import InfoCards from '@/components/prr/prr-home-page/infocards';
// import { StatsData } from '@/types/prr/type';
// import { prrTheme } from '@/lib/prr/theme';
// import CTASections from '@/components/prr/prr-home-page/ctasections';

// export default function PRRHomePage() {
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [stats, setStats] = useState<StatsData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const isDark = mounted ? (resolvedTheme === 'dark' || currentTheme === 'dark') : false;
//   const theme = isDark ? prrTheme.dark : prrTheme.light;

//   useEffect(() => {
//     if (!mounted) return;

//     const fetchStats = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('/api/prr/stats');
//         const result = await response.json();

//         if (result.success) {
//           setStats(result.data);
//         } else {
//           setError(result.error || 'Failed to fetch stats');
//         }
//       } catch (err) {
//         setError('Failed to fetch stats');
//         console.error('Error fetching stats:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchStats();
//   }, [mounted]);

//   if (!mounted) {
//     return (
//       <div className={`min-h-screen ${prrTheme.light.background.primary} flex items-center justify-center`}>
//         <div className="text-center">
//           <div className={`w-12 h-12 border-4 ${prrTheme.light.spinner} border-t-transparent rounded-full animate-spin mx-auto mb-3`}></div>
//           <p className={prrTheme.light.text.secondary}>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen pt-20  ${theme.background.secondary}`}>
//       {/* Enhanced Hero Section */}
//       <section className={`${theme.hero.background} relative overflow-hidden py-8 md:py-10 border-b ${theme.card.border}`}>
//         {/* Decorative elements */}
//         <div className={`absolute top-0 right-0 w-72 h-72 ${theme.hero.decorative1} rounded-full blur-3xl -z-10`}></div>
//         <div className={`absolute -bottom-32 left-1/4 w-96 h-96 ${theme.hero.decorative2} rounded-full blur-3xl -z-10`}></div>

//         <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
//           <div>
//             <h1 className={`text-2xl md:text-3xl font-bold ${theme.text.primary} mb-2`}>
//               Production Readiness Reviews
//             </h1>
//             <p className={`text-sm md:text-base ${theme.text.secondary} leading-relaxed mb-2`}>
//               Ensure your production releases meet all operational standards and security requirements before deployment.
//             </p>
//             <p className={`text-xs md:text-sm ${theme.text.tertiary}`}>
//               Complete a structured review covering platform configuration, deployment strategy, observability, testing readiness, and stakeholder approvals.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
//         {/* Stats Section - Compact */}
//         {isLoading ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className={`${theme.card.background} p-3 md:p-4 rounded-lg h-20 md:h-24 animate-pulse border ${theme.card.border}`}
//               />
//             ))}
//           </div>
//         ) : error ? (
//           <div className={`${theme.error.background} border ${theme.error.border} p-3 rounded-lg mb-6 text-sm`}>
//             <p className={theme.error.text}>{error}</p>
//           </div>
//         ) : stats ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
//             <StatsCard
//               label="LIVE"
//               value={stats.live}
//               description="Active Releases"
//               isDark={isDark}
//               colorKey="live"
//             />
//             <StatsCard
//               label="NON-LIVE"
//               value={stats.nonLive}
//               description="Inactive Releases"
//               isDark={isDark}
//               colorKey="nonLive"
//             />
//             <StatsCard
//               label="TOTAL"
//               value={stats.total}
//               description="All Releases"
//               isDark={isDark}
//               colorKey="total"
//             />
//             <StatsCard
//               label="IN REVIEW"
//               value={stats.inReview}
//               description="Pending Approval"
//               isDark={isDark}
//               colorKey="inReview"
//             />
//           </div>
//         ) : null}

//         {/* Search Bar */}
//         <SearchBar isDark={isDark} />

//         {/* CTA Sections - Two Separate Side by Side */}
//         <CTASections isDark={isDark} />

//         {/* Info Cards */}
//         <InfoCards isDark={isDark} />
//       </main>
//     </div>
//   );
// }



'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import StatsCard from '@/components/prr/prr-home-page/statscard';
import SearchBar from '@/components/prr/prr-home-page/searchbar';
import InfoCards from '@/components/prr/prr-home-page/infocards';
import { StatsData, PRRApplication } from '@/types/prr/type';
import { prrTheme } from '@/lib/prr/theme';
import CTASections from '@/components/prr/prr-home-page/ctasections';
import AddEditPRRReleaseModal from '@/components/prr/modals/addeditreleasemodal';

export default function PRRHomePage() {
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme === 'dark' || currentTheme === 'dark') : false;
  const theme = isDark ? prrTheme.dark : prrTheme.light;

  useEffect(() => {
    if (!mounted) return;

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/prr/stats');
        const result = await response.json();

        if (result.success) {
          setStats(result.data);
        } else {
          setError(result.error || 'Failed to fetch stats');
        }
      } catch (err) {
        setError('Failed to fetch stats');
        console.error('Error fetching stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [mounted]);

  // Modal Handlers
  const handleAddRelease = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveRelease = async (data: PRRApplication) => {
    try {
      const response = await fetch('/api/prr/releases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // Refresh stats after creating new release
        const statsResponse = await fetch('/api/prr/stats');
        const statsResult = await statsResponse.json();
        if (statsResult.success) {
          setStats(statsResult.data);
        }
        handleCloseModal();
      } else {
        throw new Error(result.error || 'Failed to create release');
      }
    } catch (err) {
      console.error('Error saving release:', err);
      alert('Failed to create release. Please try again.');
    }
  };

  if (!mounted) {
    return (
      <div className={`min-h-screen ${prrTheme.light.background.primary} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`w-12 h-12 border-4 ${prrTheme.light.spinner} border-t-transparent rounded-full animate-spin mx-auto mb-3`}></div>
          <p className={prrTheme.light.text.secondary}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20  ${theme.background.secondary}`}>
      {/* Enhanced Hero Section */}
      <section className={`${theme.hero.background} relative overflow-hidden py-8 md:py-10 border-b ${theme.card.border}`}>
        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-72 h-72 ${theme.hero.decorative1} rounded-full blur-3xl -z-10`}></div>
        <div className={`absolute -bottom-32 left-1/4 w-96 h-96 ${theme.hero.decorative2} rounded-full blur-3xl -z-10`}></div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
          <div>
            <h1 className={`text-2xl md:text-3xl font-bold ${theme.text.primary} mb-2`}>
              Production Readiness Reviews
            </h1>
            <p className={`text-sm md:text-base ${theme.text.secondary} leading-relaxed mb-2`}>
              Ensure your production releases meet all operational standards and security requirements before deployment.
            </p>
            <p className={`text-xs md:text-sm ${theme.text.tertiary}`}>
              Complete a structured review covering platform configuration, deployment strategy, observability, testing readiness, and stakeholder approvals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Stats Section - Compact */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`${theme.card.background} p-3 md:p-4 rounded-lg h-20 md:h-24 animate-pulse border ${theme.card.border}`}
              />
            ))}
          </div>
        ) : error ? (
          <div className={`${theme.error.background} border ${theme.error.border} p-3 rounded-lg mb-6 text-sm`}>
            <p className={theme.error.text}>{error}</p>
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
            <StatsCard
              label="LIVE"
              value={stats.live}
              description="Active Releases"
              isDark={isDark}
              colorKey="live"
            />
            <StatsCard
              label="NON-LIVE"
              value={stats.nonLive}
              description="Inactive Releases"
              isDark={isDark}
              colorKey="nonLive"
            />
            <StatsCard
              label="TOTAL"
              value={stats.total}
              description="All Releases"
              isDark={isDark}
              colorKey="total"
            />
            <StatsCard
              label="IN REVIEW"
              value={stats.inReview}
              description="Pending Approval"
              isDark={isDark}
              colorKey="inReview"
            />
          </div>
        ) : null}

        {/* Search Bar */}
        <SearchBar isDark={isDark} />

        {/* CTA Sections - WITH onAddRelease CALLBACK */}
        <CTASections isDark={isDark} onAddRelease={handleAddRelease} />

        {/* Info Cards */}
        <InfoCards isDark={isDark} />
      </main>

      {/* Modal */}
      <AddEditPRRReleaseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRelease}
        mode="add"
      />
    </div>
  );
}