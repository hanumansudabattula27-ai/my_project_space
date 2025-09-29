'use client'
import React, { createContext, useContext, ReactNode } from 'react'
import { useLenis } from '@/components/scrolling/hook/uselenis'
import Lenis from '@studio-freight/lenis'

interface LenisContextType {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export const useLenisContext = () => {
  const context = useContext(LenisContext)
  if (!context) {
    throw new Error('useLenisContext must be used within a LenisProvider')
  }
  return context
}

interface LenisProviderProps {
  children: ReactNode
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const lenis = useLenis()

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  )
}
