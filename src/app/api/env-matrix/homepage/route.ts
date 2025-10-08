// src/app/api/env-matrix/homepage/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = {
      platforms: [
        {
          type: 'hydra',
          name: 'Hydra Platform',
          description: 'Cloud-native infrastructure and modern services',
          icon: '🌐',
          stats: {
            applications: 5,
            services: 8,
            zones: 12,
          },
          status: 'online',
          lastUpdated: Date.now() - (2 * 60 * 60 * 1000),
        },
        {
          type: 'non-hydra',
          name: 'Non-Hydra Platform',
          description: 'Legacy systems and traditional applications',
          icon: '🔧',
          stats: {
            applications: 5,
            services: 7,
            zones: 5,
          },
          status: 'online',
          lastUpdated: Date.now() - (5 * 60 * 60 * 1000),
        },
      ],
      globalStats: {
        totalApplications: 10,
        totalServices: 15,
        totalZones: 17,
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