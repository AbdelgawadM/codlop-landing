/**
 * Official COD LOP SOFTWARE logo (from the brand file). Two transparent
 * variants are shipped in public/brand/: white text for dark grounds and navy
 * text for light grounds; the cyan mark is identical in both. Which one shows
 * is decided by the <html data-theme> attribute in CSS.
 */
import { asset } from "@/lib/paths";

export function Logo({ className = "", height = 30 }: { className?: string; height?: number }) {
  const width = Math.round(height * 3.2);
  return (
    <span className={`logo ${className}`} style={{ display: "inline-block", lineHeight: 0 }}>
      <img className="logo-light" src={asset("/brand/logo-light.webp")} alt="COD LOP SOFTWARE" width={width} height={height} style={{ height, width: "auto" }} decoding="async" />
      <img className="logo-dark" src={asset("/brand/logo-dark.webp")} alt="" aria-hidden="true" width={width} height={height} style={{ height, width: "auto" }} decoding="async" />
    </span>
  );
}
