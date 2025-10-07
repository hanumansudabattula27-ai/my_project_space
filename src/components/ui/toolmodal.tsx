// "use client"
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Plus, Trash2, Database } from "lucide-react";
// import { ELKIcon, GrafanaIcon, EAGIcon, ApigeeIcon, DynatraceIcon } from "@/components/icon/icons";

// export interface ToolFormData {
//   id?: number;
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
//     url: string;
//   }>;
//   features: string[];
// }

// interface DatabaseTool {
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

// interface ToolModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (toolData: ToolFormData) => Promise<void>;
//   editTool?: DatabaseTool | null;
//   isLoading?: boolean;
// }

// const availableIcons = [
//   { name: "Grafana", component: GrafanaIcon },
//   { name: "ELK", component: ELKIcon },
//   { name: "EAG", component: EAGIcon },
//   { name: "Apigee", component: ApigeeIcon },
//   { name: "Dynatrace", component: DynatraceIcon },
//   { name: "Database", component: Database }
// ];

// const availableColors = [
//   { name: "Blue", scheme: { icon: "text-blue-400", bg: "bg-blue-500/20", accent: "blue" } },
//   { name: "Red", scheme: { icon: "text-red-400", bg: "bg-red-500/20", accent: "red" } },
//   { name: "Green", scheme: { icon: "text-green-400", bg: "bg-green-500/20", accent: "green" } },
//   { name: "Yellow", scheme: { icon: "text-yellow-400", bg: "bg-yellow-500/20", accent: "yellow" } },
//   { name: "Purple", scheme: { icon: "text-purple-400", bg: "bg-purple-500/20", accent: "purple" } },
//   { name: "Cyan", scheme: { icon: "text-cyan-400", bg: "bg-cyan-500/20", accent: "cyan" } },
//   { name: "Indigo", scheme: { icon: "text-indigo-400", bg: "bg-indigo-500/20", accent: "indigo" } },
//   { name: "Pink", scheme: { icon: "text-pink-400", bg: "bg-pink-500/20", accent: "pink" } }
// ];

// export function ToolModal({ isOpen, onClose, onSave, editTool, isLoading = false }: ToolModalProps) {
//   const [formData, setFormData] = useState<ToolFormData>({
//     name: "",
//     description: "",
//     icon_name: "Database",
//     color_scheme: availableColors[0].scheme,
//     environments: [
//       { env_type: "E1", url: "" },
//       { env_type: "E2", url: "" },
//       { env_type: "E3", url: "" }
//     ],
//     features: [""]
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Initialize form data when editing
//   useEffect(() => {
//     if (editTool) {
//       setFormData({
//         ...editTool,
//         environments: editTool.environments.length > 0 
//           ? editTool.environments.map(env => ({
//               env_type: env.env_type,
//               url: env.url || "" // Convert null to empty string for form
//             }))
//           : [
//               { env_type: "E1", url: "" },
//               { env_type: "E2", url: "" },
//               { env_type: "E3", url: "" }
//             ],
//         features: editTool.features.length > 0 ? editTool.features : [""]
//       });
//     } else {
//       // Reset form for new tool
//       setFormData({
//         name: "",
//         description: "",
//         icon_name: "Database",
//         color_scheme: availableColors[0].scheme,
//         environments: [
//           { env_type: "E1", url: "" },
//           { env_type: "E2", url: "" },
//           { env_type: "E3", url: "" }
//         ],
//         features: [""]
//       });
//     }
//     setErrors({});
//   }, [editTool, isOpen]);

//   const validateForm = (): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Tool name is required";
//     }

//     if (!formData.description.trim()) {
//       newErrors.description = "Description is required";
//     }

//     if (formData.features.filter(f => f.trim()).length === 0) {
//       newErrors.features = "At least one feature is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     try {
//       // Prepare data for API - ensure all required fields are present
//       const cleanedData: ToolFormData = {
//         ...formData,
//         features: formData.features.filter(f => f.trim()), // Remove empty features
//         environments: formData.environments.map(env => ({
//           env_type: env.env_type,
//           url: env.url.trim() || "" // Ensure empty string, not null
//         }))
//       };
      
//       await onSave(cleanedData);
//       onClose();
//     } catch (error) {
//       console.error('Error saving tool:', error);
//       // Could add error state here to show user-friendly error message
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const addFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, ""]
//     }));
//   };

//   const removeFeature = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const updateFeature = (index: number, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.map((feature, i) => i === index ? value : feature)
//     }));
//   };

//   const updateEnvironment = (envType: 'E1' | 'E2' | 'E3', url: string) => {
//     setFormData(prev => ({
//       ...prev,
//       environments: prev.environments.map(env => 
//         env.env_type === envType ? { ...env, url } : env
//       )
//     }));
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
//             onClick={onClose}
//           />
          
