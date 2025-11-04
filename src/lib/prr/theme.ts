// src/lib/prr/theme.ts - COMPLETE WITH MODAL PROPERTIES

export const prrTheme = {
  light: {
    // ============================================================
    // Background Colors
    // ============================================================
    background: {
      primary: 'bg-white',
      secondary: 'bg-gray-50',
      tertiary: 'bg-gray-100',
    },
    head: {
      background: 'bg-white',
    },

    // ============================================================
    // Cards & Surfaces
    // ============================================================
    card: {
      background: 'bg-white',
      border: 'border-gray-200',
      shadow: 'shadow-sm',
      hover: 'hover:border-gray-300 hover:shadow-md transition-all',
    },

    // ============================================================
    // Text
    // ============================================================
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      tertiary: 'text-gray-500',
      muted: 'text-gray-400',
      label: 'text-xs font-semibold text-gray-600 uppercase',
    },

    // ============================================================
    // Borders
    // ============================================================
    border: {
      primary: 'border-gray-200',
      secondary: 'border-gray-300',
      accent: 'border-teal-300',
    },

    // ============================================================
    // Buttons
    // ============================================================
    button: {
      primary: 'bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors',
      secondary: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold transition-all',
      ghost: 'text-teal-600 hover:bg-teal-50 font-medium transition-colors',
      danger: 'bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors',
      success: 'bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors',
    },

    // ============================================================
    // Modal - ADDED
    // ============================================================
    modal: {
      overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4',
      background: 'bg-white',
      border: 'border-gray-200',
    },

    // ============================================================
    // Input
    // ============================================================
    input: {
      background: 'bg-white',
      border: 'border-gray-300',
      text: 'text-gray-900',
      placeholder: 'placeholder-gray-500',
      focus: 'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
    },

    // ============================================================
    // Status Badges
    // ============================================================
    badge: {
      live: 'bg-green-100 text-green-800',
      nonLive: 'bg-gray-100 text-gray-800',
      inReview: 'bg-amber-100 text-amber-800',
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-orange-100 text-orange-800',
      error: 'bg-red-100 text-red-800',
    },

    // ============================================================
    // Platform Badges
    // ============================================================
    platformBadges: {
      hydra: 'bg-teal-100 text-teal-700',
      aws: 'bg-orange-100 text-orange-700',
      gcp: 'bg-blue-100 text-blue-700',
      tims: 'bg-purple-100 text-purple-700',
      'one-dato': 'bg-pink-100 text-pink-700',
    },

    // ============================================================
    // Progress Bar
    // ============================================================
    progressBar: {
      background: 'bg-gray-200',
      fill: 'bg-gradient-to-r from-teal-500 to-teal-600',
    },

    // ============================================================
    // Stats Cards
    // ============================================================
    stats: {
      live: 'bg-green-50 border-green-200',
      nonLive: 'bg-gray-100 border-gray-300',
      total: 'bg-blue-50 border-blue-200',
      inReview: 'bg-amber-50 border-amber-200',
    },

    // ============================================================
    // Info Cards
    // ============================================================
    infoCard: {
      background: 'bg-white',
      border: 'border-gray-200',
      text: 'text-gray-900',
      description: 'text-gray-600',
      hover: 'hover:shadow-md transition-all',
    },

    // ============================================================
    // Info Card Gradients
    // ============================================================
    infoCardGradients: {
      first: 'from-teal-500 to-teal-400',
      second: 'from-blue-500 to-blue-400',
      third: 'from-purple-500 to-purple-400',
    },

    // ============================================================
    // Header
    // ============================================================
    header: {
      background: 'bg-white',
      border: 'border-gray-200',
      text: 'text-gray-900',
      shadow: 'border-b',
    },

    // ============================================================
    // Hero Section
    // ============================================================
    hero: {
      background: 'bg-gradient-to-b from-gray-50 via-white to-gray-50',
      decorative1: 'bg-teal-100/30',
      decorative2: 'bg-blue-100/30',
    },

    // ============================================================
    // CTA Sections
    // ============================================================
    ctaSection: {
      background: 'bg-white',
      border: 'border-gray-200',
      icon: 'bg-teal-100',
      iconText: 'text-teal-600',
      title: 'text-gray-900',
      description: 'text-gray-600',
      link: 'text-teal-600 hover:text-teal-700',
    },

    // ============================================================
    // Loading Spinner
    // ============================================================
    spinner: 'border-teal-600',

    // ============================================================
    // Error Message
    // ============================================================
    error: {
      background: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
    },

    // ============================================================
    // Accent Colors
    // ============================================================
    accent: 'text-teal-600',
    accentHover: 'hover:text-teal-700',
    primary: 'teal',

    // ============================================================
    // Section Status Colors
    // ============================================================
    sectionStatus: {
      complete: 'bg-green-50 border-green-200',
      partial: 'bg-amber-50 border-amber-200',
      empty: 'bg-gray-50 border-gray-200',
    },

    // ============================================================
    // Section Icon Colors
    // ============================================================
    sectionIcon: {
      complete: 'text-green-600',
      partial: 'text-amber-600',
      empty: 'text-gray-400',
    },

    // ============================================================
    // Warning Colors
    // ============================================================
    warning: {
      red: 'bg-red-50 border border-red-200 text-red-700',
      green: 'bg-green-50 border border-green-200 text-green-700',
      amber: 'bg-amber-50 border border-amber-200 text-amber-700',
    },

    // ============================================================
    // Section Content
    // ============================================================
    sectionContent: {
      background: 'bg-gray-50',
      label: 'text-xs font-semibold text-gray-600 uppercase tracking-wider',
      value: 'text-sm text-gray-900 font-medium',
    },

    // ============================================================
    // Field Layout
    // ============================================================
    field: {
      border: 'border-gray-200',
      background: 'bg-white',
    },

    // ============================================================
    // Card Hover
    // ============================================================
    cardHover: 'hover:bg-gray-50 transition-colors',
  },

  dark: {
    // ============================================================
    // Background
    // ============================================================
    background: {
      primary: 'bg-gray-950',
      secondary: 'bg-gray-900',
      tertiary: 'bg-slate-900',
    },
    head: {
      background: '',
    },

    // ============================================================
    // Cards & Surfaces
    // ============================================================
    card: {
      background: 'bg-slate-800',
      border: 'border-slate-700',
      shadow: 'shadow-lg',
      hover: 'hover:border-slate-600 hover:shadow-xl transition-all',
    },

    // ============================================================
    // Text
    // ============================================================
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      tertiary: 'text-gray-400',
      muted: 'text-gray-500',
      label: 'text-xs font-semibold text-gray-300 uppercase',
    },

    // ============================================================
    // Borders
    // ============================================================
    border: {
      primary: 'border-slate-700',
      secondary: 'border-slate-600',
      accent: 'border-teal-600',
    },

    // ============================================================
    // Primary Button
    // ============================================================
    button: {
      primary: 'bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors',
      secondary: 'border-2 border-teal-600 text-teal-400 hover:bg-teal-950 font-semibold transition-all',
      ghost: 'text-teal-400 hover:bg-slate-700 font-medium transition-colors',
      danger: 'bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors',
      success: 'bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors',
    },

    // ============================================================
    // Modal - ADDED
    // ============================================================
    modal: {
      overlay: 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4',
      background: 'bg-slate-800',
      border: 'border-slate-700',
    },

    // ============================================================
    // Input
    // ============================================================
    input: {
      background: 'bg-slate-900',
      border: 'border-slate-600',
      text: 'text-white',
      placeholder: 'placeholder-gray-500',
      focus: 'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
    },

    // ============================================================
    // Status Badges
    // ============================================================
    badge: {
      live: 'bg-green-900/40 text-green-300',
      nonLive: 'bg-gray-700/40 text-gray-300',
      inReview: 'bg-amber-900/40 text-amber-300',
      approved: 'bg-green-900/40 text-green-300',
      pending: 'bg-orange-900/40 text-orange-300',
      error: 'bg-red-900/40 text-red-300',
    },

    // ============================================================
    // Platform Badges
    // ============================================================
    platformBadges: {
      hydra: 'bg-teal-900/30 text-teal-300',
      aws: 'bg-orange-900/30 text-orange-300',
      gcp: 'bg-blue-900/30 text-blue-300',
      tims: 'bg-purple-900/30 text-purple-300',
      'one-dato': 'bg-pink-900/30 text-pink-300',
    },

    // ============================================================
    // Progress Bar
    // ============================================================
    progressBar: {
      background: 'bg-slate-700',
      fill: 'bg-gradient-to-r from-teal-500 to-teal-600',
    },

    // ============================================================
    // Stats Card Colors
    // ============================================================
    stats: {
      live: 'bg-slate-800 border-slate-700',
      nonLive: 'bg-slate-800 border-slate-700',
      total: 'bg-slate-800 border-slate-700',
      inReview: 'bg-slate-800 border-slate-700',
    },

    // ============================================================
    // Info Cards
    // ============================================================
    infoCard: {
      background: 'bg-slate-800',
      border: 'border-slate-700',
      text: 'text-white',
      description: 'text-gray-300',
      hover: 'hover:shadow-xl transition-all',
    },

    // ============================================================
    // Info Card Gradients
    // ============================================================
    infoCardGradients: {
      first: 'from-teal-600 to-teal-500',
      second: 'from-blue-600 to-blue-500',
      third: 'from-purple-600 to-purple-500',
    },

    // ============================================================
    // Header
    // ============================================================
    header: {
      background: 'bg-slate-800',
      border: 'border-slate-700',
      text: 'text-white',
      shadow: 'border-b',
    },

    // ============================================================
    // Hero Section
    // ============================================================
    hero: {
      background: '',
      decorative1: 'bg-teal-600/8',
      decorative2: 'bg-blue-600/8',
    },

    // ============================================================
    // CTA Sections
    // ============================================================
    ctaSection: {
      background: 'bg-slate-800',
      border: 'border-slate-700',
      icon: 'bg-teal-600/20',
      iconText: 'text-teal-400',
      title: 'text-white',
      description: 'text-gray-300',
      link: 'text-teal-400 hover:text-teal-300',
    },

    // ============================================================
    // Loading Spinner
    // ============================================================
    spinner: 'border-teal-400',

    // ============================================================
    // Error Message
    // ============================================================
    error: {
      background: 'bg-red-900/20',
      border: 'border-red-700',
      text: 'text-red-300',
    },

    // ============================================================
    // Accent Colors
    // ============================================================
    accent: 'text-teal-400',
    accentHover: 'hover:text-teal-300',
    primary: 'teal',

    // ============================================================
    // Section Status Colors
    // ============================================================
    sectionStatus: {
      complete: 'bg-green-900/20 border-green-700',
      partial: 'bg-amber-900/20 border-amber-700',
      empty: 'bg-slate-800 border-slate-700',
    },

    // ============================================================
    // Section Icon Colors
    // ============================================================
    sectionIcon: {
      complete: 'text-green-400',
      partial: 'text-amber-400',
      empty: 'text-slate-500',
    },

    // ============================================================
    // Warning Colors
    // ============================================================
    warning: {
      red: 'bg-red-900/20 border border-red-700 text-red-400',
      green: 'bg-green-900/20 border border-green-700 text-green-400',
      amber: 'bg-amber-900/20 border border-amber-700 text-amber-400',
    },

    // ============================================================
    // Section Content
    // ============================================================
    sectionContent: {
      background: 'bg-slate-900',
      label: 'text-xs font-semibold text-gray-400 uppercase tracking-wider',
      value: 'text-sm text-slate-100 font-medium',
    },

    // ============================================================
    // Field Layout
    // ============================================================
    field: {
      border: 'border-slate-700',
      background: 'bg-slate-800',
    },

    // ============================================================
    // Card Hover
    // ============================================================
    cardHover: 'hover:bg-slate-700 transition-colors',
  },
};

// Helper function to get theme
export const getTheme = (isDark: boolean) => {
  return isDark ? prrTheme.dark : prrTheme.light;
};

// Export type
export type ThemeType = typeof prrTheme.light;