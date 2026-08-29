import React, { ReactNode } from "react";

export type OrganicBlobVariant = "a" | "b" | "c" | "d" | "e";
export type OrganicBlobColor =
  | "mint"
  | "yellow"
  | "pink"
  | "lavender"
  | "soft-green"
  | "soft-yellow"
  | "soft-purple"
  | "cream"
  | "white";

const blobColors: Record<OrganicBlobColor, string> = {
  mint: "#CFEBD8",
  yellow: "#F9E37D",
  pink: "#F6B8B8",
  lavender: "#DCC8F6",
  "soft-green": "#BFDFAE",
  "soft-yellow": "#FFF0B0",
  "soft-purple": "#D6C0ED",
  cream: "#FFF8E8",
  white: "#FFFDFC",
};

const shadowColors: Record<string, string> = {
  purple: "#7653D8",
  yellow: "#E2C95B",
  pink: "#D98B95",
  mint: "#76B9A5",
  ink: "rgba(23, 23, 42, 0.18)",
  none: "transparent",
};

const blobPaths: Record<OrganicBlobVariant, string> = {
  a: "M 48,3 C 74,1 94,18 96,44 C 98,70 82,92 56,96 C 30,100 8,84 4,58 C 0,32 22,5 48,3 Z",
  b: "M 44,2 C 72,-1 95,16 97,42 C 99,68 84,90 58,95 C 32,100 6,85 3,59 C 0,33 16,5 44,2 Z",
  c: "M 52,2 C 78,4 96,24 95,50 C 94,76 76,95 50,96 C 24,97 4,80 3,54 C 2,28 26,0 52,2 Z",
  d: "M 42,3 C 68,-2 92,14 96,38 C 100,64 86,88 60,94 C 34,100 8,86 4,60 C 0,34 16,8 42,3 Z",
  e: "M 50,2 C 76,0 95,20 95,46 C 95,72 78,94 52,95 C 26,96 5,78 4,52 C 3,26 24,4 50,2 Z",
};

export function OrganicBlob({
  children,
  variant = "a",
  color = "mint",
  shadow = "ink",
  stroke = "#17172A",
  strokeWidth = 2.2,
  className = "w-16 h-16",
}: {
  children?: ReactNode;
  variant?: OrganicBlobVariant;
  color?: OrganicBlobColor | string;
  shadow?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const path = blobPaths[variant];
  const fillColor = (blobColors as Record<string, string>)[color] || color;
  const shadowColor = shadowColors[shadow] || shadow;
  const hasShadow = shadow !== "none" && shadowColor !== "transparent";

  return (
    <span className={`relative isolate grid place-items-center flex-none ${className}`}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
      >
        {/* Shadow blob */}
        {hasShadow && (
          <path
            d={path}
            fill={shadowColor}
            transform="translate(2.5, 3.5)"
          />
        )}
        {/* Main organic blob */}
        <path
          d={path}
          fill={fillColor}
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        {/* Subtle sketch contour line */}
        <path
          d={path}
          fill="none"
          opacity="0.2"
          stroke={stroke}
          strokeDasharray="2 3"
          strokeWidth="0.8"
          transform="translate(0.5, -0.5)"
        />
      </svg>
      {children}
    </span>
  );
}

