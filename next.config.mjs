// next.config.js
const nextConfig = {
  images: {
   remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'img-cdn.pixlr.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fcai19-7.fna.fbcdn.net',
      },
    ],
  },
};

export default nextConfig;
