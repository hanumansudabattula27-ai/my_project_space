// // src/components/StatCard.tsx
// import React from 'react';

// interface StatCardProps {
//   value: number;
//   label: string;
//   icon?: string;
//   theme: any;
//   isDark: boolean;
// }

// export default function StatCard({ value, label, icon, theme, isDark }: StatCardProps) {
//   return (
//     <div className={`${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-teal-200'} backdrop-blur-sm border rounded-xl p-5 hover:shadow-lg transition-all`}>
//       <div className="flex items-center justify-between mb-2">
//         {icon && <span className="text-2xl">{icon}</span>}
//       </div>
//       <div className={`text-3xl font-bold ${theme.text} mb-1`}>
//         {value}
//       </div>
//       <div className={`text-sm font-medium ${theme.textSecondary}`}>
//         {label}
//       </div>
//     </div>
//   );
// }


// src/components/statscard.tsx
import React from 'react';

interface StatCardProps {
  value: number;
  label: string;
  icon?: string;
  theme: any;
  isDark: boolean;
}

export default function StatCard({ value, label, icon, theme, isDark }: StatCardProps) {
  return (
    <div className={`${theme.card} border rounded-lg p-4`}>
      {icon && <span className="text-xl mb-2 block">{icon}</span>}
      <div className={`text-2xl font-bold ${theme.text} mb-1`}>
        {value}
      </div>
      <div className={`text-xs font-semibold ${theme.textSecondary}`}>
        {label}
      </div>
    </div>
  );
}