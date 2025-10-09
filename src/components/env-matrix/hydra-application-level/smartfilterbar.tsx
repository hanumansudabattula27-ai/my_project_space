// src/components/env-matrix/SmartFilterBar.tsx
'use client';

import { useState } from 'react';
import { Application } from '@/types';
import { Filter, X, ChevronDown } from 'lucide-react';

interface SmartFilterBarProps {
  application: Application;
  onFilterChange: (filters: FilterState) => void;
  theme: any;
  isDark: boolean;
}

export interface FilterState {
  environments: string[];
  cpuRange: { min: number; max: number } | null;
  memoryRange: { min: number; max: number } | null;
  datacenter: string[];
  projectNames: string[];
  serviceNames: string[];
  highlightCriteria: {
    cpuThreshold?: number;
    memoryThreshold?: number;
  };
  searchQuery: string;
}

export default function SmartFilterBar({
  application,
  onFilterChange,
  theme,
  isDark,
}: SmartFilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    environments: [],
    cpuRange: null,
    memoryRange: null,
    datacenter: [],
    projectNames: [],
    serviceNames: [],
    highlightCriteria: {},
    searchQuery: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Extract unique values from application data
  const uniqueEnvironments = Array.from(
    new Set(
      application.Projects?.flatMap(project =>
        project.services?.flatMap(service =>
          service.environments?.map(env => env.environmentName)
        )
      ).filter(Boolean)
    )
  );

  const uniqueDatacenters = Array.from(
    new Set(
      application.Projects?.flatMap(project =>
        project.services?.flatMap(service =>
          service.environments?.flatMap(env =>
            env.Zones?.map(zone => zone.metadata?.datacenter).filter(Boolean)
          )
        )
      ).filter(Boolean)
    )
  );

  const uniqueProjects = application.Projects?.map(p => p.project) || [];
  
  const uniqueServices = Array.from(
    new Set(
      application.Projects?.flatMap(project =>
        project.services?.map(service => service.serviceName)
      ).filter(Boolean)
    )
  );

  const handleEnvironmentToggle = (env: string) => {
    const newEnvs = filters.environments.includes(env)
      ? filters.environments.filter(e => e !== env)
      : [...filters.environments, env];
    
    const newFilters = { ...filters, environments: newEnvs };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDatacenterChange = (dc: string) => {
    const newDCs = filters.datacenter.includes(dc)
      ? filters.datacenter.filter(d => d !== dc)
      : [...filters.datacenter, dc];
    
    const newFilters = { ...filters, datacenter: newDCs };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleProjectChange = (project: string) => {
    const newProjects = filters.projectNames.includes(project)
      ? filters.projectNames.filter(p => p !== project)
      : [...filters.projectNames, project];
    
    const newFilters = { ...filters, projectNames: newProjects };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleServiceChange = (service: string) => {
    const newServices = filters.serviceNames.includes(service)
      ? filters.serviceNames.filter(s => s !== service)
      : [...filters.serviceNames, service];
    
    const newFilters = { ...filters, serviceNames: newServices };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCPUThresholdChange = (value: string) => {
    const threshold = value ? parseInt(value) : undefined;
    const newFilters = {
      ...filters,
      highlightCriteria: { ...filters.highlightCriteria, cpuThreshold: threshold },
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, searchQuery: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      environments: [],
      cpuRange: null,
      memoryRange: null,
      datacenter: [],
      projectNames: [],
      serviceNames: [],
      highlightCriteria: {},
      searchQuery: '',
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = 
    filters.environments.length +
    filters.datacenter.length +
    filters.projectNames.length +
    filters.serviceNames.length +
    (filters.searchQuery ? 1 : 0) +
    (filters.highlightCriteria.cpuThreshold ? 1 : 0);

  return (
    <div className={`${theme.card} border rounded-2xl p-6 mb-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Filter size={20} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
          <h3 className={`text-lg font-bold ${theme.text}`}>Smart Filters</h3>
          {activeFilterCount > 0 && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isDark ? 'bg-teal-900/30 text-teal-300' : 'bg-teal-100 text-teal-900'
            }`}>
              {activeFilterCount} active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
              isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-700'
            } hover:opacity-80 transition-all flex items-center gap-1`}
          >
            {showAdvanced ? 'Basic' : 'Advanced'}
            <ChevronDown size={14} className={showAdvanced ? 'rotate-180' : ''} />
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center gap-1"
            >
              <X size={14} />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search zones, services, projects..."
          className={`w-full px-4 py-2.5 ${theme.input} rounded-lg border-2 focus:outline-none focus:ring-2 ${
            isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
          } transition-all`}
        />
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Environment Filter */}
        <div>
          <label className={`text-sm font-semibold ${theme.text} mb-2 block`}>
            Environment
          </label>
          <div className="space-y-2">
            {uniqueEnvironments.map(env => (
              <label key={env} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.environments.includes(env)}
                  onChange={() => handleEnvironmentToggle(env)}
                  className="w-4 h-4 rounded accent-teal-600"
                />
                <span className={`text-sm ${theme.text}`}>{env}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Project Filter */}
        <div>
          <label className={`text-sm font-semibold ${theme.text} mb-2 block`}>
            Project
          </label>
          <div className="space-y-2">
            {uniqueProjects.map(project => (
              <label key={project} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.projectNames.includes(project)}
                  onChange={() => handleProjectChange(project)}
                  className="w-4 h-4 rounded accent-teal-600"
                />
                <span className={`text-sm ${theme.text}`}>{project}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Service Filter */}
        <div>
          <label className={`text-sm font-semibold ${theme.text} mb-2 block`}>
            Service
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {uniqueServices.map(service => (
              <label key={service} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.serviceNames.includes(service)}
                  onChange={() => handleServiceChange(service)}
                  className="w-4 h-4 rounded accent-teal-600"
                />
                <span className={`text-sm ${theme.text} truncate`}>{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Datacenter Filter */}
        {uniqueDatacenters.length > 0 && (
          <div>
            <label className={`text-sm font-semibold ${theme.text} mb-2 block`}>
              Datacenter
            </label>
            <div className="space-y-2">
              {uniqueDatacenters.map(dc => (
                <label key={dc} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.datacenter.includes(dc as string)}
                    onChange={() => handleDatacenterChange(dc as string)}
                    className="w-4 h-4 rounded accent-teal-600"
                  />
                  <span className={`text-sm ${theme.text}`}>{dc}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className={`mt-4 pt-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <h4 className={`text-sm font-bold ${theme.text} mb-3`}>Advanced Filters & Highlighting</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* CPU Highlight Threshold */}
            <div>
              <label className={`text-sm font-semibold ${theme.text} mb-2 block`}>
                Highlight Zones with CPU ≥
              </label>
              <input
                type="number"
                value={filters.highlightCriteria.cpuThreshold || ''}
                onChange={(e) => handleCPUThresholdChange(e.target.value)}
                placeholder="e.g., 8"
                className={`w-full px-3 py-2 ${theme.input} rounded-lg border`}
              />
            </div>

            {/* Memory Highlight Threshold */}
            <div>
              <label className={`text-sm font-semibold ${theme.text} mb-2 block`}>
                Highlight Zones with Memory ≥ (GB)
              </label>
              <input
                type="number"
                value={filters.highlightCriteria.memoryThreshold || ''}
                onChange={(e) => {
                  const threshold = e.target.value ? parseInt(e.target.value) : undefined;
                  const newFilters = {
                    ...filters,
                    highlightCriteria: { ...filters.highlightCriteria, memoryThreshold: threshold },
                  };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                placeholder="e.g., 16"
                className={`w-full px-3 py-2 ${theme.input} rounded-lg border`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className={`mt-4 pt-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <p className={`text-xs font-semibold ${theme.textSecondary} mb-2`}>Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.environments.map(env => (
              <span
                key={env}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${
                  isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                }`}
              >
                Env: {env}
                <button onClick={() => handleEnvironmentToggle(env)}>
                  <X size={12} />
                </button>
              </span>
            ))}
            {filters.projectNames.map(project => (
              <span
                key={project}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${
                  isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}
              >
                Project: {project}
                <button onClick={() => handleProjectChange(project)}>
                  <X size={12} />
                </button>
              </span>
            ))}
            {filters.serviceNames.map(service => (
              <span
                key={service}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${
                  isDark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                }`}
              >
                Service: {service}
                <button onClick={() => handleServiceChange(service)}>
                  <X size={12} />
                </button>
              </span>
            ))}
            {filters.datacenter.map(dc => (
              <span
                key={dc}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 ${
                  isDark ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-700'
                }`}
              >
                DC: {dc}
                <button onClick={() => handleDatacenterChange(dc)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}