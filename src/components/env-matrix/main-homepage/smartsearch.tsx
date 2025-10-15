// src/components/SmartSearch.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Building2, Zap, FolderOpen } from 'lucide-react';

interface SearchResult {
  applications: Array<{
    aimId: string;
    name: string;
    platform: string;
  }>;
  services: Array<{
    name: string;
    aimId: string;
    appName: string;
    projectName: string;
    platform: string;
  }>;
  projects: Array<{
    name: string;
    aimId: string;
    appName: string;
    platform: string;
  }>;
  totalApplications: number;
  totalServices: number;
  totalProjects: number;
}

interface SmartSearchProps {
  theme: any;
  isDark: boolean;
}

export default function SmartSearch({ theme, isDark }: SmartSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);  // ← FIX HERE

  // Debounced search
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setResults(null);
      setShowDropdown(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/env-matrix/hydra/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectApplication = (aimId: string) => {
    router.push(`/tools/env-matrix/hydra/${aimId}`);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleSelectService = (aimId: string) => {
    router.push(`/tools/env-matrix/hydra/${aimId}`);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleSelectProject = (aimId: string) => {
    router.push(`/tools/env-matrix/hydra/${aimId}`);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const hasResults = results && (
    results.applications.length > 0 ||
    results.services.length > 0 ||
    results.projects.length > 0
  );

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className={theme.textSecondary} size={18} />
        </div>
        <input
          type="text"
          placeholder="Search applications, services, or projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (results) setShowDropdown(true);
          }}
          className={`w-full px-5 py-3 pl-12 text-sm rounded-xl border-2 ${theme.input} focus:outline-none focus:ring-2 ${
            isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
          } transition-all`}
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setResults(null);
              setShowDropdown(false);
            }}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme.textSecondary} hover:opacity-70`}
          >
            <X size={18} />
          </button>
        )}
        {isLoading && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && hasResults && (
        <div
          className={`absolute top-full mt-2 w-full ${theme.card} border-2 ${
            isDark ? 'border-slate-600' : 'border-teal-200'
          } rounded-xl shadow-2xl z-50 max-h-[500px] overflow-hidden`}
        >
          {/* Applications Section */}
          {results.applications.length > 0 && (
            <div className={`border-b ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
              <div className={`px-4 py-2 ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'} flex items-center gap-2`}>
                <Building2 size={16} className={theme.textSecondary} />
                <span className={`text-xs font-bold ${theme.text} uppercase tracking-wide`}>
                  Applications ({results.totalApplications})
                </span>
              </div>
              <div className="max-h-[150px] overflow-y-auto">
                {results.applications.map((app, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectApplication(app.aimId)}
                    className={`w-full px-4 py-3 text-left hover:bg-opacity-80 transition-all ${
                      isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className={`font-semibold ${theme.text}`}>{app.name}</div>
                    <div className={`text-xs ${theme.textSecondary} mt-1`}>AIM ID: {app.aimId}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services Section */}
          {results.services.length > 0 && (
            <div className={`border-b ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
              <div className={`px-4 py-2 ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'} flex items-center gap-2`}>
                <Zap size={16} className={theme.textSecondary} />
                <span className={`text-xs font-bold ${theme.text} uppercase tracking-wide`}>
                  Services ({results.totalServices})
                </span>
              </div>
              <div className="max-h-[150px] overflow-y-auto">
                {results.services.map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectService(service.aimId)}
                    className={`w-full px-4 py-3 text-left hover:bg-opacity-80 transition-all ${
                      isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className={`font-semibold ${theme.text}`}>{service.name}</div>
                    <div className={`text-xs ${theme.textSecondary} mt-1`}>
                      in {service.appName} → {service.projectName}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {results.projects.length > 0 && (
            <div>
              <div className={`px-4 py-2 ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'} flex items-center gap-2`}>
                <FolderOpen size={16} className={theme.textSecondary} />
                <span className={`text-xs font-bold ${theme.text} uppercase tracking-wide`}>
                  Projects ({results.totalProjects})
                </span>
              </div>
              <div className="max-h-[150px] overflow-y-auto">
                {results.projects.map((project, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectProject(project.aimId)}
                    className={`w-full px-4 py-3 text-left hover:bg-opacity-80 transition-all ${
                      isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className={`font-semibold ${theme.text}`}>{project.name}</div>
                    <div className={`text-xs ${theme.textSecondary} mt-1`}>in {project.appName}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {showDropdown && results && !hasResults && searchQuery.trim().length > 0 && !isLoading && (
        <div
          className={`absolute top-full mt-2 w-full ${theme.card} border-2 ${
            isDark ? 'border-slate-600' : 'border-teal-200'
          } rounded-xl shadow-2xl z-50 p-6 text-center`}
        >
          <p className={theme.textSecondary}>No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}