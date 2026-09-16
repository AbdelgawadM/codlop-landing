"use client";

import { useMemo } from "react";

/**
 * Splits a string into masked words that rise into view when the element
 * gets the `.is-in` class (added by the global reveal observer).
 */
export function SplitText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  startIndex = 0,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  startIndex?: number;
}) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  return (
    <Tag className={`split ${className}`} style={{ "--delay": `${delay}ms` } as React.CSSProperties} aria-label={text}>
      {words.map((w, i) => (
        <span key={`${i}-${w}`} aria-hidden="true">
          <span className="w">
            <span style={{ "--i": startIndex + i } as React.CSSProperties}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
