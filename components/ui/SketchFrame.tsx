import React, { ReactNode } from "react";
import { SketchBorderVariant } from "./SketchBorder";

export type SketchFrameFill =
  | "cream"
  | "white"
  | "yellow"
  | "soft-yellow"
  | "mint"
  | "pink"
  | "lavender"
  | "soft-purple"
  | "transparent";

export type SketchFrameShadow =
  | "purple"
  | "yellow"
  | "pink"
  | "mint"
  | "ink"
  | "soft-purple"
  | "none";

const fillColors: Record<SketchFrameFill, string> = {
  cream: "#FFF8E8",
  white: "#FFFDFC",
  yellow: "#F9E37D",
  "soft-yellow": "#FFF0B0",
  mint: "#CFEBD8",
  pink: "#F6B8B8",
  lavender: "#DCC8F6",
  "soft-purple": "#D6C0ED",
  transparent: "transparent",
};

const shadowColors: Record<SketchFrameShadow, string> = {
  purple: "#7653D8",
  "soft-purple": "#A88ACD",
  yellow: "#E2C95B",
  pink: "#D98B95",
  mint: "#76B9A5",
  ink: "rgba(23, 23, 42, 0.15)",
  none: "transparent",
};

const framePaths: Record<SketchBorderVariant, string> = {
  a: "M 3,4 C 28,1.5 72,3.5 97,2 C 98.8,24 97.2,74 98,96.5 C 74,98 26,96.5 2.5,97.5 C 1.2,76 3.5,26 3,4 Z",
  b: "M 2.5,3 C 32,4.8 68,1.8 97.5,3.5 C 96.2,28 98.5,72 97,97 C 68,95.5 34,98 2,96 C 3.5,70 1.5,28 2.5,3 Z",
  c: "M 4,2 C 26,3.8 74,1.5 96.5,4 C 98,30 96.5,68 97.5,96 C 72,98 28,95.5 3,97.5 C 1.8,72 3.8,32 4,2 Z",
  d: "M 2,4.5 C 34,2 66,4 98,2.5 C 96.5,26 98.2,76 96.8,97.5 C 66,96 32,98 2.5,96 C 3.8,74 1.8,24 2,4.5 Z",
  e: "M 3.5,3 C 30,1.8 70,4.2 96.8,2.5 C 98.5,28 97,72 98,96.8 C 70,98.2 30,96 2.5,97.5 C 1.5,70 3.8,30 3.5,3 Z",
};

const secondaryPaths: Record<SketchBorderVariant, string> = {
  a: "M 4.5,5.5 C 30,3 74,5 95.5,3.8 C 97.2,25.5 95.8,72.5 96.5,95 C 72.5,96.5 27.5,95 4,96 C 2.8,74.5 4.8,27.5 4.5,5.5 Z",
  b: "M 4,4.5 C 33,6 69,3.5 96,5 C 94.8,29.5 97,70.5 95.5,95.5 C 67,94 35.5,96.5 3.5,94.5 C 5,68.5 3,29.5 4,4.5 Z",
  c: "M 5.5,3.5 C 27.5,5.2 72.5,3 95,5.5 C 96.5,31.5 95,66.5 96,94.5 C 70.5,96.5 29.5,94 4.5,96 C 3.2,70.5 5.2,33.5 5.5,3.5 Z",
  d: "M 3.5,6 C 35,3.5 67,5.5 96.5,4 C 95,27.5 96.8,74.5 95.2,96 C 64.5,94.5 33.5,96.5 4,94.5 C 5.2,72.5 3.2,25.5 3.5,6 Z",
  e: "M 5,4.5 C 31.5,3.2 68.5,5.8 95.2,4 C 97,29.5 95.5,70.5 96.5,95.2 C 68.5,96.8 31.5,94.5 4,96 C 3,68.5 5.2,31.5 5,4.5 Z",
};

export function SketchFrame({
  children,
  variant = "a",
  fill = "white",
  shadow = "purple",
  shadowX = 5,
  shadowY = 6,
  stroke = "#17172A",
  strokeWidth = 2.2,
  doubleLine = true,
  className = "",
}: {
  children?: ReactNode;
  variant?: SketchBorderVariant;
  fill?: SketchFrameFill;
  shadow?: SketchFrameShadow;
  shadowX?: number;
  shadowY?: number;
  stroke?: string;
  strokeWidth?: number;
  doubleLine?: boolean;
  className?: string;
}) {
  const path = framePaths[variant];
  const secondPath = secondaryPaths[variant];
  const fillColor = fillColors[fill];
  const shadowColor = shadowColors[shadow];
  const hasShadow = shadow !== "none" && shadowColor !== "transparent";

  return (
    <div className={`relative isolate ${className}`}>
      {/* SVG Background, Shadow Layer & Ink Border */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* Distorted Offset Colored Shadow */}
        {hasShadow && (
          <path
            d={path}
            fill={shadowColor}
            transform={`translate(${shadowX * 0.45} ${shadowY * 0.55})`}
          />
        )}

        {/* Foreground Paper / Pastel Fill */}
        <path
          d={path}
          fill={fillColor}
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />

        {/* Subtle Double Sketch Line */}
        {doubleLine && secondPath && (
          <path
            d={secondPath}
            fill="none"
            opacity="0.18"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={Math.max(1, strokeWidth * 0.5)}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Actual HTML Content inside frame */}
      {children}
    </div>
  );
}

