'use client'

import React, { useEffect, useRef, ReactNode } from 'react'
import { useLenisContext } from '@/components/scrolling/lenisprovider'

interface ScrollTriggerProps {
  children: ReactNode
  onEnter?: () => void
  onLeave?: () => void
  threshold?: number
  rootMargin?: string
  className?: string
}

export const ScrollTrigger: React.FC<ScrollTriggerProps> = ({
  children,
  onEnter,
  onLeave,
  threshold = 0.1,
  rootMargin = '0px',
  className,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const { lenis } = useLenisContext()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onEnter?.()
          } else {
            onLeave?.()
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [onEnter, onLeave, threshold, rootMargin])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
