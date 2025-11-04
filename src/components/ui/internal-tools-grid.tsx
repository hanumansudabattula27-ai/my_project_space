// // src/components/ui/internal-tools-grid.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Shield, Server, Database, Grid3x3 } from "lucide-react";

// const internalTools = [
//   {
//     name: "JWT Utility",
//     description: "Encode, decode & verify JWT tokens",
//     href: "/tools/jwt",
//     icon: Shield,
//     color: "blue",
//     status: "active"
//   },
//   {
//     name: "Server Monitor",
//     description: "Real-time server health & metrics",
//     href: "/tools/servers",
//     icon: Server,
//     color: "green",
//     status: "active"
//   },
//   {
//     name: "CRAFT",
//     description: "Central application repository & tracking",
//     href: "/tools/caart",
//     icon: Database,
//     color: "purple",
//     status: "active"
//   },
//   {
//     name: "Env Matrix",
//     description: "Environment configuration matrix",
//     href: "/tools/env-matrix",
//     icon: Grid3x3,
//     color: "orange",
//     status: "active"
//   },
// ];

// const colorClasses = {
//   blue: {
//     icon: "text-blue-400",
//     bg: "bg-blue-500/20",
//     button: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
//   },
//   green: {
//     icon: "text-green-400",
//     bg: "bg-green-500/20", 
//     button: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
//   },
//   purple: {
//     icon: "text-purple-400",
//     bg: "bg-purple-500/20",
//     button: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
//   },
//   orange: {
//     icon: "text-orange-400",
//     bg: "bg-orange-500/20",
//     button: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
//   }
// };

// export function InternalToolsGrid() {
// return (
//   <section className="pt-10 pb-15 px-6">
//     <div className="max-w-7xl mx-auto">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//         className="text-center mb-16"
//       >
//         <h2 className="text-4xl font-bold gradient-text mb-4">Internal Tools</h2>
//         <p className="text-white/60 text-lg">Core enterprise applications and utilities</p>
//       </motion.div>
      
//       <div className="flex flex-wrap justify-center items-stretch gap-8">
//         {internalTools.map((tool, index) => {
//           const Icon = tool.icon;
//           const colors = colorClasses[tool.color as keyof typeof colorClasses];
          
//           return (
//             <motion.div
//               key={tool.name}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className="scale-in flex-1 min-w-[280px] max-w-[320px] flex"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <a href={tool.href} className="block w-full h-full">
//                 <div className="glass-card rounded-2xl p-6 tool-card h-full flex flex-col">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className={`p-3 ${colors.bg} rounded-xl`}>
//                       <Icon className={`w-8 h-8 ${colors.icon}`} />
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
//                       <span className="text-xs text-green-400 font-medium">ACTIVE</span>
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
//                   <p className="text-white/60 text-sm mb-6 flex-grow">{tool.description}</p>
//                   {/* <button className={`w-full bg-gradient-to-r ${colors.button} text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 mt-auto`}>
//                     Launch Tool
//                   </button> */}
                  
//                   <button className={`w-full bg-gradient-to-r ${colors.button} hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 mt-auto`}>
//                      Launch Tool
//                   </button>
                
//                 </div>
//               </a>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   </section>
// );
// }


// "use client";

// import { motion } from "framer-motion";
// import { Shield, Server, Database, Grid3x3 } from "lucide-react";
// import { useTheme } from 'next-themes';
// import { useEffect, useState } from "react";

// const internalTools = [
//   {
//     name: "JWT Utility",
//     description: "Encode, decode & verify JWT tokens",
//     href: "/tools/jwt",
//     icon: Shield,
//     color: "blue",
//     status: "active"
//   },
//   {
//     name: "Server Monitor",
//     description: "Real-time server health & metrics",
//     href: "/tools/servers",
//     icon: Server,
//     color: "green",
//     status: "active"
//   },
//   {
//     name: "CRAFT",
//     description: "Central application repository & tracking",
//     href: "/tools/caart",
//     icon: Database,
//     color: "purple",
//     status: "active"
//   },
//   {
//     name: "Env Matrix",
//     description: "Environment configuration matrix",
//     href: "/tools/env-matrix",
//     icon: Grid3x3,
//     color: "orange",
//     status: "active"
//   },
// ];

// const colorClasses = {
//   blue: {
//     icon: "text-blue-400",
//     bg: "bg-blue-500/20",
//     button: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
//   },
//   green: {
//     icon: "text-green-400",
//     bg: "bg-green-500/20", 
//     button: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
//   },
//   purple: {
//     icon: "text-purple-400",
//     bg: "bg-purple-500/20",
//     button: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
//   },
//   orange: {
//     icon: "text-orange-400",
//     bg: "bg-orange-500/20",
//     button: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
//   }
// };

// export function InternalToolsGrid() {
//   const [mounted, setMounted] = useState(false);
//   const { theme } = useTheme();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const isDark = theme === 'dark';

//   return (
//     <section className="pt-10 pb-15 px-6">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className={`text-4xl font-bold mb-4 ${
//             isDark ? 'gradient-text' : 'text-blue-900'
//           }`}>Internal Tools</h2>
//           <p className={`text-lg ${
//             isDark ? 'text-white/60' : 'text-blue-700'
//           }`}>Core enterprise applications and utilities</p>
//         </motion.div>
        
//         <div className="flex flex-wrap justify-center items-stretch gap-8">
//           {internalTools.map((tool, index) => {
//             const Icon = tool.icon;
//             const colors = colorClasses[tool.color as keyof typeof colorClasses];
            
//             return (
//               <motion.div
//                 key={tool.name}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="scale-in flex-1 min-w-[280px] max-w-[320px] flex"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <a href={tool.href} className="block w-full h-full">
//                   <div className={`rounded-2xl p-6 tool-card h-full flex flex-col ${
//                     isDark 
//                       ? 'glass-card' 
//                       : 'bg-white shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-200'
//                   }`}>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className={`p-3 ${colors.bg} rounded-xl`}>
//                         <Icon className={`w-8 h-8 ${colors.icon}`} />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
//                         <span className="text-xs text-green-400 font-medium">ACTIVE</span>
//                       </div>
//                     </div>
//                     <h3 className={`text-xl font-bold mb-2 ${
//                       isDark ? 'text-white' : 'text-blue-900'
//                     }`}>{tool.name}</h3>
//                     <p className={`text-sm mb-6 flex-grow ${
//                       isDark ? 'text-white/60' : 'text-blue-700/80'
//                     }`}>{tool.description}</p>
                    
//                     <button className={`w-full bg-gradient-to-r ${colors.button} text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 mt-auto`}>
//                        Launch Tool
//                     </button>
//                   </div>
//                 </a>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }










// "use client";

// import { motion } from "framer-motion";
// import { Shield, Server, Database, Grid3x3 } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useState, useEffect } from "react";

// const internalTools = [
//   {
//     name: "JWT Utility",
//     description: "Encode, decode & verify JWT tokens",
//     href: "/tools/jwt",
//     icon: Shield,
//     color: "blue",
//     status: "active"
//   },
//   {
//     name: "Server Monitor",
//     description: "Real-time server health & metrics",
//     href: "/tools/servers",
//     icon: Server,
//     color: "green",
//     status: "active"
//   },
//   {
//     name: "CRAFT",
//     description: "Central application repository & tracking",
//     href: "/tools/caart",
//     icon: Database,
//     color: "purple",
//     status: "active"
//   },
//   {
//     name: "Env Matrix",
//     description: "Environment configuration matrix",
//     href: "/tools/env-matrix",
//     icon: Grid3x3,
//     color: "orange",
//     status: "active"
//   },
// ];

// const colorClasses = {
//   blue: {
//     icon: "text-blue-400",
//     bg: "bg-blue-500/20",
//     button: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
//   },
//   green: {
//     icon: "text-green-400",
//     bg: "bg-green-500/20", 
//     button: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
//   },
//   purple: {
//     icon: "text-purple-400",
//     bg: "bg-purple-500/20",
//     button: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
//   },
//   orange: {
//     icon: "text-orange-400",
//     bg: "bg-orange-500/20",
//     button: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
//   }
// };

// export function InternalToolsGrid() {
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const isDark = theme === "dark";

