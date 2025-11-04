// // src/app/prr/releases/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';
// import { PRRApplication } from '@/types/prr/type';
// import { prrTheme } from '@/lib/prr/theme';
// import ReleasesHeader from '@/components/prr/prr-releases/releasesheader';
// import ReleasesFilters from '@/components/prr/prr-releases/releasesfilter';
// import ReleasesGrid from '@/components/prr/prr-releases/releasesgrid';
// import ReleasesTable from '@/components/prr/prr-releases/releasestable';
// import ReleasesPagination from '@/components/prr/prr-releases/releasesPagination';

// export default function AllReleasesPage() {
//   const { theme: currentTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [releases, setReleases] = useState<PRRApplication[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Filter and View State
//   const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalReleases, setTotalReleases] = useState(0);
//   const [pageSize] = useState(10);
//   const [search, setSearch] = useState('');
//   const [platformFilter, setPlatformFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const isDark = mounted ? (resolvedTheme === 'dark' || currentTheme === 'dark') : false;
//   const theme = isDark ? prrTheme.dark : prrTheme.light;

//   const fetchReleases = async (page: number = 1) => {
//     try {
//       setIsLoading(true);
//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: pageSize.toString(),
//         search,
//         platform: platformFilter,
//         status: statusFilter,
//       });

//       const response = await fetch(`/api/prr/releases?${params}`);
//       const result = await response.json();

//       if (result.success) {
//         setReleases(result.data.releases);
//         setTotalReleases(result.data.total);
//         setCurrentPage(page);
//       } else {
//         setError(result.error || 'Failed to fetch releases');
//       }
//     } catch (err) {
//       setError('Failed to fetch releases');
//       console.error('Error fetching releases:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (mounted) {
//       fetchReleases(1);
//     }
//   }, [search, platformFilter, statusFilter, mounted]);

//   if (!mounted) {
//     return (
//       <div className={`min-h-screen ${theme.background.primary} flex items-center justify-center`}>
//         <div className="text-center">
//           <div className={`w-12 h-12 border-4 ${theme.spinner} border-t-transparent rounded-full animate-spin mx-auto mb-3`}></div>
//           <p className={theme.text.secondary}>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const totalPages = Math.ceil(totalReleases / pageSize);

//   return (
//     <div className={`min-h-screen pt-18 ${theme.background.secondary}`}>
//       {/* Header - NO navbar needed, user has their own */}
//       <ReleasesHeader isDark={isDark} viewMode={viewMode} onViewModeChange={setViewMode} onRefresh={() => fetchReleases(currentPage)} />

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
//         {/* Filters */}
//         <ReleasesFilters
//           isDark={isDark}
//           search={search}
//           onSearchChange={setSearch}
//           platformFilter={platformFilter}
//           onPlatformChange={setPlatformFilter}
//           statusFilter={statusFilter}
//           onStatusChange={setStatusFilter}
//         />

//         {/* Error State - ALL from theme */}
//         {error && (
//           <div className={`${theme.error.background} border ${theme.error.border} p-4 rounded-lg mb-6`}>
//             <p className={theme.error.text}>{error}</p>
//           </div>
//         )}

//         {/* Loading State - ALL from theme */}
//         {isLoading ? (
//           <div className="text-center py-12">
//             <div className={`w-12 h-12 border-4 ${theme.spinner} border-t-transparent rounded-full animate-spin mx-auto mb-3`}></div>
//             <p className={theme.text.secondary}>Loading releases...</p>
//           </div>
//         ) : releases.length === 0 ? (
//           <div className={`${theme.card.background} border ${theme.card.border} rounded-lg p-12 text-center`}>
//             <p className={`text-lg ${theme.text.secondary} mb-4`}>No releases found</p>
//             <p className={theme.text.tertiary}>Try adjusting your filters or search</p>
//           </div>
//         ) : (
//           <>
//             {/* Results Count - ALL from theme */}
//             <div className={`mb-4 ${theme.text.secondary} text-sm`}>
//               Showing {(currentPage - 1) * pageSize + 1} to{' '}
//               {Math.min(currentPage * pageSize, totalReleases)} of {totalReleases} releases
//             </div>

//             {/* View Content */}
//             {viewMode === 'grid' ? (
//               <ReleasesGrid isDark={isDark} releases={releases} />
//             ) : (
//               <ReleasesTable isDark={isDark} releases={releases} />
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <ReleasesPagination
//                 isDark={isDark}
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={(page) => fetchReleases(page)}
//               />
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }


// src/app/prr/releases/page.tsx - WITH MODAL INTEGRATION

