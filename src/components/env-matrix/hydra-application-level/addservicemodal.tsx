// src/components/env-matrix/hydra-application-level/addservicemodal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Application, Service, Zone } from '@/types';
import { X, Plus, Loader2 } from 'lucide-react';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  projectIndex: number;
  application: Application;
  onSuccess: (newService: Service) => void;
}

interface FormData {
  serviceName: string;
  applicationDomain: string;
  hostingPlatform: string;
  environments: {
    [key: string]: { environmentName: string; GTM: string; namehydra: string; abcGTM: string; firewallProfile: string; zones: Zone[] };
  };
}

export default function AddServiceModal({
  isOpen,
  onClose,
  projectName,
  projectIndex,
  application,
  onSuccess,
}: AddServiceModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceName: '',
    applicationDomain: '',
    hostingPlatform: 'Hydra',
    environments: {},
  });
  const [activeEnvTab, setActiveEnvTab] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        serviceName: '',
        applicationDomain: '',
        hostingPlatform: 'Hydra',
        environments: {},
      });
      setActiveEnvTab('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStep1Next = () => {
    if (!formData.serviceName.trim() || !formData.applicationDomain.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    setCurrentStep(2);
  };

  const handleAddEnvironment = () => {
    const envKey = `env_${Object.keys(formData.environments).length}`;
    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [envKey]: {
          environmentName: '',
          GTM: '',
          namehydra: '',
          abcGTM: '',
          firewallProfile: '',
          zones: [],
        },
      },
    }));
    setActiveEnvTab(envKey);
  };

  const handleEnvironmentChange = (envKey: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [envKey]: {
          ...prev.environments[envKey],
          [field]: value,
        },
      },
    }));
  };

  const handleAddZone = (envKey: string) => {
    const newZone: Zone = {
      ZoneName: '',
      vipName: '',
      vipIP: '',
      f5Device: [],
      firewall: '',
      count: '',
      cpu: '',
      memory: '',
      metadata: {},
    };

    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [envKey]: {
          ...prev.environments[envKey],
          zones: [...prev.environments[envKey].zones, newZone],
        },
      },
    }));
  };

  const handleZoneChange = (envKey: string, zoneIndex: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      environments: {
        ...prev.environments,
        [envKey]: {
          ...prev.environments[envKey],
          zones: prev.environments[envKey].zones.map((z, zi) =>
            zi === zoneIndex ? { ...z, [field]: value } : z
          ),
        },
      },
    }));
  };

  const handleStep2Next = () => {
    if (Object.keys(formData.environments).length === 0 || 
        Object.values(formData.environments).some((env: any) => !env.environmentName.trim())) {
      alert('Please add at least one environment with a name');
      return;
    }
    setCurrentStep(3);
  };

  const handleSubmit = () => {
    const newService: Service = {
      serviceName: formData.serviceName,
      applicationDomain: formData.applicationDomain,
      hostingPlatform: formData.hostingPlatform,
      environments: Object.values(formData.environments).map((env: any) => ({
        environmentName: env.environmentName,
        GTM: env.GTM,
        namehydra: env.namehydra,
        abcGTM: env.abcGTM,
        firewallProfile: env.firewallProfile || '',
        Zones: env.zones,
        metadata: {},
      })),
      metadata: {},
    };

    // Return data to parent - NO API CALL
    onSuccess(newService);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full mx-4 my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Service</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Step {currentStep} of 3 • Project: {projectName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-all"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Step 1: Service Details */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Service Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Payment API"
                    value={formData.serviceName}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceName: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Application Domain *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., api.payment.com"
                    value={formData.applicationDomain}
                    onChange={(e) => setFormData(prev => ({ ...prev, applicationDomain: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Hosting Platform
                  </label>
                  <select
                    value={formData.hostingPlatform}
                    onChange={(e) => setFormData(prev => ({ ...prev, hostingPlatform: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Hydra</option>
                    <option>AWS</option>
                    <option>Azure</option>
                    <option>GCP</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Environments */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Add Environments</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add one or more environments</p>

              {/* Environment Tabs */}
              <div className="mb-4 flex gap-2 flex-wrap">
                {Object.entries(formData.environments).map(([envKey, env]: [string, any]) => (
                  <button
                    key={envKey}
                    onClick={() => setActiveEnvTab(envKey)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      activeEnvTab === envKey
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {env.environmentName || `Env ${Object.keys(formData.environments).indexOf(envKey) + 1}`}
                  </button>
                ))}
                <button
                  onClick={handleAddEnvironment}
                  className="px-4 py-2 rounded-lg font-semibold text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Env
                </button>
              </div>

              {/* Active Environment Form */}
              {activeEnvTab && formData.environments[activeEnvTab] && (
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg space-y-3">
                  <input
                    type="text"
                    placeholder="Environment Name (e.g., Development, Staging, Production)"
                    value={formData.environments[activeEnvTab].environmentName}
                    onChange={(e) => handleEnvironmentChange(activeEnvTab, 'environmentName', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="GTM"
                    value={formData.environments[activeEnvTab].GTM}
                    onChange={(e) => handleEnvironmentChange(activeEnvTab, 'GTM', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Name Hydra"
                    value={formData.environments[activeEnvTab].namehydra}
                    onChange={(e) => handleEnvironmentChange(activeEnvTab, 'namehydra', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="ABC GTM"
                    value={formData.environments[activeEnvTab].abcGTM}
                    onChange={(e) => handleEnvironmentChange(activeEnvTab, 'abcGTM', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Firewall Profile"
                    value={formData.environments[activeEnvTab].firewallProfile}
                    onChange={(e) => handleEnvironmentChange(activeEnvTab, 'firewallProfile', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />

                  {/* Zones Section */}
                  <div className="mt-4 pt-4 border-t border-gray-300 dark:border-slate-600">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Zones</h4>
                      <button
                        onClick={() => handleAddZone(activeEnvTab)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <Plus size={12} />
                        Add Zone
                      </button>
                    </div>

                    {formData.environments[activeEnvTab].zones.map((zone, zoneIndex) => (
                      <div key={zoneIndex} className="bg-white dark:bg-slate-900 p-3 rounded mb-2 border border-gray-200 dark:border-slate-700">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Zone Name"
                            value={zone.ZoneName}
                            onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'ZoneName', e.target.value)}
                            className="col-span-2 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="VIP Name"
                            value={zone.vipName}
                            onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipName', e.target.value)}
                            className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="VIP IP"
                            value={zone.vipIP}
                            onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'vipIP', e.target.value)}
                            className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="F5 Devices (comma-separated)"
                            value={zone.f5Device?.join(', ') || ''}
                            onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'f5Device', e.target.value)}
                            className="col-span-2 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Firewall"
                            value={zone.firewall}
                            onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'firewall', e.target.value)}
                            className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Count"
                            value={zone.count}
                            onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'count', e.target.value)}
                            className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="CPU"
                            value={zone.cpu}
                            onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'cpu', e.target.value)}
                            className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Memory"
                            value={zone.memory}
                            onChange={(e) => handleZoneChange(activeEnvTab, zoneIndex, 'memory', e.target.value)}
                            className="px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Review & Submit</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">⚡ {formData.serviceName}</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Domain:</span> {formData.applicationDomain}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Platform:</span> {formData.hostingPlatform}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Environments:</span> {Object.keys(formData.environments).length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Zones:</span> {Object.values(formData.environments).reduce((sum: number, env: any) => sum + env.zones.length, 0)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900 flex items-center justify-between rounded-b-xl">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
              currentStep === 1
                ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
            }`}
            disabled={currentStep === 1}
          >
            ← Back
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>

            {currentStep < 3 && (
              <button
                onClick={() => currentStep === 1 ? handleStep1Next() : handleStep2Next()}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all"
              >
                Next →
              </button>
            )}

            {currentStep === 3 && (
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
              >
                ✓ Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}