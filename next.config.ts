/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  distDir: 'out',
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
