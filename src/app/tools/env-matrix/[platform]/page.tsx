// src/app/tools/env-matrix/[platform]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Application } from '@/types';
import ApplicationCard from '@/components/env-matrix/applicationcard';
import PlatformDashboardPanel from '@/components/env-matrix/hydra-page-level/platformdashboardpanel';
import { Search } from 'lucide-react';

export default function PlatformPage() {
  const params = useParams();
  const router = useRouter();
  const { theme: currentTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const platform = params.platform as string;

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

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/env-matrix/applications?platform=${platform}`);
      const result = await response.json();
      
      if (result.success) {
        setApplications(result.data);
        setFilteredApps(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchApplications();
    }
  }, [platform, mounted]);

  // Filter logic
  useEffect(() => {
    let filtered = applications;

    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.applicationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.aimId?.toString().includes(searchQuery)
      );
    }

    if (selectedProject !== 'all') {
      filtered = filtered.filter(app => 
        app.Projects?.some(project => project.project === selectedProject)
      );
    }

    setFilteredApps(filtered);
  }, [searchQuery, selectedProject, applications]);

  // Get unique projects
  const allProjects = Array.from(
    new Set(applications.flatMap(app => 
      app.Projects?.map(project => project.project) || []
    ))
  );

  const handleRefresh = () => {
    fetchApplications();
  };

  const handleNewApplication = () => {
    console.log('New application clicked');
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
          <p className={theme.textSecondary}>Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text}`}>
      <div className="max-w-7xl mx-auto px-6 py-8 pt-25">
        
        {/* Hero Section - Platform Info */}
        <PlatformDashboardPanel 
  platform={platform}
  totalApps={applications.length}
  theme={theme}
  isDark={isDark}
  onRefresh={handleRefresh}
  onNewApplication={handleNewApplication}
/>

        {/* Search and Filters */}
        <div className={`${theme.card} border rounded-2xl p-6 mb-8`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} size={20} />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 ${theme.input} rounded-xl border-2 focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all`}
              />
            </div>

            {/* Project Filter */}
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className={`px-4 py-3 ${theme.input} rounded-xl border-2 focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'} transition-all`}
            >
              <option value="all">All Projects</option>
              {allProjects.map(project => (
                <option key={project} value={project}>{project}</option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  viewMode === 'grid' 
                    ? `${theme.accent} text-white` 
                    : `${theme.card} ${theme.text} border`
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                  viewMode === 'list' 
                    ? `${theme.accent} text-white` 
                    : `${theme.card} ${theme.text} border`
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedProject !== 'all') && (
            <div className="flex items-center gap-2 mt-4">
              <span className={`text-sm ${theme.textSecondary}`}>Active filters:</span>
              {searchQuery && (
                <span className={`px-3 py-1 ${isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'} rounded-full text-sm font-semibold flex items-center gap-2`}>
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="hover:opacity-70">✕</button>
                </span>
              )}
              {selectedProject !== 'all' && (
                <span className={`px-3 py-1 ${isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'} rounded-full text-sm font-semibold flex items-center gap-2`}>
                  Project: {selectedProject}
                  <button onClick={() => setSelectedProject('all')} className="hover:opacity-70">✕</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className={`text-2xl font-bold ${theme.text}`}>
            Applications
            <span className={`ml-3 text-lg font-normal ${theme.textSecondary}`}>
              ({filteredApps.length} {filteredApps.length === 1 ? 'result' : 'results'})
            </span>
          </h2>
        </div>

        {/* Applications Grid/List */}
        {filteredApps.length === 0 ? (
          <div className={`${theme.card} border rounded-2xl p-12 text-center`}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-xl font-bold ${theme.text} mb-2`}>No applications found</h3>
            <p className={theme.textSecondary}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'flex flex-col gap-4'
          }>
            {filteredApps.map((app, index) => (
              <ApplicationCard
                key={app.aimId || `app-${index}`}
                application={app}
                viewMode={viewMode}
                theme={theme}
                isDark={isDark}
                onClick={() => router.push(`/tools/env-matrix/${platform}/${app.aimId}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}