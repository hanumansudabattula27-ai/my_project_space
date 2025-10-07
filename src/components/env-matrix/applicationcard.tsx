// src/components/ApplicationCard.tsx
import { Application } from '@/types';
import { Calendar, Layers, FolderOpen } from 'lucide-react';

interface ApplicationCardProps {
  application: Application;
  viewMode: 'grid' | 'list';
  theme: any;
  isDark: boolean;
  onClick: () => void;
}

export default function ApplicationCard({ application, viewMode, theme, isDark, onClick }: ApplicationCardProps) {
  const serviceCount = application.services?.length || 0;
  const projectCount = application.projects?.length || 0;

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className={`${theme.card} border rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all flex items-center justify-between`}
      >
        <div className="flex items-center gap-6 flex-1">
          <div className={`w-16 h-16 ${
            isDark ? 'bg-teal-900/30' : 'bg-teal-100'
          } rounded-xl flex items-center justify-center text-2xl font-bold ${
            isDark ? 'text-teal-400' : 'text-teal-700'
          }`}>
            {application.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${theme.text} mb-1`}>
              {application.name || `Application ${application.aimid}`}
            </h3>
            <p className={`text-sm ${theme.textSecondary} mb-2`}>
              ID: {application.aimid}
            </p>
            {application.description && (
              <p className={`text-sm ${theme.textSecondary}`}>{application.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
              {serviceCount}
            </div>
            <div className={`text-xs ${theme.textSecondary}`}>Services</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
              {projectCount}
            </div>
            <div className={`text-xs ${theme.textSecondary}`}>Projects</div>
          </div>
          <button className={`px-6 py-2.5 ${theme.accent} text-white rounded-xl font-semibold hover:opacity-90 transition-all`}>
            View Details →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${theme.card} border rounded-xl p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 ${
          isDark ? 'bg-teal-900/30' : 'bg-teal-100'
        } rounded-xl flex items-center justify-center text-xl font-bold ${
          isDark ? 'text-teal-400' : 'text-teal-700'
        }`}>
          {application.name?.charAt(0) || 'A'}
        </div>
        <span className={`px-3 py-1 ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'} rounded-full text-xs font-semibold`}>
          Active
        </span>
      </div>

      <h3 className={`text-lg font-bold ${theme.text} mb-2`}>
        {application.name || `Application ${application.aimid}`}
      </h3>
      
      <p className={`text-sm ${theme.textSecondary} mb-4`}>
        ID: {application.aimid}
      </p>

      {application.description && (
        <p className={`text-sm ${theme.textSecondary} mb-4 line-clamp-2`}>
          {application.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`${isDark ? 'bg-slate-700/50' : 'bg-gray-50'} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <Layers size={14} className={theme.textSecondary} />
            <span className={`text-xs ${theme.textSecondary}`}>Services</span>
          </div>
          <div className={`text-xl font-bold ${theme.text}`}>{serviceCount}</div>
        </div>
        <div className={`${isDark ? 'bg-slate-700/50' : 'bg-gray-50'} rounded-lg p-3`}>
          <div className="flex items-center gap-2 mb-1">
            <FolderOpen size={14} className={theme.textSecondary} />
            <span className={`text-xs ${theme.textSecondary}`}>Projects</span>
          </div>
          <div className={`text-xl font-bold ${theme.text}`}>{projectCount}</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-opacity-10" style={{ borderColor: isDark ? '#64748b' : '#14b8a6' }}>
        <span className={`text-xs ${theme.textSecondary} flex items-center gap-1`}>
          <Calendar size={12} />
          Updated recently
        </span>
        <button className={`text-sm font-semibold ${isDark ? 'text-teal-400' : 'text-teal-600'} hover:opacity-70 transition-all`}>
          View →
        </button>
      </div>
    </div>
  );
}