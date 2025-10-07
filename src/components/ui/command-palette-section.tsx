// // src/components/ui/command-palette-section.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Command } from "lucide-react";

// export function CommandPaletteSection() {
//   return (
//     <section className="py-20 px-6">
//       <div className="max-w-4xl mx-auto text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="glass-card rounded-2xl p-12 scale-in"
//         >
//           <div className="inline-flex p-4 bg-blue-500/20 rounded-2xl mb-6 pulse-glow">
//             <Command className="w-8 h-8 text-blue-400" />
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-4">Global Command Palette</h2>
//           <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
//             Press{" "}
//             <kbd className="bg-black/30 px-3 py-1 rounded text-blue-300 font-mono">⌘K</kbd>{" "}
//             to quickly navigate between tools and external services
//           </p>
//           <div className="flex items-center justify-center gap-8 text-sm text-white/50">
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//               Instant search
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//               Quick launch
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
//               Keyboard shortcuts
//             </div>
//           </div>
//         </motion.div>

//         {/* System Status */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="mt-8 flex items-center justify-center gap-2 text-white/40 scale-in"
//           style={{ animationDelay: "0.2s" }}
//         >
//           <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
//           <span className="text-sm">System operational • All services running</span>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { motion } from "framer-motion";
// import { Command } from "lucide-react";
// import { useTheme } from 'next-themes';
// import { useEffect, useState } from "react";

// export function CommandPaletteSection() {
//   const [mounted, setMounted] = useState(false);
//   const { theme } = useTheme();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const isDark = theme === 'dark';

//   return (
//     <section className="py-20 px-6">
//       <div className="max-w-4xl mx-auto text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className={`rounded-2xl p-12 scale-in ${
//             isDark 
//               ? 'glass-card' 
//               : 'bg-white shadow-xl border border-blue-100'
//           }`}
//         >
//           <div className={`inline-flex p-4 rounded-2xl mb-6 ${
//             isDark ? 'bg-blue-500/20 pulse-glow' : 'bg-blue-100'
//           }`}>
//             <Command className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
//           </div>
//           <h2 className={`text-3xl font-bold mb-4 ${
//             isDark ? 'text-white' : 'text-blue-900'
//           }`}>Global Command Palette</h2>
//           <p className={`text-lg mb-8 max-w-2xl mx-auto ${
//             isDark ? 'text-white/60' : 'text-blue-700'
//           }`}>
//             Press{" "}
//             <kbd className={`px-3 py-1 rounded font-mono ${
//               isDark ? 'bg-black/30 text-blue-300' : 'bg-blue-100 text-blue-700'
//             }`}>⌘K</kbd>{" "}
//             to quickly navigate between tools and external services
//           </p>
//           <div className={`flex items-center justify-center gap-8 text-sm ${
//             isDark ? 'text-white/50' : 'text-blue-600'
//           }`}>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//               Instant search
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//               Quick launch
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
//               Keyboard shortcuts
//             </div>
//           </div>
//         </motion.div>

//         {/* System Status */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//           className={`mt-8 flex items-center justify-center gap-2 scale-in ${
//             isDark ? 'text-white/40' : 'text-blue-600/60'
//           }`}
//           style={{ animationDelay: "0.2s" }}
//         >
//           <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
//           <span className="text-sm">System operational • All services running</span>
//         </motion.div>
//       </div>
//     </section>
//   );
// }



// "use client";

// import { motion } from "framer-motion";
// import { Command } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useState, useEffect } from "react";

// export function CommandPaletteSection() {
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const isDark = theme === "dark";

//   return (
//     <section className="py-20 px-6">
//       <div className="max-w-4xl mx-auto text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className={`rounded-2xl p-12 scale-in backdrop-blur-xl ${
//             isDark 
//               ? "bg-slate-800/50 border border-slate-700" 
//               : "bg-white/70 border border-blue-200 shadow-lg"
//           }`}
//         >
//           <div className={`inline-flex p-4 rounded-2xl mb-6 pulse-glow ${
//             isDark ? "bg-blue-500/20" : "bg-blue-500/20"
//           }`}>
//             <Command className={`w-8 h-8 ${
//               isDark ? "text-blue-400" : "text-blue-600"
//             }`} />
//           </div>
//           <h2 className={`text-3xl font-bold mb-4 ${
//             isDark ? "text-slate-100" : "text-blue-900"
//           }`}>
//             Global Command Palette
//           </h2>
//           <p className={`text-lg mb-8 max-w-2xl mx-auto ${
//             isDark ? "text-slate-400" : "text-blue-700"
//           }`}>
//             Press{" "}
//             <kbd className={`px-3 py-1 rounded font-mono border ${
//               isDark 
//                 ? "bg-black/30 text-blue-300 border-slate-600" 
//                 : "bg-blue-100 text-blue-700 border-blue-300"
//             }`}>
//               ⌘K
//             </kbd>{" "}
//             to quickly navigate between tools and external services
//           </p>
//           <div className={`flex items-center justify-center gap-8 text-sm ${
//             isDark ? "text-slate-500" : "text-blue-600"
//           }`}>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//               Instant search
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//               Quick launch
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
//               Keyboard shortcuts
//             </div>
//           </div>
//         </motion.div>

//         {/* System Status */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//           className={`mt-8 flex items-center justify-center gap-2 scale-in ${
//             isDark ? "text-slate-500" : "text-blue-600"
//           }`}
//           style={{ animationDelay: "0.2s" }}
//         >
//           <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
//           <span className="text-sm">System operational • All services running</span>
//         </motion.div>
//       </div>
//     </section>
//   );
// }




"use client";

import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function CommandPaletteSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`rounded-2xl p-12 scale-in backdrop-blur-xl ${
            isDark 
              ? "bg-slate-800/50 border border-slate-700" 
              : "bg-white/70 border border-teal-200 shadow-lg"
          }`}
        >
          <div className={`inline-flex p-4 rounded-2xl mb-6 pulse-glow ${
            isDark ? "bg-indigo-500/20" : "bg-teal-500/20"
          }`}>
            <Command className={`w-8 h-8 ${
              isDark ? "text-indigo-400" : "text-teal-600"
            }`} />
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}>
            Global Command Palette
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDark ? "text-slate-400" : "text-slate-700"
          }`}>
            Press{" "}
            <kbd className={`px-3 py-1 rounded font-mono border ${
              isDark 
                ? "bg-black/30 text-indigo-300 border-slate-600" 
                : "bg-teal-100 text-teal-700 border-teal-300"
            }`}>
              ⌘K
            </kbd>{" "}
            to quickly navigate between tools and external services
          </p>
          <div className={`flex items-center justify-center gap-8 text-sm ${
            isDark ? "text-slate-500" : "text-slate-600"
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              Instant search
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Quick launch
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Keyboard shortcuts
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={`mt-8 flex items-center justify-center gap-2 scale-in ${
            isDark ? "text-slate-500" : "text-slate-600"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full status-active"></div>
          <span className="text-sm">System operational • All services running</span>
        </motion.div>
      </div>
    </section>
  );
}