'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { PRRApplication } from '@/types/prr/type';
import { prrTheme } from '@/lib/prr/theme';
import ReleasesHeader from '@/components/prr/prr-releases/releasesheader';
import ReleasesFilters from '@/components/prr/prr-releases/releasesfilter';
import ReleasesGrid from '@/components/prr/prr-releases/releasesgrid';
import ReleasesTable from '@/components/prr/prr-releases/releasestable';
import ReleasesPagination from '@/components/prr/prr-releases/releasesPagination';
import AddEditPRRReleaseModal from '@/components/prr/modals/addeditreleasemodal';

export default function AllReleasesPage() {
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [releases, setReleases] = useState<PRRApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and View State
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReleases, setTotalReleases] = useState(0);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedRelease, setSelectedRelease] = useState<PRRApplication | undefined>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme === 'dark' || currentTheme === 'dark') : false;
  const theme = isDark ? prrTheme.dark : prrTheme.light;

  const fetchReleases = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
        search,
        platform: platformFilter,
        status: statusFilter,
      });

      const response = await fetch(`/api/prr/releases?${params}`);
      const result = await response.json();

      if (result.success) {
        setReleases(result.data.releases);
        setTotalReleases(result.data.total);
        setCurrentPage(page);
      } else {
        setError(result.error || 'Failed to fetch releases');
      }
    } catch (err) {
      setError('Failed to fetch releases');
      console.error('Error fetching releases:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchReleases(1);
    }
  }, [search, platformFilter, statusFilter, mounted]);

  // Modal Handlers
  const handleAddRelease = () => {
    setModalMode('add');
    setSelectedRelease(undefined);
    setIsModalOpen(true);
  };

  const handleEditRelease = (release: PRRApplication) => {
    setModalMode('edit');
    setSelectedRelease(release);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRelease(undefined);
  };

  const handleSaveRelease = async (data: PRRApplication) => {
    try {
      const method = modalMode === 'add' ? 'POST' : 'PUT';
      const url =
        modalMode === 'add'
          ? '/api/prr/releases'
          : `/api/prr/releases/[aimId]?aimId=${data.aimId}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        await fetchReleases(currentPage);
        handleCloseModal();
      } else {
        throw new Error(result.error || 'Failed to save release');
      }
    } catch (err) {
      console.error('Error saving release:', err);
      alert('Failed to save release. Please try again.');
    }
  };

  if (!mounted) {
    return (
      <div className={`min-h-screen ${theme.background.primary} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`w-12 h-12 border-4 ${theme.spinner} border-t-transparent rounded-full animate-spin mx-auto mb-3`}></div>
          <p className={theme.text.secondary}>Loading...</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalReleases / pageSize);

  return (
    <div className={`min-h-screen pt-18 ${theme.background.secondary}`}>
      {/* Header */}
      <ReleasesHeader
        isDark={isDark}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onRefresh={() => fetchReleases(currentPage)}
        onAddRelease={handleAddRelease}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Filters */}
        <ReleasesFilters
          isDark={isDark}
          search={search}
          onSearchChange={setSearch}
          platformFilter={platformFilter}
          onPlatformChange={setPlatformFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {/* Error State */}
        {error && (
          <div className={`${theme.error.background} border ${theme.error.border} p-4 rounded-lg mb-6`}>
            <p className={theme.error.text}>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className={`w-12 h-12 border-4 ${theme.spinner} border-t-transparent rounded-full animate-spin mx-auto mb-3`}></div>
            <p className={theme.text.secondary}>Loading releases...</p>
          </div>
        ) : releases.length === 0 ? (
          <div className={`${theme.card.background} border ${theme.card.border} rounded-lg p-12 text-center`}>
            <p className={`text-lg ${theme.text.secondary} mb-4`}>No releases found</p>
            <p className={theme.text.tertiary}>Try adjusting your filters or search</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className={`mb-4 ${theme.text.secondary} text-sm`}>
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, totalReleases)} of {totalReleases} releases
            </div>

            {/* View Content */}
            {viewMode === 'grid' ? (
              <ReleasesGrid isDark={isDark} releases={releases} onEdit={handleEditRelease} />
            ) : (
              <ReleasesTable isDark={isDark} releases={releases} onEdit={handleEditRelease} />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <ReleasesPagination
                isDark={isDark}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => fetchReleases(page)}
              />
            )}
          </>
        )}
      </main>

      {/* Modal */}
      <AddEditPRRReleaseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRelease}
        initialData={selectedRelease}
        mode={modalMode}
      />
    </div>
  );
}