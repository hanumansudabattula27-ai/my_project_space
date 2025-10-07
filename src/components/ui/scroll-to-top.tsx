// // src/components/ui/scroll-to-top.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowUp } from "lucide-react";

// export function ScrollToTop() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility, { passive: true });
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.button
//           initial={{ opacity: 0, scale: 0.8, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.8, y: 20 }}
//           whileHover={{ scale: 1.1, y: -2 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/10"
//           aria-label="Scroll to top"
//         >
//           <ArrowUp size={20} />
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// }










// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowUp } from "lucide-react";
// import { useTheme } from "next-themes";

// export function ScrollToTop() {
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 300) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility, { passive: true });
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   if (!mounted) return null;

//   const isDark = theme === "dark";

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.button
//           initial={{ opacity: 0, scale: 0.8, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.8, y: 20 }}
//           whileHover={{ scale: 1.1, y: -2 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={scrollToTop}
//           className={`fixed bottom-8 right-8 z-50 p-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm ${
//             isDark
//               ? "bg-blue-600 hover:bg-blue-700 border border-white/10"
//               : "bg-blue-500 hover:bg-blue-600 border border-blue-300"
//           }`}
//           aria-label="Scroll to top"
//         >
//           <ArrowUp size={20} />
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";

export function ScrollToTop() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-[#6366f1] to-[#10b981] hover:from-[#4f46e5] hover:to-[#059669] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}