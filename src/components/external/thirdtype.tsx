"use client"
import { motion } from "framer-motion";
import { Settings, ExternalLink, Database, Plus, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ELKIcon, GrafanaIcon, EAGIcon, ApigeeIcon, DynatraceIcon } from "@/components/icon/icons";
import { ToolModal, ToolFormData } from "@/components/ui/toolmodal";

interface Tool {
  id: number;
  name: string;
  description: string;
  icon_name: string;
  color_scheme: {
    icon: string;
    bg: string;
    accent: string;
  };
  environments: Array<{
    env_type: 'E1' | 'E2' | 'E3';
    url: string | null;
  }>;
  features: string[];
}

const iconMap = {
  "Grafana": GrafanaIcon,
  "ELK": ELKIcon,
  "EAG": EAGIcon,
  "Apigee": ApigeeIcon,
  "Dynatrace": DynatraceIcon,
  "Database": Database,
};

export function ToolsGrid() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch tools from database
  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tools');
      if (!response.ok) throw new Error('Failed to fetch tools');
      
      const data = await response.json();
      setTools(data.tools);
      setError(null);
      
      // Auto-select first tool if none selected
      if (data.tools.length > 0 && !selectedTool) {
        setSelectedTool(data.tools[0]);
      }
      
      // Clear selection if selected tool was deleted
      if (selectedTool && !data.tools.find(t => t.id === selectedTool.id)) {
        setSelectedTool(data.tools.length > 0 ? data.tools[0] : null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tools');
      console.error('Error fetching tools:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  // Function to check if a tool is configured
  const isToolConfigured = (tool: Tool): boolean => {
    return tool.environments.some(env => env.url && env.url.trim() !== "");
  };

  // Function to count configured environments
  const getConfiguredEnvironmentsCount = (tool: Tool): number => {
    return tool.environments.filter(env => env.url && env.url.trim() !== "").length;
  };

  const isEnvironmentConfigured = (url?: string | null): boolean => {
    return !!(url && url.trim() !== "");
  };

  const handleEnvironmentClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getToolSpecificIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Database;
  };

  // Handle tool creation/editing
  const handleSaveTool = async (toolData: ToolFormData) => {
    setIsSubmitting(true);
    try {
      const url = editingTool ? `/api/tools/${editingTool.id}` : '/api/tools';
      const method = editingTool ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toolData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to save tool';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (jsonError) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      setIsModalOpen(false);
      setEditingTool(null);
      await fetchTools();
    } catch (err) {
      console.error('Error saving tool:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle tool deletion
  const handleDeleteTool = async (toolId: number) => {
    if (!confirm('Are you sure you want to delete this tool? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/tools/${toolId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tool');
      }

      await fetchTools();
    } catch (err) {
      console.error('Error deleting tool:', err);
      alert('Failed to delete tool. Please try again.');
    }
  };

  // Handle edit tool
  const handleEditTool = (tool: Tool, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setEditingTool(tool);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-white/60 mt-4">Loading tools...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-400 mb-4">Error loading tools: {error}</p>
            <button
              onClick={fetchTools}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">External Integrations</h2>
            <p className="text-white/60 text-lg">Connected monitoring and analytics platforms</p>
          </motion.div>

          {/* Add New Tool Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 flex justify-center"
          >
            <button
              onClick={() => {
                setEditingTool(null);
                setIsModalOpen(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add New Tool
            </button>
          </motion.div>
          
          {tools.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Database className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/60 text-lg mb-6">No tools configured yet</p>
              <button
                onClick={() => {
                  setEditingTool(null);
                  setIsModalOpen(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Add Your First Tool
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-12 gap-6 h-[600px]">
              {/* Left Sidebar - Tool List (Master) */}
              <div className="col-span-12 lg:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white">Tools</h3>
                  <p className="text-white/60 text-sm">Select a tool to view details</p>
                </div>
                
                <div className="overflow-y-auto h-[calc(600px-80px)]">
                  {tools.map((tool, index) => {
                    const Icon = getToolSpecificIcon(tool.icon_name);
                    const isConfigured = isToolConfigured(tool);
                    const configuredEnvCount = getConfiguredEnvironmentsCount(tool);
                    const isSelected = selectedTool?.id === tool.id;
                    
                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-4 border-b border-white/5 cursor-pointer transition-all hover:bg-white/5 ${
                          isSelected ? 'bg-blue-500/10 border-r-2 border-r-blue-500' : ''
                        }`}
                        onClick={() => setSelectedTool(tool)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-8 h-8 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white truncate">{tool.name}</h4>
                            <p className="text-white/60 text-sm truncate">{tool.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
                              <span className={`text-xs ${isConfigured ? "text-green-400" : "text-red-400"}`}>
                                {isConfigured ? `${configuredEnvCount} envs` : "Not configured"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel - Tool Details (Detail) */}
              <div className="col-span-12 lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                {selectedTool ? (
                  <motion.div
                    key={selectedTool.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                  >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          {(() => {
                            const Icon = getToolSpecificIcon(selectedTool.icon_name);
                            return <Icon className="w-12 h-12" />;
                          })()}
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{selectedTool.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-2 h-2 rounded-full ${isToolConfigured(selectedTool) ? "bg-green-400" : "bg-red-400"}`}></div>
                              <span className={`text-sm font-medium ${isToolConfigured(selectedTool) ? "text-green-400" : "text-red-400"}`}>
                                {isToolConfigured(selectedTool) ? "ACTIVE" : "REQUIRES CONFIGURATION"}
                              </span>
                            </div>
                            <p className="text-white/60">{selectedTool.description}</p>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => handleEditTool(selectedTool, e)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteTool(selectedTool.id);
                            }}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 overflow-y-auto">
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
                        {/* Features Column */}
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                          <div className="space-y-3">
                            {selectedTool.features?.map((feature, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-white/80">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Environment Status */}
                          <div className="mt-6 p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center justify-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${isToolConfigured(selectedTool) ? "bg-green-400" : "bg-red-400"}`}></div>
                              <span className={`${isToolConfigured(selectedTool) ? "text-green-400" : "text-red-400"} font-medium`}>
                                {isToolConfigured(selectedTool) 
                                  ? `${getConfiguredEnvironmentsCount(selectedTool)} of 3 environments configured` 
                                  : "No environments configured"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Environment Launch Column */}
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Launch Environment</h4>
                          <div className="space-y-4">
                            {['E1', 'E2', 'E3'].map((envType) => {
                              const env = selectedTool.environments.find(e => e.env_type === envType);
                              const envConfigured = env && isEnvironmentConfigured(env.url);
                              const ToolIcon = getToolSpecificIcon(selectedTool.icon_name);
                              
                              return (
                                <button
                                  key={envType}
                                  onClick={() => envConfigured && env?.url ? handleEnvironmentClick(env.url) : undefined}
                                  disabled={!envConfigured}
                                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                                    envConfigured
                                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
                                      : "bg-gradient-to-r from-gray-600 to-gray-700 text-white/50 opacity-50 cursor-not-allowed"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <ToolIcon className={`w-6 h-6 ${selectedTool.color_scheme.icon}`}/>
                                      <div>
                                        <div className="font-semibold">{envType} Environment</div>
                                        <div className="text-sm opacity-75">{selectedTool.name}</div>
                                      </div>
                                    </div>
                                    {envConfigured ? (
                                      <ExternalLink className="w-5 h-5" />
                                    ) : (
                                      <span className="text-xs text-red-300">Not configured</span>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {!isToolConfigured(selectedTool) && (
                            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                              <p className="text-yellow-400 text-sm text-center">
                                Configure at least one environment to enable launching
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Database className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <p className="text-white/60">Select a tool from the list to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Dynamic Tool Management</h3>
            </div>
            <p className="text-white/60">
              Tools are dynamically loaded from the database. Use the "Add New Tool" button above to create new integrations, or use the edit/delete buttons in the tool details panel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tool Modal */}
      <ToolModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTool(null);
        }}
        onSave={handleSaveTool}
        editTool={editingTool}
        isLoading={isSubmitting}
      />
    </>
  );
}