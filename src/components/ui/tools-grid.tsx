// "use client"
// import { motion } from "framer-motion";
// import { Settings, ExternalLink, Database, Plus, Edit, Trash2, X, Search, Clock } from "lucide-react";
// import { useEffect, useState } from "react";
// import { ELKIcon, GrafanaIcon, EAGIcon, ApigeeIcon, DynatraceIcon } from "@/components/icon/icons";
// import { ToolModal, ToolFormData } from "@/components/ui/toolmodal";

// interface Tool {
//   id: number;
//   name: string;
//   description: string;
//   icon_name: string;
//   color_scheme: {
//     icon: string;
//     bg: string;
//     accent: string;
//   };
//   environments: Array<{
//     env_type: 'E1' | 'E2' | 'E3';
//     url: string | null;
//   }>;
//   features: string[];
// }

// const iconMap = {
//   "Plus": Plus,
//   "Search": Search,
//   "Settings": Settings,
//   "ExternalLink": ExternalLink,
//   "Clock": Clock,
//   "Database": Database,
// };

// export function ToolsGrid() {
//   const [tools, setTools] = useState<Tool[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<number>(0);
  
//   // Modal states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTool, setEditingTool] = useState<Tool | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Search states
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch tools from database
//   const fetchTools = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/tools');
//       if (!response.ok) throw new Error('Failed to fetch tools');
      
//       const data = await response.json();
//       setTools(data.tools);
//       setError(null);
      
//       // Reset active tab if tools change
//       if (data.tools.length > 0 && activeTab >= data.tools.length) {
//         setActiveTab(0);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to load tools');
//       console.error('Error fetching tools:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTools();
//   }, []);

//   // Filter tools based on search query
//   const filteredTools = tools.filter(tool =>
//     tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     tool.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Function to check if a tool is configured
//   const isToolConfigured = (tool: Tool): boolean => {
//     return tool.environments.some(env => env.url && env.url.trim() !== "");
//   };

//   // Function to count configured environments
//   const getConfiguredEnvironmentsCount = (tool: Tool): number => {
//     return tool.environments.filter(env => env.url && env.url.trim() !== "").length;
//   };

//   const isEnvironmentConfigured = (url?: string | null): boolean => {
//     return !!(url && url.trim() !== "");
//   };

//   const handleEnvironmentClick = (url: string) => {
//     if (url) {
//       window.open(url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   const getToolSpecificIcon = (iconName: string) => {
//     return iconMap[iconName as keyof typeof iconMap] || Database;
//   };

//   // Handle tool creation/editing
//   const handleSaveTool = async (toolData: ToolFormData) => {
//     setIsSubmitting(true);
//     try {
//       const url = editingTool ? `/api/tools/${editingTool.id}` : '/api/tools';
//       const method = editingTool ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(toolData),
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to save tool';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.error || errorMessage;
//         } catch (jsonError) {
//           errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//         }
//         throw new Error(errorMessage);
//       }

//       setIsModalOpen(false);
//       setEditingTool(null);
//       await fetchTools();
//     } catch (err) {
//       console.error('Error saving tool:', err);
//       alert(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle tool deletion
//   const handleDeleteTool = async (toolId: number) => {
//     if (!confirm('Are you sure you want to delete this tool? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       const response = await fetch(`/api/tools/${toolId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete tool');
//       }

//       await fetchTools();
//     } catch (err) {
//       console.error('Error deleting tool:', err);
//       alert('Failed to delete tool. Please try again.');
//     }
//   };

//   // Handle tool selection from search
//   const handleToolSelect = (toolIndex: number) => {
//     setActiveTab(toolIndex);
//     setSearchQuery("");
//   };

//   // Handle edit tool
//   const handleEditTool = (tool: Tool, event: React.MouseEvent) => {
//     event.preventDefault();
//     event.stopPropagation();
    
//     setEditingTool(tool);
//     setIsModalOpen(true);
//   };

//   if (loading) {
//     return (
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <div className="inline-block w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
//             <p className="text-white/60 mt-4">Loading tools...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <p className="text-red-400 mb-4">Error loading tools: {error}</p>
//             <button
//               onClick={fetchTools}
//               className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const activeTool = tools[activeTab];

//   return (
//     <>
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12 sm:mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">External Integrations</h2>
//             <p className="text-white/60 text-base sm:text-lg">Connected monitoring and analytics platforms</p>
//           </motion.div>

//           {/* Add New Tool Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="mb-6 sm:mb-8 flex justify-center"
//           >
//             <button
//               onClick={() => {
//                 setEditingTool(null);
//                 setIsModalOpen(true);
//               }}
//               className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg text-sm sm:text-base"
//             >
//               <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//               Add New Tool
//             </button>
//           </motion.div>
          
//           {tools.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-16 sm:py-20"
//             >
//               <Database className="w-12 h-12 sm:w-16 sm:h-16 text-white/30 mx-auto mb-4" />
//               <p className="text-white/60 text-base sm:text-lg mb-6">No tools configured yet</p>
//               <button
//                 onClick={() => {
//                   setEditingTool(null);
//                   setIsModalOpen(true);
//                 }}
//                 className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 mx-auto text-sm sm:text-base"
//               >
//                 <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Add Your First Tool
//               </button>
//             </motion.div>
//           ) : (
//             /* Horizontal Container for Tool Content and Application Navigator */
//             <div className="flex flex-col xl:flex-row gap-6">
//               {/* Tools Content Container */}
//               <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
//                 {/* Unified Tab Navigation */}
//                 <div className="border-b border-white/10">
//                   {/* Desktop tabs */}
//                   <div className="hidden lg:flex overflow-x-auto scrollbar-hide">
//                     {tools.map((tool, index) => {
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === index;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => setActiveTab(index)}
//                           className={`flex items-center gap-3 px-4 xl:px-6 py-4 min-w-fit whitespace-nowrap transition-all border-b-2 ${
//                             isActive
//                               ? 'border-blue-500 bg-blue-500/10 text-white'
//                               : 'border-transparent hover:bg-white/5 text-white/70 hover:text-white'
//                           }`}
//                         >
//                           <Icon className="w-5 h-5 flex-shrink-0" />
//                           <span className="font-medium max-w-[120px] xl:max-w-none truncate">{tool.name}</span>
//                           <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {/* Mobile tabs */}
//                   <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2 lg:hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
//                     {tools.map((tool, index) => {
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === index;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => setActiveTab(index)}
//                           className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
//                             isActive
//                               ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/50'
//                               : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-transparent'
//                           }`}
//                         >
//                           <Icon className="w-4 h-4 flex-shrink-0" />
//                           <span className="max-w-[100px] truncate">{tool.name}</span>
//                           <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Tool Content */}
//                 {activeTool && (
//                   <motion.div
//                     key={activeTool.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="p-4 sm:p-6 lg:p-8"
//                   >
//                     {/* Tool Information and Environment Buttons */}
//                     <div className="flex flex-col xl:flex-row gap-6">
//                       {/* Tool Information */}
//                       <div className="flex-1">
//                         {/* Tool Header */}
//                         <div className="flex items-start justify-between mb-6">
//                           <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
//                             {(() => {
//                               const Icon = getToolSpecificIcon(activeTool.icon_name);
//                               return <Icon className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />;
//                             })()}
//                             <div className="min-w-0 flex-1">
//                               <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{activeTool.name}</h3>
//                               <div className="flex items-center gap-2 mb-2">
//                                 <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
//                                 <span className={`text-xs sm:text-sm font-medium ${isToolConfigured(activeTool) ? "text-green-400" : "text-red-400"}`}>
//                                   {isToolConfigured(activeTool) ? "ACTIVE" : "REQUIRES CONFIGURATION"}
//                                 </span>
//                               </div>
//                               <p className="text-white/60 text-sm sm:text-base leading-relaxed">{activeTool.description}</p>
//                             </div>
//                           </div>
                          
//                           {/* Edit/Delete buttons */}
//                           <div className="flex gap-2 flex-shrink-0">
//                             <button
//                               onClick={(e) => handleEditTool(activeTool, e)}
//                               className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 handleDeleteTool(activeTool.id);
//                               }}
//                               className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Features */}
//                         <div className="mb-6">
//                           <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Features</h4>
//                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
//                             {activeTool.features?.map((feature, i) => (
//                               <div key={i} className="flex items-start gap-2 text-sm text-white/70">
//                                 <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
//                                 <span className="leading-relaxed">{feature}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Environment Status */}
//                         <div className="bg-white/5 rounded-xl p-4">
//                           <div className="flex items-center justify-center gap-2 text-sm">
//                             <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
//                             <span className={`${isToolConfigured(activeTool) ? "text-green-400" : "text-red-400"} font-medium text-center`}>
//                               {isToolConfigured(activeTool) 
//                                 ? `${getConfiguredEnvironmentsCount(activeTool)} of 3 environments configured` 
//                                 : "No environments configured"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Environment Buttons */}
//                       <div className="w-full xl:w-80 flex-shrink-0">
//                         <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
//                           <h4 className="text-lg font-semibold text-white mb-4 text-center">Launch Environment</h4>
                          
//                           {/* Responsive grid layout for environment buttons */}
//                           <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
//                             {['E1', 'E2', 'E3'].map((envType) => {
//                               const env = activeTool.environments.find(e => e.env_type === envType);
//                               const envConfigured = env && isEnvironmentConfigured(env.url);
//                               const ToolIcon = getToolSpecificIcon(activeTool.icon_name);
              
//                               return (
//                                 <button
//                                   key={envType}
//                                   onClick={() => envConfigured && env?.url ? handleEnvironmentClick(env.url) : undefined}
//                                   disabled={!envConfigured}
//                                   className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between border ${
//                                     envConfigured
//                                       ? "bg-white/10 hover:bg-white/15 border-blue-400/30 hover:border-blue-400/50 text-white cursor-pointer shadow-sm hover:shadow-md"
//                                       : "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
//                                   }`}
//                                 >
//                                   <div className="flex items-center gap-2 min-w-0">
//                                     <ToolIcon className="w-4 h-4 flex-shrink-0"/>
//                                     <div className="text-left min-w-0">
//                                       <div className="font-medium text-xs sm:text-sm">{envType}</div>
//                                       <div className="text-xs opacity-60 truncate hidden sm:block xl:block">{activeTool.name}</div>
//                                     </div>
//                                   </div>
//                                   {envConfigured ? (
//                                     <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//                                   ) : (
//                                     <span className="text-xs text-red-400 flex-shrink-0 hidden sm:inline xl:inline">Not configured</span>
//                                   )}
//                                 </button>
//                               );
//                             })}
//                           </div>

//                           {!isToolConfigured(activeTool) && (
//                             <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
//                               <p className="text-yellow-400 text-xs text-center">
//                                 Configure at least one environment to enable launching
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Application Navigator - Separate Component */}
//               <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:w-96 xl:max-w-none mx-auto xl:mx-0 flex-shrink-0">
//                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6">
//                   <h4 className="text-lg font-semibold text-white mb-4">Application Navigator</h4>
                  
