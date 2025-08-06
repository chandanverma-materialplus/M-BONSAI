/** @type {import('next').NextConfig} */
const nextConfig = {
  // <----- add this
  output: 'standalone',

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['api.dicebear.com', 'blob.v0.dev'],
    unoptimized: true,
  },
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;
