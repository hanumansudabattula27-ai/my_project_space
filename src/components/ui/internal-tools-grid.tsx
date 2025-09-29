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


"use client";

import { motion } from "framer-motion";
import { Shield, Server, Database, Grid3x3 } from "lucide-react";
import { useTheme } from 'next-themes';
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
];

const colorClasses = {
  blue: {
    icon: "text-blue-400",
    bg: "bg-blue-500/20",
    button: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
  },
  green: {
    icon: "text-green-400",
    bg: "bg-green-500/20", 
    button: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
  },
  purple: {
    icon: "text-purple-400",
    bg: "bg-purple-500/20",
    button: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
  },
  orange: {
    icon: "text-orange-400",
    bg: "bg-orange-500/20",
    button: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
  }
};

export function InternalToolsGrid() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

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
            isDark ? 'gradient-text' : 'text-blue-900'
          }`}>Internal Tools</h2>
          <p className={`text-lg ${
            isDark ? 'text-white/60' : 'text-blue-700'
          }`}>Core enterprise applications and utilities</p>
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
                  <div className={`rounded-2xl p-6 tool-card h-full flex flex-col ${
                    isDark 
                      ? 'glass-card' 
                      : 'bg-white shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 ${colors.bg} rounded-xl`}>
                        <Icon className={`w-8 h-8 ${colors.icon}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
                        <span className="text-xs text-green-400 font-medium">ACTIVE</span>
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-blue-900'
                    }`}>{tool.name}</h3>
                    <p className={`text-sm mb-6 flex-grow ${
                      isDark ? 'text-white/60' : 'text-blue-700/80'
                    }`}>{tool.description}</p>
                    
                    <button className={`w-full bg-gradient-to-r ${colors.button} text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 mt-auto`}>
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