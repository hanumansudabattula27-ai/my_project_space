// src/app/api/prr/stats/route.ts

import { NextResponse } from 'next/server';
import { ApiResponse, StatsData } from '@/types/prr/type';

export async function GET(): Promise<NextResponse<ApiResponse<StatsData>>> {
  try {
    // Mock data - Replace with actual backend API call
    const statsData: StatsData = {
      live: 24,
      nonLive: 12,
      total: 36,
      inReview: 5,
    };

    return NextResponse.json({
      success: true,
      data: statsData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch stats',
      },
      { status: 500 }
    );
  }
}