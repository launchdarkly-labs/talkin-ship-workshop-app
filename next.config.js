/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/checkout",
        destination: "http://localhost:4000/checkout",
      },
      {
        source: "/form",
        destination: "http://localhost:4000/form",
      },
      {
        source: "/api",
        destination: "http://localhost:4000/api",
      },
      {
        source: "/inventory",
        destination: "http://localhost:4000/inventory",
      },
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
