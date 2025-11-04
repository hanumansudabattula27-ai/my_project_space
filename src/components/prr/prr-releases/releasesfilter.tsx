// // src/components/prr/prr-releases/ReleasesFilters.tsx

// 'use client';

// import React from 'react';
// import { Search } from 'lucide-react';
// import { prrTheme } from '@/lib/prr/theme';

// interface ReleasesFiltersProps {
//   isDark: boolean;
//   search: string;
//   onSearchChange: (value: string) => void;
//   platformFilter: string;
//   onPlatformChange: (value: string) => void;
//   statusFilter: string;
//   onStatusChange: (value: string) => void;
// }

// export default function ReleasesFilters({
//   isDark,
//   search,
//   onSearchChange,
//   platformFilter,
//   onPlatformChange,
//   statusFilter,
//   onStatusChange,
// }: ReleasesFiltersProps) {
//   const theme = isDark ? prrTheme.dark : prrTheme.light;

//   return (
//     <div className={`${theme.card.background} border ${theme.card.border} rounded-lg p-4 md:p-6 mb-6 space-y-4`}>
//       {/* Search Bar */}
//       <div>
//         <label className={`text-xs font-semibold ${theme.text.label} mb-2 block`}>
//           Search
//         </label>
//         <div className="relative">
//           <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.text.tertiary}`} />
//           <input
//             type="text"
//             placeholder="Search by AIM ID or Project Name..."
//             value={search}
//             onChange={(e) => onSearchChange(e.target.value)}
//             className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.card.border} ${theme.input.background} ${theme.input.text} ${theme.input.placeholder} ${theme.input.focus} text-sm`}
//           />
//         </div>
//       </div>

//       {/* Filters Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Platform Filter */}
//         <div>
//           <label className={`text-xs font-semibold ${theme.text.label} mb-2 block`}>
//             Platform
//           </label>
//           <select
//             value={platformFilter}
//             onChange={(e) => onPlatformChange(e.target.value)}
//             className={`w-full px-3 py-2 rounded-lg border ${theme.card.border} ${theme.input.background} ${theme.input.text} ${theme.input.focus} text-sm`}
//           >
//             <option value="all">All Platforms</option>
//             <option value="hydra">Hydra</option>
//             <option value="aws">AWS</option>
//             <option value="gcp">GCP</option>
//             <option value="tims">TIMS</option>
//             <option value="one-dato">One Dato</option>
//           </select>
//         </div>

//         {/* Status Filter */}
//         <div>
//           <label className={`text-xs font-semibold ${theme.text.label} mb-2 block`}>
//             Status
//           </label>
//           <select
//             value={statusFilter}
//             onChange={(e) => onStatusChange(e.target.value)}
//             className={`w-full px-3 py-2 rounded-lg border ${theme.card.border} ${theme.input.background} ${theme.input.text} ${theme.input.focus} text-sm`}
//           >
//             <option value="all">All Status</option>
//             <option value="live">LIVE</option>
//             <option value="non-live">NON-LIVE</option>
//             <option value="draft">DRAFT</option>
//             <option value="in-review">IN REVIEW</option>
//           </select>
//         </div>

//         {/* Release Date Filter (Optional) */}
//         <div>
//           <label className={`text-xs font-semibold ${theme.text.label} mb-2 block`}>
//             Release Date
//           </label>
//           <input
//             type="date"
//             className={`w-full px-3 py-2 rounded-lg border ${theme.card.border} ${theme.input.background} ${theme.input.text} ${theme.input.focus} text-sm`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



// src/components/prr/prr-releases/ReleasesFilters.tsx

'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { prrTheme } from '@/lib/prr/theme';

interface ReleasesFiltersProps {
  isDark: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  platformFilter: string;
  onPlatformChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export default function ReleasesFilters({
  isDark,
  search,
  onSearchChange,
  platformFilter,
  onPlatformChange,
  statusFilter,
  onStatusChange,
}: ReleasesFiltersProps) {
  const theme = isDark ? prrTheme.dark : prrTheme.light;

  return (
    <div className={`${theme.card.background} border ${theme.card.border} rounded-lg p-4 md:p-6 mb-6 space-y-4`}>
      {/* Search Bar */}
      <div>
        <label className={`text-xs font-semibold ${theme.text.label} mb-2 block`}>
          Search
        </label>
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.text.tertiary}`} />
          <input
            type="text"
            placeholder="Search by AIM ID or Project Name..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.card.border} ${theme.input.background} ${theme.input.text} ${theme.input.placeholder} ${theme.input.focus} text-sm`}
          />
        </div>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Platform Filter */}
        <div>
          <label className={`text-xs font-semibold ${theme.text.label} mb-2 block`}>
            Platform
          </label>
          <select
            value={platformFilter}
            onChange={(e) => onPlatformChange(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${theme.card.border} ${theme.input.background} ${theme.input.text} ${theme.input.focus} text-sm`}
          >
            <option value="all">All Platforms</option>
            <option value="hydra">Hydra</option>
            <option value="aws">AWS</option>
            <option value="gcp">GCP</option>
            <option value="tims">TIMS</option>
            <option value="one-dato">One Dato</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className={`text-xs font-semibold ${theme.text.label} mb-2 block`}>
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${theme.card.border} ${theme.input.background} ${theme.input.text} ${theme.input.focus} text-sm`}
          >
            <option value="all">All Status</option>
            <option value="live">LIVE</option>
            <option value="non-live">NON-LIVE</option>
            <option value="draft">DRAFT</option>
            <option value="in-review">IN REVIEW</option>
          </select>
        </div>

        {/* Release Date Filter */}
        <div>
          <label className={`text-xs font-semibold ${theme.text.label} mb-2 block`}>
            Release Date
          </label>
          <input
            type="date"
            className={`w-full px-3 py-2 rounded-lg border ${theme.card.border} ${theme.input.background} ${theme.input.text} ${theme.input.focus} text-sm`}
          />
        </div>
      </div>
    </div>
  );
}