export type ToolLink = {
  name: string;
  desc: string;
  env: Env[];
};

export type Env = {
  type: string;
  url: "NEXT_PUBLIC_E1_GRAFANA_URL"|"NEXT_PUBLIC_E2_GRAFANA_URL"|"NEXT_PUBLIC_E3_GRAFANA_URL"|"NEXT_PUBLIC_E1_ELK_URL"|"NEXT_PUBLIC_E2_ELK_URL"|"NEXT_PUBLIC_E3_ELK_URL"|"NEXT_PUBLIC_E1_EAG_URL"|"NEXT_PUBLIC_E2_EAG_URL"|"NEXT_PUBLIC_E3_EAG_URL"| "NEXT_PUBLIC_E1_APIGEE_URL"|"NEXT_PUBLIC_E2_APIGEE_URL"|"NEXT_PUBLIC_E3_APIGEE_URL"| "NEXT_PUBLIC_E1_DYNATRACE_URL"|"NEXT_PUBLIC_E2_DYNATRACE_URL"|"NEXT_PUBLIC_E3_DYNATRACE_URL";
}

export const externalTools: ToolLink[] = [
  { 
    name: "Grafana", 
    desc: "AI-Powered application performance monitoring solution", 
    env: [
      {
        url: "NEXT_PUBLIC_E1_GRAFANA_URL", 
        type: "E1" 
      },
      {
        url: "NEXT_PUBLIC_E2_GRAFANA_URL", 
        type: "E2" 
      },
      {
        url: "NEXT_PUBLIC_E3_GRAFANA_URL", 
        type: "E3" 
      }
    ]
  },
  { 
    name: "ELK", 
    desc: "Open-source log management and analysis stack", 
    env: [
      {
        url: "NEXT_PUBLIC_E1_ELK_URL", 
        type: "E1" 
      },
      {
        url: "NEXT_PUBLIC_E2_ELK_URL", 
        type: "E2" 
      },
      {
        url: "NEXT_PUBLIC_E3_ELK_URL", 
        type: "E3" 
      }
    ]
  },
  
  { 
    name: "Apigee", 
    desc: "API management platform for seamless integration and scalability", 
    env: [
      {
        url: "NEXT_PUBLIC_E1_APIGEE_URL", 
        type: "E1" 
      },
      {
        url: "NEXT_PUBLIC_E2_APIGEE_URL", 
        type: "E2" 
      },
      {
        url: "NEXT_PUBLIC_E3_APIGEE_URL", 
        type: "E3" 
      }
    ]
  },
  { 
    name: "EAG", 
    desc: "Cloud-based containerization platform for app management", 
    env: [
      {
        url: "NEXT_PUBLIC_E1_EAG_URL", 
        type: "E1" 
      },
      {
        url: "NEXT_PUBLIC_E2_EAG_URL", 
        type: "E2" 
      },
      {
        url: "NEXT_PUBLIC_E3_EAG_URL", 
        type: "E3" 
      }
    ]
  },
  { 
    name: "Dynatrace", 
    desc: "AI-Powered application performance monitoring solution", 
    env: [
      {
        url: "NEXT_PUBLIC_E1_DYNATRACE_URL", 
        type: "E1" 
      },
      {
        url: "NEXT_PUBLIC_E2_DYNATRACE_URL", 
        type: "E2" 
      },
      {
        url: "NEXT_PUBLIC_E3_DYNATRACE_URL", 
        type: "E3" 
      }
    ]
  },
];