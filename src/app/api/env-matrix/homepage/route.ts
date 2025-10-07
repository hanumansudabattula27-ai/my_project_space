// app/api/home/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = {
      platforms: [
        {
          type: 'hydra',
          name: 'Hydra Platform',
          description: 'Cloud-based hosting with consistent infrastructure',
          icon: '🌐',
          stats: {
            applications: 11,
            services: 47,
            zones: 285,
          },
          status: 'online',
          lastUpdated: Date.now() - (2 * 60 * 60 * 1000),
        },
        {
          type: 'non-hydra',
          name: 'Non-Hydra Platform',
          description: 'Legacy systems (TIMS, etc.)',
          icon: '🔧',
          stats: {
            applications: 5,
            services: 12,
            zones: 'TIMS',
          },
          status: 'online',
          lastUpdated: Date.now() - (5 * 60 * 60 * 1000),
        },
      ],
      globalStats: {
        totalApplications: 16,
        totalServices: 59,
        totalZones: 285,
        totalPlatforms: 2,
      },
    };

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch home data' },
      { status: 500 }
    );
  }
}