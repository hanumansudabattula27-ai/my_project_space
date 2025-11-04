// src/components/prr/prr-home-page/ActionButtons.tsx

'use client';

import React from 'react';
import { Plus, Eye } from 'lucide-react';
import Link from 'next/link';
import { prrTheme } from '@/lib/prr/theme';

interface ActionButtonsProps {
  isDark: boolean;
  centered?: boolean;
}

export default function ActionButtons({ isDark, centered = true }: ActionButtonsProps) {
  const theme = isDark ? prrTheme.dark : prrTheme.light;
  const containerClass = centered ? 'justify-center' : 'justify-start';

  return (
   
    <div className={`flex flex-col sm:flex-row gap-2 md:gap-3 ${containerClass}`}>
      <Link
        href="/prr/add-release"
        className={`flex items-center justify-center gap-2 px-5 md:px-6 py-2 md:py-2.5 ${theme.button.primary} rounded-lg transition-all shadow-sm hover:shadow-md text-xs md:text-sm font-semibold whitespace-nowrap`}
      >
        <Plus className="w-4 h-4" />
        <span>Add New Release</span>
      </Link>
      <Link
        href="/prr/releases"
        className={`flex items-center justify-center gap-2 px-5 md:px-6 py-2 md:py-2.5 ${theme.button.secondary} rounded-lg transition-all text-xs md:text-sm font-semibold whitespace-nowrap`}
      >
        <Eye className="w-4 h-4" />
        <span>View All Releases</span>
      </Link>
    </div>
    
  );
}