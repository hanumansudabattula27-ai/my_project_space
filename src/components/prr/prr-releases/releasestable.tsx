// // // src/components/prr/prr-releases/ReleasesTable.tsx

// // 'use client';

// // import React from 'react';
// // import { PRRApplication } from '@/types/prr/type';
// // import { prrTheme } from '@/lib/prr/theme';
// // import { Eye, Edit, MoreVertical } from 'lucide-react';
// // import Link from 'next/link';

// // interface ReleasesTableProps {
// //   isDark: boolean;
// //   releases: PRRApplication[];
// // }

// // export default function ReleasesTable({ isDark, releases }: ReleasesTableProps) {
// //   const theme = isDark ? prrTheme.dark : prrTheme.light;

// //   const getStatusBadge = (status: string) => {
// //     if (status.toUpperCase() === 'LIVE') {
// //       return theme.badge.live;
// //     } else if (status.toUpperCase() === 'NON-LIVE') {
// //       return theme.badge.nonLive;
// //     } else if (status.toUpperCase() === 'IN REVIEW') {
// //       return theme.badge.inReview;
// //     }
// //     return theme.badge.approved;
// //   };

// //   return (
// //     <div className={`border ${theme.card.border} rounded-lg overflow-hidden mb-8`}>
// //       <table className="w-full">
// //         <thead>
// //           <tr className={`${isDark ? 'bg-slate-700' : 'bg-gray-100'} border-b ${theme.card.border}`}>
// //             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label}`}>
// //               Project Name
// //             </th>
// //             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label} hidden sm:table-cell`}>
// //               AIM ID
// //             </th>
// //             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label} hidden md:table-cell`}>
// //               Platform
// //             </th>
// //             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label}`}>
// //               Status
// //             </th>
// //             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label} hidden lg:table-cell`}>
// //               Release Date
// //             </th>
// //             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label}`}>
// //               Actions
// //             </th>
// //           </tr>
// //         </thead>
// //         <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
// //           {releases.map((release) => (
// //             <tr
// //               key={release.aimId}
// //               className={`${theme.card.hover} hover:${theme.card.background} transition-colors`}
// //             >
// //               {/* Project Name */}
// //               <td className={`px-4 md:px-6 py-4 font-medium ${theme.text.primary} text-sm`}>
// //                 <div>
// //                   <p className="font-semibold">{release.basicInformation.projectName}</p>
// //                   <p className={`text-xs ${theme.text.secondary} sm:hidden`}>{release.aimId}</p>
// //                 </div>
// //               </td>

// //               {/* AIM ID */}
// //               <td className={`px-4 md:px-6 py-4 ${theme.text.secondary} text-sm hidden sm:table-cell`}>
// //                 {release.aimId}
// //               </td>

// //               {/* Platform */}
// //               <td className={`px-4 md:px-6 py-4 ${theme.text.secondary} text-sm hidden md:table-cell`}>
// //                 {release.basicInformation.platform}
// //               </td>

// //               {/* Status */}
// //               <td className={`px-4 md:px-6 py-4 text-sm`}>
// //                 <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(release.basicInformation.status)}`}>
// //                   {release.basicInformation.status}
// //                 </span>
// //               </td>

// //               {/* Release Date */}
// //               <td className={`px-4 md:px-6 py-4 ${theme.text.secondary} text-sm hidden lg:table-cell`}>
// //                 {release.basicInformation.releaseDate}
// //               </td>

// //               {/* Actions */}
// //               <td className={`px-4 md:px-6 py-4 text-sm`}>
// //                 <div className="flex items-center gap-2">
// //                   <Link
// //                     href={`/prr/releases/${release.aimId}`}
// //                     className={`inline-flex items-center gap-1 px-2.5 py-1.5 ${theme.button.primary} rounded text-xs font-medium transition-all hover:scale-105`}
// //                   >
// //                     <Eye className="w-3.5 h-3.5" />
// //                     <span className="hidden sm:inline">View</span>
// //                   </Link>
// //                   <Link
// //                     href={`/prr/releases/${release.aimId}/edit`}
// //                     className={`inline-flex items-center gap-1 px-2.5 py-1.5 border ${theme.card.border} ${theme.text.primary} rounded text-xs font-medium hover:${theme.card.hover} transition-all`}
// //                   >
// //                     <Edit className="w-3.5 h-3.5" />
// //                     <span className="hidden sm:inline">Edit</span>
// //                   </Link>
// //                   <button className={`p-1.5 rounded hover:${theme.card.hover} transition-colors`}>
// //                     <MoreVertical className={`w-4 h-4 ${theme.text.tertiary}`} />
// //                   </button>
// //                 </div>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }



//  // src/components/prr/prr-releases/ReleasesTable.tsx

// 'use client';

// import React from 'react';
// import { PRRApplication } from '@/types/prr/type';
// import { prrTheme } from '@/lib/prr/theme';
// import { Eye, Edit, MoreVertical } from 'lucide-react';
// import Link from 'next/link';

// interface ReleasesTableProps {
//   isDark: boolean;
//   releases: PRRApplication[];
// }

// export default function ReleasesTable({ isDark, releases }: ReleasesTableProps) {
//   const theme = isDark ? prrTheme.dark : prrTheme.light;
//   const headerBg = isDark ? 'bg-slate-700' : 'bg-gray-100';

//   const getStatusBadge = (status: string) => {
//     const statusUpper = status.toUpperCase();
//     if (statusUpper === 'LIVE') {
//       return theme.badge.live;
//     } else if (statusUpper === 'NON-LIVE') {
//       return theme.badge.nonLive;
//     } else if (statusUpper === 'IN REVIEW') {
//       return theme.badge.inReview;
//     }
//     return theme.badge.approved;
//   };

//   return (
//     <div className={`border ${theme.card.border} rounded-lg overflow-hidden mb-8`}>
//       <table className="w-full">
//         <thead>
//           <tr className={`${headerBg} border-b ${theme.card.border}`}>
//             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label}`}>
//               Project Name
//             </th>
//             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label} hidden sm:table-cell`}>
//               AIM ID
//             </th>
//             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label} hidden md:table-cell`}>
//               Platform
//             </th>
//             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label}`}>
//               Status
//             </th>
//             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label} hidden lg:table-cell`}>
//               Release Date
//             </th>
//             <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label}`}>
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className={`divide-y ${theme.card.border}`}>
//           {releases.map((release) => (
//             <tr
//               key={release.aimId}
//               className={`${theme.card.hover} transition-colors`}
//             >
//               {/* Project Name */}
//               <td className={`px-4 md:px-6 py-4 font-medium ${theme.text.primary} text-sm`}>
//                 <div>
//                   <p className="font-semibold">{release.basicInformation.projectName}</p>
//                   <p className={`text-xs ${theme.text.secondary} sm:hidden`}>{release.aimId}</p>
//                 </div>
//               </td>

//               {/* AIM ID */}
//               <td className={`px-4 md:px-6 py-4 ${theme.text.secondary} text-sm hidden sm:table-cell`}>
//                 {release.aimId}
//               </td>

//               {/* Platform */}
//               <td className={`px-4 md:px-6 py-4 ${theme.text.secondary} text-sm hidden md:table-cell`}>
//                 {release.basicInformation.platform}
//               </td>

//               {/* Status */}
//               <td className={`px-4 md:px-6 py-4 text-sm`}>
//                 <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(release.basicInformation.status)}`}>
//                   {release.basicInformation.status}
//                 </span>
//               </td>

//               {/* Release Date */}
//               <td className={`px-4 md:px-6 py-4 ${theme.text.secondary} text-sm hidden lg:table-cell`}>
//                 {release.basicInformation.releaseDate}
//               </td>

