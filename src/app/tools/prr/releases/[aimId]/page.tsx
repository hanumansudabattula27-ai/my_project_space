// // src/app/prr/releases/[aimId]/page.tsx - FINAL IMPLEMENTATION

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';
// import { useParams, useRouter } from 'next/navigation';
// import { Edit, Trash2, CheckCircle, AlertCircle, ChevronUp, ChevronDown } from 'lucide-react';
// import { PRRApplication } from '@/types/prr/type';
// import { prrTheme, getTheme } from '@/lib/prr/theme';
// import Link from 'next/link';
 

// export default function ReleaseDetailsPage() {
//   const { resolvedTheme } = useTheme();
//   const router = useRouter();
//   const params = useParams();
//   const aimId = params.aimId as string;

//   const [mounted, setMounted] = useState(false);
//   const [release, setRelease] = useState<PRRApplication | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [expanded, setExpanded] = useState([true, true, true, true, true, true, true, true, true]);
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     setIsDark(resolvedTheme === 'dark');
//   }, [resolvedTheme]);

//   const theme = getTheme(isDark);

//   useEffect(() => {
//     const fetchRelease = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`/api/prr/releases/detail?aimId=${aimId}`);
//         const result = await response.json();

//         if (result.success) {
//           setRelease(result.data);
//         } else {
//           setError(result.error || 'Failed to fetch release');
//         }
//       } catch (err) {
//         setError('Failed to fetch release');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (mounted) {
//       fetchRelease();
//     }
//   }, [aimId, mounted]);

//   if (!mounted) return null;