//                   {/* Search Input */}
//                   <div className="relative mb-4">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
//                     <input
//                       type="text"
//                       placeholder="Search applications..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
//                     />
//                     {searchQuery && (
//                       <button
//                         onClick={() => setSearchQuery("")}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>

//                   {/* Applications Count */}
//                   <div className="text-xs text-white/60 mb-3 px-1">
//                     {filteredTools.length} of {tools.length} applications
//                   </div>
                  
//                   {/* Applications List with Mouse Wheel Scroll */}
//                   <div 
//                     style={{
//                       height: '300px',
//                       overflowY: 'scroll',
//                       border: '1px solid rgba(255, 255, 255, 0.1)',
//                       borderRadius: '8px',
//                       backgroundColor: 'rgba(255, 255, 255, 0.02)',
//                       padding: '8px',
//                       cursor: 'default'
//                     }}
//                     onWheel={(e) => {
//                       e.currentTarget.scrollTop += e.deltaY;
//                     }}
//                   >
//                     {filteredTools.map((tool, index) => {
//                       const originalIndex = tools.findIndex(t => t.id === tool.id);
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === originalIndex;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => handleToolSelect(originalIndex)}
//                           style={{
//                             width: '100%',
//                             padding: '12px',
//                             marginBottom: '8px',
//                             borderRadius: '8px',
//                             border: isActive ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
//                             backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
//                             color: 'white',
//                             cursor: 'pointer',
//                             transition: 'all 0.2s',
//                             textAlign: 'left',
//                             pointerEvents: 'auto'
//                           }}
//                           onMouseEnter={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
//                               e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
//                               e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
//                             }
//                           }}
//                           onWheel={(e) => {
//                             e.stopPropagation();
//                             const container = e.currentTarget.parentElement;
//                             if (container) {
//                               container.scrollTop += e.deltaY;
//                             }
//                           }}
//                         >
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                             <Icon style={{ width: '20px', height: '20px', flexShrink: 0 }} />
//                             <div style={{ flex: 1, minWidth: 0 }}>
//                               <div style={{ fontSize: '14px', fontWeight: '500' }}>{tool.name}</div>
//                             </div>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
//                               <div 
//                                 style={{
//                                   width: '8px',
//                                   height: '8px',
//                                   borderRadius: '50%',
//                                   backgroundColor: isConfigured ? '#10b981' : '#ef4444'
//                                 }}
//                               ></div>
//                               {isActive && (
//                                 <div 
//                                   style={{
//                                     width: '8px',
//                                     height: '8px',
//                                     borderRadius: '50%',
//                                     backgroundColor: '#3b82f6'
//                                   }}
//                                 ></div>
//                               )}
//                             </div>
//                           </div>
//                         </button>
//                       );
//                     })}
                    
//                     {filteredTools.length === 0 && searchQuery && (
//                       <div style={{ textAlign: 'center', padding: '32px 0', color: 'rgba(255, 255, 255, 0.6)' }}>
//                         <div style={{ marginBottom: '8px' }}>🔍</div>
//                         <p style={{ fontSize: '14px' }}>No applications found matching "{searchQuery}"</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//       {/* Tool Modal */}
//       <ToolModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingTool(null);
//         }}
//         onSave={handleSaveTool}
//         editTool={editingTool}
//         isLoading={isSubmitting}
//       />
//     </>
//   );
// }


















// "use client"
// import { motion } from "framer-motion";
// import { Settings, ExternalLink, Database, Plus, Edit, Trash2, X, Search, Sun, Moon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { ELKIcon, GrafanaIcon, EAGIcon, ApigeeIcon, DynatraceIcon } from "@/components/icon/icons";
// import { ToolModal, ToolFormData } from "@/components/ui/toolmodal";

// interface Tool {
//   id: number;
//   name: string;
//   description: string;
//   icon_name: string;
//   color_scheme: {
//     icon: string;
//     bg: string;
//     accent: string;
//   };
//   environments: Array<{
//     env_type: 'E1' | 'E2' | 'E3';
//     url: string | null;
//   }>;
//   features: string[];
// }

// const iconMap = {
//   "Grafana": GrafanaIcon,
//   "ELK": ELKIcon,
//   "EAG": EAGIcon,
//   "Apigee": ApigeeIcon,
//   "Dynatrace": DynatraceIcon,
//   "Database": Database,
// };

// export function ToolsGrid() {
//   const [tools, setTools] = useState<Tool[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<number>(0);
//   const [isDarkMode, setIsDarkMode] = useState(false);
  
//   // Modal states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTool, setEditingTool] = useState<Tool | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Search states
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch tools from database
//   const fetchTools = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/tools');
//       if (!response.ok) throw new Error('Failed to fetch tools');
      
//       const data = await response.json();
//       setTools(data.tools);
//       setError(null);
      
//       if (data.tools.length > 0 && activeTab >= data.tools.length) {
//         setActiveTab(0);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to load tools');
//       console.error('Error fetching tools:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTools();
//   }, []);

//   const filteredTools = tools.filter(tool =>
//     tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     tool.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const isToolConfigured = (tool: Tool): boolean => {
//     return tool.environments.some(env => env.url && env.url.trim() !== "");
//   };

//   const getConfiguredEnvironmentsCount = (tool: Tool): number => {
//     return tool.environments.filter(env => env.url && env.url.trim() !== "").length;
//   };

//   const isEnvironmentConfigured = (url?: string | null): boolean => {
//     return !!(url && url.trim() !== "");
//   };

//   const handleEnvironmentClick = (url: string) => {
//     if (url) {
//       window.open(url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   const getToolSpecificIcon = (iconName: string) => {
//     return iconMap[iconName as keyof typeof iconMap] || Database;
//   };

//   const handleSaveTool = async (toolData: ToolFormData) => {
//     setIsSubmitting(true);
//     try {
//       const url = editingTool ? `/api/tools/${editingTool.id}` : '/api/tools';
//       const method = editingTool ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(toolData),
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to save tool';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.error || errorMessage;
//         } catch (jsonError) {
//           errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//         }
//         throw new Error(errorMessage);
//       }

//       setIsModalOpen(false);
//       setEditingTool(null);
//       await fetchTools();
//     } catch (err) {
//       console.error('Error saving tool:', err);
//       alert(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteTool = async (toolId: number) => {
//     if (!confirm('Are you sure you want to delete this tool? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       const response = await fetch(`/api/tools/${toolId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete tool');
//       }

//       await fetchTools();
//     } catch (err) {
//       console.error('Error deleting tool:', err);
//       alert('Failed to delete tool. Please try again.');
//     }
//   };

//   const handleToolSelect = (toolIndex: number) => {
//     setActiveTab(toolIndex);
//     setSearchQuery("");
//   };

//   const handleEditTool = (tool: Tool, event: React.MouseEvent) => {
//     event.preventDefault();
//     event.stopPropagation();
    
//     setEditingTool(tool);
//     setIsModalOpen(true);
//   };

//   if (loading) {
//     return (
//       <section className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 ${isDarkMode ? '' : 'bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen'}`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <div className={`inline-block w-8 h-8 border-4 rounded-full animate-spin ${isDarkMode ? 'border-blue-500/30 border-t-blue-500' : 'border-gray-300 border-t-blue-600'}`}></div>
//             <p className={`mt-4 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>Loading tools...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 ${isDarkMode ? '' : 'bg-gray-50 min-h-screen'}`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <p className={`mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Error loading tools: {error}</p>
//             <button
//               onClick={fetchTools}
//               className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const activeTool = tools[activeTab];

//   return (
//     <>
//       <section className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 ${isDarkMode ? '' : 'bg-gray-50 min-h-screen'}`}>
//         <div className="max-w-7xl mx-auto">
//           {/* Theme Toggle Button */}
//           <div className="fixed top-4 right-4 z-50">
//             <button
//               onClick={() => setIsDarkMode(!isDarkMode)}
//               className={`p-3 rounded-full shadow-lg hover:scale-105 transition-all ${
//                 isDarkMode 
//                   ? 'bg-white/5 backdrop-blur-xl border border-white/10 text-white' 
//                   : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-md'
//               }`}
//             >
//               {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12 sm:mb-16"
//           >
//             <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
//               isDarkMode 
//                 ? 'gradient-text' 
//                 : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
//             }`}>
//               External Integrations
//             </h2>
//             <p className={`text-base sm:text-lg ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
//               Connected monitoring and analytics platforms
//             </p>
//           </motion.div>

//           {/* Add New Tool Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="mb-6 sm:mb-8 flex justify-center"
//           >
//             <button
//               onClick={() => {
//                 setEditingTool(null);
//                 setIsModalOpen(true);
//               }}
//               className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg text-sm sm:text-base"
//             >
//               <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//               Add New Tool
//             </button>
//           </motion.div>
          
//           {tools.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-16 sm:py-20"
//             >
//               <Database className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 ${isDarkMode ? 'text-white/30' : 'text-gray-400'}`} />
//               <p className={`text-base sm:text-lg mb-6 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
//                 No tools configured yet
//               </p>
//               <button
//                 onClick={() => {
//                   setEditingTool(null);
//                   setIsModalOpen(true);
//                 }}
//                 className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 mx-auto text-sm sm:text-base"
//               >
//                 <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Add Your First Tool
//               </button>
//             </motion.div>
//           ) : (
//             <div className="flex flex-col xl:flex-row gap-6">
//               {/* Tools Content Container */}
//               <div className={`flex-1 rounded-2xl overflow-hidden shadow-xl ${
//                 isDarkMode 
//                   ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
//                   : 'bg-white border border-gray-200'
//               }`}>
//                 {/* Unified Tab Navigation */}
//                 <div className={`border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
//                   {/* Desktop tabs */}
//                   <div className="hidden lg:flex overflow-x-auto scrollbar-hide">
//                     {tools.map((tool, index) => {
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === index;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => setActiveTab(index)}
//                           className={`flex items-center gap-3 px-4 xl:px-6 py-4 min-w-fit whitespace-nowrap transition-all border-b-2 ${
//                             isActive
//                               ? isDarkMode 
//                                 ? 'border-blue-500 bg-blue-500/10 text-white'
//                                 : 'border-blue-500 bg-blue-500 text-white shadow-sm'
//                               : isDarkMode
//                                 ? 'border-transparent hover:bg-white/5 text-white/70 hover:text-white'
//                                 : 'border-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-900'
//                           }`}
//                         >
//                           <Icon className="w-5 h-5 flex-shrink-0" />
//                           <span className="font-medium max-w-[120px] xl:max-w-none truncate">{tool.name}</span>
//                           <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {/* Mobile tabs */}
//                   <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2 lg:hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
//                     {tools.map((tool, index) => {
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === index;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => setActiveTab(index)}
//                           className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
//                             isActive
//                               ? isDarkMode
//                                 ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/50'
//                                 : 'bg-blue-500 text-white border border-blue-500 shadow-sm'
//                               : isDarkMode
//                                 ? 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-transparent'
//                                 : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 border border-gray-200'
//                           }`}
//                         >
//                           <Icon className="w-4 h-4 flex-shrink-0" />
//                           <span className="max-w-[100px] truncate">{tool.name}</span>
//                           <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Tool Content */}
//                 {activeTool && (
//                   <motion.div
//                     key={activeTool.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="p-4 sm:p-6 lg:p-8"
//                   >
//                     <div className="flex flex-col xl:flex-row gap-6">
//                       {/* Tool Information */}
//                       <div className="flex-1">
//                         {/* Tool Header */}
//                         <div className="flex items-start justify-between mb-6">
//                           <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
//                             {(() => {
//                               const Icon = getToolSpecificIcon(activeTool.icon_name);
//                               return <Icon className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />;
//                             })()}
//                             <div className="min-w-0 flex-1">
//                               <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                                 {activeTool.name}
//                               </h3>
//                               <div className="flex items-center gap-2 mb-2">
//                                 <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
//                                 <span className={`text-xs sm:text-sm font-medium ${
//                                   isToolConfigured(activeTool) 
//                                     ? isDarkMode ? 'text-green-400' : 'text-green-600'
//                                     : isDarkMode ? 'text-red-400' : 'text-red-600'
//                                 }`}>
//                                   {isToolConfigured(activeTool) ? "ACTIVE" : "REQUIRES CONFIGURATION"}
//                                 </span>
//                               </div>
//                               <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
//                                 {activeTool.description}
//                               </p>
//                             </div>
//                           </div>
                          