//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//               <form onSubmit={handleSubmit} className="p-6">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-2xl font-bold text-white">
//                     {editTool ? 'Edit Tool' : 'Add New Tool'}
//                   </h2>
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {/* Basic Information */}
//                 <div className="space-y-4 mb-6">
//                   <div>
//                     <label className="block text-sm font-medium text-white mb-2">
//                       Tool Name *
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Enter tool name"
//                     />
//                     {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-white mb-2">
//                       Description *
//                     </label>
//                     <textarea
//                       value={formData.description}
//                       onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                       rows={3}
//                       className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                       placeholder="Enter tool description"
//                     />
//                     {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
//                   </div>
//                 </div>

//                 {/* Icon Selection */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-white mb-3">
//                     Icon
//                   </label>
//                   <div className="grid grid-cols-6 gap-3">
//                     {availableIcons.map((icon) => {
//                       const IconComponent = icon.component;
//                       return (
//                         <button
//                           key={icon.name}
//                           type="button"
//                           onClick={() => setFormData(prev => ({ ...prev, icon_name: icon.name }))}
//                           className={`p-3 rounded-lg border transition-all ${
//                             formData.icon_name === icon.name
//                               ? 'border-blue-500 bg-blue-500/20'
//                               : 'border-white/20 bg-white/5 hover:bg-white/10'
//                           }`}
//                         >
//                           <IconComponent />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Color Scheme */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-white mb-3">
//                     Color Scheme
//                   </label>
//                   <div className="grid grid-cols-4 gap-3">
//                     {availableColors.map((color) => (
//                       <button
//                         key={color.name}
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, color_scheme: color.scheme }))}
//                         className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${
//                           formData.color_scheme.accent === color.scheme.accent
//                             ? 'border-blue-500 bg-blue-500/20'
//                             : 'border-white/20 bg-white/5 hover:bg-white/10'
//                         }`}
//                       >
//                         <div className={`w-4 h-4 rounded-full ${color.scheme.icon.replace('text-', 'bg-')}`} />
//                         <span className="text-white text-xs">{color.name}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Environment URLs */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-white mb-3">
//                     Environment URLs
//                   </label>
//                   <div className="space-y-3">
//                     {formData.environments.map((env) => (
//                       <div key={env.env_type}>
//                         <label className="block text-xs text-white/60 mb-1">
//                           {env.env_type} Environment
//                         </label>
//                         <input
//                           type="url"
//                           value={env.url}
//                           onChange={(e) => updateEnvironment(env.env_type, e.target.value)}
//                           className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           placeholder={`Enter ${env.env_type} environment URL (optional)`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Features */}
//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <label className="block text-sm font-medium text-white">
//                       Features *
//                     </label>
//                     <button
//                       type="button"
//                       onClick={addFeature}
//                       className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-sm"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add Feature
//                     </button>
//                   </div>
//                   <div className="space-y-2">
//                     {formData.features.map((feature, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={feature}
//                           onChange={(e) => updateFeature(index, e.target.value)}
//                           className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           placeholder="Enter feature description"
//                         />
//                         {formData.features.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeFeature(index)}
//                             className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {errors.features && <p className="text-red-400 text-sm mt-1">{errors.features}</p>}
//                 </div>

//                 {/* Form Actions */}
//                 <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     disabled={isSubmitting}
//                     className="px-6 py-2 text-white/60 hover:text-white transition-colors disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting || isLoading}
//                     className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         {editTool ? 'Updating...' : 'Creating...'}
//                       </>
//                     ) : (
//                       editTool ? 'Update Tool' : 'Create Tool'
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// "use client"
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Plus, Trash2, Database, ChevronLeft, ChevronRight, Settings, BarChart3, Archive, Search,Activity } from "lucide-react";
// import { ELKIcon, GrafanaIcon, EAGIcon, ApigeeIcon, DynatraceIcon } from "@/components/icon/icons";

// export interface ToolFormData {
//   id?: number;
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
//     url: string;
//   }>;
//   features: string[];
// }

// interface DatabaseTool {
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

// interface ToolModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (toolData: ToolFormData) => Promise<void>;
//   editTool?: DatabaseTool | null;
//   isLoading?: boolean;
// }

// const availableIcons = [
//   {name: "BarChart3",component: BarChart3},
//   {name: "Activity",component: Activity},
//   {name: "Settings",component: Settings},
//   {name: "Search",componemmt: Search},
//   {name: "Archive",component: Archive},
//   {name: "Database",component: Database}
// ];

