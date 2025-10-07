// // src/components/ui/particle-system.tsx
// "use client";

// import { useEffect } from "react";

// export function ParticleSystem() {
//   useEffect(() => {
//     const createParticle = () => {
//       const particle = document.createElement('div');
//       particle.className = 'particle';
//       particle.style.left = Math.random() * 100 + 'vw';
//       particle.style.width = Math.random() * 6 + 2 + 'px';
//       particle.style.height = particle.style.width;
//       particle.style.animationDelay = Math.random() * 2 + 's';
//       particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
//       const container = document.getElementById('particles');
//       if (container) {
//         container.appendChild(particle);
        
//         setTimeout(() => {
//           if (particle.parentNode) {
//             particle.remove();
//           }
//         }, 15000);
//       }
//     };
    
//     // Create particles periodically
//     const interval = setInterval(createParticle, 500);
    
//     // Initial particles
//     for (let i = 0; i < 10; i++) {
//       setTimeout(createParticle, i * 100);
//     }
    
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return <div id="particles" className="fixed inset-0 pointer-events-none z-0"></div>;
// }


"use client";

import { useEffect, useState } from "react";

interface ParticleSystemProps {
  isDark: boolean;
}

export function ParticleSystem({ isDark }: ParticleSystemProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const createParticle = () => {
      const particle = document.createElement('div');
      
      // Theme-specific styling
      if (isDark) {
        particle.className = 'particle particle-dark';
        particle.style.width = Math.random() * 6 + 2 + 'px';
      } else {
        particle.className = 'particle particle-light';
        // Larger and darker particles for light mode
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.background = `rgba(${Math.random() * 50 + 30}, ${Math.random() * 50 + 30}, ${Math.random() * 50 + 30}, ${Math.random() * 0.4 + 0.3})`;
      }
      
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      const container = document.getElementById('particles');
      if (container) {
        container.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
        }, 15000);
      }
    };
    
    const interval = setInterval(createParticle, 500);
    
    for (let i = 0; i < 10; i++) {
      setTimeout(createParticle, i * 100);
    }
    
    return () => {
      clearInterval(interval);
      const container = document.getElementById('particles');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [mounted, isDark]);

  if (!mounted) return null;

  return <div id="particles" className="fixed inset-0 pointer-events-none z-0"></div>;
}