//                           {/* Edit/Delete buttons */}
//                           <div className="flex gap-2 flex-shrink-0">
//                             <button
//                               onClick={(e) => handleEditTool(activeTool, e)}
//                               className={`p-2 rounded-lg transition-colors ${
//                                 isDarkMode 
//                                   ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'
//                                   : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-600'
//                               }`}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 handleDeleteTool(activeTool.id);
//                               }}
//                               className={`p-2 rounded-lg transition-colors ${
//                                 isDarkMode 
//                                   ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
//                                   : 'bg-red-500/10 hover:bg-red-500/20 text-red-600'
//                               }`}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Features */}
//                         <div className="mb-6">
//                           <h4 className={`text-base sm:text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                             Features
//                           </h4>
//                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
//                             {activeTool.features?.map((feature, i) => (
//                               <div key={i} className={`flex items-start gap-2 text-sm ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>
//                                 <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
//                                 <span className="leading-relaxed">{feature}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Environment Status */}
//                         <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-white/5' : 'bg-slate-50 border border-slate-200'}`}>
//                           <div className="flex items-center justify-center gap-2 text-sm">
//                             <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
//                             <span className={`font-medium text-center ${
//                               isToolConfigured(activeTool) 
//                                 ? isDarkMode ? 'text-green-400' : 'text-green-600'
//                                 : isDarkMode ? 'text-red-400' : 'text-red-600'
//                             }`}>
//                               {isToolConfigured(activeTool) 
//                                 ? `${getConfiguredEnvironmentsCount(activeTool)} of 3 environments configured` 
//                                 : "No environments configured"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Environment Buttons */}
//                       <div className="w-full xl:w-80 flex-shrink-0">
//                         <div className={`rounded-xl p-4 sm:p-6 border shadow-sm ${
//                           isDarkMode 
//                             ? 'bg-white/5 border-white/10' 
//                             : 'bg-white border-slate-200'
//                         }`}>
//                           <h4 className={`text-lg font-semibold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                             Launch Environment
//                           </h4>
                          
//                           <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
//                             {['E1', 'E2', 'E3'].map((envType) => {
//                               const env = activeTool.environments.find(e => e.env_type === envType);
//                               const envConfigured = env && isEnvironmentConfigured(env.url);
//                               const ToolIcon = getToolSpecificIcon(activeTool.icon_name);
              
//                               return (
//                                 <button
//                                   key={envType}
//                                   onClick={() => envConfigured && env?.url ? handleEnvironmentClick(env.url) : undefined}
//                                   disabled={!envConfigured}
//                                   className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between border ${
//                                     envConfigured
//                                       ? isDarkMode
//                                         ? "bg-white/10 hover:bg-white/15 border-blue-400/30 hover:border-blue-400/50 text-white cursor-pointer shadow-sm hover:shadow-md"
//                                         : "bg-white hover:bg-blue-50 border-blue-300 hover:border-blue-400 text-gray-900 shadow-sm cursor-pointer hover:shadow-md"
//                                       : isDarkMode
//                                         ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
//                                         : "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
//                                   }`}
//                                 >
//                                   <div className="flex items-center gap-2 min-w-0">
//                                     <ToolIcon className="w-4 h-4 flex-shrink-0"/>
//                                     <div className="text-left min-w-0">
//                                       <div className="font-medium text-xs sm:text-sm">{envType}</div>
//                                       <div className="text-xs opacity-60 truncate hidden sm:block xl:block">{activeTool.name}</div>
//                                     </div>
//                                   </div>
//                                   {envConfigured ? (
//                                     <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//                                   ) : (
//                                     <span className={`text-xs flex-shrink-0 hidden sm:inline xl:inline ${
//                                       isDarkMode ? 'text-red-400' : 'text-red-600'
//                                     }`}>
//                                       Not configured
//                                     </span>
//                                   )}
//                                 </button>
//                               );
//                             })}
//                           </div>

//                           {!isToolConfigured(activeTool) && (
//                             <div className={`mt-4 p-3 rounded-lg ${
//                               isDarkMode 
//                                 ? 'bg-yellow-500/10 border border-yellow-500/20' 
//                                 : 'bg-amber-50 border border-amber-200'
//                             }`}>
//                               <p className={`text-xs text-center ${isDarkMode ? 'text-yellow-400' : 'text-amber-700'}`}>
//                                 Configure at least one environment to enable launching
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Application Navigator */}
//               <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:w-96 xl:max-w-none mx-auto xl:mx-0 flex-shrink-0">
//                 <div className={`rounded-2xl p-4 sm:p-6 shadow-xl ${
//                   isDarkMode 
//                     ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
//                     : 'bg-white border border-gray-200'
//                 }`}>
//                   <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                     Application Navigator
//                   </h4>
                  
//                   {/* Search Input */}
//                   <div className="relative mb-4">
//                     <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`} />
//                     <input
//                       type="text"
//                       placeholder="Search applications..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
//                         isDarkMode 
//                           ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-blue-400' 
//                           : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
//                       }`}
//                     />
//                     {searchQuery && (
//                       <button
//                         onClick={() => setSearchQuery("")}
//                         className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:${isDarkMode ? 'text-white' : 'text-gray-900'} ${
//                           isDarkMode ? 'text-white/50' : 'text-gray-500'
//                         }`}
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>

//                   {/* Applications Count */}
//                   <div className={`text-xs mb-3 px-1 ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
//                     {filteredTools.length} of {tools.length} applications
//                   </div>
                  
//                   {/* Applications List */}
//                   <div 
//                     style={{
//                       height: '300px',
//                       overflowY: 'scroll',
//                       borderRadius: '8px',
//                       padding: '8px',
//                       cursor: 'default',
//                       border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(148, 163, 184, 0.3)',
//                       backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(248, 250, 252, 0.8)'
//                     }}
//                     onWheel={(e) => {
//                       e.currentTarget.scrollTop += e.deltaY;
//                     }}
//                   >
//                     {filteredTools.map((tool, index) => {
//                       const originalIndex = tools.findIndex(t => t.id === tool.id);
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === originalIndex;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => handleToolSelect(originalIndex)}
//                           style={{
//                             width: '100%',
//                             padding: '12px',
//                             marginBottom: '8px',
//                             borderRadius: '8px',
//                             border: isActive 
//                               ? isDarkMode 
//                                 ? '1px solid rgba(59, 130, 246, 0.5)' 
//                                 : '1px solid rgba(59, 130, 246, 0.6)'
//                               : isDarkMode 
//                                 ? '1px solid rgba(255, 255, 255, 0.1)' 
//                                 : '1px solid rgba(148, 163, 184, 0.3)',
//                             backgroundColor: isActive 
//                               ? isDarkMode 
//                                 ? 'rgba(59, 130, 246, 0.2)'
//                                 : 'rgba(59, 130, 246, 0.15)'
//                               : isDarkMode 
//                                 ? 'rgba(255, 255, 255, 0.05)'
//                                 : 'rgba(255, 255, 255, 0.9)',
//                             color: isDarkMode ? 'white' : '#111827',
//                             cursor: 'pointer',
//                             transition: 'all 0.2s',
//                             textAlign: 'left',
//                             pointerEvents: 'auto'
//                           }}
//                           onMouseEnter={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.backgroundColor = isDarkMode 
//                                 ? 'rgba(255, 255, 255, 0.1)' 
//                                 : 'rgba(249, 250, 251, 0.8)';
//                               e.currentTarget.style.borderColor = isDarkMode 
//                                 ? 'rgba(255, 255, 255, 0.2)' 
//                                 : 'rgba(156, 163, 175, 0.3)';
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.backgroundColor = isDarkMode 
//                                 ? 'rgba(255, 255, 255, 0.05)' 
//                                 : 'rgba(255, 255, 255, 0.8)';
//                               e.currentTarget.style.borderColor = isDarkMode 
//                                 ? 'rgba(255, 255, 255, 0.1)' 
//                                 : 'rgba(156, 163, 175, 0.2)';
//                             }
//                           }}
//                           onWheel={(e) => {
//                             e.stopPropagation();
//                             const container = e.currentTarget.parentElement;
//                             if (container) {
//                               container.scrollTop += e.deltaY;
//                             }
//                           }}
//                         >
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                             <Icon style={{ width: '20px', height: '20px', flexShrink: 0 }} />
//                             <div style={{ flex: 1, minWidth: 0 }}>
//                               <div style={{ fontSize: '14px', fontWeight: '500' }}>{tool.name}</div>
//                             </div>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
//                               <div 
//                                 style={{
//                                   width: '8px',
//                                   height: '8px',
//                                   borderRadius: '50%',
//                                   backgroundColor: isConfigured ? '#10b981' : '#ef4444'
//                                 }}
//                               ></div>
//                               {isActive && (
//                                 <div 
//                                   style={{
//                                     width: '8px',
//                                     height: '8px',
//                                     borderRadius: '50%',
//                                     backgroundColor: '#3b82f6'
//                                   }}
//                                 ></div>
//                               )}
//                             </div>
//                           </div>
//                         </button>
//                       );
//                     })}
                    
//                     {filteredTools.length === 0 && searchQuery && (
//                       <div style={{ 
//                         textAlign: 'center', 
//                         padding: '32px 0', 
//                         color: isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(107, 114, 128, 0.8)' 
//                       }}>
//                         <div style={{ marginBottom: '8px' }}>🔍</div>
//                         <p style={{ fontSize: '14px' }}>No applications found matching "{searchQuery}"</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
         
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: true }}
//             className={`mt-12 sm:mt-16 rounded-2xl p-4 sm:p-6 shadow-xl ${
//               isDarkMode 
//                 ? 'bg-white/5 backdrop-blur-xl border border-white/10' 
//                 : 'bg-white border border-gray-200'
//             }`}
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <Settings className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//               <h3 className={`text-lg sm:text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
//                 Dynamic Tool Management
//               </h3>
//             </div>
//             <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
//               Tools are dynamically loaded from the database. Use the "Add New Tool" button above to create new integrations, or use the edit/delete buttons in each tool's tab.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Tool Modal */}
//       <ToolModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingTool(null);
//         }}
//         onSave={handleSaveTool}
//         editTool={editingTool}
//         isLoading={isSubmitting}
//       />
//     </>
//   );
// }



