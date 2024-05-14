/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/todos",
        destination: "http://localhost:8000/todos",
      },
    ];
  },
};

export default nextConfig;
