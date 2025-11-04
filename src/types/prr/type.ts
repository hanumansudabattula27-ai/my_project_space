// src/types/prr/types.ts - MERGED COMPLETE

// ============================================================
// EXISTING TYPES (Your current code)
// ============================================================

export interface StatsData {
  live: number;
  nonLive: number;
  total: number;
  inReview: number;
}

export interface SearchResult {
  aimId: string;
  projectName: string;
  status: 'LIVE' | 'NON-LIVE';
  platform: string;
  releaseDate: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PRRBasicInformation {
  platform: 'Hydra' | 'One Dato' | 'TIMS' | 'AWS' | 'GCP';
  projectName: string;
  status: 'LIVE' | 'NON-LIVE';
  releaseDate: string;
}

export interface ToggleFeature {
  value: string;
}

export interface FeatureAndDesignDetails {
  featureDetails: string;
  apiDesign: string;
  apiEndpoints: string[];
  flowDiagram: string;
  toggleFeatures: ToggleFeature;
  gitHubRepo: string;
}

export interface GlooHSM {
  type: string;
  color: string;
}

export interface NumberOfZones {
  value: string;
  color: string;
}

export interface PlatformConfiguration {
  glooHsm: GlooHSM;
  numberOfZones: NumberOfZones;
  consumers: string[];
}

export interface DeploymentAndGTM {
  gtmStatus: string;
  healthCheckURL: string;
}

export interface DashboardLink {
  environment: string;
  platforms: {
    name: string;
    url: string;
  }[];
}

export interface AlertsConfigured {
  status: string;
  details: string;
}

export interface ObservabilityAndMonitoring {
  dashboardLinks: DashboardLink;
  alertsConfigured: AlertsConfigured;
}

export interface RegressionTesting {
  status: string;
  comments: string;
}

export interface PerformanceTesting {
  status: string;
  comments: string;
}

export interface ChaosFailoverTesting {
  status: string;
  comments: string;
}

export interface TestingReadiness {
  regressionTesting: RegressionTesting;
  performanceTesting: PerformanceTesting;
  chaosFailoverTesting: ChaosFailoverTesting;
}

export interface OnboardingItem {
  status: string;
  link: string;
}

export interface OnboardingAndIntegrations {
  fvaasOnboarding: OnboardingItem;
  eidDashboardOnboarding: OnboardingItem;
  dartOnboarding: OnboardingItem;
  resilienceToolOnboarding: OnboardingItem;
  netAppMapperOnboarding: OnboardingItem;
}

export interface Documentation {
  status: string;
  content: string;
  sreDocumentation: string;
}

export interface Reviewer {
  name: string;
  date: string;
  comments: string;
}

export interface ApprovalsAndSignOff {
  sreReviewer: Reviewer;
  qaLead: Reviewer;
  productOwner: Reviewer;
  engineeringOwner: Reviewer;
}

export interface PRRApplication {
  aimId: string;
  basicInformation: PRRBasicInformation;
  featureAndDesignDetails: FeatureAndDesignDetails
  platformConfiguration: PlatformConfiguration;
  deploymentAndGTMConfiguration: DeploymentAndGTM;
  observabilityAndMonitoring: ObservabilityAndMonitoring;
  testingReadiness: TestingReadiness;
  onboardingAndIntegrations: OnboardingAndIntegrations;
  documentation: Documentation;
  approvalsAndSignOff: ApprovalsAndSignOff;
}

// ============================================================
// ADDITIONAL TYPES (For Page Listings & Filtering)
// ============================================================

export interface PRRListItem {
  aimId: string;
  projectName: string;
  platform: string;
  status: string;
  completionPercentage: number;
  releaseDate: string;
  lastUpdated: string;
}

export interface FilterOptions {
  platform?: string;
  status?: string;
  searchTerm?: string;
  sortBy?: 'name' | 'date' | 'completion' | 'platform';
  sortOrder?: 'asc' | 'desc';
}