// "use client"
// import { motion } from "framer-motion";
// import { Settings, ExternalLink, Database, Plus, Edit, Trash2, X, Search, Clock } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import { ELKIcon, GrafanaIcon, EAGIcon, ApigeeIcon, DynatraceIcon } from "@/components/icon/icons";
// import { ToolModal, ToolFormData } from "@/components/ui/toolmodal";

// interface Tool {
//   id: number;
//   name: string;
//   description: string;
//   icon_name: string;
//   color_scheme: {
//     icon: string;
//     bg: string;
//     accent: string;
//   };
//   environments: Array<{
//     env_type: 'E1' | 'E2' | 'E3';
//     url: string | null;
//   }>;
//   features: string[];
// }

// const iconMap = {
//   "Plus": Plus,
//   "Search": Search,
//   "Settings": Settings,
//   "ExternalLink": ExternalLink,
//   "Clock": Clock,
//   "Database": Database,
// };

// export function ToolsGrid() {
//   const [tools, setTools] = useState<Tool[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<number>(0);
  
//   // Modal states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTool, setEditingTool] = useState<Tool | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Search states
//   const [searchQuery, setSearchQuery] = useState("");

//   // Theme support
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   // Fetch tools from database
//   const fetchTools = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/tools');
//       if (!response.ok) throw new Error('Failed to fetch tools');
      
//       const data = await response.json();
//       setTools(data.tools);
//       setError(null);
      
//       // Reset active tab if tools change
//       if (data.tools.length > 0 && activeTab >= data.tools.length) {
//         setActiveTab(0);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to load tools');
//       console.error('Error fetching tools:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTools();
//   }, []);

//   // Filter tools based on search query
//   const filteredTools = tools.filter(tool =>
//     tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     tool.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Function to check if a tool is configured
//   const isToolConfigured = (tool: Tool): boolean => {
//     return tool.environments.some(env => env.url && env.url.trim() !== "");
//   };

//   // Function to count configured environments
//   const getConfiguredEnvironmentsCount = (tool: Tool): number => {
//     return tool.environments.filter(env => env.url && env.url.trim() !== "").length;
//   };

//   const isEnvironmentConfigured = (url?: string | null): boolean => {
//     return !!(url && url.trim() !== "");
//   };

//   const handleEnvironmentClick = (url: string) => {
//     if (url) {
//       window.open(url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   const getToolSpecificIcon = (iconName: string) => {
//     return iconMap[iconName as keyof typeof iconMap] || Database;
//   };

//   // Handle tool creation/editing
//   const handleSaveTool = async (toolData: ToolFormData) => {
//     setIsSubmitting(true);
//     try {
//       const url = editingTool ? `/api/tools/${editingTool.id}` : '/api/tools';
//       const method = editingTool ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(toolData),
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to save tool';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.error || errorMessage;
//         } catch (jsonError) {
//           errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//         }
//         throw new Error(errorMessage);
//       }

//       setIsModalOpen(false);
//       setEditingTool(null);
//       await fetchTools();
//     } catch (err) {
//       console.error('Error saving tool:', err);
//       alert(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle tool deletion
//   const handleDeleteTool = async (toolId: number) => {
//     if (!confirm('Are you sure you want to delete this tool? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       const response = await fetch(`/api/tools/${toolId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete tool');
//       }

//       await fetchTools();
//     } catch (err) {
//       console.error('Error deleting tool:', err);
//       alert('Failed to delete tool. Please try again.');
//     }
//   };

//   // Handle tool selection from search
//   const handleToolSelect = (toolIndex: number) => {
//     setActiveTab(toolIndex);
//     setSearchQuery("");
//   };

//   // Handle edit tool
//   const handleEditTool = (tool: Tool, event: React.MouseEvent) => {
//     event.preventDefault();
//     event.stopPropagation();
    
//     setEditingTool(tool);
//     setIsModalOpen(true);
//   };

//   if (loading) {
//     return (
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <div className={`inline-block w-8 h-8 border-4 ${isDark ? 'border-slate-600' : 'border-teal-200'} ${isDark ? 'border-t-blue-500' : 'border-t-teal-600'} rounded-full animate-spin`}></div>
//             {/* Original loading spinner: border-blue-500/30 border-t-blue-500 */}
//             <p className={`${isDark ? 'text-slate-400' : 'text-teal-600'} mt-4`}>Loading tools...</p>
//             {/* Original loading text: text-white/60 */}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <p className={`${isDark ? 'text-red-400' : 'text-red-600'} mb-4`}>Error loading tools: {error}</p>
//             {/* Original error text: text-red-400 */}
//             <button
//               onClick={fetchTools}
//               className={`px-4 py-2 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'} text-white rounded-lg transition-colors`}
//             >
//               {/* Original button: bg-blue-500 hover:bg-blue-600 */}
//               Retry
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const activeTool = tools[activeTab];

//   return (
//     <>
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12 sm:mb-16"
//           >
//             <h2 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-slate-100' : 'text-teal-900'} mb-4`}>External Integrations</h2>
//             {/* Original title: gradient-text */}
//             <p className={`${isDark ? 'text-slate-400' : 'text-teal-600'} text-base sm:text-lg`}>Connected monitoring and analytics platforms</p>
//             {/* Original description: text-white/60 */}
//           </motion.div>

//           {/* Add New Tool Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="mb-6 sm:mb-8 flex justify-center"
//           >
//             <button
//               onClick={() => {
//                 setEditingTool(null);
//                 setIsModalOpen(true);
//               }}
//               className={`px-4 sm:px-6 py-2 sm:py-3 ${isDark ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'} text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg text-sm sm:text-base`}
//             >
//               {/* Original button: from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 */}
//               <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//               Add New Tool
//             </button>
//           </motion.div>
          
//           {tools.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-16 sm:py-20"
//             >
//               <Database className={`w-12 h-12 sm:w-16 sm:h-16 ${isDark ? 'text-slate-500' : 'text-teal-400'} mx-auto mb-4`} />
//               {/* Original icon: text-white/30 */}
//               <p className={`${isDark ? 'text-slate-400' : 'text-teal-600'} text-base sm:text-lg mb-6`}>No tools configured yet</p>
//               {/* Original text: text-white/60 */}
//               <button
//                 onClick={() => {
//                   setEditingTool(null);
//                   setIsModalOpen(true);
//                 }}
//                 className={`px-4 sm:px-6 py-2 sm:py-3 ${isDark ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'} text-white rounded-xl font-medium transition-all flex items-center gap-2 mx-auto text-sm sm:text-base`}
//               >
//                 <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Add Your First Tool
//               </button>
//             </motion.div>
//           ) : (
//             /* Horizontal Container for Tool Content and Application Navigator */
//             <div className="flex flex-col xl:flex-row gap-6">
//               {/* Tools Content Container */}
//               <div className={`flex-1 ${isDark ? 'bg-slate-800/50' : 'bg-white/70'} backdrop-blur-xl border ${isDark ? 'border-slate-700' : 'border-teal-200'} rounded-2xl overflow-hidden`}>
//                 {/* Original container: bg-white/5 backdrop-blur-xl border border-white/10 */}
                
//                 {/* Unified Tab Navigation */}
//                 <div className={`border-b ${isDark ? 'border-slate-700' : 'border-teal-200'}`}>
//                   {/* Original tab border: border-white/10 */}
                  
//                   {/* Desktop tabs */}
//                   <div className="hidden lg:flex overflow-x-auto scrollbar-hide">
//                     {tools.map((tool, index) => {
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === index;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => setActiveTab(index)}
//                           className={`flex items-center gap-3 px-4 xl:px-6 py-4 min-w-fit whitespace-nowrap transition-all border-b-2 ${
//                             isActive
//                               ? `${isDark ? 'border-blue-500 bg-blue-500/10 text-slate-100' : 'border-teal-500 bg-teal-100 text-teal-900'}`
//                               : `border-transparent ${isDark ? 'hover:bg-slate-700/50 text-slate-400 hover:text-slate-200' : 'hover:bg-teal-50 text-teal-600 hover:text-teal-900'}`
//                           }`}
//                         >
//                           {/* Original active: border-blue-500 bg-blue-500/10 text-white */}
//                           {/* Original inactive: border-transparent hover:bg-white/5 text-white/70 hover:text-white */}
//                           <Icon className="w-5 h-5 flex-shrink-0" />
//                           <span className="font-medium max-w-[120px] xl:max-w-none truncate">{tool.name}</span>
//                           <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {/* Mobile tabs */}
//                   <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2 lg:hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
//                     {tools.map((tool, index) => {
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === index;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => setActiveTab(index)}
//                           className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
//                             isActive
//                               ? `${isDark ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-slate-100 border border-blue-400/50' : 'bg-gradient-to-r from-teal-500/20 to-teal-600/20 text-teal-900 border border-teal-400/50'}`
//                               : `${isDark ? 'bg-slate-700/30 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50' : 'bg-teal-50/50 text-teal-600 hover:text-teal-900 hover:bg-teal-100'} border border-transparent`
//                           }`}
//                         >
//                           {/* Original active mobile: bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/50 */}
//                           {/* Original inactive mobile: bg-white/5 text-white/70 hover:text-white hover:bg-white/10 */}
//                           <Icon className="w-4 h-4 flex-shrink-0" />
//                           <span className="max-w-[100px] truncate">{tool.name}</span>
//                           <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Tool Content */}
//                 {activeTool && (
//                   <motion.div
//                     key={activeTool.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="p-4 sm:p-6 lg:p-8"
//                   >
//                     {/* Tool Information and Environment Buttons */}
//                     <div className="flex flex-col xl:flex-row gap-6">
//                       {/* Tool Information */}
//                       <div className="flex-1">
//                         {/* Tool Header */}
//                         <div className="flex items-start justify-between mb-6">
//                           <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
//                             {(() => {
//                               const Icon = getToolSpecificIcon(activeTool.icon_name);
//                               return <Icon className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${isDark ? 'text-slate-300' : 'text-teal-700'}`} />;
//                             })()}
//                             {/* Original icon: no specific color */}
//                             <div className="min-w-0 flex-1">
//                               <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-teal-900'} mb-2`}>{activeTool.name}</h3>
//                               {/* Original title: text-white */}
//                               <div className="flex items-center gap-2 mb-2">
//                                 <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
//                                 <span className={`text-xs sm:text-sm font-medium ${isToolConfigured(activeTool) ? "text-green-400" : "text-red-400"}`}>
//                                   {isToolConfigured(activeTool) ? "ACTIVE" : "REQUIRES CONFIGURATION"}
//                                 </span>
//                               </div>
//                               <p className={`${isDark ? 'text-slate-400' : 'text-teal-600'} text-sm sm:text-base leading-relaxed`}>{activeTool.description}</p>
//                               {/* Original description: text-white/60 */}
//                             </div>
//                           </div>
                          
