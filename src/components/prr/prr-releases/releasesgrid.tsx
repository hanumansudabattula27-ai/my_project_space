// // // src/components/prr/prr-releases/ReleasesGrid.tsx

// // 'use client';

// // import React from 'react';
// // import { PRRApplication } from '@/types/prr/type';
// // import { prrTheme } from '@/lib/prr/theme';
// // import { Eye, Edit, MoreVertical } from 'lucide-react';
// // import Link from 'next/link';

// // interface ReleasesGridProps {
// //   isDark: boolean;
// //   releases: PRRApplication[];
// // }

// // export default function ReleasesGrid({ isDark, releases }: ReleasesGridProps) {
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

// //   const getPlatformColor = (platform: string) => {
// //     const colors: { [key: string]: string } = {
// //       hydra: isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-700',
// //       aws: isDark ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-700',
// //       gcp: isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700',
// //       tims: isDark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700',
// //       'one-dato': isDark ? 'bg-pink-900/30 text-pink-300' : 'bg-pink-100 text-pink-700',
// //     };
// //     return colors[platform.toLowerCase()] || colors.hydra;
// //   };

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
// //       {releases.map((release) => (
// //         <div
// //           key={release.aimId}
// //           className={`${theme.card.background} border ${theme.card.border} rounded-lg p-5 hover:shadow-lg transition-all group cursor-pointer`}
// //         >
// //           {/* Header */}
// //           <div className="flex justify-between items-start mb-3">
// //             <div className="flex-1">
// //               <h3 className={`font-bold ${theme.text.primary} group-hover:${theme.accent} transition-colors line-clamp-2`}>
// //                 {release.basicInformation.projectName}
// //               </h3>
// //               <p className={`text-xs ${theme.text.secondary} mt-1`}>
// //                 {release.aimId}
// //               </p>
// //             </div>
// //             <button className={`p-1.5 rounded hover:${theme.card.background} transition-colors hidden group-hover:block`}>
// //               <MoreVertical className={`w-4 h-4 ${theme.text.tertiary}`} />
// //             </button>
// //           </div>

// //           {/* Platform Badge */}
// //           <div className="flex gap-2 mb-3">
// //             <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPlatformColor(release.basicInformation.platform)}`}>
// //               {release.basicInformation.platform}
// //             </span>
// //             <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusBadge(release.basicInformation.status)}`}>
// //               {release.basicInformation.status}
// //             </span>
// //           </div>

// //           {/* Info */}
// //           <div className={`text-xs ${theme.text.tertiary} mb-4 space-y-1`}>
// //             <p>Release Date: <span className={theme.text.secondary}>{release.basicInformation.releaseDate}</span></p>
// //             <p>Approvals: <span className={theme.text.secondary}>
// //               {Object.values(release.approvalsAndSignOff).filter(a => a.name).length}/4
// //             </span></p>
// //           </div>

// //           {/* Completion Status */}
// //           <div className="mb-4">
// //             <div className="flex justify-between items-center mb-1">
// //               <span className={`text-xs font-medium ${theme.text.secondary}`}>Completion</span>
// //               <span className={`text-xs font-bold ${theme.text.primary}`}>
// //                 {calculateCompletion(release)}%
// //               </span>
// //             </div>
// //             <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
// //               <div
// //                 className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all"
// //                 style={{ width: `${calculateCompletion(release)}%` }}
// //               ></div>
// //             </div>
// //           </div>

// //           {/* Actions */}
// //           <div className="flex gap-2">
// //             <Link
// //               href={`/prr/releases/${release.aimId}`}
// //               className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 ${theme.button.primary} rounded-lg text-xs font-medium transition-all`}
// //             >
// //               <Eye className="w-3.5 h-3.5" />
// //               View
// //             </Link>
// //             <Link
// //               href={`/prr/releases/${release.aimId}/edit`}
// //               className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border ${theme.card.border} ${theme.text.primary} rounded-lg text-xs font-medium hover:${theme.card.hover} transition-all`}
// //             >
// //               <Edit className="w-3.5 h-3.5" />
// //               Edit
// //             </Link>
// //           </div>

