"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  // Theme configurations for easy access
  currentTheme: {
    light: LightTheme;
    dark: DarkTheme;
  };
}

// Define theme types for consistency across components
interface LightTheme {
  // Ocean Blue Light Theme
  background: string;
  containerBg: string;
  cardBg: string;
  cardHover: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  gradientText: string;
  buttonPrimary: string;
  buttonSecondary: string;
  buttonDanger: string;
  activeTab: string;
  inactiveTab: string;
  input: string;
  navBg: string;
  navTransparent: string;
  logoGradient: string;
  titleGradient: string;
  toggleBg: string;
  toggleText: string;
  status: {
    success: string;
    error: string;
    warning: string;
    successDot: string;
    errorDot: string;
  };
}

interface DarkTheme {
  // Professional Slate Dark Theme
  background: string;
  containerBg: string;
  cardBg: string;
  cardHover: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  gradientText: string;
  buttonPrimary: string;
  buttonSecondary: string;
  buttonDanger: string;
  activeTab: string;
  inactiveTab: string;
  input: string;
  navBg: string;
  navTransparent: string;
  logoGradient: string;
  titleGradient: string;
  toggleBg: string;
  toggleText: string;
  status: {
    success: string;
    error: string;
    warning: string;
    successDot: string;
    errorDot: string;
  };
}

const lightTheme: LightTheme = {
  // Ocean Blue theme - Consistent background for all sections
  background: 'bg-gradient-to-br from-blue-50 to-blue-100',
  containerBg: 'bg-white/80 backdrop-blur-xl border-blue-200',
  cardBg: 'bg-white border-blue-200 shadow-lg',
  cardHover: 'hover:shadow-xl hover:border-blue-300',
  text: 'text-blue-900',
  textSecondary: 'text-blue-600',
  textMuted: 'text-blue-500',
  accent: 'bg-blue-600',
  accentHover: 'hover:bg-blue-700',
  gradientText: 'bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent',
  buttonPrimary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
  buttonSecondary: 'bg-blue-100 hover:bg-blue-200 text-blue-700',
  buttonDanger: 'bg-red-100 hover:bg-red-200 text-red-700',
  activeTab: 'border-blue-500 bg-blue-100 text-blue-900',
  inactiveTab: 'border-transparent hover:bg-blue-50 text-blue-600 hover:text-blue-900',
  input: 'bg-blue-50 border-blue-200 text-blue-900 placeholder-blue-400 focus:ring-blue-400 focus:border-blue-400',
  navBg: 'bg-blue-600/95 backdrop-blur-md',
  navTransparent: 'bg-white/10 backdrop-blur-sm',
  logoGradient: 'from-blue-400 via-blue-500 to-blue-600',
  titleGradient: 'from-white via-blue-100 to-blue-200',
  toggleBg: 'bg-white/20 hover:bg-white/30',
  toggleText: 'text-blue-100',
  status: {
    success: 'text-green-600 bg-green-100',
    error: 'text-red-600 bg-red-100',
    warning: 'text-yellow-600 bg-yellow-100',
    successDot: 'bg-green-500',
    errorDot: 'bg-red-500'
  }
};

const darkTheme: DarkTheme = {
  // Professional Slate theme
  background: 'bg-slate-900',
  containerBg: 'bg-slate-800/80 backdrop-blur-xl border-slate-700',
  cardBg: 'bg-slate-800 border-slate-700',
  cardHover: 'hover:bg-slate-700/50 hover:border-slate-600',
  text: 'text-slate-100',
  textSecondary: 'text-slate-300',
  textMuted: 'text-slate-400',
  accent: 'bg-blue-600',
  accentHover: 'hover:bg-blue-700',
  gradientText: 'bg-gradient-to-r from-slate-100 to-blue-200 bg-clip-text text-transparent',
  buttonPrimary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white',
  buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-300',
  buttonDanger: 'bg-red-900/50 hover:bg-red-800/50 text-red-400',
  activeTab: 'border-blue-500 bg-blue-500/10 text-slate-100',
  inactiveTab: 'border-transparent hover:bg-slate-700/50 text-slate-400 hover:text-slate-200',
  input: 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-blue-400 focus:border-blue-400',
  navBg: 'bg-slate-800/95 backdrop-blur-md',
  navTransparent: 'bg-slate-900/30 backdrop-blur-sm',
  logoGradient: 'from-blue-400 via-blue-500 to-blue-600',
  titleGradient: 'from-slate-100 via-slate-200 to-blue-200',
  toggleBg: 'bg-slate-700 hover:bg-slate-600',
  toggleText: 'text-slate-300',
  status: {
    success: 'text-green-400 bg-green-900/30',
    error: 'text-red-400 bg-red-900/30',
    warning: 'text-yellow-400 bg-yellow-900/30',
    successDot: 'bg-green-400',
    errorDot: 'bg-red-400'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const currentTheme = {
    light: lightTheme,
    dark: darkTheme
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper hook to get current theme object
export const useCurrentTheme = () => {
  const { isDarkMode, currentTheme } = useTheme();
  return isDarkMode ? currentTheme.dark : currentTheme.light;
};