//                           {/* Edit/Delete buttons */}
//                           <div className="flex gap-2 flex-shrink-0">
//                             <button
//                               onClick={(e) => handleEditTool(activeTool, e)}
//                               className={`p-2 ${isDark ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400' : 'bg-teal-100 hover:bg-teal-200 text-teal-600'} rounded-lg transition-colors`}
//                             >
//                               {/* Original edit button: bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 */}
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 handleDeleteTool(activeTool.id);
//                               }}
//                               className={`p-2 ${isDark ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' : 'bg-red-100 hover:bg-red-200 text-red-600'} rounded-lg transition-colors`}
//                             >
//                               {/* Original delete button: bg-red-500/20 hover:bg-red-500/30 text-red-400 */}
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Features */}
//                         <div className="mb-6">
//                           <h4 className={`text-base sm:text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-teal-900'} mb-4`}>Features</h4>
//                           {/* Original features title: text-white */}
//                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
//                             {activeTool.features?.map((feature, i) => (
//                               <div key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-teal-700'}`}>
//                                 {/* Original feature text: text-white/70 */}
//                                 <div className={`w-1.5 h-1.5 ${isDark ? 'bg-blue-400' : 'bg-teal-500'} rounded-full mt-2 flex-shrink-0`}></div>
//                                 {/* Original feature dot: bg-blue-400 */}
//                                 <span className="leading-relaxed">{feature}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Environment Status */}
//                         <div className={`${isDark ? 'bg-slate-700/30' : 'bg-teal-50'} rounded-xl p-4`}>
//                           {/* Original status container: bg-white/5 */}
//                           <div className="flex items-center justify-center gap-2 text-sm">
//                             <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
//                             <span className={`${isToolConfigured(activeTool) ? "text-green-400" : "text-red-400"} font-medium text-center`}>
//                               {isToolConfigured(activeTool) 
//                                 ? `${getConfiguredEnvironmentsCount(activeTool)} of 3 environments configured` 
//                                 : "No environments configured"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Environment Buttons */}
//                       <div className="w-full xl:w-80 flex-shrink-0">
//                         <div className={`${isDark ? 'bg-slate-700/30' : 'bg-teal-50'} rounded-xl p-4 sm:p-6 border ${isDark ? 'border-slate-600' : 'border-teal-200'}`}>
//                           {/* Original env container: bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 */}
//                           <h4 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-teal-900'} mb-4 text-center`}>Launch Environment</h4>
//                           {/* Original env title: text-white */}
                          
//                           {/* Responsive grid layout for environment buttons */}
//                           <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
//                             {['E1', 'E2', 'E3'].map((envType) => {
//                               const env = activeTool.environments.find(e => e.env_type === envType);
//                               const envConfigured = env && isEnvironmentConfigured(env.url);
//                               const ToolIcon = getToolSpecificIcon(activeTool.icon_name);
              
//                               return (
//                                 <button
//                                   key={envType}
//                                   onClick={() => envConfigured && env?.url ? handleEnvironmentClick(env.url) : undefined}
//                                   disabled={!envConfigured}
//                                   className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between border ${
//                                     envConfigured
//                                       ? `${isDark ? 'bg-slate-600/50 hover:bg-slate-600/70 border-blue-400/30 hover:border-blue-400/50 text-slate-100' : 'bg-white hover:bg-teal-50 border-teal-300 hover:border-teal-400 text-teal-900'} cursor-pointer shadow-sm hover:shadow-md`
//                                       : `${isDark ? 'bg-slate-800/50 border-slate-700 text-slate-500' : 'bg-gray-100 border-gray-200 text-gray-500'} cursor-not-allowed`
//                                   }`}
//                                 >
//                                   {/* Original configured env: bg-white/10 hover:bg-white/15 border-blue-400/30 hover:border-blue-400/50 text-white */}
//                                   {/* Original unconfigured env: bg-white/5 border-white/10 text-white/40 */}
//                                   <div className="flex items-center gap-2 min-w-0">
//                                     <ToolIcon className="w-4 h-4 flex-shrink-0"/>
//                                     <div className="text-left min-w-0">
//                                       <div className="font-medium text-xs sm:text-sm">{envType}</div>
//                                       <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-teal-600'} truncate hidden sm:block xl:block`}>{activeTool.name}</div>
//                                       {/* Original env subtitle: opacity-60 */}
//                                     </div>
//                                   </div>
//                                   {envConfigured ? (
//                                     <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//                                   ) : (
//                                     <span className={`text-xs text-red-400 flex-shrink-0 hidden sm:inline xl:inline`}>Not configured</span>
//                                   )}
//                                 </button>
//                               );
//                             })}
//                           </div>

//                           {!isToolConfigured(activeTool) && (
//                             <div className={`mt-4 p-3 ${isDark ? 'bg-yellow-900/30 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200'} border rounded-lg`}>
//                               {/* Original warning: bg-yellow-500/10 border border-yellow-500/20 */}
//                               <p className={`${isDark ? 'text-yellow-400' : 'text-yellow-700'} text-xs text-center`}>
//                                 {/* Original warning text: text-yellow-400 */}
//                                 Configure at least one environment to enable launching
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Application Navigator - Separate Component */}
//               <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:w-96 xl:max-w-none mx-auto xl:mx-0 flex-shrink-0">
//                 <div className={`${isDark ? 'bg-slate-800/50' : 'bg-white/70'} backdrop-blur-xl border ${isDark ? 'border-slate-700' : 'border-teal-200'} rounded-2xl p-4 sm:p-6`}>
//                   {/* Original navigator: bg-white/5 backdrop-blur-xl border border-white/10 */}
//                   <h4 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-teal-900'} mb-4`}>Application Navigator</h4>
//                   {/* Original navigator title: text-white */}
                  
//                   {/* Search Input */}
//                   <div className="relative mb-4">
//                     <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-400' : 'text-teal-500'}`} />
//                     {/* Original search icon: text-white/50 */}
//                     <input
//                       type="text"
//                       placeholder="Search applications..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className={`w-full pl-10 pr-4 py-3 ${isDark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400' : 'bg-teal-50 border-teal-200 text-teal-900 placeholder-teal-400'} border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-blue-400 focus:border-blue-400' : 'focus:ring-teal-400 focus:border-teal-400'} text-sm`}
//                     />
//                     {/* Original input: bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-blue-400 */}
//                     {searchQuery && (
//                       <button
//                         onClick={() => setSearchQuery("")}
//                         className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-slate-400 hover:text-slate-200' : 'text-teal-500 hover:text-teal-700'}`}
//                       >
//                         {/* Original clear button: text-white/50 hover:text-white */}
//                         <X className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>

//                   {/* Applications Count */}
//                   <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-teal-600'} mb-3 px-1`}>
//                     {/* Original count text: text-white/60 */}
//                     {filteredTools.length} of {tools.length} applications
//                   </div>
                  
//                   {/* Applications List with Mouse Wheel Scroll */}
//                   <div 
//                     style={{
//                       height: '300px',
//                       overflowY: 'scroll',
//                       border: `1px solid ${isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(20, 184, 166, 0.2)'}`,
//                       borderRadius: '8px',
//                       backgroundColor: isDark ? 'rgba(148, 163, 184, 0.05)' : 'rgba(20, 184, 166, 0.02)',
//                       padding: '8px',
//                       cursor: 'default'
//                     }}
//                     /* Original scroll container styles: 
//                        border: '1px solid rgba(255, 255, 255, 0.1)'
//                        backgroundColor: 'rgba(255, 255, 255, 0.02)'
//                     */
//                     onWheel={(e) => {
//                       e.currentTarget.scrollTop += e.deltaY;
//                     }}
//                   >
//                     {filteredTools.map((tool, index) => {
//                       const originalIndex = tools.findIndex(t => t.id === tool.id);
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === originalIndex;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => handleToolSelect(originalIndex)}
//                           style={{
//                             width: '100%',
//                             padding: '12px',
//                             marginBottom: '8px',
//                             borderRadius: '8px',
//                             border: isActive 
//                               ? `1px solid ${isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(20, 184, 166, 0.4)'}` 
//                               : `1px solid ${isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(20, 184, 166, 0.15)'}`,
//                             backgroundColor: isActive 
//                               ? isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(20, 184, 166, 0.1)' 
//                               : isDark ? 'rgba(148, 163, 184, 0.05)' : 'rgba(255, 255, 255, 0.7)',
//                             color: isDark ? '#f1f5f9' : '#134e4a',
//                             cursor: 'pointer',
//                             transition: 'all 0.2s',
//                             textAlign: 'left',
//                             pointerEvents: 'auto'
//                           }}
//                           /* Original app button styles:
//                              border: isActive ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)'
//                              backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'
//                              color: 'white'
//                           */
//                           onMouseEnter={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.backgroundColor = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(20, 184, 166, 0.05)';
//                               e.currentTarget.style.borderColor = isDark ? 'rgba(148, 163, 184, 0.4)' : 'rgba(20, 184, 166, 0.25)';
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.backgroundColor = isDark ? 'rgba(148, 163, 184, 0.05)' : 'rgba(255, 255, 255, 0.7)';
//                               e.currentTarget.style.borderColor = isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(20, 184, 166, 0.15)';
//                             }
//                           }}
//                           onWheel={(e) => {
//                             e.stopPropagation();
//                             const container = e.currentTarget.parentElement;
//                             if (container) {
//                               container.scrollTop += e.deltaY;
//                             }
//                           }}
//                         >
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                             <Icon style={{ 
//                               width: '20px', 
//                               height: '20px', 
//                               flexShrink: 0,
//                               color: isDark ? '#cbd5e1' : '#0f766e'
//                             }} />
//                             {/* Original icon color: no specific color */}
//                             <div style={{ flex: 1, minWidth: 0 }}>
//                               <div style={{ fontSize: '14px', fontWeight: '500' }}>{tool.name}</div>
//                             </div>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
//                               <div 
//                                 style={{
//                                   width: '8px',
//                                   height: '8px',
//                                   borderRadius: '50%',
//                                   backgroundColor: isConfigured ? '#10b981' : '#ef4444'
//                                 }}
//                               ></div>
//                               {isActive && (
//                                 <div 
//                                   style={{
//                                     width: '8px',
//                                     height: '8px',
//                                     borderRadius: '50%',
//                                     backgroundColor: isDark ? '#3b82f6' : '#14b8a6'
//                                   }}
//                                 ></div>
//                               )}
//                               {/* Original active indicator: backgroundColor: '#3b82f6' */}
//                             </div>
//                           </div>
//                         </button>
//                       );
//                     })}
                    
//                     {filteredTools.length === 0 && searchQuery && (
//                       <div style={{ 
//                         textAlign: 'center', 
//                         padding: '32px 0', 
//                         color: isDark ? 'rgba(148, 163, 184, 0.6)' : 'rgba(20, 184, 166, 0.6)'
//                       }}>
//                         {/* Original no results color: color: 'rgba(255, 255, 255, 0.6)' */}
//                         <div style={{ marginBottom: '8px' }}>🔍</div>
//                         <p style={{ fontSize: '14px' }}>No applications found matching "{searchQuery}"</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
         
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: true }}
//             className={`mt-12 sm:mt-16 ${isDark ? 'bg-slate-800/50' : 'bg-white/70'} backdrop-blur-xl border ${isDark ? 'border-slate-700' : 'border-teal-200'} rounded-2xl p-4 sm:p-6`}
//           >
//             {/* Original info section: bg-white/5 backdrop-blur-xl border border-white/10 */}
//             <div className="flex items-center gap-3 mb-4">
//               <Settings className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? 'text-blue-400' : 'text-teal-600'}`} />
//               {/* Original settings icon: text-blue-400 */}
//               <h3 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-slate-100' : 'text-teal-900'}`}>Dynamic Tool Management</h3>
//               {/* Original info title: text-white */}
//             </div>
//             <p className={`${isDark ? 'text-slate-400' : 'text-teal-600'} text-sm sm:text-base leading-relaxed`}>
//               {/* Original info text: text-white/60 */}
//               Tools are dynamically loaded from the database. Use the "Add New Tool" button above to create new integrations, or use the edit/delete buttons in each tool's tab.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Tool Modal */}
//       <ToolModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingTool(null);
//         }}
//         onSave={handleSaveTool}
//         editTool={editingTool}
//         isLoading={isSubmitting}
//       />
//     </>
//   );
// }






