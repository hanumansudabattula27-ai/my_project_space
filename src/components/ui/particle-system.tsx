// src/components/ui/particle-system.tsx
"use client";

import { useEffect } from "react";

export function ParticleSystem() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.width = Math.random() * 6 + 2 + 'px';
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
    
    // Create particles periodically
    const interval = setInterval(createParticle, 500);
    
    // Initial particles
    for (let i = 0; i < 10; i++) {
      setTimeout(createParticle, i * 100);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div id="particles" className="fixed inset-0 pointer-events-none z-0"></div>;
}