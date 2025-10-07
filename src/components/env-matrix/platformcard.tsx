// src/components/PlatformCard.tsx
import { Platform } from '@/types';

interface PlatformCardProps {
  platform: Platform;
  onSelect: (platformType: string) => void;
  theme: any;
  isDark: boolean;
}

export default function PlatformCard({ platform, onSelect, theme, isDark }: PlatformCardProps) {
  const isNonHydra = platform.type === 'non-hydra';

  const formatLastUpdated = (timestamp: number) => {
    const hours = Math.floor((Date.now() - timestamp) / (1000 * 60 * 60));
    return hours === 0 ? 'Just now' : `${hours} hours ago`;
  };

  return (
    <div
      onClick={() => onSelect(platform.type)}
      className={`relative group ${theme.card} border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}
    >
      <div className={`absolute -top-20 -right-20 w-64 h-64 ${
        isDark 
          ? 'bg-gradient-to-br from-teal-900/20 to-transparent'
          : 'bg-gradient-to-br from-teal-100/50 to-transparent'
      } rounded-full blur-3xl group-hover:opacity-75 transition-opacity`}></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 ${
              isNonHydra
                ? isDark ? 'bg-gradient-to-br from-orange-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-red-600'
                : isDark ? 'bg-gradient-to-br from-teal-600 to-cyan-700' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
            } rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
              {platform.icon}
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${theme.text} mb-1`}>
                {platform.name}
              </h3>
              <p className={`text-sm ${theme.textSecondary}`}>
                {platform.description}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 ${
            isDark ? 'bg-green-900/30' : 'bg-green-100'
          } rounded-full`}>
            <div className={`w-2 h-2 ${isDark ? 'bg-green-400' : 'bg-green-500'} rounded-full animate-pulse`}></div>
            <span className={`text-xs font-semibold ${isDark ? 'text-green-300' : 'text-green-700'}`}>
              Online
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { value: platform.stats.applications, label: 'Apps' },
            { value: platform.stats.services, label: 'Services' },
            { value: platform.stats.zones, label: 'Zones' }
          ].map((stat, idx) => (
            <div key={idx} className={`${
              isDark 
                ? isNonHydra ? 'bg-orange-900/20' : 'bg-teal-900/20'
                : isNonHydra ? 'bg-orange-50' : 'bg-teal-50'
            } rounded-xl p-4 text-center`}>
              <div className={`text-3xl font-bold ${
                isDark
                  ? isNonHydra ? 'text-orange-400' : 'text-teal-400'
                  : isNonHydra ? 'text-orange-700' : 'text-teal-700'
              } mb-1`}>
                {stat.value}
              </div>
              <div className={`text-xs font-semibold ${theme.textSecondary} uppercase tracking-wide`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className={`flex items-center justify-between pt-4 border-t ${
          isDark ? 'border-slate-700' : 'border-teal-200'
        }`}>
          <div className={`text-sm ${theme.textSecondary}`}>
            Updated {formatLastUpdated(platform.lastUpdated)}
          </div>
          <button
            className={`px-6 py-2.5 ${
              isNonHydra
                ? isDark ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-600 hover:bg-orange-700'
                : theme.accent
            } text-white rounded-xl font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
          >
            Enter Platform →
          </button>
        </div>
      </div>
    </div>
  );
}