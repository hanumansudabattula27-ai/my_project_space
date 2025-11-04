
// 'use client';

// import React from 'react';
// import { Plus, Eye, ArrowRight } from 'lucide-react';
// import Link from 'next/link';
// import { prrTheme } from '@/lib/prr/theme';
// import { Button } from '@/components/ui/button';
// import { useParams, useRouter } from 'next/navigation';

// interface CTASectionsProps {
//   isDark: boolean;
// }

// export default function CTASections({ isDark }: CTASectionsProps) {
//   const theme = isDark ? prrTheme.dark : prrTheme.light;
//   const router = useRouter();
//   return (
//     <div className="space-y-6 mb-8">
//       {/* Row 1: Two Sections Side by Side */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Add New Release Section */}
//         <div className={`${theme.ctaSection.background} border ${theme.ctaSection.border} rounded-xl p-5 md:p-6 hover:shadow-lg transition-all group`}>
//           {/* Icon */}
//           <div className={`w-12 h-12 rounded-lg ${theme.ctaSection.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//             <Plus className={`w-6 h-6 ${theme.ctaSection.iconText}`} />
//           </div>

//           {/* Title */}
//           <h3 className={`text-lg font-bold ${theme.ctaSection.title} mb-1`}>
//             Add New Release
//           </h3>

//           {/* Description */}
//           <p className={`text-sm ${theme.ctaSection.description} mb-4 leading-relaxed`}>
//             Start a new production readiness review and begin filling out all required sections
//           </p>

//           {/* CTA Link */}
//           <Button
//             onClick={() => router.push(`/tools/prr/new-release`)}
//             className={`inline-flex items-center gap-2 ${theme.ctaSection.link} font-semibold text-sm hover:gap-3 transition-all`}
//           >
//             Create Release
//             <ArrowRight className="w-4 h-4" />
//           </Button>
//         </div>

//         {/* View All Releases Section */}
//         <div className={`${theme.ctaSection.background} border ${theme.ctaSection.border} rounded-xl p-5 md:p-6 hover:shadow-lg transition-all group`}>
//           {/* Icon */}
//           <div className={`w-12 h-12 rounded-lg ${theme.ctaSection.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//             <Eye className={`w-6 h-6 ${theme.ctaSection.iconText}`} />
//           </div>

//           {/* Title */}
//           <h3 className={`text-lg font-bold ${theme.ctaSection.title} mb-1`}>
//             View All Releases
//           </h3>

//           {/* Description */}
//           <p className={`text-sm ${theme.ctaSection.description} mb-4 leading-relaxed`}>
//             Browse and manage all releases with advanced filters and detailed information
//           </p>

//           {/* CTA Link */}
//           <Button
//             onClick={() => router.push(`/tools/prr/releases`)}
//             className={`inline-flex items-center gap-2 ${theme.ctaSection.link} font-semibold text-sm hover:gap-3 transition-all`}
//           >
//             Browse Releases
//             <ArrowRight className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import React from 'react';
import { Plus, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { prrTheme } from '@/lib/prr/theme';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CTASectionsProps {
  isDark: boolean;
  onAddRelease: () => void;
}

export default function CTASections({ isDark, onAddRelease }: CTASectionsProps) {
  const theme = isDark ? prrTheme.dark : prrTheme.light;
  const router = useRouter();

  return (
    <div className="space-y-6 mb-8">
      {/* Row 1: Two Sections Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add New Release Section - OPENS MODAL */}
        <div className={`${theme.ctaSection.background} border ${theme.ctaSection.border} rounded-xl p-5 md:p-6 hover:shadow-lg transition-all group`}>
          {/* Icon */}
          <div className={`w-12 h-12 rounded-lg ${theme.ctaSection.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <Plus className={`w-6 h-6 ${theme.ctaSection.iconText}`} />
          </div>

          {/* Title */}
          <h3 className={`text-lg font-bold ${theme.ctaSection.title} mb-1`}>
            Add New Release
          </h3>

          {/* Description */}
          <p className={`text-sm ${theme.ctaSection.description} mb-4 leading-relaxed`}>
            Start a new production readiness review and begin filling out all required sections
          </p>

          {/* CTA Button - CALLS onAddRelease */}
          <button
            onClick={onAddRelease}
            className={`inline-flex items-center gap-2 ${theme.ctaSection.link} font-semibold text-sm hover:gap-3 transition-all cursor-pointer`}
          >
            Create Release
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* View All Releases Section */}
        <div className={`${theme.ctaSection.background} border ${theme.ctaSection.border} rounded-xl p-5 md:p-6 hover:shadow-lg transition-all group`}>
          {/* Icon */}
          <div className={`w-12 h-12 rounded-lg ${theme.ctaSection.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <Eye className={`w-6 h-6 ${theme.ctaSection.iconText}`} />
          </div>

          {/* Title */}
          <h3 className={`text-lg font-bold ${theme.ctaSection.title} mb-1`}>
            View All Releases
          </h3>

          {/* Description */}
          <p className={`text-sm ${theme.ctaSection.description} mb-4 leading-relaxed`}>
            Browse and manage all releases with advanced filters and detailed information
          </p>

          {/* CTA Link */}
          <button
            onClick={() => router.push('/tools/prr/releases')}
            className={`inline-flex items-center gap-2 ${theme.ctaSection.link} font-semibold text-sm hover:gap-3 transition-all cursor-pointer`}
          >
            Browse Releases
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}