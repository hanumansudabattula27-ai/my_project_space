// src/types/index.ts

export interface Application {
  aimid: number;
  name?: string;
  description?: string;
  projects: string[];
  services: Service[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Service {
  serviceName: string;
  projectName: string;
  environments: Environments;
}

export interface Environments {
  E1: Environment;
  E2: Environment;
  E3: Environment;
}

export interface Environment {
  envName: string;
  initialUrl1: string;
  secondUrl: string;
  gtmName: string;
  profile: string;
  zones: Zone[];
}

export interface Zone {
  zoneName: string;
  zonevipname: string;
  zonevipIp: string;
  device: string;
  firewall: string;
  count: number;
  cpu: string;
  memory: string;
}

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