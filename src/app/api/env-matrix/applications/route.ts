// src/app/api/env-matrix/applications/route.ts
import {NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform') || 'hydra';

    // Hydra Applications Data - NEW STRUCTURE
    const hydraApplications = [
      {
        aimId: "1001",
        applicationName: "Payment API",
        Projects: [
          {
            project: "Project Alpha",
            services: [
              {
                serviceName: "Payment Processing",
                applicationDomain: "Intranet",
                hostingPlatform: "Hydra",
                environments: [
                  {
                    environmentName: "E1",
                    GTM: "payment.app.dev.com",
                    namehydra: "allowpaymenthydra.com",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Zone A",
                        vipName: "payment-e1-zona.com",
                        vipIP: "10.7.78.100",
                        f5Device: ["device1-payment", "device2-payment"],
                        firewall: "",
                        count: "4",
                        cpu: "8",
                        memory: "16GB"
                      },
                      {
                        ZoneName: "Zone B",
                        vipName: "payment-e1-zonb.com",
                        vipIP: "10.7.78.101",
                        f5Device: ["device3-payment", "device4-payment"],
                        firewall: "",
                        count: "4",
                        cpu: "8",
                        memory: "16GB"
                      }
                    ]
                  },
                  {
                    environmentName: "E2",
                    GTM: "payment.app.staging.com",
                    namehydra: "allowpaymenthydra-stg.com",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Zone A",
                        vipName: "payment-e2-zona.com",
                        vipIP: "10.7.78.110",
                        f5Device: ["device1-payment-stg", "device2-payment-stg"],
                        firewall: "",
                        count: "2",
                        cpu: "4",
                        memory: "8GB"
                      }
                    ]
                  }
                ]
              },
              {
                serviceName: "Transaction Handler",
                applicationDomain: "Intranet",
                hostingPlatform: "Hydra",
                environments: [
                  {
                    environmentName: "E1",
                    GTM: "transaction.app.dev.com",
                    namehydra: "allowtransactionhydra.com",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Zone A",
                        vipName: "transaction-e1-zona.com",
                        vipIP: "10.7.78.200",
                        f5Device: ["device1-txn", "device2-txn"],
                        firewall: "",
                        count: "2",
                        cpu: "4",
                        memory: "8GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        updatedAt: new Date('2025-01-05'),
      },
      {
        aimId: "1002",
        applicationName: "Auth Service",
        Projects: [
          {
            project: "Project Alpha",
            services: [
              {
                serviceName: "User Authentication",
                applicationDomain: "Internet",
                hostingPlatform: "Hydra",
                environments: [
                  {
                    environmentName: "E1",
                    GTM: "auth.app.dev.com",
                    namehydra: "allowauthhydra.com",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Zone A",
                        vipName: "auth-e1-zona.com",
                        vipIP: "10.7.79.100",
                        f5Device: ["device1-auth", "device2-auth"],
                        firewall: "",
                        count: "6",
                        cpu: "16",
                        memory: "32GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        updatedAt: new Date('2025-01-06'),
      },
      {
        aimId: "1003",
        applicationName: "User Management",
        Projects: [
          {
            project: "Project Beta",
            services: [
              {
                serviceName: "Profile Service",
                applicationDomain: "Intranet",
                hostingPlatform: "Hydra",
                environments: [
                  {
                    environmentName: "E1",
                    GTM: "profile.app.dev.com",
                    namehydra: "allowprofilehydra.com",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Zone A",
                        vipName: "profile-e1-zona.com",
                        vipIP: "10.7.80.100",
                        f5Device: ["device1-profile"],
                        firewall: "",
                        count: "2",
                        cpu: "4",
                        memory: "8GB"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            project: "Project Gamma",
            services: [
              {
                serviceName: "User Preferences",
                applicationDomain: "Intranet",
                hostingPlatform: "Hydra",
                environments: [
                  {
                    environmentName: "E1",
                    GTM: "preferences.app.dev.com",
                    namehydra: "allowpreferenceshydra.com",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Zone A",
                        vipName: "pref-e1-zona.com",
                        vipIP: "10.7.81.100",
                        f5Device: ["device1-pref"],
                        firewall: "",
                        count: "1",
                        cpu: "2",
                        memory: "4GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        updatedAt: new Date('2025-01-04'),
      },
      {
        aimId: "1004",
        applicationName: "Notification Hub",
        Projects: [
          {
            project: "Project Gamma",
            services: [
              {
                serviceName: "Email Service",
                applicationDomain: "Intranet",
                hostingPlatform: "Hydra",
                environments: [
                  {
                    environmentName: "E1",
                    GTM: "email.app.dev.com",
                    namehydra: "allowemailhydra.com",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Zone A",
                        vipName: "email-e1-zona.com",
                        vipIP: "10.7.82.100",
                        f5Device: ["device1-email"],
                        firewall: "",
                        count: "3",
                        cpu: "6",
                        memory: "12GB"
                      }
                    ]
                  }
                ]
              },
              {
                serviceName: "SMS Gateway",
                applicationDomain: "Intranet",
                hostingPlatform: "Hydra",
                environments: [
                  {
                    environmentName: "E1",
                    GTM: "sms.app.dev.com",
                    namehydra: "allowsmshydra.com",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Zone A",
                        vipName: "sms-e1-zona.com",
                        vipIP: "10.7.83.100",
                        f5Device: ["device1-sms"],
                        firewall: "",
                        count: "2",
                        cpu: "4",
                        memory: "8GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        updatedAt: new Date('2025-01-07'),
      },
      {
        aimId: "1005",
        applicationName: "Analytics Engine",
        Projects: [
          {
            project: "Project Beta",
            services: [
              {
                serviceName: "Data Processor",
                applicationDomain: "Intranet",
                hostingPlatform: "Hydra",
                environments: [
                  {
                    environmentName: "E1",
                    GTM: "analytics.app.dev.com",
                    namehydra: "allowanalyticshydra.com",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Zone A",
                        vipName: "analytics-e1-zona.com",
                        vipIP: "10.7.84.100",
                        f5Device: ["device1-analytics"],
                        firewall: "",
                        count: "4",
                        cpu: "16",
                        memory: "64GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        updatedAt: new Date('2025-01-03'),
      },
    ];

    // Non-Hydra Applications Data - NEW STRUCTURE
    const nonHydraApplications = [
      {
        aimId: "2001",
        applicationName: "Legacy Billing System",
        Projects: [
          {
            project: "Legacy Systems",
            services: [
              {
                serviceName: "Invoice Generator",
                applicationDomain: "Intranet",
                hostingPlatform: "TIMS",
                environments: [
                  {
                    environmentName: "Production",
                    GTM: "billing.legacy.com",
                    namehydra: "",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Main",
                        vipName: "billing-prod.com",
                        vipIP: "192.168.1.100",
                        f5Device: ["legacy-device1"],
                        firewall: "",
                        count: "1",
                        cpu: "4",
                        memory: "8GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        updatedAt: new Date('2024-12-20'),
      },
      {
        aimId: "2002",
        applicationName: "Customer Portal",
        Projects: [
          {
            project: "Legacy Systems",
            services: [
              {
                serviceName: "Portal Frontend",
                applicationDomain: "Internet",
                hostingPlatform: "TIMS",
                environments: [
                  {
                    environmentName: "Production",
                    GTM: "portal.customer.com",
                    namehydra: "",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Main",
                        vipName: "portal-prod.com",
                        vipIP: "192.168.2.100",
                        f5Device: ["legacy-portal1"],
                        firewall: "",
                        count: "2",
                        cpu: "4",
                        memory: "8GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        updatedAt: new Date('2024-12-28'),
      },
      {
        aimId: "2003",
        applicationName: "Inventory Management",
        Projects: [
          {
            project: "Operations",
            services: [
              {
                serviceName: "Stock Tracker",
                applicationDomain: "Intranet",
                hostingPlatform: "Legacy",
                environments: [
                  {
                    environmentName: "Production",
                    GTM: "inventory.ops.com",
                    namehydra: "",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Main",
                        vipName: "inventory-prod.com",
                        vipIP: "192.168.3.100",
                        f5Device: ["ops-device1"],
                        firewall: "",
                        count: "1",
                        cpu: "2",
                        memory: "4GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        updatedAt: new Date('2025-01-02'),
      },
      {
        aimId: "2004",
        applicationName: "HR System",
        Projects: [
          {
            project: "HR Operations",
            services: [
              {
                serviceName: "Payroll Service",
                applicationDomain: "Intranet",
                hostingPlatform: "Legacy",
                environments: [
                  {
                    environmentName: "Production",
                    GTM: "payroll.hr.com",
                    namehydra: "",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Main",
                        vipName: "payroll-prod.com",
                        vipIP: "192.168.4.100",
                        f5Device: ["hr-device1"],
                        firewall: "",
                        count: "1",
                        cpu: "4",
                        memory: "8GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        updatedAt: new Date('2024-12-15'),
      },
      {
        aimId: "2005",
        applicationName: "CRM Platform",
        Projects: [
          {
            project: "Customer Services",
            services: [
              {
                serviceName: "Contact Manager",
                applicationDomain: "Intranet",
                hostingPlatform: "Legacy",
                environments: [
                  {
                    environmentName: "Production",
                    GTM: "crm.services.com",
                    namehydra: "",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Main",
                        vipName: "crm-prod.com",
                        vipIP: "192.168.5.100",
                        f5Device: ["crm-device1"],
                        firewall: "",
                        count: "2",
                        cpu: "8",
                        memory: "16GB"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            project: "Sales",
            services: [
              {
                serviceName: "Lead Tracker",
                applicationDomain: "Intranet",
                hostingPlatform: "Legacy",
                environments: [
                  {
                    environmentName: "Production",
                    GTM: "leads.sales.com",
                    namehydra: "",
                    abcGTM: "",
                    firewallProfile: "",
                    Zones: [
                      {
                        ZoneName: "Main",
                        vipName: "leads-prod.com",
                        vipIP: "192.168.5.101",
                        f5Device: ["sales-device1"],
                        firewall: "",
                        count: "1",
                        cpu: "4",
                        memory: "8GB"
                      }
                    ]
                  }
                ]
              }
            ]
          }
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



// // ============================================
// // GET - Fetch all applications by platform
// // ============================================
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const platform = searchParams.get('platform');
//     const aimId = searchParams.get('aimId');

//     if (!platform) {
//       return NextResponse.json(
//         { success: false, message: 'Platform parameter is required' },
//         { status: 400 }
//       );
//     }

//     // If aimId is provided, fetch single application
//     if (aimId) {
//       const response = await fetch(
//         `YOUR_BACKEND_API_URL/applications/${aimId}?platform=${platform}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch application from backend');
//       }

//       const data = await response.json();

//       return NextResponse.json({
//         success: true,
//         data: data,
//       });
//     }

//     // Fetch all applications for the platform
//     const response = await fetch(
//       `YOUR_BACKEND_API_URL/applications?platform=${platform}`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Failed to fetch applications from backend');
//     }

//     const data = await response.json();

//     return NextResponse.json({
//       success: true,
//       data: data,
//       platform: platform,
//     });

//   } catch (error) {
//     console.error('Error fetching applications:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch applications' },
//       { status: 500 }
//     );
//   }
// }

// ============================================
// POST - Create new application
// ============================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.aimId || !body.applicationName || !body.platform) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields: aimId, applicationName, or platform' 
        },
        { status: 400 }
      );
    }

    // Call your backend API to create application
    const response = await fetch(
      'YOUR_BACKEND_API_URL/applications/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: body.platform,
          aimId: body.aimId,
          applicationName: body.applicationName,
          Projects: body.Projects || [],
          metadata: body.metadata || {},
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          success: false, 
          message: errorData.message || 'Failed to create application' 
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Application created successfully',
    });

  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create application' 
      },
      { status: 500 }
    );
  }
}

// // ============================================
// // PUT - Update existing application
// // ============================================
// export async function PUT(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // Validate required fields
//     if (!body.aimId) {
//       return NextResponse.json(
//         { success: false, message: 'aimId is required for updating' },
//         { status: 400 }
//       );
//     }

//     // Call your backend API to update application
//     const response = await fetch(
//       `YOUR_BACKEND_API_URL/applications/${body.aimId}`,
//       {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: errorData.message || 'Failed to update application' 
//         },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();

//     return NextResponse.json({
//       success: true,
//       data: data,
//       message: 'Application updated successfully',
//     });

//   } catch (error) {
//     console.error('Error updating application:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to update application' },
//       { status: 500 }
//     );
//   }
// }

// // ============================================
// // DELETE - Delete application
// // ============================================
// export async function DELETE(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const aimId = searchParams.get('aimId');
//     const platform = searchParams.get('platform');

//     if (!aimId) {
//       return NextResponse.json(
//         { success: false, message: 'aimId parameter is required' },
//         { status: 400 }
//       );
//     }

//     // Call your backend API to delete application
//     const response = await fetch(
//       `YOUR_BACKEND_API_URL/applications/${aimId}?platform=${platform}`,
//       {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: errorData.message || 'Failed to delete application' 
//         },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Application deleted successfully',
//     });

//   } catch (error) {
//     console.error('Error deleting application:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to delete application' },
//       { status: 500 }
//     );
//   }
// }