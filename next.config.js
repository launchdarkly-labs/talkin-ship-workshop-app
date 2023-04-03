/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "http://localhost:4000/login",
      },
      {
        source: "/logout",
        destination: "http://localhost:4000/logout",
      },
    ];
  },
};

module.exports = nextConfig;
