// src/components/env-matrix/hydra-application-level/additemmodal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Project, Service, Environment, Zone } from '@/types';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';

type ItemType = 'project' | 'service' | 'environment' | 'zone';

interface AddItemModalProps {
  isOpen: boolean;
  itemType: ItemType;
  onClose: () => void;
  onSubmit: (data: any) => void;
  theme: any;
  isDark: boolean;
}

export default function AddItemModal({
  isOpen,
  itemType,
  onClose,
  onSubmit,
  theme,
  isDark,
}: AddItemModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Main item data
  const [mainItemData, setMainItemData] = useState<any>({});
  
  // Child items
  const [childItems, setChildItems] = useState<any[]>([]);
  const [showChildForm, setShowChildForm] = useState(false);
  const [childFormData, setChildFormData] = useState<any>({});

  // Determine total steps based on item type
  const getTotalSteps = () => {
    if (itemType === 'zone') return 1; // Zone only needs 1 step
    return 3; // Project, Service, Environment need 3 steps (Details → Add Children → Review)
  };

  const totalSteps = getTotalSteps();

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setMainItemData({});
      setChildItems([]);
      setShowChildForm(false);
      setChildFormData({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMainInputChange = (field: string, value: any) => {
    setMainItemData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChildInputChange = (field: string, value: any) => {
    setChildFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddChild = () => {
    if (itemType === 'project') {
      if (!childFormData.serviceName || !childFormData.applicationDomain || !childFormData.hostingPlatform) {
        alert('Please fill in all service fields');
        return;
      }
      const newService: Service = {
        serviceName: childFormData.serviceName,
        applicationDomain: childFormData.applicationDomain,
        hostingPlatform: childFormData.hostingPlatform,
        environments: [],
        metadata: {},
      };
      setChildItems([...childItems, newService]);
      setChildFormData({});
    } else if (itemType === 'service') {
      if (!childFormData.environmentName) {
        alert('Please fill in environment name');
        return;
      }
      const newEnvironment: Environment = {
        environmentName: childFormData.environmentName,
        GTM: childFormData.GTM || '',
        namehydra: childFormData.namehydra || '',
        abcGTM: childFormData.abcGTM || '',
        firewallProfile: childFormData.firewallProfile || '',
        Zones: [],
        metadata: {},
      };
      setChildItems([...childItems, newEnvironment]);
      setChildFormData({});
    } else if (itemType === 'environment') {
      if (!childFormData.ZoneName) {
        alert('Please fill in zone name');
        return;
      }
      const newZone: Zone = {
        ZoneName: childFormData.ZoneName,
        vipName: childFormData.vipName || '',
        vipIP: childFormData.vipIP || '',
        f5Device: childFormData.f5Device ? childFormData.f5Device.split(',').map((s: string) => s.trim()) : [],
        firewall: childFormData.firewall || '',
        count: childFormData.count || '',
        cpu: childFormData.cpu || '',
        memory: childFormData.memory || '',
        metadata: {},
      };
      setChildItems([...childItems, newZone]);
      setChildFormData({});
    }
  };

  const handleRemoveChild = (index: number) => {
    setChildItems(childItems.filter((_, i) => i !== index));
  };

  const handleStep1Next = () => {
    if (itemType === 'project') {
      if (!mainItemData.project) {
        alert('Please fill in project name');
        return;
      }
    } else if (itemType === 'service') {
      if (!mainItemData.serviceName || !mainItemData.applicationDomain || !mainItemData.hostingPlatform) {
        alert('Please fill in all service fields');
        return;
      }
    } else if (itemType === 'environment') {
      if (!mainItemData.environmentName) {
        alert('Please fill in environment name');
        return;
      }
    }
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let finalData: any;

      if (itemType === 'project') {
        finalData = {
          project: mainItemData.project,
          services: childItems,
          metadata: {},
        } as Project;
      } else if (itemType === 'service') {
        finalData = {
          serviceName: mainItemData.serviceName,
          applicationDomain: mainItemData.applicationDomain,
          hostingPlatform: mainItemData.hostingPlatform,
          environments: childItems,
          metadata: {},
        } as Service;
      } else if (itemType === 'environment') {
        finalData = {
          environmentName: mainItemData.environmentName,
          GTM: mainItemData.GTM || '',
          namehydra: mainItemData.namehydra || '',
          abcGTM: mainItemData.abcGTM || '',
          firewallProfile: mainItemData.firewallProfile || '',
          Zones: childItems,
          metadata: {},
        } as Environment;
      } else if (itemType === 'zone') {
        finalData = {
          ZoneName: mainItemData.ZoneName,
          vipName: mainItemData.vipName || '',
          vipIP: mainItemData.vipIP || '',
          f5Device: mainItemData.f5Device ? mainItemData.f5Device.split(',').map((s: string) => s.trim()) : [],
          firewall: mainItemData.firewall || '',
          count: mainItemData.count || '',
          cpu: mainItemData.cpu || '',
          memory: mainItemData.memory || '',
          metadata: {},
        } as Zone;
      }

      onSubmit(finalData);
      setCurrentStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (itemType) {
      case 'project':
        return 'Add New Project';
      case 'service':
        return 'Add New Service';
      case 'environment':
        return 'Add New Environment';
      case 'zone':
        return 'Add New Zone';
    }
  };

  const getChildLabel = () => {
    switch (itemType) {
      case 'project':
        return 'Services';
      case 'service':
        return 'Environments';
      case 'environment':
        return 'Zones';
      default:
        return '';
    }
  };

  // STEP 1: Main Item Details
  const renderStep1 = () => {
    return (
      <div className="space-y-4">
        {itemType === 'project' && (
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={mainItemData.project || ''}
              onChange={(e) => handleMainInputChange('project', e.target.value)}
              placeholder="e.g., Payment Service Project"
              className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
          </div>
        )}

        {itemType === 'service' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Service Name *
              </label>
              <input
                type="text"
                value={mainItemData.serviceName || ''}
                onChange={(e) => handleMainInputChange('serviceName', e.target.value)}
                placeholder="e.g., Payment API"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Application Domain *
              </label>
              <input
                type="text"
                value={mainItemData.applicationDomain || ''}
                onChange={(e) => handleMainInputChange('applicationDomain', e.target.value)}
                placeholder="e.g., api.payment.com"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Hosting Platform *
              </label>
              <input
                type="text"
                value={mainItemData.hostingPlatform || ''}
                onChange={(e) => handleMainInputChange('hostingPlatform', e.target.value)}
                placeholder="e.g., AWS, GCP, Azure"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
          </>
        )}

        {itemType === 'environment' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Environment Name *
              </label>
              <input
                type="text"
                value={mainItemData.environmentName || ''}
                onChange={(e) => handleMainInputChange('environmentName', e.target.value)}
                placeholder="e.g., Development, Staging, Production"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                GTM
              </label>
              <input
                type="text"
                value={mainItemData.GTM || ''}
                onChange={(e) => handleMainInputChange('GTM', e.target.value)}
                placeholder="e.g., payment.app.dev.com"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Name Hydra
              </label>
              <input
                type="text"
                value={mainItemData.namehydra || ''}
                onChange={(e) => handleMainInputChange('namehydra', e.target.value)}
                placeholder="e.g., allowpaymenthydra.com"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                ABC GTM
              </label>
              <input
                type="text"
                value={mainItemData.abcGTM || ''}
                onChange={(e) => handleMainInputChange('abcGTM', e.target.value)}
                placeholder="e.g., abc-gtm-value"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Firewall Profile
              </label>
              <input
                type="text"
                value={mainItemData.firewallProfile || ''}
                onChange={(e) => handleMainInputChange('firewallProfile', e.target.value)}
                placeholder="e.g., production"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
          </>
        )}

        {itemType === 'zone' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Zone Name *
              </label>
              <input
                type="text"
                value={mainItemData.ZoneName || ''}
                onChange={(e) => handleMainInputChange('ZoneName', e.target.value)}
                placeholder="e.g., Zone-1"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                VIP Name *
              </label>
              <input
                type="text"
                value={mainItemData.vipName || ''}
                onChange={(e) => handleMainInputChange('vipName', e.target.value)}
                placeholder="e.g., payment-vip"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                VIP IP *
              </label>
              <input
                type="text"
                value={mainItemData.vipIP || ''}
                onChange={(e) => handleMainInputChange('vipIP', e.target.value)}
                placeholder="e.g., 192.168.1.1"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                F5 Devices (comma-separated)
              </label>
              <input
                type="text"
                value={mainItemData.f5Device || ''}
                onChange={(e) => handleMainInputChange('f5Device', e.target.value)}
                placeholder="e.g., f5-device-1, f5-device-2"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Firewall
              </label>
              <input
                type="text"
                value={mainItemData.firewall || ''}
                onChange={(e) => handleMainInputChange('firewall', e.target.value)}
                placeholder="e.g., production-fw"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Count
              </label>
              <input
                type="text"
                value={mainItemData.count || ''}
                onChange={(e) => handleMainInputChange('count', e.target.value)}
                placeholder="e.g., 2"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                CPU
              </label>
              <input
                type="text"
                value={mainItemData.cpu || ''}
                onChange={(e) => handleMainInputChange('cpu', e.target.value)}
                placeholder="e.g., 4 cores"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Memory
              </label>
              <input
                type="text"
                value={mainItemData.memory || ''}
                onChange={(e) => handleMainInputChange('memory', e.target.value)}
                placeholder="e.g., 16GB"
                className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  // STEP 2: Add Children (not for Zone)
  const renderStep2 = () => {
    if (itemType === 'zone') return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Add {getChildLabel()} (Optional)
          </h3>
          {!showChildForm && (
            <button
              onClick={() => setShowChildForm(true)}
              className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2"
            >
              <Plus size={16} /> Add {getChildLabel().slice(0, -1)}
            </button>
          )}
        </div>

        {/* Child Form */}
        {showChildForm && (
          <div className="bg-gray-50 dark:bg-slate-800/50 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">New {getChildLabel().slice(0, -1)}</h4>
            
            {itemType === 'project' && (
              <>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={childFormData.serviceName || ''}
                  onChange={(e) => handleChildInputChange('serviceName', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Application Domain"
                  value={childFormData.applicationDomain || ''}
                  onChange={(e) => handleChildInputChange('applicationDomain', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Hosting Platform"
                  value={childFormData.hostingPlatform || ''}
                  onChange={(e) => handleChildInputChange('hostingPlatform', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </>
            )}

            {itemType === 'service' && (
              <>
                <input
                  type="text"
                  placeholder="Environment Name"
                  value={childFormData.environmentName || ''}
                  onChange={(e) => handleChildInputChange('environmentName', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="GTM"
                  value={childFormData.GTM || ''}
                  onChange={(e) => handleChildInputChange('GTM', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Name Hydra"
                  value={childFormData.namehydra || ''}
                  onChange={(e) => handleChildInputChange('namehydra', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="ABC GTM"
                  value={childFormData.abcGTM || ''}
                  onChange={(e) => handleChildInputChange('abcGTM', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Firewall Profile"
                  value={childFormData.firewallProfile || ''}
                  onChange={(e) => handleChildInputChange('firewallProfile', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </>
            )}

            {itemType === 'environment' && (
              <>
                <input
                  type="text"
                  placeholder="Zone Name"
                  value={childFormData.ZoneName || ''}
                  onChange={(e) => handleChildInputChange('ZoneName', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="VIP Name"
                  value={childFormData.vipName || ''}
                  onChange={(e) => handleChildInputChange('vipName', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="VIP IP"
                  value={childFormData.vipIP || ''}
                  onChange={(e) => handleChildInputChange('vipIP', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="F5 Devices (comma-separated)"
                  value={childFormData.f5Device || ''}
                  onChange={(e) => handleChildInputChange('f5Device', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Firewall"
                  value={childFormData.firewall || ''}
                  onChange={(e) => handleChildInputChange('firewall', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Count"
                  value={childFormData.count || ''}
                  onChange={(e) => handleChildInputChange('count', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="CPU"
                  value={childFormData.cpu || ''}
                  onChange={(e) => handleChildInputChange('cpu', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Memory"
                  value={childFormData.memory || ''}
                  onChange={(e) => handleChildInputChange('memory', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleAddChild}
                className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Add {getChildLabel().slice(0, -1)}
              </button>
              <button
                onClick={() => setShowChildForm(false)}
                className="flex-1 px-3 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* List of added children */}
        {childItems.length > 0 && (
          <div className="space-y-2 mt-4">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              {childItems.length} {getChildLabel()} added:
            </p>
            {childItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-slate-800"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {itemType === 'project' && item.serviceName}
                    {itemType === 'service' && item.environmentName}
                    {itemType === 'environment' && item.ZoneName}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {itemType === 'project' && `${item.applicationDomain} • ${item.hostingPlatform}`}
                    {itemType === 'service' && `${item.GTM || 'N/A'}`}
                    {itemType === 'environment' && `${item.vipIP || 'N/A'}`}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveChild(index)}
                  className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // STEP 3: Review & Submit (not for Zone)
  const renderStep3 = () => {
    if (itemType === 'zone') return null;

    const getItemTypeDisplay = () => {
      switch (itemType) {
        case 'project':
          return 'Project';
        case 'service':
          return 'Service';
        case 'environment':
          return 'Environment';
        default:
          return '';
      }
    };

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-2 border-teal-200 dark:border-teal-700 rounded-xl p-4">
          <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">{getItemTypeDisplay()} Summary</h4>
          <div className="space-y-2">
            {itemType === 'project' && (
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Project Name</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{mainItemData.project}</p>
              </div>
            )}
            {itemType === 'service' && (
              <>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Service Name</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{mainItemData.serviceName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Domain</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{mainItemData.applicationDomain}</p>
                </div>
              </>
            )}
            {itemType === 'environment' && (
              <>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Environment Name</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{mainItemData.environmentName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">GTM</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{mainItemData.GTM || 'N/A'}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">✓</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{getItemTypeDisplay()} Details</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{childItems.length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{getChildLabel()} Added</p>
          </div>
        </div>

        {/* Children Breakdown */}
        {childItems.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">{getChildLabel()} Breakdown</h4>
            <div className="space-y-2">
              {childItems.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-2">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {itemType === 'project' && item.serviceName}
                    {itemType === 'service' && item.environmentName}
                    {itemType === 'environment' && item.ZoneName}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {itemType === 'project' && `${item.applicationDomain} • ${item.hostingPlatform}`}
                    {itemType === 'service' && `${item.GTM || 'N/A'} • ${item.environmentName}`}
                    {itemType === 'environment' && `${item.vipIP || 'N/A'}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{getTitle()}</h2>
            {itemType !== 'zone' && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Step {currentStep} of {totalSteps}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 dark:border-slate-700 p-4 bg-gray-50 dark:bg-slate-900 flex items-center justify-between rounded-b-xl">
          <button
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
              currentStep === 1
                ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
            }`}
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

            {currentStep < totalSteps ? (
              <button
                onClick={currentStep === 1 ? handleStep1Next : handleStep2Next}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    ✓ Submit
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}