// src/types/index.ts - Add metadata to all interfaces

export interface Application {
  aimId: string;
  applicationName: string;
  Projects: Project[];
  metadata?: Record<string, any>;  // ✅ Added
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  project: string;
  services: Service[];
  metadata?: Record<string, any>;  // ✅ Added
}

export interface Service {
  serviceName: string;
  applicationDomain: string;
  hostingPlatform: string;
  environments: Environment[];
  metadata?: Record<string, any>;  // ✅ Added
}

export interface Environment {
  environmentName: string;
  GTM: string;
  namehydra: string;
  abcGTM: string;
  firewallProfile?: string;
  Zones: Zone[];
  metadata?: Record<string, any>;  // ✅ Added
}

export interface Zone {
  ZoneName: string;
  vipName: string;
  vipIP: string;
  f5Device: string[];
  firewall: string;
  count: string;
  cpu: string;
  memory: string;
  metadata?: Record<string, any>;  // ✅ Added
}

// Keep existing types...
export type PlatformType = 'hydra' | 'non-hydra';

export interface Platform {
  type: PlatformType;
  name: string;
  description: string;
  icon: string;
  stats: {
    applications: number;
    services: number;
    zones: number | string;
  };
  status: 'online' | 'offline' | 'maintenance';
  lastUpdated: number;
}

export interface HomePageData {
  platforms: Platform[];
  globalStats: {
    totalApplications: number;
    totalServices: number;
    totalZones: number;
    totalPlatforms: number;
  };
}



































