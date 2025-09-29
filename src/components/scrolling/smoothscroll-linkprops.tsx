'use client'

import React, { ReactNode } from 'react'
import { useLenisContext } from '@/components/scrolling/lenisprovider'

interface SmoothScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  offset?: number
  duration?: number
  onClick?: () => void
}

export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  href,
  children,
  className,
  offset = 0,
  duration,
  onClick,
}) => {
  const { lenis } = useLenisContext()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (onClick) {
      onClick()
    }

    if (lenis && href.startsWith('#')) {
      const target = document.querySelector(href)
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset
        lenis.scrollTo(targetPosition, {
          duration: duration,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      }
    } else if (lenis && href.startsWith('/')) {
      // Handle internal navigation
      window.location.href = href
    }
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
