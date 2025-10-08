// src/app/tools/env-matrix/[platform]/[aimId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Application } from '@/types';
import ApplicationDetailsView from '@/components/env-matrix/hydra-application-level/applicationdetailsview';
import { ArrowLeft, Edit, Trash2, Save, X } from 'lucide-react';

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const platform = params.platform as string;
  const aimId = params.aimId as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? (resolvedTheme === 'dark' || currentTheme === 'dark') : false;

  const theme = isDark ? {
    background: "from-gray-900 via-gray-800 to-indigo-900",
    card: "bg-slate-800 border-slate-600",
    text: "text-white",
    textSecondary: "text-gray-300",
    input: "bg-slate-900 border-slate-600 text-white placeholder-gray-400",
    accent: "bg-teal-600 hover:bg-teal-700",
  } : {
    background: "from-cyan-50 via-teal-50 to-amber-50",
    card: "bg-white border-teal-200 shadow-sm",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    input: "bg-gray-50 border-teal-300 text-gray-900 placeholder-gray-500",
    accent: "bg-teal-600 hover:bg-teal-700",
  };

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/env-matrix/applications?platform=${platform}`);
        const result = await response.json();
        
        if (result.success) {
          const app = result.data.find((a: Application) => a.aimId === aimId);
          if (app) {
            setApplication(app);
          } else {
            console.error('Application not found');
          }
        }
      } catch (error) {
        console.error('Failed to fetch application:', error);
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchApplication();
    }
  }, [platform, aimId, mounted]);

  const handleSave = async () => {
    // TODO: Call backend API to save changes
    console.log('Saving application:', application);
    // await fetch(`/api/backend/applications/${aimId}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(application)
    // });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this application?')) {
      // TODO: Call backend API to delete
      console.log('Deleting application:', aimId);
      // await fetch(`/api/backend/applications/${aimId}`, { method: 'DELETE' });
      router.push(`/tools/env-matrix/${platform}`);
    }
  };

  const handleApplicationUpdate = (updatedApp: Application) => {
    setApplication(updatedApp);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={theme.textSecondary}>Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Application Not Found</h2>
          <button
            onClick={() => router.push(`/tools/env-matrix/${platform}`)}
            className={`px-6 py-3 ${theme.accent} text-white rounded-xl font-semibold`}
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text}`}>
      <div className="max-w-7xl mx-auto px-6 py-8 pt-20">
        {/* Header */}
        <div className={`${theme.card} border rounded-2xl p-6 mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.push(`/tools/env-matrix/${platform}`)}
              className={`text-sm ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} flex items-center gap-2 font-medium transition-colors`}
            >
              <ArrowLeft size={16} />
              Back to {platform === 'hydra' ? 'Hydra' : 'Non-Hydra'} Applications
            </button>

            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className={`px-5 py-2.5 ${theme.card} border-2 rounded-xl text-sm font-semibold hover:opacity-80 transition-all flex items-center gap-2`}
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className={`px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg`}
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`px-5 py-2.5 ${theme.accent} text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105`}
                  >
                    <Edit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className={`px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg hover:scale-105`}
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Application Header */}
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 ${
              platform === 'hydra'
                ? isDark ? 'bg-gradient-to-br from-teal-600 to-cyan-700' : 'bg-gradient-to-br from-teal-500 to-cyan-600'
                : isDark ? 'bg-gradient-to-br from-orange-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-red-600'
            } rounded-2xl flex items-center justify-center text-4xl shadow-xl`}>
              {platform === 'hydra' ? '🌐' : '🔧'}
            </div>
            <div>
              <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
                {application.applicationName}
              </h1>
              <div className="flex items-center gap-4">
                <span className={`text-sm ${theme.textSecondary}`}>
                  ID: <span className="font-mono">{application.aimId}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                }`}>
                  Active
                </span>
                {application.updatedAt && (
                  <span className={`text-sm ${theme.textSecondary}`}>
                    Updated: {new Date(application.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Application Details View */}
        <ApplicationDetailsView
          application={application}
          onUpdate={handleApplicationUpdate}
          isEditing={isEditing}
          theme={theme}
          isDark={isDark}
        />
      </div>
    </div>
  );
}