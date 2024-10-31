import { fileURLToPath } from "url";
import path from "path";

/** @type {import('next').NextConfig} */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/graphql`,
      },
      {
        source: "/api/auth/kakao",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/api/auth/kakao`,
      },
      {
        source: "/api/auth/naver",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/api/auth/naver`,
      },
      {
        source: "/api/collections",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/api/collections`,
      },
      {
        source: "/api/collections/:collId*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL_PORT}/api/collections/:collId*`,
      },
    ];
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")], // SCSS 전역 경로 설정
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "via.placholder.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "kr.object.ncloudstorage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "interview-bucket.kr.object.ncloudstorage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
