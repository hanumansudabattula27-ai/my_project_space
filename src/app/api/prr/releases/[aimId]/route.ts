// src/app/api/prr/releases/[aimId]/route.ts
// Your existing code + PUT and DELETE methods added

import { NextRequest, NextResponse } from 'next/server';
import { PRRApplication } from '@/types/prr/type';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Mock Data - Complete (YOUR EXISTING DATA - KEPT AS IS)
const MOCK_RELEASES: Record<string, PRRApplication> = {
  'AIM-ID-001': {
    aimId: 'AIM-ID-001',
    basicInformation: {
      platform: 'Hydra',
      projectName: 'payment-service',
      status: 'LIVE',
      releaseDate: '2024-11-10',
    },
    featureAndDesignDetails: {
      featureDetails: 'Core payment processing engine with real-time transaction handling and fraud detection',
      apiDesign: 'RESTful API following OpenAPI 3.0 specification with comprehensive error handling',
      apiEndpoints: ['v1/payments/process', 'v1/payments/status', 'v1/payments/refund', 'v1/payments/webhook'],
      flowDiagram: 'https://example.com/flow-diagram.png',
      toggleFeatures: { value: 'Applicable' },
      gitHubRepo: 'https://github.com/org/payment-service',
    },
    platformConfiguration: {
      glooHsm: { type: 'HSM', color: 'green' },
      numberOfZones: { value: '6', color: 'green' },
      consumers: ['api-gateway', 'mobile-app', 'backend-services', 'dashboard'],
    },
    deploymentAndGTMConfiguration: {
      gtmStatus: 'Topology',
      healthCheckURL: 'https://api.example.com/v1/health',
    },
    observabilityAndMonitoring: {
      dashboardLinks: {
        environment: 'E1',
        platforms: [
          { name: 'Splunk', url: 'https://splunk.example.com/dashboard/payment-service' },
          { name: 'Dynatrace', url: 'https://dynatrace.example.com/dashboard/payment-service' },
        ],
      },
      alertsConfigured: { status: 'Yes', details: 'Email, Slack, PagerDuty alerts configured' },
    },
    testingReadiness: {
      regressionTesting: { status: 'Pass', comments: 'All 250+ regression tests passed successfully' },
      performanceTesting: { status: 'Pass', comments: 'P99 < 100ms, throughput > 10k TPS' },
      chaosFailoverTesting: { status: 'Pass', comments: 'Tested zone failures, circuit breaker working' },
    },
    onboardingAndIntegrations: {
      fvaasOnboarding: { status: 'Yes', link: 'https://example.com/fvaas/payment-service' },
      eidDashboardOnboarding: { status: 'Yes', link: 'https://example.com/eid/payment-service' },
      dartOnboarding: { status: 'Yes', link: 'https://example.com/dart/payment-service' },
      resilienceToolOnboarding: { status: 'Yes', link: 'https://example.com/resilience/payment-service' },
      netAppMapperOnboarding: { status: 'Yes', link: 'https://example.com/netapp/payment-service' },
    },
    documentation: {
      status: 'Complete',
      content: 'Comprehensive API documentation with examples and best practices',
      sreDocumentation: 'https://example.com/runbooks/payment-service',
    },
    approvalsAndSignOff: {
      sreReviewer: { name: 'John Doe', date: '2024-11-09', comments: 'Infrastructure approved' },
      qaLead: { name: 'Jane Smith', date: '2024-11-09', comments: 'QA testing complete' },
      productOwner: { name: 'Mike Johnson', date: '2024-11-09', comments: 'Product approved' },
      engineeringOwner: { name: 'Sarah Williams', date: '2024-11-09', comments: 'Engineering approved' },
    },
  },
  'AIM-ID-002': {
    aimId: 'AIM-ID-002',
    basicInformation: {
      platform: 'AWS',
      projectName: 'api-gateway-service',
      status: 'LIVE',
      releaseDate: '2024-11-12',
    },
    featureAndDesignDetails: {
      featureDetails: 'API Gateway routing and load balancing for microservices',
      apiDesign: 'GraphQL API with federation support',
      apiEndpoints: ['v1/gateway/route', 'v1/gateway/config', 'v1/gateway/stats'],
      flowDiagram: 'https://example.com/gateway-flow.png',
      toggleFeatures: { value: 'Applicable' },
      gitHubRepo: 'https://github.com/org/api-gateway-service',
    },
    platformConfiguration: {
      glooHsm: { type: 'GLOO', color: 'red' },
      numberOfZones: { value: '4', color: 'red' },
      consumers: ['frontend', 'mobile', 'third-party-partners'],
    },
    deploymentAndGTMConfiguration: {
      gtmStatus: 'Round Robin',
      healthCheckURL: 'https://gateway.example.com/health',
    },
    observabilityAndMonitoring: {
      dashboardLinks: {
        environment: 'E2',
        platforms: [
          { name: 'Dynatrace', url: 'https://dynatrace.example.com/gateway' },
        ],
      },
      alertsConfigured: { status: 'Yes', details: 'Email and Slack alerts' },
    },
    testingReadiness: {
      regressionTesting: { status: 'Pass', comments: 'Regression complete' },
      performanceTesting: { status: 'Pass', comments: 'Performance metrics met' },
      chaosFailoverTesting: { status: 'In Progress', comments: 'Testing failover scenarios' },
    },
    onboardingAndIntegrations: {
      fvaasOnboarding: { status: 'Yes', link: 'https://example.com/fvaas/gateway' },
      eidDashboardOnboarding: { status: 'No', link: '' },
      dartOnboarding: { status: 'Yes', link: 'https://example.com/dart/gateway' },
      resilienceToolOnboarding: { status: 'Yes', link: 'https://example.com/resilience/gateway' },
      netAppMapperOnboarding: { status: 'No', link: '' },
    },
    documentation: {
      status: 'Complete',
      content: 'Gateway documentation complete',
      sreDocumentation: 'https://example.com/runbooks/gateway',
    },
    approvalsAndSignOff: {
      sreReviewer: { name: 'John Doe', date: '2024-11-11', comments: 'Approved' },
      qaLead: { name: 'Jane Smith', date: '2024-11-11', comments: 'Approved' },
      productOwner: { name: '', date: '', comments: '' },
      engineeringOwner: { name: 'Sarah Williams', date: '2024-11-11', comments: 'Approved' },
    },
  },
  'AIM-ID-003': {
    aimId: 'AIM-ID-003',
    basicInformation: {
      platform: 'GCP',
      projectName: 'auth-service',
      status: 'LIVE',
      releaseDate: '2024-11-05',
    },
    featureAndDesignDetails: {
      featureDetails: 'OAuth 2.0 and SAML 2.0 authentication provider',
      apiDesign: 'OpenID Connect compatible endpoints',
      apiEndpoints: ['v1/auth/login', 'v1/auth/logout', 'v1/auth/token', 'v1/auth/refresh'],
      flowDiagram: 'https://example.com/auth-flow.png',
      toggleFeatures: { value: 'Applicable' },
      gitHubRepo: 'https://github.com/org/auth-service',
    },
    platformConfiguration: {
      glooHsm: { type: 'HSM', color: 'green' },
      numberOfZones: { value: '3', color: 'red' },
      consumers: ['web-portal', 'mobile-apps', 'internal-services'],
    },
    deploymentAndGTMConfiguration: {
      gtmStatus: 'Topology',
      healthCheckURL: 'https://auth.example.com/health',
    },
    observabilityAndMonitoring: {
      dashboardLinks: {
        environment: 'E1',
        platforms: [
          { name: 'ELF', url: 'https://elf.example.com/auth' },
        ],
      },
      alertsConfigured: { status: 'Yes', details: 'PagerDuty and Email alerts' },
    },
    testingReadiness: {
      regressionTesting: { status: 'Pass', comments: 'All tests passed' },
      performanceTesting: { status: 'Pass', comments: 'Load testing complete' },
      chaosFailoverTesting: { status: 'Pass', comments: 'Failover scenarios tested' },
    },
    onboardingAndIntegrations: {
      fvaasOnboarding: { status: 'Yes', link: 'https://example.com/fvaas/auth' },
      eidDashboardOnboarding: { status: 'Yes', link: 'https://example.com/eid/auth' },
      dartOnboarding: { status: 'No', link: '' },
      resilienceToolOnboarding: { status: 'Yes', link: 'https://example.com/resilience/auth' },
      netAppMapperOnboarding: { status: 'Yes', link: 'https://example.com/netapp/auth' },
    },
    documentation: {
      status: 'Complete',
      content: 'Complete authentication documentation',
      sreDocumentation: 'https://example.com/runbooks/auth',
    },
    approvalsAndSignOff: {
      sreReviewer: { name: 'Alice Chen', date: '2024-11-04', comments: 'SRE approved' },
      qaLead: { name: 'Bob Wilson', date: '2024-11-04', comments: 'QA approved' },
      productOwner: { name: 'Carol Davis', date: '2024-11-04', comments: 'Product approved' },
      engineeringOwner: { name: 'David Kumar', date: '2024-11-04', comments: 'Engineering approved' },
    },
  },
};

