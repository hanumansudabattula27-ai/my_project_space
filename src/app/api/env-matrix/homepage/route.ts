// src/app/api/env-matrix/stats/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: Replace with actual API calls to get real counts
    // For now, using static data as example
    
    // Example: Fetch from your backend
    // const hydraResponse = await fetch('YOUR_BACKEND/api/hydra/stats');
    // const nonHydraResponse = await fetch('YOUR_BACKEND/api/non-hydra/stats');
    
    const data = {
      hydra: {
        applications: 5,
        services: 8,
        zones: 12,
      },
      nonHydra: {
        applications: 5,
        services: 7,
        zones: 5,
      },
    };

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch platform statistics' },
      { status: 500 }
    );
  }
}