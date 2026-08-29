import React from "react";

export type MarkerUnderlineColor = "yellow" | "pink" | "purple" | "mint";

const strokeColors: Record<MarkerUnderlineColor, string> = {
  yellow: "#F9E37D",
  pink: "#F6B8B8",
  purple: "#7653D8",
  mint: "#CFEBD8",
};

export function MarkerUnderline({
  color = "yellow",
  className = "h-5 w-full",
}: {
  color?: MarkerUnderlineColor;
  className?: string;
}) {
  const strokeColor = strokeColors[color];

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute -bottom-3 left-0 overflow-visible ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 300 20"
    >
      {/* Primary marker stroke */}
      <path
        d="M 4,8 C 75,3 150,12 225,7 C 255,5 285,9 296,6"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
      {/* Secondary overlapping imperfect stroke */}
      <path
        d="M 12,13 C 85,9 180,15 288,11"
        fill="none"
        opacity="0.45"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