// //           {/* Additional Suggestions (Commented) */}
// //           {/* 
// //             More possible actions:
// //             - Duplicate: Clone this release
// //             - Export: Download as PDF/JSON
// //             - Clone: Create from template
// //             - Archive: Archive this release
// //             - Share: Share with team
// //             - Delete: Delete release
// //             - View History: See version history
// //           */}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // function calculateCompletion(release: PRRApplication): number {
// //   let completed = 0;
// //   let total = 0;

// //   // Basic Information
// //   if (release.basicInformation.projectName) completed++;
// //   total++;

// //   // Feature Details
// //   if (release.featureAndDesignDetails.featureDetails) completed++;
// //   total++;

// //   // Platform Configuration
// //   if (release.platformConfiguration.numberOfZones.value) completed++;
// //   total++;

// //   // Approvals
// //   const approvals = Object.values(release.approvalsAndSignOff).filter(a => a.name && a.date).length;
// //   completed += approvals;
// //   total += 4;

// //   return Math.round((completed / total) * 100);
// // }



// // src/components/prr/prr-releases/ReleasesGrid.tsx

// 'use client';

// import React from 'react';
// import { PRRApplication } from '@/types/prr/type';
// import { prrTheme } from '@/lib/prr/theme';
// import { Eye, Edit, MoreVertical } from 'lucide-react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { useParams, useRouter } from 'next/navigation';

// interface ReleasesGridProps {
//   isDark: boolean;
//   releases: PRRApplication[];
// }

// export default function ReleasesGrid({ isDark, releases }: ReleasesGridProps) {
//   const theme = isDark ? prrTheme.dark : prrTheme.light;
//     const router = useRouter();
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

//   const getPlatformBadge = (platform: string) => {
//     const platformLower = platform.toLowerCase();
//     return (theme.platformBadges as Record<string, string>)[platformLower] || theme.platformBadges.hydra;
//   };

//   /**
//    * COMPLETION LOGIC EXPLANATION:
//    * ============================
//    * The completion percentage is calculated based on how many key sections are filled:
//    * 
//    * 1. Basic Information (1 point)
//    *    - Project name is filled
//    * 
//    * 2. Feature Details (1 point)
//    *    - Feature description is filled
//    * 
//    * 3. Platform Configuration (1 point)
//    *    - Number of zones is configured
//    * 
//    * 4. Approvals (4 points - 1 per reviewer)
//    *    - SRE Reviewer: Has name + date (1 point)
//    *    - QA Lead: Has name + date (1 point)
//    *    - Product Owner: Has name + date (1 point)
//    *    - Engineering Owner: Has name + date (1 point)
//    * 
//    * Total possible: 8 points = 100%
//    * 
//    * Example:
//    * - If all approvals are done + basic info + feature + platform config = 8/8 = 100%
//    * - If only SRE + QA approved = 2/8 = 25%
//    * - If all approvals + basic info = 5/8 = 62%
//    */
//   const calculateCompletion = (release: PRRApplication): number => {
//     let completed = 0;
//     let total = 8; // Total possible points

//     // 1. Basic Information (1 point)
//     if (release.basicInformation.projectName) {
//       completed += 1;
//     }

//     // 2. Feature Details (1 point)
//     if (release.featureAndDesignDetails.featureDetails) {
//       completed += 1;
//     }

//     // 3. Platform Configuration (1 point)
//     if (release.platformConfiguration.numberOfZones.value) {
//       completed += 1;
//     }