//   return (
//     <section className="pt-10 pb-15 px-6">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className={`text-4xl font-bold mb-4 ${
//             isDark ? "text-white" : "text-blue-900"
//           }`}>
//             Internal Tools
//           </h2>
//           <p className={`text-lg ${
//             isDark ? "text-slate-400" : "text-blue-700"
//           }`}>
//             Core enterprise applications and utilities
//           </p>
//         </motion.div>
        
//         <div className="flex flex-wrap justify-center items-stretch gap-8">
//           {internalTools.map((tool, index) => {
//             const Icon = tool.icon;
//             const colors = colorClasses[tool.color as keyof typeof colorClasses];
            
//             return (
//               <motion.div
//                 key={tool.name}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="scale-in flex-1 min-w-[280px] max-w-[320px] flex"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <a href={tool.href} className="block w-full h-full">
//                   <div className={`rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ${
//                     isDark
//                       ? "bg-slate-800/50 backdrop-blur-lg border-2 border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600"
//                       : "bg-white border-2 border-blue-300/50 shadow-md hover:shadow-xl hover:border-blue-400"
//                   }`}>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className={`p-3 ${colors.bg} rounded-xl`}>
//                         <Icon className={`w-8 h-8 ${colors.icon}`} />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
//                         <span className="text-xs text-green-400 font-medium">ACTIVE</span>
//                       </div>
//                     </div>
//                     <h3 className={`text-xl font-bold mb-2 ${
//                       isDark ? "text-white" : "text-blue-900"
//                     }`}>
//                       {tool.name}
//                     </h3>
//                     <p className={`text-sm mb-6 flex-grow ${
//                       isDark ? "text-slate-400" : "text-gray-600"
//                     }`}>
//                       {tool.description}
//                     </p>
//                     <button className={`w-full bg-gradient-to-r ${colors.button} text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 mt-auto`}>
//                       Launch Tool
//                     </button>
//                   </div>
//                 </a>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }






"use client";

import { motion } from "framer-motion";
import { Shield, Server, Database, Grid3x3 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const internalTools = [
  {
    name: "JWT Utility",
    description: "Encode, decode & verify JWT tokens",
    href: "/tools/jwt",
    icon: Shield,
    color: "blue",
    status: "active"
  },
  {
    name: "Server Monitor",
    description: "Real-time server health & metrics",
    href: "/tools/servers",
    icon: Server,
    color: "green",
    status: "active"
  },
  {
    name: "CRAFT",
    description: "Central application repository & tracking",
    href: "/tools/caart",
    icon: Database,
    color: "purple",
    status: "active"
  },
  {
    name: "Env Matrix",
    description: "Environment configuration matrix",
    href: "/tools/env-matrix",
    icon: Grid3x3,
    color: "orange",
    status: "active"
  },
  {
    name: "PRR Tool",
    description: "Environment configuration matrix",
    href: "/tools/prr",
    icon: Grid3x3,
    color: "orange",
    status: "active"
  },
  {
    name: "Base64 Utility",
    description: "Environment configuration matrix",
    href: "/tools/base64",
    icon: Grid3x3,
    color: "orange",
    status: "active"
  }
];

const colorClasses = {
  blue: {
    icon: "text-blue-400",
    bg: "bg-blue-500/20"
  },
  green: {
    icon: "text-green-400",
    bg: "bg-green-500/20"
  },
  purple: {
    icon: "text-purple-400",
    bg: "bg-purple-500/20"
  },
  orange: {
    icon: "text-orange-400",
    bg: "bg-orange-500/20"
  }
};

export function InternalToolsGrid() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  console.log("Current theme:", theme, "isDark:", isDark);


  return (
    <section className="pt-10 pb-15 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-slate-100' : 'text-slate-800'
          }`}>
            Internal Tools
          </h2>
          <p className={`text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-700'
          }`}>
            Core enterprise applications and utilities
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {internalTools.map((tool, index) => {
            const Icon = tool.icon;
            const colors = colorClasses[tool.color as keyof typeof colorClasses];
            
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="scale-in flex-1 min-w-[280px] max-w-[320px] flex"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a href={tool.href} className="block w-full h-full">
                  <div className={`rounded-2xl p-6 tool-card h-full flex flex-col transition-all ${
                    isDark 
                      ? 'glass-card' 
                      : 'bg-white/80 backdrop-blur-sm shadow-lg border border-teal-200/50 hover:shadow-xl hover:border-teal-300'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 ${colors.bg} rounded-xl`}>
                        <Icon className={`w-8 h-8 ${colors.icon}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
                        <span className="text-xs text-green-500 font-medium">ACTIVE</span>
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDark ? 'text-slate-100' : 'text-slate-800'
                    }`}>
                      {tool.name}
                    </h3>
                    <p className={`text-sm mb-6 flex-grow ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {tool.description}
                    </p>
                    <button className={`w-full py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 mt-auto shadow-lg ${
                       isDark
                         ? 'bg-slate-700 hover:bg-slate-600 text-white'
                         : 'bg-[#547792] hover:bg-[#436681] text-white'
                    }`}>
                      Launch Tool
                    </button>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { Shield, Server, Database, Grid3x3 } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

