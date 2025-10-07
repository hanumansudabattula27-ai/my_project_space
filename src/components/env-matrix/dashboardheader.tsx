// src/components/DashboardHeader.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw, Plus } from 'lucide-react';

interface DashboardHeaderProps {
  platform: string;
  totalApps: number;
  theme: any;
  isDark: boolean;
}

export default function DashboardHeader({ platform, totalApps, theme, isDark }: DashboardHeaderProps) {
  const router = useRouter();
  
  const platformName = platform === 'hydra' ? 'Hydra Platform' : 'Non-Hydra Platform';
  const platformIcon = platform === 'hydra' ? '🌐' : '🔧';

  return (
    <div className={`${theme.card} border-b sticky top-0 z-50 backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className={`p-2 ${theme.card} border rounded-lg hover:opacity-80 transition-all`}
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${
                platform === 'hydra'
                  ? isDark ? 'bg-gradient-to-br from-teal-600 to-cyan-700' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
                  : isDark ? 'bg-gradient-to-br from-orange-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-red-600'
              } rounded-xl flex items-center justify-center text-2xl`}>
                {platformIcon}
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${theme.text}`}>{platformName}</h1>
                <p className={`text-sm ${theme.textSecondary}`}>{totalApps} applications</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className={`px-4 py-2 ${theme.card} border rounded-xl text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}>
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className={`px-4 py-2 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2`}>
              <Plus size={16} />
              New Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}