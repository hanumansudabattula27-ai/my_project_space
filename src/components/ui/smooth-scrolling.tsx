"use client";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        async function initLenis() {
            // Dynamically import Lenis to avoid SSR issues
            const Lenis = (await import('lenis')).default;
            
            // Initialize Lenis with modern configuration
            lenisRef.current = new Lenis({
                lerp: 0.1,           // Lower = smoother (0.1 is very smooth)
                duration: 1.2,       // Duration of scroll animations
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,  // Disable on touch devices for better performance
                touchMultiplier: 2,
                infinite: false,
            });

            // RAF loop for smooth scrolling
            function raf(time: number) {
                lenisRef.current?.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);

            // Handle anchor links with smooth scrolling
            const handleAnchorClick = (e: Event) => {
                const target = e.target as HTMLElement;
                if (target.tagName === 'A') {
                    const href = target.getAttribute('href');
                    if (href?.startsWith('#')) {
                        e.preventDefault();
                        const element = document.querySelector(href);
                        if (element) {
                            lenisRef.current?.scrollTo(element, {
                                offset: -80,  // Offset for fixed headers
                                duration: 1.5,
                                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                            });
                        }
                    }
                }
            };

            // Add click listener for anchor links
            document.addEventListener('click', handleAnchorClick);

            // Handle scroll to hash on page load
            if (window.location.hash) {
                setTimeout(() => {
                    const element = document.querySelector(window.location.hash);
                    if (element) {
                        lenisRef.current?.scrollTo(element, {
                            offset: -80,
                            duration: 1.5,
                            immediate: false,
                        });
                    }
                }, 100);
            }

            return () => {
                document.removeEventListener('click', handleAnchorClick);
            };
        }

        initLenis();

        // Cleanup function
        return () => {
            lenisRef.current?.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}