// ✅ GET - YOUR EXISTING METHOD (UNCHANGED)
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const aimId = searchParams.get('aimId');

    if (!aimId) {
      return NextResponse.json(
        {
          success: false,
          error: 'AIM ID is required. Use ?aimId=AIM-ID-001',
        },
        { status: 400 }
      );
    }

    const release = MOCK_RELEASES[aimId];

    if (!release) {
      return NextResponse.json(
        {
          success: false,
          error: `Release with AIM ID '${aimId}' not found. Available: AIM-ID-001, AIM-ID-002, AIM-ID-003`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: release,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching release:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch release details',
      },
      { status: 500 }
    );
  }
}

// ✅ PUT - UPDATE (ADDED)
export async function PUT(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const aimId = searchParams.get('aimId');

    if (!aimId) {
      return NextResponse.json(
        {
          success: false,
          error: 'AIM ID is required. Use ?aimId=AIM-ID-001',
        },
        { status: 400 }
      );
    }

    if (!MOCK_RELEASES[aimId]) {
      return NextResponse.json(
        {
          success: false,
          error: `Release with AIM ID '${aimId}' not found`,
        },
        { status: 404 }
      );
    }

    const body = await request.json();
    MOCK_RELEASES[aimId] = { ...MOCK_RELEASES[aimId], ...body, aimId };

    return NextResponse.json(
      {
        success: true,
        data: MOCK_RELEASES[aimId],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating release:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update release',
      },
      { status: 500 }
    );
  }
}

// ✅ DELETE - DELETE (ADDED)
export async function DELETE(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const aimId = searchParams.get('aimId');

    if (!aimId) {
      return NextResponse.json(
        {
          success: false,
          error: 'AIM ID is required. Use ?aimId=AIM-ID-001',
        },
        { status: 400 }
      );
    }

    if (!MOCK_RELEASES[aimId]) {
      return NextResponse.json(
        {
          success: false,
          error: `Release with AIM ID '${aimId}' not found`,
        },
        { status: 404 }
      );
    }

    delete MOCK_RELEASES[aimId];

    return NextResponse.json(
      {
        success: true,
        data: { message: 'Release deleted successfully' },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting release:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete release',
      },
      { status: 500 }
    );
  }
}

// Optional: Add OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}