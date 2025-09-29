"use client"
import { motion } from "framer-motion";
import { Settings, ExternalLink, Database, ChevronLeft, ChevronRight, Plus, Edit, Trash2 } from "lucide-react";
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
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  
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

  const handleLaunchClick = (toolName: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setFlippedCards(prevState => {
      const newSet = new Set(prevState);
      if (newSet.has(toolName)) {
        newSet.delete(toolName);
      } else {
        newSet.add(toolName);
      }
      return newSet;
    });
  };

  const handleEnvironmentClick = (url: string, toolName: string) => {
    if (url) {
      // Open in new tab/window to avoid navigation issues
      window.open(url, '_blank', 'noopener,noreferrer');
      // Close the card after selection
      setFlippedCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(toolName);
        return newSet;
      });
    }
  };

  const handleCloseCard = (toolName: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(toolName);
      return newSet;
    });
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
          // If JSON parsing fails, use the HTTP status text
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Refresh tools list
      await fetchTools();
      setIsModalOpen(false);
      setEditingTool(null);
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

  // Responsive handling
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setItemsPerSlide(3);
      } else if (width >= 768) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(1);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerSlide]);

  // Total items is just tools now (no add button in carousel)
  const totalItems = tools.length;
  const totalSlides = Math.ceil(totalItems / itemsPerSlide);
  const canGoNext = currentIndex < totalSlides - 1;
  const canGoPrev = currentIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToDot = (dotIndex: number) => {
    setCurrentIndex(dotIndex);
  };

  // Remove add button from carousel - it will be a separate button
  const allItems = tools;

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
      <style jsx>{`
        .dynamic-card-container {
          perspective: 1200px;
          -webkit-perspective: 1200px;
        }
        
        .dynamic-card {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          -webkit-transition: -webkit-transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        .dynamic-card.flipped {
          transform: rotateY(180deg) translateZ(0);
          -webkit-transform: rotateY(180deg) translateZ(0);
        }
        
        .dynamic-card-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(1px);
          -webkit-transform: translateZ(1px);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          will-change: transform, opacity;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .dynamic-card-back {
          transform: rotateY(180deg) translateZ(1px);
          -webkit-transform: rotateY(180deg) translateZ(1px);
        }
        
        @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-color-index: 0) {
          .dynamic-card-face {
            -webkit-transform: translateZ(2px);
            transform: translateZ(2px);
          }
          
          .dynamic-card-back {
            -webkit-transform: rotateY(180deg) translateZ(2px);
            transform: rotateY(180deg) translateZ(2px);
          }
        }
      `}</style>
      
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
          
          <div className="relative">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center ${
                canGoPrev 
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-blue-400' 
                  : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center ${
                canGoNext 
                  ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-blue-400' 
                  : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="mx-12 overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div 
                    key={slideIndex}
                    className="w-full flex-shrink-0 flex gap-6"
                  >
                    {allItems.slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    ).map((tool, itemIndex) => {
                      const Icon = getToolSpecificIcon(tool.icon_name);
                      const isConfigured = isToolConfigured(tool);
                      const configuredEnvCount = getConfiguredEnvironmentsCount(tool);
                      const isFlipped = flippedCards.has(tool.name);
                      
                      return (
                        <div key={tool.id} className="flex-1 min-w-0">
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full"
                          >
                            <div className="relative w-full h-96 overflow-hidden dynamic-card-container group">
                              <div className={`relative w-full h-full dynamic-card ${isFlipped ? 'flipped' : ''}`}>
                                {/* Front Side */}
                                <div className="dynamic-card-face">
                                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col overflow-hidden">
                                    {/* Edit/Delete buttons - visible on hover */}
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                      <button
                                        onClick={(e) => handleEditTool(tool, e)}
                                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleDeleteTool(tool.id);
                                        }}
                                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>

                                    <div className="flex items-center justify-between mb-6 group">
                                      <Icon />
                                      <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
                                        <span className={`text-xs font-medium ${isConfigured ? "text-green-400" : "text-red-400"}`}>
                                          {isConfigured ? "ACTIVE" : "CONFIGURE"}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-3">{tool.name}</h3>
                                    <p className="text-white/60 text-sm mb-4">{tool.description}</p>
                                    
                                    <div className="space-y-2 mb-6 flex flex-col relative">
                                      {tool.features?.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-white/50">
                                          <div className="w-1.5 h-1.5 bg-white/50 rounded-full mt-2 flex-shrink-0"></div>
                                          <span className="line-clamp-1">{feature}</span>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="absolute bottom-4 left-6 right-6">
                                      <div className="mt-3 pt-3 pb-3 border-t border-white/10">
                                        <div className="flex items-center justify-center gap-1 text-xs">
                                          <div className={`w-1.5 h-1.5 rounded-full ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
                                          <span className={`${isConfigured ? "text-green-400" : "text-red-400"}`}>
                                            {isConfigured ? `${configuredEnvCount} envs` : "Config needed"}
                                          </span>
                                        </div>
                                      </div>
                                      
                                      <button 
                                        onClick={(e) => isConfigured ? handleLaunchClick(tool.name, e) : undefined}
                                        disabled={!isConfigured}
                                        className={`w-full py-3 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2 ${
                                          isConfigured 
                                            ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer shadow-lg"
                                            : "bg-gradient-to-r from-gray-600 to-gray-700 text-white opacity-50 cursor-not-allowed"
                                        }`}
                                      >
                                        {isConfigured ? "Launch Tool" : "Configure Required"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Back Side */}
                                <div className="dynamic-card-face dynamic-card-back">
                                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col overflow-hidden">
                                    <div className="flex items-center justify-between mb-6 flex-shrink-0">
                                      <div className="flex items-center gap-2">
                                        <Icon />
                                      </div>
                                      <button
                                        onClick={(e) => handleCloseCard(tool.name, e)}
                                        className="text-white/60 hover:text-white transition-colors text-lg p-1 hover:bg-white/10 rounded-lg"
                                      >
                                        ✕
                                      </button>
                                    </div>

                                    <div className="mb-6">
                                      <h4 className="text-base font-semibold text-white">{tool.name}</h4>
                                      <p className="text-white/50 text-xs">Select Environment</p>
                                    </div>
                                    
                                    <div className="flex-1 flex flex-col justify-center px-2">
                                      <div className="space-y-4 mb-6">
                                        {/* Always show all environments (E1, E2, E3) */}
                                        {['E1', 'E2', 'E3'].map((envType) => {
                                          const env = tool.environments.find(e => e.env_type === envType);
                                          const envConfigured = env && isEnvironmentConfigured(env.url);
                                          const ToolIcon = getToolSpecificIcon(tool.icon_name);
                                          
                                          return (
                                            <button
                                              key={envType}
                                              onClick={() => envConfigured && env?.url ? handleEnvironmentClick(env.url, tool.name) : undefined}
                                              disabled={!envConfigured}
                                              className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center group ${
                                                envConfigured
                                                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer"
                                                  : "bg-gradient-to-r from-gray-600 to-gray-700 text-white/50 opacity-50 cursor-not-allowed"
                                              }`}
                                            >
                                              <ToolIcon className={`w-5 h-5 mr-1 ${tool.color_scheme.icon}`}/>
                                              <span>{envType} {tool.name}</span>
                                              {envConfigured && (
                                                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                              )}
                                            </button>
                                          );
                                        })}
                                      </div>
                                      
                                      <div className="mt-auto pt-4 border-t border-white/10">
                                        <div className="flex items-center justify-center gap-1 text-xs">
                                          <div className={`w-1.5 h-1.5 rounded-full ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
                                          <span className={`${isConfigured ? "text-green-400" : "text-red-400"}`}>
                                            {isConfigured ? `${configuredEnvCount} envs configured` : "Configuration needed"}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToDot(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index 
                        ? "bg-blue-500 w-8" 
                        : "bg-white/30 hover:bg-white/50 w-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Dynamic Tool Management</h3>
              </div>
              <button
                onClick={() => {
                  setEditingTool(null);
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add New Tool
              </button>
            </div>
            <p className="text-white/60">
              Tools are dynamically loaded from the database. Add, edit, or remove tools as needed.
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