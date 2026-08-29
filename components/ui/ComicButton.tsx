import React, { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export type ComicButtonVariant = "pink" | "yellow" | "mint" | "lavender" | "paper" | "white" | "cream";

type ComicButtonProps = {
  children: ReactNode;
  href?: string | null;
  variant?: ComicButtonVariant;
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const buttonPaths = {
  a: "M 4,6 C 26,2 72,4.5 96,2 C 98.5,22 97.5,76 96.5,94 C 74,98 28,95.5 3.5,96.5 C 1.5,76 3.5,24 4,6 Z",
  b: "M 3,4 C 30,5.5 70,2 97,4 C 95.5,26 98,72 96.5,96 C 70,94.5 30,97.5 2.5,95.5 C 3.5,72 1.5,28 3,4 Z",
};

const variantBgColors: Record<ComicButtonVariant, string> = {
  pink: "#F6B8B8",
  yellow: "#F9E37D",
  mint: "#CFEBD8",
  lavender: "#DCC8F6",
  paper: "#FFF8E8",
  cream: "#FFF8E8",
  white: "#FFFDFC",
};

const variantShadowColors: Record<ComicButtonVariant, string> = {
  pink: "#7653D8",
  yellow: "#E2C95B",
  mint: "#76B9A5",
  lavender: "#4C2E9E",
  paper: "#E2C95B",
  cream: "#E2C95B",
  white: "#7653D8",
};

export function ComicButton({
  children,
  href,
  variant = "pink",
  size = "md",
  withArrow = false,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ComicButtonProps) {
  const bg = variantBgColors[variant];
  const shadowColor = variantShadowColors[variant];
  const path = variant === "pink" || variant === "lavender" ? buttonPaths.a : buttonPaths.b;

  const sizeStyles = {
    sm: "px-4 py-2 text-sm font-bold min-h-[40px]",
    md: "px-6 py-2.5 text-base font-extrabold min-h-[48px]",
    lg: "px-8 py-3.5 text-lg font-black min-h-[54px]",
  }[size];

  const content = (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* Offset Hand-drawn Colored Shadow */}
        <path
          d={path}
          fill={shadowColor}
          transform="translate(2.5, 3.5)"
        />
        {/* Foreground Fill with Hand-drawn Outline */}
        <path
          d={path}
          fill={bg}
          stroke="#17172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
        />
        {/* Subtle Double Sketch Line */}
        <path
          d={path}
          fill="none"
          opacity="0.2"
          stroke="#17172A"
          strokeDasharray="2 3"
          strokeWidth="0.8"
          transform="translate(0.5, -0.5)"
        />
      </svg>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="relative z-10 transition-transform duration-150 group-hover:translate-x-1"
          size={size === "lg" ? 20 : 18}
          strokeWidth={2.8}
        />
      )}
    </>
  );

  const baseClasses = `
    group relative isolate inline-flex items-center justify-center gap-2.5
    font-hand text-[#17172A] text-center leading-none no-underline cursor-pointer
    transition-all duration-150
    hover:-translate-y-0.5 hover:-rotate-[0.5deg]
    active:translate-y-0.5 active:translate-x-0.5
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:rotate-0
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17172A]
    ${sizeStyles}
    ${className}
  `;

  if (href) {
    const isExternal = /^https?:\/\//i.test(href);
    return (
      <a
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
      className={baseClasses}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {content}
    </button>
  );
}