// "use client"
// import { motion } from "framer-motion";
// import { Settings, ExternalLink, Database, Plus, Edit, Trash2, X, Search, Clock } from "lucide-react";
// import { useEffect, useState } from "react";
// import { ELKIcon, GrafanaIcon, EAGIcon, ApigeeIcon, DynatraceIcon } from "@/components/icon/icons";
// import { ToolModal, ToolFormData } from "@/components/ui/toolmodal";
// import { useTheme } from "next-themes";
// interface Tool {
//   id: number;
//   name: string;
//   description: string;
//   icon_name: string;
//   color_scheme: {
//     icon: string;
//     bg: string;
//     accent: string;
//   };
//   environments: Array<{
//     env_type: 'E1' | 'E2' | 'E3';
//     url: string | null;
//   }>;
//   features: string[];
// }

// const iconMap = {
//   "Plus": Plus,
//   "Search": Search,
//   "Settings": Settings,
//   "ExternalLink": ExternalLink,
//   "Clock": Clock,
//   "Database": Database,
// };

// export function ToolsGrid() {
//   const [tools, setTools] = useState<Tool[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<number>(0);
//   const [isDarkMode, setIsDarkMode] = useState(false);
  
//   // Modal states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTool, setEditingTool] = useState<Tool | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   // Search states
//   const [searchQuery, setSearchQuery] = useState("");
//   // Theme support
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';
//   // Theme configuration
//   const lightTheme = {
//     // Ocean Blue Light Theme
//     background: 'bg-gradient-to-br from-blue-50 to-blue-100',
//     containerBg: 'bg-white/80 backdrop-blur-xl border-blue-200',
//     cardBg: 'bg-white border-blue-200 shadow-lg',
//     cardHover: 'hover:shadow-xl hover:border-blue-300',
//     text: 'text-blue-900',
//     textSecondary: 'text-blue-600',
//     textMuted: 'text-blue-500',
//     accent: 'bg-blue-600',
//     accentHover: 'hover:bg-blue-700',
//     gradientText: 'bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent',
//     buttonPrimary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
//     buttonSecondary: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
//     buttonDanger: 'bg-red-100 hover:bg-red-200 text-red-700',
//     activeTab: 'border-blue-500 bg-blue-100 text-blue-900',
//     inactiveTab: 'border-transparent hover:bg-blue-50 text-blue-600 hover:text-blue-900',
//     input: 'bg-blue-50 border-blue-200 text-blue-900 placeholder-blue-400 focus:ring-blue-400 focus:border-blue-400',
//     status: {
//       success: 'text-green-600 bg-green-100',
//       error: 'text-red-600 bg-red-100',
//       warning: 'text-yellow-600 bg-yellow-100',
//       successDot: 'bg-green-500',
//       errorDot: 'bg-red-500'
//     }
//   };

//   const darkTheme = {
//     // Professional Slate Dark Theme
//     background: 'bg-slate-900',
//     containerBg: 'bg-slate-800/80 backdrop-blur-xl border-slate-700',
//     cardBg: 'bg-slate-800 border-slate-700',
//     cardHover: 'hover:bg-slate-700/50 hover:border-slate-600',
//     text: 'text-slate-100',
//     textSecondary: 'text-slate-300',
//     textMuted: 'text-slate-400',
//     accent: 'bg-blue-600',
//     accentHover: 'hover:bg-blue-700',
//     gradientText: 'bg-gradient-to-r from-slate-100 to-blue-200 bg-clip-text text-transparent',
//     buttonPrimary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
//     buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-300',
//     buttonDanger: 'bg-red-900/50 hover:bg-red-800/50 text-red-400',
//     activeTab: 'border-blue-500 bg-blue-500/10 text-slate-100',
//     inactiveTab: 'border-transparent hover:bg-slate-700/50 text-slate-400 hover:text-slate-200',
//     input: 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-blue-400 focus:border-blue-400',
//     status: {
//       success: 'text-green-400 bg-green-900/30',
//       error: 'text-red-400 bg-red-900/30',
//       warning: 'text-yellow-400 bg-yellow-900/30',
//       successDot: 'bg-green-400',
//       errorDot: 'bg-red-400'
//     }
//   };

//   const currentTheme = isDark ? darkTheme : lightTheme;

//   // Fetch tools from database
//   const fetchTools = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/tools');
//       if (!response.ok) throw new Error('Failed to fetch tools');
      
//       const data = await response.json();
//       setTools(data.tools);
//       setError(null);
      
//       // Reset active tab if tools change
//       if (data.tools.length > 0 && activeTab >= data.tools.length) {
//         setActiveTab(0);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to load tools');
//       console.error('Error fetching tools:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTools();
//   }, []);

//   // Filter tools based on search query
//   const filteredTools = tools.filter(tool =>
//     tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     tool.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Function to check if a tool is configured
//   const isToolConfigured = (tool: Tool): boolean => {
//     return tool.environments.some(env => env.url && env.url.trim() !== "");
//   };

//   // Function to count configured environments
//   const getConfiguredEnvironmentsCount = (tool: Tool): number => {
//     return tool.environments.filter(env => env.url && env.url.trim() !== "").length;
//   };

//   const isEnvironmentConfigured = (url?: string | null): boolean => {
//     return !!(url && url.trim() !== "");
//   };

//   const handleEnvironmentClick = (url: string) => {
//     if (url) {
//       window.open(url, '_blank', 'noopener,noreferrer');
//     }
//   };

//   const getToolSpecificIcon = (iconName: string) => {
//     return iconMap[iconName as keyof typeof iconMap] || Database;
//   };

//   // Handle tool creation/editing
//   const handleSaveTool = async (toolData: ToolFormData) => {
//     setIsSubmitting(true);
//     try {
//       const url = editingTool ? `/api/tools/${editingTool.id}` : '/api/tools';
//       const method = editingTool ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(toolData),
//       });

//       if (!response.ok) {
//         let errorMessage = 'Failed to save tool';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.error || errorMessage;
//         } catch (jsonError) {
//           errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//         }
//         throw new Error(errorMessage);
//       }

//       setIsModalOpen(false);
//       setEditingTool(null);
//       await fetchTools();
//     } catch (err) {
//       console.error('Error saving tool:', err);
//       alert(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
//       throw err;
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle tool deletion
//   const handleDeleteTool = async (toolId: number) => {
//     if (!confirm('Are you sure you want to delete this tool? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       const response = await fetch(`/api/tools/${toolId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete tool');
//       }

//       await fetchTools();
//     } catch (err) {
//       console.error('Error deleting tool:', err);
//       alert('Failed to delete tool. Please try again.');
//     }
//   };

//   // Handle tool selection from search
//   const handleToolSelect = (toolIndex: number) => {
//     setActiveTab(toolIndex);
//     setSearchQuery("");
//   };

//   // Handle edit tool
//   const handleEditTool = (tool: Tool, event: React.MouseEvent) => {
//     event.preventDefault();
//     event.stopPropagation();
    
//     setEditingTool(tool);
//     setIsModalOpen(true);
//   };

//   if (loading) {
//     return (
//       <section className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 ${currentTheme.background}`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <div className={`inline-block w-8 h-8 border-4 ${isDarkMode ? 'border-slate-600' : 'border-blue-200'} ${isDarkMode ? 'border-t-blue-500' : 'border-t-blue-600'} rounded-full animate-spin`}></div>
//             <p className={`${currentTheme.textMuted} mt-4`}>Loading tools...</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 ${currentTheme.background}`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <p className={`${currentTheme.status.error} mb-4 px-4 py-2 rounded-lg inline-block`}>Error loading tools: {error}</p>
//             <button
//               onClick={fetchTools}
//               className={`px-4 py-2 ${currentTheme.buttonPrimary} rounded-lg transition-colors`}
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const activeTool = tools[activeTab];

//   return (
//     <>
//       <section className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 ${currentTheme.background} min-h-screen`}>
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12 sm:mb-16"
//           >
//             <h2 className={`text-3xl sm:text-4xl font-bold ${currentTheme.gradientText} mb-4`}>External Integrations</h2>
//             <p className={`${currentTheme.textMuted} text-base sm:text-lg`}>Connected monitoring and analytics platforms</p>
//           </motion.div>

//           {/* Add New Tool Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="mb-6 sm:mb-8 flex justify-center"
//           >
//             <button
//               onClick={() => {
//                 setEditingTool(null);
//                 setIsModalOpen(true);
//               }}
//               className={`px-4 sm:px-6 py-2 sm:py-3 ${currentTheme.buttonPrimary} rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg text-sm sm:text-base`}
//             >
//               <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//               Add New Tool
//             </button>
//           </motion.div>
          
