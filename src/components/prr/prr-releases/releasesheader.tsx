// // // src/components/prr/prr-releases/ReleasesHeader.tsx

// // 'use client';

// // import React from 'react';
// // import { LayoutGrid, List, RefreshCw, Plus } from 'lucide-react';
// // import Link from 'next/link';
// // import { prrTheme } from '@/lib/prr/theme';

// // interface ReleasesHeaderProps {
// //   isDark: boolean;
// //   viewMode: 'grid' | 'table';
// //   onViewModeChange: (mode: 'grid' | 'table') => void;
// //   onRefresh: () => void;
// // }

// // export default function ReleasesHeader({
// //   isDark,
// //   viewMode,
// //   onViewModeChange,
// //   onRefresh,
// // }: ReleasesHeaderProps) {
// //   const theme = isDark ? prrTheme.dark : prrTheme.light;

// //   return (
// //     <div className={`${theme.card.background} border-b ${theme.card.border}`}>
// //       <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
// //         <div className="flex items-center justify-between mb-4">
// //           <h1 className={`text-2xl md:text-3xl font-bold ${theme.text.primary}`}>
// //             All Releases
// //           </h1>
// //           <Link
// //             href="/prr/add-release"
// //             className={`flex items-center gap-2 px-4 py-2 ${theme.button.primary} rounded-lg text-sm md:text-base font-semibold`}
// //           >
// //             <Plus className="w-4 h-4" />
// //             Add Release
// //           </Link>
// //         </div>

// //         {/* Controls */}
// //         <div className="flex items-center justify-between gap-3">
// //           {/* View Toggle */}
// //           <div className={`flex items-center gap-2 p-1 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
// //             <button
// //               onClick={() => onViewModeChange('grid')}
// //               className={`p-2 rounded transition-all ${
// //                 viewMode === 'grid'
// //                   ? `${theme.button.primary}`
// //                   : `${theme.text.secondary} hover:${theme.text.primary}`
// //               }`}
// //               title="Grid View"
// //             >
// //               <LayoutGrid className="w-4 h-4" />
// //             </button>
// //             <button
// //               onClick={() => onViewModeChange('table')}
// //               className={`p-2 rounded transition-all ${
// //                 viewMode === 'table'
// //                   ? `${theme.button.primary}`
// //                   : `${theme.text.secondary} hover:${theme.text.primary}`
// //               }`}
// //               title="Table View"
// //             >
// //               <List className="w-4 h-4" />
// //             </button>
// //           </div>

// //           {/* Refresh Button */}
// //           <button
// //             onClick={onRefresh}
// //             className={`flex items-center gap-2 px-4 py-2 ${theme.card.background} border ${theme.card.border} rounded-lg hover:${theme.card.hover} text-sm font-medium transition-all`}
// //           >
// //             <RefreshCw className="w-4 h-4" />
// //             <span className="hidden sm:inline">Refresh</span>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// // src/components/prr/prr-releases/ReleasesHeader.tsx

// 'use client';

// import React from 'react';
// import { LayoutGrid, List, RefreshCw, Plus } from 'lucide-react';
// import Link from 'next/link';
// import { prrTheme } from '@/lib/prr/theme';

// interface ReleasesHeaderProps {
//   isDark: boolean;
//   viewMode: 'grid' | 'table';
//   onViewModeChange: (mode: 'grid' | 'table') => void;
//   onRefresh: () => void;
// }

// export default function ReleasesHeader({
//   isDark,
//   viewMode,
//   onViewModeChange,
//   onRefresh,
// }: ReleasesHeaderProps) {
//   const theme = isDark ? prrTheme.dark : prrTheme.light;
//   const toggleBg = isDark ? 'bg-slate-700' : 'bg-gray-200';

//   return (
//     <div className={`${theme.head.background} border-b ${theme.card.border}`}>
//       <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
//         {/* Title and Add Button */}
//         <div className="flex items-center justify-between mb-4">
//           <h1 className={`text-2xl md:text-3xl font-bold ${theme.text.primary}`}>
//            PRR Releases 
//           </h1>
//         {/* Controls - View Toggle and Refresh */}
//         <div className="flex items-center justify-end gap-3">
//           {/* View Toggle - RIGHT SIDE (Uses theme background) */}
          
//            <button
//              onClick={() => onViewModeChange('table')}
//             className={`flex items-center gap-2 px-4 py-2 ${theme.button.primary} rounded-lg text-sm md:text-base font-semibold`}
//           >
//             <Plus className="w-4 h-4" />
//             Add Release
//           </button>
//           {/* Refresh Button */}
//           <button
//             onClick={onRefresh}
//             className={`flex items-center gap-2 px-4 py-2 ${theme.card.background} border ${theme.card.border} rounded-lg hover:${theme.card.hover} text-sm font-medium transition-all`}
//           >
//             <RefreshCw className="w-4 h-4" />
//             <span className="hidden sm:inline">Refresh</span>
//           </button>
//           <div className={`flex items-center gap-1 p-1 rounded-lg ${toggleBg}`}>
//             <button
//               onClick={() => onViewModeChange('grid')}
//               className={`p-2 rounded transition-all ${
//                 viewMode === 'grid'
//                   ? `${theme.button.primary}`
//                   : `${theme.text.secondary} hover:${theme.text.primary}`
//               }`}
//               title="Grid View"
//             >
//               <LayoutGrid className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => onViewModeChange('table')}
//               className={`p-2 rounded transition-all ${
//                 viewMode === 'table'
//                   ? `${theme.button.primary}`
//                   : `${theme.text.secondary} hover:${theme.text.primary}`
//               }`}
//               title="Table View"
//             >
//               <List className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/components/prr/prr-releases/ReleasesHeader.tsx - UPDATED

'use client';

import React from 'react';
import { LayoutGrid, List, RefreshCw, Plus } from 'lucide-react';
import { prrTheme } from '@/lib/prr/theme';

interface ReleasesHeaderProps {
  isDark: boolean;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onRefresh: () => void;
  onAddRelease: () => void;
}

export default function ReleasesHeader({
  isDark,
  viewMode,
  onViewModeChange,
  onRefresh,
  onAddRelease,
}: ReleasesHeaderProps) {
  const theme = isDark ? prrTheme.dark : prrTheme.light;
  const toggleBg = isDark ? 'bg-slate-700' : 'bg-gray-200';

  return (
    <div className={`${theme.head.background} border-b ${theme.card.border}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        {/* Title and Add Button */}
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl md:text-3xl font-bold ${theme.text.primary}`}>
            PRR Releases
          </h1>
          

        {/* Controls - View Toggle and Refresh */}
        <div className="flex items-center justify-end gap-3">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className={`flex items-center gap-2 px-4 py-2 ${theme.card.background} border ${theme.card.border} rounded-lg hover:shadow-md text-sm font-medium transition-all`}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={onAddRelease}
            className={`flex items-center gap-2 px-4 py-2 ${theme.button.primary} rounded-lg text-sm md:text-base font-semibold transition-all hover:shadow-md`}
          >
            <Plus className="w-4 h-4" />
            Add Release
          </button>

          {/* View Toggle */}
          <div className={`flex items-center gap-1 p-1 rounded-lg ${toggleBg}`}>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid'
                  ? `${theme.button.primary}`
                  : `${theme.text.secondary} hover:${theme.text.primary}`
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-2 rounded transition-all ${
                viewMode === 'table'
                  ? `${theme.button.primary}`
                  : `${theme.text.secondary} hover:${theme.text.primary}`
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
          </div>
      </div>
    </div>
  );
}