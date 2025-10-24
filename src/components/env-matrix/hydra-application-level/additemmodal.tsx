// src/components/env-matrix/hydra-application-level/additemmodal.tsx
'use client';

import { useState } from 'react';
import { Project, Service, Environment, Zone } from '@/types';
import { X, Plus, Trash2 } from 'lucide-react';

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
  const [formData, setFormData] = useState<any>({});
  const [childItems, setChildItems] = useState<any[]>([]);
  const [showChildForm, setShowChildForm] = useState(false);
  const [childFormData, setChildFormData] = useState<any>({});

  const resetForm = () => {
    setFormData({});
    setChildItems([]);
    setShowChildForm(false);
    setChildFormData({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
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
      const newService: Service = {
        serviceName: childFormData.serviceName || '',
        applicationDomain: childFormData.applicationDomain || '',
        hostingPlatform: childFormData.hostingPlatform || '',
        environments: [],
        metadata: {},
      };
      setChildItems([...childItems, newService]);
      setChildFormData({});
    } else if (itemType === 'service') {
      const newEnvironment: Environment = {
        environmentName: childFormData.environmentName || '',
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
      const newZone: Zone = {
        ZoneName: childFormData.ZoneName || '',
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

  const handleSubmit = () => {
    let finalData: any;

    if (itemType === 'project') {
      finalData = {
        project: formData.project || '',
        services: childItems,
        metadata: {},
      } as Project;
    } else if (itemType === 'service') {
      finalData = {
        serviceName: formData.serviceName || '',
        applicationDomain: formData.applicationDomain || '',
        hostingPlatform: formData.hostingPlatform || '',
        environments: childItems,
        metadata: {},
      } as Service;
    } else if (itemType === 'environment') {
      finalData = {
        environmentName: formData.environmentName || '',
        GTM: formData.GTM || '',
        namehydra: formData.namehydra || '',
        abcGTM: formData.abcGTM || '',
        firewallProfile: formData.firewallProfile || '',
        Zones: childItems,
        metadata: {},
      } as Environment;
    } else if (itemType === 'zone') {
      finalData = {
        ZoneName: formData.ZoneName || '',
        vipName: formData.vipName || '',
        vipIP: formData.vipIP || '',
        f5Device: formData.f5Device ? formData.f5Device.split(',').map((s: string) => s.trim()) : [],
        firewall: formData.firewall || '',
        count: formData.count || '',
        cpu: formData.cpu || '',
        memory: formData.memory || '',
        metadata: {},
      } as Zone;
    }

    onSubmit(finalData);
    handleClose();
  };

  if (!isOpen) return null;

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

  const renderMainForm = () => {
    switch (itemType) {
      case 'project':
        return (
          <div className="space-y-4">
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Project Name *
              </label>
              <input
                type="text"
                value={formData.project || ''}
                onChange={(e) => handleInputChange('project', e.target.value)}
                placeholder="e.g., Payment Service Project"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
          </div>
        );
      case 'service':
        return (
          <div className="space-y-4">
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Service Name *
              </label>
              <input
                type="text"
                value={formData.serviceName || ''}
                onChange={(e) => handleInputChange('serviceName', e.target.value)}
                placeholder="e.g., Payment API"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Application Domain *
              </label>
              <input
                type="text"
                value={formData.applicationDomain || ''}
                onChange={(e) => handleInputChange('applicationDomain', e.target.value)}
                placeholder="e.g., api.payment.com"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Hosting Platform *
              </label>
              <input
                type="text"
                value={formData.hostingPlatform || ''}
                onChange={(e) => handleInputChange('hostingPlatform', e.target.value)}
                placeholder="e.g., AWS, GCP, Azure"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
          </div>
        );
      case 'environment':
        return (
          <div className="space-y-4">
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Environment Name *
              </label>
              <input
                type="text"
                value={formData.environmentName || ''}
                onChange={(e) => handleInputChange('environmentName', e.target.value)}
                placeholder="e.g., Development, Staging, Production"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                GTM
              </label>
              <input
                type="text"
                value={formData.GTM || ''}
                onChange={(e) => handleInputChange('GTM', e.target.value)}
                placeholder="e.g., payment.app.dev.com"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Name Hydra
              </label>
              <input
                type="text"
                value={formData.namehydra || ''}
                onChange={(e) => handleInputChange('namehydra', e.target.value)}
                placeholder="e.g., allowpaymenthydra.com"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                ABC GTM
              </label>
              <input
                type="text"
                value={formData.abcGTM || ''}
                onChange={(e) => handleInputChange('abcGTM', e.target.value)}
                placeholder="e.g., abc-gtm-value"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Firewall Profile
              </label>
              <input
                type="text"
                value={formData.firewallProfile || ''}
                onChange={(e) => handleInputChange('firewallProfile', e.target.value)}
                placeholder="e.g., production, staging"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
          </div>
        );
      case 'zone':
        return (
          <div className="space-y-4">
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Zone Name *
              </label>
              <input
                type="text"
                value={formData.ZoneName || ''}
                onChange={(e) => handleInputChange('ZoneName', e.target.value)}
                placeholder="e.g., Zone-1"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                VIP Name *
              </label>
              <input
                type="text"
                value={formData.vipName || ''}
                onChange={(e) => handleInputChange('vipName', e.target.value)}
                placeholder="e.g., payment-vip"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                VIP IP *
              </label>
              <input
                type="text"
                value={formData.vipIP || ''}
                onChange={(e) => handleInputChange('vipIP', e.target.value)}
                placeholder="e.g., 192.168.1.1"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                F5 Devices (comma-separated)
              </label>
              <input
                type="text"
                value={formData.f5Device || ''}
                onChange={(e) => handleInputChange('f5Device', e.target.value)}
                placeholder="e.g., f5-device-1, f5-device-2"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Firewall
              </label>
              <input
                type="text"
                value={formData.firewall || ''}
                onChange={(e) => handleInputChange('firewall', e.target.value)}
                placeholder="e.g., production-fw"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Count
              </label>
              <input
                type="text"
                value={formData.count || ''}
                onChange={(e) => handleInputChange('count', e.target.value)}
                placeholder="e.g., 2"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                CPU
              </label>
              <input
                type="text"
                value={formData.cpu || ''}
                onChange={(e) => handleInputChange('cpu', e.target.value)}
                placeholder="e.g., 4 cores"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
            <div>
              <label className={`text-sm font-semibold ${theme.text} block mb-2`}>
                Memory
              </label>
              <input
                type="text"
                value={formData.memory || ''}
                onChange={(e) => handleInputChange('memory', e.target.value)}
                placeholder="e.g., 16GB"
                className={`w-full px-3 py-2 ${theme.input} rounded border focus:outline-none focus:ring-2 ${
                  isDark ? 'focus:ring-teal-500' : 'focus:ring-teal-600'
                }`}
              />
            </div>
          </div>
        );
    }
  };

  const renderChildForm = () => {
    if (!showChildForm) return null;

    switch (itemType) {
      case 'project':
        return (
          <div className="space-y-3 p-3 border rounded bg-opacity-50">
            <h4 className={`font-semibold ${theme.text}`}>Add Service</h4>
            <input
              type="text"
              placeholder="Service Name"
              value={childFormData.serviceName || ''}
              onChange={(e) => handleChildInputChange('serviceName', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="Application Domain"
              value={childFormData.applicationDomain || ''}
              onChange={(e) => handleChildInputChange('applicationDomain', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="Hosting Platform"
              value={childFormData.hostingPlatform || ''}
              onChange={(e) => handleChildInputChange('hostingPlatform', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddChild}
                className={`flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center justify-center gap-2`}
              >
                <Plus size={14} /> Add Service
              </button>
              <button
                onClick={() => setShowChildForm(false)}
                className={`flex-1 px-3 py-2 ${theme.card} border rounded text-sm font-semibold`}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      case 'service':
        return (
          <div className="space-y-3 p-3 border rounded bg-opacity-50">
            <h4 className={`font-semibold ${theme.text}`}>Add Environment</h4>
            <input
              type="text"
              placeholder="Environment Name"
              value={childFormData.environmentName || ''}
              onChange={(e) => handleChildInputChange('environmentName', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="GTM"
              value={childFormData.GTM || ''}
              onChange={(e) => handleChildInputChange('GTM', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="Name Hydra"
              value={childFormData.namehydra || ''}
              onChange={(e) => handleChildInputChange('namehydra', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="ABC GTM"
              value={childFormData.abcGTM || ''}
              onChange={(e) => handleChildInputChange('abcGTM', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="Firewall Profile"
              value={childFormData.firewallProfile || ''}
              onChange={(e) => handleChildInputChange('firewallProfile', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddChild}
                className={`flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center justify-center gap-2`}
              >
                <Plus size={14} /> Add Environment
              </button>
              <button
                onClick={() => setShowChildForm(false)}
                className={`flex-1 px-3 py-2 ${theme.card} border rounded text-sm font-semibold`}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      case 'environment':
        return (
          <div className="space-y-3 p-3 border rounded bg-opacity-50">
            <h4 className={`font-semibold ${theme.text}`}>Add Zone</h4>
            <input
              type="text"
              placeholder="Zone Name"
              value={childFormData.ZoneName || ''}
              onChange={(e) => handleChildInputChange('ZoneName', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="VIP Name"
              value={childFormData.vipName || ''}
              onChange={(e) => handleChildInputChange('vipName', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="VIP IP"
              value={childFormData.vipIP || ''}
              onChange={(e) => handleChildInputChange('vipIP', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="F5 Devices (comma-separated)"
              value={childFormData.f5Device || ''}
              onChange={(e) => handleChildInputChange('f5Device', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="Firewall"
              value={childFormData.firewall || ''}
              onChange={(e) => handleChildInputChange('firewall', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="Count"
              value={childFormData.count || ''}
              onChange={(e) => handleChildInputChange('count', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="CPU"
              value={childFormData.cpu || ''}
              onChange={(e) => handleChildInputChange('cpu', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <input
              type="text"
              placeholder="Memory"
              value={childFormData.memory || ''}
              onChange={(e) => handleChildInputChange('memory', e.target.value)}
              className={`w-full px-3 py-2 text-sm ${theme.input} rounded border`}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddChild}
                className={`flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center justify-center gap-2`}
              >
                <Plus size={14} /> Add Zone
              </button>
              <button
                onClick={() => setShowChildForm(false)}
                className={`flex-1 px-3 py-2 ${theme.card} border rounded text-sm font-semibold`}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${isDark ? '' : ''}`}>
      <div className={`${theme.card} border rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-bold ${theme.text}`}>{getTitle()}</h2>
          <button
            onClick={handleClose}
            className={`p-1 rounded hover:bg-opacity-80 ${isDark ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
          >
            <X size={20} className={theme.textSecondary} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Main Form */}
          <div>
            <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>
              {itemType === 'project' ? 'Project Details' : 
               itemType === 'service' ? 'Service Details' : 
               itemType === 'environment' ? 'Environment Details' : 
               'Zone Details'}
            </h3>
            {renderMainForm()}
          </div>

          {/* Child Items Section (not for zone) */}
          {itemType !== 'zone' && (
            <div className={`border-t ${isDark ? 'border-slate-600' : 'border-gray-200'} pt-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${theme.text}`}>
                  Add {getChildLabel()} (Optional)
                </h3>
                {!showChildForm && (
                  <button
                    onClick={() => setShowChildForm(true)}
                    className={`px-3 py-2 ${theme.accent} text-white rounded text-sm font-semibold flex items-center gap-2 hover:scale-105 transition-all`}
                  >
                    <Plus size={16} /> Add {getChildLabel().slice(0, -1)}
                  </button>
                )}
              </div>

              {renderChildForm()}

              {/* List of added children */}
              {childItems.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className={`text-sm font-semibold ${theme.textSecondary}`}>
                    {childItems.length} {getChildLabel()} added:
                  </p>
                  {childItems.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded ${
                        isDark ? 'bg-slate-700/30' : 'bg-gray-50'
                      }`}
                    >
                      <div>
                        <p className={`font-semibold ${theme.text}`}>
                          {itemType === 'project' && item.serviceName}
                          {itemType === 'service' && item.environmentName}
                          {itemType === 'environment' && item.ZoneName}
                        </p>
                        <p className={`text-xs ${theme.textSecondary}`}>
                          {itemType === 'project' && `${item.applicationDomain} • ${item.hostingPlatform}`}
                          {itemType === 'service' && `${item.GTM}`}
                          {itemType === 'environment' && `${item.vipIP}`}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveChild(index)}
                        className="p-2 text-red-600 hover:bg-red-100/20 rounded transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex gap-3 p-6 border-t ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
          <button
            onClick={handleClose}
            className={`flex-1 px-4 py-2 ${theme.card} border rounded-lg font-semibold hover:opacity-80 transition-all`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all`}
          >
            Create {itemType === 'project' ? 'Project' : itemType === 'service' ? 'Service' : itemType === 'environment' ? 'Environment' : 'Zone'}
          </button>
        </div>
      </div>
    </div>
  );
}