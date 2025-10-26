// src/components/env-matrix/hydra-application-level/addzonalmodal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Application, Zone } from '@/types';
import { X, Loader2 } from 'lucide-react';

interface AddZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  environmentName: string;
  projectIndex: number;
  serviceIndex: number;
  envIndex: number;
  application: Application;
  onSuccess: (newZone: Zone) => void;
}

interface FormData {
  ZoneName: string;
  vipName: string;
  vipIP: string;
  f5Device: string;
  firewall: string;
  count: string;
  cpu: string;
  memory: string;
}

export default function AddZoneModal({
  isOpen,
  onClose,
  environmentName,
  projectIndex,
  serviceIndex,
  envIndex,
  application,
  onSuccess,
}: AddZoneModalProps) {
  const [formData, setFormData] = useState<FormData>({
    ZoneName: '',
    vipName: '',
    vipIP: '',
    f5Device: '',
    firewall: '',
    count: '',
    cpu: '',
    memory: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ZoneName: '',
        vipName: '',
        vipIP: '',
        f5Device: '',
        firewall: '',
        count: '',
        cpu: '',
        memory: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.ZoneName.trim()) {
      alert('Please fill in Zone Name');
      return;
    }

    const newZone: Zone = {
      ZoneName: formData.ZoneName,
      vipName: formData.vipName,
      vipIP: formData.vipIP,
      f5Device: formData.f5Device ? formData.f5Device.split(',').map(d => d.trim()) : [],
      firewall: formData.firewall,
      count: formData.count,
      cpu: formData.cpu,
      memory: formData.memory,
      metadata: {},
    };

    // Return data to parent - NO API CALL
    onSuccess(newZone);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full mx-4 my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-900 rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Zone</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Environment: {environmentName}</p>
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Zone Name *
              </label>
              <input
                type="text"
                placeholder="e.g., Zone-A, Zone-1"
                value={formData.ZoneName}
                onChange={(e) => setFormData(prev => ({ ...prev, ZoneName: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  VIP Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., payment-vip"
                  value={formData.vipName}
                  onChange={(e) => setFormData(prev => ({ ...prev, vipName: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  VIP IP
                </label>
                <input
                  type="text"
                  placeholder="e.g., 192.168.1.1"
                  value={formData.vipIP}
                  onChange={(e) => setFormData(prev => ({ ...prev, vipIP: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                F5 Devices (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g., device-1, device-2, device-3"
                value={formData.f5Device}
                onChange={(e) => setFormData(prev => ({ ...prev, f5Device: e.target.value }))}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Firewall
                </label>
                <input
                  type="text"
                  placeholder="e.g., production-fw"
                  value={formData.firewall}
                  onChange={(e) => setFormData(prev => ({ ...prev, firewall: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Count
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2"
                  value={formData.count}
                  onChange={(e) => setFormData(prev => ({ ...prev, count: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  CPU
                </label>
                <input
                  type="text"
                  placeholder="e.g., 4 cores"
                  value={formData.cpu}
                  onChange={(e) => setFormData(prev => ({ ...prev, cpu: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Memory
                </label>
                <input
                  type="text"
                  placeholder="e.g., 16GB"
                  value={formData.memory}
                  onChange={(e) => setFormData(prev => ({ ...prev, memory: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900 flex items-center justify-end gap-3 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-5 py-2 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
          >
            ✓ Submit
          </button>
        </div>
      </div>
    </div>
  );
}