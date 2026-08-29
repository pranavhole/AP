import React, { ReactNode } from "react";

export type SketchIconButtonVariant =
  | "pink"
  | "yellow"
  | "mint"
  | "lavender"
  | "white"
  | "cream";

const variantBgColors: Record<SketchIconButtonVariant, string> = {
  pink: "#F6B8B8",
  yellow: "#F9E37D",
  mint: "#CFEBD8",
  lavender: "#DCC8F6",
  white: "#FFFDFC",
  cream: "#FFF8E8",
};

const shadowColors: Record<string, string> = {
  purple: "#7653D8",
  yellow: "#E2C95B",
  pink: "#D98B95",
  ink: "rgba(23, 23, 42, 0.2)",
};

const blobPaths = [
  "M 48,3 C 74,1 94,18 96,44 C 98,70 82,92 56,96 C 30,100 8,84 4,58 C 0,32 22,5 48,3 Z",
  "M 44,2 C 72,-1 95,16 97,42 C 99,68 84,90 58,95 C 32,100 6,85 3,59 C 0,33 16,5 44,2 Z",
  "M 52,2 C 78,4 96,24 95,50 C 94,76 76,95 50,96 C 24,97 4,80 3,54 C 2,28 26,0 52,2 Z",
  "M 42,3 C 68,-2 92,14 96,38 C 100,64 86,88 60,94 C 34,100 8,86 4,60 C 0,34 16,8 42,3 Z",
];

export function SketchIconButton({
  children,
  href,
  onClick,
  variant = "white",
  shadow = "ink",
  blobIndex = 0,
  rotation = "rotate-0",
  ariaLabel,
  disabled = false,
  className = "w-11 h-11",
}: {
  children: ReactNode;
  href?: string | null;
  onClick?: () => void;
  variant?: SketchIconButtonVariant;
  shadow?: string;
  blobIndex?: number;
  rotation?: string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}) {
  const path = blobPaths[blobIndex % blobPaths.length];
  const bg = variantBgColors[variant];
  const shadowColor = shadowColors[shadow] || shadow;

  const content = (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
      >
        <path d={path} fill={shadowColor} transform="translate(2.2, 3)" />
        <path
          d={path}
          fill={bg}
          stroke="#17172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {children}
    </>
  );

  const baseClasses = `
    group relative isolate inline-grid place-items-center text-[#17172A] no-underline
    transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5
    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0
    cursor-pointer ${rotation} ${className}
  `;

  if (href) {
    const isExternal = /^https?:\/\//i.test(href);
    return (
      <a
        aria-label={ariaLabel}
        className={baseClasses}
        href={href}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      className={baseClasses}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
}