//           {tools.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-16 sm:py-20"
//             >
//               <Database className={`w-12 h-12 sm:w-16 sm:h-16 ${currentTheme.textMuted} mx-auto mb-4`} />
//               <p className={`${currentTheme.textMuted} text-base sm:text-lg mb-6`}>No tools configured yet</p>
//               <button
//                 onClick={() => {
//                   setEditingTool(null);
//                   setIsModalOpen(true);
//                 }}
//                 className={`px-4 sm:px-6 py-2 sm:py-3 ${currentTheme.buttonPrimary} rounded-xl font-medium transition-all flex items-center gap-2 mx-auto text-sm sm:text-base`}
//               >
//                 <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Add Your First Tool
//               </button>
//             </motion.div>
//           ) : (
//             /* Horizontal Container for Tool Content and Application Navigator */
//             <div className="flex flex-col xl:flex-row gap-6">
//               {/* Tools Content Container */}
//               <div className={`flex-1 ${currentTheme.containerBg} border rounded-2xl overflow-hidden`}>
//                 {/* Unified Tab Navigation */}
//                 <div className={`border-b ${isDarkMode ? 'border-slate-700' : 'border-blue-200'}`}>
//                   {/* Desktop tabs */}
//                   <div className="hidden lg:flex overflow-x-auto scrollbar-hide">
//                     {tools.map((tool, index) => {
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === index;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => setActiveTab(index)}
//                           className={`flex items-center gap-3 px-4 xl:px-6 py-4 min-w-fit whitespace-nowrap transition-all border-b-2 ${
//                             isActive
//                               ? currentTheme.activeTab
//                               : currentTheme.inactiveTab
//                           }`}
//                         >
//                           <Icon className="w-5 h-5 flex-shrink-0" />
//                           <span className="font-medium max-w-[120px] xl:max-w-none truncate">{tool.name}</span>
//                           <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isConfigured ? currentTheme.status.successDot : currentTheme.status.errorDot}`}></div>
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {/* Mobile tabs */}
//                   <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2 lg:hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
//                     {tools.map((tool, index) => {
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === index;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => setActiveTab(index)}
//                           className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 border ${
//                             isActive
//                               ? `${currentTheme.activeTab} ${isDarkMode ? 'border-blue-400/50' : 'border-blue-300'}`
//                               : `${currentTheme.cardBg} ${currentTheme.inactiveTab} border-transparent`
//                           }`}
//                         >
//                           <Icon className="w-4 h-4 flex-shrink-0" />
//                           <span className="max-w-[100px] truncate">{tool.name}</span>
//                           <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isConfigured ? currentTheme.status.successDot : currentTheme.status.errorDot}`}></div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Tool Content */}
//                 {activeTool && (
//                   <motion.div
//                     key={activeTool.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="p-4 sm:p-6 lg:p-8"
//                   >
//                     {/* Tool Information and Environment Buttons */}
//                     <div className="flex flex-col xl:flex-row gap-6">
//                       {/* Tool Information */}
//                       <div className="flex-1">
//                         {/* Tool Header */}
//                         <div className="flex items-start justify-between mb-6">
//                           <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
//                             {(() => {
//                               const Icon = getToolSpecificIcon(activeTool.icon_name);
//                               return <Icon className={`w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 ${currentTheme.text}`} />;
//                             })()}
//                             <div className="min-w-0 flex-1">
//                               <h3 className={`text-xl sm:text-2xl font-bold ${currentTheme.text} mb-2`}>{activeTool.name}</h3>
//                               <div className="flex items-center gap-2 mb-2">
//                                 <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? currentTheme.status.successDot : currentTheme.status.errorDot}`}></div>
//                                 <span className={`text-xs sm:text-sm font-medium ${isToolConfigured(activeTool) ? currentTheme.status.success.split(' ')[0] : currentTheme.status.error.split(' ')[0]}`}>
//                                   {isToolConfigured(activeTool) ? "ACTIVE" : "REQUIRES CONFIGURATION"}
//                                 </span>
//                               </div>
//                               <p className={`${currentTheme.textMuted} text-sm sm:text-base leading-relaxed`}>{activeTool.description}</p>
//                             </div>
//                           </div>
                          
//                           {/* Edit/Delete buttons */}
//                           <div className="flex gap-2 flex-shrink-0">
//                             <button
//                               onClick={(e) => handleEditTool(activeTool, e)}
//                               className={`p-2 ${currentTheme.buttonSecondary} rounded-lg transition-colors`}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 handleDeleteTool(activeTool.id);
//                               }}
//                               className={`p-2 ${currentTheme.buttonDanger} rounded-lg transition-colors`}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>

//                         {/* Features */}
//                         <div className="mb-6">
//                           <h4 className={`text-base sm:text-lg font-semibold ${currentTheme.text} mb-4`}>Features</h4>
//                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
//                             {activeTool.features?.map((feature, i) => (
//                               <div key={i} className={`flex items-start gap-2 text-sm ${currentTheme.textSecondary}`}>
//                                 <div className={`w-1.5 h-1.5 ${currentTheme.accent} rounded-full mt-2 flex-shrink-0`}></div>
//                                 <span className="leading-relaxed">{feature}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Environment Status */}
//                         <div className={`${currentTheme.cardBg} rounded-xl p-4 border`}>
//                           <div className="flex items-center justify-center gap-2 text-sm">
//                             <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? currentTheme.status.successDot : currentTheme.status.errorDot}`}></div>
//                             <span className={`${isToolConfigured(activeTool) ? currentTheme.status.success.split(' ')[0] : currentTheme.status.error.split(' ')[0]} font-medium text-center`}>
//                               {isToolConfigured(activeTool) 
//                                 ? `${getConfiguredEnvironmentsCount(activeTool)} of 3 environments configured` 
//                                 : "No environments configured"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Environment Buttons */}
//                       <div className="w-full xl:w-80 flex-shrink-0">
//                         <div className={`${currentTheme.cardBg} rounded-xl p-4 sm:p-6 border`}>
//                           <h4 className={`text-lg font-semibold ${currentTheme.text} mb-4 text-center`}>Launch Environment</h4>
                          
//                           {/* Responsive grid layout for environment buttons */}
//                           <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
//                             {['E1', 'E2', 'E3'].map((envType) => {
//                               const env = activeTool.environments.find(e => e.env_type === envType);
//                               const envConfigured = env && isEnvironmentConfigured(env.url);
//                               const ToolIcon = getToolSpecificIcon(activeTool.icon_name);
              
//                               return (
//                                 <button
//                                   key={envType}
//                                   onClick={() => envConfigured && env?.url ? handleEnvironmentClick(env.url) : undefined}
//                                   disabled={!envConfigured}
//                                   className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between border ${
//                                     envConfigured
//                                       ? `${currentTheme.cardBg} ${currentTheme.cardHover} ${isDarkMode ? 'border-blue-400/30 hover:border-blue-400/50' : 'border-blue-300 hover:border-blue-400'} ${currentTheme.text} cursor-pointer`
//                                       : `${isDarkMode ? 'bg-slate-800/50' : 'bg-gray-100'} ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} ${currentTheme.textMuted} cursor-not-allowed`
//                                   }`}
//                                 >
//                                   <div className="flex items-center gap-2 min-w-0">
//                                     <ToolIcon className="w-4 h-4 flex-shrink-0"/>
//                                     <div className="text-left min-w-0">
//                                       <div className="font-medium text-xs sm:text-sm">{envType}</div>
//                                       <div className={`text-xs ${currentTheme.textMuted} truncate hidden sm:block xl:block`}>{activeTool.name}</div>
//                                     </div>
//                                   </div>
//                                   {envConfigured ? (
//                                     <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//                                   ) : (
//                                     <span className={`text-xs ${currentTheme.status.error.split(' ')[0]} flex-shrink-0 hidden sm:inline xl:inline`}>Not configured</span>
//                                   )}
//                                 </button>
//                               );
//                             })}
//                           </div>

//                           {!isToolConfigured(activeTool) && (
//                             <div className={`mt-4 p-3 ${currentTheme.status.warning} border rounded-lg`}>
//                               <p className={`${currentTheme.status.warning.split(' ')[0]} text-xs text-center`}>
//                                 Configure at least one environment to enable launching
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Application Navigator - Separate Component */}
//               <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:w-96 xl:max-w-none mx-auto xl:mx-0 flex-shrink-0">
//                 <div className={`${currentTheme.containerBg} border rounded-2xl p-4 sm:p-6`}>
//                   <h4 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Application Navigator</h4>
                  
//                   {/* Search Input */}
//                   <div className="relative mb-4">
//                     <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textMuted}`} />
//                     <input
//                       type="text"
//                       placeholder="Search applications..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className={`w-full pl-10 pr-4 py-3 ${currentTheme.input} border rounded-lg focus:outline-none focus:ring-2 text-sm`}
//                     />
//                     {searchQuery && (
//                       <button
//                         onClick={() => setSearchQuery("")}
//                         className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${currentTheme.textMuted} hover:${currentTheme.text.split(' ')[1]}`}
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>

//                   {/* Applications Count */}
//                   <div className={`text-xs ${currentTheme.textMuted} mb-3 px-1`}>
//                     {filteredTools.length} of {tools.length} applications
//                   </div>
                  
//                   {/* Applications List with Mouse Wheel Scroll */}
//                   <div 
//                     style={{
//                       height: '300px',
//                       overflowY: 'scroll',
//                       border: `1px solid ${isDarkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
//                       borderRadius: '8px',
//                       backgroundColor: isDarkMode ? 'rgba(148, 163, 184, 0.05)' : 'rgba(59, 130, 246, 0.02)',
//                       padding: '8px',
//                       cursor: 'default'
//                     }}
//                     onWheel={(e) => {
//                       e.currentTarget.scrollTop += e.deltaY;
//                     }}
//                   >
//                     {filteredTools.map((tool, index) => {
//                       const originalIndex = tools.findIndex(t => t.id === tool.id);
//                       const Icon = getToolSpecificIcon(tool.icon_name);
//                       const isConfigured = isToolConfigured(tool);
//                       const isActive = activeTab === originalIndex;
                      