//   if (isLoading) {
//     return (
//       <div className={`min-h-screen ${theme.background.secondary} flex items-center justify-center`}>
//         <div className="text-center">
//           <div className={`w-12 h-12 border-4 border-t-teal-600 ${theme.spinner} rounded-full animate-spin mx-auto mb-3`}></div>
//           <p className={theme.text.secondary}>Loading release details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !release) {
//     return (
//       <div className={`min-h-screen ${theme.background.secondary} p-4 md:p-6`}>
//         <div className="max-w-5xl mx-auto">
//           <div className={`${theme.error.background} border ${theme.error.border} p-6 rounded-lg`}>
//             <p className={theme.error.text}>{error || 'Release not found'}</p>
//             <Link href="/prr/releases" className={`mt-4 inline-block ${theme.button.primary} px-4 py-2 rounded-lg text-sm font-semibold`}>
//               Back to Releases
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const calculateCompletion = (): number => {
//     let completed = 0;
//     if (release.basicInformation.projectName) completed++;
//     if (release.featureAndDesignDetails.featureDetails) completed++;
//     if (release.platformConfiguration.numberOfZones.value) completed++;
//     if (release.deploymentAndGTMConfiguration.gtmStatus) completed++;
//     if (release.observabilityAndMonitoring.dashboardLinks.platforms.length > 0) completed++;
//     if (release.testingReadiness.regressionTesting.status) completed++;
//     if (release.onboardingAndIntegrations.fvaasOnboarding.status) completed++;
//     if (release.documentation.status) completed++;
//     if (Object.values(release.approvalsAndSignOff).some(a => a.name)) completed++;
//     return Math.round((completed / 9) * 100);
//   };

//   const completion = calculateCompletion();

//   const sections = [
//     {
//       title: 'Basic Information',
//       icon: CheckCircle,
//       status: 'complete' as const,
//       content: (
//         <div className="grid grid-cols-2 gap-3">
//           <FieldComponent label="Platform" value={release.basicInformation.platform} theme={theme} />
//           <FieldComponent label="Project Name" value={release.basicInformation.projectName} theme={theme} />
//           <FieldComponent label="Status" value={release.basicInformation.status} theme={theme} />
//           <FieldComponent label="Release Date" value={release.basicInformation.releaseDate} theme={theme} />
//         </div>
//       ),
//     },
//     {
//       title: 'Feature & Design Details',
//       icon: CheckCircle,
//       status: 'complete' as const,
//       content: (
//         <div className="space-y-2">
//           <FieldComponent label="Feature Details" value={release.featureAndDesignDetails.featureDetails} theme={theme} />
//           <FieldComponent label="API Design" value={release.featureAndDesignDetails.apiDesign} theme={theme} />
//           <FieldComponent label="API Endpoints" value={release.featureAndDesignDetails.apiEndpoints.join(', ')} theme={theme} />
//           <FieldComponent label="GitHub Repo" value={release.featureAndDesignDetails.gitHubRepo} isLink theme={theme} />
//           <FieldComponent label="Toggle Features" value={release.featureAndDesignDetails.toggleFeatures.value} theme={theme} />
//         </div>
//       ),
//     },
//     {
//       title: 'Platform Configuration',
//       icon: CheckCircle,
//       status: 'complete' as const,
//       content: (
//         <div className="space-y-2">
//           <WarningFieldComponent
//             label="GLOO/HSM"
//             value={release.platformConfiguration.glooHsm.type}
//             isWarning={release.platformConfiguration.glooHsm.color === 'red'}
//             theme={theme}
//           />
//           <WarningFieldComponent
//             label="Number of Zones"
//             value={release.platformConfiguration.numberOfZones.value}
//             isWarning={release.platformConfiguration.numberOfZones.color === 'red'}
//             theme={theme}
//           />
//           <FieldComponent label="Consumers" value={release.platformConfiguration.consumers.join(', ')} theme={theme} />
//         </div>
//       ),
//     },
//     {
//       title: 'Deployment & GTM Configuration',
//       icon: CheckCircle,
//       status: 'complete' as const,
//       content: (
//         <div className="space-y-2">
//           <FieldComponent label="GTM Status" value={release.deploymentAndGTMConfiguration.gtmStatus} theme={theme} />
//           <FieldComponent label="Health Check URL" value={release.deploymentAndGTMConfiguration.healthCheckURL} isLink theme={theme} />
//         </div>
//       ),
//     },
//     {
//       title: 'Observability & Monitoring',
//       icon: CheckCircle,
//       status: 'complete' as const,
//       content: (
//         <div className="space-y-2">
//           <FieldComponent label="Environment" value={release.observabilityAndMonitoring.dashboardLinks.environment} theme={theme} />
//           {release.observabilityAndMonitoring.dashboardLinks.platforms.map((p, idx) => (
//             <FieldComponent key={idx} label={`Dashboard (${p.name})`} value={p.url} isLink theme={theme} />
//           ))}
//           <FieldComponent label="Alerts Configured" value={release.observabilityAndMonitoring.alertsConfigured.status} theme={theme} />
//           <FieldComponent label="Alert Details" value={release.observabilityAndMonitoring.alertsConfigured.details} theme={theme} />
//         </div>
//       ),
//     },
//     {
//       title: 'Testing Readiness',
//       icon: AlertCircle,
//       status: 'partial' as const,
//       content: (
//         <div className="space-y-2">
//           <FieldComponent label="Regression Testing" value={release.testingReadiness.regressionTesting.status} theme={theme} />
//           <FieldComponent label="Regression Comments" value={release.testingReadiness.regressionTesting.comments} theme={theme} />
//           <FieldComponent label="Performance Testing" value={release.testingReadiness.performanceTesting.status} theme={theme} />
//           <FieldComponent label="Performance Comments" value={release.testingReadiness.performanceTesting.comments} theme={theme} />
//           <FieldComponent label="Chaos/Failover Testing" value={release.testingReadiness.chaosFailoverTesting.status} theme={theme} />
//           <FieldComponent label="Chaos Comments" value={release.testingReadiness.chaosFailoverTesting.comments} theme={theme} />
//         </div>
//       ),
//     },
//     {
//       title: 'Onboarding & Integrations',
//       icon: AlertCircle,
//       status: 'partial' as const,
//       content: (
//         <div className="space-y-2">
//           <FieldComponent label="FVAAS Onboarding" value={release.onboardingAndIntegrations.fvaasOnboarding.status} theme={theme} />
//           {release.onboardingAndIntegrations.fvaasOnboarding.link && (
//             <FieldComponent label="FVAAS Link" value={release.onboardingAndIntegrations.fvaasOnboarding.link} isLink theme={theme} />
//           )}
//           <FieldComponent label="EID Dashboard Onboarding" value={release.onboardingAndIntegrations.eidDashboardOnboarding.status} theme={theme} />
//           <FieldComponent label="DART Onboarding" value={release.onboardingAndIntegrations.dartOnboarding.status} theme={theme} />
//           <FieldComponent label="Resilience Tool Onboarding" value={release.onboardingAndIntegrations.resilienceToolOnboarding.status} theme={theme} />
//           <FieldComponent label="NetAppMapper Onboarding" value={release.onboardingAndIntegrations.netAppMapperOnboarding.status} theme={theme} />
//         </div>
//       ),
//     },
//     {
//       title: 'Documentation',
//       icon: CheckCircle,
//       status: 'complete' as const,
//       content: (
//         <div className="space-y-2">
//           <FieldComponent label="Documentation Status" value={release.documentation.status} theme={theme} />
//           <FieldComponent label="Documentation Content" value={release.documentation.content} theme={theme} />
//           <FieldComponent label="SRE Documentation" value={release.documentation.sreDocumentation} isLink theme={theme} />
//         </div>
//       ),
//     },
//     {
//       title: 'Approvals & Sign-Off',
//       icon: AlertCircle,
//       status: 'partial' as const,
//       content: (
//         <div className="space-y-3">
//           <ApprovalRowComponent label="SRE Reviewer" approval={release.approvalsAndSignOff.sreReviewer} theme={theme} />
//           <ApprovalRowComponent label="QA Lead" approval={release.approvalsAndSignOff.qaLead} theme={theme} />
//           <ApprovalRowComponent label="Product Owner" approval={release.approvalsAndSignOff.productOwner} theme={theme} />
//           <ApprovalRowComponent label="Engineering Owner" approval={release.approvalsAndSignOff.engineeringOwner} theme={theme} />
//         </div>
//       ),
//     },
//   ];

//   const toggleExpanded = (idx: number) => {
//     const newExpanded = [...expanded];
//     newExpanded[idx] = !newExpanded[idx];
//     setExpanded(newExpanded);
//   };

//   const toggleAll = (expandAll: boolean) => {
//     setExpanded(Array(9).fill(expandAll));
//   };

//   return (
//     <div className={` pt-25 min-h-screen ${theme.background.secondary} p-4 md:p-6`}>
//       <div className="max-w-6xl mx-auto pt-20">
//         {/* Header */}
//         <div className={`${theme.card.background} border ${theme.card.border} rounded-lg p-2 md:p-5 mb-4 ${theme.card.shadow}`}>
//           <div className="flex justify-between items-start gap-3 mb-4">
//             <div className="min-w-0">
//               <h1 className={`text-2xl md:text-3xl font-bold ${theme.text.primary} mb-1 truncate`}>{release.basicInformation.projectName}</h1>
//               <p className={theme.text.secondary}>AIM ID: {release.aimId}</p>
//             </div>
//             <div className="flex gap-2 flex-shrink-0">
//               <Link
//                 href={`/prr/releases/${release.aimId}/edit`}
//                 className={`flex items-center gap-1.5 px-3 md:px-4 py-2 ${theme.button.primary} rounded-lg font-semibold text-sm whitespace-nowrap`}
//               >
//                 <Edit className="w-4 h-4" /> Edit
//               </Link>
//               <button className={`flex items-center gap-1.5 px-3 md:px-4 py-2 ${theme.button.danger} rounded-lg font-semibold text-sm whitespace-nowrap`}>
//                 <Trash2 className="w-4 h-4" /> Delete
//               </button>
//             </div>
//           </div>

//           {/* Overall Readiness - Compact */}
//           {/* <div className="mt-4">
//             <div className="flex justify-between items-center mb-1.5">
//               <span className={`text-xs md:text-sm font-semibold ${theme.text.secondary} uppercase tracking-wider`}>Overall Readiness</span>
//               <span className={`text-2xl md:text-3xl font-bold text-teal-600`}>{completion}%</span>
//             </div>
//             <div className={`w-full h-2.5 rounded-full ${theme.progressBar.background} overflow-hidden`}>
//               <div className={`h-full ${theme.progressBar.fill} transition-all duration-300`} style={{ width: `${completion}%` }}></div>
//             </div>
//           </div> */}
//         </div>

//         {/* Controls - Compact */}
//         <div className="flex gap-2 mb-4">
//           <button
//             onClick={() => toggleAll(false)}
//             className={`px-3 py-1.5 border ${theme.card.border} rounded-lg text-xs md:text-sm font-semibold ${theme.text.primary} ${theme.card.hover} transition-colors`}
//           >
//             Collapse All
//           </button>
//           <button
//             onClick={() => toggleAll(true)}
//             className={`px-3 py-1.5 border ${theme.card.border} rounded-lg text-xs md:text-sm font-semibold ${theme.text.primary} ${theme.card.hover} transition-colors`}
//           >
//             Expand All
//           </button>
//         </div>

//         {/* Sections - ALL EXPANDED BY DEFAULT */}
//         <div className="space-y-2">
//           {sections.map((section, idx) => {
//             const Icon = section.icon;

//             return (
//               <div key={idx} className={`${theme.card.background} border ${theme.card.border} rounded-lg overflow-hidden`}>
//                 <button
//                   onClick={() => toggleExpanded(idx)}
//                   className={`w-full px-4 py-3 flex items-center justify-between ${theme.card.hover} transition-colors`}
//                 >
//                   <div className="flex items-center gap-2 min-w-0 flex-1 text-left">
//                     <Icon className={`w-5 h-5 flex-shrink-0 ${theme.sectionIcon[section.status]}`} />
//                     <h3 className={`font-semibold ${theme.text.primary} text-sm md:text-base truncate`}>
//                       {idx + 1}. {section.title}
//                     </h3>
//                   </div>

//                   <div className="flex items-center gap-2 ml-2 flex-shrink-0">
//                     {expanded[idx] ? (
//                       <ChevronUp className={`w-5 h-5 ${theme.text.secondary}`} />
//                     ) : (
//                       <ChevronDown className={`w-5 h-5 ${theme.text.secondary}`} />
//                     )}
//                   </div>
//                 </button>

//                 {expanded[idx] && (
//                   <div className={`border-t ${theme.card.border} px-4 py-3 ${theme.sectionContent.background}`}>
//                     {section.content}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Back Button */}
//         <div className="mt-6">
//           <Link href="/prr/releases" className={`inline-block px-4 py-2 border ${theme.card.border} rounded-lg ${theme.text.primary} font-semibold text-sm ${theme.card.hover}`}>
//             ← Back to Releases
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Field Component
// function FieldComponent({
//   label,
//   value,
//   isLink = false,
//   theme,
// }: {
//   label: string;
//   value: string;
//   isLink?: boolean;
//   theme: typeof prrTheme.light;
// }) {
//   return (
//     <div className="text-sm">
//       <p className={theme.sectionContent.label}>{label}</p>
//       {isLink && value ? (
//         <a href={value} target="_blank" rel="noopener noreferrer" className={`${theme.accent} underline truncate block`}>
//           {value}
//         </a>
//       ) : (
//         <p className={theme.sectionContent.value}>{value || '-'}</p>
//       )}
//     </div>
//   );
// }

// // Warning Field Component
// function WarningFieldComponent({
//   label,
//   value,
//   isWarning,
//   theme,
// }: {
//   label: string;
//   value: string;
//   isWarning: boolean;
//   theme: typeof prrTheme.light;
// }) {
//   return (
//     <div>
//       <p className={theme.sectionContent.label}>{label}</p>
//       <div className={`px-3 py-1.5 rounded text-xs font-semibold ${isWarning ? theme.warning.red : theme.warning.green}`}>
//         {value} {isWarning ? '⚠️' : '✓'}
//       </div>
//     </div>
//   );
// }

// // Approval Row Component
// function ApprovalRowComponent({
//   label,
//   approval,
//   theme,
// }: {
//   label: string;
//   approval: { name: string; date: string; comments: string };
//   theme: typeof prrTheme.light;
// }) {
//   return (
//     <div className={`p-3 rounded border ${theme.card.border}`}>
//       <p className={`text-xs font-semibold ${theme.text.secondary} mb-2 uppercase tracking-wider`}>{label}</p>
//       <div className="grid grid-cols-3 gap-2 text-xs">
//         <div>
//           <p className={theme.text.tertiary}>Name</p>
//           <p className={theme.text.primary}>{approval.name || '-'}</p>
//         </div>
//         <div>
//           <p className={theme.text.tertiary}>Date</p>
//           <p className={theme.text.primary}>{approval.date || '-'}</p>
//         </div>
//         <div>
//           <p className={theme.text.tertiary}>Comments</p>
//           <p className={theme.text.primary}>{approval.comments || '-'}</p>
//         </div>
//       </div>
//     </div>
//   );
// }







// src/app/prr/releases/[aimId]/page.tsx - UPDATED WITH MODAL

'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useParams, useRouter } from 'next/navigation';
import { Edit, Trash2, CheckCircle, AlertCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { PRRApplication } from '@/types/prr/type';
import { prrTheme, getTheme } from '@/lib/prr/theme';
import Link from 'next/link';
import AddEditPRRReleaseModal from '@/components/prr/modals/addeditreleasemodal';

export default function ReleaseDetailsPage() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const params = useParams();
  const aimId = params.aimId as string;

  const [mounted, setMounted] = useState(false);
  const [release, setRelease] = useState<PRRApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState([true, true, true, true, true, true, true, true, true]);
  const [isDark, setIsDark] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const theme = getTheme(isDark);

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/prr/releases/detail?aimId=${aimId}`);
        const result = await response.json();

        if (result.success) {
          setRelease(result.data);
        } else {
          setError(result.error || 'Failed to fetch release');
        }
      } catch (err) {
        setError('Failed to fetch release');
      } finally {
        setIsLoading(false);
      }
    };

    if (mounted) {
      fetchRelease();
    }
  }, [aimId, mounted]);

  const handleSaveRelease = async (data: PRRApplication) => {
    try {
      const response = await fetch(`/api/prr/releases/[aimId]?aimId=${data.aimId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setRelease(result.data);
        setIsModalOpen(false);
      } else {
        throw new Error(result.error || 'Failed to update release');
      }
    } catch (err) {
      console.error('Error saving release:', err);
      alert('Failed to update release. Please try again.');
    }
  };

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme.background.secondary} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`w-12 h-12 border-4 border-t-teal-600 ${theme.spinner} rounded-full animate-spin mx-auto mb-3`}></div>
          <p className={theme.text.secondary}>Loading release details...</p>
        </div>
      </div>
    );
  }

  if (error || !release) {
    return (
      <div className={`min-h-screen ${theme.background.secondary} p-4 md:p-6`}>
        <div className="max-w-5xl mx-auto">
          <div className={`${theme.error.background} border ${theme.error.border} p-6 rounded-lg`}>
            <p className={theme.error.text}>{error || 'Release not found'}</p>
            <Link href="/prr/releases" className={`mt-4 inline-block ${theme.button.primary} px-4 py-2 rounded-lg text-sm font-semibold`}>
              Back to Releases
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const calculateCompletion = (): number => {
    let completed = 0;
    if (release.basicInformation.projectName) completed++;
    if (release.featureAndDesignDetails.featureDetails) completed++;
    if (release.platformConfiguration.numberOfZones.value) completed++;
    if (release.deploymentAndGTMConfiguration.gtmStatus) completed++;
    if (release.observabilityAndMonitoring.dashboardLinks.platforms.length > 0) completed++;
    if (release.testingReadiness.regressionTesting.status) completed++;
    if (release.onboardingAndIntegrations.fvaasOnboarding.status) completed++;
    if (release.documentation.status) completed++;
    if (Object.values(release.approvalsAndSignOff).some(a => a.name)) completed++;
    return Math.round((completed / 9) * 100);
  };

  const completion = calculateCompletion();

  const sections = [
    {
      title: 'Basic Information',
      icon: CheckCircle,
      status: 'complete' as const,
      content: (
        <div className="grid grid-cols-2 gap-3">
          <FieldComponent label="Platform" value={release.basicInformation.platform} theme={theme} />
          <FieldComponent label="Project Name" value={release.basicInformation.projectName} theme={theme} />
          <FieldComponent label="Status" value={release.basicInformation.status} theme={theme} />
          <FieldComponent label="Release Date" value={release.basicInformation.releaseDate} theme={theme} />
        </div>
      ),
    },
    {
      title: 'Feature & Design Details',
      icon: CheckCircle,
      status: 'complete' as const,
      content: (
        <div className="space-y-2">
          <FieldComponent label="Feature Details" value={release.featureAndDesignDetails.featureDetails} theme={theme} />
          <FieldComponent label="API Design" value={release.featureAndDesignDetails.apiDesign} theme={theme} />
          <FieldComponent label="API Endpoints" value={release.featureAndDesignDetails.apiEndpoints.join(', ')} theme={theme} />
          <FieldComponent label="GitHub Repo" value={release.featureAndDesignDetails.gitHubRepo} isLink theme={theme} />
          <FieldComponent label="Toggle Features" value={release.featureAndDesignDetails.toggleFeatures.value} theme={theme} />
        </div>
      ),
    },
    {
      title: 'Platform Configuration',
      icon: CheckCircle,
      status: 'complete' as const,
      content: (
        <div className="space-y-2">
          <WarningFieldComponent
            label="GLOO/HSM"
            value={release.platformConfiguration.glooHsm.type}
            isWarning={release.platformConfiguration.glooHsm.color === 'red'}
            theme={theme}
          />
          <WarningFieldComponent
            label="Number of Zones"
            value={release.platformConfiguration.numberOfZones.value}
            isWarning={release.platformConfiguration.numberOfZones.color === 'red'}
            theme={theme}
          />
          <FieldComponent label="Consumers" value={release.platformConfiguration.consumers.join(', ')} theme={theme} />
        </div>
      ),
    },
    {
      title: 'Deployment & GTM Configuration',
      icon: CheckCircle,
      status: 'complete' as const,
      content: (
        <div className="space-y-2">
          <FieldComponent label="GTM Status" value={release.deploymentAndGTMConfiguration.gtmStatus} theme={theme} />
          <FieldComponent label="Health Check URL" value={release.deploymentAndGTMConfiguration.healthCheckURL} isLink theme={theme} />
        </div>
      ),
    },
    {
      title: 'Observability & Monitoring',
      icon: CheckCircle,
      status: 'complete' as const,
      content: (
        <div className="space-y-2">
          <FieldComponent label="Environment" value={release.observabilityAndMonitoring.dashboardLinks.environment} theme={theme} />
          {release.observabilityAndMonitoring.dashboardLinks.platforms.map((p, idx) => (
            <FieldComponent key={idx} label={`Dashboard (${p.name})`} value={p.url} isLink theme={theme} />
          ))}
          <FieldComponent label="Alerts Configured" value={release.observabilityAndMonitoring.alertsConfigured.status} theme={theme} />
          <FieldComponent label="Alert Details" value={release.observabilityAndMonitoring.alertsConfigured.details} theme={theme} />
        </div>
      ),
    },
    {
      title: 'Testing Readiness',
      icon: AlertCircle,
      status: 'partial' as const,
      content: (
        <div className="space-y-2">
          <FieldComponent label="Regression Testing" value={release.testingReadiness.regressionTesting.status} theme={theme} />
          <FieldComponent label="Regression Comments" value={release.testingReadiness.regressionTesting.comments} theme={theme} />
          <FieldComponent label="Performance Testing" value={release.testingReadiness.performanceTesting.status} theme={theme} />
          <FieldComponent label="Performance Comments" value={release.testingReadiness.performanceTesting.comments} theme={theme} />
          <FieldComponent label="Chaos/Failover Testing" value={release.testingReadiness.chaosFailoverTesting.status} theme={theme} />
          <FieldComponent label="Chaos Comments" value={release.testingReadiness.chaosFailoverTesting.comments} theme={theme} />
        </div>
      ),
    },
    {
      title: 'Onboarding & Integrations',
      icon: AlertCircle,
      status: 'partial' as const,
      content: (
        <div className="space-y-2">
          <FieldComponent label="FVAAS Onboarding" value={release.onboardingAndIntegrations.fvaasOnboarding.status} theme={theme} />
          {release.onboardingAndIntegrations.fvaasOnboarding.link && (
            <FieldComponent label="FVAAS Link" value={release.onboardingAndIntegrations.fvaasOnboarding.link} isLink theme={theme} />
          )}
          <FieldComponent label="EID Dashboard Onboarding" value={release.onboardingAndIntegrations.eidDashboardOnboarding.status} theme={theme} />
          <FieldComponent label="DART Onboarding" value={release.onboardingAndIntegrations.dartOnboarding.status} theme={theme} />
          <FieldComponent label="Resilience Tool Onboarding" value={release.onboardingAndIntegrations.resilienceToolOnboarding.status} theme={theme} />
          <FieldComponent label="NetAppMapper Onboarding" value={release.onboardingAndIntegrations.netAppMapperOnboarding.status} theme={theme} />
        </div>
      ),
    },
    {
      title: 'Documentation',
      icon: CheckCircle,
      status: 'complete' as const,
      content: (
        <div className="space-y-2">
          <FieldComponent label="Documentation Status" value={release.documentation.status} theme={theme} />
          <FieldComponent label="Documentation Content" value={release.documentation.content} theme={theme} />
          <FieldComponent label="SRE Documentation" value={release.documentation.sreDocumentation} isLink theme={theme} />
        </div>
      ),
    },
    {
      title: 'Approvals & Sign-Off',
      icon: AlertCircle,
      status: 'partial' as const,
      content: (
        <div className="space-y-3">
          <ApprovalRowComponent label="SRE Reviewer" approval={release.approvalsAndSignOff.sreReviewer} theme={theme} />
          <ApprovalRowComponent label="QA Lead" approval={release.approvalsAndSignOff.qaLead} theme={theme} />
          <ApprovalRowComponent label="Product Owner" approval={release.approvalsAndSignOff.productOwner} theme={theme} />
          <ApprovalRowComponent label="Engineering Owner" approval={release.approvalsAndSignOff.engineeringOwner} theme={theme} />
        </div>
      ),
    },
  ];

  const toggleExpanded = (idx: number) => {
    const newExpanded = [...expanded];
    newExpanded[idx] = !newExpanded[idx];
    setExpanded(newExpanded);
  };

  const toggleAll = (expandAll: boolean) => {
    setExpanded(Array(9).fill(expandAll));
  };

  return (
    <div className={` pt-25 min-h-screen ${theme.background.secondary} p-4 md:p-6`}>
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header */}
        <div className={`${theme.card.background} border ${theme.card.border} rounded-lg p-2 md:p-5 mb-4 ${theme.card.shadow}`}>
          <div className="flex justify-between items-start gap-3 mb-4">
            <div className="min-w-0">
              <h1 className={`text-2xl md:text-3xl font-bold ${theme.text.primary} mb-1 truncate`}>{release.basicInformation.projectName}</h1>
              <p className={theme.text.secondary}>AIM ID: {release.aimId}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-1.5 px-3 md:px-4 py-2 ${theme.button.primary} rounded-lg font-semibold text-sm whitespace-nowrap`}
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button className={`flex items-center gap-1.5 px-3 md:px-4 py-2 ${theme.button.danger} rounded-lg font-semibold text-sm whitespace-nowrap`}>
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* Controls - Compact */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => toggleAll(false)}
            className={`px-3 py-1.5 border ${theme.card.border} rounded-lg text-xs md:text-sm font-semibold ${theme.text.primary} ${theme.card.hover} transition-colors`}
          >
            Collapse All
          </button>
          <button
            onClick={() => toggleAll(true)}
            className={`px-3 py-1.5 border ${theme.card.border} rounded-lg text-xs md:text-sm font-semibold ${theme.text.primary} ${theme.card.hover} transition-colors`}
          >
            Expand All
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-2">
          {sections.map((section, idx) => {
            const Icon = section.icon;

            return (
              <div key={idx} className={`${theme.card.background} border ${theme.card.border} rounded-lg overflow-hidden`}>
                <button
                  onClick={() => toggleExpanded(idx)}
                  className={`w-full px-4 py-3 flex items-center justify-between ${theme.card.hover} transition-colors`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 text-left">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${theme.sectionIcon[section.status]}`} />
                    <h3 className={`font-semibold ${theme.text.primary} text-sm md:text-base truncate`}>
                      {idx + 1}. {section.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    {expanded[idx] ? (
                      <ChevronUp className={`w-5 h-5 ${theme.text.secondary}`} />
                    ) : (
                      <ChevronDown className={`w-5 h-5 ${theme.text.secondary}`} />
                    )}
                  </div>
                </button>

                {expanded[idx] && (
                  <div className={`border-t ${theme.card.border} px-4 py-3 ${theme.sectionContent.background}`}>
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link href="/prr/releases" className={`inline-block px-4 py-2 border ${theme.card.border} rounded-lg ${theme.text.primary} font-semibold text-sm ${theme.card.hover}`}>
            ← Back to Releases
          </Link>
        </div>
      </div>

      {/* Modal */}
      <AddEditPRRReleaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRelease}
        initialData={release}
        mode="edit"
      />
    </div>
  );
}

// Field Component
function FieldComponent({
  label,
  value,
  isLink = false,
  theme,
}: {
  label: string;
  value: string;
  isLink?: boolean;
  theme: typeof prrTheme.light;
}) {
  return (
    <div className="text-sm">
      <p className={theme.sectionContent.label}>{label}</p>
      {isLink && value ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className={`${theme.accent} underline truncate block`}>
          {value}
        </a>
      ) : (
        <p className={theme.sectionContent.value}>{value || '-'}</p>
      )}
    </div>
  );
}

