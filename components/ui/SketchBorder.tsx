import React from "react";

export type SketchBorderVariant = "a" | "b" | "c" | "d" | "e";

const borderPaths: Record<SketchBorderVariant, { primary: string; secondary?: string }> = {
  a: {
    primary:
      "M 3,4 C 28,1.5 72,3.5 97,2 C 98.8,24 97.2,74 98,96.5 C 74,98 26,96.5 2.5,97.5 C 1.2,76 3.5,26 3,4 Z",
    secondary:
      "M 4.5,5.5 C 30,3 74,5 95.5,3.8 C 97.2,25.5 95.8,72.5 96.5,95 C 72.5,96.5 27.5,95 4,96 C 2.8,74.5 4.8,27.5 4.5,5.5 Z",
  },
  b: {
    primary:
      "M 2.5,3 C 32,4.8 68,1.8 97.5,3.5 C 96.2,28 98.5,72 97,97 C 68,95.5 34,98 2,96 C 3.5,70 1.5,28 2.5,3 Z",
    secondary:
      "M 4,4.5 C 33,6 69,3.5 96,5 C 94.8,29.5 97,70.5 95.5,95.5 C 67,94 35.5,96.5 3.5,94.5 C 5,68.5 3,29.5 4,4.5 Z",
  },
  c: {
    primary:
      "M 4,2 C 26,3.8 74,1.5 96.5,4 C 98,30 96.5,68 97.5,96 C 72,98 28,95.5 3,97.5 C 1.8,72 3.8,32 4,2 Z",
    secondary:
      "M 5.5,3.5 C 27.5,5.2 72.5,3 95,5.5 C 96.5,31.5 95,66.5 96,94.5 C 70.5,96.5 29.5,94 4.5,96 C 3.2,70.5 5.2,33.5 5.5,3.5 Z",
  },
  d: {
    primary:
      "M 2,4.5 C 34,2 66,4 98,2.5 C 96.5,26 98.2,76 96.8,97.5 C 66,96 32,98 2.5,96 C 3.8,74 1.8,24 2,4.5 Z",
    secondary:
      "M 3.5,6 C 35,3.5 67,5.5 96.5,4 C 95,27.5 96.8,74.5 95.2,96 C 64.5,94.5 33.5,96.5 4,94.5 C 5.2,72.5 3.2,25.5 3.5,6 Z",
  },
  e: {
    primary:
      "M 3.5,3 C 30,1.8 70,4.2 96.8,2.5 C 98.5,28 97,72 98,96.8 C 70,98.2 30,96 2.5,97.5 C 1.5,70 3.8,30 3.5,3 Z",
    secondary:
      "M 5,4.5 C 31.5,3.2 68.5,5.8 95.2,4 C 97,29.5 95.5,70.5 96.5,95.2 C 68.5,96.8 31.5,94.5 4,96 C 3,68.5 5.2,31.5 5,4.5 Z",
  },
};

export function SketchBorder({
  variant = "a",
  stroke = "#17172A",
  strokeWidth = 2.2,
  doubleLine = true,
  className = "pointer-events-none absolute inset-0 h-full w-full overflow-visible",
}: {
  variant?: SketchBorderVariant;
  stroke?: string;
  strokeWidth?: number;
  doubleLine?: boolean;
  className?: string;
}) {
  const pathData = borderPaths[variant];

  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {/* Primary hand-drawn ink stroke */}
      <path
        d={pathData.primary}
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
      {/* Subtle second sketch line for ink effect */}
      {doubleLine && pathData.secondary && (
        <path
          d={pathData.secondary}
          fill="none"
          opacity="0.22"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={Math.max(1, strokeWidth * 0.55)}
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