//                       return (
//                         <button
//                           key={tool.id}
//                           onClick={() => handleToolSelect(originalIndex)}
//                           style={{
//                             width: '100%',
//                             padding: '12px',
//                             marginBottom: '8px',
//                             borderRadius: '8px',
//                             border: isActive 
//                               ? `1px solid ${isDarkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'}` 
//                               : `1px solid ${isDarkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(59, 130, 246, 0.1)'}`,
//                             backgroundColor: isActive 
//                               ? isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)' 
//                               : isDarkMode ? 'rgba(148, 163, 184, 0.05)' : 'rgba(255, 255, 255, 0.5)',
//                             color: isDarkMode ? '#f1f5f9' : '#1e293b',
//                             cursor: 'pointer',
//                             transition: 'all 0.2s',
//                             textAlign: 'left',
//                             pointerEvents: 'auto'
//                           }}
//                           onMouseEnter={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(59, 130, 246, 0.05)';
//                               e.currentTarget.style.borderColor = isDarkMode ? 'rgba(148, 163, 184, 0.4)' : 'rgba(59, 130, 246, 0.2)';
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (!isActive) {
//                               e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(148, 163, 184, 0.05)' : 'rgba(255, 255, 255, 0.5)';
//                               e.currentTarget.style.borderColor = isDarkMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(59, 130, 246, 0.1)';
//                             }
//                           }}
//                           onWheel={(e) => {
//                             e.stopPropagation();
//                             const container = e.currentTarget.parentElement;
//                             if (container) {
//                               container.scrollTop += e.deltaY;
//                             }
//                           }}
//                         >
//                           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                             <Icon style={{ 
//                               width: '20px', 
//                               height: '20px', 
//                               flexShrink: 0,
//                               color: isDarkMode ? '#cbd5e1' : '#475569'
//                             }} />
//                             <div style={{ flex: 1, minWidth: 0 }}>
//                               <div style={{ fontSize: '14px', fontWeight: '500' }}>{tool.name}</div>
//                             </div>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
//                               <div 
//                                 style={{
//                                   width: '8px',
//                                   height: '8px',
//                                   borderRadius: '50%',
//                                   backgroundColor: isConfigured ? '#10b981' : '#ef4444'
//                                 }}
//                               ></div>
//                               {isActive && (
//                                 <div 
//                                   style={{
//                                     width: '8px',
//                                     height: '8px',
//                                     borderRadius: '50%',
//                                     backgroundColor: '#3b82f6'
//                                   }}
//                                 ></div>
//                               )}
//                             </div>
//                           </div>
//                         </button>
//                       );
//                     })}
                    
//                     {filteredTools.length === 0 && searchQuery && (
//                       <div style={{ 
//                         textAlign: 'center', 
//                         padding: '32px 0', 
//                         color: isDarkMode ? 'rgba(148, 163, 184, 0.6)' : 'rgba(59, 130, 246, 0.6)'
//                       }}>
//                         <div style={{ marginBottom: '8px' }}>🔍</div>
//                         <p style={{ fontSize: '14px' }}>No applications found matching "{searchQuery}"</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
         
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: true }}
//             className={`mt-12 sm:mt-16 ${currentTheme.containerBg} border rounded-2xl p-4 sm:p-6`}
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <Settings className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//               <h3 className={`text-lg sm:text-xl font-semibold ${currentTheme.text}`}>Dynamic Tool Management</h3>
//             </div>
//             <p className={`${currentTheme.textMuted} text-sm sm:text-base leading-relaxed`}>
//               Tools are dynamically loaded from the database. Use the "Add New Tool" button above to create new integrations, or use the edit/delete buttons in each tool's tab.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Tool Modal */}
//       <ToolModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditingTool(null);
//         }}
//         onSave={handleSaveTool}
//         editTool={editingTool}
//         isLoading={isSubmitting}
//       />
//     </>
//   );
// }




"use client"
import { motion } from "framer-motion";
import { Settings, ExternalLink, Database, Plus, Edit, Trash2, X, Search, Clock } from "lucide-react";
import { useEffect, useState } from "react";

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
  "Plus": Plus,
  "Search": Search,
  "Settings": Settings,
  "ExternalLink": ExternalLink,
  "Clock": Clock,
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
  
  // Search states
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter tools based on search query
  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const handleSaveTool = async (toolData: any) => {
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

  // Handle tool selection from search
  const handleToolSelect = (toolIndex: number) => {
    setActiveTab(toolIndex);
    setSearchQuery("");
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
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
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
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
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
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">External Integrations</h2>
            <p className="text-white/60 text-base sm:text-lg">Connected monitoring and analytics platforms</p>
          </motion.div>

          {/* Add New Tool Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6 sm:mb-8 flex justify-center"
          >
            <button
              onClick={() => {
                setEditingTool(null);
                setIsModalOpen(true);
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add New Tool
            </button>
          </motion.div>
          
          {tools.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 sm:py-20"
            >
              <Database className="w-12 h-12 sm:w-16 sm:h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/60 text-base sm:text-lg mb-6">No tools configured yet</p>
              <button
                onClick={() => {
                  setEditingTool(null);
                  setIsModalOpen(true);
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 mx-auto text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Add Your First Tool
              </button>
            </motion.div>
          ) : (
            /* LARGE SCREEN FIX - Horizontal Container */
            <div className="flex flex-col xl:flex-row gap-6">
              {/* LEFT - Tools Content Container - REDUCED HEIGHT */}
              <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                {/* Unified Tab Navigation */}
                <div className="border-b border-white/10">
                  {/* Desktop tabs */}
                  <div className="hidden lg:flex overflow-x-auto scrollbar-hide">
                    {tools.map((tool, index) => {
                      const Icon = getToolSpecificIcon(tool.icon_name);
                      const isConfigured = isToolConfigured(tool);
                      const isActive = activeTab === index;
                      
                      return (
                        <button
                          key={tool.id}
                          onClick={() => setActiveTab(index)}
                          className={`flex items-center gap-3 px-4 xl:px-6 py-4 min-w-fit whitespace-nowrap transition-all border-b-2 ${
                            isActive
                              ? 'border-blue-500 bg-blue-500/10 text-white'
                              : 'border-transparent hover:bg-white/5 text-white/70 hover:text-white'
                          }`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium max-w-[120px] xl:max-w-none truncate">{tool.name}</span>
                          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile tabs */}
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2 lg:hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                    {tools.map((tool, index) => {
                      const Icon = getToolSpecificIcon(tool.icon_name);
                      const isConfigured = isToolConfigured(tool);
                      const isActive = activeTab === index;
                      
                      return (
                        <button
                          key={tool.id}
                          onClick={() => setActiveTab(index)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/50'
                              : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-transparent'
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="max-w-[100px] truncate">{tool.name}</span>
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isConfigured ? "bg-green-400" : "bg-red-400"}`}></div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tool Content - REDUCED PADDING */}
                {activeTool && (
                  <motion.div
                    key={activeTool.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-5 lg:p-6"
                  >
                    {/* Tool Information and Environment Buttons - REDUCED GAP */}
                    <div className="flex flex-col xl:flex-row gap-4">
                      {/* Tool Information */}
                      <div className="flex-1">
                        {/* Tool Header - REDUCED MARGIN */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            {(() => {
                              const Icon = getToolSpecificIcon(activeTool.icon_name);
                              return <Icon className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0" />;
                            })()}
                            <div className="min-w-0 flex-1">
                              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{activeTool.name}</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
                                <span className={`text-xs sm:text-sm font-medium ${isToolConfigured(activeTool) ? "text-green-400" : "text-red-400"}`}>
                                  {isToolConfigured(activeTool) ? "ACTIVE" : "REQUIRES CONFIGURATION"}
                                </span>
                              </div>
                              <p className="text-white/60 text-sm sm:text-base leading-relaxed">{activeTool.description}</p>
                            </div>
                          </div>
                          
                          {/* Edit/Delete buttons */}
                          <div className="flex gap-2 flex-shrink-0">
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

                        {/* Features - REDUCED MARGIN */}
                        <div className="mb-3">
                          <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Features</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                            {activeTool.features?.map((feature, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Environment Status - REDUCED PADDING */}
                        <div className="bg-white/5 rounded-xl p-3">
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <div className={`w-2.5 h-2.5 rounded-full ${isToolConfigured(activeTool) ? "bg-green-400" : "bg-red-400"}`}></div>
                            <span className={`${isToolConfigured(activeTool) ? "text-green-400" : "text-red-400"} font-medium text-center`}>
                              {isToolConfigured(activeTool) 
                                ? `${getConfiguredEnvironmentsCount(activeTool)} of 3 environments configured` 
                                : "No environments configured"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Environment Buttons - REDUCED WIDTH AND PADDING */}
                      <div className="w-full xl:w-72 flex-shrink-0">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <h4 className="text-base font-semibold text-white mb-3 text-center">Launch Environment</h4>
                          
                          {/* Responsive grid layout for environment buttons - REDUCED GAP */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-2">
                            {['E1', 'E2', 'E3'].map((envType) => {
                              const env = activeTool.environments.find(e => e.env_type === envType);
                              const envConfigured = env && isEnvironmentConfigured(env.url);
                              const ToolIcon = getToolSpecificIcon(activeTool.icon_name);
              
                              return (
                                <button
                                  key={envType}
                                  onClick={() => envConfigured && env?.url ? handleEnvironmentClick(env.url) : undefined}
                                  disabled={!envConfigured}
                                  className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between border ${
                                    envConfigured
                                      ? "bg-white/10 hover:bg-white/15 border-blue-400/30 hover:border-blue-400/50 text-white cursor-pointer shadow-sm hover:shadow-md"
                                      : "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <ToolIcon className="w-4 h-4 flex-shrink-0"/>
                                    <div className="text-left min-w-0">
                                      <div className="font-medium text-xs sm:text-sm">{envType}</div>
                                      <div className="text-xs opacity-60 truncate hidden sm:block xl:block">{activeTool.name}</div>
                                    </div>
                                  </div>
                                  {envConfigured ? (
                                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  ) : (
                                    <span className="text-xs text-red-400 flex-shrink-0 hidden sm:inline xl:inline">Not configured</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {!isToolConfigured(activeTool) && (
                            <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
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

              {/* RIGHT - Application Navigator - REDUCED HEIGHT TO MATCH LEFT */}
              <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:w-96 xl:max-w-none mx-auto xl:mx-0 flex-shrink-0">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5">
                  <h4 className="text-lg font-semibold text-white mb-3">Application Navigator</h4>
                  
                  {/* Search Input - REDUCED PADDING */}
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search applications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Applications Count - REDUCED MARGIN */}
                  <div className="text-xs text-white/60 mb-2 px-1">
                    {filteredTools.length} of {tools.length} applications
                  </div>
                  
                  {/* Applications List - REDUCED HEIGHT FROM 300px TO 240px */}
                  <div 
                    style={{
                      height: '240px',
                      overflowY: 'scroll',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      padding: '8px',
                      cursor: 'default'
                    }}
                    onWheel={(e) => {
                      e.currentTarget.scrollTop += e.deltaY;
                    }}
                  >
                    {filteredTools.map((tool, index) => {
                      const originalIndex = tools.findIndex(t => t.id === tool.id);
                      const Icon = getToolSpecificIcon(tool.icon_name);
                      const isConfigured = isToolConfigured(tool);
                      const isActive = activeTab === originalIndex;
                      
                      return (
                        <button
                          key={tool.id}
                          onClick={() => handleToolSelect(originalIndex)}
                          style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '6px',
                            borderRadius: '8px',
                            border: isActive ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                            backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            textAlign: 'left',
                            pointerEvents: 'auto'
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            }
                          }}
                          onWheel={(e) => {
                            e.stopPropagation();
                            const container = e.currentTarget.parentElement;
                            if (container) {
                              container.scrollTop += e.deltaY;
                            }
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Icon style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '13px', fontWeight: '500' }}>{tool.name}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                              <div 
                                style={{
                                  width: '7px',
                                  height: '7px',
                                  borderRadius: '50%',
                                  backgroundColor: isConfigured ? '#10b981' : '#ef4444'
                                }}
                              ></div>
                              {isActive && (
                                <div 
                                  style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    backgroundColor: '#3b82f6'
                                  }}
                                ></div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                    
                    {filteredTools.length === 0 && searchQuery && (
                      <div style={{ textAlign: 'center', padding: '24px 0', color: 'rgba(255, 255, 255, 0.6)' }}>
                        <div style={{ marginBottom: '6px' }}>🔍</div>
                        <p style={{ fontSize: '13px' }}>No applications found matching "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <h3 className="text-lg sm:text-xl font-semibold text-white">Dynamic Tool Management</h3>
            </div>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Tools are dynamically loaded from the database. Use the "Add New Tool" button above to create new integrations, or use the edit/delete buttons in each tool's tab.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}