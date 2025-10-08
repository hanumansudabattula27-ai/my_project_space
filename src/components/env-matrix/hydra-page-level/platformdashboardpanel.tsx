// src/components/env-matrix/PlatformDashboardPanel.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw, Plus, Server, Activity, Zap, BarChart3, Clock } from 'lucide-react';

interface PlatformDashboardPanelProps {
  platform: string;
  totalApps: number;
  theme: any;
  isDark: boolean;
  onRefresh?: () => void;
  onNewApplication?: () => void;
}

export default function PlatformDashboardPanel({ 
  platform, 
  totalApps, 
  theme, 
  isDark,
  onRefresh,
  onNewApplication 
}: PlatformDashboardPanelProps) {
  const router = useRouter();
  
  const platformName = platform === 'hydra' ? 'Hydra Platform' : 'Non-Hydra Platform';
  const platformIcon = platform === 'hydra' ? '🌐' : '🔧';
  const isHydra = platform === 'hydra';

  // Mock metrics - replace with real data
  const metrics = [
    { label: 'Applications', value: totalApps, icon: Server, color: isHydra ? 'teal' : 'orange' },
    { label: 'Active Services', value: '47', icon: Activity, color: 'emerald' },
    { label: 'Total Requests', value: '1.2M', icon: Zap, color: 'blue' },
    { label: 'Avg Response', value: '120ms', icon: Clock, color: 'purple' },
  ];

  return (
    <div className="mb-8 space-y-6">
      {/* Header Bar */}
      <div className={`${theme.card} border rounded-2xl p-6`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/tools/env-matrix')}
            className={`text-sm ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} flex items-center gap-2 font-medium transition-colors`}
          >
            <ArrowLeft size={16} />
            Back to all platforms
          </button>

          <div className="flex items-center gap-3">
            <button 
              onClick={onRefresh}
              className={`px-5 py-2.5 ${theme.card} border-2 rounded-xl text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button 
              onClick={onNewApplication}
              className={`px-5 py-2.5 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105`}
            >
              <Plus size={16} />
              New Application
            </button>
          </div>
        </div>
      </div>

      {/* Platform Info Card */}
      <div className={`${theme.card} border rounded-2xl p-8`}>
        <div className="flex items-center gap-6 mb-8">
          <div className={`w-24 h-24 ${
            isHydra
              ? isDark ? 'bg-gradient-to-br from-teal-600 to-cyan-700' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
              : isDark ? 'bg-gradient-to-br from-orange-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-red-600'
          } rounded-3xl flex items-center justify-center text-5xl shadow-2xl`}>
            {platformIcon}
          </div>
          <div>
            <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
              {platformName}
            </h1>
            <p className={`text-lg ${theme.textSecondary}`}>
              Cloud-native infrastructure and modern services
            </p>
          </div>
          <div className="ml-auto">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
              isDark ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <span className={`w-2.5 h-2.5 ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'} rounded-full animate-pulse`}></span>
              System Online
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={index}
                className={`${isDark ? 'bg-slate-700/50' : 'bg-gray-50'} rounded-xl p-6 border ${
                  isDark ? 'border-slate-600' : 'border-gray-200'
                } hover:shadow-lg transition-all`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    metric.color === 'teal' ? isDark ? 'bg-teal-900/50 text-teal-400' : 'bg-teal-100 text-teal-700' :
                    metric.color === 'orange' ? isDark ? 'bg-orange-900/50 text-orange-400' : 'bg-orange-100 text-orange-700' :
                    metric.color === 'emerald' ? isDark ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-700' :
                    metric.color === 'blue' ? isDark ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700' :
                    isDark ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className={`text-3xl font-bold ${theme.text} mb-1`}>
                  {metric.value}
                </div>
                <div className={`text-sm font-medium ${theme.textSecondary}`}>
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}