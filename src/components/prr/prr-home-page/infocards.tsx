// src/components/prr/prr-home-page/InfoCards.tsx

'use client';

import React from 'react';
import { CheckSquare, TrendingUp, FileCheck } from 'lucide-react';
import { prrTheme } from '@/lib/prr/theme';

interface InfoCardData {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientKey: 'first' | 'second' | 'third';
}

interface InfoCardsProps {
  isDark: boolean;
}

const infoCards: InfoCardData[] = [
  {
    title: '9 Sections',
    description: 'Complete all sections for a comprehensive and thorough review of your release',
    icon: <CheckSquare className="w-5 h-5" />,
    gradientKey: 'first',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor completion status in real-time and track your progress systematically',
    icon: <TrendingUp className="w-5 h-5" />,
    gradientKey: 'second',
  },
  {
    title: 'Approvals',
    description: 'Get sign-off from all stakeholders and reviewers in an organized manner',
    icon: <FileCheck className="w-5 h-5" />,
    gradientKey: 'third',
  },
];

export default function InfoCards({ isDark }: InfoCardsProps) {
  const theme = isDark ? prrTheme.dark : prrTheme.light;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      {infoCards.map((card, index) => {
        const gradientClass = theme.infoCardGradients[card.gradientKey];

        return (
          <div
            key={index}
            className={`${theme.infoCard.background} border ${theme.infoCard.border} rounded-lg p-4 md:p-5 transition-all duration-300 hover:shadow-md hover:scale-105 group overflow-hidden relative`}
          >
            {/* Icon Background Gradient - Using theme gradient */}
            <div className={`absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${gradientClass} opacity-8 rounded-full -mr-6 -mt-6 group-hover:opacity-15 transition-opacity`}></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Icon - Using theme gradient */}
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>

              {/* Title - Using theme text colors */}
              <h3 className={`text-base md:text-lg font-bold ${theme.infoCard.text} mb-1 transition-colors`}>
                {card.title}
              </h3>

              {/* Description - Using theme text colors */}
              <p className={`text-xs md:text-sm ${theme.infoCard.description} leading-snug mb-3`}>
                {card.description}
              </p>

              {/* Bottom Accent Line - Using theme gradient */}
              <div className={`h-0.5 w-8 bg-gradient-to-r ${gradientClass} rounded-full group-hover:w-full transition-all duration-300`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}