// const availableColors = [
//   { name: "Blue", scheme: { icon: "text-blue-400", bg: "bg-blue-500/20", accent: "blue" } },
//   { name: "Red", scheme: { icon: "text-red-400", bg: "bg-red-500/20", accent: "red" } },
//   { name: "Green", scheme: { icon: "text-green-400", bg: "bg-green-500/20", accent: "green" } },
//   { name: "Yellow", scheme: { icon: "text-yellow-400", bg: "bg-yellow-500/20", accent: "yellow" } },
//   { name: "Purple", scheme: { icon: "text-purple-400", bg: "bg-purple-500/20", accent: "purple" } },
//   { name: "Cyan", scheme: { icon: "text-cyan-400", bg: "bg-cyan-500/20", accent: "cyan" } },
//   { name: "Indigo", scheme: { icon: "text-indigo-400", bg: "bg-indigo-500/20", accent: "indigo" } },
//   { name: "Pink", scheme: { icon: "text-pink-400", bg: "bg-pink-500/20", accent: "pink" } }
// ];

// export function ToolModal({ isOpen, onClose, onSave, editTool, isLoading = false }: ToolModalProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState<ToolFormData>({
//     name: "",
//     description: "",
//     icon_name: "Database",
//     color_scheme: availableColors[0].scheme,
//     environments: [
//       { env_type: "E1", url: "" },
//       { env_type: "E2", url: "" },
//       { env_type: "E3", url: "" }
//     ],
//     features: [""]
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const steps = [
//     { title: "Basic Info", subtitle: "Name & Description" },
//     { title: "Appearance", subtitle: "Icon & Colors" },
//     { title: "Configuration", subtitle: "URLs & Features" }
//   ];

//   useEffect(() => {
//     if (editTool) {
//       setFormData({
//         ...editTool,
//         environments: editTool.environments.length > 0 
//           ? editTool.environments.map(env => ({
//               env_type: env.env_type,
//               url: env.url || ""
//             }))
//           : [
//               { env_type: "E1", url: "" },
//               { env_type: "E2", url: "" },
//               { env_type: "E3", url: "" }
//             ],
//         features: editTool.features.length > 0 ? editTool.features : [""]
//       });
//     } else {
//       setFormData({
//         name: "",
//         description: "",
//         icon_name: "Database",
//         color_scheme: availableColors[0].scheme,
//         environments: [
//           { env_type: "E1", url: "" },
//           { env_type: "E2", url: "" },
//           { env_type: "E3", url: "" }
//         ],
//         features: [""]
//       });
//     }
//     setErrors({});
//     setCurrentStep(1);
//   }, [editTool, isOpen]);

//   const validateStep = (step: number): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (step === 1) {
//       if (!formData.name.trim()) {
//         newErrors.name = "Tool name is required";
//       }
//       if (!formData.description.trim()) {
//         newErrors.description = "Description is required";
//       }
//     }

//     if (step === 3) {
//       if (formData.features.filter(f => f.trim()).length === 0) {
//         newErrors.features = "At least one feature is required";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(prev => Math.min(prev + 1, steps.length));
//     }
//   };

//   const handlePrev = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

//   const handleSubmit = async () => {
//     if (!validateStep(3)) return;

//     setIsSubmitting(true);
//     try {
//       const cleanedData: ToolFormData = {
//         ...formData,
//         features: formData.features.filter(f => f.trim()),
//         environments: formData.environments.map(env => ({
//           env_type: env.env_type,
//           url: env.url.trim() || ""
//         }))
//       };
      
//       await onSave(cleanedData);
//       onClose();
//     } catch (error) {
//       console.error('Error saving tool:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const addFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, ""]
//     }));
//   };

//   const removeFeature = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const updateFeature = (index: number, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.map((feature, i) => i === index ? value : feature)
//     }));
//   };

//   const updateEnvironment = (envType: 'E1' | 'E2' | 'E3', url: string) => {
//     setFormData(prev => ({
//       ...prev,
//       environments: prev.environments.map(env => 
//         env.env_type === envType ? { ...env, url } : env
//       )
//     }));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />
      
//       <div className="absolute inset-0 flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-lg"
//           onClick={e => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-white/10">
//             <div>
//               <h2 className="text-xl font-bold text-white">
//                 {editTool ? 'Edit Tool' : 'Add New Tool'}
//               </h2>
//               <p className="text-sm text-white/60 mt-1">
//                 Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={onClose}
//               className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Progress Bar */}
//           <div className="px-6 py-4 border-b border-white/10">
//             <div className="flex gap-2">
//               {steps.map((step, index) => (
//                 <div
//                   key={index}
//                   className={`flex-1 h-2 rounded-full transition-colors ${
//                     index < currentStep ? 'bg-blue-500' : 'bg-white/20'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Step Content */}
//           <div className="p-6" style={{ minHeight: '300px' }}>
//             {currentStep === 1 && (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-white mb-2">
//                     Tool Name *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                     className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter tool name"
//                   />
//                   {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white mb-2">
//                     Description *
//                   </label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                     rows={4}
//                     className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                     placeholder="Enter tool description"
//                   />
//                   {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
//                 </div>
//               </div>
//             )}

//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-white mb-3">
//                     Icon
//                   </label>
//                   <div className="grid grid-cols-3 gap-3">
//                     {availableIcons.map((icon) => {
//                       const IconComponent = icon.component;
//                       return (
//                         <button
//                           key={icon.name}
//                           type="button"
//                           onClick={() => setFormData(prev => ({ ...prev, icon_name: icon.name }))}
//                           className={`p-3 rounded-lg border transition-all ${
//                             formData.icon_name === icon.name
//                               ? 'border-blue-500 bg-blue-500/20'
//                               : 'border-white/20 bg-white/5 hover:bg-white/10'
//                           }`}
//                         >
//                           <IconComponent />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white mb-3">
//                     Color Scheme
//                   </label>
//                   <div className="grid grid-cols-2 gap-3">
//                     {availableColors.map((color) => (
//                       <button
//                         key={color.name}
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, color_scheme: color.scheme }))}
//                         className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${
//                           formData.color_scheme.accent === color.scheme.accent
//                             ? 'border-blue-500 bg-blue-500/20'
//                             : 'border-white/20 bg-white/5 hover:bg-white/10'
//                         }`}
//                       >
//                         <div className={`w-4 h-4 rounded-full ${color.scheme.icon.replace('text-', 'bg-')}`} />
//                         <span className="text-white text-xs">{color.name}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-white mb-3">
//                     Environment URLs (Optional)
//                   </label>
//                   <div className="space-y-3">
//                     {formData.environments.map((env) => (
//                       <div key={env.env_type}>
//                         <label className="block text-xs text-white/60 mb-1">
//                           {env.env_type} Environment
//                         </label>
//                         <input
//                           type="url"
//                           value={env.url}
//                           onChange={(e) => updateEnvironment(env.env_type, e.target.value)}
//                           className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                           placeholder={`${env.env_type} URL`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex items-center justify-between mb-3">
//                     <label className="block text-sm font-medium text-white">
//                       Features *
//                     </label>
//                     <button
//                       type="button"
//                       onClick={addFeature}
//                       className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-sm"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add
//                     </button>
//                   </div>
//                   <div className="space-y-2">
//                     {formData.features.map((feature, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={feature}
//                           onChange={(e) => updateFeature(index, e.target.value)}
//                           className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                           placeholder="Feature description"
//                         />
//                         {formData.features.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeFeature(index)}
//                             className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {errors.features && <p className="text-red-400 text-sm mt-1">{errors.features}</p>}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="flex justify-between items-center p-6 border-t border-white/10">
//             <button
//               type="button"
//               onClick={currentStep === 1 ? onClose : handlePrev}
//               disabled={isSubmitting}
//               className="px-4 py-2 text-white/60 hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
//             >
//               {currentStep === 1 ? (
//                 'Cancel'
//               ) : (
//                 <>
//                   <ChevronLeft className="w-4 h-4" />
//                   Back
//                 </>
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={currentStep === steps.length ? handleSubmit : handleNext}
//               disabled={isSubmitting || isLoading}
//               className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   {editTool ? 'Updating...' : 'Creating...'}
//                 </>
//               ) : currentStep === steps.length ? (
//                 editTool ? 'Update Tool' : 'Create Tool'
//               ) : (
//                 <>
//                   Next
//                   <ChevronRight className="w-4 h-4" />
//                 </>
//               )}
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }








