/** Prefixes a public asset path with the configured basePath (GitHub Pages project sites). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => (p.startsWith("/") ? `${BASE}${p}` : p);
