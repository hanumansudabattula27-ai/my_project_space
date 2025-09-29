// // src/components/ui/hero.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export function Hero() {
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const words = ["Portal", "System", "Hub", "Platform"];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentWordIndex((prev) => (prev + 1) % words.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   const wordVariants = {
//     enter: {
//       opacity: 0,
//       scale: 0.8,
//       rotateX: -90,
//       y: 50,
//     },
//     center: {
//       opacity: 1,
//       scale: 1,
//       rotateX: 0,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//     exit: {
//       opacity: 0,
//       scale: 1.2,
//       rotateX: 90,
//       y: -50,
//       transition: {
//         duration: 0.4,
//         ease: [0.55, 0.06, 0.68, 0.19],
//       },
//     },
//   };

//   return (
//     <section className="relative mx-auto max-w-7xl px-6 pt-35 pb-20 text-center overflow-hidden">
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px]" />
      
//       {/* Floating elements */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 0.1, scale: 1 }}
//         transition={{ duration: 2, ease: "easeOut" }}
//         className="absolute top-20 left-1/4 w-32 h-32 border border-white/20 rounded-full"
//       />
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 0.05, scale: 1 }}
//         transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
//         className="absolute bottom-20 right-1/4 w-24 h-24 bg-white/10 rounded-lg rotate-12"
//       />

//       {/* Main content */}
//       <div className="relative z-10">
//         {/* Main heading */}
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.1 }}
//           className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
//         >
//           <span className="block text-white leading-none">
//             OneIdentity
//           </span>
//           <span className="block text-blue-300 leading-none min-h-[1.2em] flex items-center justify-center">
//             <AnimatePresence mode="wait">
//               <motion.span
//                 key={words[currentWordIndex]}
//                 variants={wordVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 className="inline-block"
//                 style={{ perspective: 1000 }}
//               >
//                 {words[currentWordIndex]}
//               </motion.span>
//             </AnimatePresence>
//           </span>
//         </motion.h1>

//         {/* Description */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//           className="mx-auto mt-8 max-w-2xl text-xl text-white/70 leading-relaxed"
//         >
//           Streamlined utilities, secure connections, and intelligent search —
//           <br />
//           <span className="text-white font-medium">built for professionals who demand excellence.</span>
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.8 }}
//           className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
//         >
//           {[
//             { label: "Security First", value: "Enterprise Grade" },
//             { label: "Response Time", value: "< 100ms" },
//             { label: "Uptime", value: "99.9%" }
//           ].map((stat, index) => (
//             <div key={stat.label} className="text-center">
//               <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
//               <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from 'next-themes';

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const words = ["Portal", "System", "Hub", "Platform"];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const wordVariants = {
    enter: {
      opacity: 0,
      scale: 0.8,
      rotateX: -90,
      y: 50,
    },
    center: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      rotateX: 90,
      y: -50,
      transition: {
        duration: 0.4,
        ease: [0.55, 0.06, 0.68, 0.19],
      },
    },
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-35 pb-20 text-center overflow-hidden">
      {/* Subtle background pattern */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:24px_24px] ${
        isDark ? 'opacity-100' : 'opacity-50'
      }`} />
      
      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isDark ? 0.1 : 0.2, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className={`absolute top-20 left-1/4 w-32 h-32 border rounded-full ${
          isDark ? 'border-white/20' : 'border-blue-400/30'
        }`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isDark ? 0.05 : 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className={`absolute bottom-20 right-1/4 w-24 h-24 rounded-lg rotate-12 ${
          isDark ? 'bg-white/10' : 'bg-blue-400/10'
        }`}
      />

      {/* Main content */}
      <div className="relative z-10">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
        >
          <span className={`block leading-none ${
            isDark ? 'text-white' : 'text-blue-900'
          }`}>
            OneIdentity
          </span>
          <span className={`block leading-none min-h-[1.2em] flex items-center justify-center ${
            isDark ? 'text-blue-300' : 'text-blue-600'
          }`}>
            <AnimatePresence mode="wait">
              <motion.span
                key={words[currentWordIndex]}
                variants={wordVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="inline-block"
                style={{ perspective: 1000 }}
              >
                {words[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`mx-auto mt-8 max-w-2xl text-xl leading-relaxed ${
            isDark ? 'text-white/70' : 'text-blue-800/80'
          }`}
        >
          Streamlined utilities, secure connections, and intelligent search —
          <br />
          <span className={`font-medium ${isDark ? 'text-white' : 'text-blue-900'}`}>
            built for professionals who demand excellence.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: "Security First", value: "Enterprise Grade" },
            { label: "Response Time", value: "< 100ms" },
            { label: "Uptime", value: "99.9%" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl font-bold mb-1 ${
                isDark ? 'text-white' : 'text-blue-900'
              }`}>{stat.value}</div>
              <div className={`text-sm uppercase tracking-wider ${
                isDark ? 'text-white/60' : 'text-blue-700/70'
              }`}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}