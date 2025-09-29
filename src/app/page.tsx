// // src/app/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Hero } from "@/components/ui/hero";
// import { InternalToolsGrid } from "@/components/ui/internal-tools-grid";
// import { ToolsGrid } from "@/components/ui/tools-grid";
// import { CommandPaletteSection } from "@/components/ui/command-palette-section";
// import { ParticleSystem } from "@/components/ui/particle-system";
// import { ScrollToTop } from "@/components/ui/scroll-to-top";

// // Scroll Progress Indicator Component
// const ScrollProgress = () => {
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const updateScrollProgress = () => {
//       const scrollPx = document.documentElement.scrollTop;
//       const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//       const scrolled = (scrollPx / winHeightPx) * 100;
//       setScrollProgress(scrolled);
//     };

//     window.addEventListener('scroll', updateScrollProgress, { passive: true });
//     return () => window.removeEventListener('scroll', updateScrollProgress);
//   }, []);

//   return (
//     <div 
//       className="scroll-indicator"
//       style={{ transform: `scaleX(${scrollProgress / 100})` }}
//     />
//   );
// };

// export default function LandingPage() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
    
//     // Add scroll-based parallax effect
//     const handleScroll = () => {
//       const scrolled = window.pageYOffset;
//       const parallaxElements = document.querySelectorAll('.parallax');
      
//       parallaxElements.forEach((element) => {
//         const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
//         const yPos = -(scrolled * speed);
//         (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
//       });
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <>
//       {/* Scroll Progress Indicator */}
//       <ScrollProgress />
      
//       {/* Scroll to Top Button */}
//       <ScrollToTop />
      
//       <div className="command-center-bg min-h-screen text-white relative overflow-x-hidden">
//         {/* Animated Background Grid with Parallax */}
//         <div className="fixed inset-0 grid-bg opacity-30 parallax" data-speed="0.2"></div>
        
//         {/* Particle System */}
//         <ParticleSystem />

//         {/* Main Content */}
//         <div className="relative z-10">
//           {/* Hero Section */}
//           <section id="hero" className="scroll-snap-section">
//             <Hero />
//           </section>

//           {/* Internal Tools Section */}
//           <section id="internal-tools" className="scroll-snap-section">
//             <InternalToolsGrid />
//           </section>

//           {/* External Tools Section */}
//           <section id="external-tools" className="scroll-snap-section">
//             <ToolsGrid />
//           </section>

//           {/* Command Palette Info */}
//           <section id="command-palette" className="scroll-snap-section">
//             <CommandPaletteSection />
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/ui/hero";
import { InternalToolsGrid } from "@/components/ui/internal-tools-grid";
import { ToolsGrid } from "@/components/ui/tools-grid";
import { CommandPaletteSection } from "@/components/ui/command-palette-section";
import { ParticleSystem } from "@/components/ui/particle-system";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import NavWrapper from "@/components/home/navbar/navwrapper";
import { useTheme } from 'next-themes';

// Scroll Progress Indicator Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div 
      className={`scroll-indicator ${theme === 'dark' ? 'bg-blue-500' : 'bg-gradient-to-r from-blue-400 to-cyan-500'}`}
      style={{ transform: `scaleX(${scrollProgress / 100})` }}
    />
  );
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    // Add scroll-based parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Navigation */}
      <NavWrapper/>
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
      
      <div className={`min-h-screen relative overflow-x-hidden transition-all duration-500 ${
        theme === 'dark' 
          ? 'command-center-bg text-white' 
          : 'ocean-blue-bg text-slate-900'
      }`}>
        {/* Animated Background Grid with Parallax */}
        <div className={`fixed inset-0 grid-bg parallax ${
          theme === 'dark' ? 'opacity-30' : 'opacity-10'
        }`} data-speed="0.2"></div>
        
        {/* Particle System - only in dark mode */}
        {theme === 'dark' && <ParticleSystem />}

        {/* Main Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section id="hero" className="scroll-snap-section">
            <Hero />
          </section>

          {/* Internal Tools Section */}
          <section id="internal-tools" className="scroll-snap-section">
            <InternalToolsGrid />
          </section>

          {/* External Tools Section */}
          <section id="external-tools" className="scroll-snap-section">
            <ToolsGrid />
          </section>

          {/* Command Palette Info */}
          <section id="command-palette" className="scroll-snap-section">
            <CommandPaletteSection />
          </section>
        </div>
      </div>
    </>
  );
}