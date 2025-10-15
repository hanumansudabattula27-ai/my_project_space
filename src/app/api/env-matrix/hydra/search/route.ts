// src/app/api/env-matrix/hydra/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          applications: [],
          services: [],
          projects: []
        }
      });
    }

    // Fetch all Hydra applications from existing API
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/env-matrix/hydra/applications`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch applications');
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error('Invalid response from applications API');
    }

    const allApplications = result.data;
    const searchLower = query.toLowerCase().trim();

    // Search results
    const applications: any[] = [];
    const services: any[] = [];
    const projects: any[] = [];

    allApplications.forEach((app: any) => {
      const appName = app.applicationName?.toLowerCase() || '';
      const aimId = app.aimId?.toString() || '';

      // Search in Application Name or AIM ID
      if (appName.includes(searchLower) || aimId.includes(searchLower)) {
        applications.push({
          aimId: app.aimId,
          name: app.applicationName,
          platform: 'hydra'
        });
      }

      // Search in Projects
      app.Projects?.forEach((project: any) => {
        const projectName = project.project?.toLowerCase() || '';
        
        if (projectName.includes(searchLower)) {
          projects.push({
            name: project.project,
            aimId: app.aimId,
            appName: app.applicationName,
            platform: 'hydra'
          });
        }

        // Search in Services
        project.services?.forEach((service: any) => {
          const serviceName = service.serviceName?.toLowerCase() || '';
          
          if (serviceName.includes(searchLower)) {
            services.push({
              name: service.serviceName,
              aimId: app.aimId,
              appName: app.applicationName,
              projectName: project.project,
              platform: 'hydra'
            });
          }
        });
      });
    });

    // Limit to 5 per category
    const limitedApplications = applications.slice(0, 5);
    const limitedServices = services.slice(0, 5);
    const limitedProjects = projects.slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        applications: limitedApplications,
        services: limitedServices,
        projects: limitedProjects,
        totalApplications: applications.length,
        totalServices: services.length,
        totalProjects: projects.length
      }
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search' },
      { status: 500 }
    );
  }
}