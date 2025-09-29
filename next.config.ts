import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_E1_GRAFANA_URL: 'https://www.google.com',
    NEXT_PUBLIC_E1_EAG_URL: 'https://www.yahoo.com',
  },
  // ... your other config options
}

export default nextConfig