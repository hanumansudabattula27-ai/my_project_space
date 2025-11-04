// src/app/api/prr/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, SearchResponse, SearchResult } from '@/types/prr/type';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<SearchResponse>>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.toLowerCase() || '';

    // Mock data - Replace with actual backend API call
    const mockReleases: SearchResult[] = [
      {
        aimId: 'AIM-ID-001',
        projectName: 'project-service-one',
        status: 'LIVE',
        platform: 'Hydra',
        releaseDate: '2024-11-10',
      },
      {
        aimId: 'AIM-ID-002',
        projectName: 'project-service-two',
        status: 'NON-LIVE',
        platform: 'AWS',
        releaseDate: '2024-11-15',
      },
      {
        aimId: 'AIM-ID-003',
        projectName: 'project-service-three',
        status: 'LIVE',
        platform: 'GCP',
        releaseDate: '2024-11-12',
      },
      {
        aimId: 'AIM-ID-004',
        projectName: 'api-gateway-service',
        status: 'LIVE',
        platform: 'Hydra',
        releaseDate: '2024-11-08',
      },
      {
        aimId: 'AIM-ID-005',
        projectName: 'authentication-service',
        status: 'NON-LIVE',
        platform: 'TIMS',
        releaseDate: '2024-11-20',
      },
    ];

    let filteredResults = mockReleases;

    if (query) {
      filteredResults = mockReleases.filter(
        (release) =>
          release.aimId.toLowerCase().includes(query) ||
          release.projectName.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        results: filteredResults,
        total: filteredResults.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search releases',
      },
      { status: 500 }
    );
  }
}