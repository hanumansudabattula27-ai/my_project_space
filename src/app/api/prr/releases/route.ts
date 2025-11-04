// src/app/api/prr/releases/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PRRApplication } from '@/types/prr/type';
import { ApiResponse } from '@/types/prr/type';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<{ releases: PRRApplication[], total: number }>>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search')?.toLowerCase() || '';
    const platform = searchParams.get('platform') || 'all';
    const status = searchParams.get('status') || 'all';

    // Mock data - ONLY HERE, will replace with backend API call later
    const mockReleases: PRRApplication[] = [
      {
        aimId: 'AIM-ID-001',
        basicInformation: {
          platform: 'Hydra',
          projectName: 'project-service-one',
          status: 'LIVE',
          releaseDate: '2024-11-10',
        },
        featureAndDesignDetails: {
          featureDetails: 'Core authentication service',
          apiDesign: 'RESTful API design',
          apiEndpoints: ['v1/auth', 'v1/auth/validate'],
          flowDiagram: 'https://example.com/flow.png',
          toggleFeatures: { value: 'Applicable' },
          gitHubRepo: 'https://github.com/org/project-service-one',
        },
        platformConfiguration: {
          glooHsm: { type: 'HSM', color: 'green' },
          numberOfZones: { value: '6', color: 'green' },
          consumers: ['api-gateway', 'mobile-app'],
        },
        deploymentAndGTMConfiguration: {
          gtmStatus: 'Topology',
          healthCheckURL: 'https://api.example.com/health',
        },
        observabilityAndMonitoring: {
          dashboardLinks: {
            environment: 'E1',
            platforms: [{ name: 'Splunk', url: 'https://splunk.example.com' }],
          },
          alertsConfigured: { status: 'Yes', details: 'Email and Slack' },
        },
        testingReadiness: {
          regressionTesting: { status: 'Pass', comments: 'All tests passed' },
          performanceTesting: { status: 'Pass', comments: 'P99 < 100ms' },
          chaosFailoverTesting: { status: 'Pass', comments: 'Failover tested' },
        },
        onboardingAndIntegrations: {
          fvaasOnboarding: { status: 'Yes', link: 'https://example.com' },
          eidDashboardOnboarding: { status: 'Yes', link: 'https://example.com' },
          dartOnboarding: { status: 'Yes', link: 'https://example.com' },
          resilienceToolOnboarding: { status: 'Yes', link: 'https://example.com' },
          netAppMapperOnboarding: { status: 'Yes', link: 'https://example.com' },
        },
        documentation: {
          status: 'Complete',
          content: 'Comprehensive documentation',
          sreDocumentation: 'https://example.com/runbook',
        },
        approvalsAndSignOff: {
          sreReviewer: { name: 'John Doe', date: '2024-11-09', comments: 'Approved' },
          qaLead: { name: 'Jane Smith', date: '2024-11-09', comments: 'Approved' },
          productOwner: { name: 'Mike Johnson', date: '2024-11-09', comments: 'Approved' },
          engineeringOwner: { name: 'Sarah Williams', date: '2024-11-09', comments: 'Approved' },
        },
      },
      {
        aimId: 'AIM-ID-002',
        basicInformation: {
          platform: 'AWS',
          projectName: 'api-gateway-service',
          status: 'LIVE',
          releaseDate: '2024-11-12',
        },
        featureAndDesignDetails: {
          featureDetails: 'API Gateway routing',
          apiDesign: 'GraphQL API design',
          apiEndpoints: ['v1/gateway', 'v1/gateway/routes'],
          flowDiagram: 'https://example.com/flow.png',
          toggleFeatures: { value: 'Applicable' },
          gitHubRepo: 'https://github.com/org/api-gateway-service',
        },
        platformConfiguration: {
          glooHsm: { type: 'GLOO', color: 'red' },
          numberOfZones: { value: '4', color: 'red' },
          consumers: ['frontend', 'mobile'],
        },
        deploymentAndGTMConfiguration: {
          gtmStatus: 'Round Robin',
          healthCheckURL: 'https://api.example.com/health',
        },
        observabilityAndMonitoring: {
          dashboardLinks: {
            environment: 'E2',
            platforms: [{ name: 'Dynatrace', url: 'https://dynatrace.example.com' }],
          },
          alertsConfigured: { status: 'Yes', details: 'Email only' },
        },
        testingReadiness: {
          regressionTesting: { status: 'Pass', comments: 'All tests passed' },
          performanceTesting: { status: 'Pass', comments: 'P99 < 150ms' },
          chaosFailoverTesting: { status: 'Pass', comments: 'Failover tested' },
        },
        onboardingAndIntegrations: {
          fvaasOnboarding: { status: 'Yes', link: 'https://example.com' },
          eidDashboardOnboarding: { status: 'No', link: '' },
          dartOnboarding: { status: 'Yes', link: 'https://example.com' },
          resilienceToolOnboarding: { status: 'Yes', link: 'https://example.com' },
          netAppMapperOnboarding: { status: 'No', link: '' },
        },
        documentation: {
          status: 'Complete',
          content: 'API documentation',
          sreDocumentation: 'https://example.com/runbook',
        },
        approvalsAndSignOff: {
          sreReviewer: { name: 'John Doe', date: '2024-11-11', comments: 'Approved' },
          qaLead: { name: 'Jane Smith', date: '2024-11-11', comments: 'Approved' },
          productOwner: { name: 'Mike Johnson', date: '2024-11-11', comments: 'Approved' },
          engineeringOwner: { name: 'Sarah Williams', date: '2024-11-11', comments: 'Approved' },
        },
      },
      {
        aimId: 'AIM-ID-003',
        basicInformation: {
          platform: 'GCP',
          projectName: 'database-service',
          status: 'NON-LIVE',
          releaseDate: '2024-11-15',
        },
        featureAndDesignDetails: {
          featureDetails: 'Database layer service',
          apiDesign: 'REST API design',
          apiEndpoints: ['v1/db', 'v1/db/query'],
          flowDiagram: 'https://example.com/flow.png',
          toggleFeatures: { value: 'NA' },
          gitHubRepo: 'https://github.com/org/database-service',
        },
        platformConfiguration: {
          glooHsm: { type: 'HSM', color: 'green' },
          numberOfZones: { value: '6', color: 'green' },
          consumers: ['api-gateway', 'backend-services'],
        },
        deploymentAndGTMConfiguration: {
          gtmStatus: 'Topology',
          healthCheckURL: 'https://api.example.com/health',
        },
        observabilityAndMonitoring: {
          dashboardLinks: {
            environment: 'E1',
            platforms: [{ name: 'ELF', url: 'https://elf.example.com' }],
          },
          alertsConfigured: { status: 'Yes', details: 'Email, Slack, PagerDuty' },
        },
        testingReadiness: {
          regressionTesting: { status: 'In Progress', comments: 'Running tests' },
          performanceTesting: { status: 'Pending', comments: 'Scheduled for tomorrow' },
          chaosFailoverTesting: { status: 'Pending', comments: 'Pending execution' },
        },
        onboardingAndIntegrations: {
          fvaasOnboarding: { status: 'No', link: '' },
          eidDashboardOnboarding: { status: 'Yes', link: 'https://example.com' },
          dartOnboarding: { status: 'No', link: '' },
          resilienceToolOnboarding: { status: 'Yes', link: 'https://example.com' },
          netAppMapperOnboarding: { status: 'Yes', link: 'https://example.com' },
        },
        documentation: {
          status: 'In Progress',
          content: 'Documentation in progress',
          sreDocumentation: 'https://example.com/runbook',
        },
        approvalsAndSignOff: {
          sreReviewer: { name: 'John Doe', date: '', comments: '' },
          qaLead: { name: 'Jane Smith', date: '2024-11-14', comments: 'Pending' },
          productOwner: { name: 'Mike Johnson', date: '', comments: '' },
          engineeringOwner: { name: 'Sarah Williams', date: '', comments: '' },
        },
      },
      {
        aimId: 'AIM-ID-004',
        basicInformation: {
          platform: 'TIMS',
          projectName: 'cache-service',
          status: 'LIVE',
          releaseDate: '2024-11-08',
        },
        featureAndDesignDetails: {
          featureDetails: 'Distributed caching layer',
          apiDesign: 'REST API design',
          apiEndpoints: ['v1/cache', 'v1/cache/get', 'v1/cache/set'],
          flowDiagram: 'https://example.com/flow.png',
          toggleFeatures: { value: 'Applicable' },
          gitHubRepo: 'https://github.com/org/cache-service',
        },
        platformConfiguration: {
          glooHsm: { type: 'HSM', color: 'green' },
          numberOfZones: { value: '6', color: 'green' },
          consumers: ['api-gateway', 'database-service'],
        },
        deploymentAndGTMConfiguration: {
          gtmStatus: 'Ratio',
          healthCheckURL: 'https://api.example.com/health',
        },
        observabilityAndMonitoring: {
          dashboardLinks: {
            environment: 'E1',
            platforms: [{ name: 'Splunk', url: 'https://splunk.example.com' }],
          },
          alertsConfigured: { status: 'Yes', details: 'Slack' },
        },
        testingReadiness: {
          regressionTesting: { status: 'Pass', comments: 'All tests passed' },
          performanceTesting: { status: 'Pass', comments: 'P99 < 50ms' },
          chaosFailoverTesting: { status: 'Pass', comments: 'Tested successfully' },
        },
        onboardingAndIntegrations: {
          fvaasOnboarding: { status: 'Yes', link: 'https://example.com' },
          eidDashboardOnboarding: { status: 'Yes', link: 'https://example.com' },
          dartOnboarding: { status: 'Yes', link: 'https://example.com' },
          resilienceToolOnboarding: { status: 'Yes', link: 'https://example.com' },
          netAppMapperOnboarding: { status: 'Yes', link: 'https://example.com' },
        },
        documentation: {
          status: 'Complete',
          content: 'Complete documentation',
          sreDocumentation: 'https://example.com/runbook',
        },
        approvalsAndSignOff: {
          sreReviewer: { name: 'John Doe', date: '2024-11-07', comments: 'Approved' },
          qaLead: { name: 'Jane Smith', date: '2024-11-07', comments: 'Approved' },
          productOwner: { name: 'Mike Johnson', date: '2024-11-07', comments: 'Approved' },
          engineeringOwner: { name: 'Sarah Williams', date: '2024-11-07', comments: 'Approved' },
        },
      },
      {
        aimId: 'AIM-ID-005',
        basicInformation: {
          platform: 'Hydra',
          projectName: 'notification-service',
          status: 'LIVE',
          releaseDate: '2024-11-13',
        },
        featureAndDesignDetails: {
          featureDetails: 'Email and SMS notification service',
          apiDesign: 'Event-driven API',
          apiEndpoints: ['v1/notify', 'v1/notify/email', 'v1/notify/sms'],
          flowDiagram: 'https://example.com/flow.png',
          toggleFeatures: { value: 'Applicable' },
          gitHubRepo: 'https://github.com/org/notification-service',
        },
        platformConfiguration: {
          glooHsm: { type: 'HSM', color: 'green' },
          numberOfZones: { value: '6', color: 'green' },
          consumers: ['backend-services', 'user-management'],
        },
        deploymentAndGTMConfiguration: {
          gtmStatus: 'Topology',
          healthCheckURL: 'https://api.example.com/health',
        },
        observabilityAndMonitoring: {
          dashboardLinks: {
            environment: 'E2',
            platforms: [{ name: 'Dynatrace', url: 'https://dynatrace.example.com' }],
          },
          alertsConfigured: { status: 'Yes', details: 'Email, Slack, PagerDuty' },
        },
        testingReadiness: {
          regressionTesting: { status: 'Pass', comments: 'All tests passed' },
          performanceTesting: { status: 'Pass', comments: 'P99 < 200ms' },
          chaosFailoverTesting: { status: 'Pass', comments: 'Tested' },
        },
        onboardingAndIntegrations: {
          fvaasOnboarding: { status: 'Yes', link: 'https://example.com' },
          eidDashboardOnboarding: { status: 'Yes', link: 'https://example.com' },
          dartOnboarding: { status: 'Yes', link: 'https://example.com' },
          resilienceToolOnboarding: { status: 'Yes', link: 'https://example.com' },
          netAppMapperOnboarding: { status: 'No', link: '' },
        },
        documentation: {
          status: 'Complete',
          content: 'Full documentation available',
          sreDocumentation: 'https://example.com/runbook',
        },
        approvalsAndSignOff: {
          sreReviewer: { name: 'John Doe', date: '2024-11-12', comments: 'Approved' },
          qaLead: { name: 'Jane Smith', date: '2024-11-12', comments: 'Approved' },
          productOwner: { name: 'Mike Johnson', date: '2024-11-12', comments: 'Approved' },
          engineeringOwner: { name: 'Sarah Williams', date: '2024-11-12', comments: 'Approved' },
        },
      },
    ];

    // Filter logic
    let filteredReleases = mockReleases;

    if (search) {
      filteredReleases = filteredReleases.filter(
        (r) =>
          r.aimId.toLowerCase().includes(search) ||
          r.basicInformation.projectName.toLowerCase().includes(search)
      );
    }

    if (platform !== 'all') {
      filteredReleases = filteredReleases.filter(
        (r) => r.basicInformation.platform.toLowerCase() === platform.toLowerCase()
      );
    }

    if (status !== 'all') {
      filteredReleases = filteredReleases.filter(
        (r) => r.basicInformation.status.toUpperCase() === status.toUpperCase()
      );
    }

    // Pagination
    const total = filteredReleases.length;
    const startIndex = (page - 1) * limit;
    const paginatedReleases = filteredReleases.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      data: {
        releases: paginatedReleases,
        total,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch releases',
      },
      { status: 500 }
    );
  }
}