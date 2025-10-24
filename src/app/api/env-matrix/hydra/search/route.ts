// // src/app/api/env-matrix/hydra/search/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const query = searchParams.get('q');

//     if (!query || query.trim().length === 0) {
//       return NextResponse.json({
//         success: true,
//         data: {
//           applications: [],
//           services: [],
//           projects: []
//         }
//       });
//     }

//     // Fetch all Hydra applications from existing API
//     const baseUrl = request.nextUrl.origin;
//     const response = await fetch(`${baseUrl}/api/env-matrix/hydra/applications`, {
//       cache: 'no-store'
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch applications');
//     }

//     const result = await response.json();

//     if (!result.success || !result.data) {
//       throw new Error('Invalid response from applications API');
//     }

//     const allApplications = result.data;
//     const searchLower = query.toLowerCase().trim();

//     // Search results
//     const applications: any[] = [];
//     const services: any[] = [];
//     const projects: any[] = [];

//     allApplications.forEach((app: any) => {
//       const appName = app.applicationName?.toLowerCase() || '';
//       const aimId = app.aimId?.toString() || '';

//       // Search in Application Name or AIM ID
//       if (appName.includes(searchLower) || aimId.includes(searchLower)) {
//         applications.push({
//           aimId: app.aimId,
//           name: app.applicationName,
//           platform: 'hydra'
//         });
//       }

//       // Search in Projects
//       app.Projects?.forEach((project: any) => {
//         const projectName = project.project?.toLowerCase() || '';
        
//         if (projectName.includes(searchLower)) {
//           projects.push({
//             name: project.project,
//             aimId: app.aimId,
//             appName: app.applicationName,
//             platform: 'hydra'
//           });
//         }

//         // Search in Services
//         project.services?.forEach((service: any) => {
//           const serviceName = service.serviceName?.toLowerCase() || '';
          
//           if (serviceName.includes(searchLower)) {
//             services.push({
//               name: service.serviceName,
//               aimId: app.aimId,
//               appName: app.applicationName,
//               projectName: project.project,
//               platform: 'hydra'
//             });
//           }
//         });
//       });
//     });


//     return NextResponse.json({
//       success: true,
//       data: {
//         applications: applications,
//         services: services,
//         projects: projects,
//         totalApplications: applications.length,
//         totalServices: services.length,
//         totalProjects: projects.length
//       }
//     });

//   } catch (error) {
//     console.error('Search API Error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to search' },
//       { status: 500 }
//     );
//   }
// }




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
          projects: [],
          totalApplications: 0,
          totalServices: 0,
          totalProjects: 0
        }
      });
    }

    // Fetch all Hydra applications from API
    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/env-matrix/applications?platform=hydra`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error(`[SEARCH] Failed to fetch applications: ${response.status}`);
      throw new Error(`Failed to fetch applications: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      console.error('[SEARCH] Invalid response from applications API:', result);
      throw new Error('Invalid response from applications API');
    }

    const allApplications = result.data;
    const searchLower = query.toLowerCase().trim();

    console.log(`[SEARCH] Query: "${query}", Applications found: ${allApplications.length}`);

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

      // Parse Projects - it might be a string or already an array
      let projectsList: any[] = [];
      if (app.Projects) {
        if (typeof app.Projects === 'string') {
          try {
            projectsList = JSON.parse(app.Projects);
            console.log(`[SEARCH] Parsed Projects string for app ${app.aimId}: ${projectsList.length} projects`);
          } catch (parseError) {
            console.error(`[SEARCH] Failed to parse Projects for app ${app.aimId}:`, parseError);
            projectsList = [];
          }
        } else if (Array.isArray(app.Projects)) {
          projectsList = app.Projects;
          console.log(`[SEARCH] Projects already array for app ${app.aimId}: ${projectsList.length} projects`);
        }
      }

      // Search in Projects and Services
      projectsList.forEach((project: any) => {
        const projectName = project.project?.toLowerCase() || '';
        
        // Check if project name matches search
        if (projectName.includes(searchLower)) {
          console.log(`[SEARCH] Found project match: "${project.project}" for query "${query}"`);
          projects.push({
            name: project.project,
            aimId: app.aimId,
            appName: app.applicationName,
            platform: 'hydra'
          });
        }

        // Search in Services within this project
        if (project.services && Array.isArray(project.services)) {
          project.services.forEach((service: any) => {
            const serviceName = service.serviceName?.toLowerCase() || '';
            const serviceDomain = service.applicationDomain?.toLowerCase() || '';
            
            // Check if service name or domain matches search
            if (serviceName.includes(searchLower) || serviceDomain.includes(searchLower)) {
              console.log(`[SEARCH] Found service match: "${service.serviceName}" in project "${project.project}"`);
              services.push({
                name: service.serviceName,
                aimId: app.aimId,
                appName: app.applicationName,
                projectName: project.project,
                platform: 'hydra',
                applicationDomain: service.applicationDomain
              });
            }
          });
        }
      });
    });

    console.log(`[SEARCH] Final results - Apps: ${applications.length}, Services: ${services.length}, Projects: ${projects.length}`);

    return NextResponse.json({
      success: true,
      data: {
        applications: applications,
        services: services,
        projects: projects,
        totalApplications: applications.length,
        totalServices: services.length,
        totalProjects: projects.length
      }
    });

  } catch (error) {
    console.error('[SEARCH] API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to search'
      },
      { status: 500 }
    );
  }
}