// "use client"
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Plus, Trash2, Database, ChevronLeft, ChevronRight } from "lucide-react";
// import { BarChart3, Activity, Search, Settings, Archive } from "lucide-react";
// // import { ELKIcon, GrafanaIcon, EAGIcon, ApigeeIcon, DynatraceIcon } from "@/src/components/icon/icons";

// export interface ToolFormData {
//   id?: number;
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
//     url: string;
//   }>;
//   features: string[];
// }

// interface DatabaseTool {
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

// interface ToolModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (toolData: ToolFormData) => Promise<void>;
//   editTool?: DatabaseTool | null;
//   isLoading?: boolean;
// }

// const availableIcons = [
//   { name: "BarChart3", component: BarChart3},
//   { name: "Activity", component: Activity },
//   { name: "Settings", component: Settings },
//   { name: "Search", component: Search },
//   { name: "Archive", component: Archive },
//   { name: "Database", component: Database }
// ];
// const availableColors = [
//   { name: "Blue", scheme: { icon: "text-blue-400", bg: "bg-blue-500/20", accent: "blue" } },
//   { name: "Red", scheme: { icon: "text-red-400", bg: "bg-red-500/20", accent: "red" } },
//   { name: "Green", scheme: { icon: "text-green-400", bg: "bg-green-500/20", accent: "green" } },
//   { name: "Yellow", scheme: { icon: "text-yellow-400", bg: "bg-yellow-500/20", accent: "yellow" } },
//   { name: "Purple", scheme: { icon: "text-purple-400", bg: "bg-purple-500/20", accent: "purple" } },
//   { name: "Cyan", scheme: { icon: "text-cyan-400", bg: "bg-cyan-500/20", accent: "cyan" } },
//   { name: "Indigo", scheme: { icon: "text-indigo-400", bg: "bg-indigo-500/20", accent: "indigo" } },
//   { name: "Pink", scheme: { icon: "text-pink-400", bg: "bg-pink-500/20", accent: "pink" } }
// ];

