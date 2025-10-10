// src/components/env-matrix/hydra-application-level/simplefilter.tsx
'use client';

import { Application } from '@/types';
import { Filter, X } from 'lucide-react';

interface SimpleFilterProps {
  application: Application;
  selectedProject: string;
  selectedService: string;
  onProjectChange: (project: string) => void;
  onServiceChange: (service: string) => void;
  theme: any;
  isDark: boolean;
}

export default function SimpleFilter({
  application,
  selectedProject,
  selectedService,
  onProjectChange,
  onServiceChange,
  theme,
  isDark,
}: SimpleFilterProps) {
  // Get unique projects
  const projects = application.Projects?.map(p => p.project) || [];

  // Get unique services
  const services = Array.from(
    new Set(
      application.Projects?.flatMap(project =>
        project.services?.map(service => service.serviceName)
      ).filter(Boolean)
    )
  );

  const hasActiveFilters = selectedProject !== '' || selectedService !== '';

  const clearFilters = () => {
    onProjectChange('');
    onServiceChange('');
  };

  return (
    <div className="mb-6 flex items-center gap-3">
      {/* Project Filter */}
      <div className="flex items-center gap-2">
        <Filter size={16} className={theme.textSecondary} />
        <select
          value={selectedProject}
          onChange={(e) => onProjectChange(e.target.value)}
          className={`px-4 py-2.5 ${theme.input} border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 ${
            isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
          } transition-all cursor-pointer`}
        >
          <option value="">All Projects ({projects.length})</option>
          {projects.map(project => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      {/* Service Filter */}
      <div>
        <select
          value={selectedService}
          onChange={(e) => onServiceChange(e.target.value)}
          className={`px-4 py-2.5 ${theme.input} border rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 ${
            isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
          } transition-all cursor-pointer`}
        >
          <option value="">All Services ({services.length})</option>
          {services.map(service => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center gap-2 transition-all"
        >
          <X size={14} />
          Clear
        </button>
      )}

      {/* Active Filter Badge */}
      {hasActiveFilters && (
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
          isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-700'
        }`}>
          {selectedProject && selectedService ? '2 filters' : '1 filter'} active
        </span>
      )}
    </div>
  );
}