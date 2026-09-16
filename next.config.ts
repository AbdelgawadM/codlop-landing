import type { NextConfig } from "next";

/**
 * Static export — the whole site is prerendered into /out.
 * Deploys anywhere that serves static files (GitHub Pages, Netlify, Vercel, cPanel…).
 *
 * GitHub Pages "project" sites live under https://<user>.github.io/<repo>/,
 * so the GitHub Actions workflow sets NEXT_PUBLIC_BASE_PATH=/<repo>.
 * Custom domains and user sites (<user>.github.io) leave it empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