// export function ToolModal({ isOpen, onClose, onSave, editTool, isLoading = false }: ToolModalProps) {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState<ToolFormData>({
//     name: "",
//     description: "",
//     icon_name: "Database",
//     color_scheme: availableColors[0].scheme,
//     environments: [
//       { env_type: "E1", url: "" },
//       { env_type: "E2", url: "" },
//       { env_type: "E3", url: "" }
//     ],
//     features: [""]
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const steps = [
//     { title: "Basic Info", subtitle: "Name & Description" },
//     { title: "Appearance", subtitle: "Icon & Colors" },
//     { title: "Configuration", subtitle: "URLs & Features" }
//   ];

//   useEffect(() => {
//     if (editTool) {
//       setFormData({
//         ...editTool,
//         environments: editTool.environments.length > 0 
//           ? editTool.environments.map(env => ({
//               env_type: env.env_type,
//               url: env.url || ""
//             }))
//           : [
//               { env_type: "E1", url: "" },
//               { env_type: "E2", url: "" },
//               { env_type: "E3", url: "" }
//             ],
//         features: editTool.features.length > 0 ? editTool.features : [""]
//       });
//     } else {
//       setFormData({
//         name: "",
//         description: "",
//         icon_name: "Database",
//         color_scheme: availableColors[0].scheme,
//         environments: [
//           { env_type: "E1", url: "" },
//           { env_type: "E2", url: "" },
//           { env_type: "E3", url: "" }
//         ],
//         features: [""]
//       });
//     }
//     setErrors({});
//     setCurrentStep(1);
//   }, [editTool, isOpen]);

//   const validateStep = (step: number): boolean => {
//     const newErrors: Record<string, string> = {};

//     if (step === 1) {
//       if (!formData.name.trim()) {
//         newErrors.name = "Tool name is required";
//       }
//       if (!formData.description.trim()) {
//         newErrors.description = "Description is required";
//       }
//     }

//     if (step === 3) {
//       if (formData.features.filter(f => f.trim()).length === 0) {
//         newErrors.features = "At least one feature is required";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(prev => Math.min(prev + 1, steps.length));
//     }
//   };

//   const handlePrev = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

//   const handleSubmit = async () => {
//     if (!validateStep(3)) return;

//     setIsSubmitting(true);
//     try {
//       const cleanedData: ToolFormData = {
//         ...formData,
//         features: formData.features.filter(f => f.trim()),
//         environments: formData.environments.map(env => ({
//           env_type: env.env_type,
//           url: env.url.trim() || ""
//         }))
//       };
      
//       await onSave(cleanedData);
//       onClose();
//     } catch (error) {
//       console.error('Error saving tool:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const addFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       features: [...prev.features, ""]
//     }));
//   };

//   const removeFeature = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.filter((_, i) => i !== index)
//     }));
//   };

//   const updateFeature = (index: number, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       features: prev.features.map((feature, i) => i === index ? value : feature)
//     }));
//   };

//   const updateEnvironment = (envType: 'E1' | 'E2' | 'E3', url: string) => {
//     setFormData(prev => ({
//       ...prev,
//       environments: prev.environments.map(env => 
//         env.env_type === envType ? { ...env, url } : env
//       )
//     }));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />
      
//       <div className="absolute inset-0 flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-lg"
//           onClick={e => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-white/10">
//             <div>
//               <h2 className="text-xl font-bold text-white">
//                 {editTool ? 'Edit Tool' : 'Add New Tool'}
//               </h2>
//               <p className="text-sm text-white/60 mt-1">
//                 Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={onClose}
//               className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Progress Bar */}
//           <div className="px-6 py-4 border-b border-white/10">
//             <div className="flex gap-2">
//               {steps.map((step, index) => (
//                 <div
//                   key={index}
//                   className={`flex-1 h-2 rounded-full transition-colors ${
//                     index < currentStep ? 'bg-blue-500' : 'bg-white/20'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Step Content */}
//           <div className="p-6" style={{ minHeight: '300px' }}>
//             {currentStep === 1 && (
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-white mb-2">
//                     Tool Name *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                     className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter tool name"
//                   />
//                   {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white mb-2">
//                     Description *
//                   </label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                     rows={4}
//                     className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                     placeholder="Enter tool description"
//                   />
//                   {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
//                 </div>
//               </div>
//             )}

//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-white mb-3">
//                     Icon
//                   </label>
//                   <div className="grid grid-cols-3 gap-3">
//                     {availableIcons.map((icon) => {
//                       const IconComponent = icon.component;
//                       return (
//                         <button
//                           key={icon.name}
//                           type="button"
//                           onClick={() => setFormData(prev => ({ ...prev, icon_name: icon.name }))}
//                           className={`p-3 rounded-lg border transition-all ${
//                             formData.icon_name === icon.name
//                               ? 'border-blue-500 bg-blue-500/20'
//                               : 'border-white/20 bg-white/5 hover:bg-white/10'
//                           }`}
//                         >
//                           <IconComponent />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-white mb-3">
//                     Color Scheme
//                   </label>
//                   <div className="grid grid-cols-2 gap-3">
//                     {availableColors.map((color) => (
//                       <button
//                         key={color.name}
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, color_scheme: color.scheme }))}
//                         className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${
//                           formData.color_scheme.accent === color.scheme.accent
//                             ? 'border-blue-500 bg-blue-500/20'
//                             : 'border-white/20 bg-white/5 hover:bg-white/10'
//                         }`}
//                       >
//                         <div className={`w-4 h-4 rounded-full ${color.scheme.icon.replace('text-', 'bg-')}`} />
//                         <span className="text-white text-xs">{color.name}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-white mb-3">
//                     Environment URLs (Optional)
//                   </label>
//                   <div className="space-y-3">
//                     {formData.environments.map((env) => (
//                       <div key={env.env_type}>
//                         <label className="block text-xs text-white/60 mb-1">
//                           {env.env_type} Environment
//                         </label>
//                         <input
//                           type="url"
//                           value={env.url}
//                           onChange={(e) => updateEnvironment(env.env_type, e.target.value)}
//                           className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                           placeholder={`${env.env_type} URL`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex items-center justify-between mb-3">
//                     <label className="block text-sm font-medium text-white">
//                       Features *
//                     </label>
//                     <button
//                       type="button"
//                       onClick={addFeature}
//                       className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-sm"
//                     >
//                       <Plus className="w-4 h-4" />
//                       Add
//                     </button>
//                   </div>
//                   <div className="space-y-2">
//                     {formData.features.map((feature, index) => (
//                       <div key={index} className="flex gap-2">
//                         <input
//                           type="text"
//                           value={feature}
//                           onChange={(e) => updateFeature(index, e.target.value)}
//                           className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                           placeholder="Feature description"
//                         />
//                         {formData.features.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeFeature(index)}
//                             className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {errors.features && <p className="text-red-400 text-sm mt-1">{errors.features}</p>}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="flex justify-between items-center p-6 border-t border-white/10">
//             <button
//               type="button"
//               onClick={currentStep === 1 ? onClose : handlePrev}
//               disabled={isSubmitting}
//               className="px-4 py-2 text-white/60 hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
//             >
//               {currentStep === 1 ? (
//                 'Cancel'
//               ) : (
//                 <>
//                   <ChevronLeft className="w-4 h-4" />
//                   Back
//                 </>
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={currentStep === steps.length ? handleSubmit : handleNext}
//               disabled={isSubmitting || isLoading}
//               className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   {editTool ? 'Updating...' : 'Creating...'}
//                 </>
//               ) : currentStep === steps.length ? (
//                 editTool ? 'Update Tool' : 'Create Tool'
//               ) : (
//                 <>
//                   Next
//                   <ChevronRight className="w-4 h-4" />
//                 </>
//               )}
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }






