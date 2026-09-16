import localFont from "next/font/local";

/** English — Inter (variable). */
export const inter = localFont({
  src: "../fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  preload: true,
});

/** Arabic fallback — IBM Plex Sans Arabic. */
export const plexArabic = localFont({
  src: [
    { path: "../fonts/PlexArabic-400.woff2", weight: "400" },
    { path: "../fonts/PlexArabic-500.woff2", weight: "500" },
    { path: "../fonts/PlexArabic-600.woff2", weight: "600" },
    { path: "../fonts/PlexArabic-700.woff2", weight: "700" },
  ],
  variable: "--font-plex-ar",
  display: "swap",
  preload: true,
});

/**
 * CODLOP brand Arabic font — when the font files are available, drop them in
 * src/fonts/ and uncomment below, then add `codlopArabic.variable` to the <html>
 * className in layout.tsx and put `var(--font-codlop-ar)` first in `--font-ar`
 * inside globals.css.
 *
 * export const codlopArabic = localFont({
 *   src: [
 *     { path: "../fonts/Codlop-Regular.woff2", weight: "400" },
 *     { path: "../fonts/Codlop-Medium.woff2", weight: "500" },
 *     { path: "../fonts/Codlop-Bold.woff2", weight: "700" },
 *   ],
 *   variable: "--font-codlop-ar",
 *   display: "swap",
 * });
 */