// const internalTools = [
//   {
//     name: "JWT Utility",
//     description: "Encode, decode & verify JWT tokens",
//     href: "/tools/jwt",
//     icon: Shield,
//     color: "blue",
//     status: "active"
//   },
//   {
//     name: "Server Monitor",
//     description: "Real-time server health & metrics",
//     href: "/tools/servers",
//     icon: Server,
//     color: "green",
//     status: "configure"
//   },
//   {
//     name: "CRAFT",
//     description: "Central application repository & tracking",
//     href: "/tools/caart",
//     icon: Database,
//     color: "purple",
//     status: "configure"
//   },
//   {
//     name: "Env Matrix",
//     description: "Environment configuration matrix",
//     href: "/tools/env-matrix",
//     icon: Grid3x3,
//     color: "orange",
//     status: "configure"
//   },
// ];

// const colorClasses = {
//   blue: {
//     icon: "text-blue-400",
//     bg: "bg-blue-500/20"
//   },
//   green: {
//     icon: "text-green-400",
//     bg: "bg-green-500/20"
//   },
//   purple: {
//     icon: "text-purple-400",
//     bg: "bg-purple-500/20"
//   },
//   orange: {
//     icon: "text-orange-400",
//     bg: "bg-orange-500/20"
//   }
// };

// export function InternalToolsGrid() {
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const isDark = theme === "dark";
//   console.log("Current theme:", theme, "isDark:", isDark);

//   return (
//     <section className="pt-8 lg:pt-10 pb-15 px-6">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className={`text-4xl font-bold mb-4 ${
//             isDark ? 'text-slate-100' : 'text-slate-800'
//           }`}>
//             Internal Tools
//           </h2>
//           <p className={`text-lg ${
//             isDark ? 'text-slate-400' : 'text-slate-700'
//           }`}>
//             Core enterprise applications and utilities
//           </p>
//         </motion.div>
        
//         {/* Desktop/Tablet View - Original Cards */}
//         <div className="hidden md:flex flex-wrap justify-center items-stretch gap-8">
//           {internalTools.map((tool, index) => {
//             const Icon = tool.icon;
//             const colors = colorClasses[tool.color as keyof typeof colorClasses];
//             const isActive = tool.status === "active";
            