"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, Database, ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart3, Activity, Search, Settings, Archive } from "lucide-react";
import { useTheme } from "next-themes";

export interface ToolFormData {
  id?: number;
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
    url: string;
  }>;
  features: string[];
}

interface DatabaseTool {
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

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (toolData: ToolFormData) => Promise<void>;
  editTool?: DatabaseTool | null;
  isLoading?: boolean;
}

const availableIcons = [
  { name: "BarChart3", component: BarChart3},
  { name: "Activity", component: Activity },
  { name: "Settings", component: Settings },
  { name: "Search", component: Search },
  { name: "Archive", component: Archive },
  { name: "Database", component: Database }
];

const availableColors = [
  { name: "Blue", scheme: { icon: "text-blue-400", bg: "bg-blue-500/20", accent: "blue" } },
  { name: "Red", scheme: { icon: "text-red-400", bg: "bg-red-500/20", accent: "red" } },
  { name: "Green", scheme: { icon: "text-green-400", bg: "bg-green-500/20", accent: "green" } },
  { name: "Yellow", scheme: { icon: "text-yellow-400", bg: "bg-yellow-500/20", accent: "yellow" } },
  { name: "Purple", scheme: { icon: "text-purple-400", bg: "bg-purple-500/20", accent: "purple" } },
  { name: "Cyan", scheme: { icon: "text-cyan-400", bg: "bg-cyan-500/20", accent: "cyan" } },
  { name: "Indigo", scheme: { icon: "text-indigo-400", bg: "bg-indigo-500/20", accent: "indigo" } },
  { name: "Pink", scheme: { icon: "text-pink-400", bg: "bg-pink-500/20", accent: "pink" } }
];

