import { fileURLToPath } from "url";
import path from "path";

/** @type {import('next').NextConfig} */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")], // SCSS 전역 경로 설정
  },
};

export default nextConfig;
