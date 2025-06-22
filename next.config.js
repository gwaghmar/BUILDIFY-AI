/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://sbpporlmfetxvmqfzzhg.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicHBvcmxtZmV0eHZtcWZ6emhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1Nzc4MTMsImV4cCI6MjA2NjE1MzgxM30.ZzGKiii-U_dSeDTxMNEWHgef6-bVMYvLEndT159o6FI',
  },
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig 