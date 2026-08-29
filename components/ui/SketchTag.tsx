import React from "react";

export type SketchTagVariant = "a" | "b" | "c";
export type SketchTagColor =
  | "mint"
  | "yellow"
  | "pink"
  | "lavender"
  | "purple"
  | "cream";

const tagColors: Record<SketchTagColor, { bg: string; shadow: string }> = {
  mint: { bg: "#CFEBD8", shadow: "#76B9A5" },
  yellow: { bg: "#FFF0B0", shadow: "#D6B31E" },
  pink: { bg: "#F6B8B8", shadow: "#D98B95" },
  lavender: { bg: "#DCC8F6", shadow: "#A88ACD" },
  purple: { bg: "#7653D8", shadow: "#4C2E9E" },
  cream: { bg: "#FFF8E8", shadow: "rgba(23, 23, 42, 0.2)" },
};

const tagPaths: Record<SketchTagVariant, string> = {
  a: "M 4,6 C 24,2 76,4 96,2.5 C 98.5,14 97,36 96,46 C 74,48 26,46 3,47.5 C 1.5,34 3.5,18 4,6 Z",
  b: "M 3,4 C 32,5.5 68,2.5 97,4 C 95.5,18 98,34 96.5,46.5 C 68,45 32,47.5 2.5,45.5 C 3.5,32 1.5,16 3,4 Z",
  c: "M 4.5,3 C 28,4.5 72,2 96,4.5 C 98,18 96,34 97,46 C 70,48 28,45.5 3.5,47 C 2,34 4,18 4.5,3 Z",
};

const rotations: Record<SketchTagVariant, string> = {
  a: "-rotate-[0.6deg]",
  b: "rotate-[0.5deg]",
  c: "-rotate-[0.3deg]",
};

export function SketchTag({
  label,
  color = "mint",
  variant = "a",
  className = "",
}: {
  label: string;
  color?: SketchTagColor;
  variant?: SketchTagVariant;
  className?: string;
}) {
  const path = tagPaths[variant];
  const { bg, shadow } = tagColors[color];
  const textColor = color === "purple" ? "text-white" : "text-[#17172A]";

  return (
    <span
      className={`
        relative isolate inline-flex items-center justify-center px-3.5 py-1
        font-hand text-sm font-black leading-none transition-transform hover:-translate-y-0.5
        ${rotations[variant]} ${textColor} ${className}
      `}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 100 50"
      >
        {/* Offset Shadow */}
        <path d={path} fill={shadow} transform="translate(1.8, 2.2)" />
        {/* Foreground Tag Fill */}
        <path
          d={path}
          fill={bg}
          stroke="#17172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {label}
    </span>
  );
}