//     // 4. Approvals (4 points - 1 per reviewer)
//     if (release.approvalsAndSignOff.sreReviewer.name && release.approvalsAndSignOff.sreReviewer.date) {
//       completed += 1;
//     }
//     if (release.approvalsAndSignOff.qaLead.name && release.approvalsAndSignOff.qaLead.date) {
//       completed += 1;
//     }
//     if (release.approvalsAndSignOff.productOwner.name && release.approvalsAndSignOff.productOwner.date) {
//       completed += 1;
//     }
//     if (release.approvalsAndSignOff.engineeringOwner.name && release.approvalsAndSignOff.engineeringOwner.date) {
//       completed += 1;
//     }

//     return Math.round((completed / total) * 100);
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//       {releases.map((release) => {
//         const completion = calculateCompletion(release);

//         return (
//           <div
//             key={release.aimId}
//             className={`${theme.card.background} border ${theme.card.border} rounded-lg p-5 hover:shadow-lg transition-all group cursor-pointer`}
//           >
//             {/* Header */}
//             <div className="flex justify-between items-start mb-3">
//               <div className="flex-1">
//                 <h3 className={`font-bold ${theme.text.primary} group-hover:${theme.accent} transition-colors line-clamp-2`}>
//                   {release.basicInformation.projectName}
//                 </h3>
//                 <p className={`text-xs ${theme.text.secondary} mt-1`}>
//                   {release.aimId}
//                 </p>
//               </div>
//               <button className={`p-1.5 rounded hover:${theme.card.background} transition-colors hidden group-hover:block`}>
//                 <MoreVertical className={`w-4 h-4 ${theme.text.tertiary}`} />
//               </button>
//             </div>

//             {/* Platform & Status Badges - ALL from theme */}
//             <div className="flex gap-2 mb-3 flex-wrap">
//               <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPlatformBadge(release.basicInformation.platform)}`}>
//                 {release.basicInformation.platform}
//               </span>
//               <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusBadge(release.basicInformation.status)}`}>
//                 {release.basicInformation.status}
//               </span>
//             </div>

//             {/* Info - ALL from theme */}
//             <div className={`text-xs ${theme.text.tertiary} mb-4 space-y-1`}>
//               <p>Release Date: <span className={theme.text.secondary}>{release.basicInformation.releaseDate}</span></p>
//               <p>Approvals: <span className={theme.text.secondary}>
//                 {Object.values(release.approvalsAndSignOff).filter(a => a.name && a.date).length}/4
//               </span></p>
//             </div>

//             {/* Completion Status - ALL from theme */}
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-1">
//                 <span className={`text-xs font-medium ${theme.text.secondary}`}>Completion</span>
//                 <span className={`text-xs font-bold ${theme.text.primary}`}>
//                   {completion}%
//                 </span>
//               </div>
//               <div className={`w-full h-1.5 rounded-full ${theme.progressBar.background}`}>
//                 <div
//                   className={`h-full rounded-full ${theme.progressBar.fill} transition-all`}
//                   style={{ width: `${completion}%` }}
//                 ></div>
//               </div>
//             </div>

//             {/* Actions - ALL from theme */}
//             <div className="flex gap-2">
//               <Button
//                 onClick={() => router.push(`/tools/prr/releases/${release.aimId}`)}
               
//                 className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 ${theme.button.primary} rounded-lg text-xs font-medium transition-all`}
//               >
//                 <Eye className="w-3.5 h-3.5" />
//                 View
//               </Button>
//               <Button
//                  onClick={() => router.push(`/tools/prr/releases/${release.aimId}`)}
//                 className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border ${theme.card.border} ${theme.text.primary} rounded-lg text-xs font-medium hover:${theme.card.hover} transition-all`}
//               >
//                 <Edit className="w-3.5 h-3.5" />
//                 Edit
//               </Button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }




// src/components/prr/prr-releases/ReleasesGrid.tsx - UPDATED

'use client';

