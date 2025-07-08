/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/home",    
        permanent: false,
      },
    ];
  },
  
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "mizan-me.vercel.app/"
     
    ],
  },
};

export default nextConfig;