//               {/* Actions */}
//               <td className={`px-4 md:px-6 py-4 text-sm`}>
//                 <div className="flex items-center gap-2">
//                   <Link
//                     href={`/prr/releases/${release.aimId}`}
//                     className={`inline-flex items-center gap-1 px-2.5 py-1.5 ${theme.button.primary} rounded text-xs font-medium transition-all hover:scale-105`}
//                   >
//                     <Eye className="w-3.5 h-3.5" />
//                     <span className="hidden sm:inline">View</span>
//                   </Link>
//                   <Link
//                     href={`/prr/releases/${release.aimId}/edit`}
//                     className={`inline-flex items-center gap-1 px-2.5 py-1.5 border ${theme.card.border} ${theme.text.primary} rounded text-xs font-medium hover:${theme.card.hover} transition-all`}
//                   >
//                     <Edit className="w-3.5 h-3.5" />
//                     <span className="hidden sm:inline">Edit</span>
//                   </Link>
//                   <button className={`p-1.5 rounded hover:${theme.card.hover} transition-colors`}>
//                     <MoreVertical className={`w-4 h-4 ${theme.text.tertiary}`} />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





// src/components/prr/prr-releases/ReleasesTable.tsx - UPDATED

'use client';

import React from 'react';
import { PRRApplication } from '@/types/prr/type';
import { prrTheme } from '@/lib/prr/theme';
import { Eye, Edit, MoreVertical } from 'lucide-react';
import Link from 'next/link';

interface ReleasesTableProps {
  isDark: boolean;
  releases: PRRApplication[];
  onEdit: (release: PRRApplication) => void;
}

export default function ReleasesTable({ isDark, releases, onEdit }: ReleasesTableProps) {
  const theme = isDark ? prrTheme.dark : prrTheme.light;
  const headerBg = isDark ? 'bg-slate-700' : 'bg-gray-100';

  const getStatusBadge = (status: string) => {
    const statusUpper = status.toUpperCase();
    if (statusUpper === 'LIVE') {
      return theme.badge.live;
    } else if (statusUpper === 'NON-LIVE') {
      return theme.badge.nonLive;
    } else if (statusUpper === 'IN REVIEW') {
      return theme.badge.inReview;
    }
    return theme.badge.approved;
  };

  return (
    <div className={`border ${theme.card.border} rounded-lg overflow-hidden mb-8`}>
      <table className="w-full">
        <thead>
          <tr className={`${headerBg} border-b ${theme.card.border}`}>
            <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label}`}>
              Project Name
            </th>
            <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label} hidden sm:table-cell`}>
              AIM ID
            </th>
            <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label} hidden md:table-cell`}>
              Platform
            </th>
            <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label}`}>
              Status
            </th>
            <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label} hidden lg:table-cell`}>
              Release Date
            </th>
            <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold ${theme.text.label}`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${theme.card.border}`}>
          {releases.map((release) => (
            <tr
              key={release.aimId}
              className={`${theme.card.hover} transition-colors`}
            >
              {/* Project Name */}
              <td className={`px-4 md:px-6 py-4 font-medium ${theme.text.primary} text-sm`}>
                <div>
                  <p className="font-semibold">{release.basicInformation.projectName}</p>
                  <p className={`text-xs ${theme.text.secondary} sm:hidden`}>{release.aimId}</p>
                </div>
              </td>

              {/* AIM ID */}
              <td className={`px-4 md:px-6 py-4 ${theme.text.secondary} text-sm hidden sm:table-cell`}>
                {release.aimId}
              </td>

              {/* Platform */}
              <td className={`px-4 md:px-6 py-4 ${theme.text.secondary} text-sm hidden md:table-cell`}>
                {release.basicInformation.platform}
              </td>

              {/* Status */}
              <td className={`px-4 md:px-6 py-4 text-sm`}>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(release.basicInformation.status)}`}>
                  {release.basicInformation.status}
                </span>
              </td>

              {/* Release Date */}
              <td className={`px-4 md:px-6 py-4 ${theme.text.secondary} text-sm hidden lg:table-cell`}>
                {release.basicInformation.releaseDate}
              </td>

              {/* Actions */}
              <td className={`px-4 md:px-6 py-4 text-sm`}>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/tools/prr/releases/${release.aimId}`}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 ${theme.button.primary} rounded text-xs font-medium transition-all hover:scale-105`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View</span>
                  </Link>
                  <button
                    onClick={() => onEdit(release)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 border ${theme.card.border} ${theme.text.primary} rounded text-xs font-medium hover:${theme.card.hover} transition-all`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button className={`p-1.5 rounded hover:${theme.card.hover} transition-colors`}>
                    <MoreVertical className={`w-4 h-4 ${theme.text.tertiary}`} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}