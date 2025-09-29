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
  const [activeTab, setActiveTab] = useState<number>(0);
  
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
      
      // Reset active tab if tools change
      if (data.tools.length > 0 && activeTab >= data.tools.length) {
        setActiveTab(0);
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

  const activeTool = tools[activeTab];

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
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-white/10">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {tools.map((tool, index) => {
                    const Icon = getToolSpecificIcon(tool.icon_name);
                    const isConfigured = isToolConfigured(tool);
                    const isActive = activeTab === index;
                    
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTab(index)}
                        className={`flex items-center gap-3 px-6 py-4 min-w-0 whitespace-nowrap transition-all border-b-2 ${
                          isActive
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-transparent hover:bg-white/5 text-white/70 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium truncate">{tool.name}</span>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              {activeTool && (
                <motion.div
                  key={activeTool.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-8"
                >
                  <div className="flex items-start gap-8">
                    {/* Left Column - Tool Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          {(() => {
                            const Icon = getToolSpecificIcon(activeTool.icon_name);
                            return <Icon className="w-12 h-12" />;
                          })()}
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{activeTool.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-2 h-2 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
                              <span className={`text-sm font-medium ${isToolConfigured(activeTool) ? "text-green-400" : "text-red-400"}`}>
                                {isToolConfigured(activeTool) ? "ACTIVE" : "REQUIRES CONFIGURATION"}
                              </span>
                            </div>
                            <p className="text-white/60">{activeTool.description}</p>
                          </div>
                        </div>
                        
                        {/* Edit/Delete buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => handleEditTool(activeTool, e)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteTool(activeTool.id);
                            }}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {activeTool.features?.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Environment Status */}
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-center gap-1 text-sm">
                          <div className={`w-2 h-2 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
                          <span className={`${isToolConfigured(activeTool) ? "text-green-400" : "text-red-400"} font-medium`}>
                            {isToolConfigured(activeTool) 
                              ? `${getConfiguredEnvironmentsCount(activeTool)} of 3 environments configured` 
                              : "No environments configured"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Environment Actions */}
                    <div className="w-80 flex-shrink-0">
                      <div className="bg-white/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-4 text-center">Launch Environment</h4>
                        
                        <div className="space-y-3">
                          {['E1', 'E2', 'E3'].map((envType) => {
                            const env = activeTool.environments.find(e => e.env_type === envType);
                            const envConfigured = env && isEnvironmentConfigured(env.url);
                            const ToolIcon = getToolSpecificIcon(activeTool.icon_name);
                            
                            return (
                              <button
                                key={envType}
                                onClick={() => envConfigured && env?.url ? handleEnvironmentClick(env.url) : undefined}
                                disabled={!envConfigured}
                                className={`w-full py-4 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-between ${
                                  envConfigured
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer shadow-lg"
                                    : "bg-gradient-to-r from-gray-600 to-gray-700 text-white/50 opacity-50 cursor-not-allowed"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <ToolIcon className={`w-5 h-5 ${activeTool.color_scheme.icon}`}/>
                                  <div className="text-left">
                                    <div className="font-semibold">{envType} Environment</div>
                                    <div className="text-xs opacity-75">{activeTool.name}</div>
                                  </div>
                                </div>
                                {envConfigured ? (
                                  <ExternalLink className="w-4 h-4" />
                                ) : (
                                  <span className="text-xs text-red-300">Not configured</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {!isToolConfigured(activeTool) && (
                          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-yellow-400 text-xs text-center">
                              Configure at least one environment to enable launching
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
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
              Tools are dynamically loaded from the database. Use the "Add New Tool" button above to create new integrations, or use the edit/delete buttons in each tool's tab.
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