export function ToolModal({ isOpen, onClose, onSave, editTool, isLoading = false }: ToolModalProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ToolFormData>({
    name: "",
    description: "",
    icon_name: "Database",
    color_scheme: availableColors[0].scheme,
    environments: [
      { env_type: "E1", url: "" },
      { env_type: "E2", url: "" },
      { env_type: "E3", url: "" }
    ],
    features: [""]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { title: "Basic Info", subtitle: "Name & Description" },
    { title: "Appearance", subtitle: "Icon & Colors" },
    { title: "Configuration", subtitle: "URLs & Features" }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (editTool) {
      setFormData({
        ...editTool,
        environments: editTool.environments.length > 0 
          ? editTool.environments.map(env => ({
              env_type: env.env_type,
              url: env.url || ""
            }))
          : [
              { env_type: "E1", url: "" },
              { env_type: "E2", url: "" },
              { env_type: "E3", url: "" }
            ],
        features: editTool.features.length > 0 ? editTool.features : [""]
      });
    } else {
      setFormData({
        name: "",
        description: "",
        icon_name: "Database",
        color_scheme: availableColors[0].scheme,
        environments: [
          { env_type: "E1", url: "" },
          { env_type: "E2", url: "" },
          { env_type: "E3", url: "" }
        ],
        features: [""]
      });
    }
    setErrors({});
    setCurrentStep(1);
  }, [editTool, isOpen]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Tool name is required";
      }
      if (!formData.description.trim()) {
        newErrors.description = "Description is required";
      }
    }

    if (step === 3) {
      if (formData.features.filter(f => f.trim()).length === 0) {
        newErrors.features = "At least one feature is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      const cleanedData: ToolFormData = {
        ...formData,
        features: formData.features.filter(f => f.trim()),
        environments: formData.environments.map(env => ({
          env_type: env.env_type,
          url: env.url.trim() || ""
        }))
      };
      
      await onSave(cleanedData);
      onClose();
    } catch (error) {
      console.error('Error saving tool:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const updateEnvironment = (envType: 'E1' | 'E2' | 'E3', url: string) => {
    setFormData(prev => ({
      ...prev,
      environments: prev.environments.map(env => 
        env.env_type === envType ? { ...env, url } : env
      )
    }));
  };

  if (!mounted || !isOpen) return null;

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`backdrop-blur-xl rounded-2xl w-full max-w-lg shadow-2xl border ${
              isDark 
                ? "bg-[#1e293b]/95 border-white/10" 
                : "bg-white border-teal-200"
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDark ? "border-white/10" : "border-teal-200"
            }`}>
              <div>
                <h2 className={`text-xl font-bold ${
                  isDark ? "text-gray-100" : "text-slate-900"
                }`}>
                  {editTool ? 'Edit Tool' : 'Add New Tool'}
                </h2>
                <p className={`text-sm mt-1 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}>
                  Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className={`transition-colors p-2 rounded-lg ${
                  isDark 
                    ? "text-gray-400 hover:text-white hover:bg-white/10" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-teal-50"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className={`px-6 py-4 border-b ${
              isDark ? "border-white/10" : "border-teal-200"
            }`}>
              <div className="flex gap-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      index < currentStep 
                        ? 'bg-gradient-to-r from-[#6366f1] to-[#10b981]' 
                        : isDark 
                          ? 'bg-white/20' 
                          : 'bg-teal-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6" style={{ minHeight: '300px' }}>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-200" : "text-slate-800"
                    }`}>
                      Tool Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        isDark
                          ? "bg-white/10 border-white/20 text-white placeholder-gray-500"
                          : "bg-white border-teal-300 text-slate-900 placeholder-slate-400"
                      }`}
                      placeholder="Enter tool name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-200" : "text-slate-800"
                    }`}>
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
                        isDark
                          ? "bg-white/10 border-white/20 text-white placeholder-gray-500"
                          : "bg-white border-teal-300 text-slate-900 placeholder-slate-400"
                      }`}
                      placeholder="Enter tool description"
                    />
                    {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${
                      isDark ? "text-gray-200" : "text-slate-800"
                    }`}>
                      Icon
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {availableIcons.map((icon) => {
                        const IconComponent = icon.component;
                        return (
                          <button
                            key={icon.name}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, icon_name: icon.name }))}
                            className={`p-3 rounded-lg border transition-all ${
                              formData.icon_name === icon.name
                                ? isDark
                                  ? 'border-indigo-500 bg-indigo-500/20'
                                  : 'border-teal-500 bg-teal-50'
                                : isDark
                                  ? 'border-white/20 bg-white/5 hover:bg-white/10'
                                  : 'border-teal-200 bg-white hover:bg-teal-50'
                            }`}
                          >
                            <IconComponent className={`w-6 h-6 mx-auto ${
                              isDark ? "text-gray-300" : "text-slate-700"
                            }`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-3 ${
                      isDark ? "text-gray-200" : "text-slate-800"
                    }`}>
                      Color Scheme
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {availableColors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, color_scheme: color.scheme }))}
                          className={`p-3 rounded-lg border transition-all flex items-center gap-2 ${
                            formData.color_scheme.accent === color.scheme.accent
                              ? isDark
                                ? 'border-indigo-500 bg-indigo-500/20'
                                : 'border-teal-500 bg-teal-50'
                              : isDark
                                ? 'border-white/20 bg-white/5 hover:bg-white/10'
                                : 'border-teal-200 bg-white hover:bg-teal-50'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full ${color.scheme.icon.replace('text-', 'bg-')}`} />
                          <span className={`text-xs ${
                            isDark ? "text-gray-300" : "text-slate-700"
                          }`}>{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${
                      isDark ? "text-gray-200" : "text-slate-800"
                    }`}>
                      Environment URLs (Optional)
                    </label>
                    <div className="space-y-3">
                      {formData.environments.map((env) => (
                        <div key={env.env_type}>
                          <label className={`block text-xs mb-1 ${
                            isDark ? "text-gray-400" : "text-slate-600"
                          }`}>
                            {env.env_type} Environment
                          </label>
                          <input
                            type="url"
                            value={env.url}
                            onChange={(e) => updateEnvironment(env.env_type, e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                              isDark
                                ? "bg-white/10 border-white/20 text-white placeholder-gray-500"
                                : "bg-white border-teal-300 text-slate-900 placeholder-slate-400"
                            }`}
                            placeholder={`${env.env_type} URL`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className={`block text-sm font-medium ${
                        isDark ? "text-gray-200" : "text-slate-800"
                      }`}>
                        Features *
                      </label>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                              isDark
                                ? "bg-white/10 border-white/20 text-white placeholder-gray-500"
                                : "bg-white border-teal-300 text-slate-900 placeholder-slate-400"
                            }`}
                            placeholder="Feature description"
                          />
                          {formData.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.features && <p className="text-red-400 text-sm mt-1">{errors.features}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`flex justify-between items-center p-6 border-t ${
              isDark ? "border-white/10" : "border-teal-200"
            }`}>
              <button
                type="button"
                onClick={currentStep === 1 ? onClose : handlePrev}
                disabled={isSubmitting}
                className={`px-4 py-2 transition-colors disabled:opacity-50 flex items-center gap-2 ${
                  isDark 
                    ? "text-gray-400 hover:text-white" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {currentStep === 1 ? (
                  'Cancel'
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={currentStep === steps.length ? handleSubmit : handleNext}
                disabled={isSubmitting || isLoading}
                // className="px-6 py-2 bg-gradient-to-r from-[#6366f1] to-[#10b981] hover:from-[#4f46e5] hover:to-[#059669] text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
             
             className={`px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg ${
  isDark
    ? 'bg-slate-700 hover:bg-slate-600 text-white'
    : 'bg-[#5A9690] hover:bg-[#49857F] text-white'
}`}
             >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {editTool ? 'Updating...' : 'Creating...'}
                  </>
                ) : currentStep === steps.length ? (
                  editTool ? 'Update Tool' : 'Create Tool'
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}