//             return (
//               <motion.div
//                 key={tool.name}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="scale-in flex-1 min-w-[280px] max-w-[320px] flex"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 {isActive ? (
//                   <a href={tool.href} className="block w-full h-full">
//                     <div className={`rounded-2xl p-6 tool-card h-full flex flex-col transition-all ${
//                       isDark 
//                         ? 'glass-card' 
//                         : 'bg-white/80 backdrop-blur-sm shadow-lg border border-teal-200/50 hover:shadow-xl hover:border-teal-300'
//                     }`}>
//                       <div className="flex items-center justify-between mb-4">
//                         <div className={`p-3 ${colors.bg} rounded-xl`}>
//                           <Icon className={`w-8 h-8 ${colors.icon}`} />
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
//                           <span className="text-xs text-green-500 font-medium">ACTIVE</span>
//                         </div>
//                       </div>
//                       <h3 className={`text-xl font-bold mb-2 ${
//                         isDark ? 'text-slate-100' : 'text-slate-800'
//                       }`}>
//                         {tool.name}
//                       </h3>
//                       <p className={`text-sm mb-6 flex-grow ${
//                         isDark ? 'text-slate-400' : 'text-slate-600'
//                       }`}>
//                         {tool.description}
//                       </p>
//                       <button className={`w-full py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 mt-auto shadow-lg ${
//                          isDark
//                            ? 'bg-slate-700 hover:bg-slate-600 text-white'
//                            : 'bg-[#5A9690] hover:bg-[#49857F] text-white'
//                       }`}>
//                         Launch Tool
//                       </button>
//                     </div>
//                   </a>
//                 ) : (
//                   <div className={`rounded-2xl p-6 tool-card h-full flex flex-col transition-all ${
//                     isDark 
//                       ? 'glass-card' 
//                       : 'bg-white/80 backdrop-blur-sm shadow-lg border border-teal-200/50'
//                   }`}>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className={`p-3 ${colors.bg} rounded-xl`}>
//                         <Icon className={`w-8 h-8 ${colors.icon}`} />
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-red-400 rounded-full"></div>
//                         <span className="text-xs text-red-500 font-medium">CONFIGURE</span>
//                       </div>
//                     </div>
//                     <h3 className={`text-xl font-bold mb-2 ${
//                       isDark ? 'text-slate-100' : 'text-slate-800'
//                     }`}>
//                       {tool.name}
//                     </h3>
//                     <p className={`text-sm mb-6 flex-grow ${
//                       isDark ? 'text-slate-400' : 'text-slate-600'
//                     }`}>
//                       {tool.description}
//                     </p>
//                     <button 
//                       disabled 
//                       className={`w-full py-3 rounded-xl font-medium mt-auto shadow-md cursor-not-allowed ${
//                          isDark
//                            ? 'bg-slate-700/50 text-slate-400'
//                            : 'bg-slate-400/40 text-slate-600'
//                       }`}
//                     >
//                       Launch Tool
//                     </button>
//                   </div>
//                 )}
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Mobile View - Compact Grid with Smaller Icons */}
//         <div className="grid grid-cols-2 gap-4 md:hidden">
//           {internalTools.map((tool, index) => {
//             const Icon = tool.icon;
//             const colors = colorClasses[tool.color as keyof typeof colorClasses];
//             const isActive = tool.status === "active";
            
//             return (
//               <motion.div
//                 key={tool.name}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className={`rounded-xl p-4 text-center transition-all h-full flex flex-col ${
//                   isDark 
//                     ? 'glass-card'
//                     : 'bg-white/80 backdrop-blur-sm shadow-md border border-teal-200/50'
//                 }`}>
//                   <div className="flex items-center justify-center mb-2">
//                     <div className={`p-3 ${colors.bg} rounded-lg inline-block`}>
//                       <Icon className={`w-7 h-7 ${colors.icon}`} />
//                     </div>
//                     <div className={`ml-2 w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-300'}`}></div>
//                   </div>
//                   <h3 className={`text-xs font-bold mb-3 min-h-[32px] flex items-center justify-center ${
//                     isDark ? 'text-slate-100' : 'text-slate-800'
//                   }`}>
//                     {tool.name}
//                   </h3>
//                   {isActive ? (
//                     <a href={tool.href} className="mt-auto">
//                       <button className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 transform active:scale-95 shadow-md ${
//                         isDark
//                           ? 'bg-slate-700 hover:bg-slate-600 text-white'
//                           : 'bg-[#5A9690] hover:bg-[#49857F] text-white'
//                       }`}>
//                         Launch Tool
//                       </button>
//                     </a>
//                   ) : (
//                     <button 
//                       disabled 
//                       className={`w-full py-2 px-3 rounded-lg text-xs font-medium mt-auto cursor-not-allowed shadow-md ${
//                         isDark
//                           ? 'bg-slate-700/50 text-slate-400'
//                           : 'bg-slate-400/40 text-slate-600'
//                       }`}
//                     >
//                       Launch Tool
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }