// src/components/prr/prr-home-page/StatsCard.tsx

'use client';

import React from 'react';
import { prrTheme } from '@/lib/prr/theme';

interface StatsCardProps {
  label: string;
  value: number;
  description: string;
  isDark: boolean;
  colorKey: 'live' | 'nonLive' | 'total' | 'inReview';
}

export default function StatsCard({
  label,
  value,
  description,
  isDark,
  colorKey,
}: StatsCardProps) {
  const theme = isDark ? prrTheme.dark : prrTheme.light;
  const statsColor = theme.stats[colorKey];

  return (
    <div
      className={`${statsColor} p-3 md:p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-105 group`}
    >
      <p className={`${theme.text.label} mb-1 text-xs group-hover:opacity-80 transition-opacity`}>{label}</p>
      <p className={`text-xl md:text-2xl font-bold ${theme.text.primary} mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors`}>
        {value}
      </p>
      <p className={`text-xs ${theme.text.secondary}`}>{description}</p>
    </div>
  );
}