// src/components/prr/prr-home-page/SearchBar.tsx

'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { prrTheme } from '@/lib/prr/theme';

interface SearchBarProps {
  isDark: boolean;
}

export default function SearchBar({ isDark }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const theme = isDark ? prrTheme.dark : prrTheme.light;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/prr/search?q=${encodeURIComponent(searchQuery)}`
      );
      const result = await response.json();

      if (result.success && result.data.results.length > 0) {
        const firstResult = result.data.results[0];
        router.push(`/prr/releases/${firstResult.aimId}`);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.text.tertiary}`} />
        <input
          type="text"
          placeholder="Search by AIM ID or Project Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 md:py-2.5 rounded-lg border ${theme.card.border} ${theme.input.background} ${theme.input.text} ${theme.input.placeholder} text-sm md:text-base ${theme.input.focus} transition-all`}
          disabled={isLoading}
        />
      </div>
    </form>
  );
}