import React from 'react';
import { PRRApplication } from '@/types/prr/type';
import { prrTheme } from '@/lib/prr/theme';
import { Eye, Edit, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ReleasesGridProps {
  isDark: boolean;
  releases: PRRApplication[];
  onEdit: (release: PRRApplication) => void;
}

export default function ReleasesGrid({ isDark, releases, onEdit }: ReleasesGridProps) {
  const theme = isDark ? prrTheme.dark : prrTheme.light;
  const router = useRouter();

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

  const getPlatformBadge = (platform: string) => {
    const platformLower = platform.toLowerCase();
    return (theme.platformBadges as Record<string, string>)[platformLower] || theme.platformBadges.hydra;
  };

  const calculateCompletion = (release: PRRApplication): number => {
    let completed = 0;
    let total = 8;

    if (release.basicInformation.projectName) {
      completed += 1;
    }

    if (release.featureAndDesignDetails.featureDetails) {
      completed += 1;
    }

    if (release.platformConfiguration.numberOfZones.value) {
      completed += 1;
    }

    if (release.approvalsAndSignOff.sreReviewer.name && release.approvalsAndSignOff.sreReviewer.date) {
      completed += 1;
    }
    if (release.approvalsAndSignOff.qaLead.name && release.approvalsAndSignOff.qaLead.date) {
      completed += 1;
    }
    if (release.approvalsAndSignOff.productOwner.name && release.approvalsAndSignOff.productOwner.date) {
      completed += 1;
    }
    if (release.approvalsAndSignOff.engineeringOwner.name && release.approvalsAndSignOff.engineeringOwner.date) {
      completed += 1;
    }

    return Math.round((completed / total) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {releases.map((release) => {
        const completion = calculateCompletion(release);

        return (
          <div
            key={release.aimId}
            className={`${theme.card.background} border ${theme.card.border} rounded-lg p-5 hover:shadow-lg transition-all group cursor-pointer`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className={`font-bold ${theme.text.primary} group-hover:${theme.accent} transition-colors line-clamp-2`}>
                  {release.basicInformation.projectName}
                </h3>
                <p className={`text-xs ${theme.text.secondary} mt-1`}>
                  {release.aimId}
                </p>
              </div>
              <button className={`p-1.5 rounded hover:${theme.card.background} transition-colors hidden group-hover:block`}>
                <MoreVertical className={`w-4 h-4 ${theme.text.tertiary}`} />
              </button>
            </div>

            {/* Platform & Status Badges */}
            <div className="flex gap-2 mb-3 flex-wrap">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPlatformBadge(release.basicInformation.platform)}`}>
                {release.basicInformation.platform}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusBadge(release.basicInformation.status)}`}>
                {release.basicInformation.status}
              </span>
            </div>

            {/* Info */}
            <div className={`text-xs ${theme.text.tertiary} mb-4 space-y-1`}>
              <p>Release Date: <span className={theme.text.secondary}>{release.basicInformation.releaseDate}</span></p>
              <p>Approvals: <span className={theme.text.secondary}>
                {Object.values(release.approvalsAndSignOff).filter(a => a.name && a.date).length}/4
              </span></p>
            </div>

            {/* Completion Status */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-medium ${theme.text.secondary}`}>Completion</span>
                <span className={`text-xs font-bold ${theme.text.primary}`}>
                  {completion}%
                </span>
              </div>
              <div className={`w-full h-1.5 rounded-full ${theme.progressBar.background}`}>
                <div
                  className={`h-full rounded-full ${theme.progressBar.fill} transition-all`}
                  style={{ width: `${completion}%` }}
                ></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => router.push(`/tools/prr/releases/${release.aimId}`)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 ${theme.button.primary} rounded-lg text-xs font-medium transition-all`}
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </Button>
              <Button
                onClick={() => onEdit(release)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border ${theme.card.border} ${theme.text.primary} rounded-lg text-xs font-medium hover:${theme.card.hover} transition-all`}
              >
                <Edit className="w-3.5 h-3.5" />
                Edit
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}