// Warning Field Component
function WarningFieldComponent({
  label,
  value,
  isWarning,
  theme,
}: {
  label: string;
  value: string;
  isWarning: boolean;
  theme: typeof prrTheme.light;
}) {
  return (
    <div>
      <p className={theme.sectionContent.label}>{label}</p>
      <div className={`px-3 py-1.5 rounded text-xs font-semibold ${isWarning ? theme.warning.red : theme.warning.green}`}>
        {value} {isWarning ? '⚠️' : '✓'}
      </div>
    </div>
  );
}

// Approval Row Component
function ApprovalRowComponent({
  label,
  approval,
  theme,
}: {
  label: string;
  approval: { name: string; date: string; comments: string };
  theme: typeof prrTheme.light;
}) {
  return (
    <div className={`p-3 rounded border ${theme.card.border}`}>
      <p className={`text-xs font-semibold ${theme.text.secondary} mb-2 uppercase tracking-wider`}>{label}</p>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className={theme.text.tertiary}>Name</p>
          <p className={theme.text.primary}>{approval.name || '-'}</p>
        </div>
        <div>
          <p className={theme.text.tertiary}>Date</p>
          <p className={theme.text.primary}>{approval.date || '-'}</p>
        </div>
        <div>
          <p className={theme.text.tertiary}>Comments</p>
          <p className={theme.text.primary}>{approval.comments || '-'}</p>
        </div>
      </div>
    </div>
  );
}