// src/app/api/env-matrix/applications/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform') || 'hydra';

    // Hydra Applications Data
    const hydraApplications = [
      {
        aimid: 1001,
        name: 'Payment API',
        description: 'Payment processing and transaction management system',
        projects: ['Project Alpha', 'Project Beta'],
        services: [
          { serviceName: 'Payment Processing', projectName: 'Project Alpha', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Transaction Handler', projectName: 'Project Alpha', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-05'),
      },
      {
        aimid: 1002,
        name: 'Auth Service',
        description: 'Authentication and authorization management',
        projects: ['Project Alpha'],
        services: [
          { serviceName: 'User Authentication', projectName: 'Project Alpha', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'OAuth Provider', projectName: 'Project Alpha', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-06'),
      },
      {
        aimid: 1003,
        name: 'User Management',
        description: 'User profile and account management',
        projects: ['Project Beta', 'Project Gamma'],
        services: [
          { serviceName: 'Profile Service', projectName: 'Project Beta', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Account Manager', projectName: 'Project Beta', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'User Preferences', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-04'),
      },
      {
        aimid: 1004,
        name: 'Notification Hub',
        description: 'Multi-channel notification delivery system',
        projects: ['Project Gamma'],
        services: [
          { serviceName: 'Email Service', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'SMS Gateway', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Push Notifications', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-07'),
      },
      {
        aimid: 1005,
        name: 'Analytics Engine',
        description: 'Real-time analytics and reporting',
        projects: ['Project Beta'],
        services: [
          { serviceName: 'Data Processor', projectName: 'Project Beta', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Report Generator', projectName: 'Project Beta', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-03'),
      },
      {
        aimid: 1006,
        name: 'Reporting Service',
        description: 'Business intelligence and reporting dashboard',
        projects: ['Project Alpha', 'Project Beta'],
        services: [
          { serviceName: 'Dashboard API', projectName: 'Project Alpha', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Data Export', projectName: 'Project Beta', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-02'),
      },
      {
        aimid: 1007,
        name: 'File Storage API',
        description: 'Document and file management system',
        projects: ['Project Gamma'],
        services: [
          { serviceName: 'File Upload', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'File Retrieval', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'CDN Manager', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-06'),
      },
      {
        aimid: 1008,
        name: 'Search Service',
        description: 'Full-text search and indexing',
        projects: ['Project Alpha'],
        services: [
          { serviceName: 'Indexer', projectName: 'Project Alpha', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Search API', projectName: 'Project Alpha', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-05'),
      },
      {
        aimid: 1009,
        name: 'API Gateway',
        description: 'Centralized API routing and load balancing',
        projects: ['Project Alpha', 'Project Beta', 'Project Gamma'],
        services: [
          { serviceName: 'Gateway Router', projectName: 'Project Alpha', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Rate Limiter', projectName: 'Project Beta', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Load Balancer', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-07'),
      },
      {
        aimid: 1010,
        name: 'Cache Manager',
        description: 'Distributed caching and session management',
        projects: ['Project Beta'],
        services: [
          { serviceName: 'Redis Cache', projectName: 'Project Beta', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Session Store', projectName: 'Project Beta', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-04'),
      },
      {
        aimid: 1011,
        name: 'Logging Service',
        description: 'Centralized logging and monitoring',
        projects: ['Project Alpha', 'Project Gamma'],
        services: [
          { serviceName: 'Log Aggregator', projectName: 'Project Alpha', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Metrics Collector', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Alert Manager', projectName: 'Project Gamma', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-06'),
      },
    ];

    // Non-Hydra Applications Data
    const nonHydraApplications = [
      {
        aimid: 2001,
        name: 'Legacy Billing System',
        description: 'TIMS-based billing and invoicing',
        projects: ['Legacy Systems'],
        services: [{ serviceName: 'Invoice Generator', projectName: 'Legacy Systems', environments: { E1: {}, E2: {}, E3: {} } }],
        updatedAt: new Date('2024-12-20'),
      },
      {
        aimid: 2002,
        name: 'Customer Portal',
        description: 'Legacy customer self-service portal',
        projects: ['Legacy Systems', 'Customer Services'],
        services: [
          { serviceName: 'Portal Frontend', projectName: 'Legacy Systems', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Portal Backend', projectName: 'Customer Services', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2024-12-28'),
      },
      {
        aimid: 2003,
        name: 'Inventory Management',
        description: 'Legacy warehouse and inventory system',
        projects: ['Operations'],
        services: [
          { serviceName: 'Stock Tracker', projectName: 'Operations', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Order Processor', projectName: 'Operations', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-02'),
      },
      {
        aimid: 2004,
        name: 'HR System',
        description: 'Employee management and payroll',
        projects: ['HR Operations'],
        services: [{ serviceName: 'Payroll Service', projectName: 'HR Operations', environments: { E1: {}, E2: {}, E3: {} } }],
        updatedAt: new Date('2024-12-15'),
      },
      {
        aimid: 2005,
        name: 'CRM Platform',
        description: 'Customer relationship management',
        projects: ['Customer Services', 'Sales'],
        services: [
          { serviceName: 'Contact Manager', projectName: 'Customer Services', environments: { E1: {}, E2: {}, E3: {} } },
          { serviceName: 'Lead Tracker', projectName: 'Sales', environments: { E1: {}, E2: {}, E3: {} } }
        ],
        updatedAt: new Date('2025-01-01'),
      },
    ];

    // Return data based on platform
    const data = platform === 'hydra' ? hydraApplications : nonHydraApplications;

    return NextResponse.json({
      success: true,
      data,
      platform,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}