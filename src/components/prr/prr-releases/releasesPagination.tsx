// // src/components/prr/prr-releases/ReleasesPagination.tsx

// 'use client';

// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { prrTheme } from '@/lib/prr/theme';

// interface ReleasesPaginationProps {
//   isDark: boolean;
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// export default function ReleasesPagination({
//   isDark,
//   currentPage,
//   totalPages,
//   onPageChange,
// }: ReleasesPaginationProps) {
//   const theme = isDark ? prrTheme.dark : prrTheme.light;

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
//     const halfWindow = Math.floor(maxVisiblePages / 2);

//     let start = Math.max(1, currentPage - halfWindow);
//     let end = Math.min(totalPages, start + maxVisiblePages - 1);

//     if (end - start + 1 < maxVisiblePages) {
//       start = Math.max(1, end - maxVisiblePages + 1);
//     }

//     if (start > 1) {
//       pages.push(1);
//       if (start > 2) pages.push('...');
//     }

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     if (end < totalPages) {
//       if (end < totalPages - 1) pages.push('...');
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   return (
//     <div className="flex items-center justify-between mt-8">
//       {/* Previous Button */}
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${theme.card.border} ${
//           currentPage === 1
//             ? `${theme.text.muted} cursor-not-allowed opacity-50`
//             : `${theme.text.primary} hover:${theme.card.hover}`
//         } transition-all text-sm font-medium`}
//       >
//         <ChevronLeft className="w-4 h-4" />
//         <span className="hidden sm:inline">Previous</span>
//       </button>

//       {/* Page Numbers */}
//       <div className="flex items-center gap-1">
//         {getPageNumbers().map((page, idx) => (
//           <button
//             key={idx}
//             onClick={() => typeof page === 'number' && onPageChange(page)}
//             disabled={page === '...'}
//             className={`
//               px-3 py-2 rounded-lg text-sm font-medium transition-all
//               ${
//                 page === '...'
//                   ? `${theme.text.tertiary} cursor-default`
//                   : page === currentPage
//                   ? `${theme.button.primary}`
//                   : `border ${theme.card.border} ${theme.text.secondary} hover:${theme.card.hover}`
//               }
//             `}
//           >
//             {page}
//           </button>
//         ))}
//       </div>

//       {/* Next Button */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${theme.card.border} ${
//           currentPage === totalPages
//             ? `${theme.text.muted} cursor-not-allowed opacity-50`
//             : `${theme.text.primary} hover:${theme.card.hover}`
//         } transition-all text-sm font-medium`}
//       >
//         <span className="hidden sm:inline">Next</span>
//         <ChevronRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// }





// src/components/prr/prr-releases/ReleasesPagination.tsx

'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { prrTheme } from '@/lib/prr/theme';

interface ReleasesPaginationProps {
  isDark: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ReleasesPagination({
  isDark,
  currentPage,
  totalPages,
  onPageChange,
}: ReleasesPaginationProps) {
  const theme = isDark ? prrTheme.dark : prrTheme.light;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfWindow = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - halfWindow);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-8">
      {/* Previous Button - ALL from theme */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${theme.card.border} ${
          currentPage === 1
            ? `${theme.text.muted} cursor-not-allowed opacity-50`
            : `${theme.text.primary} hover:${theme.card.hover}`
        } transition-all text-sm font-medium`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers - ALL from theme */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${
                page === '...'
                  ? `${theme.text.tertiary} cursor-default`
                  : page === currentPage
                  ? `${theme.button.primary}`
                  : `border ${theme.card.border} ${theme.text.secondary} hover:${theme.card.hover}`
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button - ALL from theme */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg border ${theme.card.border} ${
          currentPage === totalPages
            ? `${theme.text.muted} cursor-not-allowed opacity-50`
            : `${theme.text.primary} hover:${theme.card.hover}`
        } transition-all